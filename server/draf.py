from pymongo import MongoClient
from pprint import pprint
client = MongoClient()
db = client["mongdo_test"]
# coll = db["toptag"]

# coll.insert_one({

# #     })
pipeline = [

]

pipeline = [
    {
        "$unwind": "$tags"
    },
    {
        "$group": {
            "_id": "$tags.id",
            "count": {
                "$sum": 1
            }
        }
    }
]

data = db.question.aggregate(pipeline)
pprint(list(data))
# pprint(list(db.question.find({})))
