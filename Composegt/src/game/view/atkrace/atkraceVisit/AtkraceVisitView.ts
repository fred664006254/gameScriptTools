/**
 * 来访消息主界面
 */

class AtkraceVisitView extends PopupView
{	

	private _mainTaskHandKey:string = null;
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
	// protected isHaveTabBg():boolean
	// {
	// 	return true;
	// }
    protected getShowHeight():number
	{
		return 860;
	}
    public initView():void
	{
		this.tabbarGroup.setSpace(5);
		let tabBar1 = this.tabbarGroup.getTabBar(1);
		let tabBar2 = this.tabbarGroup.getTabBar(2);
		egret.callLater(()=>{
			this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
				this,
				this.container.x + tabBar1.x + tabBar1.width/2,
				this.container.y + tabBar1.y + tabBar1.height/2, 
				[tabBar1,tabBar2],
				603, 
				true, 
				function() {
					return true;
				}, 
				this
			);
		},this);
    } 
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
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
    public dispose():void
	{	
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}
}