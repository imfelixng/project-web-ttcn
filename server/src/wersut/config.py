

class Config(object):
    DEBUG = True
    DEVELOPMENT = True
    SECRET_KEY = 'dev'
    MONGO_HOST = "localhost"
    MONGO_PORT = 27017


class ProductionConfig(Config):
    SECRET_KEY = 'deva'
    JWT_ALGORITHM = 'HS256'


class JWTConfig():
    JWT_SECRET = 'b35ce0cca2f74fe70dde81b5ef58170341d40dbc1e20b6ba'
    JWT_ALGORITHM = 'HS256'
    JWT_EXP_DELTA_SECONDS = 10000
