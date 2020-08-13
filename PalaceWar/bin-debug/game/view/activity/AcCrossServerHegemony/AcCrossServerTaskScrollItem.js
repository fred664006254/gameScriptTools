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
var AcCrossServerTaskScrollItem = (function (_super) {
    __extends(AcCrossServerTaskScrollItem, _super);
    function AcCrossServerTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._itemParam = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "aid", {
        get: function () {
            return this._itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "code", {
        get: function () {
            return this._itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "uiCode", {
        get: function () {
            return this._itemParam.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "specialIconId", {
        get: function () {
            return this._itemParam.specialIconId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerTaskScrollItem.prototype, "requestEvent", {
        get: function () {
            return this._itemParam.requestEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcCrossServerTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 620;
        // this.height = 180;
        this._itemData = data;
        this._itemParam = itemParam;
        var innerbg = BaseBitmap.create("public_scrollitembg");
        innerbg.width = this.width - 20;
        innerbg.height = 180;
        innerbg.x = 10;
        innerbg.y = 0;
        this.addChild(innerbg);
        var namebg = BaseBitmap.create("activity_charge_red");
        namebg.x = innerbg.x - 3;
        namebg.y = innerbg.y;
        var txtStr = LanguageManager.getlocal("acCrossServerHegemony_taskDesc" + this._itemData.questType, ["" + this._itemData.value]);
        var txt = ComponentManager.getTextField(txtStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = namebg.x + 20;
        txt.y = namebg.y + namebg.height / 2 - txt.height / 2;
        // namebg.width =txt.width < 139 ? 239 : txt.width + 100;
        this.addChild(namebg);
        this.addChild(txt);
        var reward = "";
        if (data.special1) {
            reward = "1049_0_" + data.special1 + "_" + this.uiCode;
        }
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var spaceX = 5;
        var scale = 0.75;
        var startX = 15;
        var startY = 60;
        // rewardArr = rewardArr.concat(rewardArr);
        var rewardBg = BaseBitmap.create("public_scrolllistbg");
        rewardBg.width = innerbg.width - 165;
        this.addChild(rewardBg);
        // rewardBg.height = Math.ceil(rewardArr.length /4) * (106 * 0.8 + 6) + 6;
        rewardBg.height = baseWidth * scale + 16;
        rewardBg.setPosition(innerbg.x + 12, startY + 2);
        // rewardArr = rewardArr.concat(rewardArr).concat(rewardArr).concat(rewardArr).concat(rewardArr)
        var rewardContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = i * (baseWidth * scale + spaceX) + 3;
            itemicon.y = 6;
            rewardContainer.addChild(itemicon);
        }
        rewardContainer.height = baseWidth * scale;
        // let scrollReward = ComponentManager.getScrollView(rewardContainer,new egret.Rectangle(0,0,455,100))
        // this.addChild(scrollReward);
        // scrollReward.setPosition(rewardBg.x + startX,startY);
        this.addChild(rewardContainer);
        rewardContainer.setPosition(rewardBg.x + 5, rewardBg.y);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTaskValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.anchorOffsetX = this._countText.width / 2;
        this._countText.x = innerbg.x + innerbg.width - 80;
        this._countText.y = 52;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._reviceBtn.x = innerbg.x + innerbg.width - this._reviceBtn.width - 10;
        this._reviceBtn.y = innerbg.y + innerbg.height - this._reviceBtn.height - 40;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, "taskGoBtn", this.goBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._goBtn.x = innerbg.x + innerbg.width - this._goBtn.width - 10;
        this._goBtn.y = innerbg.y + innerbg.height - this._goBtn.height - 40;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.setScale(0.7);
        this._reviceBM.x = innerbg.x + innerbg.width - this._reviceBM.width * 0.7 - 10;
        this._reviceBM.y = innerbg.y + innerbg.height - this._reviceBM.height * 0.7 - 20;
        this.addChild(this._reviceBM);
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcCrossServerTaskScrollItem.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var activityId = this._itemParam.aid + "-" + this._itemParam.code;
        if (this.requestEvent) {
            NetManager.request(this.requestEvent, { "activeId": activityId, "taskId": this._itemData.id });
        }
        else {
            App.LogUtil.warn("---AcCommonTask--- 未传入领取请求事件,无法领取任务奖励");
        }
    };
    /**
     * 刷新UI
     */
    AcCrossServerTaskScrollItem.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        // this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])
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
        if (vo.getTaskStatus(this._itemData)) {
            this._goBtn.setVisible(false);
            this._reviceBtn.setVisible(false);
            this._reviceBM.setVisible(true);
        }
        else {
            this._reviceBM.setVisible(false);
        }
        if (!vo.isInMatchActicityTime()) {
            this._goBtn.setGray(true);
        }
        if (!vo.isStart) {
            this._reviceBtn.setGray(true);
        }
    };
    /**
     * 前往的Click
     */
    AcCrossServerTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        if (!vo.isInMatchActicityTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        if (!this._itemData.openType) {
            return;
        }
        var openType = this._itemData.openType;
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
    /**
     * 获得
     */
    AcCrossServerTaskScrollItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        switch (Number(this._itemData.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType1", [valueStr]);
                    break;
                }
            case 2:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType2", [valueStr]);
                    break;
                }
            case 301:
                {
                    if (Api.switchVoApi.checkCloseText()) {
                        strTop = LanguageManager.getlocal("acJadeTaksTitleType3_1", [valueStr]);
                    }
                    else {
                        strTop = LanguageManager.getlocal("acJadeTaksTitleType3_2", [valueStr]);
                    }
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType4", [valueStr]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType5", [valueStr]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType6", [valueStr]);
                    break;
                }
            case 104:
                {
                    strTop = LanguageManager.getlocal("acJadeTaksTitleType7", [valueStr]);
                    break;
                }
            case 10001:
                {
                    strTop = LanguageManager.getlocal("betheking_task_questType10001", [valueStr]);
                    break;
                }
            case 90001://灯火元宵活动，Code1 地图下一关任务 ： 探索完奇景{1}可领取
                {
                    strTop = LanguageManager.getlocal("acDiscorveryTaskType90001", [valueStr]);
                    break;
                }
            default:
                {
                    App.LogUtil.log("未支持的类型");
                }
        }
        return strTop;
    };
    AcCrossServerTaskScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcCrossServerTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._itemParam = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._countText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerTaskScrollItem;
}(ScrollListItem));
__reflect(AcCrossServerTaskScrollItem.prototype, "AcCrossServerTaskScrollItem");
//# sourceMappingURL=AcCrossServerTaskScrollItem.js.map