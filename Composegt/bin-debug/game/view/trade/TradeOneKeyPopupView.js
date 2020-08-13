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
 * 一键贸易  选择攻打多少关
 */
var TradeOneKeyPopupView = (function (_super) {
    __extends(TradeOneKeyPopupView, _super);
    function TradeOneKeyPopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        _this._maxNum = 0;
        _this._currId = "";
        return _this;
    }
    TradeOneKeyPopupView.prototype.initView = function () {
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        this._currId = Api.tradeVoApi.getCurrentCid();
        var maxNum = Api.tradeVoApi.getAttNum(Number(this._currId));
        this._maxNum = maxNum;
        if (this._maxNum > 200) {
            this._maxNum = 200;
        }
        var iconBg3 = BaseBitmap.create("public_hb_bg01");
        iconBg3.setPosition(60, 20);
        this.addChildToContainer(iconBg3);
        var resImg3 = BaseBitmap.create("public_icon2");
        resImg3.setPosition(iconBg3.x - resImg3.width / 2 + 10, iconBg3.y + iconBg3.height / 2 - resImg3.height / 2); //iconBg3.y+iconBg3.height-resImg3.height+5);
        this.addChildToContainer(resImg3);
        var GoldNum = App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
        var attText = ComponentManager.getTextField(GoldNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        attText.setPosition(90, iconBg3.y + iconBg3.height / 2 - attText.height / 2);
        this.addChildToContainer(attText);
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var cu_bg = BaseBitmap.create("public_tc_bg01");
        cu_bg.width = 520;
        cu_bg.height = 220;
        cu_bg.x = this.viewBg.x + this.viewBg.width / 2 - cu_bg.width / 2;
        cu_bg.y = 70;
        this.addChildToContainer(cu_bg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("conquestChooseAtt"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(70, cu_bg.y + 15);
        this.addChildToContainer(tip);
        var bottomBg = BaseBitmap.create("public_tc_bg03");
        bottomBg.width = 500;
        bottomBg.height = 150;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = cu_bg.y + 50;
        this.addChildToContainer(bottomBg);
        var car1 = this._currId;
        var car2 = Number(this._currId) + Api.tradeVoApi.getAttNum(Number(this._currId)) - 1;
        var catNumStr = LanguageManager.getlocal("tradeChooseNum", [car1.toString(), car2.toString()]);
        this._carNumTF = ComponentManager.getTextField(catNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._carNumTF.setPosition(80, bottomBg.y + 15);
        this.addChildToContainer(this._carNumTF);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress4tc_01", "progress4tc_02", this._maxNum, this.dragCallback, this, null, 1, 300);
        dragProgressBar.x = 158;
        dragProgressBar.y = 170;
        this.addChildToContainer(dragProgressBar);
        var cost1 = App.StringUtil.changeIntToText(Api.tradeVoApi.getAttCostNum(Number(this._currId), 1));
        var cost2 = App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
        var costNumStr = LanguageManager.getlocal("tradeCostNum", [cost1.toString(), cost2.toString()]);
        this._costNumTF = ComponentManager.getTextField(costNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        this._costNumTF.setPosition(this.viewBg.width / 2 - this._costNumTF.width / 2, dragProgressBar.y + dragProgressBar.height + 10);
        this.addChildToContainer(this._costNumTF);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.useHandler, this);
        useBtn.x = cu_bg.x + cu_bg.width / 2 - useBtn.width / 2;
        useBtn.y = cu_bg.y + cu_bg.height + 15;
        // useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
    };
    TradeOneKeyPopupView.prototype.dragCallback = function (curNum) {
        this._useNum = curNum;
        var _currentCid = Number(Api.tradeVoApi.getCurrentCid());
        var car1 = _currentCid - 1 + curNum;
        var car2 = _currentCid - 1 + Api.tradeVoApi.getAttNum(_currentCid);
        var catNumStr = LanguageManager.getlocal("tradeChooseNum", [car1.toString(), car2.toString()]);
        this._carNumTF.text = catNumStr;
        var cost1 = App.StringUtil.changeIntToText(Api.tradeVoApi.getAttCostNum(_currentCid, curNum));
        var cost2 = App.StringUtil.changeIntToText(Api.playerVoApi.getPlayerGold());
        var costNumStr = LanguageManager.getlocal("tradeCostNum", [cost1.toString(), cost2.toString()]);
        this._costNumTF.text = costNumStr;
    };
    TradeOneKeyPopupView.prototype.getTitleStr = function () {
        return "tradeBatchBtn";
    };
    TradeOneKeyPopupView.prototype.useHandler = function (param) {
        this._useCallback.apply(this._handler, [this._useNum - 1]);
        this.hide();
    };
    TradeOneKeyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress4tc_01", "progress4tc_02"
        ]);
    };
    TradeOneKeyPopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        this._carNumTF = null;
        this._costNumTF = null;
        this._maxNum = 0;
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return TradeOneKeyPopupView;
}(PopupView));
__reflect(TradeOneKeyPopupView.prototype, "TradeOneKeyPopupView");
