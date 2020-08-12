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
var BaseMonster = (function (_super) {
    __extends(BaseMonster, _super);
    function BaseMonster(data, isMe, notAdd) {
        var _this = _super.call(this) || this;
        // private _hpTxt:BaseTextField;
        _this._isDie = false;
        _this._isMe = false;
        // private _moveIdx:number=0;
        _this._offPos = 0;
        _this._buffList = {};
        _this._isMe = isMe;
        data.isMe = isMe;
        _this.init(data, notAdd);
        _this.initEventListener();
        return _this;
    }
    BaseMonster.prototype.isBoss = function () {
        return this._data.getIsBoss();
    };
    BaseMonster.prototype.init = function (data, notAdd) {
        this._data = data;
        var img = null;
        var isMv = true;
        var monster = null;
        if (data.getIsBoss()) {
            img = Config.BattleCfg.getBossIcon(data.getBossId());
        }
        else {
            img = this.getMonsterImg();
        }
        monster = ComponentMgr.getCustomMovieClip(img, NaN, 150, BattleCustomEffect);
        this._monster = monster;
        monster.addEventListener(MsgConst.BT_EFFECT_FIRST_SHOW, this.showHpProgress, this);
        monster.playWithTime(0);
        if ((!this._isMe) && BattleStatus.battleType == 1) {
            monster.scaleX = -1;
        }
        this.addChild(monster);
        // monster.setPosition(-monster.width*0.5,-monster.height*0.5);
        // this._hpTxt=ComponentMgr.getTextField(""+data.hp,20);
        // this._hpTxt.width=monster.width;
        // this._hpTxt.textAlign=egret.HorizontalAlign.CENTER;
        // this._hpTxt.setPosition(-this._hpTxt.width*0.5,-this._hpTxt.height*0.5);
        // this.addChild(this._hpTxt);
        this.name = this._data.getName();
        var limitData = BattleStatus.getLimitPos();
        var posData = this._isMe ? limitData.me : limitData.target;
        var _a = GameConfig.monsterSize[data.type || 1], w = _a.w, h = _a.h;
        this._offPos = Math.min(w, h) * 0.5 * 0.8;
        this._data.offPos = this._offPos;
        this.setPosition(posData.pos0.x, posData.pos0.y + (this._isMe ? 1 : -1) * this._offPos);
        this._data.moveStatus = 0;
        if (!notAdd) {
            BattleStatus.createAddGroupList(data);
        }
    };
    BaseMonster.prototype.showHpProgress = function (e) {
        this._monster && this._monster.removeEventListener(MsgConst.BT_EFFECT_FIRST_SHOW, this.showHpProgress, this);
        if (!this._hpBg) {
            this._hpBg = BaseBitmap.create("btmsthpbg");
            this.addChild(this._hpBg);
            this._hpBg.y = -this._monster.height * 0.5 - this._hpBg.height + this._monster.height * 0.1;
            this._hpBgArrow = BaseBitmap.create("btmsthpbg_arrow");
            this._hpBgArrow.anchorOffsetX = this._hpBgArrow.width * 0.5;
            this._hpBgArrow.y = this._hpBg.y + this._hpBg.height - 1;
            this.addChild(this._hpBgArrow);
            // this._hpTxt=<BaseBitmapText>ComponentMgr.getBitmapText(""+this._data.hp,"msthp_fnt",NaN,NaN,true);
            this._hpTxt = ComponentMgr.getTextureText("" + this._data.hp, "btmsttnum");
            this._hpTxt.letterSpacing = -2;
            this._hpTxt.y = this._hpBg.y + (this._hpTxt.height - this._hpBg.height) * 0.5 + 2;
            this.addChild(this._hpTxt);
            this.setHpTxt();
        }
    };
    BaseMonster.prototype.getMonsterImg = function () {
        return Config.BattleCfg.getMonsterIcon(this._data.type);
    };
    BaseMonster.prototype.move = function (moveCallback, thisObj) {
        var limitData = BattleStatus.getLimitPos();
        var posData = this._isMe ? limitData.me : limitData.target;
        var nextPosIdx = this._data.moveStatus + 1;
        var nextLimitPos = posData['pos' + nextPosIdx];
        var nextEndPos = posData['pos' + (nextPosIdx + 1)];
        var speedScaleY = 1;
        var moveDis = 0;
        var isSurvive = false;
        if (nextLimitPos) {
            var diffY = 0;
            var speed = this._data ? this._data.getSpeed() : 0;
            switch (this._data.moveStatus) {
                case MonsterMoveStatus.GO:
                    diffY = nextLimitPos.y - this.y;
                    speedScaleY = diffY >= 0 ? 1 : -1;
                    if (Math.abs(diffY) > speed) {
                        var tmpDis = speedScaleY * speed;
                        this.y += tmpDis;
                        moveDis = Math.abs(tmpDis);
                    }
                    else {
                        this.y += diffY;
                        var speedScaleX_1 = nextEndPos.x >= nextLimitPos.x ? 1 : -1;
                        var tmpDis = speedScaleX_1 * (speed - Math.abs(diffY));
                        this.x += tmpDis;
                        this._data.moveStatus++;
                        moveDis = Math.abs(diffY) + Math.abs(tmpDis);
                        if (moveCallback) {
                            moveCallback.call(thisObj, this._data);
                        }
                    }
                    moveDis && this.moveDis(moveDis);
                    this.buffExec();
                    break;
                case MonsterMoveStatus.PUBLIC:
                    var nextLimitX = nextLimitPos.x;
                    if (BattleStatus.battleType == 2) {
                        nextLimitX = nextLimitX - this._offPos;
                    }
                    var diffX = nextLimitX - this.x;
                    var speedScaleX = diffX >= 0 ? 1 : -1;
                    if (Math.abs(diffX) > speed) {
                        var tmpDis = speedScaleX * speed;
                        this.x += tmpDis;
                        moveDis = Math.abs(tmpDis);
                        this.buffExec();
                    }
                    else {
                        if (nextEndPos) {
                            this.x += diffX;
                            var speedScaleY_1 = nextEndPos.y >= nextLimitPos.y ? 1 : -1;
                            var tmpDis = speedScaleY_1 * (speed - Math.abs(diffX));
                            this.y += tmpDis;
                            moveDis = Math.abs(diffX) + Math.abs(tmpDis);
                            this.buffExec();
                        }
                        else {
                            this._data && (this._data.survive = true);
                            isSurvive = true;
                        }
                        this._data.moveStatus++;
                        if (isSurvive) {
                            App.MsgHelper.dispEvt(MsgConst.MONSTER_SURVIVE, this._data);
                        }
                        if (moveCallback) {
                            moveCallback.call(thisObj, this._data);
                            if (!nextEndPos) {
                                this.dispose();
                            }
                        }
                    }
                    moveDis && this.moveDis(moveDis);
                    break;
                case MonsterMoveStatus.BACK:
                    var nextLimitY = nextLimitPos.y;
                    if (BattleStatus.battleType == 1) {
                        var scale = this._isMe ? -1 : 1;
                        nextLimitY = nextLimitY + scale * this._offPos;
                    }
                    diffY = nextLimitY - this.y;
                    speedScaleY = diffY >= 0 ? 1 : -1;
                    if (Math.abs(diffY) > speed) {
                        var tmpDis = speedScaleY * speed;
                        this.y += tmpDis;
                        moveDis = Math.abs(tmpDis);
                        this.buffExec();
                    }
                    else {
                        if (nextEndPos) {
                            this.y += diffY;
                            var speedScaleX_2 = nextEndPos.x >= nextLimitPos.x ? 1 : -1;
                            var tmpDis = speedScaleX_2 * (speed - Math.abs(diffY));
                            this.x += tmpDis;
                            moveDis = Math.abs(diffY) + Math.abs(tmpDis);
                            this.buffExec();
                        }
                        else {
                            this._data && (this._data.survive = true);
                            isSurvive = true;
                        }
                        this._data.moveStatus++;
                        if (isSurvive) {
                            App.MsgHelper.dispEvt(MsgConst.MONSTER_SURVIVE, this._data);
                        }
                        if (moveCallback) {
                            moveCallback.call(thisObj, this._data);
                            if (!nextEndPos) {
                                this.dispose();
                            }
                        }
                    }
                    moveDis && this.moveDis(moveDis);
                    break;
            }
        }
        var effarr = ["atkeffect102", "atkeffect309"];
        for (var i = 0; i < effarr.length; ++i) {
            var eff = this.getChildByName(effarr[i]);
            if (eff) {
                var monstername = eff["mvData"];
                var monster = this.isMe ? BattleStatus.meMonsterList[monstername] : BattleStatus.targetMonsterList[monstername];
                if (monster) {
                    var w = 33;
                    var diffX = monster.x - this.x;
                    var diffY = monster.y - this.y;
                    var angle = Math.atan2(diffY, diffX);
                    eff.rotation = angle * 180 / Math.PI;
                    var dis = Math.sqrt(diffX * diffX + diffY * diffY);
                    if (dis < w) {
                        eff.scaleX = dis / w;
                    }
                    else {
                        eff.width = dis;
                    }
                }
                else {
                    eff.dispose();
                    eff = null;
                }
            }
        }
    };
    BaseMonster.prototype.lost = function (isMe) {
        return this._data ? this._data.lost(isMe) : true;
    };
    BaseMonster.prototype.moveDis = function (speed) {
        if (this._data) {
            this._data.move(speed);
            BattleStatus.checkGroup(this._data);
        }
    };
    BaseMonster.prototype.isDie = function () {
        return this._data ? this._data.hp <= 0 : this._isDie;
    };
    BaseMonster.prototype.isMoveEnd = function () {
        return this._data.isMoveEnd();
    };
    BaseMonster.prototype.isMe = function () {
        return this._isMe;
    };
    BaseMonster.prototype.getMoveStatus = function () {
        return this._data.moveStatus;
    };
    BaseMonster.prototype.resetToStart = function () {
        var limitData = BattleStatus.getLimitPos();
        var posData = this._isMe ? limitData.me : limitData.target;
        this.setPosition(posData.pos0.x, posData.pos0.y + (this._isMe ? 1 : -1) * this._offPos);
        if (this._data.isPublic()) {
            var mDataList = this._data.isMe ? BattleStatus.targetMonsterDataList : BattleStatus.meMonsterDataList;
            var mList = this._data.isMe ? BattleStatus.targetMonsterList : BattleStatus.meMonsterList;
            var idx = mDataList.indexOf(this._data);
            if (idx > -1) {
                mDataList.splice(idx, 1);
            }
            delete mList[this._data.getName()];
            var maxHpList = BattleStatus.getMaxHpList(!this._data.isMe);
            var hpIdx = maxHpList.indexOf(this._data);
            if (hpIdx > -1) {
                maxHpList.splice(hpIdx, 1);
            }
        }
        this._data.reset();
    };
    BaseMonster.prototype.addBeAtkStatus = function (addStatus, isbuff) {
        if (BattleStatus.stopActEffect) {
            return;
        }
        if (addStatus) {
            var clipName = "" + addStatus + (isbuff ? "_buff" : "");
            var flag = false;
            if (Config.DiceCfg.getCanAddEffById(addStatus)) {
                flag = true;
            }
            else {
                flag = !this.getChildByName(clipName);
            }
            if (flag) {
                var hpTxtIdx = this.getChildIndex(this._monster) + 1;
                var key = this._data.getAddStatus(addStatus);
                var cfg = Config.DiceCfg.getAddMstEffById(key);
                if (!cfg) {
                    key = "" + addStatus;
                    cfg = Config.DiceCfg.getAddMstEffById(key);
                }
                var name_1 = "addmst" + key;
                if (cfg) {
                    if (RES.hasRes(name_1 + "1")) {
                        var mv_1 = ComponentMgr.getCustomMovieClip(name_1, null, cfg.timeparam, BattleCustomEffect);
                        if (cfg.playnum > 0 && (!cfg.keep)) {
                            mv_1.setEndCallBack(function () {
                                mv_1.dispose();
                                mv_1 = null;
                            }, this);
                        }
                        if (cfg.add) {
                            mv_1.blendMode = egret.BlendMode.ADD;
                        }
                        mv_1.name = clipName;
                        mv_1.playWithTime(cfg.playnum);
                        this.addChildAt(mv_1, hpTxtIdx);
                        mv_1.anchorOffsetX = cfg.width / 2;
                        mv_1.anchorOffsetY = cfg.height / 2;
                        var scale = 2;
                        if (this._data.getIsBoss() && cfg.bossscale) {
                            scale = cfg.bossscale || 4;
                        }
                        if (cfg["type" + this._data.type + "scale"]) {
                            scale = cfg["type" + this._data.type + "scale"];
                        }
                        mv_1.setScale(scale);
                        var tmpx = cfg.tmpx ? cfg.tmpx : 0;
                        mv_1.setPosition(this._monster.x - 10 + tmpx, this._monster.y);
                    }
                    else {
                        if (cfg.type == "around") {
                            var bmp = BaseBitmap.create(name_1);
                            bmp.name = clipName;
                            bmp.anchorOffsetX = cfg.width / 2;
                            bmp.anchorOffsetY = cfg.height / 2;
                            var scale = 2;
                            if (this._data.getIsBoss() && cfg.bossscale) {
                                scale = cfg.bossscale;
                            }
                            if (cfg["type" + this._data.type + "scale"]) {
                                scale = cfg["type" + this._data.type + "scale"];
                            }
                            bmp.setScale(scale);
                            this.addChildAt(bmp, hpTxtIdx);
                            egret.Tween.get(bmp, { loop: true }).to({ rotation: cfg.rotation }, cfg.timeparam);
                        }
                        if (cfg.type == "fly") {
                            if (key == "301") {
                                name_1 = "addmstdie";
                            }
                            var bmp_1 = BaseBitmap.create(name_1);
                            bmp_1.name = clipName;
                            bmp_1.setScale(0.8);
                            bmp_1.alpha = 1.5;
                            bmp_1.anchorOffsetX = bmp_1.width / 2;
                            bmp_1.anchorOffsetY = bmp_1.height / 2;
                            this.addChildAt(bmp_1, hpTxtIdx);
                            egret.Tween.get(bmp_1).to({ scaleX: 2, scaleY: 2, alpha: 0, y: -30 }, 300).call(function () {
                                bmp_1.alpha = 0;
                                bmp_1.dispose();
                                bmp_1 = null;
                            }, this);
                        }
                        else {
                            var bmp = BaseBitmap.create(name_1);
                            bmp.anchorOffsetX = bmp.width / 2;
                            bmp.anchorOffsetY = bmp.height / 2;
                            bmp.name = clipName;
                            this.addChild(bmp);
                            if (cfg.add) {
                                bmp.blendMode = egret.BlendMode.ADD;
                            }
                            if (cfg["type" + this.getMonsterType() + "tmpy"]) {
                                bmp.y = cfg["type" + this.getMonsterType() + "tmpy"];
                            }
                            var scale = 1;
                            if (cfg["type" + this._data.type + "scale"]) {
                                scale = cfg["type" + this._data.type + "scale"];
                            }
                            bmp.setScale(scale);
                        }
                    }
                }
                else {
                    var bmp = BaseBitmap.create(name_1);
                    bmp.anchorOffsetX = bmp.width / 2;
                    bmp.anchorOffsetY = bmp.height / 2;
                    bmp.name = clipName;
                    bmp.setScale(0.5);
                    this.addChildAt(bmp, hpTxtIdx);
                    bmp.alpha = 0.8;
                    egret.Tween.get(bmp, { loop: true }).to({ scaleX: 0.6, scaleY: 0.6, alpha: 0.8 }, 250).to({ scaleX: 0.5, scaleY: 0.5, alpha: 0.4 }, 250);
                }
            }
        }
    };
    BaseMonster.prototype.removeBuffAddStatus = function (stringid) {
        var clipname = stringid + "_buff";
        var key = this._data.getAddStatus(stringid);
        var cfg = Config.DiceCfg.getAddMstEffById(key);
        if (!cfg) {
            key = "" + stringid;
            cfg = Config.DiceCfg.getAddMstEffById(key);
        }
        if (cfg) {
            if (cfg.type == "around") {
                var clip = this.getChildByName(clipname);
                if (clip) {
                    clip.alpha = 0;
                    egret.Tween.removeTweens(clip);
                    clip.dispose();
                    clip = null;
                }
            }
            else {
                var clip = this.getChildByName(clipname);
                if (clip) {
                    clip.dispose();
                    clip = null;
                }
            }
        }
        else {
            var clip = this.getChildByName(clipname);
            if (clip) {
                clip.alpha = 0;
                egret.Tween.removeTweens(clip);
                clip.dispose();
                clip = null;
            }
        }
    };
    BaseMonster.prototype.checkHasBuff = function (diceId) {
        return this._buffList[diceId];
    };
    BaseMonster.prototype.addBuff = function (buff) {
        if (!this._buffList[buff.diceId]) {
            this._buffList[buff.diceId] = buff;
            if (buff.damage) {
                //this.buffDmg(buff);
                this.addBeAtkStatus(buff.diceId, true);
            }
            if (buff.speed || buff.adddmg || buff.posion) {
                this.addBeAtkStatus(buff.diceId, true);
            }
        }
    };
    BaseMonster.prototype.removeBuff = function (diceId, all) {
        if (all === void 0) { all = false; }
        var flag = false;
        if (this._buffList[diceId]) {
            var buff = this._buffList[diceId];
            if (buff.speed) {
                // this._data.changeSpeed(buff.speed, true);
            }
            if (all) {
                flag = true;
                delete this._buffList[buff.diceId];
                this.removeBuffAddStatus(buff.diceId);
            }
            else {
                if (buff.overlap == 1) {
                    flag = true;
                    delete this._buffList[buff.diceId];
                    this.removeBuffAddStatus(buff.diceId);
                }
                else {
                    buff.overlap -= 1;
                }
            }
        }
        return flag;
    };
    BaseMonster.prototype.removeAllBuff = function () {
        for (var i in this._buffList) {
            var buff = this._buffList[i];
            for (var j = 1; j <= buff.overlap; ++j) {
                this.removeBuff(buff.diceId, true);
            }
        }
    };
    BaseMonster.prototype.updateBuff = function (buff) {
        if (buff.speed) {
            // this._data.changeSpeed(buff.speed,false);
        }
    };
    BaseMonster.prototype.buffExec = function () {
        var keys = Object.keys(this._buffList);
        var l = keys.length;
        var speedscale = 0;
        var stop = false;
        if (l > 0) {
            keys.sort(function (a, b) {
                return Number(a) - Number(b);
            });
            for (var i = 0; i < l; i++) {
                var buff = this._buffList[keys[i]];
                if (buff) {
                    if (buff.checkEnd()) {
                        this.removeBuff(buff.diceId);
                    }
                    else {
                        if (buff.speed == 1) {
                            stop = true;
                        }
                        if (buff.speed) {
                            speedscale += (buff.speed * buff.overlap);
                        }
                        this.buffDmg(buff);
                    }
                }
            }
        }
        if (this._data) {
            this._data.changeSpeed(speedscale, false, stop);
        }
    };
    BaseMonster.prototype.buffDmg = function (buff) {
        if (buff.checkDoTime()) {
            this.beAtk({ hp: buff.damage, isMe: buff.isMe, crit: false });
        }
    };
    BaseMonster.prototype.beAtk = function (data) {
        var _this = this;
        if (data) {
            if (this._data) {
                this.addBeAtkStatus(data.addStatus);
                var hp = Math.floor(data.hp);
                var buffdata = this.checkHasBuff("204");
                if (buffdata && buffdata.adddmg && !data.isPercent) {
                    hp = Math.floor(hp * (1 + buffdata.adddmg));
                }
                hp = Math.min(this._data.hp, hp);
                this._data.setHp(hp);
                if (data.crit) {
                    App.LogUtil.log(data.isMe, "暴击伤害", data.hp, hp);
                }
                BattleStatus.showDamage(this, hp, data.crit, data.isMe);
                // this._hpTxt.setString(""+this._data.hp);
                // if(this._hpProgress)
                // {
                //     this._hpProgress.setPercentage(this._data.hp/this._data.inithp);
                // }
                this.setHpTxt();
                if (this._data.isDie()) {
                    BattleStatus.battleCheckCount(data.isMe, "k");
                    App.MsgHelper.dispEvt(MsgConst.BT_KILL_MONSTER, { isMe: data.isMe, data: this._data });
                    if (this._data.add && BattleStatus.battleType == BattleTypeEnums.bigType1) {
                        BattleStatus.battleCheckCount(data.isMe, "tk", function () {
                            Api.BattleVoApi.addEmeryMonster(!_this._data.isMe);
                        }, this);
                    }
                    Api.BattleVoApi.addSp(this._data.monsterSp, data.isMe);
                    if (BattleStatus.battleType == BattleTypeEnums.bigType2) {
                        Api.BattleVoApi.addSp(this._data.monsterSp, !data.isMe);
                    }
                    this._isDie = true;
                    this.playDieEffect();
                    // let enemyVo = this._data.getEnemyCopy();
                    // if(enemyVo)
                    // {
                    //     let bt=BattleStatus.battleLogicHasTickTime+1000;
                    //     enemyVo.birthTime=bt;
                    //     let roundList = enemyVo.isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
                    //     let voArr:MonsterVo[]=roundList[bt];
                    //     if(voArr)
                    //     {
                    //         voArr.push(enemyVo);
                    //     }
                    //     else
                    //     {
                    //         roundList[bt]=[enemyVo];
                    //     }
                    //     let isMe=enemyVo.isMe;
                    //     if(isMe)
                    //     {
                    //         BattleStatus.totalMonsterNum.me++;
                    //     }
                    //     else
                    //     {
                    //         BattleStatus.totalMonsterNum.target++;
                    //     }
                    // }
                    //有瘟疫骰子buff
                    var buff = this.checkHasBuff("308");
                    if (buff) {
                        var obstacle = Obstacle.createObstacle(buff.dicedata, { x: this.x, y: this.y }, null, this._data.getCenterDis());
                    }
                }
                else {
                    if (this._data.highHp) {
                        BattleStatus.checkMaxHp(this._data, this._data.isMe, 1);
                        if (this._data.isPublic()) {
                            BattleStatus.checkMaxHp(this._data, !this._data.isMe, 1);
                        }
                    }
                }
            }
            else {
                this._isDie = true;
            }
        }
    };
    BaseMonster.prototype.setHpTxt = function () {
        if (this._hpTxt) {
            this._hpTxt.setString("" + this._data.hp);
            this._hpTxt.anchorOffsetX = this._hpTxt.width * 0.5 + 0.5;
            this._hpBg.width = this._hpTxt.width + 10;
            this._hpBg.anchorOffsetX = this._hpBg.width * 0.5;
        }
    };
    BaseMonster.prototype.getCurHp = function () {
        return this._data ? this._data.hp : 0;
    };
    BaseMonster.prototype.getMaxHp = function () {
        return this._data ? this._data.inithp : 0;
    };
    BaseMonster.prototype.playDieEffect = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.alpha = 0;
        egret.Tween.get(this).wait(300).call(function () {
            _this.dispose();
        }, this);
    };
    BaseMonster.prototype.getMonsterType = function () {
        return this._data ? this._data.type : 0;
    };
    BaseMonster.prototype.dispose = function () {
        if (this._data) {
            this._data.dispose();
            this._data = null;
        }
        this._monster && this._monster.removeEventListener(MsgConst.BT_EFFECT_FIRST_SHOW, this.showHpProgress, this);
        // this._hpTxt=null;
        // this._isDie=false;
        this._isMe = false;
        this._monster = null;
        // this._moveIdx=0;
        this._hpBg = null;
        this._hpTxt = null;
        this._hpBgArrow = null;
        App.ObjectUtil.clear(this._buffList);
        _super.prototype.dispose.call(this);
    };
    return BaseMonster;
}(BaseDisplayObjectContainer));
__reflect(BaseMonster.prototype, "BaseMonster");
var MonsterMoveStatus;
(function (MonsterMoveStatus) {
    MonsterMoveStatus[MonsterMoveStatus["GO"] = 0] = "GO";
    MonsterMoveStatus[MonsterMoveStatus["PUBLIC"] = 1] = "PUBLIC";
    MonsterMoveStatus[MonsterMoveStatus["BACK"] = 2] = "BACK";
    MonsterMoveStatus[MonsterMoveStatus["END"] = 3] = "END";
})(MonsterMoveStatus || (MonsterMoveStatus = {}));
//# sourceMappingURL=BaseMonster.js.map