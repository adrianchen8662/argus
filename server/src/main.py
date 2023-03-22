import socket
from json import load

import server_receive.connect as connect

import constants

if __name__ == "__main__":
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    address = config["Connection Settings"][0]["Address/Domain"]
    port = int(config["Connection Settings"][1]["Port"])
    s = socket.socket()
    print(port)
    s.bind((address, port))
    s.listen(5)

    while True:
        client_socket = connect.receive_file(s)
    client_socket.close()
    s.close()
