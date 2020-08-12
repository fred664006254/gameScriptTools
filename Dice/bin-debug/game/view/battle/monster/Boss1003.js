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
 * 魔术师----每次間隔4秒按 隕石>淨化>恢復 的順序使用技能
 * 参数:{ X 秒， 净化范围Y(以boss为中心，往两边，各净化 Y 像素)， 恢复血量的百分比 Z}
 * 隕石:隨機摧毀任一骰子，任何骰子點數都會直接從場上移除，如果在隕石砸落期間，拿到別處合成則可以免疫攻擊
 * 淨化:移除路径上所有物品，如地雷或尖刺等，並覆蓋一層護罩（移除身上所有附加状态，毒、减防、冰冻、吸收等）
 * 恢復:恢復25%的血量，BOSS原本最大血量
 *
*/
var Boss1003 = (function (_super) {
    __extends(Boss1003, _super);
    function Boss1003(data, isMe, isAdd) {
        var _this = _super.call(this, data, isMe, isAdd) || this;
        _this._curSkill = 1;
        _this.healnum = 0;
        return _this;
    }
    Boss1003.prototype.getMonsterType = function () {
        return 4;
    };
    Boss1003.prototype.getMonsterImg = function () {
        return Config.BattleCfg.getMonsterIcon(3);
    };
    Boss1003.prototype.checkAtk = function () {
        var _this = this;
        if (BattleStatus.scene) {
            var isMe = this._data.isMe;
            var data = this._data;
            var clip_1 = ComponentMgr.getCustomMovieClip("1003skill" + this._curSkill, null, 70);
            clip_1.anchorOffsetX = 316 / 2;
            clip_1.anchorOffsetY = 316 / 2;
            this.addChild(clip_1);
            //每次間隔4秒按 隕石>淨化>恢復 的順序使用技能
            if (this._curSkill == 1) {
                BattleStatus.scene.setBossSkill("1003_1", BattleStatus.battleLogicHasTickTime + (Math.ceil(9 * 70 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { isMe: this._data.isMe, pos: { x: this.x, y: this.y }, boss: this });
                clip_1.setEndCallBack(function () {
                    clip_1.dispose();
                    clip_1 = null;
                    _this._isSkill = false;
                }, this);
            }
            else if (this._curSkill == 2) {
                var img_1 = BaseLoadBitmap.create("1003jinghua");
                img_1.width = 249;
                img_1.height = 233;
                img_1.anchorOffsetX = 249 / 2;
                img_1.anchorOffsetY = 233 / 2;
                this.addChildAt(img_1, 1);
                img_1.setScale(0);
                egret.Tween.get(img_1).to({ rotation: 360, scaleX: 4, scaleY: 4, alpha: 0 }, 1000).call(function () {
                    img_1.dispose();
                    img_1 = null;
                }, this);
                clip_1.setEndCallBack(function () {
                    clip_1.dispose();
                    clip_1 = null;
                    _this._isSkill = false;
                }, this);
                BattleStatus.scene.setBossSkill("1003_2", BattleStatus.battleLogicHasTickTime + (Math.ceil(15 * 70 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { radius: data.radius, boss: this, isMe: this._data.isMe });
                this.playAtkSound("effect_boss_1003_2");
            }
            else if (this._curSkill == 3) {
                var heal = Math.floor(data.inithp * data.healhpscale);
                this.healnum = heal;
                BattleStatus.scene.setBossSkill("1003_3", BattleStatus.battleLogicHasTickTime + (Math.ceil(15 * 70 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame), { boss: this });
                clip_1.setEndCallBack(function () {
                    clip_1.dispose();
                    clip_1 = null;
                    _this._isSkill = false;
                }, this);
                this.playAtkSound("effect_boss_1003_3");
            }
            clip_1.playWithTime(1);
            ++this._curSkill;
            if (this._curSkill > 3) {
                this._curSkill = 1;
            }
        }
    };
    Boss1003.prototype.heal = function () {
        var data = this._data;
        if (data && !data.isDie()) {
            //恢復:恢復25%的血量，BOSS原本最大血量
            data.setHp(-this.healnum);
            this.setHpTxt();
            var healclip_1 = ComponentMgr.getCustomMovieClip("monsterheal", null, 70);
            healclip_1.playWithTime(1);
            healclip_1.setEndCallBack(function () {
                healclip_1.dispose();
                healclip_1 = null;
            }, this);
            healclip_1.anchorOffsetX = 316 / 2;
            healclip_1.anchorOffsetY = 316 / 2;
            this.addChild(healclip_1);
        }
    };
    Boss1003.prototype.dispose = function () {
        this.healnum = 0;
        this._curSkill = 1;
        _super.prototype.dispose.call(this);
    };
    return Boss1003;
}(BossMonster));
__reflect(Boss1003.prototype, "Boss1003");
//# sourceMappingURL=Boss1003.js.map