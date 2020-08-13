class DailybossBattleResultPopupView extends PopupView
{
	public constructor() 
	{
		super();
	}

	protected initView():void
	{
	}

	private getBattleData()
	{
		return this.param.data;
	}

	protected getBgName():string
	{
		return "promotion_scroll";
	}
}