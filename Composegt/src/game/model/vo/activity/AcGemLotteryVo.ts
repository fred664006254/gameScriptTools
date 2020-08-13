class AcGemLotteryVo extends AcBaseVo
{
	private num:number = 0; 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data){
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_GEMLOTTERY_FRESH_ITEM);
	}

	private get cfg() : Config.AcCfg.GemLotteryCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get havenum():number
	{
		return this.num || 0;
	}
	
	public get isShowRedDot():boolean
	{
		if(this.isInActivity() && this.num && this.num > 0){
			return true;
		}
		return false;
	}
	public isInActivity(): boolean {
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

	public dispose():void 
	{ 
		this.num = 0;
	}
}