/**
 * 财神祝福
 * @author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingBlessPopupView
 */
class AcWealthComingBlessPopupView extends PopupView {


	public constructor() {
		super();
	}
	public initView(): void {
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let noBuff = this.param.data.noBuff;
		let rect = new egret.Rectangle(0, 0, 545, 500);
		let scrollList = ComponentManager.getScrollList(AcWealthComingBlessScrollItem, ["1", "2", "3"], rect, { code: code, aid: aid, noBuff: noBuff })
		scrollList.setPosition(this.viewBg.x + this.viewBg.width / 2 - scrollList.width / 2, 15);
		this.addChildToContainer(scrollList);

	}
	protected getTitleStr(): string {
		return "acWealthComingBlessPopupViewTitle"
	}

	public dispose(): void {
		super.dispose();
	}
}