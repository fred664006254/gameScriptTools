#!/bin/bash
SOURCE="$0"
while [ -h "$SOURCE"  ]; do
    filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /*  ]] && SOURCE="$DIR/$SOURCE"
done
filepath="$( cd -P "$( dirname "$SOURCE"  )" && pwd  )"

cd $filepath


# if [[ `which wget` == '' ]]; then
#     brew install wget
# fi

<<<<<<< .mine
cd '/Users/xiaozhu/Library/Application Support/Egret/engine'
||||||| .r109905
cd '/Users/chenke/Library/Application Support/Egret/engine'
=======
cd '~/Library/Application Support/Egret/engine'
>>>>>>> .r110404
rm -rf ./5.2.23.zip
wget http://192.168.8.82/client/egret/5.2.23.zip
mv 5.2.23 5.2.23_bak
unzip -o ./5.2.23.zip
rm -rf ./5.2.23_bak
rm -rf 5.2.23.zip
/usr/local/bin/egret make --egretversion 5.2.23