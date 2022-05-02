#!bin/bash

RESOURCE="${ENDPOINT}/contacts"

SCRIPT=$1
ACTION=$2
JWT=$3

if [[ $SCRIPT == "contacts" ]]; then
    if [[ $ACTION == "create" ]] && [[ $JWT ]]; then
        echo "=============== CREATE ==============="
        curl --header "Content-Type: application/json" \
            --header "Authorization: Bearer ${JWT}" \
            -i -X POST --data '{"first_name":"FIRST_NAME", "last_name":"LAST_NAME", "phone_number":"PHONE_NUMBER", "address":"ADDRESS"}' \
            ${RESOURCE}
    fi

    if [[ $ACTION == "list" ]] && [[ $JWT ]]; then
        echo "=============== LIST ALL ==============="
        curl -i --header "Content-Type: application/json" \
            --header "Authorization: Bearer ${JWT}" \
        ${RESOURCE}
    fi
    break
fi
