#!/bin/bash
set -o errexit -o nounset -o xtrace -o pipefail

source ../.env.dev

sudo systemctl restart postgresql
createdb database_dev_studiecf

# Execution depend on the app environment
case $NODE_ENV in 
	'dev')
                cd ../Models
                node init_models.js
                cd ../Fixtures
                node load.js
        ;;
        *)
                echo 'Error ! App in production !'
                exit 1
esac