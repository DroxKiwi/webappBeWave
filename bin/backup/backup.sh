
#!/usr/bin/env /bin/bash

# Dump the current database

# Diplay commands and end script at first command fail or use of an unset variable
set -o errexit -o nounset -o xtrace -o pipefail

cd /home/tux/webappBeWave
# Get Express environment variables
source .env.prod

cd bin/backup
FILE_NAME="$(date -Ins).sql"
sudo --user postgres pg_dump $DATABASE > database.$DATABASE.sql
cp database.$DATABASE.sql backups/"$FILE_NAME"