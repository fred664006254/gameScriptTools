/**
 * 在公平竞技场中使用的item
 * 重新实现点击回调
 */
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
var DiceTeamItem1 = (function (_super) {
    __extends(DiceTeamItem1, _super);
    function DiceTeamItem1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DiceTeamItem1.prototype.bgOnclick = function (obj, evt) {
        if (this.status === 2) {
            return;
        }
        ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
            dice: this._data.id,
            check: true,
            // inbattle : true,
            info: {
                lv: Config.FairarenaCfg.getDiceLv()
            }
        });
    };
    return DiceTeamItem1;
}(DiceTeamItem));
__reflect(DiceTeamItem1.prototype, "DiceTeamItem1");
//# sourceMappingURL=DiceTeamItem1.js.map