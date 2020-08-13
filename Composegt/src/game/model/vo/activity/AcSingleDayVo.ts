class AcSingleDayVo extends AcBaseVo
{
	public constructor(){
		super();
	}

	public skin : any = {};
	public cinfo : any = {};
	public redpt : any = {};
	public sinfo : any = {};
	public item : any = {};

	public initData(data:any):void
	{
		for(let key in data){
			this[key]=data[key];
		}
	}
	//获取累积充值数目
	public getChargeNum():number{
		if(this.cinfo.chargeNum)
		{
			return Number(this.cinfo.chargeNum);
		}
		return 0;
		
	}

	//获取累积消耗数目
	public getUseGemNum():number{
		if(this.sinfo.spendNum)
		{
			return Number(this.sinfo.spendNum);
		}
		return 0;
		
	}

	/*累积消费领取判断*/
	public isGetConsume(id:number):boolean
	{	
		if(this.sinfo&&this.sinfo.getFlag)
		{
			for(let key in this.sinfo.getFlag)
			{
				if(this.sinfo.getFlag[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.cinfo&&this.cinfo.getFlag)
		{
			for(let key in this.cinfo.getFlag)
			{
				if(this.cinfo.getFlag[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	private get cfg() : Config.AcCfg.SingleDayCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	//可抢红包雨 可领充值奖励 消费奖励
	public getpublicRedhot():boolean{
		if(!this.cfg)
		{
			return false;
		}
		for(let i = 1; i < 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false;
	}

	public getpublicRedhot1():boolean{	
		//可领红包雨
		let cfg = this.cfg;
		if(!cfg || !this.isStart || this.et -  GameData.serverTime < 86400)
		{
			return false;
		}
		if(this.getCurPeriod() == 1 && !this.getIsCollectMax()){
			return true;
		}
		return false;
	}

	public getpublicRedhot2():boolean{	
		//充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(unit.id + 1) == false){
				return true;
			}
		}
		return false;
	}

	public getpublicRedhot3():boolean{	
		//消费
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curuse = this.getUseGemNum();
		for(let i in cfg.useGem){
			let unit = cfg.useGem[i];
			if(curuse >= unit.needGem && this.isGetConsume(unit.id + 1) == false){
				return true;
			} 
		}
		return false; 
	}

	public get isShowRedDot(): boolean 
	{	
		if(this.getpublicRedhot()){
			return true;
		}
		else{
			return false; 
		}
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public get acCountDown():string
	{
		let et = this.et - 86400;
		if(et >= GameData.serverTime)
		{
			return App.DateUtil.getFormatBySecond((et - GameData.serverTime),1);
		}
		else
		{
			return LanguageManager.getlocal("acPunishEnd");
		}
		
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	}
	/**
	 * 活动彻底结束（包括展示期）
	 */
	public isActivityEnd():boolean{
		return GameData.serverTime >= this.et;
	}
	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.SingleDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg){
			return [];
		}
		let list = cfg;  
		for(var i in list){
			if(i == key){	
				for(var key2 in list[i]){	
					if(list[i][key2]){
						var currObj =  list[i][key2]
						if(currObj.value|| currObj.rank ||currObj.needGem||currObj.limit){
							list[i][key2].key = Number(key2)+1;
							if(list[i][key2].key){
								arr.push(list[i][key2]); 
							}
						} 
					} 
				} 
			}
		}
		return arr;  
	}

	//获取限购物品次数
	public getBuyLimitnum(id):number{
		let buyNum = 0;
		let info : any = this.item;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	/**
	 * 判断当前阶段，1红包雨 2展示期 3准备期
	 */
	public getCurPeriod():number{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let st = today0 + cfg.startTime;
		let et = today0 + cfg.endTime;
		let period = 0;
		if(GameData.serverTime < st || GameData.serverTime > et){
			period = 3;
		}
		else{
			let count = (GameData.serverTime - st);
			if(count < cfg.luckyPacketPurchase || (count >= cfg.luckyPacketCD && count < (cfg.luckyPacketCD + cfg.luckyPacketPurchase))){
				period = 1;
			}
			else{
				period = 2;
			}
		}
		return period;
	}

	public getIsCollectMax():boolean{
		let collectnum = 0;
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let st = today0 + cfg.startTime;
		let et = today0 + cfg.endTime;
		let flag = false;
		//redhad
		if(this.redpt.redinfo){
			let tmp = this.redpt.redinfo;
			let count = Math.floor((GameData.serverTime - st) / 3600);
			let periodstart = Math.floor((GameData.serverTime - st) / cfg.luckyPacketCD) * cfg.luckyPacketCD + st;
			if(tmp[periodstart] && tmp[periodstart] >= cfg.couponLimit){
				flag = true;
			}
		}
		return flag;
	}

	public getMyRedpt():any[]{
		let cfg = this.cfg;
		let arr = [];
		if(this.redpt && this.redpt.redhad){
			for(let i in this.redpt.redhad){
				if(this.redpt.redhad[i] > 0){
					arr.push({
						id : i,
						num : this.redpt.redhad[i],
						value : this.cfg.coupon[Number(i) - 1].value
					});
				}
				
			}
		}
		return arr;
	}

	public getCountDownCD():number{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let st = today0 + cfg.startTime;
		let et = today0 + cfg.endTime;
		let curperiod = this.getCurPeriod();

		let count = 0;
		let periodstart = Math.floor((GameData.serverTime - st) / cfg.luckyPacketCD) * cfg.luckyPacketCD + st;
		if(this.getIsCollectMax()){
			if(periodstart >= (st + cfg.luckyPacketCD)){
				count = st - GameData.serverTime + 3600 * 24;
			}
			else{
				count = periodstart + cfg.luckyPacketCD - GameData.serverTime;
			}
		}
		else{
			if(curperiod == 3){
				count = GameData.serverTime < st ? (st - GameData.serverTime) : (st - GameData.serverTime + 3600 * 24);
			}
			else if(curperiod == 2){
				count = periodstart + cfg.luckyPacketCD - GameData.serverTime;
			}
		}
		return count;
	}

	public getLimitBuyNum(id : number):number{
		let buyNum = 0;
		let info : any = this.item;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	/**
	 * 充值
	 */
	public getSortRecharge():any[]
	{
		let rechargeArr = this.getArr('recharge');
		for(let i = 0;i < rechargeArr.length;i++)
		{	
			if(this.isGetRecharge(Number(rechargeArr[i].key)))
			{
				rechargeArr[i].sortId = rechargeArr.length + Number(rechargeArr[i].key);
				continue;
			}
			else if(this.getChargeNum() >= rechargeArr[i].needGem)
			{
				rechargeArr[i].sortId = (Number(rechargeArr[i].key)) - rechargeArr.length - 1;
				continue;
			}
			else
			{
				rechargeArr[i].sortId = Number(rechargeArr[i].key);
				continue;
			}
		}
		return rechargeArr;
	}

	/**
	 * 消费
	 */
	public getSortConsume()
	{
		let consumeData = this.getArr('useGem');
		for(let i = 0;i < consumeData.length;i++)
		{
			if(this.isGetConsume(Number(consumeData[i].key)))
			{
				consumeData[i].sortId = consumeData.length + Number(consumeData[i].key);
				continue;
			}
			else if(this.getUseGemNum() >= consumeData[i].needGem)
			{
				consumeData[i].sortId = (Number(consumeData[i].key)) - consumeData.length - 1;
				continue;
			}
			else
			{
				consumeData[i].sortId = Number(consumeData[i].key);
				continue;
			}
		}
		return consumeData;


	}
	public dispose():void{ 
		this.skin = {};
		this.cinfo = {};
		this.redpt = {};
		this.sinfo = {};
		this.item = {};
		super.dispose();

	}
}