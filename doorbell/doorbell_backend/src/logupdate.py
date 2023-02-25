import os
from datetime import datetime
import csv
import time
import re
from pathlib import Path

def updateLogs(log_path, filename, status):
    log_file = Path(log_path + "/storage_info.csv")
    
    if not log_file.is_file():
        with open(log_path+"/storage_info.csv",mode="w",newline='') as storage_info:
            storage_info_writer = csv.writer(
                storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
            )
            storage_info_writer.writerow(["Filename","Date","Time","Status"])

    with open(log_path+"/storage_info.csv", mode="a", newline='') as storage_info:
        storage_info_writer = csv.writer(
            storage_info, delimiter=",", quotechar='"', quoting=csv.QUOTE_MINIMAL
        )
        local_time = time.ctime(int(filename.split(".")[0]))
        time_to_store = re.search(r"\d{2}:\d{2}:\d{2} ",local_time).group(0)[:-1]
        date_to_store = re.sub(r"\d{2}:\d{2}:\d{2} ","",local_time)
        storage_info_writer.writerow([filename, date_to_store, time_to_store, status])

def cleanLogs(log_path):
    with open(log_path+"/storage_info.csv", mode="r") as storage_info:
        print("Entered")
