/**
 * 电玩大本营VO
 */
class AcArcadeVo extends AcBaseVo {

	private charge: any = null;
	private coin: number = 0;

	private isfree: number = 0;

	private lottery: any = null;

	private score: number = 0;

	private shop: any = null;

	private task: any = null;

	private seewinnum: number = 0;
	private gap: number = 0;
	private cinfo: { gem: number, num: number, st: number }[] = [];

	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}

	//总拉杆次数
	public getTotalTimes() {
		let num = 0;
		let cinfo = this.cinfo;
		for (var key in cinfo) {
			if (cinfo.hasOwnProperty(key)) {
				num += cinfo[key].num;
			}
		}
		return num;
	}
	/**check free time */
	public isFree() {
		if (this.isfree == 1) {
			return true;
		}
		return false;
	}
	/**get shop number */
	public getShopBuyNumById(id: string) {
		return this.shop[id] ? this.shop[id] : 0;
	}
	/** get game coin time */
	public getCoin() {
		return this.coin;
	}
	/** score */
	public getScore() {
		return this.score;
	}
	public lotteryValue() {
		return this.lottery.v ? this.lottery.v : 0;
	}
	/**charge value */
	public getChargeValue() {
		return this.charge && this.charge.v ? this.charge.v : 0;
	}
	/**charge flag for id */
	public getChargeFlag(chargeid: string) {
		return this.charge && this.charge.flags[chargeid] ? true : false;
	}
	/**task value for task type */
	public getTaskValue(taskType) {
		return this.task && this.task.v[taskType] ? this.task.v[taskType] : 0;
	}
	/**task flag for task id */
	public getTaskFlag(taskId: string) {
		return this.task && this.task.flags[taskId] ? true : false;
	}
	/**
	 * 获得Task列表
	 */
	public getSortTask(): Config.AcCfg.ArcadeTaskItemCfg[] {
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let taskData = cfg.taskItemListCfg;
		for (let i = 0; i < taskData.length; i++) {
			if (this.getTaskFlag(taskData[i].id)) {
				taskData[i].sortId = taskData.length + Number(taskData[i].id);
				continue;
			}
			else if (this.getTaskValue(taskData[i].questType) >= taskData[i].value) {
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
	 * 获得Task列表
	 */
	public getSortRecharge(): Config.AcCfg.ArcadeRechargeItemCfg[] {
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let chargeData = cfg.rechargeItemListCfg;
		for (let i = 0; i < chargeData.length; i++) {
			if (this.getChargeFlag(chargeData[i].id)) {
				chargeData[i].sortId = chargeData.length + Number(chargeData[i].id);
				continue;
			}
			else if (this.getChargeValue() >= chargeData[i].needGem) {
				chargeData[i].sortId = (Number(chargeData[i].id)) - chargeData.length - 1;
				continue;
			}
			else {
				chargeData[i].sortId = Number(chargeData[i].id);
				continue;
			}
		}
		return chargeData;
	}

	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {

		if (this.isStart == false) {
			return false;
		}
		return this.checkGameRedDot() || this.checkRechargeRedDot() || this.checTaskRedDot() || this.checkScoreRedDot();
	}

	public checkGameRedDot() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}

		return this.isFree() || this.getCoin() > 0;
	}

	/**
	* 充值的小红点
	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rechargeItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.getChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
				return true;
			}
		}
		return false
	}

	/**
	* 任务的小红点
	*/
	public checTaskRedDot() {
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.taskItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.getTaskFlag(rechargeData[i].id)) && this.getTaskValue(rechargeData[i].questType) >= rechargeData[i].value) {
				return true;
			}
		}
		return false
	}

	/**
	* 任务的小红点
	*/
	public checkScoreRedDot() {
		if (this.getScore() > 0) {
			return true;
		}
		return false
	}

	public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 8);
	}
	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et;
	}
	public isInExtra(): boolean {
		if (this.isInActivity()&&this.config) {
			let extraTime = this.config.extraTime;
			if (extraTime) {
				return GameData.serverTime > this.et - 86400 * extraTime
			}
		}
		return false
	}
	
	public dispose(): void {
		this.charge = null;
		this.coin = 0;
		this.isfree = 0;
		this.lottery = null;
		this.score = 0;
		this.shop = null;
		this.task = null;
		super.dispose();
	}
}