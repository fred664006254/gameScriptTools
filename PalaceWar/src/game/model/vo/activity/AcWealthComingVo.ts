/**
 * 财神驾到vo
 */
class AcWealthComingVo extends AcBaseVo {

	private freeTimes: any;
	private luckyNum: number;
	private rinfo: any;
	private luckyBuff: any;
	public constructor() {
		super();
	}
	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}
	/**是否免费 */
	public isFree() {
		if (this.freeTimes == 1) {
			return true;
		}
		return false;
	}
	/**是否拥有buff */
	public isHasWealethBuff() {
		if (this.luckyBuff == "cyht" || this.luckyBuff == "tjhc" || this.luckyBuff == "csjd") {
			return true;
		}
		return false;
	}
	/**是否拥有buff */
	public getWealethBuffType(): string {
		if (this.luckyBuff == "cyht") {
			return "3"
		}
		else if (this.luckyBuff == "tjhc") {
			return "2"
		}
		else if (this.luckyBuff == "csjd") {
			return "1"
		}
		return null;

	}
	/**财运次数 */
	public getLuckyValue() {
		if (this.luckyNum) {
			return this.luckyNum;
		}
		return 0;

	}
	/**是否进入第二阶段 */
	public isSecond() {
		if (this.luckyNum >= this.config.luckyProcess) {
			return true;
		}
		return false;
	}
	/**是否领取了这个档位 */
	public isReceiveReward(id: string) {
		if (this.rinfo[id]) {
			return true;
		}
		return false;
	}
	/**排序cfg */
	public getSortProcessCfg(): Config.AcCfg.RewardProcessItemCfg[] {
		let processCfg = this.getProcessCfg();
		for (let i = 0; i < processCfg.length; i++) {
			if (this.isReceiveReward(processCfg[i].id)) {
				processCfg[i].sortId = processCfg.length + Number(processCfg[i].id);
				continue;
			}
			else if (this.getLuckyValue() >= processCfg[i].value) {
				processCfg[i].sortId = (Number(processCfg[i].id)) - processCfg.length - 1;
				continue;
			}
			else {
				processCfg[i].sortId = Number(processCfg[i].id);
				continue;
			}
		}
		return processCfg;
	}
	/**
 * 任务奖励红点
 */
	public isHaveRedDot(): boolean {
		let processCfg = this.getProcessCfg();
		for (let i = 0; i < processCfg.length; i++) {
			if (this.getLuckyValue() >= processCfg[i].value) {
				if (!this.isReceiveReward(processCfg[i].id)) {
					return true;
				}
			}
		}
		return false;
	}
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		if (!this.checkIsInEndShowTime()) {
			if (this.isFree()) {
				return this.isFree();
			}
		}
		return this.isHaveRedDot();
	}
	/**
	 * 奖励进度的配置
	 */
	public getProcessCfg(): Config.AcCfg.RewardProcessItemCfg[] {
		let processCfg: Config.AcCfg.RewardProcessItemCfg[] = [];
		for (let i = 0; i < this.config.rewardProcessItemCfgList.length; i++) {
			if (this.luckyNum < this.config.luckyProcess && this.config.rewardProcessItemCfgList[i].value > this.config.luckyProcess) {
				break;
			}

			processCfg.push(this.config.rewardProcessItemCfgList[i]);
		}
		return processCfg;
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
	/**重新cfg */
	public get config(): Config.AcCfg.WealthComingCfg {
		return <Config.AcCfg.WealthComingCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	public dispose(): void {
		super.dispose();
	}
}