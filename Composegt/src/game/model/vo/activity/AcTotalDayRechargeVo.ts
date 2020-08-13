class AcTotalDayRechargeVo extends AcBaseVo
{
	public v:number=0;
	public flags={};
	public level:any;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		let oldV = this.v;
		for(let key in data)
		{
			this[key]=data[key];
		}
		
		if(oldV != null && oldV != this.v){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V);
		}
	}
	public get isShowRedDot():boolean
	{
		let totalDVo = Api.acVoApi.getActivityVoByAidAndCode("totalDayRecharge");
		let cfgObj = <Config.AcCfg.TotalDayRechargeCfg>Config.AcCfg.getCfgByActivityIdAndCode("totalDayRecharge",totalDVo.code);
		if(!cfgObj)
		{
			return false;
		}
		let list = cfgObj.getList();
		// for (var key in list) {
		// 	if (!this.flags[key] && list[key]["needDay"] <= this.v)
		// 	{
		// 		return true;
		// 	}
		// }
		let _seprateNum = 0;
		for (var key in list) {
			let tmpCfg = list[key]; 
			if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
			{
				if(Api.switchVoApi.checkSpecialChargeReward() && !this.flags[key] &&this.v >= list[key]["needGem"] )
				{
					return true;
				}
			}else{
				_seprateNum = tmpCfg.needDay;
				if (!this.flags[key] && list[key]["needDay"] <= this.v)
				{
					return true;
				}
			}
		}
		return false;
	}
	public dispose():void
	{
		this.v = 0;
		this.flags = {};
		this.level = null;
		super.dispose();
	}
}