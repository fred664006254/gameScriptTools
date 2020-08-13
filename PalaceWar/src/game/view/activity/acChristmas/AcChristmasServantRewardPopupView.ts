/**
 * 	欢乐沙塔 门客
 * author 张朝阳
 * date 2018/3/5
 * @class AcChristmasServantRewardPopupView
 */
class AcChristmasServantRewardPopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;

	protected initView(): void {
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;

		let acCfg = <Config.AcCfg.ChristmasCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let servantCfg = Config.ServantCfg.getServantItemById(acCfg.skin);

		let bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
		bg.width = 544;
		bg.height = 400;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 0);
		this.addChildToContainer(bg);


		let rect = new egret.Rectangle(0, 0, 544, 364);
		let maskContan = new BaseDisplayObjectContainer();
		maskContan.width = 544;
		maskContan.height = 364;
		maskContan.mask = rect;
		maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
		this.addChildToContainer(maskContan);


		let skinImg = BaseLoadBitmap.create(servantCfg.fullIcon);
		skinImg.width = 405;
		skinImg.height = 467;
		skinImg.anchorOffsetY = skinImg.height;
		skinImg.anchorOffsetX = skinImg.width / 2;
		skinImg.setScale(0.87);
		skinImg.x = maskContan.width / 2;
		skinImg.y = maskContan.y + maskContan.height  + 25;
		maskContan.addChild(skinImg);

		let topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
		topbg.width = 544;
		topbg.height = 36;
		topbg.setPosition(this.viewBg.x + this.viewBg.width / 2 - topbg.width / 2, 0);
		this.addChildToContainer(topbg);

		let topDesc = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasBigRewardPopupViewTopDesc_" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
		topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2);
		this.addChildToContainer(topDesc);

		let skinnamebg = BaseBitmap.create("acchristmasview_bigreward_" + this.code);
		skinnamebg.setPosition(bg.x, bg.y + 20);
		this.addChildToContainer(skinnamebg);

		let ruleBg = BaseLoadBitmap.create("acchristmasview_bigreward_buttombg_" + this.code);
		ruleBg.width = 534;
		ruleBg.height = 33;
		ruleBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - ruleBg.width / 2,bg.y + bg.height - ruleBg.height - 5);
		this.addChildToContainer(ruleBg);

	}
	protected getShowHeight() {
		return 460+12;
	}
	protected getTitleStr(): string {
		return "acChristmasBigRewardPopupViewTitle";
	}
	public dispose(): void {
		this.aid = null;
		this.code = null;
		super.dispose();
	}
}