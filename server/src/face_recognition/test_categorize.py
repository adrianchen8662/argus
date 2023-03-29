from compreface import CompreFace
from compreface.service import RecognitionService
from compreface.collections import FaceCollection
from json import load

import pprint

def addToFaceCollection(image_path, subject):
    config = load(open("../../settings/comprefacesettings.json"))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(DOMAIN, PORT, {
        "limit": 0,
        "det_prob_threshold": 0.8,
        "prediction_count": 1,
        "status": "true"
    })

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    face_collection: FaceCollection = recognition.get_face_collection()

    face_collection.add(image_path=image_path, subject=subject)


def recognizeFace(image_path):
    config = load(open("../../settings/comprefacesettings.json"))
    DOMAIN = config["Compreface Settings"][0]["Domain"]
    PORT = config["Compreface Settings"][1]["Port"]
    API_KEY = config["Compreface Settings"][2]["API Key"]

    compre_face: CompreFace = CompreFace(DOMAIN, PORT, {
        "limit": 0,
        "det_prob_threshold": 0.8,
        "prediction_count": 1,
        "status": "true"
    })

    recognition: RecognitionService = compre_face.init_face_recognition(API_KEY)

    return recognition.recognize(image_path=image_path)

if __name__ == "__main__":
    # If recognized, then the face is > 0.9 chance. If not recognized, then the face is less than that
    # threshold should be 60-70% based on testing
    # it only returns the highest similarity subject that it identifies. 
    # {'code': 28, 'message': 'No face is found in the given image'}
    # addToFaceCollection("../../data_storage/ainesh_test.jpg", "Ainesh Sootha")
    pprint.pprint(recognizeFace("../../data_storage/dog_test.jpg"))