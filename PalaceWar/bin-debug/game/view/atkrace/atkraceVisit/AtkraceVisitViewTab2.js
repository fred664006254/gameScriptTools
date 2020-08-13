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
        _this.initView();
        return _this;
    }
    AtkraceVisitViewTab2.prototype.initView = function () {
        this._bg = BaseBitmap.create("public_9_probiginnerbg");
        this._bg.width = 516;
        this._bg.height = 618;
        this._bg.x = 25 + 7;
        this._bg.y = 55;
        this.addChild(this._bg);
        AtkraceVisitViewTab1.AtkaceType = 1;
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback, this);
    };
    AtkraceVisitViewTab2.prototype.battleCallback = function () {
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_GETMODEL, {});
    };
    AtkraceVisitViewTab2.prototype.useCallback = function (data) {
        if (this._scrollList) {
            this._scrollList.dispose();
            this._scrollList = null;
        }
        if (data.data.ret) {
            if (data.data.data.data.atkrace.einfo) {
                this.einList = data.data.data.data.atkrace.einfo;
                if (this.einList.length > 0) {
                    AtkraceVisitViewTab1.AtkaceType = 1;
                    if (AtkraceVisitViewTab1.AtkaceType == 1) {
                        this.showList();
                    }
                }
                else {
                    this.shownoDataTxt();
                }
            }
        }
        else {
            this.shownoDataTxt();
        }
    };
    AtkraceVisitViewTab2.prototype.shownoDataTxt = function () {
        //没有仇人消息
        var noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
        noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        noDataTxt.x = 220; //rankImg.x+60
        if (PlatformManager.checkIsEnLang()) {
            noDataTxt.x = 570 / 2 - noDataTxt.width / 2;
        }
        noDataTxt.y = 300; //rankImg.y+10;
        this.addChild(noDataTxt);
    };
    AtkraceVisitViewTab2.prototype.showList = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 610);
        this._scrollList = ComponentManager.getScrollList(ActrackVisitTab2Item, this.einList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(-35, 60);
    };
    AtkraceVisitViewTab2.prototype.dispose = function () {
        this.einList = [];
        this._bg = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESET_ATKRACE, this.battleCallback, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_GETMODEL), this.useCallback, this);
        _super.prototype.dispose.call(this);
        AtkraceVisitViewTab1.AtkaceType = 1;
    };
    return AtkraceVisitViewTab2;
}(PopupViewTab));
__reflect(AtkraceVisitViewTab2.prototype, "AtkraceVisitViewTab2");
//# sourceMappingURL=AtkraceVisitViewTab2.js.map