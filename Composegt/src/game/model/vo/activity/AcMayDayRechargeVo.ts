class AcMayDayRechargeVo extends AcBaseVo
{
	public lotterynum:number=0;
	public ainfo:any=null;
	 
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
		 
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAYDAYRECHARGE_FRESH_ITEM);
  
	}

	//获取抽奖的次数
	public getTurnTotal():number
	{
		if (this.ainfo) {
			return this.ainfo.v;
		} else {
			return 0;
		}
	}

	/*转盘进度宝箱领取判断*/
	public isGetTurnProgress(id:number):boolean
	{	
		if(this.ainfo&&this.ainfo.flags)
		{
			for(let key in this.ainfo.flags)
			{
				if(this.ainfo.flags[id] == 1)
				{
					return true;
				}
			}
			return false; 
		} 
	}

	private get cfg() : Config.AcCfg.MayDayRechargeCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getpublicRedhot1():boolean
	{
		//奖励进度宝箱
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curTurn = this.getTurnTotal();
		for(let i in cfg.lotteryNum){
			let unit = cfg.lotteryNum[i];
			if(curTurn >= unit.needNum && this.isGetTurnProgress(Number(i) + 1) == false){
				return true;
			}
		}
		return false;
	}

	public get isShowRedDot(): boolean 
	{	
		if(this.getpublicRedhot1())
		{
			return true; 
		}
		return false; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.MayDayRechargeCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return [];
		}
		let celeBrateList = cfg;  

		for(var i in celeBrateList)
		{
			if(i == key)
			{	
				for(var key2 in celeBrateList[i])
				{	
					if(celeBrateList[i][key2])
					{
						var currObj =  celeBrateList[i][key2]
						if(currObj.needGem||currObj.questType||currObj.discount||currObj.limit)
						{
							celeBrateList[i][key2].key = Number(key2)+1;
							if(celeBrateList[i][key2].key)
							{
								arr.push(celeBrateList[i][key2]); 
							}
						} 
					} 
				} 
			}
		}
		return arr;  
	}
	 
	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public dispose():void 
	{ 
		this.ainfo = null;
	}
}