import os


SECRET_KEY = "KERaTjIjgZ5ZFHrRc9r1iFpStKU"
BASE_PATH = os.path.dirname(os.path.dirname(os.path.dirname(
    os.path.dirname(os.path.abspath(__file__)))))

PUBLIC_PATH = os.path.join(BASE_PATH, 'public')
