/**
 * 云顶龙窟VO
 */
class AcYunDingLongKuVo extends AcBaseVo {
	private score: number = 0;
	private flag: any = 0;
	public constructor() {
		super();
	}

	public initData(data: any): void {
		for (let key in data) {
			this[key] = data[key];
		}

	}
	/**活动npc的ID */
	public getNpcId(): string {
		let cfg = <Config.AcCfg.YunDingLongKuCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let box = cfg.battleItemCfgList;
		for (let i = 0; i < box.length; i++) {
			if (this.score < box[i].killPoint) {
				return box[i].id;
			}
		}
		return null;
	}
	/**分数 */
	public getScore(): number {
		return this.score;
	}
	/** 是否第一次进游戏 */
	public isFriestLogin() {
		if (this.flag.init) {
			return false;
		}
		return true;
	}
	/**宝箱领取状态 */
	public getBoxFlag(boxId: string) {
		if (this.flag[boxId]) {
			return true;
		}
		return false;
	}
	/**NpcBM */
	public getNpcBM(id: string): string {
		switch (id) {
			case "1":
				return "searchnpc_full32";
			case "2":
				return "searchnpc_full82";
			case "3":
				return "searchnpc_full92";
			case "4":
				return "story_npc_9";
			case "5":
				return "wife_full_220";
		}
	}
	/**npcName */
	public getNpcName(id: string): string {
		switch (id) {
			case "1":
				if (this.code == 1) {
					return LanguageManager.getlocal("acMarryViewNpcName1");
				}
				return LanguageManager.getlocal("acMarryViewNpcName1-" + this.code);
			case "2":
				if (this.code == 1) {
					return LanguageManager.getlocal("acMarryViewNpcName2");
				}
				return LanguageManager.getlocal("acMarryViewNpcName2-" + this.code);
			case "3":
				if (this.code == 1) {
					return LanguageManager.getlocal("acMarryViewNpcName3");
				}
				return LanguageManager.getlocal("acMarryViewNpcName3-" + this.code);
			case "4":
				if (this.code == 1) {
					return LanguageManager.getlocal("acMarryViewNpcName4");
				}
				return LanguageManager.getlocal("acMarryViewNpcName4-" + this.code);
			case "5":
				return LanguageManager.getlocal("wifeName_220");
		}
	}
	/**
	 * 红点显示
	 */
	public get isShowRedDot(): boolean {
		if (this.isStart == false) {
			return false;
		}
		return this.isHaveBoxDot();
	}
	/**
	 * 宝箱的红点
	 */
	public isHaveBoxDot(): boolean {
		let cfg = <Config.AcCfg.YunDingLongKuCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		if (!cfg) {
			return false;
		}
		for (let i = 0; i < cfg.battleItemCfgList.length; i++) {
			if (this.getScore() >= cfg.battleItemCfgList[i].killPoint) {
				if (!this.getBoxFlag(cfg.battleItemCfgList[i].id)) {
					return true;
				}
			}
		}
		return false;
	}

	public dispose(): void {
		super.dispose();
	}
}