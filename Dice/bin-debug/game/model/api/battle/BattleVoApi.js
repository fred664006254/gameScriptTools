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
var Api;
(function (Api) {
    var BattleVoApi;
    (function (BattleVoApi) {
        var loading = null;
        var battleData = null;
        function getChallengeListData(isBoss, bossHp) {
            if (bossHp === void 0) { bossHp = 0; }
            var averageLv = getLvValue();
            var round = BattleStatus.round;
            var roundListData = {};
            if (isBoss) {
                var t = BattleStatus.battleLogicHasTickTime + 3700 - BattleStatus.getRoundStartT();
                var bossid = BattleStatus.scene.curRoundBossId;
                var classObj = egret.getDefinitionByName("Boss" + bossid + "Vo");
                classObj = classObj || BossVo;
                var vo = new classObj();
                vo.birthTime = t;
                vo.hp = Config.BattleCfg.getBossHp(BattleStatus.round, bossHp); //todo
                vo.initData(Config.MonsterCfg.getBossCfgById(String(bossid)));
                roundListData[t] = [vo];
            }
            else {
                var roundCfg = getChallangeCfg();
                for (var t in roundCfg) {
                    if (roundCfg.hasOwnProperty(t)) {
                        var listDataArr = [];
                        var itemCfgArr = roundCfg[t];
                        var l = itemCfgArr.length;
                        for (var i = 0; i < l; i++) {
                            var itemCfg = itemCfgArr[i];
                            var classObj = null;
                            if (itemCfg.bossID) {
                                classObj = egret.getDefinitionByName("Boss" + itemCfg.bossID + "Vo");
                                classObj = classObj || BossVo;
                            }
                            else {
                                classObj = MonsterVo;
                            }
                            var vo = new classObj();
                            vo.hp = itemCfg.getHpByLv(averageLv);
                            if (itemCfg.bossID) {
                                var tmpCfg = Config.MonsterCfg.getBossCfgById(itemCfg.bossID);
                                var bossCfg = new Config.BossItemCfg();
                                bossCfg.monsterSpeed = itemCfg.monsterSpeed;
                                bossCfg.addSpeed = itemCfg.addSpeed;
                                bossCfg.id = itemCfg.bossID;
                                bossCfg.parameter = tmpCfg.parameter;
                                vo.initData(bossCfg);
                            }
                            else {
                                vo.initData(itemCfg);
                            }
                            vo.birthTime = Number(t);
                            vo.inBaseRound = true;
                            listDataArr.push(vo);
                        }
                        roundListData[t] = listDataArr;
                    }
                }
            }
            return roundListData;
        }
        BattleVoApi.getChallengeListData = getChallengeListData;
        function getChallangeCfg() {
            var cfg = {};
            var round = BattleStatus.round;
            var battleCfg = getBattleCfg();
            cfg = battleCfg.getChallangeCfg(round);
            return cfg;
        }
        function getBattleCfg() {
            var result;
            switch (BattleStatus.type) {
                case BattleTypeEnums.type1:
                    result = Config.BattleCfg;
                    break;
                case BattleTypeEnums.type2:
                    result = Config.TogetherCfg;
                    break;
                case BattleTypeEnums.type3:
                    result = Config.FairarenaCfg;
                    break;
                default:
                    result = Config.BattleCfg;
                    break;
            }
            return result;
        }
        /**
         * 获取当前普通怪关卡数据，如果当前是boss，协同的round需要-1
         */
        function getNormalChallangeCfg() {
            var cfg = {};
            var round = BattleStatus.round;
            var battleCfg = getBattleCfg();
            if (BattleStatus.battleType == 2) {
                round -= 1;
            }
            cfg = battleCfg.getChallangeCfg(round);
            return cfg;
        }
        BattleVoApi.getNormalChallangeCfg = getNormalChallangeCfg;
        function getMonsterNum(isBoss) {
            var num = 0;
            var round = BattleStatus.round;
            if (isBoss) {
                num = 1;
            }
            else {
                var battleCfg = getBattleCfg();
                num = battleCfg.getChallangeMsNum(round);
            }
            return num;
        }
        BattleVoApi.getMonsterNum = getMonsterNum;
        function getItemCfgByRoundAndKey(round, cfgKey) {
            var itemCfg = null;
            var battleCfg = getBattleCfg();
            if (battleCfg.getItemCfgByRoundAndKey) {
                itemCfg = battleCfg.getItemCfgByRoundAndKey(round, cfgKey, Api.GameinfoVoApi.getIsGuiding());
            }
            return itemCfg;
        }
        BattleVoApi.getItemCfgByRoundAndKey = getItemCfgByRoundAndKey;
        function createDiceDataById(upinfo, pos, frame, isMe, star, isPre) {
            var data = new DiceData();
            if (!isPre) {
                data.birthTime = frame * BattleStatus.logicFrame;
                isMe ? ++BattleStatus.meDiceIndex : ++BattleStatus.targetDiceIndex;
                data.index = isMe ? BattleStatus.meDiceIndex : BattleStatus.targetDiceIndex;
            }
            data.isMe = isMe;
            data.initData(upinfo, pos, star);
            return data;
        }
        BattleVoApi.createDiceDataById = createDiceDataById;
        function getInitSp() {
            var battleCfg = getBattleCfg();
            return battleCfg.iniSp;
        }
        BattleVoApi.getInitSp = getInitSp;
        function getAddMonster() {
            var battleCfg = getBattleCfg();
            return battleCfg.addMonster || 9999;
        }
        BattleVoApi.getAddMonster = getAddMonster;
        function getAddMonsterDelay() {
            var battleCfg = getBattleCfg();
            return battleCfg.addMonsterDelay || 1000;
        }
        BattleVoApi.getAddMonsterDelay = getAddMonsterDelay;
        function startBattle(type) {
            type = String(type);
            BattleStatus.setType(type);
            battleData = { me: new PlayerBattleVo(), target: new PlayerBattleVo() };
            var battleClassName = "Battle" + type + "View";
            if (!egret.hasDefinition(battleClassName)) {
                battleClassName = "Battle" + BattleStatus.battleType + "View";
            }
            if (egret.hasDefinition(battleClassName)) {
                showLoading();
                ViewController.getInstance().openView(battleClassName);
            }
            else {
                App.LogUtil.log("lost " + battleClassName);
            }
        }
        BattleVoApi.startBattle = startBattle;
        function showLoading() {
            if (!loading) {
                loading = new GameLoading();
            }
            loading.show();
        }
        function hideLoading() {
            loading && loading.hide();
        }
        BattleVoApi.hideLoading = hideLoading;
        function setInitInfo(initData) {
            var maxUid = 0;
            for (var uid in initData) {
                if (initData.hasOwnProperty(uid)) {
                    if (Number(uid) > maxUid) {
                        maxUid = Number(uid);
                    }
                    var uData = initData[uid];
                    var isMe = false;
                    isMe = Number(uid) == Api.UserinfoVoApi.getUid();
                    if (!isMe) {
                        // 机器人
                        BattleStatus.isAi = !checkPlayer(uid);
                    }
                    var vo = getBattleData(isMe);
                    vo.upinfo = uData;
                    var upInfo = vo.upinfo.upInfo;
                    for (var key in upInfo) {
                        if (upInfo.hasOwnProperty(key)) {
                            var infoItem = upInfo[key];
                            infoItem.pwlv = 1;
                        }
                    }
                    vo.uid = Number(uid);
                    Api.BattleVoApi.setCrivalue(uData.crivalue, isMe);
                }
            }
            BattleStatus.firstAtkIsMe = (maxUid == Api.UserinfoVoApi.getUid());
        }
        BattleVoApi.setInitInfo = setInitInfo;
        function checkMaxRound() {
            var result = false;
            if (BattleStatus.battleType == 2) {
                result = (BattleStatus.round + 1) >= Config.TogetherCfg.getMaxRound();
            }
            return result;
        }
        BattleVoApi.checkMaxRound = checkMaxRound;
        function getInitInfo(isMe) {
            var vo = getBattleData(isMe);
            return vo.upinfo;
        }
        BattleVoApi.getInitInfo = getInitInfo;
        function addSp(addSp, isMe) {
            var vo = getBattleData(isMe);
            vo && vo.addSp(addSp);
            App.MsgHelper.dispEvt(MsgConst.BTLE_ADD_SP, isMe);
        }
        BattleVoApi.addSp = addSp;
        function addDice(addDiceNum, isMe) {
            var vo = getBattleData(isMe);
            addSp(-getNeedSpNum(isMe), isMe);
            vo && vo.addDiceNum(addDiceNum);
        }
        BattleVoApi.addDice = addDice;
        function setCrivalue(crivalue, isMe) {
            var vo = getBattleData(isMe);
            vo.setCrivalue(crivalue);
        }
        BattleVoApi.setCrivalue = setCrivalue;
        function checkBuyDice(isMe) {
            var vo = getBattleData(isMe);
            var needSp = getNeedSpNum(isMe);
            return vo.sp >= needSp;
        }
        BattleVoApi.checkBuyDice = checkBuyDice;
        function getNeedSpNum(isMe) {
            var vo = getBattleData(isMe);
            var battleCfg = getBattleCfg();
            return battleCfg.getNeedSpByNum(vo.hasOwnDiceNum);
            ;
        }
        BattleVoApi.getNeedSpNum = getNeedSpNum;
        function getHasOwnDiceNum(isMe) {
            var vo = getBattleData(isMe);
            return vo.hasOwnDiceNum;
        }
        BattleVoApi.getHasOwnDiceNum = getHasOwnDiceNum;
        function getPowerUpCostByLv(powLv) {
            var battleCfg = getBattleCfg();
            return battleCfg.getPowerUpCostBylv(powLv);
        }
        BattleVoApi.getPowerUpCostByLv = getPowerUpCostByLv;
        function checkPowerUp(id, isMe) {
            var vo = getBattleData(isMe);
            var pwLv = vo.getPwlvById(id);
            var powerUpCostSp = getPowerUpCostByLv(pwLv);
            return vo.sp >= powerUpCostSp && pwLv < 5;
        }
        BattleVoApi.checkPowerUp = checkPowerUp;
        function getBattleData(isMe) {
            if (!battleData) {
                return null;
            }
            return isMe ? battleData.me : battleData.target;
        }
        BattleVoApi.getBattleData = getBattleData;
        function getSpNum(isMe) {
            if (isMe === void 0) { isMe = true; }
            var vo = getBattleData(isMe);
            return vo.sp;
        }
        BattleVoApi.getSpNum = getSpNum;
        function checkPlayer(uid) {
            return Number(uid) > 10000;
        }
        BattleVoApi.checkPlayer = checkPlayer;
        function getLvValue() {
            var meVo = getBattleData(true);
            var targetVo = getBattleData(false);
            return Math.floor((meVo.upinfo.level + targetVo.upinfo.level) / 2);
        }
        BattleVoApi.getLvValue = getLvValue;
        function getUpinfoIdxByDiceId(isMe, diceid) {
            var upinfo = getBattleData(isMe).upinfo.upInfo;
            var idx = -1;
            for (var i in upinfo) {
                if (Number(upinfo[i].id) == Number(diceid)) {
                    idx = Number(i);
                    break;
                }
            }
            return idx;
        }
        BattleVoApi.getUpinfoIdxByDiceId = getUpinfoIdxByDiceId;
        function getUpinfoPlvByDiceId(isMe, diceid) {
            var vo = getBattleData(isMe);
            var lv = 1;
            if (vo && vo.upinfo) {
                var upinfo = vo.upinfo.upInfo;
                for (var i in upinfo) {
                    if (Number(upinfo[i].id) == Number(diceid)) {
                        lv = upinfo[i].pwlv;
                        break;
                    }
                }
            }
            return lv;
        }
        BattleVoApi.getUpinfoPlvByDiceId = getUpinfoPlvByDiceId;
        function getUpinfoLvByDiceId(isMe, diceid) {
            var vo = getBattleData(isMe);
            var lv = 1;
            if (vo && vo.upinfo) {
                var upinfo = vo.upinfo.upInfo;
                for (var i in upinfo) {
                    if (Number(upinfo[i].id) == Number(diceid)) {
                        lv = upinfo[i].lv;
                        break;
                    }
                }
            }
            return lv;
        }
        BattleVoApi.getUpinfoLvByDiceId = getUpinfoLvByDiceId;
        function diceLvup(id, isMe) {
            var vo = getBattleData(isMe);
            // let pwlv:number=1;
            var upinfo = getInitInfo(isMe).upInfo;
            var l = upinfo.length;
            var upInfoItem = null;
            for (var i = 0; i < l; i++) {
                upInfoItem = upinfo[i];
                if (id == upInfoItem.id) {
                    var powerUpCostSp = Api.BattleVoApi.getPowerUpCostByLv(upInfoItem.pwlv);
                    addSp(-powerUpCostSp, isMe);
                    upInfoItem.pwlv++;
                    // pwlv=upInfoItem.pwlv;
                    break;
                }
            }
            return upInfoItem.pwlv;
        }
        BattleVoApi.diceLvup = diceLvup;
        function getSyncData() {
            var str = "";
            switch (BattleStatus.battleType) {
                case 1:
                    var meVo = getBattleData(true);
                    var targetVo = getBattleData(false);
                    var meData = BattleStatus.getBattleValue(true);
                    var targetData = BattleStatus.getBattleValue(false);
                    var mestr = meData.k + "_" + meData.l;
                    var targetstr = targetData.k + "_" + targetData.l;
                    if (meVo.uid > targetVo.uid) {
                        str = mestr + "|" + targetstr;
                    }
                    else {
                        str = targetstr + "|" + mestr;
                    }
                    break;
                default:
                    str = (BattleStatus.round + 1) + "";
                    break;
            }
            return str;
        }
        BattleVoApi.getSyncData = getSyncData;
        /**
         * 给对方生成怪物
         * @param cfg 配置
         * @param isMe 给谁加
         */
        function addEmeryMonster(isMe) {
            var averageLv = getLvValue();
            var cfg = BattleStatus.getLastType1MsCfg(isMe);
            if (cfg) {
                var enemyVo = new MonsterVo();
                var bt = BattleStatus.battleLogicHasTickTime - BattleStatus.getRoundStartT() + Api.BattleVoApi.getAddMonsterDelay();
                enemyVo.birthTime = bt;
                enemyVo.hp = cfg.getHpByLv(averageLv);
                enemyVo.isMe = isMe;
                enemyVo.isEnemy = true;
                enemyVo.initData(cfg);
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
        }
        BattleVoApi.addEmeryMonster = addEmeryMonster;
        function dispose() {
            battleData = null;
            loading && loading.dispose(true);
            loading = null;
        }
        BattleVoApi.dispose = dispose;
    })(BattleVoApi = Api.BattleVoApi || (Api.BattleVoApi = {}));
    var PlayerBattleVo = (function (_super) {
        __extends(PlayerBattleVo, _super);
        function PlayerBattleVo() {
            var _this = _super.call(this) || this;
            _this.uid = 0;
            _this.sp = 0;
            _this.hasOwnDiceNum = 0;
            _this.crivalue = 1;
            _this.upinfo = null;
            _this.sp = Number(egret.getOption("sp")) || Api.BattleVoApi.getInitSp();
            return _this;
        }
        PlayerBattleVo.prototype.initData = function (data) {
        };
        PlayerBattleVo.prototype.getPwlvById = function (id) {
            var lv = 1;
            var upinfo = this.upinfo.upInfo;
            var l = upinfo.length;
            for (var i = 0; i < l; i++) {
                var upInfoItem = upinfo[i];
                if (id == upInfoItem.id) {
                    lv = upInfoItem.pwlv;
                    break;
                }
            }
            return lv;
        };
        // public lvup(id:string):number
        // {
        //     let pwlv:number=1;
        //     let upinfo = this.upinfo.upInfo;
        //     let l = upinfo.length;
        //     for (let i=0; i<l;i++) 
        //     {
        //         const upInfoItem = upinfo[i];
        //         if(id==upInfoItem.id)
        //         {
        //             let powerUpCostSp = Api.BattleVoApi.getPowerUpCostByLv(upInfoItem.pwlv);
        //             this.addSp(-powerUpCostSp);
        //             upInfoItem.pwlv++;
        //             pwlv=upInfoItem.pwlv;
        //             break;
        //         }
        //     }
        //     return pwlv;
        // }
        PlayerBattleVo.prototype.setCrivalue = function (crivalue) {
            this.crivalue = crivalue + 1;
        };
        PlayerBattleVo.prototype.addSp = function (addSp) {
            this.sp += addSp;
            this.sp = Math.max(0, this.sp);
            // App.LogUtil.log("sp: "+ this.uid + " "+this.sp);
        };
        PlayerBattleVo.prototype.addDiceNum = function (addDiceNum) {
            this.hasOwnDiceNum += addDiceNum;
            this.hasOwnDiceNum = Math.max(0, this.hasOwnDiceNum);
        };
        PlayerBattleVo.prototype.dispose = function () {
            this.sp = 0;
            this.crivalue = 1;
        };
        return PlayerBattleVo;
    }(BaseVo));
    __reflect(PlayerBattleVo.prototype, "PlayerBattleVo");
})(Api || (Api = {}));
//# sourceMappingURL=BattleVoApi.js.map