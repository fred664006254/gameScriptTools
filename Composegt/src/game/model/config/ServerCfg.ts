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
        "locals":"local-test-83.raygame3.com",
        "test":"compose-test.leishenhuyu.com",   
        "wx":"gdhc-wx-web001.leishenhuyu.com",
        "wd":"gdhc-wd-web01.leishenhuyu.com",        
        "wxmg":"gdhc-wxmg-web01.leishenhuyu.com",
        "newhope2":"gdhc-newhope2-web01.leishenhuyu.com",
        
    }

    // {sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number}
    /**
     * 上次登录的服务器，登录成功后就可以取
     */
    public static lastServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string}=<any>{};
    /**
     * 已经有账号的所有服务器列表
     */
    public static myserver:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,old_zid:string}[];
    /**
     * 所有服务器列表
     */
    public static serverlist:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number,old_zid:string}[];

    /**
     * 当前选择的服务器，选择后可用
     */
    public static selectServer:{sname:string,zid:string,ip_server:string,port_server:string,ip_chat:string,port_chat:string,flag:number,old_zid:string}=<any>{};
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
    public static setSelectServer(zid:string):void
    {
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
                    break;
                }
            }
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_SELECT_SERVERLIST);
        }
    }

    public static setServerData(data:any):void
    {
        ServerCfg.selectServer = <any>{};
        for(let key in data)
        {
            if(PlatformManager.getSpid()=="locals"&&(key=="ip_server"||key=="ip_chat"))
            {
                ServerCfg.selectServer[key]=ServerCfg.getHost();
            }
            else
            {
                ServerCfg.selectServer[key]=data[key];
            }
        }
    }

    public static baseUrl="//192.168.8.83/gucenter/";
    public static serverTokenUrl="getaccess_token.php";

    public static svrCfgUrl: string = "//192.168.8.83/tank-global/index.php/";

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
            let baseUrl:string = document.baseURI;
            if(baseUrl&&baseUrl.indexOf("gt_test")>-1)
            {
                isDebug=true;
            }
            else if(!baseUrl&&window.location.pathname.indexOf("gt_test")>-1)
            {
                isDebug=true;
            }
        }
        else if(PlatformManager.checkIsTest() || PlatformManager.checkIsLocal())
        {
            isDebug=true;
        }
        if(App.CommonUtil.getOption("testplat")&&ServerCfg.allHost[App.CommonUtil.getOption("testplat")])
        {
            isDebug = false;
        }
        return isDebug;
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
            else if(!baseUrl&&window.location.pathname.indexOf("gt_test")>-1)
            {
                return true;
            }
        }
        return false;
    }
    // 获取微信小游戏资源url
    public static getWxGameResourceUrl():string
    {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gdhc-wxmg-cdn.leishenhuyu.com/gt_wxmg/resourceallin/";
    }  
    // 获取微信wxapp小游戏资源url
    public static getWxappGameResourceUrl():string
    {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-wxapp-cdn.qitiangame.com/gt_wxapp/gt_wxapp/resourceallin/";
    }    
    // 获取百度小游戏资源url
    public static getBaiduGameResourceUrl():string
    {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-h5ly-cdn.leishenhuyu.com/gt_h5ly/gt_h5ly/resourceallin/";
    }
     // 获取qq小游戏资源url
    public static getQQGameResourceUrl():string
    {
        // return Http.getProtocol() + "//" + ServerCfg.getHost() + "/gt_wx/resource/";
        return "https://gd-wanba-cdn-1252343260.file.myqcloud.com/gt_wanba/resourceallin/";
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
                if(pathKey.indexOf(key)>-1)
                {
                    pathKey=key;
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
