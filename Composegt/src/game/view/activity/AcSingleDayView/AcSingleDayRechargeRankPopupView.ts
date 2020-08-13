/**
 * 双11排行榜
 * @author 张朝阳
 * date 2018/10/25
 * @class AcSingleDayRechargeRankPopupView
 */
class AcSingleDayRechargeRankPopupView extends PopupView {
    private _scrollList: ScrollList = null;
    private _myrankArr = null;
    private _rankArr = null;
    private _vo:AcSingleDayVo = null;
    public constructor() {
        super();
    }

    public initView() {
        this._myrankArr = this.param.data.rankData.myrankArr;
        this._rankArr = this.param.data.rankData.rankArr;
        this._vo = this.param.data.vo;
        let bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 535;
        bg.height = 690;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 30);
        this.addChildToContainer(bg);

        let topbg = BaseBitmap.create("public_tc_bg03");
        topbg.width = bg.width - 20;
        topbg.height = 535;
        topbg.setPosition(bg.x + 10, bg.y + 10);
        this.addChildToContainer(topbg);

        let buttombg = BaseBitmap.create("public_tc_bg03");
        buttombg.width = bg.width - 20;
        buttombg.height = 125;
        buttombg.setPosition(bg.x + 10, topbg.y + topbg.height + 10);
        this.addChildToContainer(buttombg);

        let titlebg = BaseBitmap.create("rank_biao");
        titlebg.setPosition(topbg.x + topbg.width / 2 - titlebg.width / 2, topbg.y + 15);
        this.addChildToContainer(titlebg);

        let rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewRank"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        rankTxt.setPosition(titlebg.x + 60 - rankTxt.width / 2, titlebg.y + titlebg.height / 2 - rankTxt.height / 2);
        this.addChildToContainer(rankTxt);

        let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewName"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        nameTxt.setPosition(titlebg.x + 235 - nameTxt.width / 2, rankTxt.y);
        this.addChildToContainer(nameTxt);

        let rechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewRechargeGem"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW)
        rechargeTxt.setPosition(titlebg.x + 410 - rechargeTxt.width / 2, rankTxt.y);
        this.addChildToContainer(rechargeTxt);

        let rect = new egret.Rectangle(0, 0, titlebg.width, topbg.y + topbg.width - titlebg.y - titlebg.height - 5);
        this._scrollList = ComponentManager.getScrollList(AcSingleDayRechargeRankPopupViewItem, this._rankArr, rect);
        this._scrollList.setPosition(titlebg.x, titlebg.y + titlebg.height + 5);
        this.addChildToContainer(this._scrollList);

        let myNameTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyName", [Api.playerVoApi.getPlayerName()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        myNameTxt.setPosition(buttombg.x + 30, buttombg.y + 20);
        this.addChildToContainer(myNameTxt);

        let myRankStr = "";
        if (this._myrankArr.myrank) {
            myRankStr = this._myrankArr.myrank;
        }
        else {
            myRankStr = LanguageManager.getlocal("allianceRankNoRank");
        }
        let myRankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyRank", [myRankStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        myRankTxt.setPosition(myNameTxt.x, myNameTxt.y + myNameTxt.height + 13);
        this.addChildToContainer(myRankTxt);

        let myRechargeTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewMyRechargeGem", [String(this._vo.getUseGemNum())]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        myRechargeTxt.setPosition(buttombg.x + buttombg.width - myRechargeTxt.width - 25, myNameTxt.y);
        this.addChildToContainer(myRechargeTxt);

        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acSingleDayRechargePopupViewDesc", [this._vo.config.rankNeed]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
        descTxt.setPosition(myRankTxt.x, myRankTxt.y + myRankTxt.height + 13);
        this.addChildToContainer(descTxt);

    }
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
            "rank_biao",
        ]);
    }
    protected getTitleStr(): string {
        return "acSingleDayRechargePopupViewTitle";
    }
    protected getShowHeight(): number {
        return 855;
    }
    public dispose(): void {
        this._scrollList = null;
        this._myrankArr = null;
        this._rankArr = null;
        this._vo = null;
        super.dispose();
    }

}