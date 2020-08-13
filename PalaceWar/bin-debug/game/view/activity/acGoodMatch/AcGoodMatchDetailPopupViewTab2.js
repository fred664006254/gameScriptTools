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
* date 2020.7.21
* author ycg
* @name AcGoodMatchDetailPopupViewTab2
*/
var AcGoodMatchDetailPopupViewTab2 = /** @class */ (function (_super) {
    __extends(AcGoodMatchDetailPopupViewTab2, _super);
    function AcGoodMatchDetailPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcGoodMatchDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcGoodMatchDetailPopupViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcGoodMatchDetailPopupViewTab2.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcGoodMatchDetailPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHRWD, this.requestCallback, this);
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);
        var dataList = this.vo.getSortServerAchievementCfg();
        var rect = new egret.Rectangle(0, 0, 530, 685);
        var scrollList = ComponentManager.getScrollList(AcGoodMatchDetailTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code, id: this.param.data.id });
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
    };
    AcGoodMatchDetailPopupViewTab2.prototype.requestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        this.showReward(rData);
    };
    AcGoodMatchDetailPopupViewTab2.prototype.showReward = function (rData) {
        var rewards = rData.rewards;
        var replacerewards = rData.replacerewards;
        var rewardVo = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardVo);
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
        }
    };
    AcGoodMatchDetailPopupViewTab2.prototype.refreshView = function () {
        var dataList = this.vo.getSortServerAchievementCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    AcGoodMatchDetailPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACGOODMATCH_GETSERVERACHRWD, this.requestCallback, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcGoodMatchDetailPopupViewTab2;
}(CommonViewTab));
//# sourceMappingURL=AcGoodMatchDetailPopupViewTab2.js.map