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
 * desc : 励精图治 任务itemrender
 */
var AcBattlePassViewTab2ScrollItem = (function (_super) {
    __extends(AcBattlePassViewTab2ScrollItem, _super);
    function AcBattlePassViewTab2ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._code = '';
        return _this;
    }
    AcBattlePassViewTab2ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    Object.defineProperty(AcBattlePassViewTab2ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_BATTLEPASS + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab2ScrollItem.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab2ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 610;
        view.height = 147 + 5;
        view._data = data;
        var code = view.uiCode;
        var bgstr = this.vo.isNewUi() ? "public_popupscrollitembg" : "public_9_bg14";
        var bg = BaseBitmap.create(bgstr);
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var winimgStr = this.vo.isNewUi() ? "battlepassprobggreen" : "battlepassgreen";
        var loseimgStr = this.vo.isNewUi() ? "shopview_itemtitle" : "alliance_taskAttrbg1";
        var topbg = BaseBitmap.create(winimgStr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [0, 3]);
        view.addChild(topbg);
        //随机任务
        /*--普通任务 - 随机任务
        --questType:任务类型
        --sortId:排序
        --value:任务参数
        --times:任务可完成次数，一轮
        --turn:X轮及X轮以后才可随机到该任务
        --right:任务随机权重
        --openType:任务跳转
        --expGet:获得经验值*/
        var param = '';
        if (data.questType == "1028") {
            var cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
            if (cfg && cfg.name) {
                param = cfg.name;
            }
        }
        var str = App.CommonUtil.getCnByCode("taskDesc" + data.questType, code);
        var titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(str, [data.value, param]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, topbg, [10, 0]);
        view.addChild(titleTxt);
        topbg.width = titleTxt.width + 60;
        if (this.vo.isNewUi() && (!PlatformManager.checkIsEnLang()) && (!PlatformManager.checkIsThSp()) && (!PlatformManager.checkIsRuLang())) {
            topbg.width = 300;
        }
        var expbg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassexpbg", code));
        if (this.vo.isNewUi()) {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, expbg, topbg, [20, topbg.height + 25]);
        }
        else {
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, expbg, topbg, [20, topbg.height + 10]);
        }
        view.addChild(expbg);
        var numbg = BaseBitmap.create(App.CommonUtil.getResByCode("battlepassfntbg", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numbg, expbg, [0, -10]);
        view.addChild(numbg);
        var fntBmp = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasslevelfnt", code));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, fntBmp, numbg);
        view.addChild(fntBmp);
        var expTxt = ComponentManager.getTextField("" + data.expGet, 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, expTxt, expbg);
        view.addChild(expTxt);
        var taskNum = view.vo.getTaskValue(data.questType, data.round);
        var finishNum = view.vo.getTaskFinishNum(data.questType, data.round);
        var isTaskFinish = finishNum >= data.times;
        if (data.times == 1) {
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTaskTip1", code), [data.times]), 22, TextFieldConst.COLOR_BLACK);
            if (this.vo.isNewUi()) {
                tipTxt.setColor(TextFieldConst.COLOR_BROWN2);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, bg, [190, 80]);
            view.addChild(tipTxt);
        }
        else {
            var progressbar = ComponentManager.getProgressBar("progress5", "progress3_bg", 300);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, progressbar, bg, [130, 25]);
            view.addChild(progressbar);
            if (isTaskFinish) {
                progressbar.setPercentage(1);
                progressbar.setText(LanguageManager.getlocal("allianceTask_completeTip"));
            }
            else {
                progressbar.setPercentage(taskNum / data.value);
                progressbar.setText(taskNum + "/" + data.value);
            }
            var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acBattlePassTaskTip2", code), [String(Math.max(0, data.times - finishNum))]), 22, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, progressbar, [0, -tipTxt.textHeight - 5]);
            view.addChild(tipTxt);
        }
        if (isTaskFinish) {
            var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect2", code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25, 0]);
            view.addChild(flag);
            view._btn = flag;
        }
        else {
            if (taskNum >= data.value) {
                var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, "taskCollect", view.collectHandler, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25, 0]);
                view.addChild(btn);
                view._btn = btn;
            }
            else {
                topbg.setRes(loseimgStr);
                //是否过期
                var curRound = view.vo.getCurRound();
                if (curRound > data.round) {
                    var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect1", code));
                    App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25, 0]);
                    view.addChild(flag);
                    view._btn = flag;
                }
                else {
                    var btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_RED, "allianceBtnGo", view.collectHandler, view);
                    App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25, 0]);
                    view.addChild(btn);
                    view._btn = btn;
                    if (!view.vo.isInActivity()) {
                        App.DisplayUtil.changeToGray(btn);
                    }
                    else {
                        App.DisplayUtil.changeToNormal(btn);
                    }
                }
            }
        }
    };
    AcBattlePassViewTab2ScrollItem.prototype.collectHandler = function (evt) {
        var view = this;
        var data = view._data;
        var taskNum = view.vo.getTaskValue(data.questType, data.round);
        var finishNum = view.vo.getTaskFinishNum(data.questType, data.round);
        var isTaskFinish = finishNum >= data.times;
        if (view.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        //是否过期
        if (taskNum >= data.value) {
            //发消息
            // if(!view.vo.isInActivity()){
            // 	App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
            // 	return;
            // }
            view.vo.selIdx = view._index;
            NetManager.request(NetRequestConst.REQUEST_BATTLEPASS_TASKRWD, {
                activeId: view.acTivityId,
                questType: data.questType,
                taskType: 1,
                round: data.round
            });
        }
        else {
            if (!view.vo.isInActivity()) {
                App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
                return;
            }
            var curRound = view.vo.getCurRound();
            if (curRound > data.round) {
                App.CommonUtil.showTip(LanguageManager.getlocal("mailOver"));
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
    };
    AcBattlePassViewTab2ScrollItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._btn.x + 20, view._btn.y);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcBattlePassViewTab2ScrollItem.prototype.dispose = function () {
        var view = this;
        view._data = null;
        view._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab2ScrollItem;
}(ScrollListItem));
__reflect(AcBattlePassViewTab2ScrollItem.prototype, "AcBattlePassViewTab2ScrollItem");
//# sourceMappingURL=AcBattlePassViewTab2ScrollItem.js.map