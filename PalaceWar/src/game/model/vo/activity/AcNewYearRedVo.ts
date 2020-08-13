class AcNewYearRedVo extends AcBaseVo {
	public lastidx: number = -1;
	public lastpos : egret.Point = null;
	private flags : any = {};
	public constructor() {
		super();
	}

	public initData(data: any): void {
		super.initData(data);
		this.flags = data.flags;
	}

	//获取累积充值数目
	public getChargeNum(): number {
		let num = 0;
		if(this.v){
			num = this.v;
		}
		return num;
	}
	//倒计时
	public getCountDown(): number {
		return this.et - 86400 * this.config.extraTime - GameData.serverTime;
	}
	/**
	 * 累积充值领取判断
	 * */
	public isGetRecharge(id: number): boolean {
		let flag = false;
		if(this.flags && this.flags[id]){
			flag = true;
		}
		return flag;
	}

	//可以献花
	public getpublicRedhot1(): boolean {
		let flag = false;
		return flag;
	}

	//是否有未领取宝箱奖励
	public getpublicRedhot3(): boolean {
		return false;
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

	public getSpecailShowData():{needNum: number, index: number}{
		let cfg = this.config;
		for (let k in cfg.recharge){
			let rewardArr = cfg.recharge[k].getReward.split("|");
			for (let i=0; i < rewardArr.length; i++){
				let strArr = rewardArr[i].split("_");
				if (strArr[1] == String(cfg.coreReward)){
					return {needNum:cfg.recharge[k].needGem, index: Number(k)};
				}
			}
		}
		return {needNum: null, index: null};
	}

	public dispose(): void {
		this.lastpos = null;
		this.lastidx = -1;
		this.flags = null;
		super.dispose();
	}
}