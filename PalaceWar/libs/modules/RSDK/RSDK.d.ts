declare namespace RSDK
{
    function init(initInfo:{privateKey:string,debug?:boolean,r_host?:string,r_bid?:string,r_plat?:string},callback:(code:string,data:any)=>void):void;
    function login(customData:any,callback:(code:string,data:any)=>void,logoutCallback:(code:string,data:any)=>void):void;
    function logout():void;
    function pay(productInfo:productInfo,payCallback?:(code:string,data:any)=>void):void
    function trackEvent(eventCode:string,eventInfo:any):void;
    function share(content:{title:string,desc:string,imageurl?:string,link?:string},callback:(code:string,data:any)=>void):void;
    function getAppid():string;
    function getChannelId():string;
    function customerService(code:string):void;
    function checkFollow():boolean;
    function requestFollow(callback?:(data:any)=>void):void;
    function setShareInfo(content:{title:string,desc:string,imageurl?:string,link?:string},uid:string):void;
    function checkShare():number;
    function getCustomerServiceType():number;
    function getCustomerServiceData(callback?:(data:any)=>void):void;
    function checkDesktop():boolean;
    function hasFollow():boolean;
    function requestDesktop(data:any,callback?:(data:any)=>void):boolean;
    function callSdk(action:string, data:any, callback:Function):void;

    /**
     * 检测是否有绑定功能
     */
    function hasBindFunc():boolean;

    /**
     * 检测是否已经绑定
     * @param callback 检测结果，code==1 是绑定成功 
     */
    function checkBindStatus(callback:(code:number|string)=>void):void;

    /**
     * 绑定接口,回调同检测绑定接口
     */
    function callBind(callback:(code:number|string)=>void):void;

    /**
     * iframe通过url打开新弹窗
     * @param url 目标url
     * @param title 标题，可选
     */
    function loadUrl(url:string,title?:string):void;
}
declare namespace rsdkclientplugin
{
    function getGUID():string;
    function openServiceCenter():void;
    function checkBindPhone():boolean;
    function showBindPhoneView(callback:Function):void;
    function getChannelId():string;
    function getSubAppId():string;
    function getVersion():string;
    function getAndroidAPILevel():number;
    function showPersonView(callback:Function);
    function openUserCenter():void;
    function checkServerState(serverId:string):void;
    function setAppForegroundStatusChangeCallback(callback:(msg:string)=>void);
    function checkPurchase(serverId:string):void;
    function bindAccountStatus():void;
}

declare namespace crazyplaygroundplugin
{
    /**
     * 检测是否已经关注
     */
    function subscribeStatus():boolean;

    /**
     * 调用关注接口
     */
    function subscribepage():void;
}

declare namespace RSDKCode
{
    export let RET_WEBSOCKET_CONNECT_SUCCEED;//连接成功
    export let RET_WEBSOCKET_CONNECT_FAIL;//连接失败
    export let RET_WEBSOCKET_CONNECT_DIS;//连接短裤
    export let RET_WEBSOCKET_CONNECT_TIMEOUT;//连接超时
    export let RET_WEBSOCKET_RECEIVE_MSG_SUCCEED;//接收消息成功
    export let RET_WEBSOCKET_ERROR;//错误
}

declare class RSDKWebSocket
{
    public constructor(name:string);
    public connectWebSocket(objectName:string,host:string):void;
    public sendWebSocketMessage(objectName:string,msg:string):void;
    public disconnectWebSocket(objectName:string):void;
    public setWebSocketCallback(objectName:string,callback:Function):void;
}

declare namespace qqwanbaplugin
{
    function getGiftId():string;
    function sendMessage(friendid:string, msgtype:string, content:string, callback:(code:string,data:any)=>void);
    function shortcut(content:{title:string,desc?:string}, shortcutCallback:(code:string)=>void); // code 0:成功  -1:失败 -2
    function sendCandy(action:string, candy:string, shortcutCallback:(code:string)=>void); // code 0:成功  -1:失败 -2
    function sendCandyStatus():boolean;
    function giftExchange(callback:(code:string)=>void); // code 0:成功
                                                         // 2000 系统繁忙
                                                         // 2001 参数错误
                                                         // 2002 拉取礼包数据出错
                                                         // 2003 礼包兑换达到上限
                                                         // 2004 非积分兑换礼包及VIP礼包，无需校验
                                                         // 2005 积分不足，无法兑换积分礼包
                                                         // 2006 用户非VIP，无法兑换VIP礼包
                                                         // 2007 用户VIP等级与VIP礼包等级不符，无法兑换
                                                         // 2008 礼包已过期
                                                         // 2009 单用户兑换礼包次数限制
    /**
     * 检测是否从微端进入
     */
    function checkIsFromMicroEnd():boolean;
    /**
     * 检测是否下载apk
     */
    function checkDownloadApp(callback:(isDownloadApp:boolean)=>void):void;
    /**
     * 返回下载链接
     */
    function downloadApp():void;

    /**
     * 发送统计
     * @param ach_type 成就数据类型，1：等级类，2：财富类，3：战力类 (每个游戏可以上报一种或多种类型成就，但是单次上报只可选择某一种成就进行上报)
     * @param ach_des UTF8格式，成就数据描述，如“等级”“关卡”“金币”等，不得为空，且类型对应描述第一次上传之后不得更改
     * @param ach_value 成就数值
     */
    function sendToWanbaData(achInfo:{ach_type:number,ach_des:string,ach_value:number}):void;
}

declare namespace SDK
{
    export namespace CommonUtil
    {
        export let appId:string;
        export let _initParams:any;
    }
}
declare class productInfo
{
    public price:string;
    public productId:string;
    public productName:string;
    public coinNum:string;
    public productCount:string;
    public productType:string;
    public serverId:string;
    public serverName:string;
    public gameUserId:string;
    public gameUserName:string;
    public roleLevel:string;
    public roleVipLevel:string;
    public currency:string;
    public os:string;
    public privateData;
}