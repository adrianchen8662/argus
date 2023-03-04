from Crypto.Cipher import AES
from Crypto import Random
from json import load
from os import remove

import constants


def decode(input_file_path, output_file_path):
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    password = config["Connection Settings"][0]["AES Encryption Password"]

    password = str.encode(password)
    key = password[:16]
    iv = password[-16:]

    with open(input_file_path, "rb") as input_file:
        input_data = input_file.read()

    cfb_decipher = AES.new(key, AES.MODE_CFB, iv)
    plain_data = cfb_decipher.decrypt(input_data)

    with open(output_file_path, "wb") as output_file:
        output_file.write(plain_data)

    remove(input_file_path)
