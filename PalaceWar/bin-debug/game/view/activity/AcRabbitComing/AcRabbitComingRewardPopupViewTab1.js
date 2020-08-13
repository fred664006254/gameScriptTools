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
var AcRabbitComingRewardPopupViewTab1 = (function (_super) {
    __extends(AcRabbitComingRewardPopupViewTab1, _super);
    function AcRabbitComingRewardPopupViewTab1(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcRabbitComingRewardPopupViewTab1.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab1.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab1.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab1.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcRabbitComingRewardPopupViewTab1.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcRabbitComingRewardPopupViewTab1.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcRabbitComingRewardPopupViewTab1.prototype.initView = function () {
        var view = this;
        view.height = 675;
        view.width = 535;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 565;
        Bg.x = 25;
        Bg.y = 55;
        view.addChild(Bg);
        var vo = this.vo;
        var arr = vo.getArr("individualRank"); //
        var tmpRect = new egret.Rectangle(0, 0, 530, Bg.height - 10);
        var scrollList = ComponentManager.getScrollList(AcRabbitComingPRankItem, arr, tmpRect, view.code);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, Bg, [0, 3]);
        view.addChild(scrollList);
        var bottombg = BaseBitmap.create("public_9_bg1");
        view.addChild(bottombg);
        bottombg.width = 540;
        bottombg.height = 112;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottombg, Bg, [0, Bg.height + 5]);
        var myrank = view.vo.getMyPrank();
        var str = "";
        if (myrank == 0) {
            str = LanguageManager.getlocal("acMaChaoRankPopupViewTab2Unrank-1");
        }
        else {
            str = myrank.toString();
        }
        var rankTxt = ComponentManager.getTextField(LanguageManager.getlocal("acBattleRoundRank-1", [String(0xffffff), str]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(rankTxt);
        var scoreTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode("acrabbitcomingtip7", view.getUiCode()), [view.vo.getMyPScore().toString()]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        view.addChild(scoreTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankTxt, bottombg, [13, 30]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreTxt, rankTxt, [0, rankTxt.textHeight + 10]);
        var btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, "acPunishRankTab1", function () {
            ViewController.getInstance().openView(ViewConst.POPUP.ACRABBITCOMINGRANKVIEW, {
                aid: view.aid,
                code: view.code
            });
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bottombg, [10, 0]);
        view.addChild(btn);
    };
    AcRabbitComingRewardPopupViewTab1.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcRabbitComingRewardPopupViewTab1;
}(CommonViewTab));
__reflect(AcRabbitComingRewardPopupViewTab1.prototype, "AcRabbitComingRewardPopupViewTab1");
//# sourceMappingURL=AcRabbitComingRewardPopupViewTab1.js.map