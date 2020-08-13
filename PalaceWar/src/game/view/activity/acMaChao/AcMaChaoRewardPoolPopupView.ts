/**
 * 马超活动奖池
 * @author 张朝阳
 * date 2019/1/15
 * @class AcMaChaoRewardPoolPopupView
 */
class AcMaChaoRewardPoolPopupView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.MaChaoCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let rewards = cfg.getRewardPool();
		let rewardVo = GameData.formatRewardItem(rewards);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 525;
		bg.height = Math.round(rewardVo.length / 4) * 130 + 55;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let topTF = ComponentManager.getTextField(LanguageManager.getlocal("acMaChaoRewardPoolPopupViewTopDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		topTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTF.width / 2, bg.y + 24 - topTF.height / 2);
		this.addChildToContainer(topTF);

		let rewardbg = BaseBitmap.create("public_9_probiginnerbg");
		rewardbg.width = 510;
		rewardbg.height = Math.round(rewardVo.length / 4) * 130;
		rewardbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardbg.width / 2, topTF.y + topTF.height + 5);
		this.addChildToContainer(rewardbg);

		for (let i = 0; i < rewardVo.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
			rewardDB.setPosition(rewardbg.x + 16 + ((rewardDB.width + 16) * (i % 4)), rewardbg.y + 20 + ((rewardDB.height + 18) * Math.floor(i / 4)))
			this.addChildToContainer(rewardDB)
		}

		let confirmBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "sysConfirm", this.hide, this)
		confirmBtn.setPosition(this.viewBg.x + this.viewBg.width / 2 - confirmBtn.width / 2, bg.y + bg.height + 10);
		this.addChildToContainer(confirmBtn);


	}
	protected getTitleStr(): string {
		return "acMaChaoRewardPoolPopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		super.dispose();
	}
}