/**
 * 财运奖励Item
 * author hyd
 * date 2019/9/4
 * @class AcSmashEggAchievementScrollItem
 */
class AcSmashEggAchievementScrollItem extends ScrollListItem {

	public constructor() {
		super();
	}

	public initItem(index: number, data: any, itemParam: any): void {
		// getReward
		// value
		//id
		let aid = itemParam.aid;
		let code = itemParam.code;
		let id = itemParam.id;
		let vo = <AcSmashEggVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		let cfg = <Config.AcCfg.SmashEggCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		this.width = 530;
		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 524;
		bg.height = 140;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 508;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggAchievementPopupViewItemTitle-" + code, [String(data.needNum)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let scale = 0.85;
		let itemHeight = 0;
		let rewardbg = BaseBitmap.create("public_9_managebg");
		rewardbg.width = 502;
		rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 3);
		this.addChild(rewardbg);
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)))
			this.addChild(rewardDB);
			itemHeight = rewardDB.height;
		}
		rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		bg.height += rewardbg.height;

		let progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 375);
		progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 32);
		this.addChild(progressBar);
		let percent = vo.getnum() / data.needNum;
		let textStr = vo.getnum() + "/" + data.needNum;
		let textColor = TextFieldConst.COLOR_WHITE;
		progressBar.setPercentage(percent, textStr, textColor);
		progressBar.scaleX = 0.95;

		let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSmashEggAchievementPopupViewItemProgress-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		titelTxt.setPosition(progressBar.x + progressBar.width*progressBar.scaleX / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
		this.addChild(titelTxt);

		if (vo.checkRewardFlag(data.id)) {
			let flagScale = 0.6;
			let flag = BaseBitmap.create("collectflag");
			flag.setScale(flagScale);
			flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
			this.addChild(flag);
		}
		else {
			let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', () => {
				if (!vo.isStart) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				NetManager.request(NetRequestConst.REQUEST_ACTIVITY_SMASHEGG_GETREWARD, { activeId: vo.aidAndCode, rkey: data.id });
			}, this);
			receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 10, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
			this.addChild(receiveBtn);
			if (vo.getnum() >= data.needNum) {
				receiveBtn.setEnable(true);
			}
			else {
				receiveBtn.setEnable(false);
			}
		}
		this.height = bg.height;
		if (id == data.id) {
			let light = BaseBitmap.create("public_9_bg57")
			light.width = bg.width + 10;
			light.height = bg.height + 14;
			light.setPosition(bg.x - 6, bg.y - 6);
			this.addChild(light);
			egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		}
	}



	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}