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
 * --原名称：齿轮 现在：回音
 * 连接数提升百分比攻击
*/
var Dice306 = (function (_super) {
    __extends(Dice306, _super);
    function Dice306(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this._isLine = false;
        _this.isTouch = {};
        return _this;
    }
    Dice306.prototype.checkLine = function () {
        //检测
        _super.prototype.checkLine.call(this);
        var x = this.getPos().x;
        var y = this.getPos().y;
        var list = BattleStatus.scene.getDiceList(this.checkIsMe());
        var isGear = false;
        for (var i = 1; i < 5; ++i) {
            var posx = x;
            var posy = y;
            if (i == 1) {
                posy -= 1;
            }
            else if (i == 2) {
                posy += 1;
            }
            else if (i == 3) {
                posx -= 1;
            }
            else if (i == 4) {
                posx += 1;
            }
            var dice_1 = list[posx + "_" + posy];
            if (dice_1) {
                var data = dice_1.getDiceData();
                if (data.checkIsGearDice()) {
                    this._isLine = true;
                    if (!dice_1.getIsLine()) {
                        dice_1.checkLine();
                    }
                }
            }
        }
        for (var i in list) {
            if (list[i].getDiceData().checkIsGearDice()) {
                var unit = list[i];
                if (unit.getIsLine()) {
                    unit.setGearDamage();
                }
            }
        }
    };
    Dice306.prototype.getLineNum = function (pos) {
        var num = 0;
        if (this._isLine) {
            var dicelist = BattleStatus.scene.getDiceList(this.checkIsMe());
            this.setLineNum(pos);
            for (var i in dicelist) {
                if (dicelist[i].getDiceData().checkIsGearDice()) {
                    var unit = dicelist[i];
                    if (unit.getIsLine() && unit.isTouch[pos]) {
                        delete unit.isTouch[pos];
                        ++num;
                    }
                }
            }
        }
        return num;
    };
    Dice306.prototype.setLineNum = function (pos) {
        if (this._isLine && !this.isTouch[pos]) {
            var dicelist = BattleStatus.scene.getDiceList(this.checkIsMe());
            var x = this.getPos().x;
            var y = this.getPos().y;
            this.isTouch[pos] = 1;
            for (var i = 1; i < 5; ++i) {
                var posx = x;
                var posy = y;
                if (i == 1) {
                    posy -= 1;
                }
                else if (i == 2) {
                    posy += 1;
                }
                else if (i == 3) {
                    posx -= 1;
                }
                else if (i == 4) {
                    posx += 1;
                }
                var dice_2 = dicelist[posx + "_" + posy];
                if (dice_2 && dice_2.getDiceData().checkIsGearDice()) {
                    var data = dice_2.getDiceData();
                    if (dice_2.getIsLine()) {
                        dice_2.setLineNum(pos);
                        dice_2.isTouch[pos] = 1;
                    }
                }
            }
        }
    };
    Dice306.prototype.getIsLine = function () {
        return this._isLine;
    };
    Dice306.prototype.setIsLine = function (bool) {
        this._isLine = bool;
    };
    Dice306.prototype.checkBuff = function () {
        _super.prototype.checkBuff.call(this);
        //周围是否有链接
        var x = this.getPos().x;
        var y = this.getPos().y;
        var list = BattleStatus.scene.getDiceList(this.checkIsMe());
        var isGear = false;
        for (var i = 1; i < 5; ++i) {
            var posx = x;
            var posy = y;
            if (i == 1) {
                posy -= 1;
            }
            else if (i == 2) {
                posy += 1;
            }
            else if (i == 3) {
                posx -= 1;
            }
            else if (i == 4) {
                posx += 1;
            }
            var dice_3 = list[posx + "_" + posy];
            if (dice_3) {
                var data = dice_3.getDiceData();
                if (data.checkIsGearDice()) {
                    isGear = true;
                    this._isLine = true;
                }
            }
        }
        var eff = this.getChildByName("gearbuff");
        if (isGear) {
            this.showGeareff();
        }
        else {
            this.hideGeareff();
        }
        return isGear;
    };
    Dice306.prototype.showGeareff = function () {
        var eff = this._extraGroup.getChildByName("gearbuff");
        if (!eff) {
            var criteff = ComponentMgr.getCustomMovieClip("adddice306", null, 70, BattleBaseEffect);
            criteff.anchorOffsetX = 128 / 2;
            criteff.anchorOffsetY = 128 / 2;
            criteff.y = -85;
            criteff.playWithTime(-1);
            criteff.name = "gearbuff";
            this._extraGroup.addChild(criteff);
        }
        else if (eff) {
            // egret.Tween.removeTweens(eff);
            // eff.stop();
            // eff.goToAndPlay(0);
            // eff.playWithTime(1);
            // egret.Tween.get(eff).wait(740).call(()=>{
            //     eff.playWithTime(1);
            //     egret.Tween.removeTweens(eff);
            // },this)
        }
    };
    Dice306.prototype.hideGeareff = function () {
        var eff = this._extraGroup.getChildByName("gearbuff");
        if (eff) {
            eff.alpha = 0;
            eff.dispose();
            eff = null;
        }
    };
    Dice306.prototype.setGearDamage = function () {
        var data = this.getDiceData();
        var cfg = Config.DiceCfg.getCfgById(data.id);
        var pwadd = cfg.getPowerAtkByLv(data.pwlv);
        data.property1 = cfg.getProperty1ByLv(data.lv) + cfg.getPowerProperty1ByLv(data.pwlv);
        data.property2 = cfg.getProperty2ByLv(data.lv) + cfg.getPowerProperty2ByLv(data.pwlv);
        var linenum = this.getLineNum(data.x + "_" + data.y);
        data.damage = data.initdamage * (1 + (linenum - 1) * data.property1) + pwadd;
    };
    Dice306.prototype.checkIsEffectAround = function () {
        return true;
    };
    Dice306.prototype.beComposed = function () {
        //被合成、被暗杀、被boss打、变化
        this._isLine = false;
        this.checkLine();
        _super.prototype.beComposed.call(this);
    };
    Dice306.prototype.dispose = function () {
        this._isLine = false;
        this.isTouch = {};
        _super.prototype.dispose.call(this);
    };
    return Dice306;
}(BaseDice));
__reflect(Dice306.prototype, "Dice306");
//# sourceMappingURL=Dice306.js.map