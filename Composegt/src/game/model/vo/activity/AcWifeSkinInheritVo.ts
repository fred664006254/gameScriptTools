
class AcWifeSkinInheritVo extends AcBaseVo
{
    public addskin:number = 0;
    public lotterynum:number = 0;
    public lotterysnum:number = 0;
    public preward:number = 0;
    public stageinfo:{} 
	public firstOpen:number = 0;
	public chargenum:number = 0;

	public initData(data:any):void
	{
		let olv = this.lotterynum;
		for(let key in data)
		{
			this[key]=data[key];
		}
		// if(olv < this.lotterynum){
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIFESKININHERIT_RECALL_NUM_REFRESH);
		// }
	}

	public get cfg() : Config.AcCfg.WifeSkinInheritCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
    public getAvgConfig(id, code):any{
		return this.cfg.getDialogById(id, code);
	}
	public getFirstOpen():boolean{
		return Boolean(this.firstOpen);
	}


	public get isShowRedDot():boolean
	{
		if(!this.cfg)
		{
			return false;
		}
		let stageinfo = this.stageinfo;
		let lotterysnum = this.lotterysnum;
		let ReviewNum = this.cfg.FireNum;
		for (var index = 0; index < ReviewNum.length; index++) {
			let element = ReviewNum[index];
			if(element.needNum <= lotterysnum){
				if(!this.stageinfo[""+(index+1)]){
					return true;
				}
			}
		}
		return this.lotterynum >0 ;
	}
	// 1->宝箱关闭 ,2->可以领取宝箱, 3->已经打开宝箱
	public getBoxStatusById(index:number):number
	{

		let fireNeed = this.cfg.FireNum[index]["needNum"];
		if(this.lotterysnum >= fireNeed){
			if(this.stageinfo[String(index+1)]){
				//已经打开宝箱
				return 3;
			} else {
				//可以领取宝箱
				return 2;
			}


		} else {
			//宝箱关闭
			return 1;
		}
	}
	public isRightRed()
	{
		let stageinfo = this.stageinfo;
		let lotterysnum = this.lotterysnum;
		let ReviewNum = this.cfg.FireNum;
		let ReviewItemNum = this.cfg.wifeSkinInheritItemNum;
		for (var index = 0; index < ReviewNum.length; index++) {
			let element = ReviewNum[index];
			if(element.needNum <= lotterysnum && element.needNum >= ReviewItemNum/2 && !this.stageinfo[""+(index+1)]){
					return true;
			}
		}
		return false;
	}

	public isLeftRed()
	{
		let stageinfo = this.stageinfo;
		let lotterysnum = this.lotterysnum;
		let ReviewNum = this.cfg.FireNum;
		let ReviewItemNum = this.cfg.wifeSkinInheritItemNum;
		for (var index = 0; index < ReviewNum.length; index++) {
			let element = ReviewNum[index];
			if(element.needNum <= lotterysnum && element.needNum < ReviewItemNum/2 && !this.stageinfo[""+(index+1)]){
					return true;
			}
		}
		return false;
	}

	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public getAcLocalTime(showHour?:boolean, color?:string):string
	{
		if (color) {
			return LanguageManager.getlocal("acWifeSkinInheritReward_Time",["<font color=" + color + ">" + (showHour?this.acTimeAndHour:this.acTime) + "</font>"]);
		} else {
			return LanguageManager.getlocal("acWifeSkinInheritReward_Time",[showHour?this.acTimeAndHour:this.acTime]);
		}
	}
	public dispose():void 
	{ 
		this.addskin = 0;
		this.lotterynum = 0;
		this.lotterysnum = 0;
		this.preward = 0;
		this.stageinfo = {};
		this.firstOpen = 0;
		super.dispose();
	}
}