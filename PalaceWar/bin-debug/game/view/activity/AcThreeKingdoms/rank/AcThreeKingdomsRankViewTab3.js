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
//冲榜物资奖励
var AcThreeKingdomsRankViewTab3 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab3, _super);
    function AcThreeKingdomsRankViewTab3(data) {
        var _this = _super.call(this) || this;
        _this._list = null;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab3.prototype.initView = function () {
        var view = this;
        // App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        //App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
        // NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_HEROINFO,{
        // 	activeId : view.acTivityId
        // });
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        //第四周
        // let start = view.vo.activeSt + (4 - 1) * (7 * 86400);
        // let unit : Config.AcCfg.ThreeKingdomsActiveCfg = view.cfg.activeTime[1];
        // let tmp = 2;
        // let datest = start;
        // let dateet = start + 4 * 86400;
        // let st = start + (tmp - 1) * 86400 + unit.popularityRange[0] * 3600;
        // let et = start + (tmp - 1) * 86400 + unit.popularityRange[1] * 3600;
        // let timeparam = `${App.DateUtil.getFormatBySecond(datest,7)}-${App.DateUtil.getFormatBySecond(dateet,7)}`;
        // let timeparam2 = `${App.DateUtil.getFormatBySecond(st,12)}-${App.DateUtil.getFormatBySecond(et,12)}`;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRank3Tip1", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 5;
        // tipTxt.textAlign= egret.HorizontalAlign.CENTER;
        tipTxt.width = 470;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, juzhou, [30, 23]);
        var rewardBtn = ComponentManager.getButton("threekingdomspranksupplyrewardbtn", "", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSRANKFOODREWARDVIEW, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        view.addChild(rewardBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, juzhou, [25, 0]);
        var info = view.vo.getCrossActivity();
        // week : i,
        // weekst : start,
        // weeket : end,
        //排名列表
        var list = ComponentManager.getScrollList(AcThreeKingdomsActicityItem, info, new egret.Rectangle(0, 0, 618, view.height - juzhou.height - 20), view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0, juzhou.height + 10]);
        view.addChild(list);
        view._list = list;
        TickManager.addTick(this.tick, this);
        this.tick();
    };
    AcThreeKingdomsRankViewTab3.prototype.tick = function () {
        var view = this;
    };
    AcThreeKingdomsRankViewTab3.prototype.update = function () {
        var view = this;
    };
    AcThreeKingdomsRankViewTab3.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcThreeKingdomsRankViewTab3.prototype.dispose = function () {
        var view = this;
        TickManager.removeTick(this.tick, this);
        view._list = null;
        // App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        //App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_GETCROSSACTIVEREWARDS,this.rewardCallBack,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab3;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab3.prototype, "AcThreeKingdomsRankViewTab3");
//# sourceMappingURL=AcThreeKingdomsRankViewTab3.js.map