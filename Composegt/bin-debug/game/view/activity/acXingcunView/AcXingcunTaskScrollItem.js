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
var AcXingcunTaskScrollItem = (function (_super) {
    __extends(AcXingcunTaskScrollItem, _super);
    function AcXingcunTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._uiData = undefined;
        _this._curIdx = 0;
        _this._lastReqIdx = null;
        _this._totalVo = undefined;
        return _this;
    }
    AcXingcunTaskScrollItem.prototype.initItem = function (index, data) {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH, this.refreshBtnStatus, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH, this.refreshBtnStatus, this);
        this._uiData = data;
        this._curIdx = index;
        this._totalVo = Api.acVoApi.getActivityVoByAidAndCode("xingcun");
        var cfgObj = this._totalVo.config;
        var bg = BaseBitmap.create("xingcun_contentbg1");
        bg.width = 560;
        bg.height = 246;
        this.addChild(bg);
        var charge_redBg = BaseBitmap.create("xingcun_titlebg1");
        charge_redBg.x = 15;
        charge_redBg.y = 15;
        this.addChild(charge_redBg);
        var Txt0 = ComponentManager.getTextField("", 30);
        Txt0.text = LanguageManager.getlocal("xingcun_dayTaskTxt" + (index + 1));
        Txt0.x = charge_redBg.x + 20;
        Txt0.y = charge_redBg.y + charge_redBg.height / 2 - Txt0.height / 2;
        this.addChild(Txt0);
        this._taskTxt = ComponentManager.getTextField("", 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        if (data.questType == 1001) {
            this._taskTxt.text = LanguageManager.getlocal("xingcun_dayTask_type" + data.questType);
        }
        else {
            var num1 = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY, this._uiData.questType);
            this._taskTxt.text = LanguageManager.getlocal("acNewYearquestType" + data.questType, [num1 + "", data.value]);
        }
        this._taskTxt.x = Txt0.x + Txt0.width + 20;
        this._taskTxt.name = "Txt1";
        this._taskTxt.y = charge_redBg.y + charge_redBg.height / 2 - this._taskTxt.height / 2;
        this.addChild(this._taskTxt);
        // let numLb: BaseBitmapText|BaseTextField = ComponentManager.getBitmapText(rechargeItem.showGem + "", "recharge_fnt");
        // numLb.x = bg.x + bg.width - 50 - numLb.width/2 ;
        // numLb.y = bg.y + 50;
        // this.addChild(numLb);
        var rewardArr = GameData.formatRewardItem(this._uiData.reward);
        var scroStartY = charge_redBg.y + charge_redBg.height + 15;
        var tmpX = 20;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width + 7);
            if (tmpX > bg.width - 8) {
                tmpX = 20;
                scroStartY += iconItem.height * 0.8 + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += 90;
        bg.height = scroStartY + 10;
        this.height = bg.height + 5;
        this._collectBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.collectHandler, this);
        this._collectBtn.x = bg.x + bg.width - 145;
        this._collectBtn.y = bg.y + bg.height / 2 - this._collectBtn.height * this._collectBtn.scaleY / 2;
        this.addChild(this._collectBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_BLUE, "taskGoBtn", this.goHandler, this);
        this._goBtn.x = this._collectBtn.x;
        this._goBtn.y = this._collectBtn.y;
        this.addChild(this._goBtn);
        this._goBtn.visible = (this._uiData.openType && this._uiData.openType != "");
        this.refreshBtnStatus();
    };
    AcXingcunTaskScrollItem.prototype.goHandler = function () {
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
    AcXingcunTaskScrollItem.prototype.collectHandler = function () {
        var num1 = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY, this._uiData.questType);
        if (num1 < this._uiData.value && AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday && this._uiData.questType != "1001") {
            if (Api.playerVoApi.getPlayerGem() < this._uiData.mendCost) {
                App.CommonUtil.showTip(LanguageManager.getlocal("xingcun_dayTask_tip4"));
                return;
            }
            var rewardStr = LanguageManager.getlocal("xingcun_dayTask_tip3", [this._uiData.mendCost]);
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: rewardStr,
                callback: this.doRequest,
                handler: this,
                needCancel: true
            });
        }
        else {
            if (num1 < this._uiData.value) {
                App.CommonUtil.showTip(LanguageManager.getlocal("xingcun_dayTask_tip1"));
                return;
            }
            this.doRequest();
        }
    };
    AcXingcunTaskScrollItem.prototype.doRequest = function () {
        var _ftype = 1;
        if (AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday && this._uiData.questType != "1001") {
            _ftype = 2;
        }
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_XINGCUN_ITEM, { activeId: this._totalVo.aidAndCode, taskId: this._uiData.id, thedays: AcXingcunTaskPopupView.THEDAY, ftype: _ftype });
    };
    AcXingcunTaskScrollItem.prototype.refreshBtnStatus = function () {
        var tmpVo = this._totalVo;
        if (tmpVo == null) {
            return;
        }
        var stat = this._totalVo.getTaskStatus(AcXingcunTaskPopupView.THEDAY, this._uiData.questType);
        if (this._uiData.questType == 1001) {
            this._taskTxt.text = LanguageManager.getlocal("xingcun_dayTask_type" + this._uiData.questType);
        }
        else {
            this._taskTxt.text = LanguageManager.getlocal("acNewYearquestType" + this._uiData.questType, [stat + "", this._uiData.value]);
        }
        var colflag = this._totalVo.getCollectFlag(AcXingcunTaskPopupView.THEDAY, this._uiData.id);
        if (colflag) {
            this.createCollectFlag();
            this._collectBtn.visible = this._goBtn.visible = false;
        }
        else {
            if (AcXingcunTaskPopupView.THEDAY < this._totalVo.diffday) {
                if (stat >= this._uiData.value) {
                    this._collectBtn.setText("xingcunBtnTxt2");
                }
                else {
                    this._collectBtn.setText("xingcunBtnTxt4");
                }
                this._collectBtn.visible = true;
                this._goBtn.visible = false;
            }
            else {
                if (stat >= this._uiData.value) {
                    this._collectBtn.visible = true;
                    this._goBtn.visible = false;
                }
                else {
                    this._goBtn.visible = (this._uiData.openType && this._uiData.openType != "");
                    this._collectBtn.visible = !this._goBtn.visible;
                }
            }
            if (this._totalVo.isTaskCollectEnable(AcXingcunTaskPopupView.THEDAY, this._uiData.id)) {
                App.CommonUtil.addIconToBDOC(this._collectBtn);
            }
            else {
                App.CommonUtil.removeIconFromBDOC(this._collectBtn);
            }
        }
    };
    AcXingcunTaskScrollItem.prototype.createCollectFlag = function () {
        if (!this._collectFlag) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._collectBtn.x + this._collectBtn.width / 2;
            this._collectFlag.y = this._collectBtn.y + this._collectBtn.height / 2;
            this.addChild(this._collectFlag);
        }
    };
    AcXingcunTaskScrollItem.prototype.refreshUI = function () {
        var colflag = this._totalVo.getCollectFlag(AcXingcunTaskPopupView.THEDAY, this._uiData.id);
        this.getChildByName("collectBtn").visible = (colflag == null);
        /**
         * 展示已领取
         */
        if (!this._collectFlag && colflag) {
            this.createCollectFlag();
            this._collectFlag.visible = false;
            this._collectFlag.setScale(1.3);
            this._collectFlag.visible = true;
            egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 300);
        }
        this.refreshBtnStatus();
    };
    AcXingcunTaskScrollItem.prototype.getSpaceX = function () {
        return 10;
    };
    /**
     * 不同格子Y间距
     */
    AcXingcunTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcXingcunTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_XINGCUN_TASK_REFRESH, this.refreshBtnStatus, this);
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
    return AcXingcunTaskScrollItem;
}(ScrollListItem));
__reflect(AcXingcunTaskScrollItem.prototype, "AcXingcunTaskScrollItem");
