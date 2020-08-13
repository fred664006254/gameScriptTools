
class AcXingcunVo extends AcBaseVo
{

	public diffday:number=0;//真田幸村活动 活动第几天",
	public sumnum:number=0;//真田幸村活动 完成任务的天数",
	public finalflag:number=0;//真田幸村活动 总奖励领取标识",
	public tinfo:{task:{},flags:{}}[] = [];//真田幸村活动 第几天 任务信息{task = {}, flags = {}} task各个任务",

	public initData(data:any):void
	{
		super.initData(data);
		this.diffday = data.diffday;
		this.sumnum = data.sumnum;
		this.finalflag = data.finalflag;
		this.tinfo = data.tinfo;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH);
	}


	public getCollectFlag(day:string|number,tid:string|number)
	{
		if(this.tinfo[""+day] ){
			return this.tinfo[""+day].flags[""+tid];
		}
		return null;
	}

	public getTaskStatus(day:string|number,tid:string|number)
	{
		if(this.tinfo[""+day] ){
			return this.tinfo[""+day].task[""+tid] || 0;
		}
		return 0;
	}

	public isIconGet(day:string|number)
	{
		return this.getCollectFlag(day,"1");
	}
	//是否已领取某天的奖励
	public isAllCollect(day:string|number)
	{
		let cfg = <Config.AcCfg.XingcunCfg>this.config;
		let daycfg = cfg.dailyTask[day+""];
		for (var key in daycfg) {
			if (daycfg.hasOwnProperty(key)) {
				if(! this.getCollectFlag(day,Number(key)+1))
				{
					return false;
				}
			}
		}
		return true;
	}
	//某任务可领取
	public isTaskCollectEnable(day:string|number,taskid:string|number)
	{
		// if(this.getTaskStatus(day,tid));
		let cfg = <Config.AcCfg.XingcunCfg>this.config;
		let daycfg2 = cfg.dailyTask[day+""];
		let daycfg = undefined;
		for (var index = 0; index < daycfg2.length; index++) {
			var element = daycfg2[index];
			if(element.id == ""+taskid){
				daycfg = element;
				break;
			}
		}
		if(this.getCollectFlag(""+day,daycfg.id)){
			return false;
		}
		let getv = this.getTaskStatus(""+day,daycfg.questType);
		if(getv >0 && daycfg.value <= getv )
		{
			return true;
		}
		return false;
	}
	//某天可领取
	public isCollectEnable(day:string|number)
	{
		let cfg = <Config.AcCfg.XingcunCfg>this.config;
		let daycfg = cfg.dailyTask[day+""];
		for (var key in daycfg) {
			if (daycfg.hasOwnProperty(key)) {
				var element = daycfg[key];
				if(element.value <= this.getTaskStatus(day,element.questType) && !this.getCollectFlag(day,element.id))
				{
					return true;
				}
			}
		}
		return false;
	}

	public isBigIconCollectEnable(day:string|number)
	{
		//大金币已领取
		if( this.getCollectFlag(day,1)){
			return false;
		}
		let cfg = <Config.AcCfg.XingcunCfg>this.config;
		let daycfg = cfg.dailyTask[day+""];
		for (var key in daycfg) {
			if (Number(key) > 0 &&daycfg.hasOwnProperty(key)) {
				if(! this.getCollectFlag(day,Number(key)+1))
				{
					return false;
				}
			}
		}
		return true;
	}
	public get isShowRedDot(): boolean
    {
       let cfg = <Config.AcCfg.XingcunCfg>this.config;
	   for (var key in cfg.dailyTask) {
			if (cfg.dailyTask.hasOwnProperty(key)) {
				if(this.isCollectEnable(key))
				{
					return true;
				}
			}
		}
		return false;
    }

	public dispose():void 
	{ 
		this.diffday=0;//真田幸村活动 活动第几天",
		this.sumnum=0;//真田幸村活动 完成任务的天数",
		this.finalflag=0;//真田幸村活动 总奖励领取标识",
		this.tinfo= [];//真田幸村活动 第几天 任务信息{task = {}, flags = {}} task各个任务",
		super.dispose();
	}
}