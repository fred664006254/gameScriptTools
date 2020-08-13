class AcWishTreeVo extends AcBaseVo
{
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		let isNextDay = false;
		if(this["discount"] == 1 && data["discount"] == 0)
		{
			isNextDay = true; // 跨天刷新
		}
		for(let key in data)
		{
			this[key]=data[key];
		}
		if(isNextDay)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WISHTRER_NEXTDAY);
		}
	}
	public get isShowRedDot():boolean
	{
		let itemNum = Api.itemVoApi.getItemNumInfoVoById("2102");
        if (itemNum > 0 )
        {
			let cfg  = <Config.AcCfg.WishTreeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
			if(!cfg)
			{
				return false;
			}
			let numL = cfg.getLastWishTimes();
			if(numL > 0)
			{
				return true;
			}
		}
		return false;
	}

	public getDiscount()
	{
		return this["discount"];
	}
}