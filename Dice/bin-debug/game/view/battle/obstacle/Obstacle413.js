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
var Obstacle413 = (function (_super) {
    __extends(Obstacle413, _super);
    function Obstacle413() {
        return _super.call(this) || this;
    }
    Obstacle413.prototype.init = function (diceData, pos, monsterdisline) {
        this.diceData = diceData;
        this.initData(diceData);
        this._lineDis = 0;
        var res = "obstacle_413";
        // this.initLoadRes(res);
        this.texture = ResMgr.getRes(res);
        this.width = 40;
        this.height = 40;
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
        this.setPosition(pos.x, pos.y);
        this.status = 2;
        this.birthTime = BattleStatus.battleLogicHasTickTime;
        this.setScale(0.5);
    };
    Obstacle413.prototype.initData = function (diceData) {
        this._diceId = diceData.id;
        this._keep = 0;
        this._dmg = diceData.damage;
        this._radius = 0;
        this._cd = 0.5 * 1000;
    };
    Obstacle413.prototype.checkEnd = function () {
        return false;
    };
    Obstacle413.prototype.judegeIsInOutLine = function () {
        var arr = BattleStatus.battleType == 1 ? ["0_0", "0_1", "0_2", "1_0", "2_0", "3_0", "4_0", "4_1", "4_2"] : ["0_0", "0_1", "0_2", "1_0", "2_0", "3_0", "4_0"];
        return arr.indexOf(this.diceData.x + "_" + this.diceData.y) > -1;
    };
    Obstacle413.prototype.checkDamage = function () {
        var flag = false;
        var lineDis = 0;
        if (this.judegeIsInOutLine()) {
            if (BattleStatus.checkCdDoTime(this._cd, this.birthTime)) {
                if (this.parent) {
                    var parent_1 = this.parent.parent;
                    var posx = this.diceData.getShowPos(this.diceData.isMe).x;
                    var posy = this.diceData.getShowPos(this.diceData.isMe).y;
                    if (parent_1 && parent_1.x == posx && parent_1.y == posy) {
                        var posAllCfg = BattleStatus.getLimitPos();
                        var posCfg = this.diceData.isMe ? posAllCfg.me : posAllCfg.target;
                        var idx = -1;
                        //Pvp
                        var tmpx = this.x + parent_1.x;
                        var tmpy = this.y + parent_1.y;
                        var diffX = 0;
                        var diffY = 0;
                        if (BattleStatus.battleType == 1) {
                            if (this.diceData.isMe) {
                                if (this.diceData.x == 0 && tmpy <= posCfg.pos0.y && tmpy > posCfg.pos1.y && tmpx <= posCfg.pos0.x) {
                                    idx = 0;
                                    diffY = posCfg.pos0.y - tmpy;
                                }
                                else if (tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy <= posCfg.pos1.y) {
                                    idx = 1;
                                    diffY =
                                        diffX = tmpx - posCfg.pos1.x;
                                }
                                else if (this.diceData.x == 4 && tmpy <= posCfg.pos3.y && tmpy > posCfg.pos2.y && tmpx >= posCfg.pos2.x) {
                                    idx = 2;
                                    diffY = tmpy - posCfg.pos2.y;
                                }
                            }
                            else {
                                if (this.diceData.x == 0 && tmpy >= posCfg.pos0.y && tmpy < posCfg.pos1.y && tmpx >= posCfg.pos0.x) {
                                    idx = 0;
                                    diffY = tmpy - posCfg.pos0.y;
                                }
                                else if (tmpx <= posCfg.pos1.x && tmpx >= posCfg.pos2.x && this.diceData.y == 0 && tmpy >= posCfg.pos1.y) {
                                    idx = 1;
                                    diffX = posCfg.pos1.x - tmpx;
                                }
                                else if (this.diceData.x == 4 && tmpy >= posCfg.pos3.y && tmpy < posCfg.pos2.y && tmpx <= posCfg.pos2.x) {
                                    diffY = posCfg.pos2.y - tmpy;
                                }
                            }
                        }
                        else {
                            //pve
                            if (this.diceData.isMe) {
                                if (this.diceData.x == 0 && tmpy <= posCfg.pos0.y && tmpy > posCfg.pos1.y && tmpx <= posCfg.pos0.x) {
                                    idx = 0;
                                    diffY = posCfg.pos0.y - tmpy;
                                }
                                else if (tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy <= posCfg.pos1.y) {
                                    idx = 1;
                                    diffX = tmpx - posCfg.pos1.x;
                                }
                            }
                            else {
                                if (this.diceData.x == 0 && tmpy >= posCfg.pos0.y && tmpy < posCfg.pos1.y && tmpx <= posCfg.pos0.x) {
                                    idx = 0;
                                    diffY = tmpy - posCfg.pos0.y;
                                }
                                else if (tmpx >= posCfg.pos1.x && tmpx <= posCfg.pos2.x && this.diceData.y == 0 && tmpy >= posCfg.pos1.y) {
                                    idx = 1;
                                    diffX = tmpx - posCfg.pos1.x;
                                }
                            }
                        }
                        for (var i = 1; i <= idx; i++) {
                            var pos = posCfg["pos" + i];
                            var lstPos = posCfg["pos" + (i - 1)];
                            lineDis += Math.abs(pos.x - lstPos.x) + Math.abs(pos.y - lstPos.y);
                        }
                        if (idx > -1) {
                            flag = true;
                            lineDis += (Math.abs(diffX) + Math.abs(diffY));
                        }
                    }
                }
            }
        }
        if (flag) {
            var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            var findmonsterDataList = DiceHelper.findRangMonster(lineDis, 0, this.diceData.isMe);
            var point = this.localToGlobal();
            for (var i = 0; i < findmonsterDataList.length; i++) {
                var mdata = findmonsterDataList[i];
                if (mdata && !mdata.lost(this.diceData.isMe)) {
                    var monster = monstersList[mdata.getName()];
                    // let dis = App.MathUtil.getDistance(point, monster.localToGlobal()) <= (monster.width/2*monster.scaleX+this.width/2*this.scaleX);
                    if (flag) {
                        var damage = monster.getMaxHp() * 0.04;
                        monster.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: false });
                        //this.playAtkSound();
                    }
                }
            }
        }
    };
    Obstacle413.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Obstacle413;
}(Obstacle));
__reflect(Obstacle413.prototype, "Obstacle413");
//# sourceMappingURL=Obstacle413.js.map