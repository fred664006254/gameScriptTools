class AcOneYearSignVo extends AcBaseVo
{

	public constructor() 
	{
		super();
	}
	public flags:{string:number}[] = [] ;
	public taskinfo:{string:number} = undefined;
	public initData(data:any):void
	{
		let oldDnum = this.dayNum;
		for(let key in data){
			this[key]=data[key];
		}
		let newDnum = this.dayNum;
		if(newDnum > oldDnum){
			App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONESIGN_VO_CHANGE);
		}
	}

	//登录了几天
	public get dayNum()
	{
		return this.taskinfo ? this.taskinfo["1"] : 0 ;
	}
	//某天是否领取奖励
	public dayFlags(day:number|string)
	{
		return this.flags[""+day] || 0;
	}
	private get cfg() : Config.AcCfg.OneYearPackCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		let dayNum = this.dayNum;
		if(!dayNum || dayNum == 0){
			return false;
		}
		for (let day = 1; day <= dayNum; day++) {
			if(! this.dayFlags(day)){
				return true;
			}
		}
		return false;
	}

	public dispose():void 
	{ 
		this.flags = null ;
		this.taskinfo = null ;
	}

}