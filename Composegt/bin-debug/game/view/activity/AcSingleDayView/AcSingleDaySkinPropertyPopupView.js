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
var AcSingleDaySkinPropertyPopupView = (function (_super) {
    __extends(AcSingleDaySkinPropertyPopupView, _super);
    function AcSingleDaySkinPropertyPopupView() {
        return _super.call(this) || this;
    }
    AcSingleDaySkinPropertyPopupView.prototype.initView = function () {
        var skinId = this.param.data.skinId;
        var itemId = this.param.data.itemId;
        var bg = BaseBitmap.create("public_tc_bg01");
        bg.width = 530;
        bg.height = this.getShowHeight() - 100;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this.addChildToContainer(bg);
        var innerbg = BaseBitmap.create("public_tc_bg03");
        innerbg.width = bg.width - 20;
        innerbg.height = 100;
        innerbg.x = bg.x + 10;
        innerbg.y = bg.y + 10;
        this.addChildToContainer(innerbg);
        var innerbg2 = BaseBitmap.create("public_tc_bg03");
        innerbg2.width = innerbg.width;
        innerbg2.height = bg.height - 25 - innerbg.height;
        innerbg2.x = innerbg.x;
        innerbg2.y = innerbg.y + innerbg.height + 5;
        this.addChildToContainer(innerbg2);
        var titleBg = BaseBitmap.create("rank_biao");
        titleBg.width = innerbg2.width - 20;
        titleBg.x = this.viewBg.width / 2 - titleBg.width / 2;
        titleBg.y = innerbg2.y + 14;
        this.addChildToContainer(titleBg);
        var listPosY = titleBg.y + titleBg.height + 5;
        var proTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        proTxt.text = LanguageManager.getlocal("acSingleDaySkin_protxt");
        proTxt.x = titleBg.x + 110;
        proTxt.y = titleBg.y + titleBg.height / 2 - proTxt.height / 2;
        this.addChildToContainer(proTxt);
        var valueTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        valueTxt.text = LanguageManager.getlocal("acSingleDaySkin_provaltxt");
        valueTxt.x = titleBg.x + 320;
        valueTxt.y = proTxt.y;
        this.addChildToContainer(valueTxt);
        if (itemId) {
            var cfg = Config.TitleCfg.getTitleCfgById(itemId);
            var iconNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            iconNameTxt.text = cfg.name;
            iconNameTxt.x = innerbg.x + innerbg.width / 2 - iconNameTxt.width / 2;
            iconNameTxt.y = innerbg.y + innerbg.height / 2 - iconNameTxt.height / 2;
            this.addChildToContainer(iconNameTxt);
            var proLen = 0;
            if (cfg.effect1) {
                proLen += 4;
            }
            if (cfg.effect2) {
                proLen += 4;
            }
            for (var index = 1; index <= proLen; index++) {
                if (index % 2 == 1) {
                    var probg = BaseBitmap.create("public_tc_bg05");
                    probg.width = 510;
                    probg.height = 40;
                    probg.x = GameConfig.stageWidth / 2 - probg.width / 2;
                    ;
                    probg.y = titleBg.y + 5 + index * 40;
                    this.addChildToContainer(probg);
                }
                var proTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                if (index <= 4) {
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro" + index);
                }
                else {
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro" + (index - 4));
                }
                proTxt2.x = proTxt.x + proTxt.width / 2 - proTxt2.width / 2;
                proTxt2.y = titleBg.y + 15 + index * 40;
                this.addChildToContainer(proTxt2);
                var valueTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                if (index <= 4) {
                    if (cfg.effect1) {
                        valueTxt2.text = "+" + cfg.effect1;
                    }
                    else if (cfg.effect2) {
                        valueTxt2.text = "+" + (cfg.effect2 * 100) + "%";
                    }
                }
                else {
                    if (cfg.effect2) {
                        valueTxt2.text = "+" + (cfg.effect2 * 100) + "%";
                    }
                }
                valueTxt2.x = valueTxt.x + valueTxt.width / 2 - valueTxt2.width / 2;
                valueTxt2.y = proTxt2.y;
                this.addChildToContainer(valueTxt2);
            }
        }
        else if (skinId) {
            var cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
            var skinNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
            skinNameTxt.text = LanguageManager.getlocal("wifeName_" + cfg.wifeId) + " : " + cfg.name;
            skinNameTxt.x = innerbg.x + innerbg.width / 2 - skinNameTxt.width / 2;
            skinNameTxt.y = innerbg.y + innerbg.height / 2 - skinNameTxt.height / 2;
            this.addChildToContainer(skinNameTxt);
            var proLen = 6;
            var keyCfg = [
                cfg.atkAdd, cfg.inteAdd, cfg.politicsAdd, cfg.charmAdd,
                cfg.wifeIntimacy, cfg.wifeGlamour, cfg.childReduce, cfg.searchReduce, cfg.wifeReduce,
            ];
            for (var index = 1; index <= keyCfg.length; index++) {
                var tmpKey = keyCfg[index - 1];
                if (!tmpKey) {
                    break;
                }
                if (index % 2 == 1) {
                    var probg = BaseBitmap.create("public_tc_bg05");
                    probg.width = 510;
                    probg.height = 40;
                    probg.x = GameConfig.stageWidth / 2 - probg.width / 2;
                    ;
                    probg.y = titleBg.y + 5 + index * 40;
                    this.addChildToContainer(probg);
                }
                var proTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
                var valueTxt2 = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN);
                if (index <= 4) {
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_pro" + index);
                    if (tmpKey[0] == 1) {
                        valueTxt2.text = "+" + tmpKey[1];
                    }
                    else if (tmpKey[0] == 2) {
                        valueTxt2.text = "+" + (tmpKey[1] * 100) + "%";
                    }
                }
                else {
                    proTxt2.text = LanguageManager.getlocal("acSingleDaySkin_wpro" + index);
                    valueTxt2.text = "+" + tmpKey;
                }
                proTxt2.x = proTxt.x + proTxt.width / 2 - proTxt2.width / 2;
                proTxt2.y = titleBg.y + 15 + index * 40;
                this.addChildToContainer(proTxt2);
                valueTxt2.x = valueTxt.x + valueTxt.width / 2 - valueTxt2.width / 2;
                valueTxt2.y = proTxt2.y;
                this.addChildToContainer(valueTxt2);
            }
        }
        if (skinId) {
            var tipTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_RED2);
            tipTxt.text = LanguageManager.getlocal("acSingleDaySkin_tip");
            tipTxt.x = this.viewBg.x + this.viewBg.width / 2 - tipTxt.width / 2;
            tipTxt.y = innerbg2.y + innerbg2.height - 50;
            this.addChildToContainer(tipTxt);
        }
    };
    AcSingleDaySkinPropertyPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "rank_biao",
        ]);
    };
    AcSingleDaySkinPropertyPopupView.prototype.getShowHeight = function () {
        return 700;
    };
    AcSingleDaySkinPropertyPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSingleDaySkinPropertyPopupView;
}(PopupView));
__reflect(AcSingleDaySkinPropertyPopupView.prototype, "AcSingleDaySkinPropertyPopupView");
