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
--原名称：感染骰子  --新名称：感染
*/
var Bullet308 = (function (_super) {
    __extends(Bullet308, _super);
    function Bullet308() {
        return _super.call(this) || this;
    }
    Bullet308.prototype.damage = function () {
        var self = this;
        var diceData = self.diceData;
        var mvo = self.mVoList[0];
        var nmDmgData = this.nmDmgData;
        var monstersList = mvo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var target = monstersList[mvo.getName()];
        if (target && !target.lost(this.diceData.isMe)) {
            var buffData = { diceId: "" + diceData.id, keep: 0, cd: 0, isMe: diceData.isMe, posion: true, dicedata: App.CommonUtil.object_clone(diceData) };
            MonsterBuff.addBuff(buffData, mvo);
            //普通怪物受到伤害后
            this.playAtkSound();
        }
    };
    // protected setBulletRes(){
    //     // this.texture=ResMgr.getRes(icon);
    //     this.initLoadRes(`addmst308`);
    //     let scale=DiceScaleEnum.scale_41;
    //     this.width=this.width*scale;
    //     this.height=this.height*scale;
    //     this.anchorOffsetX=this.width*0.5;
    //     this.anchorOffsetY=this.height*0.5;
    // }
    Bullet308.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Bullet308;
}(Bullet));
__reflect(Bullet308.prototype, "Bullet308");
//# sourceMappingURL=Bullet308.js.map