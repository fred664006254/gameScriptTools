/**
 * 任务
 */

class AcLanternTaskPopupView extends PopupView
{	

	// private _mainTaskHandKey:string = null;
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
            "acmoonlight_red-1"
			
		]);
	}

   private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }
    protected getShowHeight():number
	{
		return 750;
	}
    public initView():void
	{

		App.MessageHelper.addEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO,this.checkTabRed,this);
		this.code = this.param.data.code;
		this.aid = this.param.data.aid;
		// this.type = this.param.data.type;

		

		this.checkTabRed();

		this.selectedTabIndex = this.vo.getCurDay()-1;
		this.tabbarGroup.selectedIndex=this.selectedTabIndex;

		// this.clickTabbarHandler({index:this.vo.getCurDay()-1});
		// this.tabbarGroup.selectedIndex = this.vo.getCurDay()-1;

		// this.selectedTabIndex = this.vo.getCurDay()-1;
		// this.tabbarGroup.selectedIndex = this.vo.getCurDay()-1;
    } 
	// protected clickTabbarHandler(data:any):void
	// {
	// 	super.clickTabbarHandler(data);

	// }
	public checkTabRed()
	{
		if(this.vo.isShowTaskTabRed1 ) {
			this.tabbarGroup.addRedPoint(0);
		}else{
			this.tabbarGroup.removeRedPoint(0);
		}

		if(this.vo.isShowTaskTabRed2 ) {
			this.tabbarGroup.addRedPoint(1);
		}else{
			this.tabbarGroup.removeRedPoint(1);
		}

		if(this.vo.isShowTaskTabRed3 ) {
			this.tabbarGroup.addRedPoint(2);
		}else{
			this.tabbarGroup.removeRedPoint(2);
		}

		if(this.vo.isShowTaskTabRed4 ) {
			this.tabbarGroup.addRedPoint(3);
		}else{
			this.tabbarGroup.removeRedPoint(3);
		}	
	}
	
	protected getTabbarName():string|string[]
	{
		return "aclanternview_tabbtn";
	}
    protected getTabbarTextArr():Array<string>
	{
		return [
            "acLanternTaskPopupViewTabTitle1",
            "acLanternTaskPopupViewTabTitle2",
            "acLanternTaskPopupViewTabTitle3",
            "acLanternTaskPopupViewTabTitle4",
           
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
		// App.MainTaskHandUtil.releaseHandKey(this._mainTaskHandKey);
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LANTERN_REFRESHVO,this.checkTabRed,this);
		// this._mainTaskHandKey = null;
		this.code = null;
		this.aid = null;
		this.type = null;
		this._itemCount = null;
		super.dispose();
	}
}