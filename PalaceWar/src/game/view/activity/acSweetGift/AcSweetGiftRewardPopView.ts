/**
 * 活动奖励
 * author yangchengguo
 * date 2019.8.20
 * @class AcSweetGiftRewardPopView
 */
class AcSweetGiftRewardPopView extends PopupView{
    public tabbarGroup:TabBarGroup = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        let rewardBg = BaseBitmap.create("public_9_bg4");
        rewardBg.width = 538;
        rewardBg.height = 680;
        rewardBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - rewardBg.width / 2, this.tabbarGroup.y - 5+40);
        this.addChildToContainer(rewardBg);
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
            this.tabbarGroup.y =20;
        }
        this.refreshView();
    }

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
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

        if (this.vo.isShowTaskRewardRedDot()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }

        // if (this.vo.isShowExchangeRedDot()){
        //     this.tabbarGroup.addRedPoint(2);
        // }
        // else{
        //     this.tabbarGroup.removeRedPoint(2);
        // }
    }

	private get cfg() : Config.AcCfg.SweetGiftCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSweetGiftVo{
        return <AcSweetGiftVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [`sweetgiftRechargeRewardTitle-${this.code}`, 
                `sweetgiftTaskRewardTitle-${this.code}`,
                `sweetgiftShopTitle-${this.code}`,
                `sweetgiftCakeRewardTitle-${this.code}`
		];
	}

     /**标题 */
	protected getTitleStr():string
	{
		return "sweetgiftRewardTitle-"+this.code;
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
            "common_titlebg", "specialview_commoni_namebg", "countrywarrewardview_itembg"
		]);
	}

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        super.dispose();
     }
}