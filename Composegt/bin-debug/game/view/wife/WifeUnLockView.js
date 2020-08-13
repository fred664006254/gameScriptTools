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
 * 未迎娶界面
 * author dmj
 * date 2017/10/9
 * @class WifeUnLockView
 */
var WifeUnLockView = (function (_super) {
    __extends(WifeUnLockView, _super);
    function WifeUnLockView() {
        var _this = _super.call(this) || this;
        _this._scrollList = undefined;
        _this._bluePrevBtn = null;
        //1是蓝颜预览 0是红颜预览
        _this._bluePrevFlag = 0;
        return _this;
    }
    WifeUnLockView.prototype.getBorderName = function () {
        return "commonview_border1";
    };
    WifeUnLockView.prototype.getBgName = function () {
        return "commonview_woodbg";
    };
    WifeUnLockView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "wifechangesex_unlockview_bottombg",
            "commonview_woodbg"
        ]);
    };
    WifeUnLockView.prototype.initView = function () {
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_SEARCHGEM_REFRESH, this.refreshList, this);
        this._bluePrevFlag = 0;
        if (Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch() && Api.gameinfoVoApi.getSexdefault()) {
            this._bluePrevFlag = 1;
        }
        this._wifVoApi = Api.wifeVoApi;
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        // if(unlockList.length <= 0 )
        // {
        // 	return;
        // }
        // let bottomBg = BaseBitmap.create("public_9v_bg02");
        // bottomBg.width = GameConfig.stageWidth;
        // bottomBg.height = GameConfig.stageHeigth;
        // bottomBg.x = 0;
        // bottomBg.y = -15;
        // this.addChildToContainer(bottomBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, GameConfig.stageWidth - 0, GameConfig.stageHeigth - this.container.y - 30);
        var scrollList = ComponentManager.getScrollList(WifeScrollItem2, unlockList, rect);
        scrollList.setEmptyTip(LanguageManager.getlocal("wifeNoUnlockWife"));
        this.addChildToContainer(scrollList);
        scrollList.setPosition(0, -5);
        this._scrollList = scrollList;
        if (Api.switchVoApi.checkOpenBuleWife() && Api.gameinfoVoApi.getSexswitch()) {
            var bWifeBg = BaseBitmap.create("wifechangesex_unlockview_bottombg");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, bWifeBg, this.viewBg);
            this._bluePrevBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'bluePreviewBtn', this.bluePreviewHandle, this);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, this._bluePrevBtn, bWifeBg);
            this.addChild(bWifeBg);
            this.addChild(this._bluePrevBtn);
            this._bluePrevBtn.setText((this._bluePrevFlag ? "redPreviewBtn" : "bluePreviewBtn"), true);
        }
    };
    WifeUnLockView.prototype.refreshList = function () {
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        this._scrollList.refreshData(unlockList);
    };
    WifeUnLockView.prototype.bluePreviewList = function (flag) {
        var unlockList = this._wifVoApi.getUnlockWifeInfoVoList();
        this._scrollList.refreshData(unlockList, { isBluePreview: flag });
    };
    WifeUnLockView.prototype.bluePreviewHandle = function () {
        this._bluePrevFlag = 1 - this._bluePrevFlag;
        this._bluePrevBtn.setText((this._bluePrevFlag ? "redPreviewBtn" : "bluePreviewBtn"), true);
        this.bluePreviewList(this._bluePrevFlag);
    };
    WifeUnLockView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_SEARCHGEM_REFRESH, this.refreshList, this);
        this._scrollList = null;
        this._bluePrevBtn = null;
        this._bluePrevFlag = 0;
        _super.prototype.dispose.call(this);
    };
    return WifeUnLockView;
}(CommonView));
__reflect(WifeUnLockView.prototype, "WifeUnLockView");
