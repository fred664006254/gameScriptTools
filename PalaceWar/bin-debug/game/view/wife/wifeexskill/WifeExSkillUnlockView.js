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
var WifeExSkillUnlockView = (function (_super) {
    __extends(WifeExSkillUnlockView, _super);
    function WifeExSkillUnlockView() {
        return _super.call(this) || this;
    }
    WifeExSkillUnlockView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeexskill_text", "specialvieweffect"
        ]);
    };
    WifeExSkillUnlockView.prototype.isShowOpenAni = function () {
        return false;
    };
    WifeExSkillUnlockView.prototype.getTitleStr = function () {
        return null;
    };
    WifeExSkillUnlockView.prototype.getCloseBtnName = function () {
        return null;
    };
    WifeExSkillUnlockView.prototype.isTouchMaskClose = function () {
        return true;
    };
    WifeExSkillUnlockView.prototype.getBgExtraHeight = function () {
        return 40;
    };
    WifeExSkillUnlockView.prototype.getBgName = function () {
        return "public_9_wordbg";
    };
    WifeExSkillUnlockView.prototype.initView = function () {
        this.addTouchTap(this.hide, this);
        var wifeId = this.param.data.wifeId;
        var clip = ComponentManager.getCustomMovieClip("specialvieweffect", 10, 100);
        var moveClipBM = BaseBitmap.create("specialvieweffect1");
        clip.scaleX = 1.15;
        clip.scaleY = 1.2;
        clip.setPosition(GameConfig.stageWidth / 2 - moveClipBM.width * 1.15 / 2 + 20, -moveClipBM.height + 30);
        this.addChildToContainer(clip);
        clip.playWithTime(-1);
        var title = BaseBitmap.create("wifeexskill_text");
        title.setPosition((this.viewBg.width - title.width) / 2, -45);
        this.addChildToContainer(title);
        var cfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var servantCfg = Config.ServantCfg.getServantItemById(cfg.servantId);
        var wifeInfoVo = Api.wifeVoApi.getWifeInfoVoById(wifeId);
        var unlockStr = LanguageManager.getlocal("wifeExSkill_unlock2", [cfg.name, String(wifeInfoVo.intimacy)]);
        var unlocText = ComponentManager.getTextField(unlockStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        unlocText.setPosition(42, 72);
        this.addChildToContainer(unlocText);
        var effectText = ComponentManager.getTextField(LanguageManager.getlocal("wifeExSkill_unlockEffect"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        effectText.setPosition(unlocText.x, unlocText.y + unlocText.height + 40);
        this.addChildToContainer(effectText);
        var oldIntimacy = this.param.data.old;
        var newLv = wifeInfoVo.getExSkillLevel();
        var oldLv = Math.floor(oldIntimacy / Config.WifebaseCfg.exSkill);
        if (oldIntimacy < 1000) {
            oldLv = 0;
        }
        var tab = [0, 0, 0, 0];
        for (var i = oldLv; i < newLv; i++) {
            tab[i % 4]++;
        }
        var tabObj = {};
        for (var i = 0; i < 4; i++) {
            if (tab[i] > 0) {
                tabObj[String(i + 1)] = tab[i];
            }
        }
        var posx = effectText.x + effectText.width;
        var index = 0;
        for (var k in tabObj) {
            var v = tabObj[k];
            index++;
            var attrTxt = ComponentManager.getTextField(LanguageManager.getlocal("wifeExSkill_unlockEffect" + k, [servantCfg.name, String(v)]), 20, TextFieldConst.COLOR_WHITE);
            attrTxt.x = posx + (index - 1) % 2 * 210;
            attrTxt.y = effectText.y + Math.floor((index - 1) / 2) * 31;
            this.addChildToContainer(attrTxt);
        }
    };
    return WifeExSkillUnlockView;
}(PopupView));
__reflect(WifeExSkillUnlockView.prototype, "WifeExSkillUnlockView");
//# sourceMappingURL=WifeExSkillUnlockView.js.map