interface IBattleLimitPosCfg
{
    me:{pos0:{x:number,y:number},pos1:{x:number,y:number},pos2:{x:number,y:number},pos3?:{x:number,y:number}};
    target:{pos0:{x:number,y:number},pos1:{x:number,y:number},pos2:{x:number,y:number},pos3?:{x:number,y:number}};
}
namespace BattleStatus
{
    /** 当前创建骰子数目 */
    export let meDiceIndex=1;
    export let targetDiceIndex=1;
    /** 开始战斗的毫秒计时 */
    export let startBattleTime=0;

    /** 战斗耗时毫秒计时 */
    export let battleTotalTimer=0;

    /** 战斗逻辑执行到的毫秒数 */
    export let battleLogicHasTickTime=0;

    /** 战斗显示执行到的毫米数 */
    // export let battleHasShowTickTime=0;

    /** 上一次触发fasttick的毫秒 */
    export let lastFastTickTime=0;

    /** 当前逻辑帧 */
    export let frame=0;

    /** 已收到的最近的逻辑帧 */
    export let rframe=0;

    /** 战斗场景实例 */
    export let scene:BattleView=null;

    // let meStPosX:number;
    // let meStPosY:number;
    // export let targetStPosX:number;
    // export let targetStPosY:number;

    /** 帧动画帧时间 */
    export let timeparam=40;
    export let maxAtkNum:number=99999999;
    /** 逻辑帧，帧间隔 */
    export let logicFrame:number=300;
    /** 随机种子 */
    export let randSeed:number=0;
    let _limitPosCfg:{"1":IBattleLimitPosCfg,"2":IBattleLimitPosCfg}=<any>{};

    export let meMonsterList:{[key:string]:BaseMonster}={};
    export let meMonsterDataList:MonsterVo[]=[];
    
    export let meBatteRoundDataList:{[key:string]:MonsterVo[]}={};
    export let targetBatteRoundDataList:{[key:string]:MonsterVo[]}={};
    // export let monsterNum:number=0;
    export let totalMonsterNum:{me:number,target:number}={me:0,target:0};
    export let hasCreateMonsterNum:{me:number,target:number}={me:0,target:0};


    export let targetMonsterList:{[key:string]:BaseMonster}={};
    export let targetMonsterDataList:MonsterVo[]=[];

    // export let meDiceList:{[key:string]:BaseDice}={};
    // export let meDiceDataList:{[key:string]:DiceData}={};

    // export let targetDiceList:{[key:string]:BaseDice}={};
    // export let targetDiceDataList:{[key:string]:DiceData}={};
    // export let winMonsterData:{me:number,target:number}={me:0,target:0};
    /**战斗大类型，pvp和pve两种大类型，1指的是对战类的，可能包含多个模式，2指的是协同类的，也可能包含多个模式 */
    export let battleType:number=1;
    /**具体战斗类型，每个战斗都有各自的类型 */
    export let type:string="1";

    export let maxAtkSpeed:number=0.5;

    // export let meInfo:dice.sc_battle_init.Player=null;
    // export let targetInfo:dice.sc_battle_init.Player=null;

    export let diceSize:egret.Rectangle=new egret.Rectangle(0,0,200,200);
    

    export let selectPos:string=null;

    export let targetPos:string=null;

    export let lineSize={pve:{w:562,h:386,space:60},pvp:{w:550,h:966}};
    export let endDeep:number=51;
    export let battleCenterY:{"1":number,"2":number}={"1":0,"2":0};
    export let diceStartPos:{"1":{me:{x:number,y:number},target:{x:number,y:number}},"2":{me:{x:number,y:number},target:{x:number,y:number}},size:{w:number,h:number}};
    export let isAi:boolean=false;
    export let battleSyncList:{[key:string]:any}={};
    export let round:number=0;
    export let winFlag:number=0;
    export let hasMaxStar:number=0;//升级到的最大星
    export let maxStarList:{[key:string]:number}={};
    export let changeDiceing:boolean=false;
    let roundTimeCfg:{[key:string]:number}={};
    let prepareTime={"1":4000,"2":3000};
    let battleDiceSize:egret.Rectangle=null;

    /**
     * k当前轮杀死多少个怪，l玩家剩余血量，p当前轮跑了几个怪物
     */
    let battleData:{me:{k:number,l:number,p:number,tk:number},target:{k:number,l:number,p:number,tk:number}}={me:{k:0,l:0,p:0,tk:0},target:{k:0,l:0,p:0,tk:0}};
    export let obstacleZidx:number=0;
    export let bulletZidx:number=0;
    let disGroupList:{"1":number[],"2":number[]}={"1":[],"2":[]};
    let totalDis:{"1":number,"2":number}={"1":0,"2":0};
    export let monsterGroupList:{me:MonsterVo[][],target:MonsterVo[][]}={me:[],target:[]};

    export let maxHp:{me:MonsterVo[],target:MonsterVo[]}={me:[],target:[]};
    let maxHpBeAtkNum:{me:number,target:number}={me:0,target:0};
    export let needMaxHp:{me:boolean,target:boolean}={me:false,target:false};
    let target4GroupData:{me:{[key:string]:number}[],target:{[key:string]:number}[]}={me:[],target:[]};
    export let isBoss=false;
    let lastCreateType1MstHp:{me:Config.ChallengeItemCfg,target:Config.ChallengeItemCfg}={me:null,target:null};

    export let stopActEffect:boolean=false;
    const initMinLogicFrame=10;
    export let logicScale:number=1;
    export let minLogicFrame:number=initMinLogicFrame*logicScale;
    export let firstAtkIsMe:boolean=false;//先出手是否是我自己，规则是UID大的先出手
    export let isInRound:boolean=false;

    export function setType(tmpType:string):void
    {
        type=tmpType;
        if(type==BattleTypeEnums.type3)
        {
            battleType=BattleTypeEnums.bigType1;
        }
        else
        {
            battleType=Number(type);
        }
    }

    export function getPrepareTime():number
    {
        return prepareTime[battleType];
    }

    export function setType1MstCfg(isMe:boolean,cfg:Config.ChallengeItemCfg):void
    {
        if(cfg)
        {
            isMe?(lastCreateType1MstHp.me=cfg):(lastCreateType1MstHp.target=cfg);
        }
    }

    export function getLastType1MsCfg(isMe:boolean):Config.ChallengeItemCfg
    {
        return isMe?lastCreateType1MstHp.me:lastCreateType1MstHp.target;
    }

    export function getTarget4GroupData(isMe:boolean):{[key:string]:number}[]
    {
        return isMe?target4GroupData.me:target4GroupData.target;
    }

    export function getBattleDiceSize():egret.Rectangle
    {
        if(!battleDiceSize)
        {
            let scale=DiceScaleEnum.scale_41;
            battleDiceSize=new egret.Rectangle(0,0,scale*diceSize.width,scale*diceSize.height);
        }
        return battleDiceSize;
    }

    export function getBattleValue(isMe:boolean):{k:number,l:number,p:number}
    {
        return isMe?battleData.me:battleData.target;
    }

    export function getGroupList(isMe:boolean):MonsterVo[][]
    {
        return isMe?monsterGroupList.me:monsterGroupList.target;
    }

    export function checkGroup(mVo:MonsterVo):void
    {
        let isMe=mVo.isMe;
        let groupList = getGroupList(isMe);
        let targetGroupList=getGroupList(!isMe);
        // let mstList=isMe?meMonsterList:targetMonsterList;

        // let mst=mstList[mVo.getName()];
        let disList:number[] = disGroupList[battleType];
        let maxL=disList.length-1;
        let {max,min} = mVo.getRange();
        min=Math.max(0,Math.floor(min));
        max=Math.min(Math.floor(max),maxL);
        
        let lastRange=mVo.getLastRange();
        let lastMin=Math.max(0,Math.floor(lastRange.min));
        let lastMax=Math.min(Math.floor(lastRange.max),maxL);
        
        let minGroupIdx=disList[Math.floor(min)];
        let maxGroupIdx=disList[max];

        let lastMinGroupIdx=disList[Math.floor(lastMin)];
        let lastMaxGroupIdx=disList[lastMax];
        let isPub=mVo.isPublic();

        if(mVo.lost(isMe))
        {
            App.LogUtil.log(mVo.hashCode,':last:',lastRange.min,lastRange.max,lastMinGroupIdx,lastMaxGroupIdx,':now:',min,max,minGroupIdx,maxGroupIdx);
            rmGroupLsit(mVo,groupList,maxGroupIdx);
            if(isPub)
            {
                rmGroupLsit(mVo,targetGroupList,maxGroupIdx);
            }
            if(minGroupIdx!=maxGroupIdx)
            {
                rmGroupLsit(mVo,groupList,minGroupIdx);
                if(isPub)
                {
                    rmGroupLsit(mVo,targetGroupList,minGroupIdx);
                }
            }
            return;
        }

        if(maxGroupIdx>lastMaxGroupIdx)
        {
            addGroupList(mVo,groupList,maxGroupIdx);
            if(isPub)
            {
                addGroupList(mVo,targetGroupList,maxGroupIdx);
            }
            
        }
        else if(minGroupIdx>lastMinGroupIdx)
        {
            rmGroupLsit(mVo,groupList,lastMinGroupIdx);
            if(isPub)
            {
                rmGroupLsit(mVo,targetGroupList,lastMinGroupIdx);
            }
        }
        else if(minGroupIdx<lastMinGroupIdx||maxGroupIdx<lastMaxGroupIdx)
        {
            let pve=BattleStatus.battleType==2;
            rmGroupLsit(mVo,groupList,lastMinGroupIdx);
            if(pve)
            {
                rmGroupLsit(mVo,targetGroupList,lastMinGroupIdx);
            }

            if(lastMinGroupIdx!=lastMaxGroupIdx)
            {
                rmGroupLsit(mVo,groupList,lastMaxGroupIdx);
                if(pve)
                {
                    rmGroupLsit(mVo,targetGroupList,lastMaxGroupIdx);
                }
            }

            addGroupList(mVo,groupList,maxGroupIdx);
            if(isPub)
            {
                addGroupList(mVo,targetGroupList,maxGroupIdx);
            }
            if(maxGroupIdx!=minGroupIdx)
            {
                addGroupList(mVo,groupList,minGroupIdx);
                if(isPub)
                {
                    addGroupList(mVo,targetGroupList,minGroupIdx);
                }
            }
        }
    }

    export function checkPublicGroup(mVo:MonsterVo):void
    {
        let isMe=!mVo.isMe;
        let targetGroupList=getGroupList(isMe);
        let disList:number[] = disGroupList[battleType];
        let maxL=disList.length-1;
        let {max,min} = mVo.getRange();
        min=Math.max(0,Math.floor(min));
        max=Math.min(Math.floor(max),maxL);
        let minGroupIdx=disList[min];
        let maxGroupIdx=disList[max];

        addGroupList(mVo,targetGroupList,maxGroupIdx);
        // if(maxGroupIdx!=minGroupIdx)
        // {
        //     addGroupList(mVo,targetGroupList,minGroupIdx);
        // }
    }

    export function createAddGroupList(mVo:MonsterVo):void
    {
        let groupList = mVo.isMe?monsterGroupList.me:monsterGroupList.target;
        addGroupList(mVo,groupList,0);
    }

    function addGroupList(mVo:MonsterVo,groupList:MonsterVo[][],idx:number):void
    {
        let group=groupList[idx];
        if(!group)
        {
            group=[mVo];
            groupList[idx]=group;
        }
        else
        {
            group.push(mVo);
        }
        let mstList=mVo.isMe?meMonsterList:targetMonsterList;
        let mst=mstList[mVo.getName()];
        App.LogUtil.log("add",idx,mVo.hashCode);
    }

    function rmGroupLsit(mVo:MonsterVo,groupList:MonsterVo[][],idx:number):void
    {
        let group=groupList[idx];
        if(group)
        {
            let tidx=group.indexOf(mVo);
            if(tidx>-1)
            {
                App.LogUtil.log("delete success",idx,mVo.hashCode);
                group.splice(tidx,1);
            }
            else
            {
                App.LogUtil.log("delete fail",idx,mVo.hashCode);
            }
        }
        // App.LogUtil.log("rm:",groupList);
    }

    /**
     * 战斗结果计数
     * @param isMe 
     * @param type 跑了还是打死了,l玩家掉血，k打死怪，p跑了一个怪，tk计算刷给对方怪，过滤到boss和type3的怪，杀死的数量
     */
    export function battleCheckCount(isMe:boolean,ttype:"l"|"k"|"p"|"tk",callback?:()=>void,callbackObj?:any):void
    {
        let data:{k:number,l:number,p:number,tk:number}=isMe?battleData.me:battleData.target;
        if(ttype=="l")
        {
            data.l--;
            data.l=Math.max(0,data.l);
        }
        else
        {
            data[ttype]++;
            if(ttype=="tk")
            {
                if(data.tk%Api.BattleVoApi.getAddMonster()==0)
                {
                    if(callback)
                    {
                        callback.apply(callbackObj);
                    }
                }
            }
        }
    }

    export function checkBattleResult():boolean
    {
        let playerHp=Config.BattleCfg.playerHp;
        let isEnd:boolean=checkEnd();
        if(!isEnd)
        {
            if(checkNextRound())
            {
                isInRound = true;
                if(Api.BattleVoApi.checkMaxRound())
                {
                    isEnd=true;
                    isInRound=false;
                }
                else
                {
                    nextRound();
                }
            }
        }
        return isEnd;
    }

    export function checkEnd():boolean{
        let isEnd:boolean=false;
        if(battleData.me.l<=0)
        {
            if(battleData.target.l<=0)
            {
                let mtInfo=Api.BattleVoApi.getInitInfo(true);
                let tInfo=Api.BattleVoApi.getInitInfo(false);
                let meScore=mtInfo.score;
                let targetScore=tInfo.score;
                if(meScore==targetScore)
                {
                    winFlag=mtInfo.uid>tInfo.uid?1:0;
                }
                else if(meScore<targetScore)
                {
                    winFlag=1;
                }
            }
            isEnd=true;
        }
        else if(battleData.target.l<=0)
        {
            winFlag=1;
            isEnd=true;
        }
        if(isEnd && Api.GameinfoVoApi.getIsGuiding()){
            battleData.me.l = 1;
            battleData.target.l = 0;
            winFlag=1;
        }
        return isEnd;
    }

    export function checkNextRound():boolean
    {
        let result=false;
        if(battleType==2&&(battleData.me.k+battleData.target.k>=totalMonsterNum.me+totalMonsterNum.target))
        {
            result=true;
        }
        else
        {
            let diffT = battleLogicHasTickTime-(getRoundStartT()+Config.BattleCfg.getbtTimeByRound(round)*1000);
            diffT==0&&App.LogUtil.log(battleType,isBoss,diffT);
            if(battleType==1&&(!isBoss)&&diffT==0)
            {
                result=true;
            }
            else
            {
                //boss是否全部逃脱
                if(battleData.me.l>0&&battleData.me.k+battleData.me.p>=totalMonsterNum.me)
                {
                    if(battleData.target.l>0&&battleData.target.k+battleData.target.p>=totalMonsterNum.target)
                    {
                        result=true;
                    }
                }
            }
        }
        return result;
    }

    export function getRoundStartT():number
    {
        return prepareTime[battleType]+(roundTimeCfg[round]||0);
    }

    function getStartPos(isMe:boolean,battleType:number)
    {
        return isMe?diceStartPos[battleType].me:diceStartPos[battleType].target;
    }

    export function getCeilSize():{w:number,h:number}
    {
        return diceStartPos.size;
    }

    export function getStartX(isMe:boolean):number
    {
        let pos=getStartPos(isMe,battleType);
        return pos.x;
    }

    export function getStartY(isMe:boolean):number
    {
        let pos=getStartPos(isMe,battleType);
        return pos.y;
    }

    export function init():void
    {
        // if(App.DeviceUtil.isWXgame())
        // {
            logicScale=5;
        // }
        minLogicFrame=initMinLogicFrame*logicScale;
        battleCenterY[1]=567+(GameConfig.stageHeigth-1280)*0.5;
        battleCenterY[2]=589+(GameConfig.stageHeigth-1280)*0.5;
        // meStPosX=100+30+42;
        // meStPosY=battleCenterY+188;
        // targetStPosX=GameConfig.stageWidth-100-30-42;
        // targetStPosY=battleCenterY-188;
        diceStartPos={
            "1":{
                me:{
                    x:137,y:battleCenterY[1]+170
                },
                target:{
                    x:GameConfig.stageWidth-137+1,y:battleCenterY[1]-147
                }
            },
            "2":{
                me:{
                    x:137,y:battleCenterY[2]+129
                },
                target:{
                    x:137,y:battleCenterY[2]-118
                }
            },
            size:{w:92,h:108},
        };
        _limitPosCfg={
            "1":{
                me:{
                    pos0:{x:GameConfig.stageWidth*0.5-lineSize.pve.w*0.5,y:battleCenterY[1]+lineSize.pve.space+lineSize.pve.h},
                    pos1:{x:GameConfig.stageWidth*0.5-lineSize.pve.w*0.5,y:battleCenterY[1]+lineSize.pve.space},
                    pos2:{x:GameConfig.stageWidth*0.5+lineSize.pve.w*0.5,y:battleCenterY[1]+lineSize.pve.space},
                    pos3:{x:GameConfig.stageWidth*0.5+lineSize.pve.w*0.5,y:battleCenterY[1]+lineSize.pve.space+lineSize.pve.h},
                },
                target:{
                    pos0:{x:GameConfig.stageWidth*0.5+lineSize.pve.w*0.5,y:battleCenterY[1]-lineSize.pve.space-lineSize.pve.h},
                    pos1:{x:GameConfig.stageWidth*0.5+lineSize.pve.w*0.5,y:battleCenterY[1]-lineSize.pve.space},
                    pos2:{x:GameConfig.stageWidth*0.5-lineSize.pve.w*0.5,y:battleCenterY[1]-lineSize.pve.space},
                    pos3:{x:GameConfig.stageWidth*0.5-lineSize.pve.w*0.5,y:battleCenterY[1]-lineSize.pve.space-lineSize.pve.h},
                }
                
            },
            "2":{
                me:{
                    pos0:{x:GameConfig.stageWidth-lineSize.pvp.w-endDeep,y:battleCenterY[2]+lineSize.pvp.h*0.5},
                    pos1:{x:GameConfig.stageWidth-lineSize.pvp.w-endDeep,y:battleCenterY[2]},
                    pos2:{x:GameConfig.stageWidth-endDeep,y:battleCenterY[2]},
                },
                target:{
                    pos0:{x:GameConfig.stageWidth-lineSize.pvp.w-endDeep,y:battleCenterY[2]-lineSize.pvp.h*0.5},
                    pos1:{x:GameConfig.stageWidth-lineSize.pvp.w-endDeep,y:battleCenterY[2]},
                    pos2:{x:GameConfig.stageWidth-endDeep,y:battleCenterY[2]},
                }
            },
        };
        for (const key in _limitPosCfg) 
        {
            if (_limitPosCfg.hasOwnProperty(key)) 
            {
                const limitCfg = _limitPosCfg[key].me;
                tnum:for (let i = 1; i < 4; i++) 
                {
                    if(!limitCfg["pos"+i])
                    {
                        break tnum;
                    }
                    let lst:{x:number,y:number} = limitCfg["pos"+(i-1)];
                    let cur:{x:number,y:number} = limitCfg["pos"+i];
                    totalDis[key]+=Math.abs(cur.x-lst.x)+Math.abs(cur.y-lst.y);
                }
                for (let idx = 0; idx < totalDis[key]; idx++) 
                {
                    let count=Math.floor(idx*0.01);
                    disGroupList[key][idx]=count;
                }
            }
        }
        
    }

    export function getDisGroupList():number[]
    {
        return disGroupList[battleType];
    }

    export function getLimitPos():IBattleLimitPosCfg
    {
        return _limitPosCfg[battleType];
    }

    export function initForBattle():void
    {
        firstAtkIsMe=false;
        isBoss=false;
        battleSyncList={};
        round=0;
        meBatteRoundDataList=Api.BattleVoApi.getChallengeListData(isBoss);
        targetBatteRoundDataList=Api.BattleVoApi.getChallengeListData(isBoss);
        totalMonsterNum.me=Api.BattleVoApi.getMonsterNum(isBoss);
        totalMonsterNum.target=totalMonsterNum.me;
        battleData={me:{k:0,l:Config.BattleCfg.playerHp,p:0,tk:0},target:{k:0,l:Config.BattleCfg.playerHp,p:0,tk:0}};
        if(battleType==2)
        {
            battleData.me.l=battleData.target.l=1;
        }
        winFlag=0;
        battleLogicHasTickTime=0;
        battleTotalTimer=0;
        startBattleTime=0;
        maxHp.me.length=maxHp.target.length=0;
        needMaxHp.me=needMaxHp.target=false;
        target4GroupData.me.length=target4GroupData.target.length=0;;
        lastCreateType1MstHp.me=lastCreateType1MstHp.target=null;
        hasMaxStar=0;
        maxStarList={};
        meDiceIndex=1;
        targetDiceIndex=1;
        isInRound=false;
        changeDiceing=false;
    }

    export function nextRound():void
    {
        let delaytime = 2500;
        if(battleType==1)
        {

            isBoss=!isBoss;
            if(!isBoss){
                if(battleType==BattleTypeEnums.bigType1)
                {
                    (<Battle1View>scene).playBossRoundEffect();
                }
            }
        }
        else if(battleType==2)
        {
            isBoss=false;
        }
        let meMstHp=0;
        let targetMstHp=0;
        if(!isBoss)
        {
            round++;
            roundTimeCfg[round]=BattleStatus.battleTotalTimer+delaytime-prepareTime[battleType];
        }
        else
        {
            for (const key in meMonsterDataList) {
                if (meMonsterDataList.hasOwnProperty(key)) {
                    const mst = meMonsterDataList[key];
                    mst.hp>0&&(meMstHp+=mst.hp);
                }
            }
            for (const key in targetMonsterDataList) {
                if (targetMonsterDataList.hasOwnProperty(key)) {
                    const mst = targetMonsterDataList[key];
                    mst.hp>0&&(targetMstHp+=mst.hp);
                }
            }
        }
        meBatteRoundDataList=Api.BattleVoApi.getChallengeListData(isBoss,meMstHp);
        targetBatteRoundDataList=Api.BattleVoApi.getChallengeListData(isBoss,targetMstHp);
        totalMonsterNum.me=Api.BattleVoApi.getMonsterNum(isBoss);
        totalMonsterNum.target=totalMonsterNum.me;
        hasCreateMonsterNum.me=hasCreateMonsterNum.target=0;

        if(battleType == 1 && isBoss){
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
            let battleview : any =  BattleStatus.scene;
            battleview.showBossTween(false,targetMstHp);
            battleview.showBossTween(true,meMstHp);
        }
        else{
            for (const key in meMonsterList) 
            {
                if (meMonsterList.hasOwnProperty(key)) 
                {
                    const monster = meMonsterList[key];
                    monster.dispose();
                    delete meMonsterList[key];
                }
            }
            for (const key in targetMonsterList) 
            {
                if (targetMonsterList.hasOwnProperty(key)) 
                {
                    const monster = targetMonsterList[key];
                    monster.dispose();
                    delete targetMonsterList[key];
                }
            }
        }
        battleData.me.k=battleData.target.k=0;
        battleData.me.p=battleData.target.p=0;
        maxHp.me.length=maxHp.target.length=0;
        meMonsterDataList.length=0;
        targetMonsterDataList.length=0;
        target4GroupData.me.length=target4GroupData.target.length=0;;
        monsterGroupList.me.length=monsterGroupList.target.length=0;
        lastCreateType1MstHp.me=lastCreateType1MstHp.target=null;
        App.MsgHelper.dispEvt(MsgConst.BT_NEXT_ROUND);
    }

    export function getCellPosByPix(pixX:number,pixY:number):{x:number,y:number}
    {
        let pos = getStartPos(true,battleType);
        let space = diceStartPos.size;
        let startX:number=pos.x;
        let startY:number=pos.y;
        // if(battleType==2)
        // {
        //     startY+=-30;
        // }
        let offpos=-14;
        let x = Math.floor((pixX-startX+space.w/2)/(space.w));
        let y = Math.floor((pixY-startY+space.h/2)/(space.h));
        // this.setPosition(startX+vle*this._data.x*(diceSize.width+offpos+6)+addX,startY+yle*(diceSize.height+offpos+4)*this._data.y+addY);
        return {x:x,y:y};
    }

    export function reset()
    {
        changeDiceing=false;
        isInRound=false;
        firstAtkIsMe=false;
        battleTotalTimer=startBattleTime=frame=rframe=battleLogicHasTickTime=lastFastTickTime=round=0;
        hasCreateMonsterNum.me=hasCreateMonsterNum.target=0;
        scene=null;
        winFlag=0;
        battleSyncList={};
        meMonsterDataList.length=0;
        totalMonsterNum.me=totalMonsterNum.target=0;

        targetMonsterDataList.length=0;
        battleType=1;
        type="1";

        App.ObjectUtil.clear(meMonsterList);
        App.ObjectUtil.clear(targetMonsterList);
        // App.ObjectUtil.clear(meDiceList);
        // App.ObjectUtil.clear(meDiceDataList);
        // App.ObjectUtil.clear(targetDiceList);
        // App.ObjectUtil.clear(targetDiceDataList);
        // winMonsterData={me:0,target:0};
        selectPos=null;
        targetPos=null;
        maxHp.me.length=maxHp.target.length=0;
        needMaxHp.me=needMaxHp.target=false;
        meBatteRoundDataList={};
        targetBatteRoundDataList={};
        battleData={me:{k:0,l:Config.BattleCfg.playerHp,p:0,tk:0},target:{k:0,l:Config.BattleCfg.playerHp,p:0,tk:0}};
        isAi=false;
        isBoss=false;
        monsterGroupList.me.length=monsterGroupList.target.length=0;
        target4GroupData.me.length=target4GroupData.target.length=0;
        lastCreateType1MstHp.me=lastCreateType1MstHp.target=null;
        hasMaxStar=0;
        maxStarList={};
        meDiceIndex=1;
        targetDiceIndex=1;
        Bullet.releaseAllBullet();
    }

    export function getMaxHpList(isMe:boolean):MonsterVo[]
    {
        return isMe?maxHp.me:maxHp.target;
    }

    /**
     * 
     * @param mVo 
     * @param isMe 
     * @param opt 0生成，逃跑，被杀，1被攻击
     */
    export function checkMaxHp(mVo:MonsterVo,isMe:boolean,opt:0|1):void
    {
        let needCheck = (isMe?needMaxHp.me:needMaxHp.target);
        if(!needCheck)
        {
            return;
        }
        let mArr=getMaxHpList(isMe);
        let mHp=mVo.hp;
        let idx=mArr.indexOf(mVo);
        let l=mArr.length;
        if(opt==1)
        {
            if(!mVo["highHpBatk"])
            {
                mVo["highHpBatk"]=1;
                isMe?(maxHpBeAtkNum.me++):(maxHpBeAtkNum.target++);
                let beAtkNum=isMe?maxHpBeAtkNum.me:maxHpBeAtkNum.target;
                if(beAtkNum>=l)
                {
                    //触发重新排序hp
                    isMe?(maxHpBeAtkNum.me=0):(maxHpBeAtkNum.target=0);
                    let nArr = DiceHelper.sortByHp(isMe,l);
                    for (let index = l-1; index >=0; index--) {
                        mArr[index]["highHpBatk"]=0;
                        mArr[index].highHp=false;
                        if(nArr[index])
                        {
                            mArr[index].highHp=true;
                            mArr[index]=nArr[index];
                        }
                        else
                        {
                            mArr.splice(index,1);
                        }
                    }
                }
                else
                {
                    mArr.sort((a,b)=>{return b.hp-a.hp;});
                }
            }
            else
            {
                mArr.sort((a,b)=>{return b.hp-a.hp;});
            }
        }
        else
        {
            if(!mVo.lost(isMe))
            {
                if(l<3)
                {
                    if(idx<0)
                    {
                        mVo.highHp=true;
                        mArr.push(mVo);
                    }
                    mArr.sort((a,b)=>{return b.hp-a.hp});
                }
                else
                {
                    mArr.sort((a,b)=>{return b.hp-a.hp});
                    if(idx<0)
                    {
                        if(mHp>mArr[l-1].hp)
                        {
                            mArr[l-1].highHp=false;
                            mArr[l-1]["highHpBatk"]=0;

                            mVo.highHp=true;

                            mArr[l-1]=mVo;
                            mArr.sort((a,b)=>{return b.hp-a.hp});
                        }
                    }
                }
            }
            else
            {
                if(idx>-1)
                {
                    mArr[idx].highHp=false;
                    mArr[idx]["highHpBatk"]=0;

                    mArr.splice(idx,1);
                }
            }
        }
    }

    /**
     * 接下来10ms是否达到触发条件，返回触发的第N次，0是不触发
     * @param cd cd时间
     * @param addTimeValue 每次检测的增量毫秒
     * @param st 从st毫秒开始计时
     */
    export function checkCdDoTime(cd:number,st:number=0,data?:DiceData):number
    {
        let num:number=0;
        let diff=battleLogicHasTickTime-st;
        if(diff==0)
        {
            num=-1;
            // num=(diff/cd)+1;
        }
        else
        {
            let tmpLast = parseInt(String((diff-minLogicFrame)/cd));
            let tmpStarted = parseInt(String(diff/cd));
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
            return (tmpLast>=0&&tmpStarted>tmpLast)?tmpStarted:0;
        }
        return num;
    }
    // let sss=0;

    export function checkCanSync(t:number):boolean
    {
        let tmpLast = Math.floor((lastFastTickTime-startBattleTime)/logicFrame);
        let tmpStarted = Math.floor((t-startBattleTime)/logicFrame);
        return tmpStarted>tmpLast;
    }

    /**
     * CD时间均分
     * @param cd cd时间
     * @param birthTime 骰子生成时间
     * @param star 当前星数
     */
    export function formatCdPartTime(cd:number,birthTime:number,star:number=1):number[]
    {
        let partNum=star;
        let averageNum=cd/partNum;
        let timeArr:number[]=[];
        for(let i=1;i<=partNum;i++)
        {
            timeArr[i-1]=birthTime+((i==partNum)?cd:averageNum*i);
        }
        return timeArr;
    }

    let damagePool:TextureText[] = [];
    let maxNum:number=15;
    export function showDamage(monster:BaseMonster,damage:number,crit:boolean,isMe:boolean):void
    {
        let l=damagePool.length;
        let txt:TextureText=null;
		if (l<maxNum)
		{
            // txt=ComponentMgr.getTextField(damage+"",size,color);
            txt=<TextureText>ComponentMgr.getTextureText(""+damage, crit ? "mstcritdmgnum" : "mstdmgnum");//mstdmgnum
            txt.letterSpacing=-2;
        }
        else
        {
            txt=damagePool.shift();
            txt.init(crit ? "mstcritdmgnum" : "mstdmgnum");
            txt.setString(damage+"");
            egret.Tween.removeTweens(txt);
        }
        txt.alpha = 1;
        txt.setScale(1);
        damagePool.push(txt);
        txt.anchorOffsetX=txt.width*0.5;
        txt.anchorOffsetY=txt.height*0.5;
        // if(!txt.parent)
        // {
        //     scene.addChild(txt);
        // }
        // else
        // {
        //     scene.setChildIndex(txt,scene.numChildren-1);
        // }
        scene.addToEffectLayer(txt,true,crit);
        txt.setPosition(monster.x+(App.MathUtil.getRandom(-25,25)),monster.y);
        //txt.x+(App.MathUtil.getRandom(-30,30))-7.5
        egret.Tween.get(txt).to({y:txt.y-80, scaleX : crit ? 1.5 : 1, scaleY : crit ? 1.5 : 1},1200,egret.Ease.quadOut).to({alpha : 0}, 300).call(()=>{
            txt.parent&&txt.parent.removeChild(txt);
        },BattleStatus,[txt]);
    }
}
