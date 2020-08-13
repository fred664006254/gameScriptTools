class AcTombVo extends AcBaseVo
{
	private ainfo : any = null;// 活动商铺各项购买数量
	private binfo : any = null;//积分商城各项购买数量
	private cinfo : any = null;//出战过的门客状态 servantId = nil 未出战，1已出战，0使用了出战令，2使用出战令后再次已出战
	private buysearch : number = 0;//元宝购买探索的次数
	private search : any = null;//剩余探索次数和上次更新探索次数的时间{v: 5, lasttime: 0}
    private shopscore : number = 0;//商店积分
    private totalShopScore : number = 0;//商店积分
    private bossMaxHp : any = {};
    private score:number=0;
    private info:any=null;

    private _clickIdx = 0;
    private _clickType = '';
    private _enermy : any = [];
    private _killed : any = [];
    private _killLog = [];
    private _bossInfo : any = {};
    private _rankInfo : any = {};
    private _bossNumInfo : any = {};
    public moviePlay : boolean = false;
    public zidarr = [];
    public map = [];
    private _curKillNum = 0;
    public clickIdx = -1;
	
	public constructor() 
	{
		super();
	}

	public initData(data:any):void{
		super.initData(data);
		this.ainfo = data.ainfo;
		this.binfo = data.binfo;
		this.cinfo = data.cinfo;
		this.buysearch = data.buysearch;
		this.search = data.search;
        this.shopscore = data.shopscore;
        this.score = data.score;
        this.info = data.info;
        this.totalShopScore = data.totalShopScore;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_TOMB_REFRESH);
	}

	public dispose():void{
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.buysearch = 0;
		this.search = null;
		this.shopscore = 0; 
        this.bossMaxHp = null;
        this.score = 0;
        this.info = null;
		this._bossInfo = {};
        this._bossNumInfo = {};
        this._clickIdx = 0;
        this._clickType = '';
        this._enermy = [];
        this._killLog = [];
        this._killed = [];
        this._rankInfo = {};
        this.moviePlay = false;
        this.zidarr = [];
        this.map = [];
        this._curKillNum = 0;
        this.clickIdx = -1;
        this.totalShopScore = 0;
		super.dispose();
    }
    
    public gettotalShopScore():number{
        let num = 0;
        if(this.totalShopScore){
            num = this.totalShopScore;
        }
        return num;
    }

	public getServantFightInfo(servantId):number{
        let v:number = 0;
        if(this.cinfo && this.cinfo[servantId]){
            v = this.cinfo[servantId]
        }
		return v;
	}

	public get cfg() : Config.AcCfg.TombCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getpublicRedhot1():boolean
	{
		let flag = false;
		//有探索次数
		if(this.isInActTime() && this.isInFightTime() && this.search.v > 0)
		{
			flag = true;
		}
		return flag;
	}

	public getpublicRedhot2():boolean{
		let flag = false;
		//有可积分兑换的
		if(!this.isEnd && this.getActPoints() > 0){
			let arr = this.getArr('scoreMarket');
			for(let i in arr){
				let unit = arr[i];
				let curNum = unit.limit - this.getPointChangeLimitnum(unit.id);
				if(this.getActPoints() >= unit.costScore && curNum > 0){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	public getBuySearchNum():number{
		return this.buysearch;
	}

	public get isShowRedDot(): boolean 
	{	
        if(this.getAttendQUality() ){
            for(let i = 1; i < 3; ++ i){
                if(this[`getpublicRedhot${i}`]()){
                    return true
                }
            }
        }
		return false; 
	} 


    /**
	 * 鳌拜活动 今日加成
	*/
	public getMyAdd():number{
        let effect = this.cfg.actMarket[0].effect;
        let num = 0;
        if(this.ainfo && this.ainfo[1]){
            num = this.ainfo[1];
        }
        return num * 100 * effect;
    }

	
	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
    }
    /** 
     * 1 准备期 2 进行中 3 活动已结束
    */
    public getCurPeriod():number{
        let timeNumber:number = 3600 * 2;
        let period = 0;
        let st = this.st + timeNumber;
        let et = this.et - 86400;
        if(GameData.serverTime < st){
            period = 1;
        }
        else if(GameData.serverTime >= st && GameData.serverTime < et){
            period = 2;
        }
        else if(GameData.serverTime >= et){
            period = 3;
        }
        return period;
    }

    public getActDayTimeCount(code:string):string{
        let period = this.getCurPeriod();
        let et = 0;
        let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        let timeNumber:number = 3600 * 2;
        let st = this.st + timeNumber;
        let cfg = this.cfg;
        let key = '';
        let opentime = this.cfg.actTime;
        let dayst = today0 + opentime[0] * 3600;
        let dayet = today0 + (opentime[0] + (this.cfg.actTime[1] - this.cfg.actTime[0])) * 3600
        if(period == 1){
            et = dayst + 24 * 3600;;
            key = `tombtime5`;
        }
        else if(period == 2){
            
            if(GameData.serverTime >= dayst && GameData.serverTime < dayet){
                et = dayet;
                key = `tombtime6`
            }
            else{
                if(GameData.serverTime < dayst){
                    et = dayst;
                }
                else{
                    et = dayst + 24 * 3600;
                }
                key = `tombtime5`;
            }
        }
        else{
            if(this.isEnd){
                key = `tombtime8`;
            }
            else{
                key = `tombtime7`;
                et = this.et;
            }
        }
        return LanguageManager.getlocal(`${key}-${code}`,[App.DateUtil.getFormatBySecond(et - GameData.serverTime)]);
    }

	public getCountDownTime():number{
        let period = this.getCurPeriod();
        let timeNumber:number = 3600 * 2;
        let st = this.st + timeNumber;
        let et = this.et - 86400;
        let time = 0;
        if(period == 1){
            time = st - GameData.serverTime;
        }
        else if(period == 2){
            time = et - GameData.serverTime;
        }
		return time;
	}

	public isActivityEnd():boolean{
		return GameData.serverTime >= this.et;
    }

    /*
	*活动周期内
	*/
	public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}
	

	public isInActTime():boolean{
		return this.getCurPeriod() == 2;
	}


	public isInFightTime():boolean{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        let flag = false;
        let opentime = this.cfg.actTime;
		if(GameData.serverTime >= (today0 + opentime[0] * 3600) && GameData.serverTime < (today0 + (opentime[0] + (this.cfg.actTime[1] - this.cfg.actTime[0])) * 3600)){
			flag = true;
		}
		return flag;
	}

	public getNextOpenTime():number{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
        let time = 0;
        let opentime = this.cfg.actTime;
		if(GameData.serverTime < (today0 + opentime[0] * 3600)){
			time = today0 + opentime[0] * 3600 - GameData.serverTime;
		}
		else{
			time = today0 + opentime[0] * 3600 + 3600 * 24 - GameData.serverTime;
		}
		return time;
	}

	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.TombCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						if(currObj.idvRank || currObj.needGem || currObj.limit || currObj.killPool || currObj.alnRank)
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
	//获取元宝商店限购物品次数
	public getShopBuyLimitnum(id):number{
		let info : any = this.ainfo;
		let buyNum = 0;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	//获取积分兑换物品次数
	public getPointChangeLimitnum(id):number{
		let info : any = this.binfo;
		let buyNum = 0;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}


    public getActPoints():number{
        return this.shopscore;
    }

    /**
	 * 剩余探索数
	 * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
	*/
    public getTanSuoNum():{killAll : boolean, num ? : number, time ? : number}{
        let obj : any = {};
		let lasttime = this.search.lasttime;
		let timecost = this.cfg.renewTime[Math.min(Api.playerVoApi.getPlayerLevel(), this.cfg.renewTime.length) - 1];
        let base = this.search.v;
        let num = Math.min(base + Math.floor((GameData.serverTime - lasttime) / timecost), this.cfg.initialExplore);
        let killAll = this.getIsKillAll();
        obj['killAll'] = killAll;
        if(num > 0){
            obj['num'] = num;
        }
        else{
            obj['time'] = lasttime + timecost - GameData.serverTime;
        }
        return obj;
    }

    /**
	 * 鳌拜活动 宝箱钥匙
	*/
	public getTombBoxKeyNum(boxId : number):number{
		let itemid = this.cfg.getBossNpcItemCfgById(boxId).needKey;
		return Api.itemVoApi.getItemNumInfoVoById(itemid);
	}
	
	/**
	 */
	 public getTombMaxHp(id : number):number{
		 if(this.bossMaxHp && this.bossMaxHp[id]){
			return this.bossMaxHp[id];
		 }
		 else{
			let cfg = this.cfg.getBossNpcItemCfgById(id);
			return cfg.bossHP;
		 }
		 
	}
	public getAllianceInfoNum():number{
        let count = 0;
        if(this._enermy && this._enermy.length){
            count = this._enermy.length;
        }
        return count;
    }
    /**
     * 个人排名
     */
    public getMyPrank():number{
        let rank = 0;
        if(this._rankInfo.myrank && this._rankInfo.myrank.myrank){
            rank = this._rankInfo.myrank.myrank;
        }
        return rank;
    }
    /**
     * 本服排名
     */
    public getMyAllPrank():number{
        let rank = 0;
        if(this._rankInfo.allimyrank && this._rankInfo.allimyrank.myrank){
            rank = this._rankInfo.allimyrank.myrank;
        }
        return rank;
    }
    /**
     * 本服积分
     */
    public getMyAScore():number{
        let value = 0;
        if(this._rankInfo.allimyrank && this._rankInfo.allimyrank.value){
            value = this._rankInfo.allimyrank.value;
        }
        return value;
    }
    /**
     * 个人积分
     */
    public getMyPScore():number{
        let value = 0;
        if(this._rankInfo.myrank && this._rankInfo.myrank.value){
            value = this._rankInfo.myrank.value;
        }
        return value;
    }
    /**
     * 个人积分
     */
    public getMyAlliMemPrank():number{
        let rank = 0;
        if(this._rankInfo.allirank && this._rankInfo.allirank.myrank){
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    }
    /**
     * 总格子层数
     */
    public getFloorNum():any{
		return this.cfg.totRows + 1;
    }
    /**
     * 格子数据
     */
    public getFloorData(index : number = 0):any[]{
        let arr = [];
        let self = this;
        let floorNum = self.getFloorNum();//index + 30
        for(let i = index; i < floorNum; ++ i){
            arr.push({
                id : i,
            });
        }
		return arr;
    }

    public getBoxDataByFloor(floor : number):{floor : number, id : number}[]{
        let arr = [];
        for(let i = 0; i < 6; ++ i){
            arr.push({
                floor : floor,//当前层数,
                id : (floor - 1) * 6 + 1 + i 
            });
        }
		return arr;
    }

    //对应格子数据 
    // alive: 1 bossId: 100020098 foe: 2 refresh: 1553616000 rewards: ""
    public getBoxDataById(id : number):{alive : number, bossId : number, foe : number, refresh : number, rewards : ""}{
        if(id == 0){
            let num = this.getTombBlood(7,1);
            return {
                alive : num === 0 ? 0 : 1,
                bossId : 1,
                foe : 7,
                rewards : '',
                refresh : 1
            }
        }
        else{
            if(this.map[id - 1]){
                return this.map[id - 1];
            }
            else{
                return null;
            }
        }
    }
    //1未挖掘 2已挖掘 3空盒子
    public getBoxStatusById(boxId : number):number{
        let status = 1;
        let data = this.getBoxDataById(boxId);
        if(data && Object.keys(data).length){
            let cfg = this.cfg.getBossNpcItemCfgById(data.foe);
            if(cfg){
                status = 2;
            }
            else{
                status = 3;
            }
        }
        return status;//App.MathUtil.getRandom(1,4);
    }

    public getBoxRewardById(boxId : number):boolean{
        let flag = false;
        let data = this.getBoxDataById(boxId);
        if(data && data.alive == 0){
            flag = true;
        }
        return flag;
    }

    public getMyAlliMemScore():number{
        let value = 0;
        if(this._rankInfo.allirank && this._rankInfo.allirank.myrank){
            value = this._rankInfo.allirank.myrank.value;
        }
        return value;
    }

    public setClickIdx(type : string ,index : number):void{
        this._clickIdx = index;
        this._clickType = type;
    }

    public getClickIdx():number{
        return this._clickIdx;
    }

    public getClickType():string{
        return this._clickType;
    }

    public getIsKillAll():boolean{
        let flag = false;
		return flag;
    }

	public getTombKiller(type : number, key : number):string{
        let str = '';
        if(this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.name){
            str = this._bossInfo[type][key].killer.name
        }
		return str;
    }

    public getTombKillerRewards(type : number, key : number):string{
        let str = '';
        if(this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer &&  this._bossInfo[type][key].killer.rewards){
            str = this._bossInfo[type][key].killer.rewards;
        }
		return str;
    }

    public getTombKillUid(type : number, key : number):number{
        let uid = 0;
        if(this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.uid){
            uid = this._bossInfo[type][key].killer.uid;
        }
		return uid;
    }

    public getTombKillZid(type : number, key : number):number{
        let zid = 0;
        if(this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].killer && this._bossInfo[type][key].killer.zid){
            zid = this._bossInfo[type][key].killer.zid;
        }
		return zid;
    }

    public getTombKillNum(type : number, key : number):number{
        let num = 0;
        if(this._bossInfo && this._bossInfo[type] && this._bossInfo[type][key] && this._bossInfo[type][key].joinnum){
            num = this._bossInfo[type][key].joinnum;
        }
		return num;
    }
    
    //获取当前已杀怪物的数量
    public getCurKillNum():number{
        let num = this._curKillNum;
		return num;
    }

    /**
	 * 获取排名信息
	*/
    public getWipeInfo():any[]{
        let arr = [];
        if(this._rankInfo && this._rankInfo.rankList){
            arr = this._rankInfo.rankList;
        }
        return arr;
    }

    /**
	 * 获取对应怪物的击杀信息
	*/
    public getWipeDamageInfo(foeId : number, bosskey : number):any[]{
        let obj = [];
        if(this._bossInfo && this._bossInfo[foeId]){
            let unit = this._bossInfo[foeId][bosskey];
            if(unit && unit.damagelog){
                for(let i in unit.damagelog){
                    obj.push({
                        name : unit.damagelog[i].name, 
                        score : unit.damagelog[i].damage,
                        uid : unit.damagelog[i].uid,
                    });
                }
                obj.sort((a,b)=>{
                    return b.score - a.score;
                });
            }
        }
        return obj;
    }


    /**
	 * 获取帮会敌情信息
	 * 1未击杀 2已击杀
    */
    public setEnermyInfo(info : any):void{
        this._enermy = [];
        if(info.enemy){
            this._enermy = info.enemy;
        }
        
        this._killed = [];
        if(info.killed){
            this._killed = info.killed;
        }
        if(info.bossMaxHpArr){
            for(let i in info.bossMaxHpArr){
                this.bossMaxHp[Number(i) + 1] = Number(info.bossMaxHpArr[i]);
            }
        }
    }

    public getWipeBossAllianceInfo(type : number):any[]{
        let arr = [];
        if(type == 1){
            for(let i in this._enermy){
                let unit = this._enermy[i];
                if(unit.findname){
                    arr.push({
                        findname : unit.findname,
                        curBlood : unit.bosshp,
                        type : type,
                        bosstype : unit.foe,
                        bosskey : unit.id,
                        x : unit.x,
                        y : unit.y,
                        id : (Number(unit.x) - 1) * 6 + Number(unit.y)
                    });
                }
            }
            
        }
        else{
            for(let i in this._killed){
                let unit = this._killed[i];
                if(unit.findname && unit.killer.name && unit.killer.rewards){
                    arr.push({
                        findname : unit.findname,
                        killername : unit.killer.name,
                        type : type,
                        bosstype : unit.foe,
                        bosskey : unit.id,
                        rewardsidx : unit.killer.rewards
                    });
                }
            }
        }
        return arr;
    }
    /**
	 * 总boss信息 1未开启 2已发现
    */
    public getFinalbossStatusById():number{
        let flag = 1;
        if(this.getOpenEndlessBoss()){
            flag = 2;
        }
        else{
            flag = this.getCurKillNum() < this.cfg.needKillNum ? 1 : 2;
        }
        return flag;
    }

    /**
	 * 鳌拜活动 击杀信息
    */
    public setKillLog(info):void{
        this._killLog = [];
        this._killLog = info;
        this._killLog.sort((a,b)=>{
            return b.ts - a.ts;
        });
    }

	public getShowFightInfo(index : number):any{
        let msg = null;
        if(this._killLog.length){
            let unit = this._killLog[index];
            if(unit){
                msg = {
                    name : unit.name,
                    reward : unit.rewards,
                    servantId : unit.servantId,
                    bossId : unit.bosstype
                }
            }
        }
        return msg;
    }
    /**
	 * 获取血量信息
	 *
    */
    public setBossInfo(info : any, append : boolean = false):void{
        if(!this._bossInfo[info.bosstype]){
            this._bossInfo[info.bosstype] = {};
        }
        if(!this._bossInfo[info.bosstype][info.bosskey]){
            this._bossInfo[info.bosstype][info.bosskey] = {};
        }
        this._bossInfo[info.bosstype][info.bosskey].bosshp =  Number(info.bosshp);
        if(append){
            for(let i in info.damagelog){
                this._bossInfo[info.bosstype][info.bosskey].damagelog.push(info.damagelog[i]);
            }
        }
        else{
            this._bossInfo[info.bosstype][info.bosskey].damagelog = [];
            if(info.damagelog && info.damagelog.length){
                this._bossInfo[info.bosstype][info.bosskey].damagelog = info.damagelog;
            }
        }
        if(info.killer){
            this._bossInfo[info.bosstype][info.bosskey].killer = info.killer;
        }
        if(info.killnum){
            this._curKillNum = info.killnum;
        }
        if(info.joinnum){
            this._bossInfo[info.bosstype][info.bosskey].joinnum = info.joinnum;
        }
        if(info.bossNum){
            this._bossNumInfo = info.bossNum;
        }
        if(typeof info.bossMaxHp != `undefined`){
            this.bossMaxHp[info.bosstype] = info.bossMaxHp;
        }
    }

    public getTombBlood(type : number, key : number):number{
        if(this._bossInfo[type] && this._bossInfo[type][key]){
            return this._bossInfo[type][key].bosshp;
        }
		return NaN;
    }

    /**
	 * 获取排行信息
	 *
    */
    public setRankInfo(info : any):void{
        this._rankInfo.rankList = info.rankList;
        this._rankInfo.myrank = info.myrank;
        this._rankInfo.allirankList = info.allirankList;
        this._rankInfo.allimyrank = info.allimyrank;
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

	/**
	 * 获取参加区服
	 *
    */
	public getCrossServer():string{
		let serveStr = '';
        let map = [];
        let isFk = PlatformManager.checkIsFkylcSp();
		for(let i in this.zidarr){
            let zidname = isFk ?  Api.mergeServerVoApi.getSeverName(Number(this.zidarr[i])) : Api.mergeServerVoApi.getAfterMergeSeverName(null,true, Number(this.zidarr[i]));
			if(map.indexOf(zidname) == -1){
				map.push(zidname);
				serveStr += (zidname + ('、'))
			}
		}
		serveStr = serveStr.substring(0,serveStr.length - 1);
		return serveStr;
    }

    public setZidInfo(data):void{
        this.zidarr = [];
        this.zidarr = data;
    }
    /**
	 * 参加资格
	 *
    */
	public getAttendQUality():boolean{
        let flag = false;
        if(this.info && this.info.iscanjoin){
            flag = true;
        }
		return flag;
    }

    /**
	 * 是否开启不死天官
	 *
    */
	public getOpenEndlessBoss():boolean{
        let flag = false;
        if(this.getAttendQUality() && Api.switchVoApi.checkOpenTombEndLess() && this.getLastBossNum() <= 0){
            flag = true;
        }
		return flag;
    }

    public setMapInfo(data):void{
        //data {0 : [{}]
        for(let i in data){
            let index = Number(i);
            let indexArr = data[i];
            for(let j in indexArr){
                let floorNum = index * 10 + Number(j);
                let floor = indexArr[j];
                for(let k in floor){
                    let box = floor[k];//
                    let boxId = floorNum * 6 + Number(k);
                    if(!this.map[boxId]){
                        this.map[boxId] = {};
                    }
                    this.map[boxId] = box;
                }
            }
        }
    }

    public clearMapInfo():void{
        this.map = [];
    }
    /**
     * 根据id转化为index,x,y
     */
    public getParamMap(id : number):{index : number, x : number, y : number}{
        let floor = Math.ceil(id / 6);
        let index = Math.floor((floor - 1) / 10);
        let obj = {
            index : id == 0 ? 0 : index,
            x : id == 0 ? 0 : (floor - index * 10),
            y : id == 0 ? 0 : (id - (floor - 1) * 6),
        }
        return obj;
    }

    public getBossNumInfo():any{
		return this._bossNumInfo;
    }

    public getLastBossNum() : number{
        let num = 0;
        if(this._bossNumInfo && this._bossNumInfo[0]){
            num = this._bossNumInfo[0];
        }
        return Number(num);
    }

    public getLastBoxNum() : number{
        let num = 0;
        if(this._bossNumInfo && this._bossNumInfo[1]){
            num = this._bossNumInfo[1];
        }
        return num;
    }
}