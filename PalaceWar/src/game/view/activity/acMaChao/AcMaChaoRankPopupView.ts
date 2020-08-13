/**
  * 马超排行榜
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoRankPopupView
  */
class AcMaChaoRankPopupView extends PopupView{
	private aid:string;
	private code:string;
	public constructor() {
		super();
	}
	
	public initView()
	{
		this.aid = this.param.data.aid;
		this.code = this.param.data.code;
		
	}
	/**
	 * tabbar 的监听事件
	 */
	protected clickTabbarHandler(data:any):void
	{
        super.clickTabbarHandler(data);
	}
	protected setTabBarPosition():void
	{
		super.setTabBarPosition();
		this.tabbarGroup.x += 15;
	}

	protected getOffsetY():number
	{
		return -3;
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
	
	public dispose()
	{
		super.dispose();
	}
}