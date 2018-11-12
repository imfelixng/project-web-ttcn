from .schema import Question
from foundation.core.api.helper import make_resource_response


def __setup__(module):
    module.resource("question", Question)

    @module.endpoint("/question/<_id>/comment", methods=["GET"])
    def getAllComments(_id):
        data = module.data.find_embedded(
            "question", "comment", _id, "_id", "questionId")
        return make_resource_response("resource", list(data))

    @module.endpoint("/user/<userId>/question", methods=["GET"])
    def getAllQuestion(userId):
        data = module.data.find_embedded_user(
            "user", "question", userId, "username", "userId")
        return make_resource_response("resource", list(data))
