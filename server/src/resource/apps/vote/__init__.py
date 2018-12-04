from .schema import Vote, Unvote
from flask import request, session
from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response
import logging


def vote_or_unvote(module, model, questionID, options):
    data = request.json
    data["questionID"] = questionID
    data["userID"] = session.get("userID")

    model = model(data)
    model.save()
    userID = module.data.update("question", questionID, {
                                "$inc": {options: 1}})["userID"]
    module.data.update("user", userID, {"$inc": {options[:-1]: 1}})
    return make_resource_response("resource", model.to_primitive())


def __setup__(module):
    module.resource("votes", Vote)
    module.resource("unvotes", Unvote)

    @module.endpoint("/questions/<questionID>/votes", methods=["POST"])
    @module.login_required
    def question_vote(questionID):
        try:
            return vote_or_unvote(module, Vote, questionID, "votes")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=e.to_primitive())

    @module.endpoint("/questions/<questionID>/unvotes", methods=["POST"])
    @module.login_required
    def question_unvote(questionID):
        try:
            return vote_or_unvote(module, Unvote, questionID, "unvotes")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/votes", methods=["POST"])
    @module.login_required
    def comment_vote():
        pass

    @module.endpoint("/comments/<commentID>/unvotes", methods=["POST"])
    @module.login_required
    def comment_unvote():
        pass
