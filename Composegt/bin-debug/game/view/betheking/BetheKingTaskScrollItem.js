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
var BetheKingTaskScrollItem = (function (_super) {
    __extends(BetheKingTaskScrollItem, _super);
    function BetheKingTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._requsting = false;
        _this._collectEnable = false;
        _this._isLocked = false;
        return _this;
    }
    BetheKingTaskScrollItem.prototype.initItem = function (index, data) {
        this._uiData = data;
        this.width = 520;
        var startY = 0;
        if (this._uiData["isFirst"]) {
            var bg02 = BaseBitmap.create("public_tc_bg02");
            bg02.x = this.width / 2 - bg02.width / 2;
            // bg02.y = 10;
            this.addChild(bg02);
            var _cdTxt = ComponentManager.getTextField(LanguageManager.getlocal("betheking_task_attach"), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            _cdTxt.x = bg02.x + bg02.width / 2 - _cdTxt.width / 2;
            _cdTxt.y = bg02.y + bg02.height / 2 - _cdTxt.height / 2;
            this.addChild(_cdTxt);
            startY += bg02.height + 10;
        }
        var bg = BaseBitmap.create("public_listbg");
        bg.width = this.width;
        bg.height = 145;
        bg.y = startY;
        this.addChild(bg);
        this._bg = bg;
        var topbg = BaseBitmap.create("public_up3");
        topbg.width = bg.width - 10;
        ;
        topbg.height = 30;
        this.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 5]);
        this.addChild(topbg);
        var taskNameTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        taskNameTxt.text = LanguageManager.getlocal("betheking_task_questType" + this._uiData.questType, ["" + this._uiData.value]);
        taskNameTxt.x = topbg.x + 20;
        taskNameTxt.y = topbg.y + 7;
        this.addChild(taskNameTxt);
        if (this._uiData.pre_task == 1) {
            var taskNameTxt2 = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_WARN_GREEN);
            taskNameTxt2.text = LanguageManager.getlocal("betheking_task_suffix");
            taskNameTxt2.x = taskNameTxt.x + taskNameTxt.width + 10;
            taskNameTxt2.y = taskNameTxt.y;
            this.addChild(taskNameTxt2);
        }
        var rewardIcon = GameData.getRewardItemIcons(this._uiData.getReward + "|26_0_" + this._uiData.voteNum, true);
        for (var index = 0; index < rewardIcon.length; index++) {
            var element = rewardIcon[index];
            element.setScale(0.75);
            element.x = 20 + 85 * index;
            element.y = this._bg.y + 45;
            this.addChild(element);
        }
        var taskV = BetheKingTaskScrollItem._ACVO.getTaskValueByReuestType(this._uiData.questType);
        var needV = this._uiData.value;
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 145;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height / 2 + 30;
        this.addChild(this._collectBtn);
        if (this._uiData.openType) {
            this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.goHandler, this);
            this._goBtn.x = this._collectBtn.x;
            this._goBtn.y = this._collectBtn.y;
            this.addChild(this._goBtn);
        }
        this._stageTxt = ComponentManager.getTextField("", 18, TextFieldConst.COLOR_BROWN);
        this._stageTxt.x = this._collectBtn.x + this._collectBtn.width / 2 - this._stageTxt.width / 2;
        this._stageTxt.y = this._collectBtn.y - 25;
        this.addChild(this._stageTxt);
        this.refreshUI();
    };
    BetheKingTaskScrollItem.prototype.refreshUI = function () {
        /**
         * 0未完成 1已完成 2已领取
         */
        var stage = 0; // ;
        var taskV = BetheKingTaskScrollItem._ACVO.getTaskValueByReuestType(this._uiData.questType);
        var needV = this._uiData.value;
        if (BetheKingTaskScrollItem._ACVO.isgetTaskReward(this._uiData.stage)) {
            stage = 2;
        }
        else {
            if (taskV >= needV) {
                stage = 1;
            }
        }
        this._collectEnable = false;
        this._stageTxt.text = taskV + "/" + needV;
        this._stageTxt.anchorOffsetX = this._stageTxt.width / 2;
        if (stage < 2) {
            this._collectBtn.visible = true;
            this._goBtn ? this._goBtn.visible = false : "";
            if (stage == 0) {
                App.DisplayUtil.changeToGray(this._collectBtn);
                // this._collectBtn.setEnable(false);
                if (this._goBtn) {
                    this._goBtn.visible = true;
                    this._collectBtn.visible = false;
                }
            }
            else if (stage == 1) {
                App.DisplayUtil.changeToNormal(this._collectBtn);
                this._collectEnable = true;
                this._collectBtn.visible = true;
                this._goBtn ? this._goBtn.visible = false : "";
            }
        }
        else {
            App.DisplayUtil.changeToNormal(this._collectBtn);
            this._collectBtn.visible = false;
            this._collectEnable = false;
            this._goBtn ? this._goBtn.visible = false : "";
            this.createCollectFlag();
            this._collectFlag.setScale(1);
        }
        if (this._uiData.unlock) {
            var isL = BetheKingTaskScrollItem._ACVO.isgetTaskReward(this._uiData.unlock);
            if (!this._grayMask) {
                this._grayMask = BaseBitmap.create("public_9_viewmask");
                this._grayMask.width = this.width;
                this._grayMask.height = this._bg.height;
                this._grayMask.alpha = 0.7;
                this._grayMask.y = this._bg.y;
                this.addChild(this._grayMask);
                this._lockbg = BaseBitmap.create("public_lockbg");
                this._lockbg.width = 360;
                this._lockbg.x = 260 - this._lockbg.width / 2;
                this._lockbg.y = this._bg.y + 50;
                this.addChild(this._lockbg);
                this._locktxt = ComponentManager.getTextField(LanguageManager.getlocal("betheKing_tasklockTip1"), 18, TextFieldConst.COLOR_WARN_GREEN2);
                this._locktxt.y = this._lockbg.y + this._lockbg.height / 2 - this._locktxt.height / 2;
                this._locktxt.x = this._lockbg.x + this._lockbg.width / 2;
                this._locktxt.anchorOffsetX = this._locktxt.width / 2;
                this.addChild(this._locktxt);
            }
            this._lockbg.visible = this._locktxt.visible = this._grayMask.visible = this._isLocked = !isL;
        }
    };
    BetheKingTaskScrollItem.prototype.voteCallBackHandler = function (event) {
        if (!this._requsting) {
            return;
        }
        this._requsting = false;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_KINGS_TASK, this.voteCallBackHandler, this);
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            var rdata = data.data.data;
            this._collectEnable = false;
            this._collectBtn.visible = false;
            this.createCollectFlag();
            this._collectFlag.setScale(1.0);
            this._collectFlag.setScale(1.3);
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
            var rewardList = GameData.formatRewardItem(rdata.rewards);
            var pos = this._collectBtn.localToGlobal(this._collectBtn.width / 2, this._collectBtn.height / 2);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
        }
    };
    BetheKingTaskScrollItem.prototype.collectHandler = function () {
        if (this._isLocked) {
            return;
        }
        if (!this._collectEnable) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheking_taskcollectTip"));
            return;
        }
        if (!BetheKingTaskScrollItem._ACVO.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        this._requsting = true;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_KINGS_TASK, this.voteCallBackHandler, this);
        NetManager.request(NetRequestConst.REQUEST_KINGS_TASK, { activeId: BetheKingTaskScrollItem._ACVO.aidAndCode, fuid: this._uiData.uid, groupid: this._uiData.id, id: this._uiData.stage });
    };
    BetheKingTaskScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    BetheKingTaskScrollItem.prototype.goHandler = function () {
        if (BetheKingTaskScrollItem._ACVO.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_task_tip1"));
            return;
        }
        var openType = this._uiData.openType;
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "level" || openType == "arrival" || openType == "") {
            PlayerBottomUI.getInstance().show();
        }
        else if (openType == "welfare") {
            // ViewController.getInstance().openView("WelfareView|" + taskcfg.openNeed);
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
            if (openType == "recharge") {
                ViewController.getInstance().openView(viewName + "Vip" + "View");
                return;
            }
            if (egret.getDefinitionByName(viewName + "View")) {
                // if (taskcfg.questType == 801)
                // {
                //     ViewController.getInstance().openView(viewName+ "View|1");
                // }else if (taskcfg.questType == 802){
                //     ViewController.getInstance().openView(viewName+ "View|2");
                // }else if (taskcfg.questType == 302){
                //     let cfgValue = taskcfg.value;
                //     ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW,{cfgValue,handler:null});
                // }
                // else{
                ViewController.getInstance().openView(viewName + "View");
                // }
            }
            else if (egret.getDefinitionByName(viewName + "PopupView")) {
                ViewController.getInstance().openView(viewName + "PopupView");
            }
        }
    };
    BetheKingTaskScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    BetheKingTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    BetheKingTaskScrollItem.prototype.dispose = function () {
        this._uiData = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._requsting = false;
        this._stageTxt = null;
        this._goBtn = null;
        this._collectEnable = false;
        this._isLocked = false;
        this._lockbg = null;
        this._lockbg = null;
        this._grayMask = null;
        this._bg = null;
        _super.prototype.dispose.call(this);
    };
    return BetheKingTaskScrollItem;
}(ScrollListItem));
__reflect(BetheKingTaskScrollItem.prototype, "BetheKingTaskScrollItem");
