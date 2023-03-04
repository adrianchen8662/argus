# TODO: prune imports
from Crypto.Cipher import AES
from Crypto import Random
from json import load
from os import remove

import constants


def encode(input_file_path, output_file_path):
    config = load(open(constants.CONNECT_SETTINGS_PATH))
    password = config["Connection Settings"][2]["AES Encryption Password"]

    # Encodes the password into a 16 byte key and iv
    password = str.encode(password)
    key = password[:16]
    iv = password[-16:]

    # Reads the file and encrypts a copy, then deletes the unencrypted version
    with open(input_file_path, "rb") as input_file:
        input_data = input_file.read()

    cfb_cipher = AES.new(key, AES.MODE_CFB, iv)
    enc_data = cfb_cipher.encrypt(input_data)

    with open(output_file_path, "wb") as enc_file:
        enc_file.write(enc_data)

    remove(input_file_path)
