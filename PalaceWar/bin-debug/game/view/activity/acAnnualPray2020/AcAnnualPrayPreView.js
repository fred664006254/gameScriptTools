/*
author : qianjun
desc : 周年祈愿预览 皮肤
*/
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
var AcAnnualPrayPreView = (function (_super) {
    __extends(AcAnnualPrayPreView, _super);
    function AcAnnualPrayPreView() {
        return _super.call(this) || this;
    }
    AcAnnualPrayPreView.prototype.getTitleBgName = function () {
        return null;
    };
    AcAnnualPrayPreView.prototype.getTitleStr = function () {
        return null;
    };
    AcAnnualPrayPreView.prototype.getBgName = function () {
        return "public_9_viewmask";
    };
    AcAnnualPrayPreView.prototype.getUiCode = function () {
        return this.code;
    };
    Object.defineProperty(AcAnnualPrayPreView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPreView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPreView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPreView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualPrayPreView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualPrayPreView.prototype.getResourceList = function () {
        var guidePic = [];
        var view = this;
        return guidePic.concat([]);
    };
    AcAnnualPrayPreView.prototype.initView = function () {
        this.addTouchTap(this.hide, this, null);
        var node = new BaseDisplayObjectContainer();
        this.addChild(node);
        node.y = GameConfig.stageHeigth / 2 - 480;
        var view = this;
        var code = view.getUiCode();
        var title = BaseBitmap.create("annualprayenvelopetitle-" + code);
        title.setPosition(GameConfig.stageWidth / 2 - title.width / 2, 0);
        node.addChild(title);
        var bg1 = BaseBitmap.create("annualprayenvelopebehind-" + code);
        bg1.setPosition(GameConfig.stageWidth / 2 - bg1.width / 2, 230);
        node.addChild(bg1);
        var bg2 = BaseBitmap.create("annualprayenvelopefront-" + code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bg2, bg1);
        node.addChild(bg2);
        //梨花
        var lihua = ComponentManager.getCustomMovieClip("newyearlihuared", 10, 100);
        lihua.width = 500;
        lihua.height = 500;
        lihua.playWithTime(-1);
        node.addChild(lihua);
        lihua.setScale(0.6);
        lihua.setPosition(bg1.x + 40, bg1.y - 190);
        var lihua2 = ComponentManager.getCustomMovieClip("newyearlihuablue", 11, 100);
        lihua2.width = 450;
        lihua2.height = 450;
        lihua2.setScale(0.6);
        node.addChild(lihua2);
        lihua2.playWithTime(-1);
        lihua2.setPosition(bg1.x - 30, bg1.y - 150);
        //红颜
        var infobg1 = BaseBitmap.create("annualprayenvelopename-" + code);
        infobg1.width = 170;
        infobg1.height = 85;
        infobg1.setPosition(bg1.x + 80, bg1.y - 40);
        node.addChild(infobg1);
        var wifeId = this.cfg.getSkin(code);
        var wifecfg = Config.WifeskinCfg.getWifeCfgById(wifeId);
        var wifeName = ComponentManager.getTextField(wifecfg.name, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, wifeName, infobg1, [-7, 0]);
        node.addChild(wifeName);
        // let wifeAbility = ComponentManager.getTextField(LanguageManager.getlocal(`servant_newui_attr4`,[String(wifecfg.glamour)]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // wifeAbility.setPosition(infobg1.x+105-wifeAbility.width/2,wifeName.y+22);
        // node.addChild(wifeAbility);
        var boneName = undefined;
        var wife = null;
        if (wifecfg && wifecfg.bone) {
            boneName = wifecfg.bone + "_ske";
        }
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            wife = App.DragonBonesUtil.getLoadDragonBones(wifecfg.bone);
            wife.setScale(0.73); //0.53
            wife.anchorOffsetY = wife.height;
            wife.anchorOffsetX = wife.width / 2;
            wife.x = bg1.x + 340;
            wife.y = bg1.y + 500;
            wife.mask = new egret.Rectangle(-354, -665, 914, 1136);
            node.addChild(wife);
        }
        else {
            wife = BaseLoadBitmap.create(wifecfg.body);
            wife.width = 640;
            wife.height = 840;
            wife.setScale(0.45);
            wife.x = bg1.x + 180;
            wife.y = bg1.y + 150;
            node.addChild(wife);
        }
        // //门客
        // let servantId = this.cfg.getServant(code);
        // let servantcfg = Config.ServantskinCfg.getServantSkinItemById(servantId); 
        // let dagonBonesName = "servant_full2_" + servantId;
        // boneName = undefined;
        // if (servantcfg && dagonBonesName) {
        //     boneName = dagonBonesName + "_ske";
        // }
        // if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()){
        //     let servantIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
        //     servantIcon.scaleY = 0.95;
        //     servantIcon.scaleX = 0.95;
        //     servantIcon.x = bg1.x + 230;
        //     servantIcon.y = bg1.y + 500;
        //     node.addChild(servantIcon);
        // }
        // else {
        //     let servantImg = BaseLoadBitmap.create(servantcfg.body);
        //     servantImg.width = 405;
        //     servantImg.height = 467;
        //     servantImg.setScale(0.9);
        //     servantImg.x = bg1.x + 80;
        //     servantImg.y = bg1.y + 150;
        //     node.addChild(servantImg);
        // }
        // let infobg2 = BaseBitmap.create(`annualprayenvelopename-${code}`);
        // infobg2.width = 120;
        // infobg2.height = 90;
        // infobg2.setPosition(bg1.x + 320, bg1.y + 320);
        // node.addChild(infobg2);
        // if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
        //     infobg2.width = 240;
        // }
        // let servantName = ComponentManager.getTextField(servantcfg.name,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantName , infobg2, [-7, 0]);
        // node.addChild(servantName);
        // let attStr:string;
        // for (var index1 = 0; index1 < servantcfg.speciality.length; index1++) 
        // {
        //     var element = servantcfg.speciality[index1];
        //     if(index1 == 0){
        //         attStr = LanguageManager.getlocal("servantInfo_speciality" + element);
        //     }else{
        //         attStr = attStr + "、" + LanguageManager.getlocal("servantInfo_speciality" + element);
        //     }
        // }
        // let servantAttr = ComponentManager.getTextField(attStr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // servantAttr.setPosition(infobg2.x+105-servantAttr.width/2,servantName.y+22);
        // node.addChild(servantAttr);
        // let servantAbility = ComponentManager.getTextField(LanguageManager.getlocal(`emperorWarBuzhenZzhi`,[String(servantcfg.getTotalAbility())]),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_BROWN);
        // servantAbility.setPosition(infobg2.x+105-servantAbility.width/2,servantAttr.y+22);
        // node.addChild(servantAbility);
        // if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
        //     servantAttr.x = infobg2.x + infobg2.width/2 - servantAttr.width/2;
        //     servantName.x = infobg2.x + infobg2.width/2 - servantName.width/2;
        //     servantAbility.x = infobg2.x + infobg2.width/2 - servantAbility.width/2;
        // }
        // node.addChild(bg2);
        // let canget:BaseTextField=ComponentManager.getTextField(LanguageManager.getlocal("joinAcCanGet"),TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_WHITE);
        // canget.setPosition(105,778);
        // this.addChild(canget);
        // let wifestr = LanguageManager.getlocal("wife")+"--"+wifecfg.name;
        // let servantstr = LanguageManager.getlocal("itemType8")+"--"+servantcfg.name;
        // let wifeget = ComponentManager.getTextField(wifestr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // wifeget.setPosition(180,canget.y+12);
        // node.addChild(wifeget);
        // let servantget = ComponentManager.getTextField(servantstr,TextFieldConst.FONTSIZE_CONTENT_SMALL,TextFieldConst.COLOR_LIGHT_YELLOW);
        // servantget.setPosition(180,wifeget.y+25);
        // node.addChild(servantget);
        // canget.rotation = 4;
        // wifeget.rotation = 4;
        // servantget.rotation = 4;
        var closeText = ComponentManager.getTextField(LanguageManager.getlocal("clickToClose"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        closeText.setPosition((GameConfig.stageWidth - closeText.width) / 2, GameConfig.stageHeigth - 60);
        this.addChild(closeText);
    };
    return AcAnnualPrayPreView;
}(BaseView));
__reflect(AcAnnualPrayPreView.prototype, "AcAnnualPrayPreView");
//# sourceMappingURL=AcAnnualPrayPreView.js.map