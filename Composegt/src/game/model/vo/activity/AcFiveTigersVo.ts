class AcFiveTigersVo extends AcBaseVo
{
	// 红莲勇士 玩家充值元宝数"
	public chargenum:number = null;
	// 红莲勇士 玩家本次活动获得头盔数
	public thenum:number = null;
	// 红莲勇士 玩家剩余可突击次数
    public lotterynum:number = null;
    public lotterysnum:number = null;
	// 红莲勇士 玩家以往累积数
	public accumulatenum:number = null;
	// 抽奖次数领取
	public stageinfo:any = null;

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_FIVETIGERS_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.FiveTigersCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public get acCountDown(): string {
		let et = this.et - (this.config.extraTime||0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return LanguageManager.getlocal("acChaseBanditTopTime",[App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8)]);
	}
	public get isShowRedDot():boolean
	{
        if(!this.cfg)
		{
			return false;
		}
		if(this.lotterynum > 0 && this.lotterysnum < this.cfg.exchangeNum){
			return true;
		}
		let helmetNum = this.cfg.progress;
		for(let i = 0; i < helmetNum.length;i++){
			if(helmetNum[i].needNum <= this.lotterysnum && (!this.stageinfo[i+1])){
				return true;
			}
		}

		return false;
	}

	public checkBoxCollected(boxIndex):boolean
	{
		if(this.stageinfo[boxIndex+1]){
			return true;
		} 
		return false;
	}

	public maxHelmetNeedNum():number
	{

		return this.cfg.exchangeNum;
	}

	public get acTimeAndHour():string
	{	
		let et = this.et;
		return LanguageManager.getlocal("acChaseBanditTopDate",[App.DateUtil.getOpenLocalTime(this.st,et,true)]);
	}

	public isInActivity():boolean{ 
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose():void 
	{ 
		this.v = null;
	// 红莲勇士 玩家本次活动获得头盔数
		this.thenum = null;
	// 红莲勇士 玩家剩余可突击次数
		this.lotterynum = null;
	// 红莲勇士 玩家以往累积数
		this.accumulatenum = null;
	// 红莲勇士 得到头盔数"
		this.lotterysnum = null;
	// 抽奖次数领取
		this.stageinfo = null;
		super.dispose();
	}
}