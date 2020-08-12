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
 * 协同模式
 * author 陈可
 * date 2020/4/23
 * @class Battle2View
 */
var Battle2View = (function (_super) {
    __extends(Battle2View, _super);
    function Battle2View() {
        var _this = _super.call(this) || this;
        _this._arrowGroup = null;
        _this._centerarrowGroup = null;
        _this._totalGroup = null;
        return _this;
    }
    Battle2View.prototype.initView = function () {
        this.name = "Battle2View";
        var group = new BaseDisplayObjectContainer();
        this.addChild(group);
        this._totalGroup = group;
        var limitPosCfg = BattleStatus.getLimitPos();
        var centerY = BattleStatus.battleCenterY[2];
        this.topDiceBgX = 107;
        this.topDiceBgY = 80;
        var btEnd = BaseBitmap.create("battle_end");
        btEnd.anchorOffsetX = btEnd.width;
        btEnd.anchorOffsetY = btEnd.height * 0.5;
        var pos = limitPosCfg.target.pos2;
        btEnd.setPosition(GameConfig.stageWidth, pos.y - 10);
        this.addChild(btEnd);
        var bossIconBg = BaseBitmap.create("pvp_rounds_bg");
        group.addChild(bossIconBg);
        // bossIconBg.x = GameConfig.stageWidth - bossIconBg.width;
        // bossIconBg.y = 5;
        var rounNUm = ComponentMgr.getTextField('11', TextFieldConst.SIZE_28, ColorEnums.white);
        group.addChild(rounNUm);
        rounNUm.text = LangMger.getlocal("battle_pvp_rank", [String(1)]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rounNUm, bossIconBg, [10, 0]);
        var powerBg = BaseBitmap.create("battle_power_bg2");
        group.addChild(powerBg);
        powerBg.x = bossIconBg.x - powerBg.width - 10;
        powerBg.y = bossIconBg.y;
        var totalNum = ComponentMgr.getTextField('11', TextFieldConst.SIZE_30, ColorEnums.white);
        group.addChild(totalNum);
        totalNum.text = '+' + String(1);
        totalNum.x = powerBg.x + 50;
        totalNum.y = powerBg.y + 12;
        var powerIcon = BaseBitmap.create("task_power");
        group.addChild(powerIcon);
        powerIcon.x = powerBg.x + 15;
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, powerIcon, powerBg, [0, 0]);
        var total = 1;
        App.MsgHelper.addEvt(MsgConst.BT_NEXT_ROUND, function () {
            rounNUm.text = LangMger.getlocal("battle_pvp_rank", [String(BattleStatus.round + 1)]);
            //addNum.text = `+${Config.TogetherCfg.getCard(BattleStatus.round + 1)}`;
            total += Config.TogetherCfg.getCard(BattleStatus.round + 1);
            totalNum.text = "+" + ("" + total);
        }, this);
        group.x = GameConfig.stageWidth - bossIconBg.width;
        group.y = 5;
        if (Api.GameinfoVoApi.getIsFinishNewGuide() && !Api.GameinfoVoApi.getIsFinishStepGuide(32)) {
            var hgroup = new BaseDisplayObjectContainer();
            hgroup.height = this.height;
            hgroup.width = 78;
            this.addChild(hgroup);
            for (var i = 1; i <= 3; ++i) {
                var arrow = BaseBitmap.create("guidelinearrow");
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.scaleY = 1;
                hgroup.addChild(arrow);
                arrow.x = arrow.anchorOffsetX;
                arrow.y = 66 + arrow.anchorOffsetX + (i - 1) * (82 + 23);
            }
            for (var i = 1; i <= 3; ++i) {
                var arrow = BaseBitmap.create("guidelinearrow");
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.scaleY = -1;
                hgroup.addChild(arrow);
                arrow.x = arrow.anchorOffsetX;
                arrow.y = hgroup.height - arrow.height - arrow.anchorOffsetY - 147 - (i - 1) * (82 + 23);
            }
            this._arrowGroup = hgroup;
            hgroup.visible = false;
            var cgroup = new BaseDisplayObjectContainer();
            cgroup.width = this.width;
            this.addChild(cgroup);
            cgroup.visible = false;
            for (var i = 1; i <= 5; ++i) {
                var arrow = BaseBitmap.create("guidelinearrow");
                arrow.anchorOffsetX = arrow.width / 2;
                arrow.anchorOffsetY = arrow.height / 2;
                arrow.rotation = -90;
                cgroup.addChild(arrow);
                arrow.x = cgroup.width / 6 * i;
            }
            cgroup.y = BattleStatus.battleCenterY[BattleStatus.battleType] - 5;
            this._centerarrowGroup = cgroup;
        }
        _super.prototype.initView.call(this);
        this._chatIcon.setPosition(GameConfig.stageWidth - 66, GameConfig.stageHeigth - 147);
        this._topLayer.y = 53;
    };
    Battle2View.prototype.initEvt = function () {
        _super.prototype.initEvt.call(this);
        App.MsgHelper.addEvt(MsgConst.BT_NEXT_ROUND, this.nextRoundHandler, this);
    };
    Battle2View.prototype.removeEvt = function () {
        _super.prototype.removeEvt.call(this);
        App.MsgHelper.removeEvt(MsgConst.BT_NEXT_ROUND, this.nextRoundHandler, this);
    };
    Battle2View.prototype.nextRoundHandler = function (e) {
        var _this = this;
        var tout = egret.setTimeout(function () {
            _this.playRoundEffect(LangMger.getlocal("battle_pvp_rank", [(BattleStatus.round + 1) + ""]));
        }, this, 1000);
    };
    Battle2View.prototype.playRoundEffect = function (showStr, callback, thisObj) {
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
            if (showStr == LangMger.getlocal("battlestart")) {
                _this.playRoundEffect(LangMger.getlocal("battle_pvp_rank", [(BattleStatus.round + 1) + ""]), callback, thisObj);
            }
            else {
                if (Api.GameinfoVoApi.getIsFinishNewGuide() && Api.GameinfoVoApi.checlIsInStepId(33) && BattleStatus.round == 1) {
                    if (BattleStatus.scene) {
                        BattleStatus.scene.battlePause();
                        Api.GameinfoVoApi.setCurGudingId(34);
                        App.MsgHelper.dispEvt(MsgConst.SHOW_GUIDE);
                    }
                }
                if (callback) {
                    callback.apply(thisObj);
                }
            }
        }, this);
    };
    Battle2View.prototype.monsterMoveHandler = function (monsterData) {
        var isMe = monsterData.isMe;
        // if(monster.isMoveEnd())
        // {
        //     super.monsterMoveHandler(monster);
        // }
        // else
        // {
        var monsterList = isMe ? BattleStatus.targetMonsterList : BattleStatus.meMonsterList;
        var monsterDataList = isMe ? BattleStatus.targetMonsterDataList : BattleStatus.meMonsterDataList;
        var name = monsterData.getName();
        switch (monsterData.moveStatus) {
            case MonsterMoveStatus.PUBLIC:
                monsterList[name] = this.getMonsterByName(monsterData);
                monsterDataList.push(monsterData);
                BattleStatus.checkPublicGroup(monsterData);
                monsterData.clearBack();
                BattleStatus.checkMaxHp(monsterData, monsterData.isMe, 0);
                BattleStatus.checkMaxHp(monsterData, !monsterData.isMe, 0);
                break;
            case MonsterMoveStatus.BACK:
                // let monsterOwnDataList=isMe?BattleStatus.meMonsterDataList:BattleStatus.targetMonsterDataList;
                // delete monsterList[name];
                // let idx=monsterDataList.indexOf(monsterData);
                // if(idx>-1)
                // {
                //     monsterDataList.splice(idx,1);
                // }
                // let idx2=monsterOwnDataList.indexOf(monsterData);
                // if(idx2>-1)
                // {
                //     monsterOwnDataList.splice(idx2,1);
                // }
                BattleStatus.battleCheckCount(isMe, "l");
                if (monsterData.getIsBoss()) {
                    BattleStatus.battleCheckCount(isMe, "l");
                }
                break;
            default:
                break;
        }
        // }
    };
    //为双方生成产生sp的怪物
    Battle2View.prototype.transferEnermy = function (isMe, star) {
        var averageLv = Api.BattleVoApi.getLvValue();
        var round = BattleStatus.round;
        var roundCfg = Config.TogetherCfg.getChallangeCfg((round + 1) % 10 == 0 ? (round - 1) : round);
        var keys = Object.keys(roundCfg);
        var cfg = roundCfg[keys[0]][0];
        if (cfg) {
            var enemyVo = new MonsterVo();
            var bt = BattleStatus.battleLogicHasTickTime - BattleStatus.getRoundStartT() + Api.BattleVoApi.getAddMonsterDelay();
            enemyVo.birthTime = bt;
            enemyVo.hp = cfg.getHpByLv(averageLv) * (1 + 2) * star;
            enemyVo.isEnemy = true;
            enemyVo.isMe = isMe;
            enemyVo.initData(cfg);
            enemyVo.monsterSp = enemyVo.monsterSp + (Math.floor(Math.max(0, BattleStatus.round - 40) / 5) * 10) * 4 * star;
            var roundList = isMe ? BattleStatus.meBatteRoundDataList : BattleStatus.targetBatteRoundDataList;
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
    Battle2View.prototype.isInRound = function () {
        return false;
    };
    Battle2View.prototype.chatHandler = function () {
        SoundMgr.playEffect(SoundConst.EFFECT_CLICK);
        if (!this.chatList) {
            var view_1 = this;
            this.chatList = new ChatView();
            this.chatList.init();
            this.chatList.setExpBg("chatview_exp_bg4");
            this.chatList.setExpListXY(298, 143);
            this.chatList.itemCB = function () {
                view_1._chatIcon.touchEnabled = false;
            };
        }
        this.addChild(this.chatList);
    };
    Battle2View.prototype.displayChatDB = function (opt, isMe) {
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
                this.chatDB.x = GameConfig.stageWidth - 107;
                this.chatDB.y = GameConfig.stageHeigth - 234;
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
                this.chatDBother.y = 83;
            }
            this.addChild(this.chatDBother);
            // this.chatDBother.visible = true;
            this.chatDBother.displayDB(opt["upId"]);
        }
    };
    Battle2View.prototype.getSoundBgName = function () {
        return "music_battle_3";
    };
    Battle2View.prototype.dispose = function () {
        this._arrowGroup = null;
        this._centerarrowGroup = null;
        this._totalGroup = null;
        _super.prototype.dispose.call(this);
    };
    return Battle2View;
}(BattleView));
__reflect(Battle2View.prototype, "Battle2View");
//# sourceMappingURL=Battle2View.js.map