class AcAllianceRechargeTotalVo extends AcBaseVo
{ 
	private flags:any[] = []; 
	private rechargeFlag: number = 0;
	private renum:number =0;
	public index:number=-1;
 

	public constructor() 
	{
		super();
	}
	private get cfg() : Config.AcCfg.AllianceRechargeTotalCfg{
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_AID_AllIANCERECHARGECOUNT_FRESH2);
  
	}
	public getRechargeFlag():number
	{
		return this.rechargeFlag;
	}

	public getChargeNum():number
	{
		return Number(this.renum);
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
	public isGetRecharge(id:number):boolean
	{	
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
		let curTurn = this.renum;
		for(let i in cfg.countReward){
			let unit = cfg.countReward[i];
			if(curTurn >= unit.total && this.isGetRecharge(Number(i) + 1) == false && this.getRechargeFlag() == 1){
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
		this.index = -1;
	}
}
