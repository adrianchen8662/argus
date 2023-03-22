import os

import decrypt
import logupdate

import constants


def receive_file(s):
    client_socket, address = s.accept()
    received = client_socket.recv(constants.BUFFER_SIZE).decode()

    filename, filesize = received.split(constants.SEPARATOR)
    filename = os.path.basename(filename)
    filesize = int(filesize)

    logupdate.updateLogs(filename)

    with open("../data_storage/" + filename, "wb") as f:
        while True:
            bytes_read = client_socket.recv(constants.BUFFER_SIZE)
            if not bytes_read:
                break
            f.write(bytes_read)

    decrypt.decode(
        "../data_storage/" + filename,
        "../data_storage/" + filename.split(".")[0] + ".jpg",
    )

    return client_socket
