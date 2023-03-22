import socket
from json import load

import server_receive.connect as connect
import face_recognition.categorize as categorize

import constants


if __name__ == "__main__":
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    port = int(config["Connection Settings"][1]["Port"])
    s = socket.socket()
    print(port)
    s.bind((address, port))
    s.listen(5)

    # TODO: figure out a way to gracefully exit
    while True:
        image_path = connect.receive_file(s)
        return_dict = categorize.recognizeFace(image_path)
        print(return_dict)