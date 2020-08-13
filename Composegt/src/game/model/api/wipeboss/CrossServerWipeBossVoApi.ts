class CrossServerWipeBossVoApi extends BaseVoApi
{
    private _wipeBossVo : AcCrossServerWipeBossVo;
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
	public getRankFirstPlayer():any{
		if(this._rankInfo.rankList && this._rankInfo.rankList.length > 0){
            
            
            return this._rankInfo.rankList[0];
		}
        return null;
	}
    public getMyServerName():string{
    
        // if(this._rankInfo.serverrank.myrank){
        //     let obj = this._rankInfo.serverrank.myrank;
           
        //     if(obj.qu > 0){
        //         name = LanguageManager.getlocal("mergeServer",[String(obj.qu),String(obj.zid)]);
        //     } else {
        //         // "ranserver2":"{1}服",
        //         name = LanguageManager.getlocal("ranserver2",[String(obj.zid)]);
        //     }
           
        // }

        let serverText = null;
        let zid = Api.mergeServerVoApi.getTrueZid();
        let qu = Api.mergeServerVoApi.getQuByZid(zid);
        if(qu > 0){
            serverText = LanguageManager.getlocal("mergeServer",[String(qu),String(zid)]);
        } else {
            
            serverText = LanguageManager.getlocal("ranserver2",[String(zid)]);
        }

        return serverText;

    }
    //我的名字  带区服
    public getMyRankName():string{
        let name = Api.playerVoApi.getPlayerName();

        let serverText = null;
        let zid = Api.mergeServerVoApi.getTrueZid();
        let qu = Api.mergeServerVoApi.getQuByZid(zid);
        if(qu > 0){
            serverText = LanguageManager.getlocal("mergeServer",[String(qu),String(zid)]);
        } else {
            
            serverText = LanguageManager.getlocal("ranserver2",[String(zid)]);
        }
        name = name + "("+serverText+")";
        
        return name;
    }
    //我在所有个人的排行
    public getMyRank():number{
        let rank = 0;
        if(this._rankInfo.myrank){
            rank = this._rankInfo.myrank;
        }
        return rank;
    }
    //我在我所在区服排行
    public getMyRankInServer():number{
        let rank = 0;
        if(this._rankInfo.serverrank.myrank){
            rank = this._rankInfo.serverrank.myrank.myrank;
        }
        return rank;
    }
    public getPkzidsStr():string{
		let reStr = "";
		let zidObj = null;
		for(let i =0;i< this._rankInfo.pkzids.length;i++){
			zidObj = this._rankInfo.pkzids[i];
			if(zidObj.qu){
				reStr += LanguageManager.getlocal("mergeServerOnlyqu",[String(zidObj.qu)]);
                // reStr += LanguageManager.getlocal("mergeServer",[String(zidObj.qu),String(zidObj.zid)]);;
			} else {
				reStr += LanguageManager.getlocal("ranserver2",[String(zidObj.zid)]);
			}
			
			if(i != this._rankInfo.pkzids.length-1){
				reStr += "，";
			}
		}
		return reStr;
	}
    public getPkzidNum():number{
        return this._rankInfo.pkzids.length;
    }
    //得到区服排名第一名的服务器名称
    public getFirstServerName():string{
        let serverText = "";
        let serverrankList = this._rankInfo.serverrankList;
        if(serverrankList.length > 0){
            let first = serverrankList[0];
            if(first[1] > 0){
                // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                serverText = LanguageManager.getlocal("mergeServerOnlyqu",[String(first[1])]);
            } else {
               
                serverText = LanguageManager.getlocal("ranserver2",[String(first[0])]);
            }
        }
        return serverText;
        

    }

    //区服排名
    public getMyServerRank():number{
        let rank = 0;

        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;

        let myZid = Api.mergeServerVoApi.getTrueZid();
        let myQu = Api.mergeServerVoApi.getQuByZid(myZid);

        let serverrankList = this._rankInfo.serverrankList;
        let listObj = null;
        for(let i = 0;i < serverrankList.length; i ++){
            listObj = serverrankList[i];
            if(listObj[0] == myZid && listObj[1] == myQu){
                rank = i + 1;
                break;
            }
        }


        return rank;
    }
    //区服分数
    public getMyServerScore():number{
        let score = 0;

        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;


        let myZid = Api.mergeServerVoApi.getTrueZid();
        let myQu = Api.mergeServerVoApi.getQuByZid(myZid);

        let serverrankList = this._rankInfo.serverrankList;
        let listObj = null;
        for(let i = 0;i < serverrankList.length; i ++){
            listObj = serverrankList[i];
            if(listObj[0] == myZid && listObj[1] == myQu){
                score = listObj[2];
                break;
            }
        }
        return score;
    }

    public getMyScore():number{
        let value = 0;
        if(this._rankInfo.serverrank.myrank.score){
            value = this._rankInfo.serverrank.myrank.score;
        }
        return value;
    }

    public getMyAlliMemPrank():number{
        let rank = 0;
        if(this._rankInfo.serverrank.myrank){
            rank = this._rankInfo.serverrank.myrank.myrank;
        }
        return rank;
    }

    public getMyAlliMemScore():number{
        let value = 0;
        if(this._rankInfo.serverrank.myrank){
            value = this._rankInfo.serverrank.myrank.value;
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

    public get cfg() : Config.AcCfg.CrossServerWipeBossCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_CROSSSERVERWIPEBOSS, '1');
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
        // this._rankInfo.rankList = info.rankList;
        // this._rankInfo.myrank = info.myrank;
        // this._rankInfo.allirankList = info.allirankList;
        // this._rankInfo.allimyrank = info.allimyrank;
        // this._rankInfo.allirank = info.allirank;
        this._rankInfo = info;
    }

    public getRankInfo():any{
		return this._rankInfo;
    }

    public getMyServerInfo():any{
        let tmp = [];
        if(this._rankInfo.serverrank && this._rankInfo.serverrank.rankList){
            tmp = this._rankInfo.serverrank.rankList;
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