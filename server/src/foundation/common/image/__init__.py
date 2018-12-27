import base64
from datetime import datetime
import os


def save_image(module, base, filename):
    filename = "%s_%s" % (
        filename,
        datetime.timestamp(datetime.now())
    )
    path = os.path.join(module.config['PUBLIC_PATH'])
    if not os.path.exists(path):
        os.makedirs(path)
    path = os.path.join(path, filename)
    imgdata = base64.b64decode(base)
    with open(path, 'wb') as f:
        f.write(imgdata)
    return filename


def save_image_base64(module, data):
    for i in range(0, len(data["images"]), 1):
        image_raw = data["images"][i]
        imgString = image_raw["dataURL"][22:]
        filename = image_raw["upload"]["filename"]

        file = "%s_%s" % (
            filename,
            datetime.timestamp(datetime.now())
        )
        data["images"][i]["dataURL"] = "/media/" + file
        path = os.path.join(module.config['PUBLIC_PATH'])
        if not os.path.exists(path):
            os.makedirs(path)
        path = os.path.join(path, file)
        imgdata = base64.b64decode(imgString)
        with open(path, 'wb') as f:
            f.write(imgdata)
    return data
