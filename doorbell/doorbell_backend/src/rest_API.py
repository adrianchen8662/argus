from flask import Flask
from flask_restful import Resource, Api, reqparse

import logupdate
import constants

class StatusLogs(Resource):
    def get(self):
        listout = logupdate.getLogs()
        return listout, 200

class Status(Resource):
    def get(self):
        listout = logupdate.getLogSimple()
        return listout, 200

if __name__ == "__main__":
    app = Flask(__name__)
    api = Api(app)
    api.add_resource(StatusLogs, '/statuslogs')
    api.add_resource(Status, '/status')
    app.run(debug=True)