/**
  * 中秋活动 Tab2
  * @author 张朝阳
  * date 2018/12/7
  * @class AcHotelViewTab2
  */
class AcHotelViewTab2 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;
	private _aidAndCode: { "aid": string; "code": string } = null;
	public constructor(param?) {
		super();
		this.param = param;
		this.initView();
	}

	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMB, this.receiveHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		this._aidAndCode = { "aid": this.aid, "code": this.code };
		let rect = new egret.Rectangle(0, 0, 612, GameConfig.stageHeigth - this.getViewTitleButtomY() - 40)
		this._scrollList = ComponentManager.getScrollList(AcHotelTaskScrollItem, null, rect, this._aidAndCode);
		this._scrollList.setPosition(15, 15);
		this.addChild(this._scrollList);
		this.refreshData();
	}
	private refreshData() {
		let vo = <AcHotelVo>Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
		let taskData = vo.getSortTask();
		taskData.sort((a, b) => { return a.sortId - b.sortId });
		this._scrollList.refreshData(taskData, this._aidAndCode)
	}
	private receiveHandle(event: egret.Event) {

		if (event.data && event.data.ret) {
			let data = event.data.data.data;
			let rewards = data.rewards;
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);
			this.refreshData()
		}

	}
	/**
	 * 切换标签
	 */
	public refreshWhenSwitchBack() {
		this.refreshData();
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_GETTWHOTELITEMB, this.receiveHandle, this);
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		this._scrollList = null;
		this._aidAndCode = null;
		super.dispose();
	}

}