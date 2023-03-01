import time
import csv
import re
from pathlib import Path

def updateLogs(filename):
    if not Path("../../data_storage/storage_info.csv").is_file():
        with open("../../data_storage/storage_info.csv", mode="w", newline="") as storage_info:
            storage_info_writer = csv.writer(
                storage_info,
                delimiter=",",
                quotechar='"',
                quoting=csv.QUOTE_MINIMAL,
            )
            storage_info_writer.writerow(["Filename", "Date", "Time", "Status","Identification"])

    with open("../../data_storage/storage_info.csv", mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )

        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(r"\d{2}:\d{2}:\d{2} ", local_time).group(0)[:-1]
        date_to_store = re.sub(r"\d{2}:\d{2}:\d{2} ", "", local_time)
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow(
            [filename, date_to_store, time_to_store, status, identification]
        )
