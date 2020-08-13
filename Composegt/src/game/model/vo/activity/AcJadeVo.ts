
class AcJadeVo extends AcBaseVo
{
	private ainfo:any;
	// private v:any;
	private recharge:any;
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACJADE_REFRESHVO);
	}

	public get unlock():number
	{
		return this.ainfo.unlock;
	}
	/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		return this.ainfo.task[type]?this.ainfo.task[type]:0;
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
	public getSortTask():Config.AcCfg.JadeTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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

	// /**
	//  *  充值奖励 充值档位 领没领
	//  */
	// public isReceiveRecharge(id:string):boolean
	// {
	// 	return  this.recharge&&this.recharge.flags[id] == 1 ? true:false;
	// }
	/**
	 * 充值的进度
	 */
	public getRechargeValue():number
	{
		return this.recharge;
	}
	/**
	 * 获得充值奖励的配置
	 */
	public getSortRecharge():Config.AcCfg.MidAutumnRechargeItemCfg[]
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rechargeList();
		for(let i = 0;i < rechargeData.length;i++)
		{
			// if(this.isReceiveRecharge(rechargeData[i].id))
			// {
				// rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				// continue;
			// }
			if(this.getRechargeValue() >= rechargeData[i].needGem)
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
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		return this.isHaveTaskRedDot();
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.getTaskList().length; i++ )
		{
			if(this.gettTaskNum(cfg.getTaskList()[i].questType) >= cfg.getTaskList()[i].value )
			{
				if(!this.getTaskStatus(cfg.getTaskList()[i].id))
				{
					return true;
				}
			}
		}
		return false;
	}
	// /**
	//  * 获得Task列表
	//  */
	// public isHaveRechargeRedDot():boolean
	// {
	// 	let cfg = <Config.AcCfg.JadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	// 	if(!cfg)
	// 	{
	// 		return false;
	// 	}
	// 	for(let i = 0;i < cfg.getTotalList().length; i++ )
	// 	{
	// 		if(this.getRechargeValue() >= cfg.getTotalList()[i].rankV1)
	// 		{
	// 			//  if(!this.isReceiveRecharge(cfg.rechargeList()[i].id))
	// 			//  {
	// 				 return true;
	// 			//  }
	// 		}
	// 	}
	// 	return false;
	// }

	
	public get acTime():string
	{
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	public dispose():void 
	{ 
		super.dispose();
	}
}