import sqlite3

class Stub:
    def __init__(self, conn_url, type, q):
        self.q = q
        self.type = type
        self.q_values = tuple()
        self.conn_url = conn_url

    def set(self, **kargs):
        if self.type != "UPDATE":
            raise Exception("Can not use 'SET' on a '{}' command".format(self.type))
        sets = ["{} = ?".format(x) for x in kargs]
        if (len(sets) > 0):
            self.q += " SET {}".format(", ".join(sets))
        self.q_values += tuple(kargs.values())
        return self

    def where(self, **kargs):
        search_params = ["{} = ?".format(x) for x in kargs]
        if (len(search_params) > 0):
            self.q += " WHERE {}".format(" AND ".join(search_params))
        self.q_values += tuple(kargs.values())
        return self
    def with_values(self, **kargs):
        keys = ",".join(kargs.keys())
        values = [kargs[k] for k in kargs.keys()]
        ph = ",".join(["?" for k in kargs.keys()])
        self.q += "({}) VALUES({})".format(keys,ph);
        self.q_values += tuple(values)
        return self
    def limit(self, n):
        self.q += " LIMIT "+n
        return self
    def execute(self):
        conn = sqlite3.connect(self.conn_url)
        c = conn.cursor()
        # since the last python update we can now
        # assume kargs are ordered :D
        c.execute(self.q,self.q_values)
        if (self.type == "EXISTS"):
            r = (c.fetchone() != None)
        elif (self.type == "UPDATE" or self.type == "INSERT" or self.type == "DELETE"):
            conn.commit()
            r = c.lastrowid
        elif (self.type == "SELECT"):
            r = c.fetchone()
        elif (self.type == "SELECT_ALL"):
            r = c.fetchall()
        else:
            raise Exception("Unknown Stub type '{}'".format(self.type))
        
        conn.close()
        return r

    def __bool__(self):
        if (self.type == "EXISTS"):
            return self.execute()
        return True

class DB:
    def __init__(self):
        self.conn_url = "db/test.sqlite3"
        self.exist_queries = {
            "USER" : "SELECT USERNAME FROM USERS",
            "POST": "SELECT ID FROM POSTS",
            "COMMENT": "SELECT ID FROM COMMENTS"
        }
        self.update_queries = {
            "USER" : "UPDATE USERS",
            "POST": "UPDATE POSTS",
            "COMMENT": "UPDATE COMMENTS"
        }
        self.select_queries = {
            "USER" : "SELECT ID,USERNAME,NAME,EMAIL,FOLLOWING,FOLLOWED_NUM FROM USERS",
            "POST": "SELECT * FROM POSTS",
            "COMMENT": "SELECT * FROM COMMENTS"
        }
        self.insert_queries = {
            "USER" : "INSERT INTO USERS",
            "POST": "INSERT INTO POSTS",
            "COMMENT": "INSERT INTO COMMENTS"
        }
        self.delete_queries = {
            "USER": "DELETE FROM USERS",
            "POST": "DELETE FROM POSTS",
            "COMMENT": "DELETE FROM COMMENTS"
        }
    def raw(self, q, params):
        conn = sqlite3.connect(self.conn_url)
        c = conn.cursor()
        c.execute(q,tuple(params))
        r = c.fetchall()
        conn.commit()
        conn.close()
        return r
    def exists(self, query_name, **kargs):
        s = Stub(self.conn_url, "EXISTS", self.exist_queries[query_name])
        return s
    def delete(self, query_name, **kargs):
        s = Stub(self.conn_url, "DELETE", self.delete_queries[query_name])
        return s
    def insert(self, query_name, **kargs):
        s = Stub(self.conn_url, "INSERT", self.insert_queries[query_name])
        return s
    def select(self, query_name, **kargs):
        s = Stub(self.conn_url, "SELECT", self.select_queries[query_name])
        return s
    def select_all(self, query_name, **kargs):
        s = Stub(self.conn_url, "SELECT_ALL", self.select_queries[query_name])
        return s
    def update(self, query_name, **kargs):
        s = Stub(self.conn_url, "UPDATE", self.update_queries[query_name])
        return s
