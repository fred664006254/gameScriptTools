/**
 * 搜查魏府 奖池
 * author 张朝阳
 * date 2019/6/24
 * @class AcSearchProofRewardsPoolPopupView
 */
class AcSearchProofRewardsPoolPopupView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.SearchProofCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let topTF = ComponentManager.getTextField(LanguageManager.getlocal("acSearchProofRewardsPoolPopupViewTopDesc-" + code), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
		topTF.setPosition(this.viewBg.x + this.viewBg.width / 2 - topTF.width / 2, 15);
		this.addChildToContainer(topTF);

		let rewards = cfg.rewardPoolList();
		let rewardVo = GameData.formatRewardItem(rewards);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 525;
		bg.height = Math.round(rewardVo.length / 4) * 130 + 20;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, topTF.y + topTF.height + 10);
		this.addChildToContainer(bg);

		for (let i = 0; i < rewardVo.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVo[i], true, true);
			rewardDB.setPosition(bg.x + 20 + ((rewardDB.width + 18) * (i % 4)), bg.y + 20 + ((rewardDB.height + 18) * Math.floor(i / 4)))
			this.addChildToContainer(rewardDB)
		}




	}
	protected getTitleStr(): string {
		return "acSearchProofRewardsPoolPopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		super.dispose();
	}
}