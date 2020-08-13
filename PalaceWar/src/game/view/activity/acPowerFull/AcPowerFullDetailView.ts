/**
 * 活动详情
 * 
 */
class AcPowerFullDetailView extends PopupView{

    public constructor(){
        super();
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-4-16;
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

        this.refreshView();
    }


    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.checkAchieveRed()){
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.checkExchangeRed()){
            this.tabbarGroup.addRedPoint(3);
        }
        else{
            this.tabbarGroup.removeRedPoint(3);
        }
    }

	private get cfg():Config.AcCfg.PowerFullCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcPowerFullVo{
        return <AcPowerFullVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        return this.code;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acPowerFullDetailTabName4", this.getTypeCode()),
		];
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}

    protected get uiType():string
	{
		return "2";
	}

     /**标题 */
	protected getTitleStr():string
	{
		return App.CommonUtil.getCnByCode("acPowerFullDetailPopupTitle", this.getTypeCode());
    }
    
	protected getShowHeight():number
	{
		return 830;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3", "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg" ,"ackite_processtitlebg-1",
            "shopview_corner", "previewbg_servantskin", "acpowerfull_skinexchangebg", "specialview_commoni_namebg"
		]);
	}

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);

        super.dispose();
    }
}