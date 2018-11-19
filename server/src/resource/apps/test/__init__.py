from .schema import Test
from flask import request
import os


def __setup__(module):
    module.resource("test", Test)

    @module.endpoint("/tester", methods=["POST"])
    def test():
        data = request.json
        return str(type(data))

    @module.endpoint("/path", methods=["GET"])
    def get():
        return str(os.getcwd())
