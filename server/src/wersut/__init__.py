from flask import Flask, request
from wersut import blog
from wersut import user_system
from wersut.modules.reuse import Object_API
from wersut.schema import schema_car, schema_post, schema_comment, schema_dog
from wersut.utils import return_request_data
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
car = Object_API("car", schema_car)
comment = Object_API("comment", schema_comment, "/post/<postId>")
post = Object_API("post", schema_post)
dog = Object_API("dog", schema_dog)
app.register_blueprint(user_system.blueprint)
app.register_blueprint(car.getBlueprint())
app.register_blueprint(comment.getBlueprint())
app.register_blueprint(post.getBlueprint())
app.register_blueprint(dog.getBlueprint())
app.config.from_object("wersut.config.ProductionConfig")


@app.route('/', methods=['POST'])
def index():
    data = return_request_data()
    return str((data))
