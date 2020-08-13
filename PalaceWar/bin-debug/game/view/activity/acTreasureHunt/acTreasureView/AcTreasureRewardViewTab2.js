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
var AcTreasureRewardViewTab2 = (function (_super) {
    __extends(AcTreasureRewardViewTab2, _super);
    function AcTreasureRewardViewTab2(param) {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this.param = param;
        egret.callLater(_this.initView, _this);
        return _this;
    }
    AcTreasureRewardViewTab2.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.restList, this);
        // App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this);
        var rect = new egret.Rectangle(0, 0, GameConfig.stageWidth, GameConfig.stageHeigth - 195 - 50);
        var newarr = this.getArr();
        var data = {
            aid: this.param.data.aid,
            code: this.param.data.code,
        };
        this._data = data;
        var scrollList = ComponentManager.getScrollList(TreasureTaskScrollItem, newarr, rect, data);
        scrollList.x = 25;
        scrollList.y = 20;
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcTreasureRewardViewTab2.prototype.getArr = function () {
        var keys = this.cfg.getTaskorReward(2, this.vo.day);
        if (!this.vo.isInActy()) {
            return keys;
        }
        var arr = [];
        var arr2 = [];
        var arr3 = [];
        var newarr = [];
        for (var i in keys) {
            var currRe = keys[i];
            var myRechargeNum = this.vo.getTypeNum(currRe.questType);
            if (this.vo.getReceiveType(currRe.name) == false && myRechargeNum >= currRe.value) {
                arr.push(currRe);
            }
            else if (myRechargeNum >= currRe.value) {
                arr2.push(currRe);
            }
            else {
                arr3.push(currRe);
            }
        }
        newarr = arr2.concat(arr3).concat(arr);
        return newarr;
    };
    AcTreasureRewardViewTab2.prototype.restList = function () {
        var newarr = this.getArr();
        this._scrollList.refreshData(newarr, this._data);
    };
    AcTreasureRewardViewTab2.prototype.refreshWhenSwitchBack = function () {
        this.restList();
    };
    Object.defineProperty(AcTreasureRewardViewTab2.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureRewardViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    // 页签类型
    AcTreasureRewardViewTab2.prototype.getSheepType = function () {
        return 2;
    };
    AcTreasureRewardViewTab2.prototype.dispose = function () {
        // App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASUREHUNTGETTASKREWARDS),this.restList,this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_RESFESH_TREASURE_LIST, this.restList, this);
        _super.prototype.dispose.call(this);
    };
    return AcTreasureRewardViewTab2;
}(AcCommonViewTab));
__reflect(AcTreasureRewardViewTab2.prototype, "AcTreasureRewardViewTab2");
//# sourceMappingURL=AcTreasureRewardViewTab2.js.map