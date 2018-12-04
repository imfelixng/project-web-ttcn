from flask import request, Response, session
from foundation.core.exceptions import UnprocessableEntity, NotFoundException
from .helper import make_resource_response
import datetime


class BaseAPI:
    def __init__(self, datalayer, model):
        self.Model = model
        self.data = datalayer
        self.resource = self.Model.RI()

    def return_query(self, ID):
        query = {self.resource + "ID": ID}
        return query

    def get(self, query=None):
        data = self.data.find(self.resource, query)
        data = list(data)
        for i in data:
            del i["_id"]
        return make_resource_response(self.resource, data)

    def get_aggregate(self):
        try:
            project = {
                "_id": 0,
                "_updated": 0,
                "_etag": 0,
                "_created": 0
            }
            data = self.data.aggregate(self.resource, {}, project)
            return make_resource_response("resource", list(data))
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=e.to_primitive())

    def get_item(self, ID):
        try:
            dt = self.data.find_one(self.resource, ID)
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
                data["userID"] = session.get("userID")
            model = self.Model(data)
            model.save()
            return make_resource_response(self.resource, model.to_primitive())
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def update_item(self, ID):
        try:
            data = request.json or request.form.to_dict()
            data['_updated'] = datetime.datetime.now()
            query = self.return_query(ID)
            if session.get("AUTH_FIELD") and self.resource != "user":
                query["userID"] = session.get("userID")
            result = self.data.db[self.resource].find_one_and_update(
                query, {'$set': data})["_id"]
            resp = self.data.db[self.resource].find_one(
                {"_id": result})
            return make_resource_response(self.resource, resp)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def delete_item(self, ID):
        done = self.data.delete_one(self.resource, ID)
        if done:
            resp = {
                "status": 204,
                "description": "ok"
            }
            return make_resource_response("resource", resp)
        else:
            raise UnprocessableEntity(
                'RC_400', message="Delete fail, you don't have permission")
