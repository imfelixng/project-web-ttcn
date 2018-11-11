from .schema import User
from pymongo import MongoClient
from foundation.core.api.helper import make_error, make_resource_response
from flask import request


client = MongoClient(
    'mongodb://data:chritsmasgood12@ds143971.mlab.com:43971/nvphu1306')
db = client.nvphu1306
user = db.user


def __setup__(module):
    module.resource("user", User)

    @module.endpoint("/user/register", methods=["POST"])
    def register():
        data = request.json or request.form.to_dict()
        if user.find_one({"username": data.get("username")}) is not None:
            return make_error(400, description="Username is exist")
        if user.find_one({"email": data.get("email")}) is not None:
            return make_error(400, description="email is exist")
        model = User(data)
        model.save()
        return make_resource_response("resource", model.to_primitive())
