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
			"playerview_centerinfobg"
		]);
	}

    protected getShowHeight():number
	{
		return 860;
	}
    public initView():void
	{
		this.tabbarGroup.setSpace(5);
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
	// protected setTabBarPosition():void
	// {

	// 	this.tabbarGroup.setSpace(15);
	// 	let tabX:number=0;
	// 	let tabY:number=0;

	// 	tabX=this.viewBg.x+43;
	// 	tabY=this.viewBg.y+60;

		
	// 	tabY+=this.getTabbarGroupY();;
	// 	this.tabbarGroup.setPosition(tabX,tabY);

	// }
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
    public dispose():void
	{	
		super.dispose();
	}
}