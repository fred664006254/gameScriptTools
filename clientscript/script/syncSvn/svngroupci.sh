#!/bin/bash

DIR=$1
PARMS=$2

cd /Users/publish/h5/gt_h5/publishclient/

cat /dev/null > /tmp/.svnlist

svn status $DIR | awk '{print $2}' | while read line
do
      echo ${line%/*} >> /tmp/.svnlist
done

cat /tmp/.svnlist | sort -r -u | while read line
do
      svn commit $line -m "$PARMS $line" 2>/tmp/svn_commit.log 
done
