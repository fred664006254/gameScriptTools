class AcOneYearRankVo extends AcBaseVo
{
	public acinfo:{akey:string,aid:string,st:number,et:number,atype:number } = undefined;
	public firstinfo:{uid:number,pic:string,name:string,zid:number} = undefined;

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		let olduid = this.firstinfo && this.firstinfo.pic;
		for(let key in data){
			this[key]=data[key];
		}
		let newuid = this.firstinfo && this.firstinfo.pic;
		//可以理解为冲榜结束，产生赢家
		if(this.acinfo.et < GameData.serverTime && newuid != olduid ){
			App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONERANK_VO_CHANGE);
		}
	}

	private get cfg() : Config.AcCfg.OneYearRankCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get acTimeAndHour():string
	{	
		let et = this.acinfo.et-86400
		return App.DateUtil.getOpenLocalTime(this.acinfo.st,et,true);
	}
	public get acCountDown():string
	{
		return App.DateUtil.getFormatBySecond(Math.max(0,(this.acinfo.et - GameData.serverTime - 86400)),1);
	}
	public get isShowRedDot():boolean
	{
		return false;
	}

	public dispose():void 
	{ 
		this.firstinfo = null;
		this.acinfo = null;
	}
}