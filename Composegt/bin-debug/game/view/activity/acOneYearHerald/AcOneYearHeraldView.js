/*
author : yanyuling
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
var AcOneYearHeraldView = (function (_super) {
    __extends(AcOneYearHeraldView, _super);
    function AcOneYearHeraldView() {
        var _this = _super.call(this) || this;
        _this.aid = undefined;
        _this._droWifeIcon = undefined;
        _this._skinImg = undefined;
        _this._activityTimerText = null;
        _this._ruleText = null;
        _this._btn1 = undefined;
        _this._btn2 = undefined;
        _this._pro1Img = undefined;
        _this._pro2Img = undefined;
        _this._redbg = undefined;
        _this.aid = App.StringUtil.firstCharToLower(_this.getClassName().replace("Ac", "").replace("View", ""));
        return _this;
    }
    Object.defineProperty(AcOneYearHeraldView.prototype, "code", {
        get: function () {
            if (this.param && this.param.data) {
                return this.param.data;
            }
            else {
                return "";
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcOneYearHeraldView.prototype, "acVo", {
        get: function () {
            this.aid = App.StringUtil.firstCharToLower(this.getClassName().replace("Ac", "").replace("View", ""));
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearHeraldView.prototype.initView = function () {
        if (this.acVo.isFirstOpen()) {
            NetManager.request(NetRequestConst.REQUEST_FANLI_GETOPEN_FIRST, { activeId: this.acVo.aidAndCode });
            ViewController.getInstance().openView("AcOneYearHeraIdStoryView", {
                idx: 1,
                buidId: "first",
                aid: this.aid,
                code: this.code
            });
        }
        var bg = BaseBitmap.create("oneYearHerald_bg");
        bg.y = GameConfig.stageHeigth / 2 - bg.height / 2;
        this.addChild(bg);
        this._redbg = bg;
        var closeBtn = ComponentManager.getButton("xingcun_closebtn", "", this.hide, this);
        closeBtn.x = bg.x + bg.width - closeBtn.width - 20;
        closeBtn.y = bg.y + 20;
        this.addChild(closeBtn);
        var oneYearHerald_txtbg = BaseBitmap.create("oneYearHerald_txtbg");
        oneYearHerald_txtbg.x = GameConfig.stageWidth / 2 - oneYearHerald_txtbg.width / 2;
        oneYearHerald_txtbg.y = bg.y + 220;
        this.addChild(oneYearHerald_txtbg);
        //活动时间   
        this._activityTimerText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._activityTimerText.text = LanguageManager.getlocal("oneYearHeraldView_activityTime-" + this.code); // this.acVo.getAcLocalTime(true);
        this._activityTimerText.x = GameConfig.stageWidth / 2 - this._activityTimerText.width / 2;
        this._activityTimerText.y = oneYearHerald_txtbg.y + 5;
        this.addChild(this._activityTimerText);
        var deltaY = 3;
        // "oneYearHeraldView_activityTime-1":"",
        //规则
        this._ruleText = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._ruleText.multiline = true;
        this._ruleText.lineSpacing = 4;
        // this._ruleText.width =  500;
        this._ruleText.y = this._activityTimerText.y + this._activityTimerText.height + deltaY;
        this._ruleText.text = LanguageManager.getlocal("acOneYearHerald_desc-" + this.code);
        this._ruleText.x = GameConfig.stageWidth / 2 - this._ruleText.width / 2;
        this.addChild(this._ruleText);
        // let protxt1 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        // protxt1.x = 50;
        // protxt1.y = bg.y + bg.height - 210;
        // let starNum = Config.ServantCfg.getServantItemById(this.cfg.servantId).getStarNums();
        // protxt1.text = LanguageManager.getlocal("acRechargeBoxSPRewardTxt1",[": "+starNum]);
        // this.addChild(protxt1);
        // let protxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        // protxt2.x = protxt1.x
        // protxt2.y = protxt1.y + protxt1.height + 10;
        // let wifeCfg = Config.WifeCfg.getWifeCfgById( this.cfg.wifeId);
        // protxt2.text = LanguageManager.getlocal("acRechargeBoxSPRewardTxt2",[": "+wifeCfg.glamour]);
        // this.addChild(protxt2);
        var btmbg = BaseBitmap.create("oneYearHerald_btmbg");
        btmbg.x = GameConfig.stageWidth / 2 - btmbg.width / 2;
        btmbg.y = bg.y + bg.height - btmbg.height - 40;
        this.addChild(btmbg);
        var btn1 = ComponentManager.getButton("oneYearHerald_btn1", "", this.switchhandler, this, [1]);
        btn1.x = btmbg.x + btmbg.width / 2 - btn1.width / 2;
        btn1.y = btmbg.y + btmbg.height - btn1.height - 5;
        this.addChild(btn1);
        var btn2 = ComponentManager.getButton("oneYearHerald_btn2", "", this.switchhandler, this, [2]);
        btn2.x = btn1.x;
        btn2.y = btn1.y;
        this.addChild(btn2);
        this._btn1 = btn1;
        this._btn2 = btn2;
        this._pro1Img = BaseBitmap.create("oneYearHerald_pro1");
        this._pro1Img.x = btmbg.x + btmbg.width / 2 - this._pro1Img.width / 2;
        this._pro1Img.y = btn1.y - this._pro1Img.height - 10;
        this.addChild(this._pro1Img);
        this._pro2Img = BaseBitmap.create("oneYearHerald_pro2");
        this._pro2Img.x = btmbg.x + btmbg.width / 2 - this._pro2Img.width / 2;
        this._pro2Img.y = btn1.y - this._pro2Img.height - 10;
        this.addChild(this._pro2Img);
        var flower3 = BaseBitmap.create("oneYearHerald_flower1");
        flower3.x = 0; //btmbg.x;
        flower3.y = btmbg.y + btmbg.height - flower3.height + 7;
        this.addChild(flower3);
        var oneyearoverview_bg2 = BaseBitmap.create("oneyearoverview_bg2");
        oneyearoverview_bg2.y = 60;
        this.addChild(oneyearoverview_bg2);
        this.switchhandler(2);
    };
    AcOneYearHeraldView.prototype.switchhandler = function (param) {
        if (param == 2) {
            this.showDBDragon(true);
        }
        else {
            this.showDBDragon(false);
        }
    };
    AcOneYearHeraldView.prototype.showDBDragon = function (isServant) {
        if (isServant === void 0) { isServant = true; }
        this._pro1Img.visible = this._btn2.visible = !isServant;
        this._pro2Img.visible = this._btn1.visible = isServant;
        var servantId = this.cfg.servantId;
        var wifeId = this.cfg.wifeId;
        var boneName = "servant_full2_" + servantId + "_ske";
        var dagonBonesName = "servant_full2_" + servantId;
        if (isServant == false) {
            boneName = "wife_full_" + wifeId + "_ske";
            dagonBonesName = "wife_full_" + wifeId;
        }
        if (this._droWifeIcon) {
            this._droWifeIcon.dispose();
            this._droWifeIcon = null;
        }
        if (this._skinImg) {
            this._skinImg.visible = false;
        }
        if (!Api.switchVoApi.checkServantCloseBone() && boneName && servantId && RES.hasRes(boneName) && App.CommonUtil.check_dragon()) {
            this._droWifeIcon = App.DragonBonesUtil.getLoadDragonBones(dagonBonesName);
            this._droWifeIcon.visible = true;
            this._droWifeIcon.setScale(0.9);
            this._droWifeIcon.anchorOffsetY = this._droWifeIcon.height;
            this._droWifeIcon.anchorOffsetX = this._droWifeIcon.width / 2 * this._droWifeIcon.scaleX;
            this._droWifeIcon.x = GameConfig.stageWidth / 2;
            this._droWifeIcon.y = this._redbg.y + this._redbg.height - 120;
            this.addChildAt(this._droWifeIcon, 3);
            this._droWifeIcon.mask = new egret.Rectangle(-300, -640, 620, 680);
        }
        else {
            var skinW = 640;
            var skinH = 482;
            var tarScale = 1.15;
            var skinImgPath = undefined;
            var rectM = new egret.Rectangle(0, 0, 570, 0);
            if (isServant) {
                var serCfg = Config.ServantCfg.getServantItemById(servantId);
                skinImgPath = serCfg.fullIcon;
                rectM.width = 570;
            }
            else {
                tarScale = 0.68;
                var serCfg = Config.WifeCfg.getWifeCfgById(wifeId);
                skinImgPath = serCfg.body;
                var skinW_1 = 640;
                skinH = 840;
                rectM.width = 820;
            }
            if (!this._skinImg) {
                this._skinImg = BaseLoadBitmap.create(skinImgPath);
                this.addChildAt(this._skinImg, 3);
            }
            else {
                this._skinImg.setload(skinImgPath);
            }
            this._skinImg.visible = true;
            this._skinImg.width = skinW;
            this._skinImg.height = skinH;
            this._skinImg.setScale(tarScale);
            // this._skinImg.anchorOffsetY = this._skinImg.height;
            this._skinImg.anchorOffsetX = this._skinImg.width / 2;
            this._skinImg.x = GameConfig.stageWidth / 2;
            this._skinImg.y = this._redbg.y + this._redbg.height - this._skinImg.height * tarScale - 100;
            rectM.height = this._skinImg.height;
            this._skinImg.mask = rectM;
        }
    };
    Object.defineProperty(AcOneYearHeraldView.prototype, "cfg", {
        get: function () {
            return this.acVo.config;
        },
        enumerable: true,
        configurable: true
    });
    AcOneYearHeraldView.prototype.getTitleStr = function () {
        return null;
    };
    AcOneYearHeraldView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "oneYearHerald_bg", "oneYearHerald_btmbg", "xingcun_closebtn",
            "oneYearHerald_btn1", "oneYearHerald_btn2", "oneYearHerald_flower1", "oneyearoverview_flower",
            "oneYearHerald_txtbg", "oneYearHerald_pro1", "oneYearHerald_pro2",
        ]);
    };
    AcOneYearHeraldView.prototype.getBgName = function () {
        return null;
    };
    AcOneYearHeraldView.prototype.getButtomLineBg = function () {
        return null;
    };
    AcOneYearHeraldView.prototype.getCloseBtnName = function () {
        return null;
    };
    AcOneYearHeraldView.prototype.getTitleBgName = function () {
        return null;
    };
    AcOneYearHeraldView.prototype.dispose = function () {
        this.aid = null;
        this._droWifeIcon = null;
        this._skinImg = null;
        this._activityTimerText = null;
        this._ruleText = null;
        this._redbg = null;
        this._btn1 = null;
        this._btn2 = null;
        _super.prototype.dispose.call(this);
    };
    return AcOneYearHeraldView;
}(BaseView));
__reflect(AcOneYearHeraldView.prototype, "AcOneYearHeraldView");
