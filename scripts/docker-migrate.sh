#!/bin/bash
docker-compose exec web bash -c "cd /var/app/src/db && sequelize db:migrate"
