from flask import Flask, request, Response, jsonify
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
import time
import re
import json

import constants
import filemanagement
import decrypt
import categorize

app = Flask(__name__)
CORS(app)

# TODO: fix cors issue

app = Flask(__name__)
api = Api(app)


# returns the entire metadata log
class getLogs(Resource):  # /getlogs
    def get(self):
        return "ok"


# gets the connection status of doorbell and server
class getStatus(Resource):  # /getstatus
    def get(self):
        return "ok"


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
        compreface_uuid = filemanagement.get_compreface_uuid_from_database(timestamp)
        print(compreface_uuid)
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
        status = categorize.removeFamilyMember(family_name)
        if status.get("code") == 42:
            return "Error: person does not exist in family", 400
        return "Ok", 200


class getFamilyList(Resource):  # /getfamilylist
    def get(self):
        list = categorize.listFamilyMembers()
        return str(list), 200


class postRemoveDetected(Resource):  # /removedetected?timestamp=<timestamp>
    def post(self):
        return "ok"


# returns the metadata for a specific file
class getMetadata(Resource):  # /getmetadata?timestamp=<timestamp>
    def get(self):
        timestamp = (request.args).get("timestamp")
        metadata = filemanagement.get_metadata_from_database(timestamp)
        if metadata == None:
            return "Error: no entry with given timestamp found", 400
        return metadata, 200


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

            # BUG: won't work if there are no faces in the compreface database
            recognize_dict = (
                categorize.recognizeFace(
                    constants.DATA_STORAGE_FOLDER_PATH
                    + (file.filename).split(".")[0]
                    + ".jpg"
                )
                .get("result")[0]
                .get("subjects")[0]
            )

            if recognize_dict.get("similarity") < 0.7:
                # NOTE: add logo detection here
                filemanagement.add_metadata_to_database(
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
                filemanagement.add_metadata_to_database(
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


api.add_resource(getLogs, "/getlogs", endpoint="getLogs")
api.add_resource(getStatus, "/getstatus", endpoint="getStatus")

api.add_resource(
    assignFamilyToImage, "/assignfamilytoimage", endpoint="assignFamilyToImage"
)
# BUG: This does not work. The compreface uuid in filemanagement does not work
"""
api.add_resource(
    removeFamilyInImage, "/removefamilyinimage", endpoint="removeFamilyInImage"
)
"""
# BUG: Same issue as above.
"""
api.add_resource(
    changeFamilyInImage, "/changefamilyinimage", endpoint="changeFamilyInImage"
)
"""
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


app.run()
