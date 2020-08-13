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
  * 赵云任务
  * author 张朝阳
  * date 2018/7/22
  * @class AcMazeTaskScrollItem
  */
var AcMazeTaskScrollItem = (function (_super) {
    __extends(AcMazeTaskScrollItem, _super);
    function AcMazeTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._reviceBtn = null;
        _this._reviceBM = null;
        _this._goBtn = null;
        _this._itemData = null;
        return _this;
    }
    Object.defineProperty(AcMazeTaskScrollItem.prototype, "cfg", {
        /**
         * 配置文件数据
         */
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcMazeTaskScrollItem.prototype, "vo", {
        /**
         * 服务器返回数据
         */
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcMazeView.AID, AcMazeView.CODE);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 初始化itemview
     */
    AcMazeTaskScrollItem.prototype.initItem = function (index, data) {
        var _this = this;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.reviceRewardClickHandler, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY, this.refreshView, this);
        this._itemData = data;
        this.width = 600;
        this.height = 170;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);
        var topbg = BaseBitmap.create("activity_charge_red");
        topbg.setPosition(itembg.x, itembg.y + 5);
        this.addChild(topbg);
        var strTop = null;
        switch (Number(this._itemData.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("AcMazeViewTaskLogin", [this._itemData.value]);
                    break;
                }
            case 3:
                {
                    strTop = LanguageManager.getlocal("AcMazeViewTaskTakeReward", [this._itemData.value]);
                    break;
                }
            case 301:
                {
                    strTop = LanguageManager.getlocal("AcMazeViewTaskRandom", [this._itemData.value]);
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acSpringceleBrationquestType402", [this._itemData.value]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("AcMazeViewTaskTakeFind", [this._itemData.value]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acSpringceleBrationquestType601", [this._itemData.value]);
                    break;
                }
        }
        var topTF = ComponentManager.getTextField(strTop, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTF.setPosition(topbg.x + 10, topbg.y + topbg.height / 2 - topTF.height / 2);
        this.addChild(topTF);
        var rewardArr = GameData.formatRewardItem(this._itemData.getReward);
        for (var i = 0; i < rewardArr.length; i++) {
            var rewardItem = GameData.getItemIcon(rewardArr[i], true, true);
            rewardItem.setScale(0.95);
            rewardItem.setPosition(20 + (rewardItem.width + 8) * i, topbg.y + topbg.height);
            this.addChild(rewardItem);
        }
        var scheduleNum = this.vo.getTask(this._itemData.questType);
        this._reviceBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", function () {
            NetManager.request(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, { "activeId": AcMazeView.ACTIVEID, "taskId": _this._itemData.id });
            AcMazeView.RECHARGEID = _this._itemData.id;
        }, this);
        this._reviceBtn.setPosition(this.width - this._reviceBtn.width - 60, this.height / 2);
        this.addChild(this._reviceBtn);
        this._goBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "taskGoBtn", function () {
            var deltaT = _this.vo.et - GameData.serverTime - 86400 * 1;
            if (deltaT < 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var openType = _this.cfg.getTaskType(_this._itemData.id);
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
        }, this);
        this._goBtn.setPosition(this.width - this._reviceBtn.width - 60, this.height / 2);
        this.addChild(this._goBtn);
        this._goBtn.setVisible(false);
        if (scheduleNum < this._itemData.value) {
            // console.log(this._itemData.id);
            var openType = this.cfg.getTaskType(this._itemData.id);
            if (openType == null) {
                this._reviceBtn.setGray(true);
                this._reviceBtn.setEnable(false);
            }
            else {
                this._reviceBtn.setVisible(false);
                this._goBtn.setVisible(true);
                MessageConst;
            }
        }
        this._reviceBM = BaseBitmap.create("collectflag");
        this._reviceBM.width *= 0.5;
        this._reviceBM.height *= 0.5;
        this._reviceBM.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - this._reviceBM.width / 2, this._reviceBtn.y + this._reviceBtn.height / 2 - this._reviceBM.height / 2 + 10);
        this.addChild(this._reviceBM);
        var scheduleStr = LanguageManager.getlocal("AcMazeViewTaskPlan", [scheduleNum < this._itemData.value ? "<font color=0xce1515>" + scheduleNum + "</font>" : "<font color=" + TextFieldConst.COLOR_WARN_GREEN2 + ">" + scheduleNum + "</font>", this._itemData.value]);
        var scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        scheduleTF.setPosition(this._reviceBtn.x + this._reviceBtn.width / 2 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
        this.addChild(scheduleTF);
        this.refreshView();
    };
    AcMazeTaskScrollItem.prototype.reviceRewardClickHandler = function (event) {
        if (AcMazeView.RECHARGEID != this._itemData.id) {
            return;
        }
        var data = event.data.data.data;
        if (event.data.data < 0) {
            return;
        }
        var rewards = data.rewards;
        var rList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rList);
        this.refreshView();
    };
    /**
     * 刷新状态
     */
    AcMazeTaskScrollItem.prototype.refreshView = function () {
        if (this.vo.getTaskState(this._itemData.id)) {
            if (this._reviceBM) {
                this._reviceBM.setVisible(true);
            }
            if (this._reviceBtn) {
                this._reviceBtn.setVisible(false);
            }
        }
        else {
            if (this._reviceBM) {
                this._reviceBM.setVisible(false);
            }
            if (this._reviceBtn) {
                this._reviceBtn.setVisible(true);
            }
        }
    };
    AcMazeTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMazeTaskScrollItem.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB, this.reviceRewardClickHandler, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY, this.refreshView, this);
        this._reviceBtn = null;
        this._reviceBM = null;
        this._goBtn = null;
        _super.prototype.dispose.call(this);
    };
    return AcMazeTaskScrollItem;
}(ScrollListItem));
__reflect(AcMazeTaskScrollItem.prototype, "AcMazeTaskScrollItem");
//# sourceMappingURL=AcMazeTaskScrollItem.js.map