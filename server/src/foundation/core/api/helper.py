from flask import make_response, Response
from foundation.common.json import bson_dumps
import json


def make_resource_response(resource, data):
    if type(data) is list:
        response = {
            '_meta': {
                'max_results': 10,
                'page_size': 10,
                'page': 1,
                'total': 1
            }
        }
        response['_items'] = data
        text = bson_dumps(response)
        response = make_response(text)
        response.mimetype = 'application/json'
        return response
    else:
        text = bson_dumps(data)
        response = make_response(text)
        response.mimetype = 'application/json'
        return response


def make_error(status, description, isSuccess=False):
    error_object = {
        'status': status,
        'description': description,
        'isSuccess': isSuccess
    }
    response = json.dumps(error_object)
    return Response(response=response, status=status, content_type='application/json')
