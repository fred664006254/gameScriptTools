class AcNewYearCrackerVo extends AcBaseVo
{	
	public taskinfo:any=null;
	public diffday:number =0;  
	private crackerNum : number = 0;
	private rinfo:any =null;

	public constructor(){
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

		if(data.diffday)
		{	
			this.diffday = data.diffday;
			if(data.diffday>7)
			{
				this.diffday =7;
			}
			
		}
		this.crackerNum = data.crackerNum;
		this.rinfo = data.rinfo;

		// if(data.taskinfo.dayFlag&&data.taskinfo.dayFlag==1)
		// {
		// 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_NEWYEAR_LIST);
		// }
		// this.v = data.v;//剩余筛子数
		// this._pos = data.pos;//当前地图id
		// this._circle = data.circle;//circlereward 圈数 + 领取状况{v = 0,flags = {}}
		// this._wealthGodTimes = data.wealthGodTimes;//财神剩余次数
		// this._task = data.task;//任务相关{day = 1,v = {},flags = {}}/
		// if(data&&data.task)
		// {
		// 	this._v = data.task.v;
		// }
		// if(data.task&&data.task.day)
		// {
		// 	this._day =data.task.day;
		// }

		// if(data.task)
		// {
		// 	this._flags = data.task.flags;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_REFRESH_NEWYEARCRACKER);
		// }  
	}
	

	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getCountCd():string{	
		let et = this.et - 86400;
		let count = et - GameData.serverTime;
		let str = '';
		str = App.DateUtil.getFormatBySecond(count, 1);
		// if(count > 86400){
		// 	let tmp = Math.floor(count / 86400);
		// 	str = tmp.toString() + LanguageManager.getlocal(`date_day2`);
		// }
		return str;
	}

    private get cfg():Config.AcCfg.NewYearCrackerCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean{
		if(this.canGetJinduReward()){
			return true;
		}

		for(let i = 1; i <= this.diffday; ++ i){
			if(this.dayRed(i)){
				return true;
			}
		}

		if(this.bigBoxType){
			return true;
		}
		return false;
	}

	public canGetJinduReward():boolean{
		let flag = false;
		//爆竹奖励可点燃
		for(let i in this.cfg.recharge){
			let unit = this.cfg.recharge[i];
			if(unit.needItem <= this.getCrackerNum() && !this.getJinduReward(Number(i) + 1)){
				flag = true;
				break;
			}
		}
		return flag;
	}

	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}

	public isActyEnd():boolean{
		let flag = false;
		if(GameData.serverTime >= this.et){
			flag = true;
		}
		return flag;
	}
	/**
	 * 获取当前鞭炮数
	 */
	public getCrackerNum():number{
		let num = this.crackerNum;
		return num;
	}
	/**
	 * 获取当前所处的建筑id
	 */
	public getCurBuildId():number{
		let num = 0;
		let curJindu = this.getCurJindu();
		if(curJindu <= 7 && curJindu >= 1){
			num = 1;
		}
		else if(curJindu <=14 && curJindu >= 8){
			num = 2;
		}
		else if(curJindu <=21 && curJindu >= 15){
			num = 3;
		}
		
		return num;
	}
	/**
	 * 获取当前天数
	 */
	public getCurDay():number{
		let num = Math.min(this.diffday,7);
		return num;
	}
	/**
	 * 获取当前进度
	 */
	public getCurJindu():number{
		let num = 1;
		for(let i in this.cfg.recharge){
			let unit = this.cfg.recharge[i];
			num = Number(i) + 1;
			if(!this.getJinduReward(num)){
				break;
			}
		}
		return num;
	}
	/**
	 * 获取当前进度下所需的爆竹数
	 */
	public getJinduNeedNum(jindu : number):number{
		let num = 0;
		let info = this.cfg.recharge[jindu - 1];
		if(info && info.needItem){
			num = info.needItem;
		}
		return num;
	}
	/**
	 * 当前进度奖励是否被领取
	 */
	public getJinduReward(id):boolean{
		let flag = false;
		if(this.rinfo && this.rinfo[id] && this.rinfo[id] == 1){
			flag = true;
		}
		return flag;
	}

	//获取当前分数
	public getScore():number
	{
		return 0;//	this.scoreinfo.score;
	}
	//  0不可领 1未领取 2已领取
	public  getIdflag(questType:number=0,currDay:number):number
	{	
		if(this.taskinfo[currDay]&&this.taskinfo[currDay][questType])
		{
			return this.taskinfo[currDay][questType].flag;
		}
		return  0;
	}

	public  getTaskV(questType:number=0,currDay:number):number
	{	
		if(this.taskinfo[currDay]&&this.taskinfo[currDay][questType])
		{
			return this.taskinfo[currDay][questType].v;
		}
		return  0;
	}

	//大箱子
	public get bigPrize():boolean
	{
		if(this.rinfo&&this.rinfo.bigPrize&&this.rinfo.bigPrize==1)
		{
			return true;
		}
		return false;
	}
	
	//根据第几天返回是否有可以领取的奖励
	public dayRed(day:number):boolean
	{
		let _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_NEWYEARCRACKER,this.code);
		var  dailyTask_arr:Array<any>=_cfgObj.dailyTask; 
		for(var i:number=0; i<dailyTask_arr.length; i++)
		{ 
			var currTaskcfg = dailyTask_arr[day-1];  
			for(let key in currTaskcfg)
			{
				var taskI = currTaskcfg[key];
				var v = this.getTaskV(taskI.questType,day);
				if(v>=taskI.value&&this.getIdflag(taskI.questType,day)!=2)
				{
					return true;  	
				}
			}  
		}
		return false;  
	}

	//七天内任务是否有可以领奖的小红点
	public isredDot():boolean
	{ 
		for(var i:number =1; i<= 7; i++)
		{
			var boo =this.dayRed(i); 
			if(boo==true)
			{
				return true 
			}
		} 	
		return false;
	}

	//大箱子是否可以领奖
	public get bigBoxType():boolean
	{	
		let boo:boolean =false;
		let _cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_NEWYEARCRACKER,this.code);
		var  dailyTask_arr:Array<any>=_cfgObj.dailyTask; 
		for(let day:number=1;day<8;day++)
		{	
			for(var i:number=0; i<dailyTask_arr.length; i++)
			{ 
				var currTaskcfg = dailyTask_arr[day-1];  
				for(let key in currTaskcfg)
				{
					var taskI = currTaskcfg[key];
					if(key=="t1")
					{
						var v = this.getTaskV(taskI.questType,day);
						if(v>=taskI.value&&this.bigPrize!=true)
						{
							boo = true; 
						}
						else
						{
							boo = false;
							return boo;
						}	
					} 
				}  
			} 
		} 
		return boo;  
	}


	  
	public dispose():void
	{
		this.diffday =null;
		this.taskinfo =null
		this.rinfo = null;
		this.crackerNum = 0;
		super.dispose();
	}
}