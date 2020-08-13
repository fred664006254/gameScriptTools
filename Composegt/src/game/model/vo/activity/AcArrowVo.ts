class AcArrowVo extends AcBaseVo
{
	 
	public	stageinfo: {[key:string]:number};
	public	usenum: number;
	public	havenum: number;
	public	level: number;
	public	rings: number;
	public	chargenum: number;
		
	public firstOpen:number = 0;
	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ARROW_REFRESHVO);
	}
	private get cfg() : Config.AcCfg.ArrowCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public get isShowRedDot():boolean
	{
		if(this.et - 86400 <GameData.serverTime){
			return false;
		}
		if(this.isUpLevelRedDot()){
			return true;
		}
		// 任务红点
		if (this.havenum > 0 ) {
			return true;
		}
		if(!this.cfg)
		{
			return false;
		}
        // 宝箱
        for (var i = 0; i < this.cfg.phaseReward.length; i++) { 
			let tmprcfg = this.cfg.phaseReward[i];
			if ((!this.stageinfo ||  !this.stageinfo[i+1]) && this.rings >= tmprcfg.needRings) {
                return true;
            }
        }
		return false;
	}
	
	/**
	 * 升级的红点
	 */
	public isUpLevelRedDot():boolean
	{
		let cfg = <Config.AcCfg.ArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return false;
		}

		let levelList = cfg.getLevelUpList();
		for(let i = 0;i < levelList.length; i++ )
		{
			if(this.chargenum >= levelList[i].needGem && this.level < Number(levelList[i].id))
			{
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
		let unitNum = 0.2;
		let tageNum = 0;
		let ringsNumCfg = 0;

		if(!this.cfg)
		{
			return tageNum;
		}
		 // 宝箱
        for (var i = 0; i < this.cfg.phaseReward.length; i++) { 
			let tmprcfg = this.cfg.phaseReward[i];
			if (this.rings >= tmprcfg.needRings) {
                tageNum = tageNum + unitNum;
				ringsNumCfg = tmprcfg.needRings;
            }else{
				let addValue = (this.rings - ringsNumCfg)/(tmprcfg.needRings-ringsNumCfg)*unitNum;
				tageNum = tageNum + addValue;
				break;
			}
        }
		return tageNum;
	}
	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	
	public dispose():void 
	{ 
		super.dispose();
	}
}