import redis
import cv2  # might need apt-get install libgl1
import numpy as np

import constants

def add_image_to_database(filename):
    redis_images = redis.StrictRedis(host="localhost", port=6379, db=0)
    
    img1 = cv2.imread(filename+".png", 1)
    retval, buffer = cv2.imencode(".png", img1)

    image_bytes = np.array(buffer).tobytes()

    redis_images.set(filename, image_bytes)


def add_metadata_to_database(filename, date, time, status, identification, confidence):
    redis_metadata = redis.StrictRedis(host="localhost", port=6379, db=1)

    metadata = "Filename: " + filename + ", Data: " + date + ", Time: " + time + ", Status: " + status + ", Identification" + identification + ", Confidence" + confidence

    redis_metadata.set(
        filename,
        metadata
    )

def get_metadata_from_database(filename):
    redis_metadata = redis.StrictRedis(host="localhost", port=6379, db=1)
    metadata = redis_metadata.get(filename)
    return metadata

def removeTempImage(filename):
    return