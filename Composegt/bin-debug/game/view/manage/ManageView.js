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
 * date 2017/9/25
 * @class ManageView
 */
var ManageView = (function (_super) {
    __extends(ManageView, _super);
    function ManageView() {
        var _this = _super.call(this) || this;
        _this._manageItemList = [];
        _this._isFirstRequest = true;
        _this.isRefreshing = false;
        _this._luckBoo = false;
        _this._luckysArr = [];
        _this.posCfg = {};
        _this._num1 = 0;
        _this._num2 = 0;
        _this._num3 = 0;
        _this._num4 = 0;
        _this._manageSoldierNums = [];
        _this._isCfgInit = false;
        return _this;
    }
    ManageView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE, requestData: {} };
    };
    ManageView.prototype.receiveData = function (data) {
        if (data.data) {
            if (data.data.cmd == NetRequestConst.REQUEST_MANAGE_GETAUTOANDFINANCE) {
                this.isRefreshing = false;
                if (data.data.data && data.data.data.autoRes) {
                    Api.manageVoApi.formatAutoRes(data.data.data.autoRes);
                }
                else {
                    Api.manageVoApi.resetAutoRes();
                }
                if (this._isFirstRequest && Api.switchVoApi.checkAutoResManage()) {
                    Api.manageVoApi.checkAndShowAutoReward("1");
                }
                if (this.isLoaded) {
                    this.refresh();
                }
            }
        }
        if (this._isFirstRequest) {
            this._isFirstRequest = false;
        }
    };
    ManageView.prototype.initCfg = function () {
        if (this._isCfgInit == false) {
            var curCfg = Config.SceneCfg.getSceneCfgBySceneName("manageScene");
            this._isCfgInit = true;
            if (curCfg) {
                if (curCfg.posCfg) {
                    this.posCfg = curCfg.posCfg;
                }
            }
        }
    };
    ManageView.prototype.refreshStorageCollect = function (event) {
        var ret = event.data.data.ret;
        if (ret == 0) {
            if (this._practiceNumText) {
                this._practiceNumText.text = "" + Api.practiceVoApi.geExp();
            }
        }
    };
    ManageView.prototype.initView = function () {
        Api.mainTaskVoApi.checkShowGuide();
        this.initCfg();
        ManageView.ONEKEY_BOO = false;
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE), this.refreshBtn, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE), this.refreshBtn, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT), this.refreshStorageCollect, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT, this.refresh, this);
        SoundManager.playEffect("effect_manage");
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE), this.refreshTraderRed, this);
        Api.rookieVoApi.checkNextStep();
        this.container.setPosition(this.container.x, this.getTitleButtomY());
        var bg = BaseLoadBitmap.create("managebg");
        bg.height = 1136;
        bg.setPosition(0, GameConfig.stageHeigth - bg.height - 30);
        this.addChildAt(bg, this.getChildIndex(this.container));
        var upresBg = BaseBitmap.create("manage_hengdi");
        // upresBg.width = 640
        // upresBg.height = 70;
        this.addChildToContainer(upresBg);
        /**
         * 阅历建筑
         */
        var list = Api.manageVoApi.getManageItemsVo();
        // let l=list.length;
        var maxV = list.length;
        if (Api.practiceVoApi.isPlayerPracticeEnable()) {
            var fbuilding = BaseBitmap.create("manage_buildingpractice");
            var bpos = this.posCfg["practice"];
            fbuilding.setPosition(bg.x + bpos.x, bg.y + bpos.y);
            this.addChildAt(fbuilding, this.getChildIndex(bg) + 1);
            if (Api.practiceVoApi.isPracticeBuildingUnlock()) {
                maxV = 4;
            }
        }
        for (var i = 0; i < maxV; i++) {
            this.getResIcons(i, this.container, upresBg);
        }
        var lastY = upresBg.y + upresBg.height + 10 + 20;
        if (Number(Config.ManageCfg.getCrit[0]) * Config.ManageCfg.getCrit[1] > 0) {
            var param1 = Config.ManageCfg.getCrit[0] * 100 + "%";
            var paramsStr = [param1, Config.ManageCfg.getCrit[1].toString()];
            var boomText = ComponentManager.getTextField(LanguageManager.getlocal("manageViewDesc1", paramsStr), TextFieldConst.FONTSIZE_CONTENT_SMALL);
            boomText.setPosition(10, upresBg.y + upresBg.height + 10);
            this.addChildToContainer(boomText);
            lastY = boomText.y + boomText.height;
        }
        var container = new BaseDisplayObjectContainer();
        var buttomY = 0;
        container.setPosition(0, lastY + 5);
        var firManItem = undefined;
        for (var i = 0; i < maxV; i++) {
            var item = new ManageItem(i);
            // item.setPosition(0,i*(item.height+5));
            item.setPosition(this.posCfg[item.getType()].x, this.posCfg[item.getType()].y - container.y - this.container.y + bg.y);
            item.bindCallback(this.updateResNum, this, [i]);
            if (i == 0) {
                firManItem = item;
            }
            if (i == maxV - 1) {
                container.addChildAt(item, container.getChildIndex(firManItem));
            }
            else {
                container.addChild(item);
            }
            buttomY = item.y + item.height;
            this._manageItemList.push(item);
            //主线任务引导
            if (i != 3 && !Api.rookieVoApi.isInGuiding && Api.mainTaskVoApi.getCurMainTaskId() == (i + 1).toString() && !Api.mainTaskVoApi.isCurTaskReach()) {
                ManageView._taskHand = BaseBitmap.create("guide_hand");
                // clickHand.skewY = 180;
                ManageView._taskHand.x = item.x + 100;
                ManageView._taskHand.y = item.y + 70;
                container.addChild(ManageView._taskHand);
                if (i == 0) {
                    ManageView._taskHand.x = item.x + 170;
                    ManageView._taskHand.y = item.y + 70;
                }
                else if (i == 1) {
                    ManageView._taskHand.x = item.x + 230;
                    ManageView._taskHand.y = item.y + 70;
                }
                else if (i == 2) {
                    ManageView._taskHand.x = item.x + 30;
                    ManageView._taskHand.y = item.y + 70;
                }
                egret.Tween.get(ManageView._taskHand, { loop: true })
                    .to({ y: ManageView._taskHand.y + 35, scaleX: 1.3, scaleY: 1.3 }, 500)
                    .to({ y: ManageView._taskHand.y, scaleX: 1.0, scaleY: 1.0 }, 500);
            }
        }
        this.addChildToContainer(container);
        var bottom = BaseBitmap.create("arena_bottom");
        bottom.height = 100;
        bottom.y = GameConfig.stageHeigth - this.container.y - bottom.height;
        this.addChildToContainer(bottom);
        if (Api.switchVoApi.checkAutoResManage()) {
            var rechBg = BaseBitmap.create("public_9v_bg02");
            this.addChildToContainer(rechBg);
            var reachText = ComponentManager.getTextField(LanguageManager.getlocal("manageReachUnlockDesc", [egret.toColorString(TextFieldConst.COLOR_QUALITY_ORANGE), LanguageManager.getlocal("vipDesc") + Config.ManageCfg.needVip, egret.toColorString(TextFieldConst.COLOR_WARN_GREEN2), LanguageManager.getlocal("officialTitle" + Config.ManageCfg.needLv)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
            reachText.setPosition(20, GameConfig.stageHeigth - this.container.y - reachText.height - 30);
            this.addChildToContainer(reachText);
            rechBg.width = GameConfig.stageWidth - 20;
            rechBg.height = reachText.height + 20;
            rechBg.setPosition(reachText.x - 10, reachText.y - 10);
            if (Api.manageVoApi.checkAutoRes() == false) {
                var rechargebtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "sysRecharge", function () {
                    ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
                }, this);
                rechargebtn.setPosition(container.width - rechargebtn.width - 70, reachText.y + (reachText.height - rechargebtn.height) / 2);
                this.addChildToContainer(rechargebtn);
                reachText.width = rechargebtn.x - reachText.x * 2;
                rechBg.width = reachText.width + 20;
                if (Api.switchVoApi.checkClosePay() || PlatformManager.checkHideIconByIP()) {
                    rechargebtn.visible = false;
                }
            }
        }
        ////聊天按钮相关
        var tiptxtbg = BaseBitmap.create(ResourceManager.getRes("mainui_chatbg"));
        tiptxtbg.width = GameConfig.stageWidth;
        tiptxtbg.height = 40;
        tiptxtbg.x = GameConfig.stageWidth / 2 - tiptxtbg.width / 2;
        tiptxtbg.y = GameConfig.stageHeigth - 200;
        this.addChildToContainer(tiptxtbg);
        var tiptxt = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
        tiptxt.text = LanguageManager.getlocal("manage_tiptxt");
        tiptxt.setPosition(GameConfig.stageWidth / 2 - tiptxt.width / 2, tiptxtbg.y + tiptxtbg.height / 2 - tiptxt.height / 2);
        this.addChildToContainer(tiptxt);
        //是否解锁一键经营
        if (Api.playerVoApi.getPlayerLevel() >= Config.ManageCfg.autoNeedLv) {
            var onekeyManage_btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "onekeymanageBtn", this.onekeyManageHandler, this);
            onekeyManage_btn.setPosition(GameConfig.stageWidth / 2 - onekeyManage_btn.width / 2, GameConfig.stageHeigth - 140);
            this._onekeyManage_btn = onekeyManage_btn;
            this.addChildToContainer(onekeyManage_btn);
        }
        else {
            var manageDesTex = ComponentManager.getTextField("0", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            manageDesTex.text = LanguageManager.getlocal("manageDes");
            this.addChildToContainer(manageDesTex);
            manageDesTex.setPosition(GameConfig.stageWidth / 2 - manageDesTex.width / 2, GameConfig.stageHeigth - 120);
        }
        this.refreshBtn();
        if (Api.switchVoApi.checkOpenManageTrader()) {
            var manage_trader_icon = ComponentManager.getButton("manage_trader_icon", "", this.tradeHandler, this);
            manage_trader_icon.x = GameConfig.stageWidth - manage_trader_icon.width / 2 - 60;
            manage_trader_icon.y = GameConfig.stageHeigth - manage_trader_icon.height - 10 - this.container.y;
            this._manage_trader_icon = manage_trader_icon;
            this.addChildToContainer(manage_trader_icon);
            var manage_trader_word = BaseBitmap.create("manage_trader_word");
            manage_trader_word.x = manage_trader_icon.x + manage_trader_icon.width / 2 - manage_trader_word.width / 2;
            manage_trader_word.y = manage_trader_icon.y + manage_trader_icon.height - manage_trader_word.height;
            this.addChildToContainer(manage_trader_word);
            if (Api.manageVoApi.isShowTraderRed()) {
                App.CommonUtil.addIconToBDOC(this._manage_trader_icon);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._manage_trader_icon);
            }
        }
        // "manage_trader_icon",
        //     "",
    };
    ManageView.prototype.tradeHandler = function () {
        if ((PlatformManager.checkIsWxCfg()) && Api.playerVoApi.getPlayerVipLevel() < 4) {
            App.CommonUtil.showTip(LanguageManager.getlocal("bookroom_strenthen_vip4Tip"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.MANAGETRADEPOPUPVIEW, {});
    };
    ManageView.prototype.refreshBtn = function () {
        var manageNum = Api.manageVoApi.isOnekeyManage();
        if (this._onekeyManage_btn) {
            if (manageNum == 0) {
                App.DisplayUtil.changeToNormal(this._onekeyManage_btn);
            }
            else {
                App.DisplayUtil.changeToGray(this._onekeyManage_btn);
            }
        }
    };
    ManageView.prototype.onekeyManageHandler = function () {
        var manageNum = Api.manageVoApi.isOnekeyManage();
        if (manageNum == 0) {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE), this.refreshHandler, this);
            NetManager.request(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE, {});
        }
        else if (manageNum == 1) {
            if (Api.manageVoApi.getReapSoldier() < 1) {
                App.CommonUtil.showTip(LanguageManager.getlocal("manageNoEnoughFoodMsg"));
                return;
            }
        }
        else {
            App.CommonUtil.showTip(LanguageManager.getlocal("manageDes2"));
        }
    };
    ManageView.prototype.refreshHandler = function (event) {
        if (event.data.data.data) {
            ManageView.ONEKEY_BOO = true;
            var data = event.data.data.data;
            var resName = void 0;
            var params = [];
            if (data.luckys && data.luckys[0]) {
                this._luckBoo = true;
                this._luckysArr = data.luckys;
            }
            else {
                this._luckBoo = false;
            }
            if (data.type1Num > 0) {
                resName = "public_icon2";
                var index = 0;
                this._num1 = data.type1Num;
                this.playManageAnimation(data.type1Num, resName, index);
            }
            if (data.type2Num > 0) {
                this._num2 = data.type2Num;
                resName = "public_icon3";
                var index = 1;
                this.playManageAnimation(data.type2Num, resName, index);
            }
            if (data.type3Num > 0) {
                this._num3 = data.type3Num;
                this._manageSoldierNums = data.manageSoldierNums;
                resName = "public_icon4";
                var index = 2;
                var currNum = (Api.manageVoApi.getReapSoldier().toString());
                this.playManageAnimation(data.type3Num, resName, index);
            }
            if (data.type4Num > 0) {
                this._num4 = data.type4Num;
                // this._manageSoldierNums = data.manageSoldierNums;
                resName = "public_icon12";
                var index = 3;
                Api.practiceVoApi.setBatchNum(this._num4);
                // var currNum =(Api.manageVoApi.getReapSoldier().toString());
                this.playManageAnimation(data.type4Num, resName, index);
            }
            this.refresh();
        }
    };
    ManageView.prototype.playManageAnimation = function (num, resName, index) {
        if (resName === void 0) { resName = ''; }
        if (index === void 0) { index = 0; }
        var _point = this._manageItemList[index].getManageBtnPoint();
        App.CommonUtil.showCollectEffect(resName, _point, ManageView.flyEndPoint[index], function () {
            if (index == 0) {
                this.updateResNum(index, num, this._luckBoo, true);
            }
            else {
                this.updateResNum(index, num, this._luckBoo, false);
            }
        }, this);
    };
    ManageView.prototype.playLucky = function () {
        var boomPic = BaseBitmap.create("manage_boomtext");
        boomPic.anchorOffsetX = boomPic.width / 2;
        boomPic.anchorOffsetY = boomPic.height / 2;
        var picX = 500;
        var picY = 250;
        boomPic.setPosition(picX, picY);
        LayerManager.msgLayer.addChild(boomPic);
        egret.Tween.get(boomPic).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 70).to({ y: picY - 50, alpha: 0.7 }, 600).call(function (boomPic) {
            boomPic.dispose();
        }.bind(this, boomPic), this);
        App.CommonUtil.showGodbless("manage");
    };
    ManageView.prototype.getResIcons = function (index, container, positionObj) {
        var resbgPath = "public_hb_bg01";
        var diffX = 200;
        if (Api.practiceVoApi.isPlayerPracticeEnable()) {
            resbgPath = "public_hb_bg01";
            diffX = 160;
        }
        var resBg = BaseBitmap.create(resbgPath);
        resBg.width = 180;
        resBg.setPosition(20 + index * diffX, positionObj.y + (positionObj.height - resBg.height) / 2);
        container.addChild(resBg);
        var resName;
        var resNum;
        var type;
        if (index == 0) {
            resName = "public_icon2";
            resNum = Api.playerVoApi.getPlayerGoldStr();
            type = "gold";
        }
        else if (index == 1) {
            resName = "public_icon3";
            resNum = Api.playerVoApi.getFoodStr();
            type = "food";
        }
        else if (index == 2) {
            resName = "public_icon4";
            resNum = Api.playerVoApi.getSoldierStr();
            type = "soldier";
        }
        else if (index == 3) {
            resName = "public_icon12";
            resNum = Api.practiceVoApi.geExp() + "";
            type = "practice";
        }
        var resIcon = BaseBitmap.create(resName);
        resIcon.setPosition(resBg.x, resBg.y + (resBg.height - resIcon.height) / 2 - 3);
        container.addChild(resIcon);
        var resNumText = ComponentManager.getTextField(resNum.toString(), TextFieldConst.FONTSIZE_CONTENT_SMALL);
        resNumText.setPosition(resIcon.x + resIcon.width + 10, resBg.y + (resBg.height - resNumText.height) / 2);
        container.addChild(resNumText);
        this["_" + type + "NumText"] = resNumText;
        if (ManageView.flyEndPoint.length < 1) {
            egret.callLater(function () {
                ManageView.flyEndPoint.push(resBg.localToGlobal(0, 0));
            }, this);
        }
    };
    ManageView.prototype.updateResNum = function (index, num, isBoom, isOnekeyBoo) {
        var _this = this;
        if (!this._foodNumText) {
            return;
        }
        if (!isNaN(index)) {
            var type = "practice";
            if (index != 3) {
                var list = Api.manageVoApi.getManageItemsVo();
                type = list[index].type;
            }
            var refreshText = this["_" + type + "NumText"];
            if (refreshText) {
                var resName = void 0;
                if (index == 0) {
                    resName = "itemicon2";
                }
                else if (index == 1) {
                    resName = "itemicon3";
                }
                else if (index == 2) {
                    resName = "itemicon4";
                }
                else if (index == 3) {
                    resName = "public_icon12";
                }
                var lastValue = Number(refreshText.text);
                if (type == "practice") {
                    refreshText.text = "" + Api.practiceVoApi.geExp();
                }
                else if (type == "gold") {
                    refreshText.text = Api.playerVoApi.getPlayerGoldStr().toString();
                }
                else if (type == "soldier") {
                    refreshText.text = Api.playerVoApi.getSoldierStr();
                }
                else {
                    refreshText.text = Api.playerVoApi["get" + App.StringUtil.firstCharToUper(type)]().toString();
                }
                var offValue = 0;
                if (!isNaN(num)) {
                    offValue = num;
                }
                else {
                    offValue = Number(refreshText.text) - lastValue;
                }
                if (isBoom) {
                    offValue = Math.floor(offValue / Config.DailyluckCfg.getManageTimes());
                    if (isOnekeyBoo) {
                        if (this._luckysArr.length >= 1) {
                            var num_1 = 0;
                            var ths = this;
                            var timerNum_1 = egret.setInterval(function () {
                                num_1 += 1;
                                _this.playLucky();
                                if (num_1 >= _this._luckysArr.length) {
                                    egret.clearInterval(timerNum_1);
                                }
                            }, ths, 1500, 1);
                        }
                    }
                }
                var showValue = Number(offValue) > 0 ? "+" + offValue : String(offValue);
                var actions = new Array();
                if (isBoom && index == 0) {
                    actions = [];
                    var showValue_1 = Api.manageVoApi.getReapGold().toString();
                    if (this._luckysArr && this._luckysArr.length >= 1) {
                        for (var index = 0; index < this._luckysArr.length; index++) {
                            for (var j = 0; j < this._luckysArr[index]; j++) {
                                actions.push({ icon: resName, tipMessage: showValue_1 });
                            }
                        }
                        //加上原有非暴击应该飘浮的次数
                        for (var i = 0; i < this._num1; i++) {
                            actions.push({ icon: resName, tipMessage: showValue_1 });
                        }
                    }
                    else if (isBoom) {
                        actions = [];
                        var showValue_2 = Api.manageVoApi.getReapGold().toString();
                        //单独暴击
                        for (var j = 0; j < 10; j++) {
                            actions.push({ icon: resName, tipMessage: showValue_2 });
                        }
                    }
                }
                else {
                    actions = [];
                    // showValue 飘多少次
                    if (ManageView.ONEKEY_BOO == true) {
                        var currNum = "";
                        if (index == 0) {
                            currNum = (Api.manageVoApi.getReapGold().toString());
                            for (var j = 0; j < this._num1; j++) {
                                actions.push({ icon: resName, tipMessage: currNum });
                            }
                        }
                        if (index == 1) {
                            currNum = (Api.manageVoApi.getReapFood().toString());
                            for (var j = 0; j < this._num2; j++) {
                                actions.push({ icon: resName, tipMessage: currNum });
                            }
                        }
                        else if (index == 2) {
                            //_manageSoldierNums //每次士兵次数
                            for (var j = 0; j < this._num3; j++) {
                                if (this._manageSoldierNums[j]) {
                                    currNum = this._manageSoldierNums[j].toString();
                                }
                                actions.push({ icon: resName, tipMessage: currNum });
                            }
                        }
                        else if (index == 3) {
                            currNum = "" + num;
                            actions.push({ icon: resName, tipMessage: currNum });
                        }
                    }
                    else {
                        actions.push({ icon: resName, tipMessage: showValue });
                    }
                }
                App.CommonUtil.playRewardFlyAction(actions, refreshText.localToGlobal(0 + 30, 0), 600);
            }
        }
        else {
            this._goldNumText.text = Api.playerVoApi.getPlayerGoldStr().toString();
            this._soldierNumText.text = Api.playerVoApi.getSoldierStr().toString();
        }
        this._foodNumText.text = Api.playerVoApi.getFoodStr().toString();
        if (this._practiceNumText) {
            this._practiceNumText.text = Api.practiceVoApi.geExp().toString();
        }
    };
    ManageView.prototype.refresh = function () {
        this.updateResNum();
        var l = this._manageItemList.length;
        for (var i = 0; i < l; i++) {
            this._manageItemList[i].refresh();
        }
        var manageNum = Api.manageVoApi.isOnekeyManage();
        if (this._onekeyManage_btn) {
            this.refreshBtn();
        }
    };
    ManageView.prototype.tick = function () {
        var l = this._manageItemList.length;
        for (var i = 0; i < l; i++) {
            var tmpResult = this._manageItemList[i].tick();
            if (tmpResult && this.isRefreshing == false) {
                this.isRefreshing = true;
                var reqData = this.getRequestData();
                this.request(reqData.requestType, reqData.requestType);
            }
        }
    };
    ManageView.prototype.hide = function () {
        if (Api.rookieVoApi.isInGuiding) {
            // Api.rookieVoApi.checkWaitingGuide();
            Api.rookieVoApi.checkNextStep();
        }
        _super.prototype.hide.call(this);
    };
    ManageView.prototype.showHand = function () {
        this._clickHand = BaseBitmap.create("guide_hand");
        this._clickHand.skewY = 180;
        this._clickHand.x = 620;
        this._clickHand.y = 50;
        this.addChild(this._clickHand);
        egret.Tween.get(this._clickHand, { loop: true })
            .to({ scaleX: 0.9, scaleY: 0.9 }, 500)
            .to({ scaleX: 1, scaleY: 1 }, 500);
    };
    ManageView.prototype.refreshTraderRed = function (event) {
        var ret = event.data.data.ret;
        if (ret == 0 && this._manage_trader_icon) {
            if (Api.manageVoApi.isShowTraderRed()) {
                App.CommonUtil.addIconToBDOC(this._manage_trader_icon);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._manage_trader_icon);
            }
            this._goldNumText.text = Api.playerVoApi.getPlayerGoldStr();
            this._soldierNumText.text = Api.playerVoApi.getSoldierStr();
            this._foodNumText.text = Api.playerVoApi.getFoodStr();
        }
    };
    ManageView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "guide_hand",
            // "manage_foodname","manage_goldname","manage_namebg","manage_soldiername","manage_boomtext","btn_manage_normal","btn_manage_red",
            "arena_bottom",
            "guide_hand",
            // "manage_recoverytxt","manage_managetxt","manage_waittime",
            // "manage_buildingpractice","manage_practicename",
            // "manage_practice_collect","manage_practice_full",
            "activity_dazhe_01",
            // ,"manage_hengdi","manage_dix",
            "manage_trader_icon",
            "manage_trader_word",
            "manage_boomtext",
        ]);
    };
    ManageView.prototype.dispose = function () {
        Api.mainTaskVoApi.hideGuide();
        if (this._clickHand) {
            egret.Tween.removeTweens(this._clickHand);
            this._clickHand = null;
        }
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND, this.showHand, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BATCHDEALFINANCE), this.refreshHandler, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE), this.refreshBtn, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE), this.refreshBtn, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT), this.refreshStorageCollect, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_BUYFINANCE), this.refreshTraderRed, this);
        this._soldierNumText = null;
        this._goldNumText = null;
        this._foodNumText = null;
        this._practiceNumText = null;
        this._isFirstRequest = true;
        this.isRefreshing = false;
        this._manageItemList.length = 0;
        this._onekeyManage_btn = null;
        this._luckBoo = false;
        this._luckysArr = [];
        this._num3 = 0;
        this._num2 = 0;
        this._num1 = 0;
        this._manageSoldierNums = [];
        ManageView._taskHand = null;
        this._clickHand = null;
        this._isCfgInit = false;
        this._manage_trader_icon = null;
        _super.prototype.dispose.call(this);
    };
    ManageView.flyEndPoint = [];
    ManageView.ONEKEY_BOO = false;
    return ManageView;
}(CommonView));
__reflect(ManageView.prototype, "ManageView");
var ManageItem = (function (_super) {
    __extends(ManageItem, _super);
    function ManageItem(index) {
        var _this = _super.call(this) || this;
        _this.init(index);
        return _this;
    }
    ManageItem.prototype.bindCallback = function (callback, callbackThisObj, callbackParams) {
        this._bindCallback = callback;
        this._bindCallbackThisObj = callbackThisObj;
        this._bindCallbackParams = callbackParams;
    };
    ManageItem.prototype.init = function (index) {
        this.addTouch(this.onNPCTouchHandler, this, null, true);
        this._index = index;
        /**
         * 修身
         */
        if (this._index == 3) {
            // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refresh,this);
        }
        else {
            App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE), this.refresh, this);
            var msgEventType = NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE);
            App.MessageHelper.addEventListener(msgEventType, this.refresh, this);
        }
        if (!this._manageItemVo) {
            if (this._index < 3) {
                this._manageItemVo = Api.manageVoApi.getManageItemsVo()[index];
            }
            else {
                this._manageItemVo = new ManageItemVo();
                this._manageItemVo.type = "practice";
                this._manageItemVo.num = Api.practiceVoApi.getStorageInfo().num;
                // this._manageItemVo.maxNum = 0;
            }
        }
        var leftX = 40;
        var bg = BaseLoadBitmap.create("managenpc" + this._manageItemVo.type);
        // bg.width=628;
        bg.setScale(4);
        bg.alpha = 0;
        bg.addTouchTap;
        this.addChild(bg);
        this._npc = bg;
        var txtBg = BaseBitmap.create("manage_dix");
        txtBg.setPosition(80, 200);
        if (index == 1) {
            txtBg.setPosition(140, 120);
        }
        if (index == 2) {
            txtBg.setPosition(10, 120);
        }
        if (index == 3) {
            txtBg.setPosition(20, 100);
        }
        this.addChild(txtBg);
        var nameBg = BaseBitmap.create("activity_dazhe_01");
        if (PlatformManager.checkIsTextHorizontal()) {
            // if(index != 2){
            // 	txtBg.y = txtBg.y +35;
            // }
            nameBg.setPosition(txtBg.x + 5, txtBg.y - 29);
            // nameBg.setPosition(txtBg.x + txtBg.width / 2 - nameBg.width/2,txtBg.y-35);
        }
        else {
            nameBg.setPosition(txtBg.x - 5, txtBg.y - 2);
        }
        this.addChild(nameBg);
        var nameUrl = "manage_" + this._manageItemVo.type + "name";
        var namePic = BaseBitmap.create(nameUrl);
        if (PlatformManager.checkIsTextHorizontal()) {
            namePic.setPosition(nameBg.x + (nameBg.width - namePic.width) / 2, nameBg.y + (nameBg.height - namePic.height) / 2);
        }
        else {
            namePic.setPosition(nameBg.x + (nameBg.width - namePic.width) / 2, nameBg.y + (nameBg.height - namePic.height) / 2 - 17);
        }
        this.addChild(namePic);
        var textSpaceY = 10;
        txtBg.height = 76;
        var showNumStr;
        var txtMaxW = 0;
        if (index == 0) {
            showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
        }
        else if (index == 1) {
            showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics());
        }
        else if (index == 2) {
            showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getCharm());
        }
        else if (index == 3) {
            showNumStr = "";
        }
        var curText = ComponentManager.getTextField(LanguageManager.getlocal("manage" + this._manageItemVo.type + "CurName", [showNumStr]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsTextHorizontal()) {
            curText.setPosition(txtBg.x + 15, txtBg.y + textSpaceY + 5);
        }
        else {
            curText.setPosition(txtBg.x + nameBg.width, txtBg.y + textSpaceY + 5);
        }
        this.addChild(curText);
        if (curText.width > txtMaxW) {
            txtMaxW = curText.width;
        }
        this._curText = curText;
        var willStr;
        var willParams = [];
        if (index == 0) {
            willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapGold()));
            willStr = LanguageManager.getlocal("manageWillGetRes", willParams);
        }
        else if (index == 1) {
            willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapFood()));
            willStr = LanguageManager.getlocal("manageWillGetRes", willParams);
        }
        else if (index == 2) {
            willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapSoldier()));
            willStr = LanguageManager.getlocal("manageWillGetSoldier", willParams);
        }
        else if (index == 3) {
            // willParams.push(Api.manageVoApi.getReapSoldier().toString());
            // willStr=LanguageManager.getlocal("manageWillGetSoldier",willParams);
            willParams.push("");
            willStr = "" + Api.practiceVoApi.getRealSpd();
        }
        var willText = ComponentManager.getTextField(willStr, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
        willText.setPosition(curText.x, curText.y + curText.height + textSpaceY);
        this.addChild(willText);
        this._willText = willText;
        if (willText.width > txtMaxW) {
            txtMaxW = willText.width;
        }
        if (index == 2) {
            var needText = ComponentManager.getTextField(LanguageManager.getlocal("manageCostFood", [App.StringUtil.changeIntToText(Api.manageVoApi.getNeedFood())]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_RED2);
            needText.setPosition(curText.x, willText.y + willText.height + textSpaceY);
            this.addChild(needText);
            this._needText = needText;
            if (needText.width > txtMaxW) {
                txtMaxW = needText.width;
            }
            txtBg.height = 105;
        }
        /**
         * 修身的特殊处理
         */
        if (index == 3) {
            willText.textColor = TextFieldConst.COLOR_LIGHT_YELLOW;
            willText.x = curText.x + curText.width / 2 - willText.width / 2;
        }
        if (PlatformManager.checkIsTextHorizontal()) {
            txtBg.width = txtMaxW + 30;
        }
        else {
            txtBg.width = txtMaxW + nameBg.width + 15;
        }
        var btn = ComponentManager.getButton("btn_manage_normal", "", function () { }, this, [index]);
        // btn.setPosition(txtBg.x+(txtBg.width-btn.width)/2,-btn.height+30);
        // this.addChild(btn);
        this._manageBtn = btn;
        var btnContainer = new BaseDisplayObjectContainer();
        btnContainer.addChild(btn);
        btn.setPosition(-btn.width / 2, -btn.height);
        btnContainer.setPosition(txtBg.x + txtBg.width / 2, 30);
        if (this._index == 0) {
            btnContainer.x = txtBg.x + txtBg.width / 2 + 10;
            btnContainer.y = 100;
        }
        if (this._index == 1) {
            btnContainer.x = txtBg.x + txtBg.width / 2 + 10;
        }
        else if (this._index == 2) {
            if (PlatformManager.checkIsTextHorizontal()) {
                btnContainer.x = txtBg.x + txtBg.width / 2 - 40;
            }
            else {
                btnContainer.x = txtBg.x + txtBg.width / 2 - 50;
            }
        }
        else if (this._index == 3) {
            btnContainer.y = 50;
        }
        this.addChild(btnContainer);
        this._btnContainer = btnContainer;
        var waitBg = BaseBitmap.create("manage_waittime");
        waitBg.setPosition(btnContainer.x - btn.width / 2 - 30, btn.y + btn.height + 20);
        if (this._index == 0) {
            waitBg.y = waitBg.y + 80;
        }
        if (this._index == 2) {
            waitBg.x = waitBg.x + 20;
        }
        this.addChild(waitBg);
        this._waitTimeBg = waitBg;
        this._leftTimeText = ComponentManager.getTextField(this._manageItemVo.num + "/" + this._manageItemVo.maxNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WHITE);
        this._leftTimeText.setPosition(waitBg.x + 53, waitBg.y + (waitBg.height - this._leftTimeText.height) / 2 + 1);
        // this._leftTimeText.bindData=txtBg.x+txtBg.width/2;
        this.addChild(this._leftTimeText);
        this.setManageStatus();
        this.tick();
    };
    ManageItem.prototype.setManageStatus = function () {
        if (this._index == 3) {
            this._waitTimeBg.visible = false;
            this._leftTimeText.visible = false;
            if (this._btnContainer && this._btnContainer.name != "add") {
                egret.Tween.removeTweens(this._btnContainer);
                this._btnContainer.name = "add";
                this._btnContainer.setScale(1);
                this._btnContainer.rotation = 0;
                egret.Tween.get(this._btnContainer, { loop: true }).to({ rotation: 10 }, 100).to({ rotation: -8 }, 200).to({ rotation: 5 }, 130).to({ rotation: -3 }, 80).to({ rotation: 0 }, 30).wait(500);
            }
            var statusResName_1 = "manage_practice_collect";
            if (Api.practiceVoApi.isStoregeFull()) {
                statusResName_1 = "manage_practice_full";
            }
            if (!this._manageStatusBmp) {
                this._manageStatusBmp = BaseBitmap.create(statusResName_1);
                this._manageStatusBmp.x = this._manageBtn.width / 2 - this._manageStatusBmp.width / 2 - 2;
                this._manageStatusBmp.y = this._manageBtn.height / 2 - this._manageStatusBmp.height / 2 - 5;
                this._manageBtn.addChild(this._manageStatusBmp);
            }
            return;
        }
        var statusResName;
        if (this._manageItemVo.num > 0) {
            if (this._btnContainer && this._btnContainer.name != "add") {
                egret.Tween.removeTweens(this._btnContainer);
                this._btnContainer.name = "add";
                this._btnContainer.setScale(1);
                this._btnContainer.rotation = 0;
                egret.Tween.get(this._btnContainer, { loop: true }).to({ rotation: 10 }, 100).to({ rotation: -8 }, 200).to({ rotation: 5 }, 130).to({ rotation: -3 }, 80).to({ rotation: 0 }, 30).wait(500);
            }
            statusResName = "manage_managetxt";
            if (this._waitTimeBg) {
                this._waitTimeBg.visible = false;
                this._leftTimeText.visible = false;
            }
            if (this._btnRedBtn) {
                this._btnRedBtn.visible = false;
            }
        }
        else {
            if (ManageView._taskHand) {
                ManageView._taskHand.visible = false;
            }
            if (this._btnContainer && this._btnContainer.name != "scale") {
                egret.Tween.removeTweens(this._btnContainer);
                this._btnContainer.name = "scale";
                this._btnContainer.setScale(1);
                this._btnContainer.rotation = 0;
                egret.Tween.get(this._btnContainer, { loop: true }).to({ scaleX: 1.05, scaleY: 1.05 }, 500).to({ scaleX: 0.95, scaleY: 0.95 }, 1000).to({ scaleX: 1, scaleY: 1 }, 300);
            }
            if (this._waitTimeBg) {
                this._waitTimeBg.visible = true;
                this._leftTimeText.visible = true;
            }
            statusResName = "manage_recoverytxt";
            if (!this._btnRedBtn) {
                this._btnRedBtn = ComponentManager.getButton("btn_manage_red", "", function () { }, this);
                this._manageBtn.addChildAt(this._btnRedBtn, 1);
            }
            else {
                this._btnRedBtn.visible = true;
            }
        }
        if (!this._manageStatusBmp) {
            this._manageStatusBmp = BaseBitmap.create(statusResName);
            this._manageBtn.addChild(this._manageStatusBmp);
        }
        else {
            this._manageStatusBmp.texture = ResourceManager.getRes(statusResName);
        }
        if (this._manageItemVo.num > 0) {
            this._manageStatusBmp.setPosition((this._manageBtn.width - this._manageStatusBmp.width) / 2 + 2, 45);
        }
        else {
            this._manageStatusBmp.setPosition((this._manageBtn.width - this._manageStatusBmp.width) / 2 + 2, 30);
        }
        if (!this._leftNumText) {
            this._leftNumText = ComponentManager.getTextField(this._manageItemVo.num + "/" + this._manageItemVo.maxNum, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_GREEN2);
            this._manageBtn.addChild(this._leftNumText);
        }
        else {
            this._leftNumText.text = this._manageItemVo.num + "/" + this._manageItemVo.maxNum;
        }
        this._leftNumText.setPosition((this._manageBtn.width - this._leftNumText.width) / 2 + 2, this._manageStatusBmp.y - this._leftNumText.height + 2);
        this._leftNumText.visible = this._manageItemVo.num > 0;
    };
    ManageItem.prototype.onNPCTouchHandler = function (e) {
        if (e.type != egret.TouchEvent.TOUCH_BEGIN && e.type != egret.TouchEvent.TOUCH_CANCEL && e.type != egret.TouchEvent.TOUCH_END) {
            return;
        }
        if (e.type == egret.TouchEvent.TOUCH_BEGIN) {
            this._npc.alpha = 0.3;
        }
        else if (e.type == egret.TouchEvent.TOUCH_CANCEL) {
            this._npc.alpha = 0;
        }
        if (e.type == egret.TouchEvent.TOUCH_END) {
            this._npc.alpha = 0;
            this.manageHandler(this._index);
        }
    };
    ManageItem.prototype.getManageBtnPoint = function () {
        var _point = new egret.Point();
        if (this._manageBtn) {
            _point = this._manageBtn.localToGlobal(this._manageBtn.width / 2, this._manageBtn.height / 2);
        }
        return _point;
    };
    ManageItem.prototype.tick = function () {
        if (this._index == 3) {
            if (this._manageBtn) {
                this._manageBtn.visible = Api.practiceVoApi.isCollectEnable();
            }
            if (this._manageStatusBmp) {
                var statusResName = "manage_practice_collect";
                if (Api.practiceVoApi.isStoregeFull()) {
                    statusResName = "manage_practice_full";
                }
                this._manageStatusBmp.texture = ResourceManager.getRes(statusResName);
            }
            return false;
        }
        if (this._manageItemVo.need_time > 0) {
            if (this._manageItemVo.num < 1) {
                var leftTimt = Math.max(0, this._manageItemVo.need_time + this._manageItemVo.st - GameData.serverTime);
                if (leftTimt >= 0) {
                    this._leftTimeText.text = App.DateUtil.getFormatBySecond(leftTimt);
                    // this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
                }
            }
            if (GameData.serverTime - this._manageItemVo.need_time - this._manageItemVo.st >= 0) {
                var result = false;
                //请求刷新
                if (this._manageItemVo.num >= this._manageItemVo.maxNum) {
                    if (Api.manageVoApi.checkAutoRes()) {
                        result = true;
                    }
                    else {
                        result = false;
                    }
                }
                else {
                    result = true;
                }
                return result;
            }
        }
        return false;
    };
    ManageItem.prototype.refresh = function (event) {
        if (event) {
            if (event.type == NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE) && ManageItem._selectIndex == this._index) {
                Api.rookieVoApi.checkNextStep();
                var resName = void 0;
                var picX = 500;
                var picY = 0;
                if (this._index == 0) {
                    resName = "public_icon2";
                    picY = 350;
                }
                else if (this._index == 1) {
                    resName = "public_icon3";
                    picY = 580;
                }
                else if (this._index == 2) {
                    resName = "public_icon4";
                    picY = 820;
                }
                var eData = event.data ? event.data.data : null;
                if (eData && eData.data) {
                    eData = eData.data;
                }
                var params = [];
                if (this._bindCallbackParams) {
                    params = params.concat(this._bindCallbackParams);
                    if (eData) {
                        params.push(eData.typeNum);
                    }
                }
                if (eData && eData.lucky) {
                    params.push(true);
                    // let boomTxt:BaseTextField=ComponentManager.getTextField("+"+eData.typeNum,TextFieldConst.FONTSIZE_TITLE_BIG,TextFieldConst.COLOR_QUALITY_GREEN);
                    // boomTxt.anchorOffsetX=boomTxt.width/2;
                    // boomTxt.anchorOffsetY=boomTxt.height/2;
                    // boomTxt.setPosition(GameConfig.stageWidth/2,GameConfig.stageHeigth/2)
                    var boomPic = BaseBitmap.create("manage_boomtext");
                    boomPic.anchorOffsetX = boomPic.width / 2;
                    boomPic.anchorOffsetY = boomPic.height / 2;
                    boomPic.setPosition(picX, picY);
                    LayerManager.msgLayer.addChild(boomPic);
                    egret.Tween.get(boomPic).to({ scaleX: 1.1, scaleY: 1.1 }, 50).to({ scaleX: 1, scaleY: 1 }, 70).to({ y: picY - 50, alpha: 0.7 }, 600).call(function (boomPic) {
                        boomPic.dispose();
                    }.bind(this, boomPic), this);
                    App.CommonUtil.showGodbless("manage");
                }
                App.CommonUtil.showCollectEffect(resName, this._manageBtn.localToGlobal(this._manageBtn.width / 2, this._manageBtn.height / 2), ManageView.flyEndPoint[this._index], this._bindCallback, this._bindCallbackThisObj, params);
            }
            else if (event.type == NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE)) {
                //使用征收令
            }
        }
        var ret = (event ? event.data : { ret: true }).ret;
        var eventType = event ? event.type : null;
        if (ret) {
            if (eventType != NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE)) {
                var resNum = 0;
                if (this._index < 3) {
                    resNum = Api.manageVoApi["getAuto" + App.StringUtil.firstCharToUper(Api.manageVoApi.getManageItemsVo()[this._index].type)]();
                }
                else {
                    resNum = Api.practiceVoApi.getBatchNum();
                    egret.log("resNum >>>>>> " + resNum);
                    Api.practiceVoApi.setBatchNum(0);
                }
                if (resNum > 0) {
                    var resName = void 0;
                    if (this._index == 0) {
                        resName = "public_icon2";
                    }
                    else if (this._index == 1) {
                        resName = "public_icon3";
                    }
                    else if (this._index == 2) {
                        resName = "public_icon4";
                    }
                    else if (this._index == 3) {
                        resName = "public_icon12";
                    }
                    var params = [];
                    if (this._bindCallbackParams) {
                        params = params.concat(this._bindCallbackParams);
                    }
                    params.push(resNum);
                    App.CommonUtil.showCollectEffect(resName, this._manageBtn.localToGlobal(this._manageBtn.width / 2, this._manageBtn.height / 2), ManageView.flyEndPoint[this._index], this._bindCallback, this._bindCallbackThisObj, params);
                }
            }
            if (this._index == 3) {
                return;
            }
            if (this._manageItemVo.num > 0) {
                this._leftTimeText.text = this._manageItemVo.num + "/" + this._manageItemVo.maxNum;
                // this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
            }
            else {
                var leftTimt = Math.max(0, this._manageItemVo.need_time + this._manageItemVo.st - GameData.serverTime);
                this._leftTimeText.text = App.DateUtil.getFormatBySecond(leftTimt);
                // this._leftTimeText.x=this._leftTimeText.bindData-this._leftTimeText.width/2
            }
            var showNumStr = "";
            if (this._index == 0) {
                showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getInte());
            }
            else if (this._index == 1) {
                showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getPolitics());
            }
            else if (this._index == 2) {
                showNumStr = App.StringUtil.changeIntToText(Api.playerVoApi.getCharm());
            }
            // else if(this._index==3)
            // {
            // 	showNumStr = "100";
            // }
            this._curText.text = LanguageManager.getlocal("manage" + this._manageItemVo.type + "CurName", [showNumStr]);
            var willStr = void 0;
            var willParams = [];
            if (this._index == 0) {
                willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapGold()));
                willStr = LanguageManager.getlocal("manageWillGetRes", willParams);
            }
            else if (this._index == 1) {
                willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapFood()));
                willStr = LanguageManager.getlocal("manageWillGetRes", willParams);
            }
            else if (this._index == 2) {
                willParams.push(App.StringUtil.changeIntToText(Api.manageVoApi.getReapSoldier()));
                willStr = LanguageManager.getlocal("manageWillGetSoldier", willParams);
            }
            // else if(this._index==3)
            // {
            // 	willParams.push(Api.manageVoApi.getReapSoldier().toString());
            // 	willStr=LanguageManager.getlocal("manageWillGetPractice",willParams);
            // }
            this._willText.text = willStr;
            if (this._needText) {
                var realNeedNum = Math.min(Api.manageVoApi.getNeedFood(), Api.playerVoApi.getFood());
                this._needText.text = LanguageManager.getlocal("manageCostFood", [App.StringUtil.changeIntToText(realNeedNum)]);
            }
            this.setManageStatus();
        }
    };
    ManageItem.prototype.recoveryHandler = function (index) {
        var itemId = Api.manageVoApi.getNeedItem();
        var hasNum = Api.itemVoApi.getItemNumInfoVoById(Number(itemId));
        if (hasNum > 0) {
            if (hasNum < 5) {
                // NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});
                var extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
                if (extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW, { type: "a", index: this._index, itemId: itemId, hasNum: hasNum, callback: null, target: this });
                }
                else {
                    NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE, { type: this._index + 1, num: 1 });
                }
                // if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
                // 	 NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE,{type:this._index+1,num:1});
                // } else {
                // 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
                // 	if(extrashare && extrashare.finance != 1){
                // 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,handler:this});
                // 	}
                // }
            }
            else {
                var maxNum = this._manageItemVo.maxNum;
                var extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
                if (extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()) {
                    ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW, { type: "a", index: this._index, itemId: itemId, hasNum: hasNum, maxNum: maxNum, callback: this.usePropHandler, target: this });
                }
                else {
                    ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW, { itemId: itemId, hasNum: hasNum, callback: this.usePropHandler, handler: this });
                }
                // if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
                // 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMUSEPOPUPVIEW,{itemId:itemId,hasNum:hasNum,callback:this.usePropHandler,handler:this});
                // } else {
                // 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
                // 	if(extrashare && extrashare.finance != 1){
                // 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,maxNum:maxNum,callback:this.usePropHandler,handler:this});
                // 	}
                // }
            }
        }
        else {
            // App.CommonUtil.showTip(LanguageManager.getlocal("itemNumNotEnough"));
            var extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
            if (extrashare && extrashare.finance != 1 && Api.switchVoApi.checkOpenShareFinanceAndRecover()) {
                ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW, { type: "a", index: this._index, itemId: itemId, hasNum: hasNum, callback: null, target: this });
            }
            else {
                ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW, { itemId: itemId, callback: null, handler: this });
            }
            // if(!Api.switchVoApi.checkOpenShareFinanceAndRecover()){
            // 	ViewController.getInstance().openView(ViewConst.POPUP.ITEMJUMPPOPUPVIEW,{itemId:itemId,callback:null,handler:this});
            // } else {
            // 	let extrashare = Api.otherInfoVoApi.getOtherInfo().info.extrashare;
            // 	if(extrashare && extrashare.finance != 1){
            // 		ViewController.getInstance().openView(ViewConst.POPUP.SHARERECOVERPOPUPVIEW,{type:"a",index:this._index,itemId:itemId,hasNum:hasNum,callback:null,handler:this});
            // 	}
            // }
        }
    };
    ManageItem.prototype.usePropHandler = function (num) {
        NetManager.request(NetRequestConst.REQUEST_MANAGE_ADDFINANCE, { type: this._index + 1, num: num });
    };
    ManageItem.prototype.manageHandler = function (index) {
        if (this._index == 3) {
            ViewController.getInstance().openView(ViewConst.POPUP.PRACTICESTORAGEPOPIPVIEW);
            /**
             * 修身
             */
            // if(Api.practiceVoApi.isCollectEnable())
            // {
            // NetManager.request(NetRequestConst.REQUEST_REQUEST_COLLECT,{});
            // }
            return;
        }
        if (this._manageItemVo.num < 1) {
            this.recoveryHandler(index);
        }
        else {
            if (index == 2) {
                if (Api.manageVoApi.getReapSoldier() < 1) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("manageNoEnoughFoodMsg"));
                    return;
                }
            }
            ManageItem._selectIndex = index;
            ManageView.ONEKEY_BOO = false;
            NetManager.request(NetRequestConst.REQUEST_MANAGE_DEALFINANCE, { type: index + 1 });
            PlatformManager.analytics37Point("custom_active", "housekeeping", 1);
        }
    };
    ManageItem.prototype.getType = function () {
        if (this._manageItemVo) {
            return this._manageItemVo.type;
        }
        return null;
    };
    ManageItem.prototype.dispose = function () {
        this._manageItemVo = null;
        this._leftTimeText = null;
        this._curText = null;
        this._willText = null;
        this._needText = null;
        this._manageBtn = null;
        this._index = NaN;
        this._bindCallback = null;
        this._bindCallbackThisObj = null;
        this._bindCallbackParams = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_REFRESH_COUNT, this.refresh, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_DEALFINANCE), this.refresh, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_MANAGE_ADDFINANCE), this.refresh, this);
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_REQUEST_COLLECT),this.refresh,this);
        ManageView.ONEKEY_BOO = false;
        this._manageStatusBmp = null;
        this._leftNumText = null;
        this._npc = null;
        this._waitTimeBg = null;
        this._btnContainer = null;
        this._btnRedBtn = null;
        _super.prototype.dispose.call(this);
    };
    ManageItem._selectIndex = -1;
    return ManageItem;
}(BaseDisplayObjectContainer));
__reflect(ManageItem.prototype, "ManageItem");
