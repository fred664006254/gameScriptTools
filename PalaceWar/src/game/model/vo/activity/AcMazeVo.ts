class AcMazeVo extends AcBaseVo
{
	private ainfo:any=null;
	private binfo:any =null;
	private cinfo:any = null;
	private isfree : number = 0;

	
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACMAZE_TASK);

	}

	/**
	 * 获取抽奖的次数
	 */
	public getMazeNum():number
	{
		return this.ainfo.v;
	}
	/**
	 * 返回奖池
	 */
	public getMazePool():any[]
	{
		return this.ainfo.pool;
	}
	/**
	 * 任务类型的进度
	 */
	public getTask(type:number):number
	{
		let scheduleNum = this.binfo.task[type];
		if(scheduleNum == null)
			scheduleNum = 0;
		return scheduleNum;
	}
	/**
	 * 返回任务奖励的领取状态
	 */
	public getTaskState(index:number):boolean
	{
		let state = this.binfo.flags[index];
		if(state == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}
	/**
	 * 获取累积充值数目
	 */
	public getChargeNum():number{
		return this.cinfo.v;
	}
	/**
	 * 活动时间
	 */
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	/**
	 * 是否免费
	 */
	public get isFree():boolean
	{
		let deltaT = this.et - GameData.serverTime - 86400 * 1;
        if(deltaT < 0){
            return false;
        }
		if(this.isfree == 0)
		{
			return false;
		}
		else
		{
			return true;
		}

	}
	/** 
	 * 充值档位是否已经领取
	*/
	public isReceive(id:number):boolean
	{	
		if(this.cinfo.flags[id] == 1)
		{
			return true;
		}
		else
		{
			return false;
		}
	}

	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		return this.isFree||this.isHaveTaskRedDot()||this.isHaveRechargeRedDot();
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.task.length; i++ )
		{
			if(this.getTask(cfg.task[i].questType) >= cfg.task[i].value )
			{
				if(!this.getTaskState(cfg.task[i].id))
				{
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 充值奖励红点
	 */
	public isHaveRechargeRedDot():boolean
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.recharge.length; i++ )
		{
			if(this.getChargeNum() >= cfg.recharge[i].needGem)
			{
				 if(!this.isReceive(cfg.recharge[i].id))
				 {
					 return true;
				 }
			}
		}
		return false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask():Config.AcCfg.TaskItemCfg[]
	{
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.task;
		for(let i = 0;i < taskData.length;i++)
		{	
			if(this.getTaskState(Number(taskData[i].id)))
			{
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if(this.getTask(Number(taskData[i].questType)) >= taskData[i].value)
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

	public getSortRecharge():Config.AcCfg.RechargeItemCfg[]
	{
		let cfg = <Config.AcCfg.MazeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.recharge;
		for(let i = 0;i < rechargeData.length;i++)
		{
			if(this.isReceive(Number(rechargeData[i].id)))
			{
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if(this.getChargeNum() >= rechargeData[i].needGem)
			{
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else
			{
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;


	}
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown(): string {
		let et = this.et - 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.isfree = 0;
		super.dispose();
	}
}