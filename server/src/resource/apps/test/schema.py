from schematics.types import StringType, DictType, IntType, ModelType, ListType
from foundation.core.schema.model import BaseModel
from schematics.models import Model


class Test(BaseModel):
    name = StringType(required=True)
    userID = StringType()
