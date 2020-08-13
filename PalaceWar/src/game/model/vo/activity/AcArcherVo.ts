class AcArcherVo extends AcBaseVo
{
	private ainfo:any=null;
	private binfo:any =null;
	private isfree : number = 0;

	 
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

	/**
	 * 获取抽奖的次数
	 */
	public getArcherNum():number
	{
		return 	this.ainfo.v;
	}
	/**
	 * 获取累积充值数目
	 */
	public getChargeNum():number{
		return this.binfo.v;
	}
	/**
	 * 活动时间
	 */
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	/**
	 * 是否免费
	 */
	public get isFree():boolean
	{
		let deltaT = this.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            return false;
        }
		if(this.isfree == 0)
		{
			return false;
		}
		else
		{
			return true;
		}

	}
	/** 
	 * 充值档位是否已经领取
	*/
	public isReceive(id:number):boolean
	{	
		if(this.binfo.flags[id] == null ||this.binfo.flags[id] == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/** 
	 * 宝箱是否已经领取
	*/
	public isBoxReceive(id:number):boolean
	{	
		if(this.ainfo.flags[id] == null ||this.ainfo.flags[id] == 0)
		{
			return false;
		}
		else
		{
			return true;
		}
	}
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		return this.isFree||this.isHaveRedDot()||this.isHaveRedDot2();
	}
	public isHaveRedDot():boolean
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.recharge.length; i++ )
		{
			if(this.getChargeNum() >= cfg.recharge[i].needGem)
			{
				 if(!this.isReceive(i+1))
				 {
					 return true;
				 }
			}
		}
		return false;
	}

	public isHaveRedDot2():boolean
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.lotteryNum.length; i++ )
		{
			if(this.getArcherNum() >= cfg.lotteryNum[i].needNum)
			{
				 if(!this.isBoxReceive(i+1))
				 {
					 return true;
				 }
			}
		}
		return false;
	}
	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
	}
}