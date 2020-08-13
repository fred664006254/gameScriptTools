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
 * 圈数奖励预览
 * author qianjun
 */
var AcTreasureHuntRoundRewardView = (function (_super) {
    __extends(AcTreasureHuntRoundRewardView, _super);
    function AcTreasureHuntRoundRewardView() {
        var _this = _super.call(this) || this;
        _this._list = null;
        return _this;
    }
    Object.defineProperty(AcTreasureHuntRoundRewardView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcTreasureHuntRoundRewardView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcTreasureHuntRoundRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "acmidautumnview_titlebg", "progress3_bg", "progress3"
        ]);
    };
    AcTreasureHuntRoundRewardView.prototype.initView = function () {
        // let tabName = ["acPunishRankRewardTab1"];
        var view = this;
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD), view.getRoundRewardCallback, view);
        var bg = BaseBitmap.create("public_9_probiginnerbg");
        bg.width = 530;
        bg.height = 715;
        bg.setPosition(this.viewBg.x + this.viewBg.width / 2 - bg.width / 2, 5);
        view.addChildToContainer(bg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 528, bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcTreasureHuntRoundRewardItem, null, rect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, bg);
        scrollList.setEmptyTip(LanguageManager.getlocal("acPunishNoData"));
        view.addChildToContainer(scrollList);
        view._list = scrollList;
        scrollList.bounces = false;
        view.freshList();
        var cdText = ComponentManager.getTextField(LanguageManager.getlocal("acTreasureTimeTip3-" + view.code), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, cdText, scrollList, [0, scrollList.height + 30]);
        view.addChildToContainer(cdText);
    };
    AcTreasureHuntRoundRewardView.prototype.getRoundRewardCallback = function (evt) {
        var view = this;
        var data = evt.data.data.data;
        if (!data) {
            App.CommonUtil.showTip(LanguageManager.getlocal("playerIdError"));
            return;
        }
        var idx = view.vo.selIdx;
        var rewards = data.rewards;
        var replacerewards = data.replacerewards;
        if (replacerewards) {
            ViewController.getInstance().openView(ViewConst.POPUP.COMMONCHANGEOTHERREWARD, { "replacerewards": replacerewards, "message": "changeOtherRewardTip" });
        }
        var item = view._list.getItemByIndex(idx);
        var pos = item.localToGlobal(item._btn.x + 35, item._btn.y + 20);
        var rewardList = GameData.formatRewardItem(rewards);
        App.CommonUtil.playRewardFlyAction(rewardList, pos);
        view._end = false;
        view.freshList();
    };
    AcTreasureHuntRoundRewardView.prototype.tick = function () {
        var view = this;
        if (view.vo.isActyEnd() && !view._end) {
            view._end = true;
            view.freshList();
        }
    };
    AcTreasureHuntRoundRewardView.prototype.freshList = function () {
        var view = this;
        var dataList = new Array();
        var cfg = this.cfg;
        var curRound = view.vo.getCurRound();
        for (var i in cfg.circleReward) {
            var cid = Number(i);
            if (cid >= view.vo.getRoundMax() && curRound > 10) {
                for (var j = view.vo.getRoundMax(); j <= (view.vo.getCurRound() + 1); ++j) {
                    if (view.vo.getCurRoundGetState(j) < 3) {
                        cid = j;
                        break;
                    }
                }
            }
            dataList.push({
                id: cid,
                num: cid,
                getReward: cfg.circleReward[i].getReward,
            });
        }
        dataList.sort(function (a, b) {
            var flaga = view.vo.getCurRoundGetState(a.id);
            var flagb = view.vo.getCurRoundGetState(b.id);
            if (flaga == flagb) {
                return a.num - b.num;
            }
            else {
                return flaga - flagb;
            }
        });
        view._list.refreshData(dataList, view.code);
    };
    AcTreasureHuntRoundRewardView.prototype.getShowHeight = function () {
        return 790;
    };
    AcTreasureHuntRoundRewardView.prototype.getShowWidth = function () {
        return 560;
    };
    AcTreasureHuntRoundRewardView.prototype.getTitleStr = function () {
        return "acTreasureRoundRewardTitle-" + this.code;
    };
    AcTreasureHuntRoundRewardView.prototype.dispose = function () {
        var view = this;
        view._end = false;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUST_ACTIVITY_TREASURECIRCLERERWARD), view.getRoundRewardCallback, view);
        view._list = null;
        _super.prototype.dispose.call(this);
    };
    return AcTreasureHuntRoundRewardView;
}(PopupView));
__reflect(AcTreasureHuntRoundRewardView.prototype, "AcTreasureHuntRoundRewardView");
//# sourceMappingURL=AcTreasureHuntRoundRewardView.js.map