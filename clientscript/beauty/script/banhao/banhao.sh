cd /Users/zhaozhantao/me/doc/gt/client/branches/PalaceWar_1.0.1banshu
/usr/local/bin/egret build -e
/usr/local/bin/egret publish --version localtest
/usr/local/bin/node /Users/zhaozhantao/me/doc/gt/clientscript/script/versionMd5/buildJSVersion.js /Users/zhaozhantao/me/doc/gt/client/branches/PalaceWar_1.0.1banshu/bin-release/web/localtest/manifest.json
/usr/local/bin/node /Users/zhaozhantao/me/doc/gt/clientscript/script/versionMd5/buildResourcesVersion.js /Users/zhaozhantao/me/doc/gt/client/branches/PalaceWar_1.0.1banshu/bin-release/web/localtest/resource/default.res.json