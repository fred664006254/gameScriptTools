/**
 * 搜查魏府 VO
 */
class AcSearchProofVo extends AcBaseVo {

	private isfree: number = 0;

	private rinfo: any = null;

	private rewards: any = null;

	private num: number = 0;

	private perNum: number = 0;

	public constructor() {
		super();
	}
	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}

	}
	/**check free time */
	public isFree() {
		if (this.isfree == 1) {
			return true;
		}
		return false;
	}

	/** 道具数量 */
	public getItemValue() {
		return this.v;
	}

	public getnum() {
		return this.num;
	}

	/**charge value */
	public getChargeValue() {
		return this.rinfo && this.rinfo.v ? this.rinfo.v : 0;
	}
	/**charge flag for id */
	public getChargeFlag(chargeid: string) {
		return this.rinfo && this.rinfo.flags[chargeid] ? true : false;
	}


	/**
	 * 获得charge列表
	 */
	public getSortRecharge(): Config.AcCfg.SearchProofRechargeItemCfg[] {
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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


	/** 是否领过进度奖励了 */
	public checkRewardFlag(id: number) {
		if (this.rewards[id]) {
			return true;
		}
		return false;
	}

	/**
	* 获得进度奖励的配置
	*/
	public getSortAchievementCfg(): Config.AcCfg.SearchProofAchievementItemCfg[] {
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.achievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if (this.checkRewardFlag(rechargeData[i].id)) {
				rechargeData[i].sortId = rechargeData.length + Number(rechargeData[i].id);
				continue;
			}
			else if (this.getnum() >= rechargeData[i].needNum) {
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

	/**进度奖励的小红点 */
	public checkAchievementRedDot() {
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.achievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getnum() >= rechargeData[i].needNum) {
				return true;
			}
		}
		return false
	}

	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {

		if (this.isStart == false) {
			return false;
		}
		return this.checkGameRedDot() || this.checkRechargeRedDot() || this.checkAchievementRedDot() || this.checkSkinRedDot();
	}

	public checkGameRedDot() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}

		return this.isFree();
	}

	/**
	* 充值的小红点
	*/
	public checkRechargeRedDot() {
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.rechargeItemListCfg;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.getChargeFlag(rechargeData[i].id)) && this.getChargeValue() >= rechargeData[i].needGem) {
				return true;
			}
		}
		return false
	}

	/**
	* 充值的小红点
	*/
	public checkSkinRedDot() {
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rewardsVo = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];
		let rewardsVo2 = GameData.formatRewardItem(cfg.itemExchange[0].getReward)[0];
		let rewardsVo3 = GameData.formatRewardItem(cfg.itemExchange[1].costProof)[0];
		let proofNum = Api.itemVoApi.getItemNumInfoVoById(GameData.formatRewardItem(cfg.mustGet2)[0].id);

		if (Api.itemVoApi.getItemInfoVoById(rewardsVo2.id) || Api.servantVoApi.isOwnSkinOfSkinId(String(cfg.show))) {
			let skincfg = Config.ServantskinCfg.getServantSkinItemById(String(cfg.show));
			if (!skincfg.canExchangeItem()) {
				if (proofNum >= rewardsVo3.num) {
					return true;
				}
			}
			else {
				if (proofNum >= rewardsVo.num) {
					return true;
				}
			}
		}
		else {
			if (proofNum >= rewardsVo.num) {
				return true;
			}
		}
		return false
	}


	public get acCountDown(): string {
		let et = this.et - this.config.extraTime * 86400;
		if (et < GameData.serverTime) {
			return LanguageManager.getlocal("acPunishEnd");
		}
		return App.DateUtil.getFormatBySecond((et - GameData.serverTime), 1);
	}
	public dispose(): void {
		this.isfree = 0;

		super.dispose();
	}
}