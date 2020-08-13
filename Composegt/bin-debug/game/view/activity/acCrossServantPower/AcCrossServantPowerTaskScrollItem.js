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
var AcCrossServantPowerTaskScrollItem = (function (_super) {
    __extends(AcCrossServantPowerTaskScrollItem, _super);
    function AcCrossServantPowerTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._expProgress = null;
        _this._achRedDotSp = null;
        _this._uiData = undefined;
        _this._isRequesting = false;
        _this._reqTip = "";
        return _this;
    }
    AcCrossServantPowerTaskScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH, this.refreshPro, this);
        var rankcfg = Config.AcCfg.getCfgByActivityIdAndCode(AcCrossServantPowerTaskScrollItem._ACVO.aid, AcCrossServantPowerTaskScrollItem._ACVO.code);
        this._uiData = rankcfg.task[data];
        this._serId = rankcfg.servantid;
        this.width = 520;
        this._taskId = "" + (index + 1);
        var bg = BaseBitmap.create("public_tc_bg03");
        bg.width = this.width;
        bg.height = 210;
        bg.y = 5;
        this.addChild(bg);
        var topbg = BaseBitmap.create("public_up3");
        topbg.width = bg.width - 10;
        ;
        topbg.height = 45;
        this.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 5]);
        this.addChild(topbg);
        var line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 320;
        line1.x = this.width / 2 - line1.width / 2;
        ;
        line1.y = topbg.y + topbg.height / 2 - line1.height / 2;
        this.addChild(line1);
        var taskNametxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN);
        var serName = LanguageManager.getlocal("servant_name" + this._serId);
        taskNametxt.text = LanguageManager.getlocal("acCrossServantPower_task_questType" + this._uiData.questType, [serName, "" + this._uiData.value]);
        taskNametxt.x = this.width / 2 - taskNametxt.width / 2;
        taskNametxt.y = line1.y + line1.height / 2 - taskNametxt.height / 2;
        this.addChild(taskNametxt);
        var rewardIcon = GameData.getRewardItemIcons(this._uiData.getReward, true);
        for (var index = 0; index < rewardIcon.length; index++) {
            var element = rewardIcon[index];
            element.setScale(0.75);
            element.x = 10 + 85 * index;
            element.y = line1.y + 50;
            this.addChild(element);
        }
        this._expProgress = ComponentManager.getProgressBar("progress_type3_yellow", "progress_type3_bg", 320);
        this._expProgress.setPosition(10, 165);
        this._expProgress.setTextSize(18);
        this.addChild(this._expProgress);
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 140;
        this._collectBtn.y = this._expProgress.y + this._expProgress.height / 2 - this._collectBtn.height / 2;
        this.addChild(this._collectBtn);
        if (this._uiData.openType) {
            this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.goHandler, this);
            this._goBtn.x = this._collectBtn.x;
            this._goBtn.y = this._collectBtn.y;
            this.addChild(this._goBtn);
            this._collectBtn.visible = false;
        }
        this.refreshPro();
    };
    AcCrossServantPowerTaskScrollItem.prototype.refreshPro = function () {
        this._reqTip = "";
        var taskinfo = AcCrossServantPowerTaskScrollItem._ACVO.taskinfo;
        var getV = taskinfo.task[this._uiData.questType] || 0;
        this._expProgress.setPercentage(getV / this._uiData.value);
        this._expProgress.setText(LanguageManager.getlocal("acCrossServantPower_progress", [getV + "/" + this._uiData.value]));
        if (AcCrossServantPowerTaskScrollItem._ACVO.taskinfo.flags[this._taskId] == 1) {
            this.createCollectFlag();
            this._collectBtn.visible = false;
            if (this._goBtn) {
                this._goBtn.visible = false;
            }
        }
        else {
            if (getV >= this._uiData.value) {
                if (this._goBtn) {
                    this._goBtn.visible = false;
                }
                this._collectBtn.visible = true;
                App.DisplayUtil.changeToNormal(this._collectBtn);
            }
            else {
                this._reqTip = LanguageManager.getlocal("acCrossServantPower_task_clooectTip");
                if (this._goBtn) {
                    this._goBtn.visible = true;
                }
                this._collectBtn.visible = false;
                App.DisplayUtil.changeToGray(this._collectBtn);
            }
        }
    };
    AcCrossServantPowerTaskScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcCrossServantPowerTaskScrollItem.prototype.collectHandlerCallBack = function (event) {
        this._isRequesting = false;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_CROSS_SERVANT_TASKREWARD, this.collectHandlerCallBack, this);
        var data = event.data;
        var ret = data.data.ret;
        if (ret == 0) {
            //飘奖励，盖章，然后刷新
            this._collectBtn.visible = false;
            if (this._goBtn) {
                this._goBtn.visible = false;
            }
            var rewardList = GameData.formatRewardItem(data.data.data.rewards);
            var pos = this._collectBtn.localToGlobal(this._collectBtn.width / 2, this._collectBtn.height / 2);
            App.CommonUtil.playRewardFlyAction(rewardList, pos);
            this.createCollectFlag();
            this._collectFlag.setScale(1.0);
            this._collectFlag.visible = false;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
        }
    };
    AcCrossServantPowerTaskScrollItem.prototype.collectHandler = function () {
        if (this._reqTip != "") {
            App.CommonUtil.showTip(this._reqTip);
            return;
        }
        this._isRequesting = true;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_CROSS_SERVANT_TASKREWARD, this.collectHandlerCallBack, this);
        NetManager.request(NetRequestConst.REQUEST_CROSS_SERVANT_TASKREWARD, { activeId: AcCrossServantPowerTaskScrollItem._ACVO.aidAndCode, taskId: this._taskId });
    };
    AcCrossServantPowerTaskScrollItem.prototype.goHandler = function () {
        if (AcCrossServantPowerTaskScrollItem._ACVO.et - GameData.serverTime < 86400) {
            App.CommonUtil.showTip(LanguageManager.getlocal("betheKing_task_tip1"));
            return;
        }
        var openType = this._uiData.openType;
        var questType = this._uiData.questType;
        var viewName = App.StringUtil.firstCharToUper(openType);
        if (openType == "servant") {
            ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, "" + this._serId);
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAFE_CROSS_SERVANT_GOTASK);
    };
    AcCrossServantPowerTaskScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    AcCrossServantPowerTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCrossServantPowerTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_CROSS_SERVANT_REFRESH, this.refreshPro, this);
        this._expProgress = null;
        this._collectBtn = null;
        this._collectFlag = null;
        this._achRedDotSp = null;
        this._goBtn = null;
        this._taskId = null;
        this._serId = null;
        this._uiData = null;
        this._isRequesting = false;
        this._reqTip = "";
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerTaskScrollItem;
}(ScrollListItem));
__reflect(AcCrossServantPowerTaskScrollItem.prototype, "AcCrossServantPowerTaskScrollItem");
