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
/**
 *
 * desc:奖励弹窗
*/
var AcCrossServerHegemonyRewardView = /** @class */ (function (_super) {
    __extends(AcCrossServerHegemonyRewardView, _super);
    function AcCrossServerHegemonyRewardView() {
        return _super.call(this) || this;
    }
    AcCrossServerHegemonyRewardView.prototype.getTabbarTextArr = function () {
        return [
            "acCrossServerHegemonyRewardTab1",
            "acCrossServerHegemonyRewardTab2",
            "acCrossServerHegemonyRewardTab3"
        ];
    };
    AcCrossServerHegemonyRewardView.prototype.getTabbarName = function () {
        return ButtonConst.BTN2_TAB;
    };
    AcCrossServerHegemonyRewardView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "arena_bottom", "acsingledayitembg", "accshegemony_ranktitlebg", "aobaidescnamebg",
            "achegemonyrankreward_titlebg-1", "public_9_bg98",
        ]);
    };
    Object.defineProperty(AcCrossServerHegemonyRewardView.prototype, "uiType", {
        get: function () {
            return "2";
        },
        enumerable: true,
        configurable: true
    });
    AcCrossServerHegemonyRewardView.prototype.getBigFrame = function () {
        return "commonview_bigframe";
    };
    AcCrossServerHegemonyRewardView.prototype.addTabbarGroupBg = function () {
        return true;
    };
    AcCrossServerHegemonyRewardView.prototype.getTitleBgName = function () {
        return ResourceManager.hasRes("achegemonyrankreward_titlebg-" + this.param.data.code) ? "achegemonyrankreward_titlebg-" + this.param.data.code : "achegemonyrankreward_titlebg-1";
    };
    AcCrossServerHegemonyRewardView.prototype.getTitleStr = function () {
        return "";
    };
    AcCrossServerHegemonyRewardView.prototype.getCloseBtnName = function () {
        return ButtonConst.COMMON_CLOSE_1;
    };
    AcCrossServerHegemonyRewardView.prototype.initView = function () {
        this.tabbarGroup.setSpace(0);
        this.setTabBarPosition();
        // this.tabbarGroup.x = GameConfig.stageWidth/2 - this.tabbarGroup.width/2;
        this.tabbarGroup.y = this.titleBg.y + this.titleBg.height - 12;
        if (this.tabbarGroupBg) {
            this.tabbarGroupBg.x = GameConfig.stageWidth / 2 - this.tabbarGroupBg.width / 2;
            this.tabbarGroupBg.y = this.titleBg.y + this.titleBg.height - 3;
        }
        this.setBigFameY(-(this.tabbarGroup.y + this.tabbarGroup.height));
        this.setBigFameHeight(GameConfig.stageHeigth - 5);
    };
    AcCrossServerHegemonyRewardView.prototype.isHideTitleBgShadow = function () {
        return true;
    };
    AcCrossServerHegemonyRewardView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcCrossServerHegemonyRewardView;
}(CommonView));
//# sourceMappingURL=AcCrossServerHegemonyRewardView.js.map