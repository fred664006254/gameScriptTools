class AcDoubleSeventhVo extends AcBaseVo
{
	private ainfo : any = null;
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
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_DOUBLESEVEN_FRESH);
	}
	//获取自己粽子数
	public getChargeNum():number
	{
		return this.ainfo.v;
	}
	//获取当前奖励档次
	public getCurJindu():number
	{
		let curJindu = 0;
		let curCharge = this.getChargeNum();
		for(let i in this.cfg.recharge){
			if(curCharge < this.cfg.recharge[i].needGem){
				curJindu =  Number(i);
				break;
			}
			else{
				if(Number(i) == (Object.keys(this.cfg.recharge).length - 1)){
					curJindu = Object.keys(this.cfg.recharge).length
					break;
				}
			}
		}
		return curJindu;
	}

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.ainfo&&this.ainfo.flags)
		{
			for(let key in this.ainfo.flags)
			{
				if(this.ainfo.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	private get cfg() : Config.AcCfg.DoubleSeventhCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean
	{ 
		if(!this.cfg)
		{
			return false;
		}
		let curJindu = this.getCurJindu();
        let chargeNum= this.getChargeNum();
        for(let i = 1; i <= curJindu; ++ i){
            if(chargeNum >= this.cfg.recharge[i].needGem && !this.isGetRecharge(i)){
                return true;
            } 
        }
		return false;
	}


	public get acTimeAndHour():string
	{	
		let et = this.et;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	
	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = this.cfg;
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
						if(currObj.needGem)
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

	public getAvgConfig(buildId, code):any{
		return this.cfg.getDialogByBuildId(buildId, code);
	}

    
	public dispose():void 
	{ 
		this.ainfo = null;
		super.dispose();
	}
}