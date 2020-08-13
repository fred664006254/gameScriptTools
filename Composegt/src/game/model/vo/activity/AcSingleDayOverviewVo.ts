class AcSingleDayOverviewVo extends AcBaseVo
{

	public constructor() 
	{
		super();
	}

	public activeinfo:{string:{st: number, aid:string, et: number, code: string}}[] = [];

	public initData(data:any):void
	{
		for(let key in data){
			this[key]=data[key];
		}
	}
	/**
	 * 活动开始结束时间，格式：x月x日-x月x日
	 */
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	private get cfg() : Config.AcCfg.SingleDayOverviewCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		 for (var key in this.activeinfo) {
			 if (this.activeinfo.hasOwnProperty(key)) {
				 let element = this.activeinfo[key];
				 let tmp_vo = <AcSingleDayOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(element["aid"],""+element["code"]);
				 if(tmp_vo && tmp_vo.isStart && tmp_vo.isShowRedDot && !this.isAidShieldByIp(element["aid"])){
					 return true;
				 }
			 }
		 }
		return false;
	}

	public isAidShieldByIp(aid)
    {
         if(PlatformManager.checkHideIconByIP() &&(  aid == "gemLottery" )){
            return true;
        }
        return  false;
    }

	public dispose():void 
	{ 

	}
}