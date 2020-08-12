<!DOCTYPE HTML>
<html>
<head>
    <?php 
        $ip = $_SERVER['REMOTE_ADDR'];
//        print_r($_SERVER);
        $iparr = array(
            // "192.168.101.67",
            // "118.144.133.12",
        );
        
        $isTest=false;
        if(in_array($ip,$iparr)||(isset($_REQUEST['raytestol'])&&$_REQUEST['raytestol']=='testol'))
        {
            $isTest=true;
        }
        $isNocdn=false;

        $cdnCfg=array(
            "3k"=>array("gt-3kwan-cdn.raygame3.com"),
        );
        
        $urlCfg = array(
            // wx
            "gt_wx"=>array("//lz-wx-cdn.leishengame.com/gt_wx/",),
            "gt_testwx"=>array("//lz-wx-cdn.leishengame.com/gt_testwx/",),

            "gt_ls"=>array("//lz-ls-cdn.leishengame.com/gt_ls/",),
            "gt_testls"=>array("//lz-ls-cdn.leishengame.com/gt_testls/",),

            );

            $appNameCfg=array(
                "wx"=>"龙珠",
                "ls"=>"龙珠",
                );

            $useImgCfg=array(
            );

            $useImgTipCfg=array(
            );
            /**
             * 加载失败弹框翻译文字
             */
            $loadFailDivTipCfg=array(
            );

            $domainCfg=array(
                "3k"=>"gt-cn-in.raygame3.com",
                "local"=>"192.168.8.95",
            );

        function getCDNbyCfg($urlCfg,$plat,$spare=false)
        {
            $tmpCdn=$urlCfg[$plat];
            if($tmpCdn)
            {
                if(gettype($tmpCdn)=="array")
                {
                    if($spare&&count($tmpCdn)>1)
                    {
                        $tmpCdn=$tmpCdn[1];
                    }
                    else
                    {
                        $tmpCdn=$tmpCdn[0];
                    }
                }
            }
            return $tmpCdn;
        }

        function getAllCDN($urlCfg,$plat)
        {
            if(isset($_REQUEST['publishplat'])&&$_REQUEST['publishplat']!='')
            {
                if(isset($_REQUEST['local'])&&$_REQUEST['local']=='local')
                {
                    return '[]';
                }
            }
            $tmpCdn=$urlCfg[$plat];
            if($tmpCdn)
            {
                if(gettype($tmpCdn)!="array")
                {
                    $tmpCdn=array($tmpCdn);
                }
            }
            else
            {
                return '[]';
            }
            $tmpStr='[';
            foreach($tmpCdn as $k=>$v)
            {
                $tmpStr=$tmpStr.'"'.$v.'",';
            }
            $tmpStr=$tmpStr.']';
            return $tmpStr;
        }

        $requri = $_SERVER['REQUEST_URI'];
        $isfind=false;
        $domainKey='';
        if(strstr($requri,"?"))
        {
            $requri = substr($requri,0,stripos($requri,'?'));
        }
        if(substr($requri,strlen($requri)-1,1)=='/')
        {
            $requri=substr($requri,0,strlen($requri)-1);
        }
        else 
        {
            if(strstr($requri,"."))
            {
                $requri=substr($requri,0,strripos($requri,'/'));
            }
        }
        if(strstr($requri,"/"))
        {
            $requri=substr($requri,strripos($requri,'/')+1);
            if(getCDNbyCfg($urlCfg,$requri))
            {
                $isfind=true;
            }
        }
        else if($_SERVER['HTTP_HOST']!=$requri&&getCDNbyCfg($urlCfg,$requri))
        {
            $isfind=true;
        }
        else
        {
            if(getCDNbyCfg($urlCfg,$requri))
            {
                $isfind=true;
            }
        }
        if($isfind==true)
        {
            if($isTest==true)
            {
                if(strstr($requri,"gt_")&&!strstr($requri,"gt_test"))
                {
                    $requri=str_replace("gt_","gt_test",$requri);
                }
            }
            if($isNocdn==false)
            {
                echo '<base id="gtgamebaseurl" href="'.getCDNbyCfg($urlCfg,$requri).'" />';
            }
        }
        if(strstr($requri,"gt_"))
        {
            $domainKey=str_replace("gt_","",$requri);
            if(strstr($requri,"test")&&!$domainCfg[$domainKey])
            {
                $domainKey=str_replace("test","",$domainKey);
            }
        }
        if(isset($_REQUEST['publishplat'])&&$_REQUEST['publishplat']!='')
        {
            if(isset($_REQUEST['local'])&&$_REQUEST['local']=='local')
            {}
            else
            {
                $domainKey=$_REQUEST['publishplat'];
                $requri="gt_".$domainKey;
                if(getCDNbyCfg($urlCfg,$requri))
                {
                    echo '<base id="gtgamebaseurl" href="'.getCDNbyCfg($urlCfg,$requri).'" />';
                }
            }
        }
    ?>

    <meta charset="utf-8">
    <?php 
        echo '<title>'.($appNameCfg[str_replace("test","",$domainKey)]?$appNameCfg[str_replace("test","",$domainKey)]:'龙珠').'</title>';
    ?>

    <meta name="viewport" content="width=device-width,initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no" />
    <meta http-equiv="Expires" content="0">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Cache-control" content="no-cache">
    <meta http-equiv="Cache" content="no-cache">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="full-screen" content="true" />
    <meta name="screen-orientation" content="portrait" />
    <meta name="x5-fullscreen" content="true" />
    <meta name="x5-orientation" content="portrait"/>
    <meta name="360-fullscreen" content="true" />
    <style>
        html, body {
            -ms-touch-action: none;
            background: #ffffff;
            padding: 0;
            border: 0;
            margin: 0;
            height: 100%;
        }
        progress::-webkit-progress-bar {
            background-color: #001219;
        }
        
        progress::-webkit-progress-value {
            background-color: #21BDE1;
        }
    </style>
    <?php 
        if(str_replace("test","",$domainKey)=="fben"||str_replace("test","",$domainKey)=="fbtw")
        {
            echo '<script src="./rsdk/rsdk.js"></script>
   <script src="https://connect.facebook.net/en_US/fbinstant.6.0.js"></script>';
        }
    ?>
</head>

<body>
    <div style="margin: auto;width: 100%;height: 100%;" class="egret-player"
         data-entry-class="Main"
         data-orientation="portrait"
         data-orientation="portrait"
         data-frame-rate="30"
         data-content-width="640"
         data-multi-fingered="2"
         <?php
            if(isset($_REQUEST['publishplat'])&&$_REQUEST['publishplat']!=''&&isset($_REQUEST['local'])&&$_REQUEST['local']=='local')
            {
                echo 'data-show-fps="true" data-show-log="false"';
            }
            else
            {
                echo 'data-show-fps="false" data-show-log="false"';
            }
         ?>
         
         data-show-fps-style="x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9">
    </div>
    <?php
        $platkey=str_replace("test","",$domainKey);
        if($useImgCfg[$platkey]||strstr($platkey,"iosshenhe")||true)
        {
            $imgExt='';
            if($useImgCfg[$platkey])
            {
                $imgExt='_'.$platkey;
            }
            if($platkey=="ru" || $platkey=="en" || $platkey=="th")
            {
                 echo '<div id="alertdiv" style="position:absolute;width:100%;top:10%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
        <img id = "logoImg" src="loading/loading'.$imgExt.'.jpg?vs=57" width="100%"></br>';
            }
            else
            {
                 echo '<div id="alertdiv" style="position:absolute;width:100%;top:30%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
        <img id = "logoImg" src="loading/loading'.$imgExt.'.jpg?vs=57" width="100%"></br>';
            }

           
        if($useImgTipCfg[$platkey] || $platkey=="en" || $platkey=="th"||true)
        {   
            $reloadTip1="如无法进入游戏";
            $reloadTip2="点击刷新";
            if($useImgTipCfg[$platkey])
            {
                $reloadTip1=$useImgTipCfg[$platkey]["1"];
                $reloadTip2=$useImgTipCfg[$platkey]["2"];
            }
            if($platkey=="ru")
            {
                 echo '<tf id="rayIdxload1" style="position:relative;color: #000000;font-size: 24;top:10%;">'.$reloadTip1.'
                    <a id="rayIdxload2" href = "javascript:void(0);" onclick ="js_creload()" style="color: #ff0000;font-size: 24;text-align:center;">'.$reloadTip2.'</a></tf><br>';
            }
            else
            {
                 echo '<tf id="rayIdxload1" style="position:relative;color: #000000;font-size: 24;top:30%;">'.$reloadTip1.'
                    <a id="rayIdxload2" href = "javascript:void(0);" onclick ="js_creload()" style="color: #ff0000;font-size: 24;text-align:center;">'.$reloadTip2.'</a></tf><br>';
            }
           
        }
        if($platkey=="ru" || $platkey=="en" || $platkey=="th")
        {
            echo '<progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:10%"></progress>
        </div>';
        }
        else
        {
            echo '<progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:30%"></progress>
        </div>';
        }
        
            if(strstr($platkey,"iosshenhe_xy"))
            {
                echo '<script type="text/javascript">';
                echo 'var progress = document.getElementById("loadJsProgress");';
                echo 'progress.style.display="none";';
                echo '</script>';
            }
        }
        else
        {
            echo ' <div id="alertdiv" style="position:absolute;width:100%;top:30%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
            <img id = "logoImg" src="loading/loading.jpg?vs=57" width="100%"></br><progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:30%"></progress>
            </div>';
        }
        $loadFailDivTip1='网络异常';
        $loadFailDivTip2='请检查网络或尝试wifi和流量互切';
        $loadFailDivTip3='重试';
        if($loadFailDivTipCfg[$platkey])
        {
            $loadFailDivTip1=$loadFailDivTipCfg[$platkey]["1"];
            $loadFailDivTip2=$loadFailDivTipCfg[$platkey]["2"];
            $loadFailDivTip3=$loadFailDivTipCfg[$platkey]["3"];
        }
        echo '<script type="text/javascript">
        var window_width = document.documentElement.clientWidth||window.screen.availWidth||0;
        var window_height = document.documentElement.clientHeight||window.screen.availHeight||0;
        if(window_width / window_height > 9 / 16)
        {
            document.getElementById("logoImg").style.maxWidth = "320px";
        }
        </script>
        <div id="gameloadresfaildiv" style="border: 1px solid;width: 100%;margin: auto;height: 100%;position: fixed;left: 0px;top: 0px;background: rgb(0,0,0,0.6);overflow: auto;text-align: center;display: none;">
        <div style="background: white;width: 250px;height: 150px;margin: auto;margin-top: 48%;border-radius: 5px;">
            <div style="height: 110px;border-bottom: 1px solid #CCCCCC;">
                <div style="font-size: 0.9rem;padding-top: 30px;">'.$loadFailDivTip1.'</div>
                <div style="font-size: 0.8rem;margin-top: 15px;">'.$loadFailDivTip2.'</div>
            </div>
            <div style="height: 39px;">
                <div onclick="javascript:window.retryloadgamefailres()" style="float: none;height: 39px;line-height: 39px;font-size: 1rem;">'.$loadFailDivTip3.'</div>
            </div>
        </div>
    </div>';
    ?>

    <script type="text/javascript">
        // document.body.addEventListener("blur",function(){
        //     window.scrollTo(0,0);
        // },true);

        var checkNativeGT=function()
        {
            var result=false;
            var ua = navigator.userAgent.toLowerCase();
            if (ua.indexOf("egretnative") >= 0) {
                result=true;
            }
            return result;
        }

        // var getRtOS=function()
        // {
        //     var tmpIsMobile=(ua.indexOf('mobile') != -1 || ua.indexOf('android') != -1);
        //     var tmpRtOS='';
        //     var ua = navigator.userAgent.toLowerCase();
        //     if (tmpIsMobile) {
        //         if (ua.indexOf("windows") < 0 && (ua.indexOf("iphone") != -1 || ua.indexOf("ipad") != -1 || ua.indexOf("ipod") != -1)) {
        //             tmpRtOS = "iOS";
        //         }
        //         else if (ua.indexOf("android") != -1 && ua.indexOf("linux") != -1) {
        //             tmpRtOS = "Android";
        //         }
        //     }
        //     else if(navigator.platform == "MacIntel" && navigator.maxTouchPoints > 1){
        //         tmpRtOS = "iOS";
        //         tmpIsMobile = true;
        //     }
        //     return tmpRtOS;
        // }

        var showIdxNetErrTip=function(callback)
        {
            if(checkNativeGT())
            {
                var toNativeMsg = { func: "showOfflineView",data:{}};
                window["egret"].ExternalInterface.call("sendToNative", JSON.stringify(toNativeMsg));
            }
            else
            {
                var divId="gameloadresfaildiv";
                var element = document.getElementById(divId);
                if(element)
                {
                    element.style.display="block";
                    window.retryloadgamefailres=function(){
                        element.style.display="none";
                        callback&&callback();
                    }
                }
            }
        }


        var js_creload=function()
        {
            <?php
            if($domainCfg[$domainKey])
            {
                echo 'if(window.requestGetStep)
                {
                    requestGetStep("reload_1");
                }';
            }
            ?>
            if(window["RSDKPlatform"])
            {
                if(window["RSDKPlatform"].getDisableCache&&window["RSDKPlatform"].getDisableCache()!="1")
                {
                    if(window["RSDKPlatform"].clearCache)
                    {
                        window["RSDKPlatform"].clearCache("1");
                    }
                }
            }
            window.location.reload();
        }
        var window_width = document.documentElement.clientWidth||window.screen.availWidth||0;
        var window_height = document.documentElement.clientHeight||window.screen.availHeight||0;
        if(window_width==0&&window_height==0)
        {
            window_width=640;
            window_height=1136;
        }
        var fontsizeValue=document.body.scrollWidth;
        if(window_height/window_width<1136/640)
        {
            var tmpH=document.body.scrollHeight<640?640:document.body.scrollHeight;
            fontsizeValue=tmpH*640/1136;
        }
        else
        {
            fontsizeValue=fontsizeValue<320?320:fontsizeValue;
        }
        if(document.getElementById("rayIdxTitle"))
        {
            document.getElementById("rayIdxTitle").style.fontSize =Math.ceil(15*fontsizeValue/320)+"px";
            document.getElementById("rayIdxDesc1").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
            document.getElementById("rayIdxDesc2").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
            document.getElementById("rayIdxDesc3").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
            document.getElementById("rayIdxDesc4").style.fontSize =Math.ceil(13*fontsizeValue/320)+"px";
        }
        if(document.getElementById("rayIdxload1"))
        {
            document.getElementById("rayIdxload1").style.fontSize =Math.ceil(10*fontsizeValue/320)+"px";
            document.getElementById("rayIdxload2").style.fontSize =Math.ceil(10*fontsizeValue/320)+"px";
        }
    </script>

    <script>
        <?php
            if(str_replace("test","",$domainKey)=="tw")
            {
                echo 'if(location.protocol=="http:"&&location.search.indexOf("r_plat=heyue3th&r_bid=17004000&r_host=gd-sdk.heyyogame.com")>-1)
        {
            var chref=window.location.href;
            chref=chref.replace("http:","https:")
            window.location.href=chref;
        }
        ';
            }
            else if(str_replace("test","",$domainKey)=="ty")
            {
                echo 'if(location.protocol=="http:")
        {
            var chref=window.location.href;
            chref=chref.replace("http:","https:")
            window.location.href=chref;
        }
        ';
            }
        ?>
        window["VERINFO_VER"]=5;
		// var window_width = document.documentElement.clientWidth;
	    // var window_height = document.documentElement.clientHeight;
    	var egretDocument = document.getElementsByClassName("egret-player")[0];
        var isPC=false;
        var isIpad = false;
        var p=navigator.platform;
        if(p.indexOf("Win")==0||p.indexOf("Mac")==0||p=="X11")
        {
            isPC=true;
        }
        <?php
            if($domainKey=="ty")
            {
                echo 'window_width=window.screen.width;
                window_height=window.screen.height;';
            }
            $runtime='';
            if(isset($_REQUEST['runtime']))
            {
                $runtime=$_REQUEST['runtime'];
            }
            else if($domainKey=="xl" || (isset($_REQUEST['r_plat'])&&$_REQUEST['r_plat']=='h5yaya-17018010'&&$runtime!="wx"))
            {   
                echo ' window.rgame_rotation = 1;
                if(window.screen.width>window.screen.height)
                {   
                   
                    window_width=window.screen.height;
                    window_height=window.screen.width;
                }
                else
                {
                    window_width=window.screen.width;
                    window_height=window.screen.height;
                }';
            }
        ?>
        if(window_height/window_width>=1280/640)
        {
            egretDocument.setAttribute("data-content-height",(window_height/window_width*640).toString());
        }
        else if(window_height/window_width<=1136/640)
        {
            isIpad = true;
            egretDocument.setAttribute("data-content-height","1136");
        }
        else
        {
            egretDocument.setAttribute("data-content-height",(window_height/window_width*640).toString());
        }
        if(isIpad){
            egretDocument.setAttribute("data-scale-mode","showAll");
        }else{
            egretDocument.setAttribute("data-scale-mode","exactFit");
        }
        if(isPC)
        {
            if(egretDocument.getAttribute("data-scale-mode"))
            {
                egretDocument.setAttribute("data-scale-mode","showAll");
            }
            if(egretDocument.getAttribute("data-orientation"))
            {
                egretDocument.setAttribute("data-orientation","auto");
            }
        }
        
        if(window["RSDKPlatform"])
        {
            if(window["RSDKPlatform"].clearCache)
            {
                if(window["RSDKPlatform"].setDisableCache)
                {
                    if(window.location.search&&window.location.search.indexOf("gamediscache=0")>-1)
                    {
                    }
                    else
                    {
                        if(window["RSDKPlatform"].getDisableCache()=="1")
                        {
                            window["RSDKPlatform"].setDisableCache("0");
                            console.log("open newcache");
                        }
                    }
                }
            }
            else
            {
                if(window["RSDKPlatform"].setDisableCache)
                {
                    window["RSDKPlatform"].setDisableCache("1");
                    console.log("close newcache");
                }
            }
        }
    </script>
    <script>
        function pingGameCdn(cdnUrl,callback){
            // if(!checkNativeGT())
            // {
            //     var img = new Image();
            //     var start = new Date().getTime();
            //     img.src = cdnUrl + start;
            //     var flag = false;  //无法访问
            //     img.onload = function(){
            //         flag = true;
            //         console.log('ok'+(new Date().getTime()-start));
            //         if(callback)
            //         {
            //             callback(cdnUrl);
            //         }
            //     };
            //     img.onerror = function(){
            //         flag = true;
            //         console.log('ok'+(new Date().getTime()-start));
            //         if(callback)
            //         {
            //             callback(cdnUrl);
            //         }
            //     };
            // }
            // var timer = setTimeout(function(){
            //     if(!flag){    //如果真的无法访问
            //         flag = false;
            //         console.log('failed');
            //     }
            // },1500);
        }
    </script>
    <script>

        var setIndexProgress=function (value)
        {
            if(checkNativeGT())
            {
                if(value<=80)
                {
                    value=value*0.8;
                }
                if(window.location.pathname.indexOf("shenhe")==-1)
                {
                    if(window["egret"]&&egret.ExternalInterface)
                    {
                        egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "setProgress", data: { value: value } }));
                    }
                }
            }
            else
            {
                var progress = document.getElementById('loadJsProgress');
                progress.value=value;
                if(value>=100)
                {
                    progress.style.display="none";
                }
            }
        }

        var fbNm=0;
        var isGmRsCrossD=false;
        var host=window.location.host;
        var baseURI=document.baseURI;
        var gameScriptLoadCountData={};
        var defaultgameCDN=baseURI;
        var lastgameCDN=baseURI;
        <?php
            echo 'var gameCDNArr='.getAllCDN($urlCfg,$requri).';';
        ?>
        var isReceiveCdnPing=false;
        function pingGameCdnCallback(cdnUrl)
        {
            if(!isReceiveCdnPing)
            {
                isReceiveCdnPing=true;
                var element = document.getElementById("gtgamebaseurl");
                if(element)
                {
                    element.setAttribute("href",cdnUrl);
                }
            }
        }
        if(gameCDNArr&&gameCDNArr.length>1)
        {
            for(var i=0;i<gameCDNArr.length;i++)
            {
                pingGameCdn(gameCDNArr[i],pingGameCdnCallback);
            }
        }
        
        if(baseURI&&baseURI.indexOf(host)<0)
        {
            isGmRsCrossD=true;
        }
        var loadScript = function (list, callback) {
            var loaded = 0;
            var loadNext = function () {
                loadSingleScript(list[loaded], function () {
                    loaded++;
                    setIndexProgress(Math.floor(loaded/list.length*100));
                    <?php 
                        if($platkey=="fben"||$platkey=="fbtw")
                        {
                            echo 'FBInstant.setLoadingProgress(Math.floor(progress.value*0.97));';
                        }
                    ?>
                    if (loaded >= list.length) {
                        <?php
                            if($domainKey=="xl" || (isset($_REQUEST['r_plat'])&&$_REQUEST['r_plat']=='h5yaya-17018010'))
                            {
                                echo 'var alertdiv1=document.getElementById("alertdiv");
                                if(alertdiv1)
                                {
                                    alertdiv1.style.display="none";
                                }';
                            }
                            if($platkey=="fben"||$platkey=="fbtw")
                            {
                                echo 'var loadgametimeout=setTimeout(function(){
            if(loadgametimeout&&loadgametimeout>-1)
            {
                clearTimeout(loadgametimeout);
                loadgametimeout=-1;
            }
            FBInstant.setLoadingProgress(100);
        },2500);';
                            }
                        ?>
                        fbNm++;
                        callback();
                    }
                    else {
                        loadNext();
                    }
                },function(){
                    if(trySwitchCDN(list[loaded],list,loaded)<12)
                    {
                        if(checkNativeGT()&&gameScriptLoadCountData[list[loaded]]==3)
                        {
                            showIdxNetErrTip(loadNext);
                        }
                        else
                        {
                            loadNext();
                        }
                    }
                    else
                    {
                        showIdxNetErrTip(loadNext);
                    }
                });
            };
            loadNext();
        };

            <?php
                if($domainCfg[str_replace("test","",$domainKey)])
                {
                echo 'var requestGetStepData={};
                    var requestGetStep=function(step){
                    if(!requestGetStepData[step])
                    {
                        var getxhr = new XMLHttpRequest();
                        getxhr.open("GET", "//'.$domainCfg[str_replace("test","",$domainKey)].'/tank-global/index.php/?t=sendstepstat&step="+step, true);
                        getxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
                        getxhr.send();
                        requestGetStepData[step]=1;
                    };
                };
                requestGetStep("1_1");';
                }
            ?>

    var reportIndexLoadResult=function(filename)
    {
        var logstrData={filename:filename,base:document.baseURI,failnum:(gameScriptLoadCountData[filename]?gameScriptLoadCountData[filename]:0),href:location.href};
        var gtplat = location.pathname.substr(0,location.pathname.lastIndexOf("/"));
        gtplat=gtplat.substr(gtplat.lastIndexOf("/")+1);
        var rptData={filename:"index",logstr:JSON.stringify(logstrData),platform:gtplat};
        var rxhr=new XMLHttpRequest();
        rxhr.open("POST","//gt-clientlog.raygame3.com/create_errorlog.php");
        rxhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        rxhr.send(JSON.stringify(rptData));
    }

    var startLoadSingleScriptT=-1;
    var loadSingleScript = function (src, callback,loadFailCallback) {
        var s = document.createElement('script');
        if(isGmRsCrossD)
        {
            s.setAttribute("crossorigin","anonymous");
        }
        startLoadSingleScriptT=setTimeout(function(){
            cjserrored();
        }, 60000);
        var isgamejserror=false;
        s.async = false;
        s.src = src;
        var cjsloaded=function () {
            if(startLoadSingleScriptT!=-1)
            {
                clearTimeout(startLoadSingleScriptT);
                startLoadSingleScriptT=-1;
            }
            s.parentNode.removeChild(s);
            s.removeEventListener('load', cjsloaded, false);
            s.removeEventListener('error', cjserrored);
            callback();
        };
        s.addEventListener('load', cjsloaded, false);

        var cjserrored=function () {
            if(startLoadSingleScriptT!=-1)
            {
                clearTimeout(startLoadSingleScriptT);
                startLoadSingleScriptT=-1;
            }
            if(isgamejserror==false)
            {
                isgamejserror=true;
                setTimeout(function() {
                    if(s.parentNode)
                    {
                        s.parentNode.removeChild(s);
                    }
                    s.removeEventListener('load', cjsloaded, false);
                    s.removeEventListener('error', cjserrored);
                    if(loadFailCallback)
                    {
                        loadFailCallback();
                    }
                    
                }, 100);
            }
        };
        s.addEventListener("error", cjserrored);
        s.onreadystatechange=function(){
            if (s.readyState == 4&&(s.status >= 400||s.status ==0))
            {
                cjserrored();
            }
        };
        document.body.appendChild(s);
    };

    var trySwitchCDN=function(filename,list,loaded,addValue)
    {
        if(!addValue)
        {
            addValue=1;
        }
        if(!gameScriptLoadCountData[filename])
        {
            gameScriptLoadCountData[filename]=addValue;
        }
        else
        {
            gameScriptLoadCountData[filename]+=addValue;
        }

        if(gameScriptLoadCountData[filename]==4)
        {
            if(filename.indexOf("//sdk-h5-cdn.rjoy.com/rsdk/rsdk.js")>-1)
            {
                if(list)
                {
                    list[loaded]=list[loaded].replace("//sdk-h5-cdn.rjoy.com",".");
                    gameScriptLoadCountData[filename]=1;
                    reportIndexLoadResult(filename);
                }
            }
            else
            {
                var element = document.getElementById("gtgamebaseurl");
                if(element)
                {
                    lastgameCDN=document.baseURI;
                    <?php
                        $newCDN=getCDNbyCfg($urlCfg,$requri,true);
                        echo 'var bseurl="'.$newCDN.'";
                        element.setAttribute("href",bseurl);';
                    ?>
                }
            }
        }
        else if(gameScriptLoadCountData[filename]==8)
        {
            var element = document.getElementById("gtgamebaseurl");
            if(element)
            {
                <?php
                    $newCDN=getCDNbyCfg($urlCfg,$requri,true);
                    echo 'var bseurl="./";
                    element.setAttribute("href",bseurl);';
                ?>
            }
        }

        if(gameScriptLoadCountData[filename]%4==0)
        {
            reportIndexLoadResult(filename);
        }
        return gameScriptLoadCountData[filename];
    }

    var recoveryCDN=function(filename,baseurl)
    {
        if(gameScriptLoadCountData[filename]&&gameScriptLoadCountData[filename]>=4)
        {
            var element = document.getElementById("gtgamebaseurl");
            if(element)
            {
                <?php
                    echo 'var bseurl=baseurl?baseurl:defaultgameCDN;
                    element.setAttribute("href",bseurl);';
                ?>
            }
        }
        gameScriptLoadCountData[filename]=0;
    }

    var retryManifest=function()
    {
        if(trySwitchCDN(manifestJsonName)<12)
        {
            loadManifest();
        }
        else
        {
            showIdxNetErrTip(loadManifest);
        }
    }

    var defaultResJsonName="default.res.json";
    var manifestJsonName="manifest.json";
    var loadManifest=function()
    {
        var xhr = new XMLHttpRequest();
        var idxdatev=new Date();
        var ismanierror=false;
        xhr.open('GET', manifestJsonName=="manifest.json"?manifestJsonName+'?v=' + Math.floor(idxdatev.getTime()/1000):manifestJsonName, true);
        xhr.addEventListener("load", function () {
            var manifest = JSON.parse(xhr.response);
            var list = manifest.initial.concat(manifest.game);
            <?php 
                if($platkey!="fben"&&$platkey!="fbtw")
                {
                //     if(isset($_REQUEST['publishplat'])&&$_REQUEST['publishplat']!=''&&isset($_REQUEST['local'])&&$_REQUEST['local']=='local')
                //     {
                //         echo 'var rsdkurl = "//gt-local-web01.raygame3.com/client/local/gt_local/rsdk/rsdk.js?v="+Math.floor(idxdatev.getTime()/10000);
                // list.unshift(rsdkurl);';
                //     }
                //     else
                //     {
                        echo 'var rsdkurl = "//sdk-h5-cdn.rjoy.com/rsdk/rsdk.js?v="+Math.floor(idxdatev.getTime()/10000);
                list.unshift(rsdkurl);';
                    // }
                }
            ?>

            loadScript(list, runEgret);
        });
        xhr.addEventListener("error", function () {
            xhr.abort();
            if(ismanierror==false)
            {
                ismanierror=true;
                setTimeout(function() {
                    retryManifest();
                }, 100);
            }
        });
        xhr.onreadystatechange=function(){
            if (xhr.readyState == 4&&(xhr.status >= 400||xhr.status ==0))
            {
                if(ismanierror==false)
                {
                    ismanierror=true;
                    setTimeout(function() {
                        retryManifest();
                    }, 100);
                }
            }            
        };
        xhr.send(null);
    }
    loadManifest();
    <?php 
        if($platkey=="fben"||$platkey=="fbtw")
        {
            echo 'var FBInstant = window["FBInstant"];
    console.log("FBInstant.initializeAsync");
    FBInstant.initializeAsync().then(function(){
        fbNm++;
        runEgret();
    });';
        }
    ?>
    var runEgret=function () {
        <?php 
            if($platkey=="fben"||$platkey=="fbtw")
            {
                echo 'if(fbNm<2){return;};';
            }
        ?>
        /**
         * {
         * "renderMode":, //Engine rendering mode, "canvas" or "webgl"
         * "audioType": 0 //Use the audio type, 0: default, 2: web audio, 3: audio
         * "antialias": //Whether the anti-aliasing is enabled in WebGL mode, true: on, false: off, defaults to false
         * "calculateCanvasScaleFactor": //a function return canvas scale factor
         * }
         **/
            var ua3="";
            var audioTp=0;
            try {
                ua3=navigator.userAgent.toLowerCase();
                if(ua3.indexOf("micromessenger") >= 0)
                {
                    audioType = 0;
                }
                else if (ua3.indexOf("android") >= 0) {//android
                    var andStr= ua3.substring(ua3.indexOf("android"));
                    andStr= andStr.substring(0,andStr.indexOf("."));
                    andStr= andStr.replace("android","");
                    andStr= andStr.replace(/\r/g,"");
                    if(Number(andStr)<5)
                    {
                        audioTp=3;
                    }
                    else
                    {
                        var audioTp3Arr=["lex","od10","os10","oppo"];
                        for(var i=0;i<audioTp3Arr.length;i++)
                        {
                            if(ua3.indexOf(audioTp3Arr[i])>-1)
                            {
                                audioTp=3;
                                break;
                            }
                        }
                    }
                }
            } catch (error) 
            {
                audioTp=3;
            }
        <?php
            if($domainCfg[$domainKey])
            {
                echo 'if(window.requestGetStep)
                {
                    requestGetStep("1_2");
                }';
            }
        ?>
        var gamerenderMode="webgl";
        if(window.location.search.indexOf("&webgl=0")>-1||window.location.search.indexOf("?webgl=0")>-1)
        {
            gamerenderMode="canvas";
        }
        egret.runEgret({ renderMode: gamerenderMode, audioType: audioTp, calculateCanvasScaleFactor:function(context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
            return (window.devicePixelRatio || 1) / backingStore;
        }});
    };
</script>
</body>

</html>