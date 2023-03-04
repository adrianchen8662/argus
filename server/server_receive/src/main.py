import socket
import os
from json import load

import logupdate
import decrypt

import constants

if __name__ == "__main__":
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    port = int(config["Connection Settings"][1]["Port"])
    s = socket.socket()
    s.bind((address, port))
    s.listen(5)
    while True:
        client_socket, address = s.accept()
        received = client_socket.recv(constants.BUFFER_SIZE).decode()

        filename, filesize = received.split(constants.SEPARATOR)
        filename = os.path.basename(filename)
        filesize = int(filesize)

        logupdate.updateLogs(filename)

        with open("../../data_storage/" + filename, "wb") as f:
            while True:
                bytes_read = client_socket.recv(constants.BUFFER_SIZE)
                if not bytes_read:
                    break
                f.write(bytes_read)

        decrypt.decode(
            "../../data_storage/" + filename,
            "../../data_storage/" + filename.split(".")[0] + ".jpg",
        )

    client_socket.close()
    s.close()
