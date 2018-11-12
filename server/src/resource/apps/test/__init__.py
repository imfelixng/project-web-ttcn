from .schema import Test
from flask import request
from bson import ObjectId


def __setup__(module):
    module.resource("test", Test)

    @module.endpoint("/test", methods=['POST'])
    def TEST():
        data = request.json
        data["objectID"] = ObjectId(data['objectID'])
        model = Test(data)
        model.save()
        return "ok"