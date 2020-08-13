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
var AcCrossServerWipeBossAllianceInfoView = (function (_super) {
    __extends(AcCrossServerWipeBossAllianceInfoView, _super);
    function AcCrossServerWipeBossAllianceInfoView() {
        var _this = _super.call(this) || this;
        _this._gemGroup = null;
        _this._gemTxt = null;
        _this._pointTxt = null;
        _this._data = [];
        return _this;
    }
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoView.prototype, "api", {
        get: function () {
            return Api.crossServerWipeBossVoApi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoView.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcCrossServerWipeBossAllianceInfoView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.param.data.aid, this.param.data.code);
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerWipeBossAllianceInfoView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getTabbarTextArr = function () {
        return [
            "accrossserverwipeBossAllInfo1",
            "accrossserverwipeBossAllInfo2",
        ];
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifeview_bottombg",
            "servant_topnumbg",
            "accrossserverwipeboss_box1_icon",
            "accrossserverwipeboss_box2_icon",
            "accrossserverwipeboss_box3_icon",
            "accrossserverwipeboss_box1_2",
            "accrossserverwipeboss_box2_2",
            "accrossserverwipeboss_box3_2",
            "crossserverwipeboss1", "crossserverwipeboss2", "crossserverwipeboss3", "crossserverwipeboss4", "crossserverwipeboss5", "crossserverwipeboss6", "crossserverwipeboss7",
            "crossserverwipeboss1_icon", "crossserverwipeboss2_icon", "crossserverwipeboss3_icon", "crossserverwipeboss4_icon", "crossserverwipeboss5_icon", "crossserverwipeboss6_icon", "crossserverwipeboss7_icon",
        ]);
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.clickTabbarHandler = function (data) {
        var view = this;
        _super.prototype.clickTabbarHandler.call(this, data);
        view._gemGroup.visible = data.index == 0;
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.initView = function () {
        var view = this;
        var Bg = BaseBitmap.create("public_tc_bg01");
        Bg.width = 528;
        Bg.height = 526;
        view.setLayoutPosition(LayoutConst.horizontalCentertop, Bg, view.viewBg, [0, 55]);
        view.addChildToContainer(Bg);
        this.tabbarGroup.setSpace(10);
        var gemGroup = new BaseDisplayObjectContainer();
        gemGroup.width = 150;
        gemGroup.height = 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, gemGroup, view.container, [0, 15], true);
        view.addChildToContainer(gemGroup);
        view._gemGroup = gemGroup;
        // let servantNumBg = BaseBitmap.create("servant_topnumbg");
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, servantNumBg, gemGroup, [0,0], true);
        // gemGroup.addChild(servantNumBg);
        var gemTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossAllInfoNum', [view.api.getAllianceInfoNum().toString(), view.cfg.maxShare.toString()]), 22, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, gemTxt, gemGroup, [0, 0], true);
        gemGroup.addChild(gemTxt);
        view._gemTxt = gemTxt;
        var tipTxt = ComponentManager.getTextField(LanguageManager.getlocal('accrossserverwipeBossKillTip', [view.cfg.needKillNum.toString()]), 20, TextFieldConst.COLOR_BLACK);
        tipTxt.width = Bg.width - 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, Bg, [0, Bg.height + 10]);
        view.addChildToContainer(tipTxt);
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getShowWidth = function () {
        return 570;
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getShowHeight = function () {
        return 780;
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getRequestData = function () {
        var view = this;
        return { requestType: NetRequestConst.REQUEST_WIPEBOSS_ENEMY, requestData: {
                activeId: view.vo.aidAndCode,
            } };
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.receiveData = function (data) {
        var view = this;
        view._data = [];
        if (data.data.data) {
            view.api.setEnermyInfo(data.data.data);
        }
        //view.api.setBossNumInfo(data.data.data);
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.freshView = function () {
        var view = this;
        view._gemTxt.text = Api.playerVoApi.getPlayerGemStr();
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._gemTxt, view._gemGroup);
        view._pointTxt.text = LanguageManager.getlocal('accrossserverwipeBossPoint', [view.vo.getActPoints().toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, view._pointTxt, view.container, [25, 25], true);
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getTitleStr = function () {
        return 'accrossserverwipeBossAllInfoTitle';
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcCrossServerWipeBossAllianceInfoView.prototype.dispose = function () {
        var view = this;
        view._gemGroup = null;
        view._gemTxt = null;
        view._pointTxt = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerWipeBossAllianceInfoView;
}(PopupView));
__reflect(AcCrossServerWipeBossAllianceInfoView.prototype, "AcCrossServerWipeBossAllianceInfoView");
