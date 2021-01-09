import os, sys

database_dir = os.path.join('db')
database_file = os.path.join(database_dir, 'test.sqlite3')
if not os.path.exists(database_dir):
    print('Creating', database_dir)
    os.mkdir(database_dir)
if not os.path.exists(database_file):
    print('Creating', database_file)
    import ssl, urllib.request
    with urllib.request.urlopen('https://www.cse.unsw.edu.au/~cs2041/18s2/activities/instacram/test.sqlite3', context = ssl.SSLContext(ssl.PROTOCOL_TLSv1)) as response:
        db = response.read()
    with open(database_file, "wb") as f:
        f.write(db)
try:
    from app import app
    import namespaces.post
    import namespaces.auth
    import namespaces.user
    import namespaces.dummy
    app.run(debug=True)
except ImportError as e:
    print('ERROR:', e, file=sys.stderr)
    if sys.version_info < (3,6):
        print('The backend requires Python 3.6 or later - you appear to be using Python {}.{}'.format(*sys.version_info), file=sys.stderr)
    else:
        print('A module required by the backend is missing.', file=sys.stderr)
        print('See the instructions in backend/README.md for installing the required modules.', file=sys.stderr)    
        print('Ask in the forum if you can not fix this problem.', file=sys.stderr) 
