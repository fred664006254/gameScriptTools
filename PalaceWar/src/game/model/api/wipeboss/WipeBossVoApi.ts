class WipeBossVoApi extends BaseVoApi
{
    private _wipeBossVo : AcWipeBossVo;
    private _clickIdx = 0;
    private _clickType = '';
    private _enermy : any = {};
    private _killed : any = {};
    private _killLog = [];
    private _bossInfo : any = {};
    private _rankInfo : any = {};
    private _bossNumInfo : any = {};
	public constructor() {
		super();
    }

	public dispose():void{
        this._wipeBossVo = null;
        this._bossInfo = {};
        this._bossNumInfo = {};
        this._clickIdx = 0;
        this._clickType = '';
        this._enermy = {};
        this._killLog = [];
        this._killed = {};
        this._rankInfo = {};
		super.dispose();
    }

    public getAllianceInfoNum():number{
        let count = 0;
        for(let i in this._enermy){
            let unit = this._enermy[i];
            count += (Object.keys(unit).length);
        }
        return count;
    }

    public getMyPrank():number{
        let rank = 0;
        if(this._rankInfo.myrank.myrank){
            rank = this._rankInfo.myrank.myrank;
        }
        return rank;
    }

    public getMyAllPrank():number{
        let rank = 0;
        if(this._rankInfo.allimyrank.myrank){
            rank = this._rankInfo.allimyrank.myrank;
        }
        return rank;
    }

    public getMyAScore():number{
        let value = 0;
        if(this._rankInfo.allimyrank.value){
            value = this._rankInfo.allimyrank.value;
        }
        return value;
    }

    public getMyPScore():number{
        let value = 0;
        if(this._rankInfo.myrank.value){
            value = this._rankInfo.myrank.value;
        }
        return value;
    }

    public getMyAlliMemPrank():number{
        let rank = 0;
        if(this._rankInfo.allirank.myrank){
            rank = this._rankInfo.allirank.myrank.myrank;
        }
        return rank;
    }

    public getMyAlliMemScore():number{
        let value = 0;
        if(this._rankInfo.allirank.myrank){
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


	/**
	 * 鳌拜活动阶段
	 * 1鳌拜未出现 2鳌拜出现未被击杀 3鳌拜出现被击杀
	*/
	public getWipePeriod():number{
        let period = 1;
        if(typeof this._bossNumInfo.finalbosshp == 'undefined'){
            period = 1;
        }
        else{
            if(this._bossNumInfo.finalbosshp > 0){
                period = 2;
            }
            else{
                period = 3;
            }
        }
		return period;
    }

    public getIsKillAll():boolean{
		return this._bossNumInfo.bossnum[0] == 0 && this._bossNumInfo.bossnum[1] == 0;
    }

	public getWipeKillPlayer():string{
		return this._bossNumInfo.finalkillname;
    }

	/**
	 * 鳌拜活动 宝物、敌人剩余数量
	*/
	public getWipeLastEnermy():number[]{
		return this._bossNumInfo.bossnum ? this._bossNumInfo.bossnum : [0,0];
    }
    
    /**
	 * 获取排名信息
	*/
    public getWipeInfo():any[]{
        return this._rankInfo.rankList;
    }

     
    /**
	 * 获取对应怪物的击杀信息
	*/
    public getWipeDamageInfo(foeId : number, bosskey : number):any[]{
        let obj = [];
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
        return obj;
    }


    /**
	 * 获取帮会敌情信息
	 * 1未击杀 2已击杀
    */
    public setEnermyInfo(info : any):void{
        this._enermy = {};
        if(info.enemy){
            this._enermy = info.enemy;
        }
        
        this._killed = {};
        if(info.killed){
            this._killed = info.killed;
        }
    }

    public getWipeBossAllianceInfo(type : number):any[]{
        let arr = [];
        if(type == 1){
            for(let i in this._enermy){
                let unit = this._enermy[i];
                for(let j in unit){
                    let tmp = unit[j];
                    arr.push({
                        findname : tmp.findname,
                        curBlood : tmp.BossHp,
                        type : type,
                        bosstype : i,
                        bosskey : j,
                    });
                }
            }
            
        }
        else{
            for(let i in this._killed){
                let unit = this._killed[i];
                for(let j in unit){
                    let tmp = unit[j];
                    arr.push({
                        findname : tmp.findname,
                        killername : tmp.killername,
                        type : type,
                        bosstype : i,
                        bosskey : j,
                        rewardsidx : tmp.rewardsidx
                    });
                }
            }
            // arr.push({
            //     findname : `玩家${i}`,
            //     npcName : `怪物${i}`,
            //     bossScore : i + 100,
            //     curBlood : 80,
            //     uid : i,
            //     type : type,
            //     killName : `霍去病${i}`,
            //     killReward : "",
            //     foeId : i + 1
            // });
        }
        return arr;
    }

    public get cfg() : Config.AcCfg.WipeBossCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_WIPEBOSS, '1');
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
    }

    public getWipeBlood(type : number, key : number):number{
        if(this._bossInfo[type] && this._bossInfo[type][key]){
            return this._bossInfo[type][key].bosshp;
        }
		return undefined;
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
	 * 获取怪物数目信息
	 *
    */
    public setBossNumInfo(info : any):void{
        this._bossNumInfo.bossnum = info.bossnum;
        if(typeof info.finalbosshp != 'undefined'){
            this._bossNumInfo.finalbosshp = info.finalbosshp;
        }
        if(typeof info.finalkillname != 'undefined'){
            this._bossNumInfo.finalkillname = info.finalkillname;
        }
    }

    public getBossNumInfo():any{
		return this._bossNumInfo;
	}
}