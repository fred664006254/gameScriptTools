/**
 * 三国活动2 活动详情
 * date 2020.2.10
 * author ycg
 * @name AcThreekingdomsOfWifeDetailPopupView
 */
class AcThreekingdomsOfWifeDetailPopupView extends PopupView{

    public constructor(){
        super();
    }

    public initView():void{
        let view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            view.clickTabbarHandler({index : tab - 1}); 
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    }

    protected initTabbarGroup():void
	{
		let tabBarTextArr:string[] = this.getTabbarTextArr();
		if(tabBarTextArr&&tabBarTextArr.length>0)
		{
			this.tabbarGroup = ComponentManager.getTabBarScrollGroup(tabBarTextArr,this.clickTabbarHandler, this);
			this.addChild(this.tabbarGroup);
			this.setTabBarPosition();
			this.container.y = this.getTitleButtomY();
			this.tabbarGroup.selectedIndex=this._selectedTabIndex;
			this.tabbarGroup.x = 0+GameData.popupviewOffsetX;
        }
        this.refreshView();
    }

    protected resetBgSize():void
    {
        super.resetBgSize();
         if (this.selectedTabIndex==3)
        {
            this.tabViewData[this.selectedTabIndex].x = 29.5+5;
        }
        else
        {
            this.tabViewData[this.selectedTabIndex].x = 29.5;
        }
    }

    protected changeTab():void
    {
        super.changeTab();
        if (this.selectedTabIndex==3)
        {
            this.tabViewData[this.selectedTabIndex].x = 29.5+5;
        }
        else
        {
            this.tabViewData[this.selectedTabIndex].x = 29.5;
        }
        
    }

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
    }

     protected getOffsetY():number
	{	
		return 21;
	}
    
    protected clickTabbarHandler(data):void{
        let view = this;
        super.clickTabbarHandler(data);
    }

    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isCangetChargeReward()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCangetAchieveReward()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
    }

	private get cfg() : Config.AcCfg.ThreekingdomsOfWifeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreekingdomsOfWifeVo{
        return <AcThreekingdomsOfWifeVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [`acThreekingdomsOfWifeRechargeTitle-${this.getTypeCode()}`, 
                `acThreekingdomsOfWifeProcessTitle-${this.getTypeCode()}`,
                `acThreekingdomsOfWifePoolTitle-${this.getTypeCode()}`,
                `acThreekingdomsOfWifeSkinTitle-${this.getTypeCode()}`
		];
    }
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

     /**标题 */
	protected getTitleStr():string
	{
		return "acThreekingdomsOfWifeDetailPopupTitle-"+this.getTypeCode();
    }
    
	protected getShowHeight():number
	{
		return 830;
    }

    protected getShowWidth():number
	{
		return 580;
	}
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "accarnivalview_tab_green", "accarnivalview_tab_red",
            "progress5", "progress3_bg", "progress3", "activity_charge_red",
            "collectflag", "shopview_corner",
            "common_titlebg", "specialview_commoni_namebg",
            "acthrowarrowview_wifeskinbg","acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg",
            "acthreekingofwife_poolbg-"+this.getTypeCode(),
		]);
	}

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        super.dispose();
    }
}