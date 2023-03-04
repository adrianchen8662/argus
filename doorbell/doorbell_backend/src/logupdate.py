import csv
from datetime import datetime
from time import ctime
from re import search, sub
from os.path import isfile, join
from json import load, dump

import connect

import constants


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


# Removes entries in the logs that have been sent
def cleanLogs():
    createLogs()
    log_dict = {}
    # Writes not sent entries to a dictionary
    with open(constants.LOG_FILE_PATH, mode="r", newline="") as storage_info:
        storage_info_reader = csv.DictReader(storage_info)
        for row in storage_info_reader:
            if row["Status"] == "Not Sent":
                log_dict[row["Filename"]] = (row["Date"], row["Time"], row["Status"])

    # Writes entries back into the same file. Write destroys all information, so rewriting the header is necessary
    with open(constants.LOG_FILE_PATH, mode="w", newline="") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quoting=csv.QUOTE_MINIMAL
        )
        storage_info_writer.writerow(["Filename", "Date", "Time", "Status"])
        for key, value in log_dict.items():
            storage_info_writer.writerow([key, value[0], value[1], value[2]])


def sendBuffer():
    with open(constants.LOG_FILE_PATH, mode="r") as storage_info:
        storage_info_reader = csv.DictReader(storage_info)
        for row in storage_info_reader:
            if row["Status"] == "Not Sent":
                connect.sendFrame(
                    join(constants.LOG_PATH, row["Filename"] + ".enc"),
                    row["Filename"] + ".enc",
                )
