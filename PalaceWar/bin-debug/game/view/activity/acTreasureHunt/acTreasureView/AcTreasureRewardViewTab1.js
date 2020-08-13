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
var AcTreasureRewardViewTab1 = (function (_super) {
    __extends(AcTreasureRewardViewTab1, _super);
    function AcTreasureRewardViewTab1(param) {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this.param = param;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcTreasureRewardViewTab1.prototype.initView = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.restList, this);
        App.MessageHelper.addNetMessage(NetPushConst.PUSH_PAY, this.restList, this);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS), this.restList, this);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 195 - 50);
        var data = {
            aid: this.param.data.aid,
            code: this.param.data.code,
        };
        this._data = data;
        var newArr = this.getArr();
        var scrollList = ComponentManager.getScrollList(TreasureRewardScrollItem, newArr, rect, data);
        scrollList.x = 25;
        scrollList.y = 20;
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcTreasureRewardViewTab1.prototype.refreshWhenSwitchBack = function () {
        this.restList();
    };
    AcTreasureRewardViewTab1.prototype.restList = function () {
        var newarr = this.getArr();
        this._scrollList.refreshData(newarr, this._data);
    };
    AcTreasureRewardViewTab1.prototype.getArr = function () {
        var keys = this.cfg.getTaskorReward(1, this.vo.day);
        var arr = [];
        var arr2 = [];
        for (var i in keys) {
            var currRe = keys[i];
            var myRechargeNum = this.vo.getAinfoV();
            if (this.vo.getReceiveType(currRe.name) == false && myRechargeNum >= currRe.value) {
                arr.push(currRe);
            }
            else {
                arr2.push(currRe);
            }
        }
        var newarr = [];
        newarr = arr2.concat(arr);
        return newarr;
    };
    Object.defineProperty(AcTreasureRewardViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureRewardViewTab1.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    // 页签类型
    AcTreasureRewardViewTab1.prototype.getSheepType = function () {
        return 1;
    };
    AcTreasureRewardViewTab1.prototype.dispose = function () {
        this._scrollList = null;
        this._data = null;
        App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY, this.restList, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.restList, this);
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS), this.restList, this);
        _super.prototype.dispose.call(this);
    };
    return AcTreasureRewardViewTab1;
}(AcCommonViewTab));
__reflect(AcTreasureRewardViewTab1.prototype, "AcTreasureRewardViewTab1");
//# sourceMappingURL=AcTreasureRewardViewTab1.js.map