class AcThxgivingVo extends AcBaseVo
{
	public	itemnum:number;
	public	rechargenum:number;
	public	scorenum:number;
	public	cannum:number;
	public	flags: {[key:string]:number};
		
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THXGIVINGREFRESHVO);
	}
	private get cfg() : Config.AcCfg.ThxgivingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public get isShowRedDot():boolean
	{
		if(this.et <GameData.serverTime){
			return false;
		}
		
		// 抽奖红点
		if (this.cannum > 0 ) {
			return true;
		}
		if(!this.cfg)
		{
			return false;
		}
        // 宝箱
        for (var i = 0; i < this.cfg.feastList.length; i++) { 
			let tmprcfg = this.cfg.feastList[i];
			if ((!this.flags ||  !this.flags[i+1]) && this.scorenum >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}

	/**
	 * 进度条百分比
	 */
	public getPercentageNum():number
	{
		let tageNum = 0;

		if(!this.cfg)
		{
			return tageNum;
		}
		tageNum = this.scorenum / this.cfg.exchangeNum
		if(tageNum>1){
			tageNum = 1;
		}
		return tageNum;
	}

	public getBoxStatusById(boxIndex:number):number
	{
		if(!this.cfg)
		{
			return 1;
		}
		let feastListCfg = this.cfg.feastList;

		//1未完成 2可领取 3已领取
		if(this.scorenum < feastListCfg[boxIndex].needNum){
			return 1;
		} else {
			if(this.flags[""+(boxIndex+1)]){
				return 3;
			} else {
				return 2;
			}
			
		}
	}
		



    public getAcCDStr():string {
        let t = this.et - GameData.serverTime;
        if(t < 0){
            t = 0;
        }
        let timeTxt = App.DateUtil.getFormatBySecond(t,8);
        return timeTxt;
    }

	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	/**
	 * 活动开始结束时间，显示：活动日期：x月x日-x月x日
	 */
	public getAcLocalTime(showHour?:boolean, color?:string):string
	{
		if (color) {
			return LanguageManager.getlocal("acLocalTime",["<font color=" + color + ">" + (showHour?this.acTimeAndHour:this.acTime) + "</font>"]);
		} else {
			return LanguageManager.getlocal("acLocalTime",[showHour?this.acTimeAndHour:this.acTime]);
		}
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	
	public dispose():void 
	{ 
		super.dispose();
	}
}