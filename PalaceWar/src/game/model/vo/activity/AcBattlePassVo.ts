class AcBattlePassVo extends AcBaseVo
{
	//特殊悬赏任务
	private atask : any = null;
	//当前经验
	private exp : number = 0;
	//当前已领取几级奖励
	private getlv : number = 0;
	//当前等级
	private lv : number = 0;
	//当前轮次
	private nowround : number = 0;
	//每轮任务
	private rtask : any = null;
	//解锁的战令
	private unlockBP : string = '';
	//令牌数目
	private shopscore : number = 0;
	//兑换信息
	private sinfo : any = null;
	//购买等级次数
	private buylv : number = 0;
	public selIdx : number = 0;
	public svtBanPos : any = null;
	public wifeBanPos : any = null;
	
	public constructor(){
		super();
	}

	public dispose():void{ 
		this.atask = null;
		this.exp = 0;
		this.getlv = 0;
		this.lv = 0;
		this.nowround = 0;
		this.rtask = null;
		this.unlockBP = '';
		this.shopscore = 0;
		this.sinfo = null;
		this.selIdx = 0;
		this.svtBanPos = null;
		this.wifeBanPos = null;
		super.dispose();
	}

	public initData(data:any):void{
		super.initData(data);
		for(let key in data){
			this[key]=data[key];
		}
	}

	public isNewUi():boolean
	{
		return this.code == 8;
	}

	private get cfg() : Config.AcCfg.BattlePassCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}	
	/*获取当前等级*/
	public getLevel():number{
		let num = 0;
		if(this.lv){
			num = this.lv;
		}
		return num;
	}
	/*获取当前经验*/
	public getCurExp():number{
		let num = 0;
		if(this.exp){
			num = this.exp;
		}
		return num;
	}
	/*获取当前购买等级的次数*/
	public getCurBuyLevelNum():number{
		let num = 0;
		if(this.buylv){
			num = this.buylv;
		}
		return num;
	}
	/*获取当前轮次*/
	public getCurRound():number{
		let num = 0;
		if(this.nowround){
			num = this.nowround;
		}
		return num;
	}
	/*获取当前轮次所获得的经验*/
	public getCurRoundExp():number{
		let num = 0;
		let nowround = this.getCurRound();
		if(this.rtask && this.rtask[nowround]){
			for(let i in this.rtask[nowround]){
				let unit = this.rtask[nowround][i];
				let tasktype = i;
				let times = 0;
				if(unit.times){
					times = unit.times;
				}
				let cfg = this.cfg.getTaskCfgByQuestType(tasktype);
				if(cfg && cfg.expGet){
					num += (cfg.expGet * times);
				}
			}
		}
		return num;
	}
	/*获取当前最大伦次*/
	public getMaxRound():number{
		let num = Math.ceil((this.et - 86400 * this.cfg.extraTime - this.st) / 86400 / this.cfg.refresh);
		return num;
	}

	public get isShowRedDot():boolean{
		let flag = false;
		if(!this.isEnd){
			for(let i = 1; i < 5; ++ i){
				if(this[`checkRedPoint${i}`]){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	/*是否有未领取的政令等级奖励*/
	public get checkRedPoint1():boolean{
		let flag = false;
		if(this.cfg){
			flag = this.getlv < Math.min(this.cfg.maxlevel, this.getLevel());
		}
		
		return flag;
	}
	/*本轮是否有未领取的任务奖励*/
	public get checkRedPoint2():boolean{
		let flag = false;
		if(this.rtask){
			for(let j in this.rtask){
				let tmp = this.rtask[j];
				for(let i in tmp){
					if(this.canLqTaskReward(i, Number(j))){
						return true;
					}
				}							
			}
		}
		return flag;
	}

	public getRoundReward(round):boolean{
		let flag = false;
		if(this.rtask && this.rtask[round]){
			let tmp = this.rtask[round];
			for(let i in tmp){
				if(this.canLqTaskReward(i, Number(round))){
					return true;
				}
			}							
		}
		return flag;
	}
	/*是否有未领取的特殊悬赏奖励*/
	public get checkRedPoint3():boolean{
		let flag = false;
		if(this.atask && this.cfg){
			for(let i in this.atask){
				let cfg = this.cfg.getSpecialTaskCfgByQuestType(i);
				let unit = this.atask[i];
				let times = 0;
				if(unit.times){
					times = unit.times;
				}
				let value = 0;
				if(unit.value){
					value = unit.value;
				}
				if(!this.isGetSpecialTaskReward(i)){
					for(let i = 1; i <= cfg.times; ++ i){
						if(value >= (i * cfg.value) && times < i){
							return true;
						}
					}
				}
			}
		}
		return flag;
	}
	/*是否有积分可兑换物品*/
	public get checkRedPoint4():boolean{
		let flag = false;
		let isJudge = false;
		if(this.cfg)
		{
			let key = `BattlePass-${this.code}Remind-${Api.playerVoApi.getPlayerID()}-${this.st}`;
			let storage = LocalStorageManager.get(key);
			if(storage && storage == '1'){
				if(GameData.serverTime >= this.et - 86400 * this.cfg.extraTime - this.cfg.remind * 86400){
					isJudge = true;
				}
			}
			else{
				isJudge = true;
			}
			if(isJudge && this.cfg){
				let score = this.getMyScore();
				for(let i in this.cfg.shop){
					let unit = this.cfg.shop[i];
					let buyNum = this.getLimitBuyNum(Number(i) + 1);
					if(unit.limit && unit.limit > buyNum && score >= unit.cost){
						flag = true;
						break;
					}
				}
			}
		}
		
		return flag;
	}
	/** 
	 * 任务
	*/
	public getTaskArr(round? : number):any[]{
		if(!round){
			round = this.getCurRound();
		}
		let arr = [];
		if(round <= this.getCurRound()){
			//随机任务
			let randonmArr = this.rtask[round];
			let rarr = [];
			for(let i in randonmArr){
				let unit = this.cfg.getTaskCfgByQuestType(i);
				if(unit){
					rarr.push({
						questType : unit.questType,
						sortId : unit.sortId,
						value : unit.value,
						times : unit.times,
						openType : unit.openType,
						expGet : unit.expGet,
						turn : unit.turn,
						value2 : unit.value2,
					});
				}
			}
			arr = arr.concat(rarr);
		}
		return arr;
	}

	 //特殊悬赏
	 public getSpecialTaskArr():any[]{
		let arr = [];
		//特殊任务
		let randonmArr = this.atask;
		for(let i in randonmArr){
			let unit = this.cfg.getSpecialTaskCfgByQuestType(i);
			if(unit){
				arr.push({
					questType : unit.questType,
					sortId : unit.sortId,
					value : unit.value,
					value2 : unit.value2,
					times : unit.times,
					openType : unit.openType,
					expGet : unit.expGet
				});
			}
		}
		return arr;
	}
	/*
	* 任务完成进度值
	*/
	public getTaskValue(questType : string, round? : number) : number{
		let num = 0;
		if(!round){
			round = this.getCurRound();
		}
		if(this.rtask && this.rtask[round] && this.rtask[round][questType]){
			let cfg = this.cfg.getTaskCfgByQuestType(questType);
			let unit = this.rtask[round][questType];
			let times = 0;
			let value = 0;
			if(unit.times){
				times = unit.times;
			}
			if(unit.value){
				value = unit.value;
			}
			num = value - times * cfg.value;
		}
		return num;
	}

	public getSpecialTaskValue(questType : string) : number{
		let num = 0;
		if(this.atask && this.atask[questType]){
			let cfg = this.cfg.getSpecialTaskCfgByQuestType(questType);
			let unit = this.atask[questType];
			let times = 0;
			let value = 0;
			if(unit.times){
				times = unit.times;
			}
			if(unit.value){
				value = unit.value;
			}
			num = value - times * cfg.value;
		}
		return num;
	}
	/*
	* 任务奖励是否领取
	*/
	public canLqTaskReward(questType : string, round? : number){
		let flag = false;
		if(!this.cfg){
			return false;
		}
		if(!round){
			round = this.getCurRound();
		}
		if(this.rtask && this.rtask[round] && this.rtask[round][questType]){
			let unit = this.rtask[round][questType];
			let cfg = this.cfg.getTaskCfgByQuestType(questType);					
			if(cfg){
				let times = 0;
				let value = 0;
				if(!this.isGetTaskReward(questType,round)){
					if(unit.times){
						times = unit.times;
					}
					if(unit.value){
						value = unit.value;
					}
					for(let i = 1; i <= cfg.times; ++ i){
						if(value >= (i * cfg.value) && times < i){
							return true;
						}
					}
				}
			}
		}
		return flag;
	}

	public isGetTaskReward(questType : string, round? : number) : boolean{
		let flag = false;
		if(!round){
			round = this.getCurRound();
		}
		if(this.rtask && this.rtask[round] && this.rtask[round][questType]){
			let cfg = this.cfg.getTaskCfgByQuestType(questType);
			let unit = this.rtask[round][questType];
			let times = 0;
			if(unit.times){
				times = unit.times;
			}
			let value = 0;
			if(unit.value){
				value = unit.value;
			}
			if(times >= cfg.times){
				flag = true;
			}
		}
		return flag;
	}

	public isGetSpecialTaskReward(questType : string) : boolean{
		let flag = false;
		if(this.atask && this.atask[questType]){
			let cfg = this.cfg.getTaskCfgByQuestType(questType);
			let unit = this.atask[questType];
			let times = 0;
			if(unit.times){
				times = unit.times;
			}
			let value = 0;
			if(unit.value){
				value = unit.value;
			}
			if(times >= unit.times){
				flag = true;
			}
		}
		return flag;
	}
	/*
	* 任务本轮完成次数
	*/
	public getTaskFinishNum(questType : string, round? : number) : number{
		let num = 0;
		if(!round){
			round = this.getCurRound();
		}
		if(this.rtask && this.rtask[round] && this.rtask[round][questType]){
			let unit = this.rtask[round][questType];
			if(unit.times){
				num = unit.times;
			}
		}
		return num;
	}

	public getSpecialTaskFinishNum(questType : string) : number{
		let num = 0;
		if(this.atask && this.atask[questType]){
			let unit = this.atask[questType];
			if(unit.times){
				num = unit.times;
			}
		}
		return num;
	}
	/*
	* 等级奖励是否领取
	*/
	public getLevelReward(level : number) : boolean{
		let flag = level <= this.getlv;
		return flag;
	}

	public getHaveGetLevel() : number{
		return this.getlv;
	}

	/*兑换次数*/
	public getLimitBuyNum(id : number):number{
		let buyNum = 0;
		let info : any = this.sinfo;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	/*当前令牌数*/
	public getMyScore():number{
		let num = this.shopscore;
		return num;
	}

	/*当前战令等级 1 2 3*/
	public getMyBattleLevel():number{
		let arr = [`primary`, `intermediate`, `advanced`]
		let num = arr.indexOf(this.unlockBP) + 1;
		return num;
	}
	/**
	 * 活动时间
	 */
	public get acTimeAndHour():string{	
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - 86400 * this.cfg.extraTime - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	public isInActivity():boolean{
		let extra = this.cfg.extraTime ? this.cfg.extraTime : 0;
		return GameData.serverTime >= this.st && GameData.serverTime < (this.et - 86400 * extra);
	}

	public getServantBanPos():number{
		let num = 0;
		if(this.isInActivity()){
			if(this.svtBanPos && Object.keys(this.svtBanPos).length){
				num = Object.keys(this.svtBanPos).length;
			}
		}
		return num;
	}

	public getWifeBanPos():number{
		let num = 0;
		if(this.isInActivity()){
			if(this.wifeBanPos && Object.keys(this.wifeBanPos).length){
				num = Object.keys(this.wifeBanPos).length;
			}
		}
		return num;
	}
}