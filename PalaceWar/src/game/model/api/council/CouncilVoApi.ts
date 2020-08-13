/**
 * 议事阁系统api
 * author qianjun
 */

class CouncilVoApi extends BaseVoApi
{
	private _conucilVo : CouncilVo = null;
	private _eventInfo : any = {};
	private _getrewards : any = {};
	private _info : any = {};
	private _joinevent : any = {};
	private _restservant : any = {};
	private _rewards : any = {};
	private _seatinfo : any = {};
	private _rankinfo : any = {};

	public constructor() {
		super();
	}

	public formatData(data:any):void
	{
		this._getrewards = data.getrewards;
		this._info = data.info;
		this._restservant = data.restservant;
		this._joinevent = data.joinevent;
		this._rewards = data.rewards;
		// if(this._conucilVo == null)
		// {
		// 	let className:string = this.getClassName();
		// 	let voClassName:string = "CouncilVo";
		// 	let voClass:any = egret.getDefinitionByName(voClassName);
			
		// 	this._conucilVo = new voClass();
		// 	// this.chatblockVo.initData(data);
		// 	this[App.StringUtil.firstCharToLower(voClassName)] = this._conucilVo;
		// }
		// this._conucilVo.initData(data);
	}

	public getDescId(eventId):number{
		return this._info.randevent ? this._info.randevent[eventId] : 1;
	}

	public checkNpcMessage():boolean
    {
        for(let i = 0; i < 5; ++ i){
			if(this.canGetReward(i)){
				return true;
			}
			// if(this.canJoinEvent(i)){
			// 	return true;
			// }
		}
        return false;
    }
	
	public canJoinEvent(i:number):boolean
	{
		let itemnum = Api.itemVoApi.getItemNumInfoVoById(Config.CouncilCfg.needItem);
		if (itemnum > 0)
		{
			let servantnum = Object.keys(this._info.randevent).length;
			if (Api.servantVoApi.getServantCount() > servantnum)
			{	
				let maxnum = Config.CouncilCfg.maxPlayer;
				let event = this._eventInfo[String(i)];
				let joinevent=this._joinevent[String(i)];
				
				if(!joinevent)
				{	
					let eventNum = 0;
					let endtime = GameData.serverTime +1;
					if (event && event.num)
					{
						eventNum = event.num;
						endtime = event.et;
					}
					if (endtime > GameData.serverTime && eventNum < maxnum)
					{
						return true;
					}
				}
			}
		}
		return false;
	}


	public formatEventData(data:any):void
	{
		for(let i in data){
			this._eventInfo[i] = data[i];
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_COUNCIL_FRESHMODEL);
	}

	private _kingdata : any = null;
	public setKingData(data):void{
		this._kingdata = data;
	}

	public getKingData():any{
		return this._kingdata;
	}
	

	public get councilVo() : CouncilVo
	{
		return this._conucilVo;
	}
    
	public isShowNpc():boolean
	{
		return Api.playerVoApi.getPlayerLevel() >= Config.CouncilCfg.needLv;
    }
    
	public getLockedString():string
	{
		var unlock = Config.CouncilCfg.needLv;
		return LanguageManager.getlocal("reachLvelUnlockDesc",[Api.playerVoApi.getPlayerOfficeByLevel(unlock)]);
	}
	/*
	*1结算间隔  2参加时间 3结算间隔 4领赏时间
	*/
	public getCurpeirod():number{
		let period = 1;
		if(this._eventInfo[1]){
			let period_arr = [this._eventInfo[1].st + 5 * 60, this._eventInfo[1].st + 10 * 3600, this._eventInfo[1].st + 10 * 3600 + 5 * 60, this._eventInfo[1].st + 24 * 3600];
			for(let i in period_arr){
				let time = period_arr[i];
				if(GameData.serverTime < time){
					period = Number(i) + 1;
					break;
				}
			}
		}
		return period;
	}

	public canGetReward(eventId):boolean{
		let flag = false;
		let isLq = false;
		for(let i in this._getrewards){
			let unit = this._getrewards[i];
			for(let j in unit){
				if(GameData.serverTime >= (Number(j) + 10 * 3600 + 5 * 60)){
					isLq = true;
					break;
				}
			}
		}
		if(isLq && this._getrewards[eventId] && Object.keys(this._getrewards[eventId]).length){
			flag = true;
		}
		return flag;
	}
	
	public getCountTime():number{
		let period_arr = [this._eventInfo[1].st + 5 * 60, this._eventInfo[1].st + 10 * 3600, this._eventInfo[1].st + 10 * 3600 + 5 * 60, this._eventInfo[1].st + 24 * 3600];
		let period = this.getCurpeirod();
		return period_arr[period - 1] - GameData.serverTime;
	}

	public getTodayEvent():any[]{
		let arr = [];
		for(let i in this._eventInfo){
			let unit = this._eventInfo[i];
			arr.push({
				eventId : i,
				eventNeedType : i,
				joinNum : unit.num,
				canjoin : false
			});
		}
		return arr;
	}

	public getMaxJoinNum():number{
		return Config.CouncilCfg.maxPlayer;
	}

	public isVisitEvent(eventId):boolean{
		let flag = false;
		if((this._joinevent[eventId] && this._joinevent[eventId] == 1) || (this._getrewards[eventId] && this._getrewards[eventId][this._eventInfo[eventId].st])){
			flag = true;
		}
		return flag;
	}

	public getJoinEventSeatId(eventId) : number{
		let idx = null;
		if(this._seatinfo[eventId]){
			for(let i in this._seatinfo[eventId]){
				let unit = this._seatinfo[eventId][i];
				if(unit && unit.uid == Api.playerVoApi.getPlayerID()){
					idx = Number(i);
					break;
				}
			}
		}
		return idx;
	}

	public setEventSeatInfo(eventId, data):void{
		delete this._seatinfo[eventId];
		this._seatinfo[eventId] = data;
	}

	public setEventSeatInfoBack(eventId, data):void{
		this._seatinfo[eventId] = {};
		this._seatinfo[eventId] = data;
	}

	public setRankInfo(eventId, data):void{
		delete this._rankinfo[eventId];
		this._rankinfo[eventId] = data;
	}

	public getSeatId(eventId) : number{
		for(let i = 1; i <= Config.CouncilCfg.maxPlayer; ++i){
			if(typeof this._seatinfo[eventId][i] == 'undefined'){
				return i;
			}
		}
		return Config.CouncilCfg.maxPlayer;
	}


	public getEventPlayerInfo(eventId, type?):any[]{
		let arr = [];
		if(!type){
			type = this.getCurpeirod();
		}
		if(type == 4){
			for(let i in this._rankinfo[eventId].rankArr){
				let unit = this._rankinfo[eventId].rankArr[i];
				let unitinfo = null;
				for(let i in this._rankinfo[eventId].seatlist){
					let temp = this._rankinfo[eventId].seatlist[i];
					if(temp.uid == unit.uid){
						unitinfo = temp;
						break;
					}
				}
				arr.push({
					name : unit.name,
					uid : unit.uid,
					eventId : eventId,
					eventNeedType : eventId,
					pic : unitinfo ? unitinfo.pic : 1,
					level : unitinfo ? unitinfo.level : 1,
					totalNum : unit.value,
					sinfo : unitinfo.sinfo
				});
			}
		}
		else{
			for(let i = 1; i <= this.getMaxJoinNum(); ++ i){
				let unit = this._seatinfo[eventId][i];
				if(unit && type != 1){
					arr.push({
						index : Number(i),
						name : unit.name,
						uid : unit.uid,
						eventId : eventId,
						eventNeedType : eventId,
						joinNum : this._eventInfo[eventId].num,
					});
				}
				else{
					arr.push({
						index : Number(i),
						eventId : eventId,
						empty : true
					});
				}
			}
		}
		return arr;
	}

	public getEventInfoById(eventId):any{
		return {
			eventId : eventId,
			eventNeedType : eventId,
			joinNum : this._eventInfo[eventId].num,
			st : this._eventInfo[eventId].st
		}
	}
	// JOIN_THIS,JOIN_OTHER,NOT_JOIN
	public servantIsJoined(eventId, servantId) : string{
		for(let i in this._buzheninfo){
			if(this._buzheninfo[i].data.servantId == servantId){
				return 'JOIN_THIS';
			}
		}
		if(this._restservant[servantId] && this._restservant[servantId] == 1){
			return 'JOIN_OTHER';
		}
		return 'NOT_JOIN'
	}

	private _buzheninfo : any = null;
	public setBuzhenInfo(info):void{
		this._buzheninfo = null;
		this._buzheninfo = info;
	}

	public getRewardByRank(rank):string{
		let ranklist = Config.CouncilCfg.rankList;
		for(let i in ranklist){
			let unit : Config.CoucilRankItemCfg = ranklist[i];
			if(unit.minRank <= rank && unit.maxRank >= rank){
				return `5_1_${unit.exp}|14_1_${unit.bookExp}`
			}
		}
		return null;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = Config.CouncilCfg;
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
						if(currObj)
						{
							list[i][key2].key = Number(key2);
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

	public checkIsGetReward():void{
		for(let i in this._getrewards){
			let unit = this._getrewards[i];
			for(let j in unit){
				if(j < this._eventInfo[i].st){
					NetManager.request(NetRequestConst.REQUST_COUNCIL_GETREWARD, {
					});
					return;
				}
			}
		}
	}
    
	public dispose():void
	{
		this._conucilVo = null;
		super.dispose();
	}
}