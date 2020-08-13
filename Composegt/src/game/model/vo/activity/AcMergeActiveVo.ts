class AcMergeActiveVo extends AcBaseVo
{
	public diffday:number;
	public cinfo:{[keys:string]: {v : number, flags : {}}};
	public linfo:{lastday : 0, days : 0,flags : {}};
	public tinfo:{task: {[key:string]:number},flags: any};
	public shop:{[keys:string]: {shopId:number}};

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MERGEACTIVE_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.MergeActiveCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
        // 签到红点
		if (this.isHaveSignRedDot()) {
			return true;
		}

		// 任务红点
		if (this.isHaveTaskRedDot()) {
			return true;
		}

		// 充值赠送红点
		if (this.isHaveRechargeRedDot()) {
			return true;
		}
		return false;
	}


	/**
	 * 充值赠送红点
	 */
	public isHaveRechargeRedDot():boolean
	{
		for (let i = 0; i < this.diffday; i++) {
			let total = this.cfg["totalList" + (i + 1)];
			if (total) {
				for (let j = 0; j < total.length; j++) {
					let item = total[j];
					if (this.cinfo && this.cinfo[i + 1] && (!this.cinfo[i + 1].flags[j+1]) && this.cinfo[i+1].v >= item.needGem) { // 没领取
						return true;
					}
				}
			}
		}
		return false;
	}
	/**
	 * 签到红点
	 */
	public isHaveSignRedDot():boolean
	{
		for(let i = 0; i < Math.min(6, this.linfo.days); i++) {
			if ((!this.linfo) || (!this.linfo.flags) || (!this.linfo.flags[i+1])) { // 没领取
				return true;
			}
		}
		return false;
	}

	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.MergeActiveCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
		return this.tinfo.task[type]?this.tinfo.task[type]:0;
	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		return  this.tinfo.flags[id]&&this.tinfo.flags[id] == 1?true:false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask():Config.AcCfg.MergeActiveTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.MergeActiveCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskList();
		for(let i = 0;i < taskData.length;i++)
		{	
			if(this.getTaskStatus(taskData[i].id))
			{
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if(this.gettTaskNum(taskData[i].questType) >= taskData[i].value)
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
	public getSortShop() {
		let retData = [];
		for (let i = this.diffday-1; i >= 0; i--) {
			let items = this.cfg["itemsList" + (i + 1)];
			if (items) {
				for (let j = 0; j < items.length; j++) {
					let item = items[j];
					retData.push({					
						itemID: item.itemID,
						limit: item.limit,
						price: item.price,
						rebate_price: item.rebate_price,
						day:i + 1,
						shopId:j + 1
					})
				}
			}
		}
		return retData;
	}
	public getSortRecharge() {
		let retData = [];
		// 不是今天，但还未领取的
		for (let i = 0; i < this.diffday - 1; i++) {
			let total = this.cfg["totalList" + (i + 1)];
			if (total) {
				for (let j = 0; j < total.length; j++) {
					let item = total[j];
					if (this.cinfo && this.cinfo[i+1] && (!this.cinfo[i + 1].flags[j+1]) && this.cinfo[i+1].v >= item.needGem) {
						// 之前的，达到但未领取的
						retData.push({	
							needGem:item.needGem,
							getReward:item.getReward,
							day:i + 1,
							rechargeId:j + 1
						})
					}
				}
			}
		}
		// 今天的
		let total = this.cfg["totalList" + this.diffday];
		if (total) {
			for (let j = 0; j < total.length; j++) {
				let item = total[j];

				if (this.cinfo && this.cinfo[this.diffday] && (!this.cinfo[this.diffday].flags[j+1])) {
					retData.push({	
						needGem:item.needGem,
						getReward:item.getReward,
						day:this.diffday,
						rechargeId:j + 1
					})
				}
			}
		}
		return retData;
	}
	public dispose():void 
	{ 
		super.dispose();
	}
}