class AcLanternVo extends AcBaseVo {
	public lastidx: number = -1;
	public lastpos : egret.Point = null;
	private isfree : number = 0;
	private process : any = {};
	private rinfo : any = {};
	public constructor() {
		super();
	}

	public initData(data: any): void {
		super.initData(data);
		this.isfree = data.isfree;
		this.process = data.process;
		this.rinfo = data.rinfo;
	}

	//倒计时
	public getCountDown(): number {
		return this.et - 86400 * this.config.extraTime - GameData.serverTime;
	}

	//获取累积充值数目
	public getChargeNum(): number {
		let num = 0;
		if(this.rinfo && this.rinfo.v){
			num = this.rinfo.v;
		}
		return num;
	}
	/**
	 * 累积充值领取判断
	 * */
	public isGetRecharge(id: number): boolean {
		let flag = false;
		if(this.rinfo && this.rinfo.flags && this.rinfo.flags[id]){
			flag = true;
		}
		return flag;
	}

	//获取进度数
	public getProcessNum(): number {
		let num = 0;
		if(this.process && this.process.v){
			num = this.process.v;
		}
		return num;
	}
	/**
	 * 进度领取判断
	 * */
	public isGetprocessReward(id: number): boolean {
		let flag = false;
		if(this.process && this.process.flags && this.process.flags[id]){
			flag = true;
		}
		return flag;
	}

	//可以献花
	public getpublicRedhot1(): boolean {
		let flag = false;
		if(this.isInActivity() && this.getFreeNum()){
			flag = true;
		}
		return flag;
	}

	//是否有未领取进度奖励
	public getpublicRedhot3(): boolean {
		let flag = false;
		if(!this.config){
			return flag;
		}
		if (this.isActyEnd()) {
			return false;
		}
		let process = this.getProcessNum();
		for(let i in this.config.answerList){
			let unit = this.config.answerList[i];
			if(process >= unit.answerfrequency && !this.isGetprocessReward(unit.id)){
				flag = true;
				break;
			}
		}
		return flag;
	}

	//是否有未领取充值奖励
	public getpublicRedhot2(): boolean {
		if (this.isActyEnd()) {
			return false;
		}
		//充值
		let cfg = this.config;
		if (!cfg) {
			return false;
		}
		let curCharge = this.getChargeNum();
		for (let i in cfg.recharge) {
			let unit = cfg.recharge[i];
			if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i))) {
				return true;
			}
		}
		return false;
	}

	public get isShowRedDot(): boolean {
		for (let i = 1; i <= 3; ++i) {
			if (this[`getpublicRedhot${i}`]()) {
				return true
			}
		}
		return false;
	}

	public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.config.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400;
	}

	public isActyEnd(): boolean {
		let flag = false;
		if (GameData.serverTime >= this.et) {
			flag = true;
		}
		return flag;
	}

	public getFreeNum():number{
		let num = 0;
		if(this.isfree){
			num = this.isfree;
		}
		return num;
	}

	public getItemNum():number{
		let num = 0;
		if(this.v){
			num = this.v;
		}
		return num;
	}

	public getArr(key):Array<any> 
	{	
		let arr:Array<any> =[];
		let cfg = this.config;
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
						if(currObj)
						{
							list[i][key2].key = Number(key2);
							if(list[i][key2].id)
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

	

	public dispose(): void {
		this.lastpos = null;
		this.lastidx = -1;
		this.isfree = 0;
		this.rinfo = null;
		this.process = null;
		super.dispose();
	}
}