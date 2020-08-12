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
var MonsterVo = (function (_super) {
    __extends(MonsterVo, _super);
    function MonsterVo() {
        var _this = _super.call(this) || this;
        _this.hp = 0;
        _this.speed = 0;
        _this.type = 0;
        _this.add = 0;
        _this.moveDis = 0;
        _this._lastmoveDis = 0; //上次移动距离
        _this.birthTime = 0;
        _this.survive = false;
        _this.isMe = false;
        _this.moveStatus = 0;
        _this.monsterSp = 0;
        _this._name = "";
        _this._initSpeed = 0;
        _this._speedScale = 0;
        _this._checkAdd = false;
        _this._addSpeed = 0; //加速
        _this._parameter = [];
        _this._bossId = null;
        _this.offPos = 0;
        _this.highHp = false;
        _this.inithp = 0;
        _this.isEnemy = false;
        _this.isStun = false;
        _this.isHasBack = false;
        _this._isBack = false; // 被回溯
        _this.tmpCfg = null;
        _this.inBaseRound = false; //是否是配置初始怪
        return _this;
    }
    MonsterVo.prototype.initData = function (cfg) {
        this._initSpeed = cfg.monsterSpeed;
        this._addSpeed = cfg.addSpeed;
        this.speed = this._initSpeed * BattleStatus.logicScale;
        if (cfg instanceof Config.ChallengeItemCfg) {
            this._speedScale = 0;
            this.type = cfg.monsterType;
            this.add = cfg.monsterAdd || 0;
            this.monsterSp = cfg.monsterSp;
            this._round = cfg.round;
            this._cfgKey = cfg.cfgKey;
        }
        else {
            this._parameter = cfg.parameter;
            this._bossId = cfg.id;
            this.type = 4;
        }
        this.inithp = this.hp; //注意hp在initData之前已经赋值，否则就统一处理
    };
    MonsterVo.prototype.getSpeed = function () {
        if (this.speed) {
            this.speed = (this._initSpeed + Math.floor(this.moveDis / this._initSpeed) * this._addSpeed) * (1 - this._speedScale) * BattleStatus.logicScale;
        }
        return this.speed;
    };
    MonsterVo.prototype.getCfg = function () {
        if (this.tmpCfg) {
            return this.tmpCfg;
        }
        return Api.BattleVoApi.getItemCfgByRoundAndKey(this._round, this._cfgKey);
    };
    MonsterVo.prototype.getCenterDis = function () {
        return this.moveDis - this.offPos;
    };
    /**
     * 获取中心点的距离
     * @param centerDis
     */
    MonsterVo.prototype.getdisRange = function (centerDis) {
        var dis = 0;
        var _a = this.getRange(), min = _a.min, max = _a.max;
        if (centerDis < min) {
            dis = min - centerDis;
        }
        else if (centerDis > max) {
            dis = centerDis - max;
        }
        return dis;
    };
    MonsterVo.prototype.getRange = function () {
        return { min: this.moveDis - this.offPos * 2, max: this.moveDis };
    };
    MonsterVo.prototype.getLastRange = function () {
        return { min: this._lastmoveDis - this.offPos * 2, max: this._lastmoveDis };
    };
    MonsterVo.prototype.move = function (speed) {
        this._lastmoveDis = this.moveDis;
        this.moveDis += speed;
    };
    MonsterVo.prototype.isMoveEnd = function () {
        return BattleStatus.battleType == 2 ? this.moveStatus == MonsterMoveStatus.BACK : this.moveStatus == MonsterMoveStatus.END;
    };
    MonsterVo.prototype.getName = function () {
        if (!this._name) {
            this._name = (this.isMe ? "me_" : "target_") + this.hashCode;
        }
        return this._name;
    };
    MonsterVo.prototype.isPublic = function () {
        return (BattleStatus.battleType == 2 && this.moveStatus >= MonsterMoveStatus.PUBLIC);
    };
    MonsterVo.prototype.setHp = function (hp) {
        this.hp = Math.min(Math.max(0, this.hp - hp), this.inithp);
        // if(this.hp>0)
        // {
        //     if(this.highHp)
        //     {
        //         BattleStatus.checkMaxHp(this,this.isMe,1);
        //         if(this.isPublic())
        //         {
        //             BattleStatus.checkMaxHp(this,!this.isMe,1);
        //         }
        //     }
        // }
    };
    MonsterVo.prototype.isDie = function () {
        return this.hp <= 0;
    };
    /**
    * 是否是首领
    */
    MonsterVo.prototype.getIsBoss = function () {
        return !!this._bossId;
    };
    MonsterVo.prototype.getBossId = function () {
        return this._bossId;
    };
    MonsterVo.prototype.getAddStatus = function (diceId) {
        var type = this.type;
        if (diceId == "102" && this.type == 3) {
            type = 1;
        }
        return diceId + "_" + type;
    };
    /**
     * 改变速度
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    MonsterVo.prototype.changeSpeed = function (speedScale, isAdd, stop) {
        if (stop === void 0) { stop = false; }
        var speed = 0;
        if (stop) {
            speed = 0;
        }
        else {
            this._speedScale = Math.min(Config.GamebaseCfg.maxDeSpeed, speedScale);
            // this.speed=this._initSpeed*(1-this._speedScale)**BattleStatus.logicScale;
            speed = (this._initSpeed + Math.floor(this.moveDis / this._initSpeed) * this._addSpeed) * (1 - this._speedScale) * BattleStatus.logicScale;
            // let minspeed = this._initSpeed * (1-Config.GamebaseCfg.maxDeSpeed);
            // let tmpSpeed = this._initSpeed * (1 - speedScale);
            // this.speed = Math.max(tmpSpeed,minspeed)*BattleStatus.logicScale;
        }
        if (speed !== this.speed) {
            this.speed = speed;
        }
    };
    MonsterVo.prototype.getIsStun = function () {
        return this.isStun;
    };
    MonsterVo.prototype.getIsReback = function () {
        return this.isHasBack;
    };
    /**
    * 丢失目标，跑了或者打死，如果isMe是对方，则是被回溯鸟打回了
    * @param isMe 攻击发起者是否是自己
    */
    MonsterVo.prototype.lost = function (isMe) {
        return this.isDie() || this.survive || (isMe == (!this.isMe) && this._isBack);
    };
    MonsterVo.prototype.clearBack = function () {
        this._isBack = false;
    };
    MonsterVo.prototype.reset = function () {
        this._lastmoveDis = this.moveDis;
        this.moveDis = 0;
        this.moveStatus = 0;
        this._isBack = true;
        BattleStatus.checkGroup(this);
    };
    MonsterVo.prototype.dispose = function () {
        this._checkAdd = false;
        this.isStun = false;
        this.isHasBack = false;
        this.hp = this.speed = this.type = 0;
        // this.tmpCfg=null;
    };
    return MonsterVo;
}(BaseVo));
__reflect(MonsterVo.prototype, "MonsterVo");
//# sourceMappingURL=MonsterVo.js.map