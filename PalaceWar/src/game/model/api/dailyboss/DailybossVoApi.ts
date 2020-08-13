class DailybossVoApi extends BaseVoApi
{
	private dailybossVo:DailybossVo;
	public bossKillTime:number = 0;
	public needcheckweapon:number = 0;

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

		if (Api.switchVoApi.checkOpenDailybossTogather() && Api.countryWarVoApi.countryWarRedPoint())
		{
			return true;
		}
		if (this.getStatus()==1 && this.hasServantCanFight() && this.canKeepFghting())
		{
			return true;
		}
		if (Api.switchVoApi.checkNewDailyBoss()&&(Api.dailybossnewVoApi.getStatus()==1 && Api.dailybossnewVoApi.hasServantCanFight() || Api.dailybossnewVoApi.getRewardFlag()==1))
		{
			return true;
		}
		if (Api.acVoApi.getActivityVoListByAid("ladderTournament").length>0)
		{
			let acvo = Api.acVoApi.getActivityVoListByAid("ladderTournament")[0];
			if (acvo.isShowRedDot)
			{
				return true;
			}
		}

		return false;
	}

	//已出战门客数量
	private hasServantCanFight():boolean
	{
		let n:number = 0;
		if (this.dailybossVo && this.dailybossVo.servant)
		{	
			for (let key in this.dailybossVo.servant)
			{
				if (this.dailybossVo.servant[key]!=0)
				{
					n++;
				}
			}
		}
		return Api.servantVoApi.getServantCount() > n;
	}

	private canKeepFghting():boolean
	{
		if (this.getBossType() == 1)
		{
			if (this.dailybossVo && this.dailybossVo.info && this.dailybossVo.info.bossLv)
			{
				if (this.dailybossVo.info.bossLv>Api.dailybossVoApi.getMaxRound() && this.getClearFlag())
				{
					return false;
				}
			}
		}
		else
		{	
			if (Api.switchVoApi.checkNewDailyBoss())
			{
				return false;
			}
			if (Api.dailybossVoApi.bossKillTime > 0 && App.DateUtil.checkIsToday(Api.dailybossVoApi.bossKillTime))
			{
				return false;
			}
		}
		return true;
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

	public getStatusByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getStatusByName(leftSecond,name);
	}

	public getNextStartLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getNextStartLeftTime(leftSecond);
	}

	public getNextStartLeftTimeByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getNextStartLeftTimeByName(leftSecond,name);
	}

	public getEndTimeByName(name:string):number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getEndTimeByName(leftSecond,name);
	}

	public getLeftTime():number
	{
		let leftSecond:number=App.DateUtil.getLeftDaySecondByTime(GameData.serverTime);
		return Config.DailybossCfg.getLeftTime(leftSecond);
	}

	public getBossLocalTimeStr():string
	{	
		if (Api.switchVoApi.checkNewDailyBoss())
		{
			return LanguageManager.getlocal("dailybossLocalTimeDesc",[LanguageManager.getlocal("dailybossTimeTitle1"),Config.DailybossCfg.getInTimeStr(1)]);
		}
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
	// public isShowNpc():boolean
	// {
	// 	return false;
	// }

	public getMaxRound():number
	{
		return Config.DailybossCfg.boss1MaxNum;
	}

	public dispose()
	{
		this.bossKillTime = 0;
		this.needcheckweapon = 0;

		super.dispose();
	}
}