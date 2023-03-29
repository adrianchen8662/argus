import socket
from json import load
import os
from pathlib import Path

import face_recognition.categorize as categorize
import server_receive.decrypt as decrypt
import server_receive.logupdate as logupdate

import constants

import pprint # for debugging

if __name__ == "__main__":
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    port = int(config["Connection Settings"][1]["Port"])
    
    s = socket.socket()
    s.bind(('', port))
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
        if Path(constants.DATA_STORAGE_FOLDER_PATH + filename.split(".")[0] + ".jpg").exists():
            recognize_dict = categorize.recognizeFace(constants.DATA_STORAGE_FOLDER_PATH + filename.split(".")[0] + ".jpg")
            pprint.pprint(recognize_dict)
            pprint.pprint(recognize_dict.get("result").get("subjects"))
            
            