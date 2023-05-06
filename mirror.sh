#!/bin/bash
while :
do
    rsync -avzi --progress server/data_storage website/public/img/
done