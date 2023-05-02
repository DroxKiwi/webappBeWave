
#!/bin/bash
# Dump the current database

# Diplay commands and end script at first command fail or use of an unset variable
set -o errexit -o nounset -o xtrace -o pipefail

cd /home/dev/gitrepo/webappBeWave
# Get Express environment variables
source .env.prod

cd bin/backup
FILE_NAME="$(date -Ins).sql"
pg_dump -U $USER $DATABASE > database.$DATABASE.sql
cp database.$DATABASE.sql "$FILE_NAME"