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
var AcEnjoyNightAwardTaixue = (function (_super) {
    __extends(AcEnjoyNightAwardTaixue, _super);
    function AcEnjoyNightAwardTaixue() {
        return _super.call(this) || this;
    }
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "uicode", {
        get: function () {
            return this.param.data.uicode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "type", {
        get: function () {
            return this.param.data.buildingType;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAwardTaixue.prototype, "id", {
        get: function () {
            return this.param.data.mapId;
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightAwardTaixue.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "enjoynight_name_" + this.type, "enjoynight_awardbg", "enjoynight_awardbg2"
        ]);
    };
    AcEnjoyNightAwardTaixue.prototype.initView = function () {
        var view = this;
        var topbg = BaseBitmap.create("enjoynight_awardbg");
        topbg.setPosition(this.viewBg.width / 2 - topbg.width / 2, 0);
        view.addChildToContainer(topbg);
        //人物、
        var rect = new egret.Rectangle(0, 0, 300, 345);
        var npcPic;
        if (this.type == "taixue") {
            npcPic = "servant_full_1030";
        }
        else if (this.type == "huanggong") {
            npcPic = "empshopman";
            rect.setTo(0, 0, 282, 866);
        }
        else if (this.type == "leitai") {
            npcPic = "servant_full_1002";
        }
        else if (this.type == "xunfang") {
            npcPic = "wife_full_204";
            rect.setTo(0, 0, 300, 394);
        }
        else if (this.type == "yanwuchang") {
            npcPic = "story_npc_7";
        }
        else if (this.type == "banghui") {
            npcPic = "servant_full_1031";
        }
        else if (this.type == "jiulou") {
            npcPic = "story_npc_2";
        }
        else if (this.type == "paihangbang") {
            npcPic = "searchnpc_full41";
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
        var descTxt = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightAwardDesc_" + view.type + "-" + view.uicode, [String(this.cfg.addValue)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.width = 290;
        descTxt.lineSpacing = 6;
        descTxt.setPosition(nameIcon.x, nameIcon.y + nameIcon.height + 5);
        view.addChildToContainer(descTxt);
        var descBg = BaseBitmap.create("enjoynight_awardbg2");
        descBg.setPosition(topbg.x + topbg.width - descBg.width, topbg.y + 130);
        view.addChildToContainer(descBg);
        var descTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightAwardDesc2_" + view.type + "-" + view.uicode, [String(onecfg.addValueMore)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt2.width = 290;
        descTxt2.lineSpacing = 5;
        descTxt2.setPosition(nameIcon.x, descBg.y + 12);
        view.addChildToContainer(descTxt2);
        var descTxt22 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightAwardDesc2_2_" + view.type + "-" + view.uicode, [String(onecfg.addValueLess)]), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt22.width = 290;
        descTxt22.lineSpacing = 5;
        descTxt22.setPosition(nameIcon.x, descTxt2.y + descTxt2.height + 8);
        view.addChildToContainer(descTxt22);
        descBg.height = descTxt22.y + descTxt22.height + 12 - descBg.y;
        // let tipdesc = ComponentManager.getTextField(LanguageManager.getlocal(`acEnjoyNightTenTip`), 18, TextFieldConst.COLOR_GRAY_LIGHT);
        // tipdesc.width = 290;
        // tipdesc.lineSpacing = 4;
        // tipdesc.setPosition(nameIcon.x,topbg.y+topbg.height-tipdesc.height - 10);
        // view.addChildToContainer(tipdesc);
        var descTxt3 = ComponentManager.getTextField(LanguageManager.getlocal("acEnjoyNightMaybeAnswer"), 24, TextFieldConst.COLOR_BROWN);
        descTxt3.width = 518;
        descTxt3.lineSpacing = 5;
        descTxt3.textAlign = egret.HorizontalAlign.CENTER;
        descTxt3.setPosition(this.viewBg.width / 2 - descTxt3.width / 2, topbg.y + topbg.height + 8);
        view.addChildToContainer(descTxt3);
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 518;
        itemBg.height = 338;
        itemBg.setPosition(this.viewBg.width / 2 - itemBg.width / 2, descTxt3.y + descTxt3.height + 8);
        view.addChildToContainer(itemBg);
        var rewarsStr = onecfg.getRewards() + "|" + this.cfg.getNormalPointAwards();
        var icons = GameData.getRewardItemIcons(rewarsStr, true, true);
        for (var i = 0; i < icons.length; i++) {
            var icon = icons[i];
            icon.setScale(0.8);
            icon.setPosition(45 + 98 * (i % 5) + GameData.popupviewOffsetX, 310 + Math.floor(i / 5) * 98);
            view.addChildToContainer(icon);
        }
    };
    AcEnjoyNightAwardTaixue.prototype.getTitleStr = function () {
        return "acEnjoyNightAwardTitle-" + this.uicode;
    };
    AcEnjoyNightAwardTaixue.prototype.getBgExtraHeight = function () {
        return 10;
    };
    AcEnjoyNightAwardTaixue.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightAwardTaixue;
}(PopupView));
__reflect(AcEnjoyNightAwardTaixue.prototype, "AcEnjoyNightAwardTaixue");
//# sourceMappingURL=AcEnjoyNightAwardTaixue.js.map