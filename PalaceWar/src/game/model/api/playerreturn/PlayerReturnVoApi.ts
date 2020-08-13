class PlayerReturnVoApi extends BaseVoApi
{

	public sinfo : any;
	public tinfo : any;
	public rinfo : any;
	public et : number;
	public version : number;
	private _rewards : string;
	public constructor() 
	{
		super();
	}

	public formatData(data:any):void
	{
		this.sinfo = data.info.sinfo;
		this.tinfo = data.info.tinfo;
		this.rinfo = data.info.rinfo;
		this.version = data.version;
		this._rewards = '';
		this.et = data.et;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RETURN_FRESH_ITEM);
	}

	public setRebackRewards(str : string):void{
		this._rewards = str;
	}

	public getRebackRewards():string{
		return this._rewards;
	}

	/*
	*获取活动日期
	*/
	public get acTimeAndHour():string
	{	
		let st = this.version;//this.vo.st;
		let et = this.et;//this.vo.et - 86400;
		return App.DateUtil.getOpenLocalTime(st,et,true);
	}

	//获取当前累计签到天数
	public getSignDay():number{
		return Number(this.sinfo.v);
	}

	//获取累积充值数目
	public getChargeNum():number{
		return Number(this.rinfo.v);
	}

	//获取任务完成次数
	public getTask(type:number):number
	{
		if(this.tinfo.task[type])
		{
			return this.tinfo.task[type];
		}
		return 0;
	} 

	private _clickIdx : number = 0;
	public setClickIdx(num : number):void{
		this._clickIdx = num;
	}

	public getClickIdx():number{
		return this._clickIdx;
	}

	/*任务奖励是否领取*/
	public isGetTaskReward(key:number):boolean
	{
		if(this.tinfo.flags[key] && this.tinfo.flags[key] == 1)
		{
			return true;
		}
		return false;
	} 

	/*所有签到励是否领取*/
	public isGetSignAllReward(key:number):boolean
	{
		if(this.sinfo.flags[key] && this.sinfo.flags[key] == 2)
		{
			return true;
		}
		return false;
	} 
	/*普通签到奖励是否领取*/
	public isGetSignOdReward(key:number):boolean
	{
		if(this.sinfo.flags[key] && this.sinfo.flags[key] == 1)
		{
			return true;
		}
		return false;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.rinfo&&this.rinfo.flags)
		{
			for(let key in this.rinfo.flags)
			{
				if(this.rinfo.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	private get cfg(){
		return Config.PlayerreturnCfg
	}

	public getpublicRedhot1():boolean
	{
		//签到进度宝箱
		for(let i in this.cfg.signReward){
			let unit = this.cfg.signReward[i];
			let jindu = Number(i) + 1;
			if(this.getSignDay() >= unit.days && ((Api.playerVoApi.getPlayerVipLevel() < this.cfg.needVip && !this.isGetSignOdReward(jindu))|| (Api.playerVoApi.getPlayerVipLevel() >= this.cfg.needVip && !this.isGetSignAllReward(jindu)))){
				return true;
			}
		}
		return false;
	}

	public getpublicRedhot3():boolean
	{	
		//充值
		let cfg = this.cfg;
		let curCharge = this.getChargeNum();
		for(let i in cfg.rechargeReward){
			let unit = cfg.rechargeReward[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i) + 1) == false){
				return true;
			}
		}
		return false;
	}

	public getpublicRedhot2():boolean
	{	
		//任务
		let cfg = this.cfg;
		for(let i in cfg.taskReward){
			let unit = cfg.taskReward[i];
			let taskNum = this.getTask(unit.questType);
			let taskBoo = this.isGetTaskReward(Number(i) + 1);
			if(taskNum >= unit.value && taskBoo == false)
			{
				return true;
			} 
		}
		return false; 
	}

	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i < 4; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 

	public isInActTime():boolean{
		return GameData.serverTime < this.et && GameData.serverTime >= this.version;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = Config.PlayerreturnCfg;
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
						if(currObj.needGem||currObj.questType||currObj.days)
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
	 
	public dispose():void 
	{ 
		this.sinfo = null;
		this.rinfo = null;
		this.tinfo = null;
	}
}