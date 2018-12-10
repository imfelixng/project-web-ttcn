from .schema import VoteQuestion, UnvoteQuestion, VoteComment, UnvoteComment
from flask import request, session
from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response


def vote_or_unvote(module, model, data, query, collection):
    data["userID"] = session.get("userID")

    if model.RI().find("vote") > 0:
        update = {"$inc": {"unvotes": 1}}
    else:
        update = {"$inc": {"votes": 1}}

    model = model(data)
    resp = model.save()

    userID = module.data.update(collection, query, update)["userID"]
    query = {"userID": userID}
    module.data.update("user", query, update)

    return make_resource_response("resource", resp)


def isVote_or_isUnvote(module, Vote, Unvote, query):
    data = {
        "status": 200,
        "isVote": False,
        "isUnvote": False
    }
    if module.data.check_exist(Vote.RI(), query):
        data["isVote"] = True
    if module.data.check_exist(Unvote.RI(), query):
        data["isUnvote"] = True
    return make_resource_response("votes", data)


def __setup__(module):
    module.resource("votesQ", VoteQuestion)
    module.resource("unvotesQ", UnvoteQuestion)
    module.resource("votesC", VoteComment)
    module.resource("unvotesC", UnvoteComment)

    @module.endpoint("/questions/<questionID>/votes", methods=["POST"])
    @module.login_required
    def question_vote(questionID):
        try:
            data = request.json
            data["questionID"] = questionID
            query = {"questionID": questionID}
            return vote_or_unvote(module, VoteQuestion,
                                  data, query, "question")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/isvote_isunvote",
                     methods=["GET"])
    @module.login_required
    def isvote_isunvote_question(questionID):
        try:
            query = {
                "userID": session.get("userID"),
                "questionID": questionID
            }
            return isVote_or_isUnvote(module, VoteQuestion,
                                      UnvoteQuestion, query)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/isvote_isunvote",
                     methods=["GET"])
    @module.login_required
    def isvote_isunvote_comment(commentID):
        try:
            query = {
                "userID": session.get("userID"),
                "commentID": commentID
            }
            return isVote_or_isUnvote(module, VoteComment,
                                      UnvoteComment, query)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/unvotes", methods=["POST"])
    @module.login_required
    def question_unvote(questionID):
        try:
            data = request.json
            data["questionID"] = questionID
            query = {"questionID": questionID}
            return vote_or_unvote(module, UnvoteQuestion, data,
                                  query, "question")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/votes", methods=["POST"])
    @module.login_required
    def comment_vote(commentID):
        try:
            data = request.json
            data["commentID"] = commentID
            query = {"commentID": commentID}
            return vote_or_unvote(module, VoteComment, data,
                                  query, "comment")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/comments/<commentID>/unvotes", methods=["POST"])
    @module.login_required
    def comment_unvote(commentID):
        try:
            data = request.json
            data["commentID"] = commentID
            query = {"commentID": commentID}
            return vote_or_unvote(module, UnvoteComment, data,
                                  query, "comment")
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
