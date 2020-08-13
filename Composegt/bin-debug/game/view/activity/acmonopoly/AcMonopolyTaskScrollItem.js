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
 * author yanyuling
 */
var AcMonopolyTaskScrollItem = (function (_super) {
    __extends(AcMonopolyTaskScrollItem, _super);
    function AcMonopolyTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._curIdx = 0;
        _this._lastReqIdx = null;
        _this._totalVo = undefined;
        return _this;
    }
    AcMonopolyTaskScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.refreshBtnStatus, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.refreshBtnStatus, this);
        this._uiData = data;
        this._curIdx = index;
        this._totalVo = Api.acVoApi.getActivityVoByAidAndCode("monopoly");
        var cfgObj = this._totalVo.config;
        var bg = BaseBitmap.create("public_listbg");
        bg.width = 620;
        bg.height = 246;
        this.addChild(bg);
        var namebg = BaseBitmap.create("acchristmasview_1_red");
        namebg.x = 3;
        namebg.y = 5;
        this._taskTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._taskTxt.text = this.getTitleStr();
        this._taskTxt.x = namebg.x + 10;
        this._taskTxt.name = "Txt1";
        this._taskTxt.y = namebg.y + namebg.height / 2 - this._taskTxt.height / 2;
        namebg.width = this._taskTxt.width < 139 ? 239 : this._taskTxt.width + 100;
        this.addChild(namebg);
        this.addChild(this._taskTxt);
        var rewardstr = "201_1_" + this._uiData.dice;
        var rewardArr = GameData.formatRewardItem(rewardstr);
        var scroStartY = namebg.y + namebg.height + 15;
        var tmpX = 10;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], false, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 20;
                scroStartY += iconItem.height * 0.8 + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 90;
        bg.height = scroStartY + 10;
        this.height = bg.height + 5;
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 145;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height * this._collectBtn.scaleY / 2 + 20;
        this.addChild(this._collectBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.goHandler, this);
        this._goBtn.x = this._collectBtn.x;
        this._goBtn.y = this._collectBtn.y;
        this.addChild(this._goBtn);
        this._goBtn.visible = (this._uiData.openType && this._uiData.openType != "");
        this._taskValueTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        this._taskValueTxt.text = "0";
        this._taskValueTxt.x = this._collectBtn.x + this._collectBtn.width / 2;
        this._taskValueTxt.y = this._goBtn.y - 25;
        this.addChild(this._taskValueTxt);
        this.refreshBtnStatus();
    };
    AcMonopolyTaskScrollItem.prototype.goHandler = function () {
        if (!this._totalVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var openType = this._uiData.openType;
        var viewName = App.StringUtil.firstCharToUper(openType);
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
    };
    AcMonopolyTaskScrollItem.prototype.collectHandler = function () {
        if (!this._totalVo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var openType = this._uiData.openType;
        //任务进度
        var taskNum = this._totalVo.gettTaskNum(this._uiData.questType);
        var newTaskNum = this._uiData.value;
        if (taskNum < newTaskNum) {
            return;
        }
        else {
            this.doRequest();
        }
    };
    AcMonopolyTaskScrollItem.prototype.doRequest = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_T, this.refreshUI, this);
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_T, { activeId: this._totalVo.aidAndCode, taskId: this._uiData.id });
    };
    AcMonopolyTaskScrollItem.prototype.refreshBtnStatus = function () {
        var openType = this._uiData.openType;
        //任务进度
        var taskNum = this._totalVo.gettTaskNum(this._uiData.questType);
        var newTaskNum = this._uiData.value;
        this._taskValueTxt.text = taskNum + "/" + newTaskNum;
        this._taskValueTxt.anchorOffsetX = this._taskValueTxt.width / 2;
        if (openType) {
            if (taskNum >= newTaskNum) {
                this._goBtn.setVisible(false);
                this._collectBtn.setVisible(true);
            }
            else {
                this._goBtn.setVisible(true);
                this._collectBtn.setVisible(false);
            }
        }
        else {
            this._goBtn.setVisible(false);
            this._collectBtn.setVisible(true);
            if (taskNum >= newTaskNum) {
                this._collectBtn.setEnable(true);
            }
            else {
                this._collectBtn.setEnable(false);
            }
        }
        if (this._totalVo.getTaskStatus("" + (this._uiData.id))) {
            this._goBtn.setVisible(false);
            this._collectBtn.setVisible(false);
            this.createCollectFlag();
            this._taskValueTxt.text = "";
        }
        else {
        }
    };
    AcMonopolyTaskScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcMonopolyTaskScrollItem.prototype.refreshUI = function (event) {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY2_MONOPOLY_GET_ITEMS_T, this.refreshUI, this);
        if (event) {
            if (event.data && event.data.ret) {
                var data = event.data.data.data;
                var adddicenum = data.adddicenum;
                var rewards = "201_1_" + adddicenum;
                var rList = GameData.formatRewardItem(rewards);
                App.CommonUtil.playRewardFlyAction(rList);
                /**
                 * 展示已领取
                 */
                // if (!this._collectFlag ){
                //     this.createCollectFlag();
                //     this._collectFlag.visible = false;
                //     this._collectFlag.setScale(1.3);
                //     this._collectFlag.visible = true;
                //     egret.Tween.get(this._collectFlag,{loop:false}).to({scaleX:1,scaleY:1},300);
                // }
                this.refreshBtnStatus();
            }
        }
    };
    AcMonopolyTaskScrollItem.prototype.getTitleStr = function () {
        var strTop = null;
        var valueStr = String(this._uiData.value);
        switch (Number(this._uiData.questType)) {
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
            case 101:
                {
                    strTop = LanguageManager.getlocal("taskDesc101", [valueStr]);
                    break;
                }
            case 102:
                {
                    strTop = LanguageManager.getlocal("taskDesc102", [valueStr]);
                    break;
                }
            case 103:
                {
                    strTop = LanguageManager.getlocal("taskDesc103", [valueStr]);
                    break;
                }
            case 10001:
                {
                    strTop = LanguageManager.getlocal("betheking_task_questType10001", [valueStr]);
                    break;
                }
            default:
                {
                    App.LogUtil.log("未支持的类型");
                }
        }
        return strTop;
    };
    AcMonopolyTaskScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcMonopolyTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMonopolyTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.refreshBtnStatus, this);
        this._uiData = null;
        this._collectFlag = null;
        this._collectBtn = null;
        this._curIdx = 0;
        this._lastReqIdx = null;
        this._totalVo = null;
        this._goBtn = null;
        this._taskTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyTaskScrollItem;
}(ScrollListItem));
__reflect(AcMonopolyTaskScrollItem.prototype, "AcMonopolyTaskScrollItem");
