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
 * 奖池奖励
 * date 2020.4.2
 * @class AcKiteDetailPopupViewTab3
 */
var AcLotusDetailPopupViewTab3 = (function (_super) {
    __extends(AcLotusDetailPopupViewTab3, _super);
    function AcLotusDetailPopupViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    AcLotusDetailPopupViewTab3.prototype.initView = function () {
        var view = this;
        // view.height = 695;
        // view.width = 530;
        var bg = BaseBitmap.create("public_9_bg4");
        bg.width = 530;
        bg.height = 695;
        bg.x = 46;
        bg.y = 53;
        view.addChild(bg);
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("aclotus_poolbg", this.getTypeCode()));
        view.addChild(topbg);
        topbg.width = 532;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, bg, [0, 3]);
        var rewardArr = GameData.formatRewardItem(view.cfg.getPoolRewards());
        var scroStartY = topbg.y + topbg.height + 10;
        var len = Math.min(5, rewardArr.length);
        var scale = 0.85;
        var tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(scale);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if ((tmpX - bg.x) > bg.width) {
                tmpX = bg.x + (bg.width - len * 108 * scale - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
    };
    AcLotusDetailPopupViewTab3.prototype.getTypeCode = function () {
        if (this.code == "2") {
            return "1";
        }
        return this.code;
    };
    Object.defineProperty(AcLotusDetailPopupViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusDetailPopupViewTab3.prototype, "code", {
        get: function () {
            return this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcLotusDetailPopupViewTab3.prototype, "aid", {
        get: function () {
            return this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    AcLotusDetailPopupViewTab3.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return AcLotusDetailPopupViewTab3;
}(CommonViewTab));
__reflect(AcLotusDetailPopupViewTab3.prototype, "AcLotusDetailPopupViewTab3");
//# sourceMappingURL=AcLotusDetailPopupViewTab3.js.map