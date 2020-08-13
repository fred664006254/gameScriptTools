class AcSpringCelebrateVo extends AcBaseVo
{

	private ainfo:any=null;
	private bininfo:any =null;
	private cinfo:any =null;
	private dinfo:any =null;
	private cinfoTask:number = 0;
	private cinfoReward = null;

	 
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

		if(data.binfo)
		{
			this.bininfo = data.binfo;
		}

		if(data.cinfo)
		{
			this.cinfo = data.cinfo;
	
			if(data.cinfo.task)
			{
				this.cinfoTask = data.cinfo.task;
			}
			if(data.cinfo.reward)
			{
				this.cinfoReward = data.cinfo.reward;
			}
		}

		if(data.dinfo)
		{
			this.dinfo = data.dinfo;
		}  
		
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_SPRING_ITEM);
  
	}

	//获取充值的钱数
	public getAinfoV():number
	{
		return 	this.ainfo.v;
	}

	//获取几天||获取任务完成次数
	public getTask(type:number):number
	{
		if(this.cinfoTask[type])
		{
			return  this.cinfoTask[type];
		}
		return 0;
	} 

	// 页签3 是否领取奖励 false没有领取
	public isGetRecharge(key:number):boolean
	{
		if(this.cinfoReward[key]&&this.cinfoReward[key]==1)
		{
			return  true;
		}
		return false;
	} 



	

	// 1 充值页面已经领过 false
	public  getReceiveType(id:number):boolean
	{	
		if(this.ainfo&&this.ainfo.reward)
		{
			for(let key in this.ainfo.reward)
			{
				if(this.ainfo.reward[id]==1)
				{
					return false;
				}
			}
			return true; 
		} 
	}

	//页面2  已经兑换次数
	public  getExchangeNum(id:number):number
	{	
		if(this.bininfo)
		{
			if(this.bininfo[id])
			{
				return this.bininfo[id];
			}
		} 
		return 0;
	}

	//页面4  已经兑换次数
	public  getExchange4Num(id:number):number
	{	
		if(this.dinfo)
		{
			if(this.dinfo[id])
			{
				return this.dinfo[id];
			}
		} 
		return 0;
	}
 
 
	public getpublicRedhot1():boolean
	{
		let rechargeArr =  this.getArr("recharge"); 	
		for(var i:number=0;i<rechargeArr.length;i++)
		{
			let num =Number(rechargeArr[i].key);
			if(this.getReceiveType(num)==true)	
			{
				if(this.getAinfoV()>=rechargeArr[i].needGem)
				{
					return true;
				}
			} 
		}
		return false;
	}

	public  getpublicRedhot2():boolean
	{	
		let rechargeArr = this.getArr("exchange");
		for(var i:number= 0;i<rechargeArr.length; i++)
		{
			let exchangeNum = this.getExchangeNum(rechargeArr[i].key);
			if(exchangeNum!=rechargeArr[i].limit)
			{
				let currNum = Api.itemVoApi.getItemNumInfoVoById(rechargeArr[i].needItem);
				if(currNum>=rechargeArr[i].needNum)
				{
					return true;
				}
			
			} 
		}
		return false; 
	}

	public  getpublicRedhot3():boolean
	{	
		let taskArr = this.getArr("task");
		for(var i:number= 0;i<taskArr.length; i++)
		{
			let taskNum = this.getTask(taskArr[i].questType);
			let taskBoo = this.isGetRecharge(taskArr[i].key);
			if(taskNum>=taskArr[i].value&&taskBoo==false)
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
  
	// 是否在最后一天兑换天数内
	public isExchange():boolean
	{
	  let springCelebrateVo = <AcSpringCelebrateVo>Api.acVoApi.getActivityVoByAidAndCode(AcSpringCelebrateView.AID,AcSpringCelebrateView.CODE); 
	  if(GameData.serverTime>springCelebrateVo.et-86400)
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

	public  getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return [];
		}
		let celeBrateList  = cfg.getItemListCfg2();  

		for(var i:number=0;i< celeBrateList.length;i++)
		{
			if(celeBrateList[i].key == key)
			{	
				
				for(var key2 in celeBrateList[i])
				{	
					if(celeBrateList[i][key2])
					{
						var currObj =  celeBrateList[i][key2]
						if(currObj.needGem||currObj.questType||currObj.discount||currObj.limit)
						{
							//处理questType带有登陆任务天数的活动，能否根据开时间，来显示登陆天数的奖励；
							if(currObj.questType ==1)
							{
								// let openDay = Math.floor((this.et-this.st)/86400)
								let openDay = App.DateUtil.getActivityDay(this.et,this.st) - 1;
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
		this.bininfo = null;
		this.cinfo = null;
		this.dinfo = null;
	}
}