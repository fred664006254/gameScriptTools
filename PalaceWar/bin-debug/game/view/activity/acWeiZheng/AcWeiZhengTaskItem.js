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
 * desc : 魏征活动充值itemrender
 */
var AcWeiZhengTaskItem = (function (_super) {
    __extends(AcWeiZhengTaskItem, _super);
    function AcWeiZhengTaskItem() {
        var _this = _super.call(this) || this;
        //item数据
        _this._itemData = undefined;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWeiZhengTaskItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskItem.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskItem.prototype, "aid", {
        get: function () {
            return AcConst.AID_WEIZHENG;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWeiZhengTaskItem.prototype, "code", {
        get: function () {
            return this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWeiZhengTaskItem.prototype.getUiCode = function () {
        var code = "";
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
    AcWeiZhengTaskItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 510;
        view.height = 248 + 10;
        view._itemData = data;
        var code = view.getUiCode();
        //创建ui
        //背景图片
        var bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);
        var taskNum = view.vo.getTaskValue(data.questType, data.day);
        var isTaskFinish = view.vo.getTaskLq(data.questType, data.day);
        var canLq = view.vo.canTaskLq(data.questType, data.day);
        var topbg = BaseBitmap.create("activity_charge_red");
        topbg.y = 5;
        topbg.x = 2;
        view.addChild(topbg);
        var param = '';
        if (data.questType == "1028") {
            var cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
            if (cfg && cfg.name) {
                param = cfg.name;
            }
        }
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskDesc" + data.questType, [data.value, param]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, topbg, [10, 0]);
        view.addChild(titleTxt);
        topbg.width = titleTxt.textWidth + 60;
        var str = data.getReward;
        var rewardArr = GameData.formatRewardItem(str);
        var scroStartY = 70;
        var len = Math.min(5, rewardArr.length);
        var tmpX = 15; //(view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if (tmpX > bg.width - 8) {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
        scroStartY += (108 * 0.8);
        bg.height = scroStartY + 15;
        this.height = bg.height;
        var nowday = view.vo.getNowDay();
        if (isTaskFinish) {
            var flag = BaseBitmap.create("collectflag");
            flag.setScale(0.7);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [10, 0]);
            view.addChild(flag);
            if (nowday > data.day) {
                App.DisplayUtil.changeToGray(flag);
            }
        }
        else {
            //是否过期
            var btnstr = "";
            var btnpic = ButtonConst.BTN_SMALL_YELLOW;
            if (canLq) {
                btnstr = "taskCollect";
            }
            else {
                if (nowday > data.day || !view.vo.isInActy()) {
                    btnstr = "acWeiZhengTip4-" + code;
                }
                else if (nowday < data.day) {
                    btnstr = "acWeiZhengTip5-" + code;
                }
                else {
                    btnstr = "allianceBtnGo";
                    btnpic = ButtonConst.BTN_SMALL_RED;
                }
            }
            var btn = ComponentManager.getButton(btnpic, btnstr, view.collectHandler, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [10, 30]);
            view.addChild(btn);
            view._collectBtn = btn;
            var needTxt = ComponentManager.getTextField("<font color=" + (taskNum >= data.value ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED3) + ">" + taskNum + "</font> / " + data.value, 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needTxt, btn, [0, -needTxt.textHeight]);
            view.addChild(needTxt);
            if (!view.vo.isInActy()) {
                App.DisplayUtil.changeToGray(btn);
            }
            else {
                if (nowday == data.day) {
                    App.DisplayUtil.changeToNormal(btn);
                }
                else {
                    App.DisplayUtil.changeToGray(btn);
                }
            }
            if (canLq) {
                App.DisplayUtil.changeToNormal(btn);
            }
        }
    };
    AcWeiZhengTaskItem.prototype.collectHandler = function (event) {
        var view = this;
        var data = view._itemData;
        var code = view.getUiCode();
        if (view.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        var taskNum = view.vo.getTaskValue(data.questType, data.day);
        var nowday = view.vo.getNowDay();
        if (nowday < data.day) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acWeiZhengTip6-" + code));
            return;
        }
        var canlq = view.vo.canTaskLq(data.questType, data.day);
        if (canlq) {
            view.vo.lastidx = view._itemData;
            view.vo.lastpos = view._collectBtn.localToGlobal(view._collectBtn.width / 2 + 50, 20);
            NetManager.request(NetRequestConst.REQUEST_WEIZHENG_GETTASK, {
                activeId: view.acTivityId,
                taskId: data.key,
                diffday: data.day
            });
        }
        else {
            if (nowday > data.day) {
                //补领
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEISIGNREWARDVIEW, {
                    aid: view.aid,
                    code: view.code,
                    f: function () {
                        view.vo.lastidx = view._itemData;
                        view.vo.lastpos = view._collectBtn.localToGlobal(view._collectBtn.width / 2 + 50, 20);
                        NetManager.request(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK, {
                            activeId: view.acTivityId,
                            taskId: data.key,
                            diffday: data.day
                        });
                    },
                    o: view
                });
            }
            else if (nowday == data.day) {
                //跳转任务
                if (!view.vo.isInActy()) {
                    App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                    return;
                }
                if (data.questType == 2) {
                    ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
                    return;
                }
                if (!data.openType) {
                    return;
                }
                App.CommonUtil.goTaskView(data.openType);
            }
        }
    };
    AcWeiZhengTaskItem.prototype.getSpaceX = function () {
        return 0;
    };
    /**
     * 不同格子Y间距
     */
    AcWeiZhengTaskItem.prototype.getSpaceY = function () {
        return 5;
    };
    AcWeiZhengTaskItem.prototype.dispose = function () {
        this._itemData = null;
        this._collectBtn = null;
        // this._lastReqIdx = null;
        _super.prototype.dispose.call(this);
    };
    return AcWeiZhengTaskItem;
}(ScrollListItem));
__reflect(AcWeiZhengTaskItem.prototype, "AcWeiZhengTaskItem");
//# sourceMappingURL=AcWeiZhengTaskItem.js.map