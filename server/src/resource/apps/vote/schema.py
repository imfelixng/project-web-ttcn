from schematics.types import StringType, ListType, DictType
from foundation.core.schema.model import BaseModel


class Vote(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    voteID = StringType(required=True)


class Unvote(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    unvoteID = StringType(required=True)
