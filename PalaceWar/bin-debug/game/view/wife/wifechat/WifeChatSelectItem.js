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
var WifeChatSelectItem = (function (_super) {
    __extends(WifeChatSelectItem, _super);
    function WifeChatSelectItem() {
        var _this = _super.call(this) || this;
        _this.redPot = null;
        return _this;
    }
    WifeChatSelectItem.prototype.initItem = function (index, data) {
        var view = this;
        view.width = 469;
        view.height = 125;
        var bg = BaseBitmap.create("wifeskinjuqingitembg" + (data.unlock ? 1 : 2));
        view.addChild(bg);
        var line = BaseBitmap.create("public_line3");
        var name = ComponentManager.getTextField(LanguageManager.getlocal("wifeskin" + data.skinId + "_" + data.rewardid), 28, TextFieldConst.COLOR_WARN_YELLOW2);
        line.width = name.textWidth + 300;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, line, bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, name, line);
        view.addChild(line);
        view.addChild(name);
        if (data.unlock && data.isnew) {
            var isnew = BaseBitmap.create("wifeskinleveltip");
            isnew.setScale(0.6);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, isnew, bg, [20, 0]);
            view.addChild(isnew);
            view.redPot = isnew;
        }
        view.addTouchTap(function () {
            var skincfg = Config.WifeskinCfg.getWifeCfgById(data.skinId);
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(skincfg.wifeId);
            var lv = data.lv;
            var id = skincfg.levelUp[lv - 1].levelUpUnlock;
            var cfg = Config.WifeconversationCfg.getConversatiById(id);
            if (data.unlock) {
                if (cfg) {
                    ViewController.getInstance().openView(ViewConst.COMMON.WIFECHATAVGVIEW, data);
                }
                else {
                    App.CommonUtil.showTip(LanguageManager.getlocal("\u6CA1\u6709\u914D\u7F6E"));
                }
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("wifeskinlvunlock3"));
            }
        }, view);
    };
    WifeChatSelectItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifeChatSelectItem.prototype.getSpaceY = function () {
        return 0;
    };
    WifeChatSelectItem.prototype.dispose = function () {
        var view = this;
        view.removeTouchTap();
        view.redPot = null;
        _super.prototype.dispose.call(this);
    };
    return WifeChatSelectItem;
}(ScrollListItem));
__reflect(WifeChatSelectItem.prototype, "WifeChatSelectItem");
//# sourceMappingURL=WifeChatSelectItem.js.map