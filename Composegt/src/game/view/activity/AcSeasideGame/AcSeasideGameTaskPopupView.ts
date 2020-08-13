/**
 * 任务
 */

class AcSeasideGameTaskPopupView extends PopupView
{	

	private _mainTaskHandKey:string = null;
	private code: string = null;
	private aid: string = null;
	private type = null;
	private _itemCount = null;
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
   private get vo() : AcSeasideGameVo{
        return <AcSeasideGameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    protected getShowHeight():number
	{
		return 750;
	}
    public initView():void
	{

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO,this.checkTabRed,this);
		this.code = this.param.data.code;
		this.aid = this.param.data.aid;
		// this.type = this.param.data.type;



		let tabBar1 = this.tabbarGroup.getTabBar(1);
		let tabBar2 = this.tabbarGroup.getTabBar(2);
		this.checkTabRed();
		// egret.callLater(()=>{
		// 	this._mainTaskHandKey = App.MainTaskHandUtil.addHandNode(
		// 		this,
		// 		this.container.x + tabBar1.x + tabBar1.width/2,
		// 		this.container.y + tabBar1.y + tabBar1.height/2, 
		// 		[tabBar1,tabBar2],
		// 		603, 
		// 		true, 
		// 		function() {
		// 			return true;
		// 		}, 
		// 		this
		// 	);
		// },this);
    } 
	public checkTabRed()
	{
		if(this.vo.isShowTaskTab1Red ) {
			this.tabbarGroup.addRedPoint(0);
		}else{
			this.tabbarGroup.removeRedPoint(0);
		}

		if(this.vo.isShowTaskTab2Red ) {
			this.tabbarGroup.addRedPoint(1);
		}else{
			this.tabbarGroup.removeRedPoint(1);
		}

		if(this.vo.isShowTaskTab3Red ) {
			this.tabbarGroup.addRedPoint(2);
		}else{
			this.tabbarGroup.removeRedPoint(2);
		}
	}
	
	protected getTabbarName():string|string[]
	{
		return ButtonConst.BTN_WINTAB;
	}
    protected getTabbarTextArr():Array<string>
	{
		return [
            "acSeasideGameTaskPopupViewTabTitle1",
            "acSeasideGameTaskPopupViewTabTitle2",
            "acSeasideGameTaskPopupViewTabTitle3",
           
		];
	}
    protected getDefaultCn(cnName:string,defaultCode?:string):string
    {
        defaultCode = defaultCode||"1";
        if(LanguageManager.checkHasKey(cnName+"-"+this.code)){
            return cnName + "-" + this.code;
        } else {
            return cnName + "-" + defaultCode;
        }
    }
	protected setTabBarPosition():void
	{

		this.tabbarGroup.setSpace(12);
		let tabX:number=0; 
		let tabY:number=0;

		tabX=this.viewBg.x+48;
		tabY=this.viewBg.y+60;

		
		tabY+=this.getTabbarGroupY();;
		this.tabbarGroup.setPosition(tabX,tabY);

	}
	// private refreshData(){

	// 	// let itemCount1 = this.vo.titleinfo[""+this.type]==null?0:this.vo.titleinfo[""+this.type];
	// 	// this._itemCount.text = LanguageManager.getlocal(this.getDefaultCn("acReignTitle_itemcount"+this.type),[String(itemCount1)]);
	// }
    public dispose():void
	{	
		App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SEASIDEGAME_REFRESHVO,this.checkTabRed,this);
		this._mainTaskHandKey = null;
		this.code = null;
		this.aid = null;
		this.type = null;
		this._itemCount = null;
		super.dispose();
	}
}