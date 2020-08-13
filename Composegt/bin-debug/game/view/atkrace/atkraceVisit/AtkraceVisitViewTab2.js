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
 * 仇人
 */
var AtkraceVisitViewTab2 = (function (_super) {
    __extends(AtkraceVisitViewTab2, _super);
    function AtkraceVisitViewTab2() {
        var _this = _super.call(this) || this;
        _this.einList = [];
        _this._scrollList = null;
        _this._bg = null;
        _this.noDataTxt = null;
        _this.initView();
        return _this;
    }
    AtkraceVisitViewTab2.prototype.initView = function () {
        this._bg = BaseBitmap.create("public_9v_bg12");
        this._bg.width = 530;
        this._bg.height = 678;
        this._bg.x = GameConfig.stageWidth / 2 - this._bg.width / 2 - 5;
        this._bg.y = 75;
        this.addChild(this._bg);
        this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        this.noDataTxt.x = this._bg.x;
        this.noDataTxt.width = this._bg.width;
        this.noDataTxt.textAlign = "center";
        this.noDataTxt.y = 300;
        this.addChild(this.noDataTxt);
        // AtkraceVisitViewTab1.AtkaceType =1;
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
    };
    /**
     * 切换页签
     */
    AtkraceVisitViewTab2.prototype.refreshWhenSwitchBack = function () {
    };
    AtkraceVisitViewTab2.prototype.useCallback = function (data) {
        if (data.data.ret) {
            this.refreshViews();
        }
        else {
            this.noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        }
    };
    AtkraceVisitViewTab2.prototype.refreshViews = function () {
        this.einList = Api.atkraceVoApi.getEnemyInfo();
        if (this.einList.length > 0) {
            this.showList();
            this.noDataTxt.text = "";
        }
        else {
            this.noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        }
    };
    AtkraceVisitViewTab2.prototype.showList = function () {
        if (!this._scrollList) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 655);
            this._scrollList = ComponentManager.getScrollList(ActrackVisitTab2Item, [], rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, 85);
        }
        this._scrollList.refreshData(this.einList);
    };
    AtkraceVisitViewTab2.prototype.dispose = function () {
        this._scrollList = null;
        this.noDataTxt = null;
        this.einList = [];
        this._bg = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
        _super.prototype.dispose.call(this);
        // AtkraceVisitViewTab1.AtkaceType=1;
    };
    return AtkraceVisitViewTab2;
}(PopupViewTab));
__reflect(AtkraceVisitViewTab2.prototype, "AtkraceVisitViewTab2");
