from flask import request, session
from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response


def __setup__(module):

    @module.endpoint("/questions/<questionID>/views", methods=["PATCH"])
    def views(questionID):
        try:
            query = {"questionID": questionID}
            resp = module.data.db.question.find_one_and_update(query, {
                "$inc": {"views": 1}})
            resp = module.data.find_one("question", questionID)
            return make_resource_response("views", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    # @module.endpoint("/questions/<questionID>/views", methods=["GET"])
    # def question_views(questionID):
    #     try:
    #         query = {
    #             "questionID": questionID
    #         }
    #         resp = module.data.find("view", query)
    #         return make_resource_response("views", list(resp))
    #     except Exception as e:
    #         raise UnprocessableEntity("RC_400", message=str(e))
