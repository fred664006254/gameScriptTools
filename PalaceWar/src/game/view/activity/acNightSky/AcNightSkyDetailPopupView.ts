/**
* 夜观天象活动详情
* date 2020.6.15
* author ycg
* @name AcNightSkyDetailPopupView
*/
class AcNightSkyDetailPopupView extends PopupView{

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acNightSkyetailPopupTitle", this.getTypeCode());
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star","collectflag", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1",  "ackite_ranktitlebg2-1",  "ackite_ranktitlebg3-1",  "ackite_ranktitlebg4-1", 
            "acgoodmatch_topbg","acgoodmatch_pooltitlebg","acgoodmatch_selected"
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

     protected closeHandler():void{
        if (this.vo.isTouchPool && this.vo.isInActivity()  && this.vo.getPoolRewardId() == 0 ){
            this.showSelectPoolTip();
        }
        else{
            this.hide();
        }
    }

    private showSelectPoolTip():void{
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW,{
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acNightSkyPoolTip1`, this.getTypeCode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                NetManager.request(NetRequestConst.REQUEST_ACNIGHTSKY_SETTYPE, {activeId: this.vo.aidAndCode, rtype: 1});
                this.hide();
            },
            handle : this,
            needClose : 1,
            needCancel : true,
            confirmTxt : `sysConfirm`,
            cancelcallback : null,
        });
    }


    protected setTabBarPosition():void {
        // this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acNightSkyDetailTabName3", this.getTypeCode()),
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
        if (this.code == "2"){
            return "1";
        }
         if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcNightSkyVo{
        return <AcNightSkyVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.NightSkyCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.vo.isTouchPool = false;

        super.dispose();
    }
}