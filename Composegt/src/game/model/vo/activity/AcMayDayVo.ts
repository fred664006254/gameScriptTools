class AcMayDayVo extends AcBaseVo
{
	private ainfo:any=null;
	private binfo:any =null;
	private cinfo:any =null;
	private cinfoTask:number = 0;
	private cinfoFlag= null;
	private isfree : boolean = false;

	 
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
		this.isfree = data.isfree;
		 
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}

		if(data.binfo)
		{
			this.binfo = data.binfo;
		}

		if(data.cinfo)
		{
			this.cinfo = data.cinfo;
			if(data.cinfo.task)
			{
				this.cinfoTask = data.cinfo.task;
			}
			if(data.cinfo.flags)
			{
				this.cinfoFlag = data.cinfo.flags;
			}
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAYDAY_FRESH_ITEM);
  
	}

	//获取抽奖的次数
	public getTurnTotal():number
	{
		return 	this.ainfo.v;
	}

	//获取累积充值数目
	public getChargeNum():number{
		return Number(this.binfo.v);
	}

	//获取任务完成次数
	public getTask(type:number):number
	{
		if(this.cinfoTask[type])
		{
			return this.cinfoTask[type];
		}
		return 0;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(key:number):boolean
	{
		if(this.cinfoFlag[key]&&this.cinfoFlag[key] == 1)
		{
			return true;
		}
		return false;
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
	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.binfo&&this.binfo.flags)
		{
			for(let key in this.binfo.flags)
			{
				if(this.binfo.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
	}

	private get cfg() : Config.AcCfg.MayDayCfg{
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
		//免费抽奖
		if(this.isFree()){
			return true;
		}
		return false;
	}

	public  getpublicRedhot2():boolean
	{	
		//充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false){
				return true;
			}
		}
		return false;
	}

	public  getpublicRedhot3():boolean
	{	
		//任务
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		for(var i:number= 0;i < cfg.task.length; i++)
		{
			let unit = cfg.task[i];
			let taskNum = this.getTask(unit.questType);
			let taskBoo = this.isGetTaskReward(i + 1);
			if(taskNum >= unit.value && taskBoo == false)
			{
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
		
		if(this.getpublicRedhot2())
		{
			return true; 
		}

		if(this.getpublicRedhot3())
		{
			return true; 
		}
		return false; 
	} 

	public isFree():boolean
	{
		let in_acty = GameData.serverTime < (this.et - 86400);
		return this.isfree && in_acty;
	}
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.MayDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
							if(currObj.questType ==1)
							{
								let openDay  = App.DateUtil.getActivityDay(this.et,this.st)-1;
								if(openDay <currObj.value)
								{
									continue;
								}
							}
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
	 
	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.cinfoFlag = null;
	}
}