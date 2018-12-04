from .schema import User
from foundation.core.api.helper import make_error, make_resource_response
from foundation.core.exceptions import UnprocessableEntity
from flask import request, session

import logging as logger


def __setup__(module):
    module.resource("users", User)

    @module.endpoint("/signup", methods=["POST"])
    def register():
        try:
            data = request.json or request.form.to_dict()

            query = {"email": data.get("email")}
            database = module.data.db
            if database.user.find_one(query) is not None:
                return make_error(200, description="email is exist")

            model = User(data)
            model.save()
            data_response = {
                "status": 200,
                "description": "ok",
                "userID": data["userID"],
                "isSuccess": True
            }

            return make_resource_response("resource", data_response)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=e.to_primitive())

    @module.endpoint("/signin", methods=["POST"])
    def login():
        try:
            dt = request.json or request.form.to_dict()
            database = module.data.db

            if database.user.find_one({"email": dt.get("email")}) is None:
                return make_error(200, description="Email is wrong")
            if database.user.find_one({"password": dt.get("password")}) is None:
                return make_error(200, description="password is wrong")

            session["userID"] = module.data.db.user.find_one(
                {"email": dt.get("email")})["userID"]
            logger.warning("Session %r", session)
            data_response = {
                "status": 200,
                "description": "ok",
                "userID": session["userID"],
                "isSuccess": True
            }
            return make_resource_response("resource", data_response)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))

    @module.endpoint("/logout", methods=["GET"])
    def logout():
        try:
            session.clear()
            data_response = {
                "status": 200,
                "description": "ok"
            }
            return make_resource_response("resource", data_response)
        except Exception as e:
            raise UnprocessableEntity('RC_400', message=str(e))
