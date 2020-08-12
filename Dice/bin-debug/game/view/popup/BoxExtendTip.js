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
var BoxExtendTip = (function (_super) {
    __extends(BoxExtendTip, _super);
    function BoxExtendTip() {
        return _super.call(this) || this;
    }
    BoxExtendTip.prototype.init = function (id, cardtype, point) {
        var view = this;
        var boxCfg = Config.BoxCfg.getBoxCfgById(id);
        var pool = boxCfg.getCardPool(cardtype);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        var mask = BaseBitmap.create("public_alpha");
        mask.width = view.width;
        mask.height = view.height;
        view.addChild(mask);
        mask.addTouchTap(function () {
            view.dispose();
            view = null;
        }, view);
        var bubbleGroup = new BaseDisplayObjectContainer();
        view.addChild(bubbleGroup);
        var bubblebg = BaseBitmap.create("boxrewardbulltebg"); //`public_bubblebg`);
        bubbleGroup.addChild(bubblebg);
        var random = boxCfg.getCardRatioShow(cardtype);
        var tipTxt = ComponentMgr.getTextField(LangMger.getlocal(random ? "shopboxrandomget" : "shopboxget" + (pool.length > 1 ? "1" : "")), TextFieldConst.SIZE_18, ColorEnums.white);
        tipTxt.bold = true;
        tipTxt.stroke = 1;
        tipTxt.strokeColor = 0;
        bubbleGroup.addChild(tipTxt);
        var poolGroup = new BaseDisplayObjectContainer();
        bubbleGroup.addChild(poolGroup);
        // let arrow = BaseBitmap.create(`public_bubblearrow`);
        // view.addChild(arrow);
        var tmpX = 0;
        var len = pool.length;
        var scale = 0.6;
        for (var i = 0; i < len; ++i) {
            var id_1 = "100_" + pool[i] + "_1";
            var rewardvo = GameData.formatRewardItem(id_1)[0];
            var iconbg = BaseBitmap.create("bird_team_item_" + Config.DiceCfg.getCfgById(rewardvo.id).quality);
            poolGroup.addChild(iconbg);
            iconbg.setScale(scale);
            var name_1 = ComponentMgr.getTextField('11', TextFieldConst.SIZE_16, GameConfig.getQualityColor(Config.DiceCfg.getCfgById(rewardvo.id).quality));
            poolGroup.addChild(name_1);
            name_1.text = rewardvo.name;
            name_1.textAlign = egret.HorizontalAlign.CENTER;
            name_1.stroke = 1;
            name_1.strokeColor = 0;
            name_1.width = iconbg.width * scale;
            var icon = GameData.getItemIcon(rewardvo);
            // icon.width = icon.height = 86;
            poolGroup.addChild(icon);
            icon.setScale(scale);
            iconbg.x = tmpX;
            name_1.x = iconbg.x;
            name_1.y = iconbg.y + iconbg.height * scale + 5;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, iconbg, [0, 0]);
            tmpX += (iconbg.width * iconbg.scaleX + 15);
        }
        poolGroup.width = len * 108 * scale + (len - 1) * 15;
        poolGroup.height = 108 * scale;
        // bubblebg.width = Math.max(poolGroup.width, tipTxt.width) + 40;
        // bubblebg.height = 5 + tipTxt.height + 5 + poolGroup.height + 15 + 35;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bubblebg, bubbleGroup, [0, 0], true);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, bubblebg, [0, 0]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, poolGroup, tipTxt, [0, tipTxt.textHeight + 10]);
        point.x -= 80;
        var posX = point.x - (bubbleGroup.width / 2);
        if (posX < 0) {
            posX = 0;
        }
        else if ((posX + bubbleGroup.width) > view.width) {
            posX = view.width - bubbleGroup.width - 30;
        }
        var posY = point.y - bubbleGroup.height;
        bubbleGroup.setPosition(posX + 40, posY);
        // arrow.x = point.x - (arrow.width / 2);
        // arrow.y = bubbleGroup.y + bubbleGroup.height - 2;
    };
    BoxExtendTip.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return BoxExtendTip;
}(BaseDisplayObjectContainer));
__reflect(BoxExtendTip.prototype, "BoxExtendTip");
//# sourceMappingURL=BoxExtendTip.js.map