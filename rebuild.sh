#!/usr/bin/env bash

bash -c "docker-compose down -v && docker image rm g5app_repairs && docker-compose up"
