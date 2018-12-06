from .schema import View
from flask import request, session
from foundation.core.exceptions import UnprocessableEntity
from foundation.core.api.helper import make_resource_response


def __setup__(module):
    module.resource("views", View)

    @module.endpoint("/questions/<questionID>/views", methods=["POST"])
    @module.login_required
    def views(questionID):
        try:
            data = request.json
            data["userID"] = session.get("userID")
            data["questionID"] = questionID

            model = View(data)
            resp = model.save()

            module.data.update("question", {"questionID": questionID}, {
                               "$inc": {"views": 1}})
            return make_resource_response("views", resp)
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/questions/<questionID>/views", methods=["GET"])
    @module.login_required
    def question_views(questionID):
        try:
            query = {
                "questionID": questionID
            }
            resp = module.data.find("view", query)
            return make_resource_response("views", list(resp))
        except Exception as e:
            raise UnprocessableEntity("RC_400", message=str(e))

    @module.endpoint("/slow", methods=["GET"])
    def slow_test():
        sum = 0
        for i in range(100000000):
            sum += i
        return "Slow request %s" % sum

    @module.endpoint("/fast", methods=["GET"])
    def fast_test():
        sum = 0
        for i in range(10):
            sum += i
        return "Slow request %s" % sum
