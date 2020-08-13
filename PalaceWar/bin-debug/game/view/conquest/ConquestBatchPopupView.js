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
 * 一键征伐选择波数
 * author dky
 * date 2017/1/3
 * @class ConquestBatchPopupView
 */
var ConquestBatchPopupView = (function (_super) {
    __extends(ConquestBatchPopupView, _super);
    // private _numBg:BaseBitmap;
    function ConquestBatchPopupView() {
        var _this = _super.call(this) || this;
        _this._useNum = 1;
        // private _maxNumTF:BaseTextField;
        _this._maxNum = 0;
        return _this;
    }
    ConquestBatchPopupView.prototype.initView = function () {
        this._useCallback = this.param.data.callback;
        this._handler = this.param.data.handler;
        var conVo = Api.conquestVoApi.getConquestVo();
        var maxNum = Api.conquestVoApi.getAttNum(conVo.info.cid);
        this._maxNum = maxNum;
        if (this._maxNum > 200) {
            this._maxNum = 200;
        }
        // this._maxNum = 200;
        var iconBg3 = BaseBitmap.create("mainui_topresbg");
        iconBg3.setPosition(40 + GameData.popupviewOffsetX, 20);
        this.addChildToContainer(iconBg3);
        var resImg3 = BaseBitmap.create("public_icon4");
        resImg3.setPosition(iconBg3.x - resImg3.width / 2, iconBg3.y + iconBg3.height - resImg3.height + 5);
        this.addChildToContainer(resImg3);
        var soldierNum = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
        var attText = ComponentManager.getTextField(soldierNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        attText.setPosition(70 + GameData.popupviewOffsetX, iconBg3.y + iconBg3.height / 2 - attText.height / 2);
        this.addChildToContainer(attText);
        var effectTitle = LanguageManager.getlocal("effectTitle");
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 520;
        bg.height = 220;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 70;
        this.addChildToContainer(bg);
        var tip = ComponentManager.getTextField(LanguageManager.getlocal("conquestChooseAtt"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        tip.setPosition(50 + GameData.popupviewOffsetX, bg.y + 15);
        this.addChildToContainer(tip);
        var bottomBg = BaseBitmap.create("public_9_probiginnerbg");
        bottomBg.width = 500;
        bottomBg.height = 150;
        bottomBg.x = this.viewBg.x + this.viewBg.width / 2 - bottomBg.width / 2;
        bottomBg.y = bg.y + 50;
        this.addChildToContainer(bottomBg);
        var car1 = conVo.info.cid;
        var car2 = conVo.info.cid + Api.conquestVoApi.getAttNum(conVo.info.cid) - 1;
        var catNumStr = LanguageManager.getlocal("conquestChooseNum", [car1.toString(), car2.toString()]);
        // let catNumStr = LanguageManager.getlocal("conquestChooseNum",[conVo.info.cid,conVo.info.cid + Api.conquestVoApi.getAttNum(conVo.info.cid)]);
        this._carNumTF = ComponentManager.getTextField(catNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._carNumTF.setPosition(50 + GameData.popupviewOffsetX, bottomBg.y + 15);
        this.addChildToContainer(this._carNumTF);
        var dragProgressBar = ComponentManager.getDragProgressBar("progress2", "progress2_bg", this._maxNum, this.dragCallback, this);
        dragProgressBar.x = 140 + GameData.popupviewOffsetX;
        dragProgressBar.y = 170;
        this.addChildToContainer(dragProgressBar);
        var cost1 = App.StringUtil.changeIntToText(Api.conquestVoApi.getAttCostNum(conVo.info.cid, 1));
        var cost2 = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
        var costNumStr = LanguageManager.getlocal("conquestCostNum", [cost1.toString(), cost2.toString()]);
        this._costNumTF = ComponentManager.getTextField(costNumStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        this._costNumTF.setPosition(this.viewBg.width / 2 - this._costNumTF.width / 2, dragProgressBar.y + dragProgressBar.height + 10);
        this.addChildToContainer(this._costNumTF);
        var useBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "useBtn", this.useHandler, this);
        useBtn.x = bg.x + bg.width / 2 - useBtn.width / 2;
        useBtn.y = bg.y + bg.height + 25;
        useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(useBtn);
    };
    ConquestBatchPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    ConquestBatchPopupView.prototype.dragCallback = function (curNum) {
        // if(){
        // }
        this._useNum = curNum;
        // egret.log("curNum"+curNum)
        var conVo = Api.conquestVoApi.getConquestVo();
        var car1 = conVo.info.cid - 1 + curNum;
        var car2 = conVo.info.cid - 1 + Api.conquestVoApi.getAttNum(conVo.info.cid);
        var catNumStr = LanguageManager.getlocal("conquestChooseNum", [car1.toString(), car2.toString()]);
        this._carNumTF.text = catNumStr;
        var cost1 = App.StringUtil.changeIntToText(Api.conquestVoApi.getAttCostNum(conVo.info.cid, curNum));
        var cost2 = App.StringUtil.changeIntToText(Api.playerVoApi.getSoldier());
        var costNumStr = LanguageManager.getlocal("conquestCostNum", [cost1.toString(), cost2.toString()]);
        this._costNumTF.text = costNumStr;
    };
    // protected getContainerY():number
    // {
    // 	return 0;
    // }
    ConquestBatchPopupView.prototype.getTitleStr = function () {
        return "conquestAll";
    };
    ConquestBatchPopupView.prototype.useHandler = function (param) {
        this._useCallback.apply(this._handler, [this._useNum - 1]);
        this.hide();
    };
    ConquestBatchPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "progress2_bg", "progress2"
        ]);
    };
    ConquestBatchPopupView.prototype.dispose = function () {
        this._useCallback = null;
        this._useNum = 1;
        this._carNumTF = null;
        this._costNumTF = null;
        this._maxNum = 0;
        this._handler = null;
        _super.prototype.dispose.call(this);
    };
    return ConquestBatchPopupView;
}(PopupView));
__reflect(ConquestBatchPopupView.prototype, "ConquestBatchPopupView");
//# sourceMappingURL=ConquestBatchPopupView.js.map