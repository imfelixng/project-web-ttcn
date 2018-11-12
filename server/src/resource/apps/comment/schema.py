from schematics.types import StringType
from foundation.core.schema.model import BaseModel


class Comment(BaseModel):
    userId = StringType()
