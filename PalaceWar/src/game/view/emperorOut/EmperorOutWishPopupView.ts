/**
 * 请安列表
 * date 2019.12.10
 * author ycg
 * @class EmperorTourWishPopupView
 */
class EmperorOutWishPopupView extends PopupView{
    private _rewardNumTip:BaseTextField = null;
    private _scrollList:ScrollList = null;
    private _data:any[] =[];

    public constructor(){
        super();
    }

    public initView():void{
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.freshList, this);
        this._data = Api.emperorAchieveVoApi.sortWishListData(this.param.data.data);

        let viewBg = BaseBitmap.create("decree_popbg");
        viewBg.height = this.getShowHeight();
        viewBg.setPosition(GameConfig.stageWidth/2 - viewBg.width/2, GameConfig.stageHeigth/2 - viewBg.height/2);
        this.addChildToContainer(viewBg);
        this.closeBtn.y = viewBg.y - 10;
        this.closeBtn.x = viewBg.x + viewBg.width - 80;

        let title = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishTitle"), TextFieldConst.FONTSIZE_TITLE_COMMON, TextFieldConst.COLOR_WHITE);
        title.setPosition(viewBg.x + viewBg.width/2 - title.width/2, viewBg.y + 20);
        this.addChildToContainer(title);

        let topInfo = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishTopMsg", [""+Config.EmperoroutingCfg.bonusTimes, ""+Config.EmperoroutingCfg.popularity]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        topInfo.width = 520;
        topInfo.lineSpacing = 5;
        topInfo.setPosition(viewBg.x + viewBg.width/2 - topInfo.width/2, viewBg.y + 70);
        this.addChildToContainer(topInfo);

        let bonusData = Api.emperorAchieveVoApi.getBonusData();
        let num = Config.EmperoroutingCfg.bonusTimes;
        if (bonusData){
            let rNum = Object.keys(bonusData).length;
            num = num - rNum;
        }
        let rewardNumTip = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishRewardTip", [""+num]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        rewardNumTip.setPosition(topInfo.x, topInfo.y + topInfo.height + 5);
        this.addChildToContainer(rewardNumTip);
        this._rewardNumTip = rewardNumTip;

        let bg = BaseBitmap.create("public_9_bg36");
        bg.width = viewBg.width - 88;
        bg.height = this.getShowHeight() - 190;
        bg.setPosition(viewBg.x + viewBg.width/2 - bg.width/2, rewardNumTip.y + rewardNumTip.height + 10);
        this.addChildToContainer(bg);

        let topBg = BaseBitmap.create("public_9_bg37");
        topBg.width = bg.width;
        topBg.height = 28;
        topBg.setPosition(bg.x, bg.y);
        this.addChildToContainer(topBg);

        let roleName = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        roleName.anchorOffsetX = roleName.width/2;
        roleName.setPosition(topBg.x + 100, topBg.y + 5);
        this.addChildToContainer(roleName);

        let roleLevel = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListLevel"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        roleLevel.anchorOffsetX = roleLevel.width/2;
        roleLevel.setPosition(topBg.x + topBg.width/2 - 20, topBg.y + 5);
        this.addChildToContainer(roleLevel);

        let wishNumTitle = ComponentManager.getTextField(LanguageManager.getlocal("emperorOutWishListWishNum"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        wishNumTitle.anchorOffsetX = roleLevel.width/2;
        wishNumTitle.setPosition(topBg.x + topBg.width/2 + 90, topBg.y + 5);
        this.addChildToContainer(wishNumTitle);

        let data = this._data;
        let rect = new egret.Rectangle(0, 0, 532, 550);
        let list = ComponentManager.getScrollList(EmperorOutWishScrollItem, data, rect, {uid: this.param.data.uid});
        list.setPosition(topBg.x, topBg.y + topBg.height + 6);
        this.addChildToContainer(list);
        this._scrollList = list;
    }

    private freshList(evt:egret.Event){
        if (evt && evt.data && evt.data.ret){
            App.CommonUtil.showTip(LanguageManager.getlocal("emperorOutWishListSuccess"));
            let bonusData = Api.emperorAchieveVoApi.getBonusData();
            let num = Config.EmperoroutingCfg.bonusTimes
            if (bonusData){
                let rNum = Object.keys(bonusData).length;
                num = num - rNum;
            }
            this._rewardNumTip.text = LanguageManager.getlocal("emperorOutWishRewardTip", [""+num]);
            this._scrollList.refreshData(this._data, {uid: this.param.data.uid});
        }
    }


    public getShowHeight():number{
        return 780;
    }

    protected getBgName():string{
        return null;
    }

    protected getTitleBgName():string{
        return null;
    }

    protected getTitleStr():string{
        return null;
    }


    public getResourceList():string[]{
        return super.getResourceList().concat([
            "decree_popbg", "emperorout_allianceflag", "emperorout_rewardbtn", "emperorout_rewardbtn_down", "emperorout_rewardflag"
        ]);
    }

    public dispose():void{
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_EMPERORACHIEVE_BONUS, this.freshList, this);
        this._rewardNumTip = null;
        this._scrollList = null;
        this._data = [];
        super.dispose();
    }
}