import functools
from flask import Blueprint, request, g, session
from wersut.user_system.authAPI import users, User
from wersut.utils import make_error, return_request_data, Utils
from datetime import datetime, timedelta
import jwt
from wersut.config import JWTConfig


blueprint = Blueprint('user', __name__, url_prefix='/user')


@blueprint.before_app_request
def load_logged_in_user():
    g.user = None
    jwt_token = request.headers.get('Authorization', None)
    if jwt_token:
        try:
            payload = jwt.decode(jwt_token, JWTConfig.JWT_SECRET,
                                 algorithms=[JWTConfig.JWT_ALGORITHM])
        except (jwt.DecodeError, jwt.ExpiredSignatureError):
            return make_error(status=400, description="Token is invalid")

        g.user = payload["username"]
        session["username"] = payload["username"]


def login_required(view):
    @functools.wraps(view)
    def wrapped_view(**kwargs):
        if g.user is None:
            return make_error(status=400, description="You have to login")

        return view(**kwargs)

    return wrapped_view


blueprint.add_url_rule("/", "create", User.create, methods=["POST"])


blueprint.add_url_rule(
    "/", "update", login_required(User.update), methods=["PATCH"])


@blueprint.route('/login', methods=["POST"])
def login():
    session.clear()
    request_data = return_request_data()
    if not request_data.get("username", None):
        return make_error(400, description="[username] is required.")

    if not request_data.get("password", None):
        return make_error(400, description="[password] is required.")

    if users.find_one({"username": request_data.get('username')}) is None:
        return make_error(400, description="Username is not exist, please choose another.")

    if users.find_one({"password": request_data.get('password')}) is None:
        return make_error(400, description="password is wrong")

    data_user = users.find_one({"username": request_data.get("username")})
    payload = {
        "username": request_data.get("username"),
        "exp": datetime.utcnow() + timedelta(seconds=JWTConfig.JWT_EXP_DELTA_SECONDS)
    }
    jwt_token = jwt.encode(payload, JWTConfig.JWT_SECRET,
                           JWTConfig.JWT_ALGORITHM)
    return Utils.return_jsonify({'token': jwt_token.decode('utf-8')})
