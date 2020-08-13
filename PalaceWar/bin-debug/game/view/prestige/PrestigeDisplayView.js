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
 * 人望总览
 * 20180518
 * yanyuling
 */
var PrestigeDisplayView = (function (_super) {
    __extends(PrestigeDisplayView, _super);
    function PrestigeDisplayView() {
        return _super.call(this) || this;
    }
    PrestigeDisplayView.prototype.initView = function () {
        var maskBg = BaseBitmap.create("public_rule_bg");
        // maskBg.x = GameConfig.stageWidth/2 - maskBg.width/2;
        maskBg.y = GameConfig.stageHeigth / 2 - maskBg.height / 2;
        this.addChildToContainer(maskBg);
        var maskBg2 = BaseBitmap.create("public_rule_bg");
        maskBg.x = GameConfig.stageWidth;
        maskBg.scaleX = -1;
        maskBg2.y = maskBg.y;
        this.addChildToContainer(maskBg2);
        var wordSp = BaseBitmap.create("prestige_word3");
        wordSp.x = GameConfig.stageWidth / 2 - wordSp.width / 2;
        wordSp.y = maskBg.y + 5;
        this.addChildToContainer(wordSp);
        var line = BaseBitmap.create("public_line3");
        if (!PlatformManager.checkIsEnLang()) {
            line.width = 360;
        }
        line.x = GameConfig.stageWidth / 2 - line.width / 2;
        line.y = maskBg.y + 70;
        this.addChildToContainer(line);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("prestige_pemDisTxt1"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        titleTxt.x = GameConfig.stageWidth / 2 - titleTxt.width / 2;
        titleTxt.y = line.y + line.height / 2 - titleTxt.height / 2;
        this.addChildToContainer(titleTxt);
        var pemTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pemTxt1.text = LanguageManager.getlocal("prestige_pemDisTxt2", ["" + Api.prestigeVoApi.getPValue()]);
        pemTxt1.x = GameConfig.stageWidth / 2 - 150;
        pemTxt1.y = line.y + 30;
        this.addChildToContainer(pemTxt1);
        var pemV = "" + Api.prestigeVoApi.getPem();
        var pemTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        pemTxt2.text = LanguageManager.getlocal("prestige_pemTxt", [pemV]);
        pemTxt2.x = pemTxt1.x;
        pemTxt2.y = pemTxt1.y + 30;
        this.addChildToContainer(pemTxt2);
        var line1 = BaseBitmap.create("public_line3");
        if (!PlatformManager.checkIsEnLang()) {
            line1.width = 360;
        }
        line1.x = line.x;
        line1.y = line.y + 115;
        this.addChildToContainer(line1);
        var titleTxt1 = ComponentManager.getTextField(LanguageManager.getlocal("prestige_pemDisTxt3"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_YELLOW);
        titleTxt1.x = line1.x + line1.width / 2 - titleTxt1.width / 2;
        titleTxt1.y = line1.y + line1.height / 2 - titleTxt1.height / 2;
        this.addChildToContainer(titleTxt1);
        if (PlatformManager.checkIsEnLang()) {
            line1.width += titleTxt1.width + 10;
            line.width += titleTxt.width + 10;
            line1.x = titleTxt1.x + titleTxt1.width / 2 - line1.width / 2;
            line.x = titleTxt.x + titleTxt.width / 2 - line.width / 2;
        }
        var ainfo = Api.prestigeVoApi.getAinfo();
        var attrAddTxt1 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt1.text = LanguageManager.getlocal("servantInfo_speciality1") + "+" + ainfo[0];
        attrAddTxt1.x = GameConfig.stageWidth / 2 - 150;
        attrAddTxt1.y = line1.y + 35;
        this.addChildToContainer(attrAddTxt1);
        var attrAddTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt2.text = LanguageManager.getlocal("servantInfo_speciality2") + "+" + ainfo[1];
        attrAddTxt2.x = GameConfig.stageWidth / 2 + 60;
        attrAddTxt2.y = attrAddTxt1.y;
        this.addChildToContainer(attrAddTxt2);
        var attrAddTxt3 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt3.text = LanguageManager.getlocal("servantInfo_speciality3") + "+" + ainfo[2];
        attrAddTxt3.x = attrAddTxt1.x;
        attrAddTxt3.y = attrAddTxt1.y + 30;
        this.addChildToContainer(attrAddTxt3);
        var attrAddTxt4 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        attrAddTxt4.text = LanguageManager.getlocal("servantInfo_speciality4") + "+" + ainfo[3];
        attrAddTxt4.x = attrAddTxt2.x;
        attrAddTxt4.y = attrAddTxt3.y;
        this.addChildToContainer(attrAddTxt4);
        this.addTouchTap(this.hide, this);
    };
    PrestigeDisplayView.prototype.getResourceList = function () {
        return ["prestige_displaybg", "prestige_word3"];
    };
    PrestigeDisplayView.prototype.getTitleStr = function () {
        return "";
    };
    PrestigeDisplayView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PrestigeDisplayView;
}(BaseView));
__reflect(PrestigeDisplayView.prototype, "PrestigeDisplayView");
//# sourceMappingURL=PrestigeDisplayView.js.map