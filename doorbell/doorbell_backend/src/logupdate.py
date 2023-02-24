import os
from datetime import datetime


def updateLogs(log_path, filename):
    # TODO: add if csv file doesn't exist create file and headers
    with open(log_path, "/storage_info.csv", mode="a") as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )
        filename = filename
        date = filename.split(",")[0]
        time = filename.split(",")[1].split(".")[0]
        status = "Received"
        identification = "NULL"
        storage_info_writer.writerow([filename, date, time, status, identification])


def cleanLogs(log_path):
    with open(log_path, "/storage_info.csv", mode="r") as storage_info:
        print("Entered")
    current_date_time = datetime.now().strftime("%m-%d-%Y,%H-%M-%S")
