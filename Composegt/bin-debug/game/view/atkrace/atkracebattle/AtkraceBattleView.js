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
var AtkraceBattleView = (function (_super) {
    __extends(AtkraceBattleView, _super);
    function AtkraceBattleView() {
        var _this = _super.call(this) || this;
        _this._roundIdx = 0;
        _this._bigRoundIdx = 0;
        _this._servantList0 = [];
        _this._servantList1 = [];
        _this._totalSNum = 0;
        _this._playEndSNum = 0;
        _this._dmgData = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        _this._addPoint = NaN;
        _this._shockCount = -1;
        _this._shockIdx = 0;
        _this.isRequestNexting = false;
        _this._skipBtn = null;
        _this._hitEffectList = [];
        _this._heroData = [{ all: 0, live: 0 }, { all: 0, live: 0 }];
        return _this;
    }
    AtkraceBattleView.prototype.getTitleBgName = function () {
        return null;
    };
    AtkraceBattleView.prototype.getTitleStr = function () {
        return null;
    };
    AtkraceBattleView.prototype.getRequestData = function () {
        // let myAtkInfo:AtkraceAtkInfoVo = Api.atkraceVoApi.getMyFightInfo();
        // let myInfo:AtkraceServantVo = myAtkInfo.mesid;
        // this._winNumber = myAtkInfo.fightnum;
        // this._totalNumber = myAtkInfo.total;
        return { requestType: NetRequestConst.REQUEST_ATKRACE_FIGHT, requestData: {} };
    };
    AtkraceBattleView.prototype.receiveData = function (data) {
        this.isRequestNexting = false;
        if (data.ret == true) {
            this._battleInfo = data.data.data;
            this._dmgData = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
            this._addPoint = this._battleInfo.hasOwnProperty("addPoint") ? this._battleInfo.addPoint : this._addPoint;
            // if(this.checkBattleEnd())
            // {
            // 	this._skipBtn.visible=false;
            // }
            this._totalSNum = 0;
            this._playEndSNum = 0;
            this._roundIdx = 0;
            if (this._bigRoundIdx > 0) {
                this.initServantForBattle();
                egret.setTimeout(this.checkBattleRoundData, this, 1000);
            }
            this._bigRoundIdx++;
        }
        else {
            _super.prototype.receiveData.call(this, data);
            if (this._bigRoundIdx > 0) {
                App.CommonUtil.showTip(LanguageManager.getlocal("requestLoadErrorTip"));
                this.hide();
            }
        }
    };
    AtkraceBattleView.prototype.getResourceList = function () {
        return _super.prototype.getResourceList.call(this).concat([
            "atkrace_skip", "atkbattlebg0", "atkbattlebg1", "atkrace_heroinfobg", "atkrace_quiltybg", "btn_atkrace_skip", "progress_atkhp0", "progress_atkhpbg", "atkraceatkhit",
            "atkrace_fnt",
            "atkraceskill_fnt",
            "atkracebj_fnt"
        ]);
    };
    AtkraceBattleView.prototype.getBgName = function () {
        return "atkracebattlebg";
    };
    AtkraceBattleView.prototype.initBg = function () {
        var scale = 1.034;
        _super.prototype.initBg.call(this);
        if (this.viewBg) {
            this.viewBg.setScale(scale);
            this.viewBg.setPosition((GameConfig.stageWidth - this.viewBg.width * scale) * 0.5, (GameConfig.stageHeigth - this.viewBg.height * (scale + (scale - 1) * 0.5)));
        }
    };
    AtkraceBattleView.prototype.getCloseBtnName = function () {
        return null;
    };
    AtkraceBattleView.prototype.initView = function () {
        var _this = this;
        Api.atkraceVoApi.dieSidList = [{}, {}];
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACE_SER_HIT, this.showHitEffect, this);
        App.MessageHelper.addEventListener(MessageConst.MESSAGE_ATKRACE_SER_DIE, this.refreshSerInfo, this);
        var maskDown = BaseBitmap.create("atkbattlebg0");
        // maskDown.width = GameConfig.stageWidth;
        maskDown.y = GameConfig.stageHeigth - maskDown.height;
        this.addChildToContainer(maskDown);
        var maskUp = BaseBitmap.create("atkbattlebg1");
        // maskUp.width = GameConfig.stageWidth;
        // maskUp.scaleY = -1;
        // maskUp.y = maskUp.height-maskUp.height;
        this.addChildToContainer(maskUp);
        var info = Api.atkraceVoApi.getMyFightInfo();
        var upNameLb = ComponentManager.getTextField(info.fname, TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        upNameLb.setPosition(150, 10);
        this.addChildToContainer(upNameLb);
        var upServantLb = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", ["5/5"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        upServantLb.setPosition(GameConfig.stageWidth - 150 - upServantLb.width, upNameLb.y);
        this.addChildToContainer(upServantLb);
        this._upSerLb = upServantLb;
        var downNameLb = ComponentManager.getTextField(Api.playerVoApi.getPlayerName(), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        downNameLb.setPosition(150, GameConfig.stageHeigth - 10 - downNameLb.height);
        this.addChildToContainer(downNameLb);
        var downServantLb = ComponentManager.getTextField(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", ["5/5"]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_WARN_YELLOW_NEW);
        downServantLb.setPosition(GameConfig.stageWidth - 150 - downServantLb.width, downNameLb.y);
        this.addChildToContainer(downServantLb);
        this._downSerLb = downServantLb;
        // duizhanpifu_
        var skipBtn = ComponentManager.getButton("btn_atkrace_skip", null, function () {
            if (_this.checkBattleEnd()) {
                _this.showBattleResultPanel();
            }
            else {
                _this.requestNextRoundData();
            }
        }, this);
        this._skipBtn = skipBtn;
        skipBtn.setPosition(GameConfig.stageWidth - skipBtn.width - 2, 51);
        this.addChildToContainer(skipBtn);
        this.initServantForBattle();
        egret.setTimeout(this.checkBattleRoundData, this, 1000);
        // this.startPlayBattle();
    };
    AtkraceBattleView.prototype.refreshSerInfo = function (e) {
        var ownType = e.data;
        this._heroData[ownType].live--;
        this._upSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", [this._heroData[0].live + "/" + this._heroData[0].all]));
        this._downSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", [this._heroData[1].live + "/" + this._heroData[1].all]));
    };
    AtkraceBattleView.prototype.initServantForBattle = function () {
        if (!this._battleLayer) {
            this._battleLayer = new BaseDisplayObjectContainer();
            this.addChildToContainer(this._battleLayer);
        }
        this._heroData = [{ all: 0, live: 0 }, { all: 0, live: 0 }];
        var ainfo = Api.atkraceVoApi.getMyFightInfo();
        var targetList = [ainfo.meslist, ainfo.fids];
        var l = 5;
        for (var ii = 0; ii < 2; ii++) {
            var serverList = this["_servantList" + ii];
            var dataList = targetList[ii];
            for (var i = 0; i < l; i++) {
                var sVo = dataList[i];
                var hero = (serverList[i] || new AtkraceBattleHero());
                // console.log(ii,i,hero.visible,sVo?sVo.sid:0);
                hero.init(sVo, ii, i);
                if (!hero.checkIsDie()) {
                    this._heroData[ii].all++;
                }
                this._battleLayer.addChild(hero);
                serverList.push(hero);
            }
            this._heroData[ii].live = this._heroData[ii].all;
        }
        var tmpArr = this._servantList0.concat(this._servantList1);
        tmpArr.sort(function (a, b) {
            if (a.y == b.y) {
                return a.x - b.x;
            }
            else {
                return a.y - b.y;
            }
        });
        l = tmpArr.length;
        for (var i = 0; i < l; i++) {
            var item = tmpArr[i];
            this._battleLayer.setChildIndex(item, i);
        }
        this._upSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", [this._heroData[0].live + "/" + this._heroData[0].all]));
        this._downSerLb.setString(LanguageManager.getlocal("allianceWarJoinBattleInfoServantName", [this._heroData[1].live + "/" + this._heroData[1].all]));
    };
    AtkraceBattleView.prototype.showHitEffect = function (e) {
        var _this = this;
        var posIdx = e.data;
        var effect = this._hitEffectList[posIdx];
        if (!effect) {
            effect = ComponentManager.getCustomMovieClip("atkraceatkhit", 12, 34);
            effect.anchorOffsetX = effect.anchorOffsetY = 100;
            this._hitEffectList[posIdx] = effect;
            effect.setEndCallBack(function () {
                effect.visible = false;
            }, this);
            effect.rotation = 180 - Math.random() * 360;
            var atkCfg = Config.AtkraceCfg.servantAtkPosCfg;
            var xcfg = Config.AtkraceCfg.servantPosCfg[0][posIdx];
            var ycfg = Config.AtkraceCfg.servantPosCfg[0][0];
            effect.setPosition(xcfg.x, GameConfig.stageHeigth - ycfg.y + atkCfg.atkb1[0].y + atkCfg.atk1[0].y - 50);
            effect.setScale(2.5);
            this.addChild(effect);
        }
        else {
            effect.visible = true;
        }
        effect.playWithTime(1);
        if (this._shockCount != -1) {
            return;
        }
        this._shockCount = egret.setInterval(function () {
            _this._shockIdx++;
            var random = Math.random();
            var disX = random * 10 * (random > 0.5 ? 1 : -1);
            var disY = random * 10 * (random > 0.5 ? 1 : -1);
            _this.x = disX;
            _this.y = disY;
            if (_this._shockIdx >= 3) {
                egret.clearInterval(_this._shockCount);
                _this._shockCount = -1;
                _this._shockIdx = 0;
                _this.x = _this.y = 0;
            }
        }, this, 50);
    };
    AtkraceBattleView.prototype.playAtkAction = function () {
        // console.log("atk",egret.getTimer());
        this._totalSNum = 0;
        this._playEndSNum = 0;
        for (var i = 0; i < 5; i++) {
            var mServant = this._servantList0[i];
            var targetServant = this._servantList1[i];
            if (mServant && (!mServant.checkIsDie())) {
                if (mServant.visible == false) {
                    console.error(mServant.name);
                }
                this._totalSNum++;
                mServant.playAtkAction(this.playAllAtkEnd, this);
            }
            if (targetServant && (!targetServant.checkIsDie())) {
                if (targetServant.visible == false) {
                    console.error(targetServant.name);
                }
                this._totalSNum++;
                targetServant.playAtkAction(this.playAllAtkEnd, this);
            }
        }
    };
    AtkraceBattleView.prototype.playAllAtkEnd = function () {
        var _this = this;
        this._playEndSNum++;
        if (this._playEndSNum >= this._totalSNum) {
            this._playEndSNum = 0;
            var totalDmgNum_1 = 0;
            var hasPlayDmgNum_1 = 0;
            for (var i = 0; i < 5; i++) {
                var mServant = this._servantList0[i];
                var targetServant = this._servantList1[i];
                if (mServant && (!mServant.checkIsDie())) {
                    totalDmgNum_1++;
                    mServant.showDamage(function () {
                        hasPlayDmgNum_1++;
                        if (hasPlayDmgNum_1 == totalDmgNum_1) {
                            hasPlayDmgNum_1 = 0;
                            _this.checkNextRoundOrEnd();
                        }
                    }, this);
                }
                if (targetServant && (!targetServant.checkIsDie())) {
                    totalDmgNum_1++;
                    targetServant.showDamage(function () {
                        hasPlayDmgNum_1++;
                        if (hasPlayDmgNum_1 == totalDmgNum_1) {
                            hasPlayDmgNum_1 = 0;
                            _this.checkNextRoundOrEnd();
                        }
                    }, this);
                }
            }
            // this.checkBattleRoundData();
        }
    };
    AtkraceBattleView.prototype.checkNextRoundOrEnd = function () {
        if (this.checkRoundEnd()) {
            if (this.checkBattleEnd()) {
                console.log("战斗结束");
                this.showBattleResultPanel();
            }
            else {
                console.log("本回合结束");
                this.requestNextRoundData();
            }
        }
        else {
            // this.playAtkAction();
            this.checkBattleRoundData();
        }
    };
    AtkraceBattleView.prototype.checkBattleEnd = function () {
        return !isNaN(this._addPoint);
    };
    AtkraceBattleView.prototype.checkRoundEnd = function () {
        if (!this._battleInfo.atkreports[this._roundIdx]) {
            return true;
        }
    };
    AtkraceBattleView.prototype.checkBattleRoundData = function () {
        var _this = this;
        var roundData = this._battleInfo.atkreports[this._roundIdx];
        if (roundData) {
            this._roundIdx++;
            console.log("checkBattleRoundData", this._roundIdx);
            var totalStartSkillNum_1 = 0;
            var startSkillPlayEndNum_1 = 0;
            var l = roundData.length;
            for (var i = 0; i < l; i++) {
                var dataList = roundData[i];
                if (this._roundIdx > 1) {
                    var sl = dataList.length;
                    for (var si = 0; si < sl; si++) {
                        var servantItem = this["_servantList" + i][si];
                        var sDataList = dataList[si];
                        var sdl = sDataList.length; //[1释放技能，1暴击，伤害{}，buff{}]
                        //释放技能了
                        var useSkill = sDataList[0];
                        if (Number(useSkill) > 0) {
                            totalStartSkillNum_1++;
                            servantItem.showSkillEffect(function () {
                                startSkillPlayEndNum_1++;
                                if (startSkillPlayEndNum_1 >= totalStartSkillNum_1) {
                                    startSkillPlayEndNum_1 = 0;
                                    _this.playAtkAction();
                                }
                            }, this);
                        }
                        //暴击了
                        var isbaoji = sDataList[1];
                        var allDmgData = sDataList[2];
                        //[目标位置(1,2,3,4,5),造成伤害，类型:0普攻，否则技能]
                        if (allDmgData instanceof Array) {
                            var sdvl = allDmgData.length;
                            for (var sdvi = 0; sdvi < sdvl; sdvi++) {
                                var dmgData = allDmgData[sdvi];
                                if (dmgData instanceof Array) {
                                    if (dmgData.length > 0) {
                                        var posIdx = dmgData[0] - 1;
                                        var dmgNum = dmgData[1];
                                        var dmgType = Number(dmgData[2]);
                                        var beAtkServantOwnType = i == 0 ? 1 : 0;
                                        var beAtkServant = this["_servantList" + beAtkServantOwnType][posIdx];
                                        this._dmgData[beAtkServantOwnType][posIdx] += dmgNum;
                                        if (beAtkServant) {
                                            var fntName = "atkrace_fnt";
                                            if (isbaoji) {
                                                fntName = "atkracebj_fnt";
                                            }
                                            else if (dmgType) {
                                                fntName = "atkraceskill_fnt";
                                            }
                                            if (beAtkServantOwnType == 1) {
                                                console.log("设置对手伤害", posIdx, dmgNum);
                                            }
                                            beAtkServant.setDamageData(dmgNum, fntName);
                                        }
                                    }
                                }
                            }
                        }
                        servantItem.setSkillStatus(sDataList[3]);
                    }
                }
                else {
                    for (var key in dataList) {
                        if (Object.prototype.hasOwnProperty.call(dataList, key)) {
                            var idx = Number(key) - 1;
                            var servantitem = this["_servantList" + i][idx];
                            if (servantitem) {
                                totalStartSkillNum_1++;
                                servantitem.showSkillEffect(function () {
                                    startSkillPlayEndNum_1++;
                                    if (startSkillPlayEndNum_1 >= totalStartSkillNum_1) {
                                        startSkillPlayEndNum_1 = 0;
                                        // this.playAtkAction();
                                        _this.checkNextRoundOrEnd();
                                    }
                                }, this, true);
                            }
                        }
                    }
                }
            }
            if (totalStartSkillNum_1 == 0) {
                if (this._roundIdx == 1) {
                    this.checkNextRoundOrEnd();
                }
                else {
                    this.playAtkAction();
                }
            }
        }
    };
    AtkraceBattleView.prototype.requestNextRoundData = function () {
        if (this.isRequestNexting == false) {
            this.isRequestNexting = true;
            var requestData = this.getRequestData();
            this.request(requestData.requestType, requestData.requestData);
        }
    };
    AtkraceBattleView.prototype.showBattleResultPanel = function () {
        this._battleLayer.visible = false;
        ViewController.getInstance().openView(ViewConst.POPUP.ATKRACESETTLEPOPUPVIEW, this._battleInfo);
    };
    AtkraceBattleView.prototype.dispose = function () {
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACE_SER_HIT, this.showHitEffect, this);
        App.MessageHelper.removeEventListener(MessageConst.MESSAGE_ATKRACE_SER_DIE, this.refreshSerInfo, this);
        this._skipBtn = null;
        this._battleLayer = null;
        this._roundIdx = 0;
        this._totalSNum = 0;
        this._playEndSNum = 0;
        this._dmgData = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
        this._addPoint = NaN;
        this._servantList0.length = this._servantList1.length = 0;
        Api.atkraceVoApi.dieSidList = [{}, {}];
        this._battleInfo = null;
        this._bigRoundIdx = 0;
        this.isRequestNexting = false;
        this._hitEffectList.length = 0;
        this._downSerLb = null;
        this._upSerLb = null;
        this._heroData == [{ all: 0, live: 0 }, { all: 0, live: 0 }];
        _super.prototype.dispose.call(this);
    };
    return AtkraceBattleView;
}(CommonView));
__reflect(AtkraceBattleView.prototype, "AtkraceBattleView");
