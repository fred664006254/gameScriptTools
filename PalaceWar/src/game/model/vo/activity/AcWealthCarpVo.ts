/**
 * 彩蛋Vo
 * @author 张朝阳
 * data 2019/3/12
 * @class AcWealthCarpVo
 */
class AcWealthCarpVo extends AcBaseVo {
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
	public isReceive(key: string): boolean {
		if (this.getFlag[key] && this.getFlag[key] == 1) {
			return true;
		}
		return false;
	}

	/**
	 * 获得充值奖励的配置
	 */
	public getSortRewards(): Config.AcCfg.WealthCarpRewardItemCfg[] {
		let cfg = <Config.AcCfg.WealthCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rewardItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.isReceive(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.chargeNum >= rechargeData[i].needGem) {
				rechargeData[i].sortId = (Number(rechargeData[i].id)) - rechargeData.length - 1;
				continue;
			}
			else {
				rechargeData[i].sortId = Number(rechargeData[i].id);
				continue;
			}
		}
		return rechargeData;


	}WealthCarpCfg
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		let cfg = <Config.AcCfg.WealthCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rewardItemListCfg;
		if (!rechargeData)
		{
			return false;
		}
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.chargeNum >= rechargeData[i].needGem && (!this.isReceive(rechargeData[i].id))) {
				return true;
			}
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