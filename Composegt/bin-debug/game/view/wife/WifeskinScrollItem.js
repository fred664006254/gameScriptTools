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
 * 皮肤头像
 * author dky
 * date 2018/3/5
 * @class WifeskinScrollItem
 */
var WifeskinScrollItem = (function (_super) {
    __extends(WifeskinScrollItem, _super);
    function WifeskinScrollItem() {
        return _super.call(this) || this;
    }
    WifeskinScrollItem.prototype.initItem = function (index, wifeSkinItemCfg) {
        this.width = 115 + this.getSpaceX();
        this.height = 110;
        var lv = 1;
        if (wifeSkinItemCfg) {
            var wifeSkinVo = Api.wifeSkinVoApi.getWifeskinInfoVoById(wifeSkinItemCfg.wifeId);
            if (wifeSkinVo) {
                lv = wifeSkinVo.getLvBySkinId(wifeSkinItemCfg.id);
            }
        }
        var iconBg = BaseBitmap.create("wifeview_hongyantyouxiang1");
        // nameBg.width = this.width;
        iconBg.name = "bg2";
        this.addChild(iconBg);
        var iconStr = "";
        if (wifeSkinItemCfg) {
            iconStr = wifeSkinItemCfg.icon;
        }
        else {
            var cfg = Config.WifeCfg.getWifeCfgById(WifeskinView.wifeId);
            iconStr = cfg.icon;
        }
        var icon = BaseLoadBitmap.create(iconStr);
        icon.width = 205;
        icon.height = 192;
        icon.setScale(0.5);
        // icon.mask = egret.Rectangle.create().setTo(0,0,userContainer.width,500);
        // var circle:egret.Shape = new egret.Shape();
        // circle.graphics.beginFill(0x0000ff);
        // circle.graphics.drawCircle(50,44,40);
        // circle.graphics.endFill();
        var iconMask = BaseBitmap.create("wifeview_iconmask");
        this.addChild(iconMask);
        icon.mask = iconMask;
        this.cacheAsBitmap = true;
        this.addChild(icon);
        //显示等级
        if (Api.switchVoApi.checkOpenWifeskinLvup() && wifeSkinItemCfg && wifeSkinItemCfg.canLvup) {
            var lvBg = BaseBitmap.create("public_lvupbigbg");
            lvBg.x = iconBg.x + iconBg.width / 2 - lvBg.width / 2;
            lvBg.y = iconBg.y + iconBg.height - lvBg.height / 2;
            this.addChild(lvBg);
            var lvTxt = ComponentManager.getTextField("Lv." + lv, 16, TextFieldConst.COLOR_LIGHT_YELLOW);
            lvTxt.x = lvBg.x + lvBg.width / 2 - lvTxt.width / 2;
            lvTxt.y = lvBg.y + lvBg.height / 2 - lvTxt.height / 2;
            this.addChild(lvTxt);
        }
        var skillDotSp = BaseBitmap.create("public_dot2");
        skillDotSp.x = 80;
        skillDotSp.y = 5;
        skillDotSp.name = "redsp";
        this.addChild(skillDotSp);
        if (wifeSkinItemCfg) {
            if (!Api.wifeSkinVoApi.getSkinOneRed(WifeskinView.wifeId, wifeSkinItemCfg.id)) {
                skillDotSp.visible = false;
            }
        }
        else {
            skillDotSp.visible = false;
        }
    };
    WifeskinScrollItem.prototype.getSpaceX = function () {
        return 0;
    };
    WifeskinScrollItem.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return WifeskinScrollItem;
}(ScrollListItem));
__reflect(WifeskinScrollItem.prototype, "WifeskinScrollItem");
