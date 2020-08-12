namespace Api
{
    export namespace BattleVoApi
    {
        let loading:GameLoading=null;
        let battleData:{me:PlayerBattleVo,target:PlayerBattleVo}=null;
        export function getChallengeListData(isBoss:boolean,bossHp:number=0):{[key: string]: MonsterVo[]}
        {
            let averageLv:number=getLvValue();
            let round=BattleStatus.round;
            let roundListData:{[key: string]: MonsterVo[]}={};
            if(isBoss)
            {
                let t=BattleStatus.battleLogicHasTickTime+3700-BattleStatus.getRoundStartT();
                let bossid = BattleStatus.scene.curRoundBossId;
                let classObj=egret.getDefinitionByName(`Boss${bossid}Vo`);
                classObj=classObj||BossVo;
                let vo = new classObj();
                vo.birthTime=t;
                vo.hp=Config.BattleCfg.getBossHp(BattleStatus.round,bossHp);//todo
                vo.initData(Config.MonsterCfg.getBossCfgById(String(bossid)));
                roundListData[t]=[vo];
            }
            else
            {
                let roundCfg = getChallangeCfg();
                for (const t in roundCfg)
                {
                    if (roundCfg.hasOwnProperty(t))
                    {
                        let listDataArr:MonsterVo[]=[];
                        const itemCfgArr = roundCfg[t];
                        let l=itemCfgArr.length;
                        for (let i = 0; i < l; i++)
                        {
                            const itemCfg = itemCfgArr[i];
                            let classObj=null;
                            if(itemCfg.bossID)
                            {
                                classObj=egret.getDefinitionByName(`Boss${itemCfg.bossID}Vo`);
                                classObj=classObj||BossVo;
                            }
                            else
                            {
                                classObj=MonsterVo;
                            }
                            let vo = new classObj();
                            vo.hp=itemCfg.getHpByLv(averageLv);
                            if(itemCfg.bossID)
                            {
                                let tmpCfg=Config.MonsterCfg.getBossCfgById(itemCfg.bossID);
                                let bossCfg=new Config.BossItemCfg();
                                bossCfg.monsterSpeed=itemCfg.monsterSpeed;
                                bossCfg.addSpeed=itemCfg.addSpeed;
                                bossCfg.id=itemCfg.bossID;
                                bossCfg.parameter=tmpCfg.parameter;
                                vo.initData(bossCfg);
                            }
                            else
                            {
                                vo.initData(itemCfg);
                            }
                            vo.birthTime=Number(t);
                            vo.inBaseRound=true;
                            listDataArr.push(vo);
                        }
                        roundListData[t]=listDataArr;
                    }
                }
            }
            return roundListData;
        }

        function getChallangeCfg():{[key: string]: Config.ChallengeItemCfg[]}
        {
            let cfg:{[key: string]: Config.ChallengeItemCfg[]}={};
            let round = BattleStatus.round;
            let battleCfg=getBattleCfg();
            cfg=battleCfg.getChallangeCfg(round);
            return cfg;
        }

        function getBattleCfg():typeof Config.BattleCfg | typeof Config.TogetherCfg | typeof Config.FairarenaCfg
        {
            let result:typeof Config.BattleCfg | typeof Config.TogetherCfg | typeof Config.FairarenaCfg;
            switch(BattleStatus.type)
            {
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
        export function getNormalChallangeCfg():{[key: string]: Config.ChallengeItemCfg[]}
        {
            let cfg:{[key: string]: Config.ChallengeItemCfg[]}={};
            let round = BattleStatus.round;
            let battleCfg=getBattleCfg();
            if(BattleStatus.battleType==2)
            {
                round-=1;
            }
            cfg=battleCfg.getChallangeCfg(round);
            return cfg;
        }

        export function getMonsterNum(isBoss:boolean):number
        {
            let num=0;
            let round=BattleStatus.round;
            if(isBoss)
            {
                num=1
            }
            else
            {
                let battleCfg=getBattleCfg();
                num=battleCfg.getChallangeMsNum(round);
            }
            return num;
        }

        export function getItemCfgByRoundAndKey(round:number,cfgKey:string):Config.ChallengeItemCfg
        {
            let itemCfg:Config.ChallengeItemCfg=null;
            let battleCfg:{getItemCfgByRoundAndKey?:(round:number,cfgKey:string,isGuiding?:boolean)=>Config.ChallengeItemCfg}=<{getItemCfgByRoundAndKey?:(round:number,cfgKey:string,isGuiding?:boolean)=>Config.ChallengeItemCfg}>getBattleCfg();
            if(battleCfg.getItemCfgByRoundAndKey)
            {
                itemCfg=battleCfg.getItemCfgByRoundAndKey(round,cfgKey,Api.GameinfoVoApi.getIsGuiding());
            }
            return itemCfg;
        }

        export function createDiceDataById(upinfo:dice.sc_battle_init.IUpInfo,pos:string,frame:number,isMe:boolean,star?:number,isPre?:boolean):DiceData
        {
            let data=new DiceData();
            if(!isPre)
            {
                data.birthTime=frame*BattleStatus.logicFrame;
                isMe?++BattleStatus.meDiceIndex:++BattleStatus.targetDiceIndex;
                data.index = isMe?BattleStatus.meDiceIndex:BattleStatus.targetDiceIndex;
            }
            data.isMe=isMe;
            data.initData(upinfo,pos,star);
            return data;
        }

        export function getInitSp():number
        {
            let battleCfg=getBattleCfg();
            return battleCfg.iniSp;
        }

        export function getAddMonster():number
        {
            let battleCfg=getBattleCfg();
            return battleCfg.addMonster||9999;
        }

        export function getAddMonsterDelay():number
        {
            let battleCfg=getBattleCfg();
            return battleCfg.addMonsterDelay||1000;
        }

        export function startBattle(type:string):void
        {
            type=String(type);
            BattleStatus.setType(type);
            battleData={me:new PlayerBattleVo(),target:new PlayerBattleVo()};
            let battleClassName="Battle"+type+"View";
            if(!egret.hasDefinition(battleClassName))
            {
                battleClassName="Battle"+BattleStatus.battleType+"View";
            }
            if(egret.hasDefinition(battleClassName))
            {
                showLoading();
                ViewController.getInstance().openView(battleClassName);
            }
            else
            {
                App.LogUtil.log("lost "+battleClassName);
            }
        }

        function showLoading():void
        {
            if(!loading)
            {
                loading=new GameLoading();
            }
            loading.show();
        }

        export function hideLoading():void
        {
            loading&&loading.hide();
        }

        export function setInitInfo(initData:dice.sc_battle_init.InitData):void
        {
            let maxUid:number=0;
            for (const uid in initData) 
            {
                if (initData.hasOwnProperty(uid))
                {
                    if(Number(uid)>maxUid)
                    {
                        maxUid=Number(uid);
                    }
                    const uData = initData[uid];
                    let isMe:boolean=false;
                    isMe=Number(uid)==Api.UserinfoVoApi.getUid();
                    if(!isMe)
                    {
                        // 机器人
                        BattleStatus.isAi=!checkPlayer(uid);
                    }
                    let vo=getBattleData(isMe);
                    vo.upinfo=uData;
                    let upInfo = vo.upinfo.upInfo;
                    for(const key in upInfo) {
                        if (upInfo.hasOwnProperty(key)) {
                            const infoItem = upInfo[key];
                            infoItem.pwlv=1;
                        }
                    }
                    vo.uid=Number(uid);
                    Api.BattleVoApi.setCrivalue(uData.crivalue,isMe);
                }
            }
            BattleStatus.firstAtkIsMe=(maxUid==Api.UserinfoVoApi.getUid());
        }

        export function checkMaxRound():boolean
        {
            let result:boolean=false;
            if(BattleStatus.battleType==2)
            {
                result = (BattleStatus.round+1)>=Config.TogetherCfg.getMaxRound();
            }
            return result;
        }

        export function getInitInfo(isMe:boolean):dice.sc_battle_init.Player
        {
            let vo=getBattleData(isMe);
            return vo.upinfo;
        }

        export function addSp(addSp:number,isMe:boolean):void
        {
            let vo=getBattleData(isMe);
            vo&&vo.addSp(addSp);
            App.MsgHelper.dispEvt(MsgConst.BTLE_ADD_SP, isMe);
        }

        export function addDice(addDiceNum:number,isMe:boolean):void
        {
            let vo=getBattleData(isMe);
            addSp(-getNeedSpNum(isMe),isMe);
            vo&&vo.addDiceNum(addDiceNum);
        }

        export function setCrivalue(crivalue:number,isMe:boolean):void
        {
            let vo=getBattleData(isMe);
            vo.setCrivalue(crivalue);
        }

        export function checkBuyDice(isMe:boolean):boolean
        {
            let vo=getBattleData(isMe);
            let needSp:number=getNeedSpNum(isMe);
            return vo.sp>=needSp;
        }

        export function getNeedSpNum(isMe:boolean):number
        {
            let vo=getBattleData(isMe);
            let battleCfg=getBattleCfg();
            return battleCfg.getNeedSpByNum(vo.hasOwnDiceNum);;
        }

        export function getHasOwnDiceNum(isMe:boolean):number
        {
            let vo=getBattleData(isMe);
            return vo.hasOwnDiceNum;
        }

        export function getPowerUpCostByLv(powLv:number):number
        {
            let battleCfg=getBattleCfg();
            return battleCfg.getPowerUpCostBylv(powLv);
        }

        export function checkPowerUp(id:string,isMe:boolean):boolean
        {
            let vo=getBattleData(isMe);
            let pwLv = vo.getPwlvById(id);
            let powerUpCostSp = getPowerUpCostByLv(pwLv);
            return vo.sp>=powerUpCostSp && pwLv < 5;
            
        }

        export function getBattleData(isMe:boolean):PlayerBattleVo
        {
            if(!battleData){
                return null;
            }
            return isMe?battleData.me:battleData.target;
        }

        export function getSpNum(isMe:boolean=true):number
        {
            let vo=getBattleData(isMe);
            return vo.sp;
        }
        export function checkPlayer(uid:string):boolean
        {
            return Number(uid)>10000;
        }

        export function getLvValue():number
        {
            let meVo = getBattleData(true);
            let targetVo=getBattleData(false);
            return Math.floor((meVo.upinfo.level+targetVo.upinfo.level)/2);
        }

        export function getUpinfoIdxByDiceId(isMe:boolean, diceid:string):number{
            let upinfo = getBattleData(isMe).upinfo.upInfo;
            let idx = -1;
            for(let i in upinfo){
                if(Number(upinfo[i].id) == Number(diceid)){
                    idx = Number(i);
                    break;
                }
            }
            return idx;
        }

        export function getUpinfoPlvByDiceId(isMe:boolean, diceid:string):number{
            let vo=getBattleData(isMe);  
            let lv = 1;
            if(vo && vo.upinfo){
                let upinfo = vo.upinfo.upInfo;
                for(let i in upinfo){
                    if(Number(upinfo[i].id) == Number(diceid)){
                        lv = upinfo[i].pwlv;
                        break;
                    }
                }
            } 
            return lv;
        }

        export function getUpinfoLvByDiceId(isMe:boolean, diceid:string):number{
            let vo=getBattleData(isMe); 
            let lv = 1;
            if(vo&&vo.upinfo){
                let upinfo = vo.upinfo.upInfo;
                for(let i in upinfo){
                    if(Number(upinfo[i].id) == Number(diceid)){
                        lv = upinfo[i].lv;
                        break;
                    }
                }
            }
            return lv;
        }

        export function diceLvup(id:string,isMe:boolean):number
        {
            let vo=getBattleData(isMe);

            // let pwlv:number=1;
            
            let upinfo = getInitInfo(isMe).upInfo;
            let l = upinfo.length;
            let upInfoItem:dice.sc_battle_init.IUpInfo=null;
            for (let i=0; i<l;i++)
            {
                upInfoItem = upinfo[i];
                if(id==upInfoItem.id)
                {
                    let powerUpCostSp = Api.BattleVoApi.getPowerUpCostByLv(upInfoItem.pwlv);
                    addSp(-powerUpCostSp,isMe);
                    upInfoItem.pwlv++;
                    // pwlv=upInfoItem.pwlv;
                    break;
                }
            }

            return upInfoItem.pwlv;
        }

        export function getSyncData():string
        {
            let str:string="";
            switch(BattleStatus.battleType)
            {
                case 1:
                    let meVo = getBattleData(true);
                    let targetVo=getBattleData(false);
                    let meData = BattleStatus.getBattleValue(true);
                    let targetData = BattleStatus.getBattleValue(false);
                    let mestr=meData.k+"_"+meData.l;
                    let targetstr=targetData.k+"_"+targetData.l;
                    if(meVo.uid>targetVo.uid)
                    {
                        str=mestr+"|"+targetstr;
                    }
                    else
                    {
                        str=targetstr+"|"+mestr;
                    }
                    break;
                default:
                    str=(BattleStatus.round+1)+""
                    break;
            }
            return str;
        }

        /**
         * 给对方生成怪物
         * @param cfg 配置
         * @param isMe 给谁加
         */
        export function addEmeryMonster(isMe:boolean):void
        {
            let averageLv:number=getLvValue();
            let cfg:Config.ChallengeItemCfg=BattleStatus.getLastType1MsCfg(isMe);
            if(cfg)
            {
                let enemyVo:MonsterVo=new MonsterVo();
                let bt=BattleStatus.battleLogicHasTickTime-BattleStatus.getRoundStartT()+Api.BattleVoApi.getAddMonsterDelay();
                enemyVo.birthTime=bt;
                enemyVo.hp=cfg.getHpByLv(averageLv);
                enemyVo.isMe=isMe;
                enemyVo.isEnemy=true;
                enemyVo.initData(cfg);
                let roundList = isMe?BattleStatus.meBatteRoundDataList:BattleStatus.targetBatteRoundDataList;
                let voArr:MonsterVo[]=roundList[bt];
                if(voArr)
                {
                    voArr.push(enemyVo);
                }
                else
                {
                    roundList[bt]=[enemyVo];
                }
                if(isMe)
                {
                    BattleStatus.totalMonsterNum.me++;
                }
                else
                {
                    BattleStatus.totalMonsterNum.target++;
                }

            }
        }

        export function dispose():void
        {
            battleData=null;
            loading&&loading.dispose(true);
            loading=null;
        }
    }

    class PlayerBattleVo extends BaseVo
    {
        public uid:number=0;
        public sp:number=0;
        public hasOwnDiceNum:number=0;
        public crivalue:number=1;
        public upinfo:dice.sc_battle_init.Player=null;

        public constructor()
        {
            super();
            this.sp=Number(egret.getOption("sp"))||Api.BattleVoApi.getInitSp();
        }

        public initData(data:any):void
        {

        }

        public getPwlvById(id:string):number
        {
            let lv=1;
            let upinfo = this.upinfo.upInfo;
            let l = upinfo.length;
            for (let i=0; i<l;i++)
            {
                const upInfoItem = upinfo[i];
                if(id==upInfoItem.id)
                {
                    lv=upInfoItem.pwlv;
                    break;
                }
            }
            return lv;
        }

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

        public setCrivalue(crivalue:number):void
        {
            this.crivalue=crivalue+1;
        }

        public addSp(addSp:number):void
        {
            this.sp+=addSp;
            this.sp=Math.max(0,this.sp);
            // App.LogUtil.log("sp: "+ this.uid + " "+this.sp);
        }
        public addDiceNum(addDiceNum:number):void
        {
            this.hasOwnDiceNum+=addDiceNum;
            this.hasOwnDiceNum=Math.max(0,this.hasOwnDiceNum);
        }

        public dispose():void
        {
            this.sp=0;
            this.crivalue=1;
        }
    }
}