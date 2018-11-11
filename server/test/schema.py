from foundation.core.schema import BaseModel
from foundation.common.log import getLogger
from schematics.types import StringType

logger = getLogger(__name__)


class Car(BaseModel):
    name = StringType(required=True)
    branch = StringType()


class TestSchame():
    def test_create(self):
        car = Car({'name': 'Civic', 'branch': 'Honda'})

        assert car.name == 'Civic'
        assert car.branch == 'Honda'

    def test_etag(self):
        car = Car({'name': 'Civic', 'branch': 'Honda'})
        car.save()

        assert car._etag

    def test_save_error(self):
        car = Car({'branch': 'Honda'})
        error = None
        try:
            car.save()
        except Exception as e:
            error = e
        assert error
