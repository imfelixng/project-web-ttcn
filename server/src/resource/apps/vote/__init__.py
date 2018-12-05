from .schema import Vote, Unvote
from flask import request, session
from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response


def vote_or_unvote(module, model, data, update, query, collection):
    data["userID"] = session.get("userID")
    model = model(data)
    model.save()

    userID = module.data.update(collection, query, update)["userID"]
    query = {"userID": userID}
    module.data.update("user", query, update)

    return make_resource_response("resource", model.to_primitive())


def __setup__(module):
    module.resource("votes", Vote)
    module.resource("unvotes", Unvote)

    @module.endpoint("/questions/<questionID>/votes", methods=["POST"])
    @module.login_required
    def question_vote(questionID):
        try:
            data = request.json
            data["questionID"] = questionID
            update = {"$inc": {"votes": 1}}
            query = {"questionID": questionID}
            return vote_or_unvote(module, Vote, data, update, query, "question")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/unvotes", methods=["POST"])
    @module.login_required
    def question_unvote(questionID):
        try:
            data = request.json
            data["questionID"] = questionID
            update = {"$inc": {"unvotes": 1}}
            query = {"questionID": questionID}
            return vote_or_unvote(module, Unvote, data, update, query, "question")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/votes", methods=["POST"])
    @module.login_required
    def comment_vote(commentID):
        try:
            data = request.json
            data["commentID"] = commentID
            update = {"$inc": {"votes": 1}}
            query = {"commentID": commentID}
            return vote_or_unvote(module, Vote, data, update, query, "comment")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/unvotes", methods=["POST"])
    @module.login_required
    def comment_unvote(commentID):
        try:
            data = request.json
            data["commentID"] = commentID
            update = {"$inc": {"unvotes": 1}}
            query = {"commentID": commentID}
            return vote_or_unvote(module, Unvote, data, update, query, "comment")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
