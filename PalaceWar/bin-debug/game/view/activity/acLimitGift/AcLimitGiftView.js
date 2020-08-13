var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AcLimitGiftView = /** @class */ (function (_super) {
    __extends(AcLimitGiftView, _super);
    function AcLimitGiftView() {
        return _super.call(this) || this;
    }
    AcLimitGiftView.prototype.initView = function () {
        var _banner = BaseLoadBitmap.create("ac_limitgift_banner");
        this.addChildToContainer(_banner);
        _banner.height = 212;
        _banner.setPosition(0, 92 - this.container.y);
        var _tips = ComponentManager.getTextField(LanguageManager.getlocal("acLimitGiftText7"), 20, 0xf1d27f);
        this.addChildToContainer(_tips);
        _tips.setPosition(_banner.x + 288, _banner.y + 140);
        var _border = BaseLoadBitmap.create("ac_limitgift_border");
        this.addChildToContainer(_border);
        _border.height = GameConfig.stageHeigth - _banner.height - _banner.y + this.container.y;
        _border.setPosition(0, _banner.height + _banner.y);
        // let _bottom = BaseLoadBitmap.create("ac_limitgift_bg2");
        // this.addChildToContainer(_bottom);
        // _bottom.height = 32;
        // _bottom.setPosition(0, GameConfig.stageHeigth - 32 - this.container.y);
        var tab_bg = BaseLoadBitmap.create("ac_limitgift_bg3");
        tab_bg.width = 620;
        tab_bg.height = 61;
        this.addChildToContainer(tab_bg);
        tab_bg.setPosition((GameConfig.stageWidth - 620) / 2, _border.y);
        this.refershTabRedPot();
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.refershTabRedPot, this);
    };
    AcLimitGiftView.prototype.initVoList = function () {
        if (!this._volist) {
            this._volist = Api.acVoApi.getActivityVoListByAid(this.aid).filter(function (v) { return !v.isEnd; });
        }
    };
    AcLimitGiftView.prototype.initParams = function () {
        this.param.Vo = this._volist[this.selectedTabIndex];
    };
    AcLimitGiftView.prototype.tick = function () {
        var __endVo = this._volist.filter(function (v) { return v.isEnd; });
        if (__endVo.length > 0) {
            this.refershTabRedPot();
        }
        App.MessageHelper.dispatchEvent(MessageConst.MESSAGR_LIMITGIFT_DJS);
    };
    AcLimitGiftView.prototype.refershTabRedPot = function () {
        var _this = this;
        this._volist.forEach(function (v, i) {
            if (v.isHasFreeCharge && !v.isEnd) {
                _this.tabbarGroup.addRedPoint(i);
            }
            else {
                _this.tabbarGroup.removeRedPoint(i);
            }
        });
    };
    AcLimitGiftView.prototype.changeTab = function () {
        _super.prototype.changeTab.call(this);
        if (this.TabViewInstance && !this.TabViewInstance.Vo) {
            this.TabViewInstance.Vo = this._volist[this.selectedTabIndex];
        }
        this.TabViewInstance.refreshView();
    };
    AcLimitGiftView.prototype.initTabbarGroup = function () {
        this.initVoList();
        _super.prototype.initTabbarGroup.call(this);
    };
    Object.defineProperty(AcLimitGiftView.prototype, "TabViewInstance", {
        get: function () {
            return this.tabViewData[this.selectedTabIndex] || null;
        },
        enumerable: true,
        configurable: true
    });
    AcLimitGiftView.prototype.setTabBarPosition = function () {
        this.tabbarGroup.x = 20;
        this.tabbarGroup.y = 296;
    };
    AcLimitGiftView.prototype.getTabbarTextArr = function () {
        var list = this._volist.map(function (v) {
            return App.CommonUtil.getCnByCode("acLimitGiftText1", "" + v.config.limitType);
        });
        return list;
    };
    AcLimitGiftView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_SMALL_TAB;
    };
    AcLimitGiftView.prototype.initTitle = function () {
        _super.prototype.initTitle.call(this);
        this.titleBgShadow.dispose();
    };
    AcLimitGiftView.prototype.getBgName = function () {
        return "ac_limitgift_bg1";
    };
    AcLimitGiftView.prototype.getTitleBgName = function () {
        return "ac_limitgift_title1";
    };
    AcLimitGiftView.prototype.getTitlePic = function () {
        return "";
    };
    AcLimitGiftView.prototype.getTitleStr = function () {
        return "";
    };
    AcLimitGiftView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "ac_limitgift_banner", "dailyactivity_fnt"
        ]);
    };
    AcLimitGiftView.prototype.dispose = function () {
        this._volist = null;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACLIMITGIFT_FREE), this.refershTabRedPot, this);
        _super.prototype.dispose.call(this);
    };
    return AcLimitGiftView;
}(AcCommonView));
//# sourceMappingURL=AcLimitGiftView.js.map