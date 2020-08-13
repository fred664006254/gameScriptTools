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
 * 新版升级皮肤头像
 * author qianjun
 * @class WifeskinNewScrollItem
 */
var WifeskinNewScrollItem = (function (_super) {
    __extends(WifeskinNewScrollItem, _super);
    function WifeskinNewScrollItem() {
        return _super.call(this) || this;
    }
    WifeskinNewScrollItem.prototype.initItem = function (index, wifeSkinItemCfg) {
        this.width = 100 + this.getSpaceX();
        this.height = index == 0 ? 157 : 120;
        var tmpY = 0;
        if (index == 0) {
            var top_1 = BaseBitmap.create("wifeskinropetop");
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, top_1, this, [0, 0], true);
            this.addChild(top_1);
            tmpY = top_1.height;
        }
        var line = BaseBitmap.create("wifeskinrope");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, this, [0, tmpY], true);
        this.addChild(line);
        var iconBg = BaseBitmap.create("tailor_iconBtn");
        // nameBg.width = this.width;
        iconBg.setScale(0.85);
        iconBg.name = "bg2";
        this.addChild(iconBg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, iconBg, line, [0, line.height]);
        var iconStr = "";
        if (wifeSkinItemCfg) {
            iconStr = wifeSkinItemCfg.icon;
        }
        else {
            var cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId);
            iconStr = cfg.icon;
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.setScale(0.42);
        icon.x = 0;
        icon.y = 40 + tmpY;
        // icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
        var circle = new egret.Shape();
        circle.graphics.beginFill(0x0000ff);
        circle.graphics.drawCircle(47, 36, 36);
        circle.graphics.endFill();
        circle.y = icon.y + 2;
        circle.x = 4;
        this.addChild(circle);
        icon.mask = circle;
        this.cacheAsBitmap = true;
        this.addChild(icon);
        var skillDotSp = BaseBitmap.create("public_dot2");
        skillDotSp.x = 60;
        skillDotSp.y = 35;
        skillDotSp.name = "redsp";
        this.addChild(skillDotSp);
        if (wifeSkinItemCfg) {
            if (!Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId, wifeSkinItemCfg.id)) {
                skillDotSp.visible = false;
            }
            if (wifeSkinItemCfg.canAtHome) {
                var homeimg = BaseBitmap.create("wifehome3");
                this.addChild(homeimg);
                // homeimg.x = 50;
                // homeimg.y = 85;
                homeimg.x = 3;
                homeimg.y = 42;
            }
        }
        else {
            skillDotSp.visible = false;
            var cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId);
            if (cfg.canAtHome) {
                var homeimg = BaseBitmap.create("wifehome3");
                this.addChild(homeimg);
                // homeimg.x = 50;
                // homeimg.y = 86;
                homeimg.x = 3;
                homeimg.y = 74;
            }
        }
        if (wifeSkinItemCfg) {
            var skinTitle = App.CommonUtil.getWifeSkinFlagById(wifeSkinItemCfg.id);
            if (skinTitle) {
                skinTitle.setScale(0.7);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, skinTitle, this, [0, -3]);
                this.addChild(skinTitle);
            }
        }
    };
    WifeskinNewScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifeskinNewScrollItem.prototype.getSpaceY = function () {
        return 0;
    };
    WifeskinNewScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeskinNewScrollItem;
}(ScrollListItem));
__reflect(WifeskinNewScrollItem.prototype, "WifeskinNewScrollItem");
//# sourceMappingURL=WifeskinNewScrollItem.js.map