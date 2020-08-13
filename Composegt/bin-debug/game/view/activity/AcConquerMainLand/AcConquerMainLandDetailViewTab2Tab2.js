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
//
var AcConquerMainLandDetailViewTab2Tab2 = (function (_super) {
    __extends(AcConquerMainLandDetailViewTab2Tab2, _super);
    //private _countDownText:BaseTextField = null;
    function AcConquerMainLandDetailViewTab2Tab2(param) {
        var _this = _super.call(this) || this;
        _this._nodeContainer = null;
        _this.param = param;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "acTivityId", {
        get: function () {
            return this.param.data.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcConquerMainLandDetailViewTab2Tab2.prototype, "uiCode", {
        get: function () {
            var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
            var code = baseview.getUiCode();
            return code;
        },
        enumerable: true,
        configurable: true
    });
    AcConquerMainLandDetailViewTab2Tab2.prototype.getListType = function () {
        return 2;
    };
    AcConquerMainLandDetailViewTab2Tab2.prototype.initView = function () {
        var view = this;
        var code = view.uiCode;
        var baseview = ViewController.getInstance().getView('AcConquerMainLandDetailView');
        view.height = baseview.tabHeight - 46;
        view.width = baseview.tabWidth;
        view._nodeContainer = new BaseDisplayObjectContainer();
        view._nodeContainer.width = view.width;
        // 膜拜背景
        var bottomBg = BaseBitmap.create("public_9v_bg14");
        bottomBg.width = 620;
        bottomBg.height = 93;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bottomBg, view, [0, 45]);
        view.addChild(bottomBg);
        var line = BaseBitmap.create('commonview_border3');
        line.width = 620;
        line.setPosition(bottomBg.x, bottomBg.y - 5);
        view.addChild(line);
        var innerKuang = BaseBitmap.create("public_9v_bg12");
        innerKuang.width = bottomBg.width - 20;
        innerKuang.height = bottomBg.height - 10;
        this.addChild(innerKuang);
        innerKuang.setPosition(bottomBg.x + 10, bottomBg.y + 5);
        var rankBtn = ComponentManager.getButton(ButtonConst.BTN_NORMAL_YELLOW, 'allianceBtnRank', view.rankCLick, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, rankBtn, bottomBg, [35, 0]);
        view.addChild(rankBtn);
        var rankstr = '';
        var rankV = view.vo.getMyServerRank();
        if (rankV == 0) {
            rankstr = LanguageManager.getlocal('atkracedes4');
        }
        else {
            rankstr = rankV.toString();
        }
        var color = String(TextFieldConst.COLOR_QUALITY_GREEN_NEW);
        if (view.vo.getCurPeriod() == 1) {
            rankstr = LanguageManager.getlocal('acBattleRoundNotStart-1');
        }
        var txt3 = ComponentManager.getTextField("", 20, TextFieldConst.COLOR_BROWN_NEW);
        txt3.text = LanguageManager.getlocal("acConquerMainLandrank2-" + code, [color, rankstr]);
        txt3.x = bottomBg.x + 30;
        txt3.y = bottomBg.y + 25;
        this.addChild(txt3);
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal("acConquerMainLandrank3-" + view.uiCode, [String(view.cfg.settleTime / 60)]), 20, TextFieldConst.COLOR_BROWN_NEW);
        tipTxt.x = txt3.x;
        tipTxt.y = txt3.y + 35;
        this.addChild(tipTxt);
        var rList = this.cfg.zrankList;
        var scrollrect = new egret.Rectangle(0, 0, 620, this.height - bottomBg.height - 55);
        var scrollList = ComponentManager.getScrollList(AcConquerMainLandDetailViewTab2Tab2ScrollItem, rList, scrollrect, { aid: this.aid, code: this.code });
        scrollList.x = 10;
        scrollList.y = 0;
        this.addChild(scrollList);
    };
    AcConquerMainLandDetailViewTab2Tab2.prototype.rankCLick = function () {
        var view = this;
        if (view.vo.isEnd) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acwipeBossEnd"));
            return;
        }
        if (view.vo.getCurPeriod() == 1) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleRoundNotStart-1"));
            return;
        }
        if (view.vo.isInJudge()) {
            App.CommonUtil.showTip(LanguageManager.getlocal("acBattleGroundTip11-1"));
            return;
        }
        ViewController.getInstance().openView(ViewConst.POPUP.ACCONQUERMAINLANDZRANKVIEW, {
            aid: view.param.data.aid,
            code: view.param.data.code,
        });
    };
    AcConquerMainLandDetailViewTab2Tab2.prototype.dispose = function () {
        this._nodeContainer = null;
        _super.prototype.dispose.call(this);
    };
    return AcConquerMainLandDetailViewTab2Tab2;
}(CommonViewTab));
__reflect(AcConquerMainLandDetailViewTab2Tab2.prototype, "AcConquerMainLandDetailViewTab2Tab2");
