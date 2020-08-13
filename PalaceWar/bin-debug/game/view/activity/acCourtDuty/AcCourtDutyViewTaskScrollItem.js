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
 * 依生依世 task item
 * author ycg
 * date 2019.10.28
 * @class AcCourtDutyViewTaskScrollItem
 */
var AcCourtDutyViewTaskScrollItem = (function (_super) {
    __extends(AcCourtDutyViewTaskScrollItem, _super);
    function AcCourtDutyViewTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aid = null;
        _this._code = null;
        _this._vo = null;
        _this._type = 1;
        _this._timeTf = null;
        _this._timeBg = null;
        _this._endTime = 0;
        _this._maskContainer = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcCourtDutyViewTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        var _this = this;
        this._itemData = data;
        this._aid = itemParam.aid;
        this._code = itemParam.code;
        this._type = itemParam.type;
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        this._vo = vo;
        this.width = 600;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        this.addChild(itembg);
        var titleBg = BaseBitmap.create("activity_charge_red");
        titleBg.y = 7;
        titleBg.x = 0;
        this.addChild(titleBg);
        var titleTF = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyquestType" + data.questType, [String(data.value)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        titleTF.setPosition(titleBg.x + 25, titleBg.y + titleBg.height / 2 - titleTF.height / 2);
        this.addChild(titleTF);
        var rewards = this._itemData.getReward;
        var rewardVoList = GameData.formatRewardItem(rewards);
        var rewardScale = 0.83;
        var itemHeight = 0;
        for (var i = 0; i < rewardVoList.length; i++) {
            var rewardDB = GameData.getItemIcon(rewardVoList[i], true, true);
            rewardDB.setScale(rewardScale);
            rewardDB.setPosition(itembg.x + (i % 5) * (rewardDB.width * rewardScale + 10) + 15, titleBg.y + titleBg.height + Math.floor(i / 5) * (rewardDB.height * rewardScale + 15) + 10);
            this.addChild(rewardDB);
            itemHeight = rewardDB.height * rewardScale + 15;
        }
        var offsetH = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
        itembg.height += offsetH - 20;
        this.height = itembg.height;
        var currNum = 0;
        if (this._type == 1) {
            currNum = vo.getYaMenTaskCurrNum(data.taskId, data.questType);
        }
        else {
            currNum = vo.getHuangBangTaskCurrNum(data.taskId, data.questType);
        }
        var needStrKey = "acCourtDutyTaskNum2";
        if (currNum >= data.value) {
            needStrKey = "acCourtDutyTaskNum1";
        }
        var needText = ComponentManager.getTextField(LanguageManager.getlocal(needStrKey, ["" + currNum, "" + data.value]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
        needText.anchorOffsetX = needText.width / 2;
        needText.setPosition(this.width - 30, 50);
        this.addChild(needText);
        if (currNum >= data.value) {
            var isGet = false;
            if (this._type == 1) {
                isGet = vo.isGetYaMenTaskById(data.taskId, data.rKey);
            }
            else {
                isGet = vo.isGetHuangBangTaskById(data.taskId, data.rKey);
            }
            if (isGet) {
                //已领取
                var collectflag = BaseBitmap.create("collectflag");
                collectflag.setScale(0.7);
                collectflag.setPosition(itembg.x + itembg.width - collectflag.width * 0.7 - 5, itembg.y + itembg.height - collectflag.height * 0.7);
                this.addChild(collectflag);
                needText.visible = false;
            }
            else {
                //可领取 未领取
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isStart)) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                    var bigType = "yaMenTask";
                    if (_this._type == 2) {
                        bigType = "huangBangTask";
                    }
                    NetManager.request(NetRequestConst.REQUEST_ACTIVITY_COURTDUTY_GETTASK, { activeId: vo.aidAndCode, bigType: bigType, diffday: data.taskId, rkey: data.rKey });
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                needText.setPosition(reviceBtn.x + reviceBtn.width / 2, reviceBtn.y - 25);
            }
        }
        else {
            //未完成
            if (data.questType == 1004) {
                var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
                    if ((!vo.isInActivity())) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                        return;
                    }
                }, this);
                reviceBtn.setPosition(itembg.x + itembg.width - reviceBtn.width - 15, itembg.y + itembg.height - reviceBtn.height - 15);
                this.addChild(reviceBtn);
                reviceBtn.setGray(true);
                if (vo.isInActivity()) {
                    reviceBtn.touchEnabled = false;
                }
                else {
                    reviceBtn.touchEnabled = true;
                }
                needText.setPosition(reviceBtn.x + reviceBtn.width / 2, reviceBtn.y - 25);
            }
            else {
                var goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", this.taskGoBtnHandler, this);
                goBtn.setPosition(itembg.x + itembg.width - goBtn.width - 15, itembg.y + itembg.height - goBtn.height - 15);
                this.addChild(goBtn);
                if ((!vo.isStart) || (vo.checkIsInEndShowTime())) {
                    goBtn.setGray(true);
                }
                needText.setPosition(goBtn.x + goBtn.width / 2, goBtn.y - 25);
            }
        }
        App.LogUtil.log("currDay: " + vo.getCurrDay() + " taskID: " + data.taskId);
        var currDay = vo.getCurrDay();
        if (data.taskId > currDay) {
            var maskContainer = new BaseDisplayObjectContainer();
            maskContainer.width = this.width;
            maskContainer.height = this.height;
            this.addChild(maskContainer);
            this._maskContainer = maskContainer;
            maskContainer.touchEnabled = true;
            var mask = BaseBitmap.create("public_9_bg90");
            mask.width = this.width;
            mask.height = this.height;
            maskContainer.addChild(mask);
            var timeBg = BaseBitmap.create("public_9_bg91");
            timeBg.width = maskContainer.width;
            timeBg.setPosition(mask.x + mask.width / 2 - timeBg.width / 2, mask.y + mask.height - timeBg.height - 5);
            maskContainer.addChild(timeBg);
            this._timeBg = timeBg;
            var day0 = App.DateUtil.getWeeTs(GameData.serverTime);
            this._endTime = day0 + (data.taskId - currDay) * 86400;
            var timeStr = App.DateUtil.getFormatBySecond((this._endTime - GameData.serverTime), 1);
            var timeIndexStr = "_1";
            if (data.taskId > currDay + 1) {
                timeIndexStr = "_2";
            }
            var timeTf = ComponentManager.getTextField(LanguageManager.getlocal("acCourtDutyTaskOpenTime" + timeIndexStr, [timeStr]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WHITE);
            timeTf.anchorOffsetX = timeTf.width / 2;
            timeTf.setPosition(mask.x + mask.width / 2, timeBg.y + timeBg.height / 2 - timeTf.height / 2);
            maskContainer.addChild(timeTf);
            this._timeTf = timeTf;
            TickManager.addTick(this.tick, this);
        }
    };
    AcCourtDutyViewTaskScrollItem.prototype.taskGoBtnHandler = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        if (vo.checkIsInEndShowTime() || (!vo.isStart)) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!this._itemData.openType) {
            return;
        }
        var openType = this._itemData.openType;
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
    AcCourtDutyViewTaskScrollItem.prototype.tick = function () {
        if (this._endTime > GameData.serverTime) {
            if (this._timeTf) {
                var timeStr = App.DateUtil.getFormatBySecond((this._endTime - GameData.serverTime), 1);
                var timeIndexStr = "_1";
                var currDay = this._vo.getCurrDay();
                if (this._itemData.taskId > currDay + 1) {
                    timeIndexStr = "_2";
                }
                this._timeTf.text = LanguageManager.getlocal("acCourtDutyTaskOpenTime" + timeIndexStr, [timeStr]);
                this._timeTf.anchorOffsetX = this._timeTf.width / 2;
            }
        }
        else {
            TickManager.removeTick(this.tick, this);
            if (this._maskContainer) {
                this.removeChild(this._maskContainer);
            }
        }
    };
    AcCourtDutyViewTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCourtDutyViewTaskScrollItem.prototype.dispose = function () {
        TickManager.removeTick(this.tick, this);
        this._itemData = null;
        this._aid = null;
        this._code = null;
        this._vo = null;
        this._timeTf = null;
        this._timeBg = null;
        this._endTime = 0;
        this._maskContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcCourtDutyViewTaskScrollItem;
}(ScrollListItem));
__reflect(AcCourtDutyViewTaskScrollItem.prototype, "AcCourtDutyViewTaskScrollItem");
//# sourceMappingURL=AcCourtDutyViewTaskScrollItem.js.map