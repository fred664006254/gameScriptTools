class AcDuanWuVo extends AcBaseVo
{   
    /**
        self.info[k].v = 0
        self.info[k].ainfo = {v1=0,v2=0,v3=0}
        self.info[k].binfo = {v=0,flags={}}
        self.info[k].cinfo = {v=0,task={},flags={}}
        self.info[k].stask = {v=0,num=0}
        self.info[k].shop = {}
        self.info[k].claim = {}
     */
    //道具数量 v1 粽子 v2 打糕 v3雄黄
    private ainfo : any = null;
    //累计充值 v充值的元宝 flags领取标记
	private binfo : any = null;
    //任务完成 task{601:x,602:x},flags={1:1,2:1}
	private cinfo : any = null;
    //商店任务情况 v 总消费元宝数  num 领取奖励次数
    private stask : any = null;
    // 商城购买信息
    private shop : any = null;
    //兑换信息 同商店
    private claim : any = null;

    public lastidx : number = -1;
	public lastpos : egret.Point = null;

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

	//获取活动道具  1 粽子 2打糕 3雄黄
	public getActivityItem(type:number):number
	{
		let num = 0;
		if(this.ainfo && this.ainfo["v"+type]){
			num = this.ainfo["v"+type];
		}
		return num;
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

	//获取商店购买次数
	public getShop(type:number):number
	{
		let num = 0;
		if(this.shop && this.shop[type]){
			num = this.shop[type];
		}
		return num;
	} 

	//获取商店购买次数
	public getClaim(type:number):number
	{
		let num = 0;
		if(this.claim && this.claim[type]){
			num = this.claim[type];
		}
		return num;
	} 

	//获取商店任务购买次数
	public getShopTask():number
	{
		let num = 0;
		if(this.stask && this.stask.num){
			num = this.stask.num;
		}
		return num;
	}
	//获取商店任务总消费元宝数
	public getShopTaskV():number
	{
		let num = 0;
		if(this.stask && this.stask.v){
			num = this.stask.v;
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

	private get cfg() : Config.AcCfg.DuanWuCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}


    //充值奖励
	public getpublicRedhot1():boolean
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
			if(curCharge >= unit.needGem && this.isGetRecharge(unit.id) == false){
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
		return false
	}
	//活动兑换
	public getpublicRedhot4():boolean
	{	
		 //任务
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		for(let i in cfg.claim){
			let unit = <Config.AcCfg.DWClaimItemCfg>cfg.claim[i];
			let claimNum = this.getClaim(unit.id);
			if (unit.limit && claimNum>=unit.limit)
			{
				continue;
			}
			let need1=0,need2=0,need3=0;
			if (unit.costZongZi)
			{
				need1 = unit.costZongZi;
			}
			if (unit.costDaGao)
			{
				need2 = unit.costDaGao;
			}
			if (unit.costXiongHuang)
			{
				need3 = unit.costXiongHuang;
			}
			if (this.getActivityItem(1)>=need1 && this.getActivityItem(2)>=need2 && this.getActivityItem(3)>=need3)
			{
				return true;
			}
		}
		return false; 
	}

	//商店任务
	public getpublicRedhot2():boolean
	{	
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let canGetNum:number = Math.floor(this.getShopTaskV()/this.cfg.shopTask.value);
        if (canGetNum > this.getShopTask() && this.getShopTask() < this.cfg.shopTask.times )
        {
			return true;
		}
		return false; 
	}

	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i <= 4; ++ i){
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

    public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg : Config.AcCfg.DuanWuCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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
						// if(currObj.needMeter|| currObj.rank ||currObj.needGem||currObj.questType||currObj.limit)
						// {
							list[i][key2].key = Number(key2)+1;
							if(list[i][key2].key)
							{
								arr.push(list[i][key2]); 
							}
						// } 
					} 
				} 
			}
		}
		return arr;  
	}

    public dispose():void 
	{ 
		this.ainfo = null;
		this.binfo = null;
		this.cinfo = null;
		this.shop = null;
		this.stask = null;
		this.claim = null;

        this.lastidx = -1;
		this.lastpos = null;

		super.dispose();
	}
}