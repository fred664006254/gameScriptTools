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
	public test = false;

	public constructor() 
	{
		super();
	}

	public get isShowRedDot():boolean
	{
		if(this.judgeTimeProcess() < 2 || this.judgeTimeProcess() == 4){
			return false;
		}
		//可领取奖励 可领取奖励、有可以出战的时候
		if(this.canLqAaward() || (this.isCanJoin && this.checkCanCDSearch() && this.checkHaveSearchCount() && this.judgeTimeProcess() == 2)){
			return true;
		}
		//无数据时候依据红点model
		if((!this.wifebattlecross || !this.wifebattlecross.info || !this.wifebattlecross.info.lasttime) && this.isCanJoin && Api.redpointVoApi.checkHaveRedPointByAid(this.aid, `canSearch`) && this.judgeTimeProcess() == 2){
			return true;
		}
		//cd到了、可出战
		//canSearch
		return false;
	}

	public canLqAaward():boolean{
		return this.judgeTimeProcess() == 3 && !this.isGettZonereward();
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
		let flag = false;
		if(this.rankData && this.rankData.zrank == 1){
			flag = true;
		}
		return flag;
	}

	public getRankServerRank():number{
		let num = 0;
		if(this.rankData && this.rankData.zrank){
			num = this.rankData.zrank
		}
		return num;
	}

	public getRankServerScore():number{
		let num = 0;
		if(this.rankData && this.rankData.zpoint){
			num = this.rankData.zpoint;
		}
		return num;
	}

	public getRankMyName():string{

		return Api.playerVoApi.getPlayerName();
	}
	public getRankMyRank():number{
		let num = 0;
		if(this.rankData && this.rankData.merank){
			num = this.rankData.merank;
		}
		return num;
	}
	public getRankMyServer():string{
		return Api.mergeServerVoApi.getRankServerName();
	}
	public getRankMyScore():number{
		let num = 0;
		if(this.rankData && this.rankData.mepoint){
			num = this.rankData.mepoint;
		}
		return num;
	}
	public setActInfo(actInfo:any):void{
		// this.actInfo = actInfo;
		this.pkzids = actInfo.pkzids;
		this.buff = actInfo.buff;
		this.wifebattlecross = actInfo.wifebattlecross;
	}
	public getPkzidNum():number{
		if(this.test){
			return 3;
		}
		else{
			return this.pkzids.length;
		}
       
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
	// public setInfo(info:any):void{
	// 	this.info = info;
	// }
	//检测当前红颜是否需要弹出搜寻框
	public isShowWifeSearch():boolean
	{
		if(this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.handle == 0){
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
		if(this.wifebattlecross && this.wifebattlecross.ainfo && this.wifebattlecross.ainfo.uid){
			return true;
		} else {
			return false;
		}
	}
	//检测是否到时间可以搜索
	public checkCanCDSearch():boolean
	{
		if(this.wifebattlecross && this.wifebattlecross.info && typeof this.wifebattlecross.info.lasttime != `undefined`){
			if(GameData.serverTime - this.wifebattlecross.info.lasttime > Config.WifebattleCfg.intervalTime){
				return true;
			}
		}
		return false;
	}
	//CD显示
	public getCDStr():string
	{
		if(this.wifebattlecross && this.wifebattlecross.info && this.wifebattlecross.info.num >= Config.WifebattleCfg.dailyNum){
			//今日次数用完
			return LanguageManager.getlocal("wifeBattleSearchDesc2");
		} else {
			if(!this.checkCanCDSearch())
			{
				if(this.test){
					return ``;
				}
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
		if(this.wifebattlecross && this.wifebattlecross.info && this.wifebattlecross.info.num < Config.WifebattleCfg.dailyNum){
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
		if(this.test){
			return `1,2`;
		}
		let zidObj = null;
		let zid = [];
		let qu = [];
		for(let i =0;i< this.pkzids.length;i++){
			zidObj = this.pkzids[i];
			if(zidObj.qu){
				qu.push(Number(zidObj.qu));
			} else {
				zid.push(Number(zidObj.zid));
			}
		}
		return App.StringUtil.formatMultiServerServerAndZid(qu,zid);
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
		let serverrankList = [];
		if(this.rankData && this.rankData.zidrankarr){
			serverrankList = this.rankData.zidrankarr;
		}
		//[];//]//this._rankInfo.serverrankList;
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
		if(this.test){
			return Number(zid);
		}
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

		let serverrankList = [];
		if(this.rankData && this.rankData.zidrankarr){
			serverrankList = this.rankData.zidrankarr;
		}

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
        if(this.rankData && this.rankData.merank){
            rank = this.rankData.merank;
        }
        return rank;
    }
	public getRankFirstPlayer():any{
		if(this.rankData && this.rankData.rankarr && this.rankData.rankarr.length > 0){
            
            
            return this.rankData.rankarr[0];
		}
        return null;
	}
    //是否有资格参加
    public get isCanJoin():boolean
    {
        return this.test ? true : (this.info && this.info.iscanjoin >= 1);
	}
	
	public getZidrankarr():any[]{
		let rankList = [];
		if(this.test){
			for(let i = 1; i <= 5; ++ i){
				rankList.push({
					zid : i,
					point : i * 100
				});
			}
		}
		if(this.rankData && this.rankData.zidrankarr){
			rankList = this.rankData.zidrankarr;
		}
		return rankList;
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