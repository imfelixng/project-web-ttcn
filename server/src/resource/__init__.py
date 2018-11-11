from foundation.common.config import getConfig
from foundation.objectapi import ObjectApiServer
from flask_cors import CORS

config = getConfig(__name__)
MODULES = [
    'resource.apps.student',
    'resource.apps.auth',
    'resource.apps.question',
    'resource.apps.tag',
    'resource.apps.category'
]

app = ObjectApiServer(__name__, config, modules=MODULES, taskapp=None)
CORS(app)
