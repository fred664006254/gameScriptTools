/**
 * 好礼相送VO
 */
class AcGiftReturnVo extends AcBaseVo {

	private task: any = null;

	public constructor() {
		super();
	}
	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}

	}

	public getChargeValue(): number {
		let cfg = <Config.AcCfg.GiftReturnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		return this.task && this.task.v && this.task.v[cfg.task.questType] ? this.task.v[cfg.task.questType] - this.getReceiveNum() * cfg.task.value : 0;
	}
	/**领取次数 */
	public getReceiveNum(): number {
		return this.task && this.task.flags && this.task.flags["1"] ? this.task.flags["1"] : 0;
	}

	public checkReceiveReward() {
		let cfg = <Config.AcCfg.GiftReturnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.getReceiveNum() < cfg.task.times) {
			if (this.getChargeValue() >= cfg.task.value) { 
				return true;
			}
		}
		return false;
	}

	public checkReceiveEndReward() {
		let cfg = <Config.AcCfg.GiftReturnCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (this.getReceiveNum() >= cfg.task.times) {
			return true;
		}
		return false;
	}
	/**
 	* 红点显示
 	*/
	public get isShowRedDot(): boolean {

		if (this.isStart == false) {
			return false;
		}
		return this.checkReceiveReward();
	}
	public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public dispose(): void {
		super.dispose();
	}
}