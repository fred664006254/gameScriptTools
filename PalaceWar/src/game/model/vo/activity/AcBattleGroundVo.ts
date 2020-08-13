class AcBattleGroundVo extends AcBaseVo{
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
	public map = null;
	private revengeIdx = 0;
	public init = true;
	//是否被淘汰
	private myalive = 0;
	private myrank = null;
	private extraList = [];
	private waiting = 0;
	private cheer = 0;
	private task=null;

	public initData(data):void{
		super.initData(data);
		this.cheer = data.cheer;
		this.task = data.task;
		if(data.ainfo){
			this.setRaceInfo(data);
		}
	}

	public setRaceInfo(data:any):void{
		this.weedOut = data.weedOut;
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
		if(data.ainfo != null && Object.keys(data.ainfo).length>0){
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
        /**
         * App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
         */
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
		return this.getRedPot1() || this.getRedPot2();
	}

	public getRedPot1():boolean{
		let flag = false;
		if(this.getCurperiod() < 3){
			flag = this.init && this.getAttendQuality();
		}
		return flag;
	}

	public getRedPot2():boolean{
		return (!this.getAttendQuality() && ((this.cheer > 0 && this.canGetTask()) || (this.getCurRound() == 1 && Api.atkraceVoApi.isShowNpc() && !(this.cheer > 0))));
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
		
		let lv = 0;
		for(let i in this.cfg.help){
			let unit = this.cfg.help[i];
			if(info.cheerexp >= unit.needHelp){
				lv = Number(i) + 1;
			}
		}
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

	public showCheerFire():boolean{
		let flag = true;
		for(let i in this.map){
			let unit = this.map[i];
			
		}
		return flag;
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
			tmp.push(LanguageManager.getlocal(`acBattleGroundTip6-${code}`,[
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

	public isGetTask(key : string):boolean{
		let flag = false;
		if(this.task && this.task.flags && this.task.flags[key]){
			flag = this.task.flags[key] == 1;
		}
		return flag;
	}

	public getTaskValue(questType : string):number{
		let num = 0;
		if(this.task && this.task.v && this.task.v[questType]){
			num = this.task.v[questType];
		}
		return num;
	}

	public canGetTask():boolean{
		let flag = false;
		for(let i in this.cfg.audienceTask){
			let unit = this.cfg.audienceTask[i];
			let num = this.getTaskValue(unit.questType);
			if(num >= unit.value && !this.isGetTask(i)){
				flag = true;
			}
		}
		return flag;
	}

	public getCheerALlianceOut():boolean{
		let flag = false;
		let cheerid = this.getCheerId();
		flag = cheerid && cheerid.isout;
		return flag;
	}

	public getIsCheerServantFight(uid : number, servantid : number):boolean{
		let flag = false;
		if(this.cinfo && this.cinfo.usesp && this.cinfo.usesp[uid] && this.cinfo.usesp[uid][servantid]){
			flag = this.cinfo.usesp[uid][servantid] == 1;
		}
		return flag;
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
		this.task = null;
		this.flag = false;
		super.dispose();
	}
}