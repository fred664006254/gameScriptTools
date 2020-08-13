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
var AcAC2020AwardTaixue = (function (_super) {
    __extends(AcAC2020AwardTaixue, _super);
    function AcAC2020AwardTaixue() {
        var _this = _super.call(this) || this;
        _this._bgname = null;
        return _this;
    }
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "type", {
        get: function () {
            return this.param.data.buildingType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAC2020AwardTaixue.prototype, "id", {
        get: function () {
            return this.param.data.mapId;
        },
        enumerable: true,
        configurable: true
    });
    AcAC2020AwardTaixue.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "enjoynight_name_" + this.type, this.getBgName2(),
        ]);
    };
    AcAC2020AwardTaixue.prototype.getBgName2 = function () {
        if (this._bgname) {
            return this._bgname;
        }
        this._bgname = "enjoynight_awardbg";
        var random = 0;
        if (this.type == "huanggong") {
            this._bgname = "acac2020_rewardbg_huanggong";
            random = 1;
        }
        else if (this.type == "banghui") {
            this._bgname = "acac2020_rewardbg_banghui";
            random = 3;
        }
        else if (this.type == "paihangbang") {
            this._bgname = "acac2020_rewardbg_paihangbang";
            random = 2;
        }
        if (random) {
            this._bgname = this._bgname + App.MathUtil.getRandom(1, random + 1);
        }
        return this._bgname;
    };
    AcAC2020AwardTaixue.prototype.initView = function () {
        var view = this;
        var topbg = BaseBitmap.create(this.getBgName2());
        topbg.setPosition(this.viewBg.width / 2 - topbg.width / 2, 0);
        view.addChildToContainer(topbg);
        //人物、
        var rect = new egret.Rectangle(0, 0, 300, 345);
        rect.setTo(0, 0, 300, 394);
        var npcPic;
        if (this.type == "taixue") {
            npcPic = "wife_full_310";
        }
        else if (this.type == "huanggong") {
            npcPic = "wife_full_101";
        }
        else if (this.type == "leitai") {
            npcPic = "wife_full_220";
        }
        else if (this.type == "xunfang") {
            npcPic = "wife_full_204";
        }
        else if (this.type == "yanwuchang") {
            npcPic = "wife_full_206";
        }
        else if (this.type == "banghui") {
            npcPic = "wife_full_218";
        }
        else if (this.type == "jiulou") {
            npcPic = "wife_full_101_male";
        }
        else if (this.type == "paihangbang") {
            npcPic = "wife_full_211";
        }
        var servant = BaseLoadBitmap.create(npcPic, rect);
        servant.setScale(0.75);
        servant.setPosition(10 + GameData.popupviewOffsetX, 10);
        view.addChildToContainer(servant);
        servant.mask = new egret.Rectangle(0, 0, 300, 308);
        var nameIcon = BaseBitmap.create("enjoynight_name_" + this.type);
        nameIcon.setPosition(256 + GameData.popupviewOffsetX, 10);
        view.addChildToContainer(nameIcon);
        var onecfg = this.cfg.map[this.id];
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acAC2020AwardDesc_" + view.type + "-" + view.uicode), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 290;
        descTxt.lineSpacing = 6;
        descTxt.setPosition(nameIcon.x, nameIcon.y + nameIcon.height + 5);
        view.addChildToContainer(descTxt);
        var descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightMaybeAnswer"), 24, TextFieldConst.COLOR_BROWN);
        descTxt3.width = 518;
        descTxt3.lineSpacing = 5;
        descTxt3.textAlign = egret.HorizontalAlign.CENTER;
        descTxt3.setPosition(this.viewBg.width / 2 - descTxt3.width / 2, topbg.y + topbg.height + 8);
        view.addChildToContainer(descTxt3);
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 518;
        itemBg.height = 127;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, descTxt3.y + descTxt3.height + 8);
        view.addChildToContainer(itemBg);
        var rewarsStr = onecfg.getRewards(); //+ "|" + this.cfg.getNormalPointAwards();
        var icons = GameData.getRewardItemIcons(rewarsStr, true, true);
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.setScale(0.8);
            icon.setPosition(45 + 98 * (i % 5) + GameData.popupviewOffsetX, 310 + Math.floor(i / 5) * 98);
            view.addChildToContainer(icon);
        }
    };
    AcAC2020AwardTaixue.prototype.getTitleStr = function () {
        return "acEnjoyNightAwardTitle-" + this.uicode;
    };
    AcAC2020AwardTaixue.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcAC2020AwardTaixue.prototype.dispose = function () {
        this._bgname = null;
        _super.prototype.dispose.call(this);
    };
    return AcAC2020AwardTaixue;
}(PopupView));
__reflect(AcAC2020AwardTaixue.prototype, "AcAC2020AwardTaixue");
//# sourceMappingURL=AcAC2020AwardTaixue.js.map