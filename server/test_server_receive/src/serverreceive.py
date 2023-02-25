import socket
import os
import time
import csv
import re

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5001

BUFFER_SIZE = 4096

SEPARATOR = "<SEPARATOR>"

"""
List of statuses possible:
Receieved = 
Identified = 

"""


def updateLogs(filename):
    # TODO: add if csv file doesn't exist create file and headers
    with open("../../data_storage/storage_info.csv", mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )
        
        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(r"\d{2}:\d{2}:\d{2} ","Sat Feb 25 16:02:45 2023").group(0)[:-1]
        date_to_store = re.sub(r"\d{2}:\d{2}:\d{2} ","","Sat Feb 25 16:02:45 2023")
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow([filename, date_to_store, time_to_store, status, identification])

if __name__ == "__main__":
    s = socket.socket()
    s.bind((SERVER_HOST, SERVER_PORT))
    s.listen(5)
    while True:
        client_socket, address = s.accept()
        received = client_socket.recv(BUFFER_SIZE).decode()

        filename, filesize = received.split(SEPARATOR)
        filename = os.path.basename(filename)
        filesize = int(filesize)

        updateLogs(filename)

        # TODO: add if data_storage doesn't exist create directory
        with open("../../data_storage/" + filename, "wb") as f:
            while True:
                bytes_read = client_socket.recv(BUFFER_SIZE)
                if not bytes_read:
                    break
                f.write(bytes_read)

    client_socket.close()
    s.close()
