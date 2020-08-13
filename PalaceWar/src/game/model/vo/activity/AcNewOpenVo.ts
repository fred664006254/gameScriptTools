class AcNewOpenVo extends AcBaseVo
{	
	// 商城购买信息
    private shop:any = null;

	private rinfo:any = null;
	private special:number = 0;
	private task:any = null;


	public lastidx : number = -1;
	public lastpos : any = null;
	public pointidx : number = -1;
	public taskid : string = '';

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

    private get cfg() : Config.AcCfg.NewOpenCfg{
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}

	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
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

	public getSpecialNum():number
	{
		return this.special;
	}

	//获取任务完成次数
	public getTask(id1,id2):number{
		let num = 0;
		if(this.task[id1] && this.task[id1][id2] && this.task[id1][id2].num){
			num = this.task[id1][id2].num;
		}
		return num;
	} 

	public getShopByNum(id1):number{
		let num = 0;
		if(this.shop && this.shop[id1]){
			num = this.shop[id1];
		}
		return num;
	} 

	/*任务奖励是否领取*/
	public isGetTaskReward(id1,id2):boolean{
		let flag = false;
		if(this.task[id1] && this.task[id1][id2]){
			flag = this.task[id1][id2].flag == 1;
		}
		return flag;
	} 

	/*累积充值领取判断*/
	public isGetRecharge(id:number):number{
		let flag = 0;
		if(this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
			flag = this.rinfo.flags[id];
		}	
		return flag;
	}

	//充值
	public getChargeNum():number{
		let charge = 0;
		if(this.rinfo && this.rinfo.v){
			charge = this.rinfo.v;
		}
		return charge;
	}

	public getRechangeArr():Config.AcCfg.NewOpenRechargeItemCfg[]
	{
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let keys = Object.keys(this.cfg.recharge);

		for(var i:number= 0;i<keys.length; i++)
		{	
			let key = keys[i];
			let onecfg = this.cfg.recharge[key];
			let getNum = this.isGetRecharge(onecfg.id);
			if(getNum >= onecfg.maxNum){
				arr1.push(onecfg);
			}
			else{
				if((this.getChargeNum()-onecfg.needGem*getNum)>=onecfg.needGem)
				{
					arr2.push(onecfg);
				}
				else
				{
					arr3.push(onecfg);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 

	}

	public getShopArr():Config.AcCfg.NewOpenShopItemCfg[]
	{
		let keys = Object.keys(this.cfg.shop);
		let arr=[];
		for(var i:number= 0;i<keys.length; i++)
		{	
			let key = keys[i];
			let onecfg = this.cfg.shop[key];
			arr.push(onecfg);
		}
		return arr;
	}


	//	活动奖励
	public getpublicRedhot1():boolean
    {
        //充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let task = this.cfg.task;
		for(let i in task){
			let unit = task[i];
			let id = Number(i);
			
			for(let k in unit){
				let isget = this.isGetTaskReward(id,Number(k)-1);
				let taskNum = this.getTask(id,Number(k)-1);
				let onecfg = unit[k];

				if (taskNum<onecfg.peopleNum)
				{
					break;
				}

				if (!isget && taskNum>=onecfg.peopleNum)
				{
					return true;
				}
			}
		}
		return false;
    }
	//	消费奖励
	public getpublicRedhot2():boolean
    {
        //充值
		let cfg = this.cfg;
		if(!cfg)
		{
			return false;
		}
		let keys = Object.keys(this.cfg.recharge);

		for(var i:number= 0;i<keys.length; i++)
		{	
			let key = keys[i];
			let onecfg = this.cfg.recharge[key];
			let getNum = this.isGetRecharge(onecfg.id);
			if(getNum < onecfg.maxNum && (this.getChargeNum()-onecfg.needGem*getNum)>=onecfg.needGem)
			{
				return true;
			}
		}
		return false;
    }
	//	shop奖励
	public getpublicRedhot3():boolean
	{	
		let itemNum = this.getSpecialNum();
		let keys = Object.keys(this.cfg.shop);
		for(var i:number= 0;i<keys.length; i++)
		{	
			let key = keys[i];
			let onecfg:Config.AcCfg.NewOpenShopItemCfg = this.cfg.shop[key];
			let buynum = this.getShopByNum(onecfg.id);
			if (buynum < onecfg.limit && itemNum>=onecfg.specialCost)
			{
				return true;
			}
		}
		return false;
	}

	public get isShowRedDot(): boolean 
	{	
		for(let i = 1; i <= 3; ++ i){
			if(this[`getpublicRedhot${i}`]()){
				return true
			}
		}
		return false; 
	} 

    public dispose():void 
	{ 
		this.shop = null;
		this.rinfo = null;
		this.special = 0;
		this.task = null;

		super.dispose();
	}
}
