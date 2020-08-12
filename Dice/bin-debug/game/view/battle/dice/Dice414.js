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
 * --原名称：枪械 现在：乱舞
 * 1-6正常 7星直接变狙击 秒百分比血量
*/
var Dice414 = (function (_super) {
    __extends(Dice414, _super);
    function Dice414(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this._isFirst1 = false;
        return _this;
    }
    Dice414.prototype.resetStar = function () {
        var dicedata = this.getDiceData();
        var index = this.getChildIndex(this._bg);
        this._bg.dispose();
        this._bg = null;
        var iconUrl = Config.DiceCfg.getIconById(String(dicedata.id));
        var idleKey = Config.DiceCfg.getIdceEffect(String(dicedata.id), this.getDiceStars());
        var dice = ComponentMgr.getCustomMovieClip(idleKey, NaN, 150, BattleDiceEffect);
        dice.playIdle();
        this.addChildAt(dice, index);
        this._bg = dice;
        if (dicedata.checkMaxStar()) {
            dicedata.cd = dicedata.property3[0] * 1000;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        }
        else {
            dicedata.cd = dicedata.initcd;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
            dicedata.special1cdTimeArr = [];
        }
        _super.prototype.resetStar.call(this);
    };
    Dice414.prototype.refresh = function (data, appeareff) {
        var dicedata = this.getDiceData();
        _super.prototype.refresh.call(this, data, appeareff);
        if (dicedata.checkMaxStar()) {
            dicedata.cd = dicedata.property3[0] * 1000;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
        }
        else {
            dicedata.cd = data.initcd;
            dicedata.cdTimeArr = [];
            dicedata.setCdTimeArr(BattleStatus.battleLogicHasTickTime);
            dicedata.special1cdTimeArr = [];
        }
    };
    //手槍及狙擊槍固定打一名敵人，雙手槍跟霰彈槍則根據星數打對應數量的敵人 1+n随机(不重复)
    Dice414.prototype.checkAtk = function (starIdx) {
        var data = this.getDiceData();
        var isMe = data.isMe;
        var initInfo = Api.BattleVoApi.getInitInfo(isMe);
        var num = 1;
        if (data.star > 1 && data.star < 7) {
            num = data.star;
        }
        var isplay = false;
        var findmonsterDataList = DiceHelper.GunDiceFindMonster(data, isMe, num);
        var len = findmonsterDataList.length;
        for (var i = 0; i < len; ++i) {
            // let monster=monstersList[vo.getName()];
            var vo = findmonsterDataList[i];
            if (vo && !vo.lost(isMe)) {
                if (!isplay) {
                    isplay = true;
                    this.playAtkAction();
                }
                this.createBullet(i - 1, [vo]);
            }
        }
    };
    Dice414.prototype.createBullet = function (starIdx, findmonsterDataList) {
        var fpos = { x: this.x, y: this.y };
        var data = this.getDiceData();
        var bullet = Bullet.createBullet(data, fpos);
        bullet.atk(findmonsterDataList);
    };
    Dice414.prototype.dispose = function () {
        this._isFirst1 = false;
        _super.prototype.dispose.call(this);
    };
    return Dice414;
}(BaseDice));
__reflect(Dice414.prototype, "Dice414");
//# sourceMappingURL=Dice414.js.map