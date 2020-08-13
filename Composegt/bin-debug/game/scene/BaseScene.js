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
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
var BaseScene = (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        // protected _skyLayer:BaseBitmap;
        _this._npcList = [];
        _this.posCfg = {};
        _this.shadowCfg = {};
        _this.namePosCfg = {};
        _this.reddotPosCfg = {};
        _this.npcMessageCfg = {};
        _this.guideNeedTouchCfg = {};
        _this.bubbleCfg = {};
        _this._bubbleList = [];
        _this._bubbleShowIdx = 0;
        _this._isCfgInit = false;
        _this._npcNameList = [];
        _this._npcNamebgList = [];
        _this._npcRedList = [];
        return _this;
    }
    BaseScene.prototype.initCfg = function () {
        if (this._isCfgInit == false) {
            var sceneName = App.StringUtil.firstCharToLower(this.getClassName());
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName(sceneName);
            this._isCfgInit = true;
            if (curCfg) {
                if (curCfg.posCfg) {
                    this.posCfg = curCfg.posCfg;
                }
                if (curCfg.shadowCfg) {
                    this.shadowCfg = curCfg.shadowCfg;
                }
                if (curCfg.namePosCfg) {
                    this.namePosCfg = curCfg.namePosCfg;
                }
                if (curCfg.reddotPosCfg) {
                    this.reddotPosCfg = curCfg.reddotPosCfg;
                }
                if (curCfg.npcMessageCfg) {
                    this.npcMessageCfg = curCfg.npcMessageCfg;
                }
                if (curCfg.guideNeedTouchCfg) {
                    this.guideNeedTouchCfg = curCfg.guideNeedTouchCfg;
                }
                if (curCfg.bubbleCfg) {
                    this.bubbleCfg = curCfg.bubbleCfg;
                }
            }
        }
    };
    BaseScene.prototype.init = function () {
        var _this = this;
        this.initCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.refreshMode, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW, this.checkGuideNpc, this);
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = thisClassName.toLowerCase();
        if (!this._sceneLayer) {
            this._sceneLayer = new BaseDisplayObjectContainer();
        }
        // if(!this._skyLayer)
        // {
        // 	this._skyLayer=BaseBitmap.create(thisClassName+"sky");
        // 	this._skyLayer.name="sky";
        // 	this._sceneLayer.addChild(this._skyLayer);
        // }
        if (!this._mapLayer) {
            var checkResName = thisClassName + "_" + PlatformManager.getAppid();
            if (Number(ServerCfg.selectServer.zid) > 900 && Number(ServerCfg.selectServer.zid) < 1000 && RES.hasRes(checkResName)) {
                var rect = egret.Rectangle.create();
                rect.setTo(0, 0, 640, 1136);
                this._mapLayer = BaseLoadBitmap.create(checkResName, rect);
                NetLoading.show();
                var timeNum_1 = egret.setTimeout(function () {
                    NetLoading.hide();
                    if (timeNum_1 > -1) {
                        egret.clearTimeout(timeNum_1);
                        timeNum_1 = -1;
                    }
                }, this, 1000);
            }
            else {
                if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
                    this._mapLayer = BaseBitmap.create("cityscene_scroll_1");
                    this._mapLayer2 = BaseBitmap.create("cityscene_scroll_2");
                    this._mapLayer2.y = GameConfig.stageHeigth - 1136;
                    this._mapLayer3 = BaseBitmap.create("cityscene_scroll_3");
                    this._mapLayer3.y = GameConfig.stageHeigth - 1136;
                    this._mapLayer4 = BaseBitmap.create("cityscene_scroll_4");
                    this._mapLayer4.y = GameConfig.stageHeigth - 1136;
                    // 大地图光
                    this._mapGuang = ComponentManager.getCustomMovieClip("cityscene_guang", 7, 200);
                    this._mapGuang.width = 300;
                    this._mapGuang.height = 300;
                    this._mapGuang.setScale(2);
                    this._mapGuang.x = 370;
                    this._mapGuang.y = 0;
                    this._mapGuang.playWithTime();
                    this._mapGuang.blendMode = egret.BlendMode.ADD;
                }
                else {
                    this._mapLayer = BaseBitmap.create(thisClassName);
                }
            }
            if (this._mapLayer4) {
                this._sceneLayer.addChild(this._mapLayer4);
            }
            if (this._mapLayer3) {
                this._sceneLayer.addChild(this._mapLayer3);
            }
            this._sceneLayer.addChild(this._mapLayer);
            if (this._mapGuang) {
                this._sceneLayer.addChild(this._mapGuang);
            }
            if (this._mapLayer2) {
                this._sceneLayer.addChild(this._mapLayer2);
            }
        }
        if (!this._effectLayer) {
            this._effectLayer = new BaseDisplayObjectContainer();
            this._sceneLayer.addChild(this._effectLayer);
        }
        this.setLayerPosition();
        if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 640, 1136);
            var scrollView_1 = ComponentManager.getScrollView(this._sceneLayer, rect);
            scrollView_1.horizontalScrollPolicy = "on";
            scrollView_1.verticalScrollPolicy = "off";
            scrollView_1.bounces = false;
            scrollView_1.addEventListener(egret.Event.CHANGE, function () {
                if (Api.rookieVoApi.isGuiding) {
                    scrollView_1.horizontalScrollPolicy = "off";
                }
                else {
                    scrollView_1.horizontalScrollPolicy = "on";
                }
                _this._mapLayer2.x = (_this._mapLayer.width - _this._mapLayer2.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                _this._mapLayer3.x = (_this._mapLayer.width - _this._mapLayer3.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                _this._mapLayer4.x = (_this._mapLayer.width - _this._mapLayer4.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                _this._mapGuang.x = (_this._mapLayer2.x + _this._mapLayer3.x) / 2 + 370;
            }, this);
            // scrollView.add
            // this._sceneLayer.addChild(scrollView);
            if (BaseScene.scrollToPos != -1) {
                scrollView_1.setScrollLeft(BaseScene.scrollToPos);
                scrollView_1.horizontalScrollPolicy = "off";
                BaseScene.scrollToPos = -1;
            }
            else {
                scrollView_1.setScrollLeft(BaseScene.scrollToCenterPos);
            }
            this.addChild(scrollView_1);
            this._sceneScroll = scrollView_1;
        }
        else {
            this.addChild(this._sceneLayer);
        }
        this.initNPC();
        // this._sceneLayer.anchorOffsetX = this._sceneLayer.width/2;
        // this._sceneLayer.anchorOffsetY = this._sceneLayer.height/2;
        // this._sceneLayer.x =  this._sceneLayer.width/2;
        // this._sceneLayer.y =  this._sceneLayer.height/2;
        this.refreshAfterShow();
        // App.CommonUtil.formatSeaScreen(this);
    };
    BaseScene.prototype.playBg = function () {
        var bgName = this.getSoundBgName();
        if (RES.hasRes(bgName)) {
            SoundManager.playBg(bgName);
        }
    };
    BaseScene.prototype.getSoundBgName = function () {
        var className = this.getClassName().toLowerCase();
        className = className.substring(0, className.indexOf("scene"));
        return "music_" + className;
    };
    BaseScene.prototype.refreshMode = function (event) {
        var npcName = event.data;
        if (npcName == MessageConst.MESSAGE_MODEL_USERINFO) {
            this.checkNpcStatus();
        }
        else {
            if (this.posCfg) {
                for (var key in this.posCfg) {
                    if (npcName.indexOf(key) > -1) {
                        npcName = key;
                    }
                }
            }
            this.checkNpcShow(npcName);
        }
    };
    BaseScene.prototype.checkShowNpcMessage = function (npcName) {
        var modelName = npcName;
        modelName = this.formatModelToCheck(modelName);
        var npc = this._sceneLayer.getChildByName(modelName);
        var npcname = this._sceneLayer.getChildByName(modelName + "name");
        if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
            var result = Api[modelName + "VoApi"].isShowNpc();
            if (!result) {
                return;
            }
        }
        if (Api[npcName + "VoApi"] && Api[npcName + "VoApi"].checkNpcMessage) {
            var message = Api[npcName + "VoApi"].checkNpcMessage();
            // let messageStr:string="大人有资产待打理";
            if (message) {
                this.showNpcMessage(npcName);
            }
            else {
                this.hideNpcMessage(npcName);
            }
            if (npcName == "manage") {
                if (Api[npcName + "VoApi"].checkAffairNpcMessage) {
                    var messageStr = Api[npcName + "VoApi"].checkAffairNpcMessage();
                    var functionName = "affair";
                    if (messageStr) {
                        this.showNpcMessage(functionName);
                    }
                    else {
                        this.hideNpcMessage(functionName);
                    }
                }
            }
        }
        else if (npcName == "home") {
            if (Api.wifeVoApi.checkNpcMessage() || Api.childVoApi.checkNpcMessage() || Api.adultVoApi.checkNpcMessage()) {
                this.showNpcMessage(npcName);
            }
            else {
                this.hideNpcMessage(npcName);
            }
        }
    };
    BaseScene.prototype.showNpcMessage = function (npcName) {
        var _this = this;
        if (this._sceneLayer) {
            if (!this.getNpcMessage(npcName)) {
                var npc = this._sceneLayer.getChildByName(npcName);
                if (npc && npc.isLoaded() && npc.visible && this.getNpcMessage(npcName) == null && this.checkHasView(npcName)) {
                    if (this.bubbleCfg && this.bubbleCfg[npcName]) {
                        //气泡
                        var isHas = false;
                        for (var k in this._bubbleList) {
                            if (this._bubbleList[k] == npcName) {
                                isHas = true;
                                break;
                            }
                        }
                        if (isHas == false) {
                            this._bubbleList.splice(App.MathUtil.getRandom(0, this._bubbleList.length), 0, npcName);
                        }
                    }
                    var nameBg_1 = this.createNpcMessage(npcName);
                    this._npcNamebgList.push(nameBg_1);
                    var moveCall_1 = function () {
                        egret.Tween.get(nameBg_1).to({ alpha: 0.5 }, 1000).to({ alpha: 1 }, 1000).call(moveCall_1, _this);
                    };
                    moveCall_1();
                }
            }
        }
    };
    BaseScene.prototype.getNpcMessageName = function (npcName) {
        return npcName + "tipMessage";
    };
    BaseScene.prototype.getNpcMessage = function (npcName) {
        return this._sceneLayer.getChildByName(this.getNpcMessageName(npcName));
    };
    BaseScene.prototype.createNpcMessage = function (npcName) {
        var deltaAniY = 0;
        if (Api.switchVoApi.checkOpenGooutAni()) {
            deltaAniY = 10;
        }
        var rect = egret.Rectangle.create();
        //npc名字背景黄色光竖着改横着
        if (PlatformManager.checkIsTextHorizontal() && !PlatformManager.checkIsViSp()) {
            rect.setTo(0, 0, 150, 69);
        }
        else {
            rect.setTo(0, 0, 59, 133);
        }
        var nameBg = BaseLoadBitmap.create("scenenamebg", rect);
        // nameBg.setScale(1.2);
        nameBg.name = this.getNpcMessageName(npcName);
        var npcNameSp = this._sceneLayer.getChildByName(npcName + "name");
        nameBg.setPosition(npcNameSp.x + (npcNameSp.width - nameBg.width * nameBg.scaleX) / 2, npcNameSp.y + (npcNameSp.height - nameBg.height * nameBg.scaleY) / 2 + deltaAniY);
        this._sceneLayer.addChildAt(nameBg, this._sceneLayer.getChildIndex(npcNameSp));
        //npc名字的红点
        var reddot = BaseBitmap.create("public_dot2");
        reddot.name = npcName + "dot";
        nameBg.visible = false;
        // reddot.visible = false;
        this._npcRedList.push(reddot);
        //如果这个npc配置了红点  根据配置设置红点位置 如果没有配置取默认
        if (this.reddotPosCfg && this.reddotPosCfg[npcName]) {
            reddot.setPosition(this.reddotPosCfg[npcName].x + this._mapLayer.x, this.reddotPosCfg[npcName].y + this._mapLayer.y + deltaAniY);
        }
        else {
            reddot.setPosition(npcNameSp.x + npcNameSp.width - reddot.width + 5, npcNameSp.y - 10 + deltaAniY);
        }
        this._sceneLayer.addChild(reddot);
        if (npcName == "dailyboss") {
            // 烟火动
            var dailybossyanhuo = ComponentManager.getCustomMovieClip("cityscene_yanhuo", 7, 200);
            dailybossyanhuo.width = 350;
            dailybossyanhuo.height = 250;
            dailybossyanhuo.setScale(2);
            dailybossyanhuo.x = 365;
            dailybossyanhuo.y = GameConfig.stageHeigth - 1136 - 50;
            dailybossyanhuo.playWithTime();
            dailybossyanhuo.name = "dailybossyanhuo";
            this._sceneLayer.addChildAt(dailybossyanhuo, this._sceneLayer.getChildIndex(npcNameSp));
            this._dailybossyanhuo = dailybossyanhuo;
        }
        return nameBg;
    };
    BaseScene.prototype.hideNpcMessage = function (npcName) {
        if (this._sceneLayer) {
            if (this.bubbleCfg && this.bubbleCfg[npcName]) {
                //气泡
                for (var k in this._bubbleList) {
                    if (this._bubbleList[k] == npcName) {
                        this._bubbleList.splice(Number(k), 1);
                        break;
                    }
                }
            }
            var npcMessageName = this.getNpcMessageName(npcName);
            var npcMessage = this._sceneLayer.getChildByName(npcMessageName);
            if (npcMessage) {
                BaseLoadBitmap.release(npcMessage);
            }
            var reddot = this._sceneLayer.getChildByName(npcName + "dot");
            if (reddot) {
                BaseBitmap.release(reddot);
            }
            if (npcName == "dailyboss") {
                if (this._dailybossyanhuo) {
                    CustomMovieClip.release(this._dailybossyanhuo);
                    this._dailybossyanhuo = null;
                }
            }
        }
    };
    BaseScene.prototype.initNPC = function () {
        var _this = this;
        var npcKeyList = Object.keys(this.posCfg);
        var _loop_1 = function () {
            if (Api.switchVoApi.checkOpenShenhe()) {
                if (key == "rank" || key == "alliance" || key == "dailyboss" || key == "conquest" || key == "trade") {
                    return "continue";
                }
            }
            var functionName = "checkOpen" + App.StringUtil.firstCharToUper(key);
            if (Api.switchVoApi[functionName]) {
                if (!Api.switchVoApi[functionName]()) {
                    return "continue";
                }
            }
            if (this_1.shadowCfg[key]) {
                var _a = this_1.shadowCfg[key], x_1 = _a.x, y_1 = _a.y;
                var shadow = undefined;
                shadow = BaseLoadBitmap.create(this_1.getNpcName(key) + "_shadow");
                shadow.name = key + "_shadow";
                shadow.setPosition(this_1._mapLayer.x + x_1, this_1._mapLayer.y + y_1);
                this_1._sceneLayer.addChild(shadow);
            }
            var _b = this_1.posCfg[key], x = _b.x, y = _b.y, scale = _b.scale, alpha = _b.alpha, close_1 = _b.close, dragonBones_1 = _b.dragonBones;
            if (dragonBones_1) {
                // if(!App.DeviceUtil.CheckWebglRenderMode())
                // {
                // }
                dragonBones_1 = null;
            }
            this_1._npcList.push(key);
            var npc = undefined;
            if (dragonBones_1) {
                x += dragonBones_1.x;
                y += dragonBones_1.y;
                npc = App.DragonBonesUtil.getLoadDragonBones(key);
            }
            else {
                npc = BaseLoadBitmap.create(this_1.getNpcName(key));
            }
            npc.name = key;
            npc.x = this_1._mapLayer.x + x;
            npc.y = this_1._mapLayer.y + this_1._mapLayer.height - 1136 + y;
            if (!isNaN(alpha)) {
                npc.alpha = alpha;
            }
            // npc.filters=[new egret.GlowFilter(0xff0000,1,4,4,3,1)];
            if (scale) {
                npc.scaleX = npc.scaleY = scale;
            }
            this_1._sceneLayer.addChild(npc);
            var ckey = key + "name";
            if (this_1.namePosCfg[ckey]) {
                var _c = this_1.namePosCfg[ckey], x_2 = _c.x, y_2 = _c.y, scale_1 = _c.scale;
                this_1._npcList.push(ckey);
                var npcName_1 = undefined;
                var nameRect = egret.Rectangle.create();
                // nameRect.setTo(0,0,35,96);   other
                // nameRect.setTo(0,0,148,30);  en
                //如果sceneCfg中配置了npcnameRect 则用配置的，如果没有配置 使用默认的
                var npcnameRect = Config.SceneCfg.getNpcnameRect();
                if (npcnameRect != null) {
                    nameRect.setTo(npcnameRect.x, npcnameRect.y, npcnameRect.w, npcnameRect.h);
                }
                else {
                    nameRect.setTo(0, 0, 35, 96);
                }
                var npcNameRes = this_1.getNpcName(ckey);
                if (Api.switchVoApi["checkOpenNew" + App.StringUtil.firstCharToUper(key)]) {
                    var result = Api.switchVoApi["checkOpenNew" + App.StringUtil.firstCharToUper(key)]();
                    if (result) {
                        if (RES.hasRes(npcNameRes + "_2")) {
                            npcNameRes += "_2";
                        }
                    }
                }
                npcName_1 = BaseLoadBitmap.create(npcNameRes, nameRect, { callback: this_1.checkNpcShow, callbackThisObj: this_1, callbackParams: [key] });
                npcName_1.name = ckey;
                npcName_1.setPosition(this_1._mapLayer.x + x_2, this_1._mapLayer.y + this_1._mapLayer.height - 1136 + y_2);
                if (scale_1) {
                    npcName_1.setScale(scale_1);
                }
                this_1._sceneLayer.addChild(npcName_1);
                this_1._npcNameList.push(npcName_1);
                var isMove = true;
                if (Api[key + "VoApi"] && Api[key + "VoApi"].isShowNpc) {
                    isMove = Api[key + "VoApi"].isShowNpc();
                }
                if (this_1.isNpcNameMove() && isMove && this_1.checkHasView(key)) {
                    var nameY_1 = npcName_1.y;
                    var moveCall_2 = function () {
                        egret.Tween.get(npcName_1).to({ y: nameY_1 + 5 }, 1000).to({ y: nameY_1 - 5 }, 1000).call(moveCall_2, _this);
                    };
                    moveCall_2();
                }
            }
            this_1.checkNpcShow(key);
        };
        var this_1 = this;
        for (var key in this.posCfg) {
            _loop_1();
        }
        this._sceneLayer.touchEnabled = true;
        var ths = this;
        if (npcKeyList && npcKeyList.length > 0) {
            this._sceneLayer.addTouch(this.onNPCTouchHandler, this, null, true);
        }
    };
    BaseScene.prototype.formatModelToCheck = function (modelName) {
        if (modelName == MessageConst.MESSAGE_MODEL_USERINFO || modelName == MessageConst.MESSAGE_MODEL_WIFESKIN) {
            modelName = "wife";
        }
        return modelName;
    };
    BaseScene.prototype.checkGuideNpc = function (event) {
        var data = event.data;
        this.checkNpcShow(data.key);
    };
    BaseScene.prototype.checkNpcShow = function (e) {
        var _this = this;
        var modelName;
        if (typeof (e) == "string") {
            modelName = e;
        }
        else {
            modelName = e.data;
        }
        modelName = this.formatModelToCheck(modelName);
        var npc = this._sceneLayer.getChildByName(modelName);
        var npcname = this._sceneLayer.getChildByName(modelName + "name");
        if (npcname == null) {
            return;
        }
        if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
            var isShowNpc = Api[modelName + "VoApi"].isShowNpc();
            var npcshadow = this._sceneLayer.getChildByName(modelName + "_shadow");
            if (this.posCfg[modelName] && this.posCfg[modelName]["alpha"] != null && !Api.switchVoApi.checkOpenHideNPC()) {
                if (isShowNpc) {
                    if (this.isNpcNameMove() && npcname.filters != null) {
                        var nameY_2 = npcname.y;
                        var moveCall_3 = function () {
                            egret.Tween.get(npcname).to({ y: nameY_2 + 5 }, 1000).to({ y: nameY_2 - 5 }, 1000).call(moveCall_3, _this);
                        };
                        moveCall_3();
                    }
                    App.DisplayUtil.changeToNormal(npcname);
                }
                else {
                    App.DisplayUtil.changeToGray(npcname);
                }
            }
            else {
                if (npc) {
                    npc.visible = isShowNpc;
                }
                if (npcname) {
                    npcname.visible = isShowNpc;
                }
                if (npcshadow) {
                    npcshadow.visible = isShowNpc;
                }
            }
        }
        else {
            if (!this.checkHasView(modelName)) {
                if (npcname) {
                    App.DisplayUtil.changeToGray(npcname);
                }
            }
        }
        if (npc && npc.visible && npc.isLoaded()) {
            this.checkShowNpcMessage(modelName);
        }
    };
    BaseScene.prototype.isNpcNameMove = function () {
        return false;
    };
    BaseScene.prototype.checkNpcStatus = function () {
        for (var key in this.posCfg) {
            this.checkNpcShow(key);
        }
    };
    BaseScene.prototype.getNpcName = function (key) {
        var className = this.getClassName().toLowerCase();
        if (key == "wife") {
            var wifeCfg = Config.WifeCfg.getWifeCfgById("101");
            if (wifeCfg.isBule()) {
                return "homenpcwife_male";
            }
            else {
                return "homenpcwife";
            }
        }
        if (className == "cityscene" && key.indexOf("name") == -1 && Api.switchVoApi.checkScrollCityScene()) {
            if (Api.switchVoApi.checkIsInBlueWife() && ResourceManager.hasRes(className.substr(0, className.indexOf("scene")) + "npcscroll" + key + "_blueType")) {
                return className.substr(0, className.indexOf("scene")) + "npcscroll" + key + "_blueType";
            }
            return className.substr(0, className.indexOf("scene")) + "npcscroll" + key;
        }
        else {
            if (Api.switchVoApi.checkIsInBlueWife() && ResourceManager.hasRes(className.substr(0, className.indexOf("scene")) + "npc" + key + "_blueType")) {
                return className.substr(0, className.indexOf("scene")) + "npc" + key + "_blueType";
            }
            return className.substr(0, className.indexOf("scene")) + "npc" + key;
        }
    };
    BaseScene.prototype.onNPCTouchHandler = function (e) {
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            var hitKey = null;
            for (var key in this._npcList) {
                var b = this._sceneLayer.getChildByName(this._npcList[key]);
                var p = this._sceneLayer.globalToLocal(e.stageX, e.stageY);
                var hitMaxY = -9999;
                var ofp = this._sceneLayer.localToGlobal(0, 0);
                if (b.hitTestPoint(Math.floor(e.localX + ofp.x * this.scaleX), Math.floor(e.localY + (ofp.y + GameData.layerPosY) * this.scaleY), GameData.isSupportHitTestPoint)) {
                    //处理点击逻辑
                    // alert(this._npcList[key]);
                    if (b.y > hitMaxY) {
                        hitMaxY = b.y;
                        hitKey = this._npcList[key];
                    }
                }
            }
            // let clickNpc:BaseBitmap=null;
            if (hitKey) {
                if (hitKey.indexOf("name") > -1) {
                    hitKey = hitKey.substring(0, hitKey.indexOf("name"));
                }
                this._clickNpc = this._sceneLayer.getChildByName(hitKey);
                if (this._clickNpc && this._clickNpc.visible == false) {
                    this._clickNpc = null;
                    return;
                }
                // hitKey = this.formatModelToCheck(hitKey);
                if (Api.rookieVoApi.isInGuiding) {
                    if (!this.guideNeedTouchCfg[hitKey]) {
                        this._clickNpc = null;
                    }
                }
                else if (Api.rookieVoApi.isGuiding) {
                    var key_1 = Api.rookieVoApi.curGuideKey;
                    if (key_1 && key_1 != hitKey && key_1 != "home") {
                        // this._clickNpc=null;
                    }
                }
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            if (this._clickNpc) {
                if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                else {
                    this._clickNpc.alpha = 0.3;
                }
            }
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            if (this._clickNpc) {
                if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                else {
                    this._clickNpc.alpha = 0;
                }
                this._clickNpc = null;
            }
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            if (this._clickNpc) {
                if (this._clickNpc) {
                    if (this.posCfg[this._clickNpc.name].touchDown === false) { }
                    else {
                        this._clickNpc.alpha = 0;
                    }
                }
                var hitKey = this._clickNpc.name;
                if (hitKey) {
                    if (Api[hitKey + "VoApi"] && Api[hitKey + "VoApi"].isShowNpc) {
                        var isShowNpc = Api[hitKey + "VoApi"].isShowNpc();
                        if (isShowNpc == false && this.posCfg[hitKey] && this.posCfg[hitKey].alpha != null) {
                            this._clickNpc = null;
                            var lockedStr = Api[hitKey + "VoApi"].getLockedString ? Api[hitKey + "VoApi"].getLockedString() : LanguageManager.getlocal("sysWaitOpen");
                            App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                            return;
                        }
                    }
                    if (Api[hitKey + "VoApi"] && Api[hitKey + "VoApi"].openMainView) {
                        Api[hitKey + "VoApi"].openMainView();
                    }
                    else {
                        var viewClassName = App.StringUtil.firstCharToUper(hitKey) + "View";
                        if (this.checkHasView(hitKey)) {
                            if (hitKey == "home") {
                                SceneController.getInstance().goHome();
                                Api.rookieVoApi.checkNextStep();
                                GameData.isHomeScene = true;
                                MainUI.getInstance()._goOutBtn.texture = ResourceManager.getRes("mainui_btn3");
                            }
                            else {
                                ViewController.getInstance().openView(viewClassName);
                            }
                        }
                        else {
                            App.CommonUtil.showTip(LanguageManager.getlocal("sysWaitOpen"));
                            if (true) {
                                ViewController.getInstance().openView(viewClassName);
                            }
                        }
                    }
                }
                this._clickNpc = null;
            }
        }
    };
    BaseScene.prototype.checkHasView = function (modelName) {
        if (modelName == "home") {
            return true;
        }
        var viewClassName = App.StringUtil.firstCharToUper(modelName) + "View";
        return egret.hasDefinition(viewClassName);
    };
    BaseScene.prototype.setLayerPosition = function () {
        this._mapLayer.setPosition(0, GameConfig.stageHeigth - this._mapLayer.height);
        this.setFly();
    };
    BaseScene.prototype.setFly = function () {
    };
    BaseScene.prototype.tick = function () {
        if (this.posCfg) {
            for (var key in this.posCfg) {
                this.checkShowNpcMessage(key);
            }
            this.checkShowBubble();
        }
    };
    BaseScene.prototype.checkShowBubble = function () {
        if (Api.switchVoApi.checkopenBubble() == true && GameData.serverTime % 5 == 0) {
            if (this._bubbleList.length > 0 && Api.rookieVoApi.isInGuiding == false) {
                this._bubbleShowIdx++;
                if (this._bubbleShowIdx >= this._bubbleList.length) {
                    this._bubbleShowIdx = 0;
                }
                var showName = this._bubbleList[this._bubbleShowIdx];
                var bulle = new BubbleTip();
                bulle.init(showName, this.bubbleCfg[showName].length);
                var npcNameSp = this._sceneLayer.getChildByName(showName + "name");
                var posX = npcNameSp.x + this.bubbleCfg[showName].x + 15;
                if (posX + bulle.width / 2 + 5 > GameConfig.stageWidth) {
                    posX = GameConfig.stageWidth - bulle.width / 2 - 5;
                }
                bulle.setPosition(posX, npcNameSp.y + this.bubbleCfg[showName].y + bulle.height / 2);
                this._sceneLayer.addChild(bulle);
            }
        }
    };
    BaseScene.prototype.getResourceList = function () {
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = thisClassName.toLowerCase();
        var resArr;
        if (thisClassName == "cityscene" && Api.switchVoApi.checkScrollCityScene()) {
            resArr = ["cityscene_scroll_1", "cityscene_scroll_2", "cityscene_scroll_3", "cityscene_scroll_4"];
        }
        else {
            resArr = [thisClassName];
        }
        // let bgName:string=this.getSoundBgName();
        // if(RES.hasRes(bgName)&&bgName.indexOf("home")<0)
        // {
        // 	resArr.push(bgName);
        // }
        return resArr;
    };
    BaseScene.prototype.getParent = function () {
        return LayerManager.bgLayer;
    };
    BaseScene.prototype.show = function (isfromShow) {
        Api.rookieVoApi.hiddenRookieView();
        if (this.isShow()) {
            if (!this.parent) {
                this.getParent().addChild(this);
            }
            this.refreshAfterShow(isfromShow);
        }
        else {
            _super.prototype.show.call(this);
        }
    };
    BaseScene.prototype.hide = function (isDispose) {
        this.sceneExitAni();
        if (isDispose) {
            _super.prototype.hide.call(this);
        }
        else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    };
    BaseScene.prototype.resGroupLoadError = function () {
        _super.prototype.hideLoadingMask.call(this);
        _super.prototype.hide.call(this);
    };
    BaseScene.prototype.refreshAfterShow = function (isfromShow) {
        if (isfromShow === void 0) { isfromShow = false; }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE);
        this.playBg();
        if (!isfromShow) {
            this.sceneEnterAni();
        }
        if (App.DeviceUtil.isWXgame() && Api.switchVoApi.checkOpenFeedBack() && !GameData.isComposeScene) {
            PlatformManager.feedbackButtonToggle("show");
        }
        if (ViewController.getInstance().checkHasShowedView() && !Api.rookieVoApi.isInGuiding && !Api.rookieVoApi.curGuideKey) {
            return;
        }
        if (this.posCfg && this.posCfg[Api.rookieVoApi.curGuideKey]) {
            Api.rookieVoApi.checkWaitingGuide();
            // Api.rookieVoApi.curGuideKey = null;
        }
        Api.rookieVoApi.showRookieView();
    };
    BaseScene.prototype.sceneEnterAni = function () {
        if (!Api.switchVoApi.checkOpenGooutAni()) {
            return;
        }
        this.tick();
        var _loop_2 = function (index) {
            var element = this_2._npcNameList[index];
            var namebg = this_2._npcNamebgList[index];
            var redpoint = this_2._npcRedList[index];
            if (namebg) {
                namebg.visible = false;
            }
            if (redpoint) {
                redpoint.visible = false;
            }
            element.alpha = 0;
            var oldy = element.y;
            element.y -= 10;
            egret.Tween.get(element, { loop: false }).wait(300).to({ alpha: 1.0, y: oldy }, 300, egret.Ease.sineOut).call(function () {
                if (namebg) {
                    namebg.visible = true;
                }
                if (redpoint) {
                    redpoint.visible = true;
                }
            });
        };
        var this_2 = this;
        // this._sceneLayer.scaleX = this._sceneLayer.scaleY = 0.95;
        // egret.Tween.get(this._sceneLayer,{loop:false}).wait(300).to({scaleX:1.0,scaleY:1.0},300,egret.Ease.sineOut).set({scaleX:1.0,scaleY:1.0});
        for (var index = 0; index < this._npcNameList.length; index++) {
            _loop_2(index);
        }
    };
    BaseScene.prototype.sceneExitAni = function () {
        if (!Api.switchVoApi.checkOpenGooutAni()) {
            return;
        }
        // this._sceneLayer.scaleX = this._sceneLayer.scaleY =1.0;
        // egret.Tween.get(this._sceneLayer,{loop:false}).wait(300).to({scaleX:0.95,scaleY:0.95},300,egret.Ease.sineInOut).set({scaleX:1.0,scaleY:1.0});
    };
    BaseScene.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.checkNpcStatus,this);
        this._npcList.length = 0;
        if (this._sceneLayer) {
            this._sceneLayer.dispose();
            this._sceneLayer = null;
        }
        this._mapLayer = null;
        this._mapLayer2 = null;
        this._mapLayer3 = null;
        this._mapLayer4 = null;
        this._mapGuang = null;
        this._sceneScroll = null;
        this._dailybossyanhuo = null;
        // this._skyLayer=null;
        this._clickNpc = null;
        this._isCfgInit = false;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.refreshMode, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW, this.checkGuideNpc, this);
        this._bubbleList.length = 0;
        this._bubbleShowIdx = 0;
        this._npcNameList = [];
        this._npcNamebgList = [];
        this._npcRedList = [];
        _super.prototype.dispose.call(this);
    };
    BaseScene.scrollToPos = -1;
    BaseScene.scrollToCenterPos = 640;
    return BaseScene;
}(BaseLoadDisplayObjectContiner));
__reflect(BaseScene.prototype, "BaseScene");
