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
 * --原名称：改造的电骰子  --新名称：雷霆
 * 2星骰子，可让除命中外的顺序第二位骰子受到电流伤害   3星，就是2和3，以此类推
*/
var Bullet309 = (function (_super) {
    __extends(Bullet309, _super);
    function Bullet309() {
        return _super.call(this) || this;
    }
    Bullet309.prototype.damage = function () {
        var lost = false;
        if (!!this.nmDmgData) {
            if (!this.target.lost(this.diceData.isMe)) {
                var damage = this.calDamageNum(this.target);
                this.target.beAtk({ hp: damage, isMe: this.diceData.isMe, crit: this.nmDmgData.isCrit, addStatus: this.isKillByOne ? "301" : null });
                //普通怪物受到伤害后
                this.playAtkSound();
            }
            else {
                lost = true;
            }
        }
        if ((this.target && !lost && !this.target.isDie()) && this.diceData.checkExtDamage()) {
            this.extraDamage();
        }
    };
    Bullet309.prototype.extraDamage = function () {
        var monstersList = this.diceData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.diceFindMonster(this.diceData, this.diceData.isMe);
        var idx = 0;
        var l = Math.min(this.diceData.star, findmonsterDataList.length);
        for (var i = 0; i < l; i++) {
            var mData = findmonsterDataList[i];
            if (!mData.lost(this.diceData.isMe)) {
                var monster = monstersList[mData.getName()];
                monster.beAtk({ hp: this.diceData.property1, isMe: this.diceData.isMe, crit: false, addStatus: String(this.diceData.id) });
                var lastData = findmonsterDataList[idx];
                var lastMonster = monstersList[lastData.getName()];
                if (lastData.getRange().min - mData.getRange().max > 10 && lastData.lost(this.diceData.isMe) == false && !lastMonster.getChildByName("atkeffect309")) {
                    var mv = this.createLine({ x: lastMonster.x, y: lastMonster.y }, { x: monster.x, y: monster.y });
                    mv["mvData"] = mData.getName();
                    lastMonster.addChildAt(mv, 0);
                }
            }
        }
    };
    Bullet309.prototype.createLine = function (startPoint, endPoint, playnum) {
        if (playnum === void 0) { playnum = 1; }
        var w = 33;
        var mv = ComponentMgr.getCustomMovieClip("atkeffect309", NaN, 70, BattleBaseEffect);
        mv.fillMode = egret.BitmapFillMode.REPEAT;
        mv.setEndCallBack(function () {
            mv.dispose();
            mv = null;
        }, this);
        mv.playWithTime(playnum);
        mv.anchorOffsetY = 22 / 2;
        var diffX = endPoint.x - startPoint.x;
        var diffY = endPoint.y - startPoint.y;
        var angle = Math.atan2(diffY, diffX);
        mv.rotation = angle * 180 / Math.PI;
        var dis = Math.sqrt(diffX * diffX + diffY * diffY);
        if (dis < w) {
            mv.scaleX = dis / w;
        }
        else {
            mv.width = dis;
        }
        mv.name = "atkeffect309";
        return mv;
    };
    Bullet309.prototype.reset = function () {
        _super.prototype.reset.call(this);
    };
    return Bullet309;
}(Bullet));
__reflect(Bullet309.prototype, "Bullet309");
//# sourceMappingURL=Bullet309.js.map