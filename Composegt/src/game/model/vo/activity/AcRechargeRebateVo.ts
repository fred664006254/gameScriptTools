class AcRechargeRebateVo extends AcBaseVo
{
	private buyinfo:{[key:string]:number};
	private stageinfo:{[key:string]:number};
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RECHARGEREBATE_REFRESH_V);
	}
	/** 获取某档位可以领取多少次 */
	public getCollectNum(rechargeKey) {
		// 充过多少次
		let rechargeCount = 0;
		// 领过多少次
		let getCount = 0;
		if (this.buyinfo && this.buyinfo[rechargeKey]) {
			rechargeCount = this.buyinfo[rechargeKey];
		}
		if (this.stageinfo && this.stageinfo[rechargeKey]) {
			getCount = this.stageinfo[rechargeKey];
		}
		return rechargeCount - getCount;
	}
	private get cfg() : Config.AcCfg.RechargeRebateCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		if(!this.cfg)
		{
			return false;
		}
		let list = this.cfg.getList();
		for (var key in list) {
			if (list.hasOwnProperty(key)) {
				if (this.getCollectNum(list[key].needGem) > 0) {
					return true;
				}				
			}
		}
		return false;
	}

	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose():void 
	{ 
		super.dispose();
	}
}