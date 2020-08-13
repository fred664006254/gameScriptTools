class AcLadderTournamentVo extends AcBaseVo
{

	public tmpReward:string = null;
	public selIdx:number = 0;

	public task:any = null;
	public shop:any = null;

    public constructor() 
	{
		super();
	}

    public initData(data:any):void
	{
        for(let key in data)
		{
			this[key] = data[key];
		}
	}

	public get cfg():Config.AcCfg.LadderTournamentCfg
	{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid,this.code);
	}
	//是否满足条件
	public checkShow():boolean
	{	
		if (this.cfg && Api.playerVoApi.getPlayerLevel() >= this.cfg.needLv && Api.servantVoApi.getServantCount()>= this.cfg.needServant)
		{
			return true;
		}

		return false;
	}

	public getArr(key:string):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.LadderTournamentCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if(!cfg)
		{
			return [];
		}
		let list = cfg[key];  

		for(var key2 in list)
		{	
			if(list[key2])
			{	
				if (key=="shop")
				{	
					let itemCfg = list[key2];
					if (GameData.formatRewardItem(itemCfg.item)[0])
					{
						arr.push(list[key2]);
					}
				}
				else
				{
					arr.push(list[key2]);
				}	
				
			} 
		} 
		return arr;  
	}

	/**
	 *  充值奖励 充值档位 领没领
	 */
	public isReward(type:number, id: string): boolean {
		let key:string = String(type);
		if (this.task && this.task.f && this.task.f[key] && this.task.f[key][id])
		{
			return true;
		}
		return false;
	}

	/**
	 * 充值的进度
	 */
	public getValue(type:number): number {
		let key:string = String(type);
		if (this.task && this.task.v && this.task.v[key])
		{
			return this.task.v[key];
		}
		return 0;
	}

	public getShopNum(id:string):number
	{	
		if (this.shop && this.shop[id])
		{
			return this.shop[id];
		}
		return 0;
	}

	public get isShowRedDot(): boolean 
	{	
		if (this.checkTaskRedDot())
		{
			return true;
		}
		if (this.checkShow() && !this.checkIsInEndShowTime() && !Api.laddertournamentVoApi.checkIsTruce())
		{
			let fightNum = Api.laddertournamentVoApi.getFightTimes();
			let totalNum = this.cfg.freeNum;
			if (totalNum>fightNum)
			{
				return true;
			}
		}
		return false; 
	}

	public checkTaskRedDot():boolean
	{
		for(let i = 1; i <= 4; ++ i){
			if(this.getpublicRedDot(i)){
				return true
			}
		}
		return false;
	}
    

	//充值奖励
	public getpublicRedDot(t:number):boolean
    {
        //充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let taskcfg = this.cfg.getTaskCfg(t);
		for(let i in taskcfg){
			let unit:Config.AcCfg.LTTaskCfg = taskcfg[i];
			let curCharge = this.getValue(unit.taskType);

			if(curCharge >= unit.value && this.isReward(t,unit.id) == false && (t==1 || this.checkShow())){
				return true;
			}
		}
		return false;
	}
	
	public get acCountDown17():string
	{	

		let lesstime = this.et - GameData.serverTime - this.config.extraTime*86400;
        if (lesstime>0)
        {
            return LanguageManager.getlocal("acLadder_TimeCountDown2",[App.DateUtil.getFormatBySecond((lesstime),17)])
        }
        else
        {
            return LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
        }
	}

	public get acCountDownEndTime():string
	{	

		let lesstime = this.et - GameData.serverTime;
        if (lesstime>0)
        {
            return LanguageManager.getlocal("acLadder_TimeCountDownEndTime",[App.DateUtil.getFormatBySecond((lesstime),17)])
        }
        else
        {
            return LanguageManager.getlocal("acLadder_TimeCountDownEnd2");
        }
	}

	// public checkIsInEndShowTime():boolean
	// {
	// 	return true;
	// }

    public dispose():void 
	{ 
		this.task = null;
		this.tmpReward = null;
		this.selIdx = 0;
	}
}