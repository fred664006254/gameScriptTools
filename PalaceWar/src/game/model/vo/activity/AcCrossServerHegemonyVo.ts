class AcCrossServerHegemonyVo extends AcBaseVo
{
	// info.secondreward  晋级赛奖励领取标记
	// info.preward  "淘汰赛奖励领取标记",
	// info.iscanjoin  "参赛资格",
	private info = null;

	// 门客出战记录
	public sinfo = null;

	// 帮会职务
	private ajob = null;

	// 势力涨幅
	private powerup = null;

	// 势力
	private power = null;

	// 帮会id
	public allianceid = null;
	//投票领取详情
	private votegetinfo = null;
	// 投票信息
	private voteinfo = null;

	// 任务信息
	private taskinfo = null;

	// 任务领取信息
	private flags = null;

	// 人气积分
	private score = null;

	// 人气积分兑换信息
	private stageinfo = null;

	// 战斗积分
	public resultscore = null;

	// 战斗积分兑换信息
	private resultinfo = null;
	//军团名字
	private alliancename = null;
	//已经进入过活动
	public isEnter:number = 0;
	//玩家声场数
	public myWinNum :number = 0;
	//玩家目前领取了多少战斗积分
	public maxresultscore:number = 0;

	public choosetime:Object = null;
	//战旗数量
	private special:number = null;
	//帮会充值
	private allianceRecharge:any = null;

	public constructor() 
	{
		super();
	}
	public get cfg() : Config.AcCfg.CrossServerHegemonyCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public initData(data:any):void{
		super.initData(data);
		// console.log(data);

		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH);
	}

	public dispose():void{
		this.info = null;
		this.sinfo = null;
		this.ajob = null;
		this.powerup = null;
		this.power = null;
		this.allianceid = null;
		this.voteinfo = null;
		this.votegetinfo = null;
		this.taskinfo = null;
		this.flags = null;
		this.score = null;
		this.stageinfo = null;
		this.resultscore = null;
		this.resultinfo = null;
			
		this.alliancename = null;
	
		this.isEnter = 0;
		this.myWinNum  = 0;
		this.maxresultscore = 0;
		this.choosetime = null;
		this.special = 0;
		this.allianceRecharge = null;
		super.dispose();
	}
	public getMatchCDById(matchId:number):number{
		if(this.choosetime && this.choosetime.hasOwnProperty(String(matchId))){
			return Number(this.choosetime[String(matchId)]);
		}
		return -1;
	}
	public setAllName(name:string):void{
		this.alliancename = name;
	}
	public getAllName():string{
		if(this.alliancename){
			return this.alliancename;
		} else {
			if(Api.playerVoApi.getPlayerAllianceName()){
				return Api.playerVoApi.getPlayerAllianceName();
			} else {
				return LanguageManager.getlocal("nothing");
			}
			
		}
		
	}
	//是否有帮会
	public isHasAlliance():boolean{
		let aid = Api.playerVoApi.getPlayerAllianceId();
		if (!aid){
			return false;
		}
		return true;
	}

	//是否有资格
	public isCanJoin():boolean{
		return this.info.iscanjoin;
	}
	//检查当前是否没有被淘汰
	public checkIsWin():boolean{

		

		return true;
	}
	//根据帮会id得到投票数量
	public getFlagNumByAid(aid:number|string):number{
		// console.log(this.voteinfo);
		if(this.voteinfo[String(aid)]){
			return this.voteinfo[String(aid)];
		}
		return 0;
	}
	public checkGetFlagByAid(aid:number|string):number{
		if(this.votegetinfo[String(aid)]){
			return this.votegetinfo[String(aid)];
		}
		return 0;
	}
    public canGetScore():number{

        // let r = Api.crossServerHegemonyVoApi.getFlagRankData();
		let rankData = null;
		
			rankData = Api.crossServerHegemonyVoApi.getRank();
	
		if(!rankData){
			return 0;
		}
		// console.log(r);
		
        let needGetNum = 0;
        for(let i = 0;i < rankData.length; i++){
            let rData = rankData[i];
            if(Number(rData.endflag) != 0){
                if(this.checkGetFlagByAid(rData.aid) < this.getFlagNumByAid(rData.aid)){
                    let sendFlagNum = this.getFlagNumByAid(rData.aid) - this.checkGetFlagByAid(rData.aid);
                    let rebate = this.cfg.getFlagRebateByRank(i + 1);
                    
                    needGetNum += sendFlagNum * rebate;
                }
            }
        }
        return needGetNum * this.cfg.flagScoreNum;

    }

	public checkCanAddFlagNum(aid:number|string):boolean{
		for(let k in this.voteinfo){
			if(String(k) == String(aid)){
				return true;
			}
		}
		let addNum = this.getAddFlagNum();
		if(addNum < this.cfg.flagTeamNum){
			return true;
		}
		return false;

	}
	//得到加士气的帮会数量
	public getAddFlagNum():number{
		let n = 0;
		for(let k in this.voteinfo){
			n ++;
		}
		return n;
	}
	//得到这场比赛的倒计时
	public getCdStrByMatchId(id:number):string{
		if(id <= 24){
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList1();
			let curDayIndex = (id - 1) % 3;
			let curDayNum = 1 + Math.floor((id - 1) / 3);
			let matchS = acStart + curDayNum * 24 * 60 * 60 + timeList[curDayIndex];
			return App.DateUtil.getFormatBySecond(matchS - GameData.serverTime,1);
		} else {
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
			let curDayNum = id - 24 + 10;
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchS = acStart + (curDayNum - 1) * 24 * 60 * 60 + timeList[0];
			return App.DateUtil.getFormatBySecond(matchS - GameData.serverTime,1);
			
		}
	}

	//备战日和休战日时间
	public getRestTimeStrByType(id:number):string[]{
		if (id == 1){
			//备战日
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let curDayNum = 1 + Math.floor((id - 1) / 3);
			let matchS = acStart + curDayNum * 24 * 60 * 60;
			let sT = App.DateUtil.getFormatBySecond(acStart, 21);
			let eT = App.DateUtil.getFormatBySecond(matchS, 21);
			return [sT, eT];
		}
		else if (id == 25){
			//休战日
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let curDayNum = 1 + Math.floor((id - 1) / 3);
			let matchS = acStart + curDayNum * 24 * 60 * 60;
			let matchO = acStart + (curDayNum +1) * 24 * 60 * 60;
			let sT = App.DateUtil.getFormatBySecond(matchS, 21);
			let eT = App.DateUtil.getFormatBySecond(matchO,21);
			return [sT, eT];
		}
	}

	//获取某场比赛的截止时间 id 比赛id, index: 某天的第几场
	public getEndTimeByMatchId(id:number, index:number):number{
		//晋级赛截止时间
		if(id <= 24){
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList1();
			let curDayNum = 1 + Math.floor((id - 1) / 3);
			let matchTime = Api.crossServerHegemonyVoApi.getMatchTime();
			let matchS = acStart + curDayNum * 24 * 60 * 60 + timeList[index - 1] + matchTime;
			return matchS;
		} else {
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
			let curDayNum = id - 24 + 10;
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchTime = Api.crossServerHegemonyVoApi.getMatchTime();
			let matchS = acStart + (curDayNum - 1) * 24 * 60 * 60 + timeList[0] + matchTime;
			return matchS;
			
		}
	}

	//得到比赛详情
	public getTimeStrByMatchId(id:number):string{
		if(id <= 24){
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList1();
			let curDayIndex = (id - 1) % 3;
			let curDayNum = 1 + Math.floor((id - 1) / 3);
			let matchS = acStart + curDayNum * 24 * 60 * 60 + timeList[curDayIndex];
			return App.DateUtil.getFormatBySecond(matchS,13);
		} 
		else {
			// 21 * 60 * 60
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
			let curDayNum = id - 24 + 10;
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchS = acStart + (curDayNum - 1) * 24 * 60 * 60 + timeList[0];
			return App.DateUtil.getFormatBySecond(matchS,13);	
		}
	}

	//根据场次检测比赛状态   1-->离开战还有半小时以上  2-->离开战半小时以内  3--> 比赛中  4-->比赛结束
	public checkStatusByMatchId(id:number):number{
		//晋级赛
		// App.LogUtil.log("checkStatusByMatchId "+ id);
		if(id <= 24){
			//[10 * 60 * 60, 16 * 60 * 60, 21 * 60 * 60]
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList1();

			let curDayIndex = (id - 1) % 3;
			let curDayNum = 1 + Math.floor((id - 1) / 3);

			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchS = acStart + curDayNum * 24 * 60 * 60 + timeList[curDayIndex];
			let matchO = matchS + Api.crossServerHegemonyVoApi.getMatchTime();
			// App.LogUtil.log("checkStatusByMatchId matchS "+ matchS);
			// App.LogUtil.log("matchO "+App.DateUtil.getFormatBySecond(matchO,2));
			// App.LogUtil.log("matchS "+App.DateUtil.getFormatBySecond(matchS,2));
			if(matchS - GameData.serverTime > 1800 ) {
				return 1;
			} else if(matchS > GameData.serverTime){
				return 2;
			} else if(matchO >= GameData.serverTime && matchS <= GameData.serverTime){
				return 3;
			} else {
				return 4;
			}

		} else {
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
			let curDayNum = id - 24 + 10;
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchS = acStart + (curDayNum -1)* 24 * 60 * 60 + timeList[0];
			let matchO = matchS + Api.crossServerHegemonyVoApi.getMatchTime();
			if(matchS - GameData.serverTime > 1800 ) {
				return 1;
			} else if(matchS > GameData.serverTime){
				return 2;
			} else if(matchO >= GameData.serverTime && matchS <= GameData.serverTime){
				return 3;
			} else {
				return 4;
			}	
		}
	}

	//得到下一场战斗的matchid
	public getNextMatchId():number{
		let status = this.getCurStatus();
		// App.LogUtil.log("getNextMatchId status "+status);
		if(status == 1){
			return 1;
		} else if(status == 2){
			let offStTime = this.getStartOffTime();
			let curDay = Math.floor((GameData.serverTime - this.st - offStTime)/(24*60*60));
			// App.LogUtil.log("currday "+curDay);
			// [10 * 60 * 60, 16 * 60 * 60, 21 * 60 * 60]
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList1();
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchTime = Api.crossServerHegemonyVoApi.getMatchTime();
			// console.log(App.DateUtil.getFormatBySecond(acStart,2));
			let t0 = 0 + acStart + curDay * 24 * 60 * 60;
			let t1 = timeList[0] + acStart + curDay * 24 * 60 * 60 + matchTime;
			let t2 = timeList[1] + acStart + curDay * 24 * 60 * 60 + matchTime;
			let t3 = timeList[2] + acStart + curDay * 24 * 60 * 60 + matchTime;
			// console.log("tt",App.DateUtil.getFormatBySecond(GameData.serverTime,2));
			// console.log("t0",App.DateUtil.getFormatBySecond(t0,2));
			// console.log("t1",App.DateUtil.getFormatBySecond(t1,2));
			// console.log("t2",App.DateUtil.getFormatBySecond(t2,2));
			// console.log("t3",App.DateUtil.getFormatBySecond(t3,2));
			if(GameData.serverTime >= t0 && GameData.serverTime < t1 ){
				// return (curDay - 1) * 3 + 1;
				return (curDay-1) * 3 + 1;
			} else if(GameData.serverTime >= t1 && GameData.serverTime < t2 ){
				return (curDay-1) * 3 + 2;
			} else if(GameData.serverTime >= t2 && GameData.serverTime < t3 ){
				return (curDay-1) * 3 + 3;
			} else {
				return (curDay-1) * 3 + 4;
			}
			
		} else if(status == 10){
			return 25;
		} else if(status >= 11 && status <= 15){
			let offStTime = this.getStartOffTime();
			let curDay = Math.floor((GameData.serverTime - this.st - offStTime)/(24*60*60));
			// [21 * 60 * 60];
			let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
			let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
			let matchTime = Api.crossServerHegemonyVoApi.getMatchTime();
			let time = timeList[0];
			if(GameData.serverTime < acStart + (curDay) * 24 * 60 * 60 + time + matchTime){
				return 25 + (status - 11);
			} else {
				return 25 + (status - 11) + 1;
			}

		} else if(status == 16){
			return 29;
		}
		
	}

	//最后一场比赛截止时间
	public getLastMatchEndTime():number{
		let timeList = Api.crossServerHegemonyVoApi.getMatchTimeList2();
		let acStart = App.DateUtil.getWeeTs(this.st) + 24 * 60 * 60;
		let matchS = acStart + 14 * 24 * 60 * 60 + timeList[0];
		let matchO = matchS + Api.crossServerHegemonyVoApi.getMatchTime();
		return matchO;
	}

	//是否在比赛时间内
	public isInMatchActicityTime():boolean{
		let et = this.getLastMatchEndTime();
		if (GameData.serverTime < et && GameData.serverTime >= this.st){
			return true;
		}
		return false;
	}

	public isShowTime():boolean{
		let status = this.getCurStatus();
		return status == 16;
	}
	public getCurStatus():number{
		//天数对应状态
		// 1 = 备战日
		// 2-9=晋级赛
		// 10=休战日
		// 11-15=淘汰赛

		//1->备战日
		//2->晋级赛
		//10->晋级赛休战日
		//11->32进16
		//12->16进8
		//13->8进4
		//14->4进2
		//15->2进1 
		//16->展示期
		////////
		//状态编号对应状态
		// 1-->备战日
		// 2-->晋级赛
		// 10-->晋级赛休战日
		// 11-->32进16
		// 12-->16进8
		// 13-->8进4
		// 14-->4进2
		// 15-->2进1
		// 16-->展示期
		let offStTime = this.getStartOffTime();
		let curDay = Math.ceil((GameData.serverTime - this.st - offStTime)/(24*60*60));
		if (curDay <= 0){
			curDay = 1;
		}
		// App.LogUtil.log(" curDay aa "+curDay);
		switch(curDay){
			case 1:
				//备战日
				return 1;
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
				//晋级赛
				return 2;
			case 10:
				//晋级赛休战日
				return 10;
			case 11:
				//32进16
				return 11;
			case 12:
				//16进8
				return 12;
			case 13:
				//8进4
				return 13;
			case 14:
				//4进2
				return 14;
			case 15:
				//2进1 
				return 15;																
		}
		//展示期
		return 16;

	}


	public getActPoints():number{
		return 0;
	}

	public getSortTask(tabIndex:number){
			let min = 1;
			let max = 1;
			let cfg = <Config.AcCfg.CrossServerHegemonyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let taskData = cfg.getTaskListById(min,max);
			let baseTaskData = cfg.getTaskList();
			let taskLength = baseTaskData.length;
	
			let arr:Array<any> =[];
			for(let i = 0;i < taskData.length;i++)
			{	
				
				if(taskData[i].questType ==111)
				{
					let openDay  = App.DateUtil.getActivityDay(this.et,this.st);
					if(openDay <taskData[i].value)
					{
						continue;
					}
				}
				arr.push(taskData[i]);
			}
	
			for(let i = 0;i < arr.length;i++)
			{
				if(this.getTaskStatus(arr[i]))
				{
					arr[i].sortId = taskLength + Number(arr[i].id);
				}
				else if(this.getTaskNum(arr[i].questType) >= arr[i].value)
				{
					arr[i].sortId = (Number(arr[i].id)) - taskLength - 1;
				}
				else
				{
					arr[i].sortId = Number(arr[i].id);
				}
	
			}
			return arr;
		
	}

	public getTaskNum(type:string){
		return this.taskinfo && this.taskinfo[type] ? this.taskinfo[type]:0;
	}
	public getTaskStatus(taskData:any):boolean
	{
		let id = taskData.id;
		return (this.flags && this.flags[id] && this.flags[id] == 1) ? true:false;
		
	// // 人气积分
	// private score = null;

	}


	// // 人气积分兑换信息
	// private stageinfo = null;

	// // 战斗积分
	// public resultscore = null;

	public getScore():number{
		return this.score ? Number(this.score) : 0;
	}
	public getResultScore():number{
		return this.resultscore ? Number(this.resultscore) : 0;
	}

	//获取积分兑换物品次数
	public getShopPointBuyItemNum(id:number|string):number{
		// console.log(this.resultinfo);
		if(this.resultinfo && this.resultinfo[String(id)]){
			return this.resultinfo[String(id)];
		}
		return 0;
	}
	public getFlagShopPointBuyItemNum(id:number|string):number{
		// console.log(this.stageinfo);
		if(this.stageinfo && this.stageinfo[String(id)]){
			return this.stageinfo[String(id)];
		}
		return 0;
	}
	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	/**
	 * 累积充值领取判断
	 * */
	public isGetRecharge(id: string): boolean {
		let flag = false;
		if (this.flags && this.flags[id]) {
			flag = true;
		}
		return flag;
	}
	//获取累积充值数目
	public getChargeNum(questType:number): number {
		let num = 0;
		if (this.taskinfo && this.taskinfo[questType]) {
			num = this.taskinfo[questType];
		}
		return num;
	}


	//任务红点
	public checkTaskRed():boolean
	{
		let data = this.cfg.getTaskList();
		for(let i=0; i < data.length; i++){
			if (!this.isGetRecharge(""+data[i].id) && this.getChargeNum(data[i].questType)>= data[i].value) {
				// 可领
				return true;
			}
		}
		return false;

		// return false;
	}
	//人气排行榜领取积分红点
	public checkFlagScoreRed():boolean
	{
		return this.canGetScore() > 0;
	}
	//得到人气积分可以领取的数量
	// public getFlagScoreNum():number
	// {
	// 	this.canGetScore()
	// 	return 0;
	// }
	public checkFlagRankRed():boolean
	{
		return this.checkFlagScoreRed() || this.checkTaskRed() || this.isCanGetAllianceRechargeReward();
	}

	//战斗积分 领取 红点
	public checkFightScoreRed():boolean
	{
		return this.getFightScoreNum() > 0 ;
	}
	//可以领取的战斗积分数量
	public getFightScoreNum():number
	{
		let maxScore = this.myWinNum * this.cfg.fightScoreWin - this.maxresultscore;
		// let matchId = this.getNextMatchId();
		if (maxScore < 0){
			maxScore = 0;
		}
		return maxScore;
	}

	//是否可以退出、解散、转让帮会
	public isNotQuitAlliance():boolean{
		if (this.isInActivity() && this.isCanJoin()){
			return true;
		}
		return false;
	}

	/**
	 * 
	 *  帮会充值相关
	 */
	//帮会充值奖励是否已领取
	public isGetAllianceChargeRewardById(id:string|number):boolean{
		if (this.allianceRecharge && this.allianceRecharge.flags && this.allianceRecharge.flags[id]){
			return true;
		}
		return false;
	}

	//是否有充值奖励可以领取
	public isCanGetAllianceRechargeReward():boolean{
		if (!this.isCanJoin()){
			return false;
		}
		let data = this.cfg.getRechargeList();
		for (let i=0; i<data.length; i++){
			if (!this.isGetAllianceChargeRewardById(data[i].id) && this.getAllianceTotalRecharge() >= data[i].totalValue && this.getAlliancePersonalRecharge() >= data[i].individualValue){
				return true;
			}
		}
		return false;
	}

	//当前个人充值金额
	public getAlliancePersonalRecharge():number{
		if (this.allianceRecharge && this.allianceRecharge.v){
			return this.allianceRecharge.v;
		}
		return 0;
	}

	//当前总额度
	public getAllianceTotalRecharge():number{
		if (this.allianceRecharge && this.allianceRecharge.totV){
			return this.allianceRecharge.totV;
		}
		return 0;
	}

	public getSortAllianceRechargeData():any{
		let data = this.cfg.getRechargeList();
		let allianceRechargeNum = this.getAllianceTotalRecharge();
		let list:any [] = [];
		for (let i=0; i < data.length; i++){ 
			let needValue = 0;
			if (data[i].show > 0){
				needValue = data[data[i].show - 1].totalValue;
			}
			if (this.isGetAllianceChargeRewardById(data[i].id)){
				data[i].sortId = data.length + data[i].id;
			}
			else{
				if (this.getAllianceTotalRecharge() >= data[i].totalValue && this.getAlliancePersonalRecharge() >= data[i].individualValue){
					data[i].sortId = data[i].id - data.length - 1;
				}
				else{
					data[i].sortId = data[i].id;
				}
			}
			if (allianceRechargeNum >= needValue){
				list.push(data[i]);
			}
		}
		return list.sort((a, b)=>{return a.sortId - b.sortId});
	}

	//战旗道具id
	public getToolItemId():number{
		return 1049;
	}

	//战旗数量
	public getSpecailToolNum():number{
		if (this.special){
			return this.special;
		}
		return 0;
	}

	//活动是否开始 活动配置时间22点，从下一日0点开启，此时间段内无数据
	public isOpenActivity():boolean{
		let aStart = App.DateUtil.getWeeTs(this.st) + 86400;
		if (GameData.serverTime >= aStart){
			return true;
		}
		return false;
	}

	public getStartOffTime():number{
		let aStart = App.DateUtil.getWeeTs(this.st) + 86400;
		if (aStart - this.st >= 0 && aStart - this.st < 86400){
			return aStart - this.st;
		}
		return 0;
	}

	public get isShowRedDot(): boolean 
	{	
		// if(this.isEnter){
		// 	return false;
		// } else {
		// 	return true;
		// }
		// return this.checkFlagRankRed() || this.checkFightScoreRed() || (!this.isEnter);
		if (this.isOpenActivity()){
			return !this.isEnter;
		}
		return false;
	} 

}