namespace LangMger
{
	let cnJson:Object=undefined;
	let cnTypeJson:Object={};

	function getStr(key:string):string
	{
		key=checkKey(key);
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

	function checkKey(key:string):string
	{
		let addStr="";
		if(Api.SwitchVoApi.checkWxShenhe())
		{
			addStr="_sh";
		}
		if(checkHasKey(key+addStr))
		{
			key=key+addStr;
		}
		return key;
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
		let value:string=getStr(key);

		if(value==undefined)
		{
			if(DEBUG)
			{
				return "缺少字段:"+key;
			}
			else
			{
				if(PlatMgr.checkIsLocal())
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
		return App.StringUtil.formatLocalLanuageValue(value, params);
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