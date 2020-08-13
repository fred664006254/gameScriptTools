/**
 * 奖励预览
 * date 2019.11.11
 * author ycg
 * @class AcHeroineRewardPopupView
 */
class AcHeroineRewardPopupView extends PopupView{
    // public tabbarGroup:TabBarGroup = null;
    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        this.refreshView();
    }

    public refreshView():void{
        if (!this.vo){
            return;
        }
        if (this.vo.isShowRechargeRedDot()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
    }

    protected getTabbarTextArr():string[]{
        return [
            "acHeroineRechargeTitle-"+this.getTypeCode(),
            "acHeroineClothesTitle-"+this.getTypeCode(),
            "acHeroineWifeTitle-"+this.getTypeCode(),
        ];
    }

    private getTypeCode():string{
        if (this.code == "2"){
            return "1";
        }
        else if (this.code == "4"){
            return "3";
        }
        else if (this.code == "6"){
            return "5";
        }
        else if (this.code == "8"){
            return "7";
        }
        else if (this.code == "10"){
            return "9";
        }
        return this.code;
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get cfg():Config.AcCfg.HeroineCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo():AcHeroineVo{
        return <AcHeroineVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected getShowHeight():number{
        return 830;
    }

    // protected getShowWidth():number{
    //     return 600;
    // }

    protected getTitleStr():string{
        return "acHeroineRewardPopupTitle-"+this.getTypeCode();
    }

    protected getResourceList():string[]{
        
        return super.getResourceList().concat([
            "progress3_bg", "progress5", "accarnivalview_tab_red", "accarnivalview_tab_green", "skin_detail_namebg",
        ]);
    }

    protected resetBgSize():void
    {
        super.resetBgSize();
        this.tabViewData[this.selectedTabIndex].x = 21;
    }

    protected changeTab():void
    {
        super.changeTab();
        this.tabViewData[this.selectedTabIndex].x = 21;
    }

    protected setTabBarPosition():void
	{
        super.setTabBarPosition();
        this.tabbarGroup.y -=5;
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        super.dispose();
    }
}