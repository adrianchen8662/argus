import time
import csv
import re
from pathlib import Path

import constants


def updateLogs(filename):
    if not Path(constants.LOG_FILE_PATH).is_file():
        with open(constants.LOG_FILE_PATH, mode="w", newline="") as storage_info:
            storage_info_writer = csv.writer(
                storage_info,
                delimiter=",",
                quotechar='"',
                quoting=csv.QUOTE_MINIMAL,
            )
            storage_info_writer.writerow(
                ["Filename", "Date", "Time", "Status", "Identification"]
            )

    with open(constants.LOG_FILE_PATH, mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )

        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(constants.TIME_REGEX, local_time).group(0)[:-1]
        date_to_store = re.sub(constants.TIME_REGEX, "", local_time)
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow(
            [filename[:-4], date_to_store, time_to_store, status, identification]
        )
