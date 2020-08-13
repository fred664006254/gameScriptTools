class AcWipeBossVo extends AcBaseVo
{
	private ainfo : any = null;// 活动商铺各项购买数量
	private binfo : any = null;//积分商城各项购买数量
	private cinfo : any = null;//出战过的门客状态 servantId = nil 未出战，1已出战，0使用了出战令，2使用出战令后再次已出战
	private buysearch : number = 0;//元宝购买探索的次数
	private search : any = null;//剩余探索次数和上次更新探索次数的时间
	private shopscore : number = 0;//商店积分
	private bossMaxHp : any = {};
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
		this.bossMaxHp = data.bossMaxHp;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_WIPEBOSS_REFRESH);
	}

	public dispose():void{
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.buysearch = 0;
		this.search = null;
		this.shopscore = 0; 
		this.bossMaxHp = null;
		super.dispose();
	}

	public getServantFightInfo(servantId):number{
		let v:number = this.cinfo[servantId];
		if (v == null) {
			v = 0;
		}
		return v;
	}

	public get cfg() : Config.AcCfg.WipeBossCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getpublicRedhot1():boolean
	{
		let flag = false;
		//有探索次数
		if(this.isInTansuoTime() && this.isInFightTime() && this.search.v > 0)
		{
			flag = true;
		}
		return flag;
	}

	public getpublicRedhot2():boolean{
		let flag = false;
		//有可积分兑换的
		if(this.isInActivity() && this.getActPoints() > 0){
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
		for(let i = 1; i < 3; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 


    /**
	 * 鳌拜活动 今日加成
	*/
	public getMyAdd():number{
        let effect = this.cfg.actMarket[0].effect;
        let num = this.ainfo[1] || 0;
        return num * 100 * effect;
    }

	
	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getCountDownTime():number{
		let et = this.et - 86400;
		return et - GameData.serverTime;
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public isInTansuoTime():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	}


	public isInFightTime():boolean{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let flag = false;
		if(GameData.serverTime >= (today0 + cfg.actTime[0] * 3600) && GameData.serverTime < (today0 + cfg.actTime[1] * 3600)){
			flag = true;
		}
		return flag;
	}

	public getNextOpenTime():number{
		let cfg = this.cfg;
		let today0 = App.DateUtil.getWeeTs(GameData.serverTime);
		let time = 0;
		if(GameData.serverTime < (today0 + cfg.actTime[0] * 3600)){
			time = today0 + cfg.actTime[0] * 3600 - GameData.serverTime;
		}
		else{
			time = today0 + cfg.actTime[0] * 3600 + 3600 * 24 - GameData.serverTime;
		}
		return time;
	}

	public getArr(key):Array<any>{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.WipeBossCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
    public getTanSuoNum():any{
        let obj : any = {};
		let lasttime = this.search.lasttime;
		let timecost = this.cfg.renewTime[Api.playerVoApi.getPlayerLevel() - this.cfg.needLv];
		let num = Math.min(this.search.v + Math.floor((GameData.serverTime - lasttime) / timecost), this.cfg.initialExplore);
        let killAll = Api.wipeBossVoApi.getIsKillAll();
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
	public getWipeBossBoxKeyNum(boxId : number):number{
		let itemid = this.cfg.getBossNpcItemCfgById(boxId).needKey;
		return Api.itemVoApi.getItemNumInfoVoById(itemid);
	}
	
	/**
	 */
	 public getWipeBossMaxHp(id : number):number{
		 if(this.bossMaxHp){
			return this.bossMaxHp[id];
		 }
		 else{
			let cfg = this.cfg.getBossNpcItemCfgById(id);
			return cfg.bossHP;
		 }
		 
	 } 

}