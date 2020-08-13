/**
* 奖励详情
* date 2020.6.15
* author yangtao
* @name AcMouseComeDetailPopupView
*/
class AcWeaponHouseRankPopupView extends PopupView{
    public _rankData:any = null;
    public _allirank:any = null;//成员涨幅
    public _myrank:any = null;//我的排名
    public _rankList:any = null;//个人排行榜
    public _amyrank:any = null;//军团我的排名
    public _arankList:any = null;//军团排行榜
    public _name:string = null;//昵称
    public _aname:string = null;//军团昵称
    public _amScore:string = null;//军团分数
    public _allmask:string = null;//涨幅信息

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return App.CommonUtil.getCnByCode("acWeaponHouse_rank_title", this.getTypeCode());
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "ackite_processtitlebg-1", "public_scrolllistbg", "progress3", "progress3_bg", "collectflag", "acthrowarrowview_wifeskinbg", "skin_detail_namebg", "ackite_skintopbg", "ackite_skintopline", "accshegemony_ranklistbg1", "accshegemony_ranklistbg2", "accshegemony_ranklistbg3", "public_textbrownbg", "ackite_ranktitlebg1-1",  "ackite_ranktitlebg2-1",  "ackite_ranktitlebg3-1",  "ackite_ranktitlebg4-1", "progress3", "progress3_bg",
        ).concat(list);
    }

    protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_WEAPONHOUSE_GETRANK, requestData:{activeId:this.vo.aidAndCode}};
    }
    
	protected receiveData(data:{ret:boolean,data:any}):void
	{
        if (!data.ret){
            return;
        }
        let rankData = data.data.data;
        this._allirank = rankData.allirank.rankList;
        this._allmask = rankData.allirank.myrank;
        this._myrank = rankData.rabbitRank.myrank;
        this._rankList = rankData.rabbitRank.rankList;
        this._amyrank = rankData.rabbitRank.amyrank;
        this._arankList = rankData.rabbitRank.arankList;
    }
    
    public getMyRankData():any{
        if (this._rankData){
            return this._rankData;
        }
        return null;
    }
    /**
     * 涨幅
     */
    public getAllirank():any{
        if (this._allirank){
            return this._allirank;
        }
        return null;
    }
    /**
     * 涨幅个人信息
     */
    public getAllMask():any{
        if (this._allmask){
            return this._allmask;
        }
        return null;
    }
    /**
     * 我的排名
     */
    public getMyrank():any{
        if (this._myrank){
            return this._myrank;
        }
        return null;
    }
    /**
     * 个人排行榜
     */
    public getRankList():any{
        if (this._rankList){
            return this._rankList;
        }
        return null;
    }
    /**
     * 军团我的
     */
    public getAmyrank():any{
        if (this._amyrank){
            return this._amyrank;
        }
        return null;
    }
    /**
     * 军团排行榜
     */
    public getArankList():any{
        if (this._arankList){
            return this._arankList;
        }
        return null;
    }

    public getMyname():void
    {
        if(this._rankList)
        {
           for(var key in this._rankList){
               if(this._rankList[key].iud == this._myrank.uid)
               {
                   this.name = this._rankList[key].name;
               }
            }
        }
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
    }
    
    protected setTabBarPosition():void {
        this.tabbarGroup.x = this.viewBg.x + 45;
        this.tabbarGroup.y = this.viewBg.y + 70-4 - 16;
    }

    protected getTabbarTextArr():Array<string>
	{
        let list = [
            App.CommonUtil.getCnByCode("acWeaponHouse_rankRewardOne_title", this.getTypeCode()),
            App.CommonUtil.getCnByCode("acWeaponHouse_rankRewardAll_title", this.getTypeCode()),
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