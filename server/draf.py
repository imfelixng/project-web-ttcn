from pymongo import MongoClient
from pprint import pprint
client = MongoClient()
db = client["mongdo_test"]
coll = db["top"]

# data = {
#     "replies": [
#         "1", "2", "3"
#     ],
#     "votes": 10,
#     "unvote": 9
# }
# coll.insert_one(data)
pipeline = [
    {
        "$match": {}
    },
    {
        "$project": {
            "sub": {
                "$divide": [
                    {
                        "$sum": [
                            {
                                "$subtract": ["$votes", "$unvote"]
                            },
                            {
                                "$multiply": [
                                    {
                                        "$size": "$replies"
                                    },
                                    2
                                ]
                            }
                        ]
                    },
                    3
                ]
            }
        }
    }]
data = coll.aggregate(pipeline)
pprint(list(data))
