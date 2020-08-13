/**
 * 来访消息主界面
 */

class AtkraceCrossVisitView extends PopupView
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
	protected resetBgSize():void{
		super.resetBgSize();
		this.tabbarGroup.y += 5;
	}
	protected getOffsetX():number
	{	
		return 36;
	}

    protected getShowHeight():number
	{
		return 750;
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