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


class RunMaintenance:
    """Running necessary maintenance tasks"""

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
        for record in records:
            record["date_of_purchase"] = datetime.strptime(
                record["date_of_purchase"], '%m/%d/%Y')
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
    """Initiating necessary data insertion actions."""
    m1 = RunMaintenance()
    policy_data = get_data_from_csv(
        "Data Set - Insurance Client.csv")
    # print("policy_data", policy_data)
    m1.run_model_data_bulk_insert(Policy, policy_data)
