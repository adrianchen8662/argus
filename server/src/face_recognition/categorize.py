from compreface import CompreFace
from compreface.service import RecognitionService
from compreface.collections import FaceCollection
from compreface.collections.face_collections import Subjects
from json import load

import constants


def addToFaceCollection(image_path, subject):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][1]["Api Key"]

    compre_face: CompreFace = CompreFace(DOMAIN, PORT)

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    face_collection: FaceCollection = recognition.get_face_collection()

    face_collection.add(image_path=image_path, subject=subject)


def recognizeFace(image_path):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][1]["Api Key"]

    compre_face: CompreFace = CompreFace(DOMAIN, PORT)

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    return recognition.recognize(image_path=image_path)
