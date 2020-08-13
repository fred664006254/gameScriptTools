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
 * 任务详情弹板
 * author yanyuling
 * date 2017/10/13
 * @class MainTaskDetailPopupView
 */
var MainTaskPopupView = (function (_super) {
    __extends(MainTaskPopupView, _super);
    function MainTaskPopupView() {
        return _super.call(this) || this;
    }
    MainTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_TASK_GETMAINTASK), this.doCollectCallback, this);
        Api.rookieVoApi.checkNextStep();
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);
        var bg = BaseBitmap.create("public_9v_bg12");
        bg.width = 530;
        bg.height = 345;
        bg.setPosition((this.viewBg.width - bg.width) / 2, 10);
        this._nodeContainer.addChild(bg);
        // let rbg:BaseBitmap = BaseBitmap.create("public_tc_bg03");
        // rbg.width = 502;
        // rbg.height = 145;
        // rbg.setPosition(bg.x+(bg.width-rbg.width)/2,bg.y + 15);
        // this._nodeContainer.addChild(rbg);
        // let leftF = BaseBitmap.create("public_tcdw_bg01");
        // leftF.x = rbg.x + 5 ;
        // leftF.y = rbg.y + 3;
        // this._nodeContainer.addChild(leftF);
        // let rightF = BaseBitmap.create("public_tcdw_bg02");
        // rightF.x = rbg.x + rbg.width - rightF.width - 5 ;
        // rightF.y = rbg.y + 3;
        // this._nodeContainer.addChild(rightF);
        this._rewardContainer = new BaseDisplayObjectContainer();
        this._rewardContainer.width = bg.width;
        this._nodeContainer.addChild(this._rewardContainer);
        this._nameBg = BaseBitmap.create("public_ts_bg01");
        this._nodeContainer.addChild(this._nameBg);
        // let deltaY = 35;
        this._taskNameTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_WARN_GREEN_NEW);
        this._taskNameTxt.x = this.viewBg.width / 2 - this._taskNameTxt.width / 2;
        this._taskNameTxt.y = 30;
        this._nodeContainer.addChild(this._taskNameTxt);
        this._nameBg.width = this._taskNameTxt.width + 150;
        this._nameBg.x = this._taskNameTxt.x + this._taskNameTxt.width / 2 - this._nameBg.width / 2;
        this._nameBg.y = this._taskNameTxt.y + this._taskNameTxt.height / 2 - this._nameBg.height / 2;
        //名字左右的线
        // this._nameLine1 = BaseBitmap.create("public_v_huawen01");
        // // line1.width = 480;
        // this._nameLine1.x = this._taskNameTxt.x - 20 - this._nameLine1.width;
        // this._nameLine1.y = this._taskNameTxt.y + this._taskNameTxt.height / 2 - this._nameLine1.height / 2;
        // this._nodeContainer.addChild(this._nameLine1);
        // this._nameLine2 = BaseBitmap.create("public_v_huawen01");
        // // line1.width = 480;
        // this._nameLine2.scaleX = -1;
        // this._nameLine2.x = this._taskNameTxt.x + this._taskNameTxt.width + 20 + this._nameLine2.width;
        // this._nameLine2.y = this._nameLine1.y;
        // this._nodeContainer.addChild(this._nameLine2);
        this._taskDescTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        this._taskDescTxt.x = this._nameBg.x + this._nameBg.width / 2 - this._taskDescTxt.width / 2;
        this._taskDescTxt.y = this._nameBg.y + this._nameBg.height + 15;
        this._nodeContainer.addChild(this._taskDescTxt);
        this._taskAimTxt = ComponentManager.getTextField("", TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        this._taskAimTxt.x = this._taskDescTxt.x;
        this._taskAimTxt.y = this._taskDescTxt.y + this._taskDescTxt.height + 10;
        this._nodeContainer.addChild(this._taskAimTxt);
        var line = BaseBitmap.create("public_line4");
        line.width = 460;
        line.x = this.viewBg.width / 2 - line.width / 2;
        line.y = bg.y + 120;
        this._nodeContainer.addChild(line);
        var taskRewardTxt = ComponentManager.getTextField(LanguageManager.getlocal("taskReward"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BROWN_NEW);
        taskRewardTxt.x = this.viewBg.width / 2 - taskRewardTxt.width / 2;
        taskRewardTxt.y = line.y + line.height + 7;
        this._nodeContainer.addChild(taskRewardTxt);
        //奖励物资,还有特效
        this._rewardContainer.y = taskRewardTxt.y + taskRewardTxt.height + 7;
        this._rewardContainer.x = this.viewBg.width / 2 - this._rewardContainer.width / 2; //taskRewardTxt.x  + 100;
        // rbg.y = this._rewardContainer.y-10;
        var goBtn = ComponentManager.getButton(ButtonConst.BTN_BIG_YELLOW, "taskGoBtn", this.goHandler, this);
        goBtn.x = bg.x + bg.width / 2 - goBtn.width / 2;
        goBtn.y = bg.y + bg.height - goBtn.height;
        // goBtn.setColor(TextFieldConst.COLOR_BLACK);
        this._nodeContainer.addChild(goBtn);
        this._goBtn = goBtn;
        this.refreshUIInfo();
    };
    MainTaskPopupView.prototype.refreshUIInfo = function () {
        this._taskId = Api.mainTaskVoApi.getCurMainTaskId(); //this.param.itemId ? this.param.itemId : "101001";
        var taskCfg = Config.MaintaskCfg.getTaskCfgByTaskId(this._taskId);
        /**
         * 完成所有的任务，不需要继续刷新
         */
        if (!this._taskId || !taskCfg) {
            return;
        }
        if (this._collectFlag) {
            this._collectFlag.visible = false;
        }
        this._goBtn.visible = true;
        var nameAndDesc = Api.mainTaskVoApi.getCurTaskNameAndDescTxt();
        this._taskDescTxt.text = nameAndDesc[1];
        this._taskNameTxt.text = nameAndDesc[0];
        this._taskNameTxt.x = this.viewBg.width / 2 - this._taskNameTxt.width / 2;
        // this._nameBg.x = this._taskNameTxt.x + this._taskNameTxt.width/2 - this._nameBg.width/2;
        // this._nameBg.y = this._taskNameTxt.y + this._taskNameTxt.height/2 - this._nameBg.height/2;
        this._nameBg.width = this._taskNameTxt.width + 150;
        this._nameBg.x = this._taskNameTxt.x + this._taskNameTxt.width / 2 - this._nameBg.width / 2;
        this._nameBg.y = this._taskNameTxt.y + this._taskNameTxt.height / 2 - this._nameBg.height / 2;
        // this._nameLine1.x = this._taskNameTxt.x - 20 - this._nameLine1.width;
        // this._nameLine1.y = this._taskNameTxt.y + this._taskNameTxt.height / 2 - this._nameLine1.height / 2;
        // this._nameLine2.x = this._taskNameTxt.x + this._taskNameTxt.width + 20 + this._nameLine2.width;
        // this._nameLine2.y = this._nameLine1.y;
        var tarColor = TextFieldConst.COLOR_WARN_RED_NEW;
        if (Api.mainTaskVoApi.isCurTaskReach()) {
            tarColor = TextFieldConst.COLOR_WARN_GREEN_NEW;
        }
        this._taskAimTxt.text = Api.mainTaskVoApi.getCurTaskAniTxt();
        this._taskDescTxt.x = this._nameBg.x + this._nameBg.width / 2 - this._taskDescTxt.width / 2;
        this._taskDescTxt.y = this._nameBg.y + this._nameBg.height + 15;
        this._taskAimTxt.x = this._taskDescTxt.x;
        this._taskAimTxt.y = this._taskDescTxt.y + this._taskDescTxt.height + 10;
        var rewardArr = GameData.formatRewardItem(taskCfg.reward);
        this._rewardContainer.removeChildren();
        var sWidth = 10;
        var rewardWidth = rewardArr.length * 106 + (rewardArr.length - 1) * sWidth;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            // iconItem.x =   index * (iconItem.width+10);
            iconItem.x = this._rewardContainer.width / 2 - rewardWidth / 2 + (106 + sWidth) * index;
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
    MainTaskPopupView.prototype.doCollectCallback = function () {
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
            // this._collectFlag.anchorOffsetX = this._collectFlag.width/2;
            // this._collectFlag.anchorOffsetY = this._collectFlag.height/2;
            // this._collectFlag.x = this._goBtn.x + this._collectFlag.anchorOffsetX  +30;
            // this._collectFlag.y = this._goBtn.y + this._collectFlag.anchorOffsetY -20;
            this._collectFlag.x = this._goBtn.x + this._goBtn.width / 2 - this._collectFlag.width / 2;
            this._collectFlag.y = this._goBtn.y + this._goBtn.height / 2 - this._collectFlag.height / 2;
            this._nodeContainer.addChild(this._collectFlag);
        }
        this._collectFlag.setScale(1.6);
        this._collectFlag.visible = true;
        var tmpThis = this;
        egret.Tween.get(this._collectFlag, { loop: false }).to({ scaleX: 1, scaleY: 1 }, 200).wait(600).call(function () {
            /*
            if(Api.switchVoApi.checkOpenForcedShare()&&this._taskId == "1")
            {
                let shareVo = Api.otherInfoVoApi.getGeneralShareInfo();
                if(shareVo && shareVo.sharenum < Config.GameprojectCfg.rewardAllNum && shareVo.et <= GameData.serverTime)
                {
                    ViewController.getInstance().openView(ViewConst.POPUP.SHAREPOPUPVIEW,{"isTask":1});
                }
                
            }
            */
            tmpThis.refreshUIInfo(); //领取成功之后刷新
        }, this);
    };
    //需要针对每个任务处理跳转关系
    MainTaskPopupView.prototype.goHandler = function () {
        Api.rookieVoApi.checkNextStep();
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
        this.hide();
        //设置主线引导标示
        Api.mainTaskVoApi.isGoExcuting = true;
        Api.mainTaskVoApi.goExcutingUiName = openType;
        switch (questType) {
            case 105://官品等级----官品等级达到X
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
                else if (openType == "personup") {
                }
                else if (openType == "persondel") {
                }
                else if (openType == "unlock") {
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
        this.hide();
    };
    MainTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    MainTaskPopupView.prototype.closeHandler = function () {
        if (String(this._taskId) == "1") {
            var reportValue = "mtask_" + this._taskId + "_0";
            StatisticsHelper.reportLoadData(reportValue);
        }
        this.hide();
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
        // this._nameLine1 = null;
        // this._nameLine2 = null;
        _super.prototype.dispose.call(this);
    };
    return MainTaskPopupView;
}(PopupView));
__reflect(MainTaskPopupView.prototype, "MainTaskPopupView");
