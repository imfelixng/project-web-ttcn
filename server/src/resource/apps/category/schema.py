from schematics.types import StringType
from foundation.core.schema.model import BaseModel


class Category(BaseModel):
    categoryID = StringType(required=True)
    name = StringType(required=True)
