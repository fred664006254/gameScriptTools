var BattleStatus;
(function (BattleStatus) {
    /** 当前创建骰子数目 */
    BattleStatus.meDiceIndex = 1;
    BattleStatus.targetDiceIndex = 1;
    /** 开始战斗的毫秒计时 */
    BattleStatus.startBattleTime = 0;
    /** 战斗耗时毫秒计时 */
    BattleStatus.battleTotalTimer = 0;
    /** 战斗逻辑执行到的毫秒数 */
    BattleStatus.battleLogicHasTickTime = 0;
    /** 战斗显示执行到的毫米数 */
    // export let battleHasShowTickTime=0;
    /** 上一次触发fasttick的毫秒 */
    BattleStatus.lastFastTickTime = 0;
    /** 当前逻辑帧 */
    BattleStatus.frame = 0;
    /** 已收到的最近的逻辑帧 */
    BattleStatus.rframe = 0;
    /** 战斗场景实例 */
    BattleStatus.scene = null;
    // let meStPosX:number;
    // let meStPosY:number;
    // export let targetStPosX:number;
    // export let targetStPosY:number;
    /** 帧动画帧时间 */
    BattleStatus.timeparam = 40;
    BattleStatus.maxAtkNum = 99999999;
    /** 逻辑帧，帧间隔 */
    BattleStatus.logicFrame = 300;
    /** 随机种子 */
    BattleStatus.randSeed = 0;
    var _limitPosCfg = {};
    BattleStatus.meMonsterList = {};
    BattleStatus.meMonsterDataList = [];
    BattleStatus.meBatteRoundDataList = {};
    BattleStatus.targetBatteRoundDataList = {};
    // export let monsterNum:number=0;
    BattleStatus.totalMonsterNum = { me: 0, target: 0 };
    BattleStatus.hasCreateMonsterNum = { me: 0, target: 0 };
    BattleStatus.targetMonsterList = {};
    BattleStatus.targetMonsterDataList = [];
    // export let meDiceList:{[key:string]:BaseDice}={};
    // export let meDiceDataList:{[key:string]:DiceData}={};
    // export let targetDiceList:{[key:string]:BaseDice}={};
    // export let targetDiceDataList:{[key:string]:DiceData}={};
    // export let winMonsterData:{me:number,target:number}={me:0,target:0};
    /**战斗大类型，pvp和pve两种大类型，1指的是对战类的，可能包含多个模式，2指的是协同类的，也可能包含多个模式 */
    BattleStatus.battleType = 1;
    /**具体战斗类型，每个战斗都有各自的类型 */
    BattleStatus.type = "1";
    BattleStatus.maxAtkSpeed = 0.5;
    // export let meInfo:dice.sc_battle_init.Player=null;
    // export let targetInfo:dice.sc_battle_init.Player=null;
    BattleStatus.diceSize = new egret.Rectangle(0, 0, 200, 200);
    BattleStatus.selectPos = null;
    BattleStatus.targetPos = null;
    BattleStatus.lineSize = { pve: { w: 562, h: 386, space: 60 }, pvp: { w: 550, h: 966 } };
    BattleStatus.endDeep = 51;
    BattleStatus.battleCenterY = { "1": 0, "2": 0 };
    BattleStatus.isAi = false;
    BattleStatus.battleSyncList = {};
    BattleStatus.round = 0;
    BattleStatus.winFlag = 0;
    BattleStatus.hasMaxStar = 0; //升级到的最大星
    BattleStatus.maxStarList = {};
    BattleStatus.changeDiceing = false;
    var roundTimeCfg = {};
    var prepareTime = { "1": 4000, "2": 3000 };
    var battleDiceSize = null;
    /**
     * k当前轮杀死多少个怪，l玩家剩余血量，p当前轮跑了几个怪物
     */
    var battleData = { me: { k: 0, l: 0, p: 0, tk: 0 }, target: { k: 0, l: 0, p: 0, tk: 0 } };
    BattleStatus.obstacleZidx = 0;
    BattleStatus.bulletZidx = 0;
    var disGroupList = { "1": [], "2": [] };
    var totalDis = { "1": 0, "2": 0 };
    BattleStatus.monsterGroupList = { me: [], target: [] };
    BattleStatus.maxHp = { me: [], target: [] };
    var maxHpBeAtkNum = { me: 0, target: 0 };
    BattleStatus.needMaxHp = { me: false, target: false };
    var target4GroupData = { me: [], target: [] };
    BattleStatus.isBoss = false;
    var lastCreateType1MstHp = { me: null, target: null };
    BattleStatus.stopActEffect = false;
    var initMinLogicFrame = 10;
    BattleStatus.logicScale = 1;
    BattleStatus.minLogicFrame = initMinLogicFrame * BattleStatus.logicScale;
    BattleStatus.firstAtkIsMe = false; //先出手是否是我自己，规则是UID大的先出手
    BattleStatus.isInRound = false;
    function setType(tmpType) {
        BattleStatus.type = tmpType;
        if (BattleStatus.type == BattleTypeEnums.type3) {
            BattleStatus.battleType = BattleTypeEnums.bigType1;
        }
        else {
            BattleStatus.battleType = Number(BattleStatus.type);
        }
    }
    BattleStatus.setType = setType;
    function getPrepareTime() {
        return prepareTime[BattleStatus.battleType];
    }
    BattleStatus.getPrepareTime = getPrepareTime;
    function setType1MstCfg(isMe, cfg) {
        if (cfg) {
            isMe ? (lastCreateType1MstHp.me = cfg) : (lastCreateType1MstHp.target = cfg);
        }
    }
    BattleStatus.setType1MstCfg = setType1MstCfg;
    function getLastType1MsCfg(isMe) {
        return isMe ? lastCreateType1MstHp.me : lastCreateType1MstHp.target;
    }
    BattleStatus.getLastType1MsCfg = getLastType1MsCfg;
    function getTarget4GroupData(isMe) {
        return isMe ? target4GroupData.me : target4GroupData.target;
    }
    BattleStatus.getTarget4GroupData = getTarget4GroupData;
    function getBattleDiceSize() {
        if (!battleDiceSize) {
            var scale = DiceScaleEnum.scale_41;
            battleDiceSize = new egret.Rectangle(0, 0, scale * BattleStatus.diceSize.width, scale * BattleStatus.diceSize.height);
        }
        return battleDiceSize;
    }
    BattleStatus.getBattleDiceSize = getBattleDiceSize;
    function getBattleValue(isMe) {
        return isMe ? battleData.me : battleData.target;
    }
    BattleStatus.getBattleValue = getBattleValue;
    function getGroupList(isMe) {
        return isMe ? BattleStatus.monsterGroupList.me : BattleStatus.monsterGroupList.target;
    }
    BattleStatus.getGroupList = getGroupList;
    function checkGroup(mVo) {
        var isMe = mVo.isMe;
        var groupList = getGroupList(isMe);
        var targetGroupList = getGroupList(!isMe);
        // let mstList=isMe?meMonsterList:targetMonsterList;
        // let mst=mstList[mVo.getName()];
        var disList = disGroupList[BattleStatus.battleType];
        var maxL = disList.length - 1;
        var _a = mVo.getRange(), max = _a.max, min = _a.min;
        min = Math.max(0, Math.floor(min));
        max = Math.min(Math.floor(max), maxL);
        var lastRange = mVo.getLastRange();
        var lastMin = Math.max(0, Math.floor(lastRange.min));
        var lastMax = Math.min(Math.floor(lastRange.max), maxL);
        var minGroupIdx = disList[Math.floor(min)];
        var maxGroupIdx = disList[max];
        var lastMinGroupIdx = disList[Math.floor(lastMin)];
        var lastMaxGroupIdx = disList[lastMax];
        var isPub = mVo.isPublic();
        if (mVo.lost(isMe)) {
            App.LogUtil.log(mVo.hashCode, ':last:', lastRange.min, lastRange.max, lastMinGroupIdx, lastMaxGroupIdx, ':now:', min, max, minGroupIdx, maxGroupIdx);
            rmGroupLsit(mVo, groupList, maxGroupIdx);
            if (isPub) {
                rmGroupLsit(mVo, targetGroupList, maxGroupIdx);
            }
            if (minGroupIdx != maxGroupIdx) {
                rmGroupLsit(mVo, groupList, minGroupIdx);
                if (isPub) {
                    rmGroupLsit(mVo, targetGroupList, minGroupIdx);
                }
            }
            return;
        }
        if (maxGroupIdx > lastMaxGroupIdx) {
            addGroupList(mVo, groupList, maxGroupIdx);
            if (isPub) {
                addGroupList(mVo, targetGroupList, maxGroupIdx);
            }
        }
        else if (minGroupIdx > lastMinGroupIdx) {
            rmGroupLsit(mVo, groupList, lastMinGroupIdx);
            if (isPub) {
                rmGroupLsit(mVo, targetGroupList, lastMinGroupIdx);
            }
        }
        else if (minGroupIdx < lastMinGroupIdx || maxGroupIdx < lastMaxGroupIdx) {
            var pve = BattleStatus.battleType == 2;
            rmGroupLsit(mVo, groupList, lastMinGroupIdx);
            if (pve) {
                rmGroupLsit(mVo, targetGroupList, lastMinGroupIdx);
            }
            if (lastMinGroupIdx != lastMaxGroupIdx) {
                rmGroupLsit(mVo, groupList, lastMaxGroupIdx);
                if (pve) {
                    rmGroupLsit(mVo, targetGroupList, lastMaxGroupIdx);
                }
            }
            addGroupList(mVo, groupList, maxGroupIdx);
            if (isPub) {
                addGroupList(mVo, targetGroupList, maxGroupIdx);
            }
            if (maxGroupIdx != minGroupIdx) {
                addGroupList(mVo, groupList, minGroupIdx);
                if (isPub) {
                    addGroupList(mVo, targetGroupList, minGroupIdx);
                }
            }
        }
    }
    BattleStatus.checkGroup = checkGroup;
    function checkPublicGroup(mVo) {
        var isMe = !mVo.isMe;
        var targetGroupList = getGroupList(isMe);
        var disList = disGroupList[BattleStatus.battleType];
        var maxL = disList.length - 1;
        var _a = mVo.getRange(), max = _a.max, min = _a.min;
        min = Math.max(0, Math.floor(min));
        max = Math.min(Math.floor(max), maxL);
        var minGroupIdx = disList[min];
        var maxGroupIdx = disList[max];
        addGroupList(mVo, targetGroupList, maxGroupIdx);
        // if(maxGroupIdx!=minGroupIdx)
        // {
        //     addGroupList(mVo,targetGroupList,minGroupIdx);
        // }
    }
    BattleStatus.checkPublicGroup = checkPublicGroup;
    function createAddGroupList(mVo) {
        var groupList = mVo.isMe ? BattleStatus.monsterGroupList.me : BattleStatus.monsterGroupList.target;
        addGroupList(mVo, groupList, 0);
    }
    BattleStatus.createAddGroupList = createAddGroupList;
    function addGroupList(mVo, groupList, idx) {
        var group = groupList[idx];
        if (!group) {
            group = [mVo];
            groupList[idx] = group;
        }
        else {
            group.push(mVo);
        }
        var mstList = mVo.isMe ? BattleStatus.meMonsterList : BattleStatus.targetMonsterList;
        var mst = mstList[mVo.getName()];
        App.LogUtil.log("add", idx, mVo.hashCode);
    }
    function rmGroupLsit(mVo, groupList, idx) {
        var group = groupList[idx];
        if (group) {
            var tidx = group.indexOf(mVo);
            if (tidx > -1) {
                App.LogUtil.log("delete success", idx, mVo.hashCode);
                group.splice(tidx, 1);
            }
            else {
                App.LogUtil.log("delete fail", idx, mVo.hashCode);
            }
        }
        // App.LogUtil.log("rm:",groupList);
    }
    /**
     * 战斗结果计数
     * @param isMe
     * @param type 跑了还是打死了,l玩家掉血，k打死怪，p跑了一个怪，tk计算刷给对方怪，过滤到boss和type3的怪，杀死的数量
     */
    function battleCheckCount(isMe, ttype, callback, callbackObj) {
        var data = isMe ? battleData.me : battleData.target;
        if (ttype == "l") {
            data.l--;
            data.l = Math.max(0, data.l);
        }
        else {
            data[ttype]++;
            if (ttype == "tk") {
                if (data.tk % Api.BattleVoApi.getAddMonster() == 0) {
                    if (callback) {
                        callback.apply(callbackObj);
                    }
                }
            }
        }
    }
    BattleStatus.battleCheckCount = battleCheckCount;
    function checkBattleResult() {
        var playerHp = Config.BattleCfg.playerHp;
        var isEnd = checkEnd();
        if (!isEnd) {
            if (checkNextRound()) {
                BattleStatus.isInRound = true;
                if (Api.BattleVoApi.checkMaxRound()) {
                    isEnd = true;
                    BattleStatus.isInRound = false;
                }
                else {
                    nextRound();
                }
            }
        }
        return isEnd;
    }
    BattleStatus.checkBattleResult = checkBattleResult;
    function checkEnd() {
        var isEnd = false;
        if (battleData.me.l <= 0) {
            if (battleData.target.l <= 0) {
                var mtInfo = Api.BattleVoApi.getInitInfo(true);
                var tInfo = Api.BattleVoApi.getInitInfo(false);
                var meScore = mtInfo.score;
                var targetScore = tInfo.score;
                if (meScore == targetScore) {
                    BattleStatus.winFlag = mtInfo.uid > tInfo.uid ? 1 : 0;
                }
                else if (meScore < targetScore) {
                    BattleStatus.winFlag = 1;
                }
            }
            isEnd = true;
        }
        else if (battleData.target.l <= 0) {
            BattleStatus.winFlag = 1;
            isEnd = true;
        }
        if (isEnd && Api.GameinfoVoApi.getIsGuiding()) {
            battleData.me.l = 1;
            battleData.target.l = 0;
            BattleStatus.winFlag = 1;
        }
        return isEnd;
    }
    BattleStatus.checkEnd = checkEnd;
    function checkNextRound() {
        var result = false;
        if (BattleStatus.battleType == 2 && (battleData.me.k + battleData.target.k >= BattleStatus.totalMonsterNum.me + BattleStatus.totalMonsterNum.target)) {
            result = true;
        }
        else {
            var diffT = BattleStatus.battleLogicHasTickTime - (getRoundStartT() + Config.BattleCfg.getbtTimeByRound(BattleStatus.round) * 1000);
            diffT == 0 && App.LogUtil.log(BattleStatus.battleType, BattleStatus.isBoss, diffT);
            if (BattleStatus.battleType == 1 && (!BattleStatus.isBoss) && diffT == 0) {
                result = true;
            }
            else {
                //boss是否全部逃脱
                if (battleData.me.l > 0 && battleData.me.k + battleData.me.p >= BattleStatus.totalMonsterNum.me) {
                    if (battleData.target.l > 0 && battleData.target.k + battleData.target.p >= BattleStatus.totalMonsterNum.target) {
                        result = true;
                    }
                }
            }
        }
        return result;
    }
    BattleStatus.checkNextRound = checkNextRound;
    function getRoundStartT() {
        return prepareTime[BattleStatus.battleType] + (roundTimeCfg[BattleStatus.round] || 0);
    }
    BattleStatus.getRoundStartT = getRoundStartT;
    function getStartPos(isMe, battleType) {
        return isMe ? BattleStatus.diceStartPos[battleType].me : BattleStatus.diceStartPos[battleType].target;
    }
    function getCeilSize() {
        return BattleStatus.diceStartPos.size;
    }
    BattleStatus.getCeilSize = getCeilSize;
    function getStartX(isMe) {
        var pos = getStartPos(isMe, BattleStatus.battleType);
        return pos.x;
    }
    BattleStatus.getStartX = getStartX;
    function getStartY(isMe) {
        var pos = getStartPos(isMe, BattleStatus.battleType);
        return pos.y;
    }
    BattleStatus.getStartY = getStartY;
    function init() {
        // if(App.DeviceUtil.isWXgame())
        // {
        BattleStatus.logicScale = 5;
        // }
        BattleStatus.minLogicFrame = initMinLogicFrame * BattleStatus.logicScale;
        BattleStatus.battleCenterY[1] = 567 + (GameConfig.stageHeigth - 1280) * 0.5;
        BattleStatus.battleCenterY[2] = 589 + (GameConfig.stageHeigth - 1280) * 0.5;
        // meStPosX=100+30+42;
        // meStPosY=battleCenterY+188;
        // targetStPosX=GameConfig.stageWidth-100-30-42;
        // targetStPosY=battleCenterY-188;
        BattleStatus.diceStartPos = {
            "1": {
                me: {
                    x: 137, y: BattleStatus.battleCenterY[1] + 170
                },
                target: {
                    x: GameConfig.stageWidth - 137 + 1, y: BattleStatus.battleCenterY[1] - 147
                }
            },
            "2": {
                me: {
                    x: 137, y: BattleStatus.battleCenterY[2] + 129
                },
                target: {
                    x: 137, y: BattleStatus.battleCenterY[2] - 118
                }
            },
            size: { w: 92, h: 108 },
        };
        _limitPosCfg = {
            "1": {
                me: {
                    pos0: { x: GameConfig.stageWidth * 0.5 - BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] + BattleStatus.lineSize.pve.space + BattleStatus.lineSize.pve.h },
                    pos1: { x: GameConfig.stageWidth * 0.5 - BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] + BattleStatus.lineSize.pve.space },
                    pos2: { x: GameConfig.stageWidth * 0.5 + BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] + BattleStatus.lineSize.pve.space },
                    pos3: { x: GameConfig.stageWidth * 0.5 + BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] + BattleStatus.lineSize.pve.space + BattleStatus.lineSize.pve.h },
                },
                target: {
                    pos0: { x: GameConfig.stageWidth * 0.5 + BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] - BattleStatus.lineSize.pve.space - BattleStatus.lineSize.pve.h },
                    pos1: { x: GameConfig.stageWidth * 0.5 + BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] - BattleStatus.lineSize.pve.space },
                    pos2: { x: GameConfig.stageWidth * 0.5 - BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] - BattleStatus.lineSize.pve.space },
                    pos3: { x: GameConfig.stageWidth * 0.5 - BattleStatus.lineSize.pve.w * 0.5, y: BattleStatus.battleCenterY[1] - BattleStatus.lineSize.pve.space - BattleStatus.lineSize.pve.h },
                }
            },
            "2": {
                me: {
                    pos0: { x: GameConfig.stageWidth - BattleStatus.lineSize.pvp.w - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] + BattleStatus.lineSize.pvp.h * 0.5 },
                    pos1: { x: GameConfig.stageWidth - BattleStatus.lineSize.pvp.w - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] },
                    pos2: { x: GameConfig.stageWidth - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] },
                },
                target: {
                    pos0: { x: GameConfig.stageWidth - BattleStatus.lineSize.pvp.w - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] - BattleStatus.lineSize.pvp.h * 0.5 },
                    pos1: { x: GameConfig.stageWidth - BattleStatus.lineSize.pvp.w - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] },
                    pos2: { x: GameConfig.stageWidth - BattleStatus.endDeep, y: BattleStatus.battleCenterY[2] },
                }
            },
        };
        for (var key in _limitPosCfg) {
            if (_limitPosCfg.hasOwnProperty(key)) {
                var limitCfg = _limitPosCfg[key].me;
                tnum: for (var i = 1; i < 4; i++) {
                    if (!limitCfg["pos" + i]) {
                        break tnum;
                    }
                    var lst = limitCfg["pos" + (i - 1)];
                    var cur = limitCfg["pos" + i];
                    totalDis[key] += Math.abs(cur.x - lst.x) + Math.abs(cur.y - lst.y);
                }
                for (var idx = 0; idx < totalDis[key]; idx++) {
                    var count = Math.floor(idx * 0.01);
                    disGroupList[key][idx] = count;
                }
            }
        }
    }
    BattleStatus.init = init;
    function getDisGroupList() {
        return disGroupList[BattleStatus.battleType];
    }
    BattleStatus.getDisGroupList = getDisGroupList;
    function getLimitPos() {
        return _limitPosCfg[BattleStatus.battleType];
    }
    BattleStatus.getLimitPos = getLimitPos;
    function initForBattle() {
        BattleStatus.firstAtkIsMe = false;
        BattleStatus.isBoss = false;
        BattleStatus.battleSyncList = {};
        BattleStatus.round = 0;
        BattleStatus.meBatteRoundDataList = Api.BattleVoApi.getChallengeListData(BattleStatus.isBoss);
        BattleStatus.targetBatteRoundDataList = Api.BattleVoApi.getChallengeListData(BattleStatus.isBoss);
        BattleStatus.totalMonsterNum.me = Api.BattleVoApi.getMonsterNum(BattleStatus.isBoss);
        BattleStatus.totalMonsterNum.target = BattleStatus.totalMonsterNum.me;
        battleData = { me: { k: 0, l: Config.BattleCfg.playerHp, p: 0, tk: 0 }, target: { k: 0, l: Config.BattleCfg.playerHp, p: 0, tk: 0 } };
        if (BattleStatus.battleType == 2) {
            battleData.me.l = battleData.target.l = 1;
        }
        BattleStatus.winFlag = 0;
        BattleStatus.battleLogicHasTickTime = 0;
        BattleStatus.battleTotalTimer = 0;
        BattleStatus.startBattleTime = 0;
        BattleStatus.maxHp.me.length = BattleStatus.maxHp.target.length = 0;
        BattleStatus.needMaxHp.me = BattleStatus.needMaxHp.target = false;
        target4GroupData.me.length = target4GroupData.target.length = 0;
        ;
        lastCreateType1MstHp.me = lastCreateType1MstHp.target = null;
        BattleStatus.hasMaxStar = 0;
        BattleStatus.maxStarList = {};
        BattleStatus.meDiceIndex = 1;
        BattleStatus.targetDiceIndex = 1;
        BattleStatus.isInRound = false;
        BattleStatus.changeDiceing = false;
    }
    BattleStatus.initForBattle = initForBattle;
    function nextRound() {
        var delaytime = 2500;
        if (BattleStatus.battleType == 1) {
            BattleStatus.isBoss = !BattleStatus.isBoss;
            if (!BattleStatus.isBoss) {
                if (BattleStatus.battleType == BattleTypeEnums.bigType1) {
                    BattleStatus.scene.playBossRoundEffect();
                }
            }
        }
        else if (BattleStatus.battleType == 2) {
            BattleStatus.isBoss = false;
        }
        var meMstHp = 0;
        var targetMstHp = 0;
        if (!BattleStatus.isBoss) {
            BattleStatus.round++;
            roundTimeCfg[BattleStatus.round] = BattleStatus.battleTotalTimer + delaytime - prepareTime[BattleStatus.battleType];
        }
        else {
            for (var key in BattleStatus.meMonsterDataList) {
                if (BattleStatus.meMonsterDataList.hasOwnProperty(key)) {
                    var mst = BattleStatus.meMonsterDataList[key];
                    mst.hp > 0 && (meMstHp += mst.hp);
                }
            }
            for (var key in BattleStatus.targetMonsterDataList) {
                if (BattleStatus.targetMonsterDataList.hasOwnProperty(key)) {
                    var mst = BattleStatus.targetMonsterDataList[key];
                    mst.hp > 0 && (targetMstHp += mst.hp);
                }
            }
        }
        BattleStatus.meBatteRoundDataList = Api.BattleVoApi.getChallengeListData(BattleStatus.isBoss, meMstHp);
        BattleStatus.targetBatteRoundDataList = Api.BattleVoApi.getChallengeListData(BattleStatus.isBoss, targetMstHp);
        BattleStatus.totalMonsterNum.me = Api.BattleVoApi.getMonsterNum(BattleStatus.isBoss);
        BattleStatus.totalMonsterNum.target = BattleStatus.totalMonsterNum.me;
        BattleStatus.hasCreateMonsterNum.me = BattleStatus.hasCreateMonsterNum.target = 0;
        if (BattleStatus.battleType == 1 && BattleStatus.isBoss) {
            // for (const key in meMonsterList) 
            // {
            //     if (meMonsterList.hasOwnProperty(key)) 
            //     {
            //         const monster = meMonsterList[key];
            //         monster.dispose();
            //         delete meMonsterList[key];
            //     }
            // }
            // for (const key in targetMonsterList) 
            // {
            //     if (targetMonsterList.hasOwnProperty(key)) 
            //     {
            //         const monster = targetMonsterList[key];
            //         monster.dispose();
            //         delete targetMonsterList[key];
            //     }
            // }
            var battleview = BattleStatus.scene;
            battleview.showBossTween(false, targetMstHp);
            battleview.showBossTween(true, meMstHp);
        }
        else {
            for (var key in BattleStatus.meMonsterList) {
                if (BattleStatus.meMonsterList.hasOwnProperty(key)) {
                    var monster = BattleStatus.meMonsterList[key];
                    monster.dispose();
                    delete BattleStatus.meMonsterList[key];
                }
            }
            for (var key in BattleStatus.targetMonsterList) {
                if (BattleStatus.targetMonsterList.hasOwnProperty(key)) {
                    var monster = BattleStatus.targetMonsterList[key];
                    monster.dispose();
                    delete BattleStatus.targetMonsterList[key];
                }
            }
        }
        battleData.me.k = battleData.target.k = 0;
        battleData.me.p = battleData.target.p = 0;
        BattleStatus.maxHp.me.length = BattleStatus.maxHp.target.length = 0;
        BattleStatus.meMonsterDataList.length = 0;
        BattleStatus.targetMonsterDataList.length = 0;
        target4GroupData.me.length = target4GroupData.target.length = 0;
        ;
        BattleStatus.monsterGroupList.me.length = BattleStatus.monsterGroupList.target.length = 0;
        lastCreateType1MstHp.me = lastCreateType1MstHp.target = null;
        App.MsgHelper.dispEvt(MsgConst.BT_NEXT_ROUND);
    }
    BattleStatus.nextRound = nextRound;
    function getCellPosByPix(pixX, pixY) {
        var pos = getStartPos(true, BattleStatus.battleType);
        var space = BattleStatus.diceStartPos.size;
        var startX = pos.x;
        var startY = pos.y;
        // if(battleType==2)
        // {
        //     startY+=-30;
        // }
        var offpos = -14;
        var x = Math.floor((pixX - startX + space.w / 2) / (space.w));
        var y = Math.floor((pixY - startY + space.h / 2) / (space.h));
        // this.setPosition(startX+vle*this._data.x*(diceSize.width+offpos+6)+addX,startY+yle*(diceSize.height+offpos+4)*this._data.y+addY);
        return { x: x, y: y };
    }
    BattleStatus.getCellPosByPix = getCellPosByPix;
    function reset() {
        BattleStatus.changeDiceing = false;
        BattleStatus.isInRound = false;
        BattleStatus.firstAtkIsMe = false;
        BattleStatus.battleTotalTimer = BattleStatus.startBattleTime = BattleStatus.frame = BattleStatus.rframe = BattleStatus.battleLogicHasTickTime = BattleStatus.lastFastTickTime = BattleStatus.round = 0;
        BattleStatus.hasCreateMonsterNum.me = BattleStatus.hasCreateMonsterNum.target = 0;
        BattleStatus.scene = null;
        BattleStatus.winFlag = 0;
        BattleStatus.battleSyncList = {};
        BattleStatus.meMonsterDataList.length = 0;
        BattleStatus.totalMonsterNum.me = BattleStatus.totalMonsterNum.target = 0;
        BattleStatus.targetMonsterDataList.length = 0;
        BattleStatus.battleType = 1;
        BattleStatus.type = "1";
        App.ObjectUtil.clear(BattleStatus.meMonsterList);
        App.ObjectUtil.clear(BattleStatus.targetMonsterList);
        // App.ObjectUtil.clear(meDiceList);
        // App.ObjectUtil.clear(meDiceDataList);
        // App.ObjectUtil.clear(targetDiceList);
        // App.ObjectUtil.clear(targetDiceDataList);
        // winMonsterData={me:0,target:0};
        BattleStatus.selectPos = null;
        BattleStatus.targetPos = null;
        BattleStatus.maxHp.me.length = BattleStatus.maxHp.target.length = 0;
        BattleStatus.needMaxHp.me = BattleStatus.needMaxHp.target = false;
        BattleStatus.meBatteRoundDataList = {};
        BattleStatus.targetBatteRoundDataList = {};
        battleData = { me: { k: 0, l: Config.BattleCfg.playerHp, p: 0, tk: 0 }, target: { k: 0, l: Config.BattleCfg.playerHp, p: 0, tk: 0 } };
        BattleStatus.isAi = false;
        BattleStatus.isBoss = false;
        BattleStatus.monsterGroupList.me.length = BattleStatus.monsterGroupList.target.length = 0;
        target4GroupData.me.length = target4GroupData.target.length = 0;
        lastCreateType1MstHp.me = lastCreateType1MstHp.target = null;
        BattleStatus.hasMaxStar = 0;
        BattleStatus.maxStarList = {};
        BattleStatus.meDiceIndex = 1;
        BattleStatus.targetDiceIndex = 1;
        Bullet.releaseAllBullet();
    }
    BattleStatus.reset = reset;
    function getMaxHpList(isMe) {
        return isMe ? BattleStatus.maxHp.me : BattleStatus.maxHp.target;
    }
    BattleStatus.getMaxHpList = getMaxHpList;
    /**
     *
     * @param mVo
     * @param isMe
     * @param opt 0生成，逃跑，被杀，1被攻击
     */
    function checkMaxHp(mVo, isMe, opt) {
        var needCheck = (isMe ? BattleStatus.needMaxHp.me : BattleStatus.needMaxHp.target);
        if (!needCheck) {
            return;
        }
        var mArr = getMaxHpList(isMe);
        var mHp = mVo.hp;
        var idx = mArr.indexOf(mVo);
        var l = mArr.length;
        if (opt == 1) {
            if (!mVo["highHpBatk"]) {
                mVo["highHpBatk"] = 1;
                isMe ? (maxHpBeAtkNum.me++) : (maxHpBeAtkNum.target++);
                var beAtkNum = isMe ? maxHpBeAtkNum.me : maxHpBeAtkNum.target;
                if (beAtkNum >= l) {
                    //触发重新排序hp
                    isMe ? (maxHpBeAtkNum.me = 0) : (maxHpBeAtkNum.target = 0);
                    var nArr = DiceHelper.sortByHp(isMe, l);
                    for (var index = l - 1; index >= 0; index--) {
                        mArr[index]["highHpBatk"] = 0;
                        mArr[index].highHp = false;
                        if (nArr[index]) {
                            mArr[index].highHp = true;
                            mArr[index] = nArr[index];
                        }
                        else {
                            mArr.splice(index, 1);
                        }
                    }
                }
                else {
                    mArr.sort(function (a, b) { return b.hp - a.hp; });
                }
            }
            else {
                mArr.sort(function (a, b) { return b.hp - a.hp; });
            }
        }
        else {
            if (!mVo.lost(isMe)) {
                if (l < 3) {
                    if (idx < 0) {
                        mVo.highHp = true;
                        mArr.push(mVo);
                    }
                    mArr.sort(function (a, b) { return b.hp - a.hp; });
                }
                else {
                    mArr.sort(function (a, b) { return b.hp - a.hp; });
                    if (idx < 0) {
                        if (mHp > mArr[l - 1].hp) {
                            mArr[l - 1].highHp = false;
                            mArr[l - 1]["highHpBatk"] = 0;
                            mVo.highHp = true;
                            mArr[l - 1] = mVo;
                            mArr.sort(function (a, b) { return b.hp - a.hp; });
                        }
                    }
                }
            }
            else {
                if (idx > -1) {
                    mArr[idx].highHp = false;
                    mArr[idx]["highHpBatk"] = 0;
                    mArr.splice(idx, 1);
                }
            }
        }
    }
    BattleStatus.checkMaxHp = checkMaxHp;
    /**
     * 接下来10ms是否达到触发条件，返回触发的第N次，0是不触发
     * @param cd cd时间
     * @param addTimeValue 每次检测的增量毫秒
     * @param st 从st毫秒开始计时
     */
    function checkCdDoTime(cd, st, data) {
        if (st === void 0) { st = 0; }
        var num = 0;
        var diff = BattleStatus.battleLogicHasTickTime - st;
        if (diff == 0) {
            num = -1;
            // num=(diff/cd)+1;
        }
        else {
            var tmpLast = parseInt(String((diff - BattleStatus.minLogicFrame) / cd));
            var tmpStarted = parseInt(String(diff / cd));
            // if(data&&data.isMe&&BattleStatus.round>0)
            // {
            //     if(!sss)
            //     {
            //         sss=data.hashCode;
            //     }
            //     if(data.hashCode==sss)
            //     {
            //         App.LogUtil.log(cd,st,diff,tmpStarted>tmpLast,(diff-10)/cd,diff/cd);
            //     }
            // }
            return (tmpLast >= 0 && tmpStarted > tmpLast) ? tmpStarted : 0;
        }
        return num;
    }
    BattleStatus.checkCdDoTime = checkCdDoTime;
    // let sss=0;
    function checkCanSync(t) {
        var tmpLast = Math.floor((BattleStatus.lastFastTickTime - BattleStatus.startBattleTime) / BattleStatus.logicFrame);
        var tmpStarted = Math.floor((t - BattleStatus.startBattleTime) / BattleStatus.logicFrame);
        return tmpStarted > tmpLast;
    }
    BattleStatus.checkCanSync = checkCanSync;
    /**
     * CD时间均分
     * @param cd cd时间
     * @param birthTime 骰子生成时间
     * @param star 当前星数
     */
    function formatCdPartTime(cd, birthTime, star) {
        if (star === void 0) { star = 1; }
        var partNum = star;
        var averageNum = cd / partNum;
        var timeArr = [];
        for (var i = 1; i <= partNum; i++) {
            timeArr[i - 1] = birthTime + ((i == partNum) ? cd : averageNum * i);
        }
        return timeArr;
    }
    BattleStatus.formatCdPartTime = formatCdPartTime;
    var damagePool = [];
    var maxNum = 15;
    function showDamage(monster, damage, crit, isMe) {
        var l = damagePool.length;
        var txt = null;
        if (l < maxNum) {
            // txt=ComponentMgr.getTextField(damage+"",size,color);
            txt = ComponentMgr.getTextureText("" + damage, crit ? "mstcritdmgnum" : "mstdmgnum"); //mstdmgnum
            txt.letterSpacing = -2;
        }
        else {
            txt = damagePool.shift();
            txt.init(crit ? "mstcritdmgnum" : "mstdmgnum");
            txt.setString(damage + "");
            egret.Tween.removeTweens(txt);
        }
        txt.alpha = 1;
        txt.setScale(1);
        damagePool.push(txt);
        txt.anchorOffsetX = txt.width * 0.5;
        txt.anchorOffsetY = txt.height * 0.5;
        // if(!txt.parent)
        // {
        //     scene.addChild(txt);
        // }
        // else
        // {
        //     scene.setChildIndex(txt,scene.numChildren-1);
        // }
        BattleStatus.scene.addToEffectLayer(txt, true, crit);
        txt.setPosition(monster.x + (App.MathUtil.getRandom(-25, 25)), monster.y);
        //txt.x+(App.MathUtil.getRandom(-30,30))-7.5
        egret.Tween.get(txt).to({ y: txt.y - 80, scaleX: crit ? 1.5 : 1, scaleY: crit ? 1.5 : 1 }, 1200, egret.Ease.quadOut).to({ alpha: 0 }, 300).call(function () {
            txt.parent && txt.parent.removeChild(txt);
        }, BattleStatus, [txt]);
    }
    BattleStatus.showDamage = showDamage;
})(BattleStatus || (BattleStatus = {}));
//# sourceMappingURL=BattleStatus.js.map