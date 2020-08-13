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
var AcSeaWomanPopViewTab2 = /** @class */ (function (_super) {
    __extends(AcSeaWomanPopViewTab2, _super);
    function AcSeaWomanPopViewTab2(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcSeaWomanPopViewTab2.prototype.initView = function () {
        this.height = 670;
        this.width = 520;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 695;
        Bg.setPosition(26, 53);
        this.addChild(Bg);
        var rect = new egret.Rectangle(0, 0, 530, 675);
        var scrollList = ComponentManager.getScrollList(AcSeaWomanScrollItem2, this.cfg.getPlayAwards(), rect, { aid: this.aid, code: this.code, uicode: this.param.data.uicode });
        scrollList.setPosition(Bg.x + 10, Bg.y + 10);
        this.addChild(scrollList);
    };
    Object.defineProperty(AcSeaWomanPopViewTab2.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanPopViewTab2.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcSeaWomanPopViewTab2.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcSeaWomanPopViewTab2.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcSeaWomanPopViewTab2;
}(CommonViewTab));
//# sourceMappingURL=AcSeaWomanPopViewTab2.js.map