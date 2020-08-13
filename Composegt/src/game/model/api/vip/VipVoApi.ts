class VipVoApi extends BaseVoApi
{
	private noRewardArr:Array<number> = [];
	public constructor()
	{
		super();
	}

	public checkMaxVipLevel():boolean
	{
		return Api.playerVoApi.getPlayerVipLevel()>=Config.VipCfg.getMaxLevel();
	}

	public getNextVipLvNeedRechargeGemNum():number
	{
		let num:number=0;
		let curPlayerBuyGem:number = Api.playerVoApi.getPlayerVipExp();
		let nextLevel:number=Api.playerVoApi.getPlayerVipLevel()+1;
		nextLevel=Math.min(Config.VipCfg.getMaxLevel(),nextLevel);

		// vip折扣
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
			let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[nextLevel];
			if(itemCfg)
			{
				num = itemCfg.needGem-curPlayerBuyGem;
			}
		} else {
			let itemCfg = Config.VipCfg.getVipCfgByLevel(nextLevel);
			if(itemCfg)
			{
				num = itemCfg.needGem-curPlayerBuyGem;
			}
		}
		return Math.max(0,num);
	}
	

	public getNextVipNeedGemNum():number
	{
		let num:number=0;
		let nextLevel:number=Api.playerVoApi.getPlayerVipLevel()+1;
		nextLevel=Math.min(Config.VipCfg.getMaxLevel(),nextLevel);

		// vip折扣
		if (Api.acVoApi.getActivityVoByAidAndCode("discount","1") && Api.acVoApi.getActivityVoByAidAndCode("discount","1").isStart) {
			let itemCfg = Config.AcCfg.getCfgByActivityIdAndCode("discount", 1).vipList[nextLevel];
			if(itemCfg)
			{
				num = itemCfg.needGem;
			}
		} else {
			let itemCfg = Config.VipCfg.getVipCfgByLevel(nextLevel);
			if(itemCfg)
			{
				num = itemCfg.needGem;
			}
		}
		return num;
	}

	/**
	 * 获取当前VIP等级的配置
	 */
	public getCurLevelVipCfg()
	{
		return this.getVipCfgByLevel(Api.playerVoApi.getPlayerVipLevel());
	}

	/**
	 * 根据vip等级获取配置
	 * @param vipLevel 
	 */
	public getVipCfgByLevel(vipLevel:number)
	{		
	 	return Config.VipCfg.getVipCfgByLevel(vipLevel);
	}

	public getCanRewardLevelList():number[]
	{
		let resultArr:number[]=[];
		let playerVipLevel:number=Api.playerVoApi.getPlayerVipLevel();
		for(let i:number=0;i<=playerVipLevel;i++)
		{
			let extraRewardVoList=Config.VipCfg.getVipCfgByLevel(i).extraRewardVoList;
			if((!Api.shopVoApi.getVipRewardInfo(i))&&extraRewardVoList&&extraRewardVoList.length>0)
			{
				resultArr.push(i);
			}
		}
		return resultArr;
	}

	public getShowVipLevel():number
	{
		let canRewardList:number[]=this.getCanRewardLevelList();
		if(canRewardList.length>0)
		{
			return Math.max(0,canRewardList[0]);
		}
		else
		{
			return Api.playerVoApi.getPlayerVipLevel()+1;
		}
	}

	public getDailyLuckNum():number
	{
		return this.getCurLevelVipCfg().dailyLuckNum;
	}

	//根据字段取vip 解锁等级
	public getNeedVip(unStr:string=''):number
	{
		let vipNum = Config.VipCfg.getVipUnlockByLevel(unStr);
		return vipNum; 
	}


	public checkRedPoint():boolean
	{
		return this.getReddot();
	}

	public getReddot():boolean
	{
		let currVip:number =Api.playerVoApi.getPlayerVipLevel();
		for(var i:number=0;i<=currVip;i++)
		{	
			
			if(Api.vipVoApi.getVipCfgByLevel(i).reward)
			{
				let boo =Api.switchVoApi.checkVip1Privilege();
				{
					if(boo==false&&i==1)
					{
						 continue;
					}
					else
					{
						if(!Api.shopVoApi.getVipRewardInfo(i))
						{
							
							if (currVip>=i) 
							{	 
								return true;
							
							}
							else
							{
								return false;
							}
						}	
					}
				}

			
			} 
		}
	}
	public getNoRewardBoo(num):boolean
	{
	
		if(!Api.vipVoApi.getVipCfgByLevel(num).reward){
			return true;
		}
		return false;
	}
	public  getMaxbtnNum():number
	{
		let maxShowLv:number=Config.VipCfg.getMaxLevel();
		if(GameData.limitVipLv&&GameData.limitVipLv.length>0)
		{
			let l:number=GameData.limitVipLv.length;
			for(let i:number=0;i<l;i++)
			{
				if(Api.playerVoApi.getPlayerVipLevel()<GameData.limitVipLv[i])
				{
					maxShowLv=GameData.limitVipLv[i];
					break;
				}
			}
		}
		return maxShowLv;
	}
	
}