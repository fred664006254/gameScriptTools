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
var WeiduanUpgradePopupView = (function (_super) {
    __extends(WeiduanUpgradePopupView, _super);
    function WeiduanUpgradePopupView() {
        return _super.call(this) || this;
    }
    WeiduanUpgradePopupView.prototype.initView = function () {
        var mask = new BaseShape();
        mask.graphics.beginFill(0, 0.7);
        mask.graphics.drawRect(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth);
        this.addChildAt(mask, 0);
        mask.touchEnabled = true;
        var nameStr = "更新";
        this.titleTF.text = nameStr;
        this.titleTF.x = (this.width - this.titleTF.width) / 2;
        var msgTxt = ComponentManager.getTextField("发现新版本，请更新", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_BROWN);
        msgTxt.setPosition((this.viewBg.width - msgTxt.width) / 2, 30);
        this.addChildToContainer(msgTxt);
        var btn = ComponentManager.getButton("btn_upgrade_yellow", "", this.clickConfirmHandler, this);
        btn.setText("更新", false);
        btn.setPosition((this.viewBg.width - btn.width) / 2, msgTxt.y + msgTxt.height + 20);
        this.addChildToContainer(btn);
    };
    WeiduanUpgradePopupView.prototype.getCloseBtnName = function () {
        return null;
    };
    WeiduanUpgradePopupView.prototype.clickConfirmHandler = function (data) {
        if (App.DeviceUtil.IsHtml5()) {
            window.open(this.param.data);
        }
    };
    WeiduanUpgradePopupView.prototype.hide = function () {
        //不关
    };
    WeiduanUpgradePopupView.prototype.dispose = function () {
        //不释放
    };
    return WeiduanUpgradePopupView;
}(PopupView));
__reflect(WeiduanUpgradePopupView.prototype, "WeiduanUpgradePopupView");
//# sourceMappingURL=WeiduanUpgradePopupView.js.map