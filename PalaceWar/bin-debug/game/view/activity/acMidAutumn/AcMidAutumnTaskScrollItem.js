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
  * 中秋活动的任务item
  * author 张朝阳
  * date 2018/8/29
  * @class AcMidAutumnTaskScrollItem
  */
var AcMidAutumnTaskScrollItem = (function (_super) {
    __extends(AcMidAutumnTaskScrollItem, _super);
    function AcMidAutumnTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcMidAutumnTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        this.width = 608;
        this.height = 165;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);
        var titleBg = BaseLoadBitmap.create("acmidautumnview_titlebg");
        titleBg.width = 600;
        titleBg.height = 35;
        titleBg.setPosition(itembg.x + itembg.width / 2 - titleBg.width / 2, itembg.y + 5);
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var itemTopLine = BaseBitmap.create("public_line3");
        itemTopLine.width += titleTF.width;
        itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
        this.addChild(itemTopLine);
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true);
            rewardItem.setScale(0.95);
            rewardItem.setPosition(20 + (rewardItem.width + 8) * i, titleBg.y + titleBg.height + 5);
            this.addChild(rewardItem);
        }
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        this._reviceBtn.setPosition(itembg.x + itembg.width - this._reviceBtn.width - 15, itembg.y + itembg.height - this._reviceBtn.height - 20);
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.goBtnClick, this);
        this._goBtn.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - this._goBtn.width / 2, this._reviceBtn.y + this._reviceBtn.height / 2 - this._goBtn.height / 2);
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.anchorOffsetX = this._reviceBM.width / 2;
        this._reviceBM.anchorOffsetY = this._reviceBM.height / 2;
        this._reviceBM.setScale(0.7);
        this._reviceBM.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2, this._reviceBtn.y + this._reviceBtn.height / 2);
        this.addChild(this._reviceBM);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var scheduleNum = vo.gettTaskNum(this._itemData.questType);
        var scheduleStr = LanguageManager.getlocal("AcMazeViewTaskPlan", [scheduleNum < data.value ? "<font color=0xce1515>" + scheduleNum + "</font>" : "<font color=" + TextFieldConst.COLOR_WARN_GREEN2 + ">" + scheduleNum + "</font>", String(this._itemData.value)]);
        var scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        scheduleTF.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
        this.addChild(scheduleTF);
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcMidAutumnTaskScrollItem.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.ACTIVITY_GETMIDAUTUMNITEMB, { "activeId": activityId, "taskId": this._itemData.id });
    };
    /**
     * 刷新UI
     */
    AcMidAutumnTaskScrollItem.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.gettTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        if (openType) {
            if (taskNum >= newTaskNum) {
                this._goBtn.setVisible(false);
                this._reviceBtn.setVisible(true);
            }
            else {
                this._goBtn.setVisible(true);
                this._reviceBtn.setVisible(false);
                var deltaT = vo.et - GameData.serverTime - 86400 * 1;
                if (deltaT < 0) {
                    this._goBtn.setGray(true);
                }
            }
        }
        else {
            this._goBtn.setVisible(false);
            this._reviceBtn.setVisible(true);
            if (vo.isStart) {
                if (taskNum >= newTaskNum) {
                    this._reviceBtn.setEnable(true);
                }
                else {
                    this._reviceBtn.setEnable(false);
                }
            }
            else {
                this._reviceBtn.setGray(true);
            }
        }
        if (vo.getTaskStatus(this._itemData.id)) {
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
    AcMidAutumnTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var deltaT = vo.et - GameData.serverTime - 86400 * 1;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
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
    };
    /**
     * 获得
     */
    AcMidAutumnTaskScrollItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        switch (Number(this._itemData.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType1", [valueStr]);
                    break;
                }
            case 2:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType2", [valueStr]);
                    break;
                }
            case 301:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType3_1", [valueStr]);
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType4", [valueStr]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType5", [valueStr]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType6", [valueStr]);
                    break;
                }
            case 104:
                {
                    strTop = LanguageManager.getlocal("acMidAutumnTaksTitleType7", [valueStr]);
                    break;
                }
        }
        return strTop;
    };
    AcMidAutumnTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMidAutumnTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._goBtn = null;
        this._reviceBtn = null;
        this._reviceBM = null;
        _super.prototype.dispose.call(this);
    };
    return AcMidAutumnTaskScrollItem;
}(ScrollListItem));
__reflect(AcMidAutumnTaskScrollItem.prototype, "AcMidAutumnTaskScrollItem");
//# sourceMappingURL=AcMidAutumnTaskScrollItem.js.map