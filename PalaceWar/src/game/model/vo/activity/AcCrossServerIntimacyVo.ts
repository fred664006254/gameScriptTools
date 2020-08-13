class AcCrossServerIntimacyVo extends AcBaseVo{
	public info:any = null;
	public shop:any = null;
	public shop2:any = null;
	public task:any = null;
	public voteinfo:any = null;
	public votegetinfo:any = null;
	public zids:number = 0;
	public special:number;//玉莲
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
	public checkIsTianjiao():boolean{
		let zoneNum = 11;
		if (this.zids && this.zids >= zoneNum){
			return true;
		}
	}
	public getCheerEndTime():number{
		let et = this.et - this.cfg.extraTime*86400 - this.cfg.lastTime * 3600;
		return et;
	}	
	public get isShowRedDot():boolean{
		let flag = false;
		if((this.judgeTimeProcess() == 3 && !this.isGettZonereward()) || this.isCheerRedDot())
		{
			flag = true;
		}
		return flag;
	}
	//活动开始时间
	public isInAcPreTime():boolean{
		let time0 = App.DateUtil.getWeeTs(this.st);
		if (GameData.serverTime >= time0 + 86400){
			return false;
		}
		return true;
	}
	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st + 7200,et,true);
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

	public checkZoneRewardDeddot():boolean{
		if (this.checkIsTianjiao()){
			if (this.checkIsInEndShowTime() && (!this.isGettZonereward())){
				return true;
			}
		}
		else{
			if(this.judgeTimeProcess() == 3 && !this.isGettZonereward()){
				return true;
			}
		}
		return false;
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
	
	//助威红点
	public isCheerRedDot():boolean{
		if(!this.checkIsTianjiao())
		{
			return false;
		}
		return this.checkExchangeRedDot() || this.checkCheerUpRedDot() || this.checkTaskRedDot() || this.checkShopRedDot();
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
	//助威
	public getVoteNumByUid(uid:string|number):number{
		if (this.voteinfo && this.voteinfo[uid]){
			return this.voteinfo[uid];
		}
		return 0;
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

	public getShowSkinId():number{
		// let rewardVo = GameData.formatRewardItem(this.cfg.change.getItem)[0];
		// let itemCfg = Config.ItemCfg.getItemCfgById(rewardVo.id);
		// if (itemCfg.servantSkinID){
		// 	return itemCfg.servantSkinID;
		// }
		// return rewardVo.id;
		return 3061;
	}
    //个人奖励是否领取
    public isGetPreward() : boolean
	{
		return this.info.preward == 1;
    }
    
    //获取区域排名
	public isGettZonereward() : boolean
	{
		return this.info.zonereward == 1;
	}
    
    //获取当前亲密排行榜自己的分数
    public getCurPoints():number{
        return Number(this.info.v);
    }

    //自己的参赛资格
    public getIsCanJoin():boolean{
        return this.info.iscanjoin;
	}
	
	//当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
	public judgeTimeProcess():number{
		let timeNumber:number = 3600 * 2;
		let timeNumber2:number = 3600 * 24;
		let type = 0;
		if (GameData.serverTime < this.st)
		{	
			type = 0;
		}
		else if(GameData.serverTime >= this.st &&  GameData.serverTime < (this.st + timeNumber)){
			type = 1;
		}
		else if (GameData.serverTime >= (this.st + timeNumber) && GameData.serverTime < (this.et - timeNumber2))
		{
			type = 2;
		}
		else  if((GameData.serverTime >= (this.et - timeNumber2)) && GameData.serverTime < this.et){
			type = 3;
		}
		else  if(GameData.serverTime >= this.et){
			type = 4;
		}
		return type;
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
		// if(this.checkIsInEndShowTime())
		// {
		// 	let have = this.getExchangeItemNum();
		// 	if (have > 0){
		// 		let data = this.cfg.getShop2List();
		// 		for (let i=0; i < data.length; i++){
		// 			let buyNum = this.getShop2BuyNumById(data[i].id);
		// 			if (data[i].limitNum > buyNum && have >= data[i].cost){
		// 				return true;
		// 			}
		// 		}
		// 	}
		// }
		return false;
	}	

	//时间转格式
	public getCountTimeStr(num):string
	{	
		let time:number = num;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}
	public get cfg():Config.AcCfg.CrossServerIntimacyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }
    public dispose():void
	{
		this.info = null;
		super.dispose();
    }
}