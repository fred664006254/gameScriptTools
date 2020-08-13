/**
  * 诸葛亮传活动充值奖励
  * @author 张朝阳
  * date 2019/5/16
  * @class AcLiangBiographyChargePopupView
  */
class AcLiangBiographyChargePopupView extends PopupView {
	public constructor() {
		super();
	}
	private aid: any;
	private code: any;

	private _scrollList: ScrollList = null;

	protected initView(): void {

		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE, this.liangchargeHandle, this);


		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);

		let bg = BaseLoadBitmap.create("public_9_bg4");
		bg.width = 520;
		bg.height = 685;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let rect = new egret.Rectangle(0, 0, 510, 675);
		this._scrollList = ComponentManager.getScrollList(AcLiangBiographyChargeScrollItem, null, rect, { aid: this.aid, code: this.code });
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChildToContainer(this._scrollList);

		this.refreshView();

	}
	/**刷新界面 */
	private refreshView() {
		let cfg = <Config.AcCfg.LiangBiographyCfg>Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
		let vo = <AcLiangBiographyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let sortRechargeCfg = vo.getSortRechargeCfg();
		sortRechargeCfg.sort((a, b) => {
			return a.sortId - b.sortId;
		})
		this._scrollList.refreshData(sortRechargeCfg, { aid: this.aid, code: this.code });

	}
	/**领取奖励 */
	private liangchargeHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = "1012_0_" + event.data.data.data.specialGift + "_" + this.param.data.code + "|" + event.data.data.data.rewards;
			let rewardsVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardsVo);
			this.refreshView()
		}
	}



	protected getTitleStr(): string {
		return "acLiangBiographyChargePopupViewTitle-" + this.param.data.code;
	}
	public dispose(): void {
		this.aid = null;
		this.code = null;
		this._scrollList = null;
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETLIANGCHARGE, this.liangchargeHandle, this);
		super.dispose();
	}
}