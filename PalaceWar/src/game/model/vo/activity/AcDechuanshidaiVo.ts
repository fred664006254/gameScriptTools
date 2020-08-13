class AcDechuanshidaiVo extends AcBaseVo
{

    //道具数量 v1德 v2川 v3时 v4代
    private ainfo : any = null;
    //每日免费次数
    private isfree : number = 0;
    //累计充值 v充值的元宝 flags领取标记
    private binfo : any = null;
    //任务完成 
    private taskinfo : any = null;
    //当前第几天 
    private diffday : number = 0;
    //兑换信息 同商店
    private claim : any = null;
    //抽取次数
	private num = 0;
	//每日任务领取奖励
	private totaltask : any = null;

	public lastidx : number = -1;
	public lastpos : egret.Point = null;
	public lastday : number = -1;
    public idx = 1;
    
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


	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

    //充值奖励
	public getpublicRedhot1():boolean{	
		//充值
		let cfg = this.cfg;
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
    
    public getCurDays():number{
        return Math.min(4,this.diffday);
    }
	//任务奖励
	public getpublicRedhot2():boolean{	
		//任务
		let flag = false;
		if(this.isEnd)
		{
			return flag;
		}
        for(let i = 1; i <= this.diffday; ++ i){
			if(this.getDayTaskReward(i)){
				flag = true;
				break;
		   	}
        }
		return flag; 
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
	
	public getDayTaskReward(day : number):boolean{
		let cfg = this.cfg;
		let flag = false;
		if(this.isEnd)
		{
			return flag;
		}
        if(day > 4){
			day = 4;
		}
		let task = cfg.dailyTask[day - 1];
		let finish = this.getDayTaskFinish(day);
		for(let k in task){
			let unit = task[k];
			let tasknum = this.getTask(unit.questType, day);
			let isget = this.isGetTaskReward(unit.questType, day);
			if(!isget && tasknum >= unit.value){
				flag = true;
				break;
			}
		}
		if(finish >= Object.keys(task).length && !this.getDayTaskFinishReward(day)){
			flag = true;
		}
		return flag; 
	}

	public getDayTaskFinishReward(day : number):boolean{
		let cfg = this.cfg;
		let flag = false;
        if(day > 4){
			day = 4;
		}
		if(this.totaltask && this.totaltask[day]){
			flag = true;
		}
		return flag; 
	}

	public getDayTaskFinish(day : number):number{
		let cfg = this.cfg;
		let num = 0;
        if(day > 4){
			day = 4;
		}
		let task = cfg.dailyTask[day - 1];
		for(let k in task){
			let unit = task[k];
			let tasknum = this.getTask(unit.questType, day);
			if(tasknum >= unit.value){
				++ num;
			}
		}
		return num; 
	}
    //免费
	public getpublicRedhot3():boolean{	
		//任务
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

	//获取任务完成次数
	public getTask(questType:string,day:number):number{
		let num = 0;
        if(this.taskinfo[day] && this.taskinfo[day][questType] && this.taskinfo[day][questType].v){
			num = this.taskinfo[day][questType].v;
		}
		return num;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(questType:string,day:number):boolean{
		let flag = false;
        if(this.taskinfo[day] && this.taskinfo[day][questType] && this.taskinfo[day][questType].flag){
			flag = this.taskinfo[day][questType].flag == 2;
		}
		return flag;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean{	
		if(this.binfo&&this.binfo.flags&&this.binfo.flags[id]==1){
            return true;
		}
		return false;
	}

	private get cfg() : Config.AcCfg.DechuanshidaiCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.DragonBoatDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						if(currObj.needMeter|| currObj.item ||currObj.needGem||currObj.questType||currObj.limit)
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
    
	// public getMyPrank():number{
	// 	let rank = 0;
	// 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
	// 		rank = this.rankinfo.myrankArr.myrank;
	// 	}
	// 	return rank;
	// }

	// public getMyPScore():number{
	// 	let score = 0;
	// 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value){
	// 		score = this.rankinfo.myrankArr.value;
	// 	}
	// 	return score;
	// }

	// public setRankInfo(data : any):void{
		
	// 	if(data.rankArr){
	// 		this.rankinfo.rankArr = data.rankArr;
	// 	}
	// 	if(data.myrankArr){
	// 		this.rankinfo.myrankArr = data.myrankArr;
	// 	}
	// }

	// public getRankInfo():any[]{
	// 	let arr = [];
	// 	if(this.rankinfo.rankArr){
	// 		arr = this.rankinfo.rankArr;
	// 	}
	// 	return arr;
	// }
	 
	public dispose():void { 
		 //道具数量 v1德 v2川 v3时 v4代
         this.ainfo = null;
         //每日免费次数
         this.isfree = 0;
         //累计充值 v充值的元宝 flags领取标记
         this.binfo = null;
         //任务完成 
         this.taskinfo = null;
         //当前第几天 
         this.diffday = 0;
         //兑换信息 同商店
         this.claim = null;
         //抽取次数
         this.num = 0;
         this.lastidx = -1;
		 this.lastpos = null;
		 this.lastday = -1;
         this.idx = 1;
	}
}