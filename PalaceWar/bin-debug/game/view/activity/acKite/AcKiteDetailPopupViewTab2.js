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
 * 进度奖励
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab2
 */
var AcKiteDetailPopupViewTab2 = (function (_super) {
    __extends(AcKiteDetailPopupViewTab2, _super);
    function AcKiteDetailPopupViewTab2(data) {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcKiteDetailPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, this.refreshView, this);
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACKITE_GETBOXREWARD, this.requestCallback, this);
        var rewardBg = BaseBitmap.create("public_9_bg93");
        rewardBg.width = 530;
        rewardBg.height = 695;
        rewardBg.setPosition(46, 50);
        this.addChild(rewardBg);
        var dataList = this.vo.getSortProcessCfg();
        var rect = new egret.Rectangle(0, 0, 530, 680);
        var scrollList = ComponentManager.getScrollList(AcKiteDetailPopupViewTab2ScrollItem, dataList, rect, { aid: this.aid, code: this.code, id: this.param.data.id });
        scrollList.setPosition(rewardBg.x, rewardBg.y + 5);
        this.addChild(scrollList);
        this._scrollList = scrollList;
        App.LogUtil.log("tis.paame " + this.param.data.id);
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
    AcKiteDetailPopupViewTab2.prototype.requestCallback = function (evt) {
        if (!evt.data.ret) {
            return;
        }
        var rData = evt.data.data.data;
        var rewardVoList = GameData.formatRewardItem(rData.rewards);
        App.CommonUtil.playRewardFlyAction(rewardVoList);
        if (rData.replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": rData.replacerewards });
        }
    };
    AcKiteDetailPopupViewTab2.prototype.refreshView = function () {
        var dataList = this.vo.getSortProcessCfg();
        this._scrollList.refreshData(dataList, { aid: this.aid, code: this.code });
    };
    Object.defineProperty(AcKiteDetailPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcKiteDetailPopupViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcKiteDetailPopupViewTab2.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.refreshView, view);
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACKITE_GETBOXREWARD, this.requestCallback, this);
        view._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcKiteDetailPopupViewTab2;
}(CommonViewTab));
__reflect(AcKiteDetailPopupViewTab2.prototype, "AcKiteDetailPopupViewTab2");
//# sourceMappingURL=AcKiteDetailPopupViewTab2.js.map