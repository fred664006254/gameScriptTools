class AcBattleGroundVo extends AcBaseVo{
	public constructor(){
		super();
	}
	//battleground  中的info
	private winfo = null;
	private info = null;
	//是否参与过
	private isjoin = 0;
	//衙门分数
	private point = 0;
	//当日是否被攻击过
	private isattacked = 0;
	//起始时间
	public versionst = 0;
	//淘汰轮次
	private weedOut = null;
	//衙门状态{lasttime=0, num=0, extranum=0,streak=0,morale=0,rankover=0,asids={},rsids={}}
	private cinfo = null;
	//防守信息
	private dinfo = null;
	//仇人信息
	private einfo = null;
	//当日战斗信息{fightnum=0,sids={},fids={},useids={},tmpattr={blood=0,atk=0,skill=0,isbuy="0"},handle=0}
	private ainfo = null;
	//是否可领奖{flag=0, msid=0}
	private rewardc = null;
	private lastday = 0;
	private updated_at = 0;
	//参赛资格
	private iscanjoin = 0
	//地图信息
	private map = null;
	private revengeIdx = 0;
	public init = true;
	//是否被淘汰
	private myalive = 0;
	private myrank = null;
	private extraList = [];
	private waiting = 0;
	//当前轮次要被淘汰的分数   小于这个 分数就有可能被淘汰
	public curOutScore = 0;

	private rankData = null;

	private pkzids = null;

	public onelist = null;

	public initData(data):void{
		super.initData(data);
		if(data.ainfo){
			this.setRaceInfo(data);
		}
	}

	public setRankData(data:any):void{
		this.rankData = data;

		//更新当前轮次淘汰分数
		let curRound = this.getCurRound();
		if(curRound == 0){
			return;
		}
		let btmLine = this.cfg.weedOut[curRound-1].btmLine;
		
		if(btmLine >= this.rankData.rankArr.length){
			this.curOutScore = 0;
		} else {
			let lineData = this.rankData.rankArr[btmLine-1];
			this.curOutScore = lineData.value;
		}
	}

	public getRankFirstAlli():any{
		if(this.rankData){
			return this.rankData.allirankArr[0];
		}
	}
	public getRankFirstPlayer():any{
		if(this.rankData){
			return this.rankData.rankArr[0];
		}
	}
	//排行榜得到个人排行
	public getRankPlayerRank():number{
		if(this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.myrank != null && this.rankData.myrankArr.myrank != undefined){
			return this.rankData.myrankArr.myrank;
		}
		return 0;
	}
	//排行榜得到个人分数
	public getRankPlayerScore():number{
		if(this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.value != null && this.rankData.myrankArr.value != undefined){
			return this.rankData.myrankArr.value;
		}
		return null;

	}
	//获得我的帮会数据
	public getMyAlliData():any{
		if(this.rankData){
			for(let i = 0;i<this.rankData.allirankArr.length;i++){
				if(this.rankData.allirankArr[i].id == String(Api.playerVoApi.getPlayerAllianceId())){
					return this.rankData.allirankArr[i];
				}
			}
		}
	}

	//排行榜得到帮会排行
	public getRankAllRank():number{
		if(this.rankData && this.rankData.myrankArr && this.rankData.myrankArr.myalliRank){
			return this.rankData.myrankArr.myalliRank;
		}
		return 0;
	}	
	//得到帮派存活人数
	public getRankAllPlayerNum():number{
		if(this.rankData){
			let myAllId:string = String(Api.playerVoApi.getPlayerAllianceId());
			let allArr = this.rankData.allirankArr;
			for(let i = 0;i < allArr.length; i++){
				if(allArr[i]["id"] == myAllId){
					return Number(allArr[i]["alivemn"]);
				}
			}
		}
		return 0;
	}

	public getMyRankList():any[]{
		if(this.rankData){
			return this.rankData.rankArr;
		}
		return [];
	}

	public getAlliRankList():any[]{
		if(this.rankData){
			return this.rankData.allirankArr;
		}
		return [];
	}

	public setRaceInfo(data:any):void{
		this.weedOut = data.weedout;
		this.versionst = data.versionst;
		this.point = data.point;
		this.einfo = data.einfo;
		this.lastday = data.lastday;
		this.isjoin = data.isjoin;
		if (data.rewardc) {
			this.rewardc = data.rewardc;
		}
		if (data.info != null) {
			if (this.cinfo == null) {
				this.cinfo = new AtkraceInfoVo();
			}
			this.cinfo.initData(data.info);
		}
		else if (this.cinfo!=null) {
			this.cinfo.dispose();
			this.cinfo = null;
		}
		if (data.ainfo != null && Object.keys(data.ainfo).length>0) {
			if (this.ainfo == null) {
				this.ainfo = new AtkraceAtkInfoVo();
			}
			this.ainfo.initData(data.ainfo);
		}
		else if (this.ainfo!=null) {
			this.ainfo.dispose();
			this.ainfo = null;
		}
		this.dinfo = data.dinfo;
		this.winfo = data.info;
        /**
         * App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
         */
	}
	public getCountDownTime():number{
		let et = this.et - 86400;
		return et - GameData.serverTime;
	}
	public setMap(data):void{
		this.map = data;
	}
	public getMap():number{
		return this.map.length;
	}

	public setAlive(data):void{
		this.myalive = data;
	}

	public setRank(data):void{
		this.myrank = data;
	}

	public setPkzids(data):void{
		this.pkzids = data;
	}
	
	public getPkzidsStr():string{
		let reStr = "";
		let zidObj = null;
		for(let i =0;i<this.pkzids.length;i++){
			zidObj = this.pkzids[i];
			if(zidObj.qu){
				reStr += LanguageManager.getlocal("mergeServerOnlyqu",[String(zidObj.qu)]);
			} else {
				reStr += LanguageManager.getlocal("ranserver2",[String(zidObj.zid)]);
			}
			
			if(i != this.pkzids.length-1){
				reStr += "，";
			}
		}
		return reStr;
	}

	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.versionst, et, true);
	}

    private get cfg():Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	/*
	*红点机制
	*/
	public get isShowRedDot():boolean{
		return this.init && this.getAttendQuality();
	}
	/*
	*活动周期内
	*/
	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.versionst && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}
	/*
	*检查是否在统计中
	*/
	public checkIsCal():boolean{
		let weedOutList = this.cfg.weedOut;
		let weedOutO = null;
		for(let i = 0;i < weedOutList.length;i++){
			weedOutO = weedOutList[i];
			if(GameData.serverTime > weedOutO.time + this.versionst && GameData.serverTime < weedOutO.time + this.versionst + 300){
				return true;
			}
		}
		return false;

	}
	//距离统计结束还有多少秒
	public newRoundSecond():number{
		let weedOutList = this.cfg.weedOut;
		let weedOutO = null;
		for(let i = 0;i < weedOutList.length;i++){
			weedOutO = weedOutList[i];
			if(GameData.serverTime > weedOutO.time + this.versionst && GameData.serverTime < weedOutO.time + this.versionst + 300){
				return weedOutO.time + this.versionst + 300 - GameData.serverTime;
			}
		}
		return 0;
	}
	
	public isActyEnd():boolean{
		let flag = false;
		if(GameData.serverTime >= this.et){
			flag = true;
		}
		return flag;
    }
    /**
     *  获取地图上帮会信息
     * */
    public getAllInfoById(id):any{
		let status = 0;
		let info = this.map[id - 1];
		if(!info){
			return null;
		}
		let total = info.mn;
		let num = Number(info.alivemn);
		let arr = [0.5, 0.2, 0];
		if(num == 0){
			status = 4;
		}
		else{
			for(let i in arr){
				if(num >= total * arr[i]){
					status = Number(i) + 1;
					break;
				}
			}
		}
		
		//帮会存活人数>=50%
		
		return {
            num : num,
            alliName : info.name,
            alliId : id,
            total : total,
			period : status,
			level: info.level,
			server : info.zid,
			mid : info.id,
        };
	}
	
	/**
     *  是否有资格参赛
     * */
    public getAttendQuality():boolean{
        // return this.info.iscanjoin == 1;
		return this.info.iscanjoin >= 1;
		// return true;
	}
	/**
     *  判断最后是否冠军产生
     * */
    public isChampWin():boolean{
		let flag = false;
		let tmp = Api.chatVoApi.arr_clone(this.map);
		tmp.sort((a,b)=>{
			return Number(b.alivemn) - Number(a.alivemn);
		});
		let totalAlive = 0;
		for(let i in tmp){
			totalAlive += Number(tmp[i].alivemn);
		}
		if(tmp[0] && totalAlive == Number(tmp[0].alivemn)){
			flag = true;
		}
		return flag;
	}

	/**
     *  当期阶段 1预热期 2活动期 3展示公告期 4结束
     * */
	public getCurperiod():number{
		let period = 0;
		if((GameData.serverTime < this.versionst)){
			period = 1;
		}
		else{
			if(this.isChampWin()){
				period = 3;
			}
			else{
				let round = this.getCurRound();
				if(round == 0 || this.isActyEnd()){
					period = 4;
				}
				else{
					period = 2; 
				}
			}
		}
        return period;
	}
	/**
     *  获取倒计时
     * */
    public getCountCD():number{
		let curPeriod = this.getCurperiod();
		let time = 0;
		switch(curPeriod){
			case 1:
				time = this.versionst;
				break;
			case 2:
				time = this.versionst + this.weedOut[this.getCurRound() - 1].time;
				break;
			case 3:
				time = this.et
				break;
			case 4:
				time = 0;
				break;
		}
		return time - GameData.serverTime;
	}
	/**
     *  获取当前轮数
     * */
    public getCurRound():number{
		let round = 0;
		for(let i=0;i<this.cfg.weedOut.length;i++){
		// for(let i in this.weedOut){
			let unit = this.weedOut[i];

			if(GameData.serverTime < (this.versionst + unit.time)){
				if(GameData.serverTime >= this.versionst){
					round = Number(i) + 1;
					break;
				}

			}
		}

		return round;
	}
	/**
     *  获取当前我的分数
     * */
    public getMyScore():number{
		let value = 0;
		if(this.myrank){
			value = this.myrank.value;
		}
		return value;
	}

	/**
     *  获取当前我的排名
     * */
    public getMyRank():number{
		let rank = 0;
		if(this.myrank && this.myrank.myrank){
			rank = this.myrank.myrank;
		}
		return rank;
	}
	/**
     *  获取是否被淘汰
     * */
    public getJoinIn():boolean{
		return this.myalive && this.myalive == 1;
	}
	/**
     *  获取获胜帮会信息
     * */
    public getWinnerAlliance():{name : string, mid : number}{
		let tmp = Api.chatVoApi.arr_clone(this.map);
		tmp.sort((a,b)=>{
			return b.alivemn - a.alivemn;
		});
		return {
			name : tmp[0].name,
			mid :  tmp[0].id,
		};
	}
	/**
     *  帮会是否被淘汰
     * */
    public isAlliOut(id):boolean{
		let info = this.getAllInfoById(id);
		return info && Number(info.num) === 0;
	}

	/**
     *  帮会下某个人是否被淘汰
     * */
    public isAlliMemberOut(allid, uid):boolean{
		return Math.random() > 0.5;
	}

	/**
     *  返回战斗记录
     * */
	public getBattleLog(data):any[]{
		let arr = [];
		for(let i in data){
			let unit = data[i].info;
			arr.push({
				id : data[i].id,
				alliName : unit.alliancename,
				playerName : unit.name,
				servantName : Config.ServantCfg.getServantItemById(unit.sid).name,
				enermyName : unit.uname2,
				enermyNum : unit.fightnum,
				time : unit.st,
				uid : unit.uid,
				info : unit
			});
		}
		arr.sort((a,b)=>{
			return b.time - a.time
		})
		return arr;
	}
	public getOneList(){
		if(this.onelist){
			let unit = this.onelist.info;
			let obj = {
					id : this.onelist.id,
					alliName : unit.alliancename,
					playerName : unit.name,
					servantName : Config.ServantCfg.getServantItemById(unit.sid).name,
					enermyName : unit.uname2,
					enermyNum : unit.fightnum,
					time : unit.st,
					uid : unit.uid,
					info : unit
			}
			return obj;
		} else {
			return null;
		}


	}

	/**
     *  返回战斗记录
     * */
	public setExtraList(data):void{
		this.extraList = [];
		this.extraList = data;
		// arr.sort((a,b)=>{
		// 	return b.time - a.time
		// })
	}

	
	

	public getLastChargeLog():any{
		let info = null;
		if(this.winfo.lastuid){
			info = {
				playerName : this.winfo.lastname,
				uid : this.winfo.lastuid
			}
		}
		return info;
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():AtkraceAtkInfoVo
	{
		return this.ainfo;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo():AtkraceInfoVo
	{
		return this.cinfo;
	}

	public getMydInfo():any
	{
		return this.dinfo;
	}

	public getMyeInfo():any
	{
		return this.einfo;
	}
	
	public getPoint():number
	{
		return this.point;
	}

	public getRewardc():any
	{
		return this.rewardc;
	}

	// public getDecreePolicyAddAttrInfo()
	// {
	// 	return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace",5);
	// }

	public getRevengeIdx():number{
		return this.revengeIdx;
	}

	public setRevengeIdx(num : number):void{
		this.revengeIdx = num;
	}
	/**
	 * 歼灭公告信息
	 */
	public getKillNoticeInfo():string[]
	{
		let tmp = [];
		for(let i in this.extraList){
			let unit = this.extraList[i].info;
			// tmp.push(LanguageManager.getlocal(`acBattleGroundTip6-${this.code}`,[
			tmp.push(LanguageManager.getlocal(this.getDefaultCn("acBattleGroundTip6"),[
				unit.name,unit.uname2,unit.multikill,App.DateUtil.getFormatBySecond(unit.st,2)
			]));
		}
		return tmp;
	}
    private getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	public setWaiting(data):void{
		this.waiting = data;
	}
	public getWaiting():number{
		return this.waiting;
	}

	public isWaiting():boolean{
		return this.waiting == 1;
	}

	public dispose():void{
		this.point = 0;
		this.einfo = null;
		this.lastday = 0;
		this.isjoin = 0;
		this.cinfo.dispose();
		this.cinfo=null;
		this.info=null;
		this.ainfo.dispose();
		this.ainfo=null;
		this.dinfo = null;
		this.rewardc = null;
		this.init = true;
		this.myalive = 0;
		this.myrank = null;
		this.extraList = [];
		this.waiting = 0;
		this.rankData = null;
		this.curOutScore = 0;
		this.pkzids = null;
		this.onelist = null;
		super.dispose();
	}
}