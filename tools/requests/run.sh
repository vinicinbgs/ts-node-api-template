#!bin/bash

ENDPOINT="http://localhost:3000/api/v1"

for f in tools/requests/*.sh; do
    FILE=$(echo $f)
    source $FILE
done