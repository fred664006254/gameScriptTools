/**
  * 赵云排行榜
  * author 张朝阳
  * date 2018/7/10
  * @class AcMazeRankPopupView
  */
class AcMazeRankPopupView extends PopupView{
	public constructor() {
		super();
	}
	
	public initView()
	{
		
	}
	/**
	 * tabbar 的监听事件
	 */
	protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
	}
	
	protected getTabbarTextArr():Array<string>
	{
		return [
			"acPunishRankTab1",
			"acPunishRankRewardPopupViewTitle",
		];
	}

	protected getTitleStr():string
	{
		return "acArcherRankTitle";
	}

	protected getShowHeight():number
	{
		return 790;
	}

	protected getOffsetY():number
	{
		return 0;
	}
	
	public dispose()
	{
		super.dispose();
	}
}