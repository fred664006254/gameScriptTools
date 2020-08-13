namespace LanguageManager
{
	let cnJson:Object=undefined;
	let cnTypeJson:Object={};

	function getStr(key:string):string
	{
		let str:string = null;
		if (cnJson[key])
		{
			str = cnJson[key];
		}
		else if (cnTypeJson[key])
		{
			str = cnTypeJson[key];
		}
		return str;
	}
	/**
	 * 检测是否存在key
	 * @param key 
	 */
	export function checkHasKey(key:string):boolean
	{
		if(cnJson[key])
		{
			return true
		}
		else if (cnTypeJson[key])
		{
			return true
		}
		return false;
	}

	/**
	 * 检测是否存在key
	 * @param key 
	 */
	export function checkHasFontProblem():void
	{	
		let allkey:string = "";
		for (let k in cnJson)
		{
			let str:string = cnJson[k];
			let replacestr1:string = "<font";
			let replacestr2:string = "</font>";
			let rl1:number = replacestr1.length;
			let rl2:number = replacestr2.length;
			let n1:number = (str.length - str.replace(replacestr1,"").length)/rl1;
			let n2:number = (str.length - str.replace(replacestr2,"").length)/rl2;
			if (n1 != n2)
			{
				allkey+= (k+" | ")
			}
		}
		console.log("QAZ cn "+allkey);

		allkey = "";
		for (let k in cnTypeJson)
		{
			let str:string = cnTypeJson[k];
			let replacestr1:string = "<font";
			let replacestr2:string = "</font>";
			let rl1:number = replacestr1.length;
			let rl2:number = replacestr2.length;
			let n1:number = (str.length - str.replace(replacestr1,"").length)/rl1;
			let n2:number = (str.length - str.replace(replacestr2,"").length)/rl2;
			if (n1 != n2)
			{
				allkey+= (k+" | ")
			}
		}
		console.log("QAZ cntype "+allkey);

	}

	export function getlocal(key:string,params?:string[],notUseBlueType?:boolean):string
	{
		let value:string; 
  
		let spid:string=PlatformManager.getSpid();
		if (PlatformManager.checkIsXlSp() && LanguageManager.checkHasKey(key + "_xianlaiType")) {
			value=getStr(key +  "_xianlaiType");
		} 
		else if (!notUseBlueType && Api.switchVoApi.checkIsInBlueWife()&& LanguageManager.checkHasKey(key + "_blueType")) {
			value=getStr[key +  "_blueType"];
		} 
		else if (PlatformManager.checkIsXySp() && LanguageManager.checkHasKey(key + "_xianyiType")) {
			value=getStr(key +  "_xianyiType");
		} 
		else if (PlatformManager.checkIs4399Sp() && LanguageManager.checkHasKey(key + "_4399Type")) {
			value=getStr(key +  "_4399Type");
		} else if (PlatformManager.checkIsZjlySp() && LanguageManager.checkHasKey(key + "_zjlyType")) {
			value=getStr(key +  "_zjlyType");
		}
		else if (PlatformManager.checkIsIOSShenheSp() && LanguageManager.checkHasKey(key + "_iosshenheType")) 
		{
			value=getStr(key +  "_iosshenheType");
		}
		else if(PlatformManager.checkisLocalPrice()&& (GameData.platMoneyData||GameData.platMoneyData2) && (LanguageManager.checkHasKey(key + "_"+spid+"hwType")||LanguageManager.checkHasKey(key + "_thhwType")))
		{
			let localKey=LanguageManager.checkHasKey(key + "_"+spid+"hwType")?key + "_"+spid+"hwType":key + "_thhwType";
			localKey=LanguageManager.checkHasKey(localKey)?localKey:key + "_hwType"
			value = getStr(localKey);
			if(PlatformCfg.hwpriceCfg.indexOf(key)<0)
			{
				params=Api.rechargeVoApi.formatThHwMoneyInfo(params);
			}
		}
		else if(Api.switchVoApi.checkOpenServantSkinAura()&& LanguageManager.checkHasKey(key + "_servantSkinTatterType"))
		{
			//门客碎片描述
			value=getStr(key +  "_servantSkinTatterType");
		}
		else 
		{
			let osStr:string=App.DeviceUtil.isIOS()?"IOS":(App.DeviceUtil.isAndroid()?"AND":"H5");
			let spid:string=PlatformManager.getSpid();
			if(PlatformManager.checkIsLocal()&&App.CommonUtil.getOption("language")&&ServerCfg.allHost[App.CommonUtil.getOption("language")])
			{
				spid = App.CommonUtil.getOption("language");
			}
			if(LanguageManager.checkHasKey(key + "_"+spid+osStr+"Type"))
			{
				value=getStr(key + "_"+spid+osStr+"Type");
			}
			else if(LanguageManager.checkHasKey(key + "_"+spid+"Type"))
			{
				value=getStr(key + "_"+spid+"Type");
			}
			else
			{
				value=getStr(key);
			}
		}

		if(Api.switchVoApi.checkOpenNewPrison() && LanguageManager.checkHasKey(key + "_laoyiType")) {
			value=getStr(key +  "_laoyiType");
		}
		if (Api.switchVoApi.checkCloseText() && LanguageManager.checkHasKey(key + "_hexieType")) {
			value=getStr(key +  "_hexieType");
		}
		if(Api.switchVoApi.checkCloseText2() && LanguageManager.checkHasKey(key + "_hexie2Type"))
		{
			value=getStr(key +  "_hexie2Type");
		}
		
		if(!notUseBlueType && Api.switchVoApi.checkIsInBlueWife()&& LanguageManager.checkHasKey(key + "_blueType")) {
			value=cnJson[key +  "_blueType"];
		} 


		if(value==undefined)
		{
			if(DEBUG)
			{
				return "缺少字段:"+key;
			}
			else
			{
				if(PlatformManager.checkIsLocal())
				{
					return "缺少字段:"+key;
				}
			}
			let reportData={cnkey:key};
			StatisticsHelper.reportOwnNameLog(JSON.stringify(reportData),"lostcnkey")
			return "**";
		}
		let ruler: RegExp = new RegExp("#.*#");
		while (value.search(ruler) != -1)
		{
			var startIdx = value.search(ruler);
			var strs = value.substring(startIdx + 1);
			var endIdx = strs.search("#");

			var firstStr = "";
			var endStr = "";
			if (startIdx >= 1)
			{
				firstStr = value.substring(0, startIdx);
			}
			if (endIdx < value.length && endIdx != -1)
			{
				endStr = value.substring(startIdx + endIdx + 2);
			}
			if (endIdx != -1)
			{
				var newKey = value.substring(startIdx + 1, startIdx + endIdx + 1);
				value = firstStr + getStr(newKey) + endStr;
			}
			else
			{
				value = firstStr + endStr
			}
			if(value.indexOf("#"+key+"#")>-1)
			{
				console.log("cn配置引用死循环:"+key+"，跳出");
				break;
			}
		}
		return App.StringUtil.formatLocalLanuageValue(value,params);
	}

	// export function loadJson(loadComplete:()=>void,loadCompleteTarget:any):void
	// {
	// 	App.LogUtil.log("startload cn");
	// 	let cnName:string;
	// 	if(RES.hasRes(PlatformManager.getSpid()))
	// 	{
	// 		cnName=PlatformManager.getSpid();
	// 	}
	// 	else
	// 	{
	// 		cnName="cn";
	// 	}
	// 	//test code 
	// 	// cnName="tw";
	// 	ResourceManager.loadItem(cnName,(data:any)=>{
	// 		App.LogUtil.log("loadcomplete cn");
	// 		cnJson=data;
	// 		if(loadComplete)
	// 		{
	// 			loadComplete.apply(loadCompleteTarget);
	// 		}
	// 	},this);
	// }
	
	export function setData(data:any):void
	{
		cnJson=data;
	}

	export function setTypeData(data:any):void
	{
		cnTypeJson=data;
	}

	

	let shareTextArr : string[] = [];
	export function setShareText(textArr : any) : void{
		if(textArr.ret){
			shareTextArr = [];
		}
		else{
			shareTextArr = [...textArr];
			let content = getShareDesc();
			window["shareTitle"]= content.title;
            window["shareDesc"]= content.desc;
		}
	}
	
	export function getShareDesc() : {title : string, desc : string, imageurl : string, shareId : string}{
		let str = null;
		let title = null;
		let desc = null;
		let imageurl = null;
		let shareId = null;
		if(shareTextArr && shareTextArr.length){
			let randid = Math.floor(Math.random() * shareTextArr.length);
			str = shareTextArr[randid];
			if(str){
				title = str[0];
				desc = str[1];
				shareId = str[2];
				// 以后做成gm配置的
				if (App.DeviceUtil.isWXgame() && !App.DeviceUtil.isQQGame()) {
					imageurl = "https://gt-fkwx-web001.raygame3.com/wxgameOtherPic/share_" + shareId + ".jpg";
				} else if (App.DeviceUtil.isWyw()) {
					imageurl = "https://gt-lm-web01.raygame3.com/wywOtherPic/share_" + randid + ".jpg";
				}else if(App.DeviceUtil.isQQGame()){
					imageurl = App.ResourceUtil.getResCfgByKey(`${shareId}_vx`).url;
				}
			}
		}
		else{
			if(App.DeviceUtil.isQQGame()){
				imageurl = App.ResourceUtil.getResCfgByKey(`${1}_vx`).url;
			}
		}
		return {title : title, desc : desc, imageurl : imageurl, shareId : shareId};
	}
}