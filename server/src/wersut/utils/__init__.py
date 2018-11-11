from flask import Response, request, jsonify
import json
from bson import json_util, ObjectId
from pymongo import MongoClient
client = MongoClient()
db = client.data_blog
posts = db.posts


def make_error(status, description):
    error_object = {
        'status': status,
        'description': description
    }
    response = json.dumps(error_object)
    return Response(response=response, status=status, content_type='application/json')


def return_request_data():
    if (request.is_json):
        return request.json
    else:
        return request.form.to_dict()


class Utils:
    @staticmethod
    def return_jsonify(data):
        return jsonify(json.loads(json.dumps(data, default=json_util.default)))

    @staticmethod
    def embedded_comments(postId):
        h = posts.aggregate([
            {
                "$lookup":
                {
                    "from": "comments",
                    "localField": "_id",
                    "foreignField": "postId",
                    "as": "comments"
                }
            },
            {"$match": {"_id": ObjectId(postId)}},
            {"$project": {"_id": 0, "_create": 0, "user": 0, "_updated": 0,
                          "comments.postId": 0, "comments._id": 0}}
        ])
        return Utils.return_jsonify(list(h))
