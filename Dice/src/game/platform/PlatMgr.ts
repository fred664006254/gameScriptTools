namespace PlatMgr
{
	export let userId:string;
	export let prefix:string;
	export let token:string;
	export let userType:string;
	export let isLogin:boolean=false;
	export let kkk_age:number=0;
	export let nickname:string;
	export let avatar:string;
	export let inviter_pid:string;
	export let inviter_uid:string;
	export let fromShareId:string;


	export function getAppVersion():string
	{
		try
		{
			if (App.DeviceUtil.isWyw())
			{
			    return "modifybywywscript_appversion";
			}
			else if(App.DeviceUtil.isQQGame())
			{
				return "modifybyqqscript_appversion";
			}
			else if (App.DeviceUtil.isWXgame())
			{				
				return "3";
			} 
			else if(rsdkclientplugin)
			{
				return rsdkclientplugin.getVersion();
			}
		}
		catch(e)
		{
			return "0";
		}
		return "0";
	}
	let _appid:string="";
	export function getAppid():string
	{ 
		if(!LoginMgr.isCreateScene)
		{
			try{
				if(RSDK&&RSDK.getAppid&&RSDKHelper.isInit)
				{
					let appId:string=RSDK.getAppid();
					if (appId== "17026001" && App.DeviceUtil.isIOS())
					{
						appId="17026002";
					}
					_appid=appId;
				}
			}
			catch(e)
			{
				try
				{
					if(SDK&&SDK.CommonUtil&&SDK.CommonUtil.appId)
					{
						_appid=SDK.CommonUtil.appId;
					}
				}
				catch(e)
				{
					_appid="";
				}
			}
		}
		return _appid;
	}

	export function getTestAppid():string
	{
		if(PlatMgr.checkIsLocal()&&PlatMgr.checkIsPlatSp()==false)
		{
			return "1001"
		}
		else
		{
			return "";
		}
	}

	export function getBigAppid():string
	{
		let bigAppid:string='';
		if(checkIsAreaPkg())
		{
			let appid:number=Number(getAppid());
			if(!appid)
			{
				bigAppid=App.CommonUtil.getOption("r_bid");
			}
			else
			{
				bigAppid=String(Math.floor(appid/1000)*1000);
			}
		}
		else
		{
			bigAppid=App.CommonUtil.getOption("r_bid");
			if(!bigAppid)
			{
				let appid:number=Number(getAppid());
				bigAppid=String(Math.floor(appid/1000)*1000);
			}
		}
		return String(bigAppid);
	}
	export function getContact():string[]
	{
		if(PlatformCfg.contactCfg[PlatMgr.getAppid()]){
			return PlatformCfg.contactCfg[PlatMgr.getAppid()];
		}
		else if(PlatformCfg.contactCfg[PlatMgr.getBigAppid()])
		{
			return PlatformCfg.contactCfg[PlatMgr.getBigAppid()];
		}
		else
		{
			for(let key in PlatformCfg.contactCfg)
			{
				if(key.indexOf("-")>-1)
				{
					let keys=key.split("-");
					let appid:number=Number(PlatMgr.getAppid());
					let bigAppid:number=Number(PlatMgr.getBigAppid());
					if(appid>=Number(keys[0])&&appid<=Number(keys[1]))
					{
						return PlatformCfg.contactCfg[key];
					}
				}
			}
		}
		return [];
	}

	/**
	 * 获取渠道spid，和游戏功能和游戏配置相关，和纯前端资源和多语言cn无关
	 */
	export function getSpid():string
	{
		let spid:string=getSpidKey(false);
		let area=GameConfig.getAreaBysubId();
		if(getGameArea()&&GameConfig.areaSvrCfg[area])
		{
			spid=GameConfig.areaSvrCfg[area];
		}
		return spid;
	}

	/**
	 * 获取前端使用的Spid，可以理解为纯前端资源和多语言cn相关处理时候使用
	 */
	export function getSpidKey(isClientRes:boolean=true):string
	{
		let spid:string=null;
		if(checkIsLocal()&&isClientRes==false)
		{
			spid="local";
		}
		// else if(checkIsIOSShenheSp())
		// {
		// 	spid="iosshenhe";
		// }
		// else if(checkIsWanbaSp())
		// {
		// 	spid="wanba";
		// }
		else if(checkIsWxSp())
		{
			spid="wx";
		}
		else if(checkIsTestSp())
		{
			spid="test";
		}
		else
		{
			if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
			{
				let pathname:string = window.location.pathname;
				if(pathname.indexOf("gt_")&&pathname.indexOf("/")>-1)
				{
					let str:string=getPathRuleName();
					if(isClientRes)
					{
						spid=ServerCfg.getClientResKeyByPath(str);
					}
					else
					{
						spid=ServerCfg.getHostIdByPath(str);
					}
				}
				else
				{
					spid="ls";
				}
			}
			else
			{
				spid="ls";
			}
		}
		let tmpName:string=getPlatName();
		if(tmpName&&!checkIsIOSShenheSp())
		{
			spid=tmpName;
		}
		return spid;
	}

	/**
	 * 根据渠道目录命名规范取后缀
	 */
	export function getPathRuleName():string
	{
		let key:string="";
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string = window.location.pathname;
			if(pathname.indexOf("gt_")&&pathname.indexOf("/")>-1)
			{
				let pathArr:string[]=pathname.split("/");
				let l:number=pathArr.length;
				for(let i=l-1;i>=0;i--)
				{
					key=pathArr[i];
					key=key.replace("gt_","");
					if(key!=pathArr[i]&&pathArr[i].indexOf(".")<0)
					{
						if(key!="test")
						{
							key=key.replace("test","");
							break;
						}
					}
				}
			}
		}
		return key;
	}

	export function checkIsUseSDK():boolean
	{
		try
		{
			App.LogUtil.log("getSpid"+getSpid());
			App.LogUtil.log("checkIsWeiduan"+checkIsWeiduan());
			console.log("getAppid"+getAppid());
			console.log("getBigAppid"+getBigAppid());
			console.log("runtimeType:"+egret.Capabilities.runtimeType);
		}
		catch(e)
		{
			console.log("checkIsUseSDK log error");
		}
		if (App.DeviceUtil.isWXgame()) {
			return true;
		}
		if (App.DeviceUtil.isWyw()) {
			return true;
		}
		if(App.CommonUtil.getOption("r_plat"))
		{
			return true;
		}
		if(PlatformCfg.useSDK[getBigAppid()]||PlatformCfg.useSDK[getAppid()])
		{
			return true;
		}
		if(checkIsPlatSp())
		{
			return false;
		}
		if(getSpid().indexOf("local")>-1)
		{
			if(checkIsWeiduan())
			{
				return true;
			}
			return false;
		}
		else if(getSpid()=="3k")
		{
			if(checkIsTest()==true)
			{	
				if(checkIsWeiduan())
				{
					return true;
				}
				else
				{
					return false;
				}
			}
		}
		else if(getSpid()=="wanba")
		{
			if(checkIsTest()==true)
			{	
				if(ServerCfg.checkTestByBaseDiv())
				{
					if(document.location.search)
					{
						return true;
					}
				}
				return false;
				//test code
				// return true;
			}
		}
		else if(getSpid()=="test")
		{
			// if(checkIsWeiduan())
			// {
			// 	return true;
			// }
			return false;
		}
		else if(getSpid()=="iosshenhe")
		{
			return false;
		}
		else
		{
			if(checkIsTest()==true)
			{
				return false;
			}
		}
		return true;
	}

	export function getPlatName():string
	{
		let platName:string=PlatformCfg.platNameCfg[getBigAppid()];
		if(!platName)
		{
			platName=PlatformCfg.platNameCfg[getAppid()];
		}
		if(PlatMgr.checkIsLocal()&&PlatMgr.checkIsPlatSp()==false)
		{
			platName="";
		}
		return platName;
	}

	export function checkIsPlatSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()&&App.TestUtil.getTestPlat()&&(window.location.hostname.indexOf("gt-test")>-1||PlatMgr.checkIsLocal()))
		{
			return true;
		}
		return false;
	}

	/**
	 * 是gt_local 渠道
	 */
	export function checkIsLocalSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			let localStr:string="/gt_local/";
			return pathname.substr(pathname.length-localStr.length)==localStr;
		}
		return false;
	}

	/**
	 * 是否IOS审核服
	 */
	export function checkIsIOSShenheSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("iosshenhe")>-1;
		}
		return false;
	}
	/** 是否审核其他语言版语版 */
	export function checkIOSShenheOtherLanguage():string
	{
		if(PlatMgr.checkIsIOSShenheSp())
		{
			let tmpT = App.StringUtil.splitString(window.location.pathname,"_");
			if (tmpT[2])
			{
				if(tmpT[2].substr(tmpT[2].length-1)=="/")
				{
					return tmpT[2].substr(0,tmpT[2].length-1);
				}
				else
				{
					return tmpT[2];
				}
			}
		}
	}


	/**检测文字显示是水平显示 */
	export function checkIsTextHorizontal():boolean
	{
		
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			//检测是否是英文  App.CommonUtil.getOption("language")=="en" url参数有language = en
			return  checkIsEnLang()||checkIsThSp() ||checkIsPtLang()||checkIsRuLang();
		}
		return false;
	}

	export function checkIsEnSp():boolean
	{
		return getSpid()=="en";
	}

	//检测是否是雷神渠道
	export function checkIsLsSp():boolean
	{
		return getSpid()=="ls";
	}

	/**
	 * 是葡语
	 */
	export function checkIsPtLang():boolean
	{
		return getSpidKey(true)=="pt";
	}

	/**
	 * 是俄语
	 */
	export function checkIsRuLang():boolean
	{
		return getSpidKey(true)=="ru" || checkIsRuSp();
	}

	/**
	 * 检查是不是英文语言
	 */
	export function checkIsEnLang():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			return  getSpidKey(true)=="en" || checkIsIdnSp();
		}
		return false;
	}

	export function checkIsKr37Sp():boolean
	{
		return getSpid()=="kr37";
	}
	export function checkIsThSp():boolean
	{
		return getSpid()=="th" || App.CommonUtil.getOption("language")=="th";
	}
	export function checkIsRuSp():boolean
	{
		return getSpid()=="ru" || App.CommonUtil.getOption("language")=="ru";
	}

	/** 是否是微信小游戏平台 */
	export function checkIsWxSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_wx")>-1||pathname.indexOf("_testwx")>-1;
		} else if (App.DeviceUtil.isWXgame()) {
			// return window["WX_ISWX"] === true;
			return true;
		}
		return false;
	}

	/** 是否是qq小游戏平台 */
	export function checkIsQQGameSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_qq")>-1||pathname.indexOf("_testqq")>-1;
		} else if (App.DeviceUtil.isQQGame()) {
			// return window["WX_ISWX"] === true;
			return true;
		}
		return false;
	}

	export function checkIsIdnSp():boolean
	{
		return getSpid()=="idn";
	}

	export function getSpFile():string
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let fileName:string;
			let pathname:string=window.location.pathname;
			if(pathname.substr(pathname.length)!="/")
			{
				fileName=pathname.substr(pathname.lastIndexOf("/")+1);
				if(fileName&&fileName.indexOf(".")>-1)
				{
					fileName=pathname.substring(0,pathname.lastIndexOf("/"));
					fileName=fileName.substr(pathname.lastIndexOf("/")+1);
				}
			}
			else
			{
				fileName=pathname.substring(0,pathname.length);
				fileName=fileName.substr(pathname.lastIndexOf("/")+1);
			}

			return fileName.replace("gt_test","").replace("gt_","");
		}
		return "local";
	}

	export function checkIsTest():boolean
	{
		let result:boolean=false;
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			result = pathname.indexOf("_test")>-1;
		}
		return result;
	}

	export function checkUseRSDKSocket():boolean
	{
		let useRSDKSocket:boolean=false;
		if(App.DeviceUtil.IsHtml5())
		{
			// if(window["RSDKPlatform"])
			// {
			// 	useRSDKSocket=true;
			// }
			if(window["RSDKWebSocket"])
			{
				useRSDKSocket=true;
			}
			else
			{
				useRSDKSocket=false;
			}
			if (!!window["WebSocket"] && window["WebSocket"].prototype.send)
			{
				useRSDKSocket=false;
			}
			if(window["RSDKWebSocket"]&&GameData.testUseClientSocket)
			{//测试时候强制启用微端socket
				useRSDKSocket=true;
			}
		}
		// if(useRSDKSocket&&PlatformManager.client.getAndroidAPILevel()>0&&PlatformManager.client.getAndroidAPILevel()<21)
		// {
		// 	useRSDKSocket=true;
		// }
		// else
		// {
		// 	useRSDKSocket=false;
		// }
		return useRSDKSocket;
	}

	export function checkIsWeiduan():boolean
	{
		let weiduan:boolean=false;
		if(App.DeviceUtil.IsHtml5())
		{
			if(window)
			{
				if(window["RSDKPlatform"])
				{
					weiduan=true;
				}
				else if(window["webkit"]&&window["webkit"].messageHandlers&&window["webkit"].messageHandlers.RSDKLogin)
				{
					weiduan=true;
				}
			}
		}
		return weiduan;
	}

	export function checkIsTWBSp():boolean
	{
		return getSpid()=="tw";
	}

	export function checkIsTWCNSp():boolean
	{
		return getSpid()=="twcn";
	}

	export function checkIsKRSp():boolean
	{
		return getSpid()=="kr";
	}

	// export function checkIsKrSp():boolean
	// {
	// 	if(App.DeviceUtil.IsHtml5())
	// 	{
	// 		let pathname:string=window.location.pathname;
	// 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
	// 	}
	// 	return false;
	// }
	//港台官网包
	export function checkIsTWMCSp():boolean
	{
		if(PlatMgr.getAppid() == "17004004" || PlatMgr.getAppid() == "17004007")
		{
			return true;
		}
		return false;
	}


	export function checkIsTestSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.lastIndexOf("/gt_test/")==0;
		}
		return false;
	}

	export function checkIsWanbaSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			let host:string=window.location.host;
			return pathname.indexOf("wanba")>-1||host.indexOf("urlshare")>-1||host.indexOf("qzone")>-1;
		}
		return false;
	}

	/**
	 * 
	 * 判断是否为本地地址
	 * */
	export function checkIsLocal():boolean
	{
		var result: boolean = false;
        if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
        {
            var url: string = window.location.href;
            for (var i: number = 0; i < GameData.localCfg.length;i++)
            {
                var str: string = GameData.localCfg[i];
                if(url.indexOf(str)>-1)
                {
                    result = true;
                    break;
                }
            }
        } else if (App.DeviceUtil.isWXgame()) {
			result = false;
		}
        return result;
	}

	export function isSupportDesktopIcon():boolean
	{	
		// if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
		// 	return true;
		// }
		// else {
		// 	return false;
		// }
		console.log("QAZ fkcw checkDesktop"+PlatMgr.checkDesktop());
		return PlatMgr.checkDesktop();
	}

	/**
	 * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版，QQLive是腾讯视频
	 */
	function getWanbaQua():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsWanbaSp()&&checkIsUseSDK())
			{
				let data=window["OPEN_DATA"];
				let platform:string=data.platform;
				let app:string=data.qua.app;
				return app;
			}
		}
		return "";
	}

	/**
	 * 获取玩吧渠道环境 用以 企鹅电竞礼包
	 */
	function getWanbaPf():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsWanbaSp()&&checkIsUseSDK())
			{
				let data=window["OPEN_DATA"];
				let app:string=data.pf;
				return app;
			}
		}
		return "";
	}

	function getWywSrc():number
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsUseSDK())
			{
				let data=window["GameStatusInfo"];
				let app:number=data.src;
				return app;
			}
		}
		return 0;
	}

	export function getIsWanbaSQ():boolean
	{
		return getWanbaQua()=="SQ";
		// return checkIsUseSDK();
	}
	export function getIsWanbaQQLive():boolean
	{
		return getWanbaQua()=="QQLive";
	}
	/**
	 * 是不是来自 企鹅电竞
	 */
	export function getIsWanbaQQEGame():boolean
	{
		return getWanbaPf()=="wanba_ts.111" || getWanbaPf()=="weixin.112";
	}

	/**
	 * 是不是来自 【玩一玩】电竞活动二期
	 */
	export function getIsWywEgame2():boolean
	{
		return getWywSrc()==314 || getWywSrc()==314;
	}
	
	/**
	 * 是不是来自 h5qzonepet
	 */
	export function getFromQZonePet():string
	{
		if(App.DeviceUtil.IsHtml5())
		{
			if(checkIsWanbaSp()&&checkIsUseSDK())
			{
				let data=window["OPEN_DATA"];
				let via:string=data.via;
				egret.log("ssSource"+data.via)
				// alert(data.via)
				return via;
			}
		}
		return "";
	}
	export function isSupportShare():boolean
	{	
		console.log("QAZ fkcw checkShare"+PlatMgr.checkShare());
		return PlatMgr.checkShare()==1 || PlatMgr.checkShare()==2 || PlatMgr.checkShare()==3 || PlatMgr.checkIsLocal();
		// return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
	}

	export function isSupportAttention():boolean
	{
		return PlatMgr.hasFollow();
	}

	export function isSupportBindPhone():boolean
	{
		return PlatformCfg.bindPhone[getAppid()];
	}

	export function sendToDesktop(callback:Function,callbackThisObj:any):void
	{
		if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
			window.open("resource/other/一個官人七個妻.url");
		} else {
			// qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
			PlatMgr.requestDesktop({title:"江山美人",desc:""},callback,callbackThisObj);
		}
		// callback.apply(callbackThisObj);

	}

	
	export function share(callback:Function,callbackThisObj:any)
	{
		if(RSDKHelper.isInit)
		{	
			if (checkIsTWBSp() == true) {
				RSDKHelper.fbShare((code:string,data:any)=>{
					if(Number(code)==16)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
					else {
						console.log("分享失败 "+code);
					}
				});
			}
			else if (checkIsKRSp() == true) {
				RSDKHelper.krShare((code:string,data:any)=>{
					if(Number(code)==16)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
					else {
						console.log("分享失败 "+code);
					}
				});
			}
			else {
				RSDKHelper.share((code:string,data:any)=>{
					if(Number(code)==0)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
				});
			}
		}
	}
	
	export function checkIsLoginPlat():boolean
	{
		let loginResult:boolean=false;
		if(checkIsUseSDK())
		{
			loginResult=isLogin;
		}
		else
		{
			loginResult=true;
		}
		return loginResult;
	}

	export function init():void
	{
		if(checkIsUseSDK())
		{
			RSDKHelper.init();
		}
		initUseObjectPool();
		if(App.DeviceUtil.isRuntime2())
		{
			window.open=function(url):any
			{
				egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "openUrl", data: { "url": url } }));
			}
		}
	}

	/**
	 * SDK是否已经初始化
	 */
	export function isSdkInit():boolean
	{
		return RSDKHelper.isInit;
	}

	export function login():void
	{
		LoginMgr.setLog("start login rsdk");
		if(RSDKHelper.isInit)
		{
			RSDKHelper.login();
		}
	}
	export function logout():boolean
	{
		PlatMgr.isLogin=false;
		LoginMgr.inSDKAccountSwitching=true;
		if(RSDKHelper.isInit)
		{
			RSDKHelper.logout();
			if(PlatMgr.checkIsKRSp() && !PlatMgr.checkIsWanbaSp())
			{
				return true;
			}
			return false;
		}
		else
		{
			LoginMgr.changeAccount();
			return true;
		}
	}

	function showClosePayTip():boolean
	{
		if(GameData.closePay)
		{
			App.CommonUtil.showTip(LangMger.getlocal("closePaySysTip"));
		}
		return GameData.closePay;
	}

	let payType:string;
	let payCallback:Function=null;
	let payCallbackThisObj:any=null;

	/**
	 * 调用支付，有限购次数的档位需要调用次方法
	 * @param productId 充值档id
	 * @param callback 
	 * @param callbackThisObj 
	 */
	export function checkPay(productId: string, callback?:Function, callbackThisObj?:any):void
	{	
		if(showClosePayTip())
		{
			return;
		}
		payCallback=callback;
		payCallbackThisObj=callbackThisObj;
		payType = productId;
		// NetManager.request(NetRequestConst.REQUEST_PAY_CHECKPAY,{gemType:productId});
		// App.MsgHelper.addEvt(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
	}

	export function checkPayCallback(event:egret.Event):void
	{	
		// App.MsgHelper.removeEvt(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
		if(event.data&&event.data.ret==true && event.data.data.data.payflag)
		{
			pay(payType,payCallback,payCallbackThisObj);
		}
		else
		{
			App.CommonUtil.showTip(LangMger.getlocal("checkPayTip"));
			App.MsgHelper.dispEvt(MsgConst.MODEL_PAYMENT);
		}
		payCallback=payCallbackThisObj=null;
	}

	export function checkHasAd(obj:{callbackSucceed: Function,callbackFailure: Function},callbackThisObj: any){
		if(RSDKHelper.isInit)
		{
			RSDKHelper.checkHasAd(obj,callbackThisObj);
		}
	}

	export function showAd(roleId : string,obj:{callbackSucceed: Function,callbackFailure: Function,callbackError: Function},callbackThisObj: any){
		if(RSDKHelper.isInit)
		{
			RSDKHelper.showAd(roleId,obj,callbackThisObj);
		}
	}

	export function pay(productId: string, callback?: Function, callbackThisObj?: any):void
	{
		if(showClosePayTip())
		{
			return;
		}
		/**
		 * 现在没说微信的IOS不能支付，先干掉这里
		 * 2020/05/18
		 * 
		 * 为了微信审核，解开注释
		 * 2020/05/22
		 * 
		 * 再次注释
		 * 2020/05/28
		 */
		// if (App.DeviceUtil.isWXgame() && window["__WXGAME_OS__"] === "ios")
		// {
		// 	// 微信小游戏ios暂不开支付
		// 	App.CommonUtil.showTip(LangMger.getlocal("wxgameIOSNotPayTip"));
		// }
		// else 
		if(PlatMgr.checkIsUseSDK())
		{
		
			if(RSDKHelper.isInit)
			{
				RSDKHelper.pay(productId,callback,callbackThisObj);
			}
		}
		else
		{
			if(PlatMgr.checkIsLocal())
			{
				// if (GameData.payWaitSendDic[productId] && Number(GameData.payWaitSendDic[productId]) - egret.getTimer() < GameData.payWaitSendCD) 
				// {
				// 	StatisticsHelper.reportGameLog("payWaitSend:" + productId);
				// 	return;
				// }
				// if (!GameData.payWaitSendDic[productId]) {
				// 	GameData.payWaitSendDic[productId] = egret.getTimer();
				// }
				testPay(productId);
			}
		}
	}

	function testPay(productId:string):void
	{
		let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(productId);
		if(PlatMgr.checkIsLocal()||GameData.isTest())
		{
			let order_id:string=String(new Date().getTime()+Math.random()*99999999);
			NetManager.request(NetConst.PAY_PROCESSPAYMENT,{order_id:order_id,gold_num:itemCfg.gemCost,platform:"h5",name:itemCfg.id});
		}
		else
		{
			App.CommonUtil.showTip("购买元宝:"+itemCfg.gemCost);
		}
	}

	export function analyticsLogin():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLogin();
		}
	}

	export function analyticsNewGuide(step:number|string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsNewGuide(step);
		}
		App.LogUtil.log("newguide:"+step);
	}

	export function analyticsPay(id:string,orderId:string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsPay(id,orderId);
		}
	}

	export function analyticsLevelup():void
	{	
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLevelup();
		}
	}

	export function analyticsVipup():void
	{	
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsVipup();
		}
	}

	export function analyticsRegister():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsRegister();
		}
	}

	export function analyticsLoadEnd():void
	{	
		console.log("QAZ analyticsLoadEnd "+RSDKHelper.isInit);
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLoadEnd();
		}
	}

	export function analyticsCompleteNewGuide():void
	{
		console.log("analyticsCompleteNewGuide");
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsCompleteNewGuide();
		}
	}

	/**
	 * 统计微信购买成功
	 */
	export function analyticsWxBuy(info: any): void {
		if (RSDKHelper.isInit) {
			RSDKHelper.analyticsWxBuy(info);
		}
	}

	export function pushMsg(data:any):void
	{	
		if (RSDKHelper.isInit&&getIsWanbaSQ() == true) 
		{	
			let msg:string = LangMger.getlocal("wanbaPushMsg"+data.type);
			qqwanbaplugin.sendMessage(data.frd,"1",msg,null);
		}
	}

	export function getGiftId():string
	{	
		let gid:string = null;
		if (RSDKHelper.isInit&&checkIsWanbaSp() == true && checkIsUseSDK()) 
		{
			gid = qqwanbaplugin.getGiftId();
		}
		// return "502";
		return gid;
	}

	export function giftExchange(callback:Function,callbackThisObj:any)
	{	
		let gid:string = null;
		if (RSDKHelper.isInit&&checkIsWanbaSp() == true && checkIsUseSDK()) 
		{
			qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
		}
		// return gid;

		
	}

	export function checkCrossDomon():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			try
			{
				let host=window.location.host;
				let baseURI=document.baseURI;
				if(baseURI&&baseURI.indexOf(host)<0)
				{
					return true;
				}
			}
			catch(e)
			{
				return false;
			}
		}
		return false;
	}

	export function getSpName():string
	{
		let spName:string="";
		if(App.DeviceUtil.IsHtml5() || App.DeviceUtil.isRuntime2())
		{
			spName=App.CommonUtil.getOption("r_plat");
		}
		return spName;
	}

	export function attention(callback:Function,callbackThisObj:any):void
	{
		console.log("attention:"+RSDKHelper.isInit);
		if(RSDKHelper.isInit)
		{
			// RSDKHelper.attention();
			RSDKHelper.attention((data:any)=>{
					if(Number(data)==1)
					{
						if(callback)
						{
							callback.apply(callbackThisObj);
						}
					}
				});
		}
	}

	export function checkAttention():boolean
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkAttention();
		}
		else
		{
			return false;
		}
	}

	export function getChannelId():string
	{
		try{
			return RSDK.getChannelId();
		}
		catch(e)
		{
			return "";
		}
	}

	export function openUserCenter():void
	{
		if(RSDKHelper.isInit&&rsdkclientplugin)
		{
			rsdkclientplugin.openUserCenter();
		}
	}

	//充值档位花费
	export function getMoneyTag(num : number):string
	{
		let str = ``;
		if(checkIsTWBSp() || checkIsEnLang() || checkIsThSp() || checkIsRuSp() ||checkIsEnSp())
		{
			str = "$";
		}
		else if (checkIsKRSp())
		{
			if(App.DeviceUtil.isAndroid())
			{
				str = "원";
			}
			else{
				str = "$";
			}
		}
		else {
			str = "RMB";
		}
		return `${num}${str}`;
	}

	
	export function getMoneySign():string
	{
		if(checkIsTWBSp() || checkIsEnLang() || checkIsThSp() || checkIsRuSp() ||checkIsEnSp())
		{
			return "$";
		}
		else if (checkIsKRSp())
		{
			if(App.DeviceUtil.isAndroid())
			{
				return "원";
			}
			else{
				return "$";
			}
		}
		else {
			return "RMB";
		}
	}


	export function checkIsUseBigCfg():boolean
	{
		// return getBigAppid()=="17001000";
		return checkIsTWBSp();
	}

	export function checkIsShowWarning():boolean
	{
		if (checkIsTWBSp()||checkIsKRSp()||checkIsThSp()||checkIsRuSp()||checkIsEnLang()||checkIsEnSp()) {
			return false;
		}
		else {
			return true;
		}
	}

	export function getStatement():string
	{
		let appid=PlatMgr.getAppid();
		let bigAppid=PlatMgr.getBigAppid();
		let spName=PlatMgr.getSpName();
		let spid=PlatMgr.getSpidKey();
		if(PlatformCfg.statementCfg[appid])
		{
			return PlatformCfg.statementCfg[appid];
		}
		else if(PlatformCfg.statementCfg[bigAppid])
		{
			return PlatformCfg.statementCfg[bigAppid];
		}
		else if(PlatformCfg.statementCfg[spName])
		{
			return PlatformCfg.statementCfg[spName];
		}
		else if (PlatformCfg.statementCfg[spid]) {
			return PlatformCfg.statementCfg[spid]
		}
		return "";
	}

	export function checkShare():number
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkShare();
		}
		else
		{
			return 0;
		}
	}

	//检查通用分享  只有微信需要
	export function checkCommonShare():boolean
	{
		return App.DeviceUtil.isWXgame();
	}

	export function checkDesktop():boolean
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.checkDesktop();
		}
		else
		{
			return false;
		}
	}

	export function hasFollow():boolean
	{
		if(RSDKHelper.isInit)
		{	
			console.log("QAZ hasFollow "+RSDKHelper.hasFollow());
			return RSDKHelper.hasFollow();
		}
		else
		{
			return false;
		}
	}

	export function getCustomerServiceType():number
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.getCustomerServiceType();
		}
		else
		{
			return 0;
		}
	}
	
	export function getCustomerServiceData(callback:Function,callbackThisObj:any):void
	{
		if(RSDKHelper.isInit)
		{	
			RSDKHelper.getCustomerService((data:any)=>{
				if(callback)
				{
					GameData.customerServiceData = data;
					callback.apply(callbackThisObj);
				}
			});
		}
	}

	export function requestDesktop(data:{title:string,desc:string},callback:Function,callbackThisObj:any):boolean
	{
		if(RSDKHelper.isInit)
		{	
			return RSDKHelper.requestDesktop(data,callback,callbackThisObj);
				
		}
		else {
			return false;
		}
	}

	/**
	 * 统计权势，目前玩一玩有用到
	 */
	export function reportGameResult()
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.reportGameResult();
		}
		else
		{
			console.log("no sdk not reportGameResult");
		}
	}

	/**
     * 和悦检测服务器状态，通过pid登录不检测服务器状态
     */
	export function heyueCheckServer(serverId:string):void
	{
		if(RSDKHelper.isInit)
		{
			if(LoginMgr.loginBySetPID)
			{
				App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
			}
			else
			{
				if(PlatMgr.checkIsWeiduan())
				{
					PlatMgr.client.checkServerState(serverId);
				}
				else
				{
					RSDKHelper.heyueCheckServer(serverId);
				}
			}
		}
		else
		{
			App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
		}
	}

	export namespace client
	{
		export function checkServerState(serverId:string):void
		{	
			if (checkIsWeiduan()) {
				rsdkclientplugin.checkServerState(serverId);
			}
			else {
				 App.MsgHelper.dispEvt(MsgConst.CHECK_SERVER);
			}
		}

		export function checkPurchase(serverId:string):void
		{	
			if (App.DeviceUtil.isAndroid()) {
				rsdkclientplugin.checkPurchase(serverId);
			}
		}

		export function checkPerson():boolean
		{
			return PlatMgr.kkk_age>0;
		}
		export function showPersonView(callback:Function):void
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.showPersonView(callback);
			}
		}
		export function getAndroidAPILevel():number
		{
			try
			{
				if(App.DeviceUtil.isAndroid())
				{
					App.LogUtil.log("getAndroidAPILevel"+rsdkclientplugin.getAndroidAPILevel());
					return Number(rsdkclientplugin.getAndroidAPILevel());
				}
			}
			catch(e)
			{
				return 0;
			}
			return 0;
		}
		export function getGUID():string
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.getGUID();
			}
			return null;
		}

		export function openServiceCenter():void
		{
			// if(rsdkclientplugin)
			// {
			// 	rsdkclientplugin.openServiceCenter();
			// }
			RSDK.customerService("");
		}
		export function showBindPhoneView(callback:Function,callbackThisObj:any):void
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.showBindPhoneView(callback.bind(callbackThisObj));
			}
			// if(callback)
			// {
			// 	callback.apply(callbackThisObj);
			// }
		}

		export function checkBindPhone():boolean
		{
			if(rsdkclientplugin)
			{
				return rsdkclientplugin.checkBindPhone();
			}
			return false;
		}

		export function setAppForegroundStatusChange():void
		{
			// if(checkIsWeiduan() && rsdkclientplugin)
			// {	
			// 	try
			// 	{
			// 		console.log("QAZ setAppForeground ");
			// 		rsdkclientplugin.setAppForegroundStatusChangeCallback((msg:string)=>{
			// 			console.log("QAZ setAppForeground Callback "+msg);
			// 			if(Number(msg)==1)
			// 			{
			// 				SoundManager.resumeBg();
			// 			}
			// 			else 
			// 			{
			// 				SoundManager.pauseBg();
			// 			}
			// 		});
			// 	}
			// 	catch (e) 
			// 	{
			// 		App.LogUtil.log("setAppForegroundStatusChange error");
			// 	}
			// }
			console.log("QAZ setGameForeground callsdk ");
			RSDKHelper.setGameBackgroundChange((msg:string)=>{
				console.log("QAZ setGameForeground Callback "+msg);
				if(Number(msg)==1)
				{	
					SoundMgr.isInBackground = false;
					SoundMgr.resumeBg();
				}
				else 
				{	
					SoundMgr.isInBackground = true;
					SoundMgr.pauseBg();
					// 微个小游戏，热启动时的更新处理
					if (App.DeviceUtil.isWXgame()) {
						if (typeof window["wx"].getUpdateManager === 'function') {
							const updateManager = window["wx"].getUpdateManager()

							updateManager.onCheckForUpdate(function (res) {
								// 请求完新版本信息的回调
								console.log("检查新版本", res.hasUpdate)
							})

							updateManager.onUpdateReady(function () {
								// 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
								console.log("新的版本已经下载好，调用 applyUpdate 应用新版本并重启");
								// window["wxgameCleanCacheImage"]();
								// window["wxgameCleanCacheText"]();
								updateManager.applyUpdate()
							})

							updateManager.onUpdateFailed(function () {
								// 新的版本下载失败
								console.log("新的版本下载失败");
							})
						}
					}
				}
			});
		}

		// export function getAppVersion():number
		// {
		// 	try
		// 	{
		// 		if(rsdkclientplugin)
		// 		{
		// 			return rsdkclientplugin.getVersion();
		// 		}
		// 	}
		// 	catch(e)
		// 	{
		// 		return 0;
		// 	}
		// 	return 0;
		// }

		export function checkWeiduanUpgrade():void
		{
			if(App.DeviceUtil.IsHtml5())
			{
				try
				{
					let version:number=Number(rsdkclientplugin.getVersion());
					let channelId:string=PlatMgr.getChannelId();
					let appid:string=rsdkclientplugin.getSubAppId();
					var phpurl=ServerCfg.baseUrl+"getversion.php";
					let host = window.location.host;
					if(host.indexOf("127.0.0.1")!=-1||host.indexOf("192.168.")!=-1)
					{
						phpurl="http://192.168.8.82/gt_h5/getversion.php";
					}
					NetLoading.show();
					NetManager.http.get(phpurl,{version:version,appid:channelId+"_"+appid},(data:any)=>{
						NetLoading.hide();
						if(data&&data.gameurl)
						{
							// ViewController.getInstance().openView(ViewConst.WEIDUANUPGRADEPOPUPVIEW,data.gameurl);
						}
					},()=>{
						NetLoading.hide();
					},PlatMgr);
				}
				catch(e)
				{
					NetLoading.hide();
				}
			}
		}

		export function checkAppUpgrade():void
		{
			if(App.DeviceUtil.isRuntime2())
			{
				//获取版本号versioncode，versionname
                egret.ExternalInterface.addCallback("getPackageVersionCallback", function (data) {
					//data为json字符串：{"versionName":"1.0","versionCode":"1"}
					let versionCode=JSON.parse(data).versionCode;
					getApkUrl(versionCode,(url:string)=>{
						egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "openUrl", data: {
								"url": "http://client.dl.126.net/androidmail/dashi/79/mail.apk" 
								}
							})
						);
					});
                });
                egret.ExternalInterface.call("sendToNative", JSON.stringify({ func: "getPackageVersion" }));
			}
		}
	}
	function getApkUrl(versionCode:number,callback:(url:string)=>void):string
	{
		NetManager.http.get("",{},(data)=>{

		},()=>{},PlatMgr.client);
		return '';
	}
	// 是否是港台web
	export function checkIsTwWeb():boolean
	{
		return PlatMgr.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatMgr.getAppid() == "17004003");
	}

	export function checkIsShenHeYiWan():boolean{
		let bigappid_arr = [17013000]; 
		let appid_arr= [17001263,17014002,17001274];
		let bigAppid = Number(PlatMgr.getBigAppid());
		let isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
		let appId = Number(PlatMgr.getAppid());
		let isApp = appid_arr.indexOf(appId) > -1;
		// return true;
		return (PlatMgr.checkIsIOSShenheSp() && (isApp||isBigApp));
	}

	export function checkHideSwitchAccountBtn():boolean
	{
		/**这个条件是如果1000服地址并且不使用sdk会显示切换账号按钮 */
		if(PlatMgr.checkIsTest()&&PlatMgr.checkIsUseSDK()==false)
		{
			return false;
		}
		if(PlatMgr.checkIsPlatSp())
		{
			return false;
		}
		if(PlatMgr.checkIsLocal()&&PlatMgr.checkIsUseSDK()==false)
		{
			return false;
		}
		return false;
	}

	/** 是否有特殊关闭按钮（关闭按钮在左边，其实就是指的微信小游戏和qq玩一玩 */
	export function hasSpcialCloseBtn():boolean
	{
		// return App.DeviceUtil.isWXgame() || App.DeviceUtil.isQQGame();
		return false
	}

	export function getLocalMultiLanguage():string
	{
		if(PlatMgr.checkIsLocal())
		{
			let tmpcnName:string=App.CommonUtil.getOption("language");
			if(tmpcnName&&RES.hasRes(tmpcnName))
			{
				return tmpcnName;
			}
		}
		return null;
	}

	/**
	 * 是否是腾讯视频渠道
	 */
	export function checkIsWanbaFromWx():boolean
	{
		if(PlatMgr.checkIsWanbaSp()&&PlatMgr.checkIsUseSDK())
		{
			if(window['OPEN_DATA']&&window['OPEN_DATA'].pf.indexOf("weixin.99") > -1)
			{
				return true;
			}
		}
		return false;
	}

	export function checkIsHeYue():boolean
	{
		if(PlatMgr.checkIsUseSDK())
		{
			return false;
		}
	}

	export function getWXMoreGameIcon(callback:Function,callbackThisObj:any):void
	{
		console.log("QAZ getWXMoreGameIcon callsdk ");
		RSDKHelper.getMoreGameIcon(callback.bind(callbackThisObj));
	}
	export function showWXMoreGame():void
	{
		console.log("QAZ showMoreGame callsdk ");
		RSDKHelper.showMoreGame();
	} 
 
	export function isShowWXLoading():boolean
	{
		if (App.DeviceUtil.isWXgame()) 
		{
			return true;
		}
		return false;
	}
	/**
	 * 联系客服
	 */
	export function getContackService()
	{
		let serviceType = PlatMgr.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+serviceType);
		if (serviceType == 0)
		{
			// ViewController.getInstance().openView(ViewConst.SETTINGCONTACTPOPUPVIEW, {type:0});
		}
		else if (serviceType == 1)
		{
			PlatMgr.client.openServiceCenter();
		}
		else 
		{
			RSDKHelper.getCustomerService((data:any)=>{
			console.log("QAZ fkcw getCustomerService 结果"+data);
				// if(data) 
				// {
				// 	ViewController.getInstance().openView(ViewConst.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
				// } 
			});
		}
	}

	export function checkIsFromMicroEnd():boolean
	{
		if (RSDKHelper.isInit) 
		{
			return qqwanbaplugin.checkIsFromMicroEnd();
		}
		return false;
	}
	/**
	 * 是否是泰国的华为渠道
	 */
	export function checkIsThHw():boolean
	{
		return PlatMgr.getAppid() == "17027004" && PlatMgr.checkIsThSp();
	}

	/**
	 * 是否是英文的华为渠道
	 */
	export function checkIsEnHw():boolean
	{
		return PlatMgr.getAppid() == "1003005005" && PlatMgr.checkIsEnSp();
	}

	/**
	 * 是否是开启了货币国际化的渠道
	 */
	export function checkisLocalPrice():boolean
	{
		return Boolean((GameData.platMoneyData || GameData.platMoneyData2)&&(
			checkIsThHw()||
			checkIsEnSp()||
			checkIsRuSp()||
			checkIsTWBSp()
			));
	}

	/**
	 * 检测是否显示返回大厅(App)按钮
	 */
	export function checkShowBackApp():boolean
	{
		if(PlatMgr.getAppid() == "17021003")
		{
			return false;
		}
		return PlatMgr.getAppid()=="17018010" && 
		PlatMgr.checkIsUseSDK()==true;
	}

	/**
	 * 检测是否需要检测补单处理
	 */
	export function checkNeedCheckPurchase():boolean
	{
		if (PlatMgr.checkIsUseSDK()&& PlatMgr.checkIsWeiduan()==true && App.DeviceUtil.isAndroid() && checkIsHeYue() )  //PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true || PlatformManager.checkIsEnSp()==true || PlatformManager.checkIsThSp()==true
		{
			return true;
		}
		return false;
	}
	/**
	 * 初始化对象池参数
	 */
	function initUseObjectPool():void
	{
		// let useObjPool:boolean = (checkIsLocal()==false&&checkIsXlySp()==false);
		// App.DisplayUtil.useObjectPool=useObjPool;
		// if(App.DeviceUtil.isRuntime2())
		// {
		// 	App.DisplayUtil.useObjectPool=false;
		// }
		App.DisplayUtil.useObjectPool=false;
	}

	/**
     * 调用Appstore评分
     */
	export function openAppStoreScore():void
	{
		if(App.DeviceUtil.isIOS()&&PlatMgr.checkIsWeiduan())
        {
			if(RSDKHelper.isInit)
			{
				RSDKHelper.openAppStoreScore();
			}
		}
	}

	/**
     * 检测是否有绑定功能
     */
    export function hasBindFunc():boolean
    {
			let result:boolean=false;
					if(RSDKHelper.isInit)
			{
				result = RSDKHelper.hasBindFunc();
			}
			return result;
    }

    /**
     * 检测是否已经绑定
     * @param callback 检测结果，code==1 是绑定成功 
     */
    export function checkBindStatus(callback:(code:number|string)=>void):void
    {
			if(RSDKHelper.isInit)
			{
						RSDKHelper.checkBindStatus(callback);
			}
			else
			{
				App.LogUtil.log("sdk not init");
				if(PlatMgr.checkIsLocal())
				{
					callback(0);
				}
			}
    }

    /**
     * 绑定接口,回调同检测绑定接口
     */
    export function callBind(callback:(code:number|string)=>void):boolean
    {
			let result:boolean=false;
			if(RSDKHelper.isInit)
			{
						RSDKHelper.callBind(callback);
				result=true;
			}
			else
			{
				App.LogUtil.log("sdk not init");
				if(PlatMgr.checkIsLocal())
				{
					callback(1);
				}
			}
			return result;
		}
		
		/**
		 * 获取手机验证码
		 * @param mobile 
		 * @param callback 
		 * @param callbackThisObj 
		 */
		export function sendMobileCode(mobile:number,callback:()=>void,callbackThisObj:any):void
		{
			RSDKHelper.sendMobileCode(mobile,callback,callbackThisObj);
		}

		/**
		 * 使用手机号和验证码 验证	
		 * @param mobile 
		 * @param code 
		 * @param callback 
		 * @param callbackThisObj 
		 */
		export function checkMobileCode(mobile:number,code:number,callback:()=>void,callbackThisObj:any):void
		{
			RSDKHelper.checkMobileCode(mobile,code,callback,callbackThisObj);
		}

		export function setAppOnBackHandler():void
		{
			if(RSDKHelper.isInit)
			{
				RSDKHelper.setAppOnBackHandler(()=>{
					// if(ViewController.getInstance().hideTopView()==false)
					// {
						RSDKHelper.goAppExit();
					// }
				},PlatMgr);
			}
		}
	/**
     * 获取翻译目标语言
     */
	export function getTransTargetLang():string
	{	
		let key:string = GameData.getLanguageKey("cn");
		if (key == "cn" || key == "tw")
		{
			key = "zh-"+key.toUpperCase();
		}
		return key;
	}

	/**
	 * 获取游戏使用的语言
	 */
	export function getGameArea():string
	{
		if(!GameData.curBigType)
		{
			GameData.curBigType=App.CommonUtil.getOption("gameArea");
		}
		return GameData.curBigType||"";
	}
	/**
	 * 获取游戏使用的语言
	 */
	export function getGameLanguage():string
	{
		return App.CommonUtil.getOption("gameLanguage")||"";
	}

	export function getGameCountryCode():string
	{
		return App.CommonUtil.getOption("contryCode")||"";
	}

	/**
	 * 是否是新的分区包
	 */
	export function checkIsAreaPkg():boolean
	{
		return Boolean(getGameLanguage())&&Boolean(getGameArea());
	}

	export function switchAreaOrLanguage(area:string,language:string):void
    {
		if(RSDKHelper.isInit)
		{
			RSDKHelper.switchAreaOrLanguage(area,language);
		}
    }

	export function checkIsViSp():boolean
	{	
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string = window.location.pathname;
			return pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1||App.CommonUtil.getOption("language")=="vi";

			// return search.indexOf("_vi")>-1||search.indexOf("_testvi")>-1 || search.indexOf("=vi")>-1||
			// 	pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1 || pathname.indexOf("=vi")>-1;
		}
		return false;
	}
	
	export function analyticsByHyKey(key:string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsByHyKey(key);
		}
	}

	/**
     * iframe弹窗打开url页面
     * @param url 目标url地址
     * @param title 标题，可以无
     */
	export function loadUrl(url:string,title?:string):void
    {
        if(RSDKHelper.isInit)
        {
            RSDKHelper.loadUrl(url,title);
        }
		else
		{
			console.log("调用 RSDK.loadUrl 失败 ，没有初始化RSDKHelper");
		}
    }

	

	/**退出应用，支持微信小游戏，微端，原生 */
	export function forceAppExit():void 
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.forceAppExit();
		}
	}

	
}