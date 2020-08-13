// TypeScript file
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
var AcEnjoyNightAchievementPopupView = (function (_super) {
    __extends(AcEnjoyNightAchievementPopupView, _super);
    function AcEnjoyNightAchievementPopupView() {
        var _this = _super.call(this) || this;
        _this._scrollList = null;
        return _this;
    }
    Object.defineProperty(AcEnjoyNightAchievementPopupView.prototype, "vo", {
        get: function () {
            var springCelebrateVo = Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
            return springCelebrateVo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcEnjoyNightAchievementPopupView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcEnjoyNightAchievementPopupView.prototype.initView = function () {
        App.MessageHelper.addNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.weathRewardHandle, this);
        var aid = this.param.data.aid;
        var code = this.param.data.code;
        var id = this.param.data.id;
        var vo = this.vo;
        var cfg = this.cfg;
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 720;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 15);
        this.addChildToContainer(bg);
        var newarr = this.getArr();
        var rect = new egret.Rectangle(0, 0, 520, 710);
        this._scrollList = ComponentManager.getScrollList(AcEnjoyNightAchievementScrollItem, newarr, rect, { id: id, code: code, aid: aid });
        this._scrollList.setPosition(bg.x + 3, bg.y + 5);
        this._scrollList.bounces = false;
        this.addChildToContainer(this._scrollList);
        if (id) {
            for (var i = 0; i < newarr.length; i++) {
                if (newarr[i].id == id) {
                    this._scrollList.setScrollTopByIndex(i, 1000);
                    break;
                }
            }
        }
    };
    /**刷新item */
    AcEnjoyNightAchievementPopupView.prototype.weathRewardHandle = function (event) {
        if (event.data.ret) {
            var rewards = event.data.data.data.rewards;
            var replacerewards = event.data.data.data.replacerewards;
            var rewardVo = GameData.formatRewardItem(rewards);
            App.CommonUtil.playRewardFlyAction(rewardVo);
            var vo = this.vo;
            var newarr = this.getArr();
            this._scrollList.refreshData(newarr, { id: null, code: this.param.data.code, uicode: this.param.data.uicode, aid: this.param.data.aid });
            if (replacerewards) {
                ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards });
            }
        }
    };
    AcEnjoyNightAchievementPopupView.prototype.getArr = function () {
        var keys = Object.keys(this.cfg.achievement);
        var arr = [];
        var arr2 = [];
        for (var i in keys) {
            var currRe = this.cfg.achievement[keys[i]];
            var myRechargeNum = this.vo.getRechargeNum();
            if (this.vo.checkAchievementFlag(currRe.id) == true && myRechargeNum >= currRe.needNum) {
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
    AcEnjoyNightAchievementPopupView.prototype.getTitleStr = function () {
        return "acEnjoyNightAchievementPopupViewTitle-" + this.param.data.uicode;
    };
    AcEnjoyNightAchievementPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress3_bg", "progress3"
        ]);
    };
    AcEnjoyNightAchievementPopupView.prototype.dispose = function () {
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUST_ACTIVITY_ENJOYNIGHTACHIEVEMENT, this.weathRewardHandle, this);
        this._scrollList = null;
        _super.prototype.dispose.call(this);
    };
    return AcEnjoyNightAchievementPopupView;
}(PopupView));
__reflect(AcEnjoyNightAchievementPopupView.prototype, "AcEnjoyNightAchievementPopupView");
//# sourceMappingURL=AcEnjoyNightAchievementPopupView.js.map