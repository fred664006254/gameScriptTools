var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
 * 皇宫历史
 * author yanyuling
 * date 2017/11/02
 * @class PalaceHistoryPopupView
 */
var PalaceHistoryPopupView = (function (_super) {
    __extends(PalaceHistoryPopupView, _super);
    function PalaceHistoryPopupView() {
        var _this = _super.call(this) || this;
        _this._rankData = [];
        return _this;
    }
    PalaceHistoryPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        var titleId = this.param.data.titleId;
        var titlecfg = Config.TitleCfg.getTitleCfgById(titleId);
        var isCross = titlecfg.isCross;
        var isOnly = titlecfg.isOnly;
        var startY = 10;
        var bg1 = BaseBitmap.create("public_9_probiginnerbg");
        bg1.width = 520;
        bg1.height = 640;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        bg1.y = startY;
        this.addChildToContainer(bg1);
        var bg2 = BaseBitmap.create("public_9_bg37");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this.addChildToContainer(bg2);
        // startY = bg2.y ;
        var rank = this._rankData;
        if (rank.length == 0 || Object.keys(rank).length == 0) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_empty"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            tipTxt.x = bg1.x + bg1.width / 2 - tipTxt.width / 2;
            tipTxt.y = bg1.y + bg1.height / 2 - tipTxt.height / 2 + 10;
            this.addChildToContainer(tipTxt);
        }
        // startY += 12;
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title1"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 20;
        titleTxt1.y = bg2.y + bg2.height / 2 - titleTxt1.height / 2;
        this.addChildToContainer(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title2"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.x = bg2.x + 150;
        titleTxt2.y = titleTxt1.y;
        this.addChildToContainer(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title3"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        //权势
        if (isOnly == 0) {
            titleTxt3.text = LanguageManager.getlocal("rankpower");
        }
        else {
            titleTxt1.text = LanguageManager.getlocal("palace_history_title6");
        }
        titleTxt3.x = bg2.x + 380;
        titleTxt3.y = titleTxt1.y;
        this.addChildToContainer(titleTxt3);
        var kingsTxt = undefined;
        if (Config.TitleCfg.isTheKingTitleId(titleId)) {
            kingsTxt = ComponentManager.getTextField(LanguageManager.getlocal("palace_history_title5"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
            kingsTxt.x = bg2.x + 250;
            kingsTxt.y = titleTxt1.y;
            this.addChildToContainer(kingsTxt);
            titleTxt2.x = bg2.x + 110;
            titleTxt3.x = bg2.x + 400;
            titleTxt1.text = LanguageManager.getlocal("palace_history_title6");
        }
        var titleTxt4;
        if (isCross == 1) {
            titleTxt2.x -= 30;
            titleTxt3.x += 20;
            //区服
            titleTxt4 = ComponentManager.getTextField(LanguageManager.getlocal("atkraceServerDesc"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt4.x = bg2.x + 260;
            titleTxt4.y = titleTxt1.y;
            this.addChildToContainer(titleTxt4);
        }
        startY = 5;
        var totalLen = rank.length;
        for (var index = 0; index < totalLen; index++) {
            var baseColor = TextFieldConst.COLOR_WHITE;
            if (rank[index][0] == Api.playerVoApi.getPlayerID()) {
                baseColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            }
            var rankTxt = ComponentManager.getTextField(String(index + 1), titleTxt1.size, baseColor);
            rankTxt.x = titleTxt1.x + titleTxt1.width / 2 - rankTxt.width / 2;
            rankTxt.y = startY;
            this._nodeContainer.addChild(rankTxt);
            var nameTxt = ComponentManager.getTextField(rank[index][1], titleTxt1.size, baseColor);
            nameTxt.width = 600;
            nameTxt.textAlign = egret.HorizontalAlign.CENTER;
            nameTxt.anchorOffsetX = nameTxt.width / 2;
            nameTxt.x = titleTxt2.x + titleTxt2.width / 2; // - nameTxt.width/2;
            nameTxt.y = startY;
            this._nodeContainer.addChild(nameTxt);
            if (Config.TitleCfg.isTheKingTitleId(titleId)) {
                var kingsTitleTxt3 = ComponentManager.getTextField(rank[index][3], titleTxt1.size, baseColor);
                kingsTitleTxt3.textAlign = egret.HorizontalAlign.CENTER;
                kingsTitleTxt3.anchorOffsetX = kingsTitleTxt3.width / 2;
                kingsTitleTxt3.x = kingsTxt.x + kingsTxt.width / 2; // - nameTxt.width/2;
                kingsTitleTxt3.y = startY;
                this._nodeContainer.addChild(kingsTitleTxt3);
            }
            var timeTxt = ComponentManager.getTextField("", titleTxt1.size, baseColor);
            if (isOnly == 0) {
                timeTxt.text = rank[index][2];
            }
            else {
                timeTxt.text = App.DateUtil.getFormatBySecond(rank[index][2], 2);
            }
            timeTxt.x = titleTxt3.x + titleTxt3.width / 2 - timeTxt.width / 2;
            timeTxt.y = startY;
            this._nodeContainer.addChild(timeTxt);
            if (isCross == 1) {
                var zoneTxt = ComponentManager.getTextField("", titleTxt1.size, baseColor);
                // let zid =rank[index][4];
                // if(zid){
                //      zoneTxt.text = LanguageManager.getlocal("ranserver2",[rank[index][4]])  + LanguageManager.getlocal("palace_history_title4",[rank[index][3]]);
                // }else{
                zoneTxt.text = Api.mergeServerVoApi.getAfterMergeSeverName(rank[index][0]); //  LanguageManager.getlocal("palace_history_title4",[rank[index][3]]);
                // }
                zoneTxt.x = titleTxt4.x + titleTxt4.width / 2 - zoneTxt.width / 2;
                zoneTxt.y = startY;
                this._nodeContainer.addChild(zoneTxt);
            }
            var lineImg = BaseBitmap.create("public_line1");
            lineImg.x = this.viewBg.width / 2 - lineImg.width / 2;
            lineImg.y = startY + 30;
            this._nodeContainer.addChild(lineImg);
            startY += 45;
        }
        this._nodeContainer.height += 20;
        // this._nodeContainer.touchEnabled = true;
        var rect = new egret.Rectangle(0, 10, this.viewBg.width, bg1.height - +bg2.height - 5);
        var scrollView = ComponentManager.getScrollView(this._nodeContainer, rect);
        scrollView.horizontalScrollPolicy = "off";
        scrollView.y = bg1.y + bg2.height + 5;
        this.addChildToContainer(scrollView);
    };
    PalaceHistoryPopupView.prototype.getShowHeight = function () {
        return 760;
    };
    PalaceHistoryPopupView.prototype.getRequestData = function () {
        if (this.param.data.dataList) {
            this._rankData = this.param.data.dataList;
            return null;
        }
        var titleId = this.param.data.titleId;
        return { requestType: NetRequestConst.REQUEST_PALACE_GETPALACERANK, requestData: { titleId: titleId } };
    };
    PalaceHistoryPopupView.prototype.receiveData = function (data) {
        if (data && data.ret == true) {
            this._rankData = data.data.data.palacerank;
        }
    };
    PalaceHistoryPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    // 标题背景名称
    PalaceHistoryPopupView.prototype.getTitleStr = function () {
        return "palaceHistoryPopupViewTitle2";
    };
    PalaceHistoryPopupView.prototype.getTitleParams = function () {
        if (PlatformManager.checkIsEnLang()) {
            return [""];
        }
        else {
            return [LanguageManager.getlocal("palace_titleName" + this.param.data.titleId)];
        }
    };
    PalaceHistoryPopupView.prototype.dispose = function () {
        this._nodeContainer = null;
        this._rankData = [];
        _super.prototype.dispose.call(this);
    };
    PalaceHistoryPopupView.titleId = "";
    return PalaceHistoryPopupView;
}(PopupView));
__reflect(PalaceHistoryPopupView.prototype, "PalaceHistoryPopupView");
//# sourceMappingURL=PalaceHistoryPopupView.js.map