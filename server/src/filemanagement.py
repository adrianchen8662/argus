import redis
import cv2  # might need apt-get install libgl1
import numpy as np
import os
from json import load

import constants

# change to saving to docker volume

def add_image_to_database(filename):
    config = load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_images = redis.StrictRedis(host=address, port=port, db=0)

    img1 = cv2.imread(filename + ".png", 1)
    retval, buffer = cv2.imencode(".png", img1)

    image_bytes = np.array(buffer).tobytes()

    redis_images.set(filename, image_bytes)


def add_metadata_to_database(filename, date, time, status, identification, confidence):
    config = load(open(constants.REDIS_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=1)

    # metadata stored in the python dictionary format
    metadata = (
        "{Filename: "
        + str(filename)
        + ", Data: "
        + str(date)
        + ", Time: "
        + str(time)
        + ", Status: "
        + str(status)
        + ", Identification: "
        + str(identification)
        + ", Confidence: "
        + str(confidence)
        + "}"
    )

    redis_metadata.set(filename, metadata)


def get_metadata_from_database(filename):
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Host"]
    port = int(config["Connection Settings"][1]["Port"])
    redis_metadata = redis.StrictRedis(host=address, port=port, db=1)
    metadata = redis_metadata.get(filename)
    return metadata


def removeTempImage(filename):
    os.remove(filename)
    return
