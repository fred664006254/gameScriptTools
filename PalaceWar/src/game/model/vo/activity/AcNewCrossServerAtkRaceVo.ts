class AcNewCrossServerAtkRaceVo extends AcBaseVo
{
    public info:any = null;
	private sids:string[] = [];
	private fameSeatCfg:any[] = [];
	public presNum:number;//挑战次数
	public extraPresNum:number;//购买次数

	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		for(let key in data)
		{
			this[key]=data[key];
		}
	}

	public getSids():string[]
	{
		let sids = [];
		if (this.sids && this.sids.length>0)
		{
			sids = [];
			for (let i = 0;i<this.sids.length; i++)
			{
				sids.push(this.sids[i]);
			}

			sids.sort((a,b)=>{
				let servantA = Api.servantVoApi.getServantObj(a);
				let servantB = Api.servantVoApi.getServantObj(b);
				let bookAv =servantA.getAllBookValue() ;
				let bookBv =servantB.getAllBookValue() ; 

				if (bookAv == bookBv) {
					return Number(b) - Number(a);
				} 
				else {
					if (bookBv == bookAv) {
						return Number(b) - Number(a);
					}
					return bookBv - bookAv;
				}
			});
		}
		return sids;
	}

	public getBuffBookValueCount(bv:number):number
	{	
		let v = 0;
		let allSids = Api.servantVoApi.getServantInfoIdListWithSort(0);
		for (let i = 0; i<allSids.length; i++)
		{
			let oneid = allSids[i];
			if (GameData.isInArray(oneid,this.sids) == false)
			{
				let servantObj = Api.servantVoApi.getServantObj(oneid);
				if (servantObj.getTotalBookValue() >= bv)
				{
					v++;
				}
			}
		}
		return v;
	}
	
    public get acTimeAndHour():string
	{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getPreward()
	{
		return this["info"]["preward"];
	}
	public getZonereward()
	{
		return this["info"]["zonereward"];
	}

    public get isShowRedDot():boolean{
		let flag = false;
		if((GameData.serverTime >= (this.et - 86400)) && GameData.serverTime < this.et && !this.getZonereward()  || this.dispatchServantRed() || this.checkFameRed()){
			flag = true;
		}
		if (this.isInActivity() && Api.atkracecrossVoApi.checkNpcMessage())
		{
			flag = true;
		}
		
		return flag;
	}

	public getZoneRewardRed():boolean{
		if((GameData.serverTime >= (this.et - 86400)) && GameData.serverTime < this.et && !this.getZonereward()){
			return true;
		}
		return false;
	}

	public dispatchServantRed():boolean
	{
		let b = false;
		if (Api.servantVoApi.getServantCount()>=30 && this.info && this.info.iscanjoin && (this.st+7200 > GameData.serverTime))
		{
			let localkey = "AcNewCrossServerAtkRaceVo"+this.et+Api.playerVoApi.getPlayerID();
			let value = LocalStorageManager.get(localkey);
			if (!value || value == "")
			{
				b = true;
			}
		}
		return b;
	}

	public setDispatchServantRed():void
	{
		let localkey = "AcNewCrossServerAtkRaceVo"+this.et+Api.playerVoApi.getPlayerID();
		LocalStorageManager.set(localkey,"1");
	}

	public isInActivity():boolean{
		let et = this.et;
        if (this.cfg.extraTime){
            et = this.et - this.cfg.extraTime * 86400;
        }
		return GameData.serverTime >= this.st + 7200 && GameData.serverTime < et;
	}

	//江湖声望相关*****************************
	//跨服数量
	public getCrossServerNum():number{
		if (this.zids ){
			return this.zids;
		}
        return 1;
	}

	//席位配置
	public getFameSeatCfg():any[]{
		if (this.fameSeatCfg.length > 0){
            return this.fameSeatCfg;
        }
        let baseData = this.cfg.getFameSeatList();
        console.log("getFameSeatCfg ", baseData);
		let lineNum = 1;
		// let seatCount = 0;
        for (let i=0; i < baseData.length; i++){
			baseData[i].seatNumber += (this.getCrossServerNum() - 1) * baseData[i].addSeat;
            let baseCfg = baseData[i];
			let rowNum = Math.ceil(baseCfg.seatNumber/baseCfg.perMaxSeat);
			let seatCount = 0;
            for (let k=0; k < rowNum; k++){
                let isFirst = false;
                let isLast = false;
                let seatNum = baseCfg.perMaxSeat;
                if (k == rowNum - 1 && baseCfg.seatNumber%baseCfg.perMaxSeat >0){
                    seatNum = baseCfg.seatNumber%baseCfg.perMaxSeat;
                }
                if (k == 0){
                    isFirst = true;
                }
                if (k == rowNum - 1){
                    isLast = true;
				}
				
                let seatIndex = k * baseCfg.perMaxSeat;
                let cfg = {lineNum: lineNum, seatNum:seatNum, baseCfg: baseCfg, isFirst: isFirst, seatIndex: seatIndex, isLast:isLast, seatCount: seatCount};
				lineNum += 1;
				seatCount += seatNum;
                this.fameSeatCfg.push(cfg);
            }
        }
        console.log("getFameSeatCfg ", this.fameSeatCfg);
        return this.fameSeatCfg;
	}

	public getFameCfgByLine(line:number):any{
        let data = this.getFameSeatCfg();
        if (data && data[line-1]){
            return data[line-1];
        }
        return null;
    }

	//已挑战次数
	public getFameFightNum():number{
		if (this.presNum){
			return this.presNum;
		}
		return 0;
	}

	//已购买次数
	public getFameBuyNum():number{
		if (this.extraPresNum){
			return this.extraPresNum;
		}
		return 0;
	}

	//每日免费次数
	public getFameMaxNum():number{
		return this.cfg.freePres;
	}

	//可用次数
	public getFameCanUseNum():number{
		let canUseNum = this.getFameMaxNum() + this.getFameBuyNum() - this.getFameFightNum();
		if (canUseNum > 0){
			return canUseNum;
		}
		return 0;
	}

	//超过剩余次数 需要消耗元宝
	public getFameFightCost():number{
		let costList = this.cfg.presCost;
		let num = this.getFameBuyNum();
		if (num >= costList.length){
			return costList[costList.length - 1];
		}
		return costList[num];
	}

	//当前名望头衔
    public getCurrFameTitleInfo():any{
		let fameInfo = Api.atkracecrossVoApi.getMyFameSeatInfo();
        if (fameInfo && fameInfo.attackst){  
			if (fameInfo.fuid){
				return null;
			}
            return {x: fameInfo.x, y: fameInfo.y};
        }
        return null;
	}
	
	//江湖名望红点
	public checkFameRed():boolean{
		if (this.isInActivity() && Api.servantVoApi.getServantCount()>=30 && this.info && this.info.iscanjoin){
			if (Api.atkracecrossVoApi.getMyInfo() && !this.getCurrFameTitleInfo()){
				return true;
			}
		}
		return false;
	}

	public get cfg():Config.AcCfg.NewCrossServerAtkRaceCfg
	{	
		let cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return cfg;
	}

	public dispose():void
	{
		this.info = null;
		this.sids.length = 0;
		this.fameSeatCfg = [];
		super.dispose();
	}
}