class AcMoonNightVo extends AcBaseVo
{
	public ainfo:{
		scorenum: number,  
		lotterynum: number,
		taskinfo: {[key:string]:number},
		stagenum:number,
		flags: any,
		lastday: number,	
		
	};
	public chargenum:number;
	public firstOpen:number = 0;
	// public moonnight:any = null;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MOONNIGHT_FRESH);
	}
	private get cfg() : Config.AcCfg.MoonNightCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	// public isFirst():boolean
	// {
	// 	return this.moonnight != 1;
	// }
	public getFirstOpen():boolean{
		return Boolean(this.firstOpen);
	}
	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}
		if(this.ainfo.stagenum > this.cfg.lotteryNum.length -1){
			return false;
		}
		if( this.ainfo.scorenum >= this.cfg.lotteryNum[this.ainfo.stagenum].needNum){

			return true;
		}

 
		return false;
	}
    public getAcCDStr():string {
        let t = this.et - GameData.serverTime;
        if(t < 0){
            t = 0;
        }
        let timeTxt = App.DateUtil.getFormatBySecond(t,1);
        return timeTxt;
    }

	public get isShowTaskTabRed():boolean
	{
		let cfg = <Config.AcCfg.MoonNightCfg> this.cfg;
		let dataList = this.getSortTask()
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id) )
			{
				return true;
			}
		}
		return  false;
	}




	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.MoonlightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}

		let tasklist = cfg.getTaskList();
		for(let i = 0;i < tasklist.length; i++ )
		{
			if(!this.getTaskStatus(tasklist[i].id) && this.gettTaskNum(tasklist[i].questType) >= tasklist[i].value)
			{
				return true;
			}
		}
		return false;
	}
	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public getBoxStatusById(boxIndex:number):number
	{

		if(this.ainfo.stagenum > boxIndex){
			return 3;
		}

		//1未完成 2可领取 3已领取
		if(this.ainfo.scorenum < this.cfg.lotteryNum[this.ainfo.stagenum].needNum){
			return 1;
		} else {
			if(this.ainfo.stagenum == boxIndex){
				return 2;
			} else {
				return 1;
			}
			
		}
		


	}
	/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		return this.ainfo.taskinfo[type]?this.ainfo.taskinfo[type]:0;
	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		return  this.ainfo.flags[id]&&this.ainfo.flags[id] == 1?true:false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask():Config.AcCfg.MoonNightTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.MoonNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskList();
		let arr:Array<any> =[];
		for(let i = 0;i < taskData.length;i++)
		{	
			
			if(taskData[i].questType =="1")
			{
				let openDay  = App.DateUtil.getActivityDay(this.et,this.st);
				if(openDay <taskData[i].value)
				{
					continue;
				}
			}
			arr.push(taskData[i])
		}
		for(let i = 0;i < arr.length;i++)
		{	
			if(this.getTaskStatus(arr[i].id))
			{
				arr[i].sortId = arr.length + Number(arr[i].id);
				continue;
			}
			else if(this.gettTaskNum(arr[i].questType) >= arr[i].value)
			{
				arr[i].sortId = (Number(arr[i].id)) - arr.length - 1;
				continue;
			}
			else
			{
				arr[i].sortId = Number(taskData[i].id);
				continue;
			}
		}
		return arr;
	}
	public dispose():void 
	{ 
		super.dispose();
	}
}