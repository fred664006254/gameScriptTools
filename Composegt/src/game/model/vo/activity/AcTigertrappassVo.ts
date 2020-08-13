class AcTigertrappassVo extends AcBaseVo
{
	public attacksum:number;
	public attacknum:number;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
	}
	private get cfg() : Config.AcCfg.TigertrappassCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		if (!this.cfg) {
			return false;
		}
		if (this.attacknum > 0 && this.attacksum < this.cfg.num) {
			return true;
		} 

		let costItemId = this.cfg.needChipid;
		let costItemInfo = Api.itemVoApi.getItemInfoVoById(Number(costItemId));

		if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && costItemInfo && costItemInfo.num >= this.cfg.needChipNum) {
			return true;
		}
		return false;
	}


	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public dispose():void 
	{ 
		super.dispose();
	}
}