import os
from datetime import datetime
import csv
import time
import re
from pathlib import Path

import constants

def updateLogs(filename, status):
    # Creates the log file if not exists with headers
    if not Path.is_file(constants.LOG_FILE_PATH):
        with open(constants.LOG_FILE_PATH, mode="w", newline="") as storage_info:
            storage_info_writer = csv.writer(
                storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )
            storage_info_writer.writerow(["Filename", "Date", "Time", "Status"])

    # Write to log file
    with open(constants.LOG_FILE_PATH, mode="a", newline="") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )
        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[:-1]
        date_to_store = re.sub(constants.TIME_REGEX, "", local_time)
        storage_info_writer.writerow([filename, date_to_store, time_to_store, status])

def cleanLogs(log_path):
    with open(LOG_FILE_PATH, mode="r") as storage_info:
        print("Entered")