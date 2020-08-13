class AcGroupWifeBattleVo extends AcBaseVo{
	public constructor(){
		super();
	}
	public selIdx : number = -1;
	public lastpos : any = null;
	private info = null;
	public flag : boolean = false;
	//是否参与过
	private isjoin = 0;
	//衙门分数
	private point = 0;
	//当日是否被攻击过
	private isattacked = 0;
	//起始时间
	public version = 0;
	//淘汰轮次
	private _weedOut = null;
	//衙门状态{lasttime=0, num=0, extranum=0,streak=0,morale=0,rankover=0,asids={},rsids={}}
	private cinfo:any = null;
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
	private iscanjoin = 0;
	//地图信息
	public map = null;
	private revengeIdx = 0;
	public init = true;
	//是否被淘汰
	private myalive = 0;
	private myrank = null;
	private extraList = [];
	private waiting = 0;
	private cheer = 0;

	public wifebattlecross:any;
	public test = false;

	public initData(data):void{
		super.initData(data);
		this.cheer = data.cheer;
		if(data.ainfo){
			this.setRaceInfo(data);
		}
		if(data.st)
		{
			this.version = data.st;
		}
	}

	//type 1--帮会  2--个人
	public getRewardKeyByType(type:number):any[]
	{
		if(type == 1)
		{
			return this.cfg.allianceRank;
		}else
		{
			return this.cfg.indivdualRank;
		}
	}

	public setWifebattleInfo(wifeBattleInfo:any):void{
		this.wifebattlecross = wifeBattleInfo;
	}	

	public get proNum():number
	{
		if(this.wifebattlecross && this.wifebattlecross.info && this.wifebattlecross.info.protectNum)
		{
			return this.wifebattlecross.info.protectNum;
		}
		return 0;
	}

	public getRuleInfoParam():string[]
	{
        let tmp = [];
		tmp.push(this.cfg.victoryScore.victoryScoreBaseParam+"");
		tmp.push(this.cfg.lostScore.lostScoreBaseParam+"");
		tmp.push(this.cfg.victoryScore.victoryScoreNumParam+"");
		tmp.push(this.cfg.defScore.defScoreNumParam+"");

		tmp.push(this.cfg.victoryScore2.victoryScoreBaseParam+"");
		tmp.push(this.cfg.lostScore2.lostScoreBaseParam+"");
		tmp.push(this.cfg.victoryScore2.victoryScoreNumParam+"");
		tmp.push(this.cfg.defScore.defScoreNumParam+"");		
        return tmp;		
	}

	public get versionst():number
	{
		return this.version+2*3600;
	}

	public setRaceInfo(data:any):void{
		this.version = data.version;
		this.point = data.point;
		this.einfo = data.einfo;
		this.lastday = data.lastday;
		this.isjoin = data.isjoin;
		if (data.rewardc) {
			this.rewardc = data.rewardc;
		}
		if(data.info)
		{
			this.weedOut = data.info.weedOut;
		}
		if (data.info != null) {
			this.cinfo = data.info;
		}
		else if (this.cinfo!=null) {
			this.cinfo = null;
		}
		if(data.ainfo != null && Object.keys(data.ainfo).length>0){
			this.ainfo = data.ainfo;
		}
		else if (this.ainfo!=null) {
			this.ainfo = null;
		}
		this.dinfo = data.dinfo;
        /**
         * App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
         */
	}

	private get weedOut():any
	{
		if(this._weedOut)
		{
			return this._weedOut;
		}else
		{
			return this.cfg.weedOut;
		}
	}
	private set weedOut(wo:any)
	{
		this._weedOut = wo;
	}

	public getMyProtectNum():number
	{
		if(this.cinfo && this.cinfo.protectNum)
		{
			return this.cinfo.protectNum;
		}
		return 0;
	}

	public setMap(data):void{
		this.map = data;
	}

	public getMapLenth():number{
		let len = 0;
		if(this.map && this.map.length){
			len = this.map.length;
		}
		return len;
	}

	public setAlive(data):void{
		this.myalive = data;
	}

	public setRank(data):void{
		this.myrank = data;
	}

	public isOut():boolean
	{
		return this.getCurperiod() > 1 && this.getMyScore() == -9999;
	}
	
	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.versionst, et, true);
	}

    private get cfg():Config.AcCfg.GroupWifeBattleCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	/*
	*红点机制
	*/
	public get isShowRedDot():boolean
	{
		return this.getRedPot1() || this.getRedPot2() || this.canFight();
	}

	private canFight():boolean
	{
		let myInfo:any =this.getMyInfo();
		if(!this.wifebattlecross || !myInfo)
		{
			return Api.redpointVoApi.checkHaveRedPointByAid(this.aid, `canSearch`) && this.getAttendQuality() && this.getCurperiod()==2;
		}

		let free = myInfo && myInfo.num ? myInfo.num : 0;
		let lasttime = myInfo && myInfo.lasttime ? myInfo.lasttime : 0;
		let countDownTime = lasttime + this.cfg.coolDownTime -  GameData.serverTime;	

		let b = this.getStatusWifeNum() >= this.cfg.unlock_wifeStar;
		let fight = this.getJoinIn();

		return (b && fight && this.getAttendQuality() && this.getCurperiod()==2 && free < this.cfg.freeTime && !(countDownTime>0));	
	}

	public getRedPot1():boolean{
		let flag = false;
		// if(this.getCurperiod() < 3){
		// 	flag = this.init && this.getAttendQuality();
		// }
		// if(flag)
		// {
		// 	if(this.getCurperiod() == 2 && !this.getJoinIn())
		// 	{
		// 		return false;
		// 	}
		// }
		return flag;
	}

	public getRedPot2():boolean{
		return (this.getCurRound() == 1 && Api.wifebattleVoApi.isBaseWifeBattleOpen() && !(this.cheer > 0));
	}
	/*
	*活动周期内
	*/
	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.version && GameData.serverTime < this.et - this.cfg.extraTime*86400){
			flag = true;
		}
		return flag;
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
		// status = 5;
		
		//帮会存活人数>=50%
		
		let lv = 0;
		// for(let i in this.cfg.help){
		// 	let unit = this.cfg.help[i];
		// 	if(info.cheerexp >= unit.needHelp){
		// 		lv = Number(i) + 1;
		// 	}
		// }
		return {
            num : num,
            alliName : info.name,
            alliId : id,
            total : total,
			period : status,
			server : info.zid,
			mid : info.id,
			affect : info.affect,
			cheerlv : lv,
			cheerexp : info.cheerexp ? info.cheerexp : 0,
        };
	}
	
	/**
     *  是否有资格参赛
     * */
    public getAttendQuality():boolean{
        return this.info.iscanjoin == 1;
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
        return period
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
		// return 3598;
		return time - GameData.serverTime;
	}
	/**
     *  获取当前轮数
     * */
    public getCurRound():number{
		let round = 0;
		for(let i in this.weedOut){
			let unit = this.weedOut[i];
			if(GameData.serverTime < (this.versionst + unit.time) && GameData.serverTime >= this.versionst){
				round = Number(i) + 1;
				break;
			}
		}
		return round;
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

    public getMyScore():number{
		let score = 0;
		if(this.myrank && this.myrank.value){
			score = this.myrank.value;
		}
		return score;
	}
	
	/**
     *  获取是否被淘汰
     * */
    public getJoinIn():boolean{
		return (this.myalive && this.myalive == 1) && !this.isOut();
	}
	/**
     *  获取获胜帮会信息
     * */
    public getWinnerAlliance():{name : string, mid : number}{
		let tmp = Api.chatVoApi.arr_clone(this.map);
		tmp.sort((a,b)=>{
			return b.alivemn - a.alivemn;
		});
		if(tmp && tmp[0])
		{
			return {
				name : tmp[0].name,
				mid :  tmp[0].id,
			};
		}else
		{
			return {
				name : "",
				mid :  1,
			};
		}
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
				info : unit,
				support : unit.support ? unit.support : 0
			});
		}
		arr.sort((a,b)=>{
			return b.time - a.time
		})
		return arr;
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
		if(this.cinfo.lastuid){
			info = {
				playerName : this.cinfo.lastname,
				uid : this.cinfo.lastuid
			}
		}
		return info;
	}
	/**
	 * 战斗信息
	 */
	public getMyFightInfo():any
	{
		return this.ainfo;
	}

	public isHaveFightInfo():boolean
	{
		return this.ainfo && this.ainfo.uid;
	}
	/**
	 * 武馆信息息
	 */
	public getMyInfo():any
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

	public getDecreePolicyAddAttrInfo()
	{
		return Api.promoteVoApi.getDecreePolicyAddAttrInfo("atkrace",5);
	}

	public getRevengeIdx():number{
		return this.revengeIdx;
	}

	public setRevengeIdx(num : number):void{
		this.revengeIdx = num;
	}
	/**
	 * 歼灭公告信息
	 */
	public getKillNoticeInfo(code:string):string[]
	{
		let tmp = [];
		for(let i in this.extraList){
			let unit = this.extraList[i].info;
			tmp.push(LanguageManager.getlocal(`acGroupWifeBattleTip6-${code}`,[
				unit.name,unit.uname2,unit.multikill,App.DateUtil.getFormatBySecond(unit.st,2)
			]));
		}
		return tmp;
	}

	public setWaiting(data):void{
		this.waiting = data;
	}

	public isWaiting():boolean{
		return this.waiting == 1;
	}

	public getCheerId():any{
		let info = null;
		let cheerid = this.cheer;
		if(cheerid){
			let alliinfo = this.getAllianceInfoById(cheerid);
			info = {
				id : cheerid,
				name : alliinfo.alliName,
				isout : alliinfo.num == 0,
			};
		}
		return info;
	}

	public getAllianceInfoById(allid : number):any{
		for(let i in this.map){
			let unit = this.map[i];
			if(Number(unit.id) == Number(allid)){
				return this.getAllInfoById(Number(i) + 1);
			}
		}
	}

	public canGetTask():boolean{
		return false;
	}

	public getCheerALlianceOut():boolean{
		let flag = false;
		let cheerid = this.getCheerId();
		flag = cheerid && cheerid.isout;
		return flag;
	}

	//得到对手位分最高的弹出提示信息
	public getEnemyMaxInfo():{wifeid:number,skin:number,sexflag?:number}
	{	
		if(this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.maxwifeinfo){
			if(this.wifebattlecross.ainfo.maxwifeinfo.sexflag && this.wifebattlecross.ainfo.maxwifeinfo.sexflag >= 1){
				return {wifeid:this.wifebattlecross.ainfo.maxwifeinfo.wifeid,skin:this.wifebattlecross.ainfo.maxwifeinfo.maleskin,sexflag:this.wifebattlecross.ainfo.maxwifeinfo.sexflag};

			} else {
				return {wifeid:this.wifebattlecross.ainfo.maxwifeinfo.wifeid,skin:this.wifebattlecross.ainfo.maxwifeinfo.skin};

			}
		} else {
			return null;
		}
	}

	public getStatusWifeNum():number
	{
		return Api.wifestatusVoApi.getStatusWifeNum();
	}

	public dispose():void{
		this.point = 0;
		this.einfo = null;
		this.lastday = 0;
		this.isjoin = 0;
		this.cinfo=null;
		this.info=null;
		this.ainfo=null;
		this.dinfo = null;
		this.rewardc = null;
		this.init = false;
		this.myalive = 0;
		this.myrank = null;
		this.extraList = [];
		this.waiting = 0;
		this.flag = false;
		super.dispose();
	}
}