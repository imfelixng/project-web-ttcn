from schematics.types import StringType
from foundation.core.schema.model import BaseModel


class View(BaseModel):
    viewID = StringType(required=True)
    questionID = StringType(required=True)
