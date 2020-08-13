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
var ComposeScene = (function (_super) {
    __extends(ComposeScene, _super);
    // private _isBatchMoving:boolean=false;
    function ComposeScene() {
        var _this = _super.call(this) || this;
        _this._isBeginning = false;
        _this._startPos = null;
        _this._startStagePos = null;
        _this._startLocalPos = null;
        _this._selectRenId = null;
        _this._isMoved = false;
        _this._goldTipTime = 10;
        _this._timeIdx = 0;
        _this._unlockGroupList = [];
        _this._dailyDelCount = -1;
        _this._findedPos = {};
        _this._tmpNotFind = null;
        _this._enterPos = "10000";
        _this._clickHand = null;
        _this._cellBgLayer = null;
        _this._moveCallbackData = null;
        return _this;
    }
    ;
    ComposeScene.prototype.init = function () {
        _super.prototype.init.call(this);
        this.initAllCompose();
        this.initTouch();
        this.initEvents();
        this.initPanel();
    };
    ComposeScene.prototype.initEvents = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE, this.itemMoveHandler, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.guideMsg, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL, this.unlockNextGroup, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK, this.showUnlockHand, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK, this.hideUnlockHand, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_COMPOSE_ADDPERSON, this.addPerson, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_UNLOCK_MAPGROUP, this.unlockCell, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.tipMapGold, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_MVPOS, this.moveEndhandler, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_LVUP, this.lvupHandler, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_LVUPBATCH, this.lvupHandler, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_BUYPERSON, this.buyPerson, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_MAP_DELPERSON, this.delHandler, this);
    };
    ComposeScene.prototype.removeEvents = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_ITEM_MOVE, this.itemMoveHandler, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_NEXT, this.guideMsg, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_UNLOCK_CELL, this.unlockNextGroup, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK, this.showUnlockHand, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_HIDEUNLOCK, this.hideUnlockHand, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_COMPOSE_ADDPERSON, this.addPerson, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_UNLOCK_MAPGROUP, this.unlockCell, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LEVY_ADD_GOODS, this.tipMapGold, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_MVPOS, this.moveEndhandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_LVUP, this.lvupHandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_LVUPBATCH, this.lvupHandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_BUYPERSON, this.buyPerson, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_MAP_DELPERSON, this.delHandler, this);
    };
    ComposeScene.prototype.initPanel = function () {
        if (Api.rookieVoApi.isInGuiding) {
            return;
        }
        if (GameData.announcementData && GameData.announcementData.length > 0) {
            if (Api.rookieVoApi.isInGuiding) {
                return;
            }
            else {
                ViewController.getInstance().openView(ViewConst.COMMON.GAMEANNOUNCEMENtVIEW, GameData.announcementData);
            }
        }
        if (GameData.wbrewards && GameData.wbrewards.length > 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.GETGIFTPOPUPVIEW, { rewards: GameData.wbrewards });
        }
        PlatformManager.checkDownloadApp();
        //玩吧兑换积分礼包
        // alert(PlatformManager.getGiftId());
        if (PlatformManager.getGiftId() == "501" || PlatformManager.getGiftId() == "502") {
            if (GameData.wbrewardsFlag) {
                // PlatformManager.giftExchange(this.exchangeCallback,this);
                // this.exchangeCallback("0",{ret:"0"});
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.BUYGIFTPOPUPVIEW, { rewards: GameData.wbrewards, code: "2003" });
            }
        }
        // 实名认证 
        // if (GameData.idcardSwitch==true && GameData.idcardNormal == 1 && (GameData.idcardType == RealnameConst.USERTYPE_0 || GameData.idcardType == RealnameConst.USERTYPE_1))
        if (Api.switchVoApi.checkOpenRealnamerewards() && Api.otherInfoVoApi.getRealnameRewards() == null && GameData.idcardType == RealnameConst.USERTYPE_0) {
            ViewController.getInstance().openView(ViewConst.POPUP.REALNAMEREWARDSPOPUPVIEW, { showAcPop: 1 });
        }
        else {
            // 此处有坑
            // 新官上任的每日首次弹出
            if (Api.switchVoApi.checkOpenLoginWeek() && !Api.otherInfoVoApi.getLoginWeekTimeout() && !Api.otherInfoVoApi.getLoginWeekFirstPopup()) {
                ViewController.getInstance().openView(ViewConst.COMMON.LOGINWEEKVIEW, true);
            }
            if (Api.switchVoApi.checkSignUp() && Api.switchVoApi.checkOpenShowSignUp() && Api.otherInfoVoApi.isSignShowRedDot && Api.otherInfoVoApi.getArrivalNewInfo().count < 7) {
                ViewController.getInstance().openView(ViewConst.POPUP.SIGNUPVIEW, true);
                return;
            }
            //限时红颜 和 首充的强弹
            if (Api.switchVoApi.checkOpenShowPopupWin()) {
                if (Api.switchVoApi.checkClosePay() || PlatformManager.checkHideIconByIP()) {
                    return;
                }
                if (GameData.checkTimeLimitWife() || GameData.checkTimeLimitWifeFb()) {
                    //越南fb 红颜强弹出
                    if (GameData.checkTimeLimitWifeFb()) {
                        ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEFBVIEW);
                    }
                    else {
                        ViewController.getInstance().openView(ViewConst.POPUP.TIMELIMITWIFEVIEW);
                    }
                }
                else {
                    if (Api.shopVoApi.getPayFlag() != 2 && Api.servantVoApi.getServantObj("1033") == null) {
                        ViewController.getInstance().openView(ViewConst.POPUP.FIRSTRECHARGEVIEW);
                    }
                }
            }
            //打开气泡开关
            if (Api.switchVoApi.checkOpenFirstChargeBubble()) {
                if (Api.shopVoApi.getPayFlag() != 2 && Api.servantVoApi.getServantObj("1033") == null) {
                    GameData.leftBubble.isFirstChargeBubble = true;
                    // App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_LEFTBUBBLE,"firstChargeBubble");
                }
            }
        }
    };
    ComposeScene.prototype.getResourceList = function () {
        return [];
    };
    // protected tick():void
    // {
    // 	this._timeIdx++;
    // 	if(this._timeIdx%this._goldTipTime==0)
    // 	{
    // 		this.tipMapGold();
    // 	}
    // }
    ComposeScene.prototype.tipMapGold = function (e) {
        if (this._dataList) {
            var arr = [];
            var count = 0;
            for (var key in this._dataList) {
                if (this._dataList.hasOwnProperty(key)) {
                    if (this._isBeginning && this._selectRenId && key == this._selectRenId) {
                        continue;
                    }
                    var data = this._dataList[key];
                    if (data && data.lv) {
                        var item = this._sceneLayer.getChildByName(key);
                        if (item) {
                            if (item instanceof ComposeItem) {
                                if (Math.random() > 0.5) {
                                    item.showGoldTip();
                                    count++;
                                }
                                else {
                                    arr.push(item);
                                }
                            }
                        }
                        else {
                            // this.resetAllCellByData();
                            return;
                        }
                    }
                }
            }
            while (count < 10) {
                var l = arr.length;
                if (l > 0) {
                    var idx = Math.floor(Math.random() * l);
                    var item = arr.splice(idx, 1)[0];
                    item && item.showGoldTip();
                    count++;
                }
                if (arr.length < 1) {
                    break;
                }
            }
        }
    };
    ComposeScene.prototype.resetAllCellByData = function () {
        var isAdd = false;
        for (var key in this._dataList) {
            if (this._dataList.hasOwnProperty(key)) {
                var vo = this._dataList[key];
                var item = this.getItemById(key);
                if (vo.lv && !item) {
                    this.addOnePerson(vo);
                    isAdd = true;
                }
                if (item && !vo.lv) {
                    item.dispose();
                    item = null;
                }
                if (item) {
                    item.update();
                }
            }
        }
        if (isAdd) {
            this.sortZ();
        }
    };
    ComposeScene.prototype.refreshAfterShow = function (isfromShow) {
        if (isfromShow === void 0) { isfromShow = false; }
        _super.prototype.refreshAfterShow.call(this, isfromShow);
        var l = this._unlockGroupList ? this._unlockGroupList.length : 0;
        if (l > 0) {
            console.log("start unlock refreshAfterShopw");
            this.checkGroupInScreen(this._unlockGroupList[0], this.unlockMap, this, true);
        }
    };
    ComposeScene.prototype.unlockNextGroup = function (e) {
        var nextGroup = Api.composemapVoApi.getNextUnlockGroup();
        if (nextGroup) {
            console.log("start unlock unlockNextGroup");
            // this._unlockGroupList.push(nextGroup);
            this.pushUnlockGroup(nextGroup);
            this.checkGroupInScreen(nextGroup, this.unlockMap, this, true);
        }
    };
    ComposeScene.prototype.pushUnlockGroup = function (group) {
        if (typeof group == "string") {
            this._unlockGroupList.push(group);
            var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
            if (cfg) {
                Api.composemapVoApi.setunlockingStatusById(cfg.id);
            }
        }
        else if (group instanceof Array) {
            this._unlockGroupList = this._unlockGroupList.concat(group);
            for (var i = 0; i < group.length; i++) {
                var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(group[i]);
                if (cfg) {
                    Api.composemapVoApi.setunlockingStatusById(cfg.id);
                }
            }
        }
    };
    ComposeScene.prototype.unlockMap = function () {
        var _this = this;
        var l = this._unlockGroupList ? this._unlockGroupList.length : 0;
        if (l > 0) {
            for (var i = 0; i < l; i++) {
                var group = this._unlockGroupList[i];
                var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
                var build = this._sceneLayer.getChildByName(cfg.id);
                if (this._dataList[cfg.id]) {
                    this.addCellBg(this._dataList[cfg.id]);
                }
                if (build && (build instanceof ComposeBuild)) {
                    Api.rookieVoApi.waitingPosY = build.localToGlobal(0, 0).y - 100;
                    Api.rookieVoApi.waitingPosX = build.localToGlobal(0, 0).x - 80;
                    if (i == 0) {
                        if (group == Api.composemapVoApi.getNextUnlockGroup()) {
                            if (build) {
                                build.setAttackStatus();
                            }
                        }
                        else {
                            build.setUnlockStatus(function () {
                                var buildGroupArr = Config.MapinfoCfg.groupIdArr;
                                var l = buildGroupArr.length;
                                var _loop_1 = function (i_1) {
                                    var group_1 = buildGroupArr[i_1];
                                    var cfg_1 = Config.MapinfoCfg.getStartPosCfgByGroup(group_1);
                                    var build_1 = _this._sceneLayer.getChildByName(cfg_1.id);
                                    if (group_1 == Api.composemapVoApi.getNextUnlockGroup()) {
                                        _this.checkGroupInScreen(group_1, function () {
                                            if (!build_1) {
                                                build_1 = _this.createBuild(group_1);
                                            }
                                            build_1.setAttackStatus();
                                        }, _this, true);
                                        return "break";
                                    }
                                };
                                for (var i_1 = 0; i_1 < l; i_1++) {
                                    var state_1 = _loop_1(i_1);
                                    if (state_1 === "break")
                                        break;
                                }
                            }, this);
                        }
                    }
                    else {
                        if (group == Api.composemapVoApi.getNextUnlockGroup()) {
                            if (build) {
                                build.setAttackStatus();
                            }
                        }
                        else {
                            if (build) {
                                build.setUnlockStatus(null, null);
                            }
                        }
                    }
                }
                else {
                    if (i == 0) {
                        build = this.createBuild(group);
                        Api.rookieVoApi.waitingPosY = build.localToGlobal(0, 0).y - 100;
                        Api.rookieVoApi.waitingPosX = build.localToGlobal(0, 0).x - 80;
                    }
                }
            }
            this._unlockGroupList.length = 0;
        }
    };
    ComposeScene.prototype.setLayerPosition = function () {
    };
    ComposeScene.prototype.startCheckMoveMap = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.fastCheckMoveMap, this);
    };
    ComposeScene.prototype.stopCheckMoveMap = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.fastCheckMoveMap, this);
    };
    ComposeScene.prototype.unlockCell = function (e) {
        var unlockGroup = e.data;
        if (unlockGroup) {
            // this._unlockGroupList=this._unlockGroupList.concat(unlockGroup);
            this.pushUnlockGroup(unlockGroup);
        }
    };
    ComposeScene.prototype.delHandler = function (e) {
        var rData = e.data;
        if (rData.ret) {
            var data = rData.data;
            if (data.data.rewards) {
                var rewardList = GameData.formatRewardItem(data.data.rewards);
                App.CommonUtil.playRewardFlyAction(rewardList);
            }
            var delId = ComposeStatus.delId;
            if (delId) {
                var item = this.getItemById(delId);
                item && item.delete();
            }
        }
        else {
            console.log("delete fail");
        }
    };
    //指向未解锁地块
    ComposeScene.prototype.showUnlockHand = function () {
        var nextGroup = Api.composemapVoApi.getNextUnlockGroup();
        if (!nextGroup) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINUI_CHALLENGE);
            return;
        }
        var startCfg = Config.MapinfoCfg.getStartPosCfgByGroup(nextGroup);
        var centerCfg = Config.MapinfoCfg.getCfgByGroup(nextGroup)[0];
        this.moveToPos(centerCfg.id, null, null);
        if (this._clickHand) {
            return;
        }
        var _a = ComposeStatus.getPixPosByCellPos(startCfg.x, startCfg.y), pixX = _a.pixX, pixY = _a.pixY;
        this._clickHand = BaseBitmap.create("guide_hand");
        this._clickHand.setScale(0.6);
        this._clickHand.x = pixX;
        this._clickHand.y = pixY - 30;
        this._sceneLayer.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.7, scaleY: 0.7 }, 500)
            .to({ scaleX: 0.6, scaleY: 0.6 }, 500);
    };
    ComposeScene.prototype.hideUnlockHand = function () {
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._sceneLayer.removeChild(this._clickHand);
            this._clickHand = null;
        }
    };
    ComposeScene.prototype.checkGroupInScreen = function (group, callback, thisObj, mustCenter) {
        var startCfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
        var _a = ComposeStatus.getPixPosByCellPos(startCfg.x, startCfg.y), pixX = _a.pixX, pixY = _a.pixY;
        var offX = 50;
        var cellLeftX = pixX - ComposeStatus.cellCfg.w + offX;
        var cellRightX = pixX + ComposeStatus.cellCfg.w - offX;
        var cellTopY = pixY;
        var cellButtomY = pixY + ComposeStatus.cellCfg.h * 2;
        var screenLeftX = 0 - this._sceneLayer.x;
        var screenTopY = 0 - this._sceneLayer.y;
        var screenRightX = screenLeftX + GameConfig.stageWidth;
        var screenButtomY = screenTopY + GameConfig.stageHeigth;
        if (mustCenter || cellLeftX < screenLeftX || cellRightX > screenRightX || cellTopY < screenTopY || cellButtomY > screenButtomY) {
            var centerCfg = Config.MapinfoCfg.getCfgByGroup(group)[0];
            this.moveToPos(centerCfg.id, callback, thisObj);
        }
        else {
            if (callback) {
                callback.apply(thisObj);
            }
        }
        return true;
    };
    ComposeScene.prototype.fastCheckMoveMap = function () {
        if (Api.rookieVoApi.isGuiding) {
            //引导不能拖动地图
            return;
        }
        var _a = ComposeStatus.curSelectPos, x = _a.x, y = _a.y;
        var cellSize = ComposeStatus.cellCfg;
        var id = Config.MapinfoCfg.getIdByPos(x, y);
        var cell = this.getItemById(id);
        if (cell) {
            var rightButtom = Api.composemapVoApi.getRightButtomPos();
            var rightButtomPix = ComposeStatus.getRightButtomPixByPos(rightButtom.x, rightButtom.y);
            var showW = Math.max(Math.min(ComposeStatus.mapSize.w, rightButtomPix.pixX), GameConfig.stageWidth);
            var showH = Math.max(Math.min(ComposeStatus.mapSize.h, rightButtomPix.pixY + 273), GameConfig.stageHeigth);
            var cellLeftX = cell.x - cellSize.w / 2;
            var cellRightX = cell.x + cellSize.w / 2;
            var cellTopY = cell.y + ComposeStatus.cellBgSize.h * 0.5 - cell.height - 100;
            var cellButtomY = cell.y + cellSize.h * 0.5;
            var screenLeftX = 0 - this._sceneLayer.x;
            var screenTopY = 0 - this._sceneLayer.y;
            var screenRightX = screenLeftX + GameConfig.stageWidth;
            var screenButtomY = screenTopY + GameConfig.stageHeigth;
            var diffX = 0;
            var diffY = 0;
            // console.log(cellLeftX,screenLeftX);
            var speed = 10;
            if (cellLeftX < screenLeftX) {
                //地图往右移动
                diffX = Math.max(0, Math.min(speed, screenLeftX));
                this._sceneLayer.x += diffX;
                // console.log("地图右移",diffX,diffY);
            }
            else if (cellRightX > screenRightX) {
                //地图往左移动
                diffX = -Math.max(0, Math.min(speed, showW - screenRightX));
                this._sceneLayer.x += diffX;
                // console.log("地图左移",diffX,diffY);
            }
            if (cellTopY < screenTopY) {
                //地图向下移动
                diffY = Math.max(0, Math.min(speed, screenTopY));
                this._sceneLayer.y += diffY;
                // console.log("地图下移",diffX,diffY);
            }
            else if (cellButtomY > screenButtomY) {
                //地图向上移动
                diffY = -Math.max(0, Math.min(speed, showH - screenButtomY));
                this._sceneLayer.y += diffY;
                // console.log("地图上移",diffX,diffY);
            }
            if (diffX || diffY) {
                cell.moveByDiffPos(-diffX, -diffY);
                // cell.moveByDrag(-diffX,-diffY);
            }
        }
    };
    ComposeScene.prototype.setOtherLayerEnabled = function (enabled) {
        if (LayerManager.uiLayer.touchChildren == !enabled) {
            LayerManager.uiLayer.touchChildren = !!enabled;
        }
        if (ComposeStatus.status == ComposeEnums.ITEM) {
            var nextGroup = Api.composemapVoApi.getNextUnlockGroup();
            if (nextGroup) {
                var cfg = Config.MapinfoCfg.getStartPosCfgByGroup(nextGroup);
                var item = this._sceneLayer.getChildByName(cfg.id);
                if (item) {
                    item.touchChildren = enabled;
                }
            }
        }
    };
    /**
     * 移动地图到指定位置
     * @param id 地块ID
     * @param daily 移动延迟时间
     */
    ComposeScene.prototype.moveToPos = function (id, callback, thisObj, daily) {
        var _this = this;
        if (daily === void 0) { daily = 300; }
        egret.Tween.removeTweens(this._sceneLayer);
        var pos = Config.MapinfoCfg.getPosById(id);
        var _a = ComposeStatus.getPixPosByCellPos(pos.x, pos.y), pixX = _a.pixX, pixY = _a.pixY;
        var posScreenCenterX = GameConfig.stageWidth / 2 - pixX;
        var posScreenCenterY = GameConfig.stageHeigth / 2 - pixY;
        var _b = this.checkBound(posScreenCenterX, posScreenCenterY), x = _b.x, y = _b.y;
        var group = Config.MapinfoCfg.getCfgByPos(pos.x, pos.y).group;
        // let nextGroup=Api.composemapVoApi.getNextUnlockGroup();					
        var cfg = Config.MapinfoCfg.getGroupData(group);
        // x = Math.max(x,(cfg.px-4)*(ComposeStatus.cellCfg.w+ComposeStatus.cellCfg.spaceX))
        // y = Math.max(y,(cfg.py-4)*(ComposeStatus.cellCfg.h+ComposeStatus.cellCfg.spaceY)-(1136-GameConfig.stageHeigth))
        if (this._moveCallbackData) {
            this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
        }
        if (callback) {
            this._moveCallbackData = { callback: callback, thisObj: thisObj };
        }
        else {
            this._moveCallbackData = null;
        }
        if (this._sceneLayer.x != x || this._sceneLayer.y != y) {
            if (daily) {
                this.touchChildren = false;
                egret.Tween.get(this._sceneLayer).to({ x: x, y: y }, daily).call(function () {
                    _this.touchChildren = true;
                    egret.Tween.removeTweens(_this._sceneLayer);
                    if (_this._moveCallbackData) {
                        _this._moveCallbackData.callback.apply(_this._moveCallbackData.thisObj);
                    }
                    _this._moveCallbackData = null;
                }, this);
            }
            else {
                this._sceneLayer.setPosition(x, y);
                if (this._moveCallbackData) {
                    this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
                }
                this._moveCallbackData = null;
            }
        }
        else {
            if (this._moveCallbackData) {
                this._moveCallbackData.callback.apply(this._moveCallbackData.thisObj);
            }
            this._moveCallbackData = null;
        }
    };
    ComposeScene.prototype.checkBound = function (x, y) {
        // let leftTop=Api.composemapVoApi.getLeftTopPos();
        var rightButtom = Api.composemapVoApi.getRightButtomPos();
        // let LeftTopPix = ComposeStatus.getLeftTopPixByPos(leftTop.x,leftTop.y);
        var rightButtomPix = ComposeStatus.getRightButtomPixByPos(rightButtom.x, rightButtom.y);
        var showW = Math.max(Math.min(ComposeStatus.mapSize.w, rightButtomPix.pixX), GameConfig.stageWidth);
        var showH = Math.max(Math.min(ComposeStatus.mapSize.h, rightButtomPix.pixY + 273), GameConfig.stageHeigth);
        x = Math.max(Math.min(0, x), GameConfig.stageWidth - showW);
        y = Math.max(Math.min(0, y), GameConfig.stageHeigth - showH);
        return { x: x, y: y };
    };
    ComposeScene.prototype.initTouch = function () {
        this._sceneLayer.addTouch(this.sceneTouchHandler, this);
    };
    ComposeScene.prototype.setSelected = function (id) {
        var item = this.getItemById(id);
        if (item) {
            item.setSelected();
        }
    };
    ComposeScene.prototype.clearSelected = function () {
        var container = ComposeSelect.getInstant();
        if (container && container.parent) {
            var item = container.parent;
            item.removeSelected();
        }
    };
    ComposeScene.prototype.startDailyDel = function () {
        // if(Api.rookieVoApi.isGuiding)
        // {
        // 	//引导不能删除小人
        // 	return;
        // }
        //屏蔽删除小人
        if (this) {
            return;
        }
        var container = ComposeSelect.getInstant();
        if (container.parent && container.isDelStatus()) {
            return;
        }
        if (this._dailyDelCount == -1) {
            this._dailyDelCount = egret.setTimeout(this.showWaitDelPs, this, 500);
        }
    };
    ComposeScene.prototype.stopDailyDel = function () {
        if (this._dailyDelCount != -1) {
            egret.clearTimeout(this._dailyDelCount);
            this._dailyDelCount = -1;
        }
        else {
            this.hideWaitDelPs();
        }
    };
    ComposeScene.prototype.showWaitDelPs = function () {
        this.stopDailyDel();
        var container = ComposeSelect.getInstant();
        if (container.parent) {
            container.showDelPs();
        }
    };
    ComposeScene.prototype.hideWaitDelPs = function () {
        var container = ComposeSelect.getInstant();
        if (container.parent) {
            container.hideDelPs();
        }
    };
    ComposeScene.prototype.showAllSameLvCell = function () {
        if (this._selectRenId) {
            var selectData = this._dataList[this._selectRenId];
            for (var id in this._dataList) {
                if (this._dataList.hasOwnProperty(id)) {
                    // if(id==selectData.id)
                    // {
                    // 	continue;
                    // }
                    var data = this._dataList[id];
                    if (data && selectData.lv == data.lv) {
                        var item = this.getItemById(id);
                        if (item) {
                            item.showCell();
                        }
                    }
                }
            }
        }
    };
    ComposeScene.prototype.hideAllSameLvCell = function () {
        if (this._selectRenId) {
            var selectData = this._dataList[this._selectRenId];
            for (var id in this._dataList) {
                if (this._dataList.hasOwnProperty(id)) {
                    if (id == selectData.id) {
                        continue;
                    }
                    var data = this._dataList[id];
                    if (data && selectData.lv == data.lv) {
                        var item = this.getItemById(id);
                        if (item) {
                            item.hideCell();
                        }
                    }
                }
            }
        }
    };
    ComposeScene.prototype.sceneTouchHandler = function (e) {
        // if(ComposeStatus.isComposeing)
        // {
        // 	return;
        // }
        if (e.target != this._sceneLayer) {
            return;
        }
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (this._isBeginning == false) {
                    this._isBeginning = true;
                    this._isMoved = false;
                    if (!this._startPos) {
                        this._startPos = egret.Point.create(this._sceneLayer.x, this._sceneLayer.y);
                    }
                    else {
                        this._startPos.setTo(this._sceneLayer.x, this._sceneLayer.y);
                    }
                    if (!this._startStagePos) {
                        this._startStagePos = egret.Point.create(e.stageX, e.stageY);
                    }
                    else {
                        this._startStagePos.setTo(e.stageX, e.stageY);
                    }
                    if (!this._startLocalPos) {
                        this._startLocalPos = egret.Point.create(e.localX, e.localY);
                    }
                    else {
                        this._startLocalPos.setTo(e.localX, e.localY);
                    }
                    this._selectRenId = null;
                    if (!ComposeStatus.isBatchMoving) {
                        var ofp = this._sceneLayer.localToGlobal(0, 0);
                        var keys = Object.keys(this._dataList);
                        keys.sort(function (a, b) {
                            return Number(b) - Number(a);
                        });
                        for (var tk in keys) {
                            if (keys.hasOwnProperty(tk)) {
                                var key = keys[tk];
                                var vo = this._dataList[key];
                                if (vo && vo.lv) {
                                    var item = this.getItemById(key);
                                    if (item) {
                                        var aaa = item.getChildByName("touchcell") || item;
                                        if (aaa.hitTestPoint(e.localX + ofp.x, e.localY + GameData.layerPosY + ofp.y, false)) {
                                            // console.log("hitest"+key);
                                            if (Api.composemapVoApi.checkAndStopCount()) {
                                                this._isBeginning = true;
                                                App.CommonUtil.showTip(LanguageManager.getlocal("composeFastOpera"));
                                                break;
                                            }
                                            else {
                                                this._selectRenId = key;
                                                item.setSelected();
                                                this.startDailyDel();
                                                break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (!this._selectRenId) {
                        this.clearSelected();
                        /** 以下为点击建筑逻辑 */
                        // let buildGroupArr=Config.MapinfoCfg.buildIdArr;
                        // let l=buildGroupArr.length;
                        // for(let i=0;i<l;i++)
                        // {
                        // 	let group=buildGroupArr[i];
                        // 	let cfg=Config.MapinfoCfg.getStartPosCfgByGroup(group);
                        // 	let item=<ComposeBuild>this._sceneLayer.getChildByName(cfg.id);
                        // 	if(item&&item.hitTestPoint(e.localX+ofp.x,e.localY+GameData.layerPosY+ofp.y,true))
                        // 	{
                        // 		if(item.isUnlocked())
                        // 		{
                        // 			Api.composemapVoApi.openFunction(group);
                        // 			break;
                        // 		}
                        // 	}
                        // }
                        /** 以上为点击建筑逻辑 */
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (this._isBeginning) {
                    this.setOtherLayerEnabled(false);
                    if (ComposeStatus.status == ComposeEnums.ITEM) {
                        this.stopDailyDel();
                        var x = e.localX - this._startLocalPos.x;
                        var y = e.localY - this._startLocalPos.y;
                        var item = this.getItemById(this._selectRenId);
                        if (!this._isMoved) {
                            item && item.setMaxZindex();
                            this.showAllSameLvCell();
                        }
                        item && item.moveByDrag(x, y);
                        this.startCheckMoveMap();
                    }
                    else {
                        if (Api.rookieVoApi.isGuiding) {
                            //引导不能拖动地图
                            return;
                        }
                        if (ComposeStatus.status == ComposeEnums.NONE) {
                            ComposeStatus.status = ComposeEnums.SCENE;
                        }
                        var x = e.stageX - this._startStagePos.x + this._startPos.x;
                        var y = e.stageY - this._startStagePos.y + this._startPos.y;
                        var xyData = this.checkBound(x, y);
                        x = xyData.x;
                        y = xyData.y;
                        this._sceneLayer.setPosition(x, y);
                    }
                    this._isMoved = true;
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if (this._isBeginning) {
                    this.setOtherLayerEnabled(true);
                    if (ComposeStatus.status == ComposeEnums.ITEM) {
                        this.hideAllSameLvCell();
                        this.stopDailyDel();
                        var item = this.getItemById(this._selectRenId);
                        if (item) {
                            item.showForCompose();
                            this.resetStatus();
                            item.removeSelected();
                            item.resetPos();
                        }
                        ComposeStatus.curSelectPos = { x: -1, y: -1 };
                    }
                    this.clearMoveStatus();
                    this._isBeginning = false;
                    this._isMoved = false;
                    this.stopCheckMoveMap();
                }
                break;
            case egret.TouchEvent.TOUCH_END:
                if (this._isBeginning) {
                    this.setOtherLayerEnabled(true);
                    this.stopCheckMoveMap();
                    var targetL = Object.keys(ComposeStatus.targetList).length;
                    var _a = ComposeStatus.curStopPos, x = _a.x, y = _a.y;
                    var fpos = ComposeStatus.curSelectPos;
                    var param = { fpos: Config.MapinfoCfg.getIdByPos(fpos.x, fpos.y), tpos: Config.MapinfoCfg.getIdByPos(x, y) };
                    if (ComposeStatus.status == ComposeEnums.ITEM) {
                        this.stopDailyDel();
                    }
                    if (this._isMoved) {
                        if (ComposeStatus.status == ComposeEnums.ITEM) {
                            this.hideAllSameLvCell();
                            var item = this.getItemById(this._selectRenId);
                            item && item.removeSelected(false, false);
                            item && item.showForCompose();
                            if (targetL < 1) {
                                //移动
                                var isMoveEd = (x != -1 && y != -1);
                                if (isMoveEd && Api.composemapVoApi.checkCanPos()) {
                                    // let{pixX,pixY} = ComposeStatus.getPixPosByCellPos(x,y);
                                    // this.setPosition(pixX,pixY);
                                    NetManager.request(NetRequestConst.REQUEST_MAP_MVPOS, param);
                                }
                                else {
                                    //移动到不可放位置
                                    if (item) {
                                        this.resetStatus();
                                        item.resetPos();
                                    }
                                }
                            }
                            else {
                                var selectData = Api.composemapVoApi.getCellDataById(this._selectRenId);
                                if (Api.composemapVoApi.checkCanCompose(selectData.lv) == false) {
                                    this.resetStopStatus();
                                    if (Api.composemapVoApi.checkMaxCfgLv(selectData.lv) == false) {
                                        Api.composemapVoApi.showCannotComposeView();
                                    }
                                    else {
                                        App.CommonUtil.showTip(LanguageManager.getlocal("composeMaxLvDesc"));
                                    }
                                    this.composeFail();
                                }
                                else {
                                    if (targetL > 1) {
                                        NetManager.request(NetRequestConst.REQUEST_MAP_LVUPBATCH, param);
                                    }
                                    else {
                                        NetManager.request(NetRequestConst.REQUEST_MAP_LVUP, param);
                                    }
                                }
                            }
                            if (item) {
                                item.clearMoveStatus();
                            }
                        }
                    }
                    this.clearMoveStatus();
                    this._isBeginning = false;
                    this._isMoved = false;
                }
                break;
            default:
                break;
        }
    };
    ComposeScene.prototype.clearMoveStatus = function () {
        // if(ComposeStatus.status==ComposeEnums.SCENE)
        // {
        ComposeStatus.status = ComposeEnums.NONE;
        // }
        // this._targetList={};
    };
    //服务器没返回数据之前前端修改数据，如果已经返回就不能用了
    ComposeScene.prototype.moveData = function (oid, nid) {
        if (oid && oid != nid) {
            Api.composemapVoApi.move(oid, nid);
            var item = this.getItemById(oid);
            if (item) {
                item.update();
            }
        }
    };
    ComposeScene.prototype.moveAndReset = function () {
        var fPos = ComposeStatus.curSelectPos;
        var tPos = ComposeStatus.curStopPos;
        if (fPos.x != -1 && fPos.y != -1 && tPos.x != -1 && tPos.y != -1) {
            var fid = Config.MapinfoCfg.getIdByPos(fPos.x, fPos.y);
            var tid = Config.MapinfoCfg.getIdByPos(tPos.x, tPos.y);
            Api.composemapVoApi.move(fid, tid);
            var item = this.getItemById(fid);
            var titem = this.getItemById(tid);
            if (item) {
                item.updatePos();
            }
            if (titem) {
                titem.updatePos();
            }
        }
        this.resetStatus();
    };
    ComposeScene.prototype.resetStatus = function () {
        ComposeStatus.resetStatus();
        this.hideComposeItems();
        ComposeStatus.targetList = {};
        ComposeStatus.curStopPos = { x: -1, y: -1 };
    };
    //收到引导的消息
    ComposeScene.prototype.guideMsg = function (event) {
        var guideCfg = event.data.guideCfg;
        App.LogUtil.show("guideCfg" + guideCfg);
        //画面移动到中间 引导删除
        // if(guideCfg&&guideCfg.otherId == "delperson_1")
        // {
        // 	this.moveToPos(this._enterPos,null,null);
        // }
    };
    ComposeScene.prototype.getItemById = function (id) {
        var item = this._sceneLayer.getChildByName(id);
        if (item instanceof ComposeItem) { }
        else {
            item = null;
        }
        return item;
    };
    ComposeScene.prototype.moveEndhandler = function (e) {
        var data = e.data;
        if (data.ret) {
            this.moveAndReset();
            this.sortZ();
        }
        else {
            var item = this.getItemById(this._selectRenId);
            if (item) {
                item.resetPos();
            }
            this.resetStatus();
            this.resetAllCellByData();
        }
    };
    ComposeScene.prototype.lvupHandler = function (e) {
        this.resetStopStatus();
        var data = e.data;
        if (data.ret) {
            this.composeEffect(data);
        }
        else {
            if (data.data.ret == -3) {
                Api.composemapVoApi.showCannotComposeView();
                this.resetAllCellByData();
            }
            else {
                App.CommonUtil.showTip(LanguageManager.getlocal("composeFailCodeTip", ["" + data.data.ret]));
            }
            this.composeFail();
        }
    };
    ComposeScene.prototype.resetStopStatus = function () {
        var stopPos = ComposeStatus.curStopPos;
        var stopId = Config.MapinfoCfg.getIdByPos(stopPos.x, stopPos.y);
        var stopChild = this.getItemById(stopId);
        if (stopChild) {
            stopChild.recoveryBmp();
        }
    };
    ComposeScene.prototype.composeFail = function () {
        var keys = Object.keys(ComposeStatus.targetList);
        var l = keys.length;
        if (l > 0) {
            var _a = ComposeStatus.curSelectPos, x = _a.x, y = _a.y;
            var id = Config.MapinfoCfg.getIdByPos(x, y);
            var chid = this.getItemById(id);
            if (keys.length == 1) {
            }
            else {
            }
            if (chid) {
                chid.resetPos();
            }
            this.resetStatus();
        }
    };
    ComposeScene.prototype.composeEffect = function (data) {
        var _this = this;
        var keys = Object.keys(ComposeStatus.targetList);
        if (keys.length > 0) {
            var rewards_1 = data.data.data.unlockPersonLv ? "" : data.data.data.rewards;
            var idx_1 = 0;
            var _a = ComposeStatus.curSelectPos, x = _a.x, y = _a.y;
            var stopPos_1 = ComposeStatus.curStopPos;
            var id = Config.MapinfoCfg.getIdByPos(x, y);
            var stopId_1 = id;
            var chid = this.getItemById(id);
            if (keys.length == 1) {
                if (chid) {
                    chid.dispose();
                    this.deleteData(id);
                }
                this.lvup(stopPos_1.x, stopPos_1.y, false, rewards_1);
                // if(rewards)
                // {
                // 	let rewardList = GameData.formatRewardItem(rewards);
                // 	App.CommonUtil.playRewardFlyAction(rewardList);
                // }
                this.resetStatus();
            }
            else {
                ComposeStatus.isBatchMoving = true;
                // if(chid)
                // {
                // 	chid.dispose();
                // 	this.deleteData(id);
                // }
                ComposeStatus.targetList[id] = { x: x, y: y, lv: ComposeStatus.targetList[keys[0]].lv };
                keys = Object.keys(ComposeStatus.targetList);
                var l = keys.length;
                var disArr_1 = keys.concat();
                disArr_1.sort(function (a, b) {
                    var aPos = Config.MapinfoCfg.getPosById(a);
                    var bPos = Config.MapinfoCfg.getPosById(b);
                    var aX = aPos.x;
                    var aY = aPos.y;
                    var bX = bPos.x;
                    var bY = bPos.y;
                    var adis = App.MathUtil.distance(aX, aY, stopPos_1.x, stopPos_1.y);
                    var bdis = App.MathUtil.distance(bX, bY, stopPos_1.x, stopPos_1.y);
                    return (adis == bdis ? Number(a) - Number(b) : adis - bdis);
                });
                var _loop_2 = function (i) {
                    var _a = ComposeStatus.targetList[keys[i]], x_1 = _a.x, y_1 = _a.y;
                    if (x_1 == ComposeStatus.curStopPos.x && y_1 == ComposeStatus.curStopPos.y) {
                        return "continue";
                    }
                    var id_1 = Config.MapinfoCfg.getIdByPos(x_1, y_1);
                    var chid_1 = this_1.getItemById(id_1);
                    if (chid_1) {
                        chid_1.move(ComposeStatus.curStopPos.x, ComposeStatus.curStopPos.y, function () {
                            idx_1++;
                            if (rewards_1 && id_1 == stopId_1) {
                                var rewardList = GameData.formatRewardItem(rewards_1);
                                var p = chid_1.localToGlobal(0, 0);
                                p.y -= 80;
                                App.CommonUtil.playRewardFlyAction(rewardList, p);
                            }
                            if (idx_1 == keys.length - 1) {
                                var disL = disArr_1.length;
                                var noCompose = false;
                                if (disL % 2 == 1) {
                                    noCompose = true;
                                }
                                var needRemoveIdx = Math.floor(disL / 2);
                                var logPos = disArr_1[needRemoveIdx];
                                for (var idx_2 = 0; idx_2 < disL; idx_2++) {
                                    var txy = Config.MapinfoCfg.getPosById(disArr_1[idx_2]);
                                    var tx = txy.x;
                                    var ty = txy.y;
                                    if (idx_2 < needRemoveIdx) {
                                        _this.lvup(tx, ty, true, rewards_1);
                                    }
                                    else {
                                        var item = _this.getItemById(disArr_1[idx_2]);
                                        if (noCompose && idx_2 == needRemoveIdx) {
                                            item && item.updateShow(true);
                                        }
                                        else {
                                            if (item) {
                                                item.dispose();
                                            }
                                            _this.deleteData(disArr_1[idx_2]);
                                        }
                                    }
                                }
                                ComposeStatus.isBatchMoving = false;
                                _this.resetStatus();
                            }
                        }, this_1);
                    }
                    else {
                        idx_1++;
                    }
                };
                var this_1 = this;
                for (var i = 0; i < l; i++) {
                    _loop_2(i);
                }
            }
        }
        else {
            this.resetStatus();
        }
    };
    ComposeScene.prototype.deleteData = function (id) {
        Api.composemapVoApi.removeData(id);
    };
    ComposeScene.prototype.lvup = function (x, y, isBatch, rewards) {
        var id = Config.MapinfoCfg.getIdByPos(x, y);
        var item = this.getItemById(id);
        if (item) {
            item.updateShow(isBatch, rewards);
        }
    };
    ComposeScene.prototype.buyPerson = function (e) {
        var data = e.data;
        // if(data.ret)
        // {
        // 	this.addPerson();
        // }
        // else
        // {
        var delList = Api.composemapVoApi.getNeedDelPersonList();
        if (delList && delList.length > 0) {
            for (var key in delList) {
                if (delList.hasOwnProperty(key)) {
                    var id = delList[key];
                    var item = this.getItemById(id);
                    if (item) {
                        item.dispose();
                    }
                }
            }
            Api.composemapVoApi.delClientPerson();
        }
        var isShowTip = data.ret ? (data.data && data.data.data && data.data.data.hasOwnProperty("allsucess") && (!data.data.data.allsucess)) : true;
        if (isShowTip) {
            App.CommonUtil.showTip(LanguageManager.getlocal("composeBuyFail"));
        }
        if ((!data.ret) && data.data && data.data.data && data.data.data.bpcode) {
            switch (data.data.data.bpcode) {
                case -2:
                case -3:
                    this.resetAllCellByData();
                    break;
            }
        }
        // else
        // {
        // 	if(data.data.ret==-3)
        // 	{
        // 		App.CommonUtil.showTip(LanguageManager.getlocal("servantInfo_levelupTip3"));
        // 	}
        // }
        // }
    };
    ComposeScene.prototype.addPerson = function (e) {
        SoundManager.playEffect("effect_employ");
        ComposeStatus.buyNum++;
        var personIdList = Api.composemapVoApi.getAddPresonList();
        var isAdd = false;
        for (var key in personIdList) {
            if (personIdList.hasOwnProperty(key)) {
                var personData = Api.composemapVoApi.getCellDataById(personIdList[key]);
                this.addOnePerson(personData, true);
                var group = Config.MapinfoCfg.getCfgByPos(personData.x, personData.y).group;
                this.checkGroupInScreen(group, null, null, true);
                isAdd = true;
            }
        }
        Api.composemapVoApi.clearAddPersonList();
        if (isAdd) {
            this.sortZ();
        }
    };
    ComposeScene.prototype.addOnePerson = function (data, effect) {
        if (data && data.lv) {
            var composecell = new ComposeItem(data);
            composecell.show(this._sceneLayer, effect);
            // this._sceneLayer.addChild(composecell);
        }
    };
    ComposeScene.prototype.addCellBg = function (data) {
        var _this = this;
        var composebg = new ComposeBg(data);
        this._cellBgLayer.addChild(composebg);
        egret.callLater(function () {
            _this._cellBgLayer && (_this._cellBgLayer.cacheAsBitmap = true);
        }, this);
    };
    // 合成相关逻辑
    ComposeScene.prototype.initAllCompose = function () {
        this.posCfg = {
            "servant": 1,
            "challengeTen": 1,
            "levy": 1,
            "city": 1,
            "oneClickBuy": 1
        };
        this._cellBgLayer = new BaseDisplayObjectContainer();
        this._sceneLayer.addChild(this._cellBgLayer);
        //离线收益弹窗
        if (!Api.rookieVoApi.isInGuiding && GameData.autoRes) {
            if (GameData.leavetime >= 600) {
                var resAdd = 0;
                for (var i = 0; i < GameData.autoRes.length; i++) {
                    resAdd += GameData.autoRes[i];
                }
                if (resAdd > 0) {
                    ViewController.getInstance().openView(ViewConst.COMPOSE.LEVYAUTORESPOPUPVIEW);
                }
            }
        }
        this._dataList = Api.composemapVoApi.getAllCellData();
        var groupIdArr = Config.MapinfoCfg.groupIdArr;
        var gl = groupIdArr.length;
        for (var i = 0; i < gl; i++) {
            var group = String(groupIdArr[i]);
            var cfg = Config.MapinfoCfg.getCfgByGroup(group);
            if (cfg) {
                if (this._dataList[cfg[0].id]) {
                    for (var key in cfg) {
                        if (cfg.hasOwnProperty(key)) {
                            var id = cfg[key].id;
                            var ida = this._dataList[id];
                            this.addCellBg(ida);
                            this.addOnePerson(ida);
                        }
                    }
                }
                else {
                    // let rect=egret.Rectangle.create();
                    // rect.setTo(0,0,368,201);
                    // let bm=BaseLoadBitmap.create("composechallenge1",rect);
                    var nextGroup = Api.composemapVoApi.getNextUnlockGroup();
                    if (nextGroup == group && Api.composemapVoApi.checkOpenUnlockGroup()) {
                        this.createBuild(group);
                    }
                }
            }
        }
        // for(let key in this._dataList)
        // {
        // 	let ida=this._dataList[key];
        // 	this.addOnePerson(ida);
        // }
        this.sortZ();
        // this.initTestLine();
        // this.initTestPos();
        Api.composemapVoApi.clearAddPersonList();
        this.moveToPos(this._enterPos, null, null);
    };
    ComposeScene.prototype.createBuild = function (group) {
        var bm = new ComposeBuild(group);
        var startCfg = Config.MapinfoCfg.getStartPosCfgByGroup(group);
        var _a = ComposeStatus.getPixPosByCellPos(startCfg.x, startCfg.y), pixX = _a.pixX, pixY = _a.pixY;
        bm.setPosition(pixX, pixY);
        this._sceneLayer.addChild(bm);
        bm.name = startCfg.id;
        return bm;
    };
    ComposeScene.prototype.sortZ = function () {
        // let keys =Object.keys(this._dataList);
        var keys = Config.MapinfoCfg.idArr.concat();
        keys.sort(function (a, b) {
            return Number(b.substr(3)) - Number(a.substr(3));
            // return Number(b)-Number(a);
        });
        var cankaoidx = this._sceneLayer.getChildIndex(this._cellBgLayer);
        for (var key in keys) {
            var id = keys[key];
            var chid = this._sceneLayer.getChildByName(id);
            if (chid) {
                this._sceneLayer.setChildIndex(chid, cankaoidx + 1);
            }
        }
    };
    // private initTestPos():void
    // {
    // 	let list=Config.MapinfoCfg.mapList;
    // 	for(let id in list)
    // 	{
    // 		if(list.hasOwnProperty(id)&&!Api.composemapVoApi.getCellDataById(id))
    // 		{
    // 			let cfg=list[id];
    // 			let x=ComposeStatus.startX + cfg.x*(ComposeStatus.cellCfg.w);
    // 			let y=ComposeStatus.startY + cfg.y*(ComposeStatus.cellCfg.h);
    // 			let leftX=x-ComposeStatus.cellCfg.w/2;
    // 			let rightX=x+ComposeStatus.cellCfg.w/2;
    // 			if(leftX>=0&&rightX<=ComposeStatus.mapSize.w)
    // 			{
    // 				let t=ComponentManager.getTextField(cfg.x+","+cfg.y,14,Api.composemapVoApi.getCellDataById(id)?0x0f0f0f:0xff0000);
    // 				t.setPosition(x-t.width/2,y+20);
    // 				this._sceneLayer.addChild(t);
    // 			}
    // 		}
    // 	}
    // }
    ComposeScene.prototype.initTestLine = function () {
        var w = 18;
        var h = 16;
        var line = new BaseShape();
        line.graphics.beginFill(0);
        line.graphics.lineStyle(1, 0);
        var idx = this._sceneLayer.getChildIndex(this._sceneLayer);
        this._sceneLayer.addChildAt(line, idx);
        for (var j = 0; j < h; j++) {
            var tmpw = 0;
            var tmph = j;
            var _a = ComposeStatus.getLeftTopPixByPos(tmpw, tmph), pixX = _a.pixX, pixY = _a.pixY;
            var tx = pixX;
            var ty = pixY;
            // while(tx<0)
            // {
            // 	tmpw++;
            // 	let {pixX,pixY} = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
            // 	tx=pixX;
            // 	ty=pixY;
            // }
            line.graphics.moveTo(tx, ty);
            tmpw = w;
            tmph = j;
            var dataPos = ComposeStatus.getLeftTopPixByPos(tmpw, tmph);
            tx = dataPos.pixX;
            ty = dataPos.pixY;
            // while(tx>ComposeStatus.mapSize.w)
            // {
            // 	tmpw--;
            // 	let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
            // 	tx=dataPos.pixX;
            // 	ty=dataPos.pixY;
            // }
            line.graphics.lineTo(tx, ty);
        }
        for (var i = 0; i < w; i++) {
            var tmpw = i;
            var tmph = 0;
            var dataPos = ComposeStatus.getLeftTopPixByPos(tmpw, tmph);
            var tx = dataPos.pixX;
            var ty = dataPos.pixY;
            // while(tx>ComposeStatus.mapSize.w)
            // {
            // 	tmph++;
            // 	let dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
            // 	tx=dataPos.pixX;
            // 	ty=dataPos.pixY;
            // }
            line.graphics.moveTo(tx, ty);
            tmpw = i;
            tmph = h;
            dataPos = ComposeStatus.getLeftTopPixByPos(tmpw, tmph);
            tx = dataPos.pixX;
            ty = dataPos.pixY;
            // while(tx<0)
            // {
            // 	tmph--;
            // 	dataPos = ComposeStatus.getLeftTopPixByPos(tmpw,tmph);
            // 	tx=dataPos.pixX;
            // 	ty=dataPos.pixY;
            // }
            line.graphics.lineTo(tx, ty);
        }
        line.graphics.endFill();
    };
    ComposeScene.prototype.isNpcNameMove = function () {
        return false;
    };
    ComposeScene.prototype.itemMoveHandler = function (e) {
        var pixX = e.data.pixX;
        var pixY = e.data.pixY;
        var x = e.data.x;
        var y = e.data.y;
        this.findComposeItem(pixX, pixY, x, y);
    };
    ComposeScene.prototype.initNPC = function () {
    };
    ComposeScene.prototype.findComposeItem = function (pixX, pixY, oldX, oldY) {
        var _this = this;
        var lastStop = { x: ComposeStatus.curStopPos.x, y: ComposeStatus.curStopPos.y };
        var _a = ComposeStatus.getCellPosByPixPos(pixX, pixY), x = _a.x, y = _a.y;
        // console.log(x,y,lastStop.x,lastStop.y);
        // if(Config.MapinfoCfg.checkCanPos(x,y))
        // {
        ComposeStatus.curStopPos.x = x;
        ComposeStatus.curStopPos.y = y;
        // }
        // else
        // {
        // 	ComposeStatus.curStopPos.x=-1;
        // 	ComposeStatus.curStopPos.y=-1;
        // }
        var notFind = false;
        notFind = (x == oldX && y == oldY);
        var oldId = Config.MapinfoCfg.getIdByPos(oldX, oldY);
        var id = Config.MapinfoCfg.getIdByPos(x, y);
        var oldData = Api.composemapVoApi.getCellDataById(oldId);
        var newData = Api.composemapVoApi.getCellDataById(id);
        var selectItem = this.getItemById(oldId);
        var nitem = this.getItemById(id);
        // console.log("id---"+id)
        if (selectItem) {
            selectItem.setCellStatus(!!newData);
        }
        if (!notFind) {
            if ((!oldData) || (!newData) || (oldData.lv != newData.lv)) {
                notFind = true;
            }
        }
        var sameChange = (lastStop.x != x || lastStop.y != y);
        var setStatus = function (showSelectCompose) {
            if (lastStop.x != x || lastStop.y != y) {
                var lastId = Config.MapinfoCfg.getIdByPos(lastStop.x, lastStop.y);
                var lastItem = _this.getItemById(lastId);
                if (lastItem) {
                    lastItem.recoveryBmp();
                    if (showSelectCompose) {
                        if (selectItem) {
                            egret.Tween.removeTweens(selectItem);
                            selectItem.showForCompose();
                        }
                    }
                }
            }
        };
        if (notFind) {
            this.hideComposeItems();
            ComposeStatus.targetList = {};
            // console.log("nofind");
            setStatus(true);
            return;
        }
        if (ComposeStatus.targetList[id]) {
            if (sameChange) {
                this.showComposeItems();
                setStatus(true);
                if (nitem) {
                    nitem.showNextLvBmp();
                    if (selectItem) {
                        selectItem.hideForCompose();
                    }
                }
            }
            return;
        }
        // ComposeStatus.targetList={};
        this.hideComposeItems();
        ComposeStatus.targetList = {};
        this._tmpNotFind = { x: oldX, y: oldY };
        this.findAllSameLv(oldX, oldY, x, y);
        // this.findOne(oldX,oldY,x,y);
        this._tmpNotFind = null;
        this._findedPos = {};
        this.showComposeItems();
        if (nitem) {
            nitem.showNextLvBmp();
            if (selectItem) {
                selectItem.hideForCompose();
            }
            setStatus();
        }
        // console.log(ComposeStatus.curStopPos);
    };
    ComposeScene.prototype.findNearly = function (x, y) {
        this.findOne(x, y, x - 1, y);
        this.findOne(x, y, x, y - 1);
        this.findOne(x, y, x + 1, y);
        this.findOne(x, y, x, y + 1);
    };
    ComposeScene.prototype.findOne = function (x, y, nx, ny) {
        var nid = Config.MapinfoCfg.getIdByPos(nx, ny);
        var oid = Config.MapinfoCfg.getIdByPos(x, y);
        var ida = Api.composemapVoApi.getCellDataById(nid);
        var oida = Api.composemapVoApi.getCellDataById(oid);
        var continueFind = true;
        if (this._tmpNotFind && this._tmpNotFind.x == nx && this._tmpNotFind.y == ny) {
            continueFind = false;
        }
        var idaId = ida && Config.MapinfoCfg.getIdByPos(ida.x, ida.y);
        if (ida && oida && ida.lv == oida.lv && continueFind && !this._findedPos[idaId]) {
            ComposeStatus.targetList[idaId] = ida;
            this._findedPos[idaId] = 1;
            if (Api.composemapVoApi.checkCanBath()) {
                this.findNearly(ida.x, ida.y);
            }
            // console.log("find",ida.x,ida.y);
        }
    };
    ComposeScene.prototype.findAllSameLv = function (x, y, nx, ny) {
        var nid = Config.MapinfoCfg.getIdByPos(nx, ny);
        var oid = Config.MapinfoCfg.getIdByPos(x, y);
        var ida = Api.composemapVoApi.getCellDataById(nid);
        var oida = Api.composemapVoApi.getCellDataById(oid);
        var continueFind = true;
        if (this._tmpNotFind && this._tmpNotFind.x == nx && this._tmpNotFind.y == ny) {
            continueFind = false;
        }
        var idaId = ida && Config.MapinfoCfg.getIdByPos(ida.x, ida.y);
        if (ida && oida && ida.lv == oida.lv && continueFind) {
            // this._findedPos[idaId]=1;
            if (Api.composemapVoApi.checkCanBath()) {
                // this.findNearly(ida.x,ida.y);
                var lvList = Api.composemapVoApi.getLvList(ida.lv);
                var lvl = lvList.length;
                for (var i = 0; i < lvl; i++) {
                    var tid = lvList[i];
                    if (tid == oid) {
                        continue;
                    }
                    ComposeStatus.targetList[tid] = Api.composemapVoApi.getCellDataById(tid);
                    this._findedPos[tid] = 1;
                }
            }
            else {
                ComposeStatus.targetList[idaId] = ida;
                this._findedPos[idaId] = 1;
            }
        }
    };
    ComposeScene.prototype.showComposeItems = function () {
        for (var key in ComposeStatus.targetList) {
            var item = this.getItemById(key);
            if (item) {
                item.showComposeStatus();
            }
        }
    };
    ComposeScene.prototype.hideComposeItems = function () {
        for (var key in ComposeStatus.targetList) {
            var item = this.getItemById(key);
            if (item) {
                item.hideComposeStatus();
            }
        }
        // ComposeStatus.targetList={};
    };
    ComposeScene.prototype.dispose = function () {
        this.stopCheckMoveMap();
        this.removeEvents();
        this._timeIdx = -1;
        GameData.announcementData = null;
        // this._sceneLayer=null;
        this._unlockGroupList.length = 0;
        this._dataList = {};
        this._isBeginning = false;
        this._startPos = null;
        this._startStagePos = null;
        this._startLocalPos = null;
        this._selectRenId = null;
        this._isMoved = false;
        this._goldTipTime = 10;
        this._timeIdx = 0;
        this._unlockGroupList = [];
        this._dailyDelCount = -1;
        this._findedPos = {};
        this._tmpNotFind = null;
        this._clickHand = null;
        this._cellBgLayer = null;
        this._moveCallbackData = null;
        ComposeStatus.clear();
        if (ComposeSelect.hasInstant()) {
            ComposeSelect.getInstant().dispose();
        }
        _super.prototype.dispose.call(this);
    };
    return ComposeScene;
}(BaseScene));
__reflect(ComposeScene.prototype, "ComposeScene");
var ComposeEnums;
(function (ComposeEnums) {
    ComposeEnums[ComposeEnums["NONE"] = 0] = "NONE";
    ComposeEnums[ComposeEnums["SCENE"] = 1] = "SCENE";
    ComposeEnums[ComposeEnums["ITEM"] = 2] = "ITEM";
    ComposeEnums[ComposeEnums["PINCH"] = 3] = "PINCH";
})(ComposeEnums || (ComposeEnums = {}));
