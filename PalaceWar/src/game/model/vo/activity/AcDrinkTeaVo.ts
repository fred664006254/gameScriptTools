class AcDrinkTeaVo extends AcBaseVo
{   
	private rinfo:any = null;
	private ainfo:any = null;   //进度奖励

	public isfree:number=0;

    public constructor() 
	{
		super();
	}

    public initData(data:any):void
	{
        for(let key in data)
		{
			this[key] = data[key];
		}
    }
    public getNeedMoney():number{
        let rechargeData = this.cfg.getRechargeList();
        if (rechargeData && rechargeData.length > 0){
            for (let i=0; i < rechargeData.length; i++){
                let rewards = rechargeData[i].getReward.split("|");
                for (let key in rewards){
                    let id = rewards[key].split("_")[1];
					let itemCfg = Config.ItemCfg.getItemCfgById(id);
					if(itemCfg)
					{
						if(itemCfg.getRewards && itemCfg.getRewards.split("_")[1] && itemCfg.getRewards.split("_")[1] == String(this.cfg.show))
						{
							return rechargeData[i].needGem;
						}
					}
                }
            }
        }
        return 0;
    }	

	//获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}

    //获得充值奖励的配置
	public getSortRechargeCfg():Config.AcCfg.DrinkTeaRechargeItem[] 
	{
		let rechargeData = this.cfg.getRechargeList();
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRecharge(String(rechargeData[i].id))) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
			}
			else if (this.getChargeNum() >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
			}
        }
        rechargeData.sort((a, b) => { return a.sortId - b.sortId });
		return rechargeData;
    }

	/*累积充值领取判断*/
	public isGetRecharge(id:string):boolean
	{	
		if(this.rinfo&&this.rinfo.flags && this.rinfo.flags[id])
		{
			return true; 
		}
		return false;
	}

	private get cfg() : Config.AcCfg.DrinkTeaCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}


    //充值奖励红点
	public isShowRechargeDot():boolean
    {
		let curNum = this.getChargeNum();
        let data = this.cfg.getRechargeList();
        for (let i=0; i < data.length; i++)
		{
            if (!this.isGetRecharge(String(data[i].id)))
			{
                if (curNum >= data[i].needGem)
				{
                    return true;
                }
            }
        }
        return false;
    }

	public getSortAchievementCfg():Config.AcCfg.DrinkTeaAchieveItem[]
	{
		let data = this.cfg.getAchieveList();
		for (let i = 0; i < data.length; i++) 
		{
			if (this.isGetAchievementById(String(data[i].id))) 
			{
				data[i].sortId = data.length + Number(data[i].id);
			}
			else if (this.getAchieveNum() >= data[i].needNum) 
			{
				data[i].sortId = (Number(data[i].id)) - data.length - 1;
			}
			else 
			{
				data[i].sortId = Number(data[i].id);
			}
        }		
		data.sort((a, b) => { return a.sortId - b.sortId });
		return data;
	}
    //是否已领取进度奖励
    public isGetAchievementById(id:string):boolean
	{
		if(this.ainfo&&this.ainfo.flags && this.ainfo.flags[id])
		{
			return true; 
		}
		return false;
    }	
    public getProcess():number
	{
        return this.v;
    }	
	public getAchieveNum():number
	{
		let num = 0;
		if(this.ainfo && this.ainfo.v){
			num = this.ainfo.v;
		}
		return num;
	}
    public isShowAchieveDot():boolean
	{
        let data = this.cfg.getAchieveList();
        for (let i=0; i < data.length; i++)
		{
            if (!this.isGetAchievementById(String(data[i].id)))
			{
                if (this.getAchieveNum() >= data[i].needNum)
				{
                    return true;
                }
            }
        }
        return false;
    }
	public getAchieveStatus(i:number):number
	{
		let data = this.cfg.getAchieveList();
		data.sort((a:any,b:any)=>
		{
			return a.id - b.id;
		});
		if (!this.isGetAchievementById(String(data[i].id)))
		{
			if (this.getAchieveNum() >= data[i].needNum)
			{
				return 2;
			}else
			{
				return 1;
			}
		}
		return 3;	
	}
	public get isShowRedDot():boolean
	{
		let b = this.isShowRechargeDot() || this.isShowAchieveDot();
		if(b)
		{
			return b;
		}
		if(!this.checkIsInEndShowTime())
		{
			return this.getProcess() > 0 || this.isfree > 0;
		}
		return false;
	} 


	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public dispose():void 
	{ 
		this.rinfo = null;
		this.ainfo = null;
		this.isfree = null;
		super.dispose();
	}
}