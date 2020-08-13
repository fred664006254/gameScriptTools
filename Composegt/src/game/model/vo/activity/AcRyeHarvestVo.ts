class AcRyeHarvestVo extends AcBaseVo {
	public selIdx: number = 0;
	private info: any = [];// --献花情况25个元素
	private taskinfo: any = {} //{v = 0,flags={}} --充值信息
	private flags: any = {} //{v = 0,flags={}} --充值信息
	private stageinfo: any = {}//--奖励领取情况
	public num: number = 0;// --献花次数
	private free: number = 0;
	private shop: any = null;
	private task: any = null;
	public constructor() {
		super();
	}

	public initData(data: any): void {
		super.initData(data);
		this.info = data.info;
		this.stageinfo = data.stageinfo;
		this.taskinfo = data.taskinfo;
		this.flags = data.flags;
		this.num = data.num;
		this.free = data.isfree;
		App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_RYEHARVEST_FRESH_ITEM);
	}

	//获取自己鲜花数
	public getFlowers(): any[] {
		let arr = [];
		if (this.info) {
			arr = this.info;
		};
		return arr;
	}

	//获取是否已全部激活宝箱
	private getAllBoxIsLight(): boolean {
		return this.num >= 25;
	}

	//获取自己鲜花数
	public getFlowerNum(): number {
		let num = 0;
		if (this.v) {
			num = this.v;
		}
		return num;
	}

	//获取累积充值数目
	public getChargeNum(questType:number): number {
		let num = 0;
		if (this.taskinfo && this.taskinfo[questType]) {
			num = this.taskinfo[questType];
		}
		return num;
	}

	//倒计时
	public getCountDown(): number {
		return this.et - GameData.serverTime;
	}
	/**
	 * 累积充值领取判断
	 * */
	public isGetRecharge(id: number): boolean {
		let flag = false;
		if (this.flags && this.flags[id]) {
			flag = true;
		}
		return flag;
	}

	private get cfg(): Config.AcCfg.RyeHarvestCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	//可以献花
	public getpublicRedhot1(): boolean {
		let flag = false;
		if (this.isInActivity()) {
			flag = this.v > 0 || this.isFree();
		}
		return flag;
	}

	//是否有未领取宝箱奖励
	public getpublicRedhot3(): boolean {
		if (this.isActyEnd()) {
			return false;
		}
		//奖励进度宝箱
		for (let i in this.cfg.achievement) {
			let unit = this.cfg.achievement[i];
			let id = Number(i) + 1;
			if (this.getBoxStatus(id) == 2 && !this.isGetJinduAward(id)) {
				return true;
			}
		}
		if (this.getBigBoxStatus() == 1) {
			return true;
		}
		return false;
	}

	//是否有未领取充值奖励
	public getpublicRedhot2(): boolean {
		if (this.isActyEnd()) {
			return false;
		}
		//充值
		let cfg = this.cfg;
		if (!cfg) {
			return false;
		}
		// let curCharge = this.getChargeNum();
		// for (let i in cfg.task) {
		// 	let unit = cfg.task[i];
		// 	if (curCharge >= unit.needGem && !this.isGetRecharge(Number(i) + 1)) {
		// 		return true;
		// 	}
		// }
		return false;
	}

	public get isShowRedDot(): boolean {
		if (this.getFlowerNum() > 0) {
			return true;
		}
		// 大箱子能领
		if (this.getBigBoxStatus() == 1) {
			return true;
		}
		// 粮仓能领
		for (var i = 0; i < this.cfg.achievement.length; i++) {
			if (this.getBoxStatus(i+1) == 2) {
				return true;
			}
		}
		// 任务能领
		if (this.checTaskRedDot()) {
			return true;
		}
		return false;
	}

	public get acTimeAndHour(): string {
		return App.DateUtil.getOpenLocalTime(this.st, this.et, false);
	}

	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}

	public isActyEnd(): boolean {
		let flag = false;
		if (GameData.serverTime >= this.et) {
			flag = true;
		}
		return flag;
	}

	public isGetJinduAward(id): number {
		let flag = 0;
		if (this.stageinfo && this.stageinfo[id]) {
			flag = this.stageinfo[id];
		}
		return flag;
	}

	//花盆是否被点亮 1未被开启 2被点亮
	public getFlowerStatus(id: number): number {
		let status = 1;
		if (this.info && this.info[id - 1]) {
			status = 2;
		}
		return status;
	}

	//宝箱状态 1未被开启 2已满足未领取 3已领取
	public getBoxStatus(id: number): number {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let status = 1;
		let getCount = this.isGetJinduAward(id);// 领取过的次数
		if (getCount >= cfg.refresh + 1) {
			// 3轮奖励全部领完
			status = 3;
		} else if (Math.floor(this.num / (cfg.drawingLength*cfg.drawingLength)) > getCount) {
			// 上一轮还没有领
			status = 2;
		} else if (Math.floor(this.num / (cfg.drawingLength*cfg.drawingLength)) == getCount - 1) {
			// 当前轮已领
			status = 3;
		} else {
			// 当前轮不能领或能领

			let isOk = true;
			let condition = cfg.achievement[id - 1].condition;
			for (var i = 0; i < condition.length; i++) {
				var flowerId = condition[i];
				if (this.info[flowerId-1] == 0) {
					status = 1;
					isOk = false;
					break;
				}
			}
			if (isOk) {
				status = 2;
			}
		}
		return status;
	}

	//大宝箱状态是否已领取，true为已领取，false为未领取
	public getBigBoxOneGetted(index:number): boolean {
		let status = false;

		
		if (this.stageinfo && this.stageinfo[`bigPrize`] && this.stageinfo[`bigPrize`][index] == 1) {
			status = true;
		}
		return status;
	}
	//外面显示的大宝箱状态，0未空无可领，1有可领，2已空
	public getBigBoxStatus(): 0|1|2 {
		let status: 0|1|2 = 0;
		let allEmpty = true;// 全空
		for (var i = 0; i < this.cfg.bigPrize.length; i++) {
			var oneBig = this.cfg.bigPrize[i];
			let getted = this.getBigBoxOneGetted(i+1);
			if (!getted) {
				allEmpty = false;// 并非全空
				if (this.num >= oneBig.needValue) {
					// 可领
					status = 1;
					return status;
				}
			}
		}
		if (allEmpty) {
			status = 2;
		} else {
			status = 0;
		}
		return status;
	}

	public isFree(): boolean {
		return this.free > 0;
	}


	/**
 	* 获得充值奖励的配置
 	*/
	public getSortRechargeCfg(): Config.AcCfg.RyeHarvestRechargeItemCfg[] {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rechargeItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isGetRecharge(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			// else if (this.getChargeNum() >= rechargeData[i].needGem) {
			// 	rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
			// 	continue;
			// }
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;
	}
	/**任务完成度 */
	public getTaskFlag(dayId: string, taskId: string) {
		return this.task && this.task[dayId] && this.task[dayId][taskId] && this.task[dayId][taskId].flag && this.task[dayId][taskId].flag == 2 ? true : false;
	}
	/**任务进度 */
	public getTaskValue(dayId: string, taskType) {
		return this.task && this.task[dayId] && this.task[dayId][taskType] && this.task[dayId][taskType].v ? this.task[dayId][taskType].v : 0;
	}

	/**
 	* 获得Task列表
 	*/
	public getSortTaskCfg(dayId: string): Config.AcCfg.RyeHarvestDailyTaskItemCfg[] {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData: Config.AcCfg.RyeHarvestDailyTaskItemCfg[] = cfg.dailyTaskItemCfgList[dayId];
		for (let i = 0; i < taskData.length; i++) {
			if (this.getTaskFlag(dayId, taskData[i].questType)) {
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if (this.getTaskValue(dayId, taskData[i].questType) >= taskData[i].value) {
				taskData[i].sortId = (Number(taskData[i].id)) - taskData.length - 1;
				continue;
			}
			else {
				taskData[i].sortId = Number(taskData[i].id);
				continue;
			}
		}
		return taskData;
	}

	/**
	* 任务的小红点1
	*/
	public checTaskRedDot1() {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.dailyTaskItemCfgList["1"];
		if (rechargeData) {
			for (let i = 0; i < rechargeData.length; i++) {
				if ((!this.getTaskFlag("1", rechargeData[i].questType)) && this.getTaskValue("1", rechargeData[i].questType) >= rechargeData[i].value) {
					return true;
				}
			}
		}
		return false
	}
	/**
	* 任务的小红点1
	*/
	public checTaskRedDot2() {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.dailyTaskItemCfgList["2"];
		if (rechargeData) {
			for (let i = 0; i < rechargeData.length; i++) {
				if ((!this.getTaskFlag("2", rechargeData[i].questType)) && this.getTaskValue("2", rechargeData[i].questType) >= rechargeData[i].value) {
					return true;
				}
			}
		}
		return false
	}

	/**
	* 任务的小红点1
	*/
	public checTaskRedDot3() {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.dailyTaskItemCfgList["3"];
		if (rechargeData) {
			for (let i = 0; i < rechargeData.length; i++) {
				if ((!this.getTaskFlag("3", rechargeData[i].questType)) && this.getTaskValue("3", rechargeData[i].questType) >= rechargeData[i].value) {
					return true;
				}
			}
		}
		return false
	}
	/** 任务小红点 */
	public checTaskRedDot():boolean {
		for(let i in this.cfg.task){
			if (!this.isGetRecharge(Number(i) + 1) && this.getChargeNum(this.cfg.task[i].questType)>= this.cfg.task[i].value) {
				// 可领
				return true;
			}
		}
		return false;
	}
	/**当前第几天的任务开启 */
	public getNowDayTask() {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.checkIsInEndShowTime()) {
			let keys = Object.keys(cfg.dailyTaskItemCfgList);
			return keys[keys.length - 1];
		}
		let keys = Object.keys(this.task)
		return keys[keys.length - 1];
	}
	/**商品购买的数量 */
	public getShopValue(id: number) {
		return this.shop && this.shop[id] ? this.shop[id] : 0;
	}

	public sceneRedDot() {
		let cfg = <Config.AcCfg.RyeHarvestCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (cfg.exchangeScene && cfg.exchangeScene.needParts && cfg.exchangeScene.getReward) {
			let needPartsVo = GameData.formatRewardItem(cfg.exchangeScene.needParts)[0];
			let getRewardVo = GameData.formatRewardItem(cfg.exchangeScene.getReward)[0];
			if (needPartsVo && getRewardVo) {
				let scenesid = String(getRewardVo.id);
				let sceneName = "";
				if (String(scenesid)[0] == "1") {
					sceneName = "homeScene";
				}
				else if (String(scenesid)[0] == "2") {
					sceneName = "cityScene";
				}
				else if (String(scenesid)[0] == "3") {
					sceneName = "searchScene";
				}
				if (Api.itemVoApi.getItemNumInfoVoById(needPartsVo.id) >= needPartsVo.num) {
					return true;
				}
			}
		}

		return false;

	}

	public dispose(): void {
		this.selIdx = 0;
		this.info = [];// --献花情况25个元素
		this.taskinfo = {} //{v = 0,flags={}} --充值信息
		this.flags = {} //{v = 0,flags={}} --充值信息
		this.num = 0;// --献花次数
		this.free = 0;
		super.dispose();
	}
}