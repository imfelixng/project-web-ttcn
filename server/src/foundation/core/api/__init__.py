from bson import ObjectId
from flask import request, Response, session
from foundation.core.exceptions import UnprocessableEntity, NotFoundException
from .helper import make_resource_response


class BaseAPI:
    def __init__(self, datalayer, model):
        self.Model = model
        self.data = datalayer
        self.resource = self.Model.RI()

    def return_query(self, _id):
        query = {'_id': ObjectId(_id)}
        return query

    def get(self, query=None, questionId=None):
        data = self.data.find(self.resource, query)
        data = list(data)
        return make_resource_response(self.resource, data)

    def get_item(self, _id):
        try:
            dt = self.data.find_one(self.resource, _id)
            if dt:
                return make_resource_response(self.resource, data=dt)
            else:
                return NotFoundException(
                    'RG_404', message='Resource not found', data=dt)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=e.to_primitive())

    def create(self):
        try:
            data = request.json or request.form.to_dict()
            if session.get("AUTH_FIELD"):
                data["userId"] = session.get("username")
            model = self.Model(data)
            model.save()
            return make_resource_response(self.resource, model.to_primitive())
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=e.to_primitive())

    def update_item(self, _id):
        try:
            data = request.json or request.form.to_dict()
            data.update(self.return_query(_id))
            model = self.Model(data)
            model.save()
            return make_resource_response(self.resource, model.to_primitive())
        except Exception as e:
            return UnprocessableEntity('RC_400', message="you don't have permission")

    def delete_item(self, _id):
        model = self.Model(self.return_query(_id))
        done = model.delete()
        import logging
        logging.warn("delete item %s" % done)
        if done:
            return Response(status=204)
        else:
            return UnprocessableEntity('RC_400', message='Delete fail')
