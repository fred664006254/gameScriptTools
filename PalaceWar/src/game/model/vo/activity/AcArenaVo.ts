class AcArenaVo extends AcBaseVo
{

	private ainfo : any = null;
	private binfo : any = null;
	private cinfo : any = null;
	private shop : any = null;
	private riceNumber : number = 0;
	private rankinfo : any = {};
	public lastidx : number = -1;
	public lastpos : egret.Point = null;
	public idx = 1;
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
		 
		if(data.ainfo)
		{
			this.ainfo = data.ainfo;
		}

		if(data.binfo)
		{
			this.binfo = data.binfo;
		}

		if(data.cinfo)
		{
			this.cinfo = data.cinfo;
		}

		if(data.shop)
		{
			this.shop = data.shop;
		}  
	}

	public getCountDown():number{
		let num = 0;
		if(this.isInActivity()){
			num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
		}
		else{
			num = 0;
		}
		return num;
	}

	//获取自己粽子数
	public getZongzi():number
	{
		let num = 0;
		if(this.v){
			num = this.v;
		}
		return num;
	}

	//获取前进米数
	public getTotalRiceNum():number
	{
		return Math.round(this.riceNumber);
	}

	//获取前进米数对应的奖励数据
	public gerCurRiceAward(curJindu):Array<ItemInfoVo>{
		if(curJindu == 0){
			curJindu = 1;
		}
		let item = this.cfg.teamReward[curJindu].getReward;
		let arr:Array<ItemInfoVo> = new Array();
		let str_arr = item.split('|');
		for(let i in str_arr){
			let unit = str_arr[i].split('_');
			let type = unit[0];
			let id = unit[1];
			let num = unit[2];
			let itemInfoVo : ItemInfoVo = new ItemInfoVo();
			itemInfoVo.initData({id:Number(id),num:num});
			arr.push(itemInfoVo);
		}
		return arr;
	}

	//获取前进米数对应的进度id
	public getCurJindu():number
	{
		let curJindu = 0;
		let curRice = this.getTotalRiceNum();
		for(let i in this.cfg.teamReward){
			if(curRice >= this.cfg.teamReward[i].needMeter){
				curJindu = Number(i);
			}
		}
		return curJindu;
	}

	//获取累积充值数目
	public getChargeNum():number{
		let num = 0;
		if(this.binfo && this.binfo.v){
			num = this.binfo.v;
		}
		return num;
	}

	//获取任务完成次数
	public getTask(type:number):number
	{
		let num = 0;
		if(this.cinfo && this.cinfo.task && this.cinfo.task[type]){
			num = this.cinfo.task[type];
		}
		return num;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(key:number):boolean
	{
		let flag = false;
		if(this.cinfo && this.cinfo.task && this.cinfo.flags[key]){
			flag =  true;
		}
		return flag;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):boolean
	{	
		if(this.binfo&&this.binfo.flags)
		{
			for(let key in this.binfo.flags)
			{
				if(this.binfo.flags[id]==1)
				{
					return true;
				}
			}
			return false; 
		}
		return false;
	}

	private get cfg() : Config.AcCfg.ArenaCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	//奖励进度奖励
	public getpublicRedhot1():boolean
	{
		if(!this.cfg)
		{
			return false;
		}
		//奖励进度宝箱
		for(let i in this.cfg.teamReward){
			let unit = this.cfg.teamReward[i];
			let jindu = Number(i);
			if(this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)){
				return true;
			}
		}
		return false;
	}
	
	public isCanLqAwardJindu(curjindu,flag = false):boolean{
		//奖励进度宝箱
		for(let i in this.cfg.teamReward){
			let unit = this.cfg.teamReward[i];
			let jindu = Number(i);
			let condition = flag ? (jindu >= curjindu) : (jindu <= curjindu);
			if(condition){
				if(this.getTotalRiceNum() >= unit.needMeter && !this.isGetJinduAward(jindu)){
					return true;
				}
			}
		}
		return false;
	}
	//充值奖励
	public getpublicRedhot2():boolean
	{	
		//充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let curCharge = this.getChargeNum();
		for(let i in cfg.recharge){
			let unit = cfg.recharge[i];
			if(curCharge >= unit.needGem && this.isGetRecharge(Number(i)) == false){
				return true;
			}
		}
		return false;
	}
	//任务奖励
	public getpublicRedhot3():boolean
	{	
		//任务
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		for(let i in cfg.task){
			let unit = cfg.task[i];
			let taskNum = this.getTask(unit.questType);
			let taskBoo = this.isGetTaskReward(Number(i));
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
	
	public get acTimeAndHour():string
	{	
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st,et,true);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}

	public getteamRewardDataById(id):any{
		return this.cfg.teamReward[id];
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.DragonBoatDayCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						if(currObj.needMeter|| currObj.rank ||currObj.needGem||currObj.questType||currObj.limit)
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

	//获取限购物品次数
	public getBuyLimitnum(id):number{
		let info : any = this.shop;
		let buyNum = 0;
		if(info && info[id]){
			buyNum += info[id];
		}
		return buyNum;
	}

	//
	public isGetJinduAward(id):boolean{
		let info : any = this.ainfo;
		if(info && info.flags[id]){
			return true;
		}
		return false;
	}

	public getEndMeter():number{
		let arr = this.getArr('teamReward');
		return arr[arr.length - 1].needMeter;
	}

	public getMyPrank():number{
		let rank = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.myrank){
			rank = this.rankinfo.myrankArr.myrank;
		}
		return rank;
	}

	public getMyPScore():number{
		let score = 0;
		if(this.rankinfo && this.rankinfo.myrankArr && this.rankinfo.myrankArr.value){
			score = this.rankinfo.myrankArr.value;
		}
		return score;
	}

	public setRankInfo(data : any):void{
		
		if(data.rankArr){
			this.rankinfo.rankArr = data.rankArr;
		}
		if(data.myrankArr){
			this.rankinfo.myrankArr = data.myrankArr;
		}
	}

	public getRankInfo():any[]{
		let arr = [];
		if(this.rankinfo.rankArr){
			arr = this.rankinfo.rankArr;
		}
		return arr;
	}
	 
	public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.shop = null;
		this.rankinfo = {};
		this.lastidx = -1;
		this.lastpos = null;
	}
}