/**
 * 筑阁祭天活动VO
 */
class AcWorshipVo extends AcBaseVo {

	/**首次免费 */
	private isfree: number;
	/**充值信息 */
	private rinfo: any;
	/**奖励领取情况 */
	private rewards: any;
	public constructor() {
		super();
	}

	//  self.info[k].isfree = 1 --首次免费
	//             self.info[k].v = 0 --建筑进度
	//             self.info[k].rinfo = {v = 0,flags={}} --充值信息
	//             self.info[k].rewards = {}--进度奖励领取情况

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/** 建筑进度 */
	public getItemValue(): number {
		return this.v;
	}
	/**首次免费 */
	public isFree() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}
		if (this.isfree == 1) {
			return true;
		}
		return false;
	}

	/**充值进度 */
	public getChargeValue(): number {
		return this.rinfo.v;
	}
	/**是否领过奖励了 */
	public checkRechargeFlag(id: number) {
		if (this.rinfo.flags[id]) {
			return true;
		}
		return false;
	}

	/** 是否领过进度奖励了 */
	public checkRewardFlag(id: number) {
		if (this.rewards[id]) {
			return true;
		}
		return false;
	}

	/**
	* 获得充值奖励的配置
	*/
	public getSortRechargeCfg(): Config.AcCfg.WorshipRechargeItemCfg[] {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.worshipRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkRechargeFlag(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getChargeValue() >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;
	}

	/**
	* 获得进度奖励的配置
	*/
	public getSortAchievementCfg(): Config.AcCfg.WorshipAchievementItemCfg[] {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.worshipAchievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkRewardFlag(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getItemValue() >= rechargeData[i].needNum) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;
	}
	// /**是否领取了 */
	// public checkRechargeFlag(id: number) {
	// 	if (this.cinfo.flags[id]) {
	// 		return true;
	// 	}
	// 	return false;
	// }
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	/**小红点 */
	public get isShowRedDot(): boolean {
		return this.isFree() || this.checkRechargeRedDot() || this.checkAchievementRedDot();
	}
	/**
	* 充值的小红点
	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.worshipRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
				return true;
			}
		}
		return false
	}
	/**进度奖励的小红点 */
	public checkAchievementRedDot() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.worshipAchievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getItemValue() >= rechargeData[i].needNum) {
				return true;
			}
		}
		return false
	}

	public dispose(): void {
		this.isfree = 0;
		this.v = 0;
		this.rinfo = null;;
		this.rewards = null;
		super.dispose();
	}
}