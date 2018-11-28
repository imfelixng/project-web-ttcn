from schematics.types import StringType, DictType, IntType, ModelType, ListType
from foundation.core.schema.model import BaseModel
from schematics.models import Model


class Tags(Model):
    name = StringType()
    id = StringType()


class Test(BaseModel):
    name = StringType(required=True)
    userID = StringType()
    tag = ModelType(Tags)
    listtag = ListType(ModelType(Tags))
