import cv2
import sys
import socket # maybe use this for sending files, but if there's a library that does HTTPS connections use that instead
from pathlib import Path

cascPath = str(Path(__file__).parent.parent) + r"\data\haarcascade_frontalface_default.xml"
faceCascade = cv2.CascadeClassifier(cascPath)

video_capture = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # detect a face
    # NOTE: Not very robust in low-light conditions and if not facing camera
    # Fix is either more data of other conditions or find a different library
    # Compreface has facial detection, but is a separate program that runs parallel in a docker
    # detectMultiscale was bounding box values, but no weight output
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE, 
    )
    # detectMultiscale3 has weight output, but no x y w h values for creating bounding box
    faceConfidence = faceCascade.detectMultiScale3(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE, 
        outputRejectLevels = True
    )
    weights = str(faceConfidence[2])
    # detectMultiscale outputs a list of rectangles. This takes the first rectangle and gets the weight, if an entry exists
    try:
        (faceConfidence[2][0])
    except:
        frame = cv2.putText(frame, "No face detected", (00,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2, cv2.LINE_AA)
    else:
        weights = faceConfidence[2][0]
        frame = cv2.putText(frame, str(weights), (00,30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0,0,0), 2, cv2.LINE_AA)
    # Draw a rectangle around the faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)
    # TODO: send the image file if the face fits a certain size and confidence values
    # possibly send two different images. One with just the face, and one the entire frame with or without the bounding box

    # Display the resulting frame
    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()