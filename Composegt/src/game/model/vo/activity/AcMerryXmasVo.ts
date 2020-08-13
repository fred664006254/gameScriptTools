class AcMerryXmasVo extends AcBaseVo
{
	private flags:any;
	private lotterynum:number;
	private scorenum:number;
	private stageinfo: {[key:string]:number};
	private taskinfo: {[key:string]:number};
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.MerryXmasCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	/**拥有数量 */
	public get starNum():number{
		return this.scorenum || 0;
	}
	/**抽取次数 */
	public get useNum():number{
		return this.lotterynum || 0;
	}

	public get curStep():number{

		let progress = this.cfg.progress;
		for (let i = 0; i < progress.length; i++) {
			const element = progress[i];
			if(this.lotterynum >= element.needNum){
				continue;
			}else{
				return i;
			}	
		}
		return progress.length;
		
	}

	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}
		return false;
	}

	public isShowTaskTabRed(tabId?:number){
		if(tabId){
			let dataList = this.getSortTask(tabId)
			for (var index = 0; index < dataList.length; index++) {
				var element = dataList[index];
				let taskNum = this.getTaskNum(element.questType);
				let newTaskNum = element.value;
				if(taskNum >= newTaskNum && !this.getTaskStatus(element) )
				{
					return true;
				}
			}
			return  false;
		}
		return false;
	}
	public get isShowTaskTab1Red():boolean
	{
		let cfg = <Config.AcCfg.MerryXmasCfg> this.cfg;
		let dataList = this.getSortTask(1)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.getTaskNum(element.questType);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element) )
			{
				return true;
			}
		}
		return  false;
	}
	public get isShowTaskTab2Red():boolean
	{
		let cfg = <Config.AcCfg.MerryXmasCfg> this.cfg;
		let dataList = this.getSortTask(2)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.getTaskNum(element.questType);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element) )
			{
				return true;
			}
		}
		return  false;
	}
	public get isShowTaskTab3Red():boolean
	{
		let cfg = <Config.AcCfg.MerryXmasCfg> this.cfg;
		let dataList = this.getSortTask(3)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.getTaskNum(element.questType);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element)  )
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
		let cfg = <Config.AcCfg.MerryXmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}

		let tasklist = cfg.getTaskList();
		for(let i = 0;i < tasklist.length; i++ )
		{
			if(!this.getTaskStatus(tasklist[i]) && this.getTaskNum(tasklist[i].questType) >= tasklist[i].value)
			{
				return true;
			}
		}
		return false;
	}
	public get acCountDown(): string {
		let et = this.et - (this.config.extraTime||0) * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
	}


	/**
	 * 任务类型的进度
	 */
	public getTaskNum(type:string):number
	{
		if(type == 'progress'){
			return this.lotterynum||0;

		}else{
			return this.taskinfo[type]?this.taskinfo[type]:0;
		}

	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(taskData:Config.AcCfg.MerryXmasTaskItemCfg):boolean
	{
		let id = taskData.id;
		if(taskData.progress == 'progress'){
			return  this.stageinfo[id]&&this.stageinfo[id] == 1?true:false;
		}else{
			return  this.flags[id]&&this.flags[id] == 1?true:false;
		}

	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(id:number):Config.AcCfg.MerryXmasTaskItemCfg[]
	{
		let min = 1;
		let max = 1;
		if(id == 2){
			min = 2;
			max = 3;
		}else if(id == 3){
			//页签3是进度奖励 task配置里没有,但是进过处理加入了tasklist里
			min = 4;
			max = 4;
		}
		let cfg = <Config.AcCfg.MerryXmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskListById(min,max);
		let baseTaskData = cfg.getTaskList();
		let taskLength = baseTaskData.length - this.cfg.progress.length;

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
			if(this.getTaskStatus(taskData[i]))
			{
				arr[i].sortId = taskLength + Number(arr[i].id);
				continue;
			}
			else if(this.getTaskNum(arr[i].questType) >= arr[i].value)
			{
				arr[i].sortId = (Number(arr[i].id)) - taskLength - 1;
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