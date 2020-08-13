/**
 * 投壶活动VO
 */
class AcThrowArrowVo extends AcBaseVo {

	private isfree: number;

	private coin: number;

	private charge: any;

	private lottery: any;

	public showRewardId:number = 0;

	public constructor() {
		super();
	}
	public initData(data: any): void {
		// 		aid: "throwArrow"
		// charge: {v: 0, flags: {…}}
		// code: 1
		// coin: 0
		// et: 1608787380
		// isfree: 1
		// lottery: {v: 0, flags: {…}}
		// st: 1554066420
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/**是否免费 */
	public isFree(): boolean {
		if (this.isfree == 1) {
			return true;
		}
		return false;
	}
	/**剩余抽奖次数 */
	public getCoin(): number {
		return this.coin;
	}
	/**充值进度 */
	public getChargeValue(): number {
		return this.charge.v;
	}
	/**
	 * 奖励是否领取了
	 */
	public checkChargeFlag(id: number): boolean {
		if (this.charge.flags[id] && this.charge.flags[id] == 1) {
			return true;
		}
		return false;
	}
	/**抽签进度 */
	public getLotteryValue(): number {
		return this.lottery.v;
	}
	/**
	 * 抽奖奖励是否领取了
	 */
	public checkLotteryFlag(id: number): boolean {
		if (this.lottery.flags[id] && this.lottery.flags[id] == 1) {
			return true;
		}
		return false;
	}

	/**
 	* 获得充值奖励的配置
 	*/
	public getSortRechargeCfg(): Config.AcCfg.ThrowArrowRechargeItemCfg[] {
		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.throwArrowRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkChargeFlag(rechargeData[i].id)) {
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
  	* 获得抽奖奖励的配置
  	*/
	public getSortAchievementCfg(): Config.AcCfg.ThrowArrowAchievementItemCfg[] {
		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.throwArrowAchievementItemCfgList;
		rechargeData.sort((a, b) => { return a.sortId - b.sortId });

		let array1 = [];
		let array2 = [];
		let array3 = [];

		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkLotteryFlag(rechargeData[i].id)) {
				array3.push(rechargeData[i]);
				continue;
			}
			else if (this.getLotteryValue() >= rechargeData[i].needNum) {
				array1.push(rechargeData[i]);
				continue;
			}
			else {
				array2.push(rechargeData[i]);
			}
		}
		return array1.concat(array2).concat(array3);
	}

	/**
	 * 充值的小红点
	 */
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.throwArrowRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
				return true;
			}

		}
		return false
	}
	/**
	 * 宝箱的小红点
	 */
	public checkLotteryRedDot() {
		let cfg = <Config.AcCfg.ThrowArrowCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.throwArrowAchievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkLotteryFlag(rechargeData[i].id)) && this.getLotteryValue() >= rechargeData[i].needNum) {
				return true;
			}

		}
		return false
	}
	/**
	 * 是否有票
	 */
	public checkCoinRetDot() {
		if (this.getCoin() > 0) {
			return true;
		}
		return false;
	}
	public get isShowRedDot(): boolean {
		if (!this.checkIsInEndShowTime()) {
			if (this.isFree() || this.checkCoinRetDot()) {
				return true;
			}
		}
		return this.checkLotteryRedDot() || this.checkRechargeRedDot();
	}
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
	public dispose(): void {
		this.showRewardId = 0;

		super.dispose();
	}
}