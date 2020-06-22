#!/bin/bash

#注意需要管理员权限，请使用sudo调用

cd /usr/local/lib/node_modules/egret/
if [ -f "/usr/local/lib/node_modules/egret/egret" ]; then
    sed -i ""  "s/max-old-space-size=2000/max-old-space-size=4096/" egret
fi
if [ -f "/usr/local/lib/node_modules/egret/egretnpm" ]; then
    sed -i ""  "s/max-old-space-size=2000/max-old-space-size=4096/" egretnpm
fi

cd /Applications/EgretLauncher.app/Contents/Resources/app/engine/mac/bin/
if [ -f "/Applications/EgretLauncher.app/Contents/Resources/app/engine/mac/bin/egret" ]; then
    sed -i ""  "s/max-old-space-size=2000/max-old-space-size=4096/" egret
fi

cd /Applications/EgretLauncher.app/Contents/Resources/app/engine/win/bin/
if [ -f "/Applications/EgretLauncher.app/Contents/Resources/app/engine/win/bin/egret" ]; then
    sed -i ""  "s/max-old-space-size=2000/max-old-space-size=4096/" egret.cmd
fi