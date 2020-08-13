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
var AcCrossServerHegemonyFlagScrollList2 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagScrollList2, _super);
    function AcCrossServerHegemonyFlagScrollList2() {
        var _this = _super.call(this) || this;
        _this._itemParam = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "aid", {
        get: function () {
            return this._itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "code", {
        get: function () {
            return this._itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "uiCode", {
        get: function () {
            return this._itemParam.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "specialIconId", {
        get: function () {
            return this._itemParam.specialIconId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagScrollList2.prototype, "requestEvent", {
        get: function () {
            return this._itemParam.requestEvent;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcCrossServerHegemonyFlagScrollList2.prototype.initItem = function (index, data, itemParam) {
        this.width = 530;
        this.height = 163;
        this._itemData = data;
        this._itemParam = itemParam;
        var innerbg = BaseBitmap.create("public_listbg3");
        innerbg.width = this.width;
        innerbg.height = this.height;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var namebg = BaseBitmap.create("activity_charge_red");
        namebg.x = 4;
        namebg.y = 10;
        var txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 25;
        txt.y = namebg.y + namebg.height / 2 - txt.height / 2;
        // namebg.width =txt.width < 139 ? 239 : txt.width + 100;
        this.addChild(namebg);
        this.addChild(txt);
        var reward = this._itemData.getReward;
        if (this.specialIconId && data.specialGift) {
            reward = this.specialIconId + "_0_" + data.specialGift + "_" + this.uiCode + "|" + reward;
        }
        //饺子活动特殊处理  需要两个特殊icon
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var spaceX = 5;
        var scale = 0.8;
        var startX = 15;
        var startY = 50;
        // rewardArr = rewardArr.concat(rewardArr);
        var rewardContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = i * (baseWidth * scale + spaceX);
            itemicon.y = 2;
            rewardContainer.addChild(itemicon);
        }
        rewardContainer.height = baseWidth * scale;
        var scrollReward = ComponentManager.getScrollView(rewardContainer, new egret.Rectangle(0, 0, 358, 90));
        this.addChild(scrollReward);
        scrollReward.setPosition(startX, startY);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acCrossServerHegemonyTaskValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.x = 520 - this._countText.width / 2 - 80;
        this._countText.y = 52;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._reviceBtn.x = 460 - 80;
        this._reviceBtn.y = this._countText.y + this._countText.height + 10;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this, null, null, null, TextFieldConst.COLOR_BLACK);
        this._goBtn.x = 460 - 80;
        this._goBtn.y = this._countText.y + this._countText.height + 10;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.x = 480 - 80;
        this._reviceBM.y = this._countText.y + this._countText.height + 10;
        this.addChild(this._reviceBM);
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcCrossServerHegemonyFlagScrollList2.prototype.reviceBtnClick = function () {
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
    AcCrossServerHegemonyFlagScrollList2.prototype.refreshView = function () {
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
    };
    /**
     * 前往的Click
     */
    AcCrossServerHegemonyFlagScrollList2.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var openType = this._itemData.openType;
        if (Api[openType + "VoApi"] && Api[openType + "VoApi"].isShowNpc) {
            var isShowNpc = Api[openType + "VoApi"].isShowNpc();
            if (!isShowNpc) {
                var lockedStr = Api[openType + "VoApi"].getLockedString ? Api[openType + "VoApi"].getLockedString() : LanguageManager.getlocal("dailyTask_" + openType + "Tip");
                App.CommonUtil.showTip(lockedStr ? lockedStr : LanguageManager.getlocal("sysWaitOpen"));
                return;
            }
        }
        if (openType == "wife") {
            ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
        }
        else if (openType == "child") {
            ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW);
        }
        else if (openType == "search") {
            ViewController.getInstance().openView(ViewConst.COMMON.SEARCHVIEW);
        }
        else if (openType == "atkrace") {
            ViewController.getInstance().openView(ViewConst.COMMON.ATKRACEVIEW);
        }
        else if (openType == "affair") {
            ViewController.getInstance().openView(ViewConst.COMMON.AFFAIRVIEW);
        }
        else if (openType == "recharge") {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    /**
     * 获得
     */
    AcCrossServerHegemonyFlagScrollList2.prototype.getTitleStr = function (type) {
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
    AcCrossServerHegemonyFlagScrollList2.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServerHegemonyFlagScrollList2.prototype.dispose = function () {
        this._itemData = null;
        this._itemParam = null;
        this._countText = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagScrollList2;
}(ScrollListItem));
__reflect(AcCrossServerHegemonyFlagScrollList2.prototype, "AcCrossServerHegemonyFlagScrollList2");
//# sourceMappingURL=AcCrossServerHegemonyFlagScrollLIst2.js.map