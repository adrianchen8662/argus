from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import json

import logupdate
import constants

app = Flask(__name__)
CORS(app)

# TODO: fix cors issue

class StatusLogs(Resource):
    def get(self):
        listout = logupdate.getLogs()
        return listout, 200


class Status(Resource):
    def get(self):
        listout = logupdate.getStatus()
        return listout, 200


@app.route("/jsonexample", methods=["POST"])
def jsonexample():
    request_data = request.get_json(force=True)
    print(request_data)
    address = request_data.get("address")
    port = request_data.get("port")
    password = request_data.get("password")
    logupdate.editConnectSettings(address, port, password)
    return "", 200


api = Api(app)
api.add_resource(StatusLogs, "/statuslogs")
api.add_resource(Status, "/status")

app.run()
