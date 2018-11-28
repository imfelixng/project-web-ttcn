from .schema import Test
from flask import request
import os
from foundation.core.api.helper import make_resource_response, make_error


def __setup__(module):
    module.resource("test", Test)

    @module.endpoint("/tester", methods=["POST"])
    def test():
        try:
            data = request.json
            model = Test(data)
            model.save()
            return make_resource_response("resource", model.to_primitive())
        except Exception as e:
            return make_error(status=200, description=str(e))

    @module.endpoint("/path", methods=["GET"])
    def get():
        return str(os.getcwd())
