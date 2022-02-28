from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from basic_data_read import get_data_from_csv
# from model.policy import Policy, Base
from run import Policy
import os
from datetime import datetime


# Connect to Database and create database session

engine = create_engine(os.getenv("DB_CONN_STRING"))
# engine = create_engine(
#     "mysql+pymysql://myadmin:password@localhost/testing", connect_args=dict(host='localhost', port=3308))
# Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
db_session = DBSession()
# conn = engine.connect()
# conn.execute(
#     "SELECT host FROM INFORMATION_SCHEMA.PROCESSLIST WHERE ID = CONNECTION_ID()").fetchall()
# DBSession.add_all()


class RunMaintenance:
    def __init__(self):
        self.db_session = ""

    def set_session(self):
        con_string = os.getenv("DB_CONN_STRING")
        print("con_string", con_string)
        # engine = create_engine(con_string)
        # Base.metadata.bind = engine
        # DBSession = sessionmaker(bind=engine)
        # self.db_session = DBSession()

    def runBasedata(self, sql):
        pass
        try:
            db_session.execute(sql)
            db_session.commit()
        except:
            db_session.rollback()
            raise
        finally:
            db_session.close()

    def run_model_data_bulk_insert(self, model, records):
        # objects = []
        # # print("model", model)
        # dicts = [dict(bar=t[0], fly=t[1]) for t in records]

        for record in records:
            record["date_of_purchase"] = datetime.strptime(
                record["date_of_purchase"], '%m/%d/%Y')
        #     objects.append(model(record))
        # print(":objects:", objects)
        try:
            db_session.bulk_insert_mappings(model, records)
            # db_session.add_all(objects)
            db_session.commit()
        except:
            db_session.rollback()
            raise
        # finally:
        #     db_session.close()


if __name__ == '__main__':
    print("Running...")
    m1 = RunMaintenance()
    m1.set_session()
    policy_data = get_data_from_csv(
        "Data Set - Insurance Client.csv")
    # print("policy_data", policy_data)
    m1.run_model_data_bulk_insert(Policy, policy_data)
