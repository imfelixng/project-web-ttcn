from schematics.types import *
from foundation.core.schema.model import BaseModel


class User(BaseModel):
    class Options:
        serialize_when_none = True

    userID = StringType(required=True)
    fullname = StringType(required=True)
    avatar = StringType()
    categories = ListType(StringType, default=[])
    tags = ListType(StringType, default=[])
    follow = ListType(StringType)
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    password = StringType(required=True)
    email = EmailType(required=True)
    username = StringType()
    saveQuestions = ListType(StringType, default=[])


class Category(BaseModel):
    categoryID = StringType(required=True)
    name = StringType(required=True)


class Tag(BaseModel):
    id = StringType(required=True)
    text = StringType(required=True)
    tagID = StringType(required=True)


class Comment(BaseModel):
    class Options:
        serialize_when_none = True

    commentID = StringType(required=True)
    userID = StringType(required=True)
    questionID = StringType(required=True)
    content = JsonString(required=True)
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    images = ListType(JsonString)
    replies = ListType(JsonString)


class Notification(BaseModel):
    class Options:
        serialize_when_none = True

    notificationID = StringType(required=True)
    senderID = StringType(required=True)
    receiverID = StringType(required=True)
    questionID = StringType(required=True)
    commentID = StringType(required=True)
    message = StringType(required=True)
    link = StringType()


class Question(BaseModel):
    class Options:
        serialize_when_none = True

    title = StringType(required=True)
    summaryContent = StringType(required=True, default="")
    questionID = StringType(required=True)
    content = JsonString(required=True)
    images = ListType(JsonString(),)
    topComment = JsonString()
    categoryID = StringType()
    userID = StringType(required=True)
    tags = ListType(JsonString())
    votes = IntType(default=0)
    unvotes = IntType(default=0)
    views = IntType(default=0)
    comments = IntType(default=0)
    userFollows = ListType(StringType, default=[])


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
