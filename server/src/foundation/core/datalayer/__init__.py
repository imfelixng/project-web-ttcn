from pymongo import MongoClient
from bson import ObjectId
from foundation.common.log import getLogger
from flask import session

logger = getLogger(__name__)


class MongoInterface(object):
    # client = MongoClient('mongodb://localhost:27017/')
    def __init__(self):
        self.client = MongoClient(
            'mongodb://data:chritsmasgood12@ds143971.mlab.com:43971/nvphu1306')

    @property
    def db(self, dbname="nvphu1306"):
        return self.client[dbname]

    def datasource(self, resource, query=None):
        source = self.db[resource]
        if query is None:
            query = {}
        if session.get("AUTH_FIELD"):
            query["user"] = session.get("username")
        return (source, query)

    def find_one(self, resource, _id):
        source, query = self.datasource(resource, {'_id': ObjectId(_id)})
        data = source.find_one(query)
        return data

    def find(self, resource, query=None):
        source, query = self.datasource(resource, query)
        data = source.find(query)
        return data

    def insert_one(self, resource, data):
        source, _ = self.datasource(resource)
        return source.insert_one(data).inserted_id

    def update_one(self, resource, _id, update, **kwargs):
        if not isinstance(_id, ObjectId):
            _id = ObjectId(_id)
        source, query = self.datasource(resource, {'_id': _id})
        data = source.update_one(query, update, **kwargs)
        return data

    def delete_one(self, resource, _id):
        source, query = self.datasource(resource, {'_id': ObjectId(_id)})
        resp = source.delete_one(query)
        return resp.acknowledged
