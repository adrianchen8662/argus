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

    with open(constants.DATA_STORAGE_FOLDER_PATH + filename, "wb") as f:
        while True:
            bytes_read = client_socket.recv(constants.BUFFER_SIZE)
            if not bytes_read:
                break
            f.write(bytes_read)

    decrypt.decode(
        constants.DATA_STORAGE_FOLDER_PATH + filename,
        constants.DATA_STORAGE_FOLDER_PATH + filename.split(".")[0] + ".jpg",
    )

    return constants.DATA_STORAGE_FOLDER_PATH + filename.split(".")[0] + ".jpg"
