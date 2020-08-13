class AcBaseVoApi extends BaseVoApi
{
	private _acVoList:Object={};
	private _newAcVoList:Object={};
	private _notShowAcVoList:Object={};
	private _dailyChargeCode:number = 0;

	//活动是否激活了某些激活条件 可用于活动解锁红颜
	private _activeUnlockMap: Object={}; //{[key: string]:number;};

	/**
	 * 活动组的列表
	 */
	private _acGroupList:{[icon:string]:AcGroupBaseVo}={};

	public needAloneGetCfgList:string[] = []

	public constructor() 
	{
		super();
	}

	public isHandled_BI:boolean = false;
	public isHandled_LRP:boolean = false;
	public isHandled_ILI:boolean = false;

	public formatData(data:any,checkCfg?:boolean):boolean
	{
		this.isHandled_BI = false;
		this.isHandled_LRP = false;
		this.isHandled_ILI = false;

		let needGetCfgAidArr:string[]=[];
		if(data.info)
		{
			let info=data.info;
			let groupIconArr:string[]=[];
			for(let key in info)
			{
				let aidAndVersionArr:string[]=key.split("-");
				let aid:string=aidAndVersionArr[0];
				if(this.checkShowAcIconByCfg(aid)==false)
				{
					continue;
				}
				if(Api.switchVoApi.checkNewDailyBoss()&&aid=="limitedReward"&&info[key].atype==21)
				{
					continue;
				}
				let v:string=aidAndVersionArr[1];
				let acList:Object=this._acVoList[aid];
				let newAcList:Object=this._newAcVoList[aid];
				//v 指的就是code，最原始的时候写的。。
				if(Config.IconorderCfg.checkAcInGroup(aid,v))
				{
					let icon:string=Config.IconorderCfg.getIconNameByName(aid,v);
					if(groupIconArr.indexOf(icon)<0)
					{
						groupIconArr.push(icon);
					}
				}
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
						let isShow:boolean = acVo.isShowIcon;
						if (!isShow && acVo.isStart){
							let notShowList = this._notShowAcVoList[aid];
							if (this._notShowAcVoList[aid] == null){
								notShowList = {};
								this._notShowAcVoList[aid] = notShowList;
							}
							notShowList[v] = acVo;
						}
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
					else{
						if (!acList[v].isShowIcon && acList[v].isStart){
							let notShowList = this._notShowAcVoList[aid];
							if (this._notShowAcVoList[aid] == null){
								notShowList = {};
								this._notShowAcVoList[aid] = notShowList;
							}
							notShowList[v] = acList[v];
						}
					}
				}
				if(acList[v]&&!acList[v].config)
				{
					needGetCfgAidArr.push(key);
					if (Config.AcCfg.getIfAloneNeedGetCfg(aid))
					{
						if (this.needAloneGetCfgList.indexOf(key) == -1)
						{
							this.needAloneGetCfgList.push(key);
						}
					}
				}
			}
			let iconL:number=groupIconArr.length;
			for(let i:number=0;i<iconL;i++)
			{
				let icon:string = groupIconArr[i];
				if(!this._acGroupList[icon])
				{
					let voClassName=App.StringUtil.firstCharToUper(icon);
					let voClass:any=egret.getDefinitionByName("AcGroup"+voClassName+"Vo");
					if(voClass)
					{
						let acVo:AcGroupBaseVo=new voClass();
						acVo.initData({aid:icon});
						this._acGroupList[icon]=acVo;
					}
				}
				else
				{
					this._acGroupList[icon].initData({aid:icon});
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
			let config = Config.AcCfg.getCfgByActivityIdAndCode(aid,code);
			if(config && vo && vo.isStart && vo.isShowRedDot == true)
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
					let config = Config.AcCfg.getCfgByActivityIdAndCode(aid,code);
					if( (config || aid == "limitedReward") && vo&&vo.isStart&&vo.isShowRedDot == true)
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
							//冲榜 结束时间 - 展示期时间 < 当前时间
							if(vo.et&&vo.config.extraTime&&vo.et - vo.config.extraTime * 86400 < GameData.serverTime)
							{
								vo['sortId'] = 1;
							}
							else
							{
								vo['sortId'] = -1;
							}
							actives.push(vo);
						}	
					}
				}
			}
		}
		
		return actives;
	}

	public getAllActivityIcons():BaseDisplayObjectContainer[]
	{	
		let icons:BaseDisplayObjectContainer[]=[];
		let iconKeyDic:Object={};
	
		let bigicon = Config.BigiconCfg.getBigIcon();
		for (let aid in this._newAcVoList){
			if (aid == "dailyCharge"){
				let voList = Api.acVoApi.getActivityVoListByAid(aid);
				for(let i in voList){
					let vo = voList[i];
					if (vo.code > this._dailyChargeCode){
						this._dailyChargeCode = vo.code;
					}
				}
				break;
			}
		}
		for(let aid in this._newAcVoList)
		{
			let big = false;
			if(aid == `battlePass`){
				let voList = Api.acVoApi.getActivityVoListByAid(aid);
				big = true;
				for(let i in voList){
					let vo = voList[i];
					if(Number(vo.code) == 4 || Number(vo.code) == 7){
						big = false;
						break;
					}
				}
			}
			else{
				for(let i in bigicon){
					if(bigicon[i].activity == aid && bigicon[i].type == `` && !bigicon[i].showSmall){
						big = true;
						break;
					}
				}
			}
			if (aid == "limitGift") {
				big = true;
				let __icons = this.getAcIconListByAid(aid);
				__icons.sort((a, b) => {
					let [aid_a, code_a] = a.name.split("-");
					let voa = <AcLimitGiftVo>Api.acVoApi.getActivityVoByAidAndCode(aid_a, code_a);
					let [aid_b, code_b] = b.name.split("-");
					let vob = <AcLimitGiftVo>Api.acVoApi.getActivityVoByAidAndCode(aid_b, code_b);
					return vob.et - voa.et;
				});
				icons.push(__icons[0]);
			}
			if(!big){
				this.getAcIconListByAid(aid,icons,iconKeyDic);
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

	/**
	 * 根据aid获取活动icon，可能会是多个，是个数组，正常情况只使用第一个参数
	 * @param aid 活动id，正常只需要使用第一个参数
	 * @param icons 用于缓存去重，mainui用，第二个参数和第三个参数必须同时存在或者同时不存在
	 * @param iconKeyDic 用于缓存去重，mainui用，第二个参数和第三个参数必须同时存在或者同时不存在
	 * 
	 */
	public getAcIconListByAid(aid:string,icons?:BaseDisplayObjectContainer[],iconKeyDic?:Object,bigIcon?:any):BaseDisplayObjectContainer[]
	{
		if(PlatformManager.checkIsThSp()&&PlatformManager.getAppid()=="17027003"&&aid==AcConst.AID_DAILYACTIVITY)
		{
			return icons;
		}
		if(!icons)
		{
			icons=[];
		}
		let tmpVoList:Object=iconKeyDic?this._newAcVoList:this._acVoList;
		let iconUrl:string;
		let iconNameStr:string;
		if(bigIcon){
			let acid = bigIcon.aid;
			let actype = bigIcon.type;
			let vo = Api.acVoApi.getActivityVoByAidAndCode(acid);
			let code = vo && vo.code ? vo.code : 1;
			if(acid == `battlePass`){
				let volist = Api.acVoApi.getActivityVoListByAid(acid);
				for(let i in volist){
					let unit = volist[i];
					if(unit.code != 4 && unit.code != 7){
						code = unit.code;
						break;
					}
				}
			}
			let iconContainer = this.createActivityicon(acid,Number(code),actype,true)
			icons.push(iconContainer);
		}
		else{
			let iconCfgName:string=Config.IconorderCfg.getIconNameByName(aid);
			let isHasChildCfg:boolean=Config.IconorderCfg.checkHasChildCfgNameByName(aid);
			if(iconCfgName||isHasChildCfg)
			{
				if(this.checkActivityStartByAid(aid))
				{
					if(isHasChildCfg)
					{
						let voDic:Object=tmpVoList[aid];
						if(voDic)
						{
							for(let code in voDic)
							{
								if(Number(code) != 4 && Number(code) != 7 && aid == `battlePass`){
									continue;
								}
								let vo:AcBaseVo=voDic[code];
								//IconorderCfg中activeName字段是否有code
								let cfgCode:string = iconCfgName&&Config.IconorderCfg.checkHasChildCodeCfgNameByName(aid,code) == null?null:Config.IconorderCfg.checkHasChildCodeCfgNameByName(aid,code);
								let atype:string = Config.IconorderCfg.checkHasChildAtypeCfgNameByName(aid,vo.atype); //优化
								if(vo&&vo.isStart&&(atype || cfgCode))
								{
									let iconCfg:Config.IconOrderItemCfg=Config.IconorderCfg.getIconCfgByAidAndType(aid,atype,cfgCode);
									if(iconCfg)
									{
										if(iconCfg.icon)
										{
											if(iconKeyDic)
											{ //mainui检测用到
												if(!iconKeyDic[iconCfg.icon])
												{   
													// icons.push(this.createActivityicon(iconCfg.icon,null,atype));
													icons.push(this.createActivityicon(iconCfg.icon,Number(cfgCode),atype));
													iconKeyDic[iconCfg.icon]=iconCfg.icon;
												}
											}
											else
											{
												//单独调用生成icon
												// icons.push(this.createActivityicon(iconCfg.icon,null,atype));
												icons.push(this.createActivityicon(iconCfg.icon,Number(cfgCode),atype));
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
											if(iconKeyDic)
											{
												if(!iconKeyDic[iconCfgName])
												{
													icons.push(this.createActivityicon(iconCfgName,null));
													iconKeyDic[iconCfgName]=iconCfgName;
												}
											}
											else
											{
												icons.push(this.createActivityicon(iconCfgName,null));
											}
										}
									}
									
								}
								else
								{
									if(iconCfgName)
									{
										if(iconKeyDic)
										{
											if(!iconKeyDic[iconCfgName])
											{
												icons.push(this.createActivityicon(iconCfgName,null));
												iconKeyDic[iconCfgName]=iconCfgName;
											}
										}
										else
										{
											icons.push(this.createActivityicon(iconCfgName,null));
										}
									}
									else
									{
										//都不满足上述条件的时候
										icons.push(this.createActivityicon(aid,Number(code)));
									}
									
								}
							}
						}
					}
					else if(iconCfgName)
					{
						if(iconKeyDic)
						{
							if(!iconKeyDic[iconCfgName])
							{
								icons.push(this.createActivityicon(iconCfgName,null));
								iconKeyDic[iconCfgName]=iconCfgName;
							}
						}
						else
						{
							icons.push(this.createActivityicon(iconCfgName,null));
						}
					}
				}
			}
			else
			{
				let voDic:Object=tmpVoList[aid];
				if(voDic)
				{
					for(let code in voDic)
					{
						if(Number(code) != 4 && Number(code) != 7 && aid == `battlePass`){
							continue;
						}
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

		return icons;
	}

	private createActivityicon(aid:string,code:number,type?:number|string,bigicon?:boolean):BaseDisplayObjectContainer
	{	
		let atype:number|string=type;
		let nameCode = code;
		if(Config.IconorderCfg.checkHasIconLengthGreater1ThanByCfg(aid))
		{
			nameCode = null;
			type = null;
			code = null;
		}
		if(!type){
			type = code;
			// nameCode = null;
		}
		
		let isShow = false;
		//这里禁止再加if else 处理
		if(aid=="recharge"
				|| aid == "firstrecharge"
				|| aid == "discount"
				
			){
				isShow = true;
		} else if (aid=="wishTree")
		{
			//红颜许愿套系不区分入口
			type = "1";
		}
		else if (aid=="mayDay")
		{
			//关羽活动不区分入口
			if(type == "5" )
			{
				type = "3";
			}
			//张飞活动不区分入口
			if(type == "6")
			{
				type = "4";
			}
		}
		else if(aid=="newYear")
		{
			//合服庆典活动不区分入口
			if(type == "6")
			{
				type = "4";
			}
			isShow=Config.IconorderCfg.getisFlickByName(aid,atype);
		}
		else if(aid=="punish")
		{
			//惩戒活动code5和code7不区分入口
			if(type == "7")
			{
				type = "5";
			}
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
		if(aid == "rankActive" && Number(atype) == 11)
		{	
			iconUrl = code?typeIconKey+"_icon":"ac_"+lowerAid+"_icon";
			iconUrl += "_" + code;
		}
		let nameKey:string=ResourceManager.hasRes(typeIconKey+"_name")?typeIconKey+"_name":"ac_"+lowerAid+"-1"+"_name";
		let iconNameStr=code?nameKey:"ac_"+lowerAid+"_name";
		
		//判断是否是奸臣冲榜 或者是谋士冲榜
		if(aid == "rankActive" && Number(atype) == 11 && (code == 28 || code == 29||code == 87 || code == 88 || (code>=107 && code<=111 ))){
			iconUrl = "ac_rankactive-"+type+"_"+code+"_icon";
			iconNameStr= "ac_rankactive-"+type+"_"+code+"_name";

		}
		//判断试炼
		if(aid == "destroySame" && (code >= 4 && code <= 13)){
			iconUrl = `ac_destroysame-${Math.floor(Number(code) / 2) * 2}_icon`;
			iconNameStr= `ac_destroysame-4_name`;
		}
		//判断每日充值
		if (aid == "recharge" && this._dailyChargeCode > 0){
			iconUrl = "ac_"+lowerAid+"_icon";
			iconNameStr = "ac_"+lowerAid+"_name";
			if (this._dailyChargeCode > 200){
				iconUrl = "ac_"+lowerAid+"-201_icon";
				iconNameStr = "ac_"+lowerAid+"-201_name";
			}
			else if (this._dailyChargeCode > 100){
				iconUrl = "ac_"+lowerAid+"-101_icon";
				iconNameStr = "ac_"+lowerAid+"-101_name";
			}
		}
		//跨服
		let vo:any = Api.acVoApi.getActivityVoByAidAndCode(aid);
		if (vo && vo.zids && vo.isCrossFengYun()){
			iconNameStr += "_fengyun";
		}
		if(bigicon){
			let acid = lowerAid;
			let actype = type;
			let vo : any = Api.acVoApi.getActivityVoByAidAndCode(aid);

			let iconContainer:BaseDisplayObjectContainer=new BaseDisplayObjectContainer();
			iconContainer.width=129;
			iconContainer.height=130;
			iconContainer.anchorOffsetX=iconContainer.width/2;
			iconContainer.anchorOffsetY=iconContainer.height/2;
			iconContainer.name = iconNameStr;
			
			let iconbg = BaseBitmap.create(`public_lefticon_bg`);
			iconContainer.addChild(iconbg);

			let iconame = ``;
			let num = 5;
			if(aid == `rankActive`){
				iconame = `left_${acid}-${actype}_`;
			}
			else if(aid == `threeKingdoms`){
				let vo = <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, `1`);
				iconame = vo.getTodayWeek() > 5 ? `left_threekingdoms2_` : `left_threekingdoms1_`;
				num = 10;
			}
			else{
				iconame = `left_${acid}_`;
				if(RES.hasRes(`left_${acid}${code}_1`)){
					iconame = `left_${acid}${code}_`;
				}
			}

			let iconAni:CustomMovieClip= ComponentManager.getCustomMovieClip(`left_iconbg_`,5,100);
			iconAni.playWithTime(-1);
			iconContainer.addChild(iconAni);
			iconAni.width = 129;
			iconAni.height = 130;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, iconAni, iconbg);

			if (vo && vo.zids && vo.isCrossFengYun() && vo.aid == "crossServerIntimacy"){
				iconame += "fengyun_";
			}
			let icon:CustomMovieClip= ComponentManager.getCustomMovieClip(iconame,num,100);
			icon.playWithTime(-1);
			iconContainer.addChild(icon);
			icon.width = 129;
			icon.height = 130;
			App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg);
			if(aid == `threeKingdoms`){
				let vo = <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_THREEKINGDOMS, `1`);
				if(1){//
					let tag = BaseLoadBitmap.create(`left_threekingdoms2txt`);
					iconContainer.addChild(tag);
					tag.x = 10;
					tag.y = 30;
				}	
			}
			if(vo && vo.zids && (vo.isCrossLeague() || vo.isCrossFengYun())){
				let tagImg = "left_crossleaguetxt";
				if (vo.isCrossFengYun()){
					tagImg = "left_crossfengyuntxt";
					if(vo.aid == "crossServerIntimacy")
					{
						tagImg = "left_crosstianjiaotxt";
					}
				}
				let tag = BaseLoadBitmap.create(tagImg);
				iconContainer.addChild(tag);
				tag.x = 10;
				tag.y = 30;
			}
			

			let icontextstr = ``;
			if(aid == `rankActive`){
				icontextstr = `left_${acid}-${actype}_text`
			}
			else{
				icontextstr = `left_${acid}_txt_${code}`;
				if (vo && vo.zids && vo.isCrossFengYun()){
					icontextstr = `left_${acid}_txt_fengyun`;
				}
				if(!ResourceManager.hasRes(icontextstr)){
					icontextstr =  `left_${acid}_txt`;
				}
			}
			//加载完图片重新设置尺寸
			let iconName:BaseLoadBitmap=BaseLoadBitmap.create(icontextstr,null,{callback:(container:BaseDisplayObjectContainer)=>{
				if(container)
				{
					let defaultW:number=105;
					if(PlatformManager.checkIsEnLang())
					{
						defaultW=110;
					}
					iconName.setPosition(container.width/2 - (iconName.width?iconName.width:defaultW)/2,90);
				}
				},callbackThisObj:this,callbackParams:[iconContainer]});

			iconContainer.addChild(iconName);

			iconContainer.addTouchTap((event:egret.TouchEvent,aid:string,code:number,atype:number|string)=>{
				//引导过程种不响应
				if(Api.rookieVoApi.isGuiding){
					return;
				}
				switch(event.type)
				{
					case egret.TouchEvent.TOUCH_BEGIN:
						iconContainer.setScale(0.95);
					break;
					case egret.TouchEvent.TOUCH_CANCEL:
						iconContainer.setScale(1);
					break;
					case egret.TouchEvent.TOUCH_END:
						iconContainer.setScale(1);
					break;
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
				if(Config.IconorderCfg.getAcNameListByIcon(aid).length>1&&egret.hasDefinition(viewClassName)==false)
				{
					viewClassName="AcGroup"+App.StringUtil.firstCharToUper(aid)+"View";
				}
				if(aid == "crossServerWifeBattle"){
					viewClassName = "AcCrossServerWifeBattleEnterView";
				}
				StatisticsHelper.reportAcLog(aid,code,"clickicon");
				ViewController.getInstance().openView(viewClassName,code);
			},this,[aid,code,atype]);
			return iconContainer;
		}
		else{
			let iconContainer:BaseDisplayObjectContainer=App.CommonUtil.createMainUIIcon(iconUrl,iconNameStr,isShow,iconCfgBgValue,false,``,aid);
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
				if(Config.IconorderCfg.getAcNameListByIcon(aid).length>1&&egret.hasDefinition(viewClassName)==false)
				{
					viewClassName="AcGroup"+App.StringUtil.firstCharToUper(aid)+"View";
				}
				if(aid == "crossServerWifeBattle"){
					viewClassName = "AcCrossServerWifeBattleEnterView";
				}
				StatisticsHelper.reportAcLog(aid,code,"clickicon");
				ViewController.getInstance().openView(viewClassName,code);
			},this,[aid,code,atype]);
			return iconContainer;
		}		
	}

	public openActivityViewByAid(aid:string,code:number,atype:number|string):void
	{	
		let iconCfgName:string;
		if (Config.IconorderCfg.getIconNameByName(aid))
		{
			iconCfgName = App.StringUtil.firstCharToUper(Config.IconorderCfg.getIconNameByName(aid));
		}
		else
		{
			iconCfgName = App.StringUtil.firstCharToUper(aid);
		}
		let viewClassName:string = "Ac"+iconCfgName+"View";
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
		if(Config.IconorderCfg.getAcNameListByIcon(aid).length>1&&egret.hasDefinition(viewClassName)==false)
		{
			viewClassName="AcGroup"+App.StringUtil.firstCharToUper(aid)+"View";
		}
		if(aid == "crossServerWifeBattle"){
			viewClassName = "AcCrossServerWifeBattleEnterView";
		}
		ViewController.getInstance().openView(viewClassName,code);
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

	public checkIsHasNewAc():boolean
	{
		return Object.keys(this._newAcVoList).length>0;
	}
	/**
	 * 检测是否开启终生卡打折活动
	 */
	public checkIsYearCardDiscount():AcBaseVo
	{
		let vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT,"2");
		let vo2 = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT,"3");
		if(vo&&vo.isStart)
		{
			return vo;
		}
		else if(vo2&&vo2.isStart)
		{
			return vo2; 
		}
		else
		{
			return null;
		}
	}

	/**
	 * 检测是否开启Vip打折活动
	 */
	public checkIsVipDiscount(): AcBaseVo {
		let vo = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "1");
		let vo2 = this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "4");
		if (vo && vo.isStart) {
			return vo;
		}
		else if (vo2 && vo2.isStart) {
			return vo2;
		}

		return null;

	}

	/**
	 * 检测是否开启月卡打折活动
	 */
	public checkIsMonthDiscount(): AcDiscountVo {
		let vo = <AcDiscountVo>this.getActivityVoByAidAndCode(AcConst.AID_ACDISCOUNT, "5");
		if (vo && vo.isStart) {
			return vo;
		}
		return null;

	}

	/**
	 * 根据icon也就相当于活动id来获取活动组的数据
	 * @param icon 从IconOrderCfg取到
	 */
	public getGroupAcVo(icon:string):AcGroupBaseVo
	{
		return this._acGroupList[icon];
	}

	public checkShowePopupView():void
	{
		let popInfo = Api.acVoApi.getAcPopInfo();
		if (popInfo.length > 0 || Api.otherInfoVoApi.checkHasNewYear())
        {   
			//ViewController.getInstance().openView(ViewConst.POPUP.ACTIVITYPOPVIEW,{info:popInfo});
			Api.viewqueueVoApi.checkShowView(ViewConst.POPUP.ACTIVITYPOPVIEW,{info:popInfo});
        }
	}

	/**
	 * 活动公告信息
	 */
	public getAcPopInfo():any[]
	{
		let infos:any[] = []; // pic  sortId et extraTime label iscross
		let allAnnouncements:Config.AnnouncementCfg.AnnouncementItemCfg[] = Config.AnnouncementCfg.getAnnouncements();
		let maxNum:number = Config.AnnouncementCfg.getMaxNum();
		
		for (let i:number = 0; i<allAnnouncements.length; i++)
		{
			let a:Config.AnnouncementCfg.AnnouncementItemCfg = allAnnouncements[i];
			if (a.activityType == "firstcharge")
			{	
				
				if (Api.switchVoApi.checkClosePay()) {
					continue;
				}
				if(Api.shopVoApi.getPayFlag()!=2)
				{
					let info:any = {
						sortId:i,
						label:a.label,
						vo:{aid:a.activityType},
						p:"acpopicon_firstcharge",
						cross:false
					};
					infos.push(info);
				}
			}
			else if (a.activityType == "emperorWar")
			{
				if(Api.switchVoApi.checkEmperorOpen()==true )
				{	
					let api = Api.emperorwarVoApi;
					if (api.getVersion() > 0 && api.isInShow() && GameData.serverTime<api.getet())
					{	
						let info:any = {sortId:i,label:a.label,vo:{aid:a.activityType,et:api.getet()},p:"acpopicon_emperorwar",cross:false};
						infos.push(info);
					}
				}
			}
			else if (a.activityType == "exam"){
				if (Api.switchVoApi.checkExamOpen() == true){
					let api = Api.examVoApi;
					if (api.isInPeriod() == true && api.isInVersion() == true){
						let info:any = {sortId:i,label:a.label,vo:{aid:a.activityType,et:api.getExamEndTime()},p:"acpopicon_exam",cross:false};
						infos.push(info);
					}
				}
			}
			else if (a.activityType == "sevenDaysSignUp"){
				if (PlatformManager.checkIsRuSp()){
					let res = "acpopicon_sevendaysignup";
					if (Api.sevenDaysSignupLoginVoApi.checkUserIsNewer() && Api.sevenDaysSignupLoginVoApi.checkNewUserLoginThanSeven() && Api.switchVoApi.checkOpenSevenDay()){
						let totalSignDay = Api.sevenDaysSignupLoginVoApi.nowDay();
						if(totalSignDay<=7){
							if(totalSignDay==1)
							{
								res += `1_ru`;
							}
							else if(totalSignDay<=2)
							{
								res += `2_ru`;
							}
							else if(totalSignDay<=7)
							{
								res += `7_ru`;
							}
							else
							{	
								continue;
							}
							let info:any = {
								sortId:i,
								label:a.label,
								vo:{aid:a.activityType},
								p:res,
								cross:false,
								showhead:a.head
							};
							infos.push(info);
						}
						else{
							continue;
						}
					}
					else{
						continue;
					}
				}
				else{
					continue;
				}
			}
			//活动-组
			else if (Config.IconorderCfg.getAcNameListByIcon(a.activityType).length > 1)
			{	
				let groupVo = Api.acVoApi.getGroupAcVo(a.activityType);
				if (groupVo && groupVo.isStart)
				{
					let info:any = {sortId:i,label:a.label,vo:groupVo,p:"acpopicon_"+a.activityType,cross:false,showhead:a.head};
					infos.push(info);
				}
			}
			else
			{
				for(let aid in this._acVoList)
				{
					if (aid == a.activityType)
					{	
						let voObject:Object = this._acVoList[aid];

						for(let code in voObject)
						{	
							if (a.codeNum && GameData.isInArray(Number(code),a.codeNum))
							{
								continue;
							}

							let oneVo:AcBaseVo = null;
							let title:boolean = false;
							if (aid == "rankActive")
							{
								
								let tempVo:AcBaseVo = voObject[code];
								if (GameData.isInArray(tempVo.atype, a.type)) 
								{
									oneVo = tempVo;
								}
							}
							else
							{	
								oneVo = voObject[code];
							}

							if (oneVo && oneVo.isShowBanner == true)
							{	
								let pic:string = "acpopicon_"+oneVo.aid;
								pic=pic.toLowerCase();
								let crossType:number = 1;
								if (aid == "rankActive")
								{	
									let rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(oneVo.aid,String(oneVo.code));
									if (!rankcfg)
									{
										continue;
									}

									if (rankcfg.title)
									{
										title = true;
									}

									if (ResourceManager.hasRes(pic+oneVo.code))
									{
										pic+=oneVo.code;
									}
									else if (rankcfg.isCross == 0)
									{
										pic+= oneVo.atype+"_1"
									}
									else if (rankcfg.isCross == 2)
									{	
										let voo : AcRankActiveVo = <AcRankActiveVo>oneVo;
										let naid = voo.getCrossActivityAid();
										if(naid !== '' ){
											pic += oneVo.atype+"_2_"+naid.toLowerCase();
										}
										else
										{
											pic+= oneVo.atype+"_2"
										}
										crossType = 2;
									}
									else
									{	
										pic+= oneVo.atype+"_2"
										crossType = 2;
									}
								}
								else if(a.activityType == "destroySame"&& (Number(oneVo.code) >= 4 && Number(oneVo.code) <= 13)){
									pic += `${Math.floor(Number(code) / 2) * 2}`;
								}
								else
								{
									if (ResourceManager.hasRes(pic+oneVo.code))
									{
										pic+=oneVo.code;
									}
								}

								if (Api.switchVoApi.checkIsInBlueWife() && ResourceManager.hasRes(`${pic}_blueType`))
								{
									pic = `${pic}_blueType`;
								}

								if (!ResourceManager.hasRes(pic) && !PlatformManager.checkIsLocal())
								{	
									continue;
								}

								//冲榜活动只能有一个，展示期活动优先级低于非展示期
								if (i<=4)
								{
									if (infos.length>0)//说明有个在展示期的活动
									{
										if (oneVo.checkIsInEndShowTime())
										{
											continue;
										}
										else
										{
											infos.length = 0;
											// if (i<=3)
											// {
											// 	i = 4;
											// }
										}
									}
									else
									{	
										if (!oneVo.checkIsInEndShowTime())
										{
											// if (i<=3)
											// {
											// 	i = 4;
											// }
										}
									}
								}

								let info:any = {sortId:i,label:a.label,vo:oneVo,p:pic,cross:crossType,showhead:title||a.head};
								infos.push(info);

								
								if (!oneVo.checkIsInEndShowTime() && aid == "rankActive")
								{
									break;
								}
							}
							if (infos.length >= maxNum)
							{
								break;
							}
						}						
					}
				}
			}
		
			if (infos.length >= maxNum)
			{
				break;
			}
		}

		return infos;
	}
	/**通过aid 获得活动集合中列表 
	 * 返回 如果是集市类活动 。会返回 。aid-code 集合
	 * 否则会返回 aid 集合
	*/
	public getAcListForAid(aid:string)
	{
		let cfgName = Config.IconorderCfg.getAidListByCfgName(aid);
		let newCfgName: string[] = [];
		if (Config.IconorderCfg.checkHasIconLengthGreater1ThanByCfg(aid)) {
			for (let i = 0; i < cfgName.length; i++) {
				let codeTmp = cfgName[i].split("-")[1];
				if (codeTmp) {
					newCfgName.push(cfgName[i]);
				}
				else {
					let voList: AcBaseVo[] = Api.acVoApi.getActivityVoListByAid(cfgName[i]);
					for (let i = 0; i < voList.length; i++) {
						let vo: AcBaseVo = voList[i];
						if (Config.IconorderCfg.getIconNameByName(vo.aid, String(vo.code)) == aid) {
							newCfgName.push(vo.aidAndCode);
						}
					}
				}
			}
		}
		else {
			newCfgName = cfgName;
		}
		return newCfgName;
	}

	public getAcLocalName(aid:string,code:number|string):string
	{
		let defaultKey:string = "ac"+App.StringUtil.firstCharToUper(aid+"-"+code)+"_Title";
		let key:string = "ac"+App.StringUtil.firstCharToUper(aid)+"_Title";
		if(LanguageManager.checkHasKey(defaultKey)==false&&LanguageManager.checkHasKey(key))
		{
			defaultKey=key;
		}
		return LanguageManager.getlocal(defaultKey);
	}

	/**
	 * 特殊用
	 * @param aid 
	 */
	public checkShowAcIconByCfg(aid:string):boolean
	{
		let notShowAidDic={};
		if(PlatformManager.getAppid()=="17004007"||PlatformManager.getAppid()=="17004003"||PlatformManager.getAppid()=="17004008")
		{
			notShowAidDic={
				"rechargeBox":"1",
				"chargeReturnGem":"1",
				"bankBox":"1",
				"battlePass":"1",
			}
		}
		return Boolean(notShowAidDic[aid])==false;
	}

	/**
	 * 达到条件显示的活动 刷新使用
	 */
	public checkLimitShowAc():void{
		let len = Object.keys(this._notShowAcVoList).length;
		if (len > 0){
			let data = this._notShowAcVoList;
			for (let aid in data){
				let acList = data[aid];
				let newAcList = {};
				for (let code in acList){
					if (acList[code] && acList[code].isShowIcon && acList[code].isStart){
						newAcList[code] = acList[code];
						acList[code] = null;
					}
				}
				if (Object.keys(newAcList).length > 0){
					this._newAcVoList[aid] = newAcList;
				}
			}
		}
	}

	public dispose():void
	{	
		this.isHandled_BI = false;
		this.isHandled_LRP = false;
		this.isHandled_ILI = false;
		this._acVoList={};
		this._newAcVoList={};
		this._notShowAcVoList={};
		this._dailyChargeCode = 0;
		if(this._acGroupList)
		{
			for(let key in this._acGroupList)
			{
				let groupVo = this._acGroupList[key];
				if(groupVo)
				{
					groupVo.dispose();
				}
			}
		}
		this._acGroupList={};
		this.needAloneGetCfgList.length = 0;
		super.dispose();
	}
}