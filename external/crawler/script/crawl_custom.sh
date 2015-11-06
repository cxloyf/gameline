#!/bin/bash

export LANG=en_US.UTF-8

THIS_DIR=`dirname $0`
WORK_DIR=`cd $THIS_DIR && cd .. && pwd`

if [ $# -lt 5 ]; then
  echo "usage: crawl_custom.sh <source> <category> <game_name> <game_img> <intro_url>"
  exit
fi

#/usr/bin/javac $WORK_DIR/src/crawler/Game4399Crawler.java -cp $WORK_DIR/bin:$WORK_DIR/lib/* -d $WORK_DIR/bin
/usr/bin/java -cp $WORK_DIR/bin:$WORK_DIR/lib/* crawler/Game4399Crawler "custom" "$WORK_DIR" "$1" "$2" "$3" "$4" "$5" "result/4399_results_custom.xml"

/bin/bash $WORK_DIR/script/write_db.sh "result/4399_results_custom.xml"
