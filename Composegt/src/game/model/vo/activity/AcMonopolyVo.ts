
class AcMonopolyVo extends AcBaseVo
{

	public v:number = 0;//"大富翁活动 玩家充值元宝数",
	public dicenum:number = 0;//"大富翁活动 玩家可投掷次数",
	public position:number = 1;//"大富翁活动 玩家现在位置",
	public usenum:number = 0;//"大富翁活动 玩家已投掷次数",
	public theturn :number = 0;//"大富翁活动 玩家当前轮次",
	public rangeacct :number = 0;// "大富翁活动 区间累计数（几率控制用）",
	public rangenum :number = 0;// "大富翁活动 区间投掷数（几率控制用）",
	public positionarr:number[] = [];// = "大富翁活动 第几轮 位置数组信息{x,x,...,x} 该轮踩过位置数组",
	public tinfo:{task:{}, flags:{}}[] = [];// "大富翁活动 第几天 任务信息{task = {}, flags = {}} task各个任务类型的进度 flags各个任务奖励的领取标识",
	public turnflag:number[] = [];//"大富翁活动 轮次奖励领取标识",

	public initData(data:any):void
	{
		super.initData(data);
		let isrefreshTaskList = false;
		// let dtask = data.tinfo[this.diffDay].task || {};
		// for (let key in dtask) {
		// 	if (dtask.hasOwnProperty(key)) {
		// 		let element = dtask[key];
		// 		let mytask = this.tinfo[this.diffDay].task[key];
		// 		if(!mytask || mytask!=element){
		// 			isrefreshTaskList = true;
		// 			break;
		// 		}
		// 	}
		// }
		
		this.v = data.v;
		this.dicenum = data.dicenum;
		this.position = data.position;
		this.usenum = data.usenum;
		this.theturn = data.theturn;
		this.rangeacct = data.rangeacct;
		this.tinfo = data.tinfo;
		this.rangenum = data.rangenum;
		this.positionarr = data.positionarr;
		this.turnflag = data.turnflag;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH);
		// if(isrefreshTaskList){
		// 	App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH);
		// }
	}

	public get diffDay():number
	{
		let starday = App.DateUtil.getWeeTs(this.st);
		return Math.ceil( (GameData.serverTime - starday )/86400);
	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		if(!this.tinfo || !this.tinfo[this.diffDay] || !this.tinfo[this.diffDay].flags || !this.tinfo[this.diffDay].flags[id])
		{
			return false;
		}
		return  this.tinfo[this.diffDay].flags[id]&&this.tinfo[this.diffDay].flags[id] == 1?true:false;
	}
		/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		if(!this.tinfo || !this.tinfo[this.diffDay] || !this.tinfo[this.diffDay].task || !this.tinfo[this.diffDay].task[type])
		{
			return 0;
		}
		return this.tinfo[this.diffDay].task[type]?this.tinfo[this.diffDay].task[type]:0;
	}
	
	public getTurnFlag(turn:number|string)
	{
		return this.turnflag && this.turnflag[""+turn] ;
	}

	public isTurnRewardCollectEnable(turn:number|string)
	{
		if(turn < this.theturn && !this.turnflag[""+turn]){
			return true;
		}
		return false;
	}
	public get isShowRedDot():boolean
	{
		return this.dicenum > 0 || this.isShowTaskRed() || this.isShowRewardRed();
	}

	public isShowTaskRed()
	{
		let cfg = <Config.AcCfg.MonopolyCfg>this.config;
		let task = cfg.task;
		for (var index = 0; index < task.length; index++) {
			// var element = task[index];
			let element = task[index];
			let openType = element.openType;
			let taskNum = this.gettTaskNum(""+element.questType);
			if(taskNum >= element.value && !this.getTaskStatus( "" + (index+1) )){
				return true;
			}
		}
		return false;
	}

	public isShowRewardRed()
	{
		let cfg = <Config.AcCfg.MonopolyCfg>this.config;
		let turnReward = cfg.turnReward;
		for (var key in turnReward) {
			if (turnReward.hasOwnProperty(key) && this.isTurnRewardCollectEnable(turnReward[key].id)) {
				return true;
			}
		}
		return false;
	}

	public dispose():void 
	{ 
		this.v = 0;
		this.dicenum = null; 
		this.position = null; 
		this.usenum = null; 
		this.theturn = null; 
		this.rangeacct = null; 
		this.rangeacct = null; 
		this.rangenum = null; 
		this.positionarr = null; 
		this.turnflag = [];

		super.dispose();
	}
}