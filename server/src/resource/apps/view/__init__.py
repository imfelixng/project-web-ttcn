from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response


def __setup__(module):

    @module.endpoint("/questions/<questionID>/views", methods=["PATCH"])
    def views(questionID):
        try:
            query = {"questionID": questionID}
            update = {"$inc": {"views": 1}}

            module.data.find_one_and_update("question", query, update)
            resp = module.data.find_one("question", questionID)
            return make_resource_response("views", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))
