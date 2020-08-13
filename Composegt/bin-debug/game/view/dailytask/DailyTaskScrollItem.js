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
 * 任务列表节点
 * author yanyuling
 * date 2017/10/28
 * @class DailyTaskScrollItem
 */
var DailyTaskScrollItem = (function (_super) {
    __extends(DailyTaskScrollItem, _super);
    function DailyTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._taskId = "";
        _this._lastRequestTaskId = null;
        _this._achRedDotSp = null;
        return _this;
    }
    DailyTaskScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.collectHandlerCallBack, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC, this.refreshUI, this);
        this._taskId = data;
        var taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChild(this._nodeContainer);
        var bg = BaseBitmap.create("achievement_bg");
        // bg.width = 616;
        // bg.height = 145
        bg.x = 0; //GameConfig.stageWidth/2 - bg.width/2;
        this._nodeContainer.addChild(bg);
        this.height = bg.height + this.getSpaceY();
        // let leftBg = BaseBitmap.create("public_left");
        // leftBg.width = 139;
        // leftBg.height = 126.5;
        // leftBg.x = 17;
        // leftBg.y = 5.5;
        // this._nodeContainer.addChild(leftBg);
        var iconBg = BaseLoadBitmap.create("progress6_bg");
        iconBg.width = 130;
        iconBg.height = 112;
        // iconBg.x = bg.x+7;
        // iconBg.y = 15;
        iconBg.x = 18;
        iconBg.y = 21;
        this._nodeContainer.addChild(iconBg);
        var taskIcon = BaseLoadBitmap.create("achievementicon_" + taskcfg.icon);
        taskIcon.width = 88;
        taskIcon.height = 88;
        taskIcon.x = iconBg.x + iconBg.width / 2 - 44;
        taskIcon.y = iconBg.y + iconBg.height / 2 - 44;
        this._nodeContainer.addChild(taskIcon);
        // let itemNameBg:BaseBitmap = BaseBitmap.create("public_biaoti2");
        // itemNameBg.x = taskIcon.x + 155;
        // itemNameBg.y = 20;//icon.y;
        // itemNameBg.width = 212;
        // this._nodeContainer.addChild(itemNameBg);
        var nameIcon = undefined;
        nameIcon = BaseLoadBitmap.create("achievementname_" + taskcfg.icon, null, { callback: function (container) {
                if (nameIcon) {
                    nameIcon.x = iconBg.x + iconBg.width / 2 - nameIcon.width / 2;
                }
            }, callbackThisObj: this, callbackParams: [nameIcon] });
        nameIcon.y = 90;
        this._nodeContainer.addChild(nameIcon);
        // let taskNameBg = BaseBitmap.create("public_biaoti2");
        // taskNameBg.x = taskIcon.x + taskIcon.width + 40;
        // taskNameBg.y = taskIcon.y - 8 ;
        var taskNameTxt = null;
        if (PlatformManager.checkIsViSp()) {
            taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x420e00);
        }
        else {
            taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_TITLE_SMALL, 0x420e00);
        }
        taskNameTxt.text = LanguageManager.getlocal("dailyTaskName" + this._taskId);
        // taskNameBg.width = taskNameTxt.width + 100;
        taskNameTxt.x = 161; //taskNameBg.x +taskNameBg.width/2 - taskNameTxt.width/2 ;
        taskNameTxt.y = 35; //taskNameBg.y + taskNameBg.height/2 - taskNameTxt.height/2;
        // this._nodeContainer.addChild(taskNameBg);
        this._nodeContainer.addChild(taskNameTxt);
        this._taskAimTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x420e00);
        this._taskAimTxt.x = taskNameTxt.x;
        this._taskAimTxt.y = taskNameTxt.y + taskNameTxt.height + 16;
        this._nodeContainer.addChild(this._taskAimTxt);
        var rewardStr = null;
        //月卡或者年卡 并且开了豪门 并且 订阅了豪门
        if ((taskcfg.openNeed == "MonthCard" || taskcfg.openNeed == "YearCard") && Api.switchVoApi.checkOpenSpCard() && Api.shopVoApi.ifBuySpCard()) {
            var resultStr = null;
            if (taskcfg.extraReward) {
                resultStr = GameData.rewardsStrComp(taskcfg.reward, taskcfg.extraReward);
            }
            else {
                resultStr = taskcfg.reward;
            }
            if (taskcfg.extraReward2) {
                resultStr = GameData.rewardsStrComp(resultStr, taskcfg.extraReward2);
            }
            rewardStr = this.splitRewardsString(resultStr, taskcfg.liveness);
        }
        else if (taskcfg.openNeed == "MonthCard" && Api.switchVoApi.checkOpen1524JoinDinner() && Api.switchVoApi.checkOpenMouthCardAddItem1524()) {
            var resultStr = null;
            if (taskcfg.extraReward2) {
                resultStr = GameData.rewardsStrComp(taskcfg.reward, taskcfg.extraReward2);
            }
            else {
                resultStr = taskcfg.reward;
            }
            rewardStr = this.splitRewardsString(resultStr, taskcfg.liveness);
        }
        else {
            rewardStr = this.splitRewardsString(taskcfg.reward, taskcfg.liveness);
        }
        // let rewardStr = this.splitRewardsString(taskcfg.reward,taskcfg.liveness);
        var tasRewardTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, 0x420e00);
        tasRewardTxt.text = LanguageManager.getlocal("dailyTaskReward", [rewardStr]);
        tasRewardTxt.x = this._taskAimTxt.x;
        tasRewardTxt.y = this._taskAimTxt.y + 33;
        this._nodeContainer.addChild(tasRewardTxt);
        this._achRedDotSp = BaseBitmap.create("public_dot2");
        this._achRedDotSp.x = iconBg.x + iconBg.width - this._achRedDotSp.width - 20;
        this._achRedDotSp.y = iconBg.y + 2;
        this._achRedDotSp.visible = false;
        this._nodeContainer.addChild(this._achRedDotSp);
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.setColor(0x6f2f00);
        this._collectBtn.x = 435; //bg.x + bg.width - 155;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height * this._collectBtn.scaleY / 2;
        this._nodeContainer.addChild(this._collectBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.collectHandler, this);
        this._goBtn.x = 435; //this._collectBtn.x;
        this._goBtn.y = this._collectBtn.y;
        this._nodeContainer.addChild(this._goBtn);
        /**
         * 0未完成 1已完成 2已领取
         */
        this.refreshUI();
    };
    DailyTaskScrollItem.prototype.refreshUI = function () {
        var taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
        var FandV = Api.dailytaskVoApi.getTaskFandVByTaskId(this._taskId);
        this._curTaskStatus = Api.dailytaskVoApi.getTaskStatusByTaskId(this._taskId);
        if (FandV) {
            this._taskAimTxt.text = LanguageManager.getlocal("dailyTaskAin", [String(FandV.task_v), String(taskcfg.value)]);
        }
        else {
            this._taskAimTxt.text = LanguageManager.getlocal("dailyTaskAin", ["0", String(taskcfg.value)]);
        }
        if (this._curTaskStatus < 2) {
            // this._collectBtn.visible = true;
            // this._goBtn.visible = false;
            if (this._curTaskStatus == 0) {
                // this._collectBtn.updateButtonImage(BaseButton.BTN_STATE3);
                // this._collectBtn.setEnable(false);
                this._achRedDotSp.visible = false;
                this._goBtn.visible = true;
                this._collectBtn.visible = false;
            }
            else if (this._curTaskStatus == 1) {
                this._achRedDotSp.visible = true;
                this._goBtn.visible = false;
                this._collectBtn.visible = true;
            }
        }
        else {
            this._collectBtn.visible = false;
            this._goBtn.visible = false;
            this._achRedDotSp.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(1);
        }
    };
    DailyTaskScrollItem.prototype.splitRewardsString = function (reward, liveness) {
        var rData = GameData.formatRewardItem(reward);
        var rstr = LanguageManager.getlocal("dailyTask_liveness2", [String(liveness)]);
        var len = rData.length;
        for (var index = 0; index < len; index++) {
            var element = rData[index];
            if (element.type == 5) {
                rstr += App.StringUtil.formatStringColor(element.name + "+" + element.num, TextFieldConst.COLOR_WARN_GREEN);
            }
            else {
                rstr += element.name + "+" + element.num;
            }
            if (index < len - 1)
                rstr += ",";
        }
        return rstr;
    };
    DailyTaskScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("achievement_state3"); //collectflag
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this._nodeContainer.addChild(this._collectFlag);
        }
    };
    DailyTaskScrollItem.prototype.collectHandlerCallBack = function (event) {
        if (this._lastRequestTaskId && this._lastRequestTaskId == this._taskId) {
            this._lastRequestTaskId = null;
            //飘奖励，盖章，然后刷新
            this._collectBtn.visible = false;
            var taskCfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
            var rewardList = [
                {
                    icon: "itemicon6",
                    tipMessage: "+" + taskCfg.liveness
                }
            ];
            if ((taskCfg.openNeed == "MonthCard" || taskCfg.openNeed == "YearCard") && Api.switchVoApi.checkOpenSpCard() && Api.shopVoApi.ifBuySpCard()) {
                var resultStr = null;
                if (taskCfg.extraReward) {
                    resultStr = GameData.rewardsStrComp(taskCfg.reward, taskCfg.extraReward);
                }
                else {
                    resultStr = taskCfg.reward;
                }
                //月卡每日领奖励时额外给一个百年陈酿
                if (taskCfg.openNeed == "MonthCard" && Api.switchVoApi.checkOpen1524JoinDinner() && Api.switchVoApi.checkOpenMouthCardAddItem1524()) {
                    if (taskCfg.extraReward2) {
                        resultStr = GameData.rewardsStrComp(resultStr, taskCfg.extraReward2);
                    }
                }
                rewardList.push(GameData.formatRewardItem(resultStr)[0]);
            }
            else if (taskCfg.openNeed == "MonthCard" && Api.switchVoApi.checkOpen1524JoinDinner() && Api.switchVoApi.checkOpenMouthCardAddItem1524()) {
                var resultStr = null;
                if (taskCfg.extraReward2) {
                    resultStr = GameData.rewardsStrComp(taskCfg.reward, taskCfg.extraReward2);
                }
                else {
                    resultStr = taskCfg.reward;
                }
                for (var key in GameData.formatRewardItem(resultStr)) {
                    if (GameData.formatRewardItem(resultStr).hasOwnProperty(key)) {
                        var element = GameData.formatRewardItem(resultStr)[key];
                        rewardList.push(element);
                    }
                }
                //  rewardList.push(GameData.formatRewardItem(resultStr)[0])
                //  rewardList.concat(GameData.formatRewardItem(resultStr))
            }
            else {
                rewardList.push(GameData.formatRewardItem(taskCfg.reward)[0]);
            }
            var pos = this._collectBtn.localToGlobal(this._collectBtn.width / 2, this._collectBtn.height / 2);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this._achRedDotSp.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(1.0);
            this._collectFlag.visible = false;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
        }
    };
    DailyTaskScrollItem.prototype.collectHandler = function () {
        if (this._curTaskStatus == 0) {
            var taskcfg = Config.DailytaskCfg.getDailytaskCfgByTaskId(this._taskId);
            var openType = taskcfg.openType;
            var viewName = App.StringUtil.firstCharToUper(openType);
            if (openType == "level" || openType == "arrival" || openType == "") {
                // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
                PlayerBottomUI.getInstance().show();
            }
            else if (openType == "welfare") {
                ViewController.getInstance().openView("WelfareView|" + taskcfg.openNeed);
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
                if (openType == "alliance") {
                    Api.allianceVoApi.openMainView();
                    return;
                }
                if (openType == "studyatk") {
                    Api.studyatkVoApi.openMainView();
                    return;
                }
                if (egret.getDefinitionByName(viewName + "View")) {
                    if (taskcfg.questType == 801) {
                        ViewController.getInstance().openView(viewName + "View|1");
                    }
                    else if (taskcfg.questType == 802) {
                        ViewController.getInstance().openView(viewName + "View|2");
                    }
                    else if (taskcfg.questType == 302) {
                        var cfgValue = taskcfg.value;
                        ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { cfgValue: cfgValue, handler: null });
                    }
                    else {
                        ViewController.getInstance().openView(viewName + "View");
                    }
                }
                else if (egret.getDefinitionByName(viewName + "PopupView")) {
                    ViewController.getInstance().openView(viewName + "PopupView");
                }
            }
        }
        else {
            this._lastRequestTaskId = this._taskId;
            if (this._lastRequestTaskId == "1") {
                PlatformManager.analytics37JPPoint("custom_active", "complete_tasks_1", 1);
            }
            else if (this._lastRequestTaskId == "31") {
                PlatformManager.analytics37JPPoint("custom_active", "complete_tasks_31", 1);
            }
            NetManager.request(NetRequestConst.REQUEST_DAILYTASK_GET, { taskId: this._taskId });
        }
    };
    DailyTaskScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    DailyTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    DailyTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DAILYTASK_GET), this.collectHandlerCallBack, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_NOTICE_RESFESH_DAILYTASK_AFTER_SYNC, this.refreshUI, this);
        this._nodeContainer = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._taskId = null;
        this._lastRequestTaskId = null;
        _super.prototype.dispose.call(this);
    };
    return DailyTaskScrollItem;
}(ScrollListItem));
__reflect(DailyTaskScrollItem.prototype, "DailyTaskScrollItem");
