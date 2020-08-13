namespace LanguageManager
{
	let cnJson:Object=undefined;

	/**
	 * 检测是否存在key
	 * @param key 
	 */
	export function checkHasKey(key:string):boolean
	{
		let value:string=cnJson[key];
		if(value)
		{
			return true
		}
		return false;
	}
	/**
	 * notUseBlueType  true--> 不走blueType  
	 */
	export function getlocal(key:string,params?:string[],notUseBlueType?:boolean):string
	{
		let value:string;  
		
		// if(Api.switchVoApi.checkOpenNewPrison()){
		// 	if(LanguageManager.checkHasKey(key + "_laoyiType")){
		// 		value=cnJson[key +  "_laoyiType"]; 
		// 	}
		// 	else{
		// 		if(Api.switchVoApi.checkCloseText())
		// 		{
		// 			if(LanguageManager.checkHasKey(key + "_hexieType"))
		// 			{
		// 				value=cnJson[key +  "_hexieType"];
		// 			}
		// 			else
		// 			{
		// 				value=cnJson[key];
		// 			} 
		// 		}
		// 		else
		// 		{
		// 			value=cnJson[key];
		// 		}
		// 	}	
		// }
		// else{
		// 	if(Api.switchVoApi.checkCloseText()){
		// 		if(LanguageManager.checkHasKey(key + "_hexieType")){
		// 			value=cnJson[key +  "_hexieType"];
		// 		}
		// 		else{
		// 			value=cnJson[key];
		// 		}
				
		// 	}else{
		// 		value=cnJson[key];
		// 	}
		// }
		if(Api.switchVoApi.checkOpenNewPrison() && LanguageManager.checkHasKey(key + "_laoyiType")) {
			value=cnJson[key +  "_laoyiType"]; 

		} 
		else if (!notUseBlueType && Api.switchVoApi.checkOpenBuleWife()&&Api.gameinfoVoApi.getSexswitch()==1&& LanguageManager.checkHasKey(key + "_blueType")) {
			value=cnJson[key +  "_blueType"];
		} 
		else if(Api.switchVoApi.checkCloseText2() && LanguageManager.checkHasKey(key + "_hexie2Type"))
		{
			value=cnJson[key +  "_hexie2Type"];
		} else if (Api.switchVoApi.checkCloseText() && LanguageManager.checkHasKey(key + "_hexieType")) {
			value=cnJson[key +  "_hexieType"];
		}
		else if (PlatformManager.checkIsWxSp()&& LanguageManager.checkHasKey(key + "_wxType")) {
			value=cnJson[key +  "_wxType"];
		} 
		else if (PlatformManager.checkIsWxmgSp()&& LanguageManager.checkHasKey(key + "_wxType")) {
			value=cnJson[key +  "_wxType"];
		}  
		else if (PlatformManager.checkIsWanbaSp()&& LanguageManager.checkHasKey(key + "_wxType")) {
			value=cnJson[key +  "_wxType"];
		}  
		else if (PlatformManager.checkIsQQXYXSp()&& LanguageManager.checkHasKey(key + "_wxType")) {
			value=cnJson[key +  "_wxType"];
		}  
		else if (Api.switchVoApi.checkClosePay()&& LanguageManager.checkHasKey(key + "_wxZhifu")) {
			value=cnJson[key +  "_wxZhifu"];
		} 
		else if (PlatformManager.checkHideIconByIP()&& LanguageManager.checkHasKey(key + "_wxZhifu")) {
			value=cnJson[key +  "_wxZhifu"];
		} 
		else if (Api.switchVoApi.checkOpenWxHexiePic()&& LanguageManager.checkHasKey(key + "_wxShenhefu")) {
			value=cnJson[key +  "_wxShenhefu"];
		} 
		else if(Api.switchVoApi.checkShenheClosePay() && LanguageManager.checkHasKey(key + "_37shType"))
		{
			value=cnJson[key +  "_37shType"];
		} 
		else if(PlatformManager.checkIsNewWdSp() && LanguageManager.checkHasKey(key + "_newwd"))
		{
			value=cnJson[key +  "_newwd"];
		} 
		else if(PlatformManager.checkIsNewHopeSp() && LanguageManager.checkHasKey(key + "_newhope"))
		{
			value=cnJson[key +  "_newhope"];
		}
		
		// else if (PlatformManager.checkIsWdSp()&& LanguageManager.checkHasKey(key + "_wdType")) {
		// 	value=cnJson[key +  "_wdType"];
		// }
		else 
		{
			let osStr:string=App.DeviceUtil.isIOS()?"IOS":(App.DeviceUtil.isAndroid()?"AND":"H5");
			let spid:string=PlatformManager.getSpid();
			if(LanguageManager.checkHasKey(key + "_"+spid+osStr+"Type"))
			{
				value=cnJson[key + "_"+spid+osStr+"Type"];
			}
			else if(LanguageManager.checkHasKey(key + "_"+spid+"Type"))
			{
				value=cnJson[key + "_"+spid+"Type"];
			}
			else
			{
				value=cnJson[key];
			}
		} 

		if(value==undefined)
		{
			if(DEBUG)
			{
				return "缺少字段:"+key;
			}
			else
			{
				if(GameData.isLocal())
				{
					return "缺少字段:"+key;
				}
			}
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
				value = firstStr + cnJson[newKey] + endStr;
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

	export function loadJson(loadComplete:()=>void,loadCompleteTarget:any):void
	{
		App.LogUtil.log("startload cn");
		let cnName:string;
		if(RES.hasRes(PlatformManager.getSpid()))
		{
			cnName=PlatformManager.getSpid();
		}
		else
		{
			cnName="cn";
		}
		//test code 
		// cnName="tw";
		ResourceManager.loadItem(cnName,(data:any)=>{
			App.LogUtil.log("loadcomplete cn");
			cnJson=data;
			if(loadComplete)
			{
				loadComplete.apply(loadCompleteTarget);
			}
		},this);
	}
	
	export function setData(data:any):void
	{
		cnJson=data;
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
				if (App.DeviceUtil.isWXgame()) {
					imageurl = "https://gt-fkwx.leishenhuyu.com/wxgameOtherPic2/share" + randid + ".jpg";
				} else if (App.DeviceUtil.isWyw()) {
					imageurl = "https://gt-lm-web01.raygame3.com/wywOtherPic/share" + randid + ".jpg";
				}
			}
		}
		return {title : title, desc : desc, imageurl : imageurl, shareId : shareId};
	}
}