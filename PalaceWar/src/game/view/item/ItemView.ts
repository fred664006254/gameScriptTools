/**
 * 道具
 * author dmj
 * date 2017/9/22
 * @class ItemView
 */

class ItemView  extends CommonView
{
	// 大于等于5时，需要弹2次确认板
	public static MAX_NUM:number = 5;
	public constructor() 
	{
		super();
	}
	
	protected get uiType():string
	{
		return "2";
	}

	protected getBigFrame():string
	{	
		return "commonview_bigframe";
	}

	protected initTabbarGroup():void
	{	
		let tabbg = BaseBitmap.create("commonview_tabbar_bg");
		tabbg.x = 10;
		tabbg.y = 94;
		this.addChild(tabbg);
		
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			if(this.addTabbarGroupBg()){
				let bg = BaseBitmap.create(`commonview_tabbar_bg`);
				this.addChild(bg);
				this.tabbarGroupBg = bg;
			}

			this.tabbarGroup = ComponentManager.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this);
			let tabBarX:number=(this instanceof PopupView)?30:15;
			
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			if (this.uiType == "2")
			{
				this.tabbarGroup.setSpace(0);
				this.tabbarGroup.x+=5;
				this.tabbarGroup.setColor(0xe1ba86,0x472c26);
				this.setBigFameY(0);
			}
			
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;			
		}

		this.tabbarGroup.y = this.titleBg.y+this.titleBg.height+10 - 14;
		this.container.y = this.getTitleButtomY();
		if(this.getTabbarName() == ButtonConst.BTN2_TAB || this.getTabbarName() == ButtonConst.BTN_BIG_TAB2){
			this.tabbarGroup.addZshi();
		}
	}

	public initView():void
	{	
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.checkRedPoint,this);

		this.checkRedPoint();

		this.bigframe.height = GameConfig.stageHeigth - this.container.y+60;
		this.bigframe.y = -60;

		// NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ITEM_GETMODEL,requestData:{}};
	}
	// protected getRuleInfo():string
	// {
	// 	return "itemRuleInfo";
	// }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"itemtab_bg","itemtab_arrow1","itemtab_arrow2",
			"common_shopmark","recharge_fnt","titlelv_fnt",
			"commonview_tabbar_bg","commonview_screen","commonview_itembg","commonview_bottom_bar",
			"commonview_bigframe","commonview_smalltitlebg","acchristmasview_smalldescbg",
		]);
	}

	protected getTabbarTextArr():Array<string>
	{
		return ["itemBtn","composeBtn",
			"fashionBtn","dressBtn",
		];
	}

	public hide():void
	{
		super.hide();
		Api.rookieVoApi.checkNextStep();
	}

	private checkRedPoint():void
	{
		if(Api.itemVoApi.checkRedPoint())
		{
			this.tabbarGroup.addRedPoint(1);
			this.tabbarGroup.setRedPos(1,120,0)
		}
		else
		{
			this.tabbarGroup.removeRedPoint(1);
		}
	}

	protected switchToTop(data?:{tab?:string,data?:any}):void
	{
		if(data && data.tab)
		{	
			if (!this.param)
			{
				this.param= {};
			}
			this.param.data = data.data;
			this.tabbarGroup.selectedIndex = Number(data.tab);
			this.clickTabbarHandler({index:data.tab});			
		}
		super.switchToTop();
	}

	protected changeTab():void
	{
		super.changeTab();
		this.param = null;
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_USE_ITEM),this.checkRedPoint,this);
		super.dispose();
	}
}