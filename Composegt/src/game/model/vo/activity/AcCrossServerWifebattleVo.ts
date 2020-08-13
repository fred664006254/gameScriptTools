class AcCrossServerWifeBattleVo extends AcBaseVo
{	

    
    // info.iscanjoin"] = "跨服群芳会活动 活动资格标识(大于等于1时代表有资格)",
	public actInfo : any = null;
	public info:any = null;
	// public ainfo:any = null;
    public wifebattlecross:any = null;
	public pkzids: any = null;
	public rankData:any = null;
	private _rankInfo : any = {};
	public buff = 1;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		console.log("AcCrossServerWifeBattleVo",data);
		for(let key in data)
		{
			this[key]=data[key];
		}
	}
    //获取区域排名
	public isGettZonereward() : boolean
	{
		return this.info ? this.info.zonereward == 1 : false;
	}
	public setRankData(rankData):void{
		// console.log("rankdata--->",rankData);
		this.rankData =  rankData;
	}
	//是否是第一名
	public isServerRankFirst():boolean {
		return this.rankData.zrank == 1;
	}
	public getRankServerName():string{
        let server = "";
		let zid = Api.mergeServerVoApi.getTrueZid();
        let qu = Api.mergeServerVoApi.getQuByZid(zid);
        if(qu > 0){
            // server = LanguageManager.getlocal("mergeServer",[String(data[1]),String(data[0])]);
            server = LanguageManager.getlocal("mergeServerOnlyqu",[String(qu)]);
        } else {
            // "ranserver2":"{1}服",
            server = LanguageManager.getlocal("ranserver2",[String(zid)]);
        }
		return server;
	}
	public getRankServerRank():number{

		return this.rankData.zrank;
	}

	public getRankServerScore():number{

		return this.rankData.zpoint;
	}

	public getRankMyName():string{

		return Api.playerVoApi.getPlayerName();
	}
	public getRankMyRank():number{

		return this.rankData.merank;
	}
	public getRankMyServer():string{

		return this.getRankServerName();
	}
	public getRankMyScore():number{

		return this.rankData.mepoint;
	}
	public setActInfo(actInfo:any):void{
		// this.actInfo = actInfo;
		this.pkzids = actInfo.pkzids;
		this.buff = actInfo.buff;
		this.wifebattlecross = actInfo.wifebattlecross;
	}
	public getPkzidNum():number{
        return this.pkzids.length;
    }
	public getPkzid():any{
		return this.pkzids
	}
	public setWifebattleInfo(wifeBattleInfo:any):void{
		this.wifebattlecross = wifeBattleInfo;
	}

	//得到对手位分最高的弹出提示信息
	public getEnemyMaxInfo():{wifeid:number,skin:number,sexflag?:number}
	{	
		if(this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.maxwifeinfo){
			if(this.wifebattlecross.ainfo.maxwifeinfo.sexflag && this.wifebattlecross.ainfo.maxwifeinfo.sexflag >= 1){
				return {wifeid:this.wifebattlecross.ainfo.maxwifeinfo.wifeid,skin:this.wifebattlecross.ainfo.maxwifeinfo.maleskin,sexflag:this.wifebattlecross.ainfo.maxwifeinfo.sexflag};

			} else {
				return {wifeid:this.wifebattlecross.ainfo.maxwifeinfo.wifeid,skin:this.wifebattlecross.ainfo.maxwifeinfo.skin};

			}


		} else {
			return null;
		}

	}	
	// public setInfo(info:any):void{
	// 	this.info = info;
	// }
	//检测当前红颜是否需要弹出搜寻框
	public isShowWifeSearch():boolean
	{
		if(this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.handle == 0){
			return true;
		} else {
			return false;
		}
	}
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}
	//检测是否已经有没攻击的敌人
	public checkHaveEnemy():boolean
	{	
		if(this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.uid){
			return true;
		} else {
			return false;
		}
	}
	//检测是否到时间可以搜索
	public checkCanCDSearch():boolean
	{
		if(GameData.serverTime - this.wifebattlecross.info.lasttime > Config.WifebattleCfg.intervalTime){
			return true;
		} else {
			return false;
		}

	}
	//CD显示
	public getCDStr():string
	{
		if(this.wifebattlecross.info.num >= Config.WifebattleCfg.dailyNum){
			//今日次数用完
			return LanguageManager.getlocal("wifeBattleSearchDesc2");
		} else {
			if(!this.checkCanCDSearch())
			{
				let time =  this.wifebattlecross.info.lasttime + Config.WifebattleCfg.intervalTime - GameData.serverTime ;
				let timeStr = App.DateUtil.getFormatBySecond(time,3);
				return LanguageManager.getlocal('wifeBattleSearchDesc',[timeStr]);
			} else {
				return "";
			}

		}

	}
	public checkHaveSearchCount():boolean
	{
		if(this.wifebattlecross.info.num < Config.WifebattleCfg.dailyNum){
			return true;
		} else {
			return false;
		}


	}

	//当前时间阶段 0即将开始  1:准备开始倒计时  2:结束倒计时   3:展示期 4:活动结束
	public judgeTimeProcess():number{
		let timeNumber:number = 3600 * 2;
		let timeNumber2:number = 3600 * 24;
		let type = 0;
		if (GameData.serverTime < this.st)
		{	
			type = 0;
		}
		else if(GameData.serverTime >= this.st &&  GameData.serverTime < (this.st + timeNumber)){
			type = 1;
		}
		else if (GameData.serverTime >= (this.st + timeNumber) && GameData.serverTime < (this.et - timeNumber2))
		{
			type = 2;
		}
		else  if((GameData.serverTime >= (this.et - timeNumber2)) && GameData.serverTime < this.et){
			type = 3;
		}
		else  if(GameData.serverTime >= this.et){
			type = 4;
		}
		return type;
	}
	public getCountTimeStr(num):string
	{	
		let time:number = num;
		if (time < 0) {
			time = 0;
		}
		return App.DateUtil.getFormatBySecond(time);
	}
	public getPkzidsStr():string{
		let reStr = "";
		let zidObj = null;
		for(let i =0;i< this.pkzids.length;i++){
			zidObj = this.pkzids[i];
			if(zidObj.qu){
				reStr += LanguageManager.getlocal("mergeServerOnlyqu",[String(zidObj.qu)]);
                // reStr += LanguageManager.getlocal("mergeServer",[String(zidObj.qu),String(zidObj.zid)]);;
			} else {
				reStr += LanguageManager.getlocal("ranserver2",[String(zidObj.zid)]);
			}
			
			if(i != this.pkzids.length-1){
				reStr += "，";
			}
		}
		return reStr;
	}

	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.CrossServerWifeBattleCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						if(currObj.rank || currObj.needGem || currObj.limit || currObj.bossScore)
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
    //得到区服排名第一名的服务器名称
    public getFirstServerName():string{
        let serverText = "";
		let serverrankList = this.rankData.zidrankarr;//[];//]//this._rankInfo.serverrankList;
        if(serverrankList.length > 0){
            let first = serverrankList[0];
            if(this.getQuByZid(first.zid) > 0){
                // serverText = LanguageManager.getlocal("mergeServer",[String(first[1]),String(first[0])]);
                serverText = LanguageManager.getlocal("mergeServerOnlyqu",[String(this.getQuByZid(first.zid))]);
            } else {
               
                serverText = LanguageManager.getlocal("ranserver2",[String(first.zid)]);
            }
        }
        return serverText;
        

    }
	public getQuByZid(zid:number|string):number{
		let zidObj = null;
		for(let i =0;i< this.pkzids.length;i++){
			zidObj = this.pkzids[i];
			if(Number(zidObj.zid) == Number(zid)){
				return zidObj.qu;
			}
		}
		return 0;
	}

    //区服排名
    public getMyServerRank():number{
        let rank = 0;

        // let myZid = this._rankInfo.serverrank.myrank.zid;
        // let myQu = this._rankInfo.serverrank.myrank.qu;

        let myZid = Api.mergeServerVoApi.getTrueZid();
        let myQu = Api.mergeServerVoApi.getQuByZid(myZid);

		let serverrankList = this.rankData.zidrankarr;//this._rankInfo.serverrankList;
        let listObj = null;
        for(let i = 0;i < serverrankList.length; i ++){
            listObj = serverrankList[i];
            if(listObj.zid == myZid){
                rank = i + 1;
                break;
            }
        }


        return rank;
    }
	public getCountDownTime():number{
		let et = this.et - 86400;
		return et - GameData.serverTime;
	}
    //我在所有个人的排行
    public getMyRank():number{
        let rank = 0;
        if(this.rankData.merank){
            rank = this.rankData.merank;
        }
        return rank;
    }
	public getRankFirstPlayer():any{
		if(this.rankData.rankarr && this.rankData.rankarr.length > 0){
            
            
            return this.rankData.rankarr[0];
		}
        return null;
	}
    //是否有资格参加
    public get isCanJoin():boolean
    {
        return this.info && this.info.iscanjoin >= 1;
    }
	
	public dispose():void
	{
		this.info = null;
		this.actInfo = null;

	// public ainfo:any = null;
    	this.wifebattlecross = null;
		this.pkzids= null;
		this.rankData = null;
		this._rankInfo  = {};
		this.buff = 1;
		super.dispose();
	}
}