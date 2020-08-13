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
var AcThrowArrowRewardPopupViewTab2 = (function (_super) {
    __extends(AcThrowArrowRewardPopupViewTab2, _super);
    function AcThrowArrowRewardPopupViewTab2() {
        var _this = _super.call(this) || this;
        //滑动列表
        _this._scrollList = null;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThrowArrowRewardPopupViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThrowArrowRewardPopupViewTab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThrowArrowRewardPopupViewTab2.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);
        var view = this;
        view.height = 620;
        view.width = 545;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 660;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var id = 0;
        if (this.vo.showRewardId) {
            id = this.vo.showRewardId;
            this.vo.showRewardId = 0;
        }
        var processCfg = this.vo.getSortAchievementCfg();
        var rect = new egret.Rectangle(0, 0, 520, view.height + 30);
        this._scrollList = ComponentManager.getScrollList(AcThrowArrowAchievementScrollItem, processCfg, rect, { id: id, code: this.code, aid: this.aid });
        this._scrollList.bounces = false;
        view.setLayoutPosition(LayoutConst.lefttop, this._scrollList, view, [29, 60]);
        view.addChild(this._scrollList);
        if (id) {
            for (var i = 0; i < processCfg.length; i++) {
                if (processCfg[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    AcThrowArrowRewardPopupViewTab2.prototype.weathRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            var vo = Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
            var processCfg = vo.getSortAchievementCfg();
            this._scrollList.refreshData(processCfg, { id: null, code: this.code, aid: this.aid });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcThrowArrowRewardPopupViewTab2.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ACTIVITY_THROWARROWGETACHIEVEMENTRWD, this.weathRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcThrowArrowRewardPopupViewTab2;
}(AcCommonViewTab));
__reflect(AcThrowArrowRewardPopupViewTab2.prototype, "AcThrowArrowRewardPopupViewTab2");
//# sourceMappingURL=AcThrowArrowRewardPopupViewTab2.js.map