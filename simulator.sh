#!/usr/bin/env bash

mkdir -p ~/coke/fos/data

export PROJECT_VERSION=2.5.1.0-SNAPSHOT
RED='\033[4;34m'
NC='\033[0m'

printVersion(){
    printf "Using project version ${RED}$PROJECT_VERSION${NC}\n"
    echo   "---------------------------------------"
}

usage() {
    echo "Usage: $0 [-h] [start] [stop] [cleanupDB]"
    echo "  -h  Help."
    echo "  start: Starts the simulator."
    echo "  stop: stops the simulator."
    echo "  cleanup: deletes the databases"
    exit
}

start(){
    cat NCUI_Banner.txt
    mkdir -p ~/coke/fos/data
    echo "Stopping simulator..."
    printVersion
    docker-compose pull && docker-compose up -d
    exit
}
stop(){
    printVersion
    docker-compose down
    exit
}

cleanupDB(){
    rm -rf ~/coke/fos/data/analyticsDB/
    rm -rf ~/coke/fos/data/dispenserDB/
}

case "$1" in
  "-h")
    usage
    ;;
  "start")
    start
    ;;
  "stop")
    stop
    ;;
  *)
    usage
    exit 1
    ;;
esac

