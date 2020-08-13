/**
 * 奖励
 * author sl
 * date 2020.7.29
 * @class AcMouseTreasurePopupView
 */
class AcMouseTreasurePopupView extends PopupView
{
    public constructor(){
        super();
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star","collectflag",
             "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "progress5",
            "public_textbrownbg", "ackite_ranktitlebg1-1", "ackite_ranktitlebg2-1", "ackite_ranktitlebg3-1", "ackite_ranktitlebg4-1", 
             "acthrowarrowview_wifeskinbg","acmousecome_skinprocessbg-1","ac_skinoflibai_chargeitem_red","ac_skinoflibai_chargeitem_green"
        ).concat(list);
    }

     protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acSeaWomanPopupTitle", this.getTypeCode());
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("mouseTreasureTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("mouseTreasureTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("mouseTreasureTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("mouseTreasureTabName4", this.getTypeCode()),
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
        if (this.vo.isCangetAchieveReward()){
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCanExchange()){
            this.tabbarGroup.addRedPoint(3); 
        }
        else{
            this.tabbarGroup.removeRedPoint(3);
        }
    }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_MOUSETREASURE_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
        this.vo.rankData = data.data.data;
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();

    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }


    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
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

    private get vo():AcMouseTreasureVo{
        return <AcMouseTreasureVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseTreasureCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
       
        super.dispose();
    }
}