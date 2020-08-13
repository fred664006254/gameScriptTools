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
 * desc : 令牌兑换itemrender
 */
var AcBattlePassViewTab3ScrollItem = (function (_super) {
    __extends(AcBattlePassViewTab3ScrollItem, _super);
    function AcBattlePassViewTab3ScrollItem() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._btn = null;
        _this._code = '';
        return _this;
    }
    AcBattlePassViewTab3ScrollItem.prototype.getSpaceY = function () {
        return 5;
    };
    Object.defineProperty(AcBattlePassViewTab3ScrollItem.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3ScrollItem.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_BATTLEPASS, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3ScrollItem.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_BATTLEPASS + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBattlePassViewTab3ScrollItem.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcBattlePassView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcBattlePassViewTab3ScrollItem.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view.width = 610;
        view.height = 147 + 5;
        view._data = data;
        var code = view.uiCode;
        var bgstr = this.vo.isNewUi() ? "public_popupscrollitembg" : "public_9_bg66";
        var bg = BaseBitmap.create(bgstr);
        bg.width = view.width;
        bg.height = view.height - 5;
        view.addChild(bg);
        var winimgStr = this.vo.isNewUi() ? "battlepassprobggreen" : "battlepassgreen";
        var loseimgStr = this.vo.isNewUi() ? "shopview_itemtitle" : "alliance_taskAttrbg1";
        var topbg = BaseBitmap.create(winimgStr);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, topbg, bg, [0, 3]);
        view.addChild(topbg);
        var kuangbg = BaseBitmap.create("public_9_bg67");
        kuangbg.width = view.width;
        kuangbg.height = view.height - 4;
        view.addChild(kuangbg);
        if (this.vo.isNewUi()) {
            kuangbg.visible = false;
        }
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
        var str = "taskDesc" + data.questType;
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
        var taskNum = view.vo.getSpecialTaskValue(data.questType);
        var finishNum = view.vo.getSpecialTaskFinishNum(data.questType);
        var isTaskFinish = finishNum >= data.times;
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
        if (isTaskFinish) {
            var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect2", code));
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25, 0]);
            view.addChild(flag);
            view._btn = flag;
        }
        else {
            //是否过期
            if (view.vo.isEnd) {
                topbg.setRes(loseimgStr);
                var flag = BaseBitmap.create(App.CommonUtil.getResByCode("battlepasscollect", code));
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [25, 0]);
                view.addChild(flag);
                view._btn = flag;
            }
            else {
                var btnStr = "";
                var btnPic = ButtonConst.BTN_SMALL_YELLOW;
                if (taskNum >= data.value) {
                    btnStr = "taskCollect";
                }
                else {
                    btnPic = ButtonConst.BTN_SMALL_RED;
                    topbg.setRes(loseimgStr);
                    btnStr = "allianceBtnGo";
                }
                var btn = ComponentManager.getButton(btnPic, btnStr, view.collectHandler, view);
                App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [25, 0]);
                view.addChild(btn);
                view._btn = btn;
                if (!view.vo.isInActivity()) {
                    if (taskNum >= data.value) {
                        App.DisplayUtil.changeToNormal(btn);
                    }
                    else {
                        App.DisplayUtil.changeToGray(btn);
                    }
                }
                else {
                    App.DisplayUtil.changeToNormal(btn);
                }
            }
        }
    };
    AcBattlePassViewTab3ScrollItem.prototype.collectHandler = function (evt) {
        var view = this;
        var data = view._data;
        var taskNum = view.vo.getSpecialTaskValue(data.questType);
        var finishNum = view.vo.getSpecialTaskFinishNum(data.questType);
        var isTaskFinish = finishNum >= data.times;
        if (view.vo.et < GameData.serverTime) {
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
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
                taskType: 2
            });
        }
        else {
            //是否过期
            if (!view.vo.isInActivity()) {
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
    };
    AcBattlePassViewTab3ScrollItem.prototype.refreshItem = function (rewards) {
        var view = this;
        var rewardList = GameData.formatRewardItem(rewards);
        var pos = view.localToGlobal(view._btn.x + 20, view._btn.y);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
    };
    AcBattlePassViewTab3ScrollItem.prototype.dispose = function () {
        var view = this;
        view._btn = null;
        view._data = null;
        _super.prototype.dispose.call(this);
    };
    return AcBattlePassViewTab3ScrollItem;
}(ScrollListItem));
__reflect(AcBattlePassViewTab3ScrollItem.prototype, "AcBattlePassViewTab3ScrollItem");
//# sourceMappingURL=AcBattlePassViewTab3ScrollItem.js.map