// TypeScript file
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
var AcAnnualCelebration2020TaskScrollItem = (function (_super) {
    __extends(AcAnnualCelebration2020TaskScrollItem, _super);
    function AcAnnualCelebration2020TaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._needTxt = null;
        _this._goBtn3 = null;
        _this.taskId = 0;
        _this.itemData = null;
        _this.tempStr = "";
        /**
        * 充值进度条
        */
        _this._progress = null;
        return _this;
    }
    AcAnnualCelebration2020TaskScrollItem.prototype.initItem = function (index, data, itemData) {
        this._data = data;
        this.itemData = itemData;
        this.taskId = data.id;
        var wordsBg = BaseBitmap.create("newsingledaytab2bottombg-1");
        // wordsBg.width = 600;
        this.addChild(wordsBg);
        var posx = 15;
        var bottom2 = BaseBitmap.create("activity_charge_red");
        bottom2.y = 10;
        bottom2.x = 2 + posx;
        this.addChild(bottom2);
        var taskbg = BaseBitmap.create("destroysametaskbg");
        taskbg.x = wordsBg.width - taskbg.width - 3 - posx;
        taskbg.y = 2;
        this.addChild(taskbg);
        var tasks = this.cfg.task[this._data.type - 1];
        var tasknum = Object.keys(tasks).length;
        if (data.type == 3) {
            if (tasknum > this.vo.getAcContinueDays()) {
                tasknum = this.vo.getAcContinueDays();
            }
        }
        var taskTxt2 = ComponentManager.getTextField(LanguageManager.getlocal("AcDestroySameTip6-1", [String(this._data.id), "" + tasknum]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, taskTxt2, taskbg, [0, 4]);
        this.addChild(taskTxt2);
        var rewarStr = ""; //data.getReward; 
        if (data.specialGift1) {
            var newrewarStr = "1037_0_" + data.specialGift1 + "_" + this.itemData.uicode; //+''+"|"+rewarStr;
            rewarStr = newrewarStr;
        }
        if (data.specialGift2) {
            var newrewarStr = "1038_0_" + data.specialGift2 + "_" + this.itemData.uicode;
            if (rewarStr) {
                newrewarStr = newrewarStr + "|" + rewarStr;
            }
            rewarStr = newrewarStr;
        }
        this.tempStr = rewarStr;
        var rewardArr = GameData.formatRewardItem(rewarStr);
        wordsBg.height = 250 + Math.floor((rewardArr.length - 1) / 5) * 122;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true);
            iconItem.setPosition(12 + posx + (index % 5) * 117, 65 + Math.floor(index / 5) * 122);
            this.addChild(iconItem);
        }
        this._progress = ComponentManager.getProgressBar("progress5", "progress3_bg", 422);
        this._progress.setPosition(wordsBg.x + posx + 15, wordsBg.y + wordsBg.height - this._progress.height - 25);
        this.addChild(this._progress);
        //领取
        this._goBtn3 = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._goBtn3.x = 455 + posx;
        this._goBtn3.y = this._progress.y + this._progress.height / 2 - this._goBtn3.height / 2;
        this.addChild(this._goBtn3);
        //当前充值进度（0／1）
        var needTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        needTxt.width = bottom2.width;
        needTxt.x = bottom2.x + 15;
        needTxt.y = bottom2.y + 10;
        this._needTxt = needTxt;
        this.addChild(needTxt);
        if (this._data.type == 1) {
            this._needTxt.text = LanguageManager.getlocal("acWorshipChargePopupViewItemTitle-1", [this._data.value + ""]);
        }
        else if (this._data.type == 2) {
            this._needTxt.text = LanguageManager.getlocal("acMidAutumnTaksTitleType2", [this._data.value + ""]);
        }
        else {
            this._needTxt.text = LanguageManager.getlocal("acSpringceleBrationquestType" + this._data.questType, [this._data.value + ""]);
        }
        this.update();
    };
    AcAnnualCelebration2020TaskScrollItem.prototype.refreshProgress = function () {
        var myRechargeNum = this.vo.getTaskNum(this.taskId, this._data.type);
        var percent = myRechargeNum / this._data.value;
        if (this._data.type == 1) {
            this._progress.setText(LanguageManager.getlocal("acCarnivalProgressText", [myRechargeNum + "", String(this._data.value)]));
        }
        else {
            this._progress.setText(LanguageManager.getlocal("AcMazeViewTaskPlan", [myRechargeNum + "", String(this._data.value)]));
        }
        this._progress.setPercentage(percent);
    };
    AcAnnualCelebration2020TaskScrollItem.prototype.collectHandler = function (evt) {
        if (this.vo.isStart == false) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (this._data.value <= this.vo.getTaskNum(this.taskId, this._data.type)) {
            this.vo.tmpReward = this.tempStr;
            var pox = [this._data.type, this.taskId];
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_ANNUALCELEBRATION2020GETTASK, { "activeId": this.itemData.aid + "-" + this.itemData.uicode, "pos": pox });
        }
        else {
            if (!this.vo.isInActy()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            // ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
            if (this._data.questType == 2) {
                ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                return;
            }
            if (!this._data.openType) {
                return;
            }
            var openType = this._data.openType;
            var viewName = App.StringUtil.firstCharToUper(openType);
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
        }
    };
    AcAnnualCelebration2020TaskScrollItem.prototype.update = function () {
        if (!this.vo) {
            return;
        }
        this.refreshProgress();
        var myRechargeNum = this.vo.getTaskNum(this.taskId, this._data.type);
        if (this.vo && this.vo.getTaskFlag(this.taskId, this._data.type) == false) {
            if (this._goBtn3.visible == true) {
                this._goBtn3.visible = false;
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.x = this._goBtn3.x;
                collectflag.y = this._goBtn3.y - 30;
                collectflag.scaleX = 0.7;
                collectflag.scaleY = 0.7;
                this.addChild(collectflag);
            }
        }
        else {
            this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_YELLOW);
            if (myRechargeNum >= this._data.value) {
                this._goBtn3.setText("taskCollect");
            }
            else {
                if (this._data.type == 1) {
                    this._goBtn3.setText("vipshopbtn");
                    this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_RED);
                }
                else if (this._data.type == 3) {
                    App.DisplayUtil.changeToGray(this._goBtn3);
                }
                else {
                    this._goBtn3.setText("taskGoBtn");
                    this._goBtn3.setBtnBitMap(ButtonConst.BTN_SMALL_RED);
                }
                if (!this.vo.isInActy()) {
                    App.DisplayUtil.changeToGray(this._goBtn3);
                }
            }
        }
    };
    Object.defineProperty(AcAnnualCelebration2020TaskScrollItem.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.itemData.aid, this.itemData.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcAnnualCelebration2020TaskScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.itemData.aid, this.itemData.code);
        },
        enumerable: true,
        configurable: true
    });
    AcAnnualCelebration2020TaskScrollItem.prototype.getSpaceY = function () {
        return 10;
    };
    AcAnnualCelebration2020TaskScrollItem.prototype.dispose = function () {
        this._progress = null;
        this._data = null;
        this._needTxt = null;
        this._goBtn3 = null;
        this.taskId = null;
        this.tempStr = '';
        _super.prototype.dispose.call(this);
    };
    return AcAnnualCelebration2020TaskScrollItem;
}(ScrollListItem));
__reflect(AcAnnualCelebration2020TaskScrollItem.prototype, "AcAnnualCelebration2020TaskScrollItem");
//# sourceMappingURL=AcAnnualCelebration2020TaskScrollItem.js.map