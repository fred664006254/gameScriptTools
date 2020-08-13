/**
 * 花魁活动VO
 */
class AcBeautyVoteVo extends AcBaseVo {

	private binfo: any = null;

	private cinfo: any = null;

	private flowers: number = 0;

	private shopscore: number = 0;

	private vote: any = null;

	private buytimes: number = 0;
	public constructor() {
		super();
	}

	// 	aid: "beautyVote"
	// binfo: {}
	// cinfo:
	// flags: {}
	// v: 0
	// __proto__: Object
	// code: 1
	// et: 1556892000
	// flowers: 0
	// shopscore: 0
	// st: 1556208000
	// vote:
	// 1: (2) [0, 0]

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/**充值的金额 */
	public getRechanrgeValue() {
		return this.cinfo.v;
	}

	/**鲜花数量 */
	public getFlowersValue() {
		return this.flowers;
	}
	/**商店积分 */
	public getShopScoreValue() {
		return this.shopscore;
	}
	/**购买的次数 */
	public getBuyTimes() {
		return this.buytimes;
	}
	/**积分购买的数量 */
	public getBuyLimit(id: number) {
		return this.binfo[id] ? this.binfo[id] : 0;
	}
	/**活动当轮的鲜花数量 */
	public getSingleRoundFlowers(roundId: number): { letfValue: number, rightValue: number } {

		return { letfValue: this.vote[roundId][0], rightValue: this.vote[roundId][1] }
	}
	/**获得单轮的活动日期 */
	public getSingleRoundAcTimeAndHour(roundId: number) {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let roundCfg = cfg.getSingleScheduleTimeforId(roundId);
		let et = this.st + roundCfg.endTime;
		let st = this.st + roundCfg.startTime;
		return App.DateUtil.getOpenLocalTime(st, et, true);
	}
	/**获得单轮的活动日期 */
	public getSingleRoundAcCountDown(roundId: number) {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let roundCfg = cfg.getSingleScheduleTimeforId(roundId);
		let et = this.st + roundCfg.endTime;
		let st = this.st + roundCfg.startTime;
		let timeStr: string = null;
		if (GameData.serverTime > et) {
			timeStr = LanguageManager.getlocal("acBeautyVoteViewTab1AcTimeEnd-" + this.code);
		}
		else {
			timeStr = LanguageManager.getlocal("acBeautyVoteViewTab1AcTime-" + this.code, [App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1)]);
		}
		return timeStr;
	}
	/**是否已结束 */
	public checkSingleRoundAcTime(roundId: number): boolean {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let roundCfg = cfg.getSingleScheduleTimeforId(roundId);
		let et = this.st + roundCfg.endTime;
		let st = this.st + roundCfg.startTime;
		if (GameData.serverTime >= st && GameData.serverTime <= et) {
			return true;
		}
		return false;
	}

	/**
  	* 获得充值奖励的配置
  	*/
	public getSortRechargeCfg(): Config.AcCfg.BeautyVoteRechargeItemCfg[] {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.beautyVoteRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkRechargeFlag(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getRechanrgeValue() >= rechargeData[i].needGem) {
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
	/**是否领取了 */
	public checkRechargeFlag(id: number) {
		if (this.cinfo.flags[id]) {
			return true;
		}
		return false;
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
	/**小红点 */
	public get isShowRedDot(): boolean {
		return this.checkFlowers() || this.checkRechargeRedDot() || this.checkScore();
	}
	/**
 	* 充值的小红点
 	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.beautyVoteRechargeItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRechargeFlag(rechargeData[i].id)) && this.getRechanrgeValue() >= rechargeData[i].needGem) {
				return true;
			}
		}
		return false
	}
	/**是否有鲜花 */
	public checkFlowers() {
		if (this.getFlowersValue() > 0) {
			return true;
		}
		return false;
	}
	/**分数 */
	public checkScore() {
		let cfg = <Config.AcCfg.BeautyVoteCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.beautyVoteScoreMarketItemCfgList;
		if (this.getShopScoreValue() >= rechargeData[rechargeData.length - 1].costScore) {
			return true;
		}
		return false;
	}
	public dispose(): void {
		this.binfo = null;
		this.cinfo = null;
		this.flowers = 0;
		this.shopscore = 0;
		this.vote = null;
		this.buytimes = 0;
		super.dispose();
	}
}