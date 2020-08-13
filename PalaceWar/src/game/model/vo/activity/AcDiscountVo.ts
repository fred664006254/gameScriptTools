class AcDiscountVo extends AcBaseVo
{	
	/**买了几次 只有 月卡有 */
	private hasBuy:number = 0;
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
	/**月卡买了几次 */
	public getHasBuy()
	{
		return this.hasBuy;
	}
	public getMouthLimitNum()
	{
		let num = 0
		let mouthCfg = <Config.AcCfg.DiscountCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(mouthCfg&&mouthCfg.limit){
			return mouthCfg.limit - this.hasBuy;
		}
		return num;
	}
	public checkBuyMouth()
	{
		let mouthCfg = <Config.AcCfg.DiscountCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(mouthCfg&&mouthCfg.limit >this.hasBuy){
			return true;
		}
		return false;
	}

	public get isShowRedDot():boolean
	{
		return false;
	}
	/**
	 * 活动开始结束时间，格式：x月x日-x月x日
	 */
	public get acTime():string
	{
		let loopTime = Number(Config.GameprojectCfg.cycle[this.aid + "_" + this.code]);
		if(Api.switchVoApi.checkOpenDiscountLoopTime()&&loopTime)
		{
			let newSt = GameData.serverTime - (GameData.serverTime - this.st) % (loopTime);
			let newEt = (newSt + loopTime) < this.et ? (newSt + loopTime) :this.et;
			return App.DateUtil.getOpenLocalTime(newSt,newEt,false);
		}
		else
		{
			return egret.superGetter(AcDiscountVo,this,"acTime");
		}
	}
	public dispose():void
	{
		this.v = 0;
		this.hasBuy = 0;
		super.dispose();
	}
}