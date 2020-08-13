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
 * 门客加成详情
 * author ycg
 * date 2020.7.6
 */
var SixSection1BattleAddDetailPopupView = /** @class */ (function (_super) {
    __extends(SixSection1BattleAddDetailPopupView, _super);
    function SixSection1BattleAddDetailPopupView() {
        return _super.call(this) || this;
    }
    SixSection1BattleAddDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomstaskflag", "public_popupscrollitembg",
        ]);
    };
    SixSection1BattleAddDetailPopupView.prototype.getTitleStr = function () {
        return "sixSection1BattleDetail_buffdetail";
    };
    SixSection1BattleAddDetailPopupView.prototype.initView = function () {
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 530;
        itemBg.height = 660;
        itemBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - itemBg.width / 2, 10);
        this.addChildToContainer(itemBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 522, itemBg.height - 10);
        var info = this.param.data.info;
        var list = Api.sixsection1VoApi.getBaseBuffListById(info.id);
        var scrollList = ComponentManager.getScrollList(SixSection1BattleAddDetailScrollItem, list, rect, info);
        this.addChildToContainer(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, itemBg, [6, 0]);
        var index = 0;
        for (var i = 0; i < list.length; i++) {
            if (i + 1 == info.lv) {
                index = i;
                break;
            }
        }
        scrollList.setScrollTopByIndex(index, 100);
    };
    return SixSection1BattleAddDetailPopupView;
}(PopupView));
//# sourceMappingURL=SixSection1BattleAddDetailPopupView.js.map