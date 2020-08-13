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
 * author yanyuling
 */
var AcMonopolyTaskAndRewardView = (function (_super) {
    __extends(AcMonopolyTaskAndRewardView, _super);
    function AcMonopolyTaskAndRewardView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._scrollList = null;
        _this._scrollRewardList = null;
        _this.aid = null;
        _this.code = null;
        _this._aidAndCode = null;
        return _this;
    }
    Object.defineProperty(AcMonopolyTaskAndRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMonopolyTaskAndRewardView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.checkRed, this);
        // App.MessageHelper.addEventListener(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH,this.refreshTaskRed,this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        this._aidAndCode = { "aid": this.aid, "code": this.code };
        var bg = BaseBitmap.create("public_9v_bg03");
        bg.width = GameConfig.stageWidth;
        bg.height = GameConfig.stageHeigth - this.container.y;
        this.addChildToContainer(bg);
        var buttombg = BaseBitmap.create("adult_lowbg");
        buttombg.y = GameConfig.stageHeigth - this.container.y - buttombg.height;
        buttombg.x = this.width / 2 - buttombg.width / 2;
        this.addChildToContainer(buttombg);
        this._cdTxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        this._cdTxt.text = LanguageManager.getlocal("acMonopoly_txt4");
        this._cdTxt.x = buttombg.x + 40;
        this._cdTxt.y = buttombg.y + buttombg.height / 2 - this._cdTxt.height / 2;
        this.addChildToContainer(this._cdTxt);
        var tiptxt = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        tiptxt.text = LanguageManager.getlocal("acMonopoly_txt5");
        tiptxt.x = buttombg.x + buttombg.width - tiptxt.width - 40;
        tiptxt.y = this._cdTxt.y;
        this.addChildToContainer(tiptxt);
        //边框
        var borderBg = BaseBitmap.create("public_9v_bg03");
        borderBg.width = GameConfig.stageWidth;
        borderBg.height = GameConfig.stageHeigth - 69 - this.container.y;
        borderBg.y = 69;
        this.addChildToContainer(borderBg);
        var rect = new egret.Rectangle(0, 0, bg.width - 20, GameConfig.stageHeigth - 240);
        this._scrollList = ComponentManager.getScrollList(AcMonopolyTaskScrollItem, [], rect);
        this._scrollList.setPosition(10, 5);
        this._scrollList.horizontalScrollPolicy = "off";
        this.addChildToContainer(this._scrollList);
        var rect2 = new egret.Rectangle(0, 0, bg.width - 20, GameConfig.stageHeigth - 240);
        this._scrollRewardList = ComponentManager.getScrollList(AcMonopolyTurnRewardScrollItem, [], rect2);
        this._scrollRewardList.y = this._scrollList.y;
        this._scrollRewardList.horizontalScrollPolicy = "off";
        this._scrollRewardList.x = this._scrollList.x;
        this.addChildToContainer(this._scrollRewardList);
        this.selectedTabIndex = this.param.data.showTab;
        this.tabbarGroup.selectedIndex = this.selectedTabIndex;
        this.checkRed();
        this.tick();
    };
    AcMonopolyTaskAndRewardView.prototype.tick = function () {
        if (!this.vo.isStart) {
            this._cdTxt.text = LanguageManager.getlocal("acPunishEnd");
            return false;
        }
        var weet = App.DateUtil.getWeeTs(GameData.serverTime);
        var deltaT = weet + 86400 - GameData.serverTime;
        if (weet + 86400 > this.vo.et) {
            deltaT = this.vo.et - GameData.serverTime;
        }
        this._cdTxt.text = LanguageManager.getlocal("acMonopoly_acCD3", [App.DateUtil.getFormatBySecond(deltaT, 8)]);
        return false;
    };
    AcMonopolyTaskAndRewardView.prototype.checkRed = function () {
        if (this.vo.isShowTaskRed()) {
            this.addRedPoint(0);
        }
        else {
            this.removeRedPoint(0);
        }
        if (this.vo.isShowRewardRed()) {
            this.addRedPoint(1);
        }
        else {
            this.removeRedPoint(1);
        }
        this.refreshTaskRed();
        this.refreshRewardRed();
    };
    AcMonopolyTaskAndRewardView.prototype.changeTab = function () {
        if (this.selectedTabIndex == 0) {
            this._scrollRewardList.visible = false;
            this._scrollList.visible = true;
            this.refreshTaskRed();
        }
        else {
            this._scrollRewardList.visible = true;
            this._scrollList.visible = false;
            this.refreshRewardRed();
        }
    };
    AcMonopolyTaskAndRewardView.prototype.refreshRewardRed = function () {
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var turnReward = cfg.turnReward;
        var list1 = [];
        var list2 = [];
        var list3 = [];
        var vo = this.vo;
        for (var index = 0; index < turnReward.length; index++) {
            var element = turnReward[index];
            var flag = vo.getTurnFlag(element.id);
            if (flag) {
                list2.push(element);
            }
            else {
                list1.push(element);
            }
        }
        var list = list1.concat(list2);
        this._scrollRewardList.refreshData(list);
    };
    AcMonopolyTaskAndRewardView.prototype.refreshTaskRed = function () {
        // this.checkRed();
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        var task = cfg.task;
        var list1 = [];
        var list2 = [];
        var list3 = [];
        for (var index = 0; index < task.length; index++) {
            var element = task[index];
            var openType = element.openType;
            //任务进度
            var taskNum = this.vo.gettTaskNum("" + element.questType);
            var newTaskNum = element.value;
            if (this.vo.getTaskStatus("" + (element.id))) {
                list3.push(element);
            }
            else {
                if (taskNum >= newTaskNum) {
                    list1.push(element);
                }
                else {
                    list2.push(element);
                }
            }
        }
        var list = list1.concat(list2).concat(list3);
        this._scrollList.refreshData(list);
    };
    AcMonopolyTaskAndRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acchristmasview_1_red", "adult_lowbg",
        ]);
    };
    AcMonopolyTaskAndRewardView.prototype.getTabbarTextArr = function () {
        return ["acMonopoly_tab1", "acMonopoly_tab2"];
    };
    AcMonopolyTaskAndRewardView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASK_REFRESH, this.checkRed, this);
        // App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MONOPOLY_TASKLIST_REFRESH,this.refreshTaskRed,this);
        this._scrollList = null;
        this._aidAndCode = null;
        this._scrollRewardList = null;
        this.aid = null;
        this.code = null;
        this._cdTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcMonopolyTaskAndRewardView;
}(CommonView));
__reflect(AcMonopolyTaskAndRewardView.prototype, "AcMonopolyTaskAndRewardView");
