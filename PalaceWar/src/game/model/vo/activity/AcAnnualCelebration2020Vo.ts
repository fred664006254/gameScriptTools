class AcAnnualCelebration2020Vo extends AcBaseVo
{   

    //当前位置
	private pos:number = 0;
    private task:any = {};
    private circle:any = {};
    private v2:number = 0;
    private buildingTimes:any = {};

    public tmpReward:string = null;

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

    public isInActy():boolean{
		let flag = false;
		if(GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400){
			flag = true;
		}
		return flag;
	}

	public isActyEnd():boolean{
		let flag = false;
		if(GameData.serverTime >= this.et){
			flag = true;
		}
		return flag;
	}

    private get cfg():Config.AcCfg.AnnualCelebration2020Cfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

    public getCurMapId():number{
		return this.pos;
	}

    public getBoxNum():number{
		return this.v;
	}

    public getAIDiceNum():number{
		return this.v2;
	}

	//ture 美菱  false 领了
	public getTaskFlag(idx:number,type:number):boolean{
		let flag:boolean = true;
		let taskTab = this.task[type];
		if (taskTab && taskTab[idx] && taskTab[idx].f)
		{
			flag = false;
		}
		return flag;
	}

    public getCircleNum():number{
		let cv:number = 0;
		if (this.circle && this.circle.v)
		{
			cv = this.circle.v;
		}
		return cv;
	}

	public getCircleFlag(idx:number):boolean{
		let flag:boolean = true;
		if (this.circle && this.circle.flags && this.circle.flags[idx])
		{
			flag = false;
		}
		return flag;
	}

	//无限奖励当前是第几圈
	public getMaxGetIndex():number
	{	
		let maxNum = this.cfg.getMaxCircle();
		if (this.getCircleFlag(maxNum))
		{
			return maxNum;
		}
		else
		{	
			while (!this.getCircleFlag(maxNum))
			{	
				maxNum++;
			}
			return maxNum;
		}
	}

    public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

    public getMapTimes():number{
		let t = 0;
		let cfg = <Config.AcCfg.AnnualCelebration2020Cfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let map = <Config.AcCfg.AC2020MapItemCfg>cfg.map[this.pos];
		if (map.buildingType && this.buildingTimes[map.buildingType])
		{
			t = this.buildingTimes[map.buildingType];
		}
		
		return t%4+1;
	}

	public get isShowRedDot(): boolean 
	{	
		return this.checkCircleRedDot() || this.checkTaskRedDot() ; 
	} 

	public checkTaskRedDot() : boolean
	{
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);

		for (let k in cfg.task)
		{
			let keys = Object.keys(cfg.task[k]);
			for (let i = 0; i < keys.length; i++) {
				let key = keys[i];
				let onecfg:Config.AcCfg.AC2020TaskItemCfg = cfg.task[k][key];

				if ((this.getTaskFlag(onecfg.id,onecfg.type)) && this.getTaskNum(onecfg.id,(Number(k)+1)) >= onecfg.value) {
					return true;
				}
			}
		}

		
		return false;
	}

	public checkCircleRedDot() : boolean
	{
		for (let i = 1; i<=this.getCircleNum();i++)
		{
			if (this.getCircleFlag(i))
			{
				return true;
			}
		}
		return false;
	}

	public getTaskNum(id:number,type:number):number
	{
		let num = 0;
		let taskTab = this.task[type];
		if (taskTab && taskTab[id] &&taskTab[id].v)
		{
			num = taskTab[id].v;
		}

		return num;
	}

	/**
	 * 活动持续天数 用于限定登录任务
	 */
	public getAcContinueDays():number
	{
		let days:number = Math.ceil( (this.et-this.st)/86400 );
		return days-1;
	}

	public getCurRoundReward():string{
		let reward = '';
		let curRound = Math.min((this.getCircleNum() + 1),this.cfg.getMaxCircle());
		let unit : Config.AcCfg.TreasureCircleItemCfg = this.cfg.achievement[curRound];
		if(unit){
			reward = unit.getReward;
		}
		if(reward === ''){
			reward = this.cfg.achievement[Object.keys(this.cfg.achievement).length].getReward;
		}
		return reward;
	}

	public get acCountDownNoExtra():string
	{	
		let et = this.et
		if(Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code)){
			et = this.et - Config.AcCfg.getExtraTimeByIdAndCode(this.aid,this.code)*86400;
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime),17);
	}

    public dispose():void
    {
        this.pos = 0;
        this.v2 = 0;
        this.task = null;
        this.circle = null;
        this.tmpReward = null;
        this.buildingTimes = null;
    }
}