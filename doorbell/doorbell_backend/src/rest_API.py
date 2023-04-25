from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import json

import filemanagement
import constants

app = Flask(__name__)
CORS(app)

class getStatusLogs(Resource):
    def get(self):
        listout = filemanagement.getLogs()
        return listout, 200


class testConnection(Resource):
    def get(self):
        return "Ok", 200


class getStatus(Resource):
    def get(self):
        listout = filemanagement.getStatus()
        return listout, 200


class setConnectSettings(Resource):
    def post(self):
        address = (request.args).get("address")
        port = (request.args).get("port")
        password = (request.args).get("password")
        filemanagement.editConnectSettings(address, port, password)
        # todo: test connection
        return "Ok", 200


api = Api(app)
api.add_resource(StatusLogs, "/getstatuslogs", endpoint="getStatusLogs")
api.add_resource(Status, "/getstatus", endpoint="getStatus")
api.add_resource(
    setConnectSettings, "/setconnectsettings", endpoint="setConnectSettings"
)
api.add_resource(testConnection, "/testconnection", endpoint="testConnection")

app.run()
