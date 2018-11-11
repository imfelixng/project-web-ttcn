from .base import blueprint
from wersut.helper.dbbase import Comment
from wersut.user_system import login_required


blueprint.add_url_rule("/post/<postId>/comment",
                       "comment_of_post", Comment.get_item, methods=["GET"])


blueprint.add_url_rule('/post/<postId>/comment', "comment_create",
                       login_required(Comment.create), methods=['POST'])


blueprint.add_url_rule('/post/<postId>/comment/<comment_id>', "comment_delete",
                       login_required(Comment.delete_item), methods=['delete'])
