from base import Base


class TestLogger(Base):
    def test_logger(self):
        from foundation.common.log import getLogger
        logger = getLogger('test_logger')
        assert logger.name == 'test_logger'
