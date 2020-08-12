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
 * 祭品骰子，摧毁 合成后增加sp
*/
var Dice207 = (function (_super) {
    __extends(Dice207, _super);
    function Dice207(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice207.prototype.addSp = function (star) {
        //祭品骰子加sp
        this.playAtkSound();
        var data = this.getDiceData();
        var spnum = data.property1 * star;
        var isMe = data.isMe;
        Api.BattleVoApi.addSp(spnum, isMe);
        if (isMe) {
            if (this.x == data.getShowPos(isMe).x) {
                if (BattleStatus.scene) {
                    BattleStatus.scene.showNum(spnum, { x: this.x, y: this.y });
                }
            }
        }
    };
    Dice207.prototype.dispose = function () {
        //祭品骰子被合成、被暗杀、被boss打、变化等等都加sp
        if (this.getDiceData()) {
            this.addSp(this.getDiceData().star);
        }
        _super.prototype.dispose.call(this);
    };
    return Dice207;
}(BaseDice));
__reflect(Dice207.prototype, "Dice207");
//# sourceMappingURL=Dice207.js.map