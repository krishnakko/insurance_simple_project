
import json
from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS
from sqlalchemy import or_

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONN_STRING")
app.config['SECRET_KEY'] = "krishna971"


db = SQLAlchemy(app)


class Policy(db.Model):
    """Data model for insurance policies."""
    __tablename__ = 'policy'

    policy_id = db.Column(db.Integer, primary_key=True)
    date_of_purchase = db.Column(db.DateTime, index=False,
                                 unique=False, nullable=False)
    customer_id = db.Column(db.Integer, index=True,
                            unique=False, nullable=True)
    fuel = db.Column(db.String(10), index=False, unique=False, nullable=True)
    vehicle_segment = db.Column(db.String(10), index=False,
                                unique=False, nullable=True)
    premium = db.Column(db.Integer, index=False,
                        unique=False, nullable=False)
    bodily_injury_liability = db.Column(db.Boolean, index=False,
                                        unique=False, nullable=False)

    personal_injury_protection = db.Column(db.Boolean, index=False,
                                           unique=False, nullable=False)

    property_damage_liability = db.Column(db.Boolean, index=False,
                                          unique=False, nullable=False)
    collision = db.Column(db.Boolean, index=False,
                          unique=False, nullable=False)
    comprehensive = db.Column(db.Boolean, index=False,
                              unique=False, nullable=False)
    customer_gender = db.Column(db.String(10), index=False,
                                unique=False, nullable=False)
    customer_income_group = db.Column(db.String(25), index=False,
                                      unique=False, nullable=False)
    customer_region = db.Column(db.String(25), index=False,
                                unique=False, nullable=True)
    customer_marital_status = db.Column(db.Boolean, index=False,
                                        unique=False, nullable=False)

    def toJson(self):
        return self.__dict__

    # def __repr__(self):
    #     return "<Policy(date_of_purchase='%s', customer_id=%s, fuel='%s', vehicle_segment='%s')>" % (
    #         self.date_of_purchase, self.customer_id, self.fuel, self.vehicle_segment)


def convert_date(date):
    return date.strftime("%Y-%m-%d")


def return_multi_records(records):
    return_list = []
    for rec in records:
        record = rec.__dict__
        record["date_of_purchase"] = convert_date(record["date_of_purchase"])
        del record['_sa_instance_state']
        return_list.append(record)
    return return_list


def return_record(rec, ref=False):
    record = rec.__dict__
    record["date_of_purchase"] = convert_date(record["date_of_purchase"])
    if ref:
        return record
    del record['_sa_instance_state']
    return record


def dict_fetchall(records):
    """Making dict with db table records"""
    columns = []
    if len(records) > 0:
        columns = records[0].keys()
    return [dict(zip(columns, row)) for row in records]


@app.route('/policies', methods=['GET'])
def get_all_policies():
    offset = request.args["offset"] if "offset" in request.args else 0
    limit = request.args["limit"] if "limit" in request.args else 25
    no_limit = request.args["no_limit"] if "no_limit" in request.args else 0

    if no_limit:
        policies = Policy.query.all()
    else:
        policies = Policy.query.offset(offset).limit(limit).all()
    count = Policy.query.count()
    policies_final = return_multi_records(policies)

    response = {
        "count": count,
        "data": policies_final
    }
    return response


@app.route('/policies/<int:policy_id>', methods=['GET'])
def get_policy(policy_id):
    policy = Policy.query.get(policy_id)
    if policy:
        return {"data": return_record(policy)}
    return {"data": []}


@app.route('/policies/<int:policy_id>', methods=['PUT'])
def update_policy(policy_id):
    payload = json.loads(request.data)
    policy = Policy.query.get(policy_id)
    if "premium" in payload:
        premium = payload["premium"]
        if int(premium) > 1000000:
            return {"error": "Premium should not exceeded 1 million"}, 406
        policy.premium = premium
    if "date_of_purchase" in payload:
        return {"error": "Date of purchase is not editable"}, 406
    if "bodily_injury_liability" in payload:
        policy.bodily_injury_liability = payload["bodily_injury_liability"]
    if "collision" in payload:
        policy.collision = payload["collision"]
    if "comprehensive" in payload:
        policy.comprehensive = payload["comprehensive"]
    if "customer_gender" in payload:
        policy.customer_gender = payload["customer_gender"]
    if "customer_id" in payload:
        policy.customer_id = payload["customer_id"]
    if "customer_income_group" in payload:
        policy.customer_income_group = payload["customer_income_group"]
    if "customer_marital_status" in payload:
        policy.customer_marital_status = payload["customer_marital_status"]
    if "customer_region" in payload:
        policy.customer_region = payload["customer_region"]
    if "fuel" in payload:
        policy.fuel = payload["fuel"]
    if "personal_injury_protection" in payload:
        policy.personal_injury_protection = payload["personal_injury_protection"]

    if "property_damage_liability" in payload:
        policy.property_damage_liability = payload["property_damage_liability"]
    if "vehicle_segment" in payload:
        policy.vehicle_segment = payload["vehicle_segment"]
    try:
        db.session.commit()
        updateddata = Policy.query.get(policy_id)
        return {"data": return_record(updateddata)}
    except:
        return {"error": "Something went wrong"}, 500


@app.route('/policies/search', methods=['GET'])
def search_policy():
    if "query_id" not in request.args:
        return {"error": "query_id param is missing"}
    offset = request.args["offset"] if "offset" in request.args else 0
    limit = request.args["limit"] if "limit" in request.args else 25
    no_limit = request.args["no_limit"] if "no_limit" in request.args else 0

    query_id = request.args["query_id"]
    count = Policy.query.filter(
        or_(Policy.policy_id == query_id, Policy.customer_id == query_id)).count()
    if no_limit:
        policies = Policy.query.filter(
            or_(Policy.policy_id == query_id, Policy.customer_id == query_id)).all()
    else:
        policies = Policy.query.filter(
            or_(Policy.policy_id == query_id, Policy.customer_id == query_id)).offset(offset).limit(limit).all()
    policies_final = return_multi_records(policies)
    response = {
        "count": count,
        "data": policies_final
    }
    return response


@app.route('/policies/report', methods=['GET'])
def reports_by_month():
    query = "SELECT strftime('%Y-%m', date_of_purchase) year_month, count(policy_id) FROM policy group by year_month;"
    resp_data = db.session.execute(query).fetchall()
    report_data = dict_fetchall(resp_data)
    response = {
        "count": len(report_data),
        "data": report_data
    }
    return response


if __name__ == '__main__':
    db.create_all()
    app.run('0.0.0.0', port=9000, debug=True)
