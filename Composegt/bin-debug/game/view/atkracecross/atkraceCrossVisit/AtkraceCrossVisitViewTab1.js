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
 * 防守消息
 */
var AtkraceCrossVisitViewTab1 = (function (_super) {
    __extends(AtkraceCrossVisitViewTab1, _super);
    function AtkraceCrossVisitViewTab1() {
        var _this = _super.call(this) || this;
        _this.defenseList = [];
        _this._scrollList = null;
        _this.noDataTxt = null;
        _this._bg = null;
        _this.initView();
        return _this;
    }
    AtkraceCrossVisitViewTab1.prototype.initView = function () {
        this._bg = BaseBitmap.create("public_9v_bg12");
        this._bg.width = 530;
        this._bg.height = 678;
        this._bg.x = GameConfig.stageWidth / 2 - this._bg.width / 2 - 5;
        this._bg.y = 75;
        this.addChild(this._bg);
        // AtkraceVisitViewTab1.AtkaceType =0;
        NetManager.request(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
    };
    AtkraceCrossVisitViewTab1.prototype.useCallback = function (data) {
        if (data.data.ret) {
            if (data.data.data.data.atkracecross.dinfo && data.data.data.data.atkracecross.dinfo.length >= 1) {
                this.defenseList = data.data.data.data.atkracecross.dinfo;
                // if(AtkraceVisitViewTab1.AtkaceType ==0)
                // {
                this.showList();
                // }
            }
            else {
                //没有数据消息
                if (this.noDataTxt == null) {
                    this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                    this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                    this.noDataTxt.x = this._bg.x;
                    this.noDataTxt.width = this._bg.width;
                    this.noDataTxt.textAlign = "center";
                    this.noDataTxt.y = 300;
                }
                this.addChild(this.noDataTxt);
            }
        }
        else if (data.data.data.ret == -2) {
            //没有数据消息
            if (this.noDataTxt == null) {
                this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN_NEW);
                this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                this.noDataTxt.x = this._bg.x;
                this.noDataTxt.width = this._bg.width;
                this.noDataTxt.textAlign = "center";
                this.noDataTxt.y = 300;
            }
            this.addChild(this.noDataTxt);
        }
    };
    AtkraceCrossVisitViewTab1.prototype.showList = function () {
        if (this._scrollList == null) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 655);
            this._scrollList = ComponentManager.getScrollList(ActrackCrossVisitTab1Item, this.defenseList, rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, 85);
        }
    };
    AtkraceCrossVisitViewTab1.prototype.dispose = function () {
        this.noDataTxt = null;
        this.defenseList = [];
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACECROSS_GETMODEL), this.useCallback, this);
        AtkraceCrossVisitViewTab1.AtkaceType = 0;
        _super.prototype.dispose.call(this);
    };
    AtkraceCrossVisitViewTab1.AtkaceType = 0;
    return AtkraceCrossVisitViewTab1;
}(PopupViewTab));
__reflect(AtkraceCrossVisitViewTab1.prototype, "AtkraceCrossVisitViewTab1");
