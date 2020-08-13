class AcAnnualPray2020Vo extends AcBaseVo
{

    //道具数量 v1二 v2周 v3年 v4庆
    private ainfo : any = null;
    //每日免费次数
    private isfree : number = 0;
    //累计充值 v充值的元宝 flags领取标记
    private binfo : any = null;
    //进度奖励领取情况
    private rewards : any = null;
    //兑换信息 同商店
    private claim : any = null;
    //总祈愿值
	private total = 0;

	public lastidx : number = -1;
	public lastpos : egret.Point = null;
	public lastday : number = -1;
	public idx = 1;
	public showId : number = -1;
    
	public constructor(){
		super();
	}

	public initData(data:any):void{
		for(let key in data)
		{
			this[key] = data[key];
		}
    }
    
    public getFreeNum():number{
        return this.isfree;
    }

    public dayNumById(id:number):number{
        let num = 0;
        if(this.ainfo && this.ainfo[`v${id}`]){
            num = this.ainfo[`v${id}`];
        }
        return num;
	}
	
	public getCrackNum():number{
		let num = 0;
		if(this.v){
			num = this.v;
		}
		return num;
	}

	public getPrayNum():number{
		let num = 0;
		if(this.total){
			num = this.total;
		}
		return num;
	}


	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - this.config.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

    //充值奖励
	public getpublicRedhot1():boolean{	
		//充值
		let cfg = this.config;
		if(this.isEnd)
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false){
				return true;
			}
		}
		return false;
    }
    

	//获取限购物品次数
	public getBuyLimitnum(id):number{
			let info : any = this.claim;
			let buyNum = 0;
			if(info && info[id]){
				buyNum += info[id];
			}
			return buyNum;
	}
	//进度奖励
	public getpublicRedhot3():boolean{	
		let flag = false;
		if (this.isEnd)
		{
			return false;
		}
		for(let i in this.config.processingReward){
			let unit : Config.AcCfg.AnnualPrayProcessItemCfg = this.config.processingReward[i];
			if(this.total >= unit.ratetime && !this.isGetJinduAward(unit.id)){
				flag = true;
				break;
			}
		}
        return flag; 
	}
    //免费次数
	public getpublicRedhot2():boolean{
        let flag = false;
        if(!this.isInActivity()){
            return flag;
        }
        if(this.isfree > 0){
            flag = true;
        }
        return flag; 
	}
	
	//可兑换
	public getpublicRedhot4():boolean{	
		
        let flag = false;
        if(this.isEnd){
            return flag;
        }
		for(let i in this.config.claim){
			let unit : Config.AcCfg.DeChuanExchangeItemCfg = this.config.claim[i];
			let need1=0,need2=0,need3=0,need4=0;
            if (unit.costdeZi)
            {
                need1 = unit.costdeZi;
            }
            if (unit.costchuanZi)
            {
                need2 = unit.costchuanZi;
            }
            if (unit.costshiZi)
            {
                need3 = unit.costshiZi;
            }
            if (unit.costdaiZi)
            {
                need4 = unit.costdaiZi;
            }
            if (this.dayNumById(1)>=need1 && this.dayNumById(2)>=need2 && this.dayNumById(3)>=need3 && this.dayNumById(4)>=need4)
            {
				flag = true;
				break;
            }
		}
        return flag; 
    }
    
	//获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this.binfo && this.binfo.v){
			num = this.binfo.v;
		}
		return num;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean{	
		if(this.binfo&&this.binfo.flags&&this.binfo.flags[id]==1){
            return true;
		}
		return false;
	}
	
	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i <= 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400 * this.config.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						if(currObj.getReward || currObj.item)
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
	/*祈愿奖励领取*/
	public isGetJinduAward(id):boolean{
		let idx = Number(id);
		let info : any = this.rewards;
		if(info && info){
			if(info[idx]==1){
				return true;
			}
		}
		return false;
	}
    
	public dispose():void { 
		 //道具数量 v1德 v2川 v3时 v4代
         this.ainfo = null;
         //每日免费次数
         this.isfree = 0;
         //累计充值 v充值的元宝 flags领取标记
         this.binfo = null;
         //兑换信息 同商店
         this.claim = null;
		 //抽取次数
		 this.rewards = null;
         this.total = 0;
         this.lastidx = -1;
		 this.lastpos = null;
		 this.lastday = -1;
		 this.idx = 1;
		 this.showId = -1;
		 this.rewards = null;
	}
}