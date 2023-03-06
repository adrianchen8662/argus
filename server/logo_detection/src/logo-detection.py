from charset_normalizer import detect
from imageai.Detection import ObjectDetection
import os
import cv2

ROOT_DIR = os.path.dirname(os.path.dirname(__file__))


execution_path = os.getcwd()

detector = ObjectDetection()
detector.setModelTypeAsYOLOv3()
detector.setModelPath( os.path.join(execution_path , "yolov3.pt"))
detector.loadModel()

folder_dir = ROOT_DIR + "/images/cows_input/front/"
output_folder_dir = ROOT_DIR + "/images/cows_output/"

confidence = []
for images in os.listdir(folder_dir):
    detections = detector.detectObjectsFromImage(input_image=os.path.join(folder_dir , images)) #, output_image_path=os.path.join(output_folder_dir, images))
    if len(detections) > 0:
        for obj in detections:
            if obj["name"] == "cow":
                # print("Cow at the Door:")    
                img = cv2.imread(folder_dir + images)
                cv2.imwrite(output_folder_dir + images, img)
            # print(obj["name"] , " : " , obj["percentage_probability"] )


