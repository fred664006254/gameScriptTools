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
* 进度奖励
* date 2020.7.9
* author sl
* @name AcBirdBridgePopViewTab2
*/
var AcBirdBridgePopViewTab2 = /** @class */ (function (_super) {
    __extends(AcBirdBridgePopViewTab2, _super);
    function AcBirdBridgePopViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBirdBridgePopViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBirdBridgePopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcBirdBridgePopViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEGETACHIEVE, this.requestCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var dataList = this.vo.getSortAchievementOneCfg();
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcBirdBridgeScrollItem2, dataList, rect, { aid: this.aid, code: this.code, id: this.param.data.id, uicode: this.param.data.uicode });
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        if (this.param.data.id) {
            var index = 0;
            for (var i = 0; i < dataList.length; i++) {
                if (dataList[i].id == Number(this.param.data.id)) {
                    index = i;
                    break;
                }
            }
            this._scrollList.setScrollTopByIndex(index, 800);
        }
    };
    AcBirdBridgePopViewTab2.prototype.requestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        if (!rData.all) {
            var rewards = rData.rewards;
            var rewardVoList = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVoList);
            if (rData.replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
            }
        }
    };
    AcBirdBridgePopViewTab2.prototype.refreshView = function () {
        var dataList = this.vo.getSortAchievementOneCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcBirdBridgePopViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_AC_BIRDBRIDGEGETACHIEVE, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcBirdBridgePopViewTab2;
}(CommonViewTab));
//# sourceMappingURL=AcBirdBridgePopViewTab2.js.map