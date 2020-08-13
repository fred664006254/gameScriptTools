/**
 * 标签2 详细攻略
 * author 张朝阳
 * date 2018/7/23
 * @class FqStrategyViewTab2
 */
class FqStrategyViewTab2 extends ViewTab {
	private _scrollList:ScrollList;
	public constructor() {
		super();
		this.initView();
	}
	public initView()
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2,this.refreshData,this);

		let rect = new egret.Rectangle(0,0,605,GameConfig.stageHeigth - this.getViewTitleButtomY() - 30 - 15);
		this._scrollList = ComponentManager.getScrollList(FqStrategyViewScollItem2,GameData.fqGameStrategyData.faqcontent,rect);
		this._scrollList.setPosition((GameConfig.stageWidth - 605) / 2,15);
		this.addChild(this._scrollList);
	}
	private refreshData()
	{
		this._scrollList.refreshData(GameData.fqGameStrategyData.faqcontent);
		// this._scrollList.setScrollTopByIndex(GameData.fqGameStrategyData.faqcontent);
	}
	public dispose()
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_FQSTRATEGYVIEW_REFREASHITEM2,this.refreshData,this);
		this._scrollList = null;
		super.dispose();
	}
}
