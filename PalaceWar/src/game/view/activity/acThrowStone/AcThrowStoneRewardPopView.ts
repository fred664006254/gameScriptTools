/**
 * 投石破敌活动奖励
 * author yangchengguo
 * date 2019.8.28
 * @class AcThrowStoneRewardPopView
 */
class AcThrowStoneRewardPopView extends PopupView{
    public tabbarGroup:TabBarGroup = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
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
			this.tabbarGroup.x = 0;
        }
        this.refreshView();
    }

    protected changeTab():void
    {
        super.changeTab();
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    }
     protected resetBgSize():void
    {
        super.resetBgSize();
        this.tabViewData[this.selectedTabIndex].x = 29.5;
    }


    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
        this.tabbarGroup.y += 4;
       
	}

    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isShowChargeRewardRedDot()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
    }

	private get cfg() : Config.AcCfg.ThrowStoneCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThrowStoneVo{
        return <AcThrowStoneVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [`acthrowstoneChargeTitle-${this.getTypeCode()}`, 
                `acthrowstoneThrowReward-${this.getTypeCode()}`,
                `acthrowstoneServantTitle-${this.getTypeCode()}`,
                `acthrowstoneWifeTitle-${this.getTypeCode()}`
		];
    }
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }

     /**标题 */
	protected getTitleStr():string
	{
		return "acthrowstoneRewardTitle-"+this.getTypeCode();
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
            "progress5", "progress3_bg", "activity_charge_red",
            "collectflag","progress8", "shopview_corner",
            "common_titlebg", "specialview_commoni_namebg",
            "acthrowstone_wife_preview_bg", "acthrowstone_servant_preview_bg","acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg"
		]);
	}

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_THROWSTONE_CHANGEVIEW);
        this.tabbarGroup = null;
        super.dispose();
     }
}