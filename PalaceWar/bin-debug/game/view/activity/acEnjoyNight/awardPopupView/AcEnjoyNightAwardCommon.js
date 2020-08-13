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
var AcEnjoyNightAwardCommon = (function (_super) {
    __extends(AcEnjoyNightAwardCommon, _super);
    function AcEnjoyNightAwardCommon() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcEnjoyNightAwardCommon.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardCommon.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardCommon.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardCommon.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardCommon.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightAwardCommon.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcEnjoyNightAwardCommon.prototype.initView = function () {
        var view = this;
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 518;
        itemBg.height = 300;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, 10);
        view.addChildToContainer(itemBg);
        var listbg = BaseBitmap.create("public_9_probiginnerbg");
        listbg.width = itemBg.width - 4;
        listbg.height = 65;
        listbg.setPosition(itemBg.x + 2, itemBg.y + 2);
        view.addChildToContainer(listbg);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightAward_common-" + view.uicode), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.setPosition(this.viewBg.width / 2 - tipTxt.width / 2, 18);
        view.addChildToContainer(tipTxt);
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightAwardDesc_common-" + view.uicode, [String(this.cfg.addValue)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.setPosition(this.viewBg.width / 2 - descTxt.width / 2, tipTxt.y + tipTxt.height + 5);
        view.addChildToContainer(descTxt);
        var icons = GameData.getRewardItemIcons(this.cfg.getNormalPointAwards(), true, true);
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.setScale(0.8);
            icon.setPosition(45 + 98 * (i % 5) + GameData.popupviewOffsetX, 95 + Math.floor(i / 5) * 98);
            view.addChildToContainer(icon);
        }
    };
    AcEnjoyNightAwardCommon.prototype.getTitleStr = function () {
        return "acEnjoyNightAwardTitle-" + this.uicode;
    };
    AcEnjoyNightAwardCommon.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcEnjoyNightAwardCommon.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightAwardCommon;
}(PopupView));
__reflect(AcEnjoyNightAwardCommon.prototype, "AcEnjoyNightAwardCommon");
//# sourceMappingURL=AcEnjoyNightAwardCommon.js.map