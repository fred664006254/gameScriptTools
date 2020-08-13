class AcBlackMarketVo extends AcBaseVo
{
	public v:number=0;
	public flags={};
	public bankBox:any =null;
	public item : any = {};
	public cinfo : any = {};
	public isTouch = null;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];  
			this.cinfo =data.cinfo;
		} 
		if(this.isReList==false)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BLACKMARKET_REFRESH); 
		} 
	
	}

	//获取累积充值数目
	public getChargeNum():number{
		if(this.cinfo.chargeNum)
		{
			return Number(this.cinfo.chargeNum);
		}
		return 0;
		
	}
	public get isReList():boolean
	{
		if(this.isTouch!=null)
		{
			return true;
		}
		return false;
	}
	public getLimitBuyNum(id : number):number{
		let buyNum = 0;
		let info : any = this.cinfo;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum; 
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	} 

	public dispose():void
	{
		this.bankBox =null;
		this.isTouch = null;
	}
}
