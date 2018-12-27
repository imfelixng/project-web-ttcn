import datetime
from uuid import uuid4
from bson import ObjectId
from schematics.models import Model
from schematics.types import StringType, DateTimeType
from foundation.core.datalayer import MongoInterface
from foundation.core.schema.types import MongoID
from .helpers import CamelCase2Snake
import logging


class BaseModel(Model, MongoInterface):
    _id = MongoID(serialize_when_none=False)
    _etag = StringType()
    _updated = DateTimeType(
        default=(datetime.datetime.now() + datetime.timedelta(hours=7)))
    _created = DateTimeType(
        default=(datetime.datetime.now() + datetime.timedelta(hours=7)))

    class Options:
        serialize_when_none = False

    def __init__(self, data=None):
        MongoInterface.__init__(self)
        if data:
            if data.get('_id'):
                resp = self.find_one(self.RI(), data.get('_id'))
                if resp:
                    resp.update(data)
                else:
                    resp = data
                super(BaseModel, self).__init__(resp)
            else:
                super(BaseModel, self).__init__(data)
        else:
            super(BaseModel, self).__init__()

    @classmethod
    def RI(cls):
        return CamelCase2Snake(cls.__name__)

    def save(self):
        _id = self.get('_id') or ObjectId()

        self['_id'] = _id
        # self['_updated'] = datetime.datetime.now()

        # self.validate()

        data = self.to_native()
        if data.get('_etag', None):
            del data['_created']

        data['_etag'] = uuid4().hex
        self['_etag'] = data['_etag']
        # self.update_one(self.RI(), _id, {'$set': data}, upsert=True)
        self.insert_one(self.RI(), data)
        logging.warn("data in save %r", data)
        return data

    def delete(self):
        return self.delete_one(self.RI(), self._id)
