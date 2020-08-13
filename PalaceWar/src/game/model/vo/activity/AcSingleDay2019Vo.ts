class AcSingleDay2019Vo extends AcBaseVo
{
	public constructor(){
		super();
	}
    //充值信息
    public binfo : any = null;
    //特殊道具数量
    public num : number = 0;
    //限时返场道具购买信息
    public shop1 : any = null;
    //折扣礼包道具购买信息
    public shop2 : any = null;
    //转盘使用次数
	public times : number =0;
	//排行榜
	public rankinfo : any = {};

	public lastidx : number = -1;
	public lasttype : number = -1;
	public buytype : number = -1;
	public lastpos : any = null;

	public initData(data:any):void{
		for(let key in data){
			this[key]=data[key];
		}
	}

	//获取累积充值数目
	public getChargeNum():number{
        let num = 0;
		if(this.binfo && this.binfo.v){
			num = this.binfo.v;
		}
		return num;
	}

	//获取消耗元宝数
	public getUseGemNum():number{
        return this.v;
    }
    
    //获取转盘使用次数
	public getTimes():number{
        return this.times;
    }
    
    //获取特殊道具数量
	public getItemNum():number{
        return this.num;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean{	
        let flag = false;
		if(this.binfo&&this.binfo.flags&&this.binfo.flags[id]){
			flag = true; 
		}
		return flag;
	}

	private get cfg() : Config.AcCfg.SingleDay2019Cfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	//可转盘
	public getpublicRedhot1():boolean{	
        let flag = false;
		let cfg = this.cfg;
		if(!cfg){
			return flag;
		}
		if(GameData.serverTime < (this.et - 86400 * this.cfg.extraTime) && this.getItemNum() > 0){
			flag = true;
		}
		return flag;
	}

    //充值
	public getpublicRedhot2():boolean{	
        //充值
        let flag = false;
		let cfg = this.cfg;
		if(!cfg || GameData.serverTime >= this.et){
			return flag;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit : Config.AcCfg.SingleDayNewRechargeItem = cfg.recharge[i];
			if(curCharge >= unit.needGem && !this.isGetRecharge(unit.id)){
				flag = true;
			}
		}
		return flag;
	}

	public get isShowRedDot(): boolean{	
        let flag = false;
		if(!this.cfg){
			flag = false;
		}
		for(let i = 1; i < 3; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				flag = true;
			}
		}
		return flag;
	} 
	
	public get acTimeAndHour():string{	
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public get acCountDown():string
	{
		let et = this.et - 86400 * this.cfg.extraTime;
		if(et >=  GameData.serverTime)
		{
			return App.DateUtil.getFormatBySecond((et - GameData.serverTime),1);
		}
		else
		{
			return LanguageManager.getlocal("acPunishEnd");
		}
		
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	/**
	 * 活动彻底结束（包括展示期）
	 */
	public isActivityEnd():boolean{
		return GameData.serverTime >= this.et;
	}

	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.SingleDay2019Cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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

	//获取限时返场道具购买信息
	public getBuyShopList1(id):number{
		let buyNum = 0;
		if(this.shop1 && this.shop1[id]){
			buyNum = this.shop1[id];
		}
		return buyNum;
    }

    //获取折扣礼包道具购买信息
	public getBuyShopList2(id):number{
		let buyNum = 0;
		if(this.shop2 && this.shop2[id]){
			buyNum = this.shop2[id];
		}
		return buyNum;
	}
	
	public getMyPrank():number{
		let rank = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
			rank = this.rankinfo.myrankArr.myrank;
		}
		return rank;
	}

	public getMyPScore():number{
		let score = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value){
			score = this.rankinfo.myrankArr.value;
		}
		return score;
	}

	public setRankInfo(data : any):void{
		if(data.rankArr){
			this.rankinfo.rankArr = data.rankArr;
		}
		if(data.myrankArr){
			this.rankinfo.myrankArr = data.myrankArr;
		}
	}

	public getRankInfo():any[]{
		let arr = [];
		if(this.rankinfo && this.rankinfo.rankArr){
			arr = this.rankinfo.rankArr;
		}
		return arr;
	}
    
	public dispose():void{ 
        this.binfo = null;
        this.num = 0;
        this.shop1 = null;
        this.shop2 = null;
		this.times = 0;
		this.rankinfo = null;
		this.lastidx = null;
		this.lastpos = null;
		super.dispose();
	}
}