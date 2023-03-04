import socket
import os

import logupdate
import decrypt

SERVER_HOST = "0.0.0.0"
SERVER_PORT = 5001

BUFFER_SIZE = 4096

SEPARATOR = "<SEPARATOR>"

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

        logupdate.updateLogs(filename)

        # TODO: add if data_storage doesn't exist create directory
        with open("../../data_storage/" + filename, "wb") as f:
            while True:
                bytes_read = client_socket.recv(BUFFER_SIZE)
                if not bytes_read:
                    break
                f.write(bytes_read)

        decrypt.decode(
            "../../data_storage/" + filename,
            "../../data_storage/" + filename.split(".")[0] + ".jpg",
        )

    client_socket.close()
    s.close()
