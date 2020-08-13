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
 * desc:帮会详情
*/
var AcLocTombAllianceInfoView = (function (_super) {
    __extends(AcLocTombAllianceInfoView, _super);
    function AcLocTombAllianceInfoView() {
        var _this = _super.call(this) || this;
        _this._gemGroup = null;
        _this._gemTxt = null;
        _this._pointTxt = null;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcLocTombAllianceInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoView.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLocTombAllianceInfoView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcLocTombAllianceInfoView.prototype.getTabbarTextArr = function () {
        return [
            "acwipeBossAllInfo1",
            "acwipeBossAllInfo2",
        ];
    };
    AcLocTombAllianceInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_bottombg",
            "servant_topnumbg",
            "wipeboss1", "wipeboss2", "wipeboss3", "wipeboss4", "wipeboss5", "wipeboss6", "wipeboss7",
            "wipeboss1_icon", "wipeboss2_icon", "wipeboss3_icon", "wipeboss4_icon", "wipeboss5_icon", "wipeboss6_icon", "wipeboss7_icon",
        ]);
    };
    AcLocTombAllianceInfoView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        view._gemGroup.visible = data.index == 0;
    };
    AcLocTombAllianceInfoView.prototype.initView = function () {
        var view = this;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 528;
        Bg.height = 526;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0, 60]);
        view.addChildToContainer(Bg);
        var gemGroup = new BaseDisplayObjectContainer();
        gemGroup.width = 150;
        gemGroup.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [-10, 15], true);
        view.addChildToContainer(gemGroup);
        view._gemGroup = gemGroup;
        var servantNumBg = BaseBitmap.create("servant_topnumbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0, 0], true);
        gemGroup.addChild(servantNumBg);
        var gemTxt = ComponentManager.getTextField(LanguageManager.getlocal('acwipeBossAllInfoNum', [view.vo.getAllianceInfoNum().toString(), view.cfg.maxShare.toString()]), TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemTxt, gemGroup, [0, 0], true);
        gemGroup.addChild(gemTxt);
        view._gemTxt = gemTxt;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('loctombposKillTip', [view.cfg.needKillNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = Bg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, Bg.height + 10]);
        view.addChildToContainer(tipTxt);
    };
    AcLocTombAllianceInfoView.prototype.getShowWidth = function () {
        return 570;
    };
    AcLocTombAllianceInfoView.prototype.getShowHeight = function () {
        return 754;
    };
    AcLocTombAllianceInfoView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_ACTIVITY_LOCTOMBENERMY, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcLocTombAllianceInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data) {
            view.vo.setEnermyInfo(data.data.data);
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcLocTombAllianceInfoView.prototype.freshView = function () {
        var view = this;
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._gemTxt, view._gemGroup);
        view._pointTxt.text = LanguageManager.getlocal('acwipeBossPoint', [view.vo.getActPoints().toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [25, 25], true);
    };
    AcLocTombAllianceInfoView.prototype.getTitleStr = function () {
        return 'acwipeBossAllInfoTitle';
    };
    AcLocTombAllianceInfoView.prototype.dispose = function () {
        var view = this;
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcLocTombAllianceInfoView;
}(PopupView));
__reflect(AcLocTombAllianceInfoView.prototype, "AcLocTombAllianceInfoView");
//# sourceMappingURL=AcLocTombAllianceInfoView.js.map