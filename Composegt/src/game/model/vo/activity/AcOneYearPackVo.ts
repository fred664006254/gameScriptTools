class AcOneYearPackVo extends AcBaseVo
{
	public charge: number = 0; //"充值额度",
	public citemnum: number = 0; //"充值给的已道具数量",
	public score: number = 0; //幸运值",
	public stagenum: number = 0; //"已领取的阶段奖励次数",
	public opened:number = 0;  
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		let old_citemnum = this.citemnum;
		let old_score = this.score;
		for(let key in data){
			this[key]=data[key];
		}
		// if(old_citemnum != this.citemnum || old_score != this.score){
			App.MessageHelper.dispatchEvent(MessageConst.MESAAGE_ONEPACK_VO_CHANGE);
		// }
	}

	public getOpened()
	{
		return this.opened && this.opened == 1  ;
	}
	private get cfg() : Config.AcCfg.OneYearPackCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public get isShowRedDot():boolean
	{
		if(Api.itemVoApi.getItemNumInfoVoById(this.cfg.drawItemID)> 0){
			return true;
		}

		if(this.stagenum == 0  && this.score >= this.cfg.luckExchangePoint1){
            return true;
        }
		if(this.stagenum > 0  && this.score >= this.cfg.luckExchangePoint2){
            return true;
        }
		return false;
	}

	public dispose():void 
	{ 
		this.charge = 0;
		this.citemnum = 0;
		this.score = 0;
		this.stagenum = 0;
		this.opened = 0;
	}
}