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
		if(!LoginManager.isCreateScene)
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
		if(PlatformManager.checkIsLocal()&&PlatformManager.checkIsPlatSp()==false)
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
	let _spid:string[] = [null,null];
	export function getSpidKey(isClientRes:boolean=true):string
	{	
		let pos = isClientRes ? 0 : 1;
		if (isClientRes==true && _spid[pos])
		{
			return _spid[pos];
		}
		let spid:string=null;
		if (App.DeviceUtil.isWyw())
		{
			spid="lm";
		}
		else if (App.DeviceUtil.isQQGame())
		{
			spid="qqgame";
		}
		else if(checkIsLocal()&&isClientRes==false)
		{
			spid="local";
		}
		else if(checkIsIOSShenheSp())
		{
			spid="iosshenhe";
		}
		else if(checkIsWanbaSp())
		{
			spid="wanba";
		}
		else if(checkIs3KSp())
		{
			spid="3k";
		}
		else if(checkIsLmSp())
		{
			spid="lm";
		}
		else if(checkIsWxSp())
		{
			spid="wx";
		}
		else if(checkIsTestSp())
		{
			spid="test";
		}
		else if(checkIsFBEnSp())
		{
			spid="en";
			return spid;
		}
		else if(checkIsFBTwSp())
		{
			spid="tw";
			return spid;
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
					spid="3k";
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
		_spid[pos] = spid;
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
		if(checkIsFB()){
			return true;
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
		if(PlatformManager.checkIsLocal()&&PlatformManager.checkIsPlatSp()==false)
		{
			platName="";
		}
		return platName;
	}

	export function checkIsPlatSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()&&App.TestUtil.getTestPlat()&&(window.location.hostname.indexOf("gt-test")>-1||PlatformManager.checkIsLocal()))
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
		if(PlatformManager.checkIsIOSShenheSp())
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

	export function checkIsFkylcSp():boolean
	{
		if(App.DeviceUtil.IsHtml5()||App.DeviceUtil.isRuntime2())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("fkylc")>-1||App.TestUtil.getTestPlat()=="fkylc";
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
		return getSpid()=="xly";
	} 

	export function checkIsXzySp():boolean
	{
		return getSpid()=="xzy";
	} 

	export function checkIsZjlySp():boolean
	{
		return getSpid()=="zjly";
	}

	export function checkIsEwanSp():boolean
	{
		return getSpid()=="ewan";
	}

	export function checkIs49ySp():boolean
	{
		return getSpid()=="49y";
	}
	export function checkIsSfSp():boolean
	{
		return getSpid()=="sf";
	}


	export function checkIsFkcwSp():boolean
	{
		return getSpid()=="fkcw";
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
		return getSpid()=="en" || App.CommonUtil.getOption("language")=="en";
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
			return  getSpidKey(true)=="en" || checkIsIdnSp() || checkIsFBEnSp();
		}
		return false;
	}

	export function checkIs9130Sp():boolean
	{
		return getSpid()=="9130";
	}

	export function checkIsCpsSp():boolean
	{
		return getSpid()=="cps";;
	}

	export function checkIsTySp():boolean
	{
		return getSpid()=="ty";
	}

	export function checkIsXlSp():boolean
	{
		return getSpid()=="xl";
	}

	export function checkIsJjSp():boolean
	{
		return getSpid()=="jj";
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
	export function checkIsMmSp():boolean
	{
		return getSpid()=="mm";
	}
	export function checkIsLmSp():boolean
	{
		if(App.DeviceUtil.isWyw())
		{
			return true;
		} else if(App.DeviceUtil.IsHtml5())
		{
			let pathname:string=window.location.pathname;
			return pathname.indexOf("_lm")>-1||pathname.indexOf("_testlm")>-1;
		}
		return false;
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

	export function checkIsXySp():boolean
	{
		return getSpid()=="xy";
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
			if(PlatformManager.checkIsFB())
			{
				if(App.CommonUtil.getOption("source")=="fbinstant-328119171335665"||App.CommonUtil.getOption("source")=="fbinstant-652787608466112")
				{
					result = true;
				}
			}
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
		return getSpid()=="tw" || App.CommonUtil.getOption("language")=="tw";
	}

	export function checkIsTWCNSp():boolean
	{
		return getSpid()=="twcn";
	}

	export function checkIsKRSp():boolean
	{
		return getSpid()=="kr"|| App.CommonUtil.getOption("language")=="kr";
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
		if(PlatformManager.getAppid() == "17004004" || PlatformManager.getAppid() == "17004007")
		{
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
			return window.location.pathname.indexOf("3k")>-1||App.TestUtil.getTestPlat()=="3k";
		}
		return false;
	}

	export function checkIs3KSubSp():boolean
	{
		return getAppid()=="17001001"||getAppid()=="17001186"||getAppid()=="17001187"||getAppid()=="17001185"||getSpName()=="h5ios3kwan"||getSpName()=="h5iosshiyiwan"||getSpName()=="h5iosyinhu";
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
		console.log("QAZ fkcw checkDesktop"+PlatformManager.checkDesktop());
		return PlatformManager.checkDesktop();
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
			if(checkIsLmSp()&&checkIsUseSDK())
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
		console.log("QAZ fkcw checkShare"+PlatformManager.checkShare());
		return PlatformManager.checkShare()==1 || PlatformManager.checkShare()==2 || PlatformManager.checkShare()==3 || PlatformManager.checkIsLocal();
		// return checkIsWanbaSp()||checkIsFkylcSp()||checkIsXzySp()||checkIsKRSp(); //|| (checkIsTWBSp() && checkIsWeiduan())
	}

	export function isSupportAttention():boolean
	{
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
			// qqwanbaplugin.shortcut({title:"极品大官人"},callback.bind(callbackThisObj));
			PlatformManager.requestDesktop({title:"江山美人",desc:""},callback,callbackThisObj);
		}
		// callback.apply(callbackThisObj);

	}

	export function sendCandy(num:string,callback:Function,callbackThisObj:any):void
	{
		//signin
		if(RSDKHelper.isInit)
		{
			qqwanbaplugin.sendCandy("signin",num,callback.bind(callbackThisObj));
		}
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
		LoginManager.inSDKAccountSwitching=true;
		if(RSDKHelper.isInit)
		{
			RSDKHelper.logout();
			if(PlatformManager.checkIsKRSp() && !PlatformManager.checkIsWanbaSp())
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

	function showClosePayTip():boolean
	{
		if(GameData.closePay)
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
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
		NetManager.request(NetRequestConst.REQUEST_PAY_CHECKPAY,{gemType:productId});
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
	}

	export function checkPayCallback(event:egret.Event):void
	{	
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_PAY_CHECKPAY,PlatformManager.checkPayCallback,PlatformManager);
		if(event.data&&event.data.ret==true && event.data.data.data.payflag)
		{
			pay(payType,payCallback,payCallbackThisObj);
		}
		else
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("checkPayTip"));
			App.MessageHelper.dispatchNetMessage(MessageConst.MESSAGE_MODEL_PAYMENT);
		}
		payCallback=payCallbackThisObj=null;
	}

	export function pay(productId: string, callback?: Function, callbackThisObj?: any):void
	{
		if(showClosePayTip())
		{
			return;
		}
		if(Api.switchVoApi.checkClosePaySys())
		{
			App.CommonUtil.showTip(LanguageManager.getlocal("closePaySysTip"));
		}
		if (App.DeviceUtil.isWXgame() && window["__WXGAME_OS__"] === "ios")
		{
			// 微信小游戏ios暂不开支付
			App.CommonUtil.showTip(LanguageManager.getlocal("wxgameIOSNotPayTip"));
		}
		else if(PlatformManager.checkIsUseSDK())
		{
			if(checkIsFB()){
				let FBInstant = window['FBInstant'];
				let op = FBInstant.getLocale();
				if (op == 'IOS'){
					App.CommonUtil.showTip(LanguageManager.getlocal("fbIOSNotPayTip"));
					return;
				}
			}
		
			if(RSDKHelper.isInit)
			{
				RSDKHelper.pay(productId,callback,callbackThisObj);
			}
		}
		else
		{
			if(PlatformManager.checkIsLocal())
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
		if(PlatformManager.checkIsLocal()||GameData.isTest())
		{
			let order_id:string=String(new Date().getTime()+Math.random()*99999999);
			NetManager.request(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT,{order_id:order_id,gold_num:itemCfg.gemCost,platform:"h5",name:itemCfg.id})
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
     * 港台cost2000统计
     */
	export function analyticsCost2000():void
	{
		console.log("analyticsCost2000");
		if(RSDKHelper.isInit)
		{
			RSDKHelper.analyticsCost2000();
		}
	}

	export function pushMsg(data:any):void
	{	
		if (RSDKHelper.isInit&&getIsWanbaSQ() == true) 
		{	
			let msg:string = LanguageManager.getlocal("wanbaPushMsg"+data.type);
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
			if(checkIsFBEnSp())
			{
				spName=GameData.fbTradeType;
			}
			else if(checkIsFBTwSp())
			{
				spName=GameData.fbTwTradeType;
			}
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
		if (checkIsTWBSp()||checkIsKRSp()||checkIsThSp()||checkIsRuSp()||checkIsEnLang()||checkIsFB()||checkIsEnSp()) {
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
     * 玩一玩检测是否显示红包按钮
     * 需要显示会回调，否则不回调
     */
    export function isUserInRedPackageActivity(checkResoultCallback:()=>void,callbackThisObj:any):void
    {
		if(RSDKHelper.isInit && !Api.switchVoApi.checkCloseWywRedMoney())
		{
			RSDKHelper.isUserInRedPackageActivity(checkResoultCallback,callbackThisObj);
		}
		else
		{

		}
	}

	/**
     * 玩一玩点红包
     */
    export function redPackageButtonEvent()
    {
		if(RSDKHelper.isInit)
		{
			RSDKHelper.redPackageButtonEvent();
		}
		else
		{

		}
	}

	/**
     * 和悦检测服务器状态，通过pid登录不检测服务器状态
     */
	export function heyueCheckServer(serverId:string):void
	{
		if(RSDKHelper.isInit)
		{
			if(LoginManager.loginBySetPID)
			{
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
			}
			else
			{
				if(PlatformManager.checkIsWeiduan())
				{
					PlatformManager.client.checkServerState(serverId);
				}
				else
				{
					RSDKHelper.heyueCheckServer(serverId);
				}
			}
		}
		else
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TWLOGIN);
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
						phpurl="http://192.168.8.82/gt_h5/getversion.php";
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

		},()=>{},PlatformManager.client);
		return '';
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
			if (RSDKHelper.isInit&&PlatformManager.checkIsWanbaSp() && App.DeviceUtil.isAndroid() && PlatformManager.getIsWanbaSQ() && Api.gameinfoVoApi.getDownType() === "nwd")
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
		/**这个条件是如果1000服地址并且不使用sdk会显示切换账号按钮 */
		if(PlatformManager.checkIsTest()&&PlatformManager.checkIsUseSDK()==false)
		{
			return false;
		}
		if(PlatformManager.checkIsPlatSp())
		{
			return false;
		}
		if(PlatformManager.checkIsLocal()&&PlatformManager.checkIsUseSDK()==false)
		{
			return false;
		}
		return (PlatformManager.checkIs11WanSp()||  
		PlatformManager.checkIs3kShenHaiSp() ||
		(PlatformCfg.closeSwitchAcount[PlatformManager.getSpid()]&&!PlatformManager.checkIsTest())||
		String(PlatformManager.getAppid())=="17001213")||
		String(PlatformManager.getBigAppid())=="17017000"||
		(String(PlatformManager.getBigAppid())=="17015000"&&String(PlatformManager.getAppid())!="17015009")||
		((PlatformManager.checkIsCpsSp()||String(PlatformManager.getBigAppid())=="17018000")&&String(PlatformManager.getAppid())!="17018004"&&String(PlatformManager.getAppid())!="17018005"&&String(PlatformManager.getAppid())!="17018006"&&String(PlatformManager.getAppid())!="17018007"&&String(PlatformManager.getAppid())!="17018008"&&String(PlatformManager.getAppid())!="17018009") ||
		PlatformManager.checkIsTySp()|| PlatformManager.checkIsXlSp()||
		PlatformManager.checkIs49ySp()|| PlatformManager.checkIsMmSp()||
		App.DeviceUtil.isWXgame()||PlatformManager.checkIsIdnSp()||
		App.DeviceUtil.isWyw()||checkIsFB();;
	}

	/** 是否有特殊关闭按钮（关闭按钮在左边，其实就是指的微信小游戏和qq玩一玩 */
	export function hasSpcialCloseBtn():boolean
	{
		return PlatformManager.checkIsFB() || App.DeviceUtil.isWXgame() || PlatformManager.checkIsLmSp() || App.DeviceUtil.isQQGame();
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

	/**
	 * 是否广点通用户
	 */
	export function checkIsGDTUser():boolean
	{
		if(Api.switchVoApi.checkOpenGDTStatistics())
		{
			if(PlatformManager.getFromQZonePet().indexOf("H5.APP.GDTML")>-1)
			{
				return true;
			}
		}
	}

	export function checkIsGDTAD1User():boolean
	{
		if(Api.switchVoApi.checkOpenGDTStatistics())
		{
			if(PlatformManager.getFromQZonePet().indexOf("H5.GDT.001")>-1)
			{
				return true;
			}
		}
	}

	export function checkIsGDTAD2User():boolean
	{
		if(Api.switchVoApi.checkOpenGDTStatistics())
		{
			if(PlatformManager.getFromQZonePet().indexOf("H5.GDT.002")>-1)
			{
				return true;
			}
		}
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

	export function checkIsHeYue():boolean
	{
		if(PlatformManager.checkIsUseSDK())
		{
			return (checkIsFB()||PlatformManager.checkIsEnSp()==true ||PlatformManager.checkIsIdnSp()==true || PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true || PlatformManager.getBigAppid() == "17004000")||
			(PlatformManager.checkIsThSp()||PlatformManager.checkIsRuSp()||Number(PlatformManager.getBigAppid())==17027000);
		}
	}

	//是否是fb平台
	export function checkIsFB(): boolean{
		let fb:boolean=false;
		if(App.DeviceUtil.IsHtml5())
		{
			if(window)
			{
				let checkFbUrl:boolean=false;
				let location = window.location;
				if(location.host.indexOf("262644120947598")>-1||location.host.indexOf("1523695954415165")>-1||location.host.indexOf("apps.fbsbx.com")>-1)
				{
					checkFbUrl=true;
				}
				fb = checkFbUrl || window['FBInstant'];
			}
		}
		return fb;
	}

	export function checkIsFBEnSp():boolean
	{
		if(checkIsFB())
		{
			let location = window.location;
			if(location.host.indexOf("262644120947598")>-1)
			{
				return true;
			}
		}
		return false;
	}

	export function checkIsFBTwSp():boolean
	{
		if(checkIsFB())
		{
			let location = window.location;
			if(location.host.indexOf("1523695954415165")>-1)
			{
				return true;
			}
		}
		return false;
	}

	export function showADS():void{
		if(checkIsFB() && Api.switchVoApi.checkFBADSOpen()){
			let t = null; 
			let e = window['FBInstant'];
			if (e) {
				var i = e.getSupportedAPIs();
				i.includes("getInterstitialAdAsync") && i.includes("getRewardedVideoAsync") && e.getInterstitialAdAsync("1693233550790460_1693235100790305").then(function(e) {
					return t = e,
					t.loadAsync()
				}).then(function() {
					t.showAsync().then(function() {
						console.log("Interstitial ad finished successfully")
					})["catch"](function(t) {
						console.error(t.message)
					})
				})["catch"](function(t) {
					console.log("Interstitial failed to preload: " + t.message)
				})
			}
		}
	}

	export function checkIsShenHeShowCard():boolean{
		if(PlatformManager.getAppid()== "17009011" || PlatformManager.getAppid()== "17009013" || PlatformManager.getAppid()== "17009014" || PlatformManager.getAppid()== "17004013" 
		|| PlatformManager.getSpName().indexOf("iosgnetop")>-1 || PlatformManager.checkIsEnSp() || PlatformManager.getAppid()== "17009018"|| PlatformManager.getAppid()== "17001213")
		{
			return true;
		}
		return false;
	}

	export function checkIsShenHeTaskShowCard():boolean{
		if(PlatformManager.getAppid()== "17009011" || PlatformManager.getAppid()== "17009013" || PlatformManager.getAppid()== "17009014" 
		|| PlatformManager.getSpName().indexOf("iosgnetop")>-1 || PlatformManager.getAppid()== "17009018"|| PlatformManager.getAppid()== "17001213")
		{
			return true;
		}
		return false;
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

	// 悦粤语包状态
	export function checkIsTWSoundType():number
	{	 
		if(PlatformManager.checkIsTWBSp()&&Api.switchVoApi.checkOpenVoice())
		{
			//1 纯粤语 
			if(PlatformManager.getAppid() == "17004015" || PlatformManager.getAppid() == "17004014" || PlatformManager.checkIsTest())
			{
				return 1;
			}
			else
			{
				return 2;
			}
		} 
		return 3;  
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
		return PlatformManager.getAppid() == "17027004" && PlatformManager.checkIsThSp();
	}

	/**
	 * 是否是英文的华为渠道
	 */
	export function checkIsEnHw():boolean
	{
		return PlatformManager.getAppid() == "1003005005" && PlatformManager.checkIsEnSp();
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
		if(PlatformManager.getAppid() == "17021003")
		{
			return false;
		}
		return (PlatformManager.checkIsXySp()==true || PlatformManager.checkIsTySp() == true || PlatformManager.checkIsXlSp() == true || PlatformManager.getAppid()=="17018010") && 
		PlatformManager.checkIsUseSDK()==true;
	}

	/**
	 * 检测是否需要检测补单处理
	 */
	export function checkNeedCheckPurchase():boolean
	{
		if (PlatformManager.checkIsUseSDK()&& PlatformManager.checkIsWeiduan()==true && App.DeviceUtil.isAndroid() && checkIsHeYue() )  //PlatformManager.checkIsTWBSp()==true || PlatformManager.checkIsTWShenheSp()==true || PlatformManager.checkIsEnSp()==true || PlatformManager.checkIsThSp()==true
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
		if(App.DeviceUtil.isIOS()&&PlatformManager.checkIsWeiduan())
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
				if(PlatformManager.checkIsLocal())
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
				if(PlatformManager.checkIsLocal())
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
					if(ViewController.getInstance().hideTopView()==false)
					{
						RSDKHelper.goAppExit();
					}
				},PlatformManager);
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
}