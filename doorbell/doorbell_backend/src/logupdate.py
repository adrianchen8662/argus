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

'''
Returns a list of either 0 or 1, 0 for not sent, 1 for sent
'''
def getLogSimple():
    with open(constants.LOG_FILE_PATH, mode="r") as f:
        file = csv.DictReader(f)
        status = []
        for col in file:
            if col["Status"] == "Not Sent":
                status.append("0")
            else:
                status.append("1")
    return status[-20:]
        

def updateStatus(update_status):
    with open(constants.CONNECT_SETTINGS_PATH, "r") as jsonFile:
        data = load(jsonFile)
        if (
            data["Connection Settings"][3]["Connection Status"] == "False"
            and update_status == "True"
        ):
            sendBuffer()
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
