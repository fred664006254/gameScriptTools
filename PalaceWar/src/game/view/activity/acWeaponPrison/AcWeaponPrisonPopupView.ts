class AcWeaponPrisonPopupView extends PopupView
{

    public constructor() {
        super();
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

    private get vo():AcWeaponPrisonVo{
        return <AcWeaponPrisonVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponPrisonCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acWeaponPrisonPopupTitle", this.getTypeCode());
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acWeaponPrisonTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponPrisonTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponPrisonTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponPrisonTabName4", this.getTypeCode()),
        ];
		return list;
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
    }

     protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "servant_star","collectflag", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1",  "ackite_ranktitlebg2-1",  "ackite_ranktitlebg3-1",  "ackite_ranktitlebg4-1", 
            "acgoodmatch_topbg","acgoodmatch_pooltitlebg","acgoodmatch_selected", "titleupgradearrow","specialview_commoni_namebg"
        ).concat(list);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_WEAPONPRISON_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
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
        if (this.vo.isCanGetRankReward()){
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
            msg : LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acWeaponPrisonPoolTip1`, this.getTypeCode())),
            touchMaskClose : true,
            title : `itemUseConstPopupViewTitle`,
            callback : ()=>{
                NetManager.request(NetRequestConst.REQUEST_WEAPONPRISON_SETTYPE, {activeId: this.vo.aidAndCode, rtype: 1});
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
        this.tabbarGroup.x = this.viewBg.x + GameData.popupviewOffsetX + 26;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }
    
    protected getShowHeight():number{
        return 830;
    }

    public dispose():void
    {   
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);

        super.dispose();
    }
}