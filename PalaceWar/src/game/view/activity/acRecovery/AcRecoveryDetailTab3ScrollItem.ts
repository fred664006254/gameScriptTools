/**
 * 奖池Item
 * author ycg
 * date 2020.2.26
 * @class AcRecoveryDetailTab3ScrollItem
 */
class AcRecoveryDetailTab3ScrollItem extends ScrollListItem {
	private aid:string = null;
	private code:string = null;
	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam: any): void {
		let aid = itemParam.aid;
		let code = itemParam.code;
		this.aid = aid;
		this.code = code;

		this.width = 530;
		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 524;
		bg.height = 240;
		bg.x = 3;
		this.addChild(bg);

		let bgFlagName = ResourceManager.hasRes("acrecovery_pooitemicon"+(index+1)+"-"+this.getTypeCode()) ? "acrecovery_pooitemicon"+(index+1)+"-"+this.getTypeCode() : "acrecovery_pooitemicon"+(index+1)+"-1";
		let bgFlag = BaseBitmap.create(bgFlagName);
		bgFlag.setPosition(bg.x + 13, bg.y + bg.height/2 - bgFlag.height/2);
		this.addChild(bgFlag);

		let rewardVoList = GameData.formatRewardItem(data.rewards);
		let scale = 0.85;
		let itemHeight = 0;
		let rewardbg = BaseBitmap.create("public_9_managebg");
        rewardbg.width = 310;
        rewardbg.height = 210;
		rewardbg.setPosition(bg.x + bg.width - rewardbg.width - 10, bg.y + bg.height/2 - rewardbg.height/2);
		this.addChild(rewardbg);
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(rewardbg.x + 9 + ((rewardDB.width - 8) * (i % 3)), rewardbg.y + 9 + ((rewardDB.height - 8) * Math.floor(i / 3)))
			this.addChild(rewardDB);
			itemHeight = rewardDB.height;
		}
		// rewardbg.height = (rewardVoList.length % 3 == 0 ? rewardVoList.length / 3 : Math.floor(rewardVoList.length / 3) + 1) * itemHeight;
		this.height = bg.height;
		
	}

	public getTypeCode():string{
		if (this.code == "2"){
			return "1";
		}
		return this.code;
	}

	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this.aid = null;
		this.code = null;
		super.dispose();
	}
}