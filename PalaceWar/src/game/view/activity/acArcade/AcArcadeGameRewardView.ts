/**
 * 拉霸机 -奖池
 * author 张朝阳
 * date 2019/6/13
 * @class AcArcadeGameRewardView
 */
class AcArcadeGameRewardView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let cfg = <Config.AcCfg.ArcadeCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);

		let bg = BaseBitmap.create("public_9_bg4");
		bg.width = 530;
		bg.height = 700;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 520, 690);
		let scrollList = ComponentManager.getScrollList(AcArcadeGameRewardScrollItem, cfg.poolListItemCfg, rect, { aid: aid, code: code });
		scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChildToContainer(scrollList);

	}
	protected getTitleStr(): string {
		return "acArcadeGameRewardViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		super.dispose();
	}
}