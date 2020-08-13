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
var NewAtkracecrossBuffDetailView = /** @class */ (function (_super) {
    __extends(NewAtkracecrossBuffDetailView, _super);
    function NewAtkracecrossBuffDetailView() {
        return _super.call(this) || this;
    }
    NewAtkracecrossBuffDetailView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "threekingdomstaskflag", "public_popupscrollitembg",
        ]);
    };
    NewAtkracecrossBuffDetailView.prototype.getTitleStr = function () {
        return "newatkracecross_buffdetail";
    };
    NewAtkracecrossBuffDetailView.prototype.initView = function () {
        var itemBg = BaseBitmap.create("public_9_bg4");
        itemBg.width = 530;
        itemBg.height = 763;
        itemBg.setPosition(this.viewBg.x + this.viewBg.width / 2 - itemBg.width / 2, 10);
        this.addChildToContainer(itemBg);
        var rect = egret.Rectangle.create();
        rect.setTo(0, 0, 522, itemBg.height - 10);
        var info = this.param.data.info;
        var list = Api.atkracecrossVoApi.getNewCrossCfg().getBaseBuffListById(info.id);
        var scrollList = ComponentManager.getScrollList(NewAtkracecrossDetailScrollItem, list, rect, info);
        this.addChildToContainer(scrollList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, scrollList, itemBg, [6, 0]);
    };
    return NewAtkracecrossBuffDetailView;
}(PopupView));
//# sourceMappingURL=NewAtkracecrossBuffDetailView.js.map