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
 * desc:规则详情弹窗
*/
var AcCrossServantPowerTaskPopupView = (function (_super) {
    __extends(AcCrossServantPowerTaskPopupView, _super);
    function AcCrossServantPowerTaskPopupView() {
        return _super.call(this) || this;
    }
    AcCrossServantPowerTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat(["progress_type3_yellow", "progress_type3_bg"]);
    };
    AcCrossServantPowerTaskPopupView.prototype.initView = function () {
        this._aid = this.param.data.aid;
        this._code = this.param.data.code;
        this._acVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid, this._code);
        var cfg = Config.AcCfg.getCfgByActivityIdAndCode(this._aid, this._code);
        var rankBg = BaseBitmap.create("public_tc_bg01");
        rankBg.width = 540;
        rankBg.height = 680;
        rankBg.setPosition(39, 10);
        this.addChildToContainer(rankBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, rankBg.width, rankBg.height - 20);
        AcCrossServantPowerTaskScrollItem._ACVO = this._acVo;
        var servantPower = cfg.task;
        var keys = Object.keys(servantPower);
        keys.sort(function (dataA, dataB) {
            return Number(dataA) - Number(dataB);
        });
        var _scrollList = ComponentManager.getScrollList(AcCrossServantPowerTaskScrollItem, keys, rect);
        _scrollList.setPosition(rankBg.x + 10, rankBg.y + 10);
        this.addChildToContainer(_scrollList);
        this.__scrollList = _scrollList;
    };
    AcCrossServantPowerTaskPopupView.prototype.getBgExtraHeight = function () {
        return 20;
    };
    AcCrossServantPowerTaskPopupView.prototype.dispose = function () {
        this._aid = null;
        this._code = null;
        this._acVo = null;
        _super.prototype.dispose.call(this);
    };
    return AcCrossServantPowerTaskPopupView;
}(PopupView));
__reflect(AcCrossServantPowerTaskPopupView.prototype, "AcCrossServantPowerTaskPopupView");
