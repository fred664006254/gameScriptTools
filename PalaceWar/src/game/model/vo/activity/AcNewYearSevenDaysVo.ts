class AcNewYearSevenDaysVo extends AcBaseVo
{

	public taskinfo:any=null;
	public scoreinfo:any =null;
	public diffday:number =0; 
	public score:number=0;
	public taskHistory:any=null;
	 
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
		if(data.taskinfo)
		{
			this.taskinfo=data.taskinfo;
		}
		if(data.scoreinfo)
		{
			this.scoreinfo=data.scoreinfo;
		}
		if(data.diffday)
		{
			this.diffday = data.diffday;
		}
		if(data.taskHistory)
		{
			this.taskHistory = data.taskHistory;
		}
		if(data.taskinfo.dayFlag&&data.taskinfo.dayFlag==1)
		{
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_RESFESH_NEWYEAR_ITEM);
  
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

   public get isShowRedDot(): boolean 
	{
		if(this.secondRed()||this.firstRed())
		{
			return true;
		} 
		return false;   
	}
	
	public secondRed():boolean
	{
		if((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st){
			for(let i = 1; i < 8; ++ i){
				if(this.getDayRed(i) && i == this.diffday){
					return true;
				}
			} 
		}
		
		return false;
	}

	public getDayRed(day : number):boolean{
		if((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st){
			let arr =this.getCurrDayData(day-1);  
			if(this.diffday == day){
				if(this.taskinfo&&this.taskinfo.dayFlag&&this.taskinfo.dayFlag==1)
				{
					return true;
				} 
				else
				{
					for(var i:number =0;i<arr.length; i++)
					{
						if(this.getIdflag(arr[i].questType)==1)
						{
							return true;
						}
					}
				}
			}
			else{
				if(this.taskHistory){
					for(let i in this.taskHistory){
						let day = Number(i);
						let info = this.taskHistory[i];
						if(info&&info.dayFlag&&info.dayFlag==1)
						{
							return true;
						} 
						else
						{
							for(let j:number =0;j<arr.length; j++)
							{
								if(this.getIdflagByDay(arr[j].questType, day)==1)
								{
									return true;
								}
							}
						}
					}
				}
			}
		}
		return false;
	}

	public getDayTaskRed(day : number):boolean{
		if((GameData.serverTime < (this.et - 1 * 86400)) && GameData.serverTime >= this.st){
			let arr =this.getCurrDayData(day-1);  
			if(this.diffday == day){
				for(var i:number =0;i<arr.length; i++)
				{
					if(this.getIdflag(arr[i].questType)==1)
					{
						return true;
					}
				}
			}
			else{
				if(this.taskHistory){
					for(let i in this.taskHistory){
						let day = Number(i);
						let info = this.taskHistory[i];
						for(let j:number =0;j<arr.length; j++)
						{
							if(this.getIdflagByDay(arr[j].questType, day)==1)
							{
								return true;
							}
						}
					}
				}
			}
		}
		return false;
	}


	public firstRed():boolean
	{
		let arr=[];
		var  _cfgObj:any = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
		if(!_cfgObj)
		{
			return false;
		}
		var  curr_arr:Array<any>=_cfgObj.itemListCfg.totalScoreReward;
		for(let key in curr_arr)
		{	if(Number(key))
			{ 
				if(this.getScore()>=(curr_arr[key]).needScore&&this.getBtnType(Number(key))==false)
				{
					return true;
				}
			} 
		}
		return false;
	}
	//获取当前分数
	public getScore():number
	{
		let num = 0;
		if(this.scoreinfo && this.scoreinfo.score){
			num = this.scoreinfo.score;
		}
		return 	num;
	}
	// 第一页面礼包是否领取
	public getBtnType(num:number=0):boolean
	{
		if(this.scoreinfo && this.scoreinfo.info)
		{
			if(this.scoreinfo.info[num]&&this.scoreinfo.info[num]==1)
			{
				return true;
			} 
			else
			{
				return false
			}
		}
	
	}

	//  0不可领 1未领取 2已领取
	public  getIdflag(questType:number=0):number
	{	
		if(this.taskinfo && this.taskinfo.info && this.taskinfo.info[questType])
		{
			return this.taskinfo.info[questType].flag;
		}
	}

	//  0不可领 1未领取 2已领取
	public getIdflagByDay(questType:number=0, day : number):number
	{	
		if(this.taskHistory && this.taskHistory[day] && this.taskHistory[day].info && this.taskHistory[day].info[questType])
		{
			return this.taskHistory[day].info[questType].flag;
		}
	}

	
	//当前任务进度
	public  getTaskLength():number
	{
		let arr=[];
		if(this.taskinfo && this.taskinfo.info){
			for(let key in this.taskinfo.info)
			{
				if(this.taskinfo.info[key].flag==2)
				{
					arr.push(this.taskinfo.info[key]);
				} 
			}
		}
		return arr.length;
	}
	
	private getCurrDayData(num:number=0):Array<any>
	{
		var  _cfgObj:any = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
		var  dailyTask_arr:Array<any>=_cfgObj.itemListCfg.dailyTask;
 		
		var _dailyTask_arr =[];
		for(let key in dailyTask_arr)
		{	if(Number(key))
			{	
			 	_dailyTask_arr.push(dailyTask_arr[key])
			}
		}

		let arr =[];
		arr =_dailyTask_arr[num];
		let newArr:Array<any> =[];
		for(let key in arr)
		{	 
			if(arr[key].sortId)
			{
				newArr.push(arr[key]);  
			} 
		} 

		newArr.sort(function(a: any,b: any):number
        {
            if(a.sortId > b.sortId) return 1;
            else if(a.sortId == b.sortId) return 0;
            return -1;
        });
		return newArr;
	}
	
	 
	public dispose():void 
	{ 
	 	this.taskinfo=null;
		this.scoreinfo =null;
		this.diffday=0;
		this.score =0;
		this.taskHistory = null;
	}
}