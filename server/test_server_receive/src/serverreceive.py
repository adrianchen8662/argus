import socket
import os
import time
import csv
import re

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5001

BUFFER_SIZE = 4096

SEPARATOR = "<SEPARATOR>"


def updateLogs(filename):
    with open("../../data_storage/storage_info.csv", mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )

        if not log_file.is_file():
            with open(
                log_path + "/storage_info.csv", mode="w", newline=""
            ) as storage_info:
                storage_info_writer = csv.writer(
                    storage_info,
                    delimiter=",",
                    quotechar='"',
                    quoting=csv.QUOTE_MINIMAL,
                )
                storage_info_writer.writerow(["Filename", "Date", "Time", "Status"])

        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(r"\d{2}:\d{2}:\d{2} ", local_time).group(0)[:-1]
        date_to_store = re.sub(r"\d{2}:\d{2}:\d{2} ", "", local_time)
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow(
            [filename, date_to_store, time_to_store, status, identification]
        )


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
