/**
 * 来访消息主界面
 */

class AcBattileGroundVisitView extends PopupView
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
			
		]);
	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}

	protected getTitleStr():string{
		return `acBattileGroundVisit-1`
	}

    protected getShowHeight():number
	{
		return 780;
	}
    public initView():void
	{
		this.tabbarGroup.setSpace(5);
		// this.tabbarGroup.x = this.viewBg.x + 45;
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
 	protected getTabbarGroupX():number
	{
		return 10;
	}

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
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		this._mainTaskHandKey = null;
		super.dispose();
	}
}