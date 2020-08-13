class AcDailyRechargeVo extends AcBaseVo
{
	public lastpos : egret.Point = null;
	public lastidx : number = -1;
	private day:number=0;
	private flag:number=0;
	private rewards:any={};
	public constructor(){
		super();
	}

	public initData(data:any):void{
		for(let key in data){
			this[key]=data[key];
		}
	}
	//外部红点
	public get isShowRedDot():boolean{
		let flag = false;
		let curday = this.getNowDay();
		if(this.isInActivity() && this.config){
			for(let i in this.config.recharge){
				let unit : Config.AcCfg.DailyRechargeItemCfg = this.config.recharge[i];

				let bool = false;
				if(this.getNowFlag()){
					bool = unit.id > curday;
				}
				else{
					bool = unit.id > (curday + 1);
				}
				let chargenum = 0;
				if(this.getNowDay() >= unit.id){
					chargenum = unit.needGem;
				}
				else{
					chargenum = bool ? 0 : this.getChargeNum();
				}
				
				if(chargenum >= unit.needGem && !this.isGetRecharge(unit.id)){
					flag = true;
					break;
				}
			}
		}
		return flag;
	}
	//活动期间 不含展示期
	public isInActivity():boolean{
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.config.extraTime;
	}

	//倒计时
	public getCountDown(): number {
		return this.et - 86400 * this.config.extraTime - GameData.serverTime;
	}

	//当日充值数目
	public getChargeNum():number{
		return this.v;
	}

	//当前多少天了
	public getNowDay():number{
		return this.day;
	}
	//今日是否标记
	public getNowFlag():number{
		return this.flag;
	}
	//领取记录
	public isGetRecharge(id : number):boolean{
		let flag = false;
		if(this.rewards && this.rewards[id]){
			flag = true;
		}
		return flag;
	}

	public dispose():void{
		this.v = 0;
		this.day=0;
		this.flag=0;
		this.rewards=null;
		this.lastpos = null;
		this.lastidx = -1;
	}
}