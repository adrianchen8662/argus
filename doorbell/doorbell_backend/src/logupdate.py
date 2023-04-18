import csv
from datetime import datetime
from time import ctime
from re import search, sub
from os.path import isfile, join
from json import load, dump

import connect

import constants


def getLogs():
    with open(constants.LOG_FILE_PATH, mode="r") as f:
        dict_reader = csv.DictReader(f)
        list_of_dict = list(dict_reader)
        return list_of_dict


"""
Returns zero or 1 for last sent file making it or not
"""
def getStatus():
    with open(constants.LOG_FILE_PATH, mode="r") as f:
        file = csv.DictReader(f)
        status = []
        for col in file:
            if col["Status"] == "Not Sent":
                status.append("0")
            else:
                status.append("1")
    return status[-1:]


def updateStatus(update_status):
    with open(constants.CONNECT_SETTINGS_PATH, "r") as jsonFile:
        data = load(jsonFile)
        if (
            data["Connection Settings"][3]["Connection Status"] == "False"
            and update_status == "True"
        ):
            pass
            # sendBuffer()
        data["Connection Settings"][3]["Connection Status"] = update_status
        print(data)
    with open(constants.CONNECT_SETTINGS_PATH, "w") as jsonFile:
        dump(data, jsonFile, indent=4)


def updateLogs(filename, status):
    createLogs()
    # Write to log file
    with open(constants.LOG_FILE_PATH, mode="a", newline="") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quoting=csv.QUOTE_MINIMAL
        )
        local_time = ctime(int(filename.split(".")[0]))
        time_to_store = search(constants.TIME_REGEX, local_time).group(0)[:-1]
        date_to_store = sub(constants.TIME_REGEX, "", local_time)
        print(date_to_store)
        storage_info_writer.writerow(
            [filename[:-4], date_to_store, time_to_store, status]
        )


# Creates the log file if not exists with headers
def createLogs():
    if not isfile(constants.LOG_FILE_PATH):
        with open(constants.LOG_FILE_PATH, mode="w", newline="") as storage_info:
            storage_info_writer = csv.writer(
                storage_info, delimiter=",", quoting=csv.QUOTE_MINIMAL
            )
            storage_info_writer.writerow(["Filename", "Date", "Time", "Status"])


def editConnectSettings(address, port, password):
    with open(constants.CONNECT_SETTINGS_PATH, "r") as jsonFile:
        data = load(jsonFile)
        data["Connection Settings"][0]["Address/Domain"] = address
        data["Connection Settings"][1]["Port"] = port
        data["Connection Settings"][2]["AES Encryption Password"] = password
    with open(constants.CONNECT_SETTINGS_PATH, "w") as jsonFile:
        dump(data, jsonFile, indent=4)


# TODO: check if this works correctly
def sendBuffer():
    with open(constants.LOG_FILE_PATH, mode="r") as storage_info:
        storage_info_reader = csv.DictReader(storage_info)
        for row in storage_info_reader:
            if row["Status"] == "Not Sent":
                connect.sendFrame(
                    join(constants.LOG_PATH, row["Filename"] + ".enc"),
                    row["Filename"] + ".enc",
                )
