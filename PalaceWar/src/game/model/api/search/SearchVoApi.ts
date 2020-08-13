class SearchVoApi extends BaseVoApi
{
	private searchVo:SearchVo;
	private buildInfoList:any={};
	private wifeList:any={};
	public constructor()
	{
		super();
	}

	public formatData(data:any):void
	{
		super.formatData(data);
	}

	public checkNpcMessage():boolean
	{
		return this.getSearchNum()>0;
	}

	/**
	 * 根据personid获取红颜获取进度
	 * @param personId 
	 */
	public getWifeValueById(personId:string):number
	{
		let itmVo:SearchInfoItemVo=(<SearchInfoItemVo>this.searchVo.info[personId])
		if(itmVo)
		{
			return itmVo.progress;
		}
		return 0;
	}

	public getNeedItem():string
	{
		return Config.SearchbaseCfg.needItem;
	}

	public getSearchNum():number
	{
		return this.searchVo.searchNum;
	}

	public getLeftTime():number
	{
		return this.searchVo.leftTime;
	}

	public getSearchNumLocalStr():string
	{
		let str:string;
		if(this.getSearchNum()<1)
		{
			str = LanguageManager.getlocal("searchViewLeftNumDesc",[App.DateUtil.getFormatBySecond(this.getLeftTime(),1)]);
		}
		else
		{
			str = LanguageManager.getlocal("searchViewLeftNumDesc",[Api.searchVoApi.getSearchNum().toString()+"/"+Api.searchVoApi.getMaxSearchNum().toString()]);
		}
		return str;
	}

	/**
	 * 获取当前寻访次数最大值
	 */
	public getMaxSearchNum():number
	{
		return this.searchVo.maxSearchNum;
	}

	public getPersonListByBuildId(buildId:number):SearchBuildInfoItemVo[]
	{
		let buildIdStr:string=String(buildId);
		if(buildIdStr=="5")
		{
			this.buildInfoList[buildIdStr]=null;
		}
		if(this.buildInfoList[buildIdStr]==null)
		{
			let buildInfoItemList:SearchBuildInfoItemVo[]=[];
			let buildInfoArr=Config.SearchCfg.getPersonItemCfgListByBuildId(buildId);
			for(var key in buildInfoArr)
			{
				let value=buildInfoArr[key];
				if(buildId==5&&value.unlock&&value.unlock["needVip"])
				{
					 let needVip:number =value.unlock["needVip"];
					 let openVipNum:number =Api.vipVoApi.getMaxbtnNum();
					 if(openVipNum>=needVip)
					 {
						 this.getInfoItemList(value,buildInfoItemList);
					 }
				}
				else
				{
					this.getInfoItemList(value,buildInfoItemList);
				} 
			}
			this.buildInfoList[buildIdStr]=buildInfoItemList;
		}
		return this.buildInfoList[buildIdStr];
	}
	private getInfoItemList(value,buildInfoItemList:SearchBuildInfoItemVo[]):void
	{
		let itemVo:SearchBuildInfoItemVo=new SearchBuildInfoItemVo();
			itemVo.initData(value.personId);
			buildInfoItemList.push(itemVo);
			if(value.wifeId)
			{
				this.wifeList[value.wifeId]=itemVo;
			}
	}

	/**
	 * 获取当前运势值
	 */
	public getCurLuckNum():number
	{
		let curLuckNum:number=0;
		if(this.searchVo)
		{
			let resAddMax = Config.SearchbaseCfg.resAddMax;
			let now = GameData.serverTime;
			//当前已满有可能超过90
			let needTime = Config.SearchbaseCfg.luckNeedTime;
			let fixNum = Math.floor((now - this.searchVo.lucky.st)/needTime);
			curLuckNum=Math.min(Math.max(resAddMax,this.searchVo.lucky.num),this.searchVo.lucky.num + fixNum);
		}
		return curLuckNum;
	}

	/**
	 * 获取当前VIP剩余免费次数
	 */
	public getSearchLuckFreeNum():number
	{
		return Config.VipCfg.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel()).searchLuckFree-this.getSearchLuckUsedFreeNum();
	}

	public getSearchLuckUsedFreeNum():number
	{
		return this.searchVo?this.searchVo.lucky.vipfree:0;
	}
	
	

	/**
	 * 运势值上限
	 */
	public getMaxLuckNum():number
	{
		return Config.SearchbaseCfg.luckMax;
	}

	public getMaxLuckByType(type:string):number
	{
		if(type==this.getDonateTypes()[2])
		{
			return this.getMaxLuckNum();
		}
		else
		{
			return Config.SearchbaseCfg.resAddMax;
		}
	}

	public getAutosetValue():number
	{
		return this.searchVo?this.searchVo.lucky.autoset:0;
	}

	public getFoodOpen():number
	{
		return this.searchVo?this.searchVo.lucky.foodopen:0; 
	}

	public getGoldOpen():number
	{
		return this.searchVo?this.searchVo.lucky.goldopen:0; 
	}

	public getDonateTypes():string[]
	{
		return [ItemEnums[2],ItemEnums[3],ItemEnums[1]]
	}

	public getDonateCost(type:string):number
	{
		if(type==this.getDonateTypes()[2])
		{
			return Config.SearchbaseCfg.getGemCostByLuck(this.getCurLuckNum());
		}
		else
		{
			let curNum:number = this.searchVo?this.searchVo.lucky.buynum:0;
			return (curNum+1)*Config.SearchbaseCfg.resCost;
		}
	}

	public checkCostEnough(type:string,showTip?:boolean):boolean
	{
		if(type=="food")
		{
			if(Api.playerVoApi.getFood()<this.getDonateCost(type))
			{
				if(showTip)
				{
					App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
				}
				return false;
			}
		}
		else if(type=="gold")
		{
			if(Api.playerVoApi.getPlayerGold()<this.getDonateCost(type))
			{
				if(showTip)
				{
					App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
				}
				return false;
			}
		}
		else if(type=="gem")
		{
			if(Api.playerVoApi.getPlayerGem()<this.getDonateCost(type))
			{
				if(showTip)
				{
					App.CommonUtil.showTip(Config.RewardCfg.getNotEnoughLocalTip(ItemEnums[type]));
				}
				return false;
			}
		}
		return true;
	}

	public getPersonValueLocalStr(personId:string):string
	{
		let itemCfg=Config.SearchCfg.getPersonItemCfgByPersonId(personId);
		if(itemCfg.wifeId&&itemCfg.value)
		{
			let value=Api.searchVoApi.getWifeValueById(personId)/itemCfg.value;

			let descStr = "";
			if(value <= 0.3)
			{
				descStr = "searchWifeDesc1";
			}
			else if(value > 0.3 && value <= 0.6 )
			{
				descStr = "searchWifeDesc2";
			}
			else if(value > 0.6 && value < 1 )
			{
				descStr = "searchWifeDesc3";
			}
			else if(value)
			{
				descStr = "searchWifeDesc4";
			}
			return LanguageManager.getlocal(descStr,[itemCfg.name]);
		}
		return "";
	}
	

	public isShowNpc():boolean
	{
		return Api.playerVoApi.getPlayerLevel() >= Config.SearchbaseCfg.needLv;
	}

	public getLockedString():string
	{
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(Config.SearchbaseCfg.needLv)]);
	}

	/**
	 * 检测是否可以一键寻访了
	 */
	public checkOneKey():boolean
	{
		return Api.playerVoApi.getPlayerVipLevel()>=this.getOneKeyNeedVipLevel();
	}
	/**
	 * 获取一键寻访需要的条件
	 */
	public getOneKeyNeedVipLevel():number
	{
		return Config.SearchbaseCfg.needVip;
	}

	public openMainView():void
	{
		if(this.isShowNpc())
		{
			ViewController.getInstance().openView(App.StringUtil.firstCharToUper(this.getModeName())+"View");
		}
	}
}