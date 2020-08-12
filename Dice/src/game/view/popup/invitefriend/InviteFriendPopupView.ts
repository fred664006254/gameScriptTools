/**
 * 邀请好友
 * author qianjun
 * 
 */
class InviteFriendPopupView extends PopupView{

	public constructor() {
		super();
    }

    protected getMsgConstEventArr():string[]{
		return [
            MsgConst.MODEL_INVITEFRIEND
		];
	}

	protected msgEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case MsgConst.MODEL_INVITEFRIEND:
				view.modelCallBack();
				break;
        }
	}
	
	private modelCallBack():void{
		let view = this;
		if(Api.InviteFriendVoApi.getIsFinishBind() && this.tabbarGroup.selectedIndex == 1){
			view.tabbarGroup.getTabBar(1).visible = false;

			view.clickTabbarHandler({index : 0}); 
			view.selectedTabIndex = 0;
			view.tabbarGroup.selectedIndex = 0;
		}
	}

    protected setTabBarPosition():void
	{
		if(this.tabbarGroup)
		{
			let tabX:number=0;
			let tabY:number=0;
            tabX=this.viewBg.x+55;
            tabY=this.viewBg.y+60;
			tabY+=this.getTabbarGroupY();
			this.tabbarGroup.setPosition(tabX,tabY);
		}
    }
    
	protected getResourceList():string[]{	
		let array:string[] = [];
        array.concat(super.getResourceList());
		return array.concat([
            `invitefriendview`,"userinfo_view_progress", "userinfo_view_bar",`userinfo_view_top_split`,`joinwarinputbg`
		]);
    }

	protected isTouchMaskClose():boolean{
		return false;
    }

    protected getTitleStr(){
		return null;
    }

    protected getTitleBgName():string{
        return null;
    }
    
    protected getTitlePic(){
		return `invitefriendtitle`;
	}

    // 背景图名称
    protected getBgName():string
    {
        return "invitefriendbg";
    }

    	// 初始化标题
	protected initTitle():void
	{
		let titlepic = this.getTitlePic();
		if(ResMgr.hasRes(titlepic))
		{
			this.titleBmp = BaseBitmap.create(titlepic);
			this.addChild(this.titleBmp);
		}
	}

    protected getTabbarTextArr():Array<string>
	{
		let arr = [LangMger.getlocal(`invitefriendTab1`)];
		if(!Api.InviteFriendVoApi.getIsFinishBind()){
			arr.push(LangMger.getlocal(`invitefriendTab2`));
		}
		return arr;
	}
	// 页签图名称
	protected getTabbarName():string|string[]
	{
		return `invitefriendtabbg`;
    }

    // 初始化tabbarGroup
	protected initTabbarGroup():void
	{
		let tabBarTextArr:string[]=this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{	
			this.tabbarGroup = ComponentMgr.getTabBarGroup(this.getTabbarName(),tabBarTextArr,this.clickTabbarHandler,this,null,``,null, false, 386, 82);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
		}
    }
    
    protected changeTab():void
	{
		let tabveiwClass:any = egret.getDefinitionByName(this.getClassName() + "Tab" + (this.selectedTabIndex+1));
		if(tabveiwClass)
		{
			let commViewTab:ViewTab=<ViewTab>this.tabViewData[this.selectedTabIndex];
			if(commViewTab)
			{
                commViewTab.setPosition(this.tabbarGroup.x,this.tabbarGroup.y + this.tabbarGroup.height);
                this.addChild(commViewTab);
				commViewTab.refreshWhenSwitchBack();
			}
			else
			{
				let tabView:ViewTab = new tabveiwClass(this.param);
				tabView.setPosition(this.tabbarGroup.x,this.tabbarGroup.y + this.tabbarGroup.height);
				this.tabViewData[this.selectedTabIndex] = tabView;
				tabView["param"]=this.param;
				this.addChild(tabView);
				// this.param = null;
				// this.addChild(tabView);
			}
			if(this.lastSelectedTabIndex != null && this.tabViewData[this.lastSelectedTabIndex])
			{
				this.removeChild(this.tabViewData[this.lastSelectedTabIndex]);
			}
		}
		
	}
    
    protected getTabbarGroupY():number
	{
		return 91;
	}
	// 打开该面板时，需要传参数msg
	public initView():void{
        let view = this;
    }

    protected resetBgSize():void{
        let view = this;
        super.resetBgSize();
        view.changeTab();
        view.titleBmp.setPosition(view.viewBg.x + view.viewBg.width/2 - view.titleBmp.width/2,view.viewBg.y+31);
        view.closeBtn.y = view.viewBg.y + 75;

        let ruleBtn = ComponentMgr.getButton(`public_rule`, ``, ()=>{
            ViewController.getInstance().openView(ViewConst.INVITEFRIENDRULEPOPUPVIEW);
        }, view);
        ruleBtn.setScale(0.7);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, ruleBtn, view.viewBg, [53, 167]);
        view.addChild(ruleBtn);
    }

    
	public dispose():void{
        let view = this;
		super.dispose();
	}
}