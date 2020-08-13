namespace Config
{
	export namespace ShieldCfg 
	{
		/** 需要检测是否告警统计的json数据缓存 */
		let shieldReportData:string[]=null;
		let cIndex:number=0;
		export function getCfg():string[]
		{
			return  GameData.getLanguageRes("shield_");
		}

		function getNameCfg():string[]
		{
			return GameData.getLanguageRes("shieldname_");
		}

		export function checkShield(str:string,showTip:boolean = true):boolean
		{
			let shieldCfg=getCfg();
			if(shieldCfg&&str)
			{
				if(shieldCfg.indexOf(str)>-1||shieldCfg.indexOf(str.replace(/\s/g,""))>-1)
				{	
					if (showTip)
					{
						App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
					}
					
					return false;
				}
				else
				{
					let shieldnameCfg=getNameCfg();
					if(shieldnameCfg)
					{
						let l:number=shieldnameCfg.length;
						for(let i:number=0;i<l;i++)
						{
							if(checkByRegExp(str.toLowerCase(),shieldnameCfg[i].toLowerCase())==false)
							{	
								if (showTip)
								{
									App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
								}
								
								return false;
							}
						}
					}
					let l:number=shieldCfg.length;
					for(let i:number=0;i<l;i++)
					{
						if(str.toLowerCase().indexOf(shieldCfg[i].toLowerCase())>-1)
						{
							if (showTip)
							{
								App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
							}
							return false;
						}
					}
				}
			}
			return true;
		}

		function checkByRegExp(str:string,cfgStr:string):boolean
		{
			let reg:RegExp = new RegExp(cfgStr);
			if(str.replace(reg,"*")!=str)
			{
				return false;
			}
			return true;
		}

		export function checkOnlyShield(str:string):boolean
		{
			let shieldCfg=getCfg();
			/**
			 * 空字符
			 */
			if (str.replace(/\s/g,"").length == 0)
			{
				return true;
			}
			if(shieldCfg&&str&&shieldCfg.indexOf(str)>-1)
			{
				App.CommonUtil.showTip(LanguageManager.getlocal("guideCreateUserError3"));
				return false;
			}
			return true;
		}

		let queueShieldReportList:string[]=[];

		/**
		 * 检测聊天内容是否需要告警
		 * 
		 * @param chatStr 聊天内容
		 * @param callback 回调结果
		 * @param callbackObj 回调对象
		 */
		export function checkShieldReport(chatStr:string):void
		{
			queueShieldReportList.push(chatStr);
			if(shieldReportData)
			{
				cIndex==0&&checkShildReportStr();
			}
			else
			{
				if(PlatformManager.checkIsTWBSp())
				{
					shieldReportData=["代.*充","代.*儲","代.*除","退.*款","退.*費","l.*i.*n.*e","w.*e.*c.*h.*a.*t","微.*信","加.*賴","仙.*俠","有.*賴.*嗎","剛.*玩","官.*老.*爺"];
				}
				else if(PlatformManager.checkIsThSp() || PlatformManager.checkIsEnLang())
				{
					shieldReportData=["refund", "reimburse", "reimbursement", "money back", "rebate", "draw back", "drawback", "draw-back", "money-back"];
				}

				if(shieldReportData)
				{
					checkShildReportStr();
				}
				// ResourceManager.loadItem("shieldname_cn",(value:any,key:string)=>{
				// 	shieldReportData=value;
				// 	checkShildReportStr();
				// },ShieldCfg);
			}
		}
		function checkShildReportStr():void
		{
			GameConfig.stage.removeEventListener(egret.Event.ENTER_FRAME,checkShildReportStr,ShieldCfg);
			if(shieldReportData)
			{
				let l:number=shieldReportData.length;
				let startTime=egret.getTimer();
				console.log("start:"+cIndex);
				for(cIndex;cIndex<l;cIndex++)
				{
					if(checkByRegExp(queueShieldReportList[0].toLowerCase(),shieldReportData[cIndex].toLowerCase())==false)
					{
						cIndex=0;
						let chatStr:string = queueShieldReportList.shift();
						return StatisticsHelper.reportShieldChat(chatStr,shieldReportData[cIndex]);
					}
					if(egret.getTimer()-startTime>30)
					{
						console.log("timeout:"+cIndex);
						GameConfig.stage.addEventListener(egret.Event.ENTER_FRAME,checkShildReportStr,ShieldCfg);
						return;
					}
				}
				queueShieldReportList.shift();
				cIndex=0;
			}
		}
	}
}