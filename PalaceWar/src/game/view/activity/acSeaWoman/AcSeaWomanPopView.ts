/**
 * 奖励
 * author sl
 * date 2020.7.9
 * @class AcSeaWomanRewardPopView
 */
class AcSeaWomanPopView extends PopupView
{
    public _rankData:any = null;
    public constructor(){
        super();
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acSeaWomanPopupTitle", this.getTypeCode());
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star","collectflag",
             "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", 
            "public_textbrownbg", "ackite_ranktitlebg1-1", 
             "acthrowarrowview_wifeskinbg","public_scrolllistbg","acmousecome_skinprocessbg-1"
        ).concat(list);
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
        if (this.vo.isCangetAchieveReward()){
            this.tabbarGroup.addRedPoint(0); 
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (this.vo.isCanExchange()){
            this.tabbarGroup.addRedPoint(2); 
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acSeaWomanTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acSeaWomanTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acSeaWomanTabName3", this.getTypeCode()),
        ];
		return list;
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

    private get vo():AcSeaWomanVo{
        return <AcSeaWomanVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.SeaWomanCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
       
        super.dispose();
    }
}