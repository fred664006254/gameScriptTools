#!/bin/bash

DIR="$( cd "$( dirname "$0" )" && pwd )"
cd $DIR

$DIR/../../../clientscript/script/resource/resourceEnter.sh $DIR/../resources  $DIR/resource $DIR/.resourceMd5.json || exit 1