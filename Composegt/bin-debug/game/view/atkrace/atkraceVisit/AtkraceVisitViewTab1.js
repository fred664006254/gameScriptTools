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
var AtkraceVisitViewTab1 = (function (_super) {
    __extends(AtkraceVisitViewTab1, _super);
    function AtkraceVisitViewTab1() {
        var _this = _super.call(this) || this;
        _this.defenseList = [];
        _this._scrollList = null;
        _this.noDataTxt = null;
        /**
         * 这个参数没啥卵用还碍事，干掉
         */
        // public static AtkaceType:number =0;
        _this._bg = null;
        _this.initView();
        return _this;
    }
    AtkraceVisitViewTab1.prototype.initView = function () {
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
        // AtkraceVisitViewTab1.AtkaceType =0;
        NetManager.request(NetRequestConst.REQUEST_ATKRACE_INDEX, {});
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
    };
    /**
     * 切换页签
     */
    AtkraceVisitViewTab1.prototype.refreshWhenSwitchBack = function () {
        this.refreshViews();
    };
    AtkraceVisitViewTab1.prototype.useCallback = function (data) {
        if (data.data.ret) {
            this.refreshViews();
        }
        else {
            this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
        }
    };
    AtkraceVisitViewTab1.prototype.refreshViews = function () {
        this.defenseList = Api.atkraceVoApi.getDefendInfo();
        if (this.defenseList.length > 0) {
            this.showList();
            this.noDataTxt.text = "";
        }
        else {
            this.noDataTxt.text = LanguageManager.getlocal("atkracedes1");
        }
    };
    AtkraceVisitViewTab1.prototype.showList = function () {
        if (this._scrollList == null) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 655);
            this._scrollList = ComponentManager.getScrollList(ActrackVisitTab1Item, [], rect);
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2 - 5, 85);
        }
        this._scrollList.refreshData(this.defenseList);
    };
    AtkraceVisitViewTab1.prototype.dispose = function () {
        this.noDataTxt = null;
        this.defenseList = [];
        this._scrollList = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ATKRACE_INDEX), this.useCallback, this);
        // AtkraceVisitViewTab1.AtkaceType =0;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return AtkraceVisitViewTab1;
}(PopupViewTab));
__reflect(AtkraceVisitViewTab1.prototype, "AtkraceVisitViewTab1");
