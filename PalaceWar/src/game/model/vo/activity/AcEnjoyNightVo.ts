class AcEnjoyNightVo extends AcBaseVo
{
   
	//当前位置
	private pos:number = 0;
	private isfree:number = 0;
	//是否需要播动画
	public needplay:number = 0;
    private achievement:any = null;
	private recharge:any = null;
	private buildingTimes:any = {};
	private shop:any = {};
	private task:any = {};

	public tmpReward:string = null;
	public selIdx:number = 0;

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

	public getCountCd():string{	
		let et = this.et - 86400;
		let count = et - GameData.serverTime;
		let str = '';
		str = App.DateUtil.getFormatBySecond(count, 1);
		return str;
	}

	public getBoxNum():number{
		return this.v;
	}

	private get cfg():Config.AcCfg.EnjoyNightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public getCurMapId():number{
		return this.pos;
	}

	public getMapTimes():number{
		let t = 0;
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let map = <Config.AcCfg.EnjoyNightMapCfg>cfg.map[this.pos];
		if (map.buildingType && this.buildingTimes[map.buildingType])
		{
			t = this.buildingTimes[map.buildingType];
		}
		
		return t%4+1;
	}

	public getRechargeNum():number{
		let rv:number = 0;
		if (this.recharge && this.recharge.v)
		{
			rv = this.recharge.v;
		}
		return rv;
	}

	public getRechargeFlag(idx:number):boolean{
		let flag:boolean = true;
		if (this.recharge && this.recharge.flags && this.recharge.flags[idx])
		{
			flag = false;
		}
		return flag;
	}

	public isFree():boolean
	{
		return this.isfree == 1;
		// return true;
	}

	public getAchievementVallue():number{
		let rv:number = 0;
		if (this.achievement && this.achievement.v)
		{
			rv = this.achievement.v;
		}
		return rv;
	}

	public isCanExchange():boolean
	{	
		let b = false;
		let hasNum:number = Api.itemVoApi.getItemNumInfoVoById("2009");
		if (hasNum>0)
		{
			let scenesid = this.cfg.getExchangeSceneId();
			if (Api.otherInfoVoApi.isHasSceneNotAboutUnlock(scenesid,"cityScene"))
			{
				b = true;
			}
			else
			{
				let needparts:string =  this.cfg.exchangeScene.needParts;
        		let needNum:string = needparts.split("_")[2];
				if (hasNum>=Number(needNum))
				{
					b = true;
				}
			}
		}

		return b;
	}

	public get isShowRedDot(): boolean 
	{	
		return this.checkAchievementRedDot() || this.checkTaskRedDot() || this.checkRechargeRedDot() || this.checkBoxRedDot() || this.isCanExchange(); 
	} 
	/**
	 * 宝箱的小红点
	 */
	public checkAchievementRedDot() {
		if(GameData.serverTime < this.et){
			let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
			let keys = Object.keys(cfg.achievement);
			for (let i = 0; i < keys.length; i++)
			{
				let key = keys[i];
				let achi:Config.AcCfg.EnjoyNightAchievementCfg = cfg.achievement[key];
				if ((!this.checkAchievementFlag(achi.id)) && this.getAchievementVallue() >= achi.needNum) {
					return true;
				}
			}
		}
		return false
	}

	/**
	 * 奖励是否领取了
	 */
	public checkAchievementFlag(id: number): boolean {
		if (this.achievement.flags[id] && this.achievement.flags[id] == 1) {
			return true;
		}
		return false;
	}

	public getMapLv():number
	{
		let lv = 1;
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let keys = Object.keys(cfg.achievement);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let onecfg:Config.AcCfg.EnjoyNightAchievementCfg = cfg.achievement[key];
			if ((this.checkAchievementFlag(onecfg.id))) {
				if (onecfg.mapChange && onecfg.mapChange > lv)
				{
					lv = onecfg.mapChange;
				}
			}
		}

		return lv;
	}

	/**
	* 充值的小红点
	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let keys = Object.keys(cfg.recharge);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let onecfg:Config.AcCfg.EnjoyNightRechargeCfg = cfg.recharge[key];
			if ((this.getRechargeFlag(onecfg.id)) && this.getRechargeNum() >= onecfg.needGem) {
				return true;
			}
		}
		return false
	}

	public checkTaskRedDot() {
		let cfg = <Config.AcCfg.EnjoyNightCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let keys = Object.keys(cfg.task);
		for (let i = 0; i < keys.length; i++) {
			let key = keys[i];
			let onecfg:Config.AcCfg.EnjoyNightTaskItemCfg = cfg.task[key];
			if ((!this.getTaskFlag(onecfg.taskId)) && this.getTaskNum(onecfg.questType) >= onecfg.value) {
				return true;
			}
		}
		return false
	}

	public checkBoxRedDot():boolean
	{
		return this.isInActivity() && this.getBoxNum() > 0;
	}

	public getShopNum(id:number):number
	{
		let num = 0;

		if (this.shop && this.shop[id])
		{
			num = this.shop[id];
		}

		return num;
	}

	public getTaskNum(id:number):number
	{
		let num = 0;

		if (this.task && this.task.v &&this.task.v[id])
		{
			num = this.task.v[id];
		}

		return num;
	}

	public getTaskFlag(id:number):number
	{
		let num = 0;

		if (this.task && this.task.flags &&this.task.flags[id])
		{
			num = this.task.flags[id];
		}

		return num;
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}


	public dispose():void
	{
		this.achievement = null;
		this.recharge = null;
		this.pos = 0;
		this.isfree = 0;
		this.needplay = 0;
		this.v = 0;
		this.buildingTimes = {};
		this.shop = {};

	}
}