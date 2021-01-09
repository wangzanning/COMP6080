from app import api,db
from util.globals import *
from util.models import *
from util.request_handling import *
from flask_restplus import Resource, abort, reqparse, fields
from PIL import Image
from io import BytesIO
import base64
import time
from flask import request

posts = api.namespace('post', description='Post Services')

@posts.route('/', strict_slashes=False)
class Post(Resource):
    @posts.response(200, 'Success', post_id_details)
    @posts.response(403, 'Invalid Auth Token')
    @posts.response(400, 'Malformed Request / Image could not be processed')
    @posts.expect(auth_details,new_post_details)
    @posts.doc(description='''
        Lets you make a new post, both a description and src must be supplied.
        The Supplied description test must be non empty and the image be a valid
        png image encoded in base 64 (only png is supported at the present moment)
        If either of these is not met the request is considered malformed.
        Note the src just needs to be the base64 data, no meta data such as 'data:base64;'
        is required. Putting it in will make the data invalid.
        Returns the post_id of the new post on success.
    ''')
    def post(self):
        u = authorize(request)
        u_username = u[1]
        j = get_request_json()
        (desc,src) = unpack(j,'description_text','src')
        if desc == "":
            abort(400, "description_text cannot be empty")
        if src == "":
            abort(400, "src cannot be empty")
        thumbnail = self._gen_thumbnail(src)
        post_id=db.insert('POST').with_values(
            author=u_username,
            description=desc,
            published=str(time.time()),
            likes='',
            thumbnail=thumbnail,
            src=src
        ).execute()
        return {
            'post_id': post_id
        }

    def _gen_thumbnail(self, src):
        try:
            size = (150,150)
            im = Image.open(BytesIO(base64.b64decode(src)))
            im.thumbnail(size, Image.ANTIALIAS)
            buffered = BytesIO()
            im.save(buffered, format='PNG')
            return base64.b64encode(buffered.getvalue()).decode("utf-8")
        except:
            abort(400,'Image Data Could Not Be Processed')

    @posts.response(200, 'Success')
    @posts.response(403, 'Invalid Auth Token / Unauthorized to edit Post')
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.param('id','the id of the post to update')
    @posts.expect(auth_details,new_post_details)
    @posts.doc(description='''
        Lets you update a post without changing metadata.
        Published date, likes, comments etc. will be left untouched.
        At least one of the paramaters must be supplied.
        The id of the post to update must also be supplied,
        a invalid id will make the request be considered malformed.
        The current user pointed to by the auth token must be
        the author of the post pointed to by id otherwise a
        unauthorized error will be raised.
    ''')
    def put(self):
        u = authorize(request)
        u_username = u[1]
        j = get_request_json()
        id = get_request_arg('id', int, required=True)
        if not db.exists('POST').where(id=id):
            abort(404, 'Post Not Found')
        # check the logged in user made this post
        post_author = db.select('POST').where(id=id).execute()[1]
        if u[1] != post_author:
            # exposing what post id's are valid and unvalid
            # may be a security issue lol
            abort(403, 'You Are Unauthorized To Edit That Post')
        (desc,src) = unpack(j,'description_text','src',required=False)
        if desc == None and src == None:
            abort(400, "Expected at least 'description_text' or 'src'")
        updated = {}
        if desc:
            updated['description'] = desc
        if src:
            updated['src'] = src
            updated['thumbnail'] = self._gen_thumbnail(src)
        db.update('POST').set(**updated).where(id=id).execute()
        return {
            'message': 'success'
        }

    @posts.response(200, 'Success')
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.response(403, 'Invalid Auth Token')
    @posts.expect(auth_details)
    @posts.param('id','the id of the post to delete')
    @posts.doc(description='''
        Lets you delete the post referenced by 'id'.
        id must be supplied and the user pointed to by
        the auth token must be the author of the post.
        If the user is not the autor of the post referenced
        by 'id' a unauthorized error is raised.
        If id is invalid or not supplied the request is considered
        malformed.
    ''')
    def delete(self):
        u = authorize(request)
        id = get_request_arg('id', int, required=True)
        if not db.exists('POST').where(id=id):
            abort(404,'Post Not Found')
        p = db.select('POST').where(id=id).execute()
        if p[1] != u[1]:
            abort(403,'You Are Unauthorized To Make That Request')
        comment_list = text_list_to_set(p[7])
        [db.delete('COMMENT').where(id=c_id).execute() for c_id in comment_list]
        db.delete('POST').where(id=id).execute()
        return {
            'message': 'success'
        }

    @posts.response(200, 'Success',post_details)
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.response(403, 'Invalid Auth Token')
    @posts.expect(auth_details)
    @posts.param('id','the id of the post to fetch')
    @posts.doc(description='''
        Lets you fetch a post referenced by 'id'.
        id must be supplied and valid, the request is considered
        malformed otherwise.
        The returned object contains standard information such as
        the description text, username of the author, and published time
        as a UNIX Time Stamp.
        In addition the meta section of the object contains a list of user id's
        of the users who have liked the post.
        The src is supplied in base64 encoding as is a thumbnail, also base64 encoded.
        The thumbnail is of size 150px by 150px.
        There is also a list of comments supplied. Each comment has the comment text,
        the username of the author who made the comment and a UNIX timestamp of
        the the comment was posted.
    ''')
    def get(self):
        u = authorize(request)
        id = get_request_arg('id', int, required=True)
        p = db.select('POST').where(id=id).execute()
        if not p:
            abort(404,'Post Not Found')
        return format_post(p)

@posts.route('/like', strict_slashes=False)
class Like(Resource):
    @posts.response(200, 'Success')
    @posts.response(403, 'Invalid Auth Token')
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.param('id','the id of the post to like')
    @posts.expect(auth_details)
    @posts.doc(description='''
        Lets the user pointed to by the auth token like
        the post referenced by 'id'.
        'id' must be supplied and valid, the request is considered
        malformed otherwise.
        If the post is already liked by the user pointed to by the auth token
        nothing is done.
    ''')
    def put(self):
        u = authorize(request)
        id = get_request_arg('id', int, required=True)
        if not db.exists('POST').where(id=id):
            abort(404, 'Post Not Found')
        p = db.select('POST').where(id=id).execute()
        likes = text_list_to_set(p[4],process_f=lambda x:int(x))
        likes.add(u[0])
        likes = set_to_text_list(likes)
        db.update('POST').set(likes=likes).where(id=id).execute()
        return {
            'message': 'success'
        }

@posts.route('/unlike', strict_slashes=False)
class Unlike(Resource):
    @posts.response(200, 'Success')
    @posts.response(403, 'Invalid Auth Token')
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.param('id','the id of the post to unlike')
    @posts.expect(auth_details)
    @posts.doc(description='''
        Lets the user pointed to by the auth token unlike
        the post referenced by 'id'.
        'id' must be supplied and valid, the request is considered
        malformed otherwise.
        If the post is not liked by the user pointed to by the auth token
        nothing is done.
    ''')
    def put(self):
        u = authorize(request)
        id = get_request_arg('id', int, required=True)
        if not db.exists('POST').where(id=id):
            abort(404, 'Post Not Found')
        p = db.select('POST').where(id=id).execute()
        likes = text_list_to_set(p[4],process_f=lambda x: int(x))
        likes.discard(u[0])
        likes = set_to_text_list(likes)
        db.update('POST').set(likes=likes).where(id=id).execute()
        return {
            'message': 'success'
        }

@posts.route('/comment', strict_slashes=False)
class Comment(Resource):
    @posts.response(200, 'Success')
    @posts.response(403, 'Invalid Auth Token')
    @posts.response(400, 'Malformed Request')
    @posts.response(404, 'Post Not Found')
    @posts.param('id','the id of the post to comment on')
    @posts.expect(auth_details,new_comment_details)
    @posts.doc(description='''
        Lets the user pointed to by the auth token comment on
        the post referenced by 'id'.
        'id' must be supplied and valid, the request is considered
        malformed otherwise.
        The posted json must contain a "comment" field with a non
        empty comment as the value, otherwise the request is considered
        malformed.
    ''')
    def put(self):
        u = authorize(request)
        j = get_request_json()
        id = get_request_arg('id', int, required=True)
        if not db.exists('POST').where(id=id):
            abort(404, 'Post Not Found')
        (comment,) = unpack(j,'comment')
        if comment == "":
            abort(400, 'Comment cannot be empty')
        comment_id = db.insert('COMMENT').with_values(
            comment=comment,
            author=u[1],
            published=str(time.time())
        ).execute()
        p = db.select('POST').where(id=id).execute()
        comment_list = text_list_to_set(p[7],process_f=lambda x: int(x))
        comment_list.add(comment_id)
        comment_list = set_to_text_list(comment_list)
        db.update('POST').set(comments=comment_list).where(id=id).execute()
        return {
            'message': 'success'
        }
