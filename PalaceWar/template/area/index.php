<!DOCTYPE HTML>
<html>
<head>
    <?php 

        function redirect($url)
        {
            header("Location: $url");
            exit();
        }

        $ip = $_SERVER['REMOTE_ADDR'];
        $iparr = array(
        );
        $gameArea=$_REQUEST['gameArea']||"";
        if(isset($_REQUEST['gameArea']))
        {
            $gameArea=$_REQUEST['gameArea'];
        }

        $gameLanguage=$_REQUEST['gameLanguage']||"";
        if(isset($_REQUEST['gameLanguage']))
        {
            $gameLanguage=$_REQUEST['gameLanguage'];
        }


        $languageCfg=array(
            "hk"=>"tw",
            "mo"=>"tw",
            "sg"=>"tw",
            "chs"=>"tw",
            "cht"=>"tw",
        );

        $isTest=false;
        if(in_array($ip,$iparr))
        {
            $isTest=true;
        }
        $gameAreaCfg=array(
            "17030000"=>"//gt-local-web01.raygame3.com/client/en/gt_en/",
            "17031000"=>"//gt-local-web01.raygame3.com/client/tw/gt_tw/",
        );

        if(array_key_exists(strtolower($gameArea),$gameAreaCfg))
        {
            redirect($gameAreaCfg[$gameArea]+"?"+$_SERVER["QUERY_STRING"]);
        }

    ?>

    <meta charset="utf-8">
    <?php 
        echo '<title></title>';
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
</head>

<body>
    <script>
    </script>
</body>

</html>