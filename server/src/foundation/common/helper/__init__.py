from pprint import pprint


def update_top_commment(module, ID):
    query = {
        "questionID": ID
    }
    pipeline = [
        {
            "$match": query
        },
        {
            "$project": {
                "sub": {
                    "$divide": [
                        {
                            "$sum": [
                                {
                                    "$subtract": [
                                        "$votes", "$unvotes"
                                    ]
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
                },
                "commentID": 1, "userID": 1, "questionID": 1,
                "content": 1, "votes": 1, "unvotes": 1,
                "images": 1, "replies": 1, "_etag": 1,
                "_updated": 1, "_created": 1
            }
        },
        {
            "$sort": {
                "sub": -1
            }
        },
        {
            "$limit": 1
        }]
    top_comment = list(module.data.aggregate("comment", pipeline))[0]
    del top_comment["sub"]
    update = {
        "$set": {
            "topComment": top_comment
        }
    }
    module.data.update("question", query, update)
    pprint(top_comment)
