/**
 * 万物复苏活动详情
 * date 2020.2.26
 * author ycg
 * @name AcRecoveryDetailPopupView
 */
class AcRecoveryDetailPopupView extends PopupView{

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
			this.tabbarGroup.x = 0;
        }
        this.refreshView();
    }

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.x = 0;
    }

    protected getOffsetY():number
	{	
		return 10;
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

	private get cfg() : Config.AcCfg.RecoveryCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcRecoveryVo{
        return <AcRecoveryVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [`acRecoveryRechargeTitle-${this.getTypeCode()}`, 
                `acRecoveryProcessTitle-${this.getTypeCode()}`,
                `acRecoveryPoolTitle-${this.getTypeCode()}`,
                `acRecoverySkinTitle-${this.getTypeCode()}`
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
		return "acRecoveryDetailPopupTitle-"+this.getTypeCode();
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
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green",
            "progress5", "progress3_bg", "progress3", "servant_star", "acthreekingdomrecharge_skinbg",
            "collectflag", "acthrowstone_preview_line", "acthrowstone_preview_msg_bg", "skin_detail_namebg", "countrywarrewardview_itembg", 
		]);
	}

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        super.dispose();
    }
}