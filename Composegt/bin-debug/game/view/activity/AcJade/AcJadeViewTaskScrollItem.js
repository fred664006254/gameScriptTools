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
var AcJadeViewTaskScrollItem = (function (_super) {
    __extends(AcJadeViewTaskScrollItem, _super);
    function AcJadeViewTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        _this._progress = null;
        return _this;
    }
    Object.defineProperty(AcJadeViewTaskScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcJadeViewTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        // this.width = 608;
        // this.height = 185;
        var innerbg = BaseBitmap.create("rechargevie_db_01");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var line1 = BaseBitmap.create("public_ts_bg01");
        line1.width = 260;
        // line1.x = this.width/2 - line1.width/2;
        line1.y = 30 - line1.height / 2;
        var txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN);
        txt.x = this.width / 2 - txt.width / 2;
        txt.textAlign = "center";
        txt.y = 30 - txt.height / 2;
        line1.width = txt.width < 160 ? 260 : txt.width + 100;
        line1.x = this.width / 2 - line1.width / 2;
        this.addChild(line1);
        this.addChild(txt);
        if (this._itemData.getReward.indexOf("21_0001") == -1) {
            this._itemData.getReward = ("21_0001_" + this.cfg.getTaskList()[index].jadeGet + "_" + this._aidAndCode.code + "|") + this._itemData.getReward;
        }
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        var itemicon = null;
        var baseWidth = 106;
        var baseHeight = 106;
        var spaceX = 10;
        var spaceY = 10;
        var startX = this.width / 2 - (baseWidth * 5 + spaceX * 4) / 2;
        var startY = 55;
        var lastY = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, false);
            itemicon.x = startX + (i % 5) * (baseWidth + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if (i == rewardArr.length - 1) {
                lastY = itemicon.y;
            }
        }
        this._progress = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 400);
        this._progress.setPosition(20, lastY + baseHeight + 10);
        this.addChild(this._progress);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        this._reviceBtn.x = 460;
        this._reviceBtn.y = this._progress.y - 5;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this);
        this._goBtn.x = 460;
        this._goBtn.y = this._progress.y - 5;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.x = 480;
        this._reviceBM.y = this._progress.y - 25;
        this.addChild(this._reviceBM);
        innerbg.height = this._progress.y + this._progress.height + 45;
        this.height = innerbg.height;
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcJadeViewTaskScrollItem.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var deltaT = vo.et - GameData.serverTime;
        if (deltaT < 0) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETJADEITEMA, { "activeId": activityId, "taskId": this._itemData.id });
    };
    /**
     * 刷新UI
     */
    AcJadeViewTaskScrollItem.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.gettTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        this._progress.setText(taskNum + "/" + newTaskNum);
        this._progress.setPercentage(taskNum / newTaskNum);
        if (openType) {
            if (taskNum >= newTaskNum) {
                this._goBtn.setVisible(false);
                this._reviceBtn.setVisible(true);
            }
            else {
                this._goBtn.setVisible(true);
                this._reviceBtn.setVisible(false);
            }
        }
        else {
            this._goBtn.setVisible(false);
            this._reviceBtn.setVisible(true);
            if (taskNum >= newTaskNum) {
                this._reviceBtn.setEnable(true);
            }
            else {
                this._reviceBtn.setEnable(false);
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
    AcJadeViewTaskScrollItem.prototype.goBtnClick = function () {
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
    AcJadeViewTaskScrollItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        switch (Number(this._itemData.questType)) {
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
        }
        return strTop;
    };
    AcJadeViewTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcJadeViewTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._progress = null;
        _super.prototype.dispose.call(this);
    };
    return AcJadeViewTaskScrollItem;
}(ScrollListItem));
__reflect(AcJadeViewTaskScrollItem.prototype, "AcJadeViewTaskScrollItem");
