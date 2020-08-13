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
 * 元旦活动 item2
 */
var TreasureTaskScrollItem = (function (_super) {
    __extends(TreasureTaskScrollItem, _super);
    function TreasureTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._goBtn3 = null;
        _this.cu_index = 0;
        _this._tadayTaskTxt = null;
        _this.itemData = null;
        _this.taskId = "";
        _this._goBtn2 = null;
        _this.tempStr = "";
        return _this;
    }
    TreasureTaskScrollItem.prototype.initItem = function (index, data, itemData) {
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_SPRING_ITEM,this.update,this);  
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.update,this);
        this.itemData = itemData;
        this._data = data;
        this.taskId = data.name;
        this.cu_index = Number(data.key);
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = 588;
        wordsBg.height = 170;
        this.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        bottom2.width = 405;
        this.addChild(bottom2);
        //活动期间充值
        var num1 = 0;
        var taskTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        taskTxt.text = LanguageManager.getlocal("acNewYearquestType" + data.questType, [num1 + "", data.value]);
        taskTxt.width = bottom2.width;
        taskTxt.x = bottom2.x + 15;
        taskTxt.y = bottom2.y + 10;
        this.addChild(taskTxt);
        this._tadayTaskTxt = taskTxt;
        bottom2.width = taskTxt.textWidth + 35;
        var rewarStr = data.getReward;
        if (data.specialReward) {
            var newrewarStr = "1003_0_" + data.specialReward + "_" + this.itemData.code + '' + "|" + rewarStr;
            rewarStr = newrewarStr;
        }
        this.tempStr = rewarStr;
        var iconList = GameData.getRewardItemIcons(rewarStr, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = 20;
            var startY = 50;
            var l = iconList.length;
            var _icon;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.scaleX = 0.78;
                icon.scaleY = 0.78;
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 12), startY);
                this.addChild(icon);
            }
        }
        //前往
        this._goBtn2 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.collectHandler, this);
        this._goBtn2.x = 410;
        this._goBtn2.y = 60;
        this.addChild(this._goBtn2);
        this._goBtn2.visible = false;
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 410;
        this._goBtn3.y = 75;
        this.addChild(this._goBtn3);
        this.update();
    };
    TreasureTaskScrollItem.prototype.collectHandler = function (evt) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this.vo.isInActy()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("date_error"));
            return;
        }
        var openType = this._data.openType;
        if (openType == "111") {
            App.CommonUtil.showTip(LanguageManager.getlocal("adultMarryRequestTip4"));
            return;
        }
        if (this._goBtn3.visible) {
            if (this.vo.getTypeNum(this._data.questType) >= this._data.value) {
                // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this);
                this.vo.tmpReward = this.tempStr;
                if ((this._data.questType == "111" && this.vo.getTypeNum(this._data.questType) == 1)) {
                    TreasureTaskScrollItem.TASKID = "1003_0_" + this._data.specialReward + "_" + this.itemData.code + '';
                }
                else {
                    TreasureTaskScrollItem.TASKID = null;
                }
                NetManager.request(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS, { "activeId": this.itemData.aid + "-" + this.itemData.code, "taskId": this._data.name });
                return;
            }
        }
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "level" || openType == "arrival" || openType == "") {
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
        }
    };
    TreasureTaskScrollItem.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        if (!this.vo.isInActy()) {
            App.DisplayUtil.changeToGray(this._goBtn3);
            App.DisplayUtil.changeToGray(this._goBtn2);
            return;
        }
        var myRechargeNum = this.vo.getTypeNum(this._data.questType);
        if (this.vo && this.vo.getReceiveType(this.taskId) == false) {
            if (this._goBtn3.visible == true) {
                this._goBtn3.visible = false;
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = 450;
                collectflag.y = 50;
                collectflag.scaleX = 0.7;
                collectflag.scaleY = 0.7;
                this.addChild(collectflag);
            }
            var v = myRechargeNum = this.vo.getTypeNum(this._data.questType);
            this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [v + "", this._data.value]);
        }
        else {
            if (myRechargeNum >= this._data.value) {
                this._goBtn3.visible = true;
                this._goBtn2.visible = false;
                this._goBtn3.setText("taskCollect");
                this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [myRechargeNum + "", this._data.value]);
            }
            else {
                this._goBtn2.visible = true;
                this._goBtn3.visible = false;
                this._tadayTaskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._data.questType, [myRechargeNum + "", this._data.value]);
                this._goBtn3.setText("vipshopbtn");
            }
        }
    };
    Object.defineProperty(TreasureTaskScrollItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    TreasureTaskScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    TreasureTaskScrollItem.prototype.dispose = function () {
        TreasureTaskScrollItem.TASKID = null;
        this._data = null;
        this._goBtn3 = null;
        this.cu_index = 0;
        this.taskId = null;
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.update,this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST,this.update,this);
        _super.prototype.dispose.call(this);
    };
    TreasureTaskScrollItem.TASKID = null;
    return TreasureTaskScrollItem;
}(ScrollListItem));
__reflect(TreasureTaskScrollItem.prototype, "TreasureTaskScrollItem");
//# sourceMappingURL=TreasureTaskScrollItem.js.map