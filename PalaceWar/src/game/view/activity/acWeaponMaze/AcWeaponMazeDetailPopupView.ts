/**
 * 神器迷宫 活动详情
 * date 2020.4.24
 * author ycg
 * @name AcWeaponMazeDetailPopupView
 */
class AcWeaponMazeDetailPopupView extends PopupView{
    public _rankData:any = null;
    public constructor(){
        super();
    }

    // protected getRequestData():{requestType:string,requestData:any}
	// {
	// 	return {requestType:NetRequestConst.REQUEST_ACLOTUS_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    // }
    
	// protected receiveData(data:{ret:boolean,data:any}):void
	// {
    //     if (!data.ret){
    //         return;
    //     }
    //     this._rankData = data.data.data;
    // }
    
    // public getMyRankData():any{
    //     if (this._rankData){
    //         return this._rankData;
    //     }
    //     return null;
    // }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
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
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isCanGetRechargeReward()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
    }

	private get vo():AcWeaponMazeVo{
        return <AcWeaponMazeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.WeaponMazeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponMazeDetailTabName4", this.getTypeCode()),
        ];
		return list;
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }
        return this.code;
    }

    protected get uiType():string
	{
		return "2";
	}

     /**标题 */
	protected getTitleStr():string
	{
		return App.CommonUtil.getCnByCode("acWeaponMazeDetailPopupTitle", this.getTypeCode());
    }
    
	protected getShowHeight():number
	{
		return 830;
    }

    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            // "skin_detail_namebg", "progress5", "progress3_bg", "progress3",  "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            // "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "acthreekingdomrecharge_topbg", "acthreekingdomrecharge_topbgline", "acthrowarrowview_wifeskinbg", 
            
            "ac_skinoflibai_chargeitem_red", "ac_skinoflibai_chargeitem_green", "public_popupscrollitembg", "public_scrolllistbg", "progress5", "progress3_bg", "progress3",  "collectflag", "ackite_processtitlebg-1", "ac_skinoflibai_poolrewardbg-1", "ackite_tasktitlebg-1","ackite_skintopbg", "ackite_skintopline",
            "skin_detail_namebg",`servantweaponshowbg`,`specialview_commoni_namebg`,`tailor_get_light`,
            "titleupgradearrow",
		]);
	}

    // protected getOffsetX():number
	// {
	// 	return 8;
	// }

    // protected getOffsetY():number
	// {	
	// 	return -6;
	// }

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        this._rankData = null;
        super.dispose();
    }
}