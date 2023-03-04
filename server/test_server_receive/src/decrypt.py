from Crypto.Cipher import AES
from Crypto import Random
import json


def decode(input_file_path, output_file_path):
    # get from connectsettings.json
    config = json.load(open("../../settings/connectsettings.json"))
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
