class AcTailorVo extends AcBaseVo
{
	private showTime:number = 0;;
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
	public get isShowRedDot():boolean
	{
		return false;
	}
	public getFreeNum()
	{
		return this["freeNum"];
	}
	public getShowTimeList()
	{
		let cfg = <Config.AcCfg.TailorCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let showTimeList: Object = {};
		for (let key in cfg.showTime) {
			if (cfg.showTime[key] <= this.showTime) {
				if (Config.WifeskinCfg.isSkinOPend(key)) {
					showTimeList[key] = cfg.showTime[key];
				}

			}
		}
		return showTimeList;
	}
	public dispose():void
	{
		this.v = 0;
		this.showTime = 0;
		super.dispose();
	}
}