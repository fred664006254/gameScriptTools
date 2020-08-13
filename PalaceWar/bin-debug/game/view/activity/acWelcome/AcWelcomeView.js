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
 * 功能预告
 * author ycg
 * date 2019.9.29
 * @class AcWelcomeView
 */
var AcWelcomeView = (function (_super) {
    __extends(AcWelcomeView, _super);
    function AcWelcomeView() {
        var _this = _super.call(this) || this;
        _this._acTimeDown = null;
        _this._bottomBg = null;
        return _this;
    }
    AcWelcomeView.prototype.initView = function () {
        var maskBmp = BaseBitmap.create("public_9_viewmask");
        maskBmp.width = GameConfig.stageWidth;
        maskBmp.height = GameConfig.stageHeigth;
        this.addChildToContainer(maskBmp);
        maskBmp.alpha = 0.8;
        //标题
        var titleBgStr = ResourceManager.hasRes("acwelcome_title-" + this.getTypeCode()) ? "acwelcome_title-" + this.getTypeCode() : "acwelcome_title-1";
        var titleBg = BaseBitmap.create(titleBgStr);
        titleBg.setPosition(GameConfig.stageWidth / 2 - titleBg.width / 2, 60);
        //底部
        var bottomBgStr = ResourceManager.hasRes("acwelcome_bottombg-" + this.getTypeCode()) ? "acwelcome_bottombg-" + this.getTypeCode() : "acwelcome_bottombg-1";
        var bottomBg = BaseBitmap.create(bottomBgStr);
        bottomBg.setPosition(GameConfig.stageWidth / 2 - bottomBg.width / 2, GameConfig.stageHeigth - bottomBg.height - 80);
        this._bottomBg = bottomBg;
        //红颜
        if (this.code == "1") {
            this.showWifeContainer();
            //樱花特效
            var blossomBone = "acwelcome_blossom";
            var blossomBoneName = blossomBone + "_ske";
            if ((!Api.switchVoApi.checkCloseBone()) && RES.hasRes(blossomBoneName) && App.CommonUtil.check_dragon()) {
                var blossomIcon = App.DragonBonesUtil.getLoadDragonBones("acwelcome_blossom");
                blossomIcon.x = 100;
                blossomIcon.y = 170;
                this.addChildToContainer(blossomIcon);
            }
            //蝴蝶
            var buttflyEffect = ComponentManager.getCustomMovieClip("acwelcome_effect_butflay", 15, 70);
            buttflyEffect.setPosition(40, bottomBg.y - 330);
            buttflyEffect.playWithTime(0);
            this.addChildToContainer(buttflyEffect);
            //扇子
            var funEffect = ComponentManager.getCustomMovieClip("acwelcome_effect_fun", 15, 70);
            funEffect.setPosition(0, bottomBg.y);
            funEffect.playWithTime(0);
            this.addChildToContainer(funEffect);
            bottomBg.visible = false;
        }
        this.addChildToContainer(titleBg);
        this.addChildToContainer(bottomBg);
        //即将开启
        var openInfoBg = BaseBitmap.create("qingyuanitemtitlebg");
        openInfoBg.y = bottomBg.y + 40;
        this.addChildToContainer(openInfoBg);
        var openInfo = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeOpenInfo"), TextFieldConst.FONTSIZE_TITLE_SMALL, TextFieldConst.COLOR_WHITE);
        openInfoBg.width = openInfo.width + 60;
        openInfoBg.x = GameConfig.stageWidth / 2 - openInfoBg.width / 2;
        openInfo.setPosition(openInfoBg.x + openInfoBg.width / 2 - openInfo.width / 2, openInfoBg.y + openInfoBg.height / 2 - openInfo.height / 2);
        this.addChildToContainer(openInfo);
        //倒计时
        var timeBg = BaseBitmap.create("countrywarrewardview_itembg");
        timeBg.width = 300;
        timeBg.height = 66;
        timeBg.x = GameConfig.stageWidth / 2 - timeBg.width / 2;
        timeBg.y = openInfoBg.y + openInfoBg.height + 20;
        this.addChildToContainer(timeBg);
        var acTimeDown = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeTimeDown", [this.vo.getCountDown()]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        acTimeDown.textAlign = TextFieldConst.ALIGH_CENTER;
        acTimeDown.setPosition(timeBg.x + timeBg.width / 2 - acTimeDown.width / 2, timeBg.y + timeBg.height / 2 - acTimeDown.height / 2);
        this.addChildToContainer(acTimeDown);
        this._acTimeDown = acTimeDown;
        acTimeDown.lineSpacing = 5;
        var bottomInfo = ComponentManager.getTextField(LanguageManager.getlocal("acWelcomeBottomInfo-" + this.code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        bottomInfo.setPosition(GameConfig.stageWidth / 2 - bottomInfo.width / 2, GameConfig.stageHeigth - 80);
        this.addChildToContainer(bottomInfo);
    };
    AcWelcomeView.prototype.showWifeContainer = function () {
        var wifeIdArr = [311, 304, 303];
        var infoArr = [
            // {x: 320, y:30, imgY: -20},
            // {x: 420, y:130, imgY: 150},
            // {x: 220, y:180, imgY: 200}
            { x: 320, y: -5, imgY: -20 },
            { x: 440, y: 110, imgY: 150 },
            { x: 200, y: 170, imgY: 200 }
        ];
        for (var i = 0; i < wifeIdArr.length; i++) {
            var container = this.getWifeContainer(wifeIdArr[i], infoArr[i].x, infoArr[i].y, infoArr[i].imgY);
            // container.setPosition(infoArr[i].x, this._bottomBg.y + infoArr[i].y);
            this.addChildToContainer(container);
        }
    };
    AcWelcomeView.prototype.tick = function () {
        this._acTimeDown.text = LanguageManager.getlocal("acWelcomeTimeDown", [this.vo.getCountDown()]);
    };
    AcWelcomeView.prototype.getWifeContainer = function (wifeId, posX, posY, imgY) {
        var container = new BaseDisplayObjectContainer();
        var wifeCfg = Config.WifeCfg.getWifeCfgById(wifeId);
        var boneName = undefined;
        if (wifeCfg && wifeCfg.bone) {
            boneName = wifeCfg.bone + "_ske";
        }
        container.x = posX;
        if ((!Api.switchVoApi.checkCloseBone()) && boneName && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            var droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(wifeCfg.bone);
            // droWifeIcon.setScale(0.8);
            droWifeIcon.setScale(0.8);
            droWifeIcon.anchorOffsetY = droWifeIcon.height;
            droWifeIcon.anchorOffsetX = droWifeIcon.width / 2;
            container.addChild(droWifeIcon);
            container.y = this._bottomBg.y + posY;
        }
        else {
            var wifeImg = BaseLoadBitmap.create(wifeCfg.body);
            wifeImg.width = 640;
            wifeImg.height = 840;
            wifeImg.anchorOffsetY = wifeImg.height;
            wifeImg.anchorOffsetX = wifeImg.width / 2;
            wifeImg.setScale(0.67);
            container.addChild(wifeImg);
            container.y = this._bottomBg.y + imgY;
        }
        return container;
    };
    AcWelcomeView.prototype.getTypeCode = function () {
        return this.code;
    };
    Object.defineProperty(AcWelcomeView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWelcomeView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcWelcomeView.prototype.getTitleBgName = function () {
        return "";
    };
    AcWelcomeView.prototype.getTitleStr = function () {
        return "";
    };
    AcWelcomeView.prototype.getBgName = function () {
        return "";
    };
    AcWelcomeView.prototype.getResourceList = function () {
        var list = [];
        if (this.getTypeCode() == "1") {
            list = [
                "acwelcome_title-1",
                "acwelcome_bottombg-1"
            ];
        }
        return _super.prototype.getResourceList.call(this).concat([
            "countrywarrewardview_itembg", "qingyuanitemtitlebg",
        ]).concat(list);
    };
    AcWelcomeView.prototype.dispose = function () {
        this._acTimeDown = null;
        this._bottomBg = null;
        _super.prototype.dispose.call(this);
    };
    return AcWelcomeView;
}(AcCommonView));
__reflect(AcWelcomeView.prototype, "AcWelcomeView");
//# sourceMappingURL=AcWelcomeView.js.map