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
var BanishChooseItem = (function (_super) {
    __extends(BanishChooseItem, _super);
    function BanishChooseItem() {
        var _this = _super.call(this) || this;
        _this._callbackF = null;
        _this._obj = null;
        _this._wifeId = null;
        return _this;
    }
    BanishChooseItem.prototype.initItem = function (index, data) {
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = 518;
        bg.height = 136;
        this.addChild(bg);
        var wifeHead = Api.wifebanishVoApi.getWifeHead(data.wifeId);
        wifeHead.setPosition(16, bg.height / 2 - wifeHead.height / 2);
        this.addChild(wifeHead);
        var wifecfg = Config.WifeCfg.getWifeCfgById(data.wifeId);
        var wifeName = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        wifeName.setPosition(145, 25);
        this.addChild(wifeName);
        var intimacy = ComponentManager.getTextField(LanguageManager.getlocal("banish_Intimacy", [String(data.intimacy)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        intimacy.setPosition(wifeName.x, wifeName.y + wifeName.height + 10);
        this.addChild(intimacy);
        var charm = ComponentManager.getTextField(LanguageManager.getlocal("banish_charm", [String(data.charm)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        charm.setPosition(wifeName.x, intimacy.y + intimacy.height + 10);
        this.addChild(charm);
        if (data.isBanishing) {
            var banishing = BaseBitmap.create("wife_banishing");
            banishing.setPosition(378, 28);
            this.addChild(banishing);
        }
        else {
            this._callbackF = data.f;
            this._obj = data.o;
            this._wifeId = data.wifeId;
            var acceptBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "banishViewTitle", this.acceptHandle, this);
            acceptBtn.setPosition(350, bg.height / 2 - acceptBtn.height / 2);
            this.addChild(acceptBtn);
        }
    };
    BanishChooseItem.prototype.acceptHandle = function () {
        var wifecfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var acceptStr = LanguageManager.getlocal("banish_confirm_desc", [wifecfg.name, String(Config.BanishCfg.getExileTime2()), String(Config.BanishCfg.getUnitGem())]);
        ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
            "msg": acceptStr,
            "needCancel": true,
            "title": "banish_confirm",
            "callback": this.acceptHandleCallback,
            "handler": this,
        });
    };
    BanishChooseItem.prototype.acceptHandleCallback = function () {
        this._callbackF.apply(this._obj, [this._wifeId]);
    };
    BanishChooseItem.prototype.getSpaceY = function () {
        return 3;
    };
    BanishChooseItem.prototype.dispose = function () {
        this._callbackF = null;
        this._obj = null;
        this._wifeId = null;
        _super.prototype.dispose.call(this);
    };
    return BanishChooseItem;
}(ScrollListItem));
__reflect(BanishChooseItem.prototype, "BanishChooseItem");
//# sourceMappingURL=BanishChooseItem.js.map