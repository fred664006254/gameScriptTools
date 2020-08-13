/**
 * 奖励
 * author sl
 * date 2020.7.17
 * @class AcBirdBridgePopView
 */
class AcBirdBridgePopView extends PopupView
{
    public constructor(){
        super();
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
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

     protected setTabBarPosition():void {
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag",
            "birdbridge_rewardtitlebg1-1","ac_skinoflibai_chargeitem_red","birdbridge_rewardbg-"+this.getTypeCode(),
            "progress5","ac_skinoflibai_chargeitem_green"
        ).concat(list);
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acBirdBridgePopupTitle", this.getTypeCode());
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acBirdBridgeTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acBirdBridgeTabName4", this.getTypeCode()),
        ];
		return list;
    }


    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isCangetRechargeReward()){
            this.tabbarGroup.addRedPoint(0); 
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCangetAchievementOneReward()){
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCangetAchievementAllReward()){
            this.tabbarGroup.addRedPoint(2); 
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }

       protected getShowHeight():number{
        return 830;
    }
    
    protected getTypeCode():string{

        return this.param.data.uicode;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcBirdBridgeVo{
        return <AcBirdBridgeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.BirdBridgeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
       
        super.dispose();
    }
}