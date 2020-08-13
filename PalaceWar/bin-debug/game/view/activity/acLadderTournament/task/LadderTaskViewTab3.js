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
var LadderTaskViewTab3 = (function (_super) {
    __extends(LadderTaskViewTab3, _super);
    function LadderTaskViewTab3() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(LadderTaskViewTab3.prototype, "type", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskViewTab3.prototype, "voApi", {
        get: function () {
            return Api.laddertournamentVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderTaskViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    LadderTaskViewTab3.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        var bg2 = BaseBitmap.create("public_9_bg43");
        bg2.width = 618;
        bg2.height = GameConfig.stageHeigth - 420 + 15;
        bg2.setPosition(11, 255 - 15);
        this.addChild(bg2);
        var arr = view.updateArr(this.cfg.getTaskCfg(this.type));
        var tmpRect = new egret.Rectangle(0, 0, 608, bg2.height - 10);
        var scrollList = ComponentManager.getScrollList(LadderTaskViewItem1, arr, tmpRect, this.type);
        view._scrollList = scrollList;
        scrollList.setPosition(17, bg2.y + 5);
        view.addChild(scrollList);
    };
    LadderTaskViewTab3.prototype.update = function () {
        var view = this;
        if (!view.vo) {
            return;
        }
        var arr = view.updateArr(this.cfg.getTaskCfg(this.type));
        view._scrollList.refreshData(arr, this.type);
    };
    LadderTaskViewTab3.prototype.updateArr = function (arr) {
        var view = this;
        var vo = view.vo;
        if (!vo) {
            return;
        }
        var arr1 = [];
        var arr2 = [];
        var arr3 = [];
        var totalValue = this.vo.getValue(this.type);
        for (var i = 0; i < arr.length; i++) {
            if (vo.isReward(this.type, arr[i].id)) {
                arr1.push(arr[i]);
            }
            else {
                if (totalValue >= arr[i].value) {
                    arr2.push(arr[i]);
                }
                else {
                    arr3.push(arr[i]);
                }
            }
        }
        return arr2.concat(arr3).concat(arr1);
    };
    LadderTaskViewTab3.prototype.dispose = function () {
        var view = this;
        this._scrollList = null;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        _super.prototype.dispose.call(this);
    };
    return LadderTaskViewTab3;
}(AcCommonViewTab));
__reflect(LadderTaskViewTab3.prototype, "LadderTaskViewTab3");
//# sourceMappingURL=LadderTaskViewTab3.js.map