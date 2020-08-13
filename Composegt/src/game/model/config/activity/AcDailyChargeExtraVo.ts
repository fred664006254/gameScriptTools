class AcDailyChargeExtraVo extends AcBaseVo
{
	public v:number=0;
	public flags={};
	private _objList:any = null;
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		let oldV = this.v;
		for(let key in data)
		{
			this[key]=data[key];
		}

		if(oldV != null  && oldV != this.v){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V);
		}
	}
	
	public get isShowRedDot():boolean
	{
		let dailyVo = Api.acVoApi.getActivityVoByAidAndCode("dailyCharge");
		let cfgObj = <Config.AcCfg.DailyChargeCfg>Config.AcCfg.getCfgByActivityIdAndCode("dailyCharge",dailyVo.code);
		if(!cfgObj)
		{
			return false;
		}
		let _seprateNum = 0;
		let list = cfgObj.getList();
		for (var key in list) {
			let tmpCfg = list[key]; 
			if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
			{
				if(Api.switchVoApi.checkSpecialChargeReward() && !this.flags[key] &&this.v >= list[key]["needGem"]|| !this.flags[key] &&this.v >= list[key]["needGem"]&&tmpCfg.isSpecial<=this.maxSwitchNum )
				{
					return true;
				}
			}else if(tmpCfg.isSpecial)
			{//或者  参考之前处理
				var needGem:number = this.getLjNum(tmpCfg.isSpecial);
				var needGem2:number = this.getLjNum(tmpCfg.isSpecial-1);
				var currNeedGem=list[key]["needGem"];
				if(Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial) && !this.flags[key] &&this.v >=currNeedGem ||this.v>= currNeedGem&&tmpCfg.isSpecial<=this.maxSwitchNum&& !this.flags[key])
				{
					return true;
				}
			}
			else{
				_seprateNum = tmpCfg.needGem;
				if (!this.flags[key] && list[key]["needGem"] <= this.v)
				{
					return true;
				}
			}
		}
		return false;
	}

	public getLjNum(isSpecial:number):number
	{ 
		let objList = this._objList; 
		for (var key in objList) {
			let tmpCfg = objList[key];
			if(isSpecial== tmpCfg.isSpecial)
			{
			 	var needGem = tmpCfg.needGem; 
			}
		} 
		return needGem;
	}

	//当前开关最大档位
	public get maxSwitchNum():number
	{
		var _maxNumb:number=0;
		for (var key in this._objList) 
		{
			let tmpCfg = this._objList[key]; 
			if(Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial))
			{
				_maxNumb = tmpCfg.isSpecial;
			} 
		}
		return _maxNumb;
	}
	public dispose():void
	{
		this.v = 0;
		this.flags = {};
	}
}