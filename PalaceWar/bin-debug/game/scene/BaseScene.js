var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * author 陈可
 * date 2017/9/15
 * @class BaseScene
 */
var BaseScene = /** @class */ (function (_super) {
    __extends(BaseScene, _super);
    function BaseScene() {
        var _this = _super.call(this) || this;
        _this._maskLayer = null;
        _this._effectLayer = null;
        // protected _skyLayer:BaseBitmap;
        _this._npcList = [];
        _this.posCfg = {};
        _this.shadowCfg = {};
        _this.namePosCfg = {};
        _this.reddotPosCfg = {};
        _this.npcMessageCfg = {};
        _this.guideNeedTouchCfg = {};
        _this.bubbleCfg = {};
        _this.buildBgCfg = {};
        _this._bubbleList = [];
        _this._bubbleShowIdx = 0;
        _this._isCfgInit = false;
        _this._curSceneBg = "";
        _this._sceneName = "";
        _this._maskTab = [];
        _this._npcNameList = [];
        _this._npcNamebgList = [];
        _this._npcRedList = [];
        _this._isfromShow = false;
        _this._isScroll = false;
        _this._preLayer = null;
        _this._leftArrow = null;
        _this._rightArrow = null;
        _this._log = "";
        _this._logIndex = 0;
        return _this;
    }
    BaseScene.prototype.initCfg = function () {
        if (this._isCfgInit == false) {
            var sceneId = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName(this._sceneName, sceneId);
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
                if (curCfg.buildBgCfg) {
                    this.buildBgCfg = curCfg.buildBgCfg;
                }
                else {
                    this.buildBgCfg = null;
                }
            }
        }
    };
    BaseScene.prototype.init = function () {
        var _this = this;
        this._sceneName = App.StringUtil.firstCharToLower(this.getClassName());
        this.initCfg();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.refreshMode, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW, this.checkGuideNpc, this);
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = thisClassName.toLowerCase();
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_CHANGEBG + thisClassName, this.checkChangeBg, this);
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
                var rect_1 = egret.Rectangle.create();
                rect_1.setTo(0, 0, 640, 1136);
                this._mapLayer = BaseLoadBitmap.create(checkResName, rect_1);
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
                this._mapLayer = BaseBitmap.create(this._curSceneBg);
            }
            //场景拖动
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 642, 1136);
            var scrollView_1 = ComponentManager.getScrollView(this._sceneLayer, rect);
            scrollView_1.verticalScrollPolicy = "off";
            scrollView_1.bounces = false;
            this._sceneScroll = scrollView_1;
            scrollView_1.addEventListener(egret.Event.CHANGE, function () {
                if (_this._mapLayer2) {
                    _this._mapLayer2.x = (_this._mapLayer.width - _this._mapLayer2.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                }
                if (_this._mapLayer3) {
                    _this._mapLayer3.x = (_this._mapLayer.width - _this._mapLayer3.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                }
                if (_this._mapLayer4) {
                    _this._mapLayer4.x = (_this._mapLayer.width - _this._mapLayer4.width) * (scrollView_1.scrollLeft / (_this._mapLayer.width - GameConfig.stageWidth));
                }
                if (_this._mapGuang) {
                    _this._mapGuang.x = (_this._mapLayer2.x + _this._mapLayer3.x) / 2 + 370;
                }
                _this.checkArrowShow();
                _this.checkArrowReddot();
            }, this);
            this._sceneLayer.addChild(this._mapLayer);
            this.addChild(scrollView_1);
            // this._sceneLayer.addChild(scrollView);
            this.setLayerPosition();
            this.checkLayerScroll();
            this.checkScrollEffect();
            this.checkLayerScroll(true);
            this._sceneLayer.removeChild(this._mapLayer);
            this._sceneLayer.addChild(this._mapLayer);
            this._sceneLayer.width = this._mapLayer.width;
            if (this._mapGuang) {
                this._sceneLayer.removeChild(this._mapGuang);
                this._sceneLayer.addChild(this._mapGuang);
            }
            if (this._preLayer) {
                this._sceneLayer.removeChild(this._preLayer);
                this._sceneLayer.addChild(this._preLayer);
            }
        }
        if (!this._effectLayer) {
            this._effectLayer = new SceneEffect();
            this._sceneLayer.addChild(this._effectLayer);
            var cId_1 = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
            if (Config.SceneeffectCfg.hasSceneEffect(cId_1)) {
                this._effectLayer.y = 0;
                this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId_1);
            }
            //通用特效
            if (Config.SceneeffectCfg.hasCommonEff(cId_1)) {
                this._effectLayer.showCommonSceneEffect(cId_1);
                this._effectLayer.y = this._mapLayer.y;
            }
        }
        if (!this._maskLayer) {
            this._maskLayer = new BaseDisplayObjectContainer();
            this._sceneLayer.addChild(this._maskLayer);
        }
        this.setLayerPosition();
        var cId = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
        if (Config.SceneeffectCfg.hasCommonEff(cId)) {
            this._effectLayer.y = this._mapLayer.y;
        }
        // this.addChild(this._sceneLayer);
        this.initBuildBg();
        this.initNPC();
        this.refreshAfterShow();
        this.tick();
    };
    BaseScene.prototype.checkLayerScroll = function (isClear) {
        if (this._mapLayer.width > 640) {
            if (Api.rookieVoApi.isInGuiding) {
                this._sceneScroll.horizontalScrollPolicy = "off";
            }
            else {
                this._sceneScroll.horizontalScrollPolicy = "on";
            }
            this._isScroll = true;
        }
        else {
            this._sceneScroll.horizontalScrollPolicy = "off";
            this._isScroll = false;
        }
        if (this._isScroll == true) {
            this._sceneScroll.setScrollLeft(0);
            if (BaseScene.scrollToPos != -1) {
                this._sceneScroll.setScrollLeft(BaseScene.scrollToPos);
                this._sceneScroll.horizontalScrollPolicy = "off";
                if (isClear) {
                    BaseScene.scrollToPos = -1;
                }
            }
            else {
                var posx = (this._mapLayer.width - 640) / 2;
                if (this._sceneName == "homeScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName) == "106") {
                    posx = 660;
                }
                this._sceneScroll.setScrollLeft(posx);
            }
        }
        else {
            this._sceneScroll.setScrollLeft(0);
        }
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
            if (Api.unlocklist2VoApi.checkShowOpenFunc() && (!result || Api.unlocklist2VoApi.isInNeedShowEffect(modelName))) {
                return;
            }
            else {
                if (!result) {
                    return;
                }
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
                    nameBg_1.alpha = 0;
                    // let reddot:BaseBitmap = this._npcRedList[this._npcRedList.length-1];
                    var reddot_1 = this._sceneLayer.getChildByName(npcName + "dot");
                    reddot_1.alpha = 0;
                    this._npcNamebgList.push(nameBg_1);
                    var moveCall_1 = function () {
                        egret.Tween.get(nameBg_1).to({ alpha: 0.5 }, 1000).to({ alpha: 1 }, 1000).call(moveCall_1, _this);
                    };
                    egret.Tween.get(nameBg_1).wait(500).call(function () {
                        // nameBg.alpha = 1;
                        reddot_1.alpha = 1;
                        moveCall_1();
                    });
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
            deltaAniY = 0;
        }
        var rect = egret.Rectangle.create();
        //npc名字背景黄色光竖着改横着
        if (PlatformManager.checkIsTextHorizontal()) {
            rect.setTo(0, 0, 150, 69);
        }
        else {
            rect.setTo(0, 0, 59, 133);
        }
        var npcMessageName = this.getNpcMessageName(npcName);
        var npcMessage = this._sceneLayer.getChildByName(npcMessageName);
        if (npcMessage) {
            BaseLoadBitmap.release(npcMessage);
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
        // nameBg.visible = false;
        this._npcRedList.push(reddot);
        //如果这个npc配置了红点  根据配置设置红点位置 如果没有配置取默认
        if (this.reddotPosCfg && this.reddotPosCfg[npcName]) {
            reddot.setPosition(this.reddotPosCfg[npcName].x + this._mapLayer.x, this.reddotPosCfg[npcName].y + this._mapLayer.y + deltaAniY);
        }
        else {
            var cky = npcName + "name";
            var _a = this.namePosCfg[cky], x = _a.x, y = _a.y, scale = _a.scale;
            // reddot.setPosition(npcNameSp.x+npcNameSp.width-reddot.width+5,npcNameSp.y-10 + deltaAniY);
            reddot.setPosition(this._mapLayer.x + x + npcNameSp.width - reddot.width + 5, this._mapLayer.y + y - 10 + deltaAniY);
        }
        var ckey = npcName + "name";
        if (this.namePosCfg[ckey] && this.namePosCfg[ckey].scale) {
            var s = this.namePosCfg[ckey].scale;
            nameBg.setScale(s);
            reddot.setScale(s);
            var npcnameRect = Config.SceneCfg.getNpcnameRect();
            if (npcnameRect != null) {
                reddot.x -= (this.reddotPosCfg[npcName].x - this.namePosCfg[ckey].x) * (1 - s);
                reddot.y -= 6;
                nameBg.y += 7;
            }
        }
        // if(PlatformManager.checkIsTextHorizontal())
        // {
        // 	reddot.setPosition(npcNameSp.x+npcNameSp.width*npcNameSp.scaleX-reddot.width/2,npcNameSp.y-10);
        // }
        // else
        // {
        // 	reddot.setPosition(npcNameSp.x+npcNameSp.width-reddot.width+5,npcNameSp.y-10);
        // }
        this._sceneLayer.addChild(reddot);
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
        }
    };
    BaseScene.prototype.initNPC = function () {
        var _this = this;
        var allkeys = Object.keys(this.posCfg);
        allkeys.sort(function (a, b) {
            var sortA = _this.posCfg[a].sortId ? _this.posCfg[a].sortId : 0;
            var sortB = _this.posCfg[b].sortId ? _this.posCfg[b].sortId : 0;
            return Number(sortA) - Number(sortB);
        });
        var className = this.getClassName().toLowerCase();
        var _loop_1 = function (i) {
            var key = allkeys[i];
            if (Api.switchVoApi.checkOpenShenhe()) {
                if (key == "rank" || key == "alliance" || key == "dailyboss" || key == "conquest" || key == "trade") {
                    return "continue";
                }
            }
            if (key == "skin" && !Api.switchVoApi.openCrossChat()) {
                return "continue";
            }
            //屏蔽特定渠道 /*|| PlatformManager.checkIsTWBSp() || PlatformManager.checkIsThSp() */ 
            // if (key=="skin" &&(PlatformManager.checkIsEnLang()   ) ){
            // 	continue;
            // }
            var functionName = "checkOpen" + App.StringUtil.firstCharToUper(key);
            if (Api.switchVoApi[functionName]) {
                if (!Api.switchVoApi[functionName]()) {
                    return "continue";
                }
            }
            if (this_1.shadowCfg && this_1.shadowCfg[key]) {
                var _a = this_1.shadowCfg[key], x_1 = _a.x, y_1 = _a.y;
                var shadow = undefined;
                var resName = this_1.getNpcName(key) + "_shadow";
                // if (className == "homescene")
                // {	
                var newRes = resName + "_" + Api.otherInfoVoApi.getCurSceneId(this_1._sceneName);
                if (ResourceManager.hasRes(newRes)) {
                    resName = newRes;
                }
                // }
                shadow = BaseLoadBitmap.create(resName);
                shadow.name = key + "_shadow";
                shadow.setPosition(this_1._mapLayer.x + x_1, this_1._mapLayer.y + y_1);
                this_1._sceneLayer.addChild(shadow);
            }
            var _b = this_1.posCfg[key], x = _b.x, y = _b.y, scale = _b.scale, alpha = _b.alpha, close_1 = _b.close, dragonBones = _b.dragonBones;
            if (dragonBones) {
                // if(!App.DeviceUtil.CheckWebglRenderMode())
                // {
                // }
                dragonBones = null;
            }
            this_1._npcList.push(key);
            var npc = undefined;
            if (dragonBones) {
                x += dragonBones.x;
                y += dragonBones.y;
                npc = App.DragonBonesUtil.getLoadDragonBones(key);
            }
            else {
                npc = BaseLoadBitmap.create(this_1.getNpcName2(key));
                var changekey = Config.SceneCfg.getChangeKey();
                if (key == changekey) {
                    var res = this_1.getChangeNpcRes(key);
                    npc.setload(res);
                }
            }
            npc.name = key;
            npc.x = this_1._mapLayer.x + x;
            npc.y = this_1._mapLayer.y + y;
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
                var npcNameRes = this_1.getNpcName2(ckey);
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
                npcName_1.setPosition(this_1._mapLayer.x + x_2, this_1._mapLayer.y + y_2);
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
        for (var i = 0; i < allkeys.length; i++) {
            _loop_1(i);
        }
        this._sceneLayer.touchEnabled = true;
        var ths = this;
        this._sceneLayer.addTouch(this.onNPCTouchHandler, this, null, true);
    };
    BaseScene.prototype.getChangeNpcNameRes = function (key) {
        var res = "homenpc" + key + "name";
        if (Api.switchVoApi.checkIsInBlueWife() && RES.hasRes("homenpc" + key + "name_blueType")) {
            res = "homenpc" + key + "name_blueType";
        }
        return res;
    };
    BaseScene.prototype.getChangeNpcRes = function (key) {
        var str = Api.otherInfoVoApi.getDangjiaNpc();
        var res = "homenpc" + key + "2";
        if (str != "" && RES.hasRes(res + "_" + str)) {
            res += "_" + str;
        }
        else {
            var wifeCfg = Config.WifeCfg.getWifeCfgById("101");
            if (wifeCfg.isBule()) {
                res = "homenpc" + key + "_male";
            }
            else {
                res = "homenpc" + key;
            }
        }
        return res;
    };
    BaseScene.prototype.formatModelToCheck = function (modelName) {
        if (modelName == MessageConst.MESSAGE_MODEL_USERINFO || modelName == MessageConst.MESSAGE_MODEL_WIFESKIN) {
            modelName = "wife";
        }
        return modelName;
    };
    BaseScene.prototype.checkGuideNpc = function (event) {
        var data = event.data;
        App.LogUtil.log("checkGuideNpc " + data.key);
        this.checkNpcShow(data.key);
    };
    BaseScene.prototype.log = function (str) {
        var wbgameidArr = window["wbgameidArr"];
        // if(!wbgameidArr)
        // {
        // 	wbgameidArr=[Api.playerVoApi.getPlayerID()];
        // }
        if (wbgameidArr && wbgameidArr.indexOf(Api.playerVoApi.getPlayerID()) > -1) {
            if (this._log) {
                if (!str) {
                    StatisticsHelper.reportGameResLoadFail(this._log);
                }
                else {
                    this._log += str;
                }
            }
            else if (str) {
                this._log += str;
            }
        }
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
        if (!Api.unlocklist2VoApi.checkShowOpenFunc()) {
            if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
                var isShowNpc = Api[modelName + "VoApi"].isShowNpc();
                var npcshadow = this._sceneLayer.getChildByName(modelName + "_shadow");
                if (this.posCfg[modelName] && this.posCfg[modelName]["alpha"] != null) {
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
        }
        else {
            if (Api[modelName + "VoApi"] && Api[modelName + "VoApi"].isShowNpc) {
                var isShowNpc = Api[modelName + "VoApi"].isShowNpc();
                var npcshadow = this._sceneLayer.getChildByName(modelName + "_shadow");
                var isNeedShowEff = Api.unlocklist2VoApi.isInNeedShowEffect(modelName);
                if (this.posCfg[modelName] && this.posCfg[modelName]["alpha"] != null) {
                    if (isShowNpc && !isNeedShowEff) {
                        if (this.isNpcNameMove() && npcname.filters != null) {
                            var nameY_3 = npcname.y;
                            var moveCall_4 = function () {
                                egret.Tween.get(npcname).to({ y: nameY_3 + 5 }, 1000).to({ y: nameY_3 - 5 }, 1000).call(moveCall_4, _this);
                            };
                            moveCall_4();
                        }
                        // App.DisplayUtil.changeToNormal(npcname);
                        npcname.visible = true;
                    }
                    else {
                        // App.DisplayUtil.changeToGray(npcname);
                        npcname.visible = false;
                    }
                }
                else {
                    var isShow = false;
                    if (isShowNpc && !isNeedShowEff) {
                        isShow = true;
                    }
                    if (npc) {
                        npc.visible = isShow;
                    }
                    if (npcname) {
                        npcname.visible = isShow;
                    }
                    if (npcshadow) {
                        npcshadow.visible = isShow;
                    }
                }
            }
            else {
                if (!this.checkHasView(modelName)) {
                    if (npcname) {
                        // App.DisplayUtil.changeToGray(npcname);
                        npcname.visible = false;
                    }
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
        return className.substr(0, className.indexOf("scene")) + "npc" + key;
    };
    BaseScene.prototype.getNpcName2 = function (key) {
        var changekey = Config.SceneCfg.getChangeKey();
        var className = this.getClassName().toLowerCase();
        var resName = className.substr(0, className.indexOf("scene")) + "npc" + key;
        if (key == changekey) {
            var wifeCfg = Config.WifeCfg.getWifeCfgById("101");
            if (wifeCfg.isBule()) {
                return "homenpc" + changekey + "_male";
            }
            else {
                return "homenpc" + changekey;
            }
        }
        if (key == changekey + "name") {
            return this.getChangeNpcNameRes(changekey);
        }
        if (key == "childname") {
            return this.getChangeNpcNameRes("child");
        }
        var newRes = resName + "_" + Api.otherInfoVoApi.getCurSceneId(this._sceneName);
        if (ResourceManager.hasRes(newRes)) {
            resName = newRes;
        }
        return resName;
    };
    BaseScene.prototype.onNPCTouchHandler = function (e) {
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._logIndex++;
            this._log = "";
            this.log(this.getClassName() + ":idx=" + this._logIndex + ":stageX=" + e.stageX + ":stageY=" + e.stageY + ":localX=" + e.localX + ":localY=" + e.localY);
            var hitKey = null;
            for (var key in this._npcList) {
                var b = this._sceneLayer.getChildByName(this._npcList[key]);
                var p = this._sceneLayer.globalToLocal(e.stageX, e.stageY);
                var hitMaxY = -9999;
                var ofp = this._sceneLayer.localToGlobal(0, 0);
                this.log("::" + this._npcList[key] + ":b::" + b.x + ":" + b.y + ":" + b.width + ":" + b.height + ":ofp::" + ofp.x + ":" + ofp.y + ":p::" + p.x + ":" + p.y);
                var hitTest = GameData.isSupportHitTestPoint;
                if (this._isScroll || PlatformManager.checkIsTWBSp() && Api.playerVoApi.getPlayerID() == 47006324) {
                    hitTest = false;
                }
                if (b.hitTestPoint(Math.floor(e.localX + ofp.x * this.scaleX), Math.floor(e.localY + (ofp.y + GameData.layerPosY) * this.scaleY), hitTest)) {
                    this.log("::hit=" + this._npcList[key]);
                    //处理点击逻辑
                    // alert(this._npcList[key]);
                    if (b.y > hitMaxY) {
                        hitMaxY = b.y;
                        hitKey = this._npcList[key];
                        this.log("::find=" + hitKey);
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
                    this.log("::" + hitKey + "=!visible");
                    this._clickNpc = null;
                    return;
                }
                // hitKey = this.formatModelToCheck(hitKey);
                if (Api.rookieVoApi.isInGuiding) {
                    if (!this.guideNeedTouchCfg[hitKey]) {
                        this.log("::isInGuidingCfg=null");
                        this._clickNpc = null;
                    }
                }
                else if (Api.rookieVoApi.isGuiding) {
                    var key_1 = Api.rookieVoApi.curGuideKey;
                    if (key_1 && key_1 != hitKey) {
                        this.log("::curGuideKey=null");
                        this._clickNpc = null;
                    }
                    else if (hitKey == "affair" && Api.rookieVoApi.curStep == "child_1") {
                        this.log("::affair=null");
                        this._clickNpc = null;
                    }
                }
            }
        }
        //功能解锁特效开关判断
        if (Api.unlocklist2VoApi.checkShowOpenFunc()) {
            if (this._clickNpc) {
                var hitKey = this._clickNpc.name;
                App.LogUtil.log("hitKey " + hitKey);
                if (hitKey) {
                    if (Api.unlocklist2VoApi.isInUnlockList(hitKey)) {
                        if (Api.unlocklist2VoApi.isInNeedShowEffect(hitKey)) {
                            return;
                        }
                        else {
                            if (Api[hitKey + "VoApi"] && Api[hitKey + "VoApi"].isShowNpc) {
                                if (!Api[hitKey + "VoApi"].isShowNpc()) {
                                    return;
                                }
                            }
                        }
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
                this.log("::touchDown=" + (this.posCfg[this._clickNpc.name].touchDown === false));
            }
            this.log();
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
                    ViewController.getInstance().openViewByFunName(hitKey);
                }
                this._clickNpc = null;
            }
        }
    };
    BaseScene.prototype.checkHasView = function (modelName) {
        if (modelName == "palace") {
            modelName = "palaceNew"; // 因为老皇宫代码和资源都删除了，所以这块要特殊处理
        }
        var viewClassName = App.StringUtil.firstCharToUper(modelName) + "View";
        return egret.hasDefinition(viewClassName);
    };
    BaseScene.prototype.setLayerPosition = function () {
        this._mapLayer.y = GameConfig.stageHeigth - this._mapLayer.height;
    };
    BaseScene.prototype.tick = function () {
        if (this.posCfg) {
            for (var key in this.posCfg) {
                this.checkShowNpcMessage(key);
            }
            this.checkShowBubble();
        }
        if (this._sceneName == "cityScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName) == "202") {
            if (Api.otherInfoVoApi.getSceneResName(this._sceneName) != this._curSceneBg) {
                this._curSceneBg = Api.otherInfoVoApi.getSceneResName(this._sceneName);
                ResourceManager.loadItem(this._curSceneBg, this.resetSceneBg, this);
            }
        }
        if (this._isScroll) {
            this.checkArrowReddot();
        }
    };
    BaseScene.prototype.resetSceneBg = function () {
        if (!this._mapLayer) {
            return;
        }
        this._mapLayer.texture = ResourceManager.getRes(this._curSceneBg);
        this.setLayerPosition();
        var cId = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
        //通用特效
        if (Config.SceneeffectCfg.hasCommonEff(cId)) {
            this._effectLayer.showCommonSceneEffect(cId);
            this._effectLayer.y = this._mapLayer.y;
        }
        else if (this._effectLayer.sceneType) {
            this._effectLayer.hideSceneEffect();
        }
        if (Config.SceneeffectCfg.hasSceneEffect(cId)) {
            this._effectLayer.y = 0;
            this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
        }
        this.initBuildBg();
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
                if (posX + bulle.width / 2 + 5 > this._sceneLayer.width) {
                    posX = this._sceneLayer.width - bulle.width / 2 - 5;
                }
                bulle.setPosition(posX, npcNameSp.y + this.bubbleCfg[showName].y + bulle.height / 2);
                this._sceneLayer.addChild(bulle);
            }
        }
    };
    BaseScene.prototype.getResourceList = function () {
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = App.StringUtil.firstCharToLower(thisClassName);
        this._curSceneBg = Api.otherInfoVoApi.getSceneResName(thisClassName);
        var resArr = [this._curSceneBg];
        resArr.push("scene_arrow");
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
            this._isfromShow = isfromShow;
            NetLoading.show();
            this._curSceneBg = Api.otherInfoVoApi.getSceneResName(this._sceneName);
            ResourceManager.loadItem(this._curSceneBg, this.showLoadingBgCallback, this);
        }
        else {
            _super.prototype.show.call(this);
        }
    };
    BaseScene.prototype.hide = function (isDispose) {
        if (isDispose) {
            _super.prototype.hide.call(this);
        }
        else {
            if (this.parent) {
                this.parent.removeChild(this);
            }
        }
    };
    // protected resGroupLoadError():void
    // {
    // 	super.hideLoadingMask();
    // 	super.hide();
    // }
    BaseScene.prototype.refreshAfterShow = function () {
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_HIDE_LAST_SCENE, { sceneId: this.getClassName() });
        this.playBg();
        if (!this._isfromShow) {
            this.sceneEnterAni();
        }
        if (ViewController.getInstance().checkHasShowedView() && !Api.rookieVoApi.isGuiding) {
            return;
        }
        if (this.posCfg && this.posCfg[Api.rookieVoApi.curGuideKey]) {
            Api.rookieVoApi.checkWaitingGuide();
            // Api.rookieVoApi.curGuideKey = null;
        }
        Api.rookieVoApi.showRookieView();
    };
    BaseScene.prototype.checkChangeBg = function (event) {
        var sid = event.data.id;
        this._isCfgInit = false;
        this.initCfg();
        this._sceneLayer.removeChildren();
        this._npcList.length = 0;
        for (var k1 in this._npcNamebgList) {
            var v1 = this._npcNamebgList[k1];
            egret.Tween.removeTweens(v1);
            v1.dispose();
        }
        this._npcNamebgList.length = 0;
        for (var k2 in this._npcRedList) {
            var v2 = this._npcRedList[k2];
            egret.Tween.removeTweens(v2);
            v2.dispose();
        }
        this._npcRedList.length = 0;
        var sceneResName = Api.otherInfoVoApi.getSceneResName(this._sceneName); //sceneResName
        this._curSceneBg = sceneResName;
        this._mapLayer = BaseBitmap.create(sceneResName);
        this._sceneLayer.addChild(this._mapLayer);
        this.setLayerPosition();
        this.checkLayerScroll();
        this.checkScrollEffect();
        this.checkLayerScroll(true);
        this._sceneLayer.removeChild(this._mapLayer);
        this._sceneLayer.addChild(this._mapLayer);
        this._sceneLayer.width = this._mapLayer.width;
        if (this._preLayer) {
            this._sceneLayer.removeChild(this._preLayer);
            this._sceneLayer.addChild(this._preLayer);
        }
        var cId = Api.otherInfoVoApi.getCurSceneId(this._sceneName);
        if (Config.SceneeffectCfg.hasSceneEffect(cId)) {
            this._effectLayer.y = 0;
            this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
        }
        else if (this._effectLayer.sceneType) {
            this._effectLayer.hideSceneEffect();
        }
        this._sceneLayer.addChild(this._effectLayer);
        // this._effectLayer=new SceneEffect();
        // this._sceneLayer.addChild(this._effectLayer);
        // if(Config.SceneeffectCfg.hasSceneEffect(cId))
        // {
        // 	this._effectLayer.showSceneEffect(Api.otherInfoVoApi.getCitySceneType(), cId);
        // }
        //通用特效
        if (Config.SceneeffectCfg.hasCommonEff(cId)) {
            this._effectLayer.showCommonSceneEffect(cId);
            this._effectLayer.y = this._mapLayer.y;
        }
        this._maskLayer = new BaseDisplayObjectContainer();
        this._sceneLayer.addChild(this._maskLayer);
        this.initBuildBg();
        this.initNPC();
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_CHECK_SCENESCROLL);
        // this.refreshAfterShow();
    };
    BaseScene.prototype.initBuildBg = function () {
        if (this._maskTab.length > 0) {
            for (var k1 in this._maskTab) {
                var v1 = this._maskTab[k1];
                egret.Tween.removeTweens(v1);
                v1.dispose();
            }
            this._maskTab.length = 0;
        }
        if (this.buildBgCfg) {
            for (var key in this.buildBgCfg) {
                var resName = this._curSceneBg + "_" + key;
                var mask = BaseLoadBitmap.create(resName);
                mask.setPosition(this._mapLayer.x + this.buildBgCfg[key].x, this._mapLayer.y + this.buildBgCfg[key].y);
                this._maskLayer.addChild(mask);
                this._maskTab.push(mask);
            }
        }
    };
    BaseScene.prototype.showLoadingBgCallback = function () {
        NetLoading.hide();
        this.resetSceneBg();
        if (!this.parent) {
            this.getParent().addChild(this);
        }
        this.refreshAfterShow();
    };
    BaseScene.prototype.sceneEnterAni = function () {
        if (!Api.switchVoApi.checkOpenGooutAni()) {
            return;
        }
        var _loop_2 = function (index) {
            var element = this_2._npcNameList[index];
            var npcname = element.name.substring(0, element.name.length - 4);
            var namebg2 = this_2.getNpcMessage(npcname);
            ;
            //let namebg = this._npcNamebgList[index];
            // let redpoint = this._npcRedList[index];
            var redpoint = this_2._sceneLayer.getChildByName(npcname + "dot");
            if (namebg2) {
                namebg2.visible = false;
            }
            if (redpoint) {
                redpoint.visible = false;
            }
            element.alpha = 0;
            var oldy = element.y;
            // element.y -= 10;
            egret.Tween.removeTweens(element);
            egret.Tween.get(element, { loop: false }).wait(500).to({ y: oldy - 10 }, 0).to({ alpha: 1.0, y: oldy }, 300, egret.Ease.sineOut).call(function () {
                if (namebg2) {
                    namebg2.visible = true;
                }
                if (redpoint) {
                    redpoint.visible = true;
                }
            });
        };
        var this_2 = this;
        for (var index = 0; index < this._npcNameList.length; index++) {
            _loop_2(index);
        }
    };
    BaseScene.prototype.sceneExitAni = function () {
        if (!Api.switchVoApi.checkOpenGooutAni()) {
            return;
        }
    };
    BaseScene.prototype.addEff = function () {
        var view = this;
    };
    BaseScene.prototype.freshEff = function () {
        var view = this;
    };
    BaseScene.prototype.checkScrollEffect = function () {
        if (this._mapLayer2) {
            this._mapLayer2.dispose();
            this._mapLayer2 = null;
        }
        if (this._mapLayer3) {
            this._mapLayer3.dispose();
            this._mapLayer3 = null;
        }
        if (this._mapLayer4) {
            this._mapLayer4.dispose();
            this._mapLayer4 = null;
        }
        if (this._mapGuang) {
            this._mapGuang.dispose();
            this._mapGuang = null;
        }
        if (this._preLayer) {
            this._preLayer.dispose();
            this._preLayer = null;
        }
        if (this._isScroll) {
            if (this._sceneName == "cityScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName) == "205") {
                var rect2 = new egret.Rectangle();
                rect2.setTo(0, 0, 1720, 344);
                this._mapLayer2 = BaseLoadBitmap.create("cityscene_scroll_2", rect2);
                this._mapLayer2.y = GameConfig.stageHeigth - 1136;
                var rect3 = new egret.Rectangle();
                rect3.setTo(0, 0, 1520, 418);
                this._mapLayer3 = BaseLoadBitmap.create("cityscene_scroll_3", rect3);
                this._mapLayer3.y = GameConfig.stageHeigth - 1136;
                var rect4 = new egret.Rectangle();
                rect4.setTo(0, 0, 1284, 418);
                this._mapLayer4 = BaseLoadBitmap.create("cityscene_scroll_4", rect4);
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
                this._sceneLayer.addChild(this._mapLayer4);
                this._sceneLayer.addChild(this._mapLayer3);
                this._sceneLayer.addChild(this._mapLayer2);
                this._sceneLayer.addChild(this._mapGuang);
            }
            else if (this._sceneName == "homeScene" && Api.otherInfoVoApi.getCurSceneId(this._sceneName) == "106") {
                var rect2 = new egret.Rectangle();
                rect2.setTo(0, 0, 1654, 553);
                var rect3 = new egret.Rectangle();
                rect3.setTo(0, 0, 1540, 602);
                var rect4 = new egret.Rectangle();
                rect4.setTo(0, 0, 1413, 534);
                this._mapLayer2 = BaseLoadBitmap.create("homescene_scroll_2", rect2);
                this._mapLayer2.y = GameConfig.stageHeigth - 1136 + 100;
                this._mapLayer3 = BaseBitmap.create("homescene_scroll_3");
                this._mapLayer3.y = GameConfig.stageHeigth - 1136;
                this._mapLayer4 = BaseBitmap.create("homescene_scroll_4");
                this._mapLayer4.y = GameConfig.stageHeigth - 1136;
                this._sceneLayer.addChild(this._mapLayer4);
                this._sceneLayer.addChild(this._mapLayer3);
                this._sceneLayer.addChild(this._mapLayer2);
                this._preLayer = BaseLoadBitmap.create("homescene_scroll_1");
                this._preLayer.y = GameConfig.stageHeigth - 1136;
                this._sceneLayer.addChild(this._preLayer);
            }
            if (!this._leftArrow) {
                this._leftArrow = new BaseDisplayObjectContainer();
                this._leftArrow.setPosition(77, GameConfig.stageHeigth / 2 - 40);
                this.addChild(this._leftArrow);
                var arrow1 = ComponentManager.getCustomMovieClip("scene_arrow", 10);
                arrow1.scaleX = -1;
                this._leftArrow.addChild(arrow1);
                this._rightArrow = new BaseDisplayObjectContainer();
                this._rightArrow.setPosition(GameConfig.stageWidth - 77, GameConfig.stageHeigth / 2 - 40);
                this.addChild(this._rightArrow);
                var arrow2 = ComponentManager.getCustomMovieClip("scene_arrow", 10);
                this._rightArrow.addChild(arrow2);
                arrow1.playWithTime(0);
                arrow2.playWithTime(0);
                App.CommonUtil.addIconToBDOC(this._leftArrow);
                App.CommonUtil.addIconToBDOC(this._rightArrow);
                var red1 = this._leftArrow.getChildByName("reddot");
                var red2 = this._rightArrow.getChildByName("reddot");
                red1.x = -63;
                red1.y = 8;
                red2.x = 38;
                red2.y = red1.y;
                // egret.Tween.get(this._leftArrow,{loop:true})
                // .to({scaleX:0.8,scaleY:0.8},500)
                // .to({scaleX:1,scaleY:1},500);
                // egret.Tween.get(this._rightArrow,{loop:true})
                // .to({scaleX:-0.8,scaleY:0.8},500)
                // .to({scaleX:-1,scaleY:1},500);
            }
            this._leftArrow.visible = true;
            this._rightArrow.visible = true;
        }
        else {
            if (this._leftArrow) {
                this._leftArrow.visible = false;
            }
            if (this._rightArrow) {
                this._rightArrow.visible = false;
            }
        }
    };
    BaseScene.prototype.checkArrowShow = function () {
        if (this._leftArrow) {
            this._leftArrow.visible = this._sceneScroll.scrollLeft > 10;
        }
        if (this._rightArrow) {
            this._rightArrow.visible = (this._mapLayer.width - GameConfig.stageWidth - this._sceneScroll.scrollLeft) > 10;
        }
    };
    BaseScene.prototype.checkArrowReddot = function () {
        if (!this._leftArrow || !this._rightArrow) {
            return;
        }
        var leftRed = false;
        var rightRed = false;
        for (var key in this.posCfg) {
            var reddot = this._sceneLayer.getChildByName(key + "dot");
            if (reddot) {
                if (reddot.x + reddot.width < this._sceneScroll.scrollLeft) {
                    leftRed = true;
                }
                else if (reddot.x > this._sceneScroll.scrollLeft + GameConfig.stageWidth) {
                    rightRed = true;
                }
                if (leftRed && rightRed) {
                    break;
                }
            }
        }
        if (leftRed) {
            App.CommonUtil.addIconToBDOC(this._leftArrow);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._leftArrow);
        }
        if (rightRed) {
            App.CommonUtil.addIconToBDOC(this._rightArrow);
        }
        else {
            App.CommonUtil.removeIconFromBDOC(this._rightArrow);
        }
    };
    BaseScene.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESCHANGE_REFRESH_UI,this.checkNpcStatus,this);
        this._npcList.length = 0;
        if (this._sceneLayer) {
            this._sceneLayer.dispose();
            this._sceneLayer = null;
        }
        this._mapLayer = null;
        this._effectLayer = null;
        // this._skyLayer=null;
        this._clickNpc = null;
        this._isCfgInit = false;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_REFRESH_MODE, this.refreshMode, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CHECKNPC_SHOW, this.checkGuideNpc, this);
        var thisClassName = egret.getQualifiedClassName(this);
        thisClassName = thisClassName.toLowerCase();
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_CHANGEBG + thisClassName, this.checkChangeBg, this);
        this._bubbleList.length = 0;
        this._bubbleShowIdx = 0;
        this._curSceneBg = "";
        this._sceneName = "";
        this._maskTab.length = 0;
        this.buildBgCfg = null;
        this._maskLayer = null;
        //动效
        this._npcNameList.length = 0;
        for (var k1 in this._npcNamebgList) {
            var v1 = this._npcNamebgList[k1];
            egret.Tween.removeTweens(v1);
            v1.dispose();
        }
        this._npcNamebgList.length = 0;
        for (var k2 in this._npcRedList) {
            var v2 = this._npcRedList[k2];
            egret.Tween.removeTweens(v2);
            v2.dispose();
        }
        this._npcRedList.length = 0;
        this._isfromShow = false;
        //拖动
        this._sceneScroll = null;
        this._isScroll = false;
        this._mapLayer2 = null;
        this._mapLayer3 = null;
        this._mapLayer4 = null;
        this._mapGuang = null;
        this._preLayer = null;
        this._leftArrow = null;
        this._rightArrow = null;
        _super.prototype.dispose.call(this);
    };
    BaseScene.scrollToPos = -1;
    BaseScene.homeScrollToPos = -1;
    return BaseScene;
}(BaseLoadDisplayObjectContiner));
//# sourceMappingURL=BaseScene.js.map