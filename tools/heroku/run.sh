
#!bin/bash

source tools/heroku/config.sh

ARG=$1

if [[ $ARG == "migration" ]]; then
    heroku run "npm run typeorm:migration:run" --app $APP_NAME
fi;

if [[ $ARG == "migration:revert" ]]; then
    heroku run "npm run typeorm:migration:revert" --app $APP_NAME
fi;

if [[ $ARG == "logs" ]]; then
    heroku logs --tail
fi;