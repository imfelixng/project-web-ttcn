from foundation.common.config import getConfig
from foundation.objectapi import ObjectApiServer
from flask_cors import CORS

config = getConfig(__name__)
MODULES = [
    'resource.apps.auth',
    'resource.apps.question',
    'resource.apps.category',
    'resource.apps.comment',
    'resource.apps.test',
    'resource.apps.vote'
]

app = ObjectApiServer(__name__, config, modules=MODULES, taskapp=None)
CORS(app, supports_credentials=True)
