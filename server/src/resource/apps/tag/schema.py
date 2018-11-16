from schematics.types import StringType
from foundation.core.schema.model import BaseModel


class Tag(BaseModel):
    tagID = StringType(required=True)
    name = StringType(required=True)
