import os

IPV4_ADDRESS_REGEX = r"^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$"
SEPARATOR = "<SEPARATOR>"
BUFFER_SIZE = 4096

TIME_REGEX = r"\d{2}:\d{2}:\d{2} "

FACE_REG_DATA_PATH = r"../settings/haarcascade_frontalface_default.xml"
CONNECT_SETTINGS_PATH = r"../settings/connectsettings.json"

LOG_FILE_PATH = r"../data_storage/storage_info.csv"
LOG_PATH = r"../data_storage"
