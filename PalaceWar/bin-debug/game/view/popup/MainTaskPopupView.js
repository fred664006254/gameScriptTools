var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
var MainTaskPopupView = /** @class */ (function (_super) {
    __extends(MainTaskPopupView, _super);
    function MainTaskPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(MainTaskPopupView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    MainTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        Api.rookieVoApi.checkNextStep();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 520;
        bg.height = 310;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 9;
        this._nodeContainer.addChild(bg);
        bg.alpha = 0;
        var rbg = BaseBitmap.create("public_9_bg94");
        rbg.width = bg.width - 20;
        rbg.height = 160;
        rbg.x = this.viewBg.x + this.viewBg.width / 2 - rbg.width / 2;
        this._nodeContainer.addChild(rbg);
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._nodeContainer.addChild(this._rewardContainer);
        var deltaY = 33;
        var taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_BROWN3);
        taskNameTxt.x = 70;
        taskNameTxt.y = 25;
        this._nodeContainer.addChild(taskNameTxt);
        this._taskNameTxt = taskNameTxt;
        var taskDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        taskDescTxt.x = taskNameTxt.x;
        taskDescTxt.y = taskNameTxt.y + deltaY;
        this._nodeContainer.addChild(taskDescTxt);
        this._taskDescTxt = taskDescTxt;
        var taskAimTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        taskAimTxt.x = taskNameTxt.x;
        taskAimTxt.y = taskDescTxt.y + 27;
        this._nodeContainer.addChild(taskAimTxt);
        this._taskAimTxt = taskAimTxt;
        var taskRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskReward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_BLACK);
        taskRewardTxt.x = taskNameTxt.x;
        taskRewardTxt.y = taskAimTxt.y + 27;
        this._nodeContainer.addChild(taskRewardTxt);
        //奖励物资,还有特效
        this._rewardContainer.y = taskRewardTxt.y + deltaY + 5;
        this._rewardContainer.x = taskNameTxt.x;
        rbg.y = this._rewardContainer.y - 10;
        var goBtn = ComponentManager.getButton(ButtonConst.BTN2_BIG_YELLOW, "taskGoBtn", this.goHandler, this);
        goBtn.x = bg.x + bg.width / 2 - goBtn.width / 2;
        goBtn.y = bg.y + bg.height + 15;
        goBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(goBtn);
        this._goBtn = goBtn;
        this.refreshUIInfo();
        Api.rookieVoApi.checkNextStep();
    };
    MainTaskPopupView.prototype.refreshUIInfo = function () {
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        /**
         * 完成所有的任务，不需要继续刷新
         */
        if (!this._taskId || !taskCfg) {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_NOTICE_TASK_END);
            this.hide();
            return;
        }
        if (this._collectFlag) {
            this._collectFlag.visible = false;
        }
        this._goBtn.visible = true;
        var nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt();
        this._taskDescTxt.text = nameAndDesc[1];
        this._taskNameTxt.text = nameAndDesc[0];
        var tarColor = TextFieldConst.COLOR_WARN_RED;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN4;
        }
        this._taskAimTxt.text = LanguageManager.getlocal("taskAim", [String(tarColor), String(Api.mainTaskVoApi.getCurMainTaskValue()) + "/" + String(taskCfg.value)]);
        var rewardArr = GameData.formatRewardItem(taskCfg.reward);
        this._rewardContainer.removeChildren();
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.x = index * (iconItem.width + 10) + 20;
            iconItem.y = 15;
            this._rewardContainer.addChild(iconItem);
        }
        //可领取
        if (Api.mainTaskVoApi.getCurMainTaskValue() >= taskCfg.value) {
            this._goBtn.setText("taskCollect");
            this._collectEnable = true;
        }
        else {
            this._goBtn.setText("taskGoBtn");
            this._collectEnable = false;
        }
    };
    MainTaskPopupView.prototype.doCollectCallback = function (evt) {
        var _this = this;
        var rData = evt.data;
        if (!rData.ret) {
            return;
        }
        //飘奖励，盖章，然后刷新
        this._goBtn.visible = false;
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var rewardList = GameData.formatRewardItem(taskCfg.reward);
        // let list = [];
        // for(let i = 0;i < rewardList.length;i++)
        // {
        // 	let rewardItemVo:RewardItemVo = rewardList[i];
        // 	list.push({"icon":rewardItemVo.icon,"message":rewardItemVo.name + "+" + rewardItemVo.num});
        // }
        App.CommonUtil.playRewardFlyAction(rewardList);
        if (this._collectFlag == null) {
            this._collectFlag = BaseBitmap.create("collectflag");
            this._collectFlag.anchorOffsetX = this._collectFlag.width / 2;
            this._collectFlag.anchorOffsetY = this._collectFlag.height / 2;
            this._collectFlag.x = this._goBtn.x + this._collectFlag.anchorOffsetX;
            this._collectFlag.y = this._goBtn.y + this._collectFlag.anchorOffsetY - 30;
            this._nodeContainer.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.3);
        this._collectFlag.visible = true;
        var tmpThis = this;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 0.8, scaleY: 0.8 }, 400).wait(600).call(function () {
            if (Api.switchVoApi.checkOpenForcedShare() && _this._taskId == "1") {
                var shareVo = Api.otherInfoVoApi.getGeneralShareInfo();
                if (shareVo && shareVo.sharenum < Config.GameprojectCfg.rewardAllNum && shareVo.et <= GameData.serverTime) {
                    ViewController.getInstance().openView(ViewConst.POPUP.SHAREPOPUPVIEW, { "isTask": 1 });
                }
            }
            tmpThis.refreshUIInfo(); //领取成功之后刷新
        }, this);
    };
    //需要针对每个任务处理跳转关系
    MainTaskPopupView.prototype.goHandler = function () {
        if (String(this._taskId) == "1") {
            var reportValue = "mtask_" + this._taskId + "_1";
            StatisticsHelper.reportLoadData(reportValue);
        }
        if (this._collectEnable) {
            //请求网络,领取奖励
            NetManager.request(NetRequestConst.REQUEST_TASK_GETMAINTASK, { taskId: this._taskId });
            return;
        }
        var cfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        var questType = cfg.questType;
        var cfgValue = cfg.value;
        var openType = cfg.openType;
        Api.mainTaskVoApi.isGoExcuting = true;
        Api.mainTaskVoApi.goExcutingUiName = openType;
        switch (questType) {
            case 105: //官品等级----官品等级达到X
                var curLv = Api.playerVoApi.getPlayerLevel();
                var nextLvCfg = Config.LevelCfg.getCfgByLevel((curLv + 1).toString());
                if (Api.playerVoApi.getPlayerExp() < nextLvCfg.exp) {
                    ViewController.getInstance().openView(ViewConst.COMMON.CHALLENGEVIEW);
                }
                else {
                    PlayerBottomUI.getInstance().show();
                }
                // ViewController.getInstance().openView(ViewConst.COMMON.PROMOTIONVIEW);
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
            case 201: //{门客ID}将领达到X级----华安等级达到10级
                var view = ViewController.getInstance().getView(ViewConst.COMMON.SERVANTINFOVIEW);
                if (view) {
                    view.hide();
                    Api.mainTaskVoApi.isGoExcuting = true;
                }
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, cfg.need);
                break;
            case 202: //升级门客----至少1名门客等级达到40级
                var serView = ViewController.getInstance().getView(ViewConst.COMMON.SERVANTINFOVIEW);
                if (serView) {
                    serView.hide();
                    Api.mainTaskVoApi.isGoExcuting = true;
                }
                var taskServantId = Api.servantVoApi.getMainTaskNeedServant(202);
                if (!taskServantId) {
                    taskServantId = Api.servantVoApi.getServantMinId();
                }
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, taskServantId);
                break;
            case 204:
                ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, Api.servantVoApi.getIdOfTotalMax());
                break;
            case 205:
                var skillSerId = Api.servantVoApi.getMainTaskNeedServant(205);
                if (skillSerId) {
                    ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, skillSerId);
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
                }
                break;
            case 206:
                var serId = Api.servantVoApi.getMainTaskNeedServant(206);
                if (!serId) {
                    ViewController.getInstance().openView(ViewConst.COMMON.SERVANTVIEW);
                }
                else {
                    ViewController.getInstance().openView(ViewConst.COMMON.SERVANTINFOVIEW, serId);
                }
                break;
            // case 301://随机传唤次数----随机传唤X次
            // 	ViewController.getInstance().openView(ViewConst.COMMON.WIFEVIEW_TAB1);
            // 	break;
            case 302: //宠幸红颜次数----宠幸红颜次数达到X次 
            case 305: //红颜技能
                ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: Api.wifeVoApi.getMainTaskIntimacyMax(), handler: null });
                break;
            case 306: //赏赐红颜
                ViewController.getInstance().openView(ViewConst.COMMON.WIFEOPTVIEW, { id: Api.wifeVoApi.getIdOfIntimacyMax(), handler: null });
                break;
            default:
                var openType_1 = cfg.openType;
                if (openType_1 == "alliance") {
                    Api.allianceVoApi.openMainView();
                }
                else if (openType_1 == "studyatk") {
                    Api.studyatkVoApi.openMainView();
                }
                else if (openType_1 == "welfare") {
                    ViewController.getInstance().openView("WelfareView|" + cfg.openNeed);
                }
                else if (openType_1 == "level" || openType_1 == "arrival" || openType_1 == "") {
                    PlayerBottomUI.getInstance().show();
                }
                else if (openType_1 == "rank") {
                    ViewController.getInstance().openView(ViewConst.COMMON.RANKSINGLEVIEW);
                }
                else {
                    var viewName = App.StringUtil.firstCharToUper(openType_1);
                    if (Api.switchVoApi.checkNewPalace() && viewName == "Palace") {
                        viewName = "PalaceNew";
                    }
                    if (egret.getDefinitionByName(viewName + "View")) {
                        ViewController.getInstance().openView(viewName + "View", { isMainTask: 1 });
                    }
                    else if (egret.getDefinitionByName(viewName + "PopupView")) //可以跳转
                     {
                        ViewController.getInstance().openView(viewName + "PopupView");
                    }
                }
                break;
        }
        this.hide();
    };
    MainTaskPopupView.prototype.closeHandler = function () {
        if (String(this._taskId) == "1") {
            var reportValue = "mtask_" + this._taskId + "_0";
            StatisticsHelper.reportLoadData(reportValue);
        }
        this.hide();
    };
    MainTaskPopupView.prototype.getBgExtraHeight = function () {
        return 30;
    };
    MainTaskPopupView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        this._nodeContainer = null;
        this._rewardContainer = null;
        this._taskId = null;
        this._taskDescTxt = null;
        this._taskAimTxt = null;
        this._taskNameTxt = null;
        this._goBtn = null;
        this._collectEnable = false;
        this._collectFlag = null;
        _super.prototype.dispose.call(this);
    };
    return MainTaskPopupView;
}(PopupView));
//# sourceMappingURL=MainTaskPopupView.js.map