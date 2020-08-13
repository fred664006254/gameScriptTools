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
var AcBeatXiongNuRewardViewTab3 = (function (_super) {
    __extends(AcBeatXiongNuRewardViewTab3, _super);
    function AcBeatXiongNuRewardViewTab3(data) {
        var _this = _super.call(this) || this;
        _this.param = data;
        _this.initView();
        return _this;
    }
    Object.defineProperty(AcBeatXiongNuRewardViewTab3.prototype, "cfg", {
        get: function () {
            return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab3.prototype, "vo", {
        get: function () {
            return Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab3.prototype, "acTivityId", {
        get: function () {
            return this.aid + "-" + this.code;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab3.prototype, "aid", {
        get: function () {
            return "" + this.param.data.aid;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AcBeatXiongNuRewardViewTab3.prototype, "code", {
        get: function () {
            return "" + this.param.data.code;
        },
        enumerable: true,
        configurable: true
    });
    AcBeatXiongNuRewardViewTab3.prototype.getUiCode = function () {
        var code = '';
        switch (Number(this.code)) {
            case 1:
            case 2:
                code = "1";
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    };
    AcBeatXiongNuRewardViewTab3.prototype.initView = function () {
        var view = this;
        view.height = 675;
        view.width = 532;
        var Bg = BaseBitmap.create("public_9_bg4");
        Bg.width = 530;
        Bg.height = 675;
        Bg.x = 26;
        Bg.y = 74;
        view.addChild(Bg);
        var code = view.getUiCode();
        var topbg = BaseBitmap.create(App.CommonUtil.getResByCode("beatxiongnurewardtopbg", code));
        view.addChild(topbg);
        topbg.width = 532;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, topbg, Bg, [0, 3]);
        // if(this.cfg.corePrize){
        // 	let wcfg = Config.WifeskinCfg.getWifeCfgById(this.cfg.corePrize);
        // 	let wife = BaseLoadBitmap.create(wcfg.body);
        // 	wife.width = 640;
        // 	wife.height = 840;
        // 	wife.setScale(0.3);
        // 	view.addChild(wife);
        // 	App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, wife, topbg, [0,6]);
        // }
        var rewardArr = GameData.formatRewardItem(view.cfg.getWealthGod());
        var scroStartY = topbg.y + topbg.height + 10;
        var len = Math.min(5, rewardArr.length);
        var scale = 0.85;
        var tmpX = Bg.x + (Bg.width - len * 108 * scale - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            var iconItem = GameData.getItemIcon(rewardArr[index], true, true);
            iconItem.setScale(scale);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX + 7);
            if ((tmpX - Bg.x) > Bg.width) {
                tmpX = Bg.x + (Bg.width - len * 108 * scale - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 8;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width * iconItem.scaleX + 7);
            }
            this.addChild(iconItem);
        }
    };
    AcBeatXiongNuRewardViewTab3.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return AcBeatXiongNuRewardViewTab3;
}(CommonViewTab));
__reflect(AcBeatXiongNuRewardViewTab3.prototype, "AcBeatXiongNuRewardViewTab3");
//# sourceMappingURL=AcBeatXiongNuRewardViewTab3.js.map