/**
 * 统计类，具体方法先留空
 * author dmj
 * date 2017/9/15
 * @namespace StatisticsHelper
 */
namespace StatisticsHelper {
    let reportResDic:Object={};

    export function init():void
    {
        if(App.DeviceUtil.isWXgame())
        {
            window["wx"].onError((res:{message:string,stack:string})=>{
                window.onerror(res.stack, res.message, 0, 0);
            });
        }
    }
    /**
     * 玩家创角统计
     */
	export function report_register_tw():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "slGECLnNt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");

            let a = function(f:any,b,e,v,n?,t?,s?)
            {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            };
            a(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '234770090424672'); 
            window["fbq"]('track', 'CompleteRegistration');

        }
    }

    /**
     * 玩家完成"购买"行为完成后
     */
    export function report_pay_tw(cost:number|string):void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "DvFdCNGFu34Q4Iv5hgM";
            window["google_conversion_value"] = cost?cost:3.00;
            window["google_conversion_currency"] = "USD";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");

            let a = function(f:any,b,e,v,n?,t?,s?)
            {
                if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)
            };
            a(window,document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window["fbq"]('init', '179480206020479');
            window["fbq"]('track', 'Purchase',{value:String(cost),currency:'USD'});

        }
    }

    /**
     * 等级达到正八品
     */
    export function report_uplevel4_tw():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            window["google_conversion_id"] = 819873248;
            window["google_conversion_label"] = "Nx93CKDPt34Q4Iv5hgM";
            window["google_remarketing_only"] = false;

            App.ResourceUtil.loadSingleScript("//www.googleadservices.com/pagead/conversion.js");
        }
    }

    /**
     * 统计加载步骤
     */
    export function reportLoadData(step:number|string):void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(window["requestGetStep"])
            {
                try
                {
                    window["requestGetStep"](step);
                }
                catch(e)
                {
                    console.log("requestGetStep error");
                }
            }
        }
    }

    /**
     * 登录流程步骤详细统计
     */
    export function loginProcessSetStep(step:string):void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(window["loginProcessStep"])
            {
                try
                {
                    window["loginProcessStep"](step);
                }
                catch(e)
                {
                    console.log("loginProcessStep error");
                }
            }
        }
    }
    
    export function clearReportData():void
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(window["requestGetStepData"])
            {
                window["requestGetStepData"]={};
            }
        }
    }

    /**
     * 
     * 游戏内上报自定义文件名的log，可以是字符串，也可以是json对象
     * @param info json对象 或者字符串都可以
     */
    export function reportOwnNameLog(log:any,filename:string):void
    {
        log=App.StringUtil.toString(log);
        let data:{platform:string,uid?:number,logstr:string,filename:string,zid:string}={
            platform:PlatMgr.getBigAppid(),
            uid:Api.UserinfoVoApi.getUid(),
            zid:ServerCfg.selectServer.zid,
            logstr:log,
            filename:filename
        };
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_errorlog.php",data);
    }

    /**
     * 
     * 游戏内上报自定义log
     * @param info json对象 或者字符串都可以
     */
    export function reportGameLog(log:string):void
    {
        let data:{platform:string,uid?:number,logstr:string}={
            platform:PlatMgr.getBigAppid(),
            uid:Api.UserinfoVoApi.getUid(),
            logstr:log
        };
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_userdefined.php ",data);
    }

    /**
     * 
     * 游戏内异常上报
     * @param info json对象 或者字符串都可以
     */
    export function reportGameResLoadFail(url:string):void
    {
        if(reportResDic[url]&&reportResDic[url]>1)
        {
            return;
        }
        let data:{platform:string,uid?:number,logstr:string}={
            platform:PlatMgr.getBigAppid(),
            uid:Api.UserinfoVoApi.getUid(),
            logstr:url+"::"+GameData.curDefaultName+"::"
        };
        if(!reportResDic[url])
        {
            reportResDic[url]=0;
        }
        reportResDic[url]++;
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_resourcefail_log.php",data);
    }

    /**
     * 
     * 游戏内异常上报
     * @param info json对象 或者字符串都可以
     */
    export function reportGameError(info:any):void
    {
        let data:{platform:string,uid?:number,zid:string,logstr:string}={
            platform:PlatMgr.getBigAppid(),
            uid:Api.UserinfoVoApi.getUid(),
            zid:ServerCfg.selectServer.zid,
            logstr:""
        };
        data.logstr=App.StringUtil.toString(info);
        NetManager.http.postOutQueue("//gt-clientlog.raygame3.com/create_clientlog.php",data);
    }

    export function reportAcLog(aid:string,code:number,action:string):void
    {
        if(GameData.statUrl)
        {
            if(!code)
            {
                code=0;
            }
            let serverDate=App.DateUtil.getServerDate();
            let year:string=String(serverDate.getFullYear());
            let month:string=serverDate.getMonth()+1>9?String(serverDate.getMonth()+1):"0"+String(serverDate.getMonth()+1);
            let day:string = serverDate.getDate()>9?String(serverDate.getDate()):"0"+String(serverDate.getDate());
            let hour=serverDate.getHours();
            let minute=serverDate.getMinutes();
            let second=serverDate.getSeconds();
            let fileName:string=aid+"-"+code+"-"+action+"-"+year+"-"+month+"-"+day;
            let data={
                plat:PlatMgr.getSpid(),
                data_log:{
                    lkey:["服","uid","角色名","等级","vip","总充值元宝",'元宝','时间'],
                    // lvalue:[ServerCfg.selectServer.zid,GameData.userId,Api.playerVoApi.getPlayerName(),Api.playerVoApi.getPlayerLevel(),Api.playerVoApi.getPlayerVipLevel(),Api.playerVoApi.getPlayerBuyGem(),Api.playerVoApi.getPlayerGem(),hour+":"+minute+":"+second]
                },
                file_name:fileName
            };
            NetManager.http.postOutQueue(GameData.statUrl,data);
        }
    }

    export function reportShieldChat(chatStr:string,shieldStr:string):void
    {
        let sendData={
            t:"sendchatmsg",
            uid:Api.UserinfoVoApi.getUid(),
            // name:Api.playerVoApi.getPlayerName(),
            // vip:Api.playerVoApi.getPlayerVipLevel(),
            zid:ServerCfg.selectServer.zid,
            msg:chatStr,
            word:shieldStr,
        };
        NetManager.http.getOutQueue(ServerCfg.svrCfgUrl,sendData);
    }
}

window["tmpGameError"]=window.onerror;
window.onerror = function (errorMsg, url, lineNumber, column, errorObj:any)
{
    if(window["tmpGameError"])
    {
        window["tmpGameError"](errorMsg, url, lineNumber, column, errorObj)
    }
    if(!errorObj)
    {
        errorObj={};
        errorObj.error=errorMsg+"::pid:"+PlatMgr.userId;
        errorObj.script=url;
        errorObj.line=lineNumber;
        errorObj.column=column;
        try
        {
            if(errorMsg=="Script error"&&!url)
            {
                console.log("game error: "+JSON.stringify(errorObj));
                return;
            }
        }
        catch(e)
        {

        }
    }
    else
    {
        let tmpData:any={};
        for(let key of Object.getOwnPropertyNames(errorObj))
        {
            tmpData[key]=errorObj[key];
            if(key=="error")
            {
                tmpData[key]=tmpData[key]+"::pid:"+PlatMgr.userId;
            }
        }
        errorObj=tmpData;
    }
    StatisticsHelper.reportGameError(errorObj);
}