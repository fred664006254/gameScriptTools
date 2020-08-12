filepath=$(cd "$(dirname "$0")"; pwd)
cd $filepath

svn up template/

cp -r template/index.php /Library/WebServer/Documents/publish

curl -d "publishplat=local&local=local" 127.0.0.1/publish/index.php > ./index.html