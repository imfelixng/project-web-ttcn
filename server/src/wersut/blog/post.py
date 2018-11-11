from flask import request, session
from wersut.helper.dbbase import Post
from wersut.modules.reuse import Object_API
from wersut.utils import Utils, return_request_data
import datetime
from bson import ObjectId
from wersut.user_system import login_required
from .base import blueprint


blueprint.add_url_rule("/post", "post_list", Post.get_list, methods=["GET"])


blueprint.add_url_rule(
    "/post", "post", login_required(Post.create), methods=["POST"])


blueprint.add_url_rule("/post/<postId>", "get_item",
                       Post.get_item, methods=["GET"])


blueprint.add_url_rule("/post/<postId>", "post_delete",
                       login_required(Post.delete_item), methods=["delete"])


blueprint.add_url_rule('/post/<_id>', "post_edit",
                       login_required(Post.update), methods=['PATCH'])
