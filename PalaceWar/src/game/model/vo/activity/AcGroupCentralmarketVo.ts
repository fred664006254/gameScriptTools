class AcGroupCentralmarketVo extends AcGroupBaseVo
{

	//次数
	private total:number = 0; 
	private cinfo:any[] = []; 
	//次数奖励情况
	private numflags:any[] = [];

	//最新看到的中奖版本
	private seewinnum: number = 0;
	private chargeNum:number =0;
	private getFlag = null;



	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.LotteryCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	// public initData(data:any):void
	// {
		// for(let key in data)
		// {
		// 	this[key]=data[key];
		// }

		// let arr =	this.getAcVoList();
		// console.log("aclotteryvo--->initdata");
		// if(data.chargeNum)
		// {
		// 	this.chargeNum =data.chargeNum;
		// }
		// if(data.getFlag)
		// {
		// 	this.getFlag =data.getFlag;
		// }
		
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LOTTERY_REFRESHVO);
		// this.getAcVoList();
  
	// }
	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.getFlag)
		{
			for(let key in this.getFlag)
			{
				if(this.getFlag[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}
	
	public isCollected(boxId:number): boolean{
		
		if(this.numflags && this.numflags[boxId.toString()] && this.numflags[boxId.toString()] == 1){
			return true;
		} else {
			return false;
		}  
	}
	public showRed():boolean
	{
	 	let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curTurn = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curTurn >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false){
				return true;
			}
		} 
		return false; 
	}
	public getChargeNum():number{
		return Number(this.chargeNum);
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
			if(curTurn >= unit.needNum && this.isCollected(Number(i) + 1) == false||this.showRed()){
				return true;
			}
		} 
		return false;  
	}  
	public dispose():void 
	{ 
		this.seewinnum =0;
		this.total=0;
		this.getFlag =null;

	}
}