var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BattleHero = /** @class */ (function (_super) {
    __extends(BattleHero, _super);
    function BattleHero() {
        var _this = _super.call(this) || this;
        _this._type = 0; // 2 关卡boos战  3 副本  4 八王称帝 玩家  5皇陵 
        _this._servantFullImg = null;
        _this._infoContainer = null;
        _this._textArray = [];
        _this._picName = '';
        _this._rect = null;
        _this._tmpMap1 = null;
        _this._tmpMap2 = null;
        _this._tmpMap3 = null;
        _this._area = 0;
        _this._clip = null;
        _this._skinnamebg = null;
        _this._skinnameTxt = null;
        return _this;
    }
    Object.defineProperty(BattleHero.prototype, "tmpMap", {
        get: function () {
            return this._tmpMap3;
        },
        enumerable: true,
        configurable: true
    });
    BattleHero.prototype.init = function (heroPic, info, type, area, eff) {
        this._area = area;
        if (type != null) {
            this._type = type;
        }
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 405 * 0.8, 467 * 0.8);
        if (this._type == 3) {
            rect.setTo(0, 0, 405 * 0.6, 467 * 0.6);
        }
        if (this._type == 5) {
            rect.setTo(0, 0, 444, 456);
        }
        this._rect = rect;
        if (heroPic == null) {
            heroPic = "servant_empty";
        }
        this._picName = heroPic;
        var aureoleClip = ComponentManager.getCustomMovieClip("acwealthcarpeffect", 10, 70);
        this.addChild(aureoleClip);
        if (eff) {
            aureoleClip.alpha = 1;
        }
        this._servantFullImg = BaseLoadBitmap.create(heroPic, rect);
        this.addChild(this._servantFullImg);
        aureoleClip.x = this._servantFullImg.width / 2;
        aureoleClip.y = this._servantFullImg.height / 2 + 50;
        var height = this._servantFullImg.height - 55;
        if (info && this._type == 0) {
            var infoBg = void 0;
            infoBg = BaseBitmap.create("atkrace_battle_info");
            infoBg.y = this._servantFullImg.height - infoBg.height + 10;
            height = infoBg.y;
            this.addChild(infoBg);
            var level = info.level;
            var levelText = ComponentManager.getBitmapText(level.toString(), TextFieldConst.FONTNAME_BOSS_SCORE);
            levelText.setScale(0.9);
            levelText.setPosition(48 - levelText.width / 2 * levelText.scaleX, infoBg.y + 40);
            this.addChild(levelText);
            var servantName = ComponentManager.getTextField(info.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            servantName.setPosition(95, infoBg.y + 20);
            this.addChild(servantName);
            // info.skin = "10011"
            // if(info.skin && info.skin != ""){
            // 	let skincfg = Config.ServantskinCfg.getServantSkinItemById(info.skin);
            // 	let skinnamebg = BaseBitmap.create(`skinshowkuang3`);
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, skinnamebg, this, [-30,-skinnamebg.height-5]);
            // 	this.addChild(skinnamebg);
            // 	let skinnameTxt = ComponentManager.getTextField(skincfg.name, 22, TextFieldConst.COLOR_BLACK);
            // 	skinnameTxt.height = 22;
            // 	App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
            // 	this.addChild(skinnameTxt);
            // }
            if (info.ability != null) {
                var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("atkrace_info_1"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                infoDesc1.setPosition(servantName.x, servantName.y + servantName.height + 3);
                this.addChild(infoDesc1);
                var ability = info.ability;
                var infoText1 = ComponentManager.getTextField(ability.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
                infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
                this.addChild(infoText1);
            }
            if (info.quality != null) {
                var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("servantInfo_attrTxt" + info.pos), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                infoDesc1.setPosition(servantName.x, servantName.y + servantName.height + 3);
                this.addChild(infoDesc1);
                var ability = info.quality;
                var infoText1 = ComponentManager.getTextField(ability.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
                infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
                this.addChild(infoText1);
            }
        }
        else if (info && (this._type == 2 || this._type == 6)) {
            this._infoContainer = new BaseDisplayObjectContainer();
            this.addChild(this._infoContainer);
            var buttomBg = BaseBitmap.create(this._type == 6 ? "threekingdomsheroattackinfobg" : "public_9_downbg");
            buttomBg.width = 270;
            this._infoContainer.x = this._servantFullImg.width / 2 - buttomBg.width / 2;
            this._infoContainer.addChild(buttomBg);
            if (this._type == 6) {
                this._servantFullImg.x = (this.width - rect.width) / 2;
            }
            var idx = 0;
            for (var k in info) {
                var v = info[k];
                var infoText = ComponentManager.getTextField(v[0], TextFieldConst.FONTSIZE_CONTENT_SMALL, v[1]);
                if (PlatformManager.checkIsEnLang()) {
                    // infoText.setPosition(20 , 10 + idx*30);
                    infoText.setPosition(buttomBg.width / 2 - infoText.width / 2, 10 + idx * 30);
                }
                else {
                    infoText.setPosition(buttomBg.width / 2 - infoText.width / 2, this._type == 2 ? (10 + idx * 30) : (20 + idx * 25));
                }
                this._infoContainer.addChild(infoText);
                idx++;
                this._textArray.push(infoText);
            }
            buttomBg.height = 10 + idx * 30;
            this._infoContainer.y = this._servantFullImg.height - buttomBg.height;
            if ("servant_empty" == heroPic) {
                this._infoContainer.visible = false;
            }
            height = this._infoContainer.y;
        }
        //八王称帝 玩家
        else if (info && this._type == 4) {
            this.removeChild(this._servantFullImg);
            this._servantFullImg = null;
            var curLv = info.level;
            if (info.title) {
                var titleinfo = App.CommonUtil.getTitleData(info.title);
                if (titleinfo.clothes != "") {
                    if (!Config.TitleCfg.getIsTitleOnly(titleinfo.clothes)) {
                        curLv = titleinfo.clothes;
                    }
                }
            }
            var isnew = Api.playerVoApi.getNewPalaceRole(curLv);
            var playerImg = Api.playerVoApi.getPlayerPortrait(curLv, info.pic);
            playerImg.x = isnew ? -160 : 0;
            this.addChild(playerImg);
            var maskRect = new egret.Rectangle();
            maskRect.setTo(0, 0, playerImg.width, 320);
            playerImg.mask = maskRect;
            var ability = info.quality;
            if (ability != null) {
                var infoBg = BaseBitmap.create("atkrace_battle_info");
                infoBg.y = 320 - infoBg.height + 10;
                this.addChild(infoBg);
                var level = info.level;
                var levelText = ComponentManager.getBitmapText(String(info.plevel), TextFieldConst.FONTNAME_BOSS_SCORE);
                levelText.setScale(0.9);
                levelText.setPosition(48 - levelText.width / 2 * levelText.scaleX, infoBg.y + 40);
                this.addChild(levelText);
                var servantName = ComponentManager.getTextField(info.name, TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                servantName.setPosition(95, infoBg.y + 20);
                this.addChild(servantName);
                var infoDesc1 = ComponentManager.getTextField(LanguageManager.getlocal("child_quality"), TextFieldConst.FONTSIZE_CONTENT_SMALL);
                infoDesc1.setPosition(servantName.x, servantName.y + servantName.height + 3);
                this.addChild(infoDesc1);
                var infoText1 = ComponentManager.getTextField(String(ability), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN);
                infoText1.setPosition(infoDesc1.x + infoDesc1.width, infoDesc1.y);
                this.addChild(infoText1);
            }
        }
        if (this._type != 3) {
            this.addHeroFilter(area);
        }
        this.width = this.width;
        this.height = this.height;
        var aureoleBM = BaseBitmap.create("acwealthcarpeffect1");
        aureoleClip.blendMode = egret.BlendMode.ADD;
        aureoleClip.width = aureoleBM.width;
        aureoleClip.height = aureoleBM.height;
        aureoleClip.anchorOffsetX = aureoleBM.width / 2;
        aureoleClip.anchorOffsetY = aureoleBM.height / 2;
        aureoleClip.setScale(2.5 * 0.8);
        aureoleClip.playWithTime(-1);
        this._clip = aureoleClip;
        aureoleClip.alpha = eff ? 1 : 0;
        var skinnamebg = BaseBitmap.create("skinshowkuang3");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, skinnamebg, this, [-30, -skinnamebg.height - 5], true);
        skinnamebg.y = height - skinnamebg.height - 5;
        this.addChild(skinnamebg);
        this._skinnamebg = skinnamebg;
        var skinnameTxt = ComponentManager.getTextField('', 22, TextFieldConst.COLOR_BLACK);
        skinnameTxt.height = 22;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
        this.addChild(skinnameTxt);
        this._skinnameTxt = skinnameTxt;
        skinnamebg.alpha = skinnameTxt.alpha = eff ? 1 : 0;
        if (eff) {
            var skin = heroPic.split("_")[2];
            var skincfg = Config.ServantskinCfg.getServantSkinItemById(skin);
            if (skin && skincfg) {
                skinnameTxt.text = skincfg.name;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, skinnameTxt, skinnamebg);
        }
    };
    BattleHero.prototype.resetHero = function (pic, power, eff) {
        if (pic) {
            this._servantFullImg.setload(pic);
            this._picName = pic;
            if (this._type == 2 || this._type == 6) {
                if (this._infoContainer) {
                    this._infoContainer.visible = true;
                }
                if (power) {
                    this.resetInfoText(LanguageManager.getlocal("fightForce") + ":" + power);
                }
            }
            if (this._clip) {
                this._clip.alpha = eff ? 1 : 0;
                this._skinnamebg.alpha = this._skinnameTxt.alpha = eff ? 1 : 0;
                var skin = pic.split("_")[2];
                var skincfg = Config.ServantskinCfg.getServantSkinItemById(skin);
                if (skin && skincfg) {
                    this._skinnameTxt.text = skincfg.name;
                }
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._skinnameTxt, this._skinnamebg);
            }
        }
        else {
            if (this._infoContainer) {
                this._infoContainer.visible = false;
            }
            this._picName = 'servant_empty';
            this._servantFullImg.setload("servant_empty");
            if (this._clip) {
                this._clip.alpha = 0;
                this._skinnamebg.alpha = this._skinnameTxt.alpha = 0;
            }
        }
        this.addHeroFilter(this._area);
    };
    BattleHero.prototype.resetInfoText = function (s, idx) {
        if (idx === void 0) { idx = 0; }
        this._textArray[idx].text = s;
        this._textArray[idx].x = this._infoContainer.width / 2 - this._textArray[idx].width / 2;
    };
    BattleHero.prototype.setMaskOffSet = function () {
        this._tmpMap1.alpha = 0.8;
        this._tmpMap2.alpha = 0.4;
        this._tmpMap3.alpha = 0;
    };
    BattleHero.prototype.resetMaskOffSet = function () {
        egret.Tween.get(this._tmpMap1).to({ x: 0, y: 0, alpha: 0 }, 100);
        egret.Tween.get(this._tmpMap2).to({ x: 0, y: 0, alpha: 0 }, 150);
    };
    BattleHero.prototype.addHeroFilter = function (area) {
        if (this._type == 4) {
            return;
        }
        //遮罩
        var mycolor_matrix = [[
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 50,
                0, 0, 0, 1, 0
            ], [
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 30,
                0, 0, 0, 1, 0
            ], [
                0, 0, 0, 0, 0,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 50,
                0, 0, 0, 1, 0
            ]];
        var enermycolor_matrix = [[
                1, 0, 0, 0, 50,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ], [
                1, 0, 0, 0, 30,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ], [
                1, 0, 0, 0, 50,
                0, 1, 0, 0, 0,
                0, 0, 1, 0, 0,
                0, 0, 0, 1, 0
            ]];
        for (var i = 1; i < 4; ++i) {
            var selefmap = this["_tmpMap" + i];
            var str = this._picName;
            if (selefmap) {
                selefmap.setload(str);
            }
            else {
                var temp = BaseLoadBitmap.create(str);
                temp.width = this._rect.width;
                temp.height = this._rect.height;
                this.addChild(temp);
                var color_matrix = area == 1 ? mycolor_matrix : enermycolor_matrix;
                var colorFlilter = new egret.ColorMatrixFilter(color_matrix[i - 1]);
                temp.filters = [colorFlilter];
                colorFlilter = null;
                this["_tmpMap" + i] = temp;
            }
        }
        mycolor_matrix = enermycolor_matrix = null;
        var maxIndex = this.numChildren;
        this.setChildIndex(this._tmpMap1, maxIndex);
        var baseIndex = this.getChildIndex(this._servantFullImg);
        this.setChildIndex(this._tmpMap1, Math.max(0, baseIndex - 1));
        this.setChildIndex(this._tmpMap2, Math.max(0, baseIndex - 2));
        this.setChildIndex(this._tmpMap3, baseIndex + 3);
        this._tmpMap1.x = -20;
        this._tmpMap1.y = -40;
        this._tmpMap1.alpha = 0;
        this._tmpMap2.x = -40;
        this._tmpMap2.y = -80;
        this._tmpMap2.alpha = 0;
        this._tmpMap3.x = 0;
        this._tmpMap3.y = 0;
        this._tmpMap3.alpha = 0;
    };
    BattleHero.prototype.clearHero = function () {
        egret.Tween.removeTweens(this);
        this.addHeroFilter(this._area);
    };
    BattleHero.prototype.showLight = function (f, o) {
        if (!this._picName) {
            return;
        }
        var onerect = new egret.Rectangle();
        onerect.setTo(0, 0, this._rect.width, this._rect.height);
        var light = BaseLoadBitmap.create(this._picName, onerect);
        light.anchorOffsetX = this._rect.width / 2;
        light.anchorOffsetY = this._rect.height / 2;
        light.x = this._servantFullImg.x + this._rect.width / 2;
        light.y = this._servantFullImg.y + this._rect.height / 2;
        light.blendMode = egret.BlendMode.ADD;
        this.addChildAt(light, this.getChildIndex(this._servantFullImg) + 1);
        egret.Tween.get(light).to({ scaleX: 1.3, scaleY: 1.3, alpha: 0 }, 300).call(function () {
            light.dispose();
            if (f && o) {
                f.apply(o);
            }
        });
    };
    BattleHero.prototype.dispose = function () {
        egret.Tween.removeTweens(this);
        this._servantFullImg = null;
        this._type = null;
        this._infoContainer = null;
        this._textArray.length = 0;
        this._picName = '';
        this._rect = null;
        this._skinnameTxt = null;
        this._skinnamebg = null;
        if (this._clip) {
            this._clip.dispose();
            this._clip = null;
        }
        for (var i = 1; i < 4; ++i) {
            if (this["_tmpMap" + i]) {
                this["_tmpMap" + i].filters = null;
                BaseLoadBitmap.release(this["_tmpMap" + i]);
                this["_tmpMap" + i] = null;
            }
        }
        _super.prototype.dispose.call(this);
    };
    return BattleHero;
}(BaseDisplayObjectContainer));
//# sourceMappingURL=BattleHero.js.map