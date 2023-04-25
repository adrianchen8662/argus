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


def testConnectionToDatabase():
    r = redis.Redis("127.0.0.1", socket_connect_timeout=1)
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
