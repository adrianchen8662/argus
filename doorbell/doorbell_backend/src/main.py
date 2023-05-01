import detection
import os
import filemanagement

if __name__ == "__main__":
    # TODO:
    """
    Checklist before running:
    autoupdate.json exists
    connectsettings.json exists
    haarcascade_frontalface_default.xml exists
    """

    filemanagement.createDataStorageFolder()

    # runs loop for detection of faces
    detection.detection()
