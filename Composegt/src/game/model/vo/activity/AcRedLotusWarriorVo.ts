class AcRedLotusWarriorVo extends AcBaseVo
{
	// 红莲勇士 玩家充值元宝数"
	public v:number = null;
	// 红莲勇士 玩家本次活动获得头盔数
	public thenum:number = null;
	// 红莲勇士 玩家剩余可突击次数
	public attacknum:number = null;
	// 红莲勇士 玩家以往累积数
	public accumulatenum:number = null;
	// 红莲勇士 得到头盔数"
	public chipnum:number = null;
	// 抽奖次数领取
	public flags:any = null;

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REDLOTUSWARRIOR_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.RedLotusWarriorCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
        if(!this.cfg)
		{
			return false;
		}
		if(this.attacknum > 0 && this.chipnum < this.cfg.helmetItemNum){
			return true;
		}
		let helmetNum = this.cfg.helmetNum;
		
		for(let i = 0; i < helmetNum.length;i++){
			if(helmetNum[i].needNum <= this.chipnum && (!this.flags[i+1])){
				return true;
			}
		}

		return false;
	}

	public checkBoxCollected(boxIndex):boolean
	{
		if(this.flags[boxIndex+1]){
			return true;
		} 
		return false;
	}

	public maxHelmetNeedNum():number
	{

		return this.cfg.helmetItemNum;
	}

	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{ 

		// if(Api.servantVoApi.isOwnSkinOfSkinId(""+this.cfg.zhentianSkinId)){
		// 	return false;
		// }
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public isAcTimeOut():boolean
	{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose():void 
	{ 
		this.v = null;
	// 红莲勇士 玩家本次活动获得头盔数
		this.thenum = null;
	// 红莲勇士 玩家剩余可突击次数
		this.attacknum = null;
	// 红莲勇士 玩家以往累积数
		this.accumulatenum = null;
	// 红莲勇士 得到头盔数"
		this.chipnum = null;
	// 抽奖次数领取
		this.flags = null;
		super.dispose();
	}
}