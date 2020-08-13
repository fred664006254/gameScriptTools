class AcSmashEggVo extends AcBaseVo {

	private isfree: number = 0;

	private rewards: any = null;

	private num: number = 0;

	//蛋池信息 0银蛋 1金蛋
	public info: any[] = null;

	//蛋的状态 0未开 1已开
	public egginfo: any[] = null;

	public egglog: any = null;

	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}
	}


	/**
	* 获得进度奖励的配置
	*/
	public getSortAchievementCfg(): Config.AcCfg.SmashEggAchievementItemCfg[] {
		let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
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

	/** 是否领过进度奖励了 */
	public checkRewardFlag(id: number) {
		if (this.rewards[id]) {
			return true;
		}
		return false;
	}

	public getnum() {
		return this.num;
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

	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {

		if (this.isStart == false) {
			return false;
		}
		return this.checkGameRedDot() || this.checkAchievementRedDot() || this.checkSkinRedDot() || this.checkHaveHammerRedDot();
	}

	public checkGameRedDot() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}

		return this.isFree();
	}

	public checkHaveHammerRedDot() {
		if (this.checkIsInEndShowTime()) {
			return false;
		}
		let hasNum: number = Api.itemVoApi.getItemNumInfoVoById(this.cfg.useItem);
		if (hasNum && hasNum > 0) {
			return true;
		}
		return false;
	}


	/**
	* 皮肤红点
	*/
	public checkSkinRedDot() {
		let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rewardsVo = GameData.formatRewardItem(cfg.itemExchange[0].costProof)[0];
		let rewardsVo2 = GameData.formatRewardItem(cfg.itemExchange[0].getReward)[0];
		let rewardsVo3 = GameData.formatRewardItem(cfg.itemExchange[1].costProof)[0];
		let proofNum = Api.itemVoApi.getItemNumInfoVoById(rewardsVo.id);

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

	/**进度奖励的小红点 */
	public checkAchievementRedDot() {
		let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let rechargeData = cfg.achievementItemCfgList;
		for (let i = 0; i < rechargeData.length; i++) {
			if ((!this.checkRewardFlag(rechargeData[i].id)) && this.getnum() >= rechargeData[i].needNum) {
				return true;
			}
		}
		return false
	}

	public getSortEggRewardCfgList(): any[] {
		let eggRewardList = [];
		let normalEgg = this.cfg.normalEgg;
		let normalStr = ''
		for (let i = 0; i < normalEgg.length; i++) {
			const element = normalEgg[i];
			let str = element[0];
			if (typeof (str) != 'string') {
				str = element[1];
			}
			normalStr += str + '|';
		}
		normalStr = normalStr.substring(0, normalStr.length - 1);

		let goldenEgg = this.cfg.goldenEgg;
		let goldenStr = ''
		for (let i = 0; i < goldenEgg.length; i++) {
			const element = goldenEgg[i];
			let str = element[0];
			if (typeof (str) != 'string') {
				str = element[1];
			}
			goldenStr += str + '|';
		}
		goldenStr = goldenStr.substring(0, goldenStr.length - 1);

		eggRewardList.push(goldenStr);
		eggRewardList.push(normalStr);


		// let data = this.cfg.getMoonCakeList();
		// data.sort((a, b) => {return a.itemId - b.itemId});
		// return data;
		return eggRewardList;
	}

	public getSkinNeedItemNum(): number {
		return GameData.formatRewardItem(this.cfg.itemExchange[0].costProof)[0].num
	}

	public getCountDown(): number {
		let num = 0;
		if (this.isInActivity()) {
			num = this.et - this.cfg.extraTime * 86400 - GameData.serverTime;
		}
		else {
			num = 0;
		}
		return num;
	}




	private get cfg(): Config.AcCfg.SmashEggCfg {
		return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}



	//活动兑换
	public getpublicRedhot4(): boolean {
		//任务
		let cfg = this.cfg;
		if (!cfg) {
			return false;
		}
		// for(let i in cfg.claim){
		// 	let unit = <Config.AcCfg.DWClaimItemCfg>cfg.claim[i];
		// 	let claimNum = this.getClaim(unit.id);
		// 	if (unit.limit && claimNum>=unit.limit)
		// 	{
		// 		continue;
		// 	}
		// 	let need1=0,need2=0,need3=0;
		// 	if (unit.costZongZi)
		// 	{
		// 		need1 = unit.costZongZi;
		// 	}
		// 	if (unit.costDaGao)
		// 	{
		// 		need2 = unit.costDaGao;
		// 	}
		// 	if (unit.costXiongHuang)
		// 	{
		// 		need3 = unit.costXiongHuang;
		// 	}
		// 	if (this.getActivityItem(1)>=need1 && this.getActivityItem(2)>=need2 && this.getActivityItem(3)>=need3)
		// 	{
		// 		return true;
		// 	}
		// }
		return false;
	}





	public get acTimeAndHour(): string {
		let et = this.et - 86400 * this.cfg.extraTime;
		return App.DateUtil.getOpenLocalTime(this.st, et, true);
	}

	public isInActivity(): boolean {
		return GameData.serverTime >= this.st && GameData.serverTime < this.et - 86400 * this.cfg.extraTime;
	}


	public dispose(): void {
		this.isfree = 0;
		this.rewards = null;
		this.num = 0;
		this.info = null;
		this.egginfo = null;
		this.egglog = null;
	}
}