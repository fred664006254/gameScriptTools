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
 * 奖池奖励
 * date 2020.7.14
 * @class AcKiteDetailPopupViewTab3
 */
var AcPowerFullDetailViewTab3 = /** @class */ (function (_super) {
    __extends(AcPowerFullDetailViewTab3, _super);
    function AcPowerFullDetailViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcPowerFullDetailViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcPowerFullDetailViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcPowerFullDetailViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    AcPowerFullDetailViewTab3.prototype.initView = function () {
        var view = this;
        // view.height = 695;
        // view.width = 530;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 695;
        bg.x = 26;
        bg.y = 53;
        view.addChild(bg);
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("acpowerfull_poolbg", this.getTypeCode()));
        view.addChild(topbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 1]);
        var rewardArr = GameData.formatRewardItem(view.cfg.getPoolRewards());
        var scroStartY = topbg.y + topbg.height + 10;
        var len = 4;
        var spaceX = 15;
        var spaceY = 15;
        var scale = 1;
        var tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * spaceX) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            App.LogUtil.log(iconItem.width);
            iconItem.setScale(scale);
            iconItem.x = tmpX + (108 + spaceX) * (index % len);
            iconItem.y = scroStartY + (Math.floor(index / len)) * (108 + spaceY);
            this.addChild(iconItem);
        }
    };
    AcPowerFullDetailViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcPowerFullDetailViewTab3;
}(CommonViewTab));
//# sourceMappingURL=AcPowerFullDetailViewTab3.js.map