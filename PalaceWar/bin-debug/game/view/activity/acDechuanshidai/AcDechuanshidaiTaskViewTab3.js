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
/*
author : qinajun
desc : 每日任务
*/
var AcDechuanshidaiTaskViewTab3 = (function (_super) {
    __extends(AcDechuanshidaiTaskViewTab3, _super);
    function AcDechuanshidaiTaskViewTab3(data) {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this._taskArr = null;
        _this._day = 3;
        _this._dailyTaskTxt = null;
        _this._dailyBtn = null;
        _this._collectflag = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcDechuanshidaiTaskViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcDechuanshidaiTaskViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcDechuanshidaiTaskViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcDechuanshidaiTaskViewTab3.prototype.initView = function () {
        var _this = this;
        var view = this;
        // let boatview : any = ViewController.getInstance().getView('AcDragonBoatDayView');
        view.height = 660;
        view.width = 545;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTASK), this.rewardCallBack, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK), this.totalrewardCallBack, this);
        var code = view.getUiCode();
        var topbg = BaseBitmap.create("dechuandetailbg-" + code);
        view.addChild(topbg);
        topbg.x = 30;
        topbg.y = 55;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acDechuanshidaitip7-" + code), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, topbg, [0, 12]);
        var reward = GameData.formatRewardItem(view.cfg.getDailyReward(view._day))[0];
        var icon = GameData.getItemIcon(reward, true);
        view.addChild(icon);
        icon.setScale(0.8);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, topbg, [50, 45]);
        var daulyfinish = view.vo.getDayTaskFinish(view._day);
        var tasktotal = Object.keys(view.cfg.dailyTask[view._day - 1]).length;
        var dailyTxt = ComponentManager.getTextField("<font color=" + (daulyfinish >= tasktotal ? 0x3e9b00 : 0xff3c3c) + ">" + daulyfinish + "</font>/" + tasktotal, 20, TextFieldConst.COLOR_BLACK);
        view._dailyTaskTxt = dailyTxt;
        view.addChild(dailyTxt);
        var getBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "", function () {
            if (_this.vo.et < GameData.serverTime) {
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }
            if (view._day > view.vo.getCurDays()) {
                var time = App.DateUtil.getWeeTs(GameData.serverTime) + (view._day - view.vo.getCurDays()) * 3600 * 24 - GameData.serverTime;
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip9-" + code, [App.DateUtil.getFormatBySecond(time)]));
                return;
            }
            var finish = view.vo.getDayTaskFinish(view._day);
            if (finish < tasktotal) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acDechuanshidaitip8-" + code));
                return;
            }
            view.vo.lastday = view._day;
            NetManager.request(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK, {
                "activeId": view.acTivityId,
                "diffday": view._day,
            });
        }, view);
        view._dailyBtn = getBtn;
        view.addChild(getBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, getBtn, topbg, [35, 25]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dailyTxt, getBtn, [0, -dailyTxt.textHeight - 3]);
        getBtn.setGray(daulyfinish < tasktotal || view._day > view.vo.getCurDays());
        if (view._day > view.vo.getCurDays()) {
            getBtn.setText("acbattlenobegun");
        }
        else {
            getBtn.setText(daulyfinish < tasktotal ? "acDechuanshidaitip10-" + code : "taskCollect");
        }
        var collectflag = BaseBitmap.create("collectflag");
        collectflag.scaleX = 0.7;
        collectflag.scaleY = 0.7;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, collectflag, getBtn);
        collectflag.visible = false;
        view.addChild(collectflag);
        view._collectflag = collectflag;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 545;
        Bg.height = 550;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, topbg, [0, topbg.height]);
        view.addChild(Bg);
        var vo = this.vo;
        var arr = view.getArr(); //
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcDechuanshidaiTaskItem, arr, tmpRect, view.code);
        view._scrollList = scrollList;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 5]);
        view.addChild(scrollList);
        scrollList.bounces = false;
        if (view.vo.getDayTaskFinishReward(view._day)) {
            view._collectflag.visible = true;
            view._dailyTaskTxt.visible = getBtn.visible = false;
        }
        else {
            view._collectflag.visible = false;
            view._dailyTaskTxt.visible = getBtn.visible = true;
        }
    };
    AcDechuanshidaiTaskViewTab3.prototype.getArr = function () {
        var view = this;
        var arr = [];
        var day = view._day;
        var taskcfg = view.cfg.dailyTask[day - 1];
        for (var i_1 in taskcfg) {
            var unit = taskcfg[i_1];
            unit.day = day;
            arr.push(unit);
        }
        arr.sort(function (a, b) {
            return a.sortId - b.sortId;
        });
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        for (var i = 0; i < arr.length; i++) {
            var taskNum = view.vo.getTask(arr[i].questType, day);
            if (view.vo.isGetTaskReward(arr[i].questType, day)) {
                arr1.push(arr[i]);
            }
            else {
                if (taskNum >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    AcDechuanshidaiTaskViewTab3.prototype.rewardCallBack = function (evt) {
        var view = this;
        if (view.vo.lastday != view._day) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var cfg = view.cfg.recharge[view.vo.lastidx];
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = this.vo.lastpos;
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        this.vo.lastidx = null;
    };
    AcDechuanshidaiTaskViewTab3.prototype.totalrewardCallBack = function (evt) {
        var view = this;
        if (view.vo.lastday != view._day) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var rewards = rData.rewards;
        var str = rewards;
        var rewardList = GameData.formatRewardItem(str);
        var pos = new egret.Point(view._dailyBtn.x + 20, view._dailyBtn.y + 10);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcDechuanshidaiTaskViewTab3.prototype.update = function () {
        var view = this;
        var code = view.getUiCode();
        if (!view.vo) {
            return;
        }
        var arr = view.getArr();
        view._scrollList.refreshData(arr, view.code);
        var daulyfinish = view.vo.getDayTaskFinish(view._day);
        var tasktotal = Object.keys(view.cfg.dailyTask[view._day - 1]).length;
        view._dailyTaskTxt.text = "<font color=" + (daulyfinish >= tasktotal ? 0x3e9b00 : 0xff3c3c) + ">" + daulyfinish + "</font>/" + tasktotal;
        var getBtn = view._dailyBtn;
        if (daulyfinish >= tasktotal) {
            getBtn.setGray(false);
        }
        else {
            getBtn.setGray(daulyfinish < tasktotal || view._day != view.vo.getCurDays());
        }
        if (view._day > view.vo.getCurDays()) {
            getBtn.setText("acbattlenobegun");
        }
        else {
            getBtn.setText(daulyfinish < tasktotal ? "acDechuanshidaitip10-" + code : "taskCollect");
        }
        if (view.vo.getDayTaskFinishReward(view._day)) {
            view._collectflag.visible = true;
            view._dailyTaskTxt.visible = getBtn.visible = false;
        }
        else {
            view._collectflag.visible = false;
            view._dailyTaskTxt.visible = getBtn.visible = true;
        }
    };
    AcDechuanshidaiTaskViewTab3.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        view._dailyBtn = null;
        view._dailyTaskTxt = null;
        view._collectflag = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTASK), this.rewardCallBack, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_DECHUAN_DAILYTOTALTASK), this.totalrewardCallBack, this);
        _super.prototype.dispose.call(this);
    };
    return AcDechuanshidaiTaskViewTab3;
}(AcCommonViewTab));
__reflect(AcDechuanshidaiTaskViewTab3.prototype, "AcDechuanshidaiTaskViewTab3");
//# sourceMappingURL=AcDechuanshidaiTaskViewTab3.js.map