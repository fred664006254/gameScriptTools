/**
* 鼠来如意 活动详情
* date 2020.6.1
* author ycg
* @name AcMouseComeDetailPopupView
*/
class AcMouseComeDetailPopupView extends PopupView{
    public _rankData:any = null;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acMouseComeDetailPopupTitle", this.getTypeCode());
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1",  "ackite_ranktitlebg2-1",  "ackite_ranktitlebg3-1",  "ackite_ranktitlebg4-1", "progress3", "progress3_bg",
        ).concat(list);
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
        if (this.vo.isCanExchange()){
            this.tabbarGroup.addRedPoint(3);
        }
        else{
            this.tabbarGroup.removeRedPoint(3);
        }
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName1", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName2", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName3", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acMouseComeDetailTabName4", this.getTypeCode()),
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
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcMouseComeVo{
        return <AcMouseComeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this._rankData = null;
        
        super.dispose();
    }
}