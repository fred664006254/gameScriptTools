/**
* 席位信息
* date 2020.5.12
* author ycg
* @name SixSection1SeatInfoPopupView
*/
class SixSection1SeatInfoPopupView extends PopupView{

    public constructor() {
        super();
    }

    protected getTitleStr():string{
        return "sixSection1SeatInfoPopupTitle";
    }

    protected getResourceList():string[]{
        let list:string[] = [];
        return super.getResourceList().concat(
            "public_popupscrollitembg", "public_titlebg", "common_select_frame2", "settingview_line",
        ).concat(list);
    }

    public initView():void{
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        let tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if(tab){
            this.clickTabbarHandler({index : tab - 1}); 
            this.selectedTabIndex = tab - 1;
            this.tabbarGroup.selectedIndex = tab - 1;
        }

        // let tipBg = BaseBitmap.create("sixsection1_popbottombg");
        // tipBg.setPosition(this.viewBg.x + this.viewBg.width/2 - tipBg.width/2, this.viewBg.y + this.getShowHeight() - 200);
        // this.addChildToContainer(tipBg);
        // tipBg.visible = false;
        // let tip = ComponentManager.getTextField(LanguageManager.getlocal("sixSection1HoldTitleTip"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        // tip.setPosition(tipBg.x + tipBg.width/2 - tip.width/2, tipBg.y + tipBg.height - 40);
        // this.addChildToContainer(tip);
        this.checkTabRed();
    }

    public checkTabRed():void{
        if (Api.sixsection1VoApi.checkMySeatRed()){
            this.tabbarGroup.addRedPoint(0);
        }
        else{
            this.tabbarGroup.removeRedPoint(0);
        }
        if (Api.sixsection1VoApi.checkSeatDefenRed()){
            this.tabbarGroup.addRedPoint(1);
        }
        else{
            this.tabbarGroup.removeRedPoint(1);
        }
        if (Api.sixsection1VoApi.checkSeatEnemyRed()){
            this.tabbarGroup.addRedPoint(2);
        }
        else{
            this.tabbarGroup.removeRedPoint(2);
        }
    }

    public tick():void{
        this.checkTabRed();
    }

    protected setTabBarPosition():void {
        this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.viewBg.y + 70-16;
    }

    protected getTabbarName():string[]|string{
        return ButtonConst.BTN2_SMALL_TAB;
    }

    protected getTabbarTextArr():string[]{
        return [
            "sixSection1SeatInfoTabName1",
            "sixSection1SeatInfoTabName2",
            "sixSection1SeatInfoTabName3",
            "sixSection1SeatInfoTabName4",
        ];
    }

    protected getShowHeight():number{
        return 810;
    }

    public dispose():void{
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SIXSECTION1_CLOSE_REFRESH, this.hide, this);
        super.dispose();
    }
}