class DailybossVoApi extends BaseVoApi
{
	private dailybossVo:DailybossVo;
	public constructor() 
	{
		super();
	}

	public checkNpcMessage():boolean
	{
		return this.getStatus()==1;
	}

	public checkServantcanStatus(id:string|number):number
	{
		return this.dailybossVo.servant[id]!=null?this.dailybossVo.servant[id]:0;
	}

	public findBestServant(bossLife:number):string|number
	{
		if(!bossLife)
		{
			bossLife=0;
		}
		let servantId:string|number;
		let allKey:string[] = Api.servantVoApi.getServantInfoIdListWithSort(1);
		allKey.sort((a,b)=>
		{
			let value1:number=Api.servantVoApi.getServantCombatWithId(a);
			let valueb:number=Api.servantVoApi.getServantCombatWithId(b);
			return value1-valueb;
		});
		let l:number=allKey.length;
		for(let i:number=0;i<l;i++)
		{
			if(!this.checkServantcanStatus(allKey[i]))
			{
				servantId=allKey[i];
				if(Api.servantVoApi.getServantCombatWithId(allKey[i])>=bossLife)
				{
					break;
				}
			}
		}
		return servantId;
	}

	public getScore():number
	{
		return this.dailybossVo?this.dailybossVo.score:0;
	}

	public getShopItemByNum(id:string|number):number
	{
		return (this.dailybossVo&&this.dailybossVo.shop[id])? this.dailybossVo.shop[id] : 0;
	}

	public getShopItemNeedScore(id:number|string):number
	{
		let cfg:Config.DailybossShopItemCfg=Config.DailybossCfg.getShopItemById(id);
		let needScore:number = cfg.getNeedScoreByNum(Api.dailybossVoApi.getShopItemByNum(id));
		return needScore;
	}

	public getBossType():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		let end1Time:number=Config.DailybossCfg.boss1Time[1]*App.DateUtil.hourSeconds;
		return leftSecond>end1Time?2:1;
	}

	/**
	 * 返回boss战状态0开始状态,1开始,2结束等待下一轮
	 */
	public getStatus():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getStatus(leftSecond);
	}

	public getNextStartLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getNextStartLeftTime(leftSecond);
	}

	public getLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getLeftTime(leftSecond);
	}

	public getBossLocalTimeStr():string
	{
		return LanguageManager.getlocal("dailybossLocalTimeDesc",[LanguageManager.getlocal("dailybossTimeTitle1"),Config.DailybossCfg.getInTimeStr(1)])+"\n"+LanguageManager.getlocal("dailybossLocalTimeDesc",[LanguageManager.getlocal("dailybossTimeTitle2"),Config.DailybossCfg.getInTimeStr(2)]);
	}
	/**
	 * 是否已领取了通关奖励
	 */
	public getClearFlag():boolean
	{
		if (this.dailybossVo && this.dailybossVo.info && this.dailybossVo.info.clearFlag) {
			return this.dailybossVo.info.clearFlag;
		}
		return false;
	}
	public getMaxRound():number
	{
		return Config.DailybossCfg.boss1MaxNum;
	}
	// public isShowNpc():boolean
	// {
	// 	return false;
	// }
}