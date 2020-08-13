namespace PlatformManager
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
	export let custom_data:string;
	export let ios_pay:boolean=false;
	export let fk_realname:boolean=false;
	export let fk_antiaddicted:boolean=false;//true代表不需要防沉迷
	export let fk_vipds:boolean=false;//true代表显示vip大使
	export let fk_cdk:boolean=false;//fk_显示cdk
	export let fk_wife:boolean=false;//fk_显示脱衣
	export let devicePushToken:string;
	export let rsdk_sign:string;
	export let rsdk_login_time:number;
	export let isShowCircle:boolean=false;
	// export let fromShareId:string;
	export let isFromWxmypro:boolean=false;
	export let isFromWxIcon:boolean=false;//从微信悬浮窗进入
	export let isFromWxCard:boolean = false;//微信群聊进入
	export let fromWxCardExt:string = null;//微信群聊ext

	export let fk_userid:string;
	export let app:string;//来自哪个渠道
	// let appId:string="";
	export let chat_mkey:string;//聊天验证key
	export let chat_ts:number;//聊天验证key_ts
	export let all_ab_subs:string[]=[];//融合AB测试包的所有子平台ID


	export function getAppVersion():string
	{
		try
		{
			if(PlatformManager.checkIsWxmgSp())
			{
				return "modifybywxgamescript_svnversion";
			}
			else if(PlatformManager.checkIsBaiduSp())
			{
				return "modifybywxgamescript_svnversion";
			}
			else if(PlatformManager.checkIsQQXYXSp())
			{
				return "modifybywxgamescript_svnversion";
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
	export function getAppid():string
	{
		try{
			if(RSDK&&RSDK.getAppid&&RSDKHelper.isInit)
			{
				let appId:string=RSDK.getAppid();
				if (RSDK.getAppid()== "1003011001" && App.DeviceUtil.isIOS())
				{
					appId="1003011002";
				}

				return appId;
			}
		}
		catch(e)
		{
			try
			{
				if(SDK&&SDK.CommonUtil&&SDK.CommonUtil.appId)
				{
					return SDK.CommonUtil.appId;
				}
			}
			catch(e)
			{
				return "";
			}
		}
	}

	export function getBigAppid():string
	{
		if (App.DeviceUtil.isWyw()) {
			return "0";
		}
		if(GameData.isLocal())
		{
			return "0"
		}
		let bigAppid:string=App.CommonUtil.getOption("r_bid");
		if(!bigAppid)
		{
			let appid:number=Number(getAppid());
			bigAppid=String(Math.floor(appid/1000)*1000);
		}
		return String(bigAppid);
	}
	export function getContact():string[]
	{
		if(PlatformCfg.contactCfg[PlatformManager.getAppid()]){
			return PlatformCfg.contactCfg[PlatformManager.getAppid()];
		}
		else if(PlatformCfg.contactCfg[PlatformManager.getBigAppid()])
		{
			return PlatformCfg.contactCfg[PlatformManager.getBigAppid()];
		}
		else
		{
			for(let key in PlatformCfg.contactCfg)
			{
				if(key.indexOf("-")>-1)
				{
					let keys=key.split("-");
					let appid:number=Number(PlatformManager.getAppid());
					let bigAppid:number=Number(PlatformManager.getBigAppid());
					if(appid>=Number(keys[0])&&appid<=Number(keys[1]))
					{
						return PlatformCfg.contactCfg[key];
					}
				}
			}
		}
		return [];
	}

	export function getSpid():string
	{
		let isClientRes:boolean=false;
		let spid:string;
		if (App.DeviceUtil.isWXgame() && checkIsWxAppSp())
		{
			spid="wxapp";
		}
		else if (App.DeviceUtil.isBaidugame())
		{
			spid="baidu";
		}
		else if (checkIsQQXYXSp())
		{
			spid="wanba";
		}
		else if (App.DeviceUtil.isWyw())
		{
			spid="wyw";
		}
		else if (checkIs37WdSp())
		{
			spid="37wd";
		}
		else if(checkIsLocal())
		{
			spid="local";
		}
		else if(checkIsIOSShenheSp())
		{
			spid="iosshenhe";
			if(checkIsTWBSp())
			{
				spid = "tw";
			}
			else if(checkIsViSp())
			{
				spid = "vi";
			}
			else if(checkIsKRNEWIOSShenheSp())
			{
				spid = "krnewiosshenhe";
			}
		}
		else if(checkIsWanbaSp())
		{
			spid="wanba";
		}
		else if(checkIs3KSp())
		{
			spid="3k";
		}
		else if(checkIsYYBSp())
		{
			spid="yyb";
		}
		else if(checkIsTWBSp())
		{
			spid="tw";
		}
		else if(checkIsFkylcSp())
		{
			spid="fkylc";
		}
		else if(checkIsXlySp())
		{
			spid="xly";
		}
		else if(checkIsXzySp())
		{
			spid="xzy";
		}
		else if(checkIsZjlxSp())
		{
			spid="zjlx";
		}
		else if(checkIsEwanSp())
		{
			spid="ewan";
		}
		else if(checkIs49ySp())
		{
			spid="49y";
		}
		else if(checkIsSfSp())
		{
			spid="sf";
		}
		else if(checkIsKRSp())
		{
			spid="kr";
		}
		else if(checkIsKRNewSp())
		{
			spid="krnew";
		}
		else if(checkIsFkcwSp())
		{
			spid="fkcw";
		}
		else if(checkIsEnSp())
		{
			spid="en";
		}
		else if(checkIs9130Sp())
		{
			spid="9130";
		}
		else if(checkIsCpsSp())
		{
			spid="cps";
		}
		else if(checkIsTestSp())
		{
			spid="test";
		}
		else if(checkIsJPSp())
		{
			spid="jp";
		}
		else if(checkIsWxAppSp())
		{
			spid="wxapp";
		}
		else if(checkIsWxSp())
		{
			spid="wx";
		}
		else if(checkIsWxmgSp())
		{
			spid="wxmg";
		}
		else if(checkIsViSp())
		{
			spid="vi";
		}
		else if(checkIsMwSp())
		{
			spid="mw";
		}

		else if(checkIsH5lySp())
		{
			spid="h5ly";
		}
		else if(checkIsHwSp())
		{
			spid="hw";
		}
		else if(checkIsWdlySp())
		{
			spid="wdly";
		}
		else if(checkIsJxh5Sp())
		{
			spid="jxh5";
		}
		else if(checkIsWdSp())
		{
			spid="wd";
		}
		
		else if(checkIsNewWdSp())
		{
			spid="newwd";
		}
		
		else
		{
			if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
			{
				let pathname:string = window.location.pathname;
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
						spid="wd";
					}
				}
				else
				{
					spid="wd";
				}
			}
			else
			{
				spid="3k";
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
		if(PlatformManager.checkIsDisableSDK())
		{
			return false;
		}
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
			return false;
		}
		if(App.CommonUtil.getOption("r_plat"))
		{
			return true;
		}
		if(PlatformCfg.useSDK[getBigAppid()]||PlatformCfg.useSDK[getAppid()])
		{
			return true;
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
		else if(PlatformManager.checkIsIOSShenheSp())
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
		if(PlatformManager.checkIsLocal()&&PlatformManager.checkIsPlatSp()==false)
		{
			platName="";
		}
		return platName;
	}

	export function checkIsIOSShenheSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("iosshenhe")>-1||pathname.indexOf("shenhe")>-1;
		}
		return false;
	}

	export function checkIsKRNEWIOSShenheSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("kr-shenhe.")>-1||pathname.indexOf("kr-shenhe.")>-1;
		}
		return false;
	}

	export function checkIsFkylcSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("fkylc")>-1;
		}
		return false;
	}

	export function checkIsAiweiyouSp():boolean
	{
		if(PlatformManager.getAppid() == "17007002"){
			return true;
		}
		return false;
	}
	//判断是否是QQ会员
	export function checkIsQQVip():boolean
	{
		// if(PlatformManager.getAppid() == "1003012008"){
		// 	return true;
		// }
		// return false;
		if(PlatformManager.app == "QQVip"){
			return true;
		}
		return false;
	}

	export function checkIsTWShenheSp():boolean
	{
		if(PlatformManager.getAppid() == "17004001"){
			return true;
		}
		return false;
	}

	export function checkIsKRShenhe():boolean
	{
		if(PlatformManager.checkIsKRSp()&&App.DeviceUtil.isIOS()&& Api.switchVoApi.checkOpenShenhe())
		{
			return true;
		}
		return false;
	}

	export function checkIsXlySp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("xly")>-1;
		}
		return false;
	} 

	export function checkIsXzySp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("xzy")>-1;
		}
		return false;
	} 

	export function checkIsZjlxSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("zjly")>-1;
		}
		return false;
	}

	export function checkIsEwanSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("ewan")>-1;
		}
		return false;
	}

	export function checkIs49ySp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("49y")>-1;
		}
		return false;
	}
	export function checkIsSfSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_sf")>-1||pathname.indexOf("_testsf")>-1;
		}
		return false;
	}


	export function checkIsFkcwSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_fkcw")>-1||pathname.indexOf("_testfkcw")>-1;
		}
		return false;
	}

	//检测文字显示是水平显示
	export function checkIsTextHorizontal():boolean
	{
		//检测是否是英文
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
		
			
			return PlatformManager.checkIsViSp();
		}
		return false;
	}

	export function checkIsEnSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;

			return pathname.indexOf("_en")>-1||pathname.indexOf("_testen")>-1;
		}
		return false;
	}

	export function checkIs9130Sp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_9130")>-1||pathname.indexOf("_test9130")>-1;
		}
		return false;
	}

	export function checkIsCpsSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_cps")>-1||pathname.indexOf("_testcps")>-1;
		}
		return false;
	}

	export function checkIsMwSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_mw")>-1||pathname.indexOf("_testmw")>-1;
		}
		return false;
	}

	export function checkIsH5lySp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_h5ly")>-1||pathname.indexOf("_testh5ly")>-1;
		}
		return false;
	}

	export function checkIsWdSp():boolean
	{
		if(PlatformManager.checkIsWdlySp())
		{
			return false;
		}
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_wd")>-1||pathname.indexOf("_testwd")>-1;
		}
		return false;
	}
	export function checkIsNewWdSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_newwd")>-1||pathname.indexOf("_testnewwd")>-1;
		}
		return false;
	}
	export function checkIsNewHopeSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_newhope")>-1||pathname.indexOf("_testnewhope")>-1;
		}
		return false;
	}
	export function checkIsHwSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_hw")>-1||pathname.indexOf("_testhw")>-1;
		}
		return false;
	}

	export function checkIsWdlySp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_wdly")>-1||pathname.indexOf("_testwdly")>-1;
		}
		return false;
	}
	export function checkIsMmSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_mm")>-1||pathname.indexOf("_testmm")>-1;
		}
		return false;
	}
	export function checkIsJxh5Sp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_jxh5")>-1||pathname.indexOf("_testjxh5")>-1;
		}
		return false;
	}
	export function checkIsWxAppSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_wxapp")>-1||pathname.indexOf("_testwxapp")>-1;
		} else if (App.DeviceUtil.isWXgame()) {
			return window["WXAPP_ISWXAPP"] === true;
		}
		return false;
	}

	export function checkIs37WdSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_37wd")>-1||pathname.indexOf("_test37wd")>-1;
		}
		return false;
	}

	//37买量审核服
	export function checkIs37WdShenheSp():boolean
	{
		if(PlatformManager.checkIsIOSShenheSp()&&PlatformManager.getAppid()=="1003017000")
		{
			return true;
		}
		return false;
	}

	export function checkIsNewhope2Sp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_newhope2")>-1||pathname.indexOf("_testnewhope2")>-1;
		}
		return false;
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
		if(PlatformManager.getAppid()=="1003002001")
		{
			return false;
		}
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_test")>-1;
		}
		return false;
	}

	export function checkUseRSDKSocket():boolean
	{
		let useRSDKSocket:boolean=false;
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
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
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
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
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_tw")>-1||pathname.indexOf("_testtw")>-1||App.CommonUtil.getOption("language")=="tw";
		}
		return false;
	}

	export function checkIsKRSp():boolean
	{
		if(PlatformManager.checkIsKRNewSp())
		{
			return false;
		}
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1||App.CommonUtil.getOption("language")=="kr";
		}
		return false;
	}

	export function checkIsKRNewSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_krnew")>-1||pathname.indexOf("_testkrnew")>-1||App.CommonUtil.getOption("language")=="krnew";
		}
		return false;
	}

	export function checkIsJPSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_jp")>-1||pathname.indexOf("_testjp")>-1||App.CommonUtil.getOption("language")=="jp";
		}
		return false;
	}

	export function checkIsViSp():boolean
	{	
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string = window.location.pathname;
			return pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1||App.CommonUtil.getOption("language")=="vi";

			// return search.indexOf("_vi")>-1||search.indexOf("_testvi")>-1 || search.indexOf("=vi")>-1||
			// 	pathname.indexOf("_vi")>-1||pathname.indexOf("_testvi")>-1 || pathname.indexOf("=vi")>-1;
		}
		return false;
	}

	// export function checkIsKrSp():boolean
	// {
	// 	if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
	// 	{
	// 		let pathname:string=window.location.pathname;
	// 		return pathname.indexOf("_kr")>-1||pathname.indexOf("_testkr")>-1;
	// 	}
	// 	return false;
	// }
	//港台官网包
	export function checkIsTWMCSp():boolean
	{
		if(PlatformManager.getAppid() == "17004004"){
			return true;
		}
		return false;
	}

	//4399
	export function checkIs4399Sp():boolean
	{
		if(PlatformManager.getAppid() == "17007003"){
			return true;
		}
		return false;
	}

	export function checkIsYYBSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let host:string=window.location.host;
			return host.indexOf("yyb")>-1;
		}
		return false;
	}

	export function checkIsTestSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let host:string=window.location.host;
			return host.indexOf("compose-test")>-1;
		}
		return false;
	}

	export function checkIsWanbaSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			let host:string=window.location.host;
			let search:string = window.location.search;
			return pathname.indexOf("wanba")>-1||host.indexOf("urlshare")>-1||host.indexOf("qzone")>-1||search.indexOf("=wanba")>-1;
		}
		return false;
	}

	//qq小游戏
	export function checkIsQQXYXSp():boolean
	{	
		return window["QQ_ISQQ"] === true;
		// if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		// {
		// 	let pathname:string=window.location.pathname;
		// 	return pathname.indexOf("_wanba")>-1||pathname.indexOf("_testwanba")>-1;
		// }
		// return false;
	}

	export function checkIs11WanSp():boolean
	{
		if(PlatformManager.getAppid() == "17001002"){
			return true;
		}
		return false;
	}

	export function checkIs3kShenHaiSp():boolean
	{
		if(PlatformManager.getAppid() == "17001195" || PlatformManager.getAppid() == "17001196" || PlatformManager.getAppid() == "17001197" || PlatformManager.getAppid() == "17001198"){
			return true;
		}
		return false;
	}

	export function checkIs3KSp():boolean
	{
		if(checkIsLocal()&&checkIsWeiduan())
		{
			return true;
		}
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			return window.location.pathname.indexOf("3k")>-1;
		}
		return false;
	}

	export function checkIs3KSubSp():boolean
	{
		return getAppid()=="17001001"||getAppid()=="17001186"||getAppid()=="17001187"||getAppid()=="17001185"||getSpName()=="h5ios3kwan"||getSpName()=="h5iosshiyiwan"||getSpName()=="h5iosyinhu";
	}

	export function checkIsLocal():boolean
	{
		return GameData.isLocal();
	}

	export function isSupportDesktopIcon():boolean
	{	
		// if (!App.DeviceUtil.IsMobile() && checkIsTWBSp()) {
		// 	return true;
		// }
		// else {
		// 	return false;
		// }
		console.log("QAZ fkcw checkDesktop"+PlatformManager.checkDesktop());
		return PlatformManager.checkDesktop();
	}

	/**
	 * 获取玩吧渠道环境，QZ是QQ空间，SQ是结合版
	 */
	function getWanbaQua():string
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
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

	export function getIsWanbaSQ():boolean
	{
		return getWanbaQua()=="SQ";
		// return checkIsUseSDK();
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
		//微信H5不要分享
		// if(PlatformManager.checkIsWxH5Sp())
		// {
		// 	return false;
		// }
		console.log("QAZ fkcw checkShare"+PlatformManager.checkShare());
		return PlatformManager.checkShare()==1 || PlatformManager.checkShare()==2 || PlatformManager.checkShare()==3 || PlatformManager.checkIsLocal();
		// return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
	}

	export function isSupportAttention():boolean
	{
		// if(PlatformManager.checkIsWxH5Sp())
		// {
		// 	return false;
		// }
		return (checkIsFkylcSp()&&!checkIs4399Sp()) || PlatformManager.hasFollow();
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
			// qqwanbaplugin.shortcut({title:"皇上快点"},callback.bind(callbackThisObj));
			PlatformManager.requestDesktop({title:"皇上快点",desc:""},callback,callbackThisObj);
		}
		// callback.apply(callbackThisObj);

	}

	export function sendCandy(num:string,callback:Function,callbackThisObj:any):void
	{
		//signin
		qqwanbaplugin.sendCandy("signin",num,callback.bind(callbackThisObj));
	}
	
	export function share(shareType:string,callback:Function,callbackThisObj:any)
	{			
		// if(1==1){
		// 	callback.apply(callbackThisObj);
		// 	return;

		// }
		
		if(RSDKHelper.isInit)
		{	
			let shareContent = {shareType: shareType};
			RSDKHelper.guideShare(shareContent,(code:string,data:any)=>{
				//微信分享假失败
				console.log("分享code:"+code);
				if((PlatformManager.checkIsWxmgSp()||PlatformManager.checkIsQQXYXSp())&&Api.switchVoApi.checkOpenWxShareFail())
				{
					let otherinfo = Api.otherInfoVoApi.getOtherInfo().info;
					if( otherinfo.firstshare!=1){
						//值发生改变
						NetManager.request(NetRequestConst.REQUST_OTHERINFO_CHANGSHARE,{scene:"firstshare",changshare:1});
						code = "1";
					}

					let ranIndex = App.MathUtil.getRandom(1,5);
					if(Number(code)==0 && ranIndex==1)
					{
						code = "1";
					}
				}
				if(Number(code)==0)
				{
					if(callback)
					{
						callback.apply(callbackThisObj,[data]);
					}
				} else {
					//分享失败
					egret.setTimeout(()=>{
						App.CommonUtil.showTip(LanguageManager.getlocal("shareCommonSharedFailed"));
                    },this,500);
					
				}
			});
			// RSDKHelper.share((code:string,data:any)=>{
			// 	if(Number(code)==0)
			// 	{
			// 		if(callback)
			// 		{
			// 			callback.apply(callbackThisObj,[data]);
			// 		}
			// 	}
			// });
		}

		
			//废除的分享功能
			// if (checkIsTWBSp() == true) {
			// 	RSDKHelper.fbShare((code:string,data:any)=>{
			// 		if(Number(code)==16)
			// 		{
			// 			if(callback)
			// 			{
			// 				callback.apply(callbackThisObj);
			// 			}
			// 		}
			// 		else {
			// 			console.log("分享失败 "+code);
			// 		}
			// 	});
			// }
			// else if (checkIsKRSp() == true) {
			// 	RSDKHelper.krShare((code:string,data:any)=>{
			// 		if(Number(code)==16)
			// 		{
			// 			if(callback)
			// 			{
			// 				callback.apply(callbackThisObj);
			// 			}
			// 		}
			// 		else {
			// 			console.log("分享失败 "+code);
						
			// 		}
			// 	});
			// }
			// else {
			// 	RSDKHelper.share((code:string,data:any)=>{
			// 		// if(PlatformManager.checkIsWxSp()&&!data.groupId)
			// 		// {
			// 		// 	console.log("没有分享到群里 "+data);
			// 		// 	return;
			// 		// }
			// 		if(Number(code)==0)
			// 		{
			// 			if(callback)
			// 			{
							
			// 				callback.apply(callbackThisObj,[data]);
			// 			}
			// 		}
			// 	});
			// }
		// }
		// else
		// {
		// 	if(callback)
		// 	{
		// 		callback.apply(callbackThisObj);
		// 	}
		// }
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

	export function login():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.login();
		}
	}
	export function logout():boolean
	{
		PlatformManager.isLogin=false;
		if(RSDKHelper.isInit)
		{
			RSDKHelper.logout();
			if(PlatformManager.checkIsKRSp())
			{
				return true;
			}
			return false;
		}
		else
		{
			LoginManager.changeAccount();
			return true;
		}
	}
	export function pay(productId:string):void
	{
		if(Api.switchVoApi.checkClosePay()||PlatformManager.checkHideIconByIP())
		{
			// App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
			return;
		}
		if(PlatformManager.checkIsBaiduSp()&&App.DeviceUtil.isIOS())
		{
			App.CommonUtil.showTip("ios暂未开放支付，请前往安卓客户端支付");
			return;
		}

		if (!PlatformManager.checkIsWxH5Sp()&& Api.switchVoApi.checkOpenRealnamerewards()&&Api.switchVoApi.checkOpenTrueRealName()  && Api.otherInfoVoApi.getRealnameRewards()==null&&GameData.pidflag==false&&GameData.regionflag==true)
		{	
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW);
            return;
		}
		// 微信实名认证判断
		if (!PlatformManager.checkIsWxH5Sp()&&Api.switchVoApi.checkOpenCertification3()&&(PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxmgSp()) && !PlatformManager.fk_realname && !Api.otherInfoVoApi.hasRealname3Ok() && !Api.switchVoApi.checkWxRealname3LevelCanPay() ) {
			ViewController.getInstance().openView(ViewConst.POPUP.REALNAME3INPUTVIEW);
			return;
		}

		// if (App.DeviceUtil.isWXgame() && window["__WXGAME_OS__"] === "ios")
		// {
		// 	// 微信小游戏ios暂不开支付
		// 	App.CommonUtil.showTip(LanguageManager.getlocal("wxgameIOSNotPayTip"));
		// }
		else if(PlatformManager.checkIsUseSDK())
		{
			// if(PlatformManager.checkIsJPSp())
			// {
			// 	var device = App.DeviceUtil.isIOS()?"IOS":"Android";
			// 	NetManager.request(NetRequestConst.REQUST_STATS_CLICKPAYEVENT, { chargetype:productId,system:device});
			// }
			

			if(PlatformManager.isShowNewAnalytics()){
				PlatformManager.analyticsClickPayment()
			}
			if(RSDKHelper.isInit)
			{
				RSDKHelper.pay(productId);
			}

		}
		else
		{
			if(GameData.isLocal())
			{
				testPay(productId);
			}
		}
	}

	export function checkIsIdnSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_idn")>-1||pathname.indexOf("_testidn")>-1;
		}
		return false;
	}

	function testPay(productId:string):void
	{
		let itemCfg:Config.RechargeItemCfg=Config.RechargeCfg.getRechargeItemCfgByKey(productId);
		if(GameData.isLocal()||GameData.isTest())
		{
			let order_id:string=String(new Date().getTime()+Math.random()*99999999);
			NetManager.request(NetRequestConst.PAY_PROCESSPAYMENT,{order_id:order_id,gold_num:itemCfg.gemCost,platform:"h5",name:itemCfg.id})
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
	}

	export function analyticsPay(id:string,orderId:string,paymentData:any):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsPay(id,orderId,paymentData);
		}
	}

	export function analyticsLevelup():void
	{	
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsLevelup();
		}
	}

	export function analyticsRegister():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsRegister();
		}
	}
	export function analyticsSelectServer():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsSelectServer();
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

	export function analyticsFirstChapter():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsFirstChapter();
		}
	}
	export function analyticsUnlockCell():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsUnlockCell();
		}
	}
	export function analyticsNineGrade():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsNineGrade();
		}
	}
	export function analyticsEightGrade():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsEightGrade();
		}
	}
	export function analyticsUnlockSearch():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsUnlockSearch();
		}
	}
	export function analyticsReachEight():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsReachEight();
		}
	}
	export function analyticsFirstPayment():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsFirstPayment();
		}
	}
	export function analyticsClickPayment():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsClickPayment();
		}
	}

	export function analyticsMainUi():void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsMainUi();
		}
	}
		//是否显示新统计 越南 -8 ~ -15
	export function isShowNewAnalytics():boolean
	{
		if (PlatformManager.checkIsViSp()) 
		{
			return true;
		}
		return false;
	}

	export function pushMsg(data:any):void
	{	
		if (getIsWanbaSQ() == true) 
		{	
			let msg:string = LanguageManager.getlocal("wanbaPushMsg"+data.type);
			qqwanbaplugin.sendMessage(data.frd,"1",msg,null);
		}
	}

	export function getGiftId():string
	{	
		let gid:string = null;
		if (checkIsWanbaSp() == true && checkIsUseSDK()&&qqwanbaplugin) 
		{
			gid = qqwanbaplugin.getGiftId();
		}
		// return "502";
		return gid;
	}

	export function giftExchange(callback:Function,callbackThisObj:any)
	{	
		let gid:string = null;
		if (checkIsWanbaSp() == true && checkIsUseSDK()&&qqwanbaplugin) 
		{
			qqwanbaplugin.giftExchange(callback.bind(callbackThisObj));
		}
		// return gid;

		
	}

	/**
	 * 获取是不是从糖果屋登录
	 */
	export function getCandyFlag():boolean
	{	
		// if (PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
		// {
		// 	return qqwanbaplugin.sendCandyStatus();
		// }
		return false;
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

	export function checkHasCircleFunc(callback):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.checkHasCircleFunc(callback);
		}
		else
		{
		}
	}

	export function showCircle():void
	{
		if(RSDKHelper.isInit)
		{
			return RSDKHelper.showCircle();
		}
	}

	export function isFollowingTxAccount(callback):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.isFollowingTxAccount(callback);
		}
		else
		{
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
		if(rsdkclientplugin)
		{
			rsdkclientplugin.openUserCenter();
		}
	}

	export function getMoneySign():string
	{
		if(checkIsTWBSp())
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
			return "￥";
		}
	}


	export function checkIsUseBigCfg():boolean
	{
		// return getBigAppid()=="17001000";
		return checkIsTWBSp();
	}

	export function checkIs3kQianYiSp():boolean
	{
		if(PlatformManager.getAppid() == "17001001" || PlatformManager.getAppid() == "17001051" || PlatformManager.getAppid() == "17001188"){
			return true;
		}
		return false;
	}

	export function checkIsShowWarning():boolean
	{
		if (checkIsTWBSp()||checkIsKRSp()||checkIsJPSp()||checkIsViSp()||checkIsKRNewSp()) {
			return false;
		}
		else {
			return true;
		}
	}

	export function getStatement():string
	{
		let appid=PlatformManager.getAppid();
		let bigAppid=PlatformManager.getBigAppid();
		let spName=PlatformManager.getSpName();
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

	export function wxchatgiftKeFu(data:{showMessageCard:boolean, sendMessageTitle:string, sendMessageImg:string}) {
		// RSDK.customerService(data);
		RSDK.callSdk("showGiftCustomerService",data, null)
	}

	
	export namespace client
	{
		export function checkServerState(serverId:string):void
		{	
			if (checkIsWeiduan()) {
				rsdkclientplugin.checkServerState(serverId);
			}
			else {
				 App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
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
			return PlatformManager.kkk_age>0;
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
			RSDK.customerService();
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
					SoundManager.isInBackground = false;
					SoundManager.resumeBg();
				}
				else 
				{	
					SoundManager.isInBackground = true;
					SoundManager.pauseBg();
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
			if(PlatformManager.checkIs3KSp()&&App.DeviceUtil.IsHtml5())
			{
				try
				{
					let version:number=Number(rsdkclientplugin.getVersion());
					let channelId:string=PlatformManager.getChannelId();
					let appid:string=rsdkclientplugin.getSubAppId();
					var phpurl=ServerCfg.baseUrl+"getversion.php";
					let host = window.location.host;
					if(host.indexOf("127.0.0.1")!=-1||host.indexOf("192.168.")!=-1)
					{
						phpurl="http://192.168.8.83/gt_h5/getversion.php";
					}
					NetLoading.show();
					NetManager.http.get(phpurl,{version:version,appid:channelId+"_"+appid},(data:any)=>{
						NetLoading.hide();
						if(data&&data.gameurl)
						{
							ViewController.getInstance().openView(ViewConst.POPUP.WEIDUANUPGRADEPOPUPVIEW,data.gameurl);
						}
					},()=>{
						NetLoading.hide();
					},PlatformManager);
				}
				catch(e)
				{
					NetLoading.hide();
				}
			}
		}
	}
	// 是否是港台web
	export function checkIsTwWeb():boolean
	{
		return PlatformManager.checkIsTWBSp() && ((!App.DeviceUtil.IsMobile()) || PlatformManager.getAppid() == "17004003");
	}

	export function checkDownloadApp():void
	{
		try
		{
			if (PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")
			{
				qqwanbaplugin.checkDownloadApp((isDownloadApp)=>{
						App.DeviceUtil.wanbaIsDownloadApp = isDownloadApp;
						if (isDownloadApp) {
							// 玩吧，如果还没有用微端登录过，并且已经安装了微端
							ViewController.getInstance().openView(ViewConst.POPUP.DOWNLOADVIEW,{});
						}
				});
			}
		}
		catch(e)
		{
			console.log("checkDownloadApp error");
		}
	}

	export function checkIsShenHeYiWan():boolean{
		let bigappid_arr = [17013000]; 
		let appid_arr= [17001263,17014002,17001274];
		let bigAppid = Number(PlatformManager.getBigAppid());
		let isBigApp = bigappid_arr.indexOf(bigAppid) > -1;
		let appId = Number(PlatformManager.getAppid());
		let isApp = appid_arr.indexOf(appId) > -1;
		// return true;
		return (PlatformManager.checkIsIOSShenheSp() && (isApp||isBigApp));
	}

	export function checkHideSwitchAccountBtn():boolean
	{

		if(PlatformManager.checkIsDisableSDK())
		{
			return false;
		}

		return (PlatformManager.checkIsMmSp()&&!PlatformManager.checkIsTest()||PlatformManager.checkIsH5lySp()&&!PlatformManager.checkIsTest()||PlatformManager.checkIs11WanSp()|| (PlatformManager.checkIsJPSp()&&PlatformManager.checkIsUseSDK())||
		PlatformManager.checkIs3kShenHaiSp() ||App.DeviceUtil.isWXgame() ||
		(PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()]&&!PlatformManager.checkIsTest())||
		String(PlatformManager.getAppid())=="1003007003")||
		String(PlatformManager.getBigAppid())=="17017000"||
		(String(PlatformManager.getBigAppid())=="17015000"&&String(PlatformManager.getAppid())!="17015009")
		|| PlatformManager.checkIsBaiduSp()&&!PlatformManager.checkIsTest()|| PlatformManager.checkIsWdlySp()&&!PlatformManager.checkIsTest()
		|| PlatformManager.checkIsWxAppSp()&&!PlatformManager.checkIsTest()&&!PlatformManager.checkIsLocal()
		|| PlatformManager.checkIsWxH5Sp()&&!PlatformManager.checkIsTest()&&!PlatformManager.checkIsLocal()
		|| PlatformManager.checkIsJxh5Sp()&&!PlatformManager.checkIsTest()&&!PlatformManager.checkIsLocal()
		|| PlatformManager.checkIsIOSShenheSp()|| PlatformManager.checkIs37WdSp()&&!PlatformManager.checkIsTest()&&!PlatformManager.checkIsLocal();
	}

	export function checkIsXlSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return (pathname.indexOf("_xl")>-1||pathname.indexOf("_testxl")>-1) && checkIsXlySp()==false;
		}
		return false;
	}

	export function checkIsPlatSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()&&App.TestUtil.getTestPlat()&&(window.location.hostname.indexOf("gt-test")>-1||PlatformManager.checkIsLocal()))
		{
			return true;
		}
		return false;
	}

	/** 是否有特殊关闭按钮（其实就是指的微信小游戏和qq玩一玩 */
	export function hasSpcialCloseBtn():boolean
	{
		return App.DeviceUtil.isWXgame() || (App.DeviceUtil.isWXgame() &&  PlatformManager.checkIsWxAppSp()) || App.DeviceUtil.isWyw() || PlatformManager.checkIsBaiduSp()|| PlatformManager.checkIsQQXYXSp();
		// return true;
	}
	export function getLocalMultiLanguage():string
	{
		if(PlatformManager.checkIsLocal())
		{
			let tmpcnName:string=App.CommonUtil.getOption("language");
			if(tmpcnName&&RES.hasRes(tmpcnName))
			{
				return tmpcnName;
			}
		}
		return null;
	}
	export function isShowWXLoading():boolean
	{
		if (PlatformManager.checkIsWxSp() ||PlatformManager.checkIsWxmgSp() ||PlatformManager.checkIsQQXYXSp() || PlatformManager.checkIsBaiduSp() ||PlatformManager.checkIsJPSp()) 
		{
			return true;
		}
		return false;
	}
	/**
	 * 是否是腾讯视频渠道
	 */
	export function checkIsWanbaFromWx():boolean
	{
		if(PlatformManager.checkIsWanbaSp()&&PlatformManager.checkIsUseSDK())
		{
			if(window['OPEN_DATA']&&window['OPEN_DATA'].pf.indexOf("weixin.99") > -1)
			{
				return true;
			}
		}
		return false;
	}
	export function showWXMoreGame():void
	{
		console.log("QAZ showMoreGame callsdk ");
		RSDKHelper.showMoreGame();
	} 
	//检查通用分享  只有微信需要
	export function checkCommonShare():boolean
	{
		return App.DeviceUtil.isWXgame();
	}
	//魔力游闪屏
	export function isShowPreLoading():boolean
	{
		// if (App.DeviceUtil.isWXgame()) 
		// {
		// 	return true;
		// }
		return false;
	}

	/** 是否是微信小游戏平台 */
	export function checkIsWxSp():boolean
	{
		if(PlatformManager.checkIsWxAppSp())
		{
			return false;
		}
		if(PlatformManager.checkIsWxmgSp())
		{
			return false;
		}

		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			let search:string = window.location.search;
			return pathname.indexOf("_wx")>-1||pathname.indexOf("_testwx")>-1||search.indexOf("=wx")>-1;
		} else if (App.DeviceUtil.isWXgame()) {
			return window["WX_ISWX"] === true;
		}
		return false;
	}
	/** 是否是wxmg平台 */
	export function checkIsWxmgSp():boolean
	{
		if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			let search:string = window.location.search;
			return pathname.indexOf("_wxmg")>-1||pathname.indexOf("_testwxmg")>-1||search.indexOf("=wxmg")>-1;
		} else if (App.DeviceUtil.isWXgame()) {
			return window["WXMG_ISWXMG"] === true;
		}
		return false;
	}

	/** 是否是微信小游戏H5平台 */
	export function checkIsWxH5Sp():boolean
	{
		if(PlatformManager.checkIsWxSp()&&!App.DeviceUtil.isWXgame())
		{	
			return true;
		}
		return false;
	}
	/** 是否是百度小游戏平台 */
	export function checkIsBaiduSp():boolean
	{
		return App.DeviceUtil.isBaidugame();
	}

	/**
	 * 联系客服
	 */
	export function getContackService()
	{
		let serviceType = PlatformManager.getCustomerServiceType();
		console.log("QAZ fkcw getCustomerServiceType "+serviceType);
		if (serviceType == 0)
		{
			ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:0});
		}
		else if (serviceType == 1)
		{
			PlatformManager.client.openServiceCenter();
		}
		else {
			RSDKHelper.getCustomerService((data:any)=>{
			console.log("QAZ fkcw getCustomerService 结果"+data);
			if (data) {
			ViewController.getInstance().openView(ViewConst.POPUP.SETTINGCONTACTPOPUPVIEW, {type:2,info:data});
				} 
			});
		}
	}

		/** 越南第三方支付 */
	export function openViWebpay():void
	{
		console.log("QAZ payInThird callsdk ");
		RSDKHelper.payInThird();
		if(PlatformManager.isShowNewAnalytics()){
			PlatformManager.analyticsClickPayment()
		}
	} 

		/** 是否是微信小游戏平台SDK */
	export function checkIsDisableSDK():boolean
	{
		return false;
	}

	export function checkHideIconByIP():boolean
	{
		if (Api.switchVoApi.checkShenheClosePay()) {
			return true;
		} 
		// else if(App.DeviceUtil.isWXgame()&&App.DeviceUtil.isIOS())
		else if(App.DeviceUtil.isWXgame())
		{
			if(PlatformManager.ios_pay!=null &&PlatformManager.ios_pay ==false)
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 检查获得红颜，门课 是否采用按钮分享
	 */
	export function checkGetShare():boolean
	{
		// return App.DeviceUtil.isWXgame() && PlatformManager.isSupportShare();
		// return PlatformManager.checkIsWxSp() && PlatformManager.isSupportShare();  //线上使用
		// return true;
		return false;
	}
	/**
	 * 微信防沉迷
	 */
	export function checkRest():void
		{
			console.log("QAZ checkRest callsdk ");
			RSDKHelper.checkRest((msg:string)=>{
				console.log("QAZ checkRest Callback ");
				NetManager.request(NetRequestConst.REQUEST_OTHERINFO_SETREST, {});
				ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
					title:"itemUseConstPopupViewTitle",
					// msg:LanguageManager.getlocal("versionCompareInfo"),
					msg:"大人，您今日的游戏时间已经很长了，根据防沉迷规则，您在今晚0点前将无法再登陆游戏，请下线休息，欢迎明天再来~",
					callback:(dlg)=>{
						// window.location.reload();
						LoginManager.changeServer();
					},
					clickNotAutoHide:true,
					inLayer:LayerManager.maskLayer
				});
			});
		}

	
	export function checkIsThSp():boolean
	{
		return false;
	}
	/**
	 * 是否使用微信配置
	 */

	export function checkIsWxCfg():boolean
	{
		if(PlatformManager.checkIsWxSp()||PlatformManager.checkIsWxAppSp()||PlatformManager.checkIsQQXYXSp()||PlatformManager.checkIsWanbaSp())
		{
			return true;
		}
		return false;
	}

	export function checkIsEnLang():boolean
	{
		return false;
	}

	/**
	 * 豪门特权可以订阅的平台
	 */
	export function checkSpCardShow():boolean
	{
		// return true;
		return PlatformManager.getAppid()=="1003002001" || PlatformManager.getAppid()=="1003001003" || PlatformManager.getAppid()=="1003004002" || PlatformManager.getAppid()=="1003018001";
	}

	/**
	 * 检测是否显示返回大厅(App)按钮
	 */
	export function checkShowBackApp():boolean
	{
		return PlatformManager.getAppid() == "1003007028";
	}
	/**
	 * 检测是否是微信公众号_H5_传盛
	 */
	export function checkIsWxH5Chuansheng():boolean
	{
		return PlatformManager.getAppid() == "1014002002";
		// return true;
		// return PlatformManager.app == "WX";
	}

	export function feedbackButtonToggle(state:string):void
	{
		if(!App.DeviceUtil.isWXgame())
		{
			return;
		}
		if(RSDKHelper.isInit)
		{
			RSDKHelper.feedbackButtonToggle(state);
		}
	}
	export function createFeedbackButton():void
	{
		if(!App.DeviceUtil.isWXgame())
		{
			return;
		}
		if(RSDKHelper.isInit)
		{
			var data:any = {};
			data.image = "https://gt-fkwx.leishenhuyu.com/wxgameOtherPic/tousuIcon.png";
			data.width=40,
			data.height=40,
			data.left=10,
			data.top=window.screen.availHeight/GameConfig.stage.stageHeight*(130+GameData.layerPosY),
			RSDKHelper.createFeedbackButton(data);
		}
	}

	/*
	 37韩国统计
	*/
	export function analytics37Point(eventName:string,eventKey:string,eventValue:number):void
	{
		if(!PlatformManager.checkIsKRNewSp())
		{
			return;
		}
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analytics37Point(eventName,eventKey,eventValue);
		}
	}

	/*
	 37日本统计
	*/
	export function analytics37JPPoint(eventName:string,eventKey:string,eventValue:number):void
	{
		if(!PlatformManager.checkIsJPSp())
		{
			return;
		}
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analytics37Point(eventName,eventKey,eventValue);
		}
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
     * 融合包切渠道
     * @param subappId 目标渠道统计ID
     */
	export function setABTestFlag(subappId:string):void
	{
		if(RSDKHelper.isInit)
		{
			RSDKHelper.setABTestFlag(subappId);
		}
	}
}