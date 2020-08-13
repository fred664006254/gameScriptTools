class AcPunishVo extends AcBaseVo
{	
	//惩戒女囚:每日道具购买信息
	public item:any;
	//惩戒女囚:商店购买信息
	public shop:any;
	//惩戒女囚:"惩戒女囚:商店积分
	public score:number = 0;
	//惩戒女囚:"惩戒女囚:活跃积分
	public v:number = 0;
	//惩戒女囚:今日击杀奖励是否已领取
	public get:boolean  = false;

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
		if(data.item != null)
		{
			this.item = data.item;
		}
		if(data.shop != null)
		{
			this.shop = data.shop;
		}
		if(data.score != null)
		{
			this.score = data.score;
		}
		if(data.get != null)
		{
			this.get = data.get;
		}
		if(data.v != null)
		{
			this.v = data.v;
		}
	}
	public get isShowRedDot():boolean
	{
		// let cfgObj = <Config.AcCfg.DailyChargeCfg>Config.AcCfg.getCfgByActivityIdAndCode("dailyCharge","1");
		// let list = cfgObj.getList();
		// for (var key in list) {
		// 	if (!this.flags[key] && list[key]["needGem"] <= this.v)
		// 	{
		// 		return true;
		// 	}
		// }
		return false;
	}
	/**
	 * 活动是否处于进行状态；
	 */
	public get isDuringActive():boolean
	{
		if(this.isStart )
		{
			let et = this.et
			if(this.config && this.config.extraTime){
				et = this.et - this.config.extraTime*86400;
			}
			if(et >= GameData.serverTime)
			{
				return true;
			}
		}
		return false;
	}
	public dispose():void
	{
		this.item = null;;
		//惩戒女囚:商店购买信息
		this.shop = null;;
		//惩戒女囚:"惩戒女囚:商店积分
		this.score = 0;;
		//惩戒女囚:"惩戒女囚:活跃积分
		this.v = 0;
		//惩戒女囚:今日击杀奖励是否已领取
		this.get  = false;
	}
}