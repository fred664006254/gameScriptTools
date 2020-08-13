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
 * author : qianjun
 * date : 2018.4.14
 * desc : 劳动活动 任务itemrender
 */
var AcConquerMainLandTaskItem = (function (_super) {
    __extends(AcConquerMainLandTaskItem, _super);
    function AcConquerMainLandTaskItem() {
        var _this = _super.call(this) || this;
        _this._btn = null;
        _this._data = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcConquerMainLandTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTaskItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTaskItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_CONQUERMAINLAND;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandTaskItem.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcConquerMainLandTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._data = data;
        view._code = itemparam;
        view.width = 606;
        view.height = 205 + 10;
        var code = view.getUiCode();
        var wordsBg = BaseBitmap.create("public_9_bg14");
        wordsBg.width = view.width;
        wordsBg.height = view.height - 10;
        view.addChild(wordsBg);
        var bottom2 = BaseBitmap.create("activity_charge_red");
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottom2, wordsBg, [0, 2]);
        view.addChild(bottom2);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskDesc" + data.questType, [App.StringUtil.changeIntToText(Number(data.value))]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, bottom2, [10, 0]);
        view.addChild(titleTxt);
        bottom2.width = titleTxt.textWidth + 60;
        var listbg = BaseBitmap.create("public_9_managebg");
        listbg.width = 445;
        listbg.height = 100;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, listbg, wordsBg, [10, 55]);
        view.addChild(listbg);
        var str = "1016_0_" + data.specialReward + "_" + view.getUiCode();
        if (this.vo.checkIsJJL) {
            str = "1059_0_" + data.specialGift + "_" + view.getUiCode();
        }
        var iconList = GameData.getRewardItemIcons(str, true);
        if (iconList && iconList.length > 0) {
            //额外赠送ICON
            var startX = listbg.x + 7;
            var startY = listbg.y + 7;
            var l = iconList.length;
            for (var i = 0; i < l; i++) {
                var icon = iconList[i];
                icon.setScale(0.8);
                icon.setPosition(startX + i * (icon.width * icon.scaleX + 5), startY);
                view.addChild(icon);
            }
        }
        var taskNum = view.vo.getTaskValue(data.questType);
        var isLq = view.vo.getTaskLq(data.sortId);
        var progressbar = ComponentManager.getProgressBar("progress3", "progress3_bg", 460);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progressbar, wordsBg, [10, 10]);
        view.addChild(progressbar);
        if (isLq) {
            progressbar.setPercentage(1);
            progressbar.setText(LanguageManager.getlocal("allianceTask_completeTip"));
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(0.8);
            view.addChild(flag);
            view._btn = flag;
        }
        else {
            progressbar.setPercentage(taskNum / data.value);
            progressbar.setText(taskNum + "/" + data.value);
            if (taskNum >= data.value) {
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", view.collectHandler, view);
                view.addChild(btn);
                view._btn = btn;
            }
            else {
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "allianceBtnGo", view.collectHandler, view);
                view.addChild(btn);
                view._btn = btn;
            }
            if (!view.vo.isInActivity()) {
                App.DisplayUtil.changeToGray(view._btn);
            }
            else {
                App.DisplayUtil.changeToNormal(view._btn);
            }
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._btn, listbg, [listbg.width + 4, 0]);
    };
    AcConquerMainLandTaskItem.prototype.collectHandler = function (evt) {
        var view = this;
        var data = view._data;
        var taskNum = view.vo.getTaskValue(data.questType);
        var isLq = view.vo.getTaskLq(data.sortId);
        if (view.vo.getCurPeriod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
            return;
        }
        if (!view.vo.isInActivity()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            return;
        }
        if (!view.vo.isCanJoin()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acConquerMainLandTip23-" + view.getUiCode()));
            return;
        }
        if (taskNum >= data.value) {
            view.vo.selIdx = view._index;
            NetManager.request(NetRequestConst.REQUEST_MAINLAND_GETTASKRWD, {
                activeId: view.acTivityId,
                taskNum: data.sortId,
            });
        }
        else {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            if (!data.openType) {
                return;
            }
            App.CommonUtil.goTaskView(data.openType);
        }
    };
    AcConquerMainLandTaskItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._btn.x + 20, view._btn.y);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcConquerMainLandTaskItem.prototype.getSpaceY = function () {
        return 0;
    };
    AcConquerMainLandTaskItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandTaskItem;
}(ScrollListItem));
__reflect(AcConquerMainLandTaskItem.prototype, "AcConquerMainLandTaskItem");
//# sourceMappingURL=AcConquerMainLandTaskItem.js.map