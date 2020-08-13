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
 * 	圣诞活动
 * author 张朝阳
 * date 2018/11/27
 * @class AcChristmasView
 */
var AcChristmasTaskView = (function (_super) {
    __extends(AcChristmasTaskView, _super);
    function AcChristmasTaskView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        _this._scrollList = null;
        return _this;
    }
    AcChristmasTaskView.prototype.getContainerY = function () {
        return 0;
    };
    AcChristmasTaskView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD, this.christmasTaskRewardHandel, this);
        this.aid = this.param.data.aid;
        this.code = this.param.data.code;
        if (this.titleTF) {
            this.titleTF.setColor(TextFieldConst.COLOR_BLACK);
        }
        var bg = BaseBitmap.create("public_9_bg22");
        this.addChildToContainer(bg);
        bg.width = 640;
        if (this.getTypeCode() == "8") {
            bg.setRes("public_9_probiginnerbg");
            bg.width = 620;
            var lineStr = ResourceManager.hasRes("acchristmas-" + this.getTypeCode() + "_line") ? "acchristmas-" + this.getTypeCode() + "_line" : "acchristmas-_line";
            var line = BaseBitmap.create(lineStr);
            line.setPosition(this.titleBg.x + this.titleBg.width / 2 - line.width / 2, this.titleBg.y + this.titleBg.height - 1);
            this.addChildToContainer(line);
            bg.height = GameConfig.stageHeigth - line.y - line.height + 5;
            bg.setPosition(10, line.y + line.height - 15);
        }
        else {
            bg.height = GameConfig.stageHeigth - 89;
            bg.setPosition(0, -15);
        }
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 612;
        bg2.height = bg.height - 30;
        bg2.setPosition(bg.x + bg.width / 2 - bg2.width / 2, bg.y + 15);
        this.addChildToContainer(bg2);
        var rect = new egret.Rectangle(0, 0, 608, bg2.height - 15);
        if (this.getTypeCode() == "8") {
            bg2.visible = false;
            rect = new egret.Rectangle(0, 0, 608, bg2.height + 5);
        }
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList = ComponentManager.getScrollList(AcChristmasTaskScrollItem, taskData, rect, { aid: this.aid, code: this.code });
        this._scrollList.setPosition(bg2.x + bg2.width / 2 - this._scrollList.width / 2, bg2.y + 5);
        this.addChildToContainer(this._scrollList);
        if (this.getTypeCode() == "8") {
            this._scrollList.y = bg2.y - 2;
        }
    };
    /**
     * 领奖回调
     */
    AcChristmasTaskView.prototype.christmasTaskRewardHandel = function (event) {
        if (event && event.data && event.data.ret) {
            // taskId
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var acCfg = Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
            var list = [];
            var taskData = vo.getSortTask();
            taskData.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
            var reward = event.data.data.data.rewards;
            var rewardVo = GameData.formatRewardItem(reward);
            for (var key in rewardVo) {
                var item = { icon: rewardVo[key].icon, tipMessage: rewardVo[key].tipMessage, type: rewardVo[key].type };
                list.push(item);
            }
            var taskId = event.data.data.data.taskId;
            var starnum = acCfg.getTaksCfgId(taskId).specialReward;
            var icon = "acchristmasview_itemiconstar";
            if (this.isValentines()) {
                icon = "acchristmasview_itemiconstar_" + this.isValentines();
            }
            else if (this.getUiCode()) {
                icon = "acchristmasview_itemiconstar_" + this.getUiCode();
            }
            else if (this.isMagpiesBridge()) {
                icon = "acchristmasview_itemiconstar_" + this.isMagpiesBridge();
            }
            else if (this.getTypeCode() == "8") {
                icon = "acchristmasview_itemiconstar_" + this.getTypeCode();
            }
            var starItem = { icon: icon, tipMessage: "+" + String(starnum), type: 0 };
            list.push(starItem);
            App.CommonUtil.playRewardFlyAction(list);
        }
    };
    AcChristmasTaskView.prototype.refreashView = function () {
        var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        var taskData = vo.getSortTask();
        taskData.sort(function (a, b) { return a.sortId - b.sortId; });
        this._scrollList.refreshData(taskData, { aid: this.aid, code: this.code });
    };
    /**是否情人节 */
    AcChristmasTaskView.prototype.isValentines = function () {
        if (this.param.data.code == "3" || this.param.data.code == "4") {
            return "3";
        }
        return null;
    };
    AcChristmasTaskView.prototype.getUiCode = function () {
        if (this.param.data.code == "5") {
            return "5";
        }
        return null;
    };
    AcChristmasTaskView.prototype.isMagpiesBridge = function () {
        if (this.param.data.code == "6" || this.param.data.code == "7") {
            return "6";
        }
        return null;
    };
    AcChristmasTaskView.prototype.getTypeCode = function () {
        if (this.param.data.code == "9" || this.param.data.code == "10") {
            return "8";
        }
        return this.param.data.code;
    };
    AcChristmasTaskView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcChristmasTaskView.prototype.getTitleStr = function () {
        if (this.getTypeCode() == "8") {
            return null;
        }
        return _super.prototype.getTitleStr.call(this);
    };
    // 标题背景名称
    AcChristmasTaskView.prototype.getTitleBgName = function () {
        if (this.isValentines() || this.getUiCode() || this.isMagpiesBridge()) {
            return "commonview_titlebg";
        }
        else if (this.getTypeCode() == "8") {
            return "acchristmasview_titlebg_" + this.getTypeCode();
        }
        else {
            return "commonview_snowtitlebg";
        }
    };
    AcChristmasTaskView.prototype.getRuleInfo = function () {
        return "acChristmasRuleInfo_" + this.param.data.code;
    };
    AcChristmasTaskView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([]);
    };
    AcChristmasTaskView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreashView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_CHRISTMASTASKREWARD, this.christmasTaskRewardHandel, this);
        this.aid = null;
        this.code = null;
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcChristmasTaskView;
}(CommonView));
__reflect(AcChristmasTaskView.prototype, "AcChristmasTaskView");
//# sourceMappingURL=AcChristmasTaskView.js.map