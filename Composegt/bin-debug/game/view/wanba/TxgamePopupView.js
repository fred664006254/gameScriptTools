/**
 * 实名认证领取奖励
 * author dky
 * date 2019/7/9
 * @class NewversionPopupView
 */
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
var TxgamePopupView = (function (_super) {
    __extends(TxgamePopupView, _super);
    function TxgamePopupView() {
        var _this = _super.call(this) || this;
        _this._inputContainer = null;
        _this._rechargeBtn = null;
        _this._nameInput = null;
        _this._idInput = null;
        return _this;
    }
    TxgamePopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "txgame_bg",
            "txgame_icon_closebtn",
        ]);
    };
    TxgamePopupView.prototype.initBg = function () {
        this.viewBg = BaseBitmap.create("txgame_bg");
        // this.viewBg.width = 640;
        // this.viewBg.height = 861;
        this.viewBg.setPosition(GameConfig.stageWidth / 2 - this.viewBg.width / 2, GameConfig.stageHeigth / 2 - this.viewBg.height / 2);
        this.addChild(this.viewBg);
    };
    TxgamePopupView.prototype.initView = function () {
        // let bg:BaseBitmap = BaseBitmap.create("realnamerewards_bg");
        // bg.setPosition(this.viewBg.width/2-bg.width/2,0);
        // this.addChildToContainer(bg);
        this.viewBg.addTouchTap(this.okBtnClick, this);
    };
    TxgamePopupView.prototype.okBtnClick = function () {
        if (App.DeviceUtil.IsHtml5()) {
            window.open("https://iwan.qq.com/fun/mindex?ADTAG=txsp.wd.xyx&hidetitlebar=1&autoplay=1");
            this.hide();
        }
    };
    //不显示标题名字
    TxgamePopupView.prototype.getTitleStr = function () {
        return null;
    };
    TxgamePopupView.prototype.getTitleBgName = function () {
        return null;
    };
    // 不使用组件的关闭按钮
    // protected getCloseBtnName():string
    // {
    // 	return null;
    // }
    /**
     * 重新一下关闭按钮
     *
     */
    TxgamePopupView.prototype.getCloseBtnName = function () {
        return "btn_win_closebtn";
    };
    TxgamePopupView.prototype.rechargeHandle = function () {
    };
    // protected getTitleStr():string
    // {
    // 	return "realname2PopupViewTitle";
    // }
    TxgamePopupView.prototype.getBgExtraHeight = function () {
        return 0;
    };
    TxgamePopupView.prototype.dispose = function () {
        this._inputContainer = null;
        this._nameInput = null;
        this._idInput = null;
        _super.prototype.dispose.call(this);
    };
    return TxgamePopupView;
}(PopupView));
__reflect(TxgamePopupView.prototype, "TxgamePopupView");
