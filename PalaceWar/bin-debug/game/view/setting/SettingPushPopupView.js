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
var SettingPushPopupView = (function (_super) {
    __extends(SettingPushPopupView, _super);
    function SettingPushPopupView() {
        var _this = _super.call(this) || this;
        _this._checkBoxes = [];
        return _this;
    }
    SettingPushPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 520;
        bg.height = 300;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 25;
        this.addChildToContainer(bg);
        var pushArray = ["bookroom", "child", "dailyboss1", "dailyboss2", "rankActive"];
        var scrollContiner = new BaseDisplayObjectContainer();
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, bg.width, bg.height);
        var scrollView = ComponentManager.getScrollView(scrollContiner, rect);
        scrollView.setPosition(bg.x, bg.y);
        this.addChildToContainer(scrollView);
        var puInfo = Api.otherInfoVoApi.getPushInfo();
        for (var i = 0; i < pushArray.length; i++) {
            var cb = ComponentManager.getCheckBox(LanguageManager.getlocal("settingPush_" + pushArray[i]));
            cb.setPosition(50 + GameData.popupviewOffsetX, 20 + i * 50);
            cb.name = pushArray[i];
            scrollContiner.addChild(cb);
            this._checkBoxes.push(cb);
            if (puInfo[pushArray[i]] != 0) {
                cb.setSelected(true);
            }
        }
        var changeBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "allianceInfoSave", this.saveHandler, this);
        changeBtn.x = this.viewBg.width / 2 - changeBtn.width / 2;
        changeBtn.y = bg.y + bg.height + 15;
        changeBtn.setColor(TextFieldConst.COLOR_BLACK);
        this.addChildToContainer(changeBtn);
    };
    SettingPushPopupView.prototype.saveHandler = function () {
        var pushinfo = {};
        for (var i = 0; i < this._checkBoxes.length; i++) {
            var cb = this._checkBoxes[i];
            var pk = cb.name;
            var value = cb.checkSelected() ? 1 : 0;
            pushinfo[pk] = value;
        }
        NetManager.request(NetRequestConst.REQYEST_OTHERINFO_SETPUSHFLAG, { pushInfo: pushinfo });
        this.hide();
    };
    SettingPushPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    SettingPushPopupView.prototype.dispose = function () {
        this._checkBoxes.length = 0;
        _super.prototype.dispose.call(this);
    };
    return SettingPushPopupView;
}(PopupView));
__reflect(SettingPushPopupView.prototype, "SettingPushPopupView");
//# sourceMappingURL=SettingPushPopupView.js.map