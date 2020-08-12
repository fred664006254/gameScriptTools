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
 * 骰子基类，实现骰子通用逻辑
 * author 陈可
 * date 2020/4/23
 * @class BaseDice
 */
var BaseDice = (function (_super) {
    __extends(BaseDice, _super);
    function BaseDice(data, appearEff) {
        var _this = _super.call(this) || this;
        _this._targetList = [];
        // protected _mask:BaseBitmap;
        _this._extraGroup = null;
        _this._buffList = {};
        _this._isSilence = false;
        _this._starBmp = null;
        _this._obs = [];
        _this.init(data, appearEff);
        _this.initEventListener();
        return _this;
    }
    BaseDice.prototype.init = function (data, appearEff) {
        var _this = this;
        this._data = data;
        var iconUrl = Config.DiceCfg.getIconById(String(this._data.id));
        var idleKey = Config.DiceCfg.getIdceEffect(String(this._data.id));
        var dice = ComponentMgr.getCustomMovieClip(idleKey, NaN, 150, BattleDiceEffect);
        // if(data.isMe && !Api.GameinfoVoApi.getIsFinishNewGuide() && Api.GameinfoVoApi.getCurGudingId() <= 5 && (this._data.posStr == `1_1` || this._data.posStr == `3_1`)){
        //     dice.width = 94;
        //     dice.height = 109;
        // }
        // dice.width = 126;
        // dice.height = 99;
        dice.playIdle();
        this._bg = dice;
        this.addChild(dice);
        var star = BaseBitmap.create("dicestarlv" + this._data.star);
        star.anchorOffsetX = star.width * 0.5;
        star.anchorOffsetY = star.height * 0.5;
        this.addChild(star);
        this._starBmp = star;
        //圆形遮罩
        if (data.isMe) {
            App.MsgHelper.addEvt(MsgConst.DICE_MOVE_FORCOMPOSE, this.movein, this);
        }
        var group = new BaseDisplayObjectContainer();
        this._extraGroup = group;
        group.width = dice.width;
        group.height = dice.height;
        group.anchorOffsetX = group.width / 2;
        group.anchorOffsetY = group.height / 2;
        group.setPosition(dice.x + dice.width / 2, dice.y + dice.height / 2);
        this.addChild(group);
        this.resetStar();
        // this.width=diceSize.width;
        // this.height=diceSize.height;
        this.resetPos();
        this.appearEff(data.checkIsMirror(), appearEff == "pre" ? false : true, appearEff);
        var timebuff = BattleStatus.scene.getTimeBuff(this.checkIsMe(), this.getDiceStars());
        if (timebuff) {
            var buffData = { diceId: "418", keep: 0, timespeed: timebuff.timespeed, cd: 0, isMe: this.checkIsMe() };
            DiceBuff.addBuff(buffData, this);
        }
        if (!this.checkIsMe() && Api.GameinfoVoApi.getIsFinishNewGuide()) {
            this.addTouchTap(function () {
                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                    dice: _this.getDiceId(),
                    check: true,
                    inbattle: true,
                    info: {
                        lv: _this._data.lv,
                        pwlv: _this._data.pwlv
                    },
                    star: _this.getDiceStars()
                });
            }, this);
        }
    };
    BaseDice.prototype.refresh = function (data, appeareff) {
        this._data = data;
        // let iconUrl=Config.DiceCfg.getIconById(String(this._data.id));
        // this._bg.setload(iconUrl);
        this.playAtkAction();
        this.resetStar();
        this._data.setCdTimeArr();
        this._data.setspecial1CdTimeArr();
        this._data.setspecial2CdTimeArr();
        this.checkAroundAndSelf();
        this.appearEff(data.checkIsMirror(), true, appeareff);
    };
    BaseDice.prototype.checkAroundAndSelf = function () {
        this.checkAroundDice();
        this.checkBuff();
    };
    BaseDice.prototype.checkLine = function () {
        this.checkAroundAndSelf();
    };
    BaseDice.prototype.movein = function (evt) {
        var flag = false;
        if (evt.data && evt.data.id && evt.data.pos != this._data.x + "_" + this._data.y) {
            if (evt.data.stars == this._data.star) {
                if (Number(this._data.id) == Number(evt.data.id)) {
                    flag = !this._data.checkMaxStar();
                }
                else {
                    if (this._data.checkCanComposeAny(evt.data.id)) {
                        if (Number(evt.data.id) == 404 || Number(evt.data.id) == 305) {
                            flag = true;
                        }
                        else {
                            flag = !this._data.checkMaxStar();
                        }
                    }
                }
            }
        }
        else {
            flag = true;
        }
        this.alpha = flag ? 1 : 0.4;
    };
    BaseDice.prototype.playAtkSound = function () {
        if (this.checkIsMe()) {
            var name_1 = "effect_dice_" + this.getDiceId();
            if (RES.hasRes(name_1)) {
                SoundMgr.playEffect(name_1);
            }
        }
    };
    BaseDice.prototype.appearEff = function (ismirror, smoke, appeareff) {
        var _this = this;
        if (smoke === void 0) { smoke = true; }
        if (appeareff && appeareff == "grow") {
            // this.setScale(DiceScaleEnum.scale_41);
            // this._bg.alpha = 0;
            // for(let i = 0; i < this._starList.length; ++ i){
            //     this._starList[i].alpha = 0;
            // } 
            var clipname = "adddice409";
            var clip_1 = ComponentMgr.getCustomMovieClip(clipname, null, 100, BattleBaseEffect);
            clip_1.setEndCallBack(function () {
                clip_1.dispose();
                _this._bg.alpha = 1;
                // for(let i = 0; i < this._starList.length; ++ i){
                //     this._starList[i].alpha = 1;
                // } 
                _this.checkAroundAndSelf();
                egret.Tween.get(_this).to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200);
            }, this);
            clip_1.playWithTime(1);
            clip_1.anchorOffsetX = 200 / 2;
            clip_1.anchorOffsetY = 200 / 2;
            clip_1.y = -70;
            this.addChild(clip_1);
        }
        else if (appeareff && appeareff == "summon") {
            // this.setScale(DiceScaleEnum.scale_41);
            //召唤骰子音效
            this._bg.alpha = 0;
            if (this.checkIsMe()) {
                var name_2 = "effect_dice_410";
                if (RES.hasRes(name_2)) {
                    SoundMgr.playEffect(name_2);
                }
            }
            // for(let i = 0; i < this._starList.length; ++ i){
            //     this._starList[i].alpha = 0;
            // } 
            var img_1 = BaseBitmap.create("adddice410");
            img_1.anchorOffsetX = 44;
            img_1.anchorOffsetY = 44;
            img_1.setScale(0);
            img_1.alpha = 0;
            this.addChild(img_1);
            egret.Tween.get(img_1).to({ rotation: -230 }, 1300).call(function () {
                egret.Tween.removeTweens(img_1);
                img_1.dispose();
                img_1 = null;
                _this._bg.alpha = 1;
                // for(let i = 0; i < this._starList.length; ++ i){
                //     this._starList[i].alpha = 1;
                // } 
                egret.Tween.get(_this).to({ scaleX: 1.1, scaleY: 1.1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                    _this.checkAroundAndSelf();
                }, _this);
            }, this);
            egret.Tween.get(img_1).to({ scaleX: 0.8 * 4, scaleY: 0.8 * 4 }, 550).to({ scaleX: 4, scaleY: 4 }, 750);
            egret.Tween.get(img_1).to({ alpha: 1 }, 300).wait(500).to({ alpha: 0 }, 500);
        }
        else {
            if (smoke) {
                var clipname = ismirror ? "diceappear2" : "diceappear1";
                var clip_2 = ComponentMgr.getCustomMovieClip(clipname, null, ismirror ? 70 : 35, BattleBaseEffect);
                clip_2.setEndCallBack(function () {
                    clip_2.dispose();
                }, this);
                clip_2.playWithTime(1);
                clip_2.anchorOffsetX = ismirror ? 50 : 25;
                clip_2.anchorOffsetY = ismirror ? 50 : 25;
                clip_2.setScale(ismirror ? 1 : 4);
                this.addChild(clip_2);
                clip_2.y = ismirror ? -30 : 0;
            }
            this.setScale(1 * 0.7);
            egret.Tween.get(this).to({ scaleX: 1.1 * 1, scaleY: 1.1 * 1 }, 300).to({ scaleX: 1, scaleY: 1 }, 200).call(function () {
                _this.checkAroundAndSelf();
            }, this);
        }
    };
    BaseDice.prototype.powerup = function (pwlv) {
        //播放特效
        var clip = ComponentMgr.getCustomMovieClip("dicepowerup", null, 70);
        clip.anchorOffsetX = 150 / 2;
        clip.anchorOffsetY = 150 / 2;
        clip.y = -35;
        clip.playWithTime(1);
        clip.setEndCallBack(function () {
            clip.dispose();
            clip = null;
        }, this);
        this._extraGroup.addChild(clip);
        var txtImg = BaseLoadBitmap.create("powerupzengfu");
        txtImg.anchorOffsetX = 61 / 2;
        txtImg.anchorOffsetY = 38 / 2;
        txtImg.alpha = 0;
        this._extraGroup.addChild(txtImg);
        var time = BattleStatus.timeparam;
        var tmpY = 0;
        egret.Tween.get(txtImg).to({ alpha: 1, y: -40 }, 15 * time).to({ y: -55 }, 10 * time).to({ alpha: 0, y: -65 }, 5 * time).call(function () {
            txtImg.dispose();
            txtImg = null;
        }, this);
        this._data.powerup(pwlv);
        if (this.checkIsEffectAround()) {
            this.checkAroundAndSelf();
        }
    };
    BaseDice.prototype.checkAroundDice = function () {
        var x = this.getPos().x;
        var y = this.getPos().y;
        var list = BattleStatus.scene.getDiceList(this.checkIsMe());
        var isCrit = false;
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
                dice_1.checkBuff();
            }
        }
    };
    BaseDice.prototype.beComposed = function () {
        //祭品骰子被合成、被暗杀、被boss打、变化等等都加sp
        var data = this._data;
        this.alpha = 0;
        if (this.checkIsEffectAround()) {
            this.checkAroundDice();
        }
        this.dispose();
    };
    BaseDice.prototype.checkIsMe = function () {
        return this._data.isMe;
    };
    BaseDice.prototype.getDiceId = function () {
        return this._data.id;
    };
    BaseDice.prototype.getDiceStars = function () {
        return this._data.star;
    };
    BaseDice.prototype.getDiceData = function () {
        return this._data;
    };
    BaseDice.prototype.resetStar = function () {
        // if(this._data.star)
        // {
        //     let iconUrl=Config.DiceCfg.getStarByLv(String(this._data.id),this._data.star);
        //     let l=this._starList.length;
        //     let starNum=this._data.star;
        //     let posCfg=BattleStatus.starCfg[starNum-1];
        //     if(this._data.checkMaxStar())
        //     {
        //         starNum=1;
        //     }
        //     let i=0;
        //     // let scale=DiceScaleEnum.scale_41;
        //     for(i=0;i<starNum;i++)
        //     {
        //         let star:BaseLoadBitmap=this._starList[i];
        //         if(!star)
        //         {
        //             star=BaseLoadBitmap.create(iconUrl);
        //             star.anchorOffsetX=star.width*0.5;
        //             star.anchorOffsetY=star.height*0.5;
        //             this.addChild(star);
        //             this._starList.push(star);
        //         }
        //         else
        //         {
        //             star.setload(iconUrl);
        //         }
        //         star.name="star"+starNum;
        //         star.setPosition(posCfg[i].x,posCfg[i].y);
        //     }
        //     for(i=l-1;i>=starNum;i--)
        //     {
        //         let star:BaseLoadBitmap=this._starList[i];
        //         this._starList.splice(i,1);
        //         star.dispose();
        //     }
        // }
        // this._starTxt.setString(this._data.star+"");
        this._starBmp.texture = ResMgr.getRes("dicestarlv" + this._data.star);
        // this.setChildIndex(this._mask, 999);
        if (this.checkIsMe()) {
            BattleStatus.hasMaxStar = Math.max(BattleStatus.hasMaxStar, this._data.star);
        }
    };
    /** 快速tick，逻辑上间隔10毫秒 */
    BaseDice.prototype.fastTick = function () {
        if (this._isSilence) {
            return;
        }
        var battleview = BattleStatus.scene;
        if (battleview && battleview.isInRound()) {
            return;
        }
        this.checkDoAction();
        this.buffExec();
    };
    BaseDice.prototype.getIsSilence = function () {
        return this._isSilence;
    };
    BaseDice.prototype.checkBuffEnd = function () {
        var keys = Object.keys(this._buffList);
        for (var i = 0; i < keys.length; ++i) {
            if (this._buffList[keys[i]]) {
                var unit = this._buffList[keys[i]];
                if (unit.checkEnd()) {
                    this.removeBuff(keys[i]);
                }
            }
        }
    };
    /**一些增益buff检测*/
    BaseDice.prototype.checkBuff = function () {
        //攻击类别 ： 暴击、一击毙命率
        if (Config.DiceCfg.checkHasNmAtk(String(this._data.id))) {
            this.checkAtkBuff();
        }
        return false;
    };
    BaseDice.prototype.checkIsAroundDice = function (pos1, pos2) {
        var x = Number(pos1.split("_")[0]);
        var y = Number(pos1.split("_")[1]);
        var tx = Number(pos2.split("_")[0]);
        var ty = Number(pos2.split("_")[1]);
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
            if (posx == tx && posy == ty) {
                return true;
            }
        }
        return false;
    };
    BaseDice.prototype.checkAtkBuff = function () {
        //检测四周的是否有加成变化
        var x = this.getPos().x;
        var y = this.getPos().y;
        var list = BattleStatus.scene.getDiceList(this.checkIsMe());
        var keys = Object.keys(this._buffList);
        for (var i = 0; i < keys.length; ++i) {
            var buff = this._buffList[keys[i]];
            if (buff && buff.keep == 0) {
                var pos = buff.getFromPos();
                if (pos) {
                    var posarr = pos.split("|");
                    for (var k in posarr) {
                        var tpos = posarr[k];
                        if (!list[tpos] || (list[tpos] && (list[tpos].getDiceId() !== buff.diceId || !this.checkIsAroundDice(tpos, x + "_" + y)))) {
                            this.removeBuff(keys[i], tpos);
                        }
                    }
                }
            }
        }
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
            var dice_2 = list[posx + "_" + posy];
            var pos = posx + "_" + posy;
            //暴击率 不叠加
            if (dice_2 && dice_2.checkCanAddCrit() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)) {
                var dicedata = dice_2.getDiceData();
                var buff = this.checkHasBuff(dicedata.id);
                if (buff) {
                    buff.from = posx + "_" + posy;
                    buff.crit = Math.max(dice_2.checkCanAddCrit(), buff.crit);
                    this.updateBuff(buff);
                }
                else {
                    var buffData = { diceId: dicedata.id, keep: 0, crit: dice_2.checkCanAddCrit(), cd: 0, isMe: dicedata.isMe, from: posx + "_" + posy }; //this._keep
                    DiceBuff.addBuff(buffData, this);
                }
                // if(!buff || (buff && !buff.judgeFromPos(pos))){
                //     let buffData:IDiceBuffData={diceId:dicedata.id, keep:0, crit:dice.checkCanAddCrit(), cd:0, isMe:dicedata.isMe, from:`${posx}_${posy}`};//this._keep
                //     DiceBuff.addBuff(buffData,this);
                // }
            }
            //一击必杀概率 不叠加
            if (dice_2 && dice_2.checkCanAddKill() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)) {
                var dicedata = dice_2.getDiceData();
                var buff = this.checkHasBuff(dicedata.id);
                if (buff) {
                    buff.from = posx + "_" + posy;
                    buff.kill = Math.max(dice_2.checkCanAddKill(), buff.kill);
                    this.updateBuff(buff);
                }
                else {
                    var buffData = { diceId: dicedata.id, keep: 0, kill: dice_2.checkCanAddKill(), cd: 0, isMe: dicedata.isMe, from: posx + "_" + posy }; //this._keep
                    DiceBuff.addBuff(buffData, this);
                }
            }
            //攻击速率 不叠加
            if (dice_2 && dice_2.checkCanAddAtkspeed() > 0 && Config.DiceCfg.checkHasNmAtk(this._data.id)) {
                var dicedata = dice_2.getDiceData();
                var buff = this.checkHasBuff(dicedata.id);
                if (buff) {
                    buff.from = posx + "_" + posy;
                    buff.atkspeed = Math.max(dice_2.checkCanAddAtkspeed(), buff.atkspeed);
                    this.updateBuff(buff);
                }
                else {
                    var buffData = { diceId: dicedata.id, keep: 0, atkspeed: dice_2.checkCanAddAtkspeed(), cd: 0, isMe: dicedata.isMe, from: posx + "_" + posy }; //this._keep
                    DiceBuff.addBuff(buffData, this);
                }
            }
        }
    };
    BaseDice.prototype.setTarget = function (monsterList) {
        this._targetList.length = 0;
        this._targetList = monsterList || [];
    };
    BaseDice.prototype.checkDoAction = function () {
        if (this._data) {
            var arr = this._data.cdTimeArr;
            var l = arr.length;
            for (var i = 0; i < l; i++) {
                var t = arr[i];
                // if(this.checkIsMe())
                // {
                //     console.log(BattleStatus.checkCdDoTime(this._data.cd,10,t),t,this._data.cd,BattleStatus.battleLogicHasTickTime);
                // }
                if (!!BattleStatus.checkCdDoTime(this._data.cd, t, this._data)) {
                    this.checkAtk(i);
                }
            }
        }
    };
    BaseDice.prototype.checkAtk = function (starIdx) {
        var isMe = this._data.isMe;
        var initInfo = Api.BattleVoApi.getInitInfo(isMe);
        // let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
        // let monstersList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        var findmonsterDataList = DiceHelper.diceFindMonster(this._data, isMe);
        var l = findmonsterDataList ? findmonsterDataList.length : 0;
        if (l > 0) {
            // let monster=monstersList[vo.getName()];
            var vo = findmonsterDataList[0];
            if (vo && !vo.lost(isMe)) {
                this.createBullet(starIdx, findmonsterDataList);
            }
            else {
                App.LogUtil.error("mst is died", this._data.id, vo.hashCode);
            }
            // this.normalAtk(monster,initInfo);
            // this.propertyAtk(findmonsterDataList);
        }
    };
    BaseDice.prototype.checkSpecial1Atk = function (starIdx) {
        // if(this._data.type==5)
        // {
        //     this.createObstacle(starIdx);
        // }
    };
    BaseDice.prototype.checkSpecial2Atk = function (starIdx) {
        // if(this._data.type==5)
        // {
        //     this.createObstacle(starIdx);
        // }
    };
    /**
     * 放置类陷阱或者障碍物
     * @param starIdx 哪个炮口
     */
    BaseDice.prototype.createObstacle = function (starIdx) {
        this.playAtkAction();
        var fpos = { x: this.x, y: this.y };
        var obstacle = Obstacle.createObstacle(this._data, fpos);
    };
    BaseDice.prototype.createBullet = function (starIdx, findmonsterDataList) {
        this.playAtkAction();
        var fpos = { x: this.x, y: this.y };
        var bullet = Bullet.createBullet(this._data, fpos);
        bullet.atk(findmonsterDataList);
    };
    BaseDice.prototype.playAtkAction = function () {
        if (this._bg instanceof BattleDiceEffect) {
            this._bg.playAtk(Config.DiceCfg.getAtkEffect(this._data.id, this.getDiceStars()));
        }
    };
    BaseDice.prototype.setPos = function (x, y) {
        this._data.setPos(x, y);
    };
    BaseDice.prototype.getPos = function () {
        return { x: this._data.x, y: this._data.y };
    };
    BaseDice.prototype.dragMove = function (addX, addY) {
        this.resetPos(addX, addY);
    };
    BaseDice.prototype.resetPos = function (addX, addY, show) {
        if (addX === void 0) { addX = 0; }
        if (addY === void 0) { addY = 0; }
        if (show === void 0) { show = false; }
        if (this._data) {
            var _a = this._data.getShowPos(this._data.isMe), x = _a.x, y = _a.y;
            this.setPosition(x + addX, y + addY);
            if (show) {
                this.appearEff(false, false);
            }
        }
    };
    // protected setDamage():void
    // {
    //     let cfg=Config.DiceCfg.getCfgById(this.id);
    //     let pwadd=cfg.getPowerAtkByLv(this.pwlv);
    //     this.damage=this.initdamage+pwadd;
    //     this.property1=cfg.getProperty1ByLv(this.lv)+cfg.getPowerProperty1ByLv(this.pwlv);
    //     this.property2=cfg.getProperty2ByLv(this.lv)+cfg.getPowerProperty2ByLv(this.pwlv);
    // }
    //是否是可以提供一击必杀率加成
    BaseDice.prototype.checkCanAddKill = function () {
        var kill = 0;
        var cfg = Config.DiceCfg.getCfgById(this._data.id);
        if (Number(this._data.id) == 406) {
            //星数 * 自身几率 + （战斗内power up等级 -1）*0.5%（这个0.5是power up的那个字段
            kill = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return kill; //kill
    };
    //是否是可以提供暴击加成
    BaseDice.prototype.checkCanAddCrit = function () {
        var crit = 0;
        var cfg = Config.DiceCfg.getCfgById(this._data.id);
        if (Number(this._data.id) == 205) {
            crit = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return crit;
    };
    //是否是可以提供攻击速率
    BaseDice.prototype.checkCanAddAtkspeed = function () {
        var atkspeed = 0;
        var cfg = Config.DiceCfg.getCfgById(this._data.id);
        if (Number(this._data.id) == 202) {
            atkspeed = this._data.star * (cfg.getProperty1ByLv(this._data.lv) + cfg.getPowerProperty1ByLv(this._data.pwlv));
        }
        return atkspeed; //kill
    };
    BaseDice.prototype.checkIsEffectAround = function () {
        return this._data.checkIsDevilDice() || this._data.checkIsCritDice() || this._data.checkIsAtkSpeedDice();
    };
    BaseDice.prototype.addBuffStatus = function (addStatus) {
        var _this = this;
        if (BattleStatus.stopActEffect) {
            return;
        }
        if (addStatus) {
            var key = "" + addStatus;
            var cfg = Config.DiceCfg.getAddDiceEffById(key);
            var name_3 = "adddice" + key;
            if (cfg) {
                if (RES.hasRes(name_3 + "1")) {
                    var mv_1 = ComponentMgr.getCustomMovieClip(name_3, null, cfg.timeparam, BattleCustomEffect);
                    mv_1.anchorOffsetX = cfg.width / 2;
                    mv_1.anchorOffsetY = cfg.height / 2;
                    var scale = 4;
                    if (cfg.scale) {
                        scale = cfg.scale;
                    }
                    mv_1.setScale(scale);
                    if (cfg.playnum > 0) {
                        mv_1.setEndCallBack(function () {
                            mv_1.dispose();
                            mv_1 = null;
                        }, this);
                    }
                    if (cfg.add) {
                        mv_1.blendMode = egret.BlendMode.ADD;
                    }
                    mv_1.name = addStatus + "_dicebuff";
                    mv_1.playWithTime(cfg.playnum);
                    this._extraGroup.addChild(mv_1);
                    if (cfg.tmpy) {
                        mv_1.y = cfg.tmpy;
                    }
                    // mv.setPosition(this._bg.x+this._bg.width/2,this._bg.y+this._bg.height/2);
                }
                else {
                    if (cfg.type == "randomFly") {
                        var _loop_1 = function (i) {
                            var bmp = BaseBitmap.create("adddice" + addStatus);
                            bmp.name = "" + addStatus + i + "_dicebuff";
                            bmp.anchorOffsetX = bmp.width / 2;
                            bmp.anchorOffsetY = bmp.height / 2;
                            bmp.alpha = 0;
                            bmp.setScale(Math.random() > 0.5 ? 1 : 0.5);
                            var startX = App.MathUtil.getRandom(-bmp.width, bmp.width); //(0.5 * i - 1) * bmp.width;
                            var startY = 0;
                            bmp.setPosition(startX, startY);
                            var time = BattleStatus.timeparam;
                            egret.Tween.get(bmp).wait(i * 10 * time).
                                to({ y: -38, alpha: 1 }, 10 * time).
                                to({ y: -65, alpha: 0 }, 10 * time).call(function () {
                                bmp.alpha = 0;
                                bmp.setScale(Math.random() > 0.5 ? 1 : 0.5);
                                bmp.x = App.MathUtil.getRandom(-bmp.width, bmp.width);
                                ;
                                bmp.y = 0;
                                egret.Tween.get(bmp, { loop: true }).wait(20 * time).
                                    to({ y: -38, alpha: 1 }, 10 * time).
                                    to({ y: -65, alpha: 0 }, 10 * time).call(function () {
                                    bmp.alpha = 0;
                                    bmp.setScale(Math.random() > 0.5 ? 1 : 0.5);
                                    bmp.x = App.MathUtil.getRandom(-bmp.width, bmp.width);
                                    ;
                                    bmp.y = 0;
                                });
                                _this._extraGroup.addChild(bmp);
                            });
                            this_1._extraGroup.addChild(bmp);
                        };
                        var this_1 = this;
                        for (var i = 0; i < 4; ++i) {
                            _loop_1(i);
                        }
                    }
                }
            }
            else {
                if (key == "418_1" || key == "418_2") {
                    var timebg = BaseBitmap.create(name_3);
                    timebg.anchorOffsetX = 29;
                    timebg.anchorOffsetY = 29;
                    timebg.setScale(4);
                    timebg.setPosition(4, 4);
                    timebg.name = key + "_dicebuff";
                    this._extraGroup.addChild(timebg);
                    var point = BaseBitmap.create("adddicepoint" + key);
                    point.anchorOffsetX = 4;
                    point.anchorOffsetY = 8;
                    point.setScale(4);
                    this._extraGroup.addChild(point);
                    point.name = "point" + key + "_dicebuff";
                    egret.Tween.get(point, { loop: true }).to({ rotation: key == "418_1" ? 360 : -360 }, 2000);
                }
            }
        }
    };
    BaseDice.prototype.removeBuffAddStatus = function (stringid) {
        if (stringid == "418_1" || stringid == "418_2") {
            var timebg = this._extraGroup.getChildByName(stringid + "_dicebuff");
            if (timebg) {
                timebg.dispose();
                timebg = null;
            }
            var point = this._extraGroup.getChildByName("point" + stringid + "_dicebuff");
            if (point) {
                egret.Tween.removeTweens(point);
                point.dispose();
                point = null;
            }
        }
        else {
            var clipname = stringid + "_dicebuff";
            var name_4 = "adddice" + stringid;
            var cfg = Config.DiceCfg.getAddDiceEffById(stringid);
            if (cfg) {
                if (RES.hasRes(name_4 + "1")) {
                    var clip = this._extraGroup.getChildByName(clipname);
                    if (clip) {
                        clip.dispose();
                        clip = null;
                    }
                }
                else {
                    if (cfg.type == "randomFly") {
                        for (var i = 0; i < 4; ++i) {
                            var bmp = this._extraGroup.getChildByName("" + stringid + i + "_dicebuff");
                            if (bmp) {
                                egret.Tween.removeTweens(bmp);
                                bmp.dispose();
                                bmp = null;
                            }
                        }
                    }
                }
            }
            else {
            }
        }
    };
    BaseDice.prototype.checkHasBuff = function (diceId) {
        return this._buffList[diceId];
    };
    BaseDice.prototype.addBuff = function (buff) {
        if (!this._buffList[buff.diceId]) {
            this._buffList[buff.diceId] = buff;
            if (buff.atkspeed) {
                // this._data.changeAtkSpeed(buff.atkspeed,true);
                this.addBuffStatus(buff.diceId);
            }
            if (buff.crit) {
                this._data.changeCrit(buff.crit, true);
                this.addBuffStatus(buff.diceId);
            }
            if (buff.kill) {
                this._data.changeKill(buff.kill, true);
                this.addBuffStatus(buff.diceId);
            }
            if (buff.timespeed) {
                this._data.changeTimeSpeed(Math.abs(buff.timespeed), buff.timespeed > 0);
                this.addBuffStatus("418_" + (buff.timespeed > 0 ? 1 : 2));
            }
        }
    };
    BaseDice.prototype.removeBuff = function (diceId, pos) {
        var flag = false;
        if (this._buffList[diceId]) {
            var buff = this._buffList[diceId];
            if (pos) {
                if (buff.judgeFromPos(pos)) {
                    if (buff.crit) {
                        buff.crit -= (buff.crit / buff.overlap);
                        this._data.changeCrit(buff.crit, true);
                    }
                    if (buff.kill) {
                        buff.kill -= (buff.kill / buff.overlap);
                        this._data.changeKill(buff.kill, true);
                    }
                    buff.removeFromPos(pos);
                    if (buff.overlap == 1) {
                        flag = true;
                        this.removeBuffAddStatus(buff.diceId);
                        delete this._buffList[buff.diceId];
                    }
                    else {
                        buff.overlap -= 1;
                    }
                }
            }
            else {
                if (buff.atkspeed) {
                    buff.atkspeed -= (buff.atkspeed / buff.overlap);
                    // this._data.changeAtkSpeed(buff.atkspeed,false);
                }
                if (buff.crit) {
                    buff.crit -= (buff.crit / buff.overlap);
                    this._data.changeCrit(buff.crit, true);
                }
                if (buff.kill) {
                    buff.kill -= (buff.kill / buff.overlap);
                    this._data.changeKill(buff.kill, true);
                }
                if (buff.timespeed) {
                    if (buff.overlap == 1) {
                        this.removeBuffAddStatus(buff.diceId + "_" + (buff.timespeed > 0 ? 1 : 2));
                    }
                    this._data.changeTimeSpeed(Math.abs(buff.timespeed), buff.timespeed < 0);
                }
                if (buff.overlap == 1) {
                    flag = true;
                    this.removeBuffAddStatus(buff.diceId);
                    delete this._buffList[buff.diceId];
                }
                else {
                    buff.overlap -= 1;
                }
            }
        }
        return flag;
    };
    BaseDice.prototype.updateBuff = function (buff) {
        if (buff.atkspeed) {
            // this._data.changeAtkSpeed(buff.atkspeed,true);
        }
        if (buff.crit) {
            this._data.changeCrit(buff.crit, true);
        }
        if (buff.kill) {
            this._data.changeKill(buff.kill, true);
        }
        if (buff.timespeed) {
            this._data.changeTimeSpeed(Math.abs(buff.timespeed), buff.timespeed > 0);
        }
    };
    BaseDice.prototype.buffExec = function () {
        var keys = Object.keys(this._buffList);
        var l = keys.length;
        var atkspeed = 0;
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
                        if (buff.atkspeed) {
                            atkspeed += buff.atkspeed;
                        }
                        if (buff.timespeed) {
                            this._data.changeTimeSpeed(Math.abs(buff.timespeed), buff.timespeed > 0);
                        }
                    }
                }
            }
        }
        if (this._data) {
            this._data.changeAtkSpeed(atkspeed, true);
        }
    };
    //被沉默 什么都做不了的
    BaseDice.prototype.setSilence = function () {
        this._isSilence = true;
        if (!this._extraGroup.getChildByName("silence")) {
            var clip = ComponentMgr.getCustomMovieClip("dicesilence", null, 70);
            clip.anchorOffsetX = 240 / 2;
            clip.anchorOffsetY = 240 / 2;
            clip.y = -30;
            this._extraGroup.addChild(clip);
            clip.name = "silence";
            clip.playWithTime(-1);
            if (this.checkIsEffectAround()) {
                var x = this.getPos().x;
                var y = this.getPos().y;
                if (BattleStatus.scene) {
                    var list = BattleStatus.scene.getDiceList(this.checkIsMe());
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
                        if (dice_3 && Config.DiceCfg.checkHasNmAtk(dice_3.getDiceId())) {
                            dice_3.removeBuff(this.getDiceId(), x + "_" + y);
                        }
                    }
                }
            }
        }
        //加动画效果
        //this._mask.visible = true;
        // App.DisplayUtil.changeToGray(this);
    };
    BaseDice.prototype.removeSilence = function () {
        this._isSilence = false;
        var clip = this._extraGroup.getChildByName("silence");
        if (clip) {
            clip.alpha = 0;
            clip.dispose();
            clip = null;
        }
        if (this.checkIsEffectAround()) {
            var x = this.getPos().x;
            var y = this.getPos().y;
            if (BattleStatus.scene) {
                var list = BattleStatus.scene.getDiceList(this.checkIsMe());
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
                    var dice_4 = list[posx + "_" + posy];
                    if (dice_4 && Config.DiceCfg.checkHasNmAtk(dice_4.getDiceId())) {
                        dice_4.checkAtkBuff();
                    }
                }
            }
        }
        // this._mask.visible = false;
        // App.DisplayUtil.changeToNormal(this);
    };
    //骑士变化
    BaseDice.prototype.changeSelf = function () {
        if (BattleStatus.scene) {
            BattleStatus.scene.changeDice(this._data.isMe, BattleStatus.battleLogicHasTickTime / this.getDiceData().index + Api.BattleVoApi.getBattleData(this._data.isMe).uid, BattleStatus.frame, this._data.posStr, this._data.star);
        }
    };
    BaseDice.prototype.dispose = function () {
        this._extraGroup.removeChildren();
        this._data = null;
        this._targetList.length = 0;
        App.MsgHelper.removeEvt(MsgConst.DICE_MOVE_FORCOMPOSE, this.movein, this);
        // this._mask = null;
        this._extraGroup.dispose();
        App.ObjectUtil.clear(this._buffList);
        this._isSilence = false;
        this._starBmp = null;
        this._obs.length = 0;
        this.removeTouchTap();
        _super.prototype.dispose.call(this);
    };
    return BaseDice;
}(BaseDisplayObjectContainer));
__reflect(BaseDice.prototype, "BaseDice");
/**
 * 骰子绑定数据类
 * author 陈可
 * date 2020/4/23
 * @class DiceData
 */
var DiceData = (function (_super) {
    __extends(DiceData, _super);
    function DiceData() {
        var _this = _super.call(this) || this;
        _this.cost = 0;
        _this._star = 0;
        _this.initcd = 0;
        _this.cdTimeArr = [];
        _this.isMe = false;
        _this.crit = 0;
        _this.initcrit = 0;
        /**一击必杀概率 */
        _this.kill = 0;
        _this.initkill = 0;
        /**特殊技能发动的cd时间*/
        _this.special1cd = 0;
        _this.special2cd = 0;
        _this.special1cdTimeArr = [];
        _this.special2cdTimeArr = [];
        /**能量升级等级 */
        _this.pwlv = 1;
        /**骰子等级 */
        _this.lv = 1;
        /**攻击目标类型  1:前边  2：强敌  3：随机（纯随机）  4：随机（优先顺序）   */
        _this.target = 1;
        /**特性1 */
        _this.property1 = 0;
        /**特性2 */
        _this.property2 = 0;
        /**特性3 */
        _this.property3 = [];
        _this.isSun = false;
        _this.index = 0;
        return _this;
    }
    DiceData.prototype.initData = function (upinfo, pos, star) {
        var cfg = Config.DiceCfg.getCfgById(upinfo.id);
        this.id = upinfo.id;
        this.lv = upinfo.lv;
        this.pwlv = upinfo.pwlv;
        this.target = cfg.target;
        this.property3 = cfg.property3;
        this.isSun = false;
        if (!upinfo.pwlv) {
            upinfo.pwlv = 1;
        }
        if (pos) {
            this.posStr = pos;
            var posArr = pos.split("_");
            this.x = Number(posArr[0]);
            this.y = Number(posArr[1]);
        }
        var startStar = Number(egret.getOption("star")) || 1;
        this.star = (star || this.star || startStar);
        this.type = cfg.type;
        this.cd = cfg.getAtkSpeedByLv(this.lv) * 1000;
        this.initcd = this.cd;
        this.initdamage = cfg.getAtkByLv(this.lv);
        this.setDamage();
        this.crit = cfg.getTotalCritByLv(this.lv);
        this.initcrit = this.crit;
        this.kill = 0;
        this.initkill = 0;
        this.setCdTimeArr();
        this.setspecial1CdTimeArr();
        this.setspecial2CdTimeArr();
    };
    Object.defineProperty(DiceData.prototype, "star", {
        get: function () {
            return this._star;
        },
        set: function (_star) {
            if (this.isMe && _star > this._star && _star >= 3 && (!BattleStatus.changeDiceing)) {
                if (!BattleStatus.maxStarList[String(_star)]) {
                    BattleStatus.maxStarList[String(_star)] = 1;
                }
                else {
                    BattleStatus.maxStarList[String(_star)]++;
                }
            }
            this._star = _star;
        },
        enumerable: true,
        configurable: true
    });
    DiceData.prototype.setBirthTime = function (time) {
        this.birthTime = time;
        this.isMe ? ++BattleStatus.meDiceIndex : ++BattleStatus.targetDiceIndex;
        this.index = this.isMe ? BattleStatus.meDiceIndex : BattleStatus.targetDiceIndex;
        this.setCdTimeArr();
        this.setspecial1CdTimeArr();
        this.setspecial2CdTimeArr();
    };
    DiceData.prototype.checkExtDamage = function () {
        return Config.DiceCfg.checkHasExtAtk(String(this.id));
    };
    DiceData.prototype.getShowPos = function (isMe) {
        var startX = BattleStatus.getStartX(isMe);
        var startY = BattleStatus.getStartY(isMe);
        var vle = (BattleStatus.battleType == 1 && isMe) ? 1 : -1;
        if (BattleStatus.battleType == 1) {
            vle = isMe ? 1 : -1;
        }
        else if (BattleStatus.battleType == 2) {
            vle = 1;
        }
        var yle = isMe ? 1 : -1;
        var size = BattleStatus.getCeilSize();
        var x = startX + vle * this.x * size.w;
        var y = startY + yle * size.h * this.y;
        return { x: x, y: y };
    };
    DiceData.prototype.getDmgData = function () {
        var dmgData = null;
        if (Config.DiceCfg.checkHasNmAtk(String(this.id))) {
            var initInfo = Api.BattleVoApi.getInitInfo(this.isMe);
            var addCritScale = 0;
            var isCrit = false;
            if (this.checkCrit(initInfo.uid)) {
                isCrit = true;
                addCritScale = Math.max(0, (initInfo.crivalue - 100) / 100);
            }
            if (isCrit) {
                App.LogUtil.log(this.isMe, "使用暴击", addCritScale, this.damage * (1 + addCritScale));
            }
            dmgData = { dmg: this.damage * (1 + addCritScale), isCrit: isCrit };
        }
        return dmgData;
    };
    DiceData.prototype.setDamage = function () {
        var cfg = Config.DiceCfg.getCfgById(this.id);
        var pwadd = cfg.getPowerAtkByLv(this.pwlv);
        this.damage = this.initdamage + pwadd;
        this.property1 = cfg.getProperty1ByLv(this.lv) + cfg.getPowerProperty1ByLv(this.pwlv);
        this.property2 = cfg.getProperty2ByLv(this.lv) + cfg.getPowerProperty2ByLv(this.pwlv);
    };
    DiceData.prototype.powerup = function (pwlv) {
        this.pwlv = pwlv;
        this.setDamage();
    };
    DiceData.prototype.checkCrit = function (uid) {
        var crit = this.crit;
        var randomvalue = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.index));
        return randomvalue > 0 && randomvalue <= crit;
    };
    //一击必杀概率
    DiceData.prototype.checkIsKill = function (uid) {
        var kill = this.kill;
        var randomvalue = App.MathUtil.seededRandom(0, 1, BattleStatus.battleLogicHasTickTime / (this.index));
        return randomvalue > 0 && randomvalue <= kill;
    };
    //被暗杀 降低星星
    DiceData.prototype.bekilled = function (pvp) {
        if (pvp) {
            if (this.star > 1) {
                this.star -= 1;
            }
        }
        else {
            if (!this.checkMaxStar()) {
                this.star += 1;
            }
        }
        this.birthTime = BattleStatus.battleLogicHasTickTime;
        this.setCdTimeArr();
    };
    DiceData.prototype.setCdTimeArr = function (time) {
        if (!time) {
            time = this.birthTime;
        }
        var star = this.star;
        if (this.id == "414") {
            star = 1;
        }
        this.cdTimeArr = BattleStatus.formatCdPartTime(this.cd, time, star);
    };
    DiceData.prototype.setspecial1CdTimeArr = function (time) {
        if (!time) {
            time = this.birthTime;
        }
        if (this.special1cd) {
            this.special1cdTimeArr = BattleStatus.formatCdPartTime(this.special1cd, time);
        }
    };
    DiceData.prototype.setspecial2CdTimeArr = function (time) {
        if (!time) {
            time = this.birthTime;
        }
        if (this.special2cd) {
            this.special2cdTimeArr = BattleStatus.formatCdPartTime(this.special2cd, time);
        }
    };
    DiceData.prototype.setPos = function (x, y) {
        this.x = x;
        this.y = y;
        this.posStr = this.x + "_" + this.y;
        // this.cdTimeArr=[];
        // this.special1cdTimeArr=[];
        // this.special2cdTimeArr=[];
    };
    /**
     * 改变攻击速度
     * @param speedScale 倍数
     * @param isAdd 是否是加速
     */
    DiceData.prototype.changeAtkSpeed = function (speedScale, isAdd) {
        var tmpSpeed = 0;
        if (isAdd) {
            tmpSpeed = this.initcd / (speedScale + 1); //this.cd - this.initcd / speedScale * (speedScale - 1);
        }
        else {
            tmpSpeed = this.cd * (speedScale + 1);
        }
        var cd = Math.min(this.initcd, Math.max(Math.ceil(tmpSpeed / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame, Config.GamebaseCfg.maxAtkSpeed * 1000));
        if (cd !== this.cd) {
            this.cd = cd;
            this.setCdTimeArr();
        }
        // this._speedScale=Math.min(Config.GamebaseCfg.maxDeSpeed,speedScale);
        //     // this.speed=this._initSpeed*(1-this._speedScale)**BattleStatus.logicScale;
        //     this.speed=(this._initSpeed+Math.floor(this.moveDis/this._initSpeed)*this._addSpeed)*(1-this._speedScale)*BattleStatus.logicScale;
    };
    /**
    * 改变暴击
    * @param speedScale 百分比
    * @param isAdd 是否是加速
    */
    DiceData.prototype.changeCrit = function (speedScale, isAdd) {
        var crit = 0;
        var cfg = Config.DiceCfg.getCfgById(this.id);
        if (isAdd) {
            crit = this.initcrit + speedScale;
        }
        else {
            crit = this.initcrit - speedScale;
        }
        this.crit = crit;
    };
    /**
     * 改变一击必杀
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    DiceData.prototype.changeKill = function (kill, isAdd) {
        var tmpkill = 0;
        if (isAdd) {
            tmpkill = this.initkill + kill;
        }
        else {
            tmpkill = this.initkill - kill;
        }
        this.kill = tmpkill;
    };
    DiceData.prototype.rebackSpeed = function (speed, isAdd) {
        var tmpSpeed = 0;
        if (isAdd) {
            tmpSpeed = this.cd - this.initcd * Math.abs(speed);
            //tmpSpeed = this.initcd / (1 + speed);
        }
        else {
            tmpSpeed = this.cd + this.initcd * Math.abs(speed);
        }
        this.cd = Math.max(Math.ceil(tmpSpeed / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame, BattleStatus.minLogicFrame);
    };
    /**
     * 改变特殊cd
     * @param speedScale 百分比
     * @param isAdd 是否是加速
     */
    DiceData.prototype.changeTimeSpeed = function (speed, isadd, isinit) {
        if (isinit === void 0) { isinit = false; }
        var tmpSpeed = 0;
        if (isadd) {
            tmpSpeed = isinit ? this.initcd : this.cd - this.initcd * speed;
            //tmpSpeed = this.initcd / (1 + speed);
        }
        else {
            tmpSpeed = isinit ? this.initcd : this.cd + this.initcd * speed;
        }
        this.cd = Math.max(Math.ceil(tmpSpeed / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame, BattleStatus.minLogicFrame);
        this.setCdTimeArr();
    };
    //是否是适应骰子
    DiceData.prototype.checkIsAdapt = function () {
        return Number(this.id) == 307;
    };
    //是否是小丑镜像骰子
    DiceData.prototype.checkIsMirror = function () {
        return Number(this.id) == 404;
    };
    //是否是祭品骰子
    DiceData.prototype.checkIsAddSp = function () {
        return Number(this.id) == 207;
    };
    //是否是刺杀骰子
    DiceData.prototype.checkIsKillDice = function () {
        return Number(this.id) == 412;
    };
    //是否是核爆骰子
    DiceData.prototype.checkIsNuclearDice = function () {
        return Number(this.id) == 401;
    };
    //是否是可以组合搭配的骰子
    DiceData.prototype.checkCanComposeAny = function (id) {
        var arr = [307, 404, 416, 305];
        return arr.indexOf(Number(id)) > -1;
    };
    //是否是齿轮拼接
    DiceData.prototype.checkIsGearDice = function () {
        return Number(this.id) == 306;
    };
    //是否是会心骰子
    DiceData.prototype.checkIsCritDice = function () {
        return Number(this.id) == 205;
    };
    //是否是地狱骰子
    DiceData.prototype.checkIsDevilDice = function () {
        return Number(this.id) == 406;
    };
    //是否是祷告骰子
    DiceData.prototype.checkIsAtkSpeedDice = function () {
        return Number(this.id) == 202;
    };
    //是否是枪械
    DiceData.prototype.checkIsGunDice = function () {
        return Number(this.id) == 414;
    };
    //是否是换位
    DiceData.prototype.checkIsChangePosDice = function () {
        return Number(this.id) == 305;
    };
    //是否是召唤
    DiceData.prototype.checkIsSummonDice = function () {
        return Number(this.id) == 410;
    };
    //是否是营养
    DiceData.prototype.checkIsNutritionDice = function () {
        return Number(this.id) == 416;
    };
    //是否是太阳
    DiceData.prototype.checkIsSunDice = function () {
        return Number(this.id) == 411;
    };
    //是否是转移骰子
    DiceData.prototype.checkIsTransferDice = function () {
        return Number(this.id) == 417;
    };
    DiceData.prototype.checkMaxStar = function () {
        return this.star >= Config.DiceCfg.maxStar;
    };
    DiceData.prototype.getDiceIsChangeSun = function () {
        return this.isSun;
    };
    DiceData.prototype.setDiceIsChangeSun = function (bool) {
        this.isSun = bool;
    };
    DiceData.prototype.dispose = function () {
    };
    return DiceData;
}(egret.HashObject));
__reflect(DiceData.prototype, "DiceData");
//# sourceMappingURL=BaseDice.js.map