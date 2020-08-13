/**
  * 锦鲤奖励item
  * author 张朝阳
  * date 2019/2/12
  * @class AcLuckyCarpRewardScrollItem
  */
class AcLuckyCarpRewardScrollItem extends ScrollListItem {
	private _itemData: any = null;
	private _itemParm: any = null;
	public constructor() {
		super();
	}
	/**
	 * 初始化itemview
	 */
	public initItem(index: number, data: any, itemParm: any): void {
		let cfg = <Config.AcCfg.LuckyCarpCfg>Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);

		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 610;
		bg.height = 215;
		this.addChild(bg);

		if (index == 0 || (index + 1) == cfg.flag) {
			let titlebg = BaseLoadBitmap.create("acluckycarpitemtitilebg");
			titlebg.height = 49;
			titlebg.width = 612;
			this.addChild(titlebg);
			let titleStr: string = null;
			if (index == 0) {
				titleStr = LanguageManager.getlocal("acLuckyCarpViewItemTitle1-" + itemParm.code);
			}
			else {
				titleStr = LanguageManager.getlocal("acLuckyCarpViewItemTitle2-" + itemParm.code);
			}
			let titleTF = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
			titleTF.setPosition(titlebg.x + titlebg.width / 2 - titleTF.width / 2, titlebg.y - titleTF.height / 2 + 22);
			this.addChild(titleTF);
			bg.setPosition(1, 48);
		}
		else {
			bg.setPosition(1, 0);
		}

		let titlebg2 = BaseLoadBitmap.create("acmidautumnview_titlebg");
		titlebg2.width = 600;
		titlebg2.height = 35;
		titlebg2.setPosition(bg.x + bg.width / 2 - titlebg2.width / 2, bg.y + 7);
		this.addChild(titlebg2);

		let titleTF2 = ComponentManager.getTextField(LanguageManager.getlocal("acLuckyCarpViewItemTitleDesc" + String(index + 1) + "-" + + itemParm.code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF2.setPosition(titlebg2.x + titlebg2.width / 2 - titleTF2.width / 2, titlebg2.y + titlebg2.height / 2 - titleTF2.height / 2);
		this.addChild(titleTF2);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF2.width;
		itemTopLine.setPosition(titlebg2.x + titlebg2.width / 2 - itemTopLine.width / 2, titlebg2.y + titlebg2.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let npcBg = BaseBitmap.create("acluckycarpitembg");
		npcBg.setPosition(bg.x + 15, titlebg2.y + titlebg2.height + 5);
		this.addChild(npcBg);

		let npc = BaseLoadBitmap.create(data.picShowoff);
		let scale = 0;
		if (data.type == 1 || data.type == 3) {
			scale = 0.75;
			npc.width = 205;
			npc.height = 196;

		}
		else if (data.type == 2) {
			scale = 0.8;
			npc.width = 180;
			npc.height = 177;
		}
		npc.setScale(scale);
		npc.setPosition(npcBg.x + npcBg.width / 2 - npc.width * scale / 2, npcBg.y + npcBg.height - npc.height * scale);
		this.addChild(npc);

		let tipBM = BaseBitmap.create("acluckycarpitemreach")
		tipBM.setPosition(npcBg.x, npcBg.y - 2);
		this.addChild(tipBM);

		let rewardVo = GameData.formatRewardItem(data.getReward);
		for (let i = 0; i < rewardVo.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
			rewardDB.setScale(0.85);
			rewardDB.setPosition(npcBg.x + npcBg.width + 10 + i * (rewardDB.width * 0.85 + 10), npcBg.y + npcBg.height / 2 - rewardDB.height / 2);
			this.addChild(rewardDB);
		}
		if (data.unlockValue > 0) {
			bg.height = 245;
			let progress = ComponentManager.getProgressBar("progress7", "progress7_bg", 580);
			progress.setPosition(bg.x + bg.width / 2 - progress.width / 2, npcBg.y + npcBg.height + 2);
			this.addChild(progress);
			progress.setTextSize(17);
			progress.setText(LanguageManager.getlocal("acLuckyCarpViewItemProgress-" + itemParm.code, [String(itemParm.handleDate.totalCharge), String(data.unlockValue)]));
			progress.setPercentage(itemParm.handleDate.totalCharge / data.unlockValue);
			if (itemParm.handleDate.totalCharge < data.unlockValue) {
				tipBM.setRes("acluckycarpitemunreach");
				titlebg2.setload("acluckycarpview_titlebg");
			}

		}

		if (index == (cfg.flag - 2)) {
			this.height += 25;
		}

	}
	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {
		this._itemData = null;
		this._itemParm = null;
		super.dispose();
	}
}