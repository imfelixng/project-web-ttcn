from .schema import Test
from flask import request


def __setup__(module):
    module.resource("test", Test)

    @module.endpoint("/tester", methods=["POST"])
    def test():
        data = request.json
        return str(type(data))
