import logging
import coloredlogs


def getLogger(name, **kwargs):
    coloredlogs.install(
        level='INFO',
        fmt='%(asctime)s %(filename)15s %(name)9s[%(process)d] %(levelname)s %(message)s',
    )
    logger = logging.getLogger(name)
    return logger
