/**
 * 本服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceView
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
var PalaceView = (function (_super) {
    __extends(PalaceView, _super);
    function PalaceView() {
        var _this = _super.call(this) || this;
        /**
         * 配置点击位置及跳转关系
         * 650 765
         */
        _this._posList = undefined;
        _this._touchCancel = false;
        _this._hitKey = "";
        _this._shadowList = [];
        _this._birdList = [];
        return _this;
    }
    PalaceView.prototype.initView = function () {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        Api.mainTaskVoApi.isKeepGuide = true;
        Api.mainTaskVoApi.checkShowGuide();
        this.initPosCfg();
        var bg = BaseLoadBitmap.create(this.getBgRes());
        this._bg = bg;
        var parantNode = this._nodeContainer;
        if (Api.palaceVoApi.isCrossOpen()) {
            this._bg.y = 0;
            var scroNode = new BaseDisplayObjectContainer();
            scroNode.height = 1631;
            scroNode.addChild(this._bg);
            var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - this.container.y + 20);
            var scrolV = ComponentManager.getScrollView(scroNode, rect);
            scrolV.y = -20;
            this._nodeContainer.addChild(scrolV);
            scrolV.bounces = false;
            scrolV.horizontalScrollPolicy = "off";
            parantNode = scroNode;
            scrolV.scrollTop = 300;
        }
        else {
            this._nodeContainer.addChild(bg);
            this._bg.y = GameConfig.stageHeigth - 1136 - this.container.y + 20;
        }
        this._bg.addTouch(this.onBgTouchHandler, this, null, true);
        var buiCfg = GameConfig.config.buildingCfg;
        var buiIdlist = Object.keys(buiCfg);
        buiIdlist.sort(function (dataA, dataB) {
            return Number(dataA) - Number(dataB);
        });
        for (var index in this._posList) {
            var poscfg = this._posList[index];
            var buildId = poscfg.buildingid; // buiIdlist[index+starIdx];
            var cfg = buiCfg[buildId];
            var shadowImg = BaseBitmap.create("palace_shadow" + poscfg.shadowId);
            shadowImg.x = this._bg.x + poscfg.x;
            shadowImg.y = this._bg.y + poscfg.y;
            shadowImg.setScale(4);
            shadowImg.alpha = 0.5;
            shadowImg.visible = false;
            parantNode.addChild(shadowImg);
            shadowImg.name = buildId;
            this._shadowList[buildId] = shadowImg;
            var buildingFlag = BaseLoadBitmap.create("palace_build_" + buildId);
            if (this.isLockedWithSwitch(buildId)) {
                App.DisplayUtil.changeToGray(buildingFlag);
            }
            buildingFlag.width = 35;
            buildingFlag.height = 96;
            buildingFlag.setScale(0.9);
            buildingFlag.x = this._bg.x + poscfg.flagx;
            buildingFlag.y = this._bg.y + poscfg.flagy;
            parantNode.addChild(buildingFlag);
            if (poscfg.shadowId == "1" && PlatformManager.checkIsViSp()) {
                shadowImg.x = this._bg.x + 134;
                shadowImg.y = this._bg.y + 218;
                buildingFlag.x = this._bg.x + poscfg.flagx; // + 30;
                buildingFlag.y = this._bg.y + poscfg.flagy; //+ 20;
            }
        }
        var effpos = this.getEffPos();
        for (var eindex = 0; eindex < effpos.length; eindex++) {
            var element = effpos[eindex];
            var springClip = ComponentManager.getCustomMovieClip("palacenewfountaineffect", 8, 100);
            var deltaS2 = 1.0;
            springClip.width = 72 * deltaS2;
            springClip.height = 72 * deltaS2;
            // skinClip.blendMode = egret.BlendMode.ADD;
            springClip.x = this._bg.x + element.x;
            springClip.y = this._bg.y + element.y;
            parantNode.addChild(springClip);
            springClip.playWithTime(0);
        }
        if (Api.palaceVoApi.isCrossOpen()) {
            this.showBirdsClip(parantNode);
        }
        // 大地图光
        var _mapGuang = ComponentManager.getCustomMovieClip("cityscene_guang", 7, 200);
        _mapGuang.width = 300;
        _mapGuang.height = 300;
        _mapGuang.setScale(2);
        _mapGuang.x = -50;
        _mapGuang.y = -90;
        _mapGuang.playWithTime(0);
        _mapGuang.blendMode = egret.BlendMode.ADD;
        parantNode.addChild(_mapGuang);
    };
    PalaceView.prototype.showBirdsClip = function (parentNode) {
        var bird1 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird1.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird1.setScale(1);
        parentNode.addChild(bird1);
        bird1.playWithTime(-1);
        var bird2 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird2.setPosition(this._bg.x + 671, this._bg.y + 140);
        bird2.setScale(0.6);
        parentNode.addChild(bird2);
        bird2.playWithTime(-1);
        var bird3 = ComponentManager.getCustomMovieClip("palacenewbirdeffect", 4, 70);
        bird3.setPosition(this._bg.x + 674, this._bg.y + 140);
        bird3.setScale(0.8);
        parentNode.addChild(bird3);
        bird3.playWithTime(-1);
        egret.Tween.get(bird1, { loop: true }).wait(3000).to({
            x: this._bg.x + 671,
            y: this._bg.y + 140 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000);
        egret.Tween.get(bird2, { loop: true }).wait(3000).wait(2000).to({
            x: this._bg.x + 690,
            y: this._bg.y + 175 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000);
        egret.Tween.get(bird3, { loop: true }).wait(3000).wait(2000).to({
            x: this._bg.x + 674,
            y: this._bg.y + 118 - 100
        }, 0).to({
            x: this._bg.x - 57,
            y: this._bg.y + 142 - 100,
            scaleX: 0.3,
            scaleY: 0.3,
        }, 11000);
    };
    PalaceView.prototype.getEffPos = function () {
        if (!Api.palaceVoApi.isCrossOpen()) {
            return [{ x: 126, y: 310 }, { x: 445, y: 308 }];
        }
        else {
            return [{ x: 126, y: 805 }, { x: 445, y: 805 }];
        }
    };
    PalaceView.prototype.isLockedWithSwitch = function (buiId) {
        var buildcfg = GameConfig.config.buildingCfg[buiId];
        if (buildcfg.state == 0 && !Api.switchVoApi.checkIsBuildingState(buiId)) {
            return true;
        }
        if (buildcfg.state == 1) {
            return false;
        }
        return false;
    };
    PalaceView.prototype.getStartIdx = function () {
        return 7;
    };
    PalaceView.prototype.getCorssBtnPath = function () {
        return "palacve_goBtn";
    };
    PalaceView.prototype.initPosCfg = function () {
        if (!Api.palaceVoApi.isCrossOpen()) {
            this._posList = Config.SceneCfg.getSceneCfgBySceneName("palace");
        }
        else {
            this._posList = Config.SceneCfg.getSceneCfgBySceneName("crosspalace");
        }
    };
    PalaceView.prototype.getBgRes = function () {
        if (!Api.palaceVoApi.isCrossOpen()) {
            return "palace_bg2_2";
        }
        else {
            return "palace_bg3_2";
        }
    };
    PalaceView.prototype.crossBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACECROSSVIEW);
        this.hide();
    };
    PalaceView.prototype.onBgTouchHandler = function (e) {
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            var hitPos = new egret.Point(Math.floor(e.localX), Math.floor(e.localY));
            this._hitKey = "";
            // for (let key = 0; key < this._posList.length; key++)
            for (var key in this._posList) {
                var cfgPos = this._posList[key];
                if (cfgPos.shadowId == "1" && PlatformManager.checkIsViSp()) {
                    cfgPos.x = 134;
                    cfgPos.y = 218;
                }
                if (cfgPos.x <= hitPos.x && hitPos.x <= cfgPos.x + cfgPos.width) {
                    if (cfgPos.y <= hitPos.y && hitPos.y <= cfgPos.y + cfgPos.heigh) {
                        var buiId = cfgPos.buildingid;
                        this._curTouchShadow = this._shadowList[buiId];
                        this._curTouchShadow.visible = true;
                        var bcfg = GameConfig.config.buildingCfg[buiId];
                        if (this.isLockedWithSwitch(buiId)) {
                            App.CommonUtil.showTip(LanguageManager.getlocal("palace_buildingNotOpen"));
                        }
                        else {
                            this._hitKey = this._curTouchShadow.name;
                        }
                        break;
                    }
                }
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            this._touchCancel = true;
            this._hitKey = "";
            if (this._curTouchShadow) {
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (!this._touchCancel && this._hitKey != "") {
                // this._hitKey 处理点击
                this.doHitProcess(this._hitKey);
            }
            this._touchCancel = false;
            this._hitKey = "";
            if (this._curTouchShadow) {
                this._curTouchShadow.visible = false;
            }
            this._curTouchShadow = null;
        }
    };
    PalaceView.prototype.doHitProcess = function (key) {
        var buildcfg = GameConfig.config.buildingCfg[key];
        var titleId = buildcfg.title;
        var buildingId = key;
        if (Object.keys(titleId).length == 1) {
            var tid = titleId[0];
            var titlecfg = Config.TitleCfg.getTitleCfgById(tid);
            if (titlecfg.unlock == 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("palace_titleNotOpen"));
                return;
            }
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEVIEW, { titleId: tid, buildingId: buildingId });
        }
        else {
            ViewController.getInstance().openView(ViewConst.COMMON.PALACEHOUSEGROUPVIEW, { buildingId: buildingId });
        }
    };
    PalaceView.prototype.getSoundBgName = function () {
        return SoundConst.MUSIC_PALACE;
    };
    PalaceView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "palace_hisBtn1",
            "palace_hisBtn2",
            "palace_hisBtn3",
            "palacve_goBtn",
            "palacve_backBtn",
            "palace_shadow1", "palace_shadow2", "palace_shadow3", "palace_shadow4", "palace_shadow5",
        ]);
    };
    ;
    PalaceView.prototype.getRequestData = function () {
        if (!Api.palaceVoApi.isCrossOpen()) {
            NetManager.request(NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, {});
            return { requestType: NetRequestConst.REQUEST_PALACE_GETPALACEINFO, requestData: {} };
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_PALACE_GETPALACEINFO, {});
            return { requestType: NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, requestData: {} };
        }
        // return {requestType:NetRequestConst.REQUEST_PALACE_GETPALACEINFO,requestData:{}};
    };
    PalaceView.prototype.dispose = function () {
        Api.mainTaskVoApi.isKeepGuide = false;
        Api.mainTaskVoApi.hideGuide();
        this._bg.removeTouch();
        this._posList = [];
        this._bg = null;
        this._touchCancel = null;
        this._hitKey = "";
        this._shadowList = [];
        this._curTouchShadow = null;
        this._birdList = [];
        _super.prototype.dispose.call(this);
    };
    return PalaceView;
}(CommonView));
__reflect(PalaceView.prototype, "PalaceView");
