from compreface import CompreFace
from compreface.service import RecognitionService
from compreface.collections import FaceCollection, Subjects
from json import load

import constants
import filemanagement

def testConnectiontoCompreface():
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    face_collection: FaceCollection = recognition.get_face_collection()

    subjects: Subjects = recognition.get_subjects()


def addToFaceCollection(image_path, subject):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    face_collection: FaceCollection = recognition.get_face_collection()

    return face_collection.add(image_path=image_path, subject=subject)


def addFamilyMember(name_to_add):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )
    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)
    subjects: Subjects = recognition.get_subjects()
    return subjects.add(name_to_add)


def removeFamilyMember(name_to_remove):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )
    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)
    subjects: Subjects = recognition.get_subjects()
    return subjects.delete(name_to_remove)


def deleteImage(image_id):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )
    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)
    face_collection: FaceCollection = recognition.get_face_collection()

    faces: list = face_collection.list().get("faces")

    print(image_id)
    print(filemanagement.getComprefaceUuidFromDatabase(image_id))

    if len(faces) != 0:
        last_face: dict = faces[len(faces) - 1]
        for i in faces:
            print(i)
            
        #return_value = face_collection.delete(last_face.get("image_id"))
        #print(return_value)
    else:
        return "No subject found"


def listFamilyMembers():
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )
    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)
    subjects: Subjects = recognition.get_subjects()
    return subjects.list()


def recognizeFace(image_path):
    config = load(open(constants.COMPREFACE_SETTINGS_PATH))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(
        DOMAIN,
        PORT,
        {
            "limit": 0,
            "det_prob_threshold": 0.8,
            "prediction_count": 1,
            "status": "true",
        },
    )

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    return recognition.recognize(image_path=image_path)
