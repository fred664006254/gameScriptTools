class AcBaseVoApi extends BaseVoApi
{
	private _acVoList:Object={};
	private _newAcVoList:Object={};


	//活动是否激活了某些激活条件 可用于活动解锁红颜
	private _activeUnlockMap: Object={}; //{[key: string]:number;};
	public constructor() 
	{
		super();
	}

	public formatData(data:any,checkCfg?:boolean):boolean
	{
		
		let needGetCfgAidArr:string[]=[];
		if(data.info)
		{
			let info=data.info;
			for(let key in info)
			{
				
				let aidAndVersionArr:string[]=key.split("-");
				let aid:string=aidAndVersionArr[0];
				if(Api.playerVoApi.getPlayerBuyGem()<=0 && Api.switchVoApi.checkOpenHideRechargeIcon())
				{
					if(
						aid=="dailyCharge"||
						aid=="totalRecharge"||
						aid=="totalDayRecharge"
					)
					{
						continue ;
					}
				}
				if(Api.switchVoApi.checkClosePay())
				{
					if(
						aid=="dailyCharge"||
						aid=="totalRecharge"||
						aid=="totalDayRecharge"||
						aid=="rechargeRebate"||
						aid=="discount"||
						aid=="dailyGift"||
						aid=="tigertrappass"||
						aid=="jade"||
						aid=="dailyActivity" ||
						aid=="icebreakingGift" ||
						aid=="surprisedgift" ||
						aid=="chargeReturnGem"
					)
					{
						continue ;
					}
					// if((Number(aidAndVersionArr[1])>18 &&aid=="rankActive" ) )
					// {
					// 	continue;
					// }
				}

				//屏蔽微信ICON
				if(PlatformManager.checkHideIconByIP())
				{
					// if(aid=="rankActive"||aid=="fourPeople"||aid=="limitedReward"||aid=="crossServerAtkRace"
					// ||aid=="crossServerIntimacy"||aid=="crossServerPower"||aid=="punish"||aid=="mayDay"||aid=="dragonBoatDay"
					// ||aid=="tailor"||aid=="springCelebrate"||aid=="midAutumn"||aid=="lottery"||aid=="beTheKing"||aid=="wipeBoss"
					// ||aid=="battleGround"||aid=="wifeBattleRank"||
					// 	aid=="oneYearOverview"
					// 	||aid == "rechargeBoxSP"
					// 	||aid == "ransackTraitorSP"
					// 	||aid == "lantern"
					// 	||aid == "oneYearRank"
					// 	||aid == "examAnswer"
					// 	||aid == "oneYearPack"
					// 	||aid == "arcade"
					// 	||aid == "newYear"
					// 	||aid == "stargazer"
					// 	||aid == "oneYearSign"
					// )
					if(Config.WxactiveshowCfg.isActivityInCfg(aid)){
					}else{
						continue;
					}
					
				}

				let v:string=aidAndVersionArr[1];
				let acList:Object=this._acVoList[aid];
				let newAcList:Object=this._newAcVoList[aid];
				if(this._acVoList[aid]==null)
				{
					acList={};
					this._acVoList[aid]=acList;
				}
				if(acList[v]==null)
				{
					let voClassName=App.StringUtil.firstCharToUper(aid);
					let voClass:any=egret.getDefinitionByName("Ac"+voClassName+"Vo");
					if(voClass)
					{
						let acVo:AcBaseVo=new voClass();
						acVo.initData(info[key]);
						acList[v]=acVo;
						
						if(this._newAcVoList[aid]==null)
						{
							newAcList={};
							this._newAcVoList[aid]=newAcList;
						}
						newAcList[v]=acVo;
					}
				}
				else
				{
					let isShow:boolean=acList[v].isShowIcon;
					acList[v].initData(info[key]);
					if(isShow==false&&acList[v].isShowIcon)
					{
						if(this._newAcVoList[aid]==null)
						{
							newAcList={};
							this._newAcVoList[aid]=newAcList;
						}
						newAcList[v]=acList[v];
					}

				}
				if(acList[v]&&!acList[v].config)
				{
					needGetCfgAidArr.push(key);
				}
			}
		}
		if(Config.AcCfg.isGetAll&&needGetCfgAidArr&&needGetCfgAidArr.length>0)
		{
			NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETACTIVECFG,{activeArr:needGetCfgAidArr});
			return false;
		}
		return true;
	}


	public formatDataStep2()
	{

	}
	//设置活动激活条件
	public setActiveUnlock(key: number){
		this._activeUnlockMap["needActive_"+key] = key;

	}
	//判断某个活动是否激活某些需要活动激活的条件
	public checkActiveIsUnlock(key: number): boolean
	{
		if(this._activeUnlockMap["needActive_"+ key]){
			return true;
		} else {
			return false;
		}
		
	}

	/**
	 * 根据活动aid判断该类活动是否需要显示红点
	 * @param aid 
	 */
	public checkShowRedDotByAid(aid:string,code:string):boolean
	{
		if(code)
		{
			let vo = this.getActivityVoByAidAndCode(aid,code);
			if(vo && vo.isStart && vo.isShowRedDot == true)
			{
				return true;
			}
		}
		else
		{
			let voDic = this._acVoList[aid];
			let voList:AcBaseVo[]=[];
			if(voDic)
			{
				for(let code in voDic)
				{
					let vo:AcBaseVo=voDic[code];
					if(vo&&vo.isStart&&vo.isShowRedDot == true)
					{
						return true;
					}
				}
			}
		}
		return false;
	}

	public checkActivityStartByAid(aid:string,code?:string):boolean
	{
		let result:boolean=false;
		if(code)
		{
			let vo:AcBaseVo = this.getActivityVoByAidAndCode(aid,code);
			result=vo?vo.isStart:false;
		}
		else
		{
			let voList:AcBaseVo[]=this.getActivityVoListByAid(aid);
			if(voList)
			{
				let l:number=voList.length;
				for(let i:number=0;i<l;i++)
				{
					if(voList[i]&&voList[i].isStart)
					{
						result=true;
						break;
					}
				}
			}
		}
		return result;
	}

	public getRanActives():AcBaseVo[]

	{
		let actives:AcBaseVo[]=[];
		for(let aid in this._acVoList)
		{
			let voDic:any=this._acVoList[aid];
			if(voDic)
			{
				for(let code in voDic)
				{
					let vo:AcBaseVo=voDic[code];
					if(vo&&vo.isStart)
					{
						if(aid=="rankActive"&&vo.atype != "11")
						{
							actives.push(vo);
						}	
					}
				}
			}
		}
		
		return actives;
	}
	//得到帮派活动icon
	public getAllianceActivityIcons():BaseDisplayObjectContainer[]
	{
	
		let icons:BaseDisplayObjectContainer[]=[];
		let allianceIconList= {
			allianceRecharge :true
		};
		let iconKeyDic:Object={};
/*
			{
				let voDic:Object=this._acVoList[aid];
				if(voDic)
				{
					for(let code in voDic)
					{
						let vo:AcBaseVo=voDic[code];
						if(vo&&vo.isStart)
						{
							let lowerAid:string=aid.toLowerCase();


							if(vo.atype){
								icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
							}
							else{
								icons.push(this.createActivityicon(aid,Number(code)));
							}
							
						}
					}
				}
			}
*/
		for(let aid in this._acVoList)
		{


			if(!allianceIconList[aid]){
				continue;
			}
			let iconUrl: string;
			let iconNameStr: string;

			let voDic:Object=this._acVoList[aid];
	
			if(voDic && this.checkActivityStartByAid(aid)){
				for(let code in voDic)
				{
					let vo: AcBaseVo = voDic[code];
					if(vo && vo.isStart)
					{
						let lowerAid:string = aid.toLowerCase();
						icons.push(this.createActivityicon(aid,Number(code)));
					}
				}
			}
		}
			/*

			let iconCfgName: string = Config.IconorderCfg.getIconNameByName(aid);
			let isHasChildCfg:boolean=Config.IconorderCfg.checkHasChildCfgNameByName(aid);
			if(iconCfgName||isHasChildCfg)
			{
				if(this.checkActivityStartByAid(aid))
				{
					if(isHasChildCfg)
					{
						let voDic:Object=this._acVoList[aid];
						if(voDic)
						{
							for(let code in voDic)
							{
								let vo:AcBaseVo=voDic[code];
								if(vo&&vo.isStart&&vo.atype)
								{
									let iconCfg:Config.IconOrderItemCfg=Config.IconorderCfg.getIconCfgByAidAndType(aid,vo.atype);
									if(iconCfg)
									{
										if(iconCfg.icon)
										{
											if(!iconKeyDic[iconCfg.icon])
											{
												icons.push(this.createActivityicon(iconCfg.icon,null,vo.atype));
												iconKeyDic[iconCfg.icon]=iconCfg.icon;
											}
										}
										else
										{
											if(vo.atype){
												icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
											}
											else{
												icons.push(this.createActivityicon(aid,Number(code)));
											}
										}
									}
									else
									{
										if(iconCfgName)
										{
											if(!iconKeyDic[iconCfgName])
											{
												icons.push(this.createActivityicon(iconCfgName,null));
												iconKeyDic[iconCfgName]=iconCfgName;
											}
										}
									}	
								}
								else
								{
									if(iconCfgName)
									{
										if(!iconKeyDic[iconCfgName])
										{
											icons.push(this.createActivityicon(iconCfgName,null));
											iconKeyDic[iconCfgName]=iconCfgName;
										}
									}
								}
							}
						}
					}
					else if(iconCfgName)
					{
						if(!iconKeyDic[iconCfgName])
						{
							icons.push(this.createActivityicon(iconCfgName,null));
							iconKeyDic[iconCfgName]=iconCfgName;
						}
					}
				}
			}
		}
		*/
		icons.sort((a:BaseDisplayObjectContainer,b:BaseDisplayObjectContainer)=>{

			let sortIdA=Config.IconorderCfg.getIconSortIdByCfgName(a.name);
			let sortIdB=Config.IconorderCfg.getIconSortIdByCfgName(b.name);
			return sortIdA-sortIdB;
		});

		return icons;

	}
	//判断是否双十一元宝狂欢
	public isSingleDayOverviewActivity(aid:string,code:number|string)
	{
		let vo:AcSingleDayOverviewVo = <AcSingleDayOverviewVo>this.getActivityVoByAidAndCode("singleDayOverview");
		if(!vo){
			return false;
		}
		let Overview = vo.config.Overview;
		for (var index = 0; index < Overview.length; index++) {
			let element = Overview[index];
			if(element.aid == aid &&  ""+element.code == ""+code){
				return true;
			}
		}
		return false;
	}
	//判断是否赚速冲榜屏蔽小icon活动,rankactive本身在mainUi.ts里面checkIsLeftIcon方法屏蔽
	public isRankActive90ShieldIconActivity(aid:string,code:number|string)
	{
		if(aid == "fourPeople"){
			let rankActiveList=this._acVoList[AcConst.AID_RANKACTIVE];
			if(rankActiveList)
			{
				for(let racode in rankActiveList)
				{
					if(rankActiveList.hasOwnProperty(racode))
					{
						let vo=<AcBaseVo>rankActiveList[racode];
						if(vo&&vo.atype=="90")
						{
							if((vo.st <= GameData.serverTime) && (vo.et > (GameData.serverTime - 86400))){
								return true;
							}
						}
					}
				}
			}
		}

		return false;
	}
	//判断是否是周年庆活动
	public isOneYearActivity(aid:string,code:number|string)
	{
		let vo:AcOneYearOverviewVo = <AcOneYearOverviewVo>this.getActivityVoByAidAndCode("oneYearOverview");
		if(!vo){
			return false;
		}
		let Overview = vo.config.Overview;
		for (var index = 0; index < Overview.length; index++) {
			let element = Overview[index];
			if(element.aid == aid &&  ""+element.code == ""+code){
				return true;
			}
		}
		return false;
	}
	//判断是否是没有icon的活动
	public isNoIconActivity(aid:string,code:number|string)
	{
		// let vo:AcDailyChargeExtraVo = <AcDailyChargeExtraVo>this.getActivityVoByAidAndCode("dailyChargeExtra");
		// if(!vo){
		// 	return false;
		// }
		
		switch (aid) {
			case "dailyChargeExtra":
			case "jurakudai":
				return true;
			default:
				return false;
		}
	}

	public getAllActivityIcons():BaseDisplayObjectContainer[]
	{	
		let icons:BaseDisplayObjectContainer[]=[];


		let rechargerewardicon:string=null;
		//疯狂系列活动的图标
		let carnivalRewardIcon:string = null; 
		let iconKeyDic:Object={};
	
		for(let aid in this._newAcVoList)
		{		
			let iconUrl:string;
			let iconNameStr:string;
			let iconCfgName:string=Config.IconorderCfg.getIconNameByName(aid);
			let isHasChildCfg:boolean=Config.IconorderCfg.checkHasChildCfgNameByName(aid);
			if(iconCfgName||isHasChildCfg)
			{
				if(this.checkActivityStartByAid(aid))
				{
					if(isHasChildCfg)
					{
						let voDic:Object=this._acVoList[aid];
						if(voDic)
						{
							for(let code in voDic)
							{
								let vo:AcBaseVo=voDic[code];
								if(this.isOneYearActivity(aid,code)){
									continue;
								}
								if(this.isSingleDayOverviewActivity(aid,code)){
									continue;
								}
								if(this.isNoIconActivity(aid,code)){
									continue;
								}
								// if(this.isRankActive90ShieldIconActivity(aid,code)){
								// 	continue;
								// }
								
								if(vo&&vo.isStart&&vo.atype)
								{
									let iconCfg:Config.IconOrderItemCfg=Config.IconorderCfg.getIconCfgByAidAndType(aid,vo.atype);
									if(iconCfg)
									{
										if(iconCfg.icon)
										{
											if(!iconKeyDic[iconCfg.icon])
											{
												icons.push(this.createActivityicon(iconCfg.icon,null,vo.atype));
												iconKeyDic[iconCfg.icon]=iconCfg.icon;
											}
										}
										else
										{
											if(vo.atype){
												icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
											}
											else{
												icons.push(this.createActivityicon(aid,Number(code)));
											}
										}
									}
									else
									{
										if(iconCfgName)
										{
											if(!iconKeyDic[iconCfgName])
											{
												icons.push(this.createActivityicon(iconCfgName,null));
												iconKeyDic[iconCfgName]=iconCfgName;
											}
										}
									}
									
								}
								else
								{
									if(iconCfgName)
									{
										if(!iconKeyDic[iconCfgName])
										{
											icons.push(this.createActivityicon(iconCfgName,null));
											iconKeyDic[iconCfgName]=iconCfgName;
										}
									}
								}
							}
						}
					}
					else if(iconCfgName)
					{
						if(!iconKeyDic[iconCfgName])
						{

								icons.push(this.createActivityicon(iconCfgName,null));
								iconKeyDic[iconCfgName]=iconCfgName;
							
						}
					}
				}
			}
			// if(aid=="limitedReward"&&this.checkActivityStartByAid(aid))
			// {
			// 	icons.push(this.createActivityicon(aid,null));
			// }
			// else if(aid=="dailyCharge"||aid=="totalDayRecharge"||aid=="totalRecharge")
			// {
			// 	if(rechargerewardicon==null&&this.checkActivityStartByAid(aid))
			// 	{
			// 		rechargerewardicon="recharge";
			// 		icons.push(this.createActivityicon(rechargerewardicon,null));
			// 	}

			// }
			// else if (aid == "carnivalCharge" || aid == "carnivalCost")
			// {
			// 	if (carnivalRewardIcon == null && this.checkActivityStartByAid(aid))
			// 	{
			// 		carnivalRewardIcon = "carnival";
			// 		icons.push(this.createActivityicon(carnivalRewardIcon,null));
			// 	}


			// }
			// else if(aid=="discount"&&this.checkActivityStartByAid(aid))
			// {
			// 	icons.push(this.createActivityicon(aid,null));
			// }
			else
			{
				let voDic:Object=this._acVoList[aid];
				if(voDic)
				{
					for(let code in voDic)
					{
						if(this.isOneYearActivity(aid,code)){
							continue;
						}
						if(this.isNoIconActivity(aid,code)){
							continue;
						}
						if(this.isSingleDayOverviewActivity(aid,code)){
							continue;
						}
						// if(this.isRankActive90ShieldIconActivity(aid,code)){
						// 	continue;
						// }
						let vo:AcBaseVo=voDic[code];
						if(vo&&vo.isStart)
						{
							let lowerAid:string=aid.toLowerCase();

							// if(aid=="rankActive"&&vo.atype != "11")
							// {
							// 	continue;
							// }
							if(vo.atype){
								icons.push(this.createActivityicon(aid,Number(code),Number(vo.atype)));
							}
							else{
								icons.push(this.createActivityicon(aid,Number(code)));
							}
							
						}
					}
				}
			}
		}
		this._newAcVoList = {};
		icons.sort((a:BaseDisplayObjectContainer,b:BaseDisplayObjectContainer)=>{
			// let names:string[]=[a.name,b.name];
			// names.sort();
			// if(a.name==names[0])
			// {
			// 	return -1;
			// }
			// else
			// {
			// 	return 1;
			// }
			let sortIdA=Config.IconorderCfg.getIconSortIdByCfgName(a.name);
			let sortIdB=Config.IconorderCfg.getIconSortIdByCfgName(b.name);
			return sortIdA-sortIdB;
		});
		return icons;
	}

	private createActivityicon(aid:string,code:number,type?:number|string):BaseDisplayObjectContainer
	{	
		let atype:number|string=type;
		let nameCode = code;
		if(!type){
			type = code;
		}
	
		let isShow = false;
		if(aid=="recharge"
				|| aid == "firstrecharge"
				|| aid == "discount"
				
			){
				isShow = true;
		} 
		else
		{
			isShow=Config.IconorderCfg.getisFlickByName(aid,atype);
		}
		let iconCfgBgValue:number = Config.IconorderCfg.getIconBgByAidAndType(aid,atype);
		let lowerAid:string=aid.toLowerCase();

		let typeIconKey:string="ac_"+lowerAid+"-"+type;
		let iconKey:string=ResourceManager.hasRes(typeIconKey+"_icon")?typeIconKey+"_icon":"ac_"+lowerAid+"-1"+"_icon";
		let iconUrl=code?iconKey:"ac_"+lowerAid+"_icon";

		let nameKey:string=ResourceManager.hasRes(typeIconKey+"_name")?typeIconKey+"_name":"ac_"+lowerAid+"-1"+"_name";
		let iconNameStr=code?nameKey:"ac_"+lowerAid+"_name";
		//特殊处理  奸臣冲榜
		if(type==11&&code==28||code==29)
		{
			iconUrl = "ac_rankactive-"+type+"_"+code+"_icon";
			iconNameStr= "ac_rankactive-"+type+"_"+code+"_name";
		}
		let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(iconUrl,iconNameStr,isShow,iconCfgBgValue);
		iconContainer.name=nameCode?aid+"-"+nameCode:aid;
		iconContainer.bindData={aid:aid,code:code};
		iconContainer.addTouchTap((event:egret.TouchEvent,aid:string,code:number,atype:number|string)=>{
			//引导过程种不响应
			if(Api.rookieVoApi.isGuiding){
				return;
			}
			let viewClassName:string = "Ac"+App.StringUtil.firstCharToUper(aid)+"View";
			if (aid == "crossServerAtkRace")
			{
				viewClassName = ViewConst.COMMON.ATKRACECROSSSUMMARYVIEW;
			}
			if(aid=="rankActive"&&Number(atype)!=11)
			{
				if(egret.getDefinitionByName(viewClassName.replace("Ac","")))
				{
					viewClassName=App.StringUtil.firstCharToUper(viewClassName.replace("Ac",""));
				}
			}
			ViewController.getInstance().openView(viewClassName,code);
		},this,[aid,code,atype]);
		return iconContainer;
	}

	public getActivityVoListByAid(aid:string):AcBaseVo[]
	{
		let voDic = this._acVoList[aid];
		let voList:AcBaseVo[]=[];
		if(voDic)
		{
			for(let code in voDic)
			{
				voList.push(voDic[code]);
			}
		}
		return voList;
	}

	public getActivityVoByAidAndCode(aid:string,code?:string):AcBaseVo
	{
		let voDic=this._acVoList[aid];
		if(!voDic)
		{
			return null;
		}
		if(aid.indexOf("-")>-1)
		{
			if(!code)
			{
				code=aid.split("-")[1];
			}
			aid=aid.split("-")[0];
		}
		let vo:AcBaseVo;
		if(code)
		{
			vo=voDic[code];
		}
		else
		{
			for(let code in voDic)
			{
				vo=voDic[code]
			}
		}
		return vo;
	}
	/**
	 * 检测是否开启终生卡打折活动
	 */
	public checkIsYearCardDiscount():AcBaseVo
	{
		let vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT,"2");
		if(vo&&vo.isStart)
		{
			return vo;
		}
		else
		{
			return null;
		}
	}
	/**
	 * 检测是否开启月卡打折活动
	 */
	public checkIsMonthCardDiscount():AcBaseVo
	{
		let vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT,"3");
		if(vo&&vo.isStart)
		{
			return vo;
		}
		else
		{
			return null;
		}
	}

	public checkIsHasNewAc():boolean
	{
		return Object.keys(this._newAcVoList).length>0;
	}

	/**
	 * 是否存在这个类型的活动 返回一个vo 。处理展示期
	 */
	public checkActivityStartByAidAndType(aid:string,type:string):AcBaseVo
	{
		let voList:AcBaseVo[]=this.getActivityVoListByAid(aid);
		if(voList)
		{
			let l:number=voList.length;
			for(let i:number=0;i<l;i++)
			{
				if(voList[i]&&voList[i].isStart&&voList[i].atype == type)
				{
					return voList[i];	
				}
			}
		}	
		return null;
	}
	
	public dispose():void
	{
		this._acVoList={};
		this._newAcVoList={};
		super.dispose();
	}
}