class AcAllianceRechargeVo extends AcBaseVo
{

	// model信息
	// renum  充值人数
	// rechargeFlag 自己是否充值
	// flags 领奖记录
	//次数奖励情况
	private renum:number =0;
	private rechargeFlag: number = 0;
	private flags:any[] = [];
	private rtotal:number = 0;
	
	
 

	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.AllianceRechargeCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		} 
		if(data.flags)
		{
			this.flags =data.flags;
		}
		if(data.renum)
		{
			this.renum =data.renum;
		}
		if(data.rechargeFlag)
		{
			this.rechargeFlag = data.rechargeFlag; 
		} 
		if(data.rtotal)
		{
			this.rtotal = data.rtotal;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ALLIANCERECHARGE_REFRESHVO);
  
	}
	public getRechargeFlag():number
	{
		return this.rechargeFlag;
	}

	public getRenum():number
	{
		return Number(this.renum);
	}
	
	public getRtotal():number
	{
		return Number(this.rtotal);
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400*1;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isActivityPeriod():boolean
	{
		if(GameData.serverTime>this.et-86400*1)
		{
			return false;
		}
		else
		{
			return true;
		}
		
	}
	public isActivityPeriod2():boolean
	{
		if(GameData.serverTime>this.et)
		{
			return false;
		}
		else
		{
			return true;
		}
		
	}
	/*累积充值领取判断*/
	public isGetRecharge(id:string|number):boolean
	{	
		id = String(id);
		if(this.flags)
		{
			for(let key in this.flags)
			{
				if(this.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}
	

	public get isShowRedDot(): boolean 
	{	
		
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		// let curTurn = this.renum;
		let chargeCount : number = this.getRtotal();
        let chargeTotal : number = this.getRenum();

		for(let i in cfg.countReward){
			let unit = cfg.countReward[i];

			let boo = false;
			if(unit.count > 0){
				 if(chargeCount >= unit.count){
					 boo = true;
				 }
			} else {
				if(chargeTotal >= unit.total){
					boo = true;
				}
			}


			if(boo && this.isGetRecharge(i) == false&&this.getRechargeFlag()==1){
				return true;
			}
		} 
		return false;  
	}  
	public dispose():void 
	{ 
		this.flags =null;
		this.rechargeFlag=null;
		this.renum =null;
		this.rtotal = null;

	}
}
