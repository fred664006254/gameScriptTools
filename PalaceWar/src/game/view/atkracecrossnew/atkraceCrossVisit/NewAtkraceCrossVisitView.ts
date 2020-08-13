/**
 * 来访消息主界面
 */

class NewAtkraceCrossVisitView extends PopupView
{	

    public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"rankinglist_rankbg",
			"atkraceVisitbg",
			"atkracevipbg",
			"office_fnt",
			
		]);
	}

	protected getOffsetX():number
	{	
		return 36;
	}

    protected getShowHeight():number
	{
		return 750;
	}

	protected getTitleStr():string
	{
		return "atkraceCrossVisitViewTitle";
	}

    public initView():void
	{
	
    }

	// protected getTabbarGroupY():number
	// {
	// 	return 50;
	// }

    protected getTabbarTextArr():Array<string>
	{
		return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
		];
	}

    public dispose():void
	{	
		super.dispose();
	}
}