class AcBeatXiongNuVo extends AcBaseVo{
    //每日免费次数
	private isfree : number = 0;
	//累计投喂巧克力进度及领取信息
	private ainfo : any = null;
    //充值及领取信息
    private rinfo : any = null;
	public lastidx : number = -1;
	public lastpos : egret.Point = null;
    
	public constructor(){
		super();
	}

	public initData(data:any):void{
		super.initData(data);
		for(let key in data){
			this[key] = data[key];
		}
    }
	
	public getCheerNum():number{
		let num = 0;
		if(this.v){
			num = this.v;
		}
        return num;
	}

	public getLuckyProgress():number{
		let num = 0;
		if(this.ainfo && this.ainfo.v){
			num = this.ainfo.v;
		}
		return num;
	}
	

	public isGetJinduAward(id):boolean{
		let flag = false;
		if(this.ainfo && this.ainfo.flags && this.ainfo.flags[id]){
			flag = this.ainfo.flags[id] == 1;
		}
		return flag;
	}

    public getFreeNum():number{
        return this.isfree;
	}

	public isFree():boolean{
		return this.getFreeNum() > 0;
	}
	
    //充值奖励
	public getpublicRedhot1():boolean{	
		//充值
		let cfg = this.cfg;
		if(this.isEnd){
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

    //免费
	public getpublicRedhot2():boolean{	
        let flag = false;
        if(!this.isInActivity()){
            return flag;
        }
        if(this.isfree > 0 || this.getCheerNum() > 0){
            flag = true;
        }
        return flag; 
	}

	//是否有未领取进度奖励
	public getpublicRedhot3():boolean{
		if (this.isEnd){
			return false;
		}
		//奖励进度宝箱
		for(let i in this.cfg.achievement){
			let unit : Config.AcCfg.BeatXiongNuProgressItemCfg = this.cfg.achievement[i];
			let jindu = Number(i);
			if(this.getLuckyProgress() >= unit.specialnum && !this.isGetJinduAward(unit.id)){
				return true;
			}
		}
		return false;
	}

	//获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean{	
		if(this.rinfo&&this.rinfo.flags&&this.rinfo.flags[id]==1){
            return true;
		}
		return false;
	}

	private get cfg() : Config.AcCfg.RabbitComingCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i <= 3; ++ i){
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

	// public getMyPrank():number{
	// 	let rank = 0;
	// 	if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
	// 		rank = this.rankinfo.myrankArr.myrank;
	// 	}
	// 	return rank;
	// }

	public getMyPScore():number{
		let score = this.v;
		return score;
	}
	
	public getArr(key):Array<any> {	
		let arr:Array<any> =[];
		let cfg = this.config;
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
						if(currObj.id)
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
	 
	public dispose():void { 
		//每日免费次数
		this. isfree = 0;
		//累计投喂巧克力进度及领取信息
		this. ainfo = null;
		//充值及领取信息
		this. rinfo = null;
		this.lastidx = -1;
		this.lastpos = null;
	}
}