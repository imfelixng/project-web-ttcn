from schematics.types import StringType
from foundation.core.schema.model import BaseModel


class VoteQuestion(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    voteID = StringType(required=True)


class UnvoteQuestion(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    unvoteID = StringType(required=True)


class VoteComment(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    voteID = StringType(required=True)
    commentID = StringType()


class UnvoteComment(BaseModel):
    userID = StringType(required=True)
    questionID = StringType(required=True)
    unvoteID = StringType(required=True)
    commentID = StringType()
