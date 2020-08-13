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
        $pubnocdniparr=array(
            "36.108","49.112","49.117","110.155.38.22","223.104.131.194","117.173.97.209","110.156.97.5","110.155.39.178",
            "218.31.226.21",
        );
        $nocdniparr=array(
            "xl"=>$pubnocdniparr,
            "ty"=>$pubnocdniparr,
            "jj"=>array(
                "223.104","117.136","117.178.154.183",
            ),
        );

        $xlpidarr=array(
            "7e32902af17660864fa4704d11b0b861","1a4e848fe25bece3d3d50eca2dbcdba8","6192cb11c537a6550140497c9f150f89","1d9c1569ac8c955aae67f3ebba222270",
        );
        
        $isTest=false;
        if(in_array($ip,$iparr)||(isset($_REQUEST['raytestol'])&&$_REQUEST['raytestol']=='testol'))
        {
            $isTest=true;
        }
        $isNocdn=false;

        $cdnCfg=array(
            "3k"=>array("gt-3kwan-cdn.raygame3.com"),
            "fkylc"=>array("gt-fkylc-cdn.raygame3.com"),
            "tw"=>array("gdcdn.heyyogame.com"),
            "wanba"=>array("wanba-cdn-1251001051.file.myqcloud.com"),
            "xly"=>array("gt-xly-cdn.raygame3.com"),
            "yyb"=>array("wanba-cdn-1251001051.file.myqcloud.com"),
            "fkcw"=>array("gt-fkcw-cdn.raygame3.com"),
            "kr"=>array("gtcdn.mayngames.co.kr"),
            "cps"=>array("gt-cps-cdn.raygame3.com"),
            "ty"=>array("gt-ty-cdn.raygame3.com"),
            "xl"=>array("gt-xl-cdn.raygame3.com"),
            "jj"=>array("gt-jj-cdn.raygame3.com"),
            "mm"=>array("gt-mm-cdn.raygame3.com"),
            "th"=>array("gdcdn.heyyogame.com"),
            "en"=>array("pubgame38-rda.myserver.asia"),
            "idn"=>array("sea1-jsmr.static.kunlun.com"),
            "xy"=>array("gt-xy-cdn.raygame3.com"),
            "ru"=>array("gt-ru-cdn.heyyogame.com"),
        );
        
        $urlCfg = array(
            // 3k
            "gt_3k"=>array("//gt-3kwan-cdn.raygame3.com/gt_3k/",),
            "gt_test3k"=>array("//gt-3kwan-cdn.raygame3.com/gt_test3k/",),

            //疯狂游乐场
            "gt_fkylc"=>array("//gt-fkylc-cdn.raygame3.com/gt_fkylc/",),
            "gt_testfkylc"=>array("//gt-fkylc-cdn.raygame3.com/gt_testfkylc/",),

            //港台和悦
            //gdcdn.heyyogame.com
            "gt_tw"=>array("//gdcdn-aws.heyyogame.com/gt_tw/","//gdcdn-aliyun.heyyogame.com/gt_tw/",),
            "gt_testtw"=>array("//gdcdn-aws.heyyogame.com/gt_testtw/","//gdcdn-aliyun.heyyogame.com/gt_testtw/",),

            //玩吧
            "gt_wanba"=>array("//wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/",),
            "gt_testwanba"=>array("//wanba-cdn-1251001051.file.myqcloud.com/gt_testwanba/",),

            //享乐源
            "gt_xly"=>array("//gt-xly-cdn.raygame3.com/gt_xly/",),
            "gt_testxly"=>array("//gt-xly-cdn.raygame3.com/gt_testxly/",),

            //应用宝
            "gt_yyb"=>array("//wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/",),
            "gt_testyyb"=>array("//wanba-cdn-1251001051.file.myqcloud.com/gt_testwanba/",),

            //疯狂长尾
            "gt_fkcw"=>array("//gt-fkcw-cdn.raygame3.com/gt_fkcw/",),
            "gt_testfkcw"=>array("//gt-fkcw-cdn.raygame3.com/gt_testfkcw/",),

            //韩国
            "gt_kr"=>array("//gtcdn.mayngames.co.kr/gt_kr/",),
            "gt_testkr"=>array("//gtcdn.mayngames.co.kr/gt_testkr/",),

            //cps
            "gt_cps"=>array("//gt-cps-cdn.raygame3.com/gt_cps/",),
            "gt_testcps"=>array("//gt-cps-cdn.raygame3.com/gt_testcps/",),

            //ty
            "gt_ty"=>array("//gt-ty-cdn.raygame3.com/gt_ty/",),
            "gt_testty"=>array("//gt-ty-cdn.raygame3.com/gt_testty/",),

            //xl
            "gt_xl"=>array("//gt-xl-cdn.raygame3.com/gt_xl/",),
            "gt_testxl"=>array("//gt-xl-cdn.raygame3.com/gt_testxl/",),

            //jj
            "gt_jj"=>array("//gt-jj-cdn.raygame3.com/gt_jj/",),
            "gt_testjj"=>array("//gt-jj-cdn.raygame3.com/gt_testjj/",),

            //陌陌
            "gt_mm"=>array("//gt-mm-cdn.raygame3.com/gt_mm/",),
            "gt_testmm"=>array("//gt-mm-cdn.raygame3.com/gt_testmm/",),

            //微信
            "gt_wx"=>array("//gt-wx-cdn.raygame3.com/gt_wx/",),
            "gt_testwx"=>array("//gt-wx-cdn.raygame3.com/gt_testwx/",),

            //泰文
            "gt_th"=>array("//gt-th-cdn.heyyogame.com/gt_th/",),
            "gt_testth"=>array("//gt-th-cdn.heyyogame.com/gt_testth/",),

            //俄文
            "gt_ru"=>array("//gt-ru-cdn.heyyogame.com/gt_ru/",),
            "gt_testru"=>array("//gt-ru-cdn.heyyogame.com/gt_testru/",),

            //英文
            "gt_en"=>array("//pubgame38-rda.myserver.asia/gt_en/","//gdencdn-aws.heyyogame.com/gt_en/",),
            "gt_testen"=>array("//pubgame38-rda.myserver.asia/gt_testen/","//gdencdn-aws.heyyogame.com/gt_testen/",),

            // 闲逸
            "gt_xy"=>array("//gt-xy-cdn.raygame3.com/gt_xy/",),
            "gt_testxy"=>array("//gt-xy-cdn.raygame3.com/gt_testxy/",),
            
            //闲逸审核服
            "gt_iosshenhe_xy"=>array("//gt-xy-shenhe-cdn.raygame3.com/gt_iosshenhe_xy/"),

            //葡语
            "gt_pt"=>array("//pubgame38-rda.myserver.asia/gt_pt/","//gdencdn-aws.heyyogame.com/gt_pt/",),
            "gt_testpt"=>array("//pubgame38-rda.myserver.asia/gt_testpt/","//gdencdn-aws.heyyogame.com/gt_testpt/",),

            //英文繁体
            "gt_en_tw"=>array("//pubgame38-rda.myserver.asia/gt_en_tw/","//gdencdn-aws.heyyogame.com/gt_en_tw/",),
            "gt_testen_tw"=>array("//pubgame38-rda.myserver.asia/gt_testen_tw/","//gdencdn-aws.heyyogame.com/gt_testen_tw/",),

            //英文葡语
            "gt_en_pt"=>array("//pubgame38-rda.myserver.asia/gt_en_pt/","//gdencdn-aws.heyyogame.com/gt_en_pt/",),
            "gt_testen_pt"=>array("//pubgame38-rda.myserver.asia/gt_testen_pt/","//gdencdn-aws.heyyogame.com/gt_testen_pt/",),

            //英文俄语
            "gt_en_ru"=>array("//pubgame38-rda.myserver.asia/gt_en_ru/","//gdencdn-aws.heyyogame.com/gt_en_ru/",),
            "gt_testen_ru"=>array("//pubgame38-rda.myserver.asia/gt_testen_ru/","//gdencdn-aws.heyyogame.com/gt_testen_ru/",),
            

            );

            $appNameCfg=array(
                "kr"=>"역천",
                "tw"=>"一個官人七個妻",
                "yyb"=>"极品大官人",
                "3k"=>"极品大官人",
                "th"=>"Lord&Beauties",
                "idn"=>"idn",
                "fben"=>"Beauties collection",
                "fbtw"=>"一個官人七個妻",
                "en_tw"=>"一個官人七個妻",
                "en_pt"=>"Imperador e as Beldades",
                "en_ru"=>"Император и Красавицы",
                "ru"=>"Император и Красавицы",
                );

            $useImgCfg=array(
                "kr"=>1,
                "th"=>1,
                "tw"=>1,
                "en"=>1,
                "idn"=>1,
                "fben"=>1,
                "fbtw"=>1,
                "en_tw"=>1,
                "en_pt"=>1,
                "en_ru"=>1,
                "ru"=>1,
            );

            $useImgTipCfg=array(
                "th"=>array("1"=>"เข้าเกมส์ไม่ได้ กรุณา","2"=>"คลิกรีเฟรช"),
                "tw"=>array("1"=>"如果無法進入遊戲，請","2"=>"點擊刷新"),
                "en"=>array("1"=>"If you fail to enter game. Please ","2"=>"click here"),
                "kr"=>array("1"=>"게임이 원활하지 않을 시","2"=>"<새로고침 하기>"),
                "en_tw"=>array("1"=>"如果無法進入遊戲，請","2"=>"點擊刷新"),
                "en_pt"=>array("1"=>"Se você não conseguir entrar no jogo ","2"=>"clique aqui"),
                "en_ru"=>array("1"=>"Если вы не можете войти в игру. ","2"=>"Нажмите здесь"),
                "ru"=>array("1"=>"Если вы не можете войти в игру. ","2"=>"Нажмите здесь"),
            );
            /**
             * 加载失败弹框翻译文字
             */
            $loadFailDivTipCfg=array(
                "th"=>array("1"=>"อินเตอร์เน็ตขัดข้อง","2"=>"กรุณาเช็คเน็ตอีกครั้งหรือสลับระหว่างWi-Fiกับเน็ตมือถือ","3"=>"ลองใหม่"),
                "tw"=>array("1"=>"網絡異常","2"=>"請檢查網絡是否暢通","3"=>"重試"),
                "en"=>array("1"=>"Network Error ","2"=>"Please check your connection or switch between wifi and cellular.","3"=>"Retry"),
                "kr"=>array("1"=>"네트워크 오류","2"=>"네트워크 연결을 확인해주세요","3"=>"다시 시도"),
                "en_tw"=>array("1"=>"網絡異常","2"=>"請檢查網絡是否暢通","3"=>"重試"),
                "en_pt"=>array("1"=>"Network Error ","2"=>"Please check your connection or switch between wifi and cellular.","3"=>"Retry"),
                "en_ru"=>array("1"=>"Network Error ","2"=>"Please check your connection or switch between wifi and cellular.","3"=>"Retry"),
                "ru"=>array("1"=>"Network Error ","2"=>"Please check your connection or switch between wifi and cellular.","3"=>"Retry"),
            );

            $domainCfg=array(
                "wanba"=>"gt-wanba-web01.raygame3.com",
                "3k"=>"gt-cn-in.raygame3.com",
                "local"=>"192.168.8.82",
                "locals"=>"local-test-82.raygame3.com",
                "test"=>"gt-test.raygame3.com",
                "yyb"=>"gt-yyb-web01.raygame3.com",
                "tw"=>"gd-game.heyyogame.com",
                "fkylc"=>"gt-fkylc-web01.raygame3.com",
                "xly"=>"gt-xly-web01.raygame3.com",
                "xzy"=>"gt-xzy-web01.raygame3.com",
                "iosshenhe"=>"gt-shenhe.raygame3.com",
                "zjly"=>"gt-zjly-web01.raygame3.com",
                "ewan"=>"gt-ewan-web01.raygame3.com",
                "49y"=>"gt-49y-web01.raygame3.com",
                "sf"=>"gt-sf-web01.raygame3.com",
                "kr"=>"gt-kr-web01.mayngames.co.kr",
                "fkcw"=>"gt-fkcw-web01.raygame3.com",
                "9130"=>"gt-9130-web01.raygame3.com",
                "cps"=>"gt-cps-web01.raygame3.com",
                "ty"=>"gt-ty-web01.raygame3.com",
                "xl"=>"gt-xl-web01.raygame3.com",
                "jj"=>"gt-jj-web01.raygame3.com",
                "kr37"=>"gt-kr37-web01.37games.com",
                "mm"=>"gt-mm-web01.raygame3.com",
                "th"=>"gt-th-web01.heyyogame.com",
                "wx"=>"gt-wx-web01.raygame3.com",
                "en"=>"gt-en-web01.heyyogame.com",
                "idn"=>"gt-idn-web01.raygame3.com",
                "xy"=>"gt-xy-web01.raygame3.com",
                "en_tw"=>"gt-en-web01.heyyogame.com",
                "en_pt"=>"gt-en-web01.heyyogame.com",
                "en_ru"=>"gt-en-web01.heyyogame.com",
                "ru"=>"gt-ru-web01.heyyogame.com",
            );

            $netLineCfg=array(
                "en"=>array(
                    "gt-en-line1.heyyogame.com",
                    "gt-en-line2.heyyogame.com",
                    "gt-en-web01.heyyogame.com",
                ),
                "tw"=>array(
                    "gt-tw-line1.heyyogame.com",
                    "gt-tw-line2.heyyogame.com",
                    "gd-game01.heyyogame.com",
                ),
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

        function getNetLineArr($netLineCfg,$plat)
        {
            $tmpStr="[";
            $tmpLineCfg=$netLineCfg[$plat];
            if($tmpLineCfg)
            {
                foreach($tmpLineCfg as $k=>$v)
                {
                    $tmpStr=$tmpStr.'"'.$v.'",';
                }
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
            else
            {
                $arrv=$nocdniparr[str_replace("gt_","",$requri)];
                if($arrv)
                {
                    foreach($arrv as $k=>$v)
                    {
                        if(substr($ip,0,strlen($v))==$v)
                        {
                            $isNocdn=true;
                            break;
                        }
                    }
                }

            }
            if($isNocdn==false)
            {
                if(str_replace("gt_","",$requri)&&isset($_REQUEST['openId'])&&$_REQUEST['openId']!='')
                {
                    foreach($xlpidarr as $k=>$v)
                    {
                        if($v==$_REQUEST['openId'])
                        {
                            $isNocdn=true;
                            break;
                        }
                    }
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
        echo '<title>'.($appNameCfg[str_replace("test","",$domainKey)]?$appNameCfg[str_replace("test","",$domainKey)]:'江山美人').'</title>';
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
            background: #131F2C;
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
         data-frame-rate="30"
         data-content-width="640"
         data-multi-fingered="2"
         <?php
            if(isset($_REQUEST['publishplat'])&&$_REQUEST['publishplat']!=''&&isset($_REQUEST['local'])&&$_REQUEST['local']=='local')
            {
                echo 'data-show-fps="false" data-show-log="false"';
            }
            else
            {
                echo 'data-show-fps="false" data-show-log="false"';
            }
         ?>
         
         data-show-fps-style="x:0,y:0,size:12,textColor:0x161e2b,bgAlpha:1">
    </div>
    <?php
        $platkey=str_replace("test","",$domainKey);
        if($useImgCfg[$platkey]||strstr($platkey,"iosshenhe"))
        {
            $imgExt='';
            if($useImgCfg[$platkey])
            {
                $imgExt='_'.$platkey;
            }
            if($platkey=="ru" || $platkey=="en" || $platkey=="th")
            {
                 echo '<div id="alertdiv" style="position:absolute;width:100%;top:10%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
        <img src="loading/loading'.$imgExt.'.png?vs=58"></br>';
            }
            else
            {
                 echo '<div id="alertdiv" style="position:absolute;width:100%;top:20%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
        <img src="loading/loading'.$imgExt.'.png?vs=58"></br>';
            }

           
        if($useImgTipCfg[$platkey] || $platkey=="en" || $platkey=="th")
        {   
            if($platkey=="ru")
            {
                 echo '<tf id="rayIdxload1" style="position:relative;color: #ffffff;font-size: 24;top:10%;">'.$useImgTipCfg[$platkey]["1"].'
                    <a id="rayIdxload2" href = "javascript:void(0);" onclick ="js_creload()" style="color: #ff0000;font-size: 24;text-align:center;">'.$useImgTipCfg[$platkey]["2"].'</a></tf><br>';
            }
            else
            {
                 echo '<tf id="rayIdxload1" style="position:relative;color: #ffffff;font-size: 24;top:20%;">'.$useImgTipCfg[$platkey]["1"].'
                    <a id="rayIdxload2" href = "javascript:void(0);" onclick ="js_creload()" style="color: #ff0000;font-size: 24;text-align:center;">'.$useImgTipCfg[$platkey]["2"].'</a></tf><br>';
            }
           
        }
        if($platkey=="ru" || $platkey=="en" || $platkey=="th")
        {
            echo '<progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:10%"></progress>
        </div>';
        }
        else
        {
            echo '<progress id="loadJsProgress" value="15" max="100" style="position:relative;text-align:center;background:white;width:13em;height:0.3em;top:20%"></progress>
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
            echo '<div id="alertdiv" style="position:absolute;width:100%;top:30%;height:60%; left:0;text-align:center;color:white;font-size:20px;">
                <tl id="rayIdxTitle" style="color: #b0faff;font-size: 30;">健康游戏忠告</tl><br>
                <tf id="rayIdxDesc1" style="color: #6ebdc6;font-size: 26;">抵制不良游戏，拒绝盗版游戏。</tf><br>
                <tf id="rayIdxDesc2" style="color: #6ebdc6;font-size: 26;">注意自我保护，谨防受骗上当。</tf><br>
                <tf id="rayIdxDesc3" style="color: #6ebdc6;font-size: 26;">适度游戏益脑，沉迷游戏伤身。</tf><br>
                <tf id="rayIdxDesc4" style="color: #6ebdc6;font-size: 26;">合理安排时间，享受健康生活。</tf><br>
                <tf id="rayIdxload1" style="position:relative;color: #ffffff;font-size: 24;top:40%;">如果无法进入游戏，请
                <a id="rayIdxload2" href = "javascript:void(0);" onclick ="js_creload()" style="color: #ff0000;font-size: 24;text-align:center;">点击刷新</a></tf><br>
                <progress id="loadJsProgress" value="1" max="100" style="position:relative;text-align:center;background:white;width:16em;height:0.3em;top:40%"></progress>
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
        echo '<div id="gameloadresfaildiv" style="border: 1px solid;width: 100%;margin: auto;height: 100%;position: fixed;left: 0px;top: 0px;background: rgb(0,0,0,0.6);overflow: auto;text-align: center;display: none;">
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
            window_height=960;
        }
        var fontsizeValue=document.body.scrollWidth;
        if(window_height/window_width<3/2)
        {
            var tmpH=document.body.scrollHeight<640?640:document.body.scrollHeight;
            fontsizeValue=tmpH*2/3;
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
        window["VERINFO_VER"]=2;
		// var window_width = document.documentElement.clientWidth;
	    // var window_height = document.documentElement.clientHeight;
    	var egretDocument = document.getElementsByClassName("egret-player")[0];
        var isPC=false;
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
        if(window_height/window_width>=1136/640)
        {
            egretDocument.setAttribute("data-content-height",(window_height/window_width*640).toString());
        }
        else if(window_height/window_width<=960/640)
        {
            egretDocument.setAttribute("data-content-height","960");
        }
        else
        {
            egretDocument.setAttribute("data-content-height",(window_height/window_width*640).toString());
        }
        egretDocument.setAttribute("data-scale-mode","exactFit");
        if(isPC)
        {
            if(window_height/window_width<=1)
            {
                egretDocument.setAttribute("data-scale-mode","showAll");
            }
            egretDocument.setAttribute("data-orientation","auto");
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
        var gamePingData={};
        <?php
            echo 'var gameLineArr='.getNetLineArr($netLineCfg,str_replace("test","",$domainKey)).';';
        ?>
        window.hasSelectBestHost=false;

        var checkAndPingGameLine=function()
        {
            var checkNumAndPing=function(turl)
            {
                if(!gamePingData[turl])
                {
                    gamePingData[turl]=[];
                }
                if(gamePingData[turl].length<4)
                {
                    if(!hasSelectBestHost)
                    {
                        pingGameSvr(turl,checkNumAndPing);
                    }
                }
                else
                {
                    if(!hasSelectBestHost)
                    {
                        selectGameLine(turl);
                    }
                }
            }
            
            for (var i = 0; i < gameLineArr.length; i++) 
            {
                checkNumAndPing(gameLineArr[i]);
            }
        }

        var getFastLineHost=function()
        {
            if(!hasSelectBestHost)
            {
                var maxL=0;
                var maxkey=0;
                for (var key in gamePingData) 
                {
                    if (gamePingData.hasOwnProperty(key)) 
                    {
                        var l = gamePingData[key].length;
                        if(l>maxL)
                        {
                            maxL=l;
                            maxkey=key;
                        }
                        else if(l==maxL)
                        {
                            let curNum=0;
                            for (var i = 0; i < gamePingData[key].length; i++) {
                                curNum+=gamePingData[key][i];
                            }
                            var maxNum=0;
                            for (var i = 0; i < gamePingData[maxkey].length; i++) {
                                maxNum+=gamePingData[maxkey][i];
                            }
                            if(curNum<maxNum)
                            {
                                maxL=l;
                                maxkey=key;
                            }
                        }
                    }
                }
                selectGameLine(maxkey);
            }
        }

        var selectGameLine=function(line)
        {
            if(line.indexOf("web01")<0&&line.indexOf("game01")<0)
            {
                gameproxyline=line;
            }
            else
            {
                gameproxyline='';
            }
            hasSelectBestHost=true;
        }

        var pingGameSvr=function(cdnUrl,callback){
        // if(!checkNativeGT())
        // {
            var img = new Image();
            var start = new Date().getTime();
            img.src = '//'+cdnUrl +"/"+ start;
            img.hosturl=cdnUrl;
            img.startping=start;
            img.callback=callback;
            var flag = false;  //无法访问
            img.onload = function(){
                flag = true;
                // console.log('ok '+ this.hosturl + " "+(new Date().getTime()-this.startping));
                gamePingData[img.hosturl].push(new Date().getTime()-this.startping);
                var cbk=img.callback;
                if(cbk)
                {
                    cbk(cdnUrl);
                }
            };
            img.onerror = img.onload;
            // }
        }
        checkAndPingGameLine();
    </script>
    <script>
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
        // if(gameCDNArr&&gameCDNArr.length>1)
        // {
        //     for(var i=0;i<gameCDNArr.length;i++)
        //     {
        //         pingGameSvr(gameCDNArr[i],pingGameCdnCallback);
        //     }
        // }
        
        if(baseURI&&baseURI.indexOf(host)<0)
        {
            isGmRsCrossD=true;
        }
        var loadScript = function (list, callback) {
            var loaded = 0;
            var loadNext = function () {
                loadSingleScript(list[loaded], function () {
                    loaded++;
                    var progress = document.getElementById('loadJsProgress');
                    progress.value=Math.floor(loaded/list.length*100);
                    <?php 
                        if($platkey=="fben"||$platkey=="fbtw")
                        {
                            echo 'FBInstant.setLoadingProgress(Math.floor(progress.value*0.97));';
                        }
                    ?>
                    if (loaded >= list.length) {
                        progress.style.display="none";
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
                        var isnative = checkNativeGT() ? 1 : 2;
                        getxhr.open("GET", "//'.$domainCfg[str_replace("test","",$domainKey)].'/tank-global/index.php/?t=sendstepstat&step="+step+"&isNative="+isnative, true);
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