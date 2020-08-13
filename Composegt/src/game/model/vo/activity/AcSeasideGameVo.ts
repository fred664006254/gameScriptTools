class AcSeasideGameVo extends AcBaseVo
{
	public ainfo:{
		stageinfo: {[key:string]:number},
		score: number,
		taskinfo: {[key:string]:number},
		lastday: number,
		flags: any
	};
	public binfo:{
		coin:number,
		lotterynum:number,
		lotteryreward:{}
	}
	// public moonlight:any = null;
	public seasideGame:any = null;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.SeasideGameCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}
	public isFirst():boolean
	{
		return this.seasideGame != 1;
	}
	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}

        // 宝箱
        for (var i = 0; i < this.cfg.drawNum.length; i++) { 
			let tmprcfg = this.cfg.drawNum[i];
			if ((!this.ainfo.stageinfo ||  !this.ainfo.stageinfo[i+1]) && this.ainfo.score >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}

	public get isShowTaskTab1Red():boolean
	{
		let cfg = <Config.AcCfg.SeasideGameCfg> this.cfg;
		let dataList = this.getSortTask(1)
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
	public get isShowTaskTab2Red():boolean
	{
		let cfg = <Config.AcCfg.SeasideGameCfg> this.cfg;
		let dataList = this.getSortTask(2)
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
	public get isShowTaskTab3Red():boolean
	{
		let cfg = <Config.AcCfg.SeasideGameCfg> this.cfg;
		let dataList = this.getSortTask(3)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id)  )
			{
				return true;
			}
		}
		return  false;
	}

	public getBoxStatusById(index:number):number
	{

		let fireNeed = this.cfg.drawNum[index]["needNum"];
		if(this.ainfo.score >= fireNeed){
			if(this.ainfo.stageinfo[String(index+1)]){
				//已经打开宝箱
				return 3;
			} else {
				//可以领取宝箱
				return 2;
			}


		} else {
			//宝箱关闭
			return 1;
		}
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
	public getSortTask(id:number):Config.AcCfg.SeasideGameTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.SeasideGameCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskListById(id);
		let baseTaskData = cfg.getTaskList();

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
				arr[i].sortId = baseTaskData.length + Number(arr[i].id);
				continue;
			}
			else if(this.gettTaskNum(arr[i].questType) >= arr[i].value)
			{
				arr[i].sortId = (Number(arr[i].id)) - baseTaskData.length - 1;
				continue;
			}
			else
			{
				arr[i].sortId = Number(arr[i].id);
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