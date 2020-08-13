/**
  * 中秋活动 Tab3
  * @author 张朝阳
  * date 2018/8/28
  * @class AcMidAutumnViewTab3
  */
class AcHotelViewTab3 extends AcCommonViewTab {
	private _scrollList: ScrollList = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMC, this.receiveHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		this._aidAndCode = { "aid": this.aid, "code": this.code };
		let cfg = <Config.AcCfg.HotelCfg>Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 40)
		this._scrollList = ComponentManager.getScrollList(AcHotelRechargeScrollItem, cfg.rechargeList(), rect, this._aidAndCode);
		this._scrollList.setPosition(15, 15);
		this.addChild(this._scrollList);
		this.refreshData();
	}
	/**
	 * 刷新数据
	 */
	private refreshData() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let rechargeData = vo.getSortRecharge();
		rechargeData.sort((a, b) => { return a.sortId - b.sortId });
		this._scrollList.refreshData(rechargeData, this._aidAndCode);
	}
	private receiveHandle(event: egret.Event) {

		if (event.data && event.data.ret) {
			let data = event.data.data.data;
			let rewards = data.rewards;
			let oldRewards = data.cfrewards;
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);
			this.refreshData();
		}

	}
	/**
	 * 切换标签
	 */
	public refreshWhenSwitchBack() {
		this.refreshData();
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMC, this.receiveHandle, this);
		this._aidAndCode = null;
		this._scrollList = null;
		super.dispose();
	}

}