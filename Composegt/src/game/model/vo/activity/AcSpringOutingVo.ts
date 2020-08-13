class AcSpringOutingVo extends AcBaseVo
{
	public ainfo:{
		scorenum: number,
		lotterynum: number,
		taskinfo: {[key:string]:number},
		stageinfo: {[key:string]:number},
		flags: any,		
		firstOpen: number
	};
	private curBgId:number = 0;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SPRINGOUTING_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.SpringOutingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}

        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			if ((!this.ainfo.stageinfo ||  !this.ainfo.stageinfo[i+1]) && this.ainfo.lotterynum >= tmprcfg.needNum) {
                return true;
            }
        }

		if(this.canGetItem()){
			return true;
		}
		return false;
	}
	//可以出游
	private canGetItem():boolean
	{        
		let needGem = this.cfg.cost;

        if (needGem <= this.getScoreNum()) {
			return true;
        }
		return false;

	}
	public getCurBgId():number
	{
		let curId = null;
		let randNum = 8;
		if(this.cfg.sceneNum && this.cfg.sceneNum > 0){
			randNum = this.cfg.sceneNum;
		}
		if(this.curBgId == 0){
			this.curBgId = Math.floor(Math.random() * randNum);
		}
		curId = this.curBgId;
		this.curBgId ++;
		if(this.curBgId == randNum+1){
			this.curBgId = 1;
		}
		return curId;
	}
	public getFirstOpen():boolean{
		return Boolean(this.ainfo.firstOpen);
	}
	public getScoreNum():number
	{
		return this.ainfo.scorenum;
	}
	public getLotteryNum():number
	{
		return this.ainfo.lotterynum;
	}
	public getCurrKey():number
	{
		let lotteryNum = this.cfg.lotteryNum;
		let lotteryData = null;
		for (let i = this.cfg.lotteryNum.length-1; i>= 0; i--)
		{	
			lotteryData = lotteryNum[i];
			if(this.ainfo.lotterynum >= lotteryData["needNum"])
			{
				return i+1;
			}
		}
		return 0;
	}
	public getNextNeedNum(cur):number
	{
		if(cur>=this.cfg.lotteryNum.length){
			return this.cfg.lotteryNum.length;
		} else {
			return this.cfg.lotteryNum[cur]["needNum"];
		}
	}
	//获得进度条百分之
	public getCurrVal()
	{


		// this.ainfo.lotterynum
		let cur = this.getCurrKey();
		let curNeedNum = cur == 0?0:this.cfg.lotteryNum[cur-1]["needNum"];
		let nextNeedNum = this.getNextNeedNum(cur);
		let baseV = cur / this.cfg.lotteryNum.length;
		let pathV = this.ainfo.lotterynum > nextNeedNum ? 1 : (this.ainfo.lotterynum - curNeedNum)/(nextNeedNum - curNeedNum);
		return baseV + pathV * (1/this.cfg.lotteryNum.length);


	}

	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.SpringOutingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
	public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask():Config.AcCfg.SpringOutingTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.SpringOutingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
				arr[i].sortId = Number(arr[i].id);
				continue;
			}
		}
		return arr;
	}
	public dispose():void 
	{ 
		this.curBgId = 0;
		super.dispose();
	}
}