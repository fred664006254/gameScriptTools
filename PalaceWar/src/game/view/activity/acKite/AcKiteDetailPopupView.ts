/**
 * 清风纸鸢 活动详情
 * date 2020.4.1
 * author ycg
 * @name AcKiteDetailPopupView
 */
class AcKiteDetailPopupView extends PopupView{
    public _rankData:any = null;
    public constructor(){
        super();
    }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ACKITE_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
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
        if (this.vo.isHaveBoxRedDot()){
            this.tabbarGroup.addRedPoint(1); 
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (this.vo.isHaveTaskRedDot()){
            this.tabbarGroup.addRedPoint(2);
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }

	private get cfg() : Config.AcCfg.KiteCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcKiteVo{
        return <AcKiteVo> Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }
    
    protected getTabbarTextArr():Array<string>
	{
		return [
            App.CommonUtil.getCnByCode("acKiteDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acKiteDetailTabName4", this.getTypeCode()),
		];
    }

    protected getTabbarName():string|string[]
	{	
		return ButtonConst.BTN2_SMALL_TAB;
	}
    
    protected getTypeCode():string{
        if (this.code == "2"){
            return "1";
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
		return App.CommonUtil.getCnByCode("acKiteDetailPopupTitle", this.getTypeCode());
    }
    
	protected getShowHeight():number
	{
		return 830;
    }

    // protected getShowWidth():number
	// {
	// 	return 580;
	// }
    
    protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "skin_detail_namebg", "progress5", "progress3_bg", "progress3",  "collectflag", "servant_star", "ackite_skinbg", "ackite_skintopbg", "ackite_skintopline",
            "settingview_line", "public_popupscrollitembg", "public_scrolllistbg", "acthreekingdomrecharge_topbg", "acthreekingdomrecharge_topbgline",
		]);
	}

    protected getOffsetX():number
	{
		return 8;
	}

    protected getOffsetY():number
	{	
		return -6;
	}

    public dispose():void{
        let view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        this._rankData = null;
        super.dispose();
    }
}