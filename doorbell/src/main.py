import cv2
import sys
import socket # maybe use this for sending files, but if there's a library that does HTTPS connections use that instead
from pathlib import Path
import time
from datetime import datetime
import os

def cleanLogs(log_path):
    cache_list = os.listdir(log_path)
    current_date_time = datetime.now().strftime("%m-%d-%Y,%H-%M-%S")


if __name__ == "__main__":
    casc_path = str(Path(__file__).parent.parent) + r"\data\haarcascade_frontalface_default.xml"
    log_path = str(Path(__file__).parent.parent) + r"\logs"
    face_cascade = cv2.CascadeClassifier(casc_path)

    video_capture = cv2.VideoCapture(0)

    seconds = 0

    # main loop that will keep running
    while True:
        # cleans old pictures from log folder
        cleanLogs(log_path)

        # Capture frame-by-frame
        ret, frame = video_capture.read()
        _, save_frame = video_capture.read()

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        # detect a face
        '''
        Not very robust in low-light conditions and if not facing camera
        Fix is either more data of other conditions or find a different library
        Compreface has facial detection, but is a separate program that runs parallel in a docker
        Compreface has also not been tested to see how it compares
        '''
        # detectMultiscale was bounding box values, but no weight output
        faces = face_cascade.detectMultiScale(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE, 
        )
        # detectMultiscale3 has weight output, but no x y w h values for creating bounding box
        face_confidence = face_cascade.detectMultiScale3(
            gray,
            scaleFactor=1.1,
            minNeighbors=5,
            minSize=(30, 30),
            flags=cv2.CASCADE_SCALE_IMAGE, 
            outputRejectLevels = True
        )
        weights = str(face_confidence[2])
        # detectMultiscale outputs a list of rectangles. This takes the first rectangle and gets the weight, if an entry exists
        try:
            (face_confidence[2][0])
        except:
            frame = cv2.putText(frame, "No face detected", (00,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2, cv2.LINE_AA)
            weights = 0
        else:
            weights = face_confidence[2][0]
            frame = cv2.putText(frame, str(weights), (00,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2, cv2.LINE_AA)
        # Draw a rectangle around the faces
        for (x, y, w, h) in faces:
            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
        '''
        Conditions:
        Confidence is greater than 5 (8 sometimes is too picky. Could use a sliding scale instead)
        Last sent image was 10 seconds or more ago
        width and height of the detected face is greater than 100, aka someone who is close enough to the doorbell. 
        '''
        if weights > 5 and time.time() > seconds and w > 100 and h > 100:
            print("Taking a photo, cheese!")
            print("width = ",w,"  height = ",h)
            seconds = time.time()
            seconds += 10
            # possibly send two different images. One with just the face, and one the entire frame with or without the bounding box
            cv2.imwrite(os.path.join(log_path, datetime.now().strftime("%m-%d-%Y,%H-%M-%S") + ".jpg"),save_frame)

        # Display the resulting frame
        cv2.imshow('Video', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    # When everything is done, release the capture
    video_capture.release()
    cv2.destroyAllWindows()
