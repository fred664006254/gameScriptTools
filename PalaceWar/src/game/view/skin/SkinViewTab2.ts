/**
 * 门客皮肤
 * author qianjun
 * date 2018/08/13
 * @class SkinView
 */
class SkinViewTab2  extends CommonViewTab
{
	private _scrollList:ScrollList;
	public constructor() {
		super();
		this.initView();
	}

	public initView():void
	{
		// ViewController.getInstance().openView(ViewConst.COMMON.SKINLEVELUPVIEW,{skinId:"1011"});
		let view = this;
		let skinView : any  = ViewController.getInstance().getView(`SkinView`);
		view.width = GameConfig.stageWidth;
		view.height = skinView.getTabViewHeight();

		let rectH1 = view.height - 10;
		let rect = new egret.Rectangle(0, 0, GameConfig.stageWidth,rectH1);
		view._scrollList  = ComponentManager.getScrollList(SkinScrollItem,[],rect);
		view._scrollList.y = 0;
		view.addChild(this._scrollList);

		view.refreshRankList();
    }

	protected refreshRankList()
    {
		let list = Config.WifeskinCfg.getWifeCfgList();
		for (var key in list) {
			if (list.hasOwnProperty(key)) {
				list[key]["uiType"] = 0;
			}
		}
		this._scrollList.refreshData(list);
    }

    public dispose()
    {
		this._scrollList = null;
        super.dispose();
    }
}