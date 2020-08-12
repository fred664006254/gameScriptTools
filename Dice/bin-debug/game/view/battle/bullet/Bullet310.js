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
 * - --原名称：吸收骰子  --新名称：汲取
 * 从敌人身上吸收SP
 * SP吸收量是 星數+(遊戲內等級-1)x3
*/
var Bullet310 = (function (_super) {
    __extends(Bullet310, _super);
    function Bullet310() {
        var _this = _super.call(this) || this;
        _this._addsp = false;
        return _this;
    }
    Bullet310.prototype.setAddSp = function () {
        this._addsp = true;
    };
    Bullet310.prototype.damage = function () {
        var self = this;
        var diceData = self.diceData;
        var mvo = self.mVoList[0];
        var nmDmgData = this.nmDmgData;
        var lost = false;
        if (!!nmDmgData) {
            if (!this.target.lost(this.diceData.isMe)) {
                var damage = this.calDamageNum(this.target);
                if (this._addsp) {
                    //吸能量
                    var cfg = Config.DiceCfg.getCfgById(diceData.id);
                    var num = diceData.star * cfg.getProperty1ByLv(diceData.lv) + cfg.getPowerProperty1ByLv(diceData.pwlv);
                    var txtImg_1 = ComponentMgr.getTextField("sp+" + num, TextFieldConst.SIZE_20, 0xf4fffe);
                    txtImg_1.stroke = 2;
                    txtImg_1.strokeColor = 0x1ab186;
                    txtImg_1.anchorOffsetX = txtImg_1.width / 2;
                    txtImg_1.anchorOffsetY = txtImg_1.height / 2;
                    txtImg_1.alpha = 0;
                    if (this.target) {
                        this.target.addChild(txtImg_1);
                    }
                    // this._extraGroup.addChild(txtImg);
                    var tmpy = -this.target.height / 2; //this.target.y-this.target.height/2;
                    txtImg_1.x = 0; //this.target.x;
                    txtImg_1.y = tmpy;
                    var time = BattleStatus.timeparam;
                    egret.Tween.get(txtImg_1).to({ alpha: 1, y: tmpy - 20 }, 12 * time).to({ alpha: 1, y: tmpy - 25 }, 6 * time).to({ alpha: 0, y: tmpy - 30 }, 3 * time).call(function () {
                        egret.Tween.removeTweens(txtImg_1);
                        txtImg_1.dispose();
                        txtImg_1 = null;
                    }, this);
                    var isMe = diceData.isMe;
                    Api.BattleVoApi.addSp(num, isMe);
                }
                this.target.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: nmDmgData.isCrit, addStatus: this.diceData.id });
                this.playAtkSound();
            }
            else {
                lost = true;
            }
        }
    };
    Bullet310.prototype.reset = function () {
        this._addsp = false;
        _super.prototype.reset.call(this);
    };
    Bullet310.prototype.dispose = function () {
        this._addsp = false;
        _super.prototype.dispose.call(this);
    };
    return Bullet310;
}(Bullet));
__reflect(Bullet310.prototype, "Bullet310");
//# sourceMappingURL=Bullet310.js.map