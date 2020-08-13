/**
  * 宝箱奖励
  * @author 张朝阳
  * date 2019/5/23
  * @class AllianceWeekEndScorePopupView
  */
class AllianceWeekEndScorePopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;

	private _scrollList: ScrollList = null;

	protected initView(): void {

		App.MessageHelper.addNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreRewardHandle, this);

		let bg = BaseLoadBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 685;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		// let list = Config.AllianceweekendCfg.peScoreItemCfgList;
		let rect = new egret.Rectangle(0, 0, 510, 675);
		this._scrollList = ComponentManager.getScrollList(AllianceWeekEndScoreScrollItem, null, rect, { aid: this.aid, code: this.code });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChildToContainer(this._scrollList);

		this.refreshView();

	}
	/**刷新界面 */
	private refreshView() {
		let sortRechargeCfg = Api.myAllianceWeekVoApi.getSortScoreCfg();
		sortRechargeCfg.sort((a, b) => {
			return a.sortId - b.sortId;
		})
		this._scrollList.refreshData(sortRechargeCfg, { aid: this.aid, code: this.code });

	}
	/**领取奖励 */
	private scoreRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);
			this.refreshView();
		}
	}
	protected getResourceList() {
		return super.getResourceList().concat(["progress3", "progress3_bg",]);
	}


	protected getTitleStr(): string {
		return "allianceWeekEndScorePopupViewTitle";
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQYEST_ALLIANCEWEEK_GETSCOREREWARD, this.scoreRewardHandle, this);
		this.aid = null;
		this.code = null;
		this._scrollList = null;
		super.dispose();
	}
}