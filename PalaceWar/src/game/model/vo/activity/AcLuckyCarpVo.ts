/**
 * 锦鲤Vo
 * @author 张朝阳
 * data 2019/2/11
 * @class AcLuckyCarpVo
 */
class AcLuckyCarpVo extends AcBaseVo {
	private chargeNum: number = 0;
	private getFlag: any = null;

	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}

	}
	/**个人充值进度 */
	public getChargeNum() {
		return this.chargeNum;
	}
	/**是否领取 */
	public isReceive(): boolean {
		if (this.getFlag["1"]) {
			return true;
		}
		return false;
	}
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		if (this.chargeNum >= this.config.rechargeReward.needGem) {
			return !this.isReceive();
		}
		return false;
	}
	/**
	 * 活动结束倒计时，格式：00：00：00
	 */
	public get acCountDown(): string {
		return App.DateUtil.getFormatBySecond((this.et - GameData.serverTime - 86400 * this.config.extraTime), 1);
	}
	public dispose(): void {
		this.chargeNum = 0;
		this.getFlag = null;
		super.dispose();
	}
}