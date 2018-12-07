from .schema import Test
from flask import request, send_from_directory
import os
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity

import logging as logger


def __setup__(module):
    module.resource("tests", Test)

    @module.endpoint("/tester", methods=["POST"])
    @module.login_required
    def test():
        try:
            data = request.json
            model = Test(data)
            resp = model.save()
            return make_resource_response("resource", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/path", methods=["GET"])
    def get():
        return str(os.getcwd())

    @module.endpoint("/unprocess", methods=["GET"])
    def unprocess():
        try:
            a = 1 / 0
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/media/<path>", methods=["GET"])
    def get_file(path):
        logger.warning("Path %r", path)
        return send_from_directory(module.config['PUBLIC_PATH'], path)
