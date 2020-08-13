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
var AtkraceCrossVisitViewTab2 = (function (_super) {
    __extends(AtkraceCrossVisitViewTab2, _super);
    function AtkraceCrossVisitViewTab2() {
        var _this = _super.call(this) || this;
        _this.einList = [];
        _this._scrollList = null;
        _this._bg = null;
        _this.initView();
        return _this;
    }
    AtkraceCrossVisitViewTab2.prototype.initView = function () {
        this._bg = BaseBitmap.create("public_9v_bg12");
        this._bg.width = 530;
        this._bg.height = 678;
        this._bg.x = GameConfig.stageWidth / 2 - this._bg.width / 2 - 5;
        this._bg.y = 75;
        this.addChild(this._bg);
        // AtkraceVisitViewTab1.AtkaceType =1;
        NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
    };
    AtkraceCrossVisitViewTab2.prototype.useCallback = function (data) {
        if (data.data.ret) {
            if (data.data.data.data.atkracecross.einfo) {
                this.einList = data.data.data.data.atkracecross.einfo;
                if (this.einList.length > 0) {
                    AtkraceCrossVisitViewTab1.AtkaceType = 1;
                    if (AtkraceCrossVisitViewTab1.AtkaceType == 1) {
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
    AtkraceCrossVisitViewTab2.prototype.shownoDataTxt = function () {
        //没有仇人消息
        var noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
        noDataTxt.text = LanguageManager.getlocal("atkracedes2");
        noDataTxt.width = this._bg.width;
        noDataTxt.textAlign = "center";
        noDataTxt.x = this._bg.x;
        noDataTxt.y = 300;
        this.addChild(noDataTxt);
    };
    AtkraceCrossVisitViewTab2.prototype.showList = function () {
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 640, 655);
        this._scrollList = ComponentManager.getScrollList(ActrackCrossVisitTab2Item, this.einList, rect);
        this.addChild(this._scrollList);
        this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, 85);
    };
    AtkraceCrossVisitViewTab2.prototype.dispose = function () {
        this.einList = [];
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
        _super.prototype.dispose.call(this);
        AtkraceCrossVisitViewTab1.AtkaceType = 1;
    };
    return AtkraceCrossVisitViewTab2;
}(PopupViewTab));
__reflect(AtkraceCrossVisitViewTab2.prototype, "AtkraceCrossVisitViewTab2");
