import redis
import cv2  # might need apt-get install libgl1
import numpy as np
import os
import json

import constants

"""
redis cli commands that are helpful

redis-cli --scan --pattern "*"
redis-cli get <KEY>
redis-cli FLUSHDB
"""


def setComprefaceSettings(address, port, api_key):
    with open(constants.DOORBELL_SETTINGS_PATH, "r") as jsonFile:
        data = json.load(jsonFile)
        data["Compreface Settings"][0]["Domain"] = address
        data["Compreface Settings"][1]["Port"] = port
        data["Compreface Settings"][2]["API Key"] = api_key
    with open(constants.DOORBELL_SETTINGS_PATH, "w") as jsonFile:
        json.dump(data, jsonFile, indent=4)


def setDoorbellSettings(address, port, password):
    with open(constants.DOORBELL_SETTINGS_PATH, "r") as jsonFile:
        data = json.load(jsonFile)
        data["Connection Settings"][0]["Host"] = address
        data["Connection Settings"][1]["Port"] = port
        data["Connection Settings"][2]["AES Encryption Password"] = password
    with open(constants.DOORBELL_SETTINGS_PATH, "w") as jsonFile:
        json.dump(data, jsonFile, indent=4)


def setDatabaseSettings(address, port):
    with open(constants.DOORBELL_SETTINGS_PATH, "r") as jsonFile:
        data = json.load(jsonFile)
        data["Connection Settings"][0]["Host"] = address
        data["Connection Settings"][1]["Port"] = port
    with open(constants.DOORBELL_SETTINGS_PATH, "w") as jsonFile:
        json.dump(data, jsonFile, indent=4)


def testConnectionToDatabase():
    r = redis.Redis("127.0.0.1", socket_connect_timeout=1) # TODO: should be changed based on redisdatabasesettings.json
    r.ping()


def addMetadataToDatabase(
    filename, date, time, status, compreface_id, identification, confidence
):
    config = json.load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=0)

    # metadata stored in the python dictionary format
    metadata = (
        "{Filename: "
        + str(filename)
        + ", Date: "
        + str(date)
        + ", Time: "
        + str(time)
        + ", Status: "
        + str(status)
        + ", Compreface ID: "
        + str(compreface_id)
        + ", Identification: "
        + str(identification)
        + ", Confidence: "
        + str(confidence)
        + "}"
    )

    redis_metadata.set(filename, metadata)


def getMetadataFromDatabase(filename):
    config = json.load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=0)
    metadata = redis_metadata.get(filename)
    if metadata == None:
        return None
    metadata = metadata.decode()
    return metadata


def getListOfKeysFromDatabase():
    config = json.load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=0)
    return redis_metadata.scan_iter("*")


def getComprefaceUuidFromDatabase(filename):
    config = json.load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=0)
    metadata = redis_metadata.get(filename)
    if metadata == None:
        return None
    metadata = metadata.decode()
    compreface_uuid = (metadata.split("Compreface ID: ")[1]).split(", Identification")[
        0
    ]
    return compreface_uuid
