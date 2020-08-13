class AcBankBoxVo extends AcBaseVo
{
	public v:number=0;
	public flags={};
	public bankBox:any =null;
	public item : any = {};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key]; 
			if(data.flags)
			{
				this.flags =data.flags;
			}
			if(data.v)
			{
				this.v =data.v;
			}
		} 
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ANNIVERS_REFRESH);
	
	}

	/**
	 * 通过充值档位 获得充值的次数
	 */
	public getBoxReChargeNum(gears:string):number
	{
		if(this.v[gears])
		{
			return this.v[gears]
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
		if(this.flags[gears])
		{
			return this.flags[gears]
		}
		else
		{
			return 0;
		} 
	}

	public getLimitBuyNum(id : number):number{
		let buyNum = 0;
		let info : any = this.item;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;  
    }
	public get isShowRedDot(): boolean
	{
		let deltaT = this.et - GameData.serverTime;
        if(deltaT < 0){
            return false;
        }
		let cfg = <Config.AcCfg.BankBoxCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code)
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
				if(rechargeNum > receiveNum&&this.isStart)
				{
					return true;
				} 
			}
		}
		return false;
	} 
	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	} 
	public dispose():void
	{
		this.bankBox =null;
	}
}
