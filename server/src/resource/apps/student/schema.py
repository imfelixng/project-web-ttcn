from foundation.core.schema.model import BaseModel
from schematics.types import StringType


class Student(BaseModel):
    name = StringType(required=True)
    classes = StringType(required=True)
    address = StringType(required=True)
