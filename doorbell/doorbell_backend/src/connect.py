from json import load
from re import match
from os.path import isfile, getsize
import requests

import constants


# returns a true or false if the frame was successfully sent or not.
def sendFrame(file_to_send, file_name):
    # open the image to send in logs folder
    if not isfile(file_to_send):
        print("Image not found!")
        return False
    file_size = getsize(file_to_send)
    config = load(open(constants.CONNECT_SETTINGS_PATH))

    # TODO: error checking on config file here on whether or not it's a real domain and port
    address = config["Connection Settings"][0]["Address/Domain"]
    port_number = config["Connection Settings"][1]["Port"]

    url = "http://" + address + ":" + port_number + "/postimage"
    my_img = {"image": open(file_to_send, "rb")}
    r = requests.post(url, files=my_img)

    # convert server response into JSON format.
    if r.json() == "Ok":
        return True
    return False
