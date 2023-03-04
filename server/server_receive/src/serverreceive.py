import socket
import os
import time
import csv
import re

import constants


def updateLogs(filename):
    with open(constants.LOG_FILE_PATH, mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )

        if not log_file.is_file():
            with open(constants.LOG_FILE_PATH, mode="w", newline="") as storage_info:
                storage_info_writer = csv.writer(
                    storage_info,
                    delimiter=",",
                    quotechar='"',
                    quoting=csv.QUOTE_MINIMAL,
                )
                storage_info_writer.writerow(["Filename", "Date", "Time", "Status"])

        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[:-1]
        date_to_store = re.sub(constants.TIME_REGEX, "", local_time)
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow(
            [filename, date_to_store, time_to_store, status, identification]
        )
