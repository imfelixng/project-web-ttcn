from .schema import Test
from flask import request, send_from_directory
import os
from foundation.core.api.helper import make_resource_response, make_error
from foundation.core.exceptions import UnprocessableEntity
from flask import current_app as app
import logging as logger


# def on_save_test(model, *args, **kwargs):
# app.mqtt.publish('notification', "%s created" % model.userID)


def __setup__(module):
    # Test.register_hook('on_save', on_save_test)
    module.resource("tests", Test)

    @module.endpoint("/tester", methods=["POST"])
    @module.login_required
    def test():
        try:
            data = request.json
            model = Test(data)
            # logger.warning("model on save %s", model.__hooks__)
            resp = model.save()
            return make_resource_response("resource", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/path", methods=["GET"])
    def get():
        return str(os.getcwd())

    @module.endpoint("/RItest", methods=["GET"])
    def unprocess():
        try:
            data = {"userID": "phunguyen"}
            model = Test(data)
            return str(Test.RI() + "s")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/media/<path>", methods=["GET"])
    def get_file(path):
        logger.warning("Path %r", path)
        return send_from_directory(module.config['PUBLIC_PATH'], path)

    @module.endpoint("/search", methods=["GET"])
    def search():
        try:
            key_word = request.args.get("search")
            query = {
                "content.blocks.text": {
                    "$regex": key_word
                }
            }
            resp = module.data.find("question", query)
            return make_resource_response("question", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
