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
  * 马超任务item
  * author 张朝阳
  * date 2019/1/14
  * @class AcMaChaoTaskScrollItem
  */
var AcMaChaoTaskScrollItem = (function (_super) {
    __extends(AcMaChaoTaskScrollItem, _super);
    function AcMaChaoTaskScrollItem() {
        var _this = _super.call(this) || this;
        _this._itemData = null;
        _this._itemParm = null;
        return _this;
    }
    /**
     * 初始化itemview
     */
    AcMaChaoTaskScrollItem.prototype.initItem = function (index, data, itemParm) {
        var _this = this;
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.reviceRewardClickHandler,this);
        // App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(itemParm.aid, itemParm.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(itemParm.aid, itemParm.code);
        this._itemData = data;
        this._itemParm = itemParm;
        this.width = 610;
        this.height = 170;
        var itembg = BaseBitmap.create("public_9_bg14");
        itembg.width = this.width;
        itembg.height = this.height;
        this.addChild(itembg);
        var topbg = BaseBitmap.create("activity_charge_red");
        topbg.setPosition(itembg.x, itembg.y + 5);
        this.addChild(topbg);
        var strTop = this.getStr(Number(this._itemData.questType));
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
        var reviceBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, "taskCollect", function () {
            NetManager.request(NetRequestConst.REQUST_ACTIVITY_MACHAOGETITEMB, { "activeId": vo.aidAndCode, "taskId": _this._itemData.id });
            // AcMazeView.RECHARGEID = this._itemData.id;
        }, this);
        reviceBtn.setPosition(this.width - reviceBtn.width - 20, this.height / 2);
        this.addChild(reviceBtn);
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_RED, "taskGoBtn", this.goBtnClick, this);
        goBtn.setPosition(this.width - reviceBtn.width - 20, this.height / 2);
        this.addChild(goBtn);
        goBtn.setVisible(false);
        var scheduleNum = vo.getTask(this._itemData.questType);
        var reviceBMScale = 0.6;
        var reviceBM = BaseBitmap.create("collectflag");
        // reviceBM.width *= 0.5;
        // reviceBM.height *= 0.5;
        reviceBM.setScale(reviceBMScale);
        reviceBM.setPosition(reviceBtn.x + reviceBtn.width / 2 - reviceBM.width * reviceBMScale / 2, reviceBtn.y + reviceBtn.height / 2 - reviceBM.height * reviceBMScale / 2 + 10);
        this.addChild(reviceBM);
        var scheduleStr = LanguageManager.getlocal("acMaChaoViewTaskPlan-" + itemParm.code, [scheduleNum < this._itemData.value ? "<font color=0xce1515>" + scheduleNum + "</font>" : "<font color=0x3e9b00>" + scheduleNum + "</font>", this._itemData.value]);
        var scheduleTF = ComponentManager.getTextField(scheduleStr, TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BLACK);
        scheduleTF.setPosition(reviceBtn.x + reviceBtn.width / 2 - scheduleTF.width / 2, this.height / 2 - scheduleTF.height);
        this.addChild(scheduleTF);
        if (vo.getTaskState(this._itemData.id)) {
            reviceBM.setVisible(true);
            reviceBtn.setVisible(false);
        }
        else {
            reviceBM.setVisible(false);
            // reviceBtn.setVisible(true);
            if (scheduleNum < this._itemData.value) {
                var openType = cfg.getTaskType(this._itemData.id);
                if (openType == null) {
                    reviceBtn.setVisible(true);
                    reviceBtn.setEnable(false);
                    goBtn.setVisible(false);
                }
                else {
                    reviceBtn.setVisible(false);
                    goBtn.setVisible(true);
                }
            }
            else {
                reviceBtn.setVisible(true);
                reviceBtn.setEnable(true);
                goBtn.setVisible(false);
            }
        }
    };
    AcMaChaoTaskScrollItem.prototype.goBtnClick = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._itemParm.aid, this._itemParm.code);
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this._itemParm.aid, this._itemParm.code);
        if (vo.checkIsInEndShowTime()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        var openType = cfg.getTaskType(this._itemData.id);
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
    };
    /**获得字符串 */
    AcMaChaoTaskScrollItem.prototype.getStr = function (questType) {
        var strTop = null;
        switch (Number(this._itemData.questType)) {
            case 1:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskLogin-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
            case 3:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeReward-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
            case 301:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskRandom-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
            case 402:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeCultivate-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
            case 303:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeFind-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
            case 601:
                {
                    strTop = LanguageManager.getlocal("acMaChaoViewTaskTakeFight-" + this._itemParm.code, [this._itemData.value]);
                    break;
                }
        }
        return strTop;
    };
    AcMaChaoTaskScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcMaChaoTaskScrollItem.prototype.dispose = function () {
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZEITEMB,this.reviceRewardClickHandler,this);
        // App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_GETMAZELOTTERY,this.refreshView,this);
        this._itemData = null;
        this._itemParm = null;
        _super.prototype.dispose.call(this);
    };
    return AcMaChaoTaskScrollItem;
}(ScrollListItem));
__reflect(AcMaChaoTaskScrollItem.prototype, "AcMaChaoTaskScrollItem");
//# sourceMappingURL=AcMaChaoTaskScrollItem.js.map