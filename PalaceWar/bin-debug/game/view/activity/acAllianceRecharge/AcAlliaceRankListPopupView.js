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
var AcAlliaceRankListPopupView = (function (_super) {
    __extends(AcAlliaceRankListPopupView, _super);
    function AcAlliaceRankListPopupView() {
        var _this = _super.call(this) || this;
        _this._aid = "";
        _this._code = "";
        _this._acRankInfoVo = null;
        _this._allirank = null;
        _this.dataList = null;
        return _this;
    }
    AcAlliaceRankListPopupView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.height = 800;
        this.addChildToContainer(this._nodeContainer);
        var startY = 20;
        var bg1 = BaseBitmap.create("public_9_bg32");
        bg1.width = 520;
        bg1.height = 700 - 5;
        bg1.x = this.viewBg.width / 2 - bg1.width / 2;
        this._nodeContainer.addChild(bg1);
        var titleTxt2Str = LanguageManager.getlocal("acRankPop_title2");
        var bg2 = BaseBitmap.create("public_9_bg33");
        bg2.width = bg1.width;
        bg2.height = 40;
        bg1.y = startY;
        bg2.x = bg1.x;
        bg2.y = bg1.y;
        this._nodeContainer.addChild(bg2);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("acAlliance_Serial"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt1.x = bg2.x + 40;
        titleTxt1.y = bg2.y + 8;
        this._nodeContainer.addChild(titleTxt1);
        var titleTxt2 = ComponentManager.getTextField(titleTxt2Str, titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt2.name = "titleTxt2";
        titleTxt2.x = bg2.x + 195;
        titleTxt2.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt2);
        var titleTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acAlliance_pos"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTxt3.name = "titleTxt3";
        titleTxt3.x = bg2.x + 365;
        titleTxt3.y = titleTxt1.y;
        this._nodeContainer.addChild(titleTxt3);
        var rect = new egret.Rectangle(0, 0, this.viewBg.width, bg1.height - 60);
        var scrollView = ComponentManager.getScrollList(AcAlliaceListScrollItem, this.dataList, rect);
        scrollView.y = bg2.y + 50;
        scrollView.x = GameData.popupviewOffsetX;
        this._nodeContainer.addChild(scrollView);
        scrollView.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        this._scrollView = scrollView;
        var downDes = ComponentManager.getTextField(LanguageManager.getlocal("acAlliaceRechargeDes"), titleTxt1.size, TextFieldConst.COLOR_LIGHT_YELLOW);
        downDes.name = "titleTxt3";
        downDes.x = bg1.x + bg1.width / 2 - downDes.width / 2;
        downDes.y = bg1.height + 30;
        this._nodeContainer.addChild(downDes);
    };
    AcAlliaceRankListPopupView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_GETALLICHARGECOUNTINFO, requestData: { activeId: AcConst.AID_AllIANCERECHARGECOUNT + "-" + this.param.data.code } };
    };
    AcAlliaceRankListPopupView.prototype.receiveData = function (data) {
        if (data.ret) {
            this.dataList = data.data.data.chargeList;
        }
    };
    AcAlliaceRankListPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcAlliaceRankListPopupView.prototype.dispose = function () {
        this._aid = "";
        this._code = "";
        this._nodeContainer = null;
        this._acRankInfoVo = null;
        this._scrollView = null;
        this._allirank = null;
        _super.prototype.dispose.call(this);
    };
    return AcAlliaceRankListPopupView;
}(PopupView));
__reflect(AcAlliaceRankListPopupView.prototype, "AcAlliaceRankListPopupView");
//# sourceMappingURL=AcAlliaceRankListPopupView.js.map