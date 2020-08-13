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
var ChangebgView = /** @class */ (function (_super) {
    __extends(ChangebgView, _super);
    function ChangebgView() {
        var _this = _super.call(this) || this;
        _this._curPos = 0; // 1 府邸  2 府外   3 寻访
        _this._curSelectIdx = 0;
        _this._curShowIdx = 0; //最左侧icon的idx
        _this._curKeys = [];
        _this._sceneBg = null;
        _this._sceneName = null;
        _this._sceneDesc = null;
        _this._iconsTab = [];
        _this._arrowTab = [];
        _this._iconY = 0;
        _this._sceneNameTab = ["homeScene", "cityScene", "searchScene"];
        _this._showedSceneTab = [];
        _this._useBtn = null;
        _this._buyBtn = null;
        _this._unlockBtn = null;
        _this._buyBtnText = null;
        _this._detailBtn = null;
        _this._lockText = null;
        _this._blackBgRect = null;
        _this._servant_promote = null;
        _this._topInfoNode = null;
        _this._btnTab = [];
        _this._line = null;
        _this._startLineWidth = 0;
        //
        _this._timeContainer = null;
        _this._timeCheckContainer = null;
        _this._nikeIcon = null;
        _this._timeframeType = "0";
        _this._timeBtnTab = [];
        _this._timeBtnIdx = 0;
        _this._map2Container = null;
        return _this;
    }
    Object.defineProperty(ChangebgView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    ChangebgView.prototype.getContainerY = function () {
        return 14;
    };
    ChangebgView.prototype.getBigFrame = function () {
        return null;
    };
    ChangebgView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "servant_detailBtn", "servant_detailBtn_down",
            "hold_dinner_box",
            "hold_dinner_check",
            "wifeview_skingetbg",
        ]);
    };
    ChangebgView.prototype.initView = function () {
        var arena_bottom = BaseBitmap.create("changebg_down");
        this.setLayoutPosition(LayoutConst.horizontalCenterbottom, arena_bottom, this);
        this.addChild(arena_bottom);
        for (var l = 1; l <= 3; l++) {
            var btn = BaseBitmap.create("changebg_switch2");
            btn.setPosition(0, arena_bottom.y + 6 + (l - 1) * 65);
            btn.addTouchTap(this.exchangeClick, this, [l]);
            this.addChild(btn);
            this._btnTab.push(btn);
            var name_1 = ComponentManager.getTextField(LanguageManager.getlocal("changebg_scene" + l), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            name_1.setPosition(30, btn.y + btn.height / 2 - name_1.height / 2);
            if (PlatformManager.checkIsTextHorizontal()) {
                name_1.setPosition(btn.x + btn.width / 2 - name_1.width / 2, btn.y + btn.height / 2 - name_1.height / 2);
            }
            this.addChild(name_1);
        }
        this._useBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "useBtn", this.useHandler, this);
        this._useBtn.setPosition(GameConfig.stageWidth / 2 + 58 - this._useBtn.width / 2, GameConfig.stageHeigth - 58);
        this.addChild(this._useBtn);
        this._useBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._unlockBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "changebg_unlock", this.unlockHandler, this);
        this._unlockBtn.setPosition(GameConfig.stageWidth / 2 + 58 - this._unlockBtn.width / 2, GameConfig.stageHeigth - 58);
        this.addChild(this._unlockBtn);
        this._unlockBtn.setColor(TextFieldConst.COLOR_BLACK);
        App.CommonUtil.addIconToBDOC(this._unlockBtn);
        this._buyBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "", this.buyHandler, this);
        this._buyBtn.setPosition(GameConfig.stageWidth / 2 + 58 - this._buyBtn.width / 2, GameConfig.stageHeigth - 58);
        this.addChild(this._buyBtn);
        this._lockText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED);
        this._lockText.setPosition(130, this._buyBtn.y + 14);
        this._lockText.width = GameConfig.stageWidth - 140;
        this._lockText.textAlign = egret.HorizontalAlign.CENTER;
        this._lockText.lineSpacing = 6;
        this.addChild(this._lockText);
        var gemIcon = BaseLoadBitmap.create("itemicon1");
        gemIcon.scaleX = 0.4;
        gemIcon.scaleY = 0.4;
        gemIcon.x = 20;
        gemIcon.y = 6;
        this._buyBtn.addChild(gemIcon);
        this._buyBtnText = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        this._buyBtnText.setPosition(68, 16);
        this._buyBtn.addChild(this._buyBtnText);
        this._iconY = arena_bottom.y + 20;
        //顶部信息
        this._blackBgRect = BaseBitmap.create("changebg_upbar");
        this._blackBgRect.width = GameConfig.stageWidth;
        this._blackBgRect.y = -14;
        this._blackBgRect.height = 38;
        this.addChildToContainer(this._blackBgRect);
        this._servant_promote = ComponentManager.getTextField(LanguageManager.getlocal("changebg_servant_promote"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._servant_promote.setPosition(10, this._blackBgRect.y + 6);
        this._servant_promote.width = GameConfig.stageWidth - 20;
        this._servant_promote.textAlign = egret.HorizontalAlign.CENTER;
        this._servant_promote.lineSpacing = 6;
        this.addChildToContainer(this._servant_promote);
        this._topInfoNode = new BaseDisplayObjectContainer();
        this._topInfoNode.y = this._blackBgRect.y + this._blackBgRect.height - 2;
        this.addChildToContainer(this._topInfoNode);
        var topBg = BaseBitmap.create("public_ac_notice_bg");
        topBg.width = GameConfig.stageWidth;
        topBg.height = 63;
        this._topInfoNode.addChild(topBg);
        var line = BaseBitmap.create("public_line3");
        if (!PlatformManager.checkIsEnLang()) {
            line.width = 400;
        }
        else {
            this._startLineWidth = line.width;
        }
        line.setPosition(GameConfig.stageWidth / 2 - line.width / 2, 8);
        this._topInfoNode.addChild(line);
        this._line = line;
        this._sceneName = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        if (!PlatformManager.checkIsEnLang()) {
            this._sceneName.setPosition(10, 6);
            this._sceneName.width = GameConfig.stageWidth - 20;
            this._sceneName.textAlign = egret.HorizontalAlign.CENTER;
        }
        this._topInfoNode.addChild(this._sceneName);
        this._sceneDesc = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._sceneDesc.setPosition(10, 35);
        this._sceneDesc.width = GameConfig.stageWidth - 20;
        this._sceneDesc.textAlign = egret.HorizontalAlign.CENTER;
        this._sceneDesc.lineSpacing = 6;
        this._topInfoNode.addChild(this._sceneDesc);
        this._detailBtn = ComponentManager.getButton("servant_detailBtn", "", this.detailBtnHandler, this);
        this._detailBtn.setPosition(GameConfig.stageWidth - 5 - this._detailBtn.width, 3);
        this._topInfoNode.addChild(this._detailBtn);
        var arrow_leftBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["left"]);
        arrow_leftBtn.anchorOffsetX = arrow_leftBtn.width / 2;
        arrow_leftBtn.scaleX = arrow_leftBtn.scaleY = 0.75;
        arrow_leftBtn.x = 150;
        arrow_leftBtn.y = arena_bottom.y + 50;
        this.addChild(arrow_leftBtn);
        var arrow_rightBtn = ComponentManager.getButton("btn_leftpage", "", this.switchHandler, this, ["right"]);
        arrow_rightBtn.anchorOffsetX = arrow_rightBtn.width / 2;
        arrow_rightBtn.scaleX = -1 * 0.75;
        arrow_rightBtn.scaleY = 0.75;
        arrow_rightBtn.x = GameConfig.stageWidth - 30;
        arrow_rightBtn.y = arrow_leftBtn.y;
        this.addChild(arrow_rightBtn);
        this._arrowTab.push(arrow_leftBtn);
        this._arrowTab.push(arrow_rightBtn);
        // this.param = {data:{scenename:"searchScene",sceneid:"302"}};
        var clickId = 1;
        var sceneId = null;
        if (this.param && this.param.data && this.param.data.scenename && this.param.data.sceneid) {
            sceneId = this.param.data.sceneid;
            for (var i = 0; i < this._sceneNameTab.length; i++) {
                if (this.param.data.scenename == this._sceneNameTab[i]) {
                    clickId = i + 1;
                    break;
                }
            }
        }
        this.exchangeClick(null, clickId, sceneId);
    };
    ChangebgView.prototype.detailBtnHandler = function () {
        var curKey = this._curKeys[this._curSelectIdx];
        var sceneName = this.getCurSceneName();
        ViewController.getInstance().openView(ViewConst.POPUP.CHANGEBGDETAILPOPUPVIEW, { scene: sceneName, key: curKey, f: this.detailCallback, o: this });
    };
    ChangebgView.prototype.detailCallback = function () {
        this.resetBtn();
        this._iconsTab[this._curSelectIdx].setUnlock();
        App.CommonUtil.removeIconFromBDOC(this._iconsTab[this._curSelectIdx]);
        var curKey = this._curKeys[this._curSelectIdx];
        if (curKey == "202") {
            this._timeCheckContainer.visible = true;
        }
        if (curKey == Api.otherInfoVoApi.getCurSceneId(this.getCurSceneName())) {
            this.hide();
        }
    };
    ChangebgView.prototype.switchHandler = function (param) {
        if (param == "right") {
            if (this._curShowIdx < (this._iconsTab.length - 3)) {
                // this._curShowIdx++;
                this._curShowIdx += 3;
            }
        }
        if (param == "left") {
            if (this._curShowIdx > 0) {
                // this._curShowIdx--;
                this._curShowIdx -= 3;
            }
        }
        this.resetPos();
    };
    ChangebgView.prototype.exchangeClick = function (obj, param, scenename) {
        if (param == this._curPos) {
            return;
        }
        for (var k = 0; k < this._showedSceneTab.length; k++) {
            if (this._showedSceneTab[k] != Api.otherInfoVoApi.getSceneResName(this.getCurSceneName())) {
                ResourceManager.destroyRes(this._showedSceneTab[k]);
            }
        }
        this._showedSceneTab.length = 0;
        if (this._curPos) {
            this._btnTab[this._curPos - 1].texture = ResourceManager.getRes("changebg_switch2");
        }
        this._btnTab[param - 1].texture = ResourceManager.getRes("changebg_switch1");
        this._curPos = param;
        this._curSelectIdx = 0;
        this._curShowIdx = 0;
        this._curKeys = Config.SceneCfg.getSceneAllId(this.getCurSceneName());
        for (var i = 0; i < this._curKeys.length; i++) {
            if (scenename) {
                if (this._curKeys[i] == scenename) {
                    this._curSelectIdx = i;
                    if (i - 2 > this._curShowIdx) {
                        this._curShowIdx = Math.floor((i + 1) / 3) * 3;
                    }
                    break;
                }
            }
            else {
                if (this._curKeys[i] == Api.otherInfoVoApi.getCurSceneId(this.getCurSceneName())) {
                    this._curSelectIdx = i;
                    if (i - 2 > this._curShowIdx) {
                        this._curShowIdx = Math.floor((i + 1 - 1) / 3) * 3;
                    }
                    break;
                }
            }
        }
        ResourceManager.loadItem(this.getSceneBgName(), this.resetInfo, this);
        this.resetIcons();
    };
    ChangebgView.prototype.resetIcons = function () {
        for (var k1 in this._iconsTab) {
            var v1 = this._iconsTab[k1];
            this.removeChild(v1);
            v1.dispose();
        }
        this._iconsTab.length = 0;
        var useId = 0;
        this._curKeys = Config.SceneCfg.getSceneAllId(this.getCurSceneName());
        var curKey = this._curKeys[this._curSelectIdx];
        for (var i = 0; i < this._curKeys.length; i++) {
            if (this._curKeys[i] == Api.otherInfoVoApi.getCurSceneId(this.getCurSceneName())) {
                useId = i;
            }
            var oneIcon = new ChangebgIcon();
            var status_1 = 2;
            if (Api.otherInfoVoApi.isHasScene(this._curKeys[i], this.getCurSceneName())) {
                status_1 = 1;
            }
            oneIcon.init(this._curKeys[i], i, status_1, this.selectHandler, this);
            oneIcon.y = this._iconY;
            this.addChild(oneIcon);
            if (status_1 == 2) {
                var abilitycfg = Config.SceneCfg.getSceneCfgBySceneName(this.getCurSceneName(), this._curKeys[i]).personalityCfg;
                if (abilitycfg && abilitycfg.unlock && abilitycfg.unlock <= Api.playerVoApi.getPlayerLevel()) {
                    App.CommonUtil.addIconToBDOC(oneIcon);
                }
                else if (abilitycfg && abilitycfg.activityUnlock && Api.otherInfoVoApi.isHasSceneUnlock(this._curKeys[i], this.getCurSceneName())) {
                    App.CommonUtil.addIconToBDOC(oneIcon);
                }
            }
            this._iconsTab.push(oneIcon);
        }
        this._iconsTab[useId].setUsing(true);
        this._iconsTab[this._curSelectIdx].setSelect(true);
        this.resetPos();
    };
    ChangebgView.prototype.getSceneBgName = function (key) {
        var curKey = key ? key : this._curKeys[this._curSelectIdx];
        var resName = this.getCurSceneName().toLowerCase() + "_" + curKey;
        if (curKey == "202") {
            if (!this._timeCheckContainer) {
                if (LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID()) && LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID()) != "") {
                    this._timeframeType = LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID());
                }
                if (this._timeframeType != "0") {
                    this._timeBtnIdx = Number(this._timeframeType) - 1;
                }
            }
            resName += "_" + (this._timeBtnIdx + 1);
        }
        if (!RES.hasRes(resName)) {
            resName = this.getCurSceneName().toLowerCase();
            if (this.getCurSceneName() == "searchScene") {
                resName = Api.otherInfoVoApi.getSceneResName("searchScene", curKey);
            }
        }
        return resName;
    };
    ChangebgView.prototype.resetPos = function () {
        for (var i = 0; i < this._iconsTab.length; i++) {
            this._iconsTab[i].visible = false;
            this._iconsTab[i].x = -200;
        }
        this._arrowTab[0].visible = (this._curShowIdx > 0);
        var showTab = [];
        var showMax = this._iconsTab.length - this._curShowIdx;
        this._arrowTab[1].visible = (showMax > 3);
        var showCount = showMax > 3 ? 3 : showMax;
        var sign = 0;
        for (var j = this._curShowIdx; j < showCount + this._curShowIdx; j++) {
            this._iconsTab[j].visible = true;
            this._iconsTab[j].x = 190 + 140 * sign;
            sign++;
        }
        App.CommonUtil.removeIconFromBDOC(this._arrowTab[0]);
        App.CommonUtil.removeIconFromBDOC(this._arrowTab[1]);
        if (this._arrowTab[0].visible) {
            for (var j = 0; j < this._curShowIdx; j++) {
                if (this._iconsTab[j].getChildByName("reddot") && this._iconsTab[j].getChildByName("reddot").visible == true) {
                    App.CommonUtil.addIconToBDOC(this._arrowTab[0]);
                    break;
                }
            }
        }
        if (this._arrowTab[1].visible) {
            for (var j = this._curShowIdx + 3; j < this._iconsTab.length; j++) {
                if (this._iconsTab[j].getChildByName("reddot") && this._iconsTab[j].getChildByName("reddot").visible == true) {
                    App.CommonUtil.addIconToBDOC(this._arrowTab[1]);
                    break;
                }
            }
        }
    };
    ChangebgView.prototype.resetInfo = function () {
        var curKey = this._curKeys[this._curSelectIdx];
        var resName = this.getSceneBgName();
        if (this._sceneBg == null) {
            this._sceneBg = BaseBitmap.create(resName);
            this.addChildAt(this._sceneBg, this.getChildIndex(this.viewBg) + 1);
        }
        else {
            this._sceneBg.texture = ResourceManager.getRes(resName);
        }
        if (this._curPos == 2) {
            this._sceneBg.y = 0;
        }
        else {
            this._sceneBg.y = GameConfig.stageHeigth - 1136;
        }
        if (this._map2Container) {
            this._map2Container.dispose();
            this._map2Container = null;
        }
        if (Config.SceneCfg.getIsSceneScroll(curKey)) {
            this._sceneBg.x = 320 - this._sceneBg.width / 2;
            if (curKey == "205") {
                this._map2Container = new BaseDisplayObjectContainer();
                this.addChildAt(this._map2Container, this.getChildIndex(this.viewBg) + 1);
                var rect2 = new egret.Rectangle();
                rect2.setTo(0, 0, 1720, 344);
                var mapLayer2 = BaseLoadBitmap.create("cityscene_scroll_2", rect2);
                mapLayer2.y = GameConfig.stageHeigth - 1136;
                var rect3 = new egret.Rectangle();
                rect3.setTo(0, 0, 1520, 418);
                var mapLayer3 = BaseLoadBitmap.create("cityscene_scroll_3", rect3);
                mapLayer3.y = GameConfig.stageHeigth - 1136;
                var rect4 = new egret.Rectangle();
                rect4.setTo(0, 0, 1284, 418);
                var mapLayer4 = BaseLoadBitmap.create("cityscene_scroll_4", rect4);
                this._map2Container.addChild(mapLayer4);
                this._map2Container.addChild(mapLayer3);
                this._map2Container.addChild(mapLayer2);
            }
            else if (curKey == "106") {
                this._map2Container = new BaseDisplayObjectContainer();
                this.addChildAt(this._map2Container, this.getChildIndex(this.viewBg) + 1);
                var rect2 = new egret.Rectangle();
                rect2.setTo(0, 0, 1654, 533);
                var mapLayer2 = BaseLoadBitmap.create("homescene_scroll_2", rect2);
                mapLayer2.y = GameConfig.stageHeigth - 1136 + 100;
                var rect3 = new egret.Rectangle();
                rect3.setTo(0, 0, 1540, 602);
                var mapLayer3 = BaseLoadBitmap.create("homescene_scroll_3", rect3);
                mapLayer3.y = GameConfig.stageHeigth - 1136;
                var rect4 = new egret.Rectangle();
                rect4.setTo(0, 0, 1413, 534);
                var mapLayer4 = BaseLoadBitmap.create("homescene_scroll_4", rect4);
                this._map2Container.addChild(mapLayer4);
                this._map2Container.addChild(mapLayer3);
                this._map2Container.addChild(mapLayer2);
            }
        }
        else {
            this._sceneBg.x = 0;
        }
        var needPush = true;
        for (var k = 0; k < this._showedSceneTab.length; k++) {
            if (this._showedSceneTab[k] == resName) {
                needPush = false;
                break;
            }
        }
        if (needPush) {
            this._showedSceneTab.push(resName);
        }
        this._sceneName.text = LanguageManager.getlocal("changebg_name_" + curKey);
        if (PlatformManager.checkIsEnLang()) {
            this._line.width = this._startLineWidth + this._sceneName.width + 10;
            this._line.x = GameConfig.stageWidth / 2 - this._line.width / 2;
            this._sceneName.setPosition(this._line.x + this._line.width / 2 - this._sceneName.width / 2, 6);
        }
        this._sceneDesc.text = LanguageManager.getlocal("changebg_desc_" + curKey);
        var scenecfg = Config.SceneCfg.getSceneCfgBySceneName(this.getCurSceneName(), curKey);
        if (scenecfg.personalityCfg && scenecfg.personalityCfg.servant) {
            this._detailBtn.visible = true;
            this._topInfoNode.y = this._blackBgRect.y + this._blackBgRect.height - 2;
            this._blackBgRect.visible = true;
            this._servant_promote.visible = true;
            this._servant_promote.text = LanguageManager.getlocal("changebg_servant_promote", [LanguageManager.getlocal("servant_name" + scenecfg.personalityCfg.servant)]);
        }
        else if (scenecfg.personalityCfg && scenecfg.personalityCfg.buffType) {
            this._detailBtn.visible = true;
            this._topInfoNode.y = this._blackBgRect.y + this._blackBgRect.height - 2;
            this._blackBgRect.visible = true;
            this._servant_promote.visible = true;
            this._servant_promote.text = LanguageManager.getlocal("changebg_force_buff" + scenecfg.personalityCfg.buffType);
        }
        else {
            this._detailBtn.visible = false;
            this._topInfoNode.y = this._blackBgRect.y;
            this._blackBgRect.visible = false;
            this._servant_promote.visible = false;
        }
        if (curKey == "202") {
            this.showTimeContainer();
        }
        else {
            this.hideTimeContainer();
        }
        this.resetBtn();
    };
    ChangebgView.prototype.getCurSceneName = function () {
        return this._sceneNameTab[this._curPos - 1];
    };
    ChangebgView.prototype.resetBtn = function () {
        var curKey = this._curKeys[this._curSelectIdx];
        this._lockText.text = "";
        this._unlockBtn.visible = false;
        if (Api.otherInfoVoApi.isHasScene(curKey, this.getCurSceneName())) {
            this._useBtn.visible = true;
            this._buyBtn.visible = false;
            if (this._curKeys[this._curSelectIdx] == Api.otherInfoVoApi.getCurSceneId(this.getCurSceneName())) {
                this._useBtn.setEnable(false);
            }
            else {
                this._useBtn.setEnable(true);
            }
        }
        else {
            this._useBtn.visible = false;
            this._buyBtn.visible = false;
            var scenecfg = Config.SceneCfg.getSceneCfgBySceneName(this.getCurSceneName(), curKey);
            this._lockText.text = "";
            if (scenecfg.personalityCfg) {
                if (scenecfg.personalityCfg.price) {
                    this._buyBtn.visible = true;
                    this._buyBtnText.text = scenecfg.personalityCfg.price; //+ " " +LanguageManager.getlocal("allianceBtnBuy");
                }
                else if (scenecfg.personalityCfg.unlock) {
                    var abilitycfg = scenecfg.personalityCfg;
                    if (abilitycfg && abilitycfg.unlock && abilitycfg.unlock <= Api.playerVoApi.getPlayerLevel()) {
                        this._unlockBtn.visible = true;
                    }
                    else {
                        this._lockText.text = LanguageManager.getlocal("changebgUnlockDesc", [Api.playerVoApi.getPlayerOfficeByLevel(scenecfg.personalityCfg.unlock)]);
                    }
                }
                else if (scenecfg.personalityCfg.activityUnlock) {
                    var abilitycfg = scenecfg.personalityCfg;
                    if (abilitycfg && abilitycfg.activityUnlock && Api.otherInfoVoApi.isHasSceneUnlock(curKey, this.getCurSceneName())) {
                        this._unlockBtn.visible = true;
                    }
                    else {
                        this._lockText.text = LanguageManager.getlocal("changebgUnlockDesc_" + curKey);
                    }
                }
            }
        }
    };
    ChangebgView.prototype.useHandler = function () {
        if (this._curKeys[this._curSelectIdx] == Api.otherInfoVoApi.getCurSceneId(this.getCurSceneName())) {
            App.CommonUtil.showTip(LanguageManager.getlocal("changebg_is_using"));
            return;
        }
        var curKey = this._curKeys[this._curSelectIdx];
        this.request(NetRequestConst.REQYEST_OTHERINFO_SWITCHSCENESKIN, { skinId: curKey, skinType: this.getCurSceneName() });
    };
    ChangebgView.prototype.unlockHandler = function () {
        this.buyRealHandler();
    };
    ChangebgView.prototype.buyHandler = function () {
        var curKey = this._curKeys[this._curSelectIdx];
        var scenecfg = Config.SceneCfg.getSceneCfgBySceneName(this.getCurSceneName(), curKey);
        var needNum = scenecfg.personalityCfg.price;
        if (Api.playerVoApi.getPlayerGem() < needNum) {
            App.CommonUtil.showTip(LanguageManager.getlocal("allianceBossOpen_tip5"));
            return;
        }
        var message = LanguageManager.getlocal("changebg_buyskin", [String(needNum)]);
        var mesObj = {
            confirmCallback: this.buyRealHandler,
            handler: this,
            icon: "itemicon1",
            iconBg: "itembg_1",
            num: Api.playerVoApi.getPlayerGem(),
            useNum: needNum,
            msg: message,
            id: 1
        };
        ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSECONSTPOPUPVIEW, mesObj);
    };
    ChangebgView.prototype.buyRealHandler = function () {
        var curKey = this._curKeys[this._curSelectIdx];
        this.request(NetRequestConst.REQYEST_OTHERINFO_BUYSCENESKIN, { skinId: curKey, skinType: this.getCurSceneName() });
    };
    ChangebgView.prototype.receiveData = function (data) {
        var view = this;
        var cmd = data.data.cmd;
        if (data.ret == true) {
            if (cmd == NetRequestConst.REQYEST_OTHERINFO_BUYSCENESKIN) {
                this.resetBtn();
                App.CommonUtil.removeIconFromBDOC(this._iconsTab[this._curSelectIdx]);
                this._iconsTab[this._curSelectIdx].setUnlock();
                App.CommonUtil.showTip(LanguageManager.getlocal("changebg_get"));
                if (this._curKeys[this._curSelectIdx] == "202") {
                    this._timeCheckContainer.visible = true;
                }
            }
            else if (cmd == NetRequestConst.REQYEST_OTHERINFO_SWITCHSCENESKIN) {
                App.CommonUtil.showTip(LanguageManager.getlocal("changebg_use_success"));
                if (this._curPos == 1) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGEBG + "homescene", { id: this._curKeys[this._curSelectIdx] });
                }
                else if (this._curPos == 2) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_CHANGEBG + "cityscene", { id: this._curKeys[this._curSelectIdx] });
                }
                this.resetBtn();
                this.resetIcons();
                // this.hide();
            }
        }
    };
    ChangebgView.prototype.selectHandler = function (idx) {
        if (this._curSelectIdx != idx) {
            this._iconsTab[this._curSelectIdx].setSelect(false);
            this._iconsTab[idx].setSelect(true);
            this._curSelectIdx = idx;
            var curKey = this._curKeys[this._curSelectIdx];
            if (curKey == "202") {
                this.showTimeContainer();
            }
            else {
                this.hideTimeContainer();
            }
            ResourceManager.loadItem(this.getSceneBgName(), this.resetInfo, this);
        }
    };
    ChangebgView.prototype.showTimeContainer = function () {
        if (!this._timeContainer) {
            this._timeContainer = new BaseDisplayObjectContainer();
            this._timeContainer.y = GameConfig.stageHeigth - 425;
            this.addChildToContainer(this._timeContainer);
            this._timeCheckContainer = new BaseDisplayObjectContainer();
            this._timeContainer.addChild(this._timeCheckContainer);
            if (!Api.otherInfoVoApi.isHasScene("202", "cityScene")) {
                this._timeCheckContainer.visible = false;
            }
            var textBg = BaseBitmap.create("wifeview_skingetbg");
            textBg.scaleX = -1;
            textBg.height = 40;
            this._timeCheckContainer.addChild(textBg);
            //勾选底
            var checkBtn = ComponentManager.getButton("hold_dinner_box", null, this.openTimeFrameClick, this, null, 3);
            checkBtn.setPosition(10, 0);
            this._timeCheckContainer.addChild(checkBtn);
            this._nikeIcon = BaseBitmap.create("hold_dinner_check");
            this._nikeIcon.setPosition(checkBtn.x, checkBtn.y);
            this._timeCheckContainer.addChild(this._nikeIcon);
            if (LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID()) && LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID()) != "") {
                this._timeframeType = LocalStorageManager.get(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID());
            }
            if (this._timeframeType == "0") {
                this._nikeIcon.visible = false;
            }
            else {
                this._timeBtnIdx = Number(this._timeframeType) - 1;
            }
            var timeframeText = ComponentManager.getTextField(LanguageManager.getlocal("changebg_timeframe"), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_QUALITY_YELLOW);
            timeframeText.setPosition(checkBtn.x + checkBtn.width + 2, checkBtn.height / 2 - timeframeText.height / 2);
            this._timeCheckContainer.addChild(timeframeText);
            textBg.width = timeframeText.width + 100;
            textBg.x = textBg.width;
            for (var i = 1; i <= 4; i++) {
                var btnstr = "changebg_btn" + i + "_1";
                if ((i - 1) == this._timeBtnIdx) {
                    btnstr = "changebg_btn" + i + "_2";
                }
                var btn = BaseBitmap.create(btnstr);
                btn.setPosition((i - 1) * 75, 45);
                btn.addTouchTap(this.timeFrameClick, this, [i - 1]);
                this._timeContainer.addChild(btn);
                this._timeBtnTab.push(btn);
            }
        }
        else {
            this._timeContainer.visible = true;
        }
    };
    ChangebgView.prototype.hideTimeContainer = function () {
        if (this._timeContainer) {
            this._timeContainer.visible = false;
        }
    };
    ChangebgView.prototype.openTimeFrameClick = function () {
        if (this._timeframeType == "0") {
            this._timeframeType = String(this._timeBtnIdx + 1);
            this._nikeIcon.visible = true;
        }
        else {
            this._timeframeType = "0";
            this._nikeIcon.visible = false;
        }
        LocalStorageManager.set(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID(), this._timeframeType);
    };
    ChangebgView.prototype.timeFrameClick = function (obj, param) {
        if (this._timeBtnIdx == param) {
            return;
        }
        this._timeBtnTab[this._timeBtnIdx].texture = ResourceManager.getRes("changebg_btn" + (this._timeBtnIdx + 1) + "_1");
        this._timeBtnTab[param].texture = ResourceManager.getRes("changebg_btn" + (param + 1) + "_2");
        this._timeBtnIdx = param;
        if (this._timeframeType != "0") {
            this._timeframeType = String(this._timeBtnIdx + 1);
            LocalStorageManager.set(LocalStorageConst.LOCAL_SCENE_TIMEFRAME + Api.playerVoApi.getPlayerID(), this._timeframeType);
        }
        ResourceManager.loadItem(this.getSceneBgName(), this.resetInfo, this);
    };
    ChangebgView.prototype.dispose = function () {
        for (var k = 0; k < this._showedSceneTab.length; k++) {
            if (this._showedSceneTab[k] != Api.otherInfoVoApi.getSceneResName(this.getCurSceneName())) {
                ResourceManager.destroyRes(this._showedSceneTab[k]);
            }
        }
        this._showedSceneTab.length = 0;
        this._sceneBg = null;
        this._sceneName = null;
        this._curPos = 0;
        this._curSelectIdx = 0;
        this._curShowIdx = 0;
        for (var k1 in this._iconsTab) {
            var v1 = this._iconsTab[k1];
            App.CommonUtil.removeIconFromBDOC(v1);
            v1.dispose();
        }
        this._iconsTab.length = 0;
        this._arrowTab.length = 0;
        this._curKeys.length = 0;
        this._iconY = 0;
        this._useBtn = null;
        this._buyBtn = null;
        this._detailBtn = null;
        this._lockText = null;
        App.CommonUtil.removeIconFromBDOC(this._unlockBtn);
        this._unlockBtn = null;
        this._blackBgRect = null;
        this._servant_promote = null;
        this._topInfoNode = null;
        this._btnTab.length = 0;
        this._line = null;
        this._startLineWidth = 0;
        this._timeContainer = null;
        this._timeCheckContainer = null;
        this._nikeIcon = null;
        this._timeframeType = "0";
        this._timeBtnTab.length = 0;
        this._timeBtnIdx = 0;
        this._map2Container = null;
        _super.prototype.dispose.call(this);
    };
    return ChangebgView;
}(CommonView));
//# sourceMappingURL=ChangebgView.js.map