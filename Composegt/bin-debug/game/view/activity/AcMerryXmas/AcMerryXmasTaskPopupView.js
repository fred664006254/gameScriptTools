/**
 * 通用任务弹窗
 * @param aid string 活动aid
 * @param code string 活动code
 * @param tabbarTextArr  string[] 可选参数 标签页cnkey数组,同时决定标签页个数,不传则默认3个
 * @param specialIconId  string 可选参数 活动特殊道具图标Id,需自行在RewardItemVo中添加
 * @param uiCode string 可选参数 活动的资源code(特殊道具图标code后缀)
 *
 * 以下可参考AcMerryXmasVo
 * 需在活动vo中实现getSortTask方法获取任务列表
 * 需要在vo中实现getTaskNum方法获取任务进度
 * 可以在vo中实现isShowTaskTabRed方法检测标签页红点
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
var AcMerryXmasTaskPopupView = (function (_super) {
    __extends(AcMerryXmasTaskPopupView, _super);
    function AcMerryXmasTaskPopupView() {
        var _this = _super.call(this) || this;
        _this.code = null;
        _this.aid = null;
        return _this;
    }
    AcMerryXmasTaskPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "accommontask_itemtitlebg"
        ]);
    };
    Object.defineProperty(AcMerryXmasTaskPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    AcMerryXmasTaskPopupView.prototype.getShowHeight = function () {
        return 850;
    };
    AcMerryXmasTaskPopupView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.checkTabRed, this);
        this.code = this.param.data.code;
        this.aid = this.param.data.aid;
        this.tabbarGroup.setSpace(10);
        this.checkTabRed();
    };
    AcMerryXmasTaskPopupView.prototype.checkTabRed = function () {
        var tabNum = this.getTabbarTextArr().length;
        for (var i = 0; i < tabNum; i++) {
            if (this.vo.isShowTaskTabRed(i + 1)) {
                this.tabbarGroup.addRedPoint(i);
            }
            else {
                this.tabbarGroup.removeRedPoint(i);
            }
        }
    };
    AcMerryXmasTaskPopupView.prototype.getTabbarName = function () {
        return ButtonConst.BTN_WINTAB;
    };
    AcMerryXmasTaskPopupView.prototype.getTabbarTextArr = function () {
        if (this.param.data.tabbarTextArr && this.param.data.tabbarTextArr[0]) {
            return this.param.data.tabbarTextArr;
        }
        return [
            "acCarnivalNightTaskPopupViewTabTitle1",
            "acCarnivalNightTaskPopupViewTabTitle2",
            "acCarnivalNightTaskPopupViewTabTitle3",
        ];
    };
    AcMerryXmasTaskPopupView.prototype.getTabbarGroupX = function () {
        return 17;
    };
    AcMerryXmasTaskPopupView.prototype.isHaveTabBg = function () {
        return true;
    };
    AcMerryXmasTaskPopupView.prototype.dispose = function () {
        this.code = null;
        this.aid = null;
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_MERRYXMAS_REFRESHVO, this.checkTabRed, this);
        _super.prototype.dispose.call(this);
    };
    return AcMerryXmasTaskPopupView;
}(PopupView));
__reflect(AcMerryXmasTaskPopupView.prototype, "AcMerryXmasTaskPopupView");
