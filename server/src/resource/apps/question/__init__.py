from .schema import Question
from foundation.core.api.helper import make_resource_response


def __setup__(module):
    module.resource("questions", Question)

    @module.endpoint("/questions/<questionID>/comments", methods=["GET"])
    def getAllComments(questionID):
        data = module.data.find_embedded(
            "question", "comment", questionID, "questionID", "questionID")
        return make_resource_response("resource", list(data))

    @module.endpoint("/users/<userID>/questions", methods=["GET"])
    def getAllQuestion(userID):
        data = module.data.find_embedded(
            "user", "question", userID, "userID", "userID")
        return make_resource_response("resource", list(data))
