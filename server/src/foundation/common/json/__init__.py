import simplejson as json


class MongoEncoder(json.JSONEncoder):
    def default(self, o):
        try:
            value = json.JSONEncoder.default(self, o)
        except Exception as e:
            value = str(o)

        return value


def bson_dumps(data):
    return json.dumps(data, cls=MongoEncoder)
