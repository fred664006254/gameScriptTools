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
 * --原名称：矿山骰子  --新名称：仙灵
 * 每隔一段时间生产SP
*/
var Dice201 = (function (_super) {
    __extends(Dice201, _super);
    function Dice201(data, appearEff) {
        return _super.call(this, data, appearEff) || this;
    }
    Dice201.prototype.init = function (data, appearEff) {
        _super.prototype.init.call(this, data, appearEff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = (dicedata.property2) * 1000;
        dicedata.setspecial2CdTimeArr();
    };
    Dice201.prototype.refresh = function (data, appeareff) {
        _super.prototype.refresh.call(this, data, appeareff);
        var dicedata = this.getDiceData();
        dicedata.special2cd = dicedata.property2 * 1000;
        dicedata.setspecial2CdTimeArr(BattleStatus.battleLogicHasTickTime);
    };
    Dice201.prototype.checkDoAction = function () {
        _super.prototype.checkDoAction.call(this);
        var dicedata = this.getDiceData();
        var arr3 = dicedata.special2cdTimeArr;
        var l3 = arr3.length;
        for (var i = 0; i < l3; i++) {
            var t = arr3[i];
            if (!!BattleStatus.checkCdDoTime(dicedata.special2cd, t)) {
                this.checkSpecial2Atk(i);
            }
        }
    };
    /**
     * 一共3种，生产SP的时候触发
        1级
        2级
        3级及以上
    */
    Dice201.prototype.playAtkSound = function () {
        if (this.checkIsMe()) {
            var vo = Api.BattleVoApi.getBattleData(true);
            var pwLv = vo.getPwlvById("201");
            var name_1 = "effect_dice_201_" + Math.min(pwLv, 3);
            if (RES.hasRes(name_1)) {
                SoundMgr.playEffect(name_1);
            }
        }
    };
    Dice201.prototype.checkSpecial2Atk = function (starIdx) {
        //增加sp
        var data = this.getDiceData();
        this.playAtkAction();
        this.playAtkSound();
        var mv = ComponentMgr.getCustomMovieClip("adddice201", null, 70, BattleCustomEffect);
        mv.anchorOffsetX = 150 / 2;
        mv.anchorOffsetY = 150 / 2;
        mv.y = -45;
        this._extraGroup.addChild(mv);
        mv.setEndCallBack(function () {
            mv.dispose();
            mv = null;
        }, this);
        mv.playWithTime(1);
        var cfg = Config.DiceCfg.getCfgById(data.id);
        var num = data.star * cfg.getProperty1ByLv(data.lv) + cfg.getPowerProperty1ByLv(data.pwlv);
        var txtImg = ComponentMgr.getTextField("sp+" + num, TextFieldConst.SIZE_26, 0xf4fffe);
        txtImg.stroke = 2;
        txtImg.strokeColor = 0x1ab186;
        txtImg.anchorOffsetX = txtImg.width / 2;
        txtImg.anchorOffsetY = txtImg.height / 2;
        txtImg.alpha = 0;
        if (this.parent) {
            this.parent.addChild(txtImg);
        }
        // this._extraGroup.addChild(txtImg);
        var tmpy = this.y;
        txtImg.x = this.x;
        txtImg.y = tmpy - 90;
        var time = BattleStatus.timeparam;
        egret.Tween.get(txtImg).to({ alpha: 1, y: tmpy - 110 }, 12 * time).to({ alpha: 1, y: tmpy - 115 }, 6 * time).to({ alpha: 0, y: tmpy - 120 }, 3 * time).call(function () {
            txtImg.dispose();
            txtImg = null;
        }, this);
        Api.BattleVoApi.addSp(num, data.isMe);
    };
    Dice201.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Dice201;
}(BaseDice));
__reflect(Dice201.prototype, "Dice201");
//# sourceMappingURL=Dice201.js.map