class AcCrossServerGemExpendVo extends AcBaseVo
{
	 
	public	v: number;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	private get cfg() : Config.AcCfg.CrossServerGemExpendCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public get acTimeAndHour():string
	{	
		let extraTime = this.config.extraTime;
		let et = this.et-(86400 * extraTime);
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}


	public get isShowRedDot():boolean
	{
		return false;
	}

	public isInActivity():boolean{
		let extraTime = this.config.extraTime;
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	
	public isInExtra(): boolean {
		if (this.isInActivity()&&this.config) {
			let extraTime = this.config.extraTime;
			if (extraTime) {
				return GameData.serverTime > this.et - 86400 * extraTime
			}
		}
		return false
	}

	public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
	}
	
	public dispose():void 
	{ 
		super.dispose();
	}
}