from pymongo import MongoClient
import logging as logger
from wersut.utils import Utils, make_error, return_request_data
from flask import session
from wersut.schema import schema_user
from cerberus import Validator
from datetime import datetime

client = MongoClient()
db = client.data_blog
users = db.users
format_str = '%d/%m/%Y'


class Base:
    @classmethod
    def create(cls, postId=None):
        request_data = return_request_data()
        coll = db[cls.collection]
        v = Validator(cls.schema)
        if not v.validate(request_data):
            return make_error(status=400, description=v.errors)
        else:
            if cls.__name__ == "User":
                if users.find_one({"username": request_data.get('username')}) is not None:
                    return make_error(400, description="Username is exist, please choose another.")
                request_data["birthday"] = datetime.strptime(
                    request_data.get("birthday"), format_str)
            result = coll.insert_one(request_data)
            post = coll.find_one({'_id': result.inserted_id})
            logger.warn('Update %r', post)
            return Utils.return_jsonify(post)

    @classmethod
    def update(cls, _id=None):
        request_data = return_request_data()
        if request_data.get("birthday", None) is not None:
            request_data["birthday"] = datetime.strptime(
                request_data.get("birthday"), format_str)
        query = {"username": session.get("username")}
        coll = db[cls.collection]
        if coll.find_one(query) is None:
            return make_error(status=400, description="it's not yours")
        result = coll.find_one_and_update(query, {'$set': request_data})
        return Utils.return_jsonify(result)


class User(Base):
    collection = "users"
    schema = schema_user
