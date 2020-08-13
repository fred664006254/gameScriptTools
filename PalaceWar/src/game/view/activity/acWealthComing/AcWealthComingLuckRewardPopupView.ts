/**
 * 财运奖励
 * author 张朝阳
 * date 2018/12/25
 * @class AcWealthComingLuckRewardPopupView
 */
class AcWealthComingLuckRewardPopupView extends PopupView {

	private _scrollList: ScrollList = null;
	public constructor() {
		super();
	}
	public initView(): void {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHREWARD, this.weathRewardHandle, this);
		let aid = this.param.data.aid;
		let code = this.param.data.code;
		let id = this.param.data.id;
		let vo = <AcWealthComingVo>Api.acVoApi.getActivityVoByAidAndCode(aid, code);
		let cfg = <Config.AcCfg.WealthComingCfg>Config.AcCfg.getCfgByActivityIdAndCode(aid, code);
		let bg = BaseBitmap.create("public_9_probiginnerbg");
		bg.width = 530;
		bg.height = 720;
		bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
		this.addChildToContainer(bg);

		let processCfg = vo.getSortProcessCfg();
		processCfg.sort((a, b) => { return a.sortId - b.sortId });
		let rect = new egret.Rectangle(0, 0, 520, 710);
		this._scrollList = ComponentManager.getScrollList(AcWealthComingLuckScrollItem, processCfg, rect, { id: id, code: code, aid: aid });
		this._scrollList.setPosition(bg.x + 3, bg.y + 5);
		this.addChildToContainer(this._scrollList);
		if (id) {
			for (let i = 0; i < processCfg.length; i++) {
				if (processCfg[i].id == id) {
					this._scrollList.setScrollTopByIndex(i, 1000);
					break;
				}
			}
		}


	}
	/**刷新item */
	private weathRewardHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let replacerewards = event.data.data.data.replacerewards;
			let rewardVo = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rewardVo);
			let vo = <AcWealthComingVo>Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
			let processCfg = vo.getSortProcessCfg();
			processCfg.sort((a, b) => { return a.sortId - b.sortId });
			this._scrollList.refreshData(processCfg, { id: null, code: this.param.data.code, aid: this.param.data.aid })
			if (replacerewards) {
				ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
			}

		}
	}
	protected getTitleStr(): string {
		return "acWealthComingLuckRewardPopupViewTitle"
	}
	protected getResourceList(): string[] {
		return super.getResourceList().concat(["progress3_bg", "progress3"
		]);
	}
	public dispose(): void {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETWEATHREWARD, this.weathRewardHandle, this);
		this._scrollList = null;
		super.dispose();
	}
}