class AcOneYearOverviewVo extends AcBaseVo
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

	private get cfg() : Config.AcCfg.OneYearOverviewCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		 for (var key in this.activeinfo) {
			 if (this.activeinfo.hasOwnProperty(key)) {
				 let element = this.activeinfo[key];
				 let tmp_vo = <AcOneYearOverviewVo>Api.acVoApi.getActivityVoByAidAndCode(element["aid"],""+element["code"]);
				 if(tmp_vo && tmp_vo.isStart && tmp_vo.isShowRedDot && !this.isAidShieldByIp(element["aid"])){
					 return true;
				 }
			 }
		 }
		return false;
	}

	public isAidShieldByIp(aid)
    {
         if(PlatformManager.checkHideIconByIP() &&(  aid == "rechargeBoxSP" ||  aid == "lantern" ||  aid == "ransackTraitorSP" || aid == "stargazer") ){
            return true;
        }
        return  false;
    }

	public dispose():void 
	{ 

	}
}