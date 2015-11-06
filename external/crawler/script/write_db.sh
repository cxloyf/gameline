#!/bin/bash

export LANG=en_US.UTF-8

THIS_DIR=`dirname $0`
WORK_DIR=`cd $THIS_DIR && cd .. && pwd`

if [ $# -lt 1 ]; then
  echo "usage: write_db.sh <result_file>(relative path)"
  exit
fi

result_file=$WORK_DIR/$1
if [ ! -e $result_file ]; then
  echo "file not exist: $result_file"
  exit
fi

#/usr/bin/javac $WORK_DIR/src/crawler/GameDatabaseWriter.java -cp $WORK_DIR/bin:$WORK_DIR/lib/* -d $WORK_DIR/bin
/usr/bin/java -cp $WORK_DIR/bin:$WORK_DIR/lib/* crawler/GameDatabaseWriter "$WORK_DIR" "$result_file"
