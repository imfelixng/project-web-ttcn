from schematics.types import StringType
from foundation.core.schema.model import BaseModel
from bson import ObjectId


class Test(BaseModel):
    name = StringType()
    objectID = ObjectId()
