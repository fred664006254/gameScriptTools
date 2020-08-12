var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BattleView = /** @class */ (function (_super) {
    __extends(BattleView, _super);
    /**机器人水平等级 初级 中级 高级
     * 场上最多x个怪
     * 只会召唤
     * 只会召唤+合并
     * 只会召唤+合并+增幅
     * 数值控制
     **/
    function BattleView() {
        var _this = _super.call(this) || this;
        _this._count = -1;
        _this._leftT = 0;
        _this._meDiceList = {}; //己方骰子显示对象列表
        _this._meDiceDataList = {}; //己方骰子数据列表
        _this._mePreDiceList = {}; //己方预处理骰子显示对象列表
        _this._mePreDiceDataList = {}; //己方预处理骰子数据列表
        _this._targetDiceList = {}; //敌方骰子显示对象列表
        _this._targetDiceDataList = {}; //敌方筛子数据列表
        _this.pingData = {};
        _this.slowPingData = { num: 0, slow: {} };
        _this._clientWaitOptList = {};
        _this.chatList = null;
        _this.chatDB = null;
        _this.chatDBother = null;
        _this.forbidChat = false;
        _this._initCount = -1;
        _this.fb = null;
        _this.enemyLvs = {};
        _this.enemyLvsIcon = {};
        // 协同和对战位置不一样的元素
        _this._chatIcon = null;
        _this._startBattleT = 0;
        _this.topDiceBgY = 0;
        _this.topDiceBgX = 0;
        _this._startGameBg = null;
        _this._startGameTxt = null;
        _this._killpos = [];
        _this._nuclearpos = [];
        _this._damagepos = [];
        _this._guidepos = [];
        _this._bosspos = [];
        _this._metimeBuff = {};
        _this._targettimeBuff = {};
        _this._mesunnum = 0;
        _this._targetsunnum = 0;
        _this.spBg = null;
        _this.guideRect = null;
        _this._isPause = false;
        _this._onlyCreateMons = false;
        _this._isSend = false;
        _this._syncFrameData = {};
        _this._aioptpos = [];
        _this._needAiCheck = false;
        _this._needAiCheckCompose = false;
        _this._isBeginning = false;
        _this._startPos = null;
        _this._startLocalPos = null;
        _this._diretCreateDice = false;
        _this.curRoundBossId = "";
        _this._buyMakeIdx = 0;
        _this._composeIdx = 0;
        _this._hasDoOptList = {};
        _this.updiceFlagMax = 0;
        _this.updiceFlagMin = 0;
        _this._isRequestIniting = false;
        _this._initNum = 0;
        _this.mons1Group = null;
        _this.mons2Group = null;
        _this.mons3Group = null;
        _this.mons4Group = null;
        _this._bothAddsp = false;
        _this._diceLayer = null;
        _this._effectLayer = null;
        _this._bulletLayer = null;
        _this._dmgTxtLayer = null;
        _this._dmgCritTxtLayer = null;
        // private _bulletLayer:BaseDisplayObjectContainer=null;
        _this._showAddsp = false;
        _this._switch = {
            maxMonster: 0
        };
        _this._lastCickStartTime = 0;
        _this.isStorm = false;
        return _this;
    }
    BattleView.prototype.initContainer = function () {
        //留空
    };
    BattleView.prototype.initBg = function () {
        var bgName = this.getBgName();
        if (bgName) {
            this.viewBg = BaseBitmap.create(bgName);
            if (this.isTouchMaskClose()) {
                this.viewBg.touchEnabled = true;
            }
            this.addChild(this.viewBg);
            this.viewBg.y = (GameConfig.stageHeigth - this.viewBg.height) * 0.5;
        }
    };
    BattleView.prototype.initView = function () {
        this.setOptEnabled(false);
        BattleStatus.scene = this;
        if (0) //PlatMgr.checkIsLocal()||PlatMgr.checkIsTest())
         {
            this._showTimeTxt = ComponentMgr.getTextField("1", 20, 0x00ff00);
            this._showTimeTxt.width = 100;
            this._showTimeTxt.textAlign = egret.HorizontalAlign.RIGHT;
            this._showTimeTxt.x = GameConfig.stageWidth - this._showTimeTxt.width;
            this.addChild(this._showTimeTxt);
            this._pingTxt = ComponentMgr.getTextField("1ms", 20, 0x00ff00);
            this._pingTxt.width = 100;
            this._pingTxt.textAlign = egret.HorizontalAlign.RIGHT;
            this._pingTxt.x = GameConfig.stageWidth - this._pingTxt.width;
            this._pingTxt.y = this._showTimeTxt.y + this._showTimeTxt.height + 5;
            this.addChild(this._pingTxt);
        }
        //播放动画
        // this.playRoundEffect(LangMger.getlocal(`battlestart`),this.requestInitData,this);
        this.initButtom();
        this.initEvt();
        BattleStatus.obstacleZidx = this.getChildIndex(this.viewBg) + 1;
        this.initLayer();
        this.initTop();
        // if(1){
        //     let buff = `105`;
        //     let round=BattleStatus.round;
        //     let roundCfg = Config.BattleCfg.getChallangeCfg(round,Api.GameinfoVoApi.getIsGuiding());
        //     let keys = Object.keys(roundCfg);
        //     let unit = roundCfg[keys[0]][0];
        //     let monsterVoarr = [];
        //     //方形怪
        //     let itemCfg : Config.ChallengeItemCfg = new Config.ChallengeItemCfg();
        //     let data = {
        //         monsterType : unit.monsterType,
        //         monsterAdd : 0,
        //         monsterNum : 1,
        //         monsterSp : unit.monsterSp,
        //         monsterHp : [],
        //         monsterSpeed : 1,
        //         addSpeed : unit.monsterAddSpeed,
        //         startTime : 0,
        //         internalTime : 0
        //     }
        //     itemCfg.initData(unit);
        //     itemCfg.initData(data);
        //     let vo = new MonsterVo();
        //     vo.birthTime = 100;
        //     vo.hp = 1000;
        //     vo.initData(itemCfg);
        //     let monster : any =this.createMonster(vo,true);
        //     monster.x = 320;
        //     monster.y = 800;
        //     monster.addBeAtkStatus(buff);
        //     monster.addBeAtkStatus(buff);
        //     monster.addBeAtkStatus(buff);
        //     //圆形怪
        //     let itemCfg2 : Config.ChallengeItemCfg = new Config.ChallengeItemCfg();
        //     let data2 = {
        //         monsterType : 2,
        //         monsterAdd : 0,
        //         monsterNum : 1,
        //         monsterSp : unit.monsterSp,
        //         monsterHp : [],
        //         monsterSpeed : 2,
        //         addSpeed : unit.monsterAddSpeed,
        //         startTime : 0,
        //         internalTime : 0
        //     }
        //     itemCfg.initData(data2);
        //     let vo2 = new MonsterVo();
        //     vo2.birthTime = 0;
        //     vo2.hp = 200;
        //     vo2.initData(itemCfg);
        //     let monster2 : any =this.createMonster(vo2,true);
        //     monster2.x = 520;
        //     monster2.y = 800;
        //     monster2.addBeAtkStatus(buff);
        //     monster2.addBeAtkStatus(buff);
        //     monster2.addBeAtkStatus(buff);
        //     let itemCfg3 : Config.ChallengeItemCfg = new Config.ChallengeItemCfg();
        //     let data3 = {
        //         monsterType : 3,
        //         monsterAdd : 0,
        //         monsterNum : 1,
        //         monsterSp : unit.monsterSp,
        //         monsterHp : [],
        //         monsterSpeed : 2,
        //         addSpeed : unit.monsterAddSpeed,
        //         startTime : 0,
        //         internalTime : 0
        //     }
        //     itemCfg.initData(data3);
        //     let vo3 = new MonsterVo();
        //     vo3.birthTime = 0;
        //     vo3.hp = 200;
        //     vo3.initData(itemCfg);
        //     let monster3 : any =this.createMonster(vo3,true);
        //     monster3.x = 220;
        //     monster3.y = 800;
        //     monster3.addBeAtkStatus(buff);
        //     monster3.addBeAtkStatus(buff);
        //     monster3.addBeAtkStatus(buff);
        // }
        this.requestInitData();
        // this.playRoundEffect(LangMger.getlocal(`battlestart`),this.requestInitData,this);
    };
    BattleView.prototype.hideInitBattleBg = function () {
        Api.BattleVoApi.hideLoading();
    };
    BattleView.prototype.playRoundEffect = function (showStr, callback, thisObj) {
        var _this = this;
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
        else {
            var startGameBg = this._startGameBg;
            var startGameTxt = this._startGameTxt;
            if (!this.contains(startGameBg)) {
                this.addChild(startGameBg);
            }
            if (!this.contains(startGameTxt)) {
                this.addChild(startGameTxt);
            }
            if (showStr != startGameTxt.text) {
                startGameTxt.setString(showStr);
                startGameTxt.anchorOffsetX = startGameTxt.width / 2;
                var rect = startGameTxt.mask;
                rect.width = startGameTxt.width;
                startGameTxt.mask = rect;
            }
            egret.Tween.removeTweens(this._startGameTxt.mask);
            egret.Tween.removeTweens(this._startGameTxt);
            egret.Tween.removeTweens(this._startGameBg);
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
        egret.Tween.get(this._startGameBg).to({ scaleY: 0.8 }, 10 * timeparam).to({ scaleY: 1 }, 5 * timeparam).wait(15 * timeparam).to({ scaleY: 0 }, 20 * timeparam).call(function () {
            egret.Tween.removeTweens(_this._startGameBg);
            _this.removeChild(_this._startGameBg);
            if (callback) {
                callback.apply(thisObj);
            }
        }, this);
    };
    BattleView.prototype.getResourceList = function () {
        var resArr = ["battleview", "chatview", "joinwarinputbg", "monsteract", "dicestareft", "diceeffect", "obstacle", "atkeffect"];
        return _super.prototype.getResourceList.call(this).concat(resArr);
    };
    BattleView.prototype.addToEffectLayer = function (display, isdamage, iscrit) {
        if (isdamage) {
            //子弹
            iscrit ? this._dmgCritTxtLayer.addChild(display) : this._dmgTxtLayer.addChild(display);
        }
        else {
            //子弹
            this._bulletLayer.addChild(display);
        }
    };
    BattleView.prototype.initEvt = function () {
        // App.MsgHelper.addEvt("select_dice",this.selectDiceHandler,this)
        App.MsgHelper.addEvt(MsgConst.MONSTER_SURVIVE, this.surviveHandler, this);
        App.MsgHelper.addEvt(NetConst.BATTLE_INIT, this.initBattleData, this);
        App.MsgHelper.addEvt(NetConst.BATTLE_SYNC, this.battleSyncResult, this);
        App.MsgHelper.addEvt(NetConst.BATTLE_END, this.checkBattleEnd, this);
        App.MsgHelper.addEvt(MsgConst.BTLE_ADD_SP, this.addspfresh, this);
        App.MsgHelper.addEvt(MsgConst.BT_KILL_MONSTER, this.killMonster, this);
        App.MsgHelper.addEvt(MsgConst.BATTLECREATE_DICE, this.createDiceByInfo, this);
        this.addTouch(this.touchHandler, this);
    };
    BattleView.prototype.removeEvt = function () {
        App.MsgHelper.removeEvt(MsgConst.MONSTER_SURVIVE, this.surviveHandler, this);
        App.MsgHelper.removeEvt(NetConst.BATTLE_INIT, this.initBattleData, this);
        App.MsgHelper.removeEvt(NetConst.BATTLE_SYNC, this.battleSyncResult, this);
        App.MsgHelper.removeEvt(NetConst.BATTLE_END, this.checkBattleEnd, this);
        App.MsgHelper.removeEvt(MsgConst.BTLE_ADD_SP, this.addspfresh, this);
        App.MsgHelper.removeEvt(MsgConst.BT_KILL_MONSTER, this.killMonster, this);
        App.MsgHelper.removeEvt(MsgConst.BATTLECREATE_DICE, this.createDiceByInfo, this);
    };
    BattleView.prototype.createDiceByInfo = function (e) {
        var data = e.data;
        if (data) {
            this.createDice(data.isMe, data.seed, BattleStatus.frame, data.pos, data.type); //let newdice = 
        }
        else {
            //随机创建一个
        }
    };
    BattleView.prototype.touchHandler = function (e) {
        var flag = Api.GameinfoVoApi.checlIsInGuideId(9);
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if (e.target != this._maskBmp) {
                    return;
                }
                if (this._isBeginning == false) {
                    this._isBeginning = true;
                    if (!this._startPos) {
                        this._startPos = egret.Point.create(this.x, this.y);
                    }
                    else {
                        this._startPos.setTo(this.x, this.y);
                    }
                    if (!this._startLocalPos) {
                        this._startLocalPos = egret.Point.create(e.localX, e.localY);
                    }
                    else {
                        this._startLocalPos.setTo(e.localX, e.localY);
                    }
                    // let ofp = this.localToGlobal(0,0);
                    var diceList = this._meDiceList;
                    var _a = BattleStatus.getCellPosByPix(e.stageX - GameData.layerPosX, e.stageY - GameData.layerPosY), x = _a.x, y = _a.y;
                    var key = x + '_' + y;
                    if (diceList[key] && !diceList[key].getIsSilence()) {
                        if (!this._clientWaitOptList[key]) {
                            BattleStatus.selectPos = key;
                            if (this._diceLayer.contains(diceList[key])) {
                                this._diceLayer.setChildIndex(diceList[key], this._diceLayer.numChildren - 1);
                            }
                            App.MsgHelper.dispEvt(MsgConst.DICE_MOVE_FORCOMPOSE, {
                                type: "movein",
                                id: diceList[key].getDiceId(),
                                pos: key,
                                stars: diceList[key].getDiceStars()
                            });
                        }
                    }
                    if (!BattleStatus.selectPos) {
                        this._lastCickStartTime = 0;
                        this._isBeginning = false;
                    }
                    else {
                        this._lastCickStartTime = BattleStatus.battleLogicHasTickTime;
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if (e.target != this._maskBmp) {
                    return;
                }
                if (this._isBeginning) {
                    var x = e.localX - this._startLocalPos.x;
                    var y = e.localY - this._startLocalPos.y;
                    var item = this._meDiceList[BattleStatus.selectPos];
                    if (item) {
                        item.dragMove(x, y);
                        this.findCheckCanCompose(item.x, item.y);
                    }
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if (this._isBeginning) {
                    var item = this._meDiceList[BattleStatus.selectPos];
                    App.MsgHelper.dispEvt(MsgConst.DICE_MOVE_FORCOMPOSE);
                    if (flag) {
                        var selectdata = this._meDiceDataList[BattleStatus.selectPos];
                        if (selectdata && Math.abs(selectdata.getShowPos(true).x - item.x) >= 95) {
                            BattleStatus.targetPos = BattleStatus.selectPos == "1_1" ? "3_1" : "1_1";
                        }
                        var result = this.checkCompose();
                        if (!result) {
                            item && item.resetPos();
                        }
                    }
                    else {
                        item && item.resetPos();
                    }
                    this._isBeginning = false;
                    BattleStatus.selectPos = null;
                    BattleStatus.targetPos = null;
                    this._lastCickStartTime = 0;
                }
            case egret.TouchEvent.TOUCH_END:
                if (this._isBeginning) {
                    var item = this._meDiceList[BattleStatus.selectPos];
                    App.MsgHelper.dispEvt(MsgConst.DICE_MOVE_FORCOMPOSE);
                    if (flag) {
                        var selectdata = this._meDiceDataList[BattleStatus.selectPos];
                        if (selectdata && Math.abs(selectdata.getShowPos(true).x - item.x) >= 95) {
                            BattleStatus.targetPos = BattleStatus.selectPos == "1_1" ? "3_1" : "1_1";
                        }
                    }
                    var result = this.checkCompose();
                    if (!result) {
                        if (BattleStatus.battleLogicHasTickTime - this._lastCickStartTime < 1000 && Api.GameinfoVoApi.getIsFinishNewGuide()) {
                            var resetPos = item.getDiceData().getShowPos(item.getDiceData().isMe);
                            if (resetPos.x == item.x && resetPos.y == item.y) {
                                ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                                    dice: item.getDiceId(),
                                    inbattle: true,
                                    check: true,
                                    star: item.getDiceStars(),
                                    info: {
                                        lv: Api.BattleVoApi.getUpinfoLvByDiceId(true, item.getDiceId()),
                                        pwlv: Api.BattleVoApi.getUpinfoPlvByDiceId(true, item.getDiceId())
                                    }
                                });
                            }
                        }
                        item && item.resetPos();
                    }
                    this._isBeginning = false;
                    BattleStatus.selectPos = null;
                    BattleStatus.targetPos = null;
                    this._lastCickStartTime = 0;
                }
            default:
                break;
        }
    };
    /**
     * 拖动时实时检测是否有可以合并的骰子
     * @param pixX
     * @param pixY
     */
    BattleView.prototype.findCheckCanCompose = function (pixX, pixY) {
        var cellPos = BattleStatus.getCellPosByPix(pixX, pixY);
        var selectPos = BattleStatus.selectPos;
        var targetPos = cellPos.x + "_" + cellPos.y;
        if (BattleStatus.targetPos != targetPos) {
            if (this._clientWaitOptList[targetPos]) {
                // console.log("wait compose dice!!!");
            }
            else {
                var selectDiceData = this._meDiceDataList[selectPos];
                var targetDiceData = this._meDiceDataList[targetPos];
                if (targetDiceData) {
                    if (targetDiceData.checkMaxStar()) {
                        BattleStatus.targetPos = !targetDiceData.checkIsMirror() && selectDiceData.checkIsMirror() ? targetPos : null;
                    }
                    else {
                        BattleStatus.targetPos = targetPos;
                    }
                }
                else {
                    BattleStatus.targetPos = null;
                }
                // if(targetDiceData)
                // {
                //     if(selectDiceData.id==targetDiceData.id&&selectDiceData.star==targetDiceData.star)
                //     {
                //         console.log("can compose!!!");
                //     }
                // }
                // else
                // {
                //     console.log("no dice!!!");
                // }
            }
        }
    };
    /**
     * 拖动结束，松手时候检测是否可以合并，如果可以合并则合并
     */
    BattleView.prototype.checkCompose = function () {
        var selectPos = BattleStatus.selectPos;
        var targetPos = BattleStatus.targetPos;
        if (targetPos && selectPos != targetPos) {
            var selectDiceData = this._meDiceDataList[selectPos];
            var targetDiceData = this._meDiceDataList[targetPos];
            var selectDice = this._meDiceList[selectPos];
            var targetDice = this._meDiceList[targetPos];
            if (selectDice && targetDice && !selectDice.getIsSilence() && !targetDice.getIsSilence()) {
                if (targetDiceData) {
                    if (this.checkComposeFlag(selectDiceData, targetDiceData) && selectDiceData.star == targetDiceData.star) {
                        if (Api.GameinfoVoApi.getIsGuiding() && Api.GameinfoVoApi.getCurGudingId() < 9) {
                            return false;
                        }
                        if (Api.GameinfoVoApi.checlIsInGuideId(9)) {
                            this.battleResume();
                        }
                        var opt = 2;
                        this._clientWaitOptList[selectPos] = opt;
                        this._clientWaitOptList[targetPos] = opt;
                        if (selectDiceData.checkIsChangePosDice() && !targetDiceData.checkIsChangePosDice()) {
                        }
                        else {
                            var ismirror = selectDiceData.checkIsMirror() && !targetDiceData.checkIsMirror();
                            var clipname = "diceappear" + (ismirror ? 2 : 1);
                            var pos = { x: targetDice.x, y: targetDice.y };
                            if (ismirror) {
                                pos = selectDiceData.getShowPos(selectDiceData.isMe);
                            }
                            var clip_1 = ComponentMgr.getCustomMovieClip(clipname, null, 35, BattleBaseEffect);
                            clip_1.setEndCallBack(function () {
                                clip_1.dispose();
                            }, this);
                            clip_1.playWithTime(1);
                            clip_1.anchorOffsetX = ismirror ? 50 : 25;
                            clip_1.anchorOffsetY = ismirror ? 50 : 25;
                            clip_1.setScale(ismirror ? 1 : 4);
                            this.addChild(clip_1);
                            clip_1.setPosition(pos.x, pos.y + (ismirror ? -30 : 0));
                        }
                        NetManager.request(NetConst.BATTLE_OPT, { opt: opt, fromPos: selectPos, toPos: targetPos, optseed: egret.getTimer() });
                        return true;
                    }
                }
            }
        }
        return false;
    };
    BattleView.prototype.checkComposeFlag = function (selectDiceData, targetDiceData) {
        var flag = false;
        if (selectDiceData && targetDiceData && selectDiceData.star == targetDiceData.star) {
            if (selectDiceData.checkIsAdapt() || selectDiceData.checkIsChangePosDice() || selectDiceData.checkIsNutritionDice()) {
                flag = !targetDiceData.checkMaxStar();
            }
            else if (selectDiceData.checkIsMirror()) {
                if (targetDiceData.checkIsMirror()) {
                    flag = !targetDiceData.checkMaxStar();
                }
                else {
                    flag = true;
                }
            }
            else {
                flag = selectDiceData.id == targetDiceData.id && !targetDiceData.checkMaxStar();
            }
        }
        return flag;
    };
    BattleView.prototype.surviveHandler = function (e) {
        var data = e.data;
        if (data) {
            BattleStatus.battleCheckCount(data.isMe, "p");
            this.deleteMonster(data);
            this.showHpMovie(data.isMe, data.getIsBoss());
            if (!data.isMe && Api.GameinfoVoApi.checlIsInGuideId(12)) {
                this.battlePause();
                Api.GameinfoVoApi.setCurGudingId(13);
                App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
            }
        }
    };
    BattleView.prototype.killMonster = function (e) {
        var data = e.data;
        this.deleteMonster(data.data);
        // if(!data.isMe && BattleStatus.isAi && !Api.GameinfoVoApi.getIsGuiding())
        // {
        //     this._needAiCheck = true;
        // }
    };
    BattleView.prototype.deleteMonster = function (data) {
        if (data) {
            var targetDataList = data.isMe ? BattleStatus.targetMonsterDataList : BattleStatus.meMonsterDataList;
            var idx = targetDataList.indexOf(data);
            if (idx > -1) {
                targetDataList.splice(idx, 1);
            }
            var meDataList = data.isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
            var idx2 = meDataList.indexOf(data);
            if (idx2 > -1) {
                meDataList.splice(idx2, 1);
            }
            delete BattleStatus.meMonsterList[data.getName()];
            delete BattleStatus.targetMonsterList[data.getName()];
            BattleStatus.checkMaxHp(data, data.isMe, 0);
            if (data.isPublic()) {
                BattleStatus.checkMaxHp(data, !data.isMe, 0);
            }
            App.LogUtil.log("被杀", data.lost(data.isMe));
            BattleStatus.checkGroup(data);
        }
    };
    BattleView.prototype.showHpMovie = function (isme, isboss) {
    };
    BattleView.prototype.initTop = function () {
        var view = this;
        this._topLayer = new BaseDisplayObjectContainer();
        this.addChild(this._topLayer);
        //LayerMgr.panelLayer.addChild(this._topLayer);
        var fb = BaseBitmap.create("battle_forbidchat");
        // LayerMgr.panelLayer.addChild(fb);
        // this._topLayer.addChild(fb);
        fb.x = 506;
        // fb.y = (this["isPvp"])? 94 : 44;
        fb.y = this.topDiceBgY - fb.height - 8;
        fb.visible = view.forbidChat;
        this.fb = fb;
        var forbidchat = BaseBitmap.create("btn_forbidchat2");
        this._topLayer.addChild(forbidchat);
        // LayerMgr.panelLayer.addChild(forbidchat);
        forbidchat.x = 509;
        // forbidchat.y = (this["isPvp"])? 73 : 14;
        forbidchat.y = this.topDiceBgY - forbidchat.height - 20;
        forbidchat.addTouchTap(function () {
            SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
            view.forbidChat = !view.forbidChat;
            fb.visible = view.forbidChat;
        }, this);
    };
    BattleView.prototype.initButtom = function () {
        this._buttomLayer = new BaseDisplayObjectContainer();
        this.addChild(this._buttomLayer);
        this._buyBtn = ComponentMgr.getButton("btn_battle_buy", "", this.buyHandler, this);
        var buyBtn = this._buyBtn;
        var egg = BaseBitmap.create("buy_btn_icon2");
        buyBtn.addChild(egg);
        egg.x = 9;
        egg.y = -15;
        var spIco = BaseBitmap.create("icon_sp");
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, spIco, this._buyBtn, [0, -10]);
        buyBtn.addChild(spIco);
        var numTxt = ComponentMgr.getTextField(Api.BattleVoApi.getNeedSpNum(true) + "", TextFieldConst.SIZE_36);
        this._numTxt = numTxt;
        numTxt.width = buyBtn.width - spIco.width - spIco.width;
        numTxt.textAlign = egret.HorizontalAlign.LEFT;
        numTxt.setPosition(spIco.x + spIco.width, spIco.y + (spIco.height - numTxt.height) * 0.5);
        buyBtn.addChild(numTxt);
        numTxt.strokeColor = 0x000000;
        numTxt.stroke = 2;
        buyBtn.setPosition((GameConfig.stageWidth - buyBtn.width) * 0.5 + 10, GameConfig.stageHeigth - 200);
        this.addChild(buyBtn);
        var group = new BaseDisplayObjectContainer();
        this.addChild(group);
        group.setPosition(74, GameConfig.stageHeigth - 150);
        var spBg = BaseBitmap.create("battle_spbg");
        group.width = spBg.width;
        group.height = spBg.height;
        group.addChild(spBg);
        this.spBg = group;
        var spIcon = BaseBitmap.create("icon_sp");
        spIcon.setPosition(spBg.x, spBg.y + (spBg.height - spIcon.height) * 0.5);
        group.addChild(spIcon);
        this._spTxt = ComponentMgr.getTextField(Api.BattleVoApi.getSpNum() + "", TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        var spTxt = this._spTxt;
        spTxt.textAlign = numTxt.textAlign;
        spTxt.width = spBg.width - spIcon.width;
        spTxt.setPosition(spIcon.x + spIcon.width + 5, spBg.y + (spBg.height - spTxt.height) * 0.5);
        group.addChild(spTxt);
        spTxt.stroke = 2;
        spTxt.strokeColor = 0x000000;
        var chatIcon = BaseBitmap.create("btn_chat");
        chatIcon.setPosition(114, GameConfig.stageHeigth - 200);
        this.addChild(chatIcon);
        chatIcon.addTouchTap(this.chatHandler, this);
        this._chatIcon = chatIcon;
        // 用户等级
        // let lvImg = BaseBitmap.create(`public_level_${Api.UserinfoVoApi.getLevel()}`);
        var lvImg = BaseLoadBitmap.create("levelicon" + Api.UserinfoVoApi.getLevel());
        this.addChild(lvImg);
        lvImg.setScale(0.175);
        lvImg.x = buyBtn.x + buyBtn.width + 10;
        lvImg.y = buyBtn.y;
        var userName = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        this.addChild(userName);
        userName.text = Api.UserinfoVoApi.getName();
        userName.y = lvImg.y + lvImg.height * lvImg.scaleY;
        userName.x = lvImg.x + (lvImg.width * lvImg.scaleX - userName.width) / 2;
        userName.stroke = 2;
        userName.strokeColor = 0x000000;
    };
    BattleView.prototype.initLayer = function () {
        for (var i = 1; i < 5; ++i) {
            var group = new BaseDisplayObjectContainer();
            group.width = this.width;
            group.height = this.height;
            this.addChild(group);
            this["mons" + i + "Group"] = group;
        }
        // this._bulletLayer=new BaseDisplayObjectContainer();
        // this.addChild(this._bulletLayer);
        this._diceLayer = new BaseDisplayObjectContainer();
        this.addChild(this._diceLayer);
        this._effectLayer = new BaseDisplayObjectContainer();
        this.addChild(this._effectLayer);
        var bulletLayer = new BaseDisplayObjectContainer();
        this._effectLayer.addChild(bulletLayer);
        this._bulletLayer = bulletLayer;
        var dmgTxtLayer = new BaseDisplayObjectContainer();
        this._effectLayer.addChild(dmgTxtLayer);
        this._dmgTxtLayer = dmgTxtLayer;
        var dmgCritTxtLayer = new BaseDisplayObjectContainer();
        this._effectLayer.addChild(dmgCritTxtLayer);
        this._dmgCritTxtLayer = dmgCritTxtLayer;
    };
    BattleView.prototype.chatHandler = function () {
        if (!this.chatList) {
            this.chatList = new ChatView();
            this.chatList.init();
        }
        this.addChild(this.chatList);
    };
    BattleView.prototype.displayChatDB = function (opt, isMe) {
        if (Api.GameinfoVoApi.getIsGuiding()) {
            return;
        }
        if (isMe) {
            if (this.chatDB == null) {
                this.chatDB = new ChatDBDisplay();
                this.chatDB.init(1);
                this.addChild(this.chatDB);
                this.chatDB.width = 98;
                this.chatDB.height = 108;
                this.chatDB.x = 417;
                this.chatDB.y = GameConfig.stageHeigth - 281;
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
                this.chatDBother.x = 270;
                this.chatDBother.y = 59;
            }
            this.addChild(this.chatDBother);
            // this.chatDBother.visible = true;
            this.chatDBother.displayDB(opt["upId"]);
        }
    };
    BattleView.prototype.addspfresh = function (evt) {
        if (evt.data) {
            this.refreshSpTxt();
        }
        else {
            if (BattleStatus.isAi && !Api.GameinfoVoApi.getIsGuiding()) {
                this._needAiCheck = true;
            }
        }
    };
    BattleView.prototype.refreshSpTxt = function () {
        this._spTxt && this._spTxt.setString(Api.BattleVoApi.getSpNum() + "");
        this._numTxt && (this._numTxt.setString(Api.BattleVoApi.getNeedSpNum(true) + ""));
        if (Api.BattleVoApi.getNeedSpNum(true) >= 1000) {
            this._numTxt.size = TextFieldConst.SIZE_30;
        }
        if (!Api.GameinfoVoApi.getIsGuiding() || Api.GameinfoVoApi.getCurGudingId() > 12) {
            var cursp = Api.BattleVoApi.getBattleData(true).sp;
            if (cursp >= this.updiceFlagMin) {
                this.refreshUpdice();
            }
            else if (cursp < this.updiceFlagMax) {
                this.refreshUpdice();
            }
        }
    };
    BattleView.prototype.refreshUpdice = function () {
        var _this = this;
        //判断当前sp是否足够增幅 不够就置灰
        this.updiceFlagMin = 1000;
        this.updiceFlagMax = 0;
        Api.BattleVoApi.getInitInfo(true).upInfo.forEach(function (info) {
            var upinfo = _this.getChildByName("up" + info.id);
            var needSP = Api.BattleVoApi.getPowerUpCostByLv(info.pwlv);
            if (info.pwlv < 5) {
                if (!Api.BattleVoApi.checkPowerUp(info.id, true)) {
                    if (needSP < _this.updiceFlagMin) {
                        _this.updiceFlagMin = needSP;
                    }
                    upinfo.showMask();
                }
                else {
                    if (needSP > _this.updiceFlagMax) {
                        _this.updiceFlagMax = needSP;
                    }
                    upinfo.hideaMask();
                }
            }
        });
    };
    /**
     * 预处理
     */
    BattleView.prototype.preOpt = function (opt) {
        switch (opt) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                break;
            case 4:
                break;
            default:
                break;
        }
    };
    BattleView.prototype.preOptBuy = function () {
        this._mePreDiceDataList;
    };
    BattleView.prototype.buyHandler = function (e) {
        var _this = this;
        if (BattleStatus.startBattleTime > 0) {
            if (Api.BattleVoApi.checkBuyDice(true)) {
                var curid = Api.GameinfoVoApi.getCurGudingId();
                if (curid) {
                    if (curid < 7 && this._onlyCreateMons) {
                        return;
                    }
                    if (curid == 3 || curid == 5 || curid == 7) {
                        if (Object.keys(this._meDiceDataList).length < 3) {
                            App.CommonUtil.sendNewGuideId(curid);
                        }
                    }
                    if (curid == 3) {
                        //敌方召唤小怪
                        var timer_1 = new egret.Timer(200, 4);
                        var count_1 = 1;
                        timer_1.addEventListener(egret.TimerEvent.TIMER, function () {
                            var useSeed = egret.getTimer();
                            _this.optBuyDice(count_1, BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame, false);
                            ++count_1;
                        }, this);
                        timer_1.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function () {
                            timer_1.stop();
                            timer_1 = null;
                        }, this);
                        //开始计时
                        timer_1.start();
                    }
                    ++this._buyMakeIdx;
                    this.battleResume();
                    this._diretCreateDice = true;
                    var useSeed = egret.getTimer();
                    this.optBuyDice(useSeed, BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame, true);
                    if (Api.GameinfoVoApi.getCurGudingId() < 7) {
                        this._onlyCreateMons = true;
                    }
                    this._diretCreateDice = false;
                }
                else {
                    var useSeed = egret.getTimer();
                    this.preBuyCreateDice(true, useSeed);
                    NetManager.request(NetConst.BATTLE_OPT, { opt: 3, optseed: useSeed }, false);
                }
            }
            else {
                //App.CommonUtil.showTip(LangMger.getlocal("hasNotEnoughSp"));
            }
        }
    };
    BattleView.prototype.requestInitData = function () {
        var _this = this;
        if (this._initCount == -1) {
            this._initCount = egret.setTimeout(function () {
                _this.clearInitCount();
                if (_this._isRequestIniting == false) {
                    _this.requestInitData();
                }
            }, this, BattleStatus.logicFrame);
            this._isRequestIniting = true;
            this._initNum++;
            NetManager.request(NetConst.BATTLE_INIT, {});
        }
    };
    BattleView.prototype.clearInitCount = function () {
        if (this._initCount != -1) {
            egret.clearTimeout(this._initCount);
            this._initCount = -1;
        }
    };
    BattleView.prototype.initBattleData = function (e) {
        var rdata = e.data;
        if (rdata.ret) {
            var startTime = rdata.data.data.startTime;
            if (startTime) { //获取到战斗开始时间，初始化数据
                this._startBattleT = startTime;
                this.clearInitCount();
                var initData = rdata.data.data.initData.player;
                Api.BattleVoApi.setInitInfo(initData);
                if (BattleStatus.isAi) {
                    var initinfo = Api.BattleVoApi.getInitInfo(false);
                    var strategy = initinfo.strategy;
                    switch (strategy) {
                        case 1:
                            this._switch.onlyBuy = true;
                            break;
                        case 3:
                            this._switch.canPowerUp = true;
                        case 2:
                            this._switch.canCompose = true;
                            break;
                    }
                    //机器人：战场小鸟数限制
                    if (initinfo.diceNum) {
                        this._switch.maxMonster = initinfo.diceNum;
                    }
                    else {
                        this._switch.maxMonster = 15;
                    }
                }
                BattleStatus.initForBattle();
                this.initUpInfo();
                TickMgr.addFastTick(this.frameHandler, this);
                BattleFrameHelper.startCheck();
                if (BattleStatus.isAi) {
                    this._needAiCheck = true;
                }
                if (Api.GameinfoVoApi.checlIsInGuideId(2)) {
                    this.battlePause();
                    if (!this._onlyCreateMons) {
                        this._onlyCreateMons = true;
                        this.battleResume();
                        this._guidepos.push({
                            time: BattleStatus.battleLogicHasTickTime + (Math.ceil(2000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
                            guideid: "3"
                        });
                    }
                }
                if (BattleStatus.type == "2" && Api.GameinfoVoApi.getIsFinishNewGuide() && !Api.GameinfoVoApi.getIsFinishStepGuide(32)) {
                    Api.GameinfoVoApi.setCurGudingId(32);
                    this._guidepos.push({
                        time: BattleStatus.battleLogicHasTickTime + (Math.ceil(4000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
                        guideid: "32"
                    });
                }
            }
            else {
                //等待对手准备中，轻易不要在这里加代码
                if (this._initNum > 30) {
                    App.CommonUtil.showTip(LangMger.getlocal("battleEscape"));
                    this.hide();
                }
                else {
                    this._isRequestIniting = false;
                    this.requestInitData();
                }
            }
        }
        else {
            //初始化报错了，不太可能进入战斗了
            App.CommonUtil.showTip(LangMger.getlocal("battleInitFail"));
            this.hide();
        }
    };
    BattleView.prototype.setDiceIndex = function () {
        var meUpInfo = Api.BattleVoApi.getInitInfo(true).upInfo;
        var l = meUpInfo.length;
        for (var i = 0; i < l; i++) {
            var updice = this.getChildByName("up" + meUpInfo[i].id);
            if (updice) {
                updice.touchEnabled = false;
                this.setChildIndex(updice, 9999);
            }
        }
    };
    BattleView.prototype.resetDiceIndex = function () {
        this.battleResume();
        var meUpInfo = Api.BattleVoApi.getInitInfo(true).upInfo;
        var l = meUpInfo.length;
        for (var i = 0; i < l; i++) {
            var updice = this.getChildByName("up" + meUpInfo[i].id);
            if (updice) {
                updice.touchEnabled = true;
            }
        }
    };
    BattleView.prototype.setDetailIndex = function () {
        var melist = this._meDiceList;
        var dice = melist["1_1"];
        if (!dice) {
            dice = melist["3_1"];
        }
        this._diceLayer.removeChild(dice);
        this.addChild(dice);
        dice.addTouchTap(function () {
            ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW, {
                dice: dice.getDiceId(),
                check: true,
                inbattle: true,
                star: dice.getDiceStars()
            });
        }, this);
    };
    BattleView.prototype.resetDetailIndex = function () {
        var melist = this._meDiceList;
        var dice = melist["1_1"];
        if (!dice) {
            dice = melist["3_1"];
        }
        this.removeChild(dice);
        this._diceLayer.addChild(dice);
        dice.removeTouchTap();
    };
    BattleView.prototype.setBirdIndex = function () {
        var melist = this._meDiceList;
        var dice1 = melist["1_1"];
        var dice2 = melist["3_1"];
        // this._diceLayer.setChildIndex(dice1, 9999);
        // this._diceLayer.setChildIndex(dice2, 9999);
        this._diceLayer.removeChild(dice1);
        this.addChild(dice1);
        this._diceLayer.removeChild(dice2);
        this.addChild(dice2);
    };
    BattleView.prototype.resetBirdIndex = function () {
        var melist = this._meDiceList;
        var dice1 = melist["1_1"];
        var dice2 = melist["3_1"];
        this.removeChild(dice1);
        this._diceLayer.addChild(dice1);
        this.removeChild(dice2);
        this._diceLayer.addChild(dice2);
    };
    BattleView.prototype.setPowerUpInfo = function () {
        ViewController.getInstance().hideView(ViewConst.DICEDETAILINFOVIEW);
        this.battleResume();
        this._guidepos.push({
            time: BattleStatus.battleLogicHasTickTime + (Math.ceil(5000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
            guideid: "12"
        });
    };
    BattleView.prototype.initUpInfo = function () {
        //LayerMgr.panelLayer.setChildIndex(this._topLayer,  LayerMgr.panelLayer.getChildIndex(this) + 1);
        var meUpInfo = Api.BattleVoApi.getInitInfo(true).upInfo;
        var l = meUpInfo.length;
        var y = GameConfig.stageHeigth - 93;
        var upinfoBg = BaseBitmap.create("public_alphabg");
        upinfoBg.width = 495;
        upinfoBg.height = 79;
        upinfoBg.setPosition(63, GameConfig.stageHeigth - 98);
        this.addChild(upinfoBg);
        this._upinfoBg = upinfoBg;
        upinfoBg.alpha = 0;
        for (var i = 0; i < l; i++) {
            var upInfoItem = meUpInfo[i];
            var upDice = new UpDice(upInfoItem);
            upDice.setPosition(63 + i * 105 + upDice.width / 2, y + upDice.height / 2);
            this.addChild(upDice);
            if (Config.DiceCfg.getCfgById(upInfoItem.id).target == 2) {
                BattleStatus.needMaxHp.me = true;
            }
        }
        // 敌方出战阵营
        var enemy = Api.BattleVoApi.getInitInfo(false);
        var enemyUnInfo = enemy.upInfo;
        App.LogUtil.log("敌方数据:", enemyUnInfo);
        // 玩家名字
        var userName = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
        var namestr = Config.NamesCfg.getEnemyName(enemy);
        userName.text = namestr;
        userName.y = this.topDiceBgY - userName.height - 10;
        userName.stroke = 2;
        // 玩家等级
        var lvImg = BaseLoadBitmap.create("levelicon" + enemy.level);
        this._topLayer.addChild(lvImg);
        this._topLayer.addChild(userName);
        lvImg.setScale(0.175);
        lvImg.x = 101;
        lvImg.y = -5;
        userName.x = lvImg.x + (lvImg.width * lvImg.scaleX - userName.width) / 2;
        var eBG = BaseBitmap.create("battle_enemy_bg");
        eBG.width = 300;
        eBG.height = 41;
        // this._topLayer.addChild(eBG);
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, eBG, lvImg, [0, 0]);
        eBG.x = 184;
        // 龙珠列表
        var dX = 57;
        var sX = eBG.x + 12;
        for (var index = 0; index < 5; index++) {
            var longzhuLv = ComponentMgr.getTextField('11', TextFieldConst.SIZE_14, ColorEnums.white);
            this._topLayer.addChild(longzhuLv);
            longzhuLv.text = "LV." + enemyUnInfo[index]["pwlv"];
            longzhuLv.x = sX + dX * index;
            longzhuLv.y = eBG.y + eBG.height + 5; //longzhuLv.height / 2;
            this.enemyLvs["ene_" + enemyUnInfo[index].id] = longzhuLv;
            longzhuLv.stroke = 2;
            var diceCfg = Config.DiceCfg.getCfgById(enemyUnInfo[index].id);
            var enemybg = BaseLoadBitmap.create("bird_team_item_" + (diceCfg.quality === 4 ? "4_1" : diceCfg.quality));
            if (diceCfg.quality !== 4) {
                enemybg.setScale(0.42);
            }
            this._topLayer.addChild(enemybg);
            var lzImg = BaseLoadBitmap.create("battle_enemy_" + enemyUnInfo[index].id);
            this._topLayer.addChild(lzImg);
            lzImg.x = longzhuLv.x;
            this.enemyLvsIcon["ene_" + enemyUnInfo[index].id] = lzImg;
            longzhuLv.width = lzImg.width;
            longzhuLv.textAlign = egret.HorizontalAlign.CENTER;
            App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, lzImg, eBG, [0, 0]);
            if (Config.DiceCfg.getCfgById(enemyUnInfo[index].id).target == 2) {
                BattleStatus.needMaxHp.target = true;
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, enemybg, lzImg, [0, 0]);
        }
        // 禁止按钮层次
        this._topLayer.addChild(this.fb);
        Api.FairArenaVoApi.setFreshFair(false);
    };
    BattleView.prototype.battleSync = function (add) {
        if (add === void 0) { add = 0; }
        if (this._isPause) {
            return;
        }
        // this._count = egret.setInterval(()=>{
        BattleStatus.frame++;
        var opt = { frame: BattleStatus.frame, checkValue: (BattleStatus.round + 1) + "" };
        BattleStatus.rframe > 0 && (opt.rframe = Math.ceil(BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame) + add);
        var floorValue = Math.floor(BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame);
        opt.checkframe = floorValue + add;
        opt.checkValue = ((!!add) ? Api.BattleVoApi.getSyncData() : this._syncFrameData[floorValue]);
        NetManager.request(NetConst.BATTLE_SYNC, opt, false);
        this.pingData[String(BattleStatus.frame)] = egret.getTimer();
        // },this,BattleStatus.logicFrame);
    };
    BattleView.prototype.battleSyncResult = function (e) {
        var rdata = e.data.data;
        if (!e.data.ret) {
            this.sendBattleEnd();
            return;
        }
        var data = rdata.data;
        BattleStatus.battleSyncList[data.frame] = data;
        // if(data)
        // {
        //     let syncOptData=data.syncOptData;
        //     if(syncOptData&&Object.keys(syncOptData).length>0)
        //     {
        //         App.LogUtil.log("rc ",egret.getTimer(),syncOptData);
        //     }
        // }
        var rframe = Math.max(BattleStatus.rframe, data.frame);
        var frameStr = String(data.frame);
        var st = this.pingData[frameStr];
        delete this.pingData[frameStr];
        var pingTime = egret.getTimer() - st;
        if (pingTime > BattleStatus.logicFrame) {
            this.slowPingData.slow[frameStr] = pingTime;
            this.slowPingData.num++;
        }
        this._pingTxt && this._pingTxt.setString(pingTime + "ms");
        BattleStatus.rframe = rframe;
        BattleStatus.battleTotalTimer = rframe * BattleStatus.logicFrame;
        // this.fastTick();
    };
    BattleView.prototype.frameHandler = function (time) {
        if (this._startBattleT > 0 && GameData.serverTimeMs >= this._startBattleT) {
            if (BattleStatus.startBattleTime == 0) {
                // let stT=egret.getTimer();
                BattleStatus.startBattleTime = time;
                // if(BattleStatus.checkCanSync(time))
                // {
                if (BattleStatus.battleLogicHasTickTime % BattleStatus.logicFrame == 0) {
                    this._syncFrameData[BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame] = Api.BattleVoApi.getSyncData();
                }
                this.battleSync();
                // }
                BattleStatus.lastFastTickTime = time;
                this.hideInitBattleBg();
                this.playRoundEffect(LangMger.getlocal("battlestart"), this.setOptEnabled, this);
            }
            else if (BattleStatus.startBattleTime > 0) {
                if (BattleStatus.checkCanSync(time)) {
                    this.battleSync();
                }
                // BattleStatus.battleTotalTimer=time-BattleStatus.startBattleTime;
                // let add=time-BattleStatus.lastFastTickTime;
                this.fastLogicTick(time);
                BattleStatus.lastFastTickTime = time;
            }
        }
        return true;
    };
    BattleView.prototype.setOptEnabled = function (enabled) {
        if (enabled === void 0) { enabled = true; }
        GameConfig.stage.touchChildren = enabled;
        if (enabled) {
            //特殊写法，提高点击性能 影响弹窗以及界面内显示
            // if(this._buyBtn&&this.contains(this._buyBtn)&&this.parent&&(!Api.GameinfoVoApi.getIsGuiding()))
            // {
            //     this.removeChild(this._buyBtn);
            //     this.parent.addChild(this._buyBtn);
            // }
        }
    };
    /**
     * 快速Tick，逻辑上默认10毫秒一次，不通渠道考虑性能可能不一样，都会是10的倍数
     */
    BattleView.prototype.fastLogicTick = function (t) {
        t = t - BattleStatus.lastFastTickTime;
        var diff = (BattleStatus.battleTotalTimer - BattleStatus.battleLogicHasTickTime);
        if (diff > BattleStatus.logicFrame) {
            t = diff - BattleStatus.logicFrame + t; //Math.max(Math.ceil(diff/10),t);
        }
        // console.log(diff+"xxxxx "+t);
        var toT = BattleStatus.battleLogicHasTickTime + t + this._leftT;
        var minFrame = BattleStatus.minLogicFrame;
        var maxLogicTime = Math.min(toT, BattleStatus.battleTotalTimer);
        var num = Math.floor((maxLogicTime - BattleStatus.battleLogicHasTickTime) / minFrame);
        this._leftT = (maxLogicTime - BattleStatus.battleLogicHasTickTime) % minFrame;
        for (var i = 0; i < num; i++) {
            var time = BattleStatus.battleLogicHasTickTime + minFrame;
            if (time <= BattleStatus.battleTotalTimer) {
                var cFrame = Math.floor(time / BattleStatus.logicFrame);
                //暂时如补帧情况需单独处理
                this.optListHandler(cFrame);
                this.checkAndCreateMonster(BattleStatus.firstAtkIsMe);
                this.checkAndCreateMonster(!BattleStatus.firstAtkIsMe);
                var maxL = Math.max(BattleStatus.meMonsterDataList.length, BattleStatus.targetMonsterDataList.length);
                for (var index = 0; index < maxL; index++) {
                    this.moveMonster(BattleStatus.firstAtkIsMe, index);
                    this.moveMonster(!BattleStatus.firstAtkIsMe, index);
                }
                for (var didxX = 0; didxX < 5; didxX++) {
                    for (var didxY = 0; didxY < 3; didxY++) {
                        this.checkDiceAtk(BattleStatus.firstAtkIsMe, didxX, didxY);
                        this.checkDiceAtk(!BattleStatus.firstAtkIsMe, didxX, didxY);
                    }
                }
                Bullet.fastTick(minFrame);
                Obstacle.fastTick(minFrame);
                var result = this.checkBattleResult();
                if (BattleStatus.battleLogicHasTickTime == BattleStatus.getPrepareTime()) {
                    if (BattleStatus.battleType == BattleTypeEnums.bigType1) {
                        App.MsgHelper.dispEvt(MsgConst.BT_HIDE_SELECTBOSS);
                    }
                }
                //所有逻辑都应该在这一行之前
                if (Api.GameinfoVoApi.getIsGuiding()) {
                }
                else {
                    if (this._needAiCheck && time % 1000 == 0) {
                        this.checkAiOpt();
                    }
                }
                this.logicCustomTick();
                BattleStatus.battleSyncList[cFrame] && (delete BattleStatus.battleSyncList[cFrame]);
                BattleStatus.battleLogicHasTickTime = time;
                this._showTimeTxt && this._showTimeTxt.setString(time + "ms");
                if (BattleStatus.battleLogicHasTickTime % BattleStatus.logicFrame == 0) {
                    this._syncFrameData[BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame] = Api.BattleVoApi.getSyncData();
                }
                if (result) {
                    break;
                }
            }
        }
    };
    BattleView.prototype.logicCustomTick = function () {
        if (this._aioptpos && this._aioptpos.length) {
            var deleteArr = [];
            for (var i in this._aioptpos) {
                var unit = this._aioptpos[i];
                var time = unit.time;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    if (unit.opt == "buy") {
                        this.optBuyDice(egret.getTimer(), Math.ceil(BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame), false);
                        this._needAiCheckCompose = true;
                    }
                    else if (unit.opt == "compose") {
                        var dataList = this._targetDiceDataList;
                        var diceList = this._targetDiceList;
                        var fdata = dataList[unit.fpos];
                        var tdata = dataList[unit.tpos];
                        if (this.checkComposeFlag(fdata, tdata)) {
                            this.composeHandler(unit.fpos, unit.tpos, false, egret.getTimer(), Math.ceil(BattleStatus.battleLogicHasTickTime / BattleStatus.logicFrame));
                            this._needAiCheck = false;
                            this._needAiCheckCompose = false;
                        }
                    }
                    else if (unit.opt == "powerup") {
                        this.optPowUp(unit.powerid, false);
                        this._needAiCheck = false;
                        this._needAiCheckCompose = false;
                    }
                    deleteArr.push(i);
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._aioptpos.splice(deleteArr[i], 1);
            }
        }
        if (this._killpos && this._killpos.length) {
            var deleteArr = [];
            for (var i in this._killpos) {
                var unit = this._killpos[i];
                var pos = unit.pos;
                var isMe = unit.isMe;
                var time = unit.time;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    var dataList = isMe ? this._targetDiceDataList : this._meDiceDataList;
                    var diceList = isMe ? this._targetDiceList : this._meDiceList;
                    var tdata = dataList[pos];
                    var tdice = diceList[pos];
                    if (tdice && tdata) {
                        //pvp杀星
                        if (BattleStatus.battleType == 1) {
                            if (tdata.star == 1) {
                                delete dataList[pos];
                                delete diceList[pos];
                                delete this._clientWaitOptList[pos];
                                tdice.beComposed();
                                tdice = null;
                            }
                            else {
                                if (tdata.checkIsAddSp()) {
                                    var tmp = tdice;
                                    tmp.addSp(tdata.star);
                                }
                                tdata.bekilled(true);
                                tdice.refresh(tdata);
                            }
                        }
                        else {
                            //pve升对面星
                            if (tdata.checkIsAddSp()) {
                                var tmp = tdice;
                                tmp.addSp(tdata.star);
                            }
                            tdata.bekilled(false);
                            tdice.refresh(tdata);
                        }
                    }
                    deleteArr.push(i);
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._killpos.splice(deleteArr[i], 1);
            }
        }
        if (this._nuclearpos && this._nuclearpos.length) {
            var deleteArr = [];
            for (var i = 0; i < this._nuclearpos.length; ++i) {
                var unit = this._nuclearpos[i];
                var isMe = unit.isMe;
                var time = unit.time;
                var centerDis = unit.centerDis;
                var tdata = unit.tdata;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    //造成伤害
                    var monstersList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
                    var findmonsterDataList = DiceHelper.findRangMonster(centerDis, tdata.property3[0], isMe);
                    //let findmonsterDataList = DiceHelper.bulletFindMonster(centerDis,tdata.property3[0],isMe);
                    var l = findmonsterDataList.length;
                    for (var i_1 = 0; i_1 < l; i_1++) {
                        var mData = findmonsterDataList[i_1];
                        if (!mData.lost(isMe)) {
                            var monster = monstersList[mData.getName()];
                            var num = 0;
                            if (monster.isBoss() || monster.getMonsterType() == 3) {
                                num = monster.getMaxHp() * tdata.property1;
                            }
                            else {
                                num = monster.getCurHp();
                            }
                            if (num != 0) {
                                monster.beAtk({ hp: num, isMe: isMe, crit: false });
                            }
                        }
                    }
                    deleteArr.push(i);
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._nuclearpos.splice(deleteArr[i], 1);
            }
        }
        if (this._damagepos && this._damagepos.length) {
            var deleteArr = [];
            for (var i in this._damagepos) {
                var unit = this._damagepos[i];
                var pos = unit.pos;
                var isMe = unit.isMe;
                var time = unit.time;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    var dataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
                    var diceList = isMe ? this._meDiceList : this._targetDiceList;
                    var tdata = dataList[pos];
                    var tdice = diceList[pos];
                    if (tdice && tdata) {
                        delete dataList[pos];
                        delete diceList[pos];
                        delete this._clientWaitOptList[pos];
                        tdice.beComposed();
                        tdice = null;
                    }
                    deleteArr.push(i);
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._damagepos.splice(deleteArr[i], 1);
            }
        }
        if (this._guidepos && this._guidepos.length) {
            var deleteArr = [];
            for (var i in this._guidepos) {
                var unit = this._guidepos[i];
                var guideid = unit.guideid;
                var time = unit.time;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    this.battlePause();
                    Api.GameinfoVoApi.setCurGudingId(guideid);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    deleteArr.push(i);
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._guidepos.splice(deleteArr[i], 1);
            }
        }
        if (this._bosspos && this._bosspos.length) {
            var deleteArr = [];
            for (var i in this._bosspos) {
                var unit = this._bosspos[i];
                var time = unit.time;
                var skill = unit.skill;
                var param = unit.param;
                if (time == BattleStatus.battleLogicHasTickTime) {
                    if (Number(skill) == 1001 && param.boss) {
                        //召唤小怪
                        BattleStatus.scene.createSnakeMonster(param.isMe, param.monsterVoarr);
                    }
                    if (Number(skill) == 1002 && param.boss) {
                        //每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
                        var selectarr = param.arr;
                        var dicelist = this.getDiceList(param.isMe);
                        for (var i_2 in selectarr) {
                            var key = selectarr[i_2];
                            var dice = dicelist[key];
                            if (dice) {
                                dice.setSilence();
                            }
                        }
                    }
                    if (String(skill) == "1003_1" && param.boss) {
                        //隕石:隨機摧毀任一骰子，任何骰子點數都會直接從場上移除，如果在隕石砸落期間，拿到別處合成則可以免疫攻擊     
                        var dicelist = BattleStatus.scene.getDiceList(param.isMe);
                        var keys = Object.keys(dicelist);
                        if (keys.length) {
                            this.damageDice(param.pos, param.isMe);
                        }
                    }
                    if (String(skill) == "1003_2") {
                        //淨化:移除路径上所有物品，如地雷或尖刺等，並覆蓋一層護罩（移除身上所有附加状态，毒、减防、冰冻、吸收等）
                        if (param.boss) {
                            Obstacle.releaseObstacleInRange(new egret.Point(param.boss.x, param.boss.y), param.radius, param.isMe);
                            param.boss.removeAllBuff();
                        }
                    }
                    if (String(skill) == "1003_3") {
                        ////恢復:恢復25%的血量，BOSS原本最大血量
                        if (param.boss) {
                            param.boss.heal();
                        }
                    }
                    if (Number(skill) == 1004 && param.boss) {
                        //每間隔7秒隨機封鎖任一骰子，該骰子喪失能力    参数：{ X 秒，沉默Y个骰子 }
                        var dicelist = this.getDiceList(param.isMe);
                        for (var i_3 in dicelist) {
                            var dice = dicelist[i_3];
                            if (dice) {
                                dice.changeSelf();
                            }
                        }
                    }
                    if (param.boss) {
                        param.boss.setSkill();
                    }
                }
                else if (time < BattleStatus.battleLogicHasTickTime) {
                    deleteArr.push(i);
                }
            }
            for (var i in deleteArr) {
                this._bosspos.splice(deleteArr[i], 1);
            }
        }
    };
    BattleView.prototype.setOnlyCreateMons = function (bool) {
        this._onlyCreateMons = bool;
    };
    BattleView.prototype.removeSilence = function (isMe) {
        if (BattleStatus.scene) {
            var dicelist = BattleStatus.scene.getDiceList(isMe);
            var keys = Object.keys(dicelist);
            for (var i = 0; i < keys.length; ++i) {
                var key = keys[i];
                var dice = dicelist[key];
                if (dice) {
                    dice.removeSilence();
                }
            }
        }
    };
    BattleView.prototype.checkBattleResult = function () {
        var result = false;
        if (BattleStatus.checkNextRound()) {
            this.removeSilence(true);
            this.removeSilence(false);
        }
        if (BattleStatus.checkBattleResult()) {
            this.battleSync(1);
            this.sendBattleEnd();
            result = true;
        }
        return result;
    };
    BattleView.prototype.optListHandler = function (cFrame) {
        if (this._hasDoOptList[cFrame]) {
            return;
        }
        var syncList = BattleStatus.battleSyncList;
        var frames = Object.keys(syncList);
        frames.sort(function (a, b) {
            return Number(a) - Number(b);
        });
        var l = frames.length;
        for (var f = 0; f < l; f++) {
            var logicFrameIdx = frames[f];
            if (syncList.hasOwnProperty(logicFrameIdx)) {
                var frameData = syncList[logicFrameIdx];
                if (frameData) {
                    var syncOptData = frameData.syncOptData;
                    if (syncOptData && Object.keys(syncOptData).length > 0) {
                        var data = syncOptData[cFrame];
                        if (data) {
                            this._hasDoOptList[cFrame] = 1;
                            var opts = data.opt;
                            if (opts) {
                                var l_1 = opts.length;
                                for (var i = 0; i < l_1; i++) {
                                    var opt = opts[i];
                                    var isMe = (Api.UserinfoVoApi.getUid() == opt.optUid);
                                    switch (opt.opt) {
                                        case 1: //升级
                                            this.optPowUp(opt.upId, isMe);
                                            break;
                                        case 2: //合成
                                            if (isMe && Api.GameinfoVoApi.getIsGuiding()) {
                                                ++this._composeIdx;
                                            }
                                            this.composeHandler(opt.fromPos, opt.toPos, isMe, opt.optseed, opt.frame);
                                            if (Api.GameinfoVoApi.checlIsInGuideId(9)) {
                                                App.CommonUtil.sendNewGuideId(9);
                                                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                                                this._guidepos.push({
                                                    time: BattleStatus.battleLogicHasTickTime + (Math.ceil(5000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
                                                    guideid: "10"
                                                });
                                            }
                                            break;
                                        case 3: //购买骰子
                                            this.optBuyDice(opt.optseed, opt.frame, isMe);
                                            break;
                                        case 4: //认输
                                            isMe ? (BattleStatus.winFlag = 0) : (BattleStatus.winFlag = 1); //勿删
                                            this.sendBattleEnd();
                                            break;
                                        case 5: // 表情
                                            this.displayChatDB(opt, isMe);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    };
    /**
     * 机器人逻辑
     */
    BattleView.prototype.checkAiOpt = function () {
        if (Api.GameinfoVoApi.getIsGuiding()) {
        }
        else {
            //游戏初期开始阶段
            var need = Api.BattleVoApi.getNeedSpNum(false);
            var have = Api.BattleVoApi.getSpNum(false);
            if (need <= 100) {
                if (need == 10) {
                    for (var i = 1; i <= 4; ++i) {
                        this._aioptpos.push({
                            opt: "buy",
                            time: BattleStatus.battleLogicHasTickTime + BattleStatus.getPrepareTime() + (Math.ceil(1000 * i / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame)
                        });
                    }
                    this._needAiCheck = false;
                }
                else {
                    if (need >= 50) {
                        //1级机器人，只会召唤
                        if (this._switch.onlyBuy) {
                            if (Api.BattleVoApi.checkBuyDice(false) && !(this._switch.maxMonster && Object.keys(this._targetDiceList).length >= this._switch.maxMonster)) {
                                this._aioptpos.push({
                                    opt: "buy",
                                    time: BattleStatus.battleLogicHasTickTime + BattleStatus.minLogicFrame
                                });
                            }
                        }
                        else {
                            if (this._needAiCheckCompose) {
                                this._needAiCheckCompose = false;
                                this.checkAiCompose();
                            }
                            else {
                                if (Api.BattleVoApi.checkBuyDice(false)) {
                                    this._aioptpos.push({
                                        opt: "buy",
                                        time: BattleStatus.battleLogicHasTickTime + BattleStatus.minLogicFrame
                                    });
                                }
                            }
                        }
                    }
                }
            }
            else {
                //1级机器人，只会召唤
                if (this._switch.onlyBuy) {
                    if (Api.BattleVoApi.checkBuyDice(false) && !(this._switch.maxMonster && Object.keys(this._targetDiceList).length >= this._switch.maxMonster)) {
                        this._aioptpos.push({
                            opt: "buy",
                            time: BattleStatus.battleLogicHasTickTime + BattleStatus.minLogicFrame
                        });
                    }
                }
                else {
                    //优先检测增幅类的powerup 如果能powerup就powerup，不能则继续走召唤
                    var ispower = this.checkAiPowerup(true);
                    if (!ispower) {
                        if (this._needAiCheckCompose) {
                            this._needAiCheckCompose = false;
                            this.checkAiCompose();
                        }
                        else {
                            if (Api.BattleVoApi.checkBuyDice(false)) {
                                if (Object.keys(this._targetDiceList).length == 15) {
                                    this._needAiCheckCompose = false;
                                    this.checkAiCompose();
                                }
                                else {
                                    this._aioptpos.push({
                                        opt: "buy",
                                        time: BattleStatus.battleLogicHasTickTime + BattleStatus.minLogicFrame
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
    };
    //检测powerup bool：true 优先增幅 false 非增幅
    BattleView.prototype.checkAiPowerup = function (bool) {
        var need = Api.BattleVoApi.getNeedSpNum(false);
        var have = Api.BattleVoApi.getSpNum(false);
        //需要检测合成、powerup操作 优先级100之前算增幅
        var powerobj = [];
        var UpInfo = Api.BattleVoApi.getInitInfo(false).upInfo;
        var l = UpInfo.length;
        for (var i = 0; i < l; i++) {
            var cfg = Config.DiceCfg.getCfgById(UpInfo[i].id);
            var aiPowerUp = cfg.randomPowerUp;
            var vo = Api.BattleVoApi.getBattleData(false);
            var pwLv = vo.getPwlvById(cfg.id);
            var powerUpCostSp = Api.BattleVoApi.getPowerUpCostByLv(pwLv);
            powerobj.push({
                id: cfg.id,
                powerup: powerUpCostSp,
                powerupPrio: aiPowerUp
            });
        }
        //powerup优先排序
        powerobj.sort(function (a, b) {
            return a.powerupPrio - b.powerupPrio;
        });
        //召唤所需SP小于等于增幅 类骰子powerUp所需SP
        var ispowerup = false;
        if (this._switch.canPowerUp) {
            var count = 0;
            for (var i = 0; i < powerobj.length; ++i) {
                var unit = powerobj[i];
                //有无增幅类
                var isAddPri = bool ? (unit.powerupPrio <= 100) : (unit.powerupPrio > 100);
                if (isAddPri) {
                    if (have >= unit.powerup && need > unit.powerup) {
                        ispowerup = true;
                        // ++ count;
                        this._aioptpos.push({
                            opt: "powerup",
                            powerid: unit.id,
                            time: BattleStatus.battleLogicHasTickTime + BattleStatus.minLogicFrame //+ (1000 * count)
                        });
                        break;
                        //this.optPowUp(unit.id, false);
                    }
                }
            }
        }
        return ispowerup;
    };
    //检测合成  true 优先合成 false 非合成
    BattleView.prototype.checkAiCompose = function () {
        //合成类骰子优先级进行合成 不行就检测格子
        if (!this.aiCompose(true)) {
            //没有空格子了 合成非合成
            if (Object.keys(this._targetDiceList).length == 15) {
                if (!this.aiCompose(false)) {
                    this.checkAiPowerup(false);
                }
            }
        }
    };
    BattleView.prototype.aiCompose = function (bool) {
        var isCompose = false;
        var need = Api.BattleVoApi.getNeedSpNum(false);
        var have = Api.BattleVoApi.getSpNum(false);
        var composeobj = [];
        var list = this._targetDiceDataList;
        for (var key in list) {
            if (list.hasOwnProperty(key)) {
                var diceData = list[key];
                var cfg = Config.DiceCfg.getCfgById(diceData.id);
                var aiCompose = cfg.randomCompose;
                composeobj.push({
                    id: diceData.id,
                    pos: key,
                    compose: this.canComposeTarget(key, false),
                    composePrio: aiCompose,
                    stars: diceData.star
                });
            }
        }
        composeobj.sort(function (a, b) {
            //合成类 数字小的优先
            //非合成类 数字小的优先，以及点数小的优先合成
            if (a.composePrio == b.composePrio) {
                return a.stars - b.stars;
            }
            else {
                return a.composePrio - b.composePrio;
            }
        });
        var count = 0;
        for (var i = 0; i < composeobj.length; ++i) {
            var unit = composeobj[i];
            for (var j = 0; j < unit.compose.length; ++j) {
                //有无合成类
                var tmp = unit.compose[j];
                var isAddPri = bool ? (tmp.prio <= 100) : (tmp.prio > 100);
                if (isAddPri) {
                    if (this.checkComposeFlag(this._targetDiceDataList[unit.pos], this._targetDiceDataList[tmp.pos])) {
                        isCompose = true;
                        // ++ count;
                        this._aioptpos.push({
                            opt: "compose",
                            fpos: unit.pos,
                            tpos: tmp.pos,
                            time: BattleStatus.battleLogicHasTickTime + (Math.ceil(800 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame) //+ (1000 * count)
                        });
                        //this.composeHandler(unit.pos,tmp.pos,false,egret.getTimer(),Math.ceil(BattleStatus.battleLogicHasTickTime/BattleStatus.logicFrame));
                        break;
                    }
                }
            }
            if (isCompose) {
                break;
            }
        }
        return isCompose;
    };
    BattleView.prototype.canComposeTarget = function (pos, isMe) {
        var list = isMe ? this._meDiceDataList : this._targetDiceDataList;
        var strarr = [];
        var from = list[pos];
        for (var key in list) {
            if (list.hasOwnProperty(key) && pos !== key) {
                var diceData = list[key];
                var cfg = Config.DiceCfg.getCfgById(diceData.id);
                if (this.checkComposeFlag(from, diceData)) {
                    strarr.push({
                        pos: key,
                        prio: cfg.randomCompose
                    });
                }
            }
        }
        strarr.sort(function (a, b) {
            return a.prio - b.prio;
        });
        return strarr;
    };
    /**
     * 机器人逻辑 end
     */
    BattleView.prototype.optBuyDice = function (optseed, frame, isMe) {
        // if(Api.BattleVoApi.checkBuyDice(isMe))
        // {
        if (isMe && Object.keys(this._meDiceDataList).length < 15) {
            SoundMgr.playEffect(SoundConst.EFFECT_BORN);
        }
        if (isMe && (!this._diretCreateDice)) {
            this.checkMePreCreateDice(optseed, frame);
        }
        else {
            this.createDice(isMe, optseed, frame);
        }
        this.refreshSpTxt();
        if (Api.GameinfoVoApi.checlIsInGuideId(7)) {
            if (isMe && this._guidepos.length == 0) {
                var dice1 = this._meDiceList["1_1"];
                var dice2 = this._meDiceList["3_1"];
                App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                var group = new BaseDisplayObjectContainer();
                this.addChild(group);
                group.touchEnabled = false;
                group.touchChildren = false;
                group.width = 280;
                group.height = 140;
                var shp1 = new egret.Shape();
                shp1.graphics.beginFill(0x000000, 0);
                shp1.graphics.drawRect(0, 0, group.width, group.height);
                shp1.graphics.endFill();
                group.addChild(shp1);
                this.guideRect = group;
                group.setPosition(dice1.x - 48, dice1.y - dice1.height / 2 - 35);
                this._guidepos.push({
                    time: BattleStatus.battleLogicHasTickTime + (Math.ceil(6000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
                    guideid: "9"
                });
            }
        }
        if (Api.GameinfoVoApi.checlIsInGuideId(3) || Api.GameinfoVoApi.checlIsInGuideId(5)) {
            if (isMe) {
                if (Api.GameinfoVoApi.checlIsInGuideId(3)) {
                    App.MsgHelper.dispEvt(MsgConst.CLOSE_GUIDE);
                    this._guidepos.push({
                        time: BattleStatus.battleLogicHasTickTime + (Math.ceil(1000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
                        guideid: "5"
                    });
                }
                else {
                    this.battlePause();
                    Api.GameinfoVoApi.setCurGudingId(7);
                    App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                }
            }
        }
        // }
    };
    BattleView.prototype.optPowUp = function (upId, isMe) {
        if (Api.BattleVoApi.checkPowerUp(upId, isMe)) {
            var pwlv = Api.BattleVoApi.diceLvup(upId, isMe);
            if (isMe) {
                SoundMgr.playEffect(SoundConst.EFFECT_UPGRADE);
                this.refreshUpdice();
            }
            var upinfo = this.getChildByName("up" + upId);
            if (upinfo) {
                upinfo.refresh(isMe);
                if (isMe) {
                    //显示动画
                    var cfg = Config.DiceCfg.getCfgById(upId);
                    var str = cfg.getPowerUpString();
                    var txtImg_1 = ComponentMgr.getTextField(str, 20, 0xFFFFFF);
                    txtImg_1.stroke = 3;
                    txtImg_1.textAlign = egret.HorizontalAlign.CENTER;
                    txtImg_1.strokeColor = 0xc500ef; //ColorEnums.strokePurple;//0xF374FF;
                    txtImg_1.lineSpacing = 10;
                    txtImg_1.anchorOffsetX = txtImg_1.width / 2;
                    txtImg_1.anchorOffsetY = txtImg_1.height / 2;
                    txtImg_1.alpha = 0;
                    txtImg_1.setPosition(upinfo.x - 16, upinfo.y - txtImg_1.anchorOffsetY - 8);
                    this.addChild(txtImg_1);
                    var time = BattleStatus.timeparam;
                    var tmpY = txtImg_1.y;
                    egret.Tween.get(txtImg_1).to({ alpha: 1, y: tmpY - 40 }, 15 * time).to({ y: tmpY - 55 }, 10 * time).to({ alpha: 0, y: tmpY - 65 }, 5 * time).call(function () {
                        txtImg_1.dispose();
                        txtImg_1 = null;
                    }, this);
                }
            }
            if (!isMe) {
                this.enemyLvs["ene_" + upId] && (this.enemyLvs["ene_" + upId].text = "LV." + pwlv);
                if (pwlv >= 5) {
                    this.enemyLvs["ene_" + upId].text = "Max";
                    // this.enemyLvsIcon[`ene_${upId}`].filters == null && App.DisplayUtil.changeToGray(this.enemyLvsIcon[`ene_${upId}`]);
                }
            }
            var diceDataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
            var diceList = isMe ? this._meDiceList : this._targetDiceList;
            var id = upId;
            for (var key in diceDataList) {
                if (diceDataList.hasOwnProperty(key)) {
                    var diceData = diceDataList[key];
                    if (diceData.id == id) {
                        var item = diceList[diceData.posStr];
                        item && item.powerup(pwlv);
                    }
                }
            }
        }
    };
    BattleView.prototype.composeHandler = function (fpos, tpos, isMe, optseed, frame) {
        var dataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
        var diceList = isMe ? this._meDiceList : this._targetDiceList;
        var fdata = dataList[fpos];
        var tdata = dataList[tpos];
        var fdice = diceList[fpos];
        var tdice = diceList[tpos];
        if (fdata && tdata && fdice && tdice && this.checkComposeFlag(fdata, tdata)) {
            //小丑处理
            if (fdata.checkIsMirror() && !tdata.checkIsMirror()) {
                this.copyDice(tdata, fpos, frame);
                if (isMe) {
                    delete this._clientWaitOptList[tpos];
                    delete this._clientWaitOptList[fpos];
                }
            }
            //换位处理
            else if (fdata.checkIsChangePosDice() && !tdata.checkIsChangePosDice()) {
                this.changePosDice(tpos, fpos, isMe);
                if (isMe) {
                    delete this._clientWaitOptList[tpos];
                    delete this._clientWaitOptList[fpos];
                }
            }
            //营养骰子
            else if (fdata.checkIsNutritionDice()) {
                if (!tdata.checkMaxStar()) {
                    if (tdata.checkIsAddSp()) {
                        tdice.addSp(tdata.star);
                    }
                    tdata.star += 1;
                    tdice.refresh(tdata);
                    delete dataList[fpos];
                    delete diceList[fpos];
                    fdice.beComposed();
                    if (tdata.isMe) {
                        SoundMgr.playEffect(SoundConst.EFFECT_COMPOSE);
                    }
                }
                else {
                    fdice && fdice.resetPos();
                }
                if (isMe) {
                    delete this._clientWaitOptList[tpos];
                    delete this._clientWaitOptList[fpos];
                }
            }
            else {
                //安全校验
                var iskill = tdata.checkIsKillDice();
                var istransfer = tdata.checkIsTransferDice();
                if (!tdata.checkMaxStar()) {
                    //武器骰子打对面
                    if (iskill) {
                        this.killEnermyDice({ x: fdice.x, y: fdice.y }, isMe);
                    }
                    if (istransfer) {
                        this.transferEnermy(isMe, tdata.star);
                        if (BattleStatus.battleType == 2) {
                            this.transferEnermy(isMe, tdata.star);
                            this.transferEnermy(!isMe, tdata.star);
                        }
                    }
                    this._bothAddsp = tdata.checkIsAddSp() && fdata.checkIsAddSp();
                    this.createDice(tdata.isMe, optseed, frame, tpos, 'pre');
                    delete dataList[fpos];
                    delete diceList[fpos];
                    fdice.beComposed();
                    if (tdata.isMe) {
                        SoundMgr.playEffect(SoundConst.EFFECT_COMPOSE);
                    }
                }
                else {
                    fdice && fdice.resetPos();
                }
                if (isMe) {
                    delete this._clientWaitOptList[tpos];
                    delete this._clientWaitOptList[fpos];
                }
            }
        }
        else {
            fdice && fdice.resetPos();
            delete this._clientWaitOptList[tpos];
            delete this._clientWaitOptList[fpos];
        }
    };
    //pvp模式暗杀 pve模式升级
    BattleView.prototype.damageDice = function (fpos, isMe) {
        var _this = this;
        //选取一个目标
        var dataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
        var diceList = isMe ? this._meDiceList : this._targetDiceList;
        var keys = Object.keys(dataList);
        var rid = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + Api.BattleVoApi.getBattleData(isMe).uid));
        console.log("\u9668\u77F3\u7838\u4E86\u4E0B\u6765\uFF01 " + (isMe ? "\u6211\u65B9" : "\u654C\u65B9") + "\u968F\u673A\u79CD\u5B50,\u5F53\u524D\u5E27\u662F" + BattleStatus.battleLogicHasTickTime + ",uid\u662F" + Api.BattleVoApi.getBattleData(isMe).uid + "\uFF0C\u6700\u540Erid\u662F" + rid + ",\u5750\u6807" + keys[rid]);
        var pos = keys[rid];
        var tdice = diceList[pos];
        if (tdice) {
            this._damagepos.push({
                pos: pos,
                isMe: isMe,
                time: BattleStatus.battleLogicHasTickTime + (Math.ceil(1560 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame)
            });
            var limitData = BattleStatus.getLimitPos();
            var posData = isMe ? limitData.me : limitData.target;
            // let key = 
            //posData[`pos0`].x posData[`pos0`].y - 200
            if (isMe) {
            }
            var startPoint_1 = new egret.Point(500, isMe ? (GameConfig.stageHeigth / 2) : 0);
            var endPoint = new egret.Point(tdice.x, tdice.y);
            //头部
            var toubu_1 = BaseLoadBitmap.create("diceyunshi");
            toubu_1.width = 323;
            toubu_1.height = 188;
            toubu_1.anchorOffsetX = toubu_1.width / 2;
            toubu_1.anchorOffsetY = toubu_1.height / 2;
            this.addChild(toubu_1);
            toubu_1.alpha = 0;
            toubu_1.setPosition(startPoint_1.x, startPoint_1.y);
            //瞄准
            //刺杀clip
            var clip_2 = ComponentMgr.getCustomMovieClip("dicedamage", null, 70);
            clip_2.setEndCallBack(function () {
                clip_2.dispose();
                clip_2 = null;
            }, this);
            clip_2.anchorOffsetX = 316 / 2;
            clip_2.anchorOffsetY = 316 / 2;
            clip_2.setPosition(endPoint.x + 5, endPoint.y);
            this.addChild(clip_2);
            clip_2.playWithTime(1);
            var distance = App.MathUtil.getDistance(startPoint_1, endPoint);
            var halfx = startPoint_1.x + (endPoint.x - startPoint_1.x) * 0.9;
            var halfy = startPoint_1.y + (endPoint.y - startPoint_1.y) * 0.9;
            var count = 1;
            egret.Tween.get(toubu_1, { onChange: function () {
                    if (toubu_1) {
                        var angle = Math.atan2(toubu_1.y - startPoint_1.y, toubu_1.x - startPoint_1.x) * 180 / Math.PI;
                        toubu_1.rotation = angle;
                    }
                }, onChangeObj: this }).wait(1260).call(function () {
                toubu_1.alpha = 1;
                _this.playEffect("effect_boss_1003_1");
            }, this).to({ x: endPoint.x, y: endPoint.y }, 300).call(function () {
                egret.Tween.removeTweens(toubu_1);
                toubu_1.alpha = 0;
                toubu_1.dispose();
                toubu_1 = null;
            }, this);
        }
    };
    //pvp模式暗杀 pve模式升级
    BattleView.prototype.killEnermyDice = function (fpos, isMe) {
        var _this = this;
        //选取一个目标
        var dataList = isMe ? this._targetDiceDataList : this._meDiceDataList;
        var diceList = isMe ? this._targetDiceList : this._meDiceList;
        var keys = [];
        for (var i in dataList) {
            if (dataList[i].star < 7) {
                keys.push(i);
            }
        }
        if (keys.length == 0) {
            keys = Object.keys(dataList);
        }
        if (keys.length == 0) {
            return;
        }
        var rid = Math.floor(App.MathUtil.seededRandom(0, keys.length, BattleStatus.battleLogicHasTickTime + Api.BattleVoApi.getBattleData(isMe).uid));
        var pos = keys[rid];
        this._killpos.push({
            pos: pos,
            isMe: isMe,
            time: BattleStatus.battleLogicHasTickTime + (Math.ceil(1000 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame)
        });
        var tdice = diceList[pos];
        var startPoint = new egret.Point(fpos.x, fpos.y);
        var endPoint = new egret.Point(tdice.x, tdice.y);
        // let star = BaseLoadBitmap.create(`dicestar107`);
        // star.anchorOffsetX = 15;
        // star.anchorOffsetY = 15;
        // this.addChild(star);
        // star.setPosition(startPoint.x,startPoint.y);
        // let star2 = BaseLoadBitmap.create(`dicestar107`);
        // star2.anchorOffsetX = 15;
        // star2.anchorOffsetY = 15;
        // this.addChild(star2);
        // star2.setPosition(endPoint.x,endPoint.y);
        var name = "effect_dice_412";
        if (RES.hasRes(name)) {
            SoundMgr.playEffect(name);
        }
        //瞄准
        var miaozhun = BaseLoadBitmap.create("dice412mz");
        miaozhun.width = 119;
        miaozhun.height = 119;
        miaozhun.anchorOffsetX = miaozhun.width / 2;
        miaozhun.anchorOffsetY = miaozhun.height / 2;
        this.addChild(miaozhun);
        miaozhun.setScale(0);
        miaozhun.setPosition(endPoint.x, endPoint.y);
        egret.Tween.get(miaozhun).to({ scaleX: 1.07, scaleY: 1.07 }, 200).to({ scaleX: 1, scaleY: 1 }, 260).wait(470).call(function () {
            _this.addChild(clip);
            clip.playWithTime(1);
        }, this).wait(70).call(function () {
            egret.Tween.removeTweens(miaozhun);
            miaozhun.alpha = 0;
            miaozhun.dispose();
            miaozhun = null;
        }, this);
        //刺杀clip
        var clip = ComponentMgr.getCustomMovieClip("adddice412", null, 70, BattleBaseEffect);
        clip.setEndCallBack(function () {
            clip.dispose();
            clip = null;
        }, this);
        clip.anchorOffsetX = 44;
        clip.anchorOffsetY = 30;
        clip.setScale(2);
        clip.setPosition(endPoint.x + 5, endPoint.y);
        //头部
        var toubu = BaseLoadBitmap.create("dice412toubu");
        toubu.width = 23;
        toubu.height = 24;
        toubu.anchorOffsetX = toubu.width / 2;
        toubu.anchorOffsetY = toubu.height / 2;
        this.addChild(toubu);
        toubu.alpha = 0;
        toubu.setPosition(startPoint.x, startPoint.y);
        var distance = App.MathUtil.getDistance(startPoint, endPoint);
        var halfx = startPoint.x + (endPoint.x - startPoint.x) * 0.9;
        var halfy = startPoint.y + (endPoint.y - startPoint.y) * 0.9;
        var count = 1;
        egret.Tween.get(toubu).wait(200).call(function () {
            toubu.alpha = 1;
        }, this).to({ x: halfx, y: halfy }, 200).to({ x: endPoint.x, y: endPoint.y }, 200).wait(320).call(function () {
            egret.Tween.removeTweens(toubu);
            toubu.alpha = 0;
            toubu.dispose();
            toubu = null;
        }, this);
        //尾部
        var weibu = BaseLoadBitmap.create("dice412weibu");
        weibu.width = 15;
        weibu.height = 74;
        weibu.anchorOffsetX = weibu.width / 2;
        weibu.anchorOffsetY = 0;
        this.addChild(weibu);
        weibu.scaleY = 0;
        weibu.setPosition(startPoint.x, startPoint.y);
        egret.Tween.get(weibu, { onChange: function () {
                if (weibu) {
                    var angle = Math.atan2(weibu.y - startPoint.y, weibu.x - startPoint.x) * 180 / Math.PI + 90;
                    weibu.rotation = angle;
                }
            }, onChangeObj: this }).wait(200).to({ x: halfx, y: halfy }, 200).to({ x: endPoint.x, y: endPoint.y }, 200).wait(320).call(function () {
            egret.Tween.removeTweens(weibu);
            weibu.alpha = 0;
            weibu.dispose();
            weibu = null;
        }, this);
        var halfscale = distance * 0.8 / weibu.height;
        egret.Tween.get(weibu).wait(200).to({ scaleY: 1 }, 60).to({ scaleY: halfscale }, 340).to({ scaleX: 0, alpha: 0 }, 320);
        //粒子
        /**
         * 大概的感觉就是，跟着toubu后面，随着他的走动出现，淡入淡出就可以
        lizi的生命大概是0.5s左右，（0.4-0.6之间）（时间：0-0.25-0.5s 透明度0-100%-0）
        大小缩放：0.3-1.2倍就可以
        然后跟着toubu走的轨迹出现的时候，也要有一点跟着toubu走的运动的趋势，也就是有一点点速度，他不是原地出现消失的，是有一点点的动态，整体大概画面中有个七八个粒子就差不多
        可以看着gif图的感觉来，具体实现方法，程序怎么方便怎么来
        */
        var dis = [0.1, 0.15, 0.3, 0.35, 0.5, 0.6, 0.8];
        var _loop_1 = function (i) {
            var lizi = BaseBitmap.create("dice412lizi");
            lizi.width = lizi.height = 15;
            lizi.anchorOffsetX = lizi.width / 2;
            lizi.anchorOffsetY = lizi.height / 2;
            this_1.addChild(lizi);
            lizi.alpha = 0;
            var halfx_1 = startPoint.x + (endPoint.x - startPoint.x) * dis[i];
            var halfy_1 = startPoint.y + (endPoint.y - startPoint.y) * dis[i];
            lizi.setPosition(halfx_1, halfy_1);
            var tmpx = halfx_1 + 10;
            var tmpy = halfy_1 + 10 * (endPoint.y - startPoint.y) / (endPoint.x - startPoint.x);
            var wait = 200 + i * 30;
            egret.Tween.get(lizi).wait(wait).to({ alpha: 1, scaleX: 0.3, scaleY: 0.3 }, 250).to({ alpha: 0, scaleX: 1.2, scaleY: 1.2 }, 250);
            egret.Tween.get(lizi).wait(wait).to({ x: tmpx, y: tmpy }, 500).call(function () {
                egret.Tween.removeTweens(lizi);
                lizi.dispose();
                lizi = null;
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < dis.length; ++i) {
            _loop_1(i);
        }
    };
    //核弹爆炸
    BattleView.prototype.nuclearBoom = function (tdice, tdata, isMe) {
        var _this = this;
        //核爆非常特殊
        /**
         * 序列帧的动画和其他的有所不同
        hebao01单图播放：
        时间0-0.46-0.53-0.8
        缩放：0-0.95-1-1
        在0.8的那一刻，hebao02替换hebao01.然后间隔0.07s播放hebao03，再间隔0.07s播放hebao04，再间隔0.07shebao04移除画面。
        总结就是，先给hebao01做一个缩放动画，停留展示一会后，播放从hebao02开始的序列帧，帧间隔是0.07s。
        */
        var p1 = new egret.Point(tdice.x, tdice.y);
        var p2 = null;
        var centerDis = 0;
        var monstersList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var nuclearmonsterList = DiceHelper.diceFindMonster(tdata, isMe);
        var limitPos = BattleStatus.getLimitPos();
        var startPosCfg = isMe ? limitPos.me : limitPos.target;
        if (nuclearmonsterList.length) {
            var mvo = nuclearmonsterList[0];
            var monster = monstersList[mvo.getName()];
            if (monster) {
                centerDis = mvo.getCenterDis();
                p2 = new egret.Point(monster.x, monster.y);
            }
            else {
                // p2 = new egret.Point(42,isMe?902:20);
                p2 = new egret.Point(startPosCfg.pos0.x, startPosCfg.pos0.y);
            }
        }
        else {
            //起始点
            // p2 = new egret.Point(42,isMe?902:20);
            p2 = new egret.Point(startPosCfg.pos0.x, startPosCfg.pos0.y);
        }
        this._nuclearpos.push({
            time: BattleStatus.battleLogicHasTickTime + (Math.ceil(600 / BattleStatus.minLogicFrame) * BattleStatus.minLogicFrame),
            isMe: isMe,
            centerDis: centerDis,
            tdata: tdata
        });
        var toubu = BaseBitmap.create("dice401nuclear");
        toubu.width = 25;
        toubu.height = 25;
        toubu.anchorOffsetX = toubu.width / 2;
        toubu.anchorOffsetY = toubu.height / 2;
        this.addChild(toubu);
        toubu.alpha = 0;
        toubu.setPosition(p1.x, p1.y);
        var halfx = p1.x + (p2.x - p1.x) * 0.9;
        var halfy = p1.y + (p2.y - p1.y) * 0.9;
        egret.Tween.get(toubu).wait(200).call(function () {
            toubu.alpha = 1;
        }, this).to({ x: p2.x, y: p2.y }, 200).call(function () {
            if (isMe) {
                var name_1 = "effect_dice_401";
                if (RES.hasRes(name_1)) {
                    SoundMgr.playEffect(name_1);
                }
            }
            egret.Tween.removeTweens(toubu);
            toubu.alpha = 0;
            toubu.dispose();
            toubu = null;
            var hbao = BaseBitmap.create("addmst4010");
            hbao.anchorOffsetX = 224;
            hbao.anchorOffsetY = 223;
            hbao.setScale(0);
            _this.addChild(hbao);
            hbao.setPosition(p2.x, p2.y);
            var clip = ComponentMgr.getCustomMovieClip("addmst401", null, 70, BattleBaseEffect);
            clip.setEndCallBack(function () {
                clip.dispose();
                clip = null;
            }, _this);
            clip.setPosition(hbao.x, hbao.y);
            clip.anchorOffsetX = 224;
            clip.anchorOffsetY = 223;
            egret.Tween.get(hbao).to({ scaleX: 0.95, scaleY: 0.95 }, 460).to({ scaleX: 1, scaleY: 1 }, 70).wait(270).call(function () {
                hbao.alpha = 0;
                hbao.dispose();
                hbao = null;
                _this.addChild(clip);
                clip.playWithTime(1);
            }, _this);
        }, this);
    };
    BattleView.prototype.checkAndCreateMonster = function (isMe) {
        // let hasCreateNum=isMe?BattleStatus.hasCreateMonsterNum.me:BattleStatus.hasCreateMonsterNum.target;
        // if(hasCreateNum<BattleStatus.monsterNum)
        // {
        var newRoundData = isMe ? BattleStatus.meBatteRoundDataList : BattleStatus.targetBatteRoundDataList;
        var newMonsterList = newRoundData[String(BattleStatus.battleLogicHasTickTime - BattleStatus.getRoundStartT())];
        var monsterList = isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        if (newMonsterList) {
            var l = newMonsterList.length;
            for (var i = 0; i < l; i++) {
                var vo = newMonsterList[i];
                if (vo) {
                }
                var monster = this.createMonster(vo, isMe);
                monsterList[monster.name] = monster;
                monsterDataList.push(vo);
            }
        }
        // }
    };
    BattleView.prototype.setBossSkill = function (skill, time, param) {
        this._bosspos.push({
            time: time,
            skill: skill,
            param: param
        });
    };
    BattleView.prototype.createSnakeMonster = function (isMe, newMonsterList) {
        for (var i = 0; i < newMonsterList.length; ++i) {
            var enemyVo = newMonsterList[i];
            var bt = BattleStatus.battleLogicHasTickTime - BattleStatus.getRoundStartT() + Api.BattleVoApi.getAddMonsterDelay() + enemyVo.birthTime;
            enemyVo.birthTime = bt;
            enemyVo.isMe = isMe;
            enemyVo.isEnemy = true;
            var roundList = isMe ? BattleStatus.meBatteRoundDataList : BattleStatus.targetBatteRoundDataList;
            var voArr = roundList[bt];
            if (voArr) {
                voArr.push(enemyVo);
            }
            else {
                roundList[bt] = [enemyVo];
            }
            if (isMe) {
                BattleStatus.totalMonsterNum.me++;
            }
            else {
                BattleStatus.totalMonsterNum.target++;
            }
        }
    };
    BattleView.prototype.createMonster = function (data, isMe) {
        var bossid = data.getBossId();
        var classObj;
        if (data.getIsBoss()) {
            classObj = egret.getDefinitionByName("Boss" + bossid);
        }
        if (data.type == 1 && BattleStatus.battleType == 1 && data.inBaseRound) {
            BattleStatus.setType1MstCfg(isMe, data.getCfg());
        }
        // if(data.isEnemy)
        // {
        //     App.LogUtil.log("被生成怪物",isMe,data.hp,data.type);
        // }
        classObj = classObj || BaseMonster;
        var monster = new classObj(data, isMe);
        this["mons" + data.type + "Group"].addChild(monster);
        BattleStatus.checkMaxHp(data, isMe, 0);
        var numCfg = BattleStatus.hasCreateMonsterNum;
        if (isMe) {
            numCfg.me++;
        }
        else {
            numCfg.target++;
        }
        return monster;
    };
    BattleView.prototype.getMonsterByName = function (monsterData) {
        var mList = monsterData.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        return mList[monsterData.getName()]; //<BaseMonster>this[`mons${type}Group`].getChildByName(name);
    };
    BattleView.prototype.moveMonster = function (isMe, idx) {
        var _this = this;
        // let monsterList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        var monsterDataList = isMe ? BattleStatus.meMonsterDataList : BattleStatus.targetMonsterDataList;
        // let l=monsterDataList.length;
        // for (let i=l-1;i>=0;i--)
        // {
        var monsterData = monsterDataList[idx];
        if (!monsterData) {
            return;
        }
        if ((monsterData.birthTime > BattleStatus.battleLogicHasTickTime) || monsterData.isMoveEnd() || monsterData.isDie()) {
        }
        else if (monsterData.birthTime > 0) {
            var monster = this.getMonsterByName(monsterData);
            if (monster && (monster.isMe() == isMe)) {
                monster.move(function (monsterData) {
                    _this.monsterMoveHandler(monsterData);
                }, this);
                if (monsterData.getIsBoss()) {
                    var bossvo = monster;
                    bossvo.fastTick();
                }
            }
        }
        // }
    };
    BattleView.prototype.monsterMoveHandler = function (monsterData) {
        // let isMe=monsterData.isMe;
        // let monsterList=isMe?BattleStatus.meMonsterList:BattleStatus.targetMonsterList;
        // if(monsterData.isMoveEnd())
        // {
        //     this.deleteMonster(new egret.Event("",false,false,monsterData));
        // }
    };
    BattleView.prototype.sendBattleEnd = function (confess) {
        if (this._buyBtn && this._buyBtn.parent != this) {
            this._buyBtn.parent.removeChild(this._buyBtn);
            this.addChild(this._buyBtn);
        }
        this.battleStop();
        Api.UserinfoVoApi.setFreshInfo(false, new egret.Point(GameConfig.stageWidth / 2, GameConfig.stageHeigth / 2));
        if (confess) {
            Api.UserinfoVoApi.setFreshCard(false);
        }
        var data = {
            turns: BattleStatus.round + 1,
            winFlag: (confess ? 0 : BattleStatus.winFlag)
        };
        data.star = BattleStatus.hasMaxStar;
        data.starArr = BattleStatus.maxStarList;
        ViewController.getInstance().hideView(ViewConst.DICEDETAILINFOVIEW);
        NetManager.request(NetConst.BATTLE_END, data);
    };
    BattleView.prototype.battleStop = function (e) {
        if (this._count != -1) {
            egret.clearInterval(this._count);
            this._count = -1;
        }
        this.clearInitCount();
        TickMgr.removeFastTick(this.frameHandler, this);
        App.MsgHelper.removeEvt(NetConst.BATTLE_SYNC, this.battleSyncResult, this);
    };
    BattleView.prototype.battlePause = function () {
        this._isPause = true;
    };
    BattleView.prototype.battleResume = function () {
        this._isPause = false;
    };
    BattleView.prototype.checkBattleEnd = function (e) {
        var _this = this;
        if (this.slowPingData && this.slowPingData.num > 0) {
            StatisticsHelper.reportOwnNameLog(this.slowPingData, "battlesync");
        }
        var data = e.data;
        if (data.ret) {
            ViewController.getInstance().openView(ViewConst.BATTLERESULTVIEW, {
                type: BattleStatus.type,
                info: Api.BattleVoApi.getInitInfo(true),
                finfo: Api.BattleVoApi.getInitInfo(false),
                turns: BattleStatus.round + 1,
                winFlag: BattleStatus.winFlag,
                rewardArr: data.data.data.rewardArr,
                callback: function () {
                    Api.FairArenaVoApi.tweenPro = BattleStatus.winFlag === 1;
                    _this.hide();
                    Api.FairArenaVoApi.setFreshFair(true);
                    App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE, { type: "fight" });
                    if (Api.GameinfoVoApi.checlIsInGuideId(13)) {
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    }
                },
                handle: this
            });
        }
    };
    BattleView.prototype.checkDiceAtk = function (isMe, x, y) {
        var diceList = isMe ? this._meDiceList : this._targetDiceList;
        if (diceList) {
            // for (const key in diceList) 
            // {
            //     if (diceList.hasOwnProperty(key)) 
            //     {
            //         const dice = diceList[key];
            //         // if(dice.checkDoAction())
            //         // {
            //         //     let target=this.findMonster(isMe);
            //         //     target&&dice.setTarget(target);
            //         // }
            //         dice.fastTick();
            //     }
            // }
            var dice = diceList[x + "_" + y];
            if (!!dice) {
                dice.fastTick();
            }
        }
    };
    BattleView.prototype.getDiceList = function (isMe) {
        return isMe ? this._meDiceList : this._targetDiceList;
    };
    BattleView.prototype.getDiceDataList = function (isMe) {
        return isMe ? this._meDiceDataList : this._targetDiceDataList;
    };
    /**
     * 根据随机种子生成坐标
     * @param isMe 是否是自己
     * @param seed 随机种子
     * @param isPre 是否是预处理
     */
    BattleView.prototype.getCreateDicePos = function (isMe, seed, isPre) {
        var posArr = [];
        var diceDataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
        var w = 5;
        var h = 3;
        for (var i = 0; i < w; i++) {
            for (var j = 0; j < h; j++) {
                var posKey = i + "_" + j;
                if (!diceDataList[posKey]) {
                    if (isPre && this._mePreDiceDataList[posKey]) {
                        //如果也是预处理，则去重
                    }
                    else {
                        posArr.push(posKey);
                    }
                }
            }
        }
        var l = posArr.length;
        var pos = "";
        if (l > 0) {
            // let upinfo=Api.BattleVoApi.getInitInfo(isMe).upInfo;
            var p = Math.floor(App.MathUtil.seededRandom(0, l, seed));
            pos = posArr[p];
            if (Api.GameinfoVoApi.getIsGuiding()) {
                if (isMe) {
                    if (Api.GameinfoVoApi.checlIsInGuideId(3)) {
                        pos = "1_1";
                    }
                    else if (Api.GameinfoVoApi.checlIsInGuideId(5)) {
                        pos = "3_1";
                    }
                    else if (Api.GameinfoVoApi.checlIsInGuideId(7)) {
                        pos = "0_0";
                        if (this._meDiceDataList["0_0"] && !this._meDiceDataList["0_1"]) {
                            pos = "0_1";
                        }
                    }
                }
            }
        }
        return pos;
    };
    /**
     * 根据随机种子生成对应骰子ID
     * @param isMe 是否是自己
     * @param seed 随机种子
     * @param pos 位置ID
     */
    BattleView.prototype.getCreateDiceId = function (isMe, seed, pos, compose) {
        var upinfo = Api.BattleVoApi.getInitInfo(isMe).upInfo;
        var idL = upinfo.length;
        var idIdx = Math.floor(App.MathUtil.seededRandom(0, idL, seed + 1000));
        if (egret.getOption("buy")) {
            idIdx = Number(egret.getOption("buy"));
        }
        if (Api.GameinfoVoApi.getIsGuiding()) {
            if (isMe) {
                switch (pos) {
                    case "1_1":
                        idIdx = 0;
                        break;
                    case "3_1":
                        idIdx = 0;
                        break;
                    case "0_0":
                        idIdx = 1;
                        break;
                    case "0_1":
                        idIdx = 2;
                        break;
                }
                if (Api.GameinfoVoApi.checlIsInGuideId(9)) {
                    idIdx = 2;
                }
                // 火，火，风，冰，火，毒
                switch (this._buyMakeIdx) {
                    case 4:
                        idIdx = 0;
                        break;
                    case 5:
                        idIdx = 0;
                        break;
                    case 6:
                        idIdx = 2;
                        break;
                    case 7:
                        idIdx = 4;
                        break;
                    case 8:
                        idIdx = 0;
                        break;
                    case 9:
                        idIdx = 3;
                        break;
                }
                if (compose) {
                    switch (this._composeIdx) {
                        case 1:
                            idIdx = 2;
                            break;
                        case 2:
                            idIdx = 0;
                            break;
                    }
                }
            }
            else {
                switch (seed) {
                    case 1:
                        idIdx = 4;
                        break;
                    case 2:
                        idIdx = 4;
                        break;
                    case 3:
                        idIdx = 0;
                        break;
                    case 4:
                        idIdx = 3;
                        break;
                }
            }
        }
        return upinfo[idIdx];
    };
    /**
     * 生成骰子数据
     * @param isMe 是否是我自己
     * @param seed 随机种子
     * @param frame 逻辑帧，用于计算生成时间
     * @param compose 如果是合成，值为合成位置的坐标ID，否则就是购买
     * @param stars
     * @param isPre 是否是预处理
     */
    BattleView.prototype.createDiceData = function (isMe, seed, frame, compose, stars, isPre) {
        //引导中是固定位置和固定骰子
        var result = { nData: null, oData: null };
        var diceDataList = isMe ? this._meDiceDataList : this._targetDiceDataList;
        var pos = compose ? compose : this.getCreateDicePos(isMe, seed, isPre);
        if (isPre) {
            console.log("pre optseed:" + seed, "pos:", pos);
        }
        if (pos) {
            var lastData = compose ? diceDataList[compose] : null;
            var star = stars ? stars : (lastData ? lastData.star + 1 : 0);
            var diceInfo = this.getCreateDiceId(isMe, seed, pos, compose);
            if (isPre) {
                console.log("pre optseed:" + seed, "id:", diceInfo.id);
            }
            var data = Api.BattleVoApi.createDiceDataById(diceInfo, pos, frame, isMe, star, isPre);
            if (isPre) {
                if (!compose) {
                    data.cost = Api.BattleVoApi.getNeedSpNum(isMe);
                }
                this._mePreDiceDataList[pos] = data;
            }
            else {
                diceDataList[pos] = data;
            }
            result.nData = data;
            result.oData = lastData;
        }
        return result;
    };
    BattleView.prototype.preBuyCreateDice = function (isMe, seed) {
        return this.createDice(isMe, seed, 0, null, null, NaN, true);
    };
    /**
     * 收到数据之后，从预处理列表里面找数据，并且标记可用
     * @param seed 随机种子
     * @param frame 生效的逻辑帧
     */
    BattleView.prototype.checkMePreCreateDice = function (seed, frame) {
        var pos = this.getCreateDicePos(true, seed, false);
        console.log("pre result optseed:" + seed, "pos:", pos);
        var data = this._mePreDiceDataList[pos];
        if (data) {
            console.log("pre result optseed:" + seed, "id:", data.id);
            delete this._mePreDiceDataList[pos];
            data.setBirthTime(frame * BattleStatus.logicFrame);
            this._meDiceDataList[pos] = data;
            var dice = this._mePreDiceList[pos];
            if (dice) {
                delete this._mePreDiceList[pos];
                this._meDiceList[pos] = dice;
                dice.checkLine();
                this.checkSuns(dice.getDiceData().isMe);
            }
        }
    };
    /**
     * 创建骰子
     * @param isMe 是否是我自己
     * @param seed 随机种子
     * @param frame 逻辑帧数，第几个逻辑帧，用于计算骰子出生时间
     * @param compose 如果有值，则是合成目标的坐标ID，否则就是购买，默认为空
     * @param appeareff
     * @param stars
     * @param isPre 是否是预处理，默认false，不预处理
     */
    BattleView.prototype.createDice = function (isMe, seed, frame, compose, appeareff, stars, isPre) {
        //引导中是固定位置和固定骰子
        var dice = null;
        var isgrow = appeareff == "grow";
        var _a = this.createDiceData(isMe, seed, frame, compose, stars, isPre), nData = _a.nData, oData = _a.oData; //只有compose有值时候oData才有值
        if (!nData) {
            isMe && App.CommonUtil.showTip(LangMger.getlocal("dicenospace"));
            return null;
        }
        var diceList = isMe ? this._meDiceList : this._targetDiceList;
        if (oData) {
            dice = diceList[compose];
            if (dice && dice.getDiceData() && dice.getDiceData().checkIsSummonDice() && !isgrow) {
                //召唤骰子 1、2星的召喚骰固定召喚1星骰，3星隨機1~2星，4星隨機1~3星
                var newstars = Math.max(1, Math.floor(App.MathUtil.seededRandom(1, dice.getDiceStars(), seed)));
                var newdice = this.createDice(isMe, seed, frame, null, "summon", newstars);
            }
            if (nData.id != oData.id) {
                delete diceList[compose];
                dice.dispose();
                dice = null;
            }
        }
        if (dice) {
            dice.refresh(nData, appeareff);
            if (nData.checkIsAddSp() && !isgrow) {
                var tmp = dice;
                tmp.addSp(nData.star - 1);
            }
        }
        else {
            var classObj = egret.getDefinitionByName("Dice" + nData.id);
            classObj = classObj || BaseDice;
            dice = new classObj(nData, appeareff);
            this._diceLayer.addChild(dice);
            BattleStatus.bulletZidx = this.getChildIndex(this.mons4Group) + 1;
            var _b = dice.getPos(), x = _b.x, y = _b.y;
            if (isPre) {
                this._mePreDiceList[x + "_" + y] = dice;
            }
            else {
                diceList[x + "_" + y] = dice;
                dice.checkLine();
                this.checkSuns(isMe);
            }
            if (!compose) {
                Api.BattleVoApi.addDice(1, isMe);
            }
        }
        if (isgrow) {
            dice.resetPos();
            App.MsgHelper.dispEvt(MsgConst.DICE_MOVE_FORCOMPOSE);
        }
        //原先是核骰子
        if (oData && oData.checkIsNuclearDice() && !isgrow) {
            this.nuclearBoom(dice, oData, isMe);
        }
        return dice;
    };
    BattleView.prototype.changeDice = function (isMe, seed, frame, compose, stars) {
        var dice = null;
        BattleStatus.changeDiceing = true;
        var _a = this.createDiceData(isMe, seed, frame, compose, stars), nData = _a.nData, oData = _a.oData;
        BattleStatus.changeDiceing = false;
        if (!nData) {
            isMe && App.CommonUtil.showTip(LangMger.getlocal("dicenospace"));
            return null;
        }
        var diceList = isMe ? this._meDiceList : this._targetDiceList;
        if (oData) {
            dice = diceList[compose];
            if (nData.id != oData.id) {
                delete diceList[compose];
                dice.dispose();
                dice = null;
            }
            else if (nData.checkIsAddSp()) {
                var tmp = dice;
                tmp.addSp(nData.star);
            }
        }
        if (dice) {
            dice.refresh(nData);
        }
        else {
            var classObj = egret.getDefinitionByName("Dice" + nData.id);
            classObj = classObj || BaseDice;
            dice = new classObj(nData);
            var _b = dice.getPos(), x = _b.x, y = _b.y;
            this._diceLayer.addChild(dice);
            BattleStatus.bulletZidx = this.getChildIndex(this.mons4Group) + 1;
            diceList[x + "_" + y] = dice;
            dice.checkLine();
            this.checkSuns(isMe);
            if (!compose) {
                Api.BattleVoApi.addDice(1, isMe);
            }
        }
        return dice;
    };
    BattleView.prototype.copyDice = function (tdata, pos, frame) {
        var dice = null;
        var upinfo = Api.BattleVoApi.getInitInfo(tdata.isMe).upInfo;
        var idx = Api.BattleVoApi.getUpinfoIdxByDiceId(tdata.isMe, String(tdata.id));
        var ndata = Api.BattleVoApi.createDiceDataById(upinfo[idx], pos, frame, tdata.isMe, tdata.star);
        var diceList = tdata.isMe ? this._meDiceList : this._targetDiceList;
        var diceDataList = tdata.isMe ? this._meDiceDataList : this._targetDiceDataList;
        dice = diceList[pos];
        delete diceList[pos];
        delete diceDataList[pos];
        dice.dispose();
        dice = null;
        var classObj = egret.getDefinitionByName("Dice" + tdata.id);
        classObj = classObj || BaseDice;
        dice = new classObj(ndata, "pre");
        var _a = dice.getPos(), x = _a.x, y = _a.y;
        this._diceLayer.addChild(dice);
        BattleStatus.bulletZidx = this.getChildIndex(this.mons4Group) + 1;
        diceList[x + "_" + y] = dice;
        dice.checkLine();
        this.checkSuns(tdata.isMe);
        diceDataList[pos] = ndata;
        if (tdata.isMe) {
            SoundMgr.playEffect(SoundConst.EFFECT_COMPOSE);
        }
        return dice;
    };
    BattleView.prototype.changePosDice = function (tpos, fpos, isme) {
        var diceList = isme ? this._meDiceList : this._targetDiceList;
        var diceDataList = isme ? this._meDiceDataList : this._targetDiceDataList;
        // let fdice = diceList[fpos];
        // let fdata = diceDataList[fpos];
        // let tdice = diceList[tpos];
        // let tdata = diceDataList[tpos];
        var fdice = diceList[fpos];
        var tdice = diceList[tpos];
        var fromPos = fdice.getPos();
        var toPos = tdice.getPos();
        delete diceList[tpos];
        delete diceList[fpos];
        diceList[tpos] = fdice;
        diceList[fpos] = tdice;
        var fdata = diceDataList[fpos];
        var tdata = diceDataList[tpos];
        delete diceDataList[tpos];
        delete diceDataList[fpos];
        diceDataList[tpos] = fdata;
        diceDataList[fpos] = tdata;
        fdata.setPos(toPos.x, toPos.y);
        tdata.setPos(fromPos.x, fromPos.y);
        fdice.setPos(toPos.x, toPos.y);
        tdice.setPos(fromPos.x, fromPos.y);
        fdice.resetPos(0, 0, true);
        tdice.resetPos(0, 0, true);
        fdice.checkLine();
        tdice.checkLine();
    };
    BattleView.prototype.addTimeBuff = function (isMe, stars, timespeed) {
        var timelist = isMe ? this._metimeBuff : this._targettimeBuff;
        var newbuff = timelist[stars];
        if (newbuff) {
            newbuff.num += 1;
        }
        else {
            timelist[stars] = {
                num: 1,
                timespeed: timespeed
            };
        }
        this.checkTimeBuff(isMe);
    };
    BattleView.prototype.getTimeBuff = function (isMe, stars) {
        var timelist = isMe ? this._metimeBuff : this._targettimeBuff;
        var newbuff = null;
        if (timelist[stars]) {
            newbuff = timelist[stars];
        }
        return newbuff;
    };
    BattleView.prototype.removeTimeBuff = function (isMe, stars) {
        var timelist = isMe ? this._metimeBuff : this._targettimeBuff;
        var oldbuff = timelist[stars];
        oldbuff.num -= 1;
        if (oldbuff.num == 0) {
            delete timelist[stars];
        }
        this.checkTimeBuff(isMe);
    };
    BattleView.prototype.changeTimeBuffSpeed = function (isMe, timespeed) {
        var timelist = isMe ? this._metimeBuff : this._targettimeBuff;
        var dicelist = isMe ? this._meDiceList : this._targetDiceList;
        for (var i in timelist) {
            var time = timelist[i];
            if (time) {
                for (var j in dicelist) {
                    var dice = dicelist[j];
                    if (dice) {
                        var timebuff = timelist[dice.getDiceStars()];
                        if (timebuff) {
                            var buff = dice.checkHasBuff("418");
                            if (buff) {
                                dice.getDiceData().rebackSpeed(time.timespeed, time.timespeed < 0);
                            }
                        }
                    }
                }
                time.timespeed = timespeed;
            }
        }
        this.checkTimeBuff(isMe);
    };
    BattleView.prototype.checkTimeBuff = function (isMe) {
        var dicelist = isMe ? this._meDiceList : this._targetDiceList;
        var timelist = isMe ? this._metimeBuff : this._targettimeBuff;
        for (var i in dicelist) {
            var dice = dicelist[i];
            if (dice) {
                var timebuff = timelist[dice.getDiceStars()];
                if (timebuff) {
                    var buffData = { diceId: "418", keep: 0, timespeed: timebuff.timespeed, cd: 0, isMe: isMe, maxOverlap: 15 };
                    var maxnum = Math.abs(BattleStatus.maxAtkSpeed / timebuff.timespeed);
                    var len = Math.min(timebuff.num, maxnum);
                    var buff = dice.checkHasBuff("418");
                    if (buff) {
                        if (timebuff.num < buff.overlap) {
                            for (var i_4 = timebuff.num; i_4 < buff.overlap; ++i_4) {
                                dice.removeBuff("418");
                            }
                        }
                        else if (timebuff.num > buff.overlap) {
                            for (var i_5 = (buff.overlap + 1); i_5 <= len; ++i_5) {
                                DiceBuff.addBuff(buffData, dice);
                            }
                        }
                        else {
                            buff.timespeed = buffData.timespeed;
                            dice.updateBuff(buff);
                        }
                    }
                    else {
                        for (var i_6 = 1; i_6 <= len; ++i_6) {
                            DiceBuff.addBuff(buffData, dice);
                        }
                    }
                }
                else {
                    dice.removeBuff("418");
                }
            }
        }
    };
    BattleView.prototype.stormIceEff = function (isMe) {
        //全屏暴风雪特效    
        var view = this;
        if (!view.isStorm) {
            view.isStorm = true;
            var tmpy = isMe ? (BattleStatus.battleCenterY[1]) : 50;
            var group_1 = new BaseDisplayObjectContainer();
            view.addChild(group_1);
            group_1.width = GameConfig.stageWidth;
            group_1.height = GameConfig.stageHeigth / 2;
            group_1.setPosition(0, tmpy);
            var time = BattleStatus.timeparam;
            egret.Tween.get(group_1).wait(50 * time).call(function () {
                group_1.dispose();
                group_1 = null;
                view.isStorm = false;
            }, view);
            // this.createStorm(`adddice408_mao1`, group, 1);
            // this.createStorm(`adddice408_mao2`, group, 2);
            this.createStorm("adddice408_xue", group_1, 1);
            // this.battlePause();
        }
        // let mao1:CollectEffect=new CollectEffect();
        // mao1.start(`adddice408_mao1`,startPoint,endPoint);
        // let mao2:CollectEffect=new CollectEffect();
        // mao2.start(`adddice408_mao2`,startPoint,endPoint);
        // let xue:CollectEffect=new CollectEffect();
        // xue.start(`adddice408_xue`,startPoint,endPoint);
        // view
    };
    BattleView.prototype.createStorm = function (res, group, index) {
        var _loop_2 = function (i) {
            var bmp = BaseBitmap.create(i < 2 ? "adddice408_mao" + (i + 1) : "adddice408_xue");
            bmp.alpha = 0;
            bmp.anchorOffsetX = 128 / 2;
            bmp.anchorOffsetY = 128 / 2;
            bmp.setScale(App.MathUtil.getRandom(3, 6) / 10);
            var range = (group.width / 3) * Math.floor(i / 5);
            var startX = bmp.anchorOffsetX + range + App.MathUtil.getRandom(0, group.width / 3); //App.MathUtil.getRandom(bmp.anchorOffsetX,group.width-bmp.anchorOffsetX);
            var startY = bmp.anchorOffsetY + App.MathUtil.getRandom(0, group.height / 2);
            bmp.setPosition(startX, startY);
            var endX = startX + App.MathUtil.getRandom(-40, 40);
            var endY = startY + App.MathUtil.getRandom(100, group.height - startY);
            var time = BattleStatus.timeparam;
            var randRotation = 90 + App.MathUtil.getRandom(0, 360);
            egret.Tween.get(bmp).wait((10 + index) * time).call(function () {
                bmp.alpha = App.MathUtil.getRandom(2, 8) / 10;
            }, this_2).to({ x: endX, y: endY, rotation: randRotation }, 40 * time).call(function () {
                bmp.alpha = 0;
                bmp.dispose();
                bmp = null;
            });
            group.addChild(bmp);
        };
        var this_2 = this;
        for (var i = 0; i < (10 * index); i++) {
            _loop_2(i);
        }
    };
    BattleView.prototype.addSuns = function (isMe) {
        isMe ? ++this._mesunnum : ++this._targetsunnum;
    };
    BattleView.prototype.removeSuns = function (isMe) {
        isMe ? --this._mesunnum : --this._targetsunnum;
        this.checkSuns(isMe);
    };
    BattleView.prototype.checkSuns = function (isMe) {
        var sunnum = isMe ? this._mesunnum : this._targetsunnum;
        var changesun = sunnum == 1 || sunnum == 4 || sunnum == 9;
        var dicelist = isMe ? this._meDiceList : this._targetDiceList;
        for (var i in dicelist) {
            var dice = dicelist[i];
            if (dice) {
                var dicedata = dice.getDiceData();
                if (dicedata.checkIsSunDice()) {
                    var tmp = dice;
                    tmp.setIsSun(changesun);
                }
            }
        }
    };
    BattleView.prototype.getBgName = function () {
        var prename = this.getClassName().toLowerCase().replace("view", "") + "bg";
        return prename + "_1001";
    };
    BattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    BattleView.prototype.getTitleStr = function () {
        return null;
    };
    BattleView.prototype.getSoundBgName = function () {
        var className = this.getClassName().toLowerCase();
        className = className.substring(0, className.indexOf("view"));
        var soundName = "music_" + className;
        if (!ResMgr.hasRes(soundName)) {
            soundName = "music_battle";
        }
        return soundName;
    };
    BattleView.prototype.showNum = function (num, pos) {
        var clip = ComponentMgr.getCustomMovieClip("adddice207", null, 70, BattleBaseEffect);
        clip.anchorOffsetX = 105 / 2;
        clip.anchorOffsetY = 105 / 2;
        this.addChild(clip);
        clip.setPosition(pos.x, pos.y - 40);
        clip.setEndCallBack(function () {
            clip.dispose();
            clip = null;
            // this._extraGroup.addChild(txtImg);
        }, this);
        clip.playWithTime(1);
        var txtImg = ComponentMgr.getTextField("sp+" + num * (this._bothAddsp ? 2 : 1), TextFieldConst.SIZE_26, 0xf4fffe);
        txtImg.stroke = 2;
        txtImg.strokeColor = 0x1ab186;
        txtImg.anchorOffsetX = txtImg.width / 2;
        txtImg.anchorOffsetY = txtImg.height / 2;
        txtImg.alpha = 0;
        this.addChild(txtImg);
        var tmpy = pos.y - 60;
        txtImg.x = pos.x;
        txtImg.y = tmpy;
        var time = BattleStatus.timeparam;
        egret.Tween.get(txtImg).to({ alpha: 1, y: tmpy - 20 }, 12 * time).to({ alpha: 1, y: tmpy - 25 }, 6 * time).to({ alpha: 0, y: tmpy - 30 }, 3 * time).call(function () {
            txtImg.dispose();
            txtImg = null;
        }, this);
    };
    BattleView.prototype.transferEnermy = function (isMe, star) {
    };
    BattleView.prototype.dispose = function () {
        this.hideInitBattleBg();
        this.battleStop();
        this.removeEvt();
        this._topLayer && this._topLayer.dispose();
        this._topLayer = null;
        this._buttomLayer = null;
        this._leftT = 0;
        if (this._buyBtn && !this.contains(this._buyBtn)) {
            this._buyBtn.dispose();
        }
        this._buyBtn = null;
        this._upinfoBg = null;
        this._meDiceList = {};
        this._meDiceDataList = {};
        this._mePreDiceList = {};
        this._mePreDiceDataList = {};
        this._targetDiceList = {};
        this._targetDiceDataList = {};
        this._showTimeTxt = null;
        this._pingTxt = null;
        this.pingData = {};
        this.slowPingData = { num: 0, slow: {} };
        this.fb = null;
        this.chatList && this.chatList.dispose();
        this.chatList = null;
        this.chatDB && this.chatDB.dispose();
        this.chatDB = null;
        this.chatDBother && this.chatDBother.dispose();
        this.chatDBother = null;
        this.forbidChat = false;
        this._clientWaitOptList = {};
        this.topDiceBgX = this.topDiceBgY = 0;
        this.enemyLvs = {};
        this.enemyLvsIcon = {};
        BattleStatus.reset();
        this._startGameBg = null;
        this._startGameTxt = null;
        this._killpos = [];
        this._damagepos = [];
        this._bosspos = [];
        this._metimeBuff = {};
        this._targettimeBuff = {};
        this._mesunnum = 0;
        this._targetsunnum = 0;
        this.spBg = null;
        this.guideRect = null;
        this._isPause = false;
        this._onlyCreateMons = false;
        this._isSend = false;
        this._syncFrameData = {};
        this._aioptpos = [];
        this._needAiCheck = false;
        this._needAiCheckCompose = false;
        this.curRoundBossId = "";
        this._buyMakeIdx = 0;
        this._composeIdx = 0;
        this._diretCreateDice = false;
        this._hasDoOptList = {};
        this.updiceFlagMax = 0;
        this.updiceFlagMin = 0;
        this._effectLayer = null;
        this._dmgTxtLayer = null;
        this._dmgCritTxtLayer = null;
        this._bulletLayer = null;
        this._switch = {};
        this._isRequestIniting = false;
        // this._bulletLayer=null;
        for (var i = 1; i < 5; ++i) {
            if (this["mons" + i + "Group"]) {
                this["mons" + i + "Group"].dispose();
                this["mons" + i + "Group"] = null;
            }
        }
        this._bothAddsp = false;
        this._lastCickStartTime = 0;
        _super.prototype.dispose.call(this);
    };
    return BattleView;
}(CommonView));
//# sourceMappingURL=BattleView.js.map