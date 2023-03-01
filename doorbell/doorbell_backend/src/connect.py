import json
import re
import socket
import os

import constants

# TODO: comment and annotate code

# returns a true or false if the frame was successfully sent or not.
def sendFrame(file_to_send, file_name):

    # open the image to send in logs folder
    try:
        file_size = os.path.getsize(file_to_send)
    except:
        print("Image not found!")
        return False

    config = json.load(open("../settings/connectsettings.json"))
    address = config["Connection Settings"][0]["Address/Domain"]
    try:
        port_number = int(config["Connection Settings"][1]["Port"])
    except:
        print("No port number found, using standard port 5001")

    if re.match(
        r"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
        address,
    ):
        # if ipv4
        ip_address = address
        s = socket.socket()
        try:
            s.connect((ip_address, port_number))
        except:
            print("Could not connect!")
            return False
    else:
        # regular domain
        ip_address = socket.gethostbyname(socket.gethostname(address))
        s = socket.socket()
        try:
            s.connect((ip_address, 5001))
        except:
            print("Could not connect!")
            return False

    s.send(f"{file_name}{constants.SEPARATOR}{file_size}".encode())

    with open(file_to_send, "rb") as f:
        while True:
            bytes_read = f.read(constants.BUFFER_SIZE)
            if not bytes_read:
                break
            s.sendall(bytes_read)
    s.close()
    return True