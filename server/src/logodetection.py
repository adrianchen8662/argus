# from charset_normalizer import detect
from imageai.Detection import ObjectDetection
import os
import numpy as np
from PIL import Image


def logo_detection(input_image_path):
    detector = ObjectDetection()
    print(detector)
    detector.setModelTypeAsYOLOv3()

    detector.setModelPath("yolov3.pt")
    print("loading")
    detector.loadModel()
    print("loaded")

    custom = detector.CustomObjects(person=True)

    confidence = []
    custom_person = detector.CustomObjects(person=True)
    detections = detector.detectObjectsFromImage(
        custom_objects=custom_person, input_image=input_image_path
    )  # ,extract_detected_objects=True)
    print(detections)

    x1, y1, x2, y2 = detections[-1]["box_points"]
    img = Image.open(input_image_path)
    np_img = np.asarray(img)
    check = Image.fromarray(np_img[y1:, x1:x2], "RGB")
    # check.show()

    custom_bird = detector.CustomObjects(stop_sign=True)
    detections = detector.detectObjectsFromImage(
        custom_objects=custom_bird, input_image=np_img[y1:, x1:x2]
    )

    print(detections)
    if len(detections) != 0:
        return True
    else:
        return False


if __name__ == "__main__":
    print(logo_detection("../../data_storage/1683003168.jpg"))
