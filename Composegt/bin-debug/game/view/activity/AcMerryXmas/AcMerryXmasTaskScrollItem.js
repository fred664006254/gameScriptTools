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
var AcMerryXmasTaskScrollItem = (function (_super) {
    __extends(AcMerryXmasTaskScrollItem, _super);
    function AcMerryXmasTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._itemParam = null;
        _this._countText = null;
        _this._reviceBtn = null;
        _this._goBtn = null;
        _this._reviceBM = null;
        return _this;
    }
    Object.defineProperty(AcMerryXmasTaskScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasTaskScrollItem.prototype, "aid", {
        get: function () {
            return this._itemParam.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasTaskScrollItem.prototype, "code", {
        get: function () {
            return this._itemParam.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasTaskScrollItem.prototype, "uiCode", {
        get: function () {
            return this._itemParam.uiCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMerryXmasTaskScrollItem.prototype, "specialIconId", {
        get: function () {
            return this._itemParam.specialIconId;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcMerryXmasTaskScrollItem.prototype.initItem = function (index, data, itemParam) {
        this.width = 530;
        this.height = 163;
        this._itemData = data;
        this._itemParam = itemParam;
        var innerbg = BaseBitmap.create("public_listbg3");
        innerbg.width = this.width;
        innerbg.height = this.height;
        innerbg.x = 0;
        innerbg.y = 0;
        this.addChild(innerbg);
        var namebg = BaseBitmap.create("accommontask_itemtitlebg");
        namebg.x = 4;
        namebg.y = 10;
        var txt = ComponentManager.getTextField(this.getTitleStr(Number(this._itemData.questType)), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        txt.x = 25;
        txt.y = namebg.y + namebg.height / 2 - txt.height / 2;
        namebg.width = txt.width < 139 ? 239 : txt.width + 100;
        this.addChild(namebg);
        this.addChild(txt);
        var reward = this._itemData.getReward;
        if (this.specialIconId && data.specialGift) {
            reward = this.specialIconId + "_0_" + data.specialGift + "_" + this.uiCode + "|" + reward;
        }
        var rewardArr = GameData.formatRewardItem(reward);
        var itemicon = null;
        var baseWidth = 106;
        var spaceX = 5;
        var scale = 0.8;
        var startX = 15;
        var startY = 50;
        var rewardContainer = new BaseDisplayObjectContainer();
        for (var i = 0; i < rewardArr.length; i++) {
            itemicon = GameData.getItemIcon(rewardArr[i], true, true);
            itemicon.setScale(scale);
            itemicon.x = i * (baseWidth * scale + spaceX);
            itemicon.y = 2;
            rewardContainer.addChild(itemicon);
        }
        if (rewardArr.length <= 4) {
            rewardContainer.width = 358;
        }
        rewardContainer.height = baseWidth * scale;
        var scrollReward = ComponentManager.getScrollView(rewardContainer, new egret.Rectangle(0, 0, 358, 90));
        this.addChild(scrollReward);
        scrollReward.setPosition(startX, startY);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        var openType = this._itemData.openType;
        //任务进度
        var taskNum = vo.getTaskNum(this._itemData.questType);
        var newTaskNum = this._itemData.value;
        this._countText = ComponentManager.getTextField(LanguageManager.getlocal("acChristmasTaskViewValue", [taskNum + "", newTaskNum + ""]), 22);
        this._countText.x = 520 - this._countText.width / 2 - 80;
        this._countText.y = 52;
        this.addChild(this._countText);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", this.reviceBtnClick, this);
        this._reviceBtn.x = 460 - 80;
        this._reviceBtn.y = this._countText.y + this._countText.height + 10;
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskGoBtn", this.goBtnClick, this);
        this._goBtn.x = 460 - 80;
        this._goBtn.y = this._countText.y + this._countText.height + 10;
        this.addChild(this._goBtn);
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.x = 460 - 80;
        this._reviceBM.y = this._countText.y + this._countText.height;
        this.addChild(this._reviceBM);
        this.refreshView();
    };
    /**
     * 领取奖励Click
     */
    AcMerryXmasTaskScrollItem.prototype.reviceBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        if (!vo.isStart) {
            App.CommonUtil.showTip(LanguageManager.getlocal('acPunishEnd'));
            return;
        }
        var activityId = this._itemParam.aid + "-" + this._itemParam.code;
        if (this._itemData.progress == 'progress') {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASBOXREWARD, { "activeId": activityId, "gid": this._itemData.id });
        }
        else {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETMERRYXMASTASKREWARD, { "activeId": activityId, "taskId": this._itemData.id });
        }
    };
    /**
     * 刷新UI
     */
    AcMerryXmasTaskScrollItem.prototype.refreshView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._itemParam.aid, this._itemParam.code);
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
        if (vo.getTaskStatus(this._itemData)) {
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
    AcMerryXmasTaskScrollItem.prototype.goBtnClick = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParam.aid, this._itemParam.code);
        if (!vo.isStart) {
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
    AcMerryXmasTaskScrollItem.prototype.getTitleStr = function (type) {
        var strTop = null;
        var valueStr = String(this._itemData.value);
        if (this._itemData.progress == 'progress') {
            strTop = LanguageManager.getlocal("acChristmasTaskTitleType8", [valueStr]);
        }
        else {
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
        }
        return strTop;
    };
    AcMerryXmasTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMerryXmasTaskScrollItem.prototype.dispose = function () {
        this._itemData = null;
        this._itemParam = null;
        this._reviceBtn = null;
        this._goBtn = null;
        this._reviceBM = null;
        this._countText = null;
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskScrollItem;
}(ScrollListItem));
__reflect(AcMerryXmasTaskScrollItem.prototype, "AcMerryXmasTaskScrollItem");
