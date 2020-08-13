class AcCarnivalCostVo extends AcBaseVo
{
	public v:number;
	public flags={};
	public constructor() 
	{
		super();
	}
	public initData(data:any):void
	{
		//console.log("消费了－－－－－－");
		let oldV: number = 0;
		let newV: number = 0;
		if(this.v){
			
			oldV = this.v;
		} 
		if(data["v"]){
			
			newV = Number(data["v"]);
		}



		for(let key in data)
		{
			this[key]=data[key];
		}
		// if (oldV != newV){
			
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACCARNIVAL_CHANGE_COST);
		// }
	}
	public get isShowRedDot():boolean
	{
		
		let acVo = Api.acVoApi.getActivityVoByAidAndCode("carnivalCost");
		let cfgObj = <Config.AcCfg.CarnivalCostCfg>Config.AcCfg.getCfgByActivityIdAndCode("carnivalCost",acVo.code);
		if(!cfgObj)
		{
			return false;
		}
		let list = cfgObj.getList();
		for (var key in list) {
			if (!this.flags[key] && list[key]["needGem"] <= this.v && (!Api.switchVoApi.checkSpecialChargeReward() ? !(list[key].isSpecial == 1) : true))
			{
				return true;
			}
		}
		// return false;
	}
	public dispose():void
	{
		this.v = 0;
		this.flags = {};
	}
}