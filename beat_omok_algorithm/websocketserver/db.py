import pymysql
pymysql.install_as_MySQLdb()
import sqlalchemy as db

def storedata(a,b,c,d,e,f,g,h):
    pw = ""
    engine = db.create_engine('mysql://root:'+ pw +'@localhost/gamehistory?charset=utf8')
    connection = engine.connect()
    metadata = db.MetaData()
    table = db.Table('match_info', metadata, autoload=True, autoload_with=engine)

    query = db.insert(table).values([a,b,c,d,e,f,g,h])
    result_proxy = connection.execute(query)
    result_proxy.close()
    engine.dispose()

def test():
    storedata("hi","algo","1000-01-01 00:00:00","1000-01-01 00:00:01","w","w","f","00000100")

if __name__ == '__main__':
    test()