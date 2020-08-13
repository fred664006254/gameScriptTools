/**
 * 奖励
 * author weixiaozhe
 * date 2020.5.14
 * @class AcKnightRewardPopView
 */
class AcKnightRewardPopView extends PopupView{
    public tabbarGroup:TabBarGroup = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
    }
    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}
    protected get uiType():string
	{
		return "2";
	}    
    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-4-16;
    }

    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isShowRechargeDot()){
            this.tabbarGroup.addRedPoint(0);
            this.tabbarGroup.setRedPos(0,this.tabbarGroup.getTabBar(0).width-28,0)
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isShowAchieveDot()){
            this.tabbarGroup.addRedPoint(1);
            this.tabbarGroup.setRedPos(1,this.tabbarGroup.getTabBar(1).width-28,0)
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }       
    }

	private get cfg() : Config.AcCfg.KnightCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcKnightVo{
        return <AcKnightVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }
    private get TypeCode():string
    {
        if(this.code == "2")
        {
            return "1";
        }
        return this.code;
    }
    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [`acknight_reward_title1-${this.TypeCode}`, 
                `acknight_reward_title2-${this.TypeCode}`,
                `acknight_reward_title3-${this.TypeCode}`,
                `acknight_reward_title4-${this.TypeCode}`
		];
	}

     /**标题 */
	protected getTitleStr():string
	{
		return "acknight_reward_title-"+this.TypeCode;
	}
	protected getShowHeight():number
	{
		return 840;
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([            
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3",  "collectflag", "ackite_processtitlebg-1", "ackite_tasktitlebg-1","ackite_skintopbg", "ackite_skintopline","activity_charge_red","destroysametaskbg","servant_star",
            "skin_detail_namebg",`specialview_commoni_namebg`,`tailor_get_light`,
        ]).concat("knighttab3-"+this.TypeCode);
	}    

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        super.dispose();
     }
}