from werkzeug.exceptions import HTTPException
from bson.json_util import dumps as bson_dumps
from flask import make_response

from . import logger


class AppException(HTTPException):
    status_code = 400
    label = 'Bad Request'

    def __init__(self, errcode, message, data=None):
        self.message = message
        self.code = errcode
        self.data = data

        logger.exception(
            'AppException [%s-%s] %r ==> %r',
            self.status_code,
            self.code,
            self.message,
            self.data
        )

    @property
    def response(self):
        payload = {
            "label": self.label,
            "_status": "ERR",
            "_error": {
                "message": self.message,
                "code": self.code
            }
        }

        text = bson_dumps(payload, indent=2)
        resp = make_response(text, self.status_code)
        resp.mimetype = "application/json"

        return resp


class NotFoundException(AppException):
    status_code = 404
    label = 'NotFound'


class UnprocessableEntity(AppException):
    status_code = 422
    label = 'Unprocessable Entity'
