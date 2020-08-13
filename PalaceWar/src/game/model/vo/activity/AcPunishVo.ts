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
	//新增 暴击位置
	public crit:number = 1;
	//新增 体力
	public energy:number = 0;
	//新增 道具使用情况
	public useNum:any = null;

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
		//return false;
		return this.checkHasGoldenTimes();
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

	public get day():number{
		let st = this.st;
		return Math.ceil((GameData.serverTime - st) / 86400);

	}

	//倒计时
    public getCountDown():string{
        let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}

	//道具使用数量
	public getToolUseNum(id:String|number):number{
		if (this.useNum && this.useNum[""+id]){
			return this.useNum[""+id];
		}
		return 0;
	}

	//是否在活动期间内 活动最后一天的22时之后活动结束
	public isInActivity():boolean{
		if(this.isStart)
		{
			let et = this.et;
			if(this.config && this.config.extraTime){
				et = this.et - (this.config.extraTime)*86400;
			}
			if (GameData.serverTime > et){
				return false;
			}
			if (this.config && this.config.activeTime[1]){
				let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
				et = zeroTime + this.config.activeTime[1] * 3600;
			}
			// App.LogUtil.log("punish et: "+et + " GameData.serverTime: "+GameData.serverTime);
			if(et > GameData.serverTime)
			{
				return true;
			}
		}
		return false;
	}

	//是否在每天的活动时间内 1 未开启  2 已结束 3 进行中 4 活动结束
	public inDayOpenState():number{
		if (this.isInActivity()){
			let zeroTime = App.DateUtil.getWeeTs(GameData.serverTime);
			if (GameData.serverTime - zeroTime < 3600 * this.config.activeTime[0]){
				return 1;
			}
			else if(GameData.serverTime - zeroTime > 3600 * this.config.activeTime[1]){
				return 2;
			}
			else{
				return 3;
			}
		}
		return 4;
	}

	public checkHasGoldenTimes():boolean
	{	
		let cfg = <Config.AcCfg.PunishCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let onecfg = cfg.punishList[1];
		let maxNum = onecfg.buyLimit;
		let num = 0;
		if(this.item["1"]){
			num = this.item["1"];
		}
		if (num>=maxNum)
		{
			return false;
		}
		if (this.isInActivity())
		{
			return true;
		}
		return false;
	}

	//是否在每天的活动开启
	
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
		this.crit = 1;
		this.energy = 0;
		this.useNum = null;
	}
}