/**
 * 来访消息主界面
 */

class AtkraceVisitView extends PopupView
{	
    public constructor() {
		super();
	}

	//是否展示弹窗动效
	protected isShowOpenAni():boolean
	{	
		if (Api.rookieVoApi.isGuiding)
		{
			return false;
		}
		return true;
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

	protected getOffsetY():number
	{	
		return -2;
	}

    protected getShowHeight():number
	{
		return 760;
	}
    public initView():void
	{
		let tabBar1 = this.tabbarGroup.getTabBar(1);
		let tabBar2 = this.tabbarGroup.getTabBar(2);
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
    }
 

    protected getTabbarTextArr():Array<string>
	{
		return [
            "atkraceVisitTab1",
            "atkraceVisitTab2",
            "atkraceVisitTab3",
		];
	}

	private doGuide()
    {	
		this.hide();
    }

    public dispose():void
	{	
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT,this.doGuide,this);
		super.dispose();
	}
}