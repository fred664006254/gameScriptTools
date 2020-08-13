/*
    author : shaoliang
    date : 2019.10.16
    desc : 天下至尊-对战记录
*/
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
var LadderRankView = (function (_super) {
    __extends(LadderRankView, _super);
    function LadderRankView() {
        return _super.call(this) || this;
    }
    LadderRankView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ladder_beforerank_btn", "ladder_beforerank_btn_down",
            "ladder_back_btn", "ladder_back_btn_down",
            "rankinglist_rankn1", "rankinglist_rankn2",
            "rankinglist_rankn3", "emparena_bottom", "ladder_ranktitle_bg",
            "acchristmasview_smalldescbg", "acsingledayitembg",
            "battlepasscollect3-1", "ladder_itemtitlebg",
            "ladder_rank_title_bg"
        ]);
    };
    Object.defineProperty(LadderRankView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderRankView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderRankView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderRankView.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LadderRankView.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    LadderRankView.prototype.getTitleBgName = function () {
        return "ladderview_title";
    };
    LadderRankView.prototype.getTitleStr = function () {
        return null;
    };
    LadderRankView.prototype.getTabbarTextArr = function () {
        return [
            "acArenaTab2-1",
            "acwipeBossRank",
            "acLadder_rewardtab",
        ];
    };
    LadderRankView.prototype.getRuleInfo = function () {
        return "acLadderTournamentView_rule";
    };
    LadderRankView.prototype.getRuleInfoParam = function () {
        var itemvo = GameData.formatRewardItem(this.cfg.needItem)[0];
        var buffstr = String(this.cfg.atkBuff * 100) + "%";
        return [String(this.cfg.freeNum), itemvo.name, buffstr];
    };
    LadderRankView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_LT_GETRANK, requestData: { activeId: this.acTivityId } };
    };
    LadderRankView.prototype.receiveData = function (data) {
        var rData = data.data;
        if (data.ret == false) {
            return;
        }
        if (rData.data.rankArr) {
            Api.laddertournamentVoApi.setRankArrya(rData.data.rankArr);
        }
        if (rData.data.myrankArr) {
            Api.laddertournamentVoApi.setMyRankArrya(rData.data.myrankArr);
        }
    };
    LadderRankView.prototype.initView = function () {
        var view = this;
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        view.freshView();
        this.titleBgShadow.visible = false;
        var tab = this.param.tab ? parseInt(this.param.tab) : 0;
        if (tab) {
            view.clickTabbarHandler({ index: tab - 1 });
            view.selectedTabIndex = tab - 1;
            view.tabbarGroup.selectedIndex = tab - 1;
        }
    };
    LadderRankView.prototype.freshView = function () {
    };
    LadderRankView.prototype.tick = function () {
        if (this.tabViewData[0]) {
            this.tabViewData[0].tick();
        }
        if (this.tabViewData[2]) {
            this.tabViewData[2].tick();
        }
    };
    LadderRankView.prototype.dispose = function () {
        var view = this;
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.freshView, view);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_LATTERTOURNAMENT_CLOSE, this.hide, this);
        _super.prototype.dispose.call(this);
    };
    return LadderRankView;
}(CommonView));
__reflect(LadderRankView.prototype, "LadderRankView");
//# sourceMappingURL=LadderRankView.js.map