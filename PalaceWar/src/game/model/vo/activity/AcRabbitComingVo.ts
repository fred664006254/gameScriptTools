class AcRabbitComingVo extends AcBaseVo
{
    //当前巧克力数量
	private num : number = 0;
    //每日免费次数
	private isfree : number = 0;
	//累计投喂巧克力进度及领取信息
	private process : any = null;
    //充值及领取信息
    private rinfo : any = null;
    //任务情况
    private task : any = null;
	public lastidx : number = -1;
	public lastpos : egret.Point = null;
	private _rankInfo : any = {};
    
	public constructor(){
		super();
	}

	public initData(data:any):void{
		super.initData(data);
		for(let key in data){
			this[key] = data[key];
		}
    }
	
	public getChoclateNum():number{
        return this.num;
	}

	public getLuckyProgress():number{
		let num = 0;
		if(this.process && this.process.v){
			num = this.process.v;
		}
		return num;
	}
	

	public isGetJinduAward(id):boolean{
		let flag = false;
		if(this.process && this.process.flags && this.process.flags[id]){
			flag = this.process.flags[id] == 1;
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
    
	//任务奖励
	public getpublicRedhot2():boolean{	
		//任务
		let flag = false;
		let cfg = this.cfg;
		if(this.isEnd)
		{
			return flag;
		}
		let task = cfg.task;
		for(let k in task){
			let unit = task[k];
			let tasknum = this.getTask(unit.id);
			let isget = this.isGetTaskReward(unit.id);
			if(!isget && tasknum >= unit.value){
				flag = true;
				break;
			}
		}
		return flag; 
	}

    //免费
	public getpublicRedhot4():boolean{	
        let flag = false;
        if(!this.isInActivity()){
            return flag;
        }
        if(this.isfree > 0){
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
			let unit = this.cfg.achievement[i];
			let jindu = Number(i);
			if(this.getLuckyProgress() >= unit.needNum && !this.isGetJinduAward(unit.id)){
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

	//获取任务完成次数
	public getTask(taskid:number):number{
		let num = 0;
		let type = this.config.task[taskid].questType == 1 ? 113 : this.config.task[taskid].questType;
        if(this.task && this.task.v && this.task.v[type]){
			num = this.task.v[type];
		}
		return num;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(taskid:number):boolean{
		let flag = false;
		if(this.task && this.task.flags && this.task.flags[taskid]){
			flag = this.task.flags[taskid] == 1;
		}
		return flag;
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
	
  	public getMyPrank():number{
        let rank = 0;
        if(this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.myrank && this._rankInfo.rabbitRank.myrank.myrank){
            rank = this._rankInfo.rabbitRank.myrank.myrank;
        }
        return rank;
	}
	
	public getMyPrankInfo():any{
        let rank = [];
        if(this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.rankList){
            rank = this._rankInfo.rabbitRank.rankList;
        }
        return rank;
    }


    public getMyAllPrank():number{
        let rank = 0;
        if(this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.amyrank && this._rankInfo.rabbitRank.amyrank.myrank){
            rank = this._rankInfo.rabbitRank.amyrank.myrank;
        }
        return rank;
    }

    public getMyAScore():number{
        let value = 0;
        if(this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.amyrank && this._rankInfo.rabbitRank.amyrank.value){
            value = this._rankInfo.rabbitRank.amyrank.value;
        }
        return value;
	}
	
	public getMyAlliInfo():any{
        let tmp = [];
		if(this._rankInfo.rabbitRank && this._rankInfo.rabbitRank.arankList){
            tmp = this._rankInfo.rabbitRank.arankList;
        }
        return tmp;
    }


	public setRankInfo(info : any):void{
		this._rankInfo.rabbitRank = info.rabbitRank;
        this._rankInfo.allirank = info.allirank;
    }

    public getRankInfo():any{
		return this._rankInfo;
    }

    public getAlliMemInfo():any{
        let tmp = [];
        if(this._rankInfo.allirank && this._rankInfo.allirank.rankList){
            tmp = this._rankInfo.allirank.rankList;
        }
        return tmp;
	}

	public getMyAlliMemPrank():number{
        let rank = 0;
        if(this._rankInfo.allirank && this._rankInfo.allirank.myrank && this._rankInfo.allirank.myrank.myrank){
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    }

    public getMyAlliMemScore():number{
        let value = 0;
		if(this._rankInfo.allirank && this._rankInfo.allirank.myrank && this._rankInfo.allirank.myrank.value){
            value = this._rankInfo.allirank.myrank.value;
        }
        return value;
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
		this.num = 0;
		//每日免费次数
		this. isfree = 0;
		//累计投喂巧克力进度及领取信息
		this. process = null;
		//充值及领取信息
		this. rinfo = null;
		//任务情况
		this.task = null;
		this.lastidx = -1;
		this.lastpos = null;
		this._rankInfo = {};
	}
}