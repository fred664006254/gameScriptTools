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
var AutoResPopupView = (function (_super) {
    __extends(AutoResPopupView, _super);
    function AutoResPopupView() {
        var _this = _super.call(this) || this;
        _this.typeCfg = {
            "1": "onhookDesc",
            "2": "offlieDesc" //离线
        };
        return _this;
    }
    AutoResPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AutoResPopupView.prototype.getTypeLocalKey = function () {
        return this.typeCfg[this.param.data.type];
    };
    AutoResPopupView.prototype.getTitleParams = function () {
        return [LanguageManager.getlocal(this.getTypeLocalKey())];
    };
    AutoResPopupView.prototype.initView = function () {
        var containerBg = BaseBitmap.create("public_9_bg4");
        containerBg.width = 520;
        containerBg.height = 224;
        containerBg.setPosition((this.viewBg.width - containerBg.width) / 2, containerBg.y + 15);
        this.addChildToContainer(containerBg);
        var descText = ComponentManager.getTextField(LanguageManager.getlocal("autoResPopupViewDesc", this.getTitleParams()), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        descText.setPosition(containerBg.x + (containerBg.width - descText.width) / 2, containerBg.y + 20);
        this.addChildToContainer(descText);
        var confirmBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "sysConfirm", this.hide, this);
        confirmBtn.setPosition(containerBg.x + (containerBg.width - confirmBtn.width) / 2, containerBg.y + containerBg.height + 20);
        this.addChildToContainer(confirmBtn);
        var index = 0;
        if (Api.manageVoApi.getAutoGold() != 0) {
            this.getResIcon("gold", index);
            index++;
        }
        if (Api.manageVoApi.getAutoFood() != 0) {
            this.getResIcon("food", index);
            index++;
        }
        if (Api.manageVoApi.getAutoSoldier() != 0) {
            this.getResIcon("soldier", index);
            index++;
        }
    };
    AutoResPopupView.prototype.getResIcon = function (type, index) {
        var resBg = BaseBitmap.create("public_resnumbg");
        resBg.setPosition(200, 80 + 50 * index);
        this.addChildToContainer(resBg);
        var resName;
        var resNum;
        if (type == "gold") {
            resName = "public_icon2";
            resNum = Api.manageVoApi.getAutoGold();
        }
        else if (type == "food") {
            resName = "public_icon3";
            resNum = Api.manageVoApi.getAutoFood();
        }
        else if (type == "soldier") {
            resName = "public_icon4";
            resNum = Api.manageVoApi.getAutoSoldier();
        }
        var resIcon = BaseBitmap.create(resName);
        resIcon.setPosition(resBg.x, resBg.y + (resBg.height - resIcon.height) / 2 - 3);
        this.addChildToContainer(resIcon);
        var resNumText = ComponentManager.getTextField(resNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        resNumText.setPosition(resIcon.x + resIcon.width, resBg.y + (resBg.height - resNumText.height) / 2);
        this.addChildToContainer(resNumText);
    };
    return AutoResPopupView;
}(PopupView));
__reflect(AutoResPopupView.prototype, "AutoResPopupView");
