class AcLotteryVo extends AcBaseVo
{

	//次数
	private total:number = 0;

	//每轮参与次数{"1":{st:xx,num:xx},"2":{st:xx,num:xx}}
	private cinfo:any[] = [];

	//次数奖励情况
	private numflags:any[] = [];

	//最新看到的中奖版本
	private seewinnum: number = 0;



	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.LotteryCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LOTTERY_REFRESHVO);
  
	}
	
	public isCollected(boxId:number): boolean{
		
		if(this.numflags && this.numflags[boxId.toString()] && this.numflags[boxId.toString()] == 1){
			return true;
		} else {
			return false;
		}

	

	}
	public get totalCount(): number{
		return this.total;
	}
	public get isShowRedDot(): boolean 
	{	
		
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


	


	
	 
	public dispose():void 
	{ 

	}
}