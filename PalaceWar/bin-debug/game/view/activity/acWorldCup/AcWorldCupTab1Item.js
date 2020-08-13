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
 * author:qianjun
 * desc:区服排行榜单item
*/
var AcWorldCupTab1Item = (function (_super) {
    __extends(AcWorldCupTab1Item, _super);
    function AcWorldCupTab1Item() {
        var _this = _super.call(this) || this;
        _this._data = null;
        _this._champHead = null;
        _this._champBg = null;
        _this._endTxt = null;
        _this._curPointsTxt = null;
        _this._btn = null;
        _this._code = '';
        return _this;
    }
    Object.defineProperty(AcWorldCupTab1Item.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab1Item.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(AcConst.AID_ACWORLDCUP, this._code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcWorldCupTab1Item.prototype, "acTivityId", {
        get: function () {
            return AcConst.AID_ACWORLDCUP + "-" + this._code;
        },
        enumerable: true,
        configurable: true
    });
    AcWorldCupTab1Item.prototype.initItem = function (index, data, itemparam) {
        var view = this;
        view._code = itemparam;
        view._data = data;
        view.width = 570;
        view.height = 125 + 10;
        var bg = BaseBitmap.create('public_9_managebg');
        bg.width = 538;
        bg.height = 108;
        view.setLayoutPosition(LayoutConst.righttop, bg, view, [0, 10]);
        view.addChild(bg);
        var champbg = BaseBitmap.create('worldcupchampbg');
        view.setLayoutPosition(LayoutConst.horizontalCentertop, champbg, bg);
        view.addChild(champbg);
        champbg.visible = false;
        view._champBg = champbg;
        var country = view.vo.getCountryById(data.country);
        var flag = BaseBitmap.create(country);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, flag, bg, [-30, 0]);
        view.addChild(flag);
        var champhead = BaseBitmap.create('worldcupchamphead');
        view.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, champhead, flag);
        view.addChild(champhead);
        champhead.visible = false;
        view._champHead = champhead;
        var cty = LanguageManager.getlocal("AcWorldCupCountry" + data.country);
        var nameTxt = ComponentManager.getTextField(cty, 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, nameTxt, flag, [flag.width + 20, 30]);
        view.addChild(nameTxt);
        var totalPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDTotalPoints'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.lefttop, totalPointsTxt, nameTxt, [0, nameTxt.textHeight + 15]);
        view.addChild(totalPointsTxt);
        var flower = BaseBitmap.create('worldcupfootball');
        view.setLayoutPosition(LayoutConst.leftverticalCenter, flower, totalPointsTxt, [totalPointsTxt.textWidth, 0]);
        view.addChild(flower);
        var curPointsTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDTotalPoints'), 22, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.leftverticalCenter, curPointsTxt, flower, [flower.width + 5, 0]);
        view.addChild(curPointsTxt);
        view._curPointsTxt = curPointsTxt;
        var endTxt = ComponentManager.getTextField(LanguageManager.getlocal('AcWorldCupDEnd'), 24, TextFieldConst.COLOR_BLACK);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, endTxt, bg, [20, 0]);
        view.addChild(endTxt);
        view._endTxt = endTxt;
        view._endTxt.visible = false;
        var btn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'AcWorldCupDGuess', view.guessClick, view);
        view.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [20, 0]);
        view.addChild(btn);
        view._btn = btn;
        btn.visible = false;
        view.fresh_period();
        var curPoints = view._data.points;
        view._curPointsTxt.text = curPoints.toString();
    };
    AcWorldCupTab1Item.prototype.guessClick = function () {
        var view = this;
        // let country = view.vo.getCountryById(data.country);
        if (view.vo.getCurPeriod() > 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal('AcWorldCupShopTimePass'));
            return;
        }
        if (view.vo.getCurPoints() <= 0) {
            ViewController.getInstance().openView(ViewConst.POPUP.CONFIRMPOPUPVIEW, {
                title: "itemUseConstPopupViewTitle",
                msg: LanguageManager.getlocal('AcWorldCupVoteText7'),
                callback: function () {
                    if (view.vo.getCurBuyNum() >= view.cfg.maxBuy) {
                        App.CommonUtil.showTip(LanguageManager.getlocal("buyItemTimesOver"));
                        return;
                    }
                    ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPBUYVIEW, {
                        countryID: view._data.country,
                        aid: AcConst.AID_ACWORLDCUP,
                        code: view._code
                    });
                },
                handler: view,
                needCancel: true
            });
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACWORLDCUPVOTEVIEW, {
            countryID: view._data.country,
            aid: AcConst.AID_ACWORLDCUP,
            code: view._code
        });
    };
    AcWorldCupTab1Item.prototype.fresh_points = function () {
        var view = this;
        var curPoints = view._data.points;
        view._curPointsTxt.text = curPoints.toString();
    };
    AcWorldCupTab1Item.prototype.fresh_period = function () {
        var view = this;
        var curPeriod = view.vo.getCurPeriod();
        var champCountry = view._data.champ;
        switch (curPeriod) {
            case 1:
                view._btn.visible = true;
                view._endTxt.visible = false;
                break;
            case 2:
            case 3:
                view._btn.visible = false;
                view._champBg.visible = view._champHead.visible = Number(view._data.country) == Number(champCountry);
                view._endTxt.visible = !view._champBg.visible;
                break;
        }
    };
    AcWorldCupTab1Item.prototype.dispose = function () {
        var view = this;
        view._champBg = null;
        view._champHead = null;
        view._endTxt = null;
        view._curPointsTxt = null;
        view._btn = null;
        _super.prototype.dispose.call(this);
    };
    return AcWorldCupTab1Item;
}(ScrollListItem));
__reflect(AcWorldCupTab1Item.prototype, "AcWorldCupTab1Item");
//# sourceMappingURL=AcWorldCupTab1Item.js.map