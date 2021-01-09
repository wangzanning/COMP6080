from namespaces.post import *
from namespaces.user import *

def decorate(fun, *decorators):
    for decorator in decorators:
        fun = decorator(fun)
    return fun

dummy = api.namespace('dummy', description='Dummy Post Services for testing')

@dummy.route('/post', strict_slashes=False)
class DummyPost(Post):
    @dummy.expect(new_post_details)
    @dummy.doc(description='''
        Identical to POST /post but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    # Take default values from Post.post
    @dummy.doc(**Post.post.__apidoc__)
    def post(self):
        return Post.post(self)

    @dummy.expect(new_post_details)
    @dummy.doc(description='''
        Identical to PUT /post but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Post.put.__apidoc__)
    def put(self):
        return Post.put(self)

    @dummy.expect()
    @dummy.doc(description='''
        Identical to DELETE /post but does not require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Post.delete.__apidoc__)
    def delete(self):
        return Post.delete(self)

    @dummy.expect()
    @dummy.doc(description='''
        Identical to GET /post but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Post.get.__apidoc__)
    def get(self):
        return Post.get(self)

@dummy.route('/post/like', strict_slashes=False)
class DummyPost(Like):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to PUT /post/list but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Like.put.__apidoc__)
    def put(self):
        return Like.put(self)

@dummy.route('/post/unlike', strict_slashes=False)
class DummyUnlike(Unlike):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to PUT /post/unlike but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Unlike.put.__apidoc__)
    def put(self):
        return Unlike.put(self)

@dummy.route('/post/comment', strict_slashes=False)
class DummyComment(Comment):
    @dummy.expect(new_comment_details)
    @dummy.doc(description='''
        Identical to PUT /comment but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Comment.put.__apidoc__)
    def put(self):
        return Comment.put(self)

@dummy.route('/user', strict_slashes=False)
class DummyUser(User):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to GET /user but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**User.get.__apidoc__)
    def get(self):
        return User.get(self)

    @dummy.expect(user_update_details)
    @dummy.doc(description='''
        Identical to PUT /user but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**User.put.__apidoc__)
    def put(self):
        return User.put(self)

@dummy.route('/user/feed', strict_slashes=False)
class DummyFeed(Feed):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to GET /feed but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Feed.get.__apidoc__)
    def get(self):
        return Feed.get(self)

@dummy.route('/user/follow', strict_slashes=False)
class DummyFollow(Follow):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to PUT /user/follow but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Follow.put.__apidoc__)
    def put(self):
        return Follow.put(self)

@dummy.route('/user/unfollow', strict_slashes=False)
class DummyUnFollow(UnFollow):
    @dummy.expect()
    @dummy.doc(description='''
        Identical to PUT /user/unfollow but doesn't require any authentication
        Allows you to act as a "Anon" user.
    ''')
    @dummy.doc(**Follow.put.__apidoc__)
    def put(self):
        return UnFollow.put(self)
