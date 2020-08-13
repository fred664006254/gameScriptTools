/**
 * 诸葛亮传活动VO
 */
class AcLiangBiographyVo extends AcBaseVo {

	/**首次免费 */
	private isfree: number;
	/**充值信息 */
	private rinfo: any;
	/**奖励领取情况 */
	private rewards: any;
	/**七星灯进度 */
	private num: number;
	public constructor() {
		super();
	}

	//  self.info[k].isfree = 1 --首次免费
	//         self.info[k].v = 0 --总七星灯数量
	//         self.info[k].rinfo = {v = 0,flags={}} --充值信息
	//         self.info[k].rewards = {}--奖励领取情况
	//         self.info[k].num = 0 --七星灯进度

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/**总七星灯数量 */
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
	/**七星灯进度 */
	public getNum() {
		return this.num;
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
	public getSortRechargeCfg(): Config.AcCfg.LiangBiographyRechargeItemCfg[] {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.liangBiographyRechargeItemCfgList;
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
		return this.isFree() || this.checkRechargeRedDot() || this.checkProgressRedDot() || this.checkHasNumRedDot();
	}
	/**可回顾次数 */
	public checkHasNumRedDot() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}
		if (this.getItemValue() > 0) {
			return true;
		}
		return false;
	}
	/**
	* 充值的小红点
	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.liangBiographyRechargeItemCfgList;
		if (!rechargeData)
		{
			return false;
		}
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
				return true;
			}
		}
		return false
	}

	/**
	* 进度的小红点
	*/
	public checkProgressRedDot() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.liangBiographyProcessingRewardItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getNum() >= rechargeData[i].reviewTime) {
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
		this.num = 0;
		super.dispose();
	}
}