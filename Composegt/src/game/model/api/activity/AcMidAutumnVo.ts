/**
  * 中秋活动 的 vo
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnVo
  */
class AcMidAutumnVo extends AcBaseVo
{
	private isfree:number;
	private ainfo:any;
	private binfo:any;
	private cinfo:any;
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
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACMIDAUTUMN_TASKANDRECHARGE);
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
		return this.isfree == 1?true:false;
	}
	/**
	 * 抽奖的次数
	 */
	public lotteryNum():number
	{
		return this.ainfo.v;

	}
	/**
	 * 返回领没领
	 */
	public boxStatus(id:string):boolean
	{
		return (this.ainfo.flags[id]&&this.ainfo.flags[id] == 1)? true:false;
	}
	/**
	 * 任务类型的进度
	 */
	public gettTaskNum(type:string):number
	{
		return this.binfo.task[type]?this.binfo.task[type]:0;
	}
	/**
	 * 任务的状态
	 */
	public  getTaskStatus(id:string):boolean
	{
		return  this.binfo.flags[id]&&this.binfo.flags[id] == 1?true:false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask():Config.AcCfg.MidAutumnTaskItemCfg[]
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.getTaskList();
		let arr:Array<any> =[];
		for(let i = 0;i < taskData.length;i++)
		{	
			
			if(taskData[i].questType =="1")
			{
				let openDay  = App.DateUtil.getActivityDay(this.et,this.st)-1;
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

	/**
	 *  充值奖励 充值档位 领没领
	 */
	public isReceiveRecharge(id:string):boolean
	{
		return  this.cinfo&&this.cinfo.flags[id] == 1 ? true:false;
	}
	/**
	 * 充值的进度
	 */
	public getRechargeValue():number
	{
		return this.cinfo&&this.cinfo.v?this.cinfo.v:0;
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
			if(this.isReceiveRecharge(rechargeData[i].id))
			{
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if(this.getRechargeValue() >= rechargeData[i].needGem)
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
		return this.isFree||this.isHaveTaskRedDot()||this.isHaveRechargeRedDot()||this.isHaveBoxDot();
	}
	/**
	 * 任务奖励红点
	 */
	public isHaveTaskRedDot():boolean
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
	/**
	 * 获得Task列表
	 */
	public isHaveRechargeRedDot():boolean
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.rechargeList().length; i++ )
		{
			if(this.getRechargeValue() >= cfg.rechargeList()[i].needGem)
			{
				 if(!this.isReceiveRecharge(cfg.rechargeList()[i].id))
				 {
					 return true;
				 }
			}
		}
		return false;
	}
	/**
	 * 宝箱的红点
	 */
	public isHaveBoxDot():boolean
	{
		let cfg = <Config.AcCfg.MidAutumnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}
		for(let i = 0;i < cfg.getBoxList().length; i++ )
		{
			if(this.lotteryNum() >= cfg.getBoxList()[i].needNum)
			{
				 if(!this.boxStatus(cfg.getBoxList()[i].id))
				 {
					 return true;
				 }
			}
		}
		return false;
	}
	
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