class AcWorldCupVo extends AcBaseVo
{
	private btime : number = 0;//今日购买次数
	private vinfo : any = {};//竞猜记录
	private minfo : any = {};//兑换商品记录
	private champid : number = 0;
	 
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key] = data[key];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WORLDCUP_FRESH_ITEM);
	}

	private get cfg() : Config.AcCfg.WorldCupCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getpublicRedhot1():boolean
	{
		return false;
	}

	public getpublicRedhot2():boolean
	{	
		return false;
	}

	public getpublicRedhot3():boolean
	{	
		if(LocalStorageManager.get('enterWorldCup') == ''){
			LocalStorageManager.set('enterWorldCup', '1');
			return true; 
		}
		return false; 
	}

	public get isShowRedDot(): boolean 
	{	
		let flag = false;
		switch(this.getCurPeriod()){
			case 1:
				flag = this.v > 0;
				break;
			case 2:
				flag = false;
				break;
			case 3:
				flag = LocalStorageManager.get('enterWorldCup') == '';
				break;
		}
		return flag; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		let period = this.getCurPeriod();
		return period == 3;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.WorldCupCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return [];
		}
		let list = cfg;  

		for(var i in list)
		{
			if(i == key)
			{	
				for(var key2 in list[i])
				{	
					if(list[i][key2])
					{
						var currObj =  list[i][key2]
						if(currObj.needMeter|| currObj.rank ||currObj.needGem||currObj.questType||currObj.limit)
						{
							list[i][key2].key = Number(key2)+1;
							if(list[i][key2].key)
							{
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
		let info : any = this.minfo;
		let buyNum = 0;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	//
	public isGetJinduAward(id):boolean{
		// let info : any = this.ainfo;
		// if(info && info.flags[id]){
		// 	return true;
		// }
		return false;
	}

	/*
	当前积分
	*/
	public getCurPoints():number{
		return this.v;
	}

	/*
	今日购买次数
	*/
	public getCurBuyNum():number{
		return this.btime;
	}

	/*
	当前天数
	*/
	public getCurDay():number{
		let st = this.st;
		let num = Math.ceil((GameData.serverTime - st) / 86400);
		return num;
	}

	/*
	当前阶段
	*/
	public getCurPeriod():number{
		let period = 0;
		let period1 = this.st;
		let period2 = period1 + 86400 * 6 + 22 * 3600;
		let period3 = period2 + 14 * 3600;
		let end = this.et;
		let time = GameData.serverTime;
		if(time >= period1 && time < period2){
			period = 1;
		}
		else if(time >= period2 && time < period3){
			period = 2;
		}
		else if(time >= period3 && time < end){
			period = 3;
		}
		else{
			period = 4;
		}
		return period;
	}

	/*
	获取国家
	*/
	public getCountryById(id):string{
		return this.cfg.country[Number(id) - 1].countryName;
	}

	/*
	当前倍率
	*/
	public getCurRatio(curday?):number{
		if(!curday){
			curday = this.getCurDay();
		}
		return this.cfg.odds[curday - 1];
	}

	/*
	当前竞猜信息
	*/
	public getGuessInfo():any[]{
		let arr = [];
		for(let i in this.vinfo){
			let unit = this.vinfo[i];
			arr.push({
				'time' : i,
				'info' : unit
			});
		}
		return arr;
	}

	/*
	判断时间所在天数
	*/
	public judgeTime(time):number{
		let period1 = this.st;
		let days = Math.ceil((time - this.st) / 86400);
		return days;
	}

	/*
	冠军
	*/
	public setChamp(countryid):void{
		this.champid = Number(countryid);
	}

	public getChampid() : number{
		return this.champid;
	}
	 
	public dispose():void 
	{ 
		this.minfo = null;
		this.vinfo = null;
	}
}