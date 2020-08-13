class AcRechargeBoxSPVo extends AcBaseVo
{
	private ainfo:any = null;
	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.RechargeBoxSPCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
	public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}
	/**
	 * 通过id 得到领取次数
	 */
	public getReceiveNumById(id:string):number
	{
		if(this.ainfo.stags[id]){
			return this.ainfo.stags[id];
		} else {
			return 0;
		}
	}
	/**
	 * 通过充值档位 领取的次数
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
		let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code)
		if(!cfg)
		{
			return false;
		}

		let boxList = cfg.getBoxListBaseData();
		for(let i = 0; i < boxList.length; i ++)
		{
			let itemCfg = boxList[i];
			
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






		// let cfg = <Config.AcCfg.RechargeBoxSPCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code)
		// if(!cfg)
		// {
		// 	return false;
		// }
		// for(let i = 0;i < cfg.getBoxListData().length; i++ )
		// {
		// 	let itemCfg = cfg.getBoxListData()[i];
		// 	let rechargeNum = this.getBoxReChargeNum(itemCfg.needGem);
		// 	let receiveNum = this.getBoxReceiveNum(itemCfg.needGem);
		// 	if(receiveNum < Number(itemCfg.limit))
		// 	{
		// 		if(rechargeNum > receiveNum)
		// 		{
		// 			return true;
		// 		}
				
		// 	}
		// }
		// return false;
	}

	public dispose():void 
	{ 
		this.ainfo = null;
		super.dispose();
	}
}