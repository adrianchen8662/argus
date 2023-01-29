import cv2
import sys
import socket

# TODO: convert to relative pathing
cascPath = r"C:\Users\adria\OneDrive\Documents\argus\doorbell\data\haarcascade_frontalface_default.xml"
# cascPath = r"C:\Users\adria\OneDrive\Documents\argus\doorbell\data\haarcascade_profileface.xml"
faceCascade = cv2.CascadeClassifier(cascPath)

video_capture = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # detect a face
    # NOTE: Not very robust in low-light conditions and if not facing camera
    # Fix is either more data of other conditions or find a different library
    # Compreface has facial detection, but is a separate program that runs parallel
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE, 
    )
    faceConfidence = faceCascade.detectMultiScale3(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE, 
        outputRejectLevels = True
    )
    weights = str(faceConfidence[2])
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

    # Display the resulting frame
    cv2.imshow('Video', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything is done, release the capture
video_capture.release()
cv2.destroyAllWindows()