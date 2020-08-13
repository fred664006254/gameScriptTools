class AcRechargeBoxVo extends AcBaseVo
{
	private ainfo:any = null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}

	}
	/**
	 * 通过充值档位 获得充值的次数
	 */
	public getBoxReChargeNum(gears:string):number
	{
		if(this.ainfo.v[gears])
		{
			return this.ainfo.v[gears]
		}
		else
		{
			return 0;
		}

	}

	/**
	 * 通过充值档位 获得充值的次数
	 */
	public getBoxReceiveNum(gears:string):number
	{
		if(this.ainfo.flags[gears])
		{
			return this.ainfo.flags[gears]
		}
		else
		{
			return 0;
		}

	}
	 
	/**
	 * 活动时间  不需要显示展示期
	 */
	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	public get isShowRedDot(): boolean
	{
		let deltaT = this.et - GameData.serverTime;
        if(deltaT < 0){
            return false;
        }
		let cfg = <Config.AcCfg.RechargeBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code)
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.getBoxListData().length; i++ )
		{
			let itemCfg = cfg.getBoxListData()[i];
			let rechargeNum = this.getBoxReChargeNum(itemCfg.needGem);
			let receiveNum = this.getBoxReceiveNum(itemCfg.needGem);
			if(receiveNum < Number(itemCfg.limit))
			{
				if(rechargeNum > receiveNum)
				{
					return true;
				}
				
			}
		}
		return false;
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	//倒计时
	public getCountDown():number{
		return this.et - GameData.serverTime;
	}

	public dispose():void 
	{ 
		this.ainfo = null;
		super.dispose();
	}
}