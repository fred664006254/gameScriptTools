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
var BattleLogDiceItem = (function (_super) {
    __extends(BattleLogDiceItem, _super);
    function BattleLogDiceItem() {
        return _super.call(this) || this;
    }
    BattleLogDiceItem.prototype.initItem = function (index, data, param) {
        var view = this;
        view.width = param ? (40) : 97;
        view.height = param ? 40 : 96;
        var bg = BaseBitmap.create("public_alpha");
        bg.width = bg.height = param ? 36 : 128;
        // let bg = BaseBitmap.create(`bird_team_item_${Config.DiceCfg.getCfgById(data.id).quality}`);
        // bg.height = BattleStatus.diceSize.width * DiceScaleEnum.scale_54;
        var birdBg = BaseBitmap.create("bird_team_item_" + Config.DiceCfg.getCfgById(data.id).quality);
        birdBg.setScale(0.85);
        this.addChild(birdBg);
        var icon = App.CommonUtil.getDiceIconById(data.id, DiceScaleEnum.scale_battle_log);
        if (param) {
            icon.setScale(DiceScaleEnum.scale_pve);
            birdBg.setScale(0.85 * 0.4);
        }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, birdBg, bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, icon, bg);
        view.addChild(icon);
        this.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                dice: data.id,
                check: true,
            });
        }, this);
    };
    BattleLogDiceItem.prototype.getSpaceY = function () {
        return 0;
    };
    BattleLogDiceItem.prototype.getSpaceX = function () {
        return 0;
    };
    BattleLogDiceItem.prototype.dispose = function () {
        var view = this;
        _super.prototype.dispose.call(this);
    };
    return BattleLogDiceItem;
}(ScrollListItem));
__reflect(BattleLogDiceItem.prototype, "BattleLogDiceItem");
//# sourceMappingURL=BattleLogDiceItem.js.map