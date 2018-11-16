from pymongo import MongoClient
from bson import ObjectId
from foundation.common.log import getLogger
from flask import session
import logging
logger = getLogger(__name__)


class MongoInterface(object):
    # client = MongoClient('mongodb://localhost:27017/')
    def __init__(self):
        self.client = MongoClient(
            'mongodb://data:chritsmasgood12@ds143971.mlab.com:43971/nvphu1306')
        # self.client = MongoClient()

    @property
    def db(self, dbname="nvphu1306"):
        return self.client[dbname]

    def datasource(self, resource, query=None):
        source = self.db[resource]
        if query is None:
            query = {}
        if session.get("AUTH_FIELD") and resource != "user":
            query["userID"] = session.get("userID")
        return (source, query)

    def find_one(self, resource, ID):
        # source, query = self.datasource(resource, ID=ID)
        source = self.db[resource]
        query = {resource + "ID": ID}
        data = source.find_one(query)
        return data

    def find(self, resource, query=None):
        source = self.db[resource]
        query = {}
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
        logging.warn("update by another user %s" % data)
        return data

    def delete_one(self, resource, ID):
        query = {resource + "ID": ID}
        source, query = self.datasource(resource, query)
        if source.find_one(query) is None:
            return False
        resp = source.delete_one(query)
        return True

    def check(self, resource, query=None):
        if self.db[resource].find_one(query) is not None:
            return True
        else:
            return False

    def find_embedded_id(self, source, dist, _id, localField, foreignField):
        h = self.db[source].aggregate([
            {
                "$lookup":
                {
                    "from": dist,
                    "localField": localField,
                    "foreignField": foreignField,
                    "as": dist
                }
            },
            {"$match": {"_id": ObjectId(_id)}},
        ])
        return h

    def find_embedded(self, source, dist, _id, localField, foreignField):
        h = self.db[source].aggregate([
            {
                "$lookup":
                {
                    "from": dist,
                    "localField": localField,
                    "foreignField": foreignField,
                    "as": dist
                }
            },
            {"$match": {localField: _id}},
            {"$project": {"password": 0}}
        ])
        return h
