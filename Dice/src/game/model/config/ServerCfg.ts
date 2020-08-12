/**
 * 服务器列表配置
 */
class ServerCfg
{
    public constructor()
    {
    };
    public static allHost={
        "local":"192.168.8.95",
        "test":"dice-test.leishengame.com",
        "wx":"lz-wx-web01.leishengame.com",
        "ls":"lz-ls-web01.leishengame.com",
        "iosshenhe":"lz-ios-shenhe.leishengame.com",
    }

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

    public static baseUrl="//192.168.8.95/gucenter/";
    public static serverTokenUrl="getServerInfo.php";

    public static svrCfgUrl: string = "//192.168.8.95/gucenter/";

    public static initSvrUrl():void
    {
        var hosturl:string=ServerCfg.getHost();
        this.svrCfgUrl = "//"+hosturl+"/gucenter/";
        this.baseUrl="//"+hosturl+"/gucenter/";
    }

    private static getHost():string
    {
        if(App.DeviceUtil.IsHtml5())
        {
            if(PlatMgr.checkIsPlatSp())
            {
                return ServerCfg.allHost[App.TestUtil.getTestPlat()];
            }
        }
        let localMultiLanguage:string=PlatMgr.getLocalMultiLanguage();
        if(localMultiLanguage&&ServerCfg.allHost[localMultiLanguage])
        {
            return ServerCfg.allHost[localMultiLanguage];
        }
        return ServerCfg.allHost[PlatMgr.getSpid()];

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
        }
        else if(PlatMgr.checkIsTest() || PlatMgr.checkIsLocal())
        {
            isDebug=true;
        }
        if(PlatMgr.checkIsPlatSp())
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
    // 获取微信小游戏default
    public static getWxDefaultUrl():string {
        if (PlatMgr.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            // return "resource/";
            return "https://lz-wx-cdn.leishengame.com/gt_wx/resource/default.res.json"
        }
    }
    // 获取微信小游戏资源url
    public static getWxGameResourceUrl():string
    {
        if (PlatMgr.checkIsWxSp()) {
            // return "https://gt-fkwx-cdn.raygame3.com/gt_wx/resource/";
            // return "resource/";
            return "https://lz-wx-cdn.leishengame.com/gt_wx/resource/"
        }
    }
    // 获取qq小游戏资源url
    public static getQQGameResourceUrl():string
    {
        if (PlatMgr.checkIsQQGameSp()) {
        return "https://wanba-cdn-1251001051.file.myqcloud.com/gt_wanba/resourceallin/";
        }
    }
    // 获取qq小游戏资源url
    public static getQQGameResJsonUrl():string
    {
        if (PlatMgr.checkIsQQGameSp()) {
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
