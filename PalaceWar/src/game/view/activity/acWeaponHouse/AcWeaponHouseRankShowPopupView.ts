/**
* 奖励详情
* date 2020.6.15
* author yangtao
* @name AcWeaponHouseRankShowPopupView
*/
class AcWeaponHouseRankShowPopupView extends PopupView{
    public _rankData:any = null;

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acWeaponHouse_rank_title", this.getTypeCode());
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "rankbgs_4","rankinglist_rankn1","rankinglist_rankn2","rankinglist_rankn3","rankbgs_1","rankbgs_2","rank_line","rankbgs_3",
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1",  "ackite_ranktitlebg2-1",  "ackite_ranktitlebg3-1",  "ackite_ranktitlebg4-1", "progress3", "progress3_bg",
        ).concat(list);
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
        
        let tab = this.param.data.tab ? parseInt(this.param.data.tab) : 0;
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
    }
    
    protected setTabBarPosition():void {
        this.tabbarGroup.x = this.viewBg.x + 45;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acWeaponHouse_rankOneList_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankAllList_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankOneListUp_title", this.getTypeCode()),
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