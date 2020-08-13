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
 * 佳人特技
 * author shaoliang
 * date 2020.04.08
 * @class WifeSkillPopupViewTab3
 */
var WifeSkillPopupViewTab3 = (function (_super) {
    __extends(WifeSkillPopupViewTab3, _super);
    function WifeSkillPopupViewTab3() {
        var _this = _super.call(this) || this;
        _this._wifeId = null;
        _this._bg3 = null;
        _this.initView();
        return _this;
    }
    WifeSkillPopupViewTab3.prototype.initView = function () {
        var parentView = ViewController.getInstance().getView("WifeSkillPopupView");
        var wifeId = parentView.getWifeId();
        this._wifeId = wifeId;
        this.width = 574;
        var cfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var bg2 = BaseBitmap.create("public_9_bg4");
        bg2.width = 528;
        bg2.height = 670;
        bg2.setPosition(26.5, 58);
        this.addChild(bg2);
        var bg = BaseBitmap.create("wifeexskill_bg2");
        bg.x = bg2.x + (bg2.width - bg.width) / 2;
        bg.y = bg2.y + 3;
        this.addChild(bg);
        var bg3 = BaseBitmap.create("newinvitelistbg2");
        bg3.width = 512;
        bg3.height = 356;
        bg3.setPosition(bg2.x + (bg2.width - bg3.width) / 2, bg.y + bg.height + 5);
        this.addChild(bg3);
        this._bg3 = bg3;
        var servant = BaseLoadBitmap.create(servantCfg.fullIcon);
        servant.width = 405;
        servant.height = 467;
        servant.setScale(0.8);
        servant.mask = new egret.Rectangle(0, 0, 405, 368);
        servant.setPosition(bg2.x + (bg2.width - servant.width * servant.scaleX) / 2, bg.y + 2);
        this.addChild(servant);
        var servantName = servantCfg.name;
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            servantName = LanguageManager.getlocal("wifeExSkill_noServant");
            var graybg = BaseBitmap.create("public_9_bg8");
            graybg.width = bg.width;
            graybg.height = bg.height;
            graybg.setPosition(bg.x, bg.y);
            this.addChild(graybg);
        }
        var namebg = BaseBitmap.create("wifestatus_namebg");
        namebg.width = 240;
        namebg.height = 40;
        namebg.setPosition(bg2.x + (bg2.width - namebg.width) / 2, bg.y + 252);
        this.addChild(namebg);
        var nametext = ComponentManager.getTextField(servantName, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_QUALITY_YELLOW);
        nametext.setPosition(namebg.x + namebg.width / 2 - nametext.width / 2, namebg.y + namebg.height / 2 - nametext.height / 2);
        this.addChild(nametext);
        if (Api.wifeVoApi.getExSkillLevel(wifeId) > 0) {
            this.initBottom1();
        }
        else {
            this.initBottom2();
        }
    };
    WifeSkillPopupViewTab3.prototype.initBottom1 = function () {
        var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var skillLv = Api.wifeVoApi.getExSkillLevel(this._wifeId);
        var skillLvStr = LanguageManager.getlocal("wifeExSkill_lv", [String(skillLv)]);
        var nexteffectstr = LanguageManager.getlocal("zhenqifangnotebook" + (skillLv % 4 + 1));
        var nextStr = LanguageManager.getlocal("wifeExSkill_nextlv", [nexteffectstr, "0x3e9b00"]);
        var nextneed = (skillLv + 1) * Config.WifebaseCfg.exSkill;
        var nextneedstr = LanguageManager.getlocal("wifeExSkill_nextneed", [String(nextneed), "0x3e9b00"]);
        var wifeVo = Api.wifeVoApi.getWifeInfoVoById(this._wifeId);
        if (wifeVo.isExSkillLevelMax()) {
            nextStr = LanguageManager.getlocal("wifeExSkill_nextlv_max", ["0x3e9b00"]);
            nextneedstr = LanguageManager.getlocal("wifeExSkill_nextneed_max", ["0x3e9b00"]);
        }
        var titlebg = BaseBitmap.create("commonview_smalltitlebg");
        titlebg.y = this._bg3.y + 18;
        this.addChild(titlebg);
        var effectStr = LanguageManager.getlocal("wifeExSkill_effect", [servantCfg.name, String(skillLv)]);
        var effectText = ComponentManager.getTextField(effectStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        effectText.setPosition(this._bg3.x + this._bg3.width / 2 - effectText.width / 2, titlebg.y + titlebg.height / 2 - effectText.height / 2);
        this.addChild(effectText);
        titlebg.width = effectText.width + 120;
        titlebg.x = this._bg3.x + (this._bg3.width - titlebg.width) / 2;
        var skillIcon = BaseBitmap.create("wifeexskill_icon");
        skillIcon.setScale(0.7);
        skillIcon.setPosition(this._bg3.x + 65, titlebg.y + titlebg.height);
        this.addChild(skillIcon);
        var clip = ComponentManager.getCustomMovieClip("wifeexskill_effect", 12, 120);
        clip.setPosition(skillIcon.x - 10, skillIcon.y - 16);
        clip.setScale(0.7);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this.addChild(clip);
        var lvText = ComponentManager.getTextField(skillLvStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        lvText.setPosition(this._bg3.x + 168, titlebg.y + titlebg.height + 20);
        this.addChild(lvText);
        var nextText = ComponentManager.getTextField(nextStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nextText.setPosition(lvText.x, lvText.y + lvText.height + 5);
        this.addChild(nextText);
        var nextNeedText = ComponentManager.getTextField(nextneedstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        nextNeedText.setPosition(lvText.x, nextText.y + nextText.height + 5);
        this.addChild(nextNeedText);
        for (var i = 1; i <= 4; i++) {
            var attrbg = BaseBitmap.create("public_9_managebg");
            attrbg.width = 213;
            attrbg.height = 71; //100;
            attrbg.x = this._bg3.x + 290 - i % 2 * 253;
            attrbg.y = this._bg3.y + 173 + Math.floor((i - 1) / 2) * 90;
            this.addChild(attrbg);
            var attrIcon = BaseBitmap.create("servant_infoPro" + i);
            attrIcon.x = attrbg.x - 36;
            attrIcon.y = attrbg.y - 5;
            this.addChild(attrIcon);
            var lv = Math.floor(skillLv / 4) + (skillLv % 4 >= i ? 1 : 0);
            var attrNameTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
            attrNameTxt.text = LanguageManager.getlocal("wifeExSkill_book" + i) + "Lv" + String(lv);
            attrNameTxt.x = attrIcon.x + 72;
            attrNameTxt.y = attrbg.y + 13;
            this.addChild(attrNameTxt);
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("servant_newui_zizhi" + i, [String(lv)]), 20, TextFieldConst.COLOR_BROWN);
            attrTxt.x = attrNameTxt.x + 7;
            attrTxt.y = attrNameTxt.y + attrNameTxt.height + 7;
            this.addChild(attrTxt);
        }
    };
    WifeSkillPopupViewTab3.prototype.initBottom2 = function () {
        var iconbg = BaseBitmap.create("wifeexskill_iconbg");
        iconbg.setPosition(this._bg3.x + this._bg3.width / 2 - iconbg.width / 2, this._bg3.y + 20);
        this.addChild(iconbg);
        var icon = BaseBitmap.create("wifeexskill_icon");
        icon.setPosition(this._bg3.x + this._bg3.width / 2 - icon.width / 2, iconbg.y + 5);
        this.addChild(icon);
        var clip = ComponentManager.getCustomMovieClip("wifeexskill_effect", 12, 120);
        clip.setPosition(icon.x - 12, icon.y - 25);
        clip.playWithTime(0);
        clip.blendMode = egret.BlendMode.ADD;
        this.addChild(clip);
        var iconname = BaseBitmap.create("wifeexskill_text2");
        iconname.setPosition(this._bg3.x + this._bg3.width / 2 - iconname.width / 2, iconbg.y + 115);
        this.addChild(iconname);
        var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var unlockstr = LanguageManager.getlocal("wifeExSkill_unlock", [String(Config.WifebaseCfg.exSkillNeed)]);
        var effectStr = LanguageManager.getlocal("wifeExSkill_effect2", [cfg.name, String(Config.WifebaseCfg.exSkill), servantCfg.name]);
        var unlocktext = ComponentManager.getTextField(unlockstr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        unlocktext.setPosition(this._bg3.x + 14, this._bg3.y + 177);
        this.addChild(unlocktext);
        var effecttext = ComponentManager.getTextField(effectStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN);
        effecttext.setPosition(unlocktext.x, unlocktext.y + unlocktext.height + 12);
        effecttext.width = 490;
        effecttext.lineSpacing = 5;
        this.addChild(effecttext);
        var gotoBtn = ComponentManager.getButton(ButtonConst.BTN2_NORMAL_YELLOW, "wifeExSkill_gotoBestow", this.gotoClick, this);
        gotoBtn.setPosition(this._bg3.x + this._bg3.width / 2 - gotoBtn.width / 2, iconbg.y + 250);
        this.addChild(gotoBtn);
    };
    WifeSkillPopupViewTab3.prototype.gotoClick = function () {
        var cfg = Config.WifeCfg.getWifeCfgById(this._wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        if (!Api.servantVoApi.getServantObj(cfg.servantId)) {
            var tipMsg = LanguageManager.getlocal("wifeExSkill_gototip");
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: tipMsg,
                callback: this.realGoto,
                handler: this,
                needCancel: true
            });
        }
        else {
            this.realGoto();
        }
    };
    WifeSkillPopupViewTab3.prototype.realGoto = function () {
        var parentView = ViewController.getInstance().getView("WifeSkillPopupView");
        ViewController.getInstance().openView(ViewConst.POPUP.WIFEGIVEPOPUPVIEW, { id: this._wifeId });
        parentView.hide();
    };
    WifeSkillPopupViewTab3.prototype.dispose = function () {
        this._bg3 = null;
        this._wifeId = null;
        _super.prototype.dispose.call(this);
    };
    return WifeSkillPopupViewTab3;
}(CommonViewTab));
__reflect(WifeSkillPopupViewTab3.prototype, "WifeSkillPopupViewTab3");
//# sourceMappingURL=WifeSkillPopupViewTab3.js.map