class AcLanternVo extends AcBaseVo
{
	//许愿天灯 可用次数
	public v:number = 0;

	//许愿天灯 已用次数
	public usenum:number = 0;

	//许愿天灯 留言标识
	public noteflag:number = 0;

	//许愿天灯 进度奖励领取标识
	public rateflag:any = null;

	//许愿天灯 第几天 任务信息{task = {}, flags = {}} task各个任务类型的进度 flags各个任务奖励的领取标识
	public tinfo:any = null;
	public opened:number = 0;  
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_LANTERN_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.LanternCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public getOpened()
	{
		return this.opened && this.opened == 1  ;
	}
	public getCurDay():number
	{
		// local now = os.time()
        //         local st = getWeeTs(self.info[k].st)
        //         local diffday = math.ceil((now-st)/24/3600)
		let curDay = 1;
        let acSt = App.DateUtil.getWeeTs(this.st);
        let todaySt = App.DateUtil.getWeeTs(GameData.serverTime);
        curDay = (todaySt - acSt)/86400 + 1;
		if(curDay > 4){
			return 1;
		}
		return curDay;
	}
	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}
		if(this.v > 0){
			return true;
		}

        // 宝箱
        for (var i = 0; i < this.cfg.lanternNum.length; i++) { 
			let tmprcfg = this.cfg.lanternNum[i];
			if ((!this.rateflag ||  !this.rateflag[i+1]) && this.v >= tmprcfg.needNum) {
			// if (this.rateflag && !this.rateflag[i+1] && this.v >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}

	public get isShowTaskTabRed1():boolean
	{
		let cfg = <Config.AcCfg.LanternCfg> this.cfg;
		let dataList = this.getSortTask(1)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType,1);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id,1) )
			{
				return true;
			}
		}
		return false;
	}
	public get isShowTaskTabRed2():boolean
	{
		let cfg = <Config.AcCfg.LanternCfg> this.cfg;
		let dataList = this.getSortTask(2)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType,2);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id,2) )
			{
				return true;
			}
		}
		return false;
	}

	public get isShowTaskTabRed3():boolean
	{
		let cfg = <Config.AcCfg.LanternCfg> this.cfg;
		let dataList = this.getSortTask(3)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType,3);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id,3) )
			{
				return true;
			}
		}
		return false;
	}

	public get isShowTaskTabRed4():boolean
	{
		let cfg = <Config.AcCfg.LanternCfg> this.cfg;
		let dataList = this.getSortTask(4)
		for (var index = 0; index < dataList.length; index++) {
			var element = dataList[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(element.questType,4);
			let newTaskNum = element.value;
			if(taskNum >= newTaskNum && !this.getTaskStatus(element.id,4) )
			{
				return true;
			}
		}
		return false;
	}

	
	public getBoxStatusById(index:number):number
	{
        // return 1;
		let fireNeed = this.cfg.lanternNum[index]["needNum"];
		if(this.usenum >= fireNeed){
			if(this.rateflag[String(index+1)]){
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
		return this.isShowTaskTabRed1||this.isShowTaskTabRed2||this.isShowTaskTabRed3||this.isShowTaskTabRed4;
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
	public gettTaskNum(type:string,day:number):number
	{
        // return 0;
		return this.tinfo[day]&&this.tinfo[day].task[type]?this.tinfo[day].task[type]:0;
	}
	/**
	 * 任务的状态   true lingqu   false weilingqu
 	 */ 
	public  getTaskStatus(id:string,day:number):boolean
	{
        // return true;
		return  this.tinfo[day]&&this.tinfo[day].flags[id]&&this.tinfo[day].flags[id] == 1?true:false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(day:number):Config.AcCfg.LanternTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.LanternCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskList();
		// let baseTaskData = cfg.getTaskList();
		for(let i = 0;i < taskData.length;i++)
		{	
			taskData[i].day = day;
			if(this.getTaskStatus(taskData[i].id,day))
			{
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if(this.gettTaskNum(taskData[i].questType,day) >= taskData[i].value)
			{
				taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
				continue;
			}
			else
			{
				taskData[i].sortId = Number(taskData[i].id);
				continue;
			}
	
			
		}

        return taskData;
	}
	public dispose():void 
	{ 
		super.dispose();
	}
}