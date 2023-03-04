import detection
import logupdate

if __name__ == "__main__":
    # TODO:
    """
    Checklist before running:
    autoupdate.json exists
    connectsettings.json exists
    haarcascade_frontalface_default.xml exists
    """

    # cleans old pictures from log folder
    logupdate.cleanLogs()

    # runs loop for detection of faces
    detection.detection()
