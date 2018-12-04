from .schema import Test
from flask import request
import os
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity


def __setup__(module):
    module.resource("tests", Test)

    @module.endpoint("/tester", methods=["POST"])
    @module.login_required
    def test():
        try:
            data = request.json
            model = Test(data)
            model.save()
            return make_resource_response("resource", model.to_primitive())
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=e.to_primitive())

    @module.endpoint("/path", methods=["GET"])
    @module.login_required
    def get():
        return str(os.getcwd())

    @module.endpoint("/unprocess", methods=["GET"])
    def unprocess():
        try:
            a = 1 / 0
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
