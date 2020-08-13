/**
 * 议事阁系统api
 * author qianjun
 */

class CountryWarVoApi extends BaseVoApi
{
	public constructor() {
		super();
	}


	private basetime : number = 0;// 1542124800
	private getrewards : any = {};
	private info : any = {};
	private lastYm : string = '';
	private lastday : number = 0;
	private nowturn : any = {};
	private randcity : number = 0;
	private rest : any = {};
	private servant : any = {};
	private announce : any = {};
	public init = false;
	public reback = false;
	public result = false;

	public formatData(data:any):void{
		let self = this;
		self.basetime = data.basetime;
		self.getrewards = data.getrewards;
		self.info = data.info;
		self.lastYm = data.lastYm
		self.lastday = data.lastday;
		self.nowturn = data.nowturn;
		self.randcity = data.randcity;
		self.rest = data.rest;
		self.servant = data.servant;
		self.init = true;
	}
	/**计策是否上线 */
	public isPlanLimit(planId:string,limit:number):boolean
	{
		if(this.info&&this.info.buystra&&this.info.buystra[planId])
		{
			if(this.info.buystra[planId] >= limit)
			{
				return true;
			}
			else
			{
				return false;
			}
			
		}
		return false;
	}
	/**
	 * 门客站的小红点
	 */
	public countryWarRedPoint()
	{
		let flag = false;
		if(Api.switchVoApi.checkOpenCountryWar() && this.isPlayerSerVantLevel()){
			if(this.getEnermyZid() > 0){
				if(this.isShowRewardRedPoint()){
					flag = true;
				}
				else if(this.getCurpeirod() == 1 && this.getEmptyServant()){
					let arr = this.getRandCity();
					for(let i in arr){
						if(this.isPlayerSendServant(arr[i])){
							flag = true;
							break;
						}
					}
				}
			}
			else if(this.getIslunkong()){
				if(this.isShowRewardRedPoint()){
					flag = true;
				}
			}
		}
		return flag;
	}
	/**
	 * 玩家是否满足派遣门客等级
	 */
	public isPlayerSerVantLevel()
	{
		if(Api.playerVoApi.getPlayerLevel() >= Config.CountrywarCfg.unlock)
		{
			return true;
		}
		return false;
	}
		/**
	 * 玩家是否有未派遣门客
	 */
	public isPlayerSendServant(cityId : number):boolean
	{
		let flag = false;
		if(Api.playerVoApi.getPlayerLevel() >= Config.CountrywarCfg.unlock && this.getCurpeirod() == 1)
		{
			let servantInfoVoList = Api.servantVoApi.getServantInfoListWithSort(1);
			for(let i in servantInfoVoList){
				let servantInfo : ServantInfoVo = servantInfoVoList[i];
				let power = Config.CountrywarCfg.cityLowestPower[cityId].power;
				if(servantInfo.total >= power && !Api.countryWarVoApi.isServantRest(servantInfo.servantId)){
					flag = true;
				}
			}
		}
		return flag;
	}
	/**
	 * 奖励的小红点
	 */
	public isShowRewardRedPoint()
	{
		if(Api.countryWarVoApi.getIslunkong()){
			if(this.getCurpeirod() == 3 && !Api.countryWarVoApi.isReceiveZidReward() && Api.countryWarVoApi.isPlayerSerVantLevel()){
				return true;
			}
		}
		else{
			if(this.isFightSuccess()&&this.getCurpeirod() == 3 &&(this.isReceiveZidReward() == false || this.isRankReward() == false))
			{
				return true;
			}
		}
		return false;
	}
	/**
	 * 区服奖励是否领取
	 */
	public isReceiveZidReward()
	{
		let key = this.basetime + this.nowturn.readyTime;
		if(this.getrewards[key])
		{
			if(this.getrewards[key][0] == 0)
			{
				return true;
			}
			else{
				return false;
			}
		}
		return false;
	}
	/**
	 * 区服奖励是否领取
	 */
	public isRankReward()
	{
		let key = this.basetime + this.nowturn.readyTime;
		if(this.getrewards[key])
		{
			if(this.getrewards[key][1] == 0)
			{
				return true;
			}
			else{
				return false;
			}
		}
		return false;
	}
	public setAnnouce(data:any):void{
		let self = this;
		this.announce = data;//text name
	}

	public checkNpcMessage():boolean{
        return false;
    }
    
	public isShowNpc():boolean{
        let cfg = Config.CountrywarCfg;
        return Api.playerVoApi.getPlayerLevel() >= cfg.unlock;
	}
	
	/*readytime wartime resulttime endtime
	*龙队 虎队
	*/
	public isRedTeam(type : string):boolean{
		let team = 0;
		if(this.info.team){
			team = this.info.team;
		}
		if(type == 'left'){
			return team == 0;
		}
		else{
			return !(team == 0);
		}
		
	}
    
	public getLockedString():string{
		let unlock = Config.CountrywarCfg.unlock;
		return Api.playerVoApi.getPlayerOfficeByLevel(unlock)
    }
	/*readytime wartime resulttime endtime
	*1备战期 2战斗展示期 3战斗奖励结算
	*/
	public getCurpeirod():number{
		let nowturn = this.nowturn;
		let baseTime = this.basetime;
		let arr = [];
		arr.push(this.basetime + this.nowturn.readyTime);
		arr.push(this.basetime + this.nowturn.warTime);
		arr.push(this.basetime + this.nowturn.resultTime);
		arr.push(this.basetime + this.nowturn.endTime);

		let period = 1;
		for(let i in arr){
			if(GameData.serverTime < arr[i]){
				period = Number(i);
				break;
			}
		}
		return period;
	}

	/*readytime wartime resulttime endtime
	*1备战期 2战斗展示期 3战斗奖励结算
	*/
	public canCheckVs():boolean{
		let flag = true;
		let wartime = this.basetime + this.nowturn.warTime
		if(this.getCurpeirod() == 2){
			if(GameData.serverTime < (wartime + 3600)){
				flag = false;
			}
		}
		return flag
	}

    /**
	 * 获取倒计时
    */
	public getCountTime():number{
		let period = this.getCurpeirod();
		let et = 0;
        // 1备战期 2战斗展示期 3战斗奖励结算
		switch(period){
			case 1:
				et = this.basetime + this.nowturn.warTime;
				break;
            case 2:
				et = this.basetime + this.nowturn.resultTime;
				break;
			case 3:
				et = this.basetime + this.nowturn.endTime;
				break;
		}
		return et - GameData.serverTime;
	}

	public getCountStr(special : boolean = false):string{
		let str = '';
		let param = [];
		let period = this.getCurpeirod();
		//派遣阶段
		if(this.getEnermyZid() == 0){
			str = `CountryWarCountdown_2`;
		}
		else{
			if(period < 3){
				str = special ? `CountryWarCD2Txt${period}` : `CountryWarCDTxt${period}`;
				if(this.getIslunkong()){
					str = `CountryWarCountdown_5`;
				}
			}
			else{
				str = `CountryWarCountdown_6`;
				if(this.getIslunkong()){
					str = `CountryWarCountdown_${this.isPlayerSerVantLevel() ? 7 : 8}`;
				}
			}
		}

		if(this.getIslunkong() || this.getEnermyZid() == 0){
			param.push(App.DateUtil.getFormatBySecond(this.getCountEndTime()));
		}
		else{
			param.push(App.DateUtil.getFormatBySecond(this.getCountTime()));
		}
		
		return LanguageManager.getlocal(str, param);
	}
	
	public getCountEndTime():number{
		let et = this.basetime + this.nowturn.endTime;
		return et - GameData.serverTime;
    }
	/**
	 *flag 是否精确到小时 
	*/
    public acTimeAndHour(flag):string{	
        let st = this.basetime + this.nowturn.readyTime;
        let et = this.basetime + this.nowturn.endTime;
		if(!flag)
		{
			et -= 1;
		}
		return App.DateUtil.getOpenLocalTime(st,et,flag);
    }
    /**
	 * 是否参加了此次战斗 
	 */
    public canJoinThisWar():boolean{
		let cfg = Config.CountrywarCfg;
        let flag = Api.playerVoApi.getPlayerLevel() >= cfg.unlock;
        return flag;
    }
 	/**
	 * 敌方服zid
	 */
    public getEnermyZid():number{
		let zid = 0;
		if(this.info && this.info.match){
			zid = Number(this.info.match);
		}
        return zid;
	}
	/**
	 * 是否轮空
	 */
    public getIslunkong():boolean{
        return this.getEnermyZid() == -1;
	}
	/**
	 * 不在跨服区间内
	 */
    public isNotCross():boolean{
        return this.getEnermyZid() == -2;
    }
	/**
	 * 获得战斗的事件
	 */
	public getWarTime()
	{
		return this.basetime + this.nowturn.warTime;
	}
 	/**
	 * 本轮输赢 
	 */
    public getIsWin():boolean{
		let maxnum = Config.CountrywarCfg.cityNum;
        return this._winnum * 2 > maxnum;
	}
	/**
	 * 城市输赢 
	 */
    public getCityIsWin(cityId : number):boolean{
		let flag = false;
		let et = this.basetime + this.nowturn.readyTime;
		if(this._history[et]){
			let cityIndex = this.getCityIndex(cityId);
			if(this._history[et][cityIndex] > 0){
				flag = true;
			}
		}
        return flag;
	}
	
	public getCityResult(cityId : number):number{
		let flag = 0;
		let et = this.basetime + this.nowturn.readyTime;
		if(this._history[et]){
			let cityIndex = this.getCityIndex(cityId);
			flag = this._history[et][cityIndex];
		}
        return flag;
    }
 	/**
	 * 公告内容
	 */
    public getNotice():string{
		let str = LanguageManager.getlocal(`dinnerMsgPopupEmptyTip`);
		if(this.announce.text){
			str = this.announce.text;
		}
        return str;
	}

	public canEditNotice():boolean{
		let flag = false;
		if(Api.switchVoApi.checkCloseCountryWarEditBtn()){
			return flag;
		}
		let cfg = Config.CountrywarCfg;
		//头像的cfg
    	let titleCfg = Config.TitleCfg.getTitleCfg();
		for (let k in titleCfg){
			let v = titleCfg[k];
			let titleVo = Api.itemVoApi.getTitleInfoVoById(Number(k));
			//自己有的戴着 并且物品栏有的 帝位、王位
			if(v.isTitle == 1 && titleVo.num > -1 && (v.titleType < 3 || v.titleType == 7)){
				flag = true;
				break;
			}
		}
		return flag;
	}

	public getEditCost():number{
		let cost = 0;
		let cfg = Config.CountrywarCfg;
		let costnum = Math.min(this.info.announcetimes - cfg.announceFreeNum, cfg.announceCost.length - 1);
		if(costnum >= 0){
			cost = cfg.announceCost[costnum];
		}
		return cost;
	}
	/*
	* 获取本日加成的门客队列
	*/
    public getServantInfo():{servantItemCfg:Config.ServantItemCfg,powerUp:number}[]{
		let arr:{servantItemCfg:Config.ServantItemCfg,powerUp:number}[] = [];
		let cfg = Config.CountrywarCfg;
		let keys = this.info.upservant;

        let servantPool : Config.ServantPoolCfg = cfg.servantPool[keys[0]];
        let rid = keys[1] - 1;
        let temp : Config.ServantAddCfg = servantPool.servantAddArr[rid];
		for(let i in temp.servant){
			let unit = temp.servant[i];
			let servantItemCfg = Config.ServantCfg.getServantItemById(unit);
			let powerUp = temp.powerUp[i];
			if(unit){
				arr.push({servantItemCfg:servantItemCfg,powerUp:powerUp});
			}
		}
        return arr;
    }
	public getServantAddPower(cfg:Config.ServantAddCfg):{servantItemCfg:Config.ServantItemCfg,powerUp:number}[]
	{
		let arr:{servantItemCfg:Config.ServantItemCfg,powerUp:number}[] = [];
		for(let i in cfg.servant){
			let unit = cfg.servant[i];
			let servantItemCfg = Config.ServantCfg.getServantItemById(unit);
			let powerUp = cfg.powerUp[i];
			if(unit){
				arr.push({servantItemCfg:servantItemCfg,powerUp:powerUp});
			}
		}
		return arr;
	}
	/**
	 * 	本日是否 这个门客是否享受加成
	 */
	public isHaveServant(servantId:string):{servantItemCfg:Config.ServantItemCfg,powerUp:number}
	{
		let servantCfgList = this.getServantInfo();
		for(let i = 0;i < servantCfgList.length;i++)
		{
			if(servantCfgList[i].servantItemCfg.id == servantId)
			{
				return servantCfgList[i];
			}
		}
		return null;
	}
	/**
	 * 获得门客 加成
	 */
	public getServantPower(servantId:string)
	{

	}
	/**
	 * 获取城市组id
	 */
    public getRandCity():number[]{
		this.randcity = 1;
        let rid = this.randcity - 1;
        return Config.CountrywarCfg.cityRandom[rid];
	}

	/** 
	 * 真实城市id转索引 1-10  => 1-5
	*/
	public getCityIndex(cityId : number){
		let arr = this.getRandCity();
		return arr.indexOf(cityId) + 1;
	}

    public getTeamNum(type):number{
        let isLeft = type == 'left';
        let num = 0;
        if(isLeft){
            num = App.MathUtil.getRandom();
        }
        else{
            num = App.MathUtil.getRandom();
        }
        return num;
	}
	/**
	 * 该城市是否参与本次战斗
	 */
	public getJoinCityWar(cityId : number):boolean{
		return this.getRandCity().indexOf(cityId) > -1;
	}
	/**
	 * 该城市双方派遣的信息
	 */
	private _mycityInfo : any = {};
	private _enermycityInfo : any = {};
	public setMyCityInfo(data : any){
		this._mycityInfo = data;
	}

	public setEnermyCityInfo(data : any){
		this._enermycityInfo = data;
	}

	public getCityInfo(cityId : number):number[]{
		let cityIndex = this.getCityIndex(cityId);
		let num1 = this._mycityInfo[cityIndex] ? this._mycityInfo[cityIndex] : 0;
		let num2 = this._enermycityInfo[cityIndex] ? this._enermycityInfo[cityIndex] : 0;
		return [num1, num2];
	}

	private _history : any = {};
	private _winnum = 0;
	/**
	 * 本轮战斗中赢了几场
	 */
	public setHistoryInfo(data : any){
		this._history = {};
		this._history = data;
		let et = this.basetime + this.nowturn.readyTime;
		let winnum = 0;
		if(this._history[et]){
			let cityarr = this.getRandCity();
			for(let i in cityarr){
				let cityIndex = Number(i) + 1;
				if(this._history[et][cityIndex] > 0){
					++ winnum;
				}
			}
		}
		this._winnum = winnum;
	}

	public getWinNum():number{
		return this._winnum;
	}
	/**
	 * 本轮战斗中是否取胜
	 */
	public getThisWarWin():number{
		return this.getIsWin() ? 1 : 2;
	}
	/** 服务器所需要的cityId 和前端用的转换 */
	public getServerCityId(cityId:number,isSercerId?:boolean)
	{
		for(let i = 0;i<this.getRandCity().length;i++)
		{
			if(isSercerId)
			{
				if(i == (cityId - 1))
				{	
					return this.getRandCity()[i];
				}
			}
			else
			{
				if(this.getRandCity()[i] == cityId)
				{	
					return i + 1;
				}
			}
			
		}
	}
	/**
	 * 门客数据
	 */
	public getServant()
	{
		return this.servant;
	}
	/**
	 * 门客是否在休息中
	 */
	public isServantRest(servantId:string)
	{
		if(this.rest&&this.rest[servantId])
		{
			return true;
		}
		else
		{
			return false;
		}

	}
	/**获得撤回门客的次数 */
	public getCancelServantTimes()
	{
		if(this.info && this.info.canceltimes)
		{
			return this.info.canceltimes;
		}
		return 0;
	}
	/**门客是否处于派遣 */
	public isUseServant(servantId:string)
	{
		if(this.servant)
		{
			for(let key in this.servant)
			{
				if(servantId == this.servant[key].servant)
				{
					return true;
				}
			}
			return false;
		}
		return false;
	}
	/**
	 * 这个城又没有门客
	 */
	public isCityHaveServant(cityId:number)
	{
		if(this.servant[cityId])
		{
			return this.servant[cityId];
		}
		return null;
	}
	/**
	 * 派遣的门客信息
	 */
	public myServantInfo():any{
		// let rid = App.MathUtil.getRandom(0,3);
		let obj : any = {};
		let source = this.servant;
		for(let i in source){
			let unit = source[i];
			let cityId = Number(i);
			obj[unit.servant] = {
				cityId : this.getRandCity()[cityId - 1],
				plan : unit.stra ? unit.stra : 0
			};
		}
		return obj;
	}
	/**
	 * 是否有派遣的门客
	 */
	public getEmptyServant():boolean{
		let flag = false;
		if(this.isPlayerSerVantLevel()){
			flag = Object.keys(this.servant).length < Config.CountrywarCfg.cityTotNum;
		}
		return flag;
	}
	/**
	 * 是否参战成功
	 */
	public isFightSuccess()
	{
		if(Object.keys(this.servant).length > 0)
		{
			return true;
		}
		return false;
	}
	public getServantCityKey(servantId:string)
	{
		for(let key in this.servant)
		{
			if(this.servant[key].servant == servantId)
			{
				return key;
			}
		}
		return null;
	}
	/**
	 * 获得一个月及今日的配置文件
	 */
	public getOneMonthCfg()
	{
		return this.timeCfg();
	}
	/**
	 * 获得小的时间段
	 */
	private timeCfg()
	{
		let timeList = this.getTimeList();
		let readyTime = Config.CountrywarCfg.readyTime;
		let startTimeTmp: number = 0;
		for (let key in readyTime) {
			if (GameData.serverTime > (this.basetime + readyTime[key].readyTime)) {
				startTimeTmp = this.basetime + readyTime[key].readyTime;
			}
		}
		let date = App.DateUtil.getServerDate(startTimeTmp);
		let nowMonth = date.getMonth() + 1;
		// let servantDateList:{startMonth:number,startDate:number,endMonth:number,endDate:number,week:number}[] = [];
		let servantFightInfoList:{startTime:number,endTime:number,cfg:Config.ServantAddCfg}[] = [];
		let nextServantFightInfoList:{startTime:number,endTime:number,cfg:Config.ServantAddCfg}[] = [];
		let lastServantFightInfoList:{startTime:number,endTime:number,cfg:Config.ServantAddCfg}[] = [];
		let nowServantFightInfo:{startTime:number,endTime:number,cfg:Config.ServantAddCfg} = null;
		let index = 0;
		for(let i = 0;i<timeList.length;i++)
		{
			let timeItem = timeList[i];
			for(let key in readyTime)
			{
				let readyTimeItem:Config.ReadyTimeCfg = readyTime[key];
				let startTime = timeItem.time + readyTimeItem.readyTime;
				let wartime = timeItem.time + readyTimeItem.warTime;
				let endTime = timeItem.time + readyTimeItem.endTime;
				let startDate = App.DateUtil.getServerDate(startTime);
				let endDate = App.DateUtil.getServerDate(endTime);
				let startMonth = startDate.getMonth() + 1;
				let endMonth = endDate.getMonth() + 1;
				if(startMonth == nowMonth)
				{
					// let servantDate = {startMonth:startMonth,startDate:startDate.getDate(),endMonth:endMonth,endDate:endDate.getDate(),week:startDate.getDay()};
					// servantDateList.push(servantDate);
					let servantFightInfo = {startTime:startTime,endTime:endTime,cfg:Config.CountrywarCfg.servantPool[this.info.upservant[0]].servantAddArr[index]};
					if(startTime <= GameData.serverTime && GameData.serverTime < endTime)
					{
						nowServantFightInfo = servantFightInfo;
					}
					else if(endTime < GameData.serverTime)
					{
						lastServantFightInfoList.unshift(servantFightInfo);
						
					}
					else if(startTime >= GameData.serverTime)
					{
						nextServantFightInfoList.push(servantFightInfo);
					}
					index++;
				}
			}
		}
		servantFightInfoList.push(nowServantFightInfo);
		for(let i = 0;i<nextServantFightInfoList.length;i++)
		{
			servantFightInfoList.push(nextServantFightInfoList[i]);
		}
		for(let i = 0;i<lastServantFightInfoList.length;i++)
		{
			servantFightInfoList.push(lastServantFightInfoList[ lastServantFightInfoList.length - 1 - i]);
		}
		
		return servantFightInfoList;
	}
	/**
	 * 获得参战门客的总势力值
	 */
	public getAllServantPower():number
	{
		let power = 0;
		for(let key in this.servant)
		{
			power += this.servant[key].totalattr;
		}
		return Math.floor(power);
	}
	/**
	 * h获得整个大的时间段
	 */
	private getTimeList()
	{
		let timeList:{time:number,month:number,date:number}[] = [];
		let nowMonth = 0;
		let isLast = true;
		let isNext = true;
		for(let i = 0;i < 6;i++)
		{
			if(i == 0)
			{
				let nowTime = this.basetime;
				let readyTime = Config.CountrywarCfg.readyTime;
				let startTime:number = 0;
				for(let key in readyTime) 
				{
					if(GameData.serverTime > (nowTime + readyTime[key].readyTime))
					{
						startTime = nowTime + readyTime[key].readyTime;
					}
				}
				let date = App.DateUtil.getServerDate(startTime);
				nowMonth = date.getMonth() + 1;
				let time = {time:nowTime,month:nowMonth,date:date.getDate()};
				timeList.push(time);
			}
			else
			{
				let lastTime = this.basetime - i * 7 * 86400;
				let lastDate = App.DateUtil.getServerDate(lastTime);
				let lastMonth = lastDate.getMonth() + 1;
				if(lastMonth <= nowMonth && isLast)
				{
					let time = {time:lastTime,month:lastMonth,date:lastDate.getDate()};
					timeList.unshift(time);
					if(lastMonth < nowMonth)
					{
						isLast = false;
						// continue;
					}
				}

				let nextTime = this.basetime + i * 7 * 86400;
				let nextDate = App.DateUtil.getServerDate(nextTime);
				let nextMonth = nextDate.getMonth() + 1;
				if(nextMonth >= nowMonth && isNext)
				{
					let time = {time:nextTime,month:nextMonth,date:nextDate.getDate()};
					timeList.push(time);
					if(nextMonth > nowMonth)
					{
						isNext = false;
						// continue;
					}
				}
				
			}
		}
		return timeList;
	}
	/**
	 * 本月是否有门客加成
	 */
	public checkMonthServant(servantId: string) {
		let oneMonthCfg = this.getOneMonthCfg();
		for (let i = 0; i < oneMonthCfg.length; i++) {
			if(oneMonthCfg[i]&&oneMonthCfg[i].cfg&&oneMonthCfg[i].cfg.servant)
			{
				for (let j = 0; j < oneMonthCfg[i].cfg.servant.length; j++) {
					if (servantId == oneMonthCfg[i].cfg.servant[j]) {
						return oneMonthCfg[i];
					}
				}
			}
		}
		return null;
	}
	public dispose():void{
		this.basetime = 0;// 1542124800
		this.getrewards  = {};
		this.info  = {};
		this.lastYm  = '';
		this.lastday  = 0;
		this.nowturn  = {};
		this.randcity  = 0;
		this.rest  = {};
		this.servant  = {};
		this.announce  = {};
		this.init = false;
		this.reback = false;
		this.result = false;
		super.dispose();
	}
}