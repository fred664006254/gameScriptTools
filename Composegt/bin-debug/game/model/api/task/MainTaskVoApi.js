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
 * 主线任务api
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskVoApi
 */
var MainTaskVoApi = (function (_super) {
    __extends(MainTaskVoApi, _super);
    //X步之前需要指引小手
    function MainTaskVoApi() {
        var _this = _super.call(this) || this;
        _this._isGoExcuting = false;
        _this._goExcutingUiName = "";
        _this._isKeepGuide = false;
        _this.curTaskId = null;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), _this.doCollectCallback, _this);
        return _this;
    }
    MainTaskVoApi.prototype.getCurMainTaskId = function () {
        if (PlatformManager.checkIs37WdShenheSp()) {
            return null;
        }
        return this.mainTaskVo.taskId;
    };
    MainTaskVoApi.prototype.getCurMainTaskValue = function () {
        return this.mainTaskVo.value;
    };
    MainTaskVoApi.prototype.getCurTaskAniTxt = function () {
        var textani = "";
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = taskCfg.questType;
        var tarColor = TextFieldConst.COLOR_WARN_RED2;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN2;
        }
        if (questType == 105) {
            var curTxt = Api.playerVoApi.getPlayerMinLevelStr(Api.mainTaskVoApi.getCurMainTaskValue());
            var needTxt = Api.playerVoApi.getPlayerMinLevelStr(taskCfg.value);
            textani = LanguageManager.getlocal("taskAim", [String(tarColor), curTxt + "/" + needTxt]);
        }
        else if (questType == 106) {
            var bid1 = Api.challengeVoApi.getBigChannelIdByCid(Api.mainTaskVoApi.getCurMainTaskValue() - 1);
            var bid2 = Api.challengeVoApi.getBigChannelIdByCid(taskCfg.value - 1);
            textani = LanguageManager.getlocal("taskAim", [String(tarColor), bid1 + "/" + bid2]);
        }
        else {
            textani = LanguageManager.getlocal("taskAim", [String(tarColor), App.StringUtil.changeIntToText3(Api.mainTaskVoApi.getCurMainTaskValue()) + "/" + App.StringUtil.changeIntToText3(taskCfg.value)]);
        }
        return textani;
    };
    MainTaskVoApi.prototype.getCurTaskNameAndDescTxt = function () {
        // taskId ="105001";
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = taskCfg.questType;
        var resultStr = [];
        var tmpNameTxt = undefined;
        var tmpDescTxt = undefined;
        if (questType == 201) {
            var servantName = LanguageManager.getlocal("servant_name" + taskCfg.need);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [servantName]);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [servantName, App.StringUtil.changeIntToText3(taskCfg.value)]);
        }
        else if (questType == 901) {
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [taskCfg.value, taskCfg.need]);
        }
        else if (questType == 105) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [LanguageManager.getlocal("officialTitle" + taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 202) {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.need), App.StringUtil.changeIntToText3(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 206) {
            var clvStr = LanguageManager.getlocal("servant_clvStr" + taskCfg.value);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.need), clvStr]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 106) {
            var bcid = Math.floor(taskCfg.value / 41) + 1;
            var chaellageName = LanguageManager.getlocal("challengeTitle" + bcid);
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [chaellageName]);
        }
        else {
            tmpDescTxt = LanguageManager.getlocal("taskTxt") + LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        resultStr.push(tmpNameTxt);
        resultStr.push(tmpDescTxt);
        return resultStr;
    };
    //主界面用
    MainTaskVoApi.prototype.getCurTaskNameAndDescTxt2 = function () {
        // taskId ="105001";
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = taskCfg.questType;
        var resultStr = [];
        var tmpNameTxt = undefined;
        var tmpDescTxt = undefined;
        if (questType == 201) {
            var servantName = LanguageManager.getlocal("servant_name" + taskCfg.need);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [servantName]);
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [servantName, String(taskCfg.value)]);
        }
        else if (questType == 901) {
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [taskCfg.value, taskCfg.need]);
        }
        else if (questType == 105) {
            var strParam = Api.playerVoApi.getPlayerMinLevelStr(taskCfg.value);
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [strParam]);
            //tmpDescTxt = LanguageManager.getlocal("taskDesc"+questType,[LanguageManager.getlocal(`officialTitle`,[taskCfg.value]) ]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 202) {
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.need), App.StringUtil.changeIntToText3(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 206) {
            var clvStr = LanguageManager.getlocal("servant_clvStr" + taskCfg.value);
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.need), clvStr]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        else if (questType == 106) {
            var bcid = Math.floor(taskCfg.value / 41) + 1;
            var chaellageName = LanguageManager.getlocal("challengeTitle" + bcid);
            var bid = Api.challengeVoApi.getBigChannelIdByCid(taskCfg.value - 1);
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [bid + ""]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType, [chaellageName]);
        }
        else {
            tmpDescTxt = LanguageManager.getlocal("taskDesc" + questType, [App.StringUtil.changeIntToText3(taskCfg.value)]);
            tmpNameTxt = LanguageManager.getlocal("taskName" + questType);
        }
        tmpDescTxt = tmpDescTxt + this.getCurTaskAniTxt();
        resultStr.push(tmpNameTxt);
        resultStr.push(tmpDescTxt);
        return resultStr;
    };
    MainTaskVoApi.prototype.isCurTaskReach = function () {
        var taskId = this.getCurMainTaskId();
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (this.getCurMainTaskValue() >= taskCfg.value) {
            return true;
        }
        return false;
    };
    MainTaskVoApi.prototype.checkShowGuide = function (uiName, param) {
        if (Api.rookieVoApi.isInGuiding || !Api.switchVoApi.checkMainTaskGuide() || Api.rookieVoApi.isGuiding) {
            return;
        }
        if (this._isGoExcuting) {
            var taskId = this.getCurMainTaskId();
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
            if (uiName && taskCfg.questType == 301) {
                return;
            }
            //方案1
            if (!this._isKeepGuide) {
                this.isGoExcuting = false;
            }
            MainTaskGuideNode.getInstance().show(uiName);
            if (uiName && this._isKeepGuide) {
                MainTaskGuideNode.getInstance().resetUIPos(uiName);
            }
            //方案2
            // MainTaskGuideNode.showGuideInstance(uiName);
        }
    };
    //需要针对每个任务处理跳转关系
    MainTaskVoApi.prototype.goHandler = function () {
        Api.rookieVoApi.checkNextStep();
        var taskId = Api.mainTaskVoApi.getCurMainTaskId();
        if (String(taskId) == "1") {
            var reportValue = "mtask_" + taskId + "_1";
            StatisticsHelper.reportLoadData(reportValue);
        }
        //可领取
        var collectEnable = false;
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
            collectEnable = true;
        }
        else {
            collectEnable = false;
        }
        if (collectEnable) {
            //请求网络,领取奖励
            this.curTaskId = taskId;
            NetManager.request(NetRequestConst.REQUEST_TASK_GETMAINTASK, { taskId: taskId });
            return;
        }
        var cfg = Config.MaintaskCfg.getTaskCfgByTaskId(taskId);
        var questType = cfg.questType;
        var cfgValue = cfg.value;
        var openType = cfg.openType;
        //设置主线引导标示
        Api.mainTaskVoApi.isGoExcuting = true;
        Api.mainTaskVoApi.goExcutingUiName = openType;
        switch (questType) {
            case 105://官品等级----官品等级达到X
                var curMinLv = Api.playerVoApi.getPlayerMinLevelId();
                var nextLvCfg = Config.MinlevelCfg.getCfgByMinLevelId(curMinLv + 1);
                if (nextLvCfg && Api.mainTaskVoApi.getHistoryMaxLevyRate() < nextLvCfg.needRate) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                }
                else if (nextLvCfg && Api.playerVoApi.getPlayerExp() < nextLvCfg.exp) {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                }
                else {
                    // PlayerBottomUI.getInstance().show();
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUHEADHAND);
                }
                break;
            case 107:
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW_TAB2, Api.servantVoApi.getIdOfTotalMax());
                break;
            case 110:
                var _childInfoVoList = Api.childVoApi.getChildrenVoList();
                var _mainTaskHandChoosedChild = void 0;
                if (_childInfoVoList[0]) {
                    _mainTaskHandChoosedChild = _childInfoVoList[0].id;
                    for (var index = 0; index < _childInfoVoList.length; index++) {
                        var childVo = _childInfoVoList[index];
                        var childCfg = GameConfig.config.childCfg[childVo.quality.toString()];
                        if (childVo.level < childCfg.lv) {
                            _mainTaskHandChoosedChild = childVo.id;
                            break;
                        }
                    }
                }
                ViewController.getInstance().openView(ViewConst.COMMON.CHILDVIEW, { childId: _mainTaskHandChoosedChild });
                break;
            case 114:// ----膜拜大神----膜拜次数达X次 直接打开本服榜单
                ViewController.getInstance().openView(ViewConst.COMMON.RANKSINGLEVIEW);
                break;
            case 201://{门客ID}将领达到X级----华安等级达到10级
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, cfg.need);
                break;
            case 204:
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, Api.servantVoApi.getIdOfTotalMax());
                break;
            // case 301://随机传唤次数----随机传唤X次
            // 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
            // 	break;
            case 302: //宠幸红颜次数----宠幸红颜次数达到X次 
            case 305: //赏赐红颜
            case 306://赏赐红颜
                ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: Api.wifeVoApi.getIdOfIntimacyMax(), handler: null });
                break;
            default:
                if (openType == "alliance") {
                    Api.allianceVoApi.openMainView();
                }
                else if (openType == "studyatk") {
                    Api.studyatkVoApi.openMainView();
                }
                else if (openType == "welfare") {
                    ViewController.getInstance().openView("WelfareView|" + cfg.openNeed);
                }
                else if (openType == "level" || openType == "arrival" || openType == "") {
                    // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
                    PlayerBottomUI.getInstance().show();
                }
                else if (openType == "search" && Api.rookieVoApi.curGuideKey == "search") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_DINNER_GUIDE);
                }
                else if (openType == "challenge") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_MAINUI_CHALLENGE);
                }
                else if (openType == "personup") {
                    // App.CommonUtil.showTip(LanguageManager.getlocal( "mainTaskComoposeTip"));
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                }
                else if (openType == "manage") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                }
                else if (openType == "personget") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_GOCOMPOSESCENE);
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_GUIDE_SHOWHAND);
                }
                else if (openType == "persondel") {
                }
                else if (openType == "unlock") {
                    App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_COMPOSE_SHOWUNLOCK);
                }
                else {
                    var viewName = App.StringUtil.firstCharToUper(openType);
                    if (egret.getDefinitionByName(viewName + "View")) {
                        // if (cfg.questType == 801)
                        // {
                        // 	ViewController.getInstance().openView(viewName+ "View|1");
                        // }else if (cfg.questType == 802){
                        // 	ViewController.getInstance().openView(viewName+ "View|2");
                        // }
                        // else{
                        ViewController.getInstance().openView(viewName + "View");
                        // }
                    }
                    else if (egret.getDefinitionByName(viewName + "PopupView")) {
                        ViewController.getInstance().openView(viewName + "PopupView");
                    }
                }
                break;
        }
    };
    MainTaskVoApi.prototype.doCollectCallback = function () {
        if (this.curTaskId == "11") {
            // Api.rookieVoApi.curGuideKey = "delperson";
            // Api.rookieVoApi.insertWaitingGuide({"idx":"delperson_1"});
            // Api.rookieVoApi.checkWaitingGuide();
        }
        //飘奖励，盖章，然后刷新
        if (this.curTaskId) {
            var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this.curTaskId);
            if (taskCfg) {
                var pos = MainUI.getInstance()._taskContainer.localToGlobal(200, -280);
                var rewardList = GameData.formatRewardItem(taskCfg.reward);
                App.CommonUtil.playRewardFlyAction(rewardList, pos);
            }
        }
    };
    MainTaskVoApi.prototype.hideGuide = function () {
        if (!Api.switchVoApi.checkMainTaskGuide()) {
            return;
        }
        if (!MainTaskGuideNode.hasInstance()) {
            this.isGoExcuting = false;
            this._isKeepGuide = false;
            this._goExcutingUiName = "";
            return;
        }
        //方案1
        this._goExcutingUiName = "";
        if (this._isKeepGuide) {
            MainTaskGuideNode.getInstance().resetUIPos();
        }
        else {
            this.isGoExcuting = false;
            MainTaskGuideNode.hideInstance();
        }
        //方案2
        // MainTaskGuideNode.hideGuideInstance();
    };
    MainTaskVoApi.prototype.getHistoryMaxLevyRate = function () {
        return this.mainTaskVo.task["906"] || 0;
    };
    Object.defineProperty(MainTaskVoApi.prototype, "goExcutingUiName", {
        set: function (name) {
            this._goExcutingUiName = name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainTaskVoApi.prototype, "isGoExcuting", {
        set: function (isV) {
            this._isGoExcuting = isV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainTaskVoApi.prototype, "isKeepGuide", {
        set: function (isV) {
            this._isKeepGuide = isV;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MainTaskVoApi.prototype, "needGuideTask", {
        get: function () {
            return 62;
        },
        enumerable: true,
        configurable: true
    });
    MainTaskVoApi.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        this.curTaskId = null;
        _super.prototype.dispose.call(this);
    };
    return MainTaskVoApi;
}(BaseVoApi));
__reflect(MainTaskVoApi.prototype, "MainTaskVoApi");
