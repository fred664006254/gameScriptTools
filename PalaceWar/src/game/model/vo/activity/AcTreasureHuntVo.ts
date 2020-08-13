class AcTreasureHuntVo extends AcBaseVo{
	public constructor(){
		super();
    }
	private _v:any=null;
	private _pos : number = 0;
	private _circle : any = {};
	private _wealthGodTimes : number = 0;
	private _task : any = {};
	private _flags:any ={};
	private _day:number =0;
	public tmpReward:string='';

	public initData(data:any):void
	{
		for(let key in data){
			this[key]=data[key];
		} 
		this.v = data.v;//剩余筛子数
		this._pos = data.pos;//当前地图id
		this._circle = data.circle;//circlereward 圈数 + 领取状况{v = 0,flags = {}}
		this._wealthGodTimes = data.wealthGodTimes;//财神剩余次数
		this._task = data.task;//任务相关{day = 1,v = {},flags = {}}/
		if(data&&data.task)
		{
			this._v = data.task.v;
		}
		if(data.task&&data.task.day)
		{
			this._day =data.task.day;
		}

		if(data.task)
		{
			this._flags = data.task.flags;
			App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RESFESH_TREASURE_LIST);
		}  
	}
	

	public get acTimeAndHour():string{	
		let et = this.et - 86400;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public getCountCd():string{	
		let et = this.et - 86400;
		let count = et - GameData.serverTime;
		let str = '';
		str = App.DateUtil.getFormatBySecond(count, 1);
		// if(count > 86400){
		// 	let tmp = Math.floor(count / 86400);
		// 	str = tmp.toString() + LanguageManager.getlocal(`date_day2`);
		// }
		return str;
	}

	public getCurRound():number{	
		return this._circle.v;
	}

	public getBoxNum():number{
		return this.v;
	}
    
    private get cfg():Config.AcCfg.TreasureHuntCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public get isShowRedDot():boolean{
		let flag = false;
		//圈数奖励
		if(this.canGetRoundReward()){
			flag = true;
		}
		if(this.taskHotredBoo){
			flag = true;
		}
		return flag;
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

	public getRoundMax():number{
		return 11;
	}

	public canGetRoundReward():boolean{
		let flag = false;
		if(GameData.serverTime < this.et){
			for(let i = 1; i <= this.getCurRound(); ++ i){
				if(this.getCurRoundGetState(Number(i)) == 1){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	
	public getCurRoundReward():string{
		let reward = '';
		let curRound = Math.min((this.getCurRound() + 1),this.getRoundMax());
		let unit : Config.AcCfg.TreasureCircleItemCfg = this.cfg.circleReward[curRound];
		if(unit){
			reward = unit.getReward;
		}
		if(reward === ''){
			reward = this.cfg.circleReward[Object.keys(this.cfg.circleReward).length].getReward;
		}
		return reward;
	}

	// 1 充值页面已经领过 false  根据任务id 判断是否领过
	public  getReceiveType(id:string):boolean
	{	
		if(this._flags) 
		{
			for(let key in this._flags)
			{
				if( this._flags[id]==1)
				{
					return false;
				}
			}
			return true; 
		} 
	}

	//根据id 取对应进度
	public  getTypeNum(id:number):number
	{	
		if(this._v) 
		{
			for(let key in this._v)
			{
				if( this._v[id])
				{
					return this._v[id];
				}
			} 
		} 
		return 0; 
	}


	public selIdx : number = 0;
	/** 
	 * 获取奖励领取状态 1可领取 2未满足领取 3已领取
	*/
	public getCurRoundGetState(id : number):number{
		let flag = 2;
		if(this.isGetRoundReward(id)){
			flag = 3;
		}
		if(this.getCurRound() >= id && !this.isGetRoundReward(id)){
			flag = 1;
		}
		return flag;
	}
	//获取充值的钱数
	public getAinfoV():number
	{
		let rechargeNum:number = 0;
		rechargeNum = this.getTypeNum(1003);
		return 	rechargeNum;
	}
	public get day():number
	{
		return this._day-1;
	}
	
	 
	public isGetRoundReward(id : number):boolean{
		return this._circle.flags[id] && this._circle.flags[id] == 1;
	}

	public getCurMapId():number{
		return this._pos;
	}

	public isInWeaith():boolean{
		return this._wealthGodTimes > 0;
	}
	public rechargeHot():boolean
	{
		if(!this.cfg){
			return false;
		}
		var myRechargeNum = this.getAinfoV();
		var value =0;
		var rewardList =this.cfg.getTaskorReward(1,this.day);
		for(var i in rewardList)
		{
			var currRe = rewardList[i]; 
			value = currRe.value;
			if(this.getReceiveType(currRe.name)==true&&myRechargeNum>=value)
			{
				return true;
			}
		}  
		return false;
	}
	// 任务红点
	public taskRedHot():boolean
	{
		var value =0;
		if(!this.cfg){
			return false;
		}
		var rewardList =this.cfg.getTaskorReward(2,this.day);
		for(var i in rewardList)
		{
			var currRe = rewardList[i]; 
			value = currRe.value; 
			var myRechargeNum = this.getTypeNum(currRe.questType);
			if(this.getReceiveType(currRe.name)==true&&myRechargeNum>=value)
			{
				return true;
			}
		}  
		return false;
	}

	public  get taskHotredBoo():boolean
	{	
		if(!this.isInActy())
		{
			return false;
		}
		
		if(this.taskRedHot()||this.rechargeHot()){
			return true;
		}
		else
		{
			return false;
		}
	}
	 
	public dispose():void{
		this.v = 0;//剩余筛子数
		this._pos = 0;//当前地图id
		this._circle = {};//circlereward 圈数 + 领取状况{v = 0,flags = {}}
		this._wealthGodTimes = 0;//财神剩余次数
		this._task = {};//任务相关{day = 1,v = {},flags = {}}/
		this._v = null;
		this._day =0;
		super.dispose();
	}
}