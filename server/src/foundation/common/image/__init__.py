import base64


def save_image(base, filepath):
    imgdata = base64.b64decode(base)
    with open(filepath, 'wb') as f:
        f.write(imgdata)
