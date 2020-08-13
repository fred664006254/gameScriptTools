class AcRescueVo extends AcBaseVo
{	
	//营救红颜:每日道具购买信息
	public item:any;
	//营救红颜:商店购买信息
	public shop:any;
	//营救红颜:"营救红颜:商店积分
	public score:number = 0;
	//营救红颜:"营救红颜:活跃积分
	public v:number = 0;
	//营救红颜:今日击杀奖励是否已领取
	public get:boolean  = false;
	//暴击连击信息
	public critical:number = 0;
	//当前暴击ID
	public criticalIndex:number = 0;
	//当前体力
	public power:number = 0;
	//领取奖励进度信息
	public rflage:{[key:string]:number};
	//当日充值的钻石数
	public daygemnum:number = 0;
	//已领取的充值奖励信息
	public rechangeindex:string;
	public interim:any;
	
	//每日充值的钻石数
	// public power:number = 0;
	//当前体力
	// public power:number = 0;
	// public rflage:{[key:string]:number};

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
		if(data.critical != null)
		{
			this.critical = data.critical;
		}
		if(data.criticalIndex != null)
		{
			this.criticalIndex = data.criticalIndex;
		}
		if(data.power != null)
		{
			this.power = data.power;
		}
		if(data.rflage != null)
		{
			this.rflage = data.rflage;
		}
		if(data.daygemnum != null)
		{
			this.daygemnum = data.daygemnum;
		}
		if(data.rechangeindex != null)
		{
			this.rechangeindex = data.rechangeindex;
		}
		
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
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

	public getRechargeText():string
	{
		let str = LanguageManager.getlocal("rescueGetMaxTip");
		let activeCfg:Config.AcCfg.RescueCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);

		// 没领取完
		let nextIndex = (Number(this.rechangeindex) + 1).toString()
		if(activeCfg.rechangeReward[nextIndex]){
			//可领取
			if(this.daygemnum >= activeCfg.rechangeReward[nextIndex].needGem)
			{
				let rewardItemvo:RewardItemVo = GameData.formatRewardItem( activeCfg.rechangeReward[nextIndex].reward)[0];
				str = LanguageManager.getlocal("rescueGetCurRechargeTip",[rewardItemvo.num.toString()])
			}else{
				let lessNum = activeCfg.rechangeReward[nextIndex].needGem - this.daygemnum
				let rewardItemvo:RewardItemVo = GameData.formatRewardItem( activeCfg.rechangeReward[nextIndex].reward)[0];
				str = LanguageManager.getlocal("rescueGetRechargeTip",[lessNum.toString(),rewardItemvo.num.toString()])
			}
		}else{
			str = LanguageManager.getlocal("rescueGetMaxTip");
		}
		
		return str;
	}
	/**
	 * 1 未领取 2未完成 3领取完成
	 */

	public getRechargeState():number
	{	
		let state = 0;
		let activeCfg:Config.AcCfg.RescueCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);

		//没领取完
		let nextIndex = (Number(this.rechangeindex) + 1).toString()
		if(activeCfg.rechangeReward[nextIndex]){
			//可领取
			if(this.daygemnum >= activeCfg.rechangeReward[nextIndex].needGem)
			{
				state = 1;
			}else{
				state = 2;
			}
		}else{
			state = 3;
		}
		return state;
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