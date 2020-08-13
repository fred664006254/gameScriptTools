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
 * 任务
 */
var AcCrossServerHegemonyFlagViewTab2 = (function (_super) {
    __extends(AcCrossServerHegemonyFlagViewTab2, _super);
    function AcCrossServerHegemonyFlagViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.code = null;
        _this.aid = null;
        _this.uiCode = null;
        _this.freshEvent = null;
        _this.requestEvent = null;
        _this._tabIndex = 0;
        _this.aid = param.data.aid;
        _this.code = param.data.code;
        _this.uiCode = param.data.uiCode || _this.code;
        _this.freshEvent = MessageConst.MESSAGE_CROSSSERVERHEGEMONY_REFRESH; //param.data.freshEvent;
        _this.requestEvent = NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD; //param.data.requestEvent;
        _this.initView();
        return _this;
    }
    AcCrossServerHegemonyFlagViewTab2.prototype.flyReward = function (event) {
        // console.log(event);
        if (event.data.ret && event.data.ret && event.data.data.ret == 0) {
            var d = event.data.data.data;
            // console.log(d);
            var rewards = d.rewards;
            if (rewards) {
                rewards = "1049_0_" + d.special + "_" + this.uiCode + "|" + rewards;
            }
            else {
                rewards = "1049_0_" + d.special + "_" + this.uiCode;
            }
            var rList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rList);
        }
    };
    AcCrossServerHegemonyFlagViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD, this.flyReward, this);
        if (this.freshEvent) {
            App.MessageHelper.addEventListener(this.freshEvent, this.refreshData, this);
        }
        else {
            App.LogUtil.warn("---AcCommonTask--- 未传入刷新事件,任务列表无法刷新");
        }
        this.showList();
    };
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerHegemonyFlagViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyFlagViewTab2.prototype.showList = function () {
        if (this._scrollList == null) {
            var taskList = this.vo.getSortTask(this.getTabIndex());
            taskList.sort(function (a, b) { return a.sortId - b.sortId; });
            var rect = egret.Rectangle.create();
            rect.setTo(0, 0, 620, GameConfig.stageHeigth - 99 - 60 - 14);
            this._scrollList = ComponentManager.getScrollList(AcCrossServerTaskScrollItem, taskList, rect, {
                aid: this.aid,
                code: this.code,
                uiCode: this.uiCode,
                requestEvent: this.requestEvent
            });
            this.addChild(this._scrollList);
            this._scrollList.setPosition(GameConfig.stageWidth / 2 - this._scrollList.width / 2, 10);
        }
    };
    AcCrossServerHegemonyFlagViewTab2.prototype.refreshData = function () {
        if (this._scrollList) {
            var taskList = this.vo.getSortTask(this.getTabIndex());
            taskList.sort(function (a, b) { return a.sortId - b.sortId; });
            this._scrollList.refreshData(taskList, {
                aid: this.aid,
                code: this.code,
                uiCode: this.uiCode,
                requestEvent: this.requestEvent
            });
        }
    };
    AcCrossServerHegemonyFlagViewTab2.prototype.getTabIndex = function () {
        return this._tabIndex;
    };
    AcCrossServerHegemonyFlagViewTab2.prototype.dispose = function () {
        if (this.freshEvent) {
            App.MessageHelper.removeEventListener(this.freshEvent, this.refreshData, this);
        }
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACHEGEMONY_GETTASKREWARD, this.flyReward, this);
        this._scrollList = null;
        this.aid = null;
        this.code = null;
        this.uiCode = null;
        this.freshEvent = null;
        this.requestEvent = null;
        this._tabIndex = 0;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyFlagViewTab2;
}(CommonViewTab));
__reflect(AcCrossServerHegemonyFlagViewTab2.prototype, "AcCrossServerHegemonyFlagViewTab2");
//# sourceMappingURL=AcCrossServerHegemonyFlagViewTab2.js.map