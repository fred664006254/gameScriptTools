/**
  * 马超活动Tab2
  * author 张朝阳
  * date 2019/1/14
  * @class AcMazeViewTab2
  */
class AcMaChaoViewTab2 extends AcCommonViewTab {

	private _scrollList: ScrollList = null;
	public constructor() {
		super();
		egret.callLater(this.initView, this);
	}
	public initView() {
		App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, this.receiveHandle, this);
		App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		let bg = BaseBitmap.create("public_9_bg43");
		bg.width = 620;
		bg.height = GameConfig.stageHeigth - this.getViewTitleButtomY() - 25;
		bg.setPosition(GameConfig.stageWidth / 2 - bg.width / 2, 10);
		this.addChild(bg);

		let rect = new egret.Rectangle(0, 0, bg.width, bg.height - 10)
		this._scrollList = ComponentManager.getScrollList(AcMaChaoTaskScrollItem, null, rect);
		this._scrollList.setPosition(bg.x + 5, bg.y + 5);
		this.addChild(this._scrollList);
		this.refreshData();
	}
	private refreshData() {
		if (!this.parent) {
			return;
		}
		let vo = <AcMaChaoVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
		let taskData = vo.getSortTask();
		taskData.sort((a, b) => { return a.sortId - b.sortId });
		this._scrollList.refreshData(taskData, { code: this.code, aid: this.aid });
	}
	private receiveHandle(event: egret.Event) {
		if (event.data.ret) {
			let rewards = event.data.data.data.rewards;
			let rList = GameData.formatRewardItem(rewards);
			App.CommonUtil.playRewardFlyAction(rList);
		}
	}
	public refreshWhenSwitchBack() {
		this.refreshData();
	}
	public dispose() {
		App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshData, this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, this.receiveHandle, this);
		this._scrollList = null;
		super.dispose();
	}
}