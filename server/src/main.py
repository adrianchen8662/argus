import socket
from json import load
import os
from pathlib import Path
import re
import time

import face_recognition.categorize as categorize
import server_receive.decrypt as decrypt

import constants
import filemanagement


if __name__ == "__main__":
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    port = int(config["Connection Settings"][1]["Port"])

    s = socket.socket()
    s.bind(("", port))
    s.listen(5)

    while True:
        try:
            pass
        except KeyboardInterrupt:
            client_socket.close()
            s.close()

        client_socket, address = s.accept()
        received = client_socket.recv(constants.BUFFER_SIZE).decode()
        filename, filesize = received.split(constants.SEPARATOR)
        filename = os.path.basename(filename)
        filesize = int(filesize)

        with open(filename, "wb") as f:
            while True:
                bytes_read = client_socket.recv(constants.BUFFER_SIZE)
                if not bytes_read:
                    break
                f.write(bytes_read)

        decrypt.decode(
            filename,
            filename.split(".")[0] + ".png",
        )
        if Path(filename.split(".")[0] + ".png").exists():
            recognize_dict = (
                categorize.recognizeFace(filename.split(".")[0] + ".png")
                .get("result")[0]
                .get("subjects")[0]
            )

            if recognize_dict.get("similarity") < 0.7:
                local_time = time.ctime(int(filename.split(".")[0]))
                time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[
                    :-1
                ]
                date_to_store = re.sub(constants.TIME_REGEX, "", local_time)

                # NOTE: This is where logo detection should go
                print(filename.split(".")[0])
                filemanagement.add_image_to_database(filename.split(".")[0])
                filemanagement.add_metadata_to_database(
                    filename.split(".")[0],
                    date_to_store,
                    time_to_store,
                    "Compreface ID",
                    "Unknown",
                    "1",
                )

            else:
                local_time = time.ctime(int(filename.split(".")[0]))
                time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[
                    :-1
                ]
                date_to_store = re.sub(constants.TIME_REGEX, "", local_time)

                filemanagement.add_image_to_database(filename.split(".")[0])
                filemanagement.add_metadata_to_database(
                    filename.split(".")[0],
                    date_to_store,
                    time_to_store,
                    "Compreface ID",
                    recognize_dict.get("subject"),
                    recognize_dict.get("similarity"),
                )

            filemanagement.removeTempImage(filename.split(".")[0] + ".png")
