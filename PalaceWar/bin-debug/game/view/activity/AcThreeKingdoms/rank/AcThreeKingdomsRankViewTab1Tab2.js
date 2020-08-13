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
//赛季阵营
var AcThreeKingdomsRankViewTab1Tab2 = (function (_super) {
    __extends(AcThreeKingdomsRankViewTab1Tab2, _super);
    //private _countDownText:BaseTextField = null;
    function AcThreeKingdomsRankViewTab1Tab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this._rankTxt = null;
        _this._list = null;
        _this._rankArr = [];
        _this._bottombg = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcThreeKingdomsRankViewTab1Tab2.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    AcThreeKingdomsRankViewTab1Tab2.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            default:
                code = "1";
                break;
        }
        return code;
    };
    AcThreeKingdomsRankViewTab1Tab2.prototype.getListType = function () {
        return 1;
    };
    AcThreeKingdomsRankViewTab1Tab2.prototype.initView = function () {
        var view = this;
        var baseview = ViewController.getInstance().getView(ViewConst.COMMON.ACTHREEKINGDOMSRANKVIEW);
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        var code = view.getUiCode();
        var juzhou = BaseBitmap.create(App.CommonUtil.getResByCode("threekingdomsjzhou", code));
        view.addChild(juzhou);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, juzhou, view, [0, 0], true);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip19", code)), 20, TextFieldConst.COLOR_BROWN);
        tipTxt.lineSpacing = 10;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt.width = 560;
        view.addChild(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, juzhou, [0, 33]);
        var dateTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acThreeKingdomsRanktip2", code), [view.vo.acTimeAndHour]), 20, TextFieldConst.COLOR_BROWN);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, dateTxt, tipTxt, [0, tipTxt.textHeight + 10]);
        //膜拜背景
        var bottomBg = BaseBitmap.create("arena_bottom");
        bottomBg.height = 135;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 0], true);
        view.addChild(bottomBg);
        view._bottombg = bottomBg;
        //上轮排名 
        // let rankBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_RED, 'allianceBtnRank', view.rankCLick, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [210,0]);
        // view.addChild(rankBtn);
        //查看奖励
        var rewardBtn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, App.CommonUtil.getCnByCode("acThreeKingdomsRanktip3", code), function () {
            ViewController.getInstance().openView(ViewConst.COMMON.ACTHREEKINGDOMSREWARDVIEW2, {
                code: view.code,
                aid: view.aid
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rewardBtn, bottomBg, [25, 0]);
        view.addChild(rewardBtn);
        var arr = [];
        for (var i = 1; i <= 3; ++i) {
            arr.push({
                kingdomid: i,
                value: view.vo.getMyZrankSeasonPoints(i)
            });
        }
        arr.sort(function (a, b) {
            return b.value - a.value;
        });
        var rankV = 0;
        for (var i = 0; i < arr.length; ++i) {
            if (arr[i].kingdomid == view.vo.getMyKingdoms()) {
                rankV = Number(i) + 1;
                break;
            }
        }
        //排名列表
        var list = ComponentManager.getScrollList(AcThreeKingdomsZrankItem, arr, new egret.Rectangle(0, 0, 614, bottomBg.y - juzhou.y - juzhou.height - 10));
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, list, juzhou, [0, juzhou.height + 10]);
        view.addChild(list);
        view._list = list;
        //我的阵营
        var myKingdomTxt = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip4-" + code, [LanguageManager.getlocal("acThreeKingdomsTeam" + view.vo.getMyKingdoms() + "-" + code)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, myKingdomTxt, view._bottombg, [25, 35]);
        view.addChild(myKingdomTxt);
        //赛季排名
        var rankstr = "";
        if (!this.vo.getMyKingdoms()) {
            rankstr = LanguageManager.getlocal("acThreeKingdomsTeam0-" + code);
        }
        else if (rankV == 0) {
            rankstr = LanguageManager.getlocal("atkracedes4");
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(0x21eb39);
        if (view.vo.getCurPeriod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        var txt3 = ComponentManager.getTextField(LanguageManager.getlocal("acThreeKingdomsRanktip5-" + code, [rankstr]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, txt3, myKingdomTxt, [0, myKingdomTxt.textHeight + 20]);
        view.addChild(txt3);
    };
    AcThreeKingdomsRankViewTab1Tab2.prototype.getCountTimeStr = function (time) {
        if (time < 0) {
            time = 0;
        }
        return App.DateUtil.getFormatBySecond(time);
    };
    AcThreeKingdomsRankViewTab1Tab2.prototype.dispose = function () {
        var view = this;
        this._nodeContainer = null;
        this._rankTxt = null;
        this._rankArr = [];
        this._bottombg = null;
        //this._countDownText = null;
        // TickManager.removeTick(this.tick,this);
        _super.prototype.dispose.call(this);
    };
    return AcThreeKingdomsRankViewTab1Tab2;
}(CommonViewTab));
__reflect(AcThreeKingdomsRankViewTab1Tab2.prototype, "AcThreeKingdomsRankViewTab1Tab2");
//# sourceMappingURL=AcThreeKingdomsRankViewTab1Tab2.js.map