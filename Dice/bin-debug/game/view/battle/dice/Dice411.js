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
 * --原名称：太阳骰子  --新名称：凰炎
 * 149变太阳
 * 打同一名敵人時，傷害會逐漸增加，是唯二能無限疊加攻擊力的骰子  而且場上有1或4顆太陽骰時，太陽骰能變身，打出的攻擊會產生爆炸，爆炸的傷害也會疊   打BOSS時能順便打後方小怪，但被小怪超前時一樣會傷害重置
*/
var Dice411 = (function (_super) {
    __extends(Dice411, _super);
    function Dice411(data, appearEff) {
        var _this = _super.call(this, data, appearEff) || this;
        _this._isSun = false;
        _this._curmonstername = "";
        _this._sunGroup = null;
        return _this;
    }
    Dice411.prototype.init = function (data, appeareff) {
        _super.prototype.init.call(this, data, appeareff);
        //App.DisplayUtil.changeToGray(this._bg)
        if (BattleStatus.scene) {
            BattleStatus.scene.addSuns(data.isMe);
        }
    };
    Dice411.prototype.createBullet = function (starIdx, findmonsterDataList) {
        var dicedata = this.getDiceData();
        var monstersList = dicedata.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var monstername = "";
        if (findmonsterDataList[0]) {
            monstername = findmonsterDataList[0].getName();
        }
        if (this._curmonstername != monstername) {
            var monster = monstersList[this._curmonstername];
            if (monster) {
                monster.removeBuff(dicedata.id + "_" + dicedata.posStr + "_" + (dicedata.isMe ? 1 : 2));
            }
        }
        this._curmonstername = monstername;
        _super.prototype.createBullet.call(this, starIdx, findmonsterDataList);
    };
    Dice411.prototype.setIsSun = function (bool) {
        var _this = this;
        if (!this._sunGroup) {
            var sungroup = new BaseDisplayObjectContainer();
            this._sunGroup = sungroup;
            sungroup.width = this._bg.width;
            sungroup.height = this._bg.height;
            sungroup.anchorOffsetX = sungroup.width / 2;
            sungroup.anchorOffsetY = sungroup.height / 2;
            sungroup.setPosition(this._bg.x + this._bg.width / 2, this._bg.y + this._bg.height / 2);
            this.addChild(sungroup);
        }
        if (this._isSun == bool) {
            if (!bool) {
                if (this._sunGroup) {
                    this._sunGroup.removeChildren();
                }
                //App.DisplayUtil.changeToGray(this._bg)
            }
            else {
                //App.DisplayUtil.changeToNormal(this._bg)
            }
            return;
        }
        var dicedata = this.getDiceData();
        this._isSun = bool;
        dicedata.setDiceIsChangeSun(bool);
        if (bool) {
            this.playAtkSound();
            //特效变化
            var clip_1 = ComponentMgr.getCustomMovieClip("adddice411", null, 70, BattleBaseEffect);
            clip_1.anchorOffsetX = 75;
            clip_1.anchorOffsetY = 75;
            clip_1.name = "clip";
            clip_1.y = -30;
            clip_1.setEndCallBack(function () {
                if (_this._isSun) {
                    clip_1.dispose();
                    clip_1 = null;
                    if (circle_1) {
                        circle_1.alpha = 1;
                    }
                }
            }, this);
            egret.Tween.get(clip_1).wait(5 * BattleStatus.timeparam).call(function () {
                if (_this._isSun) {
                    if (_this._sunGroup) {
                        _this._sunGroup.addChild(clip_1);
                    }
                    egret.Tween.removeTweens(clip_1);
                    clip_1.playWithTime(1);
                }
            }, this);
            var circle_1 = BaseLoadBitmap.create("dice411wings");
            circle_1.anchorOffsetX = 33;
            circle_1.anchorOffsetY = 29;
            circle_1.y = -40;
            circle_1.setScale(2);
            circle_1.name = "circle";
            circle_1.alpha = 0;
            egret.Tween.get(circle_1).wait(10 * BattleStatus.timeparam).call(function () {
                if (_this._isSun) {
                    //App.DisplayUtil.changeToNormal(this._bg);
                    if (_this._sunGroup) {
                        _this._sunGroup.addChild(circle_1);
                    }
                    egret.Tween.get(circle_1, { loop: true }).to({ rotation: -360 }, 60 * BattleStatus.timeparam);
                }
            }, this);
        }
        else {
            //移除特效
            //App.DisplayUtil.changeToGray(this._bg);
            if (this._sunGroup) {
                var circle = this._sunGroup.getChildByName("circle");
                if (circle) {
                    circle.alpha = 0;
                    egret.Tween.removeTweens(circle);
                    circle.dispose();
                    circle = null;
                }
            }
            //所有怪物移除叠加buff
            var monstersList = dicedata.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
            for (var i in monstersList) {
                var monster = monstersList[i];
                if (monster) {
                    monster.removeBuff(dicedata.id + "_" + dicedata.posStr + "_" + (dicedata.isMe ? 1 : 2));
                    monster.removeBuff(dicedata.id + "_" + dicedata.posStr + "_" + (dicedata.isMe ? 1 : 2) + "_boom");
                }
            }
        }
    };
    Dice411.prototype.dispose = function () {
        var data = this.getDiceData();
        this._isSun = false;
        this._curmonstername = "";
        if (BattleStatus.scene) {
            BattleStatus.scene.removeSuns(data.isMe);
        }
        if (this._sunGroup) {
            this._sunGroup.removeChildren();
            this._sunGroup.dispose();
            this._sunGroup = null;
        }
        _super.prototype.dispose.call(this);
    };
    return Dice411;
}(BaseDice));
__reflect(Dice411.prototype, "Dice411");
//# sourceMappingURL=Dice411.js.map