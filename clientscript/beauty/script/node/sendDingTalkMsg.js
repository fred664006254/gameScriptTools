var fetch = require('node-fetch');

var arguments = process.argv.splice(2);
var logType=arguments[0];
var operaName=arguments[1]||"";
var value1=arguments[2]||"";
var sendDingTalkMsg=function()
{
    var post_data={"logType":logType,"operaName":operaName,"value1":value1};
    var content = JSON.stringify(post_data);
    var options = {  
        hostname: 'gt-clientlog.raygame3.com',  
        port: 80,  
        path: '/send_dd_msglog.php',
        method: 'POST',  
        headers: {  
            'Content-Type':'application/json',
            'Content-Length':content.length
        }  
    };  
    // var req = http.request(options, function (res) {  
    //     console.log('STATUS: ' + res.statusCode);  
    //     // console.log('HEADERS: ' + JSON.stringify(res.headers));  
    //     res.setEncoding('utf8');  
    //     res.on('data', function (chunk) {  
    //         console.log('BODY: ' + chunk);  
    //     });  
    // });  
      
    // req.on('error', function (e) {  
    //     console.log('problem with request: ' + e.message);  
    // });  
      
    // // write data to request body  
    // req.write(content);  
    // req.end(); 
    postData(post_data);
}

function postData(data) {
    // Default options are marked with *
    var url="http://gt-clientlog.raygame3.com/send_dd_msglog.php";
    return fetch(url, {
      body: JSON.stringify(data), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'user-agent': 'Mozilla/4.0 MDN Example',
        'content-type': 'application/json'
      },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
    .then(response => console.log(response.status+" 发送成功！！！")) // parses response to JSON
  }

if(arguments.length>0)
{
    sendDingTalkMsg();
}
else
{
    console.log("sendDingTalkMsg缺少必要参数");
}
