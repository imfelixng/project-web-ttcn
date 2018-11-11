from foundation.core.schema.model import BaseModel
from schematics.types import StringType, ListType


class Question(BaseModel):
    title = StringType(required=True)
    content = StringType(required=True)
    image = StringType()
    tag = ListType(StringType)
    category = ListType(StringType)
    views = ListType(StringType)
    userId = StringType()
    likes = ListType(StringType)
