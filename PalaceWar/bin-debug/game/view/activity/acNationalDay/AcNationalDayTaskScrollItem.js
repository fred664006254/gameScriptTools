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
* 国庆活动 任务item
* author yangchengguo
* date 2019.9.10
* @class AcNationalDayTaskScrollItem
*/
var AcNationalDayTaskScrollItem = (function (_super) {
    __extends(AcNationalDayTaskScrollItem, _super);
    function AcNationalDayTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._code = "";
        _this._aid = "";
        _this._currDay = 0;
        _this._tmpVo = null;
        return _this;
    }
    AcNationalDayTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._data = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._currDay = itemParam.currDay;
        var tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._tmpVo = tmpVo;
        var itemBg = BaseBitmap.create("public_9_bg14");
        itemBg.width = 590;
        this.addChild(itemBg);
        var titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
        titleBg.width = itemBg.width;
        titleBg.height = 35;
        titleBg.setPosition(itemBg.x + itemBg.width / 2 - itemBg.width / 2, itemBg.y + 10);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayQuestType" + data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        //任务红色标签
        var taskFlag = BaseBitmap.create("acnewyear_bottom2");
        taskFlag.y = titleBg.y + titleBg.height;
        this.addChild(taskFlag);
        var num = index + 1;
        var taskTxt = ComponentManager.getTextField(LanguageManager.getlocal("acNationalDayTask" + num), TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()) {
            taskTxt.x = taskFlag.x + taskFlag.width / 2 - taskTxt.width / 2;
            taskTxt.y = taskFlag.y + taskFlag.height / 2 - taskTxt.height / 2;
        }
        else {
            taskTxt.width = 30;
            taskTxt.x = taskFlag.x + taskFlag.width / 2 - taskTxt.width / 2;
            taskTxt.y = taskFlag.y + 25;
            taskTxt.lineSpacing = 5;
        }
        this.addChild(taskTxt);
        //奖励背景
        var rewardBg = BaseBitmap.create("public_9_bg21");
        rewardBg.width = itemBg.width - 20 - taskFlag.width;
        rewardBg.setPosition(taskFlag.x + taskFlag.width + 5, titleBg.y + titleBg.height + 5);
        this.addChild(rewardBg);
        //奖励物品
        var rewards = data.getReward;
        if (data.specialReward) {
            rewards = "1028_0_" + data.specialReward + "_" + this._code + "|" + rewards;
        }
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(rewardBg.x + (i % 5) * (rewardDB.width * rewardScale + 15) + 10, rewardBg.y + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itemBg.height += offsetH - 20;
        rewardBg.height = offsetH + 10;
        //进度条
        var progress = ComponentManager.getProgressBar("progress3", "progress3_bg", 360);
        itemBg.height += progress.height + 25;
        progress.setPosition(rewardBg.x + 5, itemBg.y + itemBg.height - progress.height - 25);
        this.addChild(progress);
        var currNum = tmpVo.getTaskNumByType(this._currDay, data.questType);
        progress.setPercentage(currNum / data.value, currNum + "/" + data.value, TextFieldConst.COLOR_LIGHT_YELLOW);
        this.height = itemBg.height;
        //按钮
        var status = tmpVo.getTaskCompleteStatus(this._currDay, data.questType);
        if (status == 2) {
            //已领取
            var collectflag = BaseBitmap.create("collectflag");
            collectflag.setScale(0.55);
            collectflag.setPosition(itemBg.x + itemBg.width - collectflag.width * 0.55 - 5, itemBg.y + itemBg.height - collectflag.height * 0.55);
            this.addChild(collectflag);
        }
        else if (status == 1) {
            //可领取 未领取
            var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                if ((!tmpVo.isStart)) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_ACNATIONALDAY_GET_TASK_REWARD);
                NetManager.request(NetRequestConst.REQUEST_ACTIVITY_NATIONDAY_GETTASK, { activeId: tmpVo.aidAndCode, questType: data.questType, diffday: _this._currDay, ftype: 1 });
            }, this);
            reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
            this.addChild(reviceBtn);
            App.CommonUtil.addIconToBDOC(reviceBtn);
        }
        else if (status == 0) {
            if (data.questType == "1004") {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if (!tmpVo.isInActivity()) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    if (tmpVo.getDay() < _this._currDay) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskNotStart"));
                        return;
                    }
                    if (tmpVo.getDay() > _this._currDay) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskEnd"));
                        return;
                    }
                }, this);
                reviceBtn.setPosition(itemBg.x + itemBg.width - reviceBtn.width - 15, itemBg.y + itemBg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                // reviceBtn.setEnable(false);
            }
            else {
                var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(itemBg.x + itemBg.width - goBtn.width - 15, itemBg.y + itemBg.height - goBtn.height - 15);
                this.addChild(goBtn);
                if (tmpVo.getDay() != this._currDay || !tmpVo.isInActivity()) {
                    goBtn.setGray(true);
                }
            }
        }
    };
    AcNationalDayTaskScrollItem.prototype.taskGoBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (vo.getDay() < this._currDay) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskNotStart"));
            return;
        }
        if (vo.getDay() > this._currDay) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acNationalDayTaskEnd"));
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
    AcNationalDayTaskScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcNationalDayTaskScrollItem.prototype.dispose = function () {
        this._tmpVo = null;
        this._code = null;
        this._aid = null;
        this._data = null;
        this._currDay = 0;
        _super.prototype.dispose.call(this);
    };
    return AcNationalDayTaskScrollItem;
}(ScrollListItem));
__reflect(AcNationalDayTaskScrollItem.prototype, "AcNationalDayTaskScrollItem");
//# sourceMappingURL=AcNationalDayTaskScrollItem.js.map