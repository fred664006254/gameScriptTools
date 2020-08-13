class AcCrossServantPowerVo extends AcBaseVo{
    public info:any = null;
	public v:number;//"] = "跨服门客权势活动 门客权势增幅累积数",
	public rankflag:number; //"] = "跨服门客权势活动 门客上榜标志",
	public syncflag:number; //"] = "跨服门客权势活动 同步标志",
	public initial:number; //"] = "跨服门客权势活动 门客属性初始值",
	public ranknum:number; //"] = "跨服门客权势活动 排名",
	public taskinfo:any = null; //"] = "跨服门客权势活动 任务情况",
	public myrank:number;
	public ranks:any[] = [];
	public zidgroup:number[] = [];
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{	
		let oldV = this.v ? this.v : 0;
		for(let key in data)
		{
			this[key]=data[key];
		}
		if(oldV!=this.v){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH);
		}
	}

	

	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st + 7200,et,true);
	}


	public isShowRedForTask()
	{
		let cfg = <Config.AcCfg.CrossServantPowerCfg>this.config;
		for (var key in cfg.task) {
			if (cfg.task.hasOwnProperty(key)) {
				let value = cfg.task[key].value;
				let questType = cfg.task[key].questType;
				if(this.v >= value && !this.taskinfo.flags[Number(key)+1]){
					return true;
				}
			}
		}
		return false;
	}
	//时间转格式
	public getCountTimeStr(num):string
	{	
		let time:number = num;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}

	public get isShowRedDot():boolean
	{
		return this.isShowRedForTask();
	}

    public dispose():void
	{
		this.info = null;

		super.dispose();
    }
}