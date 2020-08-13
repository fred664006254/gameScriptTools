class AcHuLaoVo extends AcBaseVo
{
	public attacksum:number;
	public attacknum:number;
	public amuletnum:number;
	public flags:{[key:string]:number};
	public shop:{[key:string]:number};

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
	}
	private get cfg() : Config.AcCfg.HuLaoCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{
		if (!this.cfg) {
			return false;
		}
		if (this.attacknum > 0 && this.attacksum < this.cfg.attackNum) {
			return true;
		} 

		if(this.code == 1){
			// 门客id
			let servantId = Config.ServantskinCfg.getServantSkinItemById(this.cfg.skinExchange).servantId;
			let amuletNum = Api.amuletVoApi.getAmuletNum(servantId,String(this.cfg.skinActiveId));
			if (!Api.servantVoApi.isOwnSkinOfSkinId(String(this.cfg.skinExchange)) && amuletNum >= this.cfg.skinActiveNum) {
				return true;
			}
		}


        // 宝箱
        for (var i = 0; i < this.cfg.lotteryNum.length; i++) { 
			let tmprcfg = this.cfg.lotteryNum[i];
			if ((!this.flags ||  !this.flags[i+1]) && this.attacksum >= tmprcfg.needNum) {
                return true;
            }
        }
		return false;
	}

	//boss 是否已经死了
	public isBossDie():boolean{
       return  this.attacksum >= this.cfg.attackNum;

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