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
/*
author : qinajun
desc : 佳人预览
*/
var AcDechuanshidaiPopupViewTab4 = (function (_super) {
    __extends(AcDechuanshidaiPopupViewTab4, _super);
    function AcDechuanshidaiPopupViewTab4(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._nodeContainer = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDechuanshidaiPopupViewTab4.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab4.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiPopupViewTab4.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiPopupViewTab4.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDechuanshidaiPopupViewTab4.prototype.initView = function () {
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 535;
        Bg.height = 658;
        Bg.x = 30;
        Bg.y = 55;
        view.addChild(Bg);
        var code = this.getUiCode();
        var wifeId = view.cfg.getSkin(code);
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var isWife = false;
        if (wifeCfg) {
            isWife = true;
        }
        var need = 0;
        //佳人
        if (isWife) {
            for (var i in view.cfg.recharge) {
                var unit = view.cfg.recharge[i];
                if (unit.getReward.indexOf(wifeId) > -1) {
                    need = unit.needGem;
                    break;
                }
            }
            var servantCfg = Config.ServantCfg.getServantItemById(wifeCfg.servantId);
            var bg = BaseLoadBitmap.create("sevendayssignupview_infobg_7");
            bg.width = 536;
            bg.height = 400;
            bg.setPosition(this.width / 2 - bg.width / 2 + 25, 90);
            this.addChild(bg);
            var rect = new egret.Rectangle(0, 0, 536, 368);
            var maskContan = new BaseDisplayObjectContainer();
            maskContan.width = 536;
            maskContan.height = 368;
            maskContan.mask = rect;
            maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
            this.addChild(maskContan);
            var boneName = undefined;
            var wife = null;
            if (wifeCfg && wifeCfg.bone) {
                boneName = wifeCfg.bone + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                wife = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
                wife.width = 354;
                wife.height = 611;
                wife.setScale(0.75);
                wife.mask = new egret.Rectangle(-354, -800, 914, 720);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [270, 458]);
            }
            else {
                wife = BaseLoadBitmap.create(wifeCfg.body);
                wife.setScale(0.5);
                wife.mask = new egret.Rectangle(0, 0, 640, 700);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, wife, bg, [125, 49]);
            }
            view.addChild(wife);
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 536;
            topbg.height = 40;
            topbg.setPosition(this.width / 2 - topbg.width / 2 + 25, 58);
            this.addChild(topbg);
            var topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
            topbgLine.width = 536;
            topbgLine.setPosition(topbg.x, topbg.y);
            this.addChild(topbgLine);
            var str = LanguageManager.getlocal("acDechuanshidaitip3-" + code, [String(need), wifeCfg.name]);
            var topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
            this.addChild(topDesc);
            var skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 20);
            skinnamebg.setScale(0.9);
            this.addChild(skinnamebg);
            var skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('wife'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTitle.width = 120;
            skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
            skinNameTitle.setPosition(57, 138);
            this.addChild(skinNameTitle);
            var skinNameTxt = ComponentManager.getTextField(wifeCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            skinNameTxt.width = 120;
            skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
            skinNameTxt.setPosition(57, 162);
            this.addChild(skinNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 210;
            buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 25, bg.y + bg.height + 5);
            this.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 524;
            buttomBg2.height = 204;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            this.addChild(buttomBg2);
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 500;
            descBg.height = 95;
            descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
            this.addChild(descBg);
            //let addValues = Api.wifeSkinVoApi.getWifeSkinProAdd(skinId, true);
            //初始魅力
            var initialCharmStr = LanguageManager.getlocal('acCommonWifePopupViewcCharm', [wifeCfg.glamour + '']);
            var initialCharmTxt = ComponentManager.getTextField(initialCharmStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            initialCharmTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            this.addChild(initialCharmTxt);
            //加成门客
            var servantAddStr = LanguageManager.getlocal('acCommonWifePopupViewcServant', [servantCfg.name]);
            var servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantAddTxt.setPosition(buttomBg.x + 30, initialCharmTxt.y + 30);
            this.addChild(servantAddTxt);
            var wifeDescStr = LanguageManager.getlocal('wifeDesc_' + wifeId);
            var wifeDescTxt = ComponentManager.getTextField(wifeDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            wifeDescTxt.lineSpacing = 3;
            wifeDescTxt.width = descBg.width - 50;
            wifeDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
            this.addChild(wifeDescTxt);
        }
        else {
            var servantCfg = Config.ServantCfg.getServantItemById(wifeId);
            var dagonBonesName = "servant_full2_" + wifeId;
            var bg = BaseLoadBitmap.create("acchristmasview_rewardmidbg");
            bg.width = 536;
            bg.height = 400;
            bg.setPosition(this.width / 2 - bg.width / 2 + 25, 90);
            this.addChild(bg);
            var rect = new egret.Rectangle(0, 0, 536, 368);
            var maskContan = new BaseDisplayObjectContainer();
            maskContan.width = 536;
            maskContan.height = 368;
            maskContan.mask = rect;
            maskContan.setPosition(bg.x + bg.width / 2 - maskContan.width / 2, bg.y + 30);
            this.addChild(maskContan);
            var boneName = undefined;
            var servant = null;
            if (servantCfg && dagonBonesName) {
                boneName = dagonBonesName + "_ske";
            }
            if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
                servant = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
                // servant.width = 354;
                // servant.height = 611;
                // wife.setAnchorOffset(-138.5, -610);
                // if(PlatformManager.checkIsThSp())
                // {
                //     wife.setAnchorOffset(-138.5, -650);
                // }
                servant.mask = new egret.Rectangle(-354, -609, 914, 580);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [300, 419]);
            }
            else {
                servant = BaseLoadBitmap.create(servantCfg.fullIcon);
                servant.width = 405;
                servant.height = 467;
                servant.setScale(0.8);
                servant.mask = new egret.Rectangle(0, 0, 405, 467);
                App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, servant, bg, [110, 20]);
            }
            view.addChild(servant);
            var topbg = BaseLoadBitmap.create("acchristmasview_rewardtopbg");
            topbg.width = 536;
            topbg.height = 40;
            topbg.setPosition(this.width / 2 - topbg.width / 2 + 25, 56);
            this.addChild(topbg);
            var topbgLine = BaseLoadBitmap.create("herosavebeauty_sideline");
            topbgLine.width = 536;
            topbgLine.setPosition(topbg.x, topbg.y - 2);
            this.addChild(topbgLine);
            var str = LanguageManager.getlocal("acDechuanshidaitip2-" + code, [String(need), servantCfg.name]);
            var topDesc = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
            topDesc.setPosition(topbg.x + topbg.width / 2 - topDesc.width / 2, topbg.y + topbg.height / 2 - topDesc.height / 2 - 2);
            this.addChild(topDesc);
            var skinnamebg = BaseLoadBitmap.create("skin_detail_namebg");
            skinnamebg.setPosition(bg.x, bg.y + 20);
            skinnamebg.setScale(0.9);
            this.addChild(skinnamebg);
            var skinNameTitle = ComponentManager.getTextField(LanguageManager.getlocal('servant'), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_QUALITY_ORANGE);
            skinNameTitle.width = 120;
            skinNameTitle.textAlign = egret.HorizontalAlign.CENTER;
            skinNameTitle.setPosition(57, 138);
            this.addChild(skinNameTitle);
            var skinNameTxt = ComponentManager.getTextField(servantCfg.name, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            skinNameTxt.width = 120;
            skinNameTxt.textAlign = egret.HorizontalAlign.CENTER;
            skinNameTxt.setPosition(57, 162);
            this.addChild(skinNameTxt);
            var buttomBg = BaseBitmap.create("public_9_probiginnerbg");
            buttomBg.width = 530;
            buttomBg.height = 210;
            buttomBg.setPosition(this.width / 2 - buttomBg.width / 2 + 25, bg.y + bg.height + 5);
            this.addChild(buttomBg);
            var buttomBg2 = BaseBitmap.create("public_9_bg14");
            buttomBg2.width = 524;
            buttomBg2.height = 204;
            buttomBg2.setPosition(buttomBg.x + buttomBg.width / 2 - buttomBg2.width / 2, buttomBg.y + buttomBg.height / 2 - buttomBg2.height / 2);
            this.addChild(buttomBg2);
            var descBg = BaseBitmap.create("public_9_managebg");
            descBg.width = 500;
            descBg.height = 95;
            descBg.setPosition(buttomBg.x + buttomBg.width / 2 - descBg.width / 2, buttomBg.y + buttomBg.height / 2 - descBg.height / 2 + 40);
            this.addChild(descBg);
            //综合资质
            var aptitudeStr = LanguageManager.getlocal("acCommonServantPopupViewcAptitude", [Api.servantVoApi.getServantAptitude(wifeId) + '']);
            var aptitudeTxt = ComponentManager.getTextField(aptitudeStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            aptitudeTxt.setPosition(buttomBg.x + 30, buttomBg.y + 30);
            this.addChild(aptitudeTxt);
            //门客特长
            var speciality = servantCfg.speciality;
            var specialityStr = "";
            for (var i = 0; i < speciality.length; i++) {
                specialityStr += LanguageManager.getlocal("servantInfo_speciality" + speciality[i]) + "，";
            }
            var servantTFStr = LanguageManager.getlocal('acCommonServantPopupViewcAdvantage', [specialityStr.substr(0, specialityStr.length - 1)]);
            var servantTF = ComponentManager.getTextField(servantTFStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            //let servantAddTxt = ComponentManager.getTextField(servantAddStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantTF.setPosition(buttomBg.x + 30, aptitudeTxt.y + 30);
            this.addChild(servantTF);
            var servantDescStr = servantCfg.story;
            var servantDescTxt = ComponentManager.getTextField(servantDescStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
            servantDescTxt.lineSpacing = 3;
            servantDescTxt.width = descBg.width - 50;
            servantDescTxt.setPosition(descBg.x + 20, descBg.y + 20);
            this.addChild(servantDescTxt);
        }
    };
    AcDechuanshidaiPopupViewTab4.prototype.dispose = function () {
        this._nodeContainer = null;
        //App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DBDAY_FRESH_ITEM,this.update,this);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiPopupViewTab4;
}(AcCommonViewTab));
__reflect(AcDechuanshidaiPopupViewTab4.prototype, "AcDechuanshidaiPopupViewTab4");
//# sourceMappingURL=AcDechuanshidaiPopupViewTab4.js.map