from pymongo import MongoClient
import json
import logging as logger
from wersut.utils import Utils, make_error, return_request_data
from flask import request, session
from bson import json_util, ObjectId
from cerberus import Validator
from datetime import datetime

client = MongoClient()
db = client.data_blog
posts = db.posts
users = db.users
comments = db.comments
format_str = '%d/%m/%Y'


class BaseAPI:
    # get item for post or comments of post
    def get_item(self, _id=None, postId=None):
        try:
            coll = db[self.collection]
            query = {"_id": ObjectId(_id)}
            if request.args.get("embedded", None) is not None:
                return Utils.embedded_comments(_id)
            if postId is not None:
                query = {"_id": ObjectId(_id), "postId": ObjectId(postId)}
            if coll.find(query) is not None:
                return Utils.return_jsonify(list(coll.find(query)))
            else:
                return make_error(status=400, description="Not found")
        except Exception as e:
            return make_error(status=400, description=str(e))

    def get_list(self, postId=None):
        coll = db[self.collection]
        item = None

        where = request.args.get("where")
        if where:
            where = json.loads(where)
        else:
            where = {}

        max_result = int(request.args.get("max_result", "3"))
        page_id = int(request.args.get("page", "1"))

        skip = max_result * (page_id - 1)
        documents = list(coll.find(where).skip(skip).limit(max_result))
        if postId is not None:
            documents = list(coll.find({"postId": ObjectId(postId)}).skip(
                skip).limit(max_result))

        # logger.warn('Doc %r', json.loads(json.dumps(documents)))

        item = json.loads(json.dumps(documents, default=json_util.default))

        page = {
            "_item": item,
            "_meta": {
                "max_result": max_result,
                "page": page_id,
                "total": coll.find({}).count(),
            }
        }
        return Utils.return_jsonify(page)

    def delete_item(self, _id=None, postId=None):
        query = {"_id": ObjectId(_id)}
        coll = db[self.collection]
        if coll.find_one(query) is None:
            return make_error(status=400, description="It's not yours")
        result = coll.delete_one(query)
        return str(result)

    def create(self, postId=None):
        request_data = return_request_data()
        coll = db[self.collection]
        v = Validator(self.schema)
        if not v.validate(request_data):
            return make_error(status=400, description=v.errors)
        else:
            if postId is not None:
                request_data["postId"] = ObjectId(postId)
            # request_data["user"] = session.get("username")
            request_data["_create"] = datetime.now()
            request_data["_updated"] = datetime.now()
            result = coll.insert_one(request_data)
            post = coll.find_one({'_id': result.inserted_id})
            logger.warn('Update %r', post)
            return Utils.return_jsonify(post)

    def update(self, _id=None, postId=None):
        request_data = return_request_data()
        query = {"_id": ObjectId(_id)}
        coll = db[self.collection]
        if coll.find_one(query) is None:
            return make_error(status=400, description="it's not yours")
        request_data["_updated"] = datetime.now()
        result = coll.find_one_and_update(query, {'$set': request_data})
        result = coll.find_one(query)
        return Utils.return_jsonify(result)
