from pymongo import MongoClient
import json
import logging as logger
from wersut.utils import Utils, make_error, return_request_data
from flask import request, session
from bson import json_util, ObjectId
from wersut.schema import schema_comment, schema_post, schema_user
from cerberus import Validator
from datetime import datetime

client = MongoClient()
db = client.data_blog
posts = db.posts
users = db.users
comments = db.comments
format_str = '%d/%m/%Y'


class Base:
    # get item for post or comments of post
    @classmethod
    def get_item(cls, postId=None):
        check = request.args.get("comments", "")
        if check != "":
            return Utils.embedded_comments(postId)
        else:
            query = {}
            try:
                coll = db[cls.collection]
                if cls.__name__ == "Post":
                    query = {"_id": ObjectId(postId)}
                elif cls.__name__ == "Comment":
                    query = {"postId": ObjectId(postId)}
                if coll.find(query) is not None:
                    return Utils.return_jsonify(list(coll.find(query)))
                else:
                    return make_error(status=400, description="Not found")
            except Exception as e:
                return make_error(status=400, description=str(e))

    @classmethod
    def get_list(cls):
        coll = db[cls.collection]
        item = None

        where = request.args.get("where")
        if where:
            where = json.loads(where)

        max_result = int(request.args.get("max_result", "3"))
        page_id = int(request.args.get("page", "1"))

        skip = max_result * (page_id - 1)
        documents = list(coll.find(where).skip(skip).limit(max_result))

        if (len(documents) > 0):
            last_id = documents[0]["_id"]
        else:
            item = []

        # logger.warn('Doc %r', json.loads(json.dumps(documents)))

        item = json.loads(json.dumps(documents, default=json_util.default))

        page = {
            "_item": item,
            "_meta": {
                "max_result": max_result,
                "page": page_id,
                "total": coll.find({}).count(),
                # "last_id": last_id
            }
        }
        return Utils.return_jsonify(page)

    @classmethod
    def delete_item(cls, postId=None, comment_id=None):
        query = {}
        if cls.__name__ == "Post":
            query = {"_id": ObjectId(postId), "user": session.get("username")}
        else:
            query = {"_id": ObjectId(comment_id),
                     "userId": session.get("username")}
        coll = db[cls.collection]
        if coll.find_one(query) is None:
            return make_error(status=400, description="It's not yours")
        result = coll.delete_one(query)
        return str(result)

    # create item for user or post
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
            elif cls.__name__ == "Post":
                request_data["user"] = session.get("username")
                request_data["_create"] = datetime.now()
            elif cls.__name__ == "Comment":
                request_data["postId"] = ObjectId(postId)
                request_data["userId"] = session.get("username")
            result = coll.insert_one(request_data)
            post = coll.find_one({'_id': result.inserted_id})
            logger.warn('Update %r', post)
            return Utils.return_jsonify(post)

    # update info for user or posts
    @classmethod
    def update(cls, _id=None):
        request_data = return_request_data()
        query = {}
        if cls.__name__ == "Post":
            request_data["_updated"] = datetime.now()
            try:
                query = {"_id": ObjectId(_id), "user": session.get("username")}
            except Exception as e:
                return make_error(status=400, description=str(e))
        elif cls.__name__ == "User":
            if request_data.get("birthday", None) is not None:
                request_data["birthday"] = datetime.strptime(
                    request_data.get("birthday"), format_str)
            query = {"username": session.get("username")}
        coll = db[cls.collection]
        if coll.find_one(query) is None:
            return make_error(status=400, description="it's not yours")
        result = coll.find_one_and_update(query, {'$set': request_data})
        return Utils.return_jsonify(result)


class Comment(Base):
    collection = "comments"
    schema = schema_comment


class User(Base):
    collection = "users"
    schema = schema_user


class Post(Base):
    collection = "posts"
    schema = schema_post
