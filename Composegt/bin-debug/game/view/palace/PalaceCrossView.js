/**
 * 跨服皇宫
 * author yanyuling
 * date 2018/03/19
 * @class PalaceCrossView
 *  与 PalaceView 的差异仅表现在posCfg 和背景图上，无它
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
var PalaceCrossView = (function (_super) {
    __extends(PalaceCrossView, _super);
    function PalaceCrossView() {
        return _super.call(this) || this;
    }
    PalaceCrossView.prototype.initView = function () {
        _super.prototype.initView.call(this);
    };
    PalaceCrossView.prototype.initPosCfg = function () {
        this._posList = this._posList = Config.SceneCfg.getSceneCfgBySceneName("crosspalace");
    };
    PalaceCrossView.prototype.getStartIdx = function () {
        return 0;
    };
    PalaceCrossView.prototype.getCorssBtnPath = function () {
        return "palacve_backBtn";
    };
    PalaceCrossView.prototype.crossBtnHandler = function () {
        ViewController.getInstance().openView(ViewConst.COMMON.PALACEVIEW);
        this.hide();
    };
    PalaceCrossView.prototype.getBgRes = function () {
        return "palace_bg3_2";
    };
    PalaceCrossView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            // "palace_shadow6","palace_shadow7",
            "palace_building_flag5",
        ]);
    };
    ;
    PalaceCrossView.prototype.getRequestData = function () {
        return { requestType: NetRequestConst.REQUEST_PALACE_GETCROSSPALACE, requestData: {} };
    };
    PalaceCrossView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return PalaceCrossView;
}(PalaceView));
__reflect(PalaceCrossView.prototype, "PalaceCrossView");
