/**
  * 花魁活动--粉丝排行
  * @author 张朝阳
  * date 2019/4/23
  * @class AcBeautyVotePlayerInfoPopupView
  */
class AcBeautyVoteFanRankPopupView extends PopupView {
	public constructor() {
		super();
	}
	public initView() {
		// this.tabbarGroup.x = this.viewBg.x + 45;
	}

	protected getTabbarTextArr(): Array<string> {
		return [
			"acBeautyVoteFanRankPopupViewTab1Title-" + this.param.data.code,
			"acBeautyVoteFanRankPopupViewTab2Title-" + this.param.data.code,
		];
	}
	protected getTitleStr(): string {
		return "acBeautyVoteFanRankPopupViewTitle-" + this.param.data.code;
	}

	protected getShowHeight(): number {
		return 800;
	}
	public dispose() {
		super.dispose();
	}
}