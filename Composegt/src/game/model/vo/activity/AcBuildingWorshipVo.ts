class AcBuildingWorshipVo extends AcBaseVo
{
	public ainfo:{
		stageinfo: {[key:string]:number},
		lotterynum: 3,
		taskinfo: {[key:string]:number},
		lastday: number,
		flags: any
	};
	public firstOpen:number = 0;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_BUILDINGWORSHIP_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.BuildingWorshipCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public getFirstOpen():boolean{
		return Boolean(this.firstOpen);
	}
	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}
		if(!this.cfg)
		{
			return false;
		}
        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			if ((!this.ainfo.flags ||  !this.ainfo.flags[i+1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}
	public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}

	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.BuildingWorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
	public getSortTask():Config.AcCfg.BuildingWorshipTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.BuildingWorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
		//改
		let leng1 = arr.length;
		for (let i = 0; i < leng1; i++)//taskData.length
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