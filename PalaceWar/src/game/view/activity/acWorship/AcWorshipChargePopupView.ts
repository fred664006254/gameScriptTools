/**
  * 筑阁祭天活动充值奖励
  * @author 张朝阳
  * date 2019/5/23
  * @class AcWorshipChargePopupView
  */
class AcWorshipChargePopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;

	private _scrollList: ScrollList = null;

	protected initView(): void {

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPCHARGE, this.worshipchargeHandle, this);


		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let bg = BaseLoadBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 685;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 510, 675);
		this._scrollList = ComponentManager.getScrollList(AcWorshipChargeScrollItem, null, rect, { aid: this.aid, code: this.code });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChildToContainer(this._scrollList);

		this.refreshView();

	}
	/**刷新界面 */
	private refreshView() {
		let cfg = <Config.AcCfg.WorshipCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcWorshipVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let sortRechargeCfg = vo.getSortRechargeCfg();
		sortRechargeCfg.sort((a, b) => {
			return a.sortId - b.sortId;
		})
		this._scrollList.refreshData(sortRechargeCfg, { aid: this.aid, code: this.code });

	}
	/**领取奖励 */
	private worshipchargeHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);
			this.refreshView()
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}
		}
	}



	protected getTitleStr(): string {
		return "acWorshipChargePopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		this.aid = null;
		this.code = null;
		this._scrollList = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETWORSHIPCHARGE, this.worshipchargeHandle, this);
		super.dispose();
	}
}