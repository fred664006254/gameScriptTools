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
var AcCarnivalNightTaskScrollItem = (function (_super) {
    __extends(AcCarnivalNightTaskScrollItem, _super);
    function AcCarnivalNightTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._aidAndCode = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcCarnivalNightTaskScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalNightTaskScrollItem.prototype, "aid", {
        get: function () {
            return this._aidAndCode.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCarnivalNightTaskScrollItem.prototype, "code", {
        get: function () {
            return this._aidAndCode.code;
        },
        enumerable: true,
        configurable: true
    });
    AcCarnivalNightTaskScrollItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = this.code;
                break;
        }
        return code;
    };
    /**
     * 初始化itemview
     */
    AcCarnivalNightTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this._itemData = data;
        this._aidAndCode = itemParam;
        // this.width = 608;
        // this.height = 185;
        var innerbg = BaseBitmap.create("public_listbg");
        innerbg.width = 612;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var namebg = BaseBitmap.create("acmoonlight_red-1");
        // namebg.width = 260
        // namebg.x = this.width/2 - namebg.width/2;
        namebg.x = 3;
        namebg.y = 5;
        var txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 30;
        txt.y = namebg.y + namebg.height / 2 - txt.height / 2;
        namebg.width = txt.width < 139 ? 239 : txt.width + 100;
        this.addChild(namebg);
        this.addChild(txt);
        var reward = this._itemData.getReward;
        reward = "1010_0_" + data.specialGift + "_" + this.getUiCode() + "|" + reward;
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var baseHeight = 106;
        var spaceX = 5;
        var spaceY = 5;
        var scale = 0.8;
        var startX = 10;
        var startY = 50;
        var lastY = 0;
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = startX + (i % 4) * (baseWidth * scale + spaceX);
            itemicon.y = startY + Math.floor(i / 5) * (baseHeight + spaceY);
            this.addChild(itemicon);
            if (i == rewardArr.length - 1) {
                lastY = itemicon.y;
            }
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.x = 520 - this._countText.width / 2 - 80;
        this._countText.y = 40 - 8;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        this._reviceBtn.x = 460 - 80;
        this._reviceBtn.y = this._countText.y + this._countText.height;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this);
        this._goBtn.x = 460 - 80;
        this._goBtn.y = this._countText.y + this._countText.height;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.x = 480 - 80;
        this._reviceBM.y = this._countText.y + this._countText.height;
        this.addChild(this._reviceBM);
        innerbg.height = 163;
        this.height = innerbg.height;
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcCarnivalNightTaskScrollItem.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var activityId = this._aidAndCode.aid + "-" + this._aidAndCode.code;
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETCARNIVALITEMT, { "activeId": activityId, "taskId": this._itemData.id });
    };
    /**
     * 刷新UI
     */
    AcCarnivalNightTaskScrollItem.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        // this._countText.text = LanguageManager.getlocal("acChristmasTaskViewValue",[taskNum+"",newTaskNum+""])
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
    AcCarnivalNightTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._aidAndCode.aid, this._aidAndCode.code);
        if (!vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
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
        else if (openType == "recharge") {
            ViewController.getInstance().openView(ViewConst.COMMON.RECHARGEVIPVIEW);
        }
    };
    /**
     * 获得
     */
    AcCarnivalNightTaskScrollItem.prototype.getTitleStr = function (type) {
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
    AcCarnivalNightTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcCarnivalNightTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._aidAndCode = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._countText = null;
        _super.prototype.dispose.call(this);
    };
    return AcCarnivalNightTaskScrollItem;
}(ScrollListItem));
__reflect(AcCarnivalNightTaskScrollItem.prototype, "AcCarnivalNightTaskScrollItem");
