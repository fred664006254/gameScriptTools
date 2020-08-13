
class AcLuckyDrawPopupView extends PopupView 
{
    public constructor() {
      super();
    }

    private get cfg() : Config.AcCfg.LuckyDrawCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLuckyDrawVo{
        return <AcLuckyDrawVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
	}
	
    private get aid():string{
          return this.param.data.aid;
    }
    
    private get code():string{
		  return this.param.data.code;
    }
    
    protected getTabbarTextArr():Array<string>{
        let code = this.code;
        return [
          `acLuckyDrawTab1`,
                `acLuckyDrawTab2`,//-${code}
        ];
    }

    protected getResourceList(): string[] {
      return super.getResourceList().concat(["progress3_bg", "progress3","acmidautumnview_titlebg"
      ]);
    }
    
    protected initTabbarGroup():void
    {
      let tabBarTextArr:string[]=this.getTabbarTextArr();
      if(tabBarTextArr&&tabBarTextArr.length>0)
      {
        this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler,this);
        this.addChild(this.tabbarGroup);
        this.setTabBarPosition();
        this.container.y = this.getTitleButtomY();
        this.tabbarGroup.selectedIndex=this._selectedTabIndex;
        this.tabbarGroup.x = 0+GameData.popupviewOffsetX;
      }
    }

    protected getOffsetY():number
	{	
		return 16;
	}
    
    protected setTabBarPosition():void
    {
          super.setTabBarPosition();
          this.tabbarGroup.x = 0;
    }

	public initView(): void {
        let view = this;

        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

        let bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 540;
        bg.height = 723;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 56);
          this.addChildToContainer(bg);
        

        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }

        view.freshView();
    }
    public freshView():void{
      let view = this;

      if(view.vo.getpublicRedhot3()){
          view.tabbarGroup.addRedPoint(0);
      }
      else{
          view.tabbarGroup.removeRedPoint(0);
      }

      if(view.vo.getpublicRedhot2()){
          view.tabbarGroup.addRedPoint(1);
      }
      else{
          view.tabbarGroup.removeRedPoint(1);
      }
    }

    protected getShowWidth():number{
      return 580;
    }

	  protected getShowHeight():number{
      return 855;
    }

    protected getTitleStr(): string {
      return `atkracecrossActivityRewardViewTitle`
    }

    	  protected resetBgSize():void
    {
        super.resetBgSize();
       this.tabViewData[this.selectedTabIndex].x = 29.5;
    }

    protected changeTab():void
    {
        super.changeTab();
       this.tabViewData[this.selectedTabIndex].x = 29.5;
        
    }
  
    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);

        super.dispose();
    }
}