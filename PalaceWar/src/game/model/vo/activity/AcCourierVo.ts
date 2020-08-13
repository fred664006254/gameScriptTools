class AcCourierVo extends AcBaseVo
{

	public taskinfo:any=null;
	public scoreinfo:any =null;
	public diffday:number =0; 
	public score:number=0;
	 
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
			if(data.taskinfo.dayFlag&&data.taskinfo.dayFlag==1){
				App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_COURIER_LIST);
			}
		}
		if(data.scoreinfo)
		{
			this.scoreinfo=data.scoreinfo;
		}
		if(data.diffday)
		{
			this.diffday = data.diffday;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_COURIER_ITEM);
  
	}

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

   public get isShowRedDot(): boolean 
	{	
		if(this.isStart==false)
		{
			return false;
		}
		
		if(this.secondRed()||this.firstRed())
		{
			return true;
		} 
		return false;   
	}
	
	public secondRed():boolean
	{
		if(GameData.serverTime>=this.et){
			return false;
		}
		let day = this.diffday-1;
		if(this.diffday == 8){
			day = 6;
		}
		let arr =this.getCurrDayData(day);  
		if(this.taskinfo&&this.taskinfo.dayFlag&&this.taskinfo.dayFlag==1)
		{
			return true;
		} 
		else
		{
			for(var i:number =0;i<arr.length; i++)
			{
				if(this.getIdflag(arr[i].questType,this.diffday)==1)
				{
					return true;
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
		if(GameData.serverTime>=this.et){
			return false;
		}
		var  curr_arr:Array<any>=_cfgObj.itemListCfg.stagePoint;
		for(let key in curr_arr)
		{	if(Number(key) >= 0)
			{ 
				if(this.getScore()>=(curr_arr[key]).needScore&&this.getBtnType(Number(key) + 1)==false)
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
		return num;
	}
	// 第一页面礼包是否领取
	public getBtnType(num:number=0):boolean
	{
		if(this.scoreinfo.info)
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
	public  getIdflag(questType:number=0, curday : number):number
	{	
		let flag = 0;
		if (this.diffday > 7){
			return flag;
		}
		if(this.taskinfo.info && this.taskinfo.info[questType] && curday == this.diffday)
		{
			flag = this.taskinfo.info[questType].flag;
		}
		return flag;
	}
	//当前任务进度
	public  getTaskLength():number
	{
		let arr=[];
		if(this.taskinfo.info){
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
		let newArr:Array<any> =[];
		var  _cfgObj:any = Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
		if(_cfgObj && _cfgObj.itemListCfg && _cfgObj.itemListCfg.stageDailyTask){
			var  dailyTask_arr:Array<any>=_cfgObj.itemListCfg.stageDailyTask;
 		 
			var _dailyTask_arr =[];
			for(let key in dailyTask_arr)
			{	if(Number(key))
				{	
					 _dailyTask_arr.push(dailyTask_arr[key])
				}
			}
	
			let arr =[];
			arr =_dailyTask_arr[num];
			
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
		}
		return newArr;
	}
	
	 
	public dispose():void 
	{ 
	 	this.taskinfo=null;
		this.scoreinfo =null;
		this.diffday=0;
		this.score =0;
	}
}