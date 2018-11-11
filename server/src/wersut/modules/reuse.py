from flask import Blueprint
from wersut.helper.baseAPI import BaseAPI
from wersut.user_system import login_required


class Object_API(BaseAPI):
    def __init__(self, name, schema, extra=""):
        self.name = name
        self.blueprint = Blueprint(
            self.name, __name__, url_prefix=extra + "/" + self.name)
        self.collection = name + "s"
        self.schema = schema
        self.add_resources()

    def getCollection(self):
        return self.collection

    def getBlueprint(self):
        return self.blueprint

    def getblue_name(self):
        return self.name

    def getName(self):
        return self.name

    def add_resources(self):
        self.blueprint.add_url_rule(
            "/<_id>", "_get_item_%s" % self.name,
            (self.get_item), methods=["GET"])

        self.blueprint.add_url_rule(
            "/", "_get_list_%s" % self.name, self.get_list, methods=["GET"])

        self.blueprint.add_url_rule(
            "/", "_create_%s" % self.name,
            (self.create), methods=["POST"])

        self.blueprint.add_url_rule(
            "/<_id>", "_delete_%s" % self.name,
            (self.delete_item), methods=["delete"])

        self.blueprint.add_url_rule(
            "/<_id>", "_update_%s" % self.name,
            (self.update), methods=["PATCH"])
