schema_user = {
    "username": {"type": "string", "required": True, "empty": False},
    "password": {"type": "string", "required": True, "empty": False},
    "firstname": {"type": "string", "required": True, "empty": False},
    "lastname": {"type": "string", "required": True, "empty": False},
    "birthday": {"type": "string"},
}

schema_post = {
    "title": {"type": "string", "required": True, "empty": False},
    "content": {"type": "string", "required": True, "empty": False},
    "user": {"type": "string"}
}

schema_comment = {
    "content": {"type": "string", "required": True, "empty": False}
}

schema_car = {
    "name": {"type": "string"},
    "branch": {"type": "string"}
}

schema_dog = {
    "name": {"type": "string"},
}