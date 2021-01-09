import secrets
from app import db
from flask_restplus import Resource, abort, reqparse, fields

def unpack(j,*args,**kargs):
    if kargs.get("required",True):
        not_found = [arg for arg in args if arg not in j]
        if not_found:
            expected = ", ".join(map(str, not_found))
            abort(kargs.get("error",400), "Expected request object to contain: " + expected)
    return [j.get(arg, None) for arg in args]

def gen_token():
    token = secrets.token_hex(32)
    while db.exists("USER").where(curr_token=token):
        token = secrets.token_hex(32)
    return token

def authorize(r):
    # Probably not the best way of doing this
    if r.path.startswith("/dummy"):
        return get_dummy_user()

    t = r.headers.get('Authorization',None)
    if not t:
        abort(403,'Unsupplied Authorization Token')
    try:
        t = t.split(" ")[1]
    except:
        abort(400,"Authorization Token must start with 'Token'")
    if not db.exists("USER").where(curr_token=t):
        abort(403,'Invalid Authorization Token')
    return db.select("USER").where(curr_token=t).execute()

def get_dummy_user():
    return db.select("USER").where(id=1).execute()

def text_list_to_set(raw,process_f=lambda x:x):
    if raw == None:
        return set()
    return set([process_f(x) for x in raw.split(",") if x != ''])

def set_to_text_list(l):
    return ",".join([str(x) for x in l])

def format_post(post):
    comments = []
    for c_id in text_list_to_set(post[7],process_f=lambda x:int(x)):
        comment = db.select("COMMENT").where(id=c_id).execute()
        comments.append({
            "author":  comment[1],
            "published":  comment[2],
            "comment": comment[3]
        })
    return {
        "id": post[0],
        "meta": {
            "author": post[1],
            "description_text": post[2],
            "published": post[3],
            "likes": list(text_list_to_set(post[4],process_f=lambda x:int(x)))
        },
        "thumbnail": post[5],
        "src": post[6],
        "comments": comments
    }
