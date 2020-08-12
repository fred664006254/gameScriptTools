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
 * -1001:蛇王----每間隔10秒召喚2個方小怪和1個圓小怪，小怪的血量與boss剩餘血量成正比
 * 参数:{ X 秒 ，方形怪数量Y，方形怪血量比例Z，方形怪移速W（X像素/10MS），圆形怪数量Y2，圆形怪血量比例Z2，圆形怪移速W2}
 * 击杀召唤出的小怪获得的SP，和前一波，小怪的SP相同
*/
var Boss1001 = (function (_super) {
    __extends(Boss1001, _super);
    function Boss1001(data, isMe, isAdd) {
        return _super.call(this, data, isMe, isAdd) || this;
    }
    Boss1001.prototype.getMonsterType = function () {
        return 4;
    };
    Boss1001.prototype.getMonsterImg = function () {
        return Config.BattleCfg.getMonsterIcon(3);
    };
    Boss1001.prototype.checkAtk = function () {
        var _this = this;
        if (BattleStatus.scene) {
            //先播放特效
            var bossdata = this._data;
            var posAllCfg = BattleStatus.getLimitPos();
            var posCfg = bossdata.isMe ? posAllCfg.me : posAllCfg.target;
            var fazhen1_1 = BaseLoadBitmap.create("boss1001fazhen1");
            fazhen1_1.width = 125;
            fazhen1_1.height = 117;
            fazhen1_1.anchorOffsetX = 125 / 2;
            fazhen1_1.anchorOffsetY = 117 / 2;
            // this.addChild(fazhen1);
            fazhen1_1.setPosition(posCfg.pos0.x, posCfg.pos0.y);
            BattleStatus.scene.addChild(fazhen1_1);
            fazhen1_1.alpha = 0;
            egret.Tween.get(fazhen1_1).to({ alpha: 1 }, 5 * BattleStatus.timeparam).wait(30 * BattleStatus.timeparam).to({ alpha: 0 }, 5 * BattleStatus.timeparam).call(function () {
                fazhen1_1.dispose();
                fazhen1_1 = null;
            }, this);
            var fazhen2_1 = BaseLoadBitmap.create("boss1001fazhen2");
            fazhen1_1.width = 92;
            fazhen1_1.height = 93;
            fazhen2_1.anchorOffsetX = 92 / 2;
            fazhen2_1.anchorOffsetY = 93 / 2;
            // this.addChild(fazhen2);
            fazhen2_1.alpha = 0;
            fazhen2_1.setScale(2.7);
            fazhen2_1.setPosition(posCfg.pos0.x, posCfg.pos0.y);
            BattleStatus.scene.addChild(fazhen2_1);
            egret.Tween.get(fazhen2_1).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 5 * BattleStatus.timeparam).to({ scaleX: 1.3, scaleY: 1.3 }, 30 * BattleStatus.timeparam).to({ alpha: 0, scaleX: 0.6, scaleY: 0.6 }, 5 * BattleStatus.timeparam);
            egret.Tween.get(fazhen2_1).to({ rotation: 264 }, 40 * BattleStatus.timeparam);
            var clip_1 = ComponentMgr.getCustomMovieClip("bosseff1001", null, 70);
            clip_1.anchorOffsetX = 228 / 2;
            clip_1.anchorOffsetY = 218 / 2;
            this.addChild(clip_1);
            this.playAtkSound("effect_boss_1001");
            clip_1.playWithTime(1);
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                clip_1 = null;
                fazhen2_1.dispose();
                fazhen2_1 = null;
                _this._isSkill = false;
            }, this);
            var round = BattleStatus.round;
            // let roundCfg = ispvp?Config.BattleCfg.getChallangeCfg(round,Api.GameinfoVoApi.getIsGuiding()):Config.TogetherCfg.getChallangeCfg(round - 1);
            var roundCfg = Api.BattleVoApi.getNormalChallangeCfg();
            var keys = Object.keys(roundCfg);
            var unit = roundCfg[keys[0]][0];
            var monsterVoarr = [];
            //方形怪
            for (var i = 1; i <= bossdata.monster3num; ++i) {
                var itemCfg = new Config.ChallengeItemCfg();
                var data = {
                    monsterType: unit.monsterType,
                    monsterAdd: 0,
                    monsterNum: 1,
                    monsterSp: unit.monsterSp,
                    monsterHp: [],
                    monsterSpeed: bossdata.monster3speed,
                    addSpeed: unit.addSpeed,
                    startTime: 0,
                    internalTime: 0
                };
                itemCfg.initData(unit);
                itemCfg.initData(data);
                if (bossdata.hp > 0) {
                    var vo = new MonsterVo();
                    vo.birthTime = i * 500;
                    vo.hp = Math.floor(bossdata.hp * bossdata.monster3hpscale);
                    vo.initData(itemCfg);
                    vo.tmpCfg = itemCfg;
                    monsterVoarr.push(vo);
                }
            }
            //圆形怪
            for (var i = 1; i <= bossdata.monster2num; ++i) {
                var itemCfg = new Config.ChallengeItemCfg();
                var data = {
                    monsterType: 2,
                    monsterAdd: 0,
                    monsterNum: 1,
                    monsterSp: unit.monsterSp,
                    monsterHp: [],
                    monsterSpeed: bossdata.monster2speed,
                    addSpeed: unit.addSpeed,
                    startTime: 0,
                    internalTime: 0
                };
                itemCfg.initData(data);
                if (bossdata.hp > 0) {
                    var vo = new MonsterVo();
                    vo.birthTime = 0;
                    vo.hp = Math.floor(bossdata.hp * bossdata.monster2hpscale);
                    vo.initData(itemCfg);
                    monsterVoarr.push(vo);
                }
            }
            BattleStatus.scene.setBossSkill("1001", BattleStatus.battleLogicHasTickTime + (Math.ceil(10 * 70 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { isMe: this._data.isMe, monsterVoarr: monsterVoarr, boss: this });
            //BattleStatus.scene.createSnakeMonster(this._data.isMe, monsterVoarr);
        }
    };
    Boss1001.prototype.dispose = function () {
        _super.prototype.dispose.call(this);
    };
    return Boss1001;
}(BossMonster));
__reflect(Boss1001.prototype, "Boss1001");
//# sourceMappingURL=Boss1001.js.map