from json import load
from re import match
from socket import gethostbyname, socket
from os.path import isfile, getsize

import constants


# returns a true or false if the frame was successfully sent or not.
def sendFrame(file_to_send, file_name):
    # open the image to send in logs folder
    if not isfile(file_to_send):
        print("Image not found!")
        return False
    file_size = getsize(file_to_send)
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    try:
        port_number = int(config["Connection Settings"][1]["Port"])
    except:
        print("No port number found, using standard port 5001")

    if match(
        constants.IPV4_ADDRESS_REGEX,
        address,
    ):
        # if ipv4
        ip_address = address
        s = socket()
        try:
            s.connect((ip_address, port_number))
        except:
            print("Could not connect!")
            return False
    else:
        # regular domain
        ip_address = gethostbyname(gethostname(address))
        s = socket()
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
