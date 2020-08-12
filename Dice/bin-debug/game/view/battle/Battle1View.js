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
 * 对战模式
 * author 陈可
 * date 2020/4/23
 * @class Battle1View
 */
var Battle1View = (function (_super) {
    __extends(Battle1View, _super);
    function Battle1View() {
        var _this = _super.call(this) || this;
        _this._curBgSound = "";
        _this._timeIcon = null;
        _this._enermyHpGroup = null;
        return _this;
    }
    Battle1View.prototype.initView = function () {
        this.name = "Battle1View";
        var limitPosCfg = BattleStatus.getLimitPos();
        var centerY = BattleStatus.battleCenterY[1];
        var spaceY = BattleStatus.lineSize.pve.space;
        var lineName = "battle_line1";
        // let bg=BaseBitmap.create(lineName);
        // bg.width=278;
        // bg.height=362;
        // bg.x=GameConfig.stageWidth*0.5-bg.width;
        // bg.y=centerY-spaceY;
        // bg.scaleY=-1;
        // this.addChild(bg);
        // bg=BaseBitmap.create(lineName);
        // bg.width=278;
        // bg.height=362;
        // bg.scaleY=-1;
        // bg.scaleX=-1;
        // bg.x=bg.width+GameConfig.stageWidth*0.5;//-bg.width;
        // bg.y=centerY-spaceY;
        // this.addChild(bg);
        // let bg2=BaseBitmap.create(lineName);
        // bg2.width=bg.width;
        // bg2.height=bg.height;
        // bg2.x=GameConfig.stageWidth*0.5-bg2.width;
        // bg2.y=centerY+spaceY;
        // this.addChild(bg2);
        // bg2=BaseBitmap.create(lineName);
        // bg2.width=bg.width;
        // bg2.height=bg.height;
        // bg2.scaleX=-1;
        // bg2.x=GameConfig.stageWidth*0.5+bg2.width;
        // bg2.y=centerY+spaceY;
        // this.addChild(bg2);
        var timeBg = BaseBitmap.create("battle_time_bg");
        // timeBg.anchorOffsetX = timeBg.width;
        // timeBg.anchorOffsetY = timeBg.height / 2;
        // // timeBg.width = 640;
        // timeBg.height = 45;
        timeBg.setPosition(0, centerY - timeBg.height / 2);
        this.addChild(timeBg);
        // let timeBg2=BaseBitmap.create("battle_time_bg");
        // timeBg2.anchorOffsetX = timeBg2.width;
        // timeBg2.anchorOffsetY = timeBg2.height / 2;
        // timeBg2.rotation = 180;
        // timeBg2.setPosition(GameConfig.stageWidth / 2, centerY);
        // this.addChild(timeBg2);
        //battle_pvp_boss_icon_1
        var timeIcon = BaseBitmap.create("battle_time_icon");
        timeIcon.setPosition(GameConfig.stageWidth * 0.5 - 180, centerY - timeIcon.height * 0.5);
        this.addChild(timeIcon);
        this._timeIcon = timeIcon;
        var timeTxt = ComponentMgr.getTextField(LangMger.getlocal("leftTimeDesc") + App.DateUtil.getFormatBySecond(Config.BattleCfg.getbtTimeByRound(BattleStatus.round)), TextFieldConst.SIZE_28, ColorEnums.white, false);
        this._timeTxt = timeTxt;
        timeTxt.setPosition(timeIcon.x + timeIcon.width + 10, timeIcon.y + (timeIcon.height - timeTxt.height) * 0.5);
        this.addChild(timeTxt);
        // let topDiceBg:BaseBitmap=BaseBitmap.create("battle_dice_bg");
        // topDiceBg.setPosition((GameConfig.stageWidth-topDiceBg.width)*0.5,centerY-topDiceBg.height-spaceY-50);
        // this.addChild(topDiceBg);
        // this.topDiceBg=topDiceBg;
        // let buttomDiceBg=BaseBitmap.create("battle_dice_bg");
        // buttomDiceBg.setPosition((GameConfig.stageWidth-buttomDiceBg.width)*0.5,centerY+spaceY+50);
        // this.addChild(buttomDiceBg);
        this.topDiceBgX = 107;
        this.topDiceBgY = 80;
        var endDeep = BattleStatus.endDeep;
        var btEnd = BaseBitmap.create("battle_targetend1");
        var pos = limitPosCfg.target.pos3;
        btEnd.setPosition(pos.x - btEnd.width * 0.5, pos.y - endDeep); //-diceSize.height*0.5);
        this.addChild(btEnd);
        //敌方生命值
        var enermyGroup = this.createHpGroup();
        this.addChild(enermyGroup);
        enermyGroup.name = "enermyHpGroup";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, enermyGroup, btEnd, [10, -25]);
        enermyGroup.y = centerY - 35;
        this._enermyHpGroup = enermyGroup;
        btEnd = BaseBitmap.create("battle_end");
        pos = limitPosCfg.me.pos3;
        btEnd.setPosition(pos.x - btEnd.width * 0.5, pos.y - btEnd.height + endDeep); //+diceSize.height*0.5);
        this.addChild(btEnd);
        //我方生命值
        var myGroup = this.createHpGroup();
        this.addChild(myGroup);
        myGroup.name = "myHpGroup";
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, myGroup, btEnd, [-10, -5]);
        myGroup.y = centerY;
        var confessBtn = ComponentMgr.getButton("btn_battle_confess", "", this.confessHandler, this);
        confessBtn.setPosition(timeTxt.x + timeTxt.textWidth + 20, timeIcon.y + (timeIcon.height - confessBtn.height) * 0.5);
        this.addChild(confessBtn);
        confessBtn.visible = !Api.GameinfoVoApi.getIsGuiding();
        this._curBgSound = "";
        SoundMgr.stopBgByName("music_ready");
        _super.prototype.initView.call(this);
    };
    Battle1View.prototype.getResourceList = function () {
        var resArr = ["selectrandomboss"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    Battle1View.prototype.createHpGroup = function () {
        var view = this;
        var hpGroup = new BaseDisplayObjectContainer();
        var bg = BaseBitmap.create("battle_hpbg");
        hpGroup.addChild(bg);
        for (var i = 1; i <= 3; ++i) {
            var hp = BaseBitmap.create("battle_hp");
            hp.name = "hp" + i;
            hpGroup.addChild(hp);
            hp.setPosition(6 + (i - 1) * (hp.width + 6), (bg.height - hp.height) * 0.5);
        }
        return hpGroup;
    };
    Battle1View.prototype.showHpMovie = function (isme, isboss) {
        var view = this;
        if (isme) {
            SoundMgr.playEffect(SoundConst.EFFECT_LIFE);
        }
        var group = view.getChildByName(isme ? "myHpGroup" : "enermyHpGroup");
        var now = BattleStatus.getBattleValue(isme).l;
        if (App.CommonUtil.check_dragon()) {
            var db_1 = view.getChildByName("smsd" + (isme ? 1 : 2));
            if (!db_1) {
                db_1 = App.DragonBonesUtil.getLoadDragonBones("royalpass_smsd", 1);
                view.addChild(db_1);
                db_1.name = "smsd" + (isme ? 1 : 2);
                db_1.setPosition(group.x + group.width / 2, group.y + 10);
                db_1.setDragonBoneEventListener(dragonBones.EventObject.COMPLETE, function (evt) {
                    db_1.dispose();
                    db_1 = null;
                }, view);
            }
        }
        var min = now - 1;
        if (isboss) {
            min = Math.max(now - 2, 0);
        }
        var _loop_1 = function (i) {
            var hp = group.getChildByName("hp" + i);
            var line = BaseBitmap.create("battle_fx_xt");
            line.anchorOffsetX = line.width / 2;
            line.anchorOffsetY = line.height / 2;
            line.rotation = 30;
            if (isme) {
                if (hp) {
                    group.addChild(line);
                    line.setPosition(hp.x + hp.width + line.anchorOffsetX, hp.y - line.anchorOffsetY);
                    egret.Tween.get(line).to({ x: hp.x + hp.width / 2, y: hp.y + hp.height / 2 }, 150).call(function () {
                        App.DisplayUtil.changeToGray(hp);
                        egret.Tween.removeTweens(line);
                    }, view);
                }
                if (view._isPlaying) {
                }
                else {
                    view._isPlaying = true;
                    var kuang_1 = BaseBitmap.create("battle_fx_bk");
                    kuang_1.anchorOffsetX = kuang_1.width / 2;
                    kuang_1.anchorOffsetY = kuang_1.height / 2;
                    kuang_1.setPosition(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2);
                    kuang_1.setScale(2);
                    kuang_1.alpha = 0;
                    this_1.addChild(kuang_1);
                    var time = BattleStatus.timeparam;
                    egret.Tween.get(kuang_1).to({ alpha: 1 }, 5 * time).to({ alpha: 0 }, 20 * time).call(function () {
                        kuang_1.dispose();
                        kuang_1 = null;
                    }, view);
                }
            }
            else {
                if (hp) {
                    group.addChild(line);
                    App.DisplayUtil.changeToGray(hp);
                    // line.setPosition(hp.x + hp.width / 2, hp.y + hp.height / 2);
                    line.setPosition(hp.x + hp.width + line.anchorOffsetX, hp.y - line.anchorOffsetY);
                    egret.Tween.get(line).to({ x: hp.x + hp.width / 2, y: hp.y + hp.height / 2 }, 150).call(function () {
                        App.DisplayUtil.changeToGray(hp);
                        egret.Tween.removeTweens(line);
                    }, view);
                }
            }
        };
        var this_1 = this;
        for (var i = now; i > min; --i) {
            _loop_1(i);
        }
    };
    Battle1View.prototype.confessHandler = function (e) {
        if (BattleStatus.startBattleTime > 0) {
            ViewController.getInstance().openView(ViewConst.CONFIRMPOPUPVIEW, {
                title: LangMger.getlocal("confess_btn"),
                msg: LangMger.getlocal("confess_desc"),
                handler: this,
                needCancel: true,
                callback: function () {
                    NetManager.request(NetConst.BATTLE_OPT, { opt: 4 });
                }
            });
        }
    };
    Battle1View.prototype.monsterMoveHandler = function (monsterData) {
        var isMe = monsterData.isMe;
        switch (monsterData.moveStatus) {
            case MonsterMoveStatus.END:
                BattleStatus.battleCheckCount(isMe, "l");
                if (monsterData.getIsBoss()) {
                    BattleStatus.battleCheckCount(isMe, "l");
                }
                break;
            default:
                break;
        }
    };
    Battle1View.prototype.logicCustomTick = function () {
        _super.prototype.logicCustomTick.call(this);
        var roundTotalTime = Config.BattleCfg.getbtTimeByRound(BattleStatus.round) * 1000;
        var btTime = (roundTotalTime + BattleStatus.getRoundStartT());
        var leftTime = btTime - BattleStatus.battleLogicHasTickTime;
        if (leftTime % 1000 == 0 && leftTime >= 0 && leftTime <= roundTotalTime) {
            this._timeTxt && (this._timeTxt.setString(LangMger.getlocal("leftTimeDesc") + App.DateUtil.getFormatBySecond(leftTime / 1000)));
        }
    };
    Battle1View.prototype.chatHandler = function () {
        SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
        if (!this.chatList) {
            var view_1 = this;
            this.chatList = new ChatView();
            this.chatList.init();
            this.chatList.setExpBg("chatview_exp_bg3");
            this.chatList.setExpListXY(30, 173);
            this.chatList.itemCB = function () {
                view_1._chatIcon.touchEnabled = false;
            };
        }
        this.addChild(this.chatList);
    };
    Battle1View.prototype.displayChatDB = function (opt, isMe) {
        var view = this;
        if (isMe) {
            if (this.chatDB == null) {
                this.chatDB = new ChatDBDisplay();
                this.chatDB.init(1, function () {
                    view._chatIcon.touchEnabled = true;
                });
                this.addChild(this.chatDB);
                this.chatDB.width = 98;
                this.chatDB.height = 108;
                this.chatDB.x = 89;
                this.chatDB.y = GameConfig.stageHeigth - 300;
            }
            this.addChild(this.chatDB);
            // this.chatDB.visible = true;
            this.chatDB.displayDB(opt["upId"]);
        }
        else if (!this.forbidChat) {
            if (this.chatDBother == null) {
                this.chatDBother = new ChatDBDisplay();
                this.chatDBother.init(2);
                this.addChild(this.chatDBother);
                this.chatDBother.width = 98;
                this.chatDBother.height = 108;
                this.chatDBother.x = GameConfig.stageWidth - 168;
                this.chatDBother.y = 33;
            }
            this.addChild(this.chatDBother);
            // this.chatDBother.visible = true;
            this.chatDBother.displayDB(opt["upId"]);
        }
    };
    Battle1View.prototype.playRoundEffect = function (showStr, callback, thisObj) {
        var _this = this;
        var keys = Config.MonsterCfg.getBossKeys();
        var seed = Api.BattleVoApi.getBattleData(true).uid + Api.BattleVoApi.getBattleData(false).uid + BattleStatus.randSeed;
        var rid = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + seed));
        var bossid = keys[rid];
        if (egret.getOption("boss")) {
            bossid = String(egret.getOption("boss"));
        }
        this.curRoundBossId = bossid;
        if (Api.GameinfoVoApi.getIsGuiding()) {
            this._curBgSound = "music_battle";
            _super.prototype.playRoundEffect.call(this, showStr, callback, thisObj);
        }
        else {
            if (showStr == LangMger.getlocal("battlestart")) {
                if (!this._startGameBg) {
                    var startGameBg = BaseBitmap.create("battle_time_prepare");
                    startGameBg.height = 404;
                    startGameBg.anchorOffsetX = startGameBg.width / 2;
                    startGameBg.anchorOffsetY = startGameBg.height / 2;
                    this.addChild(startGameBg);
                    this._startGameBg = startGameBg;
                    startGameBg.x = GameConfig.stageWidth / 2;
                    startGameBg.y = BattleStatus.battleCenterY[BattleStatus.battleType] - 5;
                    var startGameTxt = ComponentMgr.getTextField(showStr, 50, ColorEnums.white, false);
                    startGameTxt.anchorOffsetX = startGameTxt.width / 2;
                    startGameTxt.anchorOffsetY = startGameTxt.height / 2;
                    this.addChild(startGameTxt);
                    this._startGameTxt = startGameTxt;
                    startGameTxt.x = startGameBg.x;
                    startGameTxt.y = startGameBg.y;
                    startGameTxt.mask = new egret.Rectangle(0, -15, startGameTxt.width, 0);
                    // startGameBg.alpha = 0;
                }
                //播放动画
                var timeparam = BattleStatus.timeparam;
                egret.Tween.get(this._startGameTxt.mask, { onChangeObj: this, onChange: function () {
                        if (_this._startGameTxt && _this._startGameTxt.mask) {
                            var rect = _this._startGameTxt.mask;
                            rect.y = (_this._startGameTxt.height - _this._startGameTxt.mask.height) / 2;
                            _this._startGameTxt.mask = rect; //兼容原生遮罩用法
                        }
                    } }).to({ height: this._startGameTxt.height + 10 }, 5 * timeparam).wait(35 * timeparam).to({ height: 0 }, 6 * timeparam).call(function () {
                    egret.Tween.removeTweens(_this._startGameTxt.mask);
                    _this.removeChild(_this._startGameTxt);
                }, this);
                this._startGameBg.scaleY = 0;
                this._startGameBg.alpha = 0.7;
                egret.Tween.get(this._startGameBg).to({ scaleY: 0.8 }, 10 * timeparam).to({ scaleY: 1 }, 5 * timeparam).wait(15 * timeparam).call(function () {
                    ViewController.getInstance().openView(ViewConst.SELECTBOSSPOPUPVIEW, {
                        isFrist: 1,
                        id: bossid,
                        callback: function () {
                            if (callback) {
                                callback.apply(thisObj);
                            }
                            BattleStatus.isInRound = false;
                            _this._curBgSound = "music_battle" + (BattleStatus.round % 2 == 0 ? "" : "_2");
                            _this.playBg();
                            _this._timeIcon.setRes("battle_pvp_boss_icon_" + (rid + 1));
                            _this._timeIcon.setPosition(GameConfig.stageWidth * 0.5 - 190, BattleStatus.battleCenterY[1] - _this._timeIcon.height * 0.5);
                        },
                        handler: _this
                    });
                }, this).to({ scaleY: 0 }, 20 * timeparam).call(function () {
                    egret.Tween.removeTweens(_this._startGameBg);
                    _this.removeChild(_this._startGameBg);
                }, this);
            }
            else {
                ViewController.getInstance().openView(ViewConst.SELECTBOSSPOPUPVIEW, {
                    id: bossid,
                    callback: function () {
                        if (callback) {
                            callback.apply(thisObj);
                        }
                        BattleStatus.isInRound = false;
                        _this._curBgSound = "music_battle" + (BattleStatus.round % 2 == 0 ? "" : "_2");
                        _this.playBg();
                        _this._timeIcon.setRes("battle_pvp_boss_icon_" + (rid + 1));
                        _this._timeIcon.setPosition(GameConfig.stageWidth * 0.5 - 190, BattleStatus.battleCenterY[1] - _this._timeIcon.height * 0.5);
                    },
                    handler: this
                });
            }
        }
    };
    // protected checkBattleResult():boolean
    // {
    //     let result=false;
    //     if(BattleStatus.checkBattleResult())
    //     {
    //         this.battleSync(1);
    //         this.sendBattleEnd();
    //         result=true;
    //     }
    //     return result;
    // }
    //选择boss
    // protected checkBattleResult():boolean
    // {
    //     let result=false;
    //     if(this._isRound){
    //         return result;
    //     }
    //     if(BattleStatus.checkEnd()){
    //         return super.checkBattleResult(); 
    //     }
    //     else{
    //         if(BattleStatus.checkNextRound()){
    //             //要出boss了
    //             this._isRound = true;
    //             if(!BattleStatus.isBoss){
    //                 //有一段特效 boss_icon_1001
    //                 // this.showBossTween(true);
    //                 // this.showBossTween(false);
    //                 // return false;
    //                 return super.checkBattleResult();
    //             }
    //             else{
    //                 // this.battlePause();
    //                 SoundMgr.stopBg();
    //                 this._isRound = true;
    //                 this.playRoundEffect(``, ()=>{
    //                     // this.battleResume();
    //                     return super.checkBattleResult();
    //                 }, this);   
    //             }
    //         }
    //         else{
    //             return super.checkBattleResult(); 
    //         }
    //     }
    // }
    Battle1View.prototype.playBossRoundEffect = function () {
        SoundMgr.stopBg();
        this.playRoundEffect("", function () {
        }, this);
    };
    Battle1View.prototype.showBossTween = function (isMe, hp) {
        var _this = this;
        var MonsterList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var MossterData = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        var keys = Object.keys(MonsterList);
        var posAllCfg = BattleStatus.getLimitPos();
        var posCfg = isMe ? posAllCfg.me : posAllCfg.target;
        var _a = GameConfig.monsterSize[4], w = _a.w, h = _a.h;
        var offPos = Math.min(w, h) * 0.5 * 0.8 * (isMe ? 1 : -1);
        var dis = isMe ? 0 : -100;
        var endY = posCfg.pos1.y;
        if (keys.length) {
            var _loop_2 = function (i) {
                var key = keys[i];
                if (MonsterList.hasOwnProperty(key)) {
                    var monster = MonsterList[key];
                    egret.Tween.get(monster).to({ x: GameConfig.stageWidth / 2, y: endY }, 1100).call(function () {
                        if (i == keys.length - 1) {
                            for (var j = 0; j < keys.length; ++j) {
                                var tmp = MonsterList[keys[j]];
                                egret.Tween.get(tmp).to({ alpha: 0 }, 300);
                            }
                            var voclassObj = egret.getDefinitionByName("Boss" + _this.curRoundBossId + "Vo");
                            var bossvo = new voclassObj();
                            bossvo.birthTime = 0;
                            bossvo.hp = Config.BattleCfg.getBossHp(BattleStatus.round, hp); //todo;//todo
                            bossvo.initData(Config.MonsterCfg.getBossCfgById(String(_this.curRoundBossId)));
                            var classObj = egret.getDefinitionByName("Boss" + _this.curRoundBossId);
                            //  let boss = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                            //  boss.anchorOffsetX = 204 / 2;
                            //  boss.anchorOffsetY = 168 / 2;
                            var boss_1 = new classObj(bossvo, isMe, true);
                            _this.addChild(boss_1);
                            boss_1.setPosition(GameConfig.stageWidth / 2, endY);
                            boss_1.setScale(0);
                            boss_1.alpha = 0;
                            var stPos = posCfg["pos0"];
                            egret.Tween.get(boss_1).wait(500).call(function () {
                                boss_1.setHp();
                            }, _this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500).call(function () {
                                boss_1.hpTxtTween();
                                for (var j = 0; j < keys.length; ++j) {
                                    var tmp = MonsterList[keys[j]];
                                    tmp.dispose();
                                    delete MonsterList[keys[j]];
                                }
                                MossterData.length = 0;
                            }, _this).wait(500).to({ x: stPos.x, y: stPos.y + offPos }, 1100).call(function () {
                                boss_1.alpha = 0;
                                boss_1.dispose();
                                boss_1 = null;
                                if (isMe) {
                                    BattleStatus.isInRound = false;
                                    _super.prototype.checkBattleResult.call(_this);
                                }
                            }, _this);
                            // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                            // bossicon.anchorOffsetX = 204 / 2;
                            // bossicon.anchorOffsetY = 168 / 2;
                        }
                    }, this_2);
                }
            };
            var this_2 = this;
            for (var i = 0; i < keys.length; ++i) {
                _loop_2(i);
            }
        }
        else {
            if (1) {
                // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                // bossicon.anchorOffsetX = 204 / 2;
                // bossicon.anchorOffsetY = 168 / 2;
                // this.addChild(bossicon);
                // bossicon.setPosition(GameConfig.stageWidth / 2, endY);
                // bossicon.setScale(0);
                // bossicon.alpha = 0;
                var voclassObj = egret.getDefinitionByName("Boss" + this.curRoundBossId + "Vo");
                var bossvo = new voclassObj();
                bossvo.birthTime = 0;
                bossvo.hp = Config.BattleCfg.getBossHp(BattleStatus.round, hp); //todo
                bossvo.initData(Config.MonsterCfg.getBossCfgById(String(this.curRoundBossId)));
                var classObj = egret.getDefinitionByName("Boss" + this.curRoundBossId);
                var boss_2 = new classObj(bossvo, isMe, true);
                // let boss = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
                // boss.anchorOffsetX = 204 / 2;
                // boss.anchorOffsetY = 168 / 2;
                //let boss = new classObj(bossvo, true);
                this.addChild(boss_2);
                boss_2.setPosition(GameConfig.stageWidth / 2, endY);
                boss_2.setScale(0);
                boss_2.alpha = 0;
                var stPos = posCfg["pos0"];
                egret.Tween.get(boss_2).wait(1600).call(function () {
                    boss_2.setHp();
                }, this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 500).call(function () {
                    boss_2.hpTxtTween();
                }, this).wait(500).to({ x: stPos.x, y: stPos.y + offPos }, 1100).call(function () {
                    boss_2.alpha = 0;
                    boss_2.dispose();
                    boss_2 = null;
                    if (isMe) {
                        BattleStatus.isInRound = false;
                        _super.prototype.checkBattleResult.call(_this);
                    }
                }, this);
            }
            // let keys = Object.keys(newRoundData);
            // for (let i = 0; i < keys.length; i++)
            // {
            //     const vo = newRoundData[keys[i]][0];
            //     if(vo.getIsBoss()){
            //         let boss=this.createMonster(vo,isMe);
            //         monsterList[boss.name]=boss;
            //         // monsterDataList.push(vo);
            //         boss.setPosition(GameConfig.stageWidth / 2, endY);
            //         boss.setScale(0);
            //         boss.alpha = 0;
            //         let stPos:{x:number,y:number}=posCfg["pos0"];
            //         egret.Tween.get(boss).wait(1600).to({scaleX : 1, scaleY : 1, alpha : 1}, 500).wait(500).to({x : stPos.x, y : stPos.y + offPos}, 1100).call(()=>{
            //             if(isMe){
            //                 super.checkBattleResult();
            //                 this._isRound = false;
            //             }
            //         }, this);
            //     }
            // }
            //}
            // let bossicon = BaseLoadBitmap.create(`boss_icon_${this.curRoundBossId}`);
            // bossicon.anchorOffsetX = 204 / 2;
            // bossicon.anchorOffsetY = 168 / 2;
        }
    };
    // protected checkAndCreateMonster(isMe:boolean):void
    // {
    //     // let hasCreateNum=isMe?BattleStatus.hasCreateMonsterNum.me:BattleStatus.hasCreateMonsterNum.target;
    //     // if(hasCreateNum<BattleStatus.monsterNum)
    //     // {
    //         let newRoundData=isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
    //         let newMonsterList = newRoundData[String(BattleStatus.battleLogicHasTickTime-BattleStatus.getRoundStartT())];
    //         let monsterList:{[key:string]:BaseMonster}=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
    //         let monsterDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
    //         if(newMonsterList)
    //         {
    //             let l=newMonsterList.length;
    //             for (let i = 0; i < l; i++)
    //             {
    //                 const vo:MonsterVo = newMonsterList[i];
    //                 let monster=this.createMonster(vo,isMe);
    //                 monsterList[monster.name]=monster;
    //                 monsterDataList.push(vo);
    //             }
    //         }
    //     // }
    // }
    //为对手生成hp很高的怪物
    Battle1View.prototype.transferEnermy = function (isMe, star) {
        var averageLv = Api.BattleVoApi.getLvValue();
        var cfg = BattleStatus.getLastType1MsCfg(isMe);
        if (cfg) {
            var enemyVo = new MonsterVo();
            var bt = BattleStatus.battleLogicHasTickTime - BattleStatus.getRoundStartT() + Api.BattleVoApi.getAddMonsterDelay();
            enemyVo.birthTime = bt;
            enemyVo.hp = cfg.getHpByLv(averageLv) * (1 + 3) * star;
            enemyVo.isMe = !isMe;
            enemyVo.isEnemy = true;
            enemyVo.initData(cfg);
            var roundList = isMe ? BattleStatus.targetBatteRoundDataList : BattleStatus.meBatteRoundDataList;
            var voArr = roundList[bt];
            if (voArr) {
                voArr.push(enemyVo);
            }
            else {
                roundList[bt] = [enemyVo];
            }
            if (isMe) {
                BattleStatus.totalMonsterNum.target++;
            }
            else {
                BattleStatus.totalMonsterNum.me++;
            }
        }
    };
    Battle1View.prototype.isInRound = function () {
        return BattleStatus.isInRound;
    };
    Battle1View.prototype.showBossMovie = function () {
        var view = this;
    };
    Battle1View.prototype.getSoundBgName = function () {
        return this._curBgSound;
    };
    Battle1View.prototype.dispose = function () {
        this._timeTxt = null;
        this._isPlaying = false;
        this._curBgSound = "";
        var confirmview = ViewController.getInstance().getView(ViewConst.CONFIRMPOPUPVIEW);
        if (confirmview) {
            confirmview.hide();
        }
        this._timeIcon = null;
        this._enermyHpGroup = null;
        _super.prototype.dispose.call(this);
    };
    return Battle1View;
}(BattleView));
__reflect(Battle1View.prototype, "Battle1View");
//# sourceMappingURL=Battle1View.js.map