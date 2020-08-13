/**
 * 服务器列表配置
 */
class ServerCfg
{
    public constructor()
    {
    };
    public static allHost={
        "qqgame":"gt-wanba-web01.raygame3.com",
        "wanba":"gt-wanba-web01.raygame3.com",
        "3k":"gt-cn-in.raygame3.com",
        "local":"gt-local-web01.raygame3.com",
        "locals":"local-test-82.raygame3.com",
        "test":"gt-test.raygame3.com",
        "yyb":"gt-yyb-web01.raygame3.com",
        "tw":"gd-game.heyyogame.com",
        "fkylc":"gt-fkylc-web01.raygame3.com",
        "xly":"gt-xly-web01.raygame3.com",
        "xzy":"gt-xzy-web01.raygame3.com",
        "iosshenhe":"gt-shenhe.raygame3.com",
        "zjly":"gt-zjly-web01.raygame3.com",
        "ewan":"gt-ewan-web01.raygame3.com",
        "49y":"gt-49y-web01.raygame3.com",
        "sf":"gt-sf-web01.raygame3.com",
        "kr":"gt-kr-web01.mayngames.co.kr",
        "fkcw":"gt-fkcw-web01.raygame3.com",
        "en":"gt-en-web01.heyyogame.com",
        "9130":"gt-9130-web01.raygame3.com",
        "cps":"gt-cps-web01.raygame3.com",
        "wx":"gt-wanba-web01.raygame3.com",
        "wyw":"gt-wanba-web01.raygame3.com",
        "ty":"gt-ty-web01.raygame3.com",
        "xl":"gt-xl-web01.raygame3.com",
        "jj":"gt-jj-web01.raygame3.com",
        "kr37":"gt-kr37-web01.37games.com",
        "th":"gt-th-web01.heyyogame.com",
        "mm":"gt-mm-web01.raygame3.com",
        "lm":"gt-lm-web01.raygame3.com",
        "idn":"gt-idn-web01.raygame3.com",
        "xy":"gt-xy-web01.raygame3.com",
        "pt":"gt-en-web01.heyyogame.com",
        "ru":"gt-ru-web01.heyyogame.com",
    }

    // {sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    public static lastServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}=<any>{};
    /**
     * 已经有账号的所有服务器列表
     */
    public static myserver:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,old_zid:string,flag?:number}[];
    /**
     * 所有服务器列表
     */
    public static serverlist:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,old_zid:string,flag?:number}[];

    /**
     * 当前选择的服务器，选择后可用
     */
    public static selectServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,old_zid:string,flag?:number}=<any>{};
    /**
     * 设置登录的服务器数据
     * @param zid 
     */
    public static setLoginServer(zid:string):void
    {
        if(ServerCfg.lastServer.zid!=zid)
        {
            let l:number=ServerCfg.serverlist.length;
            for(let i:number=0;i<l;i++)
            {
                let item=ServerCfg.serverlist[i];
                if(item.zid==zid)
                {
                    for(let key in item)
                    {
                        ServerCfg.lastServer[key]=item[key];
                    }
                    break;
                }
            }
        }
    }

    /**
     * 选择的服务器数据
     * @param zid 
     */
    public static setSelectServer(zid:string):boolean
    {
        let result:boolean=false;
        let zidTemp = ServerCfg.selectServer.zid;
        if(ServerCfg.selectServer.old_zid)
        {
            zidTemp = ServerCfg.selectServer.old_zid;
        }
        if(zidTemp != zid)
        {
            let l:number=ServerCfg.serverlist.length;
            for(let i:number=0;i<l;i++)
            {
                let item=ServerCfg.serverlist[i];
                let itemZid = item.zid;
                if(item.old_zid)
                {
                    itemZid = item.old_zid;
                }
                if(itemZid == zid)
                {
                    ServerCfg.setServerData(item);
                    result=true;
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
            return result;
        }
    }

    public static setServerData(data:any):void
    {
        ServerCfg.selectServer = <any>{};
        for(let key in data)
        {
            ServerCfg.selectServer[key]=data[key];
        }
    }

    //新服预约活动服务器
    public static setAcNewServerData(data:any):void{
        if (!data){
            return ;
        }
        this.setServerData(data);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
    }

    public static baseUrl="//gt-local-web01.raygame3.com/gucenter/";
    public static serverTokenUrl="getaccess_token.php";

    public static svrCfgUrl: string = "//gt-local-web01.raygame3.com/tank-global/index.php/";

    public static initSvrUrl():void
    {
        var hosturl:string=ServerCfg.getHost();
        this.svrCfgUrl = "//"+hosturl+"/tank-global/index.php/";
        this.baseUrl="//"+hosturl+"/gucenter/";
    }

    private static getHost():string
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(PlatformManager.checkIsPlatSp())
            {
                return ServerCfg.allHost[App.TestUtil.getTestPlat()];
            }
        }
        let localMultiLanguage:string=PlatformManager.getLocalMultiLanguage();
        if(localMultiLanguage&&ServerCfg.allHost[localMultiLanguage])
        {
            return ServerCfg.allHost[localMultiLanguage];
        }
        return ServerCfg.allHost[PlatformManager.getSpid()];

        //return ServerCfg.allHost["wanba"];
    }

    public static checkServerDebug():boolean
    {
        let isDebug:boolean=false;
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        {
            let baseUrl:string = document.baseURI||window.location.pathname;
            if(baseUrl&&baseUrl.indexOf("gt_test")>-1)
            {
                isDebug=true;
            }
            else
            {
                if(PlatformManager.checkIsFB())
                {
                    isDebug=PlatformManager.checkIsTest();
                }
            }
        }
        else if(PlatformManager.checkIsTest() || PlatformManager.checkIsLocal())
        {
            isDebug=true;
        }
        if(PlatformManager.checkIsPlatSp())
        {   
            if(App.TestUtil.checkIsTestPlat1000())
            {
                isDebug = true;
            }
            else
            {
                isDebug = false;
            }
        }
        return isDebug;
        // return true;
    }

    public static checkTestByBaseDiv():boolean
    {
        if(App.DeviceUtil.IsHtml5())
        {
            let baseUrl:string = document.baseURI;
            if(baseUrl.indexOf("gt_test")>-1)
            {
                return true;
            }
        }
        return false;
    }
    // 获取微信小游戏资源url
    public static getWxGameResourceUrl():string
    {
        if (PlatformManager.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            return "resource/";
        }
    }
    // 获取qq小游戏资源url
    public static getQQGameResourceUrl():string
    {
        if (PlatformManager.checkIsQQGameSp()) {
        return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/";
        }
    }
    // 获取qq小游戏资源url
    public static getQQGameResJsonUrl():string
    {
        if (PlatformManager.checkIsQQGameSp()) {
            return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/default.res.json";
        }
    }

     
    
    // 获取玩一玩资源url
    public static getWywResourceUrl():string
    {
        return Http.getProtocol() + "//" + ServerCfg.getHost() + "/wywclient/resource/";
    }

    /**
     * 根据url目录名命名规则获取到的字符串来查找连接哪个服
     */
    public static getHostIdByPath(pathKey:string):string
    {
        if(!ServerCfg.allHost[pathKey])
        {
            for(let key in ServerCfg.allHost)
            {
                let tmpKey:string=pathKey;
                if(tmpKey.indexOf("_")>-1)
                {
                    tmpKey=tmpKey.split("_")[0];
                }
                if(tmpKey==key)
                {
                    pathKey=tmpKey;
                    break;
                }
            }
        }
        return pathKey;
    }

    /**
     * 根据前端目录key名获取当前地址使用的语言资源key
     * @param pathKey 目录key
     */
    public static getClientResKeyByPath(pathKey:string):string
    {
        let tmpKey:string=pathKey;
        if(tmpKey.indexOf("_")>-1)
        {
            tmpKey=tmpKey.split("_")[1];
        }
        if(tmpKey)
        {
            pathKey=tmpKey;
        }
        return pathKey;
    }
    
    public static getTstPidUrl():string
    {
        // if(PlatformManager.checkIsLocal())
        // {
        //     return "//gt-local-web01.raygame3.com/pidcode.php"
        // }
        return "//"+ServerCfg.getHost()+"/clientscript/pidcode.php";
    }

    /**
     * 退出sdk账号时候清理服务器列表数据
     */
    public static clear():void
    {
        ServerCfg.selectServer=<any>{};
        ServerCfg.myserver=null;
        ServerCfg.serverlist=null;
    }
}

class ServerItemCfg
{
    public sname:string;
    public zid:string;
    public ip_server:string;
    public port_server:string;
    public ip_chat:string;
    public port_chat:string;
    public initData(data:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}):void
    {
        for(let key in data)
        {
            this[key]=data[key];
        }
    }
}
