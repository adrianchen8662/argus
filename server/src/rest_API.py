from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
import time
import re
import requests
from json import load
import json
import collections

import constants
import filemanagement
import decrypt
import categorize

app = Flask(__name__)
CORS(app)

# app = Flask(__name__)
api = Api(app)


# returns the entire metadata log
class getStatusLogs(Resource):  # /getstatuslogs
    def get(self):
        return_dict = {}
        list_of_keys = list(filemanagement.getListOfKeysFromDatabase())
        for i in range(len(list_of_keys)):
            list_of_keys[i] = list_of_keys[i].decode("utf-8")
        for key in list_of_keys:
            return_dict[key] = filemanagement.getMetadataFromDatabase(key)
            
        ordered_dict = collections.OrderedDict(sorted(return_dict.items()))
        return ordered_dict, 200


# gets the connection status of doorbell and server
class getStatus(Resource):  # /getstatus
    def get(self):
        # Test Compreface connection
        return_dict = {}
        try:
            categorize.testConnectiontoCompreface()
        except:
            return_dict["Compreface"] = False
        else:
            return_dict["Compreface"] = True
        # Test Database connection
        try:
            filemanagement.testConnectionToDatabase()
        except:
            return_dict["Database"] = False
        else:
            return_dict["Database"] = True
        # Test Doorbell connection
        config = load(open(constants.DOORBELL_SETTINGS_PATH))
        address = config["Connection Settings"][0]["Host"]
        port_number = config["Connection Settings"][1]["Port"]
        url = "http://" + address + ":" + port_number + "/testconnection"
        try:
            requests.get(url, timeout=1)  # timeout so no infinite loop
        except:
            return_dict["Doorbell"] = False
        else:
            return_dict["Doorbell"] = True
        
        return return_dict, 200


# BUG: allows for the same exact image to be posted onto a member. Not a critical bug, as it doesn't affect much, but might cause issues with storage
# assigns a family member based on the timestamp
class assignFamilyToImage(
    Resource
):  # /assignfamilytoimage?timestamp=<timestamp>&member=<name>
    def post(self):
        timestamp = (request.args).get("timestamp")
        member = (request.args).get("member")
        categorize.addToFaceCollection(
            constants.DATA_STORAGE_FOLDER_PATH + (timestamp) + ".jpg", member
        )
        return "Ok", 200


class removeFamilyInImage(Resource):
    def post(self):
        timestamp = (request.args).get("timestamp")
        compreface_uuid = filemanagement.getComprefaceUuidFromDatabase(timestamp)
        if compreface_uuid == None:
            return "Error: timestamp not found", 400
        test = str(categorize.deleteImage(compreface_uuid))
        print(test)
        return "Ok", 200


class changeFamilyInImage(Resource):
    def post(self):
        timestamp = (request.args).get("timestamp")
        member = (request.args).get("member")

        test = categorize.deleteImage()
        print(test)
        test = categorize.addToFaceCollection(
            constants.DATA_STORAGE_FOLDER_PATH + (timestamp) + ".jpg", member
        )
        return "Ok", 200


class getFamilyMemberFrames(Resource):
    def get(self):
        name = (request.args).get("name")
        return_dict = {}
        found_dict = {}
        list_of_keys = list(filemanagement.getListOfKeysFromDatabase())
        for i in range(len(list_of_keys)):
            list_of_keys[i] = list_of_keys[i].decode("utf-8")
        for key in list_of_keys:
            return_dict[key] = filemanagement.getMetadataFromDatabase(key)
        
        for key, value in return_dict.items():
            if name in value:
                found_dict[key] = value
        
        ordered_dict = collections.OrderedDict(sorted(found_dict.items()))
        return ordered_dict, 200
        

# adds a new family member name
class postNewFamilyMember(Resource):  # /postnewfamilymember?name=<name>
    def post(self):
        family_name = (request.args).get("name")
        status = categorize.addFamilyMember(family_name)
        if status.get("code") == 43:
            return "Error: person already exists in family", 400
        return "Ok", 200


# removes a family member
class removeFamilyMember(Resource):
    def post(self):
        family_name = (request.args).get("name")
        if family_name == "":
            return "Error: blank family name", 400
        status = categorize.removeFamilyMember(family_name)
        if status.get("code") == 42:
            return "Error: person does not exist in family", 400
        return "Ok", 200


class getFamilyList(Resource):  # /getfamilylist
    def get(self):
        list = categorize.listFamilyMembers()
        print(list)
        return list, 200


class postRemoveDetected(Resource):  # /removedetected?timestamp=<timestamp>
    def post(self):
        return "ok"


# returns the metadata for a specific file
class getMetadata(Resource):  # /getmetadata?timestamp=<timestamp>
    def get(self):
        return_dict = {}
        timestamp = (request.args).get("timestamp")
        metadata = filemanagement.getMetadataFromDatabase(timestamp)
        if metadata == None:
            return "Error: no entry with given timestamp found", 400
        return_dict[timestamp] = metadata
        return return_dict, 200 # TODO: check what this returns


# gets an image from the doorbell and processes it
class postImage(Resource):  # /postimage
    def post(self):
        file = request.files["image"]
        if file and (file.filename).endswith(".enc"):
            file_bytes = file.read()
            with open(constants.DATA_STORAGE_FOLDER_PATH + (file.filename), "wb") as f:
                f.write(file_bytes)

            decrypt.decode(
                constants.DATA_STORAGE_FOLDER_PATH + (file.filename),
                constants.DATA_STORAGE_FOLDER_PATH
                + (file.filename).split(".")[0]
                + ".jpg",
            )

            local_time = time.ctime(
                int(((file.filename).split(".")[0] + ".jpg").split(".")[0])
            )
            time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[:-1]
            date_to_store = re.sub(constants.TIME_REGEX, "", local_time)

            try:
                recognize_dict = (
                    categorize.recognizeFace(
                        constants.DATA_STORAGE_FOLDER_PATH
                        + (file.filename).split(".")[0]
                        + ".jpg"
                    )
                    .get("result")[0]
                    .get("subjects")[0]
                )
            except:
                # NOTE: add logo detection here
                return "Ok", 200
            else:
                if recognize_dict.get("similarity") < 0.7:
                    filemanagement.addMetadataToDatabase(
                        file.filename.split(".")[0],
                        date_to_store,
                        time_to_store,
                        "Compreface ID Not Found",
                        "None",
                        "Unknown",
                        "1",
                    )
                else:
                    compreface_output = categorize.addToFaceCollection(
                        constants.DATA_STORAGE_FOLDER_PATH
                        + ((file.filename).split(".")[0] + ".jpg"),
                        recognize_dict.get("subject"),
                    )
                    filemanagement.addMetadataToDatabase(
                        file.filename.split(".")[0],
                        date_to_store,
                        time_to_store,
                        "Compreface ID Found",
                        compreface_output.get("image_id"),
                        recognize_dict.get("subject"),
                        recognize_dict.get("similarity"),
                    )

                return "Ok", 200
        else:
            return "Error: unknown or missing file", 400


class postDoorbellSettings(
    Resource
):  # /postdoorbellsettings?address=<address>&port=<port>&password=<password>
    def post(self):
        address = (request.args).get("address")
        port = (request.args).get("port")
        password = (request.args).get("password")

        filemanagement.setDoorbellSettings(address, port, password)

        return "Ok", 200


class postDatabaseSettings(
    Resource
):  # /postdatabasesettings?address=<address>&port=<port>
    def post(self):
        address = (request.args).get("address")
        port = (request.args).get("port")

        filemanagement.setDatabaseSettings(address, port)

        return "Ok", 200


class postComprefaceSettings(
    Resource
):  # /postcomprefacesettings?address=<address>&port=<port>&api_key=<api_key>
    def post(self):
        address = (request.args).get("address")
        port = (request.args).get("port")
        api_key = (request.args).get("api_key")

        filemanagement.setComprefaceSettings(address, port, api_key)

        return "Ok", 200


api.add_resource(getStatusLogs, "/getstatuslogs", endpoint="getStatusLogs")
api.add_resource(getStatus, "/getstatus", endpoint="getStatus")

api.add_resource(
    assignFamilyToImage, "/assignfamilytoimage", endpoint="assignFamilyToImage"
)
'''
api.add_resource(
    removeFamilyInImage, "/removefamilyinimage", endpoint="removeFamilyInImage"
)

api.add_resource(
    changeFamilyInImage, "/changefamilyinimage", endpoint="changeFamilyInImage"
)
'''
api.add_resource(
    getFamilyMemberFrames, "/getfamilymemberframes", endpoint="getFamilyMemberFrames"
)
api.add_resource(
    postNewFamilyMember, "/postnewfamilymember", endpoint="postNewFamilyMember"
)
api.add_resource(
    removeFamilyMember, "/removefamilymember", endpoint="removeFamilyMember"
)
api.add_resource(getFamilyList, "/getfamilylist", endpoint="getFamilyList")

api.add_resource(
    postRemoveDetected, "/postremovedetected", endpoint="postRemoveDetected"
)
api.add_resource(getMetadata, "/getmetadata", endpoint="getMetadata")
api.add_resource(postImage, "/postimage", endpoint="postImage")

api.add_resource(
    postDoorbellSettings, "/postdoorbellsettings", endpoint="postDoorbellSettings"
)
api.add_resource(
    postDatabaseSettings, "/postdatabasesettings", endpoint="postDatabaseSettings"
)
api.add_resource(
    postComprefaceSettings, "/postcomprefacesettings", endpoint="postComprefaceSettings"
)

app.run(host="100.106.18.99", port=5050, debug=True)
