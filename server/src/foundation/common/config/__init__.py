import importlib


def module_to_dict(module):
    context = {}
    for setting in dir(module):
        if setting.isupper():
            context[setting] = getattr(module, setting)

    return context


def getConfig(name):
    try:
        module = importlib.import_module(name + '.defaults')
        config = module_to_dict(module)
        return config
    except Exception as e:
        import logging as logger
        logger.info(e)
        return {}
