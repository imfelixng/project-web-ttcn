import base64


def save_image(base, filepath):
    imgdata = base64.b64decode(base)
    with open(filepath, 'wb') as f:
        f.write(imgdata)


def save_new_tag(module, raw_tags):
    tags = module.data.find("tag")
    list_tagID = []
    for tag in tags:
        list_tagID.append(tag["tagID"])
