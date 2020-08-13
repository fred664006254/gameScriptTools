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
var NewAtkraceCrossVisitViewTab1 = (function (_super) {
    __extends(NewAtkraceCrossVisitViewTab1, _super);
    function NewAtkraceCrossVisitViewTab1() {
        var _this = _super.call(this) || this;
        _this.defenseList = [];
        _this._scrollList = null;
        _this.noDataTxt = null;
        _this.initView();
        return _this;
    }
    NewAtkraceCrossVisitViewTab1.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 516;
        bg.height = 618;
        bg.x = 25;
        bg.y = 55;
        this.addChild(bg);
        AtkraceVisitViewTab1.AtkaceType = 0;
        NetManager.request(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL), this.useCallback, this);
    };
    NewAtkraceCrossVisitViewTab1.prototype.useCallback = function (data) {
        if (data.data.ret) {
            if (data.data.data.data.atkracecross.dinfo && data.data.data.data.atkracecross.dinfo.length >= 1) {
                this.defenseList = data.data.data.data.atkracecross.dinfo;
                if (AtkraceVisitViewTab1.AtkaceType == 0) {
                    this.showList();
                }
            }
            else {
                //没有数据消息
                if (this.noDataTxt == null) {
                    this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
                    this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                    this.noDataTxt.x = 220; //rankImg.x+60
                    this.noDataTxt.y = 300; //rankImg.y+10;
                }
                this.addChild(this.noDataTxt);
            }
        }
        else if (data.data.data.ret == -2) {
            //没有数据消息
            if (this.noDataTxt == null) {
                this.noDataTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_WHITE);
                this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
                this.noDataTxt.x = 220; //rankImg.x+60
                this.noDataTxt.y = 300; //rankImg.y+10;
            }
            this.addChild(this.noDataTxt);
        }
    };
    NewAtkraceCrossVisitViewTab1.prototype.showList = function () {
        if (this._scrollList == null) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 610);
            this._scrollList = ComponentManager.getScrollList(NewActrackCrossVisitTab1Item, this.defenseList, rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(-35, 60);
        }
    };
    NewAtkraceCrossVisitViewTab1.prototype.dispose = function () {
        this.noDataTxt = null;
        this.defenseList = [];
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_NEWATKRACECROSS_GETMODEL), this.useCallback, this);
        AtkraceCrossVisitViewTab1.AtkaceType = 0;
        _super.prototype.dispose.call(this);
    };
    NewAtkraceCrossVisitViewTab1.AtkaceType = 0;
    return NewAtkraceCrossVisitViewTab1;
}(PopupViewTab));
__reflect(NewAtkraceCrossVisitViewTab1.prototype, "NewAtkraceCrossVisitViewTab1");
//# sourceMappingURL=NewAtkraceCrossVisitViewTab1.js.map