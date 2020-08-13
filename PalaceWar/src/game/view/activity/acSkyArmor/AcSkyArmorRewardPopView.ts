/**
 * 奖励
 * author wxz
 * date 2020.6.22
 * @class AcSkyArmorRewardPopView
 */
class AcSkyArmorRewardPopView extends PopupView{
    public _rankData:any = null;
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
        this.tabbarGroup.y = this.viewBg.y + 50;
    }
    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isShowAchieveDot()){
            this.tabbarGroup.addRedPoint(1);
            this.tabbarGroup.setRedPos(1,this.tabbarGroup.getTabBar(1).width-28,0)
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }  
        if (this.vo.showExchangeWifeDot()){
            this.tabbarGroup.addRedPoint(3);
            this.tabbarGroup.setRedPos(3,this.tabbarGroup.getTabBar(3).width-28,0)
        }
        else{
            this.tabbarGroup.removeRedPoint(3);
        }               
    }
    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ACMOUSECOME_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
        this._rankData = data.data.data;
    }
    public getMyRankData():any{
        if (this._rankData){
            return this._rankData;
        }
        return null;
    }
            
	private get cfg() : Config.AcCfg.SkyArmorCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcSkyArmorVo{
        return <AcSkyArmorVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
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
		return [`acSkyArmor_reward_title1-${this.TypeCode}`,
                `acSkyArmor_reward_title2-${this.TypeCode}`,
                `acSkyArmor_reward_title3-${this.TypeCode}`,
                `acSkyArmor_reward_title4-${this.TypeCode}`
		];
	}

     /**标题 */
	protected getTitleStr():string
	{
		return "acSkyArmor_reward_title-"+this.TypeCode;
	}
	protected getShowHeight():number
	{
		return 840;
    }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([            
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3",  "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1","ackite_skintopbg", "ackite_skintopline","activity_charge_red","destroysametaskbg","servant_star",
            `servantweaponshowbg`,`specialview_commoni_namebg`,`tailor_get_light`,,"dechuanchangearrow-1",
            "ackite_ranktitlebg1-1","ackite_ranktitlebg2-1","ackite_ranktitlebg3-1","ackite_ranktitlebg4-1"
        ]).concat("skyarmortab3-"+this.TypeCode);
	}    

     public dispose(){
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.tabbarGroup = null;
        super.dispose();
     }
}