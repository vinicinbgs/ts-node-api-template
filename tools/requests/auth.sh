#!bin/bash

SCRIPT=$1
ACTION=$2

if [[ $SCRIPT == "auth" ]]; then
    if [[ $ACTION == "register" ]]; then
        echo "=============== REGISTER ==============="
        curl --header "Content-Type: application/json" \
            -i -X POST \
            --data '{"email": "test@test.com", "password":"12345678"}' \
            "${ENDPOINT}/register"
    fi

    if [[ $ACTION == "auth" ]]; then
        echo "=============== AUTH ==============="
        curl --header "Content-Type: application/json" \
            -i -X POST \
            --data '{"email": "test@test.com", "password":"12345678"}' \
            "${ENDPOINT}/auth"
    fi

    break
fi
