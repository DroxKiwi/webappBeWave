#!/bin/bash
# Dump the current database

# Diplay commands and end script at first command fail or use of an unset variable
set -o errexit -o nounset -o xtrace -o pipefail

# Go to the backend
cd ./../../
# Get Symfony environment variables
source .env.prod

cd bin/backup
FILE_NAME="$(date -Ins).sql"
sudo --user postgres pg_dump $DATABASE > database.$DATABASE.sql
cp database.$DATABASE.sql "$FILE_NAME"