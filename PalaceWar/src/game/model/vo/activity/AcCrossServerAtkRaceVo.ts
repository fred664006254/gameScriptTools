class AcCrossServerAtkRaceVo extends AcBaseVo
{	
	public info:any = null;
	public shop:any = null;
	public shop2:any = null;
	public task:any = null;
	public voteinfo:any = null;
	public votegetinfo:any = null;
	public zids:number = 0;
	public special:number;//兑换道具
	public shopScore:number;//人气币	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
		// App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MODEL_ACTIVITY);
	}

	public get cfg():Config.AcCfg.CrossServerAtkRaceCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
	public getEndTimeDown():string{
		let et = this.et;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public isInActivity():boolean{
		let et = this.et;
		if(this.config && this.config.extraTime){
			et = this.et - this.config.extraTime*86400;
		}
		if (GameData.serverTime >= this.st && GameData.serverTime <= et){
			return true;
		}
		return false;
	}	
	public checkIsFengyun():boolean{
		let zoneNum = 11;
		if (this.zids && this.zids >= zoneNum){
			return true;
		}
		return false;
		// return true;
		// return false;
	}
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getPreward()
	{
		return this["info"]["preward"];
	}
	public getZonereward()
	{
		return this["info"]["zonereward"];
	}

	public get isShowRedDot():boolean{
		let flag = false;
		if(GameData.serverTime >= (this.et - 86400) && GameData.serverTime < this.et && !this.getZonereward()){
			flag = true;
		}
		if (this.isInActivity() && Api.atkracecrossVoApi.checkNpcMessage())
		{
			flag = true;
		}
		if(!flag)
		{
			flag = this.isCheerRedDot();
		}
		return flag;
	}
	public showZonerward():boolean
	{
		let flag = false;
		if((GameData.serverTime >= (this.et - 86400)) && GameData.serverTime < this.et && !this.getZonereward()){
			flag = true;
		}
		return flag;		
	}
	//助威红点
	public isCheerRedDot():boolean{
		if(!this.checkIsFengyun())
		{
			return false;
		}
		return this.checkExchangeRedDot() || this.checkCheerUpRedDot() || this.checkTaskRedDot() || this.checkShopRedDot();
	}
	//衣装界面可兑换 红点
	public checkExchangeRedDot():boolean{
		if (this.isStart){
			if(this.cfg.change && this.cfg.change.needNum)
			{
				let needItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
				let currData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
				if (currData && currData.num >= needItemVo.num){
					return true;
				}
			}
		}
		return false;
	}	

	//战旗使用时间
	public isInFightFlagUseTime():boolean{
		let et = this.et - this.cfg.extraTime*86400 - this.cfg.lastTime * 3600;
		if (GameData.serverTime >= et){
			return false;
		}
		return true;
	}	
	//战旗数量
	public getFightFlagNum():number{
		if (this.special){
			return this.special;
		}
		return 0;
	}
	//是否已领取人气币
	public isGetFlagScore():boolean{
		if (this.votegetinfo && Object.keys(this.votegetinfo).length > 0){
			return true;
		}
		return false;
	}	
	//是否有人气币可领取
	public isCanGetFlagScore():boolean{
		let et = this.et;
		if(this.cfg && this.cfg.extraTime){
			et = this.et - this.cfg.extraTime*86400;
		}
		if (GameData.serverTime >= et && GameData.serverTime < this.et){
			if (this.voteinfo && Object.keys(this.voteinfo).length > 0){
				return true;
			}
		}
		return false;
	}		
	//助威红点
	public checkCheerUpRedDot():boolean{
		if (this.isInFightFlagUseTime()){
			if (this.getFightFlagNum() > 0){
				return true;
			}
		}
		if (this.checkIsInEndShowTime() && (!this.isGetFlagScore()) && this.isCanGetFlagScore()){
			return true;
		}
		return false;
	}

	//task
	public getTaskNum(type:string|number):number{
		if (this.task && this.task.v && this.task.v[type]){
			return this.task.v[type];
		}
		return 0;
	}

	//是否已领取任务奖励
	public isGetTaskReward(id:string|number):boolean{
		if (this.task && this.task.flags && this.task.flags[id]){
			return true;
		}
		return false;
	}
	//任务红点
	public checkTaskRedDot():boolean{
		if(Api.playerVoApi.getPlayerLevel() < this.cfg.needLv)
		{
			return false;
		}
		let data = this.cfg.getTaskList();
		for (let i=0; i < data.length; i++){
			let taskNum = this.getTaskNum(data[i].questType);
			if (!this.isGetTaskReward(data[i].id) && taskNum >= data[i].value){
				return true;	
			}
		}
		return false;
	}	

	//人气币数量
	public getFlagScore():number{
		if (this.shopScore){
			return this.shopScore;
		}
		return 0;
	}	
	//shop
	public getShopBuyNumById(id:string|number):number{
		if (this.shop && this.shop[id]){
			return this.shop[id];
		}
		return 0;
	}
	//shop2
	public getShop2BuyNumById(id:string|number):number{
		if (this.shop2 && this.shop2[id]){
			return this.shop2[id];
		}
		return 0;
	}		
	//积分商店红点
	public checkShopRedDot():boolean{
		let score = this.getFlagScore();
		if (score > 0){
			let data = this.cfg.getShopList();
			for (let i=0; i < data.length; i++){
				let buyNum = this.getShopBuyNumById(data[i].id);
				if (data[i].limitNum > buyNum && score >= data[i].cost){
					return true;
				}
			}
		}
		// let have = this.getExchangeItemNum();
		// if (have > 0){
		// 	let data = this.cfg.getShop2List();
		// 	for (let i=0; i < data.length; i++){
		// 		let buyNum = this.getShop2BuyNumById(data[i].id);
		// 		if (data[i].limitNum > buyNum && have >= data[i].cost){
		// 			return true;
		// 		}
		// 	}
		// }		
		return false;
	}		
	public getShowSkinId():number|string{
		let getItem:string = this.cfg.change.getItem;
		let itemcfg = Config.ItemCfg.getItemCfgById(getItem.split("_")[1]);
		return itemcfg.getRewards.split("_")[1];
	}	
	public getCheerEndTime():number{
		let et = this.et - this.cfg.extraTime*86400 - this.cfg.lastTime * 3600;
		return et;
	}
	//活动开始时间
	public isInAcPreTime():boolean{
		let time0 = App.DateUtil.getWeeTs(this.st);
		if (GameData.serverTime >= time0 + 86400){
			return false;
		}
		return true;
	}
	public getSortTaskCfg():any{
		let cfg = this.cfg.getTaskList();
		let data:any[] = [];
		for (let i=0; i < cfg.length; i++){
			if (this.isGetTaskReward(cfg[i].id)){
				cfg[i].sortId = cfg[i].id + cfg.length;
			}
			else{
				let taskNum = this.getTaskNum(cfg[i].questType);
				if (taskNum >= cfg[i].value){
					cfg[i].sortId = cfg[i].id - cfg.length;
				}
				else{
					cfg[i].sortId = cfg[i].id;
				}
			}
			data.push(cfg[i]);
		}
		return data.sort((a, b)=>{ return a.sortId - b.sortId});
	}			
	public getExchangeItemNum():number
	{
		if(this.cfg.change && this.cfg.change.needNum)
		{
			let needItemVo = GameData.formatRewardItem(this.cfg.change.needNum)[0];
			let currData = Api.itemVoApi.getItemInfoVoById(needItemVo.id);
			if (currData && currData.num)
			{
				return currData.num;
			}
		}		
		return 0;
	}	
	//助威
	public getVoteNumByUid(uid:string|number):number{
		if (this.voteinfo && this.voteinfo[uid]){
			return this.voteinfo[uid];
		}
		return 0;
	}	
	//战旗使用数量
	public isLimitFightFlagNum(uid:string|number):boolean{
		if (this.voteinfo){
			if (this.voteinfo[uid]){
				return false;
			}
			else{
				let currNum = Object.keys(this.voteinfo).length;
				if (currNum + 1 > this.cfg.flagPeopleNum){
					return true;
				}
			}
		}
		return false;
	}	
	public dispose():void
	{
		this.info = null;
		super.dispose();
	}
}