from flask import request, session
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
            pipeline = [
                {
                    "$match": {}
                },
                {
                    "$project": {
                        "_id": 0,
                        "_updated": 0,
                        "_etag": 0,
                        "_created": 0
                    }
                }
            ]
            data = self.data.aggregate(self.resource, pipeline)
            return make_resource_response("resource", list(data))
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def get_item(self, ID):
        try:
            dt = self.data.find_one(self.resource, ID=ID)
            if dt:
                return make_resource_response(self.resource, data=dt)
            else:
                return NotFoundException(
                    'RG_404', message='Resource not found', data=dt)

        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def create(self):
        try:
            data = request.json or request.form.to_dict()
            if session.get("AUTH_FIELD") and self.resource != "category":
                data["userID"] = session.get("userID")

            model = self.Model(data)
            resp = model.save()
            return make_resource_response(self.resource, resp)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def update_item(self, ID):
        try:
            data = request.json or request.form.to_dict()
            data['_updated'] = datetime.datetime.now() + \
                datetime.timedelta(hours=7)
            query = self.return_query(ID)
            if session.get("AUTH_FIELD") and self.resource != "user":
                query["userID"] = session.get("userID")

            self.data.find_one_and_update(self.resource,
                                          query, {'$set': data})
            resp = self.data.find_one(self.resource, ID=ID)

            return make_resource_response(self.resource, resp)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    def delete_item(self, ID):
        done = self.data.delete_one(self.resource, ID=ID)
        if self.resource == "question":
            self.data.delete_many('comment', {"questionID": ID})
        if done:
            resp = {
                "status": 204,
                "description": "ok"
            }
            return make_resource_response("resource", resp)
        else:
            raise UnprocessableEntity(
                'RC_400', message="Delete fail, you don't have permission")
