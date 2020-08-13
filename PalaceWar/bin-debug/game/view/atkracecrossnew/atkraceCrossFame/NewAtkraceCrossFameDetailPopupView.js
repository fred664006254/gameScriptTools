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
 * 江湖名望 席位效果
 * date 2020.7.9
 * author ycg
 */
var NewAtkraceCrossFameDetailPopupView = /** @class */ (function (_super) {
    __extends(NewAtkraceCrossFameDetailPopupView, _super);
    function NewAtkraceCrossFameDetailPopupView() {
        return _super.call(this) || this;
    }
    Object.defineProperty(NewAtkraceCrossFameDetailPopupView.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFameDetailPopupView.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NewAtkraceCrossFameDetailPopupView.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    NewAtkraceCrossFameDetailPopupView.prototype.initView = function () {
        var bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 660;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this.addChildToContainer(bg);
        var data = this.vo.cfg.getFameSeatList();
        var scrollList = ComponentManager.getScrollList(NewAtkraceCrossFameDetailScrollItem, data, new egret.Rectangle(0, 0, bg.width - 20, bg.height - 10));
        scrollList.setPosition(bg.x + 10, bg.y + 5);
        this.addChildToContainer(scrollList);
    };
    NewAtkraceCrossFameDetailPopupView.prototype.getTitleStr = function () {
        return "newatkrackcross_fameEffectPopupTitle";
    };
    NewAtkraceCrossFameDetailPopupView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "public_popupscrollitembg", "public_line3"
        ]);
    };
    NewAtkraceCrossFameDetailPopupView.prototype.getShowHeight = function () {
        return 760;
    };
    NewAtkraceCrossFameDetailPopupView.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return NewAtkraceCrossFameDetailPopupView;
}(PopupView));
//# sourceMappingURL=NewAtkraceCrossFameDetailPopupView.js.map