class AcThreeKingdomsVo extends AcBaseVo{
	//真正开始时间
	public listred = false;
	public activeSt : number = 0;
	public activeEt : number = 0;
	private kingdom : number = 0;
	private _buildinginfo : any = [];
	private food : number = 0;
	private goods : number = 0;
	private attackNum : any = null;
	private myBuildinfo : any = null;
	private mainlandScore : any[] = [];
	private troopNum : any[] = [];
	public selectServant = {};
	private cityTask : any[] = [];
	public lastidx : number = 0;
	public lastpos = null;
	private heroUseSids = null;
	private heroRewards = null;
	private heroJoin = null;
	private rinfo : any = null;
	private meetinginfo : any = null;
	private round : number = 1;
	private joinkingdomTS : number = 0;
	private _roundMainlandScore : any = {};
	private cityRewardFlags : any = null;
	private rankActiveRwd : any = null;
	private numinkingdom : any[] = [];
	private zidgroup : any[] = [];
	private heroHpList : any = null;

	public prankroundarr : any = null;
	public zrankroundarr : any = null;
	public prankseasonarr : any = null;
	public zrankseasonarr : any = null;

	public tmpinfo : any = {};

	public constructor(){
		super();
	}

	public initData(data:any):void{
        super.initData(data);
		this.activeSt = data.activeSt;
		if(data.activeEt){
			this.activeEt = data.activeEt;
		}
		else{
			this.activeEt = this.activeSt + 29 * 86400;
		}
		if(data.kingdom){
			this.kingdom = data.kingdom;
		}
		this.food = data.food;
		this.goods = data.goods;
		this.attackNum = data.attackNum;
		this.cityTask = data.cityTask;
		this.heroUseSids = data.heroUseSids;
		this.heroRewards = data.heroRewards;
		this.heroJoin = data.heroJoin;
		this.rinfo = data.rinfo;
		this.round = data.round;
		this.joinkingdomTS = data.joinkingdomTS;
		this.cityRewardFlags = data.cityRewardFlags;
		this.rankActiveRwd = data.rankActiveRwd;//{
		this.heroHpList = data.heroHpList;
			// crossServerWifeBattle : {
			// 	st : 1593100800,
			// 	et : 1593439200,
			// 	myrank : 1,
			// 	flag : 0
			// }
		//};//
    }
    /*参赛资格*/
    public isCanJoin() : boolean{
        return Api.playerVoApi.getPlayerLevel() >= this.config.lvNeed && Api.playerVoApi.getPlayerPower() >= this.config.powerNeed;
	}
    //军政厅限时军需 充值有可领取奖励 或者 开启时第一次有引导性红点
	public getpublicRedhot1():boolean{
		let flag = false;
		if(this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod()== 2){
			let cfg : Config.AcCfg.ThreeKingdomsCfg = this.config;
			let totalcharge = this.getChargeNum();
			for(let i in cfg.recharge){
				let unit : Config.AcCfg.ThreeKingdomsLimitRechargeCfg = cfg.recharge[i];
				if(totalcharge >= unit.needGem && !this.isGetRecharge(unit.id)){
					flag = true;
					break;
				}
			}

			if(!flag){
				//开启时第一次有引导性红点
				let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `limitred` + this.getCurWeek();
				let value:string = LocalStorageManager.get(key);
				if(value){
				}
				else {
					flag = true;
				}
			}
		}
		return flag;
	}
	//派遣任务可领奖 有任务可派遣
	public getpublicRedhot2():boolean{
		let flag = false;
		if(this.getTodayWeek() < 6 && this.getMyKingdoms() && this.getCurPeriod()== 2){
			for(let i = 1; i < 6; ++ i){
				let taskinfo = this.getCityTaskStaus(i);
				if(taskinfo && (taskinfo.status == 3 || (taskinfo.status == 1 && this.isInTaskTime()))){
					if(taskinfo.status == 3){
						flag = true;
					}
					else{
						if(i == 1){
							flag = this.getCurWeek() > 1;

						}else{
							flag = true;
						}
					}
				}
				if(flag){
					break;
				}
			}
		}
		return flag;
	}
	//攻城期有免费出站次数、激战期第一次提醒
	public getpublicRedhot3():boolean{
		let flag = false;
		if(this.getTodayWeek() > 5 && this.isInWarTime() && this.getCurWarPeriod() == 3 && this.getCurPeriod()== 2 && this.getMyKingdoms() && this.getMyResource() > 0){
			//开启时第一次有引导性红点
			let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `fightwarperiod3` + this.getTodayWeek();
			let value:string = LocalStorageManager.get(key);
			if(value) {
				
			}
			else {
				flag = true;
			}
		}
		if(this.getTodayWeek() > 5 && this.isInWarTime() && ((this.isFightFree(1) && this.getCurWarPeriod() < 3) || (this.isFightFree(2) && this.getCurWarPeriod() == 3)) && this.getCurPeriod()== 2 && this.getMyKingdoms()){
			flag = true;
		}
		return flag;
	}
	//攻下城池后可领取奖励
	public getpublicRedhot4():boolean{
		let flag = false;
		if(this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod() >= 2){
			//激战期
			if(this.canGetCenterCityWarReward(1) || this.canGetCenterCityWarReward(2)){
				flag = true;
			}

			for(let i = 1; i < 5; ++ i){
				let num = i;
				for(let j = 1; j < 7; ++ j){
					if(this.canGetCityWarReward(j, num)){
						flag = true;
						break;
					}
				}
			}
		}
		return flag;
	}
	//开启时第一次有引导性红点
	public getpublicRedhot5():boolean{
		let flag = false;
		if(this.getTodayWeek() < 6 && this.getCurWeek() > 3 && this.getMyKingdoms() && this.getCurPeriod()== 2){
			if(this.isInTuxiTime()){
				//开启时第一次有引导性红点
				let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `tuxi` + this.getCurWeek() + `_` + this.getTodayWeek();
				let value:string = LocalStorageManager.get(key);
				if(value){
				}
				else {
					flag = true;
				}
			}
		}
		return flag;
	}
	//神将突袭有可领取奖励
	public getpublicRedhot8():boolean{
		let flag = false;
		if(this.getTodayWeek() < 6 && this.getCurWeek() > 3 && this.getMyKingdoms() && this.getCurPeriod()== 2){
			let herolist = this.heroHpList;
			for(let i = 1; i <= 5; ++ i){
				if(this.canGetHeroAttackReward(i)){
					if(this.isGetHeroWinReward(i)){

					}
					else{
						if(i <= this.getTodayWeek()){
							if(herolist && typeof herolist[i] != `undefined`){
								flag = herolist[i] <= 0;
								if(flag){
									break;
								}
							}
						}
					}
				}
			}
		}
		return flag;
	}
	//跨服冲榜能获得物资
	public getpublicRedhot6():boolean{

		if (this.isSelectedKindom() == false)
		{
			return false;
		}

		let flag = false;
		let info = this.getCrossActivity();
		for(let i in info){
			let unit = info[i].activity;
			for(let j in unit){
				let data = unit[j];
				let weekst = data.weekst;
				let weeket = data.weeket;
				let acet = data.acet;
				let acst = data.acst;
				let start = data.start;
				let end = data.end;
				if(this.isGetFoodReward(data.aid)){

				}
				else{
					//是否过期
					if(GameData.serverTime >= end && acet < end){
					}
					else{
						//结算时间在上周日21:30之后，本周一之前 计入本轮
						if(acet > start && acet > weekst && GameData.serverTime >= weekst){
							return true;
						}
					}
				} 
			}
		} 
		return flag;
	}
	//普通战有军令时，军令有红点，玩家点击一次（打开军令框后）消失
	public getpublicRedhot7():boolean{
		let flag = false;
		if(this.getTodayWeek() > 5 && this.getMyKingdoms() && this.getCurPeriod()== 2 && this.isInWarTime() && this.getCurWarPeriod() > 0 &&  this.getCurWarPeriod() < 3){
			let info = this.getOrderInfo();
			if(info.state == 2){
				//开启时第一次有引导性红点
				let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `order` + this.getCurWeek() + this.getTodayWeek() + this.getCurWarPeriod();
				let value:string = LocalStorageManager.get(key);
				if(value){
				}
				else {
					flag = true;
				}
			}
		}
		return flag;
	}

	public canGetCityWarReward(cityid : number, num : number):boolean{
		let flag = false;
		let citywarinfo = this.getCityWarInfo(cityid, num);
		//周六
		let week = this.getCurWeek();
		let start =this.activeSt + (week - 1) * (7 * 86400);
        let unit : Config.AcCfg.ThreeKingdomsActiveCfg = this.config.activeTime[num % 2 == 1 ? 2 : 3];
		let tmp = num < 3 ? 6 : 7;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
		let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
		//奖励
		if(citywarinfo.kingdoms == this.getMyKingdoms() && !citywarinfo.ischange && !this.isGetCityReward(cityid, num) && (GameData.serverTime < this.et && GameData.serverTime >= et)){
			flag = true;
		}
		return flag;
	}

	public canGetCenterCityWarReward(type : number):boolean{
		let flag = false;
		//周六
		//本周激战期
		let week = this.getCurWeek();
		let start = this.activeSt + (week - 1) * (7 * 86400);
		let unit : Config.AcCfg.ThreeKingdomsActiveCfg = this.config.activeTime[4];
		let isjingzhou = type == 1;
		let tmp = isjingzhou ? 6 : 7;
		let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
		//奖励
		let centercitywarinfo = this.getCenterCityWarInfo(isjingzhou ? 1 : 2);
		if(centercitywarinfo.kingdoms == this.getMyKingdoms() && !centercitywarinfo.ischange && !this.isGetCenterCityReward(type) && (GameData.serverTime < this.et && GameData.serverTime >= et)){
			flag = true;
		}
		return flag;
	}

	public get isShowRedDot(): boolean{	
		for(let i = 1; i <= 8; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 
    
	public get acTimeAndHour():string{	
		let et = this.activeEt;// - 0.5 * 3600;
		return App.DateUtil.getOpenLocalTime(this.activeSt,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.activeSt && GameData.serverTime < this.activeEt;
	}
	
	//活动阶段 1未开始 2进行中 3展示期 4已结束
	public getCurPeriod():number{
		let period = 0;
		if(GameData.serverTime < this.activeSt){
			period = 1;
		}
		else if(GameData.serverTime >= this.activeEt && GameData.serverTime < this.et){
			period = 3;
		}
		else if(GameData.serverTime >= this.et){
			period = 4;
		}
		else{
			period = 2;
		}
		return period;
	}

	//轮次阶段 1未开始 2进行中 3休战中 4已结束
	public getCurRound():number{
		let period = this.getCurPeriod();
		let round = 0;
		if(period == 1){
			round = 1;
		}
		else if(period == 2){
			if(this.isInRest()){
				if(this.isLastWeek() && this.getTodayWeek() == 7 && this.isTodayWarEnd()){
					round = 4;
				}
				else{
					round = 3;
				}
			}
			else{
				round = 2;
			}
		}
		else{
			round = 4;
		}
		return round;
	}
	//处于休息阶段
	public isInRest():boolean{
		let flag = false;
		let cfg : Config.AcCfg.ThreeKingdomsActiveCfg[] = this.config.activeTime;
		let week = this.getCurWeek();
		//本周周一活动开始时间
		let st = this.activeSt + (week - 1) * (7 * 86400) + cfg[0].popularityRange[0] * 3600;
		//本周周日活动结束时间
		let et = this.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + cfg[4].popularityRange[1] * 3600;
		flag = GameData.serverTime >= et;//GameData.serverTime < st || 
		
		return flag;
	} 

	//下轮开启时间
	public getNextRoundSt():string{
		let flag = false;
		let week = this.getCurWeek();
		let cfg : Config.AcCfg.ThreeKingdomsActiveCfg[] = this.config.activeTime;
		let st = this.activeSt + (week) * (7 * 86400) + cfg[0].popularityRange[0] * 3600;
		return App.DateUtil.getFormatBySecond(st, 10);
	} 
	/**
	 * 获取倒计时
	*/
	public getCountDown():string{
		let period = this.getCurPeriod();
		let et = 0;
		switch(period){
			case 1:
				et = this.activeSt;
				break;
			case 2:
				et = this.activeEt
				break;
			case 3:
				et = this.et;
				break;
			case 4:
				et = 0;
				break;
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
	}

	/**
	 * 获取轮次倒计时
	*/
	public getRoundDown():string{
		let round = this.getCurRound();
		let et = 0;
		if(round == 2){
			let week = this.getCurWeek();
			let cfg : Config.AcCfg.ThreeKingdomsActiveCfg[] = this.config.activeTime;
			//本周周日活动结束时间
			et = this.activeSt + (week - 1) * (7 * 86400) + 6 * 86400 + cfg[4].popularityRange[1] * 3600;
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 17);
	}

	/**
	 * 获取当前周数
	*/
	public getCurWeek():number{
		let week = 0;
		if(this.getCurPeriod() >= 3){
			week = Math.ceil((this.activeEt - 1 - this.activeSt) / (7 * 86400));
		}
		else{
			week = Math.ceil((GameData.serverTime - this.activeSt) / (7 * 86400));
		}
		return Math.max(week,1);
	}
	/**
	 * 是否最后一周
	*/
	public isLastWeek():boolean{
		let week = this.getCurWeek();
		let nextweekst = this.activeSt + (week) * 7 * 86400;
		return this.activeEt <= nextweekst;
	}

	/**
	 * 判断现在是星期几
	*/
	public getTodayWeek():number{
		let prepare = this.activeSt + (this.getCurWeek() - 1) * 86400 * 7;
		let Today = Math.floor((GameData.serverTime - prepare) / 86400);
		return Today + 1;
	}

	/**
	 * 周日晚上九点半以后不可更换阵营
	*/
	public getWeekendLock():boolean{
		let week1 = this.getTodayWeek();


		if (week1 == 7)
		{
			let daytime = GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime);
			if (daytime > 21.5*3600)
			{
				return true;
			}
		}

		return false;
	}

	/**
	 * 本周攻城战开启时间
	*/
	public getWarFightTimeSt(type : number):string{
		//type 1开启倒计时 2开启时间戳
		let week = this.getCurWeek();
		//本周周六攻城开始时间
		let st = this.activeSt + (week - 1) * (7 * 86400) +  5 * 86400 + this.config.activeTime[2].popularityRange[0] * 3600;				
		return type == 1 ? App.DateUtil.getFormatBySecond(st-GameData.serverTime) : App.DateUtil.getFormatBySecond(st,10);
	}

	/**
	 * 是否处于神将突袭的时间段
	*/
	public isInTuxiTime():boolean{
		if(this.getCurPeriod() == 2){
			let timest = this.config.activeTime[1].popularityRange[0];
			let timeet = this.config.activeTime[1].popularityRange[1];
			let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
			return this.getCurWeek() == 4 && this.getTodayWeek() < 6 && nowtime >= timest && nowtime < timeet;
		}
		else{
			return false;
		}
	}
		
	/**
	 * 今日神将突袭是否已结束
	*/
	public isTuxiEnd():boolean{
		let timeet = this.config.activeTime[1].popularityRange[1];
		let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
		return nowtime >= timeet;
	}
	/**
	 * 神将突袭倒计时
	*/
	public getTuxiTimeCD(type : number):string{
		//type 1 神将突袭开启倒计时 2 神将突袭剩余倒计时
		let timest = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[1].popularityRange[0] * 3600;
		let timeet = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[1].popularityRange[1] * 3600;
		let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
		let et = 0;
		if(type == 2){
			et = timeet;
		}
		else{
			et = timest;
			if(this.isTuxiEnd()){
				et += 86400; 
			}
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime));
	}

	/**
	 * 是否处于攻城战的时间段
	*/
	public isInWarTime():boolean{
		let flag = false;
		if(this.getCurPeriod() == 2){
			for(let i = 3; i < 6; ++ i){
				let cfg : Config.AcCfg.ThreeKingdomsActiveCfg = this.config.activeTime[i - 1];
				let timest = cfg.popularityRange[0];
				let timeet = cfg.popularityRange[1];
				let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
				if(this.getTodayWeek() > 5 && nowtime >= timest && nowtime < timeet){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	/**
	 * 处于攻城战的阶段 0第一场未开始 1 攻城战第一场 2攻城战第二场 3攻城战第三场-赤壁，荆州
	*/
	public getCurWarPeriod():number{
		let cueWarPeriod = 0;
		for(let i = 3; i < 6; ++ i){
			let cfg : Config.AcCfg.ThreeKingdomsActiveCfg = this.config.activeTime[i - 1];
			let timest = cfg.popularityRange[0];
			let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
			if(this.getTodayWeek() > 5 && nowtime >= timest){
				cueWarPeriod = i - 2;
			}
		}
		return cueWarPeriod;
	}
	/**
	 * 今日攻城战是否已结束
	*/
	public isTodayWarEnd():boolean{
		let timeet = this.config.activeTime[4].popularityRange[1];
		let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
		return nowtime >= timeet;
	}
	/**
	 * 今日攻城战倒计时
	*/
	public getWarTimeCD(type : number):string{
		//type 1 攻城战开启倒计时 2 攻城战剩余倒计时
		let et = 0;
		for(let i = 3; i < 6; ++ i){
			let cfg : Config.AcCfg.ThreeKingdomsActiveCfg = this.config.activeTime[i - 1];
			let timest = App.DateUtil.getWeeTs(GameData.serverTime) + cfg.popularityRange[0] * 3600;
			let timeet = App.DateUtil.getWeeTs(GameData.serverTime) + cfg.popularityRange[1] * 3600;
			if(type == 1){
				if(GameData.serverTime < timest){
					et = timest;
					break;
				}
			}
			else{
				if(GameData.serverTime >= timest && GameData.serverTime < timeet){
					et = timeet;
					break;
				}
			}
		}
		if(type == 1){
			if(this.isTodayWarEnd()){
				et = App.DateUtil.getWeeTs(GameData.serverTime) + this.config.activeTime[2].popularityRange[0] * 3600 + 86400;
			}
		}
		return App.DateUtil.getFormatBySecond(et - GameData.serverTime);
	}
	
	/*
	* 最后一条记录
	**/
	public getLastChargeLog():any{
		let obj = {
			name : '测试1',
		};
		return obj;
	}

	/*
	* 战斗记录
	**/
	public getWarLog():any[]{
		let arr = [];
		return arr;
	}

	/*
	*是否已经选择阵营
	**/
	public isSelectedKindom():boolean{
		return this.kingdom > 0;
	}	

	/*
	*自己的阵营
	**/
	public getMyKingdoms():number{
		return this.kingdom;
	}
	
	/*
	*获取参赛区服
	**/
	public getPkzidsStr():string{
		let zidObj = null;
		let zid = [];
		let qu = [];

		let arr = [];
		for(let i in this.zidgroup){
			zid.push(Number(this.zidgroup[i]));
		}
		// for(let i = 1; i <= 100; ++i){
		// 	arr.push(i);
		// }

		// for(let i = 99; i >= 0; --i){
		// 	let rid = App.MathUtil.getRandom(0,i+1);
		// 	let tmp = arr[i];
		// 	arr[i] = arr[rid];
		// 	arr[rid] = tmp;
		// }

		// for(let i in arr){
		// 	if(Math.random() > 0.8){
		// 		qu.push(arr[i]);
		// 	}
		// 	else{
		// 		zid.push(arr[i]);
		// 	}
		// }
		// let tset = [];
		// for(let i =0;i< tset.length;i++){
		// 	zidObj = tset[i];
		// 	if(zidObj.qu){
		// 		qu.push(Number(zidObj.qu));
		// 	} else {
		// 		zid.push(Number(zidObj.zid));
		// 	}
		// }
		return App.StringUtil.formatMultiServerServerAndZid(qu,zid);
	}

	/*
	*获取推荐区服 人数最少
	三个阵营权势一样，就是随机1个，给推荐阵营标签，其余无标签
	三个权势不一样，就权势最低的一个，给推荐阵营标签，其余无标签
	玩家点开选择阵营按钮，默认选中的是，推荐阵营
	**/
	public getRecommandTeam():number{
		let arr = [];
		for(let i = 1; i < 4; ++ i){
			arr.push({
				kid : i,
				num : this.getKingdomsInfo(i).num
			});
		}
		arr.sort((a,b)=>{
			return a.num - b.num
		});
		return arr[0].kid;
	}

	/*
	*获取本轮阵营分数
	**/
	public getPoint(team):number{
		let num = 0;
		if(this.mainlandScore){
			for(let i in this.mainlandScore){
				let unit = this.mainlandScore[i];
				num += unit[team - 1];
			}
		}
		return num;
	}

	/*
	*获取上轮阵营分数
	**/
	public getLastRoundPoint(team):number{
		let num = 0;
		if(this.prankseasonarr && this.prankseasonarr.seasonScore){
			let scorearr = this.prankseasonarr.seasonScore;
			let arr = [0,0,0];
			let unit = scorearr[this.getCurWeek() - 1 - 1];
			for(let j in unit){
				arr[j] += unit[j];
			}
			num = arr[team - 1];
		}
		return num;
	}

	/*
	*获取某个阵营在某座城市的阵营分数
	**/
	public getCityPoint(kingdom : number, cityid : number, kid : number):number{
		let num = 0;
		let mainland = (kingdom - 1) * 2 + (cityid - 3);
		if(kingdom == 0){
			mainland = 7;
		}
		if(this.mainlandScore && this.mainlandScore[mainland - 1] && this.mainlandScore[mainland - 1][kid - 1]){
			num = this.mainlandScore[mainland - 1][kid - 1];
		}
		return num;
	}

	/*
	*获取某个阵营在某座城市的预估每秒获得分数
	**/
	public getCityPerCore(kingdom : number, cityid : number, kid : number):number{
		let num = 0;
		if(this._buildinginfo){
			for(let i in this._buildinginfo){
				let info = this._buildinginfo[i];
				if(Number(info.kingdom) == kid && info.uid){
					++ num;
				}
			}
		}
		return num * (kingdom == 0 ? this.config.campScore2 : this.config.campScore1);
	}

	/*
	*获取某个阵营在某座城市中的某个据点的玩家信息
	**/
	public getJudianPlayerInfo(kingdom : number, cityid : number, id : number):any{
		let obj = null;
		if(this._buildinginfo){
			for(let i in this._buildinginfo){
				let info = this._buildinginfo[i];
				if(Number(info.building) == id && info.uid){
					obj = {
						uid : info.uid,
						pic : info.pic,
						zid : info.zid,
						ptitleid : info.ptitle,
						titleid : info.title,
						name : info.name,
						kingdomid : info.kingdom,
						army : info.totalattr,
						max : info.fullattr,
					};
					break;
				}
			}
			
		}
		// if(Math.random() > 0.4){
		// 	obj = {
		// 		uid : 100001,
		// 		pic :App.MathUtil.getRandom(1,6),
		// 		ptitleid : 4000 + id,
		// 		titleid : 3000 + id,
		// 		name : '玩家名',
		// 		kingdomid : App.MathUtil.getRandom(1,4),
		// 		army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
		// 	};
		// }
		return obj;
	}

	/*
	*获取某个阵营在某座城市中的某个据点的名字
	**/
	public getCityName(kingdom : number, cityid : number, id : number):string{
        let cityName = '';
		let code = `1`;
		//固定前缀
		let partname1 = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdom${kingdom}_${cityid}`, code), [id.toString()]);
		let tmp = id % 8 == 0 ? 8 : (id % 8);
		let partname2 = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acmainlandcityPos${tmp}`, code));
		cityName = partname1;
        return cityName;
    }

	/*
	*获取某个阵营在某座城市中的援兵加成数据百分比
	**/
	public getCityYuanBingPercent(kingdom : number, cityid : number, kid : number, isCentercity : boolean):number{
		let num = 0;
		let add = this.getAddBuff(3, isCentercity, kingdom , cityid, kid);
		if(add.length){
			num = add[0].add
		}
			return num;
	}
	
	/*
	*获取某个阵营在某座城市中的援军数
	**/
	public getCityKingdomArmy(kingdom : number, cityid : number, kid : number):number{
		let num = 0;
		//
		let mainland = (kingdom - 1) * 2 + (cityid - 3);
		if (kingdom == 0)
		{
			mainland = 7;
		}
		if(this.troopNum && this.troopNum[mainland - 1] && this.troopNum[mainland - 1][kid - 1]){
			num = this.troopNum[mainland - 1][kid - 1];
		}
		return num;
	}

	/*
	* //buff加成 1城防 2神将 3援军 4神器
	**/
	public getAddBuff(type : number, iscenter : boolean, fromkid : number, cityid : number, findkid : number):{add : number, addType : number}[]{
		let add = [];
		if(type == 2){
			let curexp = this.getHeroCheerExp();
			let curadd = 0;
			for(let i in this.config.heroList){
				let cfg : Config.AcCfg.ThreeKingdomsHeroListCfg = this.config.heroList[i];
				if(curexp >= cfg.needExp){
					curadd = cfg.addAtk;
				}
			}
			if(curadd > 0){
				add.push({
					add : curadd,
					addType : 1,//1攻击
				});
			}
		}
		else if(type == 3){
			let armynum = this.getCityKingdomArmy(fromkid, cityid, findkid);
			let add1 = 0;
			let add2 = 0;
			//援军数
			let uidata = iscenter ? this.config.troop2 : this.config.troop1;
            for(let index = 0; index < uidata.length; index++) {
                let element : Config.AcCfg.ThreeKingdomsTroop1Cfg = uidata[index];
                if(armynum >= (element.needNum * 100000000)){
					add1 = element.addAtk;
                }
			}

			//对应排名
			let rankdata = iscenter ? this.config.troopRank1 : this.config.troopRank2;
			let point = [
				{
					kid : 1,
					num : this.getCityKingdomArmy(fromkid, cityid, 1),
				},
				{
					kid : 2,
					num : this.getCityKingdomArmy(fromkid, cityid, 2),
				},
				{
					kid : 3,
					num : this.getCityKingdomArmy(fromkid, cityid, 3),
				},
			];
			point.sort((a,b)=>{
				if(a.num == b.num){
					return a.kid - b.kid;
				}
				else{
					return b.num - a.num;
				}
			});
			let rank = 0;
			for(let i = 0; i < point.length; ++ i){
				if(point[i].kid == findkid){
					rank = i + 1;
					break;
				}
			}
			for(let index = 0; index < rankdata.length; index++) {
                let element : Config.AcCfg.ThreeKingdomsTroop1RankCfg = rankdata[index];
                if(armynum < (element.needNum * 100000000)){
                    break;
                }
                add2 = element[`rank${rank}`];
			}
			if((add1+add2) > 0){
				add.push({
					add : add1+add2,
					addType : 1,//1攻击
				});
			}
		}
		else if(type == 4){
			let slist = Api.servantVoApi.getServantInfoList();
			let num = 1;//Object.keys(slist).length;
			let atktotal = 0;
			let bloodtotal = 0;
			let crittotal = 0;
			for(let i in slist){
				let unit : ServantInfoVo= slist[i];
				let weaponinfo = Api.weaponVoApi.getWeaponInfoVoByServantId(unit.servantId);
				if(weaponinfo && weaponinfo.cfg && weaponinfo.cfg.attributeType1){
					if( weaponinfo.cfg.attributeType1 == 4){
						atktotal += (Number(weaponinfo.getAttributeValueType1()) * num);
					}
					else if(weaponinfo.cfg.attributeType1 == 5){
						bloodtotal += (Number(weaponinfo.getAttributeValueType1()) * num);
					}
					else if(weaponinfo.cfg.attributeType1 == 6){
						let critnum = Number(weaponinfo.getAttributeValueType1().split(`%`)[0])/100;
						crittotal += (critnum * num);
					}
				}
			}
			if(atktotal > 0){
				add.push({
					add : atktotal,
					addType : 1,//1攻击
				});
			}
			if(bloodtotal){
				add.push({
					add : bloodtotal,
					addType : 2,//2血量
				});
			}

			if(crittotal){
				add.push({
					add : crittotal,
					addType : 3,//暴击伤害
				});
			}
		}
		return add;
	}

	/*
	*1属性总加成 2资质总加成
	**/
	public getAddBuffNum(type : number):number{
		let add = type * 100;
		return add;
	}

	/*
	*兵力基础值
	**/
	public getMyArmyNum():number{
		let num = 0;
		let slist = Api.servantVoApi.getServantInfoList();
		for(let i in slist){
			let unit : ServantInfoVo = slist[i];
			num += (unit.total);
		}
		return num * this.config.hpBase;
	}

	/*
	*攻击力基础值
	**/
	public getMyAtkNum():number{
		let num = 0;
		let slist = Api.servantVoApi.getServantInfoList();
		for(let i in slist){
			let unit : ServantInfoVo = slist[i];
			num += (unit.getTotalBookValue());
		}
		return num * this.config.atkBase;
	}

	/*
	*自己的粮草数量 普通攻城
	**/
	public getMyFood():number{
		return this.food;
	}

	/*
	*自己的军资数量 激战攻城
	**/
	public getMyResource():number{
		return this.goods;
	}

	/*
	*自己的军队是否已经派遣出去了
	**/
	public isSendArmy():boolean{
		let flag = false;
		if(this.myBuildinfo && this.myBuildinfo.building){
			flag = true;
		}
		return flag;
	}

	/*
	*自己的军队占领的据点信息
	**/
	public myArmyInfo():any{
		let obj = {};
		if(this.isSendArmy()){
			obj = {
				kingdomid : this.myBuildinfo.mainland == 7 ? 0 : Math.ceil(this.myBuildinfo.mainland / 2),
				cityid : this.myBuildinfo.mainland - (Math.ceil(this.myBuildinfo.mainland / 2) - 1) * 2 + 3,
				judianid : this.myBuildinfo.building,
			};
		}
		return obj;
	}
	/*
	*本轮还有免费次数吗
	**/
	public isFightFree(type : number):boolean{
		let freemax = this.config.getFightNum(type);
		let num = 0;
		if(this.attackNum && this.attackNum.num){
			num = this.attackNum.num;
		}
		return num < freemax;
	}

	/*
	*本轮还有的出战次数
	**/
	public getMyFightNum(type : number):number{
		let freemax = this.config.getFightNum(type);
		let num = freemax;
		if(this.attackNum){
			num = Math.min(freemax,freemax - (this.attackNum.num));
		}
		return num;
	}

	/*
	*出战CD时间 为0则无cd
	**/
	public getFightCD(iscenter:boolean):number{
		let num = 0;
		if(this.attackNum && this.attackNum.st){
			num = this.attackNum.st + (iscenter ? this.config.coldTime2 : this.config.coldTime1) - GameData.serverTime
		}
		return num;
	}

	public setBuildingInfo(info:any):void{
		this._buildinginfo = [];
		if(info && info.length){
			this._buildinginfo = info;
		}
	}

	public setBuildingInfoById(info:any):void{
		for(let i in info){
			let buildid = 0;
			let unit = info[i];
			if(unit && unit.building){
				let flag = true;
				for(let j in this._buildinginfo){
					let tmp = this._buildinginfo[j];
					if(tmp.building == unit.building && tmp.mainland == unit.mainland){
						this._buildinginfo[j] = null;
						this._buildinginfo[j] = unit;
						flag = false;
						break;
					}
				}
				if(flag){
					this._buildinginfo.push(unit);
				}
			}
		}
	}
	//阵营赛季分数
	public getMyZrankSeasonPoints(mykid : number = 0):number{
		let rank = 0;
		if(!mykid){
			mykid = this.getMyKingdoms();
		}
		if(mykid){
			if(this.prankseasonarr && this.prankseasonarr.seasonScore){
				let scorearr = this.prankseasonarr.seasonScore;
				let arr = [0,0,0];
				for(let i in scorearr){
					let unit = scorearr[i];
					for(let j in unit){
						if(!arr[j]){
							arr[j] = 0;
						}
						arr[j] += Number(unit[j]);
					}
				}
				rank = arr[mykid - 1];
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//阵营本轮分数
	public getMyZrankRoundPoints(mykid : number = 0):number{
		let rank = 0;
		if(!mykid){
			mykid = this.getMyKingdoms();
		}
		if(mykid){
			if(this.prankseasonarr && this.prankseasonarr.seasonScore){
				let scorearr = this.prankseasonarr.seasonScore;
				let arr = [0,0,0];
				let unit = scorearr[scorearr.length - 1];
				for(let j in unit){
					arr[j] += unit[j];
				}
				rank = arr[mykid - 1];
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//阵营赛季排名
	public getMyZrankSeason():number{
		let rank = 0;
		let mykid = this.getMyKingdoms();
		if(mykid){
			if(this.prankseasonarr && this.prankseasonarr.seasonScore){
				let arr = [{kingdomid : 1, value : this.getMyZrankSeasonPoints(1)},{kingdomid : 2, value : this.getMyZrankSeasonPoints(2)},{kingdomid : 3, value : this.getMyZrankSeasonPoints(3)}];
				arr.sort((a,b)=>{
					return b.value - a.value;
				});
				for(let i = 0; i < 3; ++ i){
					if(arr[i].kingdomid == mykid){
						rank = Number(i) + 1;
						break;
					}
				}
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//阵营本轮排名
	public getMyZrankRound():number{
		let rank = 0;
		let mykid = this.getMyKingdoms();
		if(mykid){
			let arr = [{kingdomid : 1, value : this.getMyZrankRoundPoints(1)},{kingdomid : 2, value : this.getMyZrankRoundPoints(2)},{kingdomid : 3, value : this.getMyZrankRoundPoints(3)} ];
			arr.sort((a,b)=>{
				return b.value - a.value;
			});
			for(let i = 0; i < 3; ++ i){
				if(arr[i].kingdomid == mykid){
					rank = Number(i) + 1;
					break;
				}
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//个人本轮分数
	public getMyPrankRoundPoints():number{
		let rank = 0;
		if(this.getMyKingdoms()){
			if(this.prankroundarr && this.prankroundarr.myrankArr && this.prankroundarr.myrankArr.value){
				rank = this.prankroundarr.myrankArr.value;
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//个人赛季分数
	public getMyPrankSeasonPoints():number{
		let rank = 0;
		if(this.getMyKingdoms()){
			if(this.prankseasonarr && this.prankseasonarr.myrankArr && this.prankseasonarr.myrankArr.value){
				rank = this.prankseasonarr.myrankArr.value;
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//个人本轮排名
	public getMyPrankRoundRank():number{
		let rank = 0;
		if(this.getMyKingdoms()){
			if(this.prankroundarr && this.prankroundarr.myrankArr && this.prankroundarr.myrankArr.myrank){
				rank = this.prankroundarr.myrankArr.myrank;
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}
	//个人赛季排名
	public getMyPrankSeaonRank():number{
		let rank = 0;
		if(this.getMyKingdoms()){
			if(this.prankseasonarr && this.prankseasonarr.myrankArr && this.prankseasonarr.myrankArr.myrank){
				rank = this.prankseasonarr.myrankArr.myrank;
			}
		}
		else{
			rank = 0;
		}
		return rank;
	}

	public setMapInfo(data : any):void{
		if(data.mainlandScore){
			this.mainlandScore = data.mainlandScore;
		}
		if(data.troopNum){
			this.troopNum = data.troopNum;
		}
		if(data.myBuildinfo){
			this.myBuildinfo = data.myBuildinfo;
		}
		if(data.zidgroup){
			this.zidgroup = data.zidgroup;
		}
		if(data.numinkingdom){
			this.numinkingdom = data.numinkingdom;
		}
		if(data.roundMainlandScore){
			this._roundMainlandScore = data.roundMainlandScore;
		}
	}

	//当前这一轮的各城市信息
	public getCurRoundCityWarInfo(kingdomid : number, cityId : number):any{
		//cityid 城市 num 第几场 1 2周六 3 4周日
		let score = [];
		score.push(this.getCityPoint(kingdomid, cityId, 1));
		score.push(this.getCityPoint(kingdomid, cityId, 2));
		score.push(this.getCityPoint(kingdomid, cityId, 3));
		let kingdoms = 0;
		let max = 0;
		for(let i = 0; i < score.length; ++ i){
			let kid = Number(i) + 1;
			if(score[i] > max){
				max = score[i];
				kingdoms = kid;
			}
		}
		return {
			kingdoms : kingdoms,
		};
	}

	//当前这一轮的中心城市信息
	public getCurRoundCenterCityWarInfo():any{
		//cityid 城市 num 第几场 1 2周六 3 4周日
		let score = [];
		score.push(this.getCityPoint(0, 0, 1));
		score.push(this.getCityPoint(0, 0, 2));
		score.push(this.getCityPoint(0, 0, 3));
		let kingdoms = 0;
		let max = 0;
		for(let i = 0; i < score.length; ++ i){
			let kid = Number(i) + 1;
			if(score[i] > max){
				max = score[i];
				kingdoms = kid;
			}
		}
		return {
			kingdoms : kingdoms,
		};
	}


	public getCityTaskStaus(cityid : number):any{
		let status = 0;
		let info = null;
		if(this.cityTask){
			info = this.cityTask[cityid == 1 ? 4 : (cityid - 2)];
		}
		let level = 1;
		let et = 0;
		let arr = null;
		if(info){
			level = info.lv;
			let cfg : Config.AcCfg.ThreeKingdomsTaskListCfg = this.config.taskList[level - 1];
			if(typeof info.sids == `undefined`){
				status = 1;
			}
			else{
				if(info.flag && info.flag == 1){
					status = 4;
				}
				else{
					et = info.st + cfg.needTime;
					status = GameData.serverTime < et ? 2 : 3; 
				}
			}
			arr = info.sids;
		}
		//1可派遣 2已派遣 3可领取 4已完成
		return {
			status : status,
			et : et,
			level : level,
			servantArr : arr
		}
	}

	public getIsAllTaskFinish():boolean{
		let flag = true;
		for(let i = 1; i <= 5; ++ i){
			if(i == 1 && this.getCurWeek() == 1){
				continue;
			}
			let info = this.getCityTaskStaus(i);
			if(info.status < 3){
				flag = false;
				break;
			}
		}
		return flag;
	}

	public getServantAttend(sid : number|string):boolean{
		let flag = false;
		for(let i = 1; i <= 5; ++ i){
			let info = this.getCityTaskStaus(i);
			if(info.servantArr && info.servantArr.indexOf(String(sid)) > -1){
				flag = true;
				break;
			}
		}
		return flag;
	}

	//获取大都督信息
	public getGeneralPlayerInfo():any{
		let obj = null;
		// if(Math.random() > 0.4){
		// 	obj = {
		// 		uid : 100001,
		// 		pic :App.MathUtil.getRandom(1,6),
		// 		ptitleid : 4000 + id,
		// 		titleid : 3000 + id,
		// 		name : '玩家名',
		// 		kingdomid : App.MathUtil.getRandom(1,4),
		// 		army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
		// 	};
		// }
		// obj = {
	
		// 	kingdomid : App.MathUtil.getRandom(1,4),
		// 	army : App.StringUtil.changeIntToText(App.MathUtil.getRandom(10000000,20000000)),
		// };
		obj = this.getOfficalInfo(1);
		return obj;
	}
	/**
	 * 是否处于派遣任务时间段
	*/
	public isInTaskTime():boolean{
		if(this.getCurPeriod() == 2){
			let timest = this.config.activeTime[0].popularityRange[0];
			let timeet = this.config.activeTime[0].popularityRange[1];
			let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
			return this.getTodayWeek() < 6 && nowtime >= timest && nowtime < timeet;
		}
		else{
			return false;
		}
	}

	/**
	 * 派遣任务时间已结束
	*/
	public isTaskTimeEnd():boolean{
		let timest = this.config.activeTime[0].popularityRange[0];
		let timeet = this.config.activeTime[0].popularityRange[1];
		let nowtime = (GameData.serverTime - App.DateUtil.getWeeTs(GameData.serverTime)) / 3600;
		return this.getTodayWeek() < 6 && nowtime >= timeet;
	}

	/**
	 * 获取对应职位信息 1大都督 2尚书 3主簿
	*/
	public getOfficalInfo(type : number):any{
		let obj = null;
		// if(this.meetinginfo && this.meetinginfo.rankArr && this.meetinginfo.rankArr[type - 1]){
			let unit =  this.meetinginfo.rankArr[type - 1];
			if(unit){//unit
				obj = {
					uid : unit.uid,
					pic : unit.pic?unit.pic:1,
					ptitleid : unit.ptitle,
					title : type == 1 ? Api.playerVoApi.getTitleInfo() : unit.title,
					name : unit.name,
					level : unit.level,
					clothes : type == 1 ? Api.playerVoApi.getTitleInfo() : unit.title.clothes,
					// uid : 100001,
					// pic :App.MathUtil.getRandom(1,6),
					// ptitleid : 4000 + 1,
					// name : '玩家名',
					// level : 8,
				};
				// if(type <= 2){
				// 	obj.title = {
				// 		title : 3001,
				// 		tlv : 5,
				// 		clothes : 3001,
				// 		clv : 6,
				// 	};
				// }
			}
		//}
	
		return obj;
	}

	/**
	 * 自己是否担任本阵营的高官
	*/
	public getIsMyOffical():boolean{
		let flag = false;
		for(let i = 1; i < 4; ++ i){
			let info = this.getOfficalInfo(i);
			if(info && Number(info.uid) == Api.playerVoApi.getPlayerID()){
				flag = true;
				break;
			}
		}
		return flag;
	}

	/**
	 * 获取当前正在生效的军令详情  1未生效 2发布中
	*/
	public getOrderInfo():any{
		let state = 1;
		let obj = null;
		let targetcity = 0;
		let targetkingdom = 0;
		let targetweekday = 0;
		let targetround = 0;
		let targetnum = 0;
		//是否在普通攻城期
		if(this.isInWarTime() && this.getCurWarPeriod() < 3){
			let id = this.getTodayWeek() == 6 ? (this.getCurWarPeriod() == 1 ? 1 : 2) : (this.getCurWarPeriod() == 1 ? 3 :4);
			let info = this.getOrderCityInfo(id);
			if(info){
				state = 2;
				targetkingdom = info.targetkingdom;
				targetcity = info.targetcity;
				targetweekday = this.getTodayWeek();
				targetround = this.getCurWarPeriod();
				targetnum = id;
			}
		}
		else{
			state = 1;
		}
		return {
			state : state,
			targetcity : targetcity,
			targetkingdom : targetkingdom,
			targetweekday : targetweekday,
			targetround : targetround, 
			targetnum : targetnum
		};
	}
	/**
	 * 获取当前4个军令对应的详情 1 2 3 4
	*/
	public getOrderCityInfo(i:number):any{
		let obj = null;
		let day = i < 3 ? 6 : 7;
		let ftype = i % 2 == 1 ? 3 : 4;
		if(this.meetinginfo && this.meetinginfo.order && this.meetinginfo.order[day] && this.meetinginfo.order[day][ftype]){
			let cityid = this.meetinginfo.order[day][ftype];
			obj = {
				targetcity : cityid,
				targetkingdom : Math.ceil(cityid / 2),
			};
		}
		return obj;
	}

	/**
	 * 获取神将助威信息
	*/
	public getHeroCheerExp():number{
		let exp = 0;
		if(this.meetinginfo && this.meetinginfo.heroexp){
			exp =  this.meetinginfo.heroexp;
		}
		return exp;
	}

	/**
	 * 获取阵营信息
	*/
	public getKingdomsInfo(i:number):any{
		let num = 0;
		if(this.numinkingdom && this.numinkingdom[i - 1]){
			num = Number(this.numinkingdom[i - 1]);
		}
		return {
			num : num,
		};
	}

	/**
	 * 获取自己密信数量
	*/
	public getMyLetterNum():number{
		let rewardvo = GameData.formatRewardItem(this.config.change)[0];
		return Api.itemVoApi.getItemNumInfoVoById(rewardvo.id);
	}

	/**
	 * 今日是否已转过
	*/
	public getHasTodayChange():boolean{
		let flag = false;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		if(this.joinkingdomTS >= today0){
			flag = true;
		}
		return flag;
	}

	/*
	*限时军需 今日充值数
	*/
	public getChargeNum():number{
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}

	/*
	*限时军需 今日领取
	*/
	public isGetRecharge(id : number):boolean{
		let flag = false;
		if(this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
			flag = true;
		}
		return flag;
	}

	/*
	*限时军需 是否在充值时间内
	*/
	public isInChargeTime():boolean{
		let flag = false;
		if(this.getTodayWeek() > 5){
			flag = true;
		}
		return flag;
	}
	/*
	*判断周一-周五神将击败奖励是否已领取
	*/
	public isGetHeroWinReward(day : number):boolean{
		let flag = false;
		if(this.heroRewards && this.heroRewards[day]){
			flag = true;
		}
		return flag;
	}
	/*
	*神将突袭门客的已经战斗次数
	*/
	public getServantFightInfo(servantId):number{
		let v:number = 0;
		if(this.heroUseSids && this.heroUseSids[this.getTodayWeek()] && this.heroUseSids[this.getTodayWeek()][servantId] && this.heroUseSids[this.getTodayWeek()][servantId]){
			v = this.heroUseSids[this.getTodayWeek()][servantId];
		}
		return v;
	}

	/*
	*神将突袭神将的资源
	*/
	public getHeroAttackNpcPic(iskill : boolean):any{
		//魏国 周一到周五 关羽 张飞 孙策 周瑜 吕布
		//蜀国 周一到周五 张辽 曹操 孙策 周瑜 吕布
		//吴国 周一到周五 张辽 曹操 关羽 张飞 吕布
		let arr = {
			1 : [2014,2015,1038,1037,1033],
			2 : [1038,1037,1058,1020,1033],
			3 : [1058,1020,2014,2015,1033]
		};

		let sid = arr[this.getMyKingdoms()][this.getTodayWeek() - 1];
		if(!sid){
			sid = 1033;
		}
		let cfg = Config.ServantCfg.getServantItemById(sid);
		return{
			pic : cfg.fullIcon,
			kingdom : (this.getMyKingdoms() + Math.ceil(this.getTodayWeek() / 2)) % 3 == 0 ? 3 : ((this.getMyKingdoms() + Math.ceil(this.getTodayWeek() / 2)) % 3),
			name : `${iskill ? LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acthreekingdomsheroattacktip4`,this.code.toString())) : ``}${cfg.name}`
		}
	}

	/*
	*转换过阵营去打突袭
	**/
	public canGetHeroAttackReward(day : number):boolean{
		let flag = false;
		if(this.heroJoin && this.heroJoin[day] && this.heroJoin[day][this.getMyKingdoms()]){
			flag = this.heroJoin[day][this.getMyKingdoms()];
		}
		return flag;
	}	

	/*
	*激战期结果 1荆州 2赤壁
	**/
	public getCenterCityWarInfo(type : number):any{
		//type 
		let week = this.getCurWeek();
		let cfg = this.config.activeTime;
		//本周周日活动结束时间
		let et = this.activeSt + (week - 1) * (7 * 86400) + (type == 1 ? 5 : 6) * 86400 + cfg[4].popularityRange[1] * 3600;

		let score = [];
		let kingdoms = 0;
		let day = type == 1 ? 6 : 7;
		let ftype = 5;
		if(this._roundMainlandScore && this._roundMainlandScore[day] && this._roundMainlandScore[day][ftype] && this._roundMainlandScore[day][ftype][6]){
			score =this._roundMainlandScore[day][ftype][6];
			let max = 0;
			for(let i = 0; i < score.length; ++ i){
				let kid = Number(i) + 1;
				if(score[i] > max){
					max = score[i];
					kingdoms = kid;
				}
			}
		}

		return {
			kingdoms : kingdoms,
			ischange : this.joinkingdomTS > et,
		};
	}	
	/*
	*激战期奖励已领取 1荆州 2赤壁
	**/
	public isGetCenterCityReward(type : number):boolean{
		let day = type == 1 ? 6 : 7;
		let ftype = 5;
		let flag = false;
		let week = this.getCurWeek();
		if(this.cityRewardFlags && this.cityRewardFlags[week] && this.cityRewardFlags[week][day] && this.cityRewardFlags[week][day][ftype] && this.cityRewardFlags[week][day][ftype][7]){
			flag = true;
		}
		return flag;
	}	

	/*
	*普通攻城期结果
	**/
	public getCityWarInfo(cityid : number, num : number):any{
		//cityid 城市 num 第几场 1 2周六 3 4周日
		let week = this.getCurWeek();
		let cfg = this.config.activeTime;
		//本周周日活动结束时间
		let et = this.activeSt + (week - 1) * (7 * 86400) + (num < 3 ? 5 : 6) * 86400 + cfg[num % 2 == 1 ? 2 : 3].popularityRange[1] * 3600;
		let score = [];
		let kingdoms = 0;
		let day = num < 3 ? 6 : 7;
		let ftype = num % 2 == 1 ? 3 : 4;
		if(this._roundMainlandScore && this._roundMainlandScore[day] && this._roundMainlandScore[day][ftype] && this._roundMainlandScore[day][ftype][cityid - 1]){
			score =  this._roundMainlandScore[day][ftype][cityid - 1]
			let max = 0;
			for(let i = 0; i < score.length; ++ i){
				let kid = Number(i) + 1;
				if(score[i] > max){
					max = score[i];
					kingdoms = kid;
				}
			}
			if(max == 0){
				kingdoms = Math.ceil(cityid / 2);
			}
		}

		return {
			kingdoms : kingdoms,
			ischange : this.joinkingdomTS > et,
		};
	}	

	/*
	*普通攻城期 奖励已领取
	**/
	public isGetCityReward(cityid : number, num : number):boolean{
		let day = num < 3 ? 6 : 7;
		let ftype = num % 2 == 1 ? 3 : 4;
		let flag = false;
		let week = this.getCurWeek();
		if(this.cityRewardFlags && this.cityRewardFlags[week] && this.cityRewardFlags[week][day] && this.cityRewardFlags[week][day][ftype] && this.cityRewardFlags[week][day][ftype][cityid]){
			flag = true;
		}
		return flag;
	}	

	/**
	*跨服活动相关信息 
	*/
	public getCrossActivity():any{
		// let arr = [
		// 	AcConst.AID_ACCROSSSERVERPOWER,
		// 	AcConst.AID_ACCROSSSERVERINTIMACY,
		// 	AcConst.AID_ACCROSSSERVERATKRACE,
		// 	AcConst.AID_BATTLEGROUND,
		// 	AcConst.AID_TOMB,
		// 	AcConst.AID_CONQUERMAINLAND,
		// 	AcConst.AID_ACCROSSSERVERWIFEBATTLE
		// ];
		// let date = [
		// 	1581696000,1582128000,1582812000,1582898400,1583071200,1583416800,1583503200
		// ]

		if (!this.config)
		{
			return {};
		}

		let info = [];
		for(let i = 1; i <= 4; ++ i){
			//第1-4周 从上一轮的激战期结束后开始计算
			let weekst = this.activeSt + (i - 1) * (7 * 86400);
			let weeket = weekst + 7 * 86400;
			let start = weekst - 86400 + this.config.activeTime[4].popularityRange[1] * 3600;
			let end = weekst + 6 * 86400 + this.config.activeTime[4].popularityRange[1] * 3600;
			let tmp = [];
			for(let j in this.rankActiveRwd){
				let unit = this.rankActiveRwd[j];
				let acst = unit.st;
				let acet = unit.et - 1 * 86400;
				if(acet >= start && acet < end && GameData.serverTime >= acet){
					if(i == 1 && acet < weekst){
						continue;
					}
					tmp.push({
						aid : j,
						acet : acet ,
						acst : acst,
						start : start,
						end : end,
						weekst : weekst,
						weeket : weeket,
						rank : unit.myrank
					});
				}
			}
			info.push({
				week : i,
				weekst : weekst,
				weeket : weeket,
				activity : tmp,
				start : start,
				end : end
			});
		}

		let curweek = this.getCurWeek();
		info.sort((a,b)=>{
			if(a.week == curweek && b.curweek != curweek){
				return -1;
			}
			else if(b.week == curweek && a.curweek != curweek){
				return 1;
			}
			else{
				if(a.week > curweek && b.week < curweek){
					return -1;
				}
				else if(b.week > curweek && a.week < curweek){
					return 1;
				}
				else{
					return a.week - b.week;
				}
			}
		});
		return info;
	}

	/*
	*跨服冲榜活动奖励领取
	**/
	public isGetFoodReward(aid : string):boolean{
		let flag = false;
		if(this.rankActiveRwd && this.rankActiveRwd[aid] && this.rankActiveRwd[aid].flag){
			flag = true;
		}
		return flag;
	}	
	
	
	/*
	*军政厅消息
	**/
	public setMeetingInfo(data : any):void{
		this.meetinginfo = data;
	}	
	
	/*
	*城池积分数据 num 第几场战斗 1 2 3 4 5 6  3、6中心城战斗
	**/
	public setMainLandScore(data : any):void{
		this._roundMainlandScore = data;
	}	

	public dispose():void{ 
		this.listred = false;
		this.activeSt = 0;
		this.activeEt = 0;
		this.kingdom = 0;
		this._buildinginfo = [];
		this.food = 0;
		this.goods = 0;
		this.attackNum = null;
		this.myBuildinfo = null;
		this.mainlandScore = [];
		this.troopNum = [];
		this.selectServant = {};
		this.cityTask = [];
		this.lastidx = 0;
		this.lastpos = null;
		this.heroUseSids = null;
		this.heroRewards = null;
		this.heroJoin = null;
		this.rinfo = null;
		this.meetinginfo = null;
		this.round = 1;
		this.joinkingdomTS = 0;
		this._roundMainlandScore = {};
		this.cityRewardFlags = null;
		this.rankActiveRwd  = null;
		this.numinkingdom = [];
		this.zidgroup = [];
		this.prankroundarr = null;
		this.zrankroundarr = null;
		this.prankseasonarr = null;
		this.zrankseasonarr = null;
		this.tmpinfo = {};
		this.listred = false;
		this.heroHpList = null;
        super.dispose();
    }
}