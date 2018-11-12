from .schema import User
from foundation.core.api.helper import make_error, make_resource_response
from flask import request, session, Response
import json


def __setup__(module):
    module.resource("user", User)

    @module.endpoint("/register", methods=["POST"])
    def register():
        data = request.json or request.form.to_dict()
        if module.data.check("user", {"username": data.get("username")}):
            return make_error(400, description="Username is exist")
        if module.data.check("user", {"email": data.get("email", None)}):
            return make_error(400, description="email is exist")
        model = User(data)
        model.save()
        return make_resource_response("resource", model.to_primitive())

    @module.endpoint("/login", methods=["POST"])
    def login():
        dt = request.json or request.form.to_dict()
        if not module.data.check("user", {"username": dt.get("username")}):
            return make_error(400, description="Username is wrong")
        if not module.data.check("user", {"username": dt.get("password")}):
            return make_error(400, description="password is wrong")
        session["username"] = dt.get("username")
        data_response = {
            "status": 200,
            "description": "ok"
        }
        return Response(response=json.dumps(data_response), status=200, content_type='application/json')

    @module.endpoint("/logout", methods=["GET"])
    def logout():
        session.clear()
        data_response = {
            "status": 200,
            "description": "ok"
        }
        return Response(response=json.dumps(data_response), status=200, content_type='application/json')
