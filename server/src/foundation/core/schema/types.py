from schematics.types import BaseType
from schematics.exceptions import ValidationError
from bson import ObjectId


class MongoID(BaseType):
    def to_native(self, value, *args):
        return ObjectId(value)

    def to_primitive(self, value, *args):
        return str(value)

    def validate__id(self, value):
        if not isinstance(value, ObjectId):
            raise ValidationError('Value must be an instance of ObjectId')
