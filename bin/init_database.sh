#!/bin/bash
set -o errexit -o nounset -o xtrace -o pipefail

sudo systemctl restart postgresql
createdb database_dev_studiecf

source ../.env

# Execution depend on the app environment
case $NODE_ENV in 
	'dev' | 'test')
                node init_database.js
                cd ../Fixtures
                node load.js
        ;;
        *)
                echo 'Error ! App in production !'
                exit 1
esac