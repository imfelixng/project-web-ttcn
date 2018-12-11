from pymongo import MongoClient
from bson import ObjectId
from foundation.common.log import getLogger
from flask import session
import logging
import datetime


logger = getLogger(__name__)


class MongoInterface(object):
    current = None

    def __init__(self, HOST=None, PORT=None, DB=None, USER=None, PASSWORD=None):
        # self.client = MongoClient('mongodb://localhost:27017/')
        # self.client = MongoClient(
            # "mongodb://data:chritsmasgood12@ds143971.mlab.com:43971/nvphu1306")

        logger.warning("Init MongoInterface")

        if MongoInterface.current is None:
            conn_str = 'mongodb://%s:%s/%s' % (HOST, PORT, DB)
            self.client = MongoClient(conn_str)
            MongoInterface.current = self.client
        else:
            MongoInterface.client = self.current

        self.mongodb = "nvphu1306"

    @property
    def db(self):
        return self.client[self.mongodb]

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
        if query is None:
            query = {}
        data = source.find(query).sort("_updated", -1)
        return data

    def insert_one(self, resource, data):
        source, _ = self.datasource(resource)
        resp = source.insert_one(data).inserted_id
        return source.find_one({"_id": ObjectId(resp)})

    def find_one_and_update(self, resource, query, update):
        source = self.db[resource]
        data = source.find_one_and_update(query, update)
        return data

    def update_one(self, resource, _id, update, **kwargs):
        if not isinstance(_id, ObjectId):
            _id = ObjectId(_id)
        source, query = self.datasource(resource, {'_id': _id})
        data = source.update_one(query, update, **kwargs)
        logging.warn("update by another user %s" % data)
        return data

    def update(self, resource, query, updates, **kwargs):
        logging.warn("update before %s" % updates)
        if not updates.get("$set"):
            updates["$set"] = {
                "_updated": datetime.datetime.now() +
                datetime.timedelta(hours=7)}
        else:
            updates["$set"].update({
                "_updated": datetime.datetime.now() +
                datetime.timedelta(hours=7)})
        logging.warn("update after%s" % updates)
        source = self.db[resource]
        data = source.find_one_and_update(query, updates, **kwargs)
        return data

    def delete_one(self, resource, ID):
        query = {resource + "ID": ID}
        source, query = self.datasource(resource, query)
        if source.find_one(query) is None:
            return False
        resp = source.delete_one(query)
        return True

    def check_exist(self, resource, query=None):
        logging.warn("resource %s" % resource)
        if self.db[resource].find_one(query) is not None:
            return True
        else:
            return False

    def aggregate(self, resource, pipeline):
        h = self.db[resource].aggregate(
            pipeline
        )
        return h

    def find_embedded(self, resource, dist, _id, localField, foreignField):
        h = self.db[resource].aggregate([
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

    def find_aggregate(self, resource, lookup, query, project):
        h = self.db[resource].aggregate([
            {
                "$lookup": lookup
            },
            {
                "$match": query
            },
            {
                "$project": project
            }
        ])
        return h
