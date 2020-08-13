class DailybossnewVoApi extends BaseVoApi
{
	private dailybossnewVo:DailybossnewVo;
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

		// if (Api.switchVoApi.checkOpenDailybossTogather() && Api.countryWarVoApi.countryWarRedPoint())
		// {
		// 	return true;
		// }
		if (this.getStatus()==1 && this.hasServantCanFight() )
		{
			return true;
		}

		return false;
	}

	//已出战门客数量
	public hasServantCanFight():boolean
	{
		let n:number = 0;
		if (this.dailybossnewVo && this.dailybossnewVo.servant)
		{	
			for (let key in this.dailybossnewVo.servant)
			{
				if (this.dailybossnewVo.servant[key]!=0)
				{
					n++;
				}
			}
		}
		return Api.servantVoApi.getServantCount() > n;
	}

	public checkServantcanStatus(id:string|number):number
	{
		return (this.dailybossnewVo&&this.dailybossnewVo.servant[id]!=null)?this.dailybossnewVo.servant[id]:0;
	}

	public findBestServant():string|number
	{
	
		let servantId:string|number;
		let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
		allKey.sort((a,b)=>
		{
			let value1:number=Api.servantVoApi.getServantCombatWithId(a);
			let valueb:number=Api.servantVoApi.getServantCombatWithId(b);
			return valueb-value1;
		});
		let l:number=allKey.length;
		for(let i:number=0;i<l;i++)
		{
			if(!this.checkServantcanStatus(allKey[i]))
			{
				servantId=allKey[i];
				break;
			}
		}
		return servantId;
	}

	public getScore():number
	{
		return this.dailybossnewVo?this.dailybossnewVo.score:0;
	}

	public getShopItemByNum(id:string|number):number
	{
		return (this.dailybossnewVo&&this.dailybossnewVo.shop[id])? this.dailybossnewVo.shop[id] : 0;
	}

	public getShopItemNeedScore(id:number|string):number
	{
		let cfg:Config.DailybossnewShopItemCfg=Config.DailybossnewCfg.getShopItemById(Number(id));
		let needScore:number = cfg.getNeedScoreByNum(Api.dailybossnewVoApi.getShopItemByNum(Number(id)));
		return needScore;
	}

	public getBossType():number
	{ 
		return 2;
	}

	/**
	 * 返回boss战状态0开始状态,1开始,2结束等待下一轮
	 */
	public getStatus():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getStatus(leftSecond);
	}

	public getStatusByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getStatusByName(leftSecond,name);
	}

	public getNextStartLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getNextStartLeftTime(leftSecond);
	}

	public getNextStartLeftTimeByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getNextStartLeftTimeByName(leftSecond,name);
	}

	public getEndTimeByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getEndTimeByName(leftSecond,name);
	}

	public getLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossnewCfg.getLeftTime(leftSecond);
	}

	//是否领取昨日奖励 0: 无奖励  1:未领取  2:已领取
	public getRewardFlag():number
	{
		let f = 0;
		if (this.dailybossnewVo&&this.dailybossnewVo.info && this.dailybossnewVo.info.rewardFlag)
		{
			f = this.dailybossnewVo.info.rewardFlag;
		}
		return f;
	}


	public dispose()
	{
		this.dailybossnewVo = null;


		super.dispose();
	}
}