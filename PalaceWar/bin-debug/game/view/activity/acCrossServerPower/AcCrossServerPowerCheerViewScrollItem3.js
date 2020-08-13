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
var AcCrossServerPowerCheerViewScrollItem3 = (function (_super) {
    __extends(AcCrossServerPowerCheerViewScrollItem3, _super);
    function AcCrossServerPowerCheerViewScrollItem3() {
        var _this = _super.call(this) || this;
        _this._aid = null;
        _this._code = null;
        _this._data = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerPowerCheerViewScrollItem3.prototype, "aid", {
        get: function () {
            return this._aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewScrollItem3.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerPowerCheerViewScrollItem3.prototype.getUiCode = function () {
        var code = "";
        switch (Number(this.code)) {
            default:
                code = "7";
                break;
        }
        return code;
    };
    Object.defineProperty(AcCrossServerPowerCheerViewScrollItem3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerPowerCheerViewScrollItem3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcCrossServerPowerCheerViewScrollItem3.prototype.initItem = function (index, data, itemParam) {
        this.width = 620;
        // this.height = 180;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._data = data;
        var bg = BaseBitmap.create("public_scrollitembg");
        bg.width = this.width - 20;
        bg.height = 180;
        bg.x = 10;
        this.addChild(bg);
        var titleBg = BaseBitmap.create("accrosspower_tasktitlebg");
        this.addChild(titleBg);
        titleBg.x = bg.x + bg.width / 2 - titleBg.width / 2;
        bg.y = titleBg.y + 3;
        var titleStr = LanguageManager.getlocal("taskDesc" + this._data.questType, ["" + this._data.value]);
        if (this._data.questType == 1003) {
            titleStr = LanguageManager.getlocal("acRecoveryChargeItem", ["" + this._data.value]);
        }
        var titleTxt = ComponentManager.getTextField(titleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        titleTxt.x = this.width / 2 - titleTxt.width / 2;
        titleTxt.y = titleBg.y + 10;
        this.addChild(titleTxt);
        var reward = data.getReward;
        if (data.special1) {
            reward = "1054_0_" + data.special1 + "_" + this.getUiCode() + "|" + data.getReward;
        }
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var spaceX = 5;
        var scale = 0.75;
        var startX = 15;
        var startY = 60;
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = bg.width - 165;
        this.addChild(rewardBg);
        rewardBg.height = baseWidth * scale + 16;
        rewardBg.setPosition(bg.x + 12, startY + 2);
        // rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr)
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = rewardBg.x + 5 + i * (baseWidth * scale + spaceX) + 3;
            itemicon.y = rewardBg.y + 6;
            this.addChild(itemicon);
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        //任务进度
        var taskNum = vo.getTaskNum(this._data.questType);
        var newTaskNum = data.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossserverPowerTaskValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.anchorOffsetX = this._countText.width / 2;
        this._countText.x = bg.x + bg.width - 80;
        this._countText.y = 72;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._reviceBtn.x = bg.x + bg.width - this._reviceBtn.width - 10;
        this._reviceBtn.y = bg.y + bg.height - this._reviceBtn.height - 40;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", this.goBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._goBtn.x = bg.x + bg.width - this._goBtn.width - 10;
        this._goBtn.y = bg.y + bg.height - this._goBtn.height - 40;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.setScale(0.7);
        this._reviceBM.x = bg.x + bg.width - this._reviceBM.width * 0.7 - 10;
        this._reviceBM.y = bg.y + bg.height - this._reviceBM.height * 0.7 - 20;
        this.addChild(this._reviceBM);
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcCrossServerPowerCheerViewScrollItem3.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_CROSSPOWER_GETTASKREWARD, { activeId: vo.aidAndCode, rkey: this._data.id });
    };
    /**
     * 刷新UI
     */
    AcCrossServerPowerCheerViewScrollItem3.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        var openType = this._data.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._data.questType);
        var newTaskNum = this._data.value;
        if (openType) {
            if (taskNum >= newTaskNum) {
                this._goBtn.setVisible(false);
                this._reviceBtn.setVisible(true);
            }
            else {
                this._goBtn.setVisible(true);
                this._reviceBtn.setVisible(false);
            }
        }
        else {
            this._goBtn.setVisible(false);
            this._reviceBtn.setVisible(true);
            if (taskNum >= newTaskNum) {
                this._reviceBtn.setEnable(true);
            }
            else {
                this._reviceBtn.setEnable(false);
            }
        }
        if (vo.isGetTaskReward(this._data.id)) {
            this._goBtn.setVisible(false);
            this._reviceBtn.setVisible(false);
            this._reviceBM.setVisible(true);
            this._countText.y = 52;
        }
        else {
            this._countText.y = 72;
            this._reviceBM.setVisible(false);
        }
        if (!vo.isStart) {
            this._reviceBtn.setGray(true);
        }
        if (vo.isInAcPreTime()) {
            this._goBtn.setGray(true);
        }
    };
    /**
     * 前往的Click
     */
    AcCrossServerPowerCheerViewScrollItem3.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (vo.isInAcPreTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acCrossServerPowerAcNotStart"));
            return;
        }
        if (!this._data.openType) {
            return;
        }
        var openType = this._data.openType;
        if (openType == "") {
            PlayerBottomUI.getInstance().show();
        }
        else {
            if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
                var isShowNpc = Api[openType + "VoApi"].isShowNpc();
                if (!isShowNpc) {
                    var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                    App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                    return;
                }
            }
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "alliance") {
                var allid = Api.playerVoApi.getPlayerAllianceId();
                if (!allid || allid <= 0) {
                    viewName = "AllianceCreate";
                }
            }
            if (egret.getDefinitionByName(viewName + "View")) {
                ViewController.getInstance().openView(viewName + "View");
            }
            else if (egret.getDefinitionByName(viewName + "PopupView")) {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
            else {
                if (openType == "recharge") {
                    ViewController.getInstance().openView(viewName + "Vip" + "View");
                }
            }
        }
    };
    AcCrossServerPowerCheerViewScrollItem3.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossServerPowerCheerViewScrollItem3.prototype.dispose = function () {
        this._data = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._countText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerPowerCheerViewScrollItem3;
}(ScrollListItem));
__reflect(AcCrossServerPowerCheerViewScrollItem3.prototype, "AcCrossServerPowerCheerViewScrollItem3");
//# sourceMappingURL=AcCrossServerPowerCheerViewScrollItem3.js.map