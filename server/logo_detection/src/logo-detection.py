# from charset_normalizer import detect
from imageai.Detection import ObjectDetection
import os
import cv2
import numpy as np
from PIL import Image


ROOT_DIR = os.path.dirname(os.path.dirname(__file__))
np.set_printoptions(threshold=np.inf)
execution_path = os.getcwd()


detector = ObjectDetection()
print(detector)
detector.setModelTypeAsYOLOv3()

detector.setModelPath(os.path.join(execution_path, "yolov3.pt"))
print("loading")
detector.loadModel()
print("loaded")

custom = detector.CustomObjects(person=True)

folder_dir = ROOT_DIR + "/images/cows_input/front/"
output_folder_dir = ROOT_DIR + "/images/cows_output/"

confidence = []
for images in os.listdir(folder_dir):
    # output_image_path=os.path.join(output_folder_dir, images)
    # detections = detector.detectCustomObjectsFromImage( custom_objects=custom, input_image=os.path.join(execution_path , "image3.jpg"), output_image_path=os.path.join(execution_path , "image3new-custom.jpg"), minimum_percentage_probability=30)
    custom_person = detector.CustomObjects(person=True)
    detections = detector.detectObjectsFromImage(custom_objects=custom_person, input_image=os.path.join(folder_dir, images))#,extract_detected_objects=True)
    print(detections)
    
    x1,y1,x2,y2 = detections[-1]["box_points"]
    img = Image.open(os.path.join(folder_dir, images))
    np_img = np.asarray(img)
    check = Image.fromarray(np_img[y1:, x1:x2], 'RGB')
    # check.show()

    custom_bird = detector.CustomObjects(stop_sign=True)
    detections = detector.detectObjectsFromImage(custom_objects=custom_bird,input_image=np_img[y1:, x1:x2])
    # detections = detector.detectCustomObjectsFromImage(custom_objects=custom, input_image=os.path.join(folder_dir, images), output_image_path=os.path.join(output_folder_dir, images), minimum_percentage_probability=30)
    print(detections)

    # if len(detections) > 0:
    #     for obj in detections:
    #         if obj["name"] == "cow":
    #             img = cv2.imread(folder_dir + images)
    #             cv2.imwrite(output_folder_dir + images, img)
    #         # print(obj["name"] , " : " , obj["percentage_probability"] )
