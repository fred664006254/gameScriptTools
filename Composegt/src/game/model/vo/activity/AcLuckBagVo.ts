class AcLuckBagVo extends AcBaseVo
{
	private p:number=0;             //总充值钻石数
	private lp:number =0;           //当天获得的活跃点数
    private pnum:number = 0;        //充值获得的抽奖次数
	private lnum:number = 0;        //活跃度获得的抽奖次数
	private unum:number = 0;        //使用的抽奖次数
	private sinfo:any = null;


	 
	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.LuckBagCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LUCKBAG_REFRESHVO);
  
	}
	public get totalCount(): number{
		return this.unum;
	}
	public get remainderCount(): number
	{

		return this.pnum + this.lnum - this.unum;
	}

	public isCollected(boxId:number): boolean{
		
		if(this.sinfo && this.sinfo[boxId.toString()] && this.sinfo[boxId.toString()] == 1){
			return true;
		} else {
			return false;
		}


	}
	// private get cfg() : Config.AcCfg.MayDayCfg{
	// 	return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	// }

	


	public get isShowRedDot(): boolean 
	{	
		

		if(this.pnum + this.lnum - this.unum > 0){
			return true
		}
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curTurn = this.totalCount;
		for(let i in cfg.lotteryNum){
			let unit = cfg.lotteryNum[i];
			if(curTurn >= unit.needNum && this.isCollected(Number(i) + 1) == false){
				return true;
			}
		}


		return false; 
	} 


	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	
	 
	public dispose():void 
	{ 
	    this.p = 0;             //总充值钻石数
        this.lp = 0; 
        this.pnum = 0; 
        this.lnum = 0; 
        this.unum = 0; 
	}
}