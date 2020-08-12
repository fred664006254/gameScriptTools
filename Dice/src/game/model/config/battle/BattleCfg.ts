namespace Config
{
    export namespace BattleCfg
    {
        //超过 X 秒，未匹配到玩家，则匹配机器人
        export let robotTime:number;
        
        //对战模式中，每个玩家的血量    每次boss未击杀-2血，其余未击杀-1血
        export let playerHp:number;

        /**战斗内的增幅消耗SP */
        let powerUpCost:number[];
        
        //对战模式，第一轮时间   单位：秒
        let battleTime:number[];
        
        //基础对战模式中，会出现的boss ID
        export let bossId:number[];
        
        //基础对战模式中，每轮boss血量 = bossBaseHp * 轮数 + 0.5 * 场上剩余怪物的血量总和
        export let bossBaseHp:number;
        //--基础对战模式中，每轮boss击杀后获得的SP  对应每轮的，超过最大值即取最大值
        export let bossSp:number[];
        //战斗中召唤骰子所需SP   字段意义：第一个值，是前10次，每次递增值，第二个值，是11-20次，每次递增值，以此类推，最后一个值，是后续每次递增值
        export let needSp:number[];

        /**转换倍率，会随着对方击杀怪物的数量，自己这边会增加怪物数量  对方每击杀 X 个怪，自己增加一个怪   这个怪，会根据上一个 类型1的怪 的血量，出现 */
        export let addMonster:number;
        /**转换后的怪，出现的延迟时间  单位：MS */
        export let addMonsterDelay:number;
        /**进入战场时的，初始SP */
        export let iniSp:number;



        let battleChallenge:{[key:string]:ChallengeItemCfg}[]=[];
        let challengeTimeCfg:{[key:string]:ChallengeItemCfg[]}[]=[];
        let battleMonsterNum:{[key:string]:number}={};

        let newPlayerbattleChallenge:{[key:string]:ChallengeItemCfg}[]=[];
        let newPlayerchallengeTimeCfg:{[key:string]:ChallengeItemCfg[]}[]=[];
        let newPlayerbattleMonsterNum:{[key:string]:number}={};
        export function formatData(data:any):void
		{
            robotTime=data.robotTime;
            playerHp=data.playerHp;
            battleTime=data.battleTime;
            bossId=data.bossId;
            bossBaseHp=data.bossBaseHp;
            bossSp=data.bossSp;
            powerUpCost=data.powerUpCost;
            needSp=data.needSp;
            addMonster=data.addMonster;
            addMonsterDelay=data.addMonsterDelay;
            iniSp=data.iniSp;
            formatBattleChallengeCfg(data.battleChallenge,battleChallenge,challengeTimeCfg,battleMonsterNum);
            formatBattleChallengeCfg(data.newPlayerChallenge,newPlayerbattleChallenge,newPlayerchallengeTimeCfg,newPlayerbattleMonsterNum);
        }

        export function formatBattleChallengeCfg(battleChallengeData:any,tbattleChallenge:{[key:string]:ChallengeItemCfg}[],tchallengeTimeCfg:{[key:string]:ChallengeItemCfg[]}[],tbattleMonsterNum:{[key:string]:number}):void
        {
            let tmpBattleChallenge:{[key:string]:Object}[]=battleChallengeData;
            let l=tmpBattleChallenge.length;
            for (let i = 0; i < l; i++) 
            {
                let count:number=0;
                let roundTimeCfg:{[key:string]:ChallengeItemCfg[]}={};
                let roundCfg:{[key:string]:ChallengeItemCfg}={};
                const tmproundCfg = tmpBattleChallenge[i];
                let tmproundKeys=Object.keys(tmproundCfg);
                tmproundKeys.sort((a,b)=>{
                    return Number(a)-Number(b);
                });
                let kl=tmproundKeys.length;
                for (let ki=0;ki<kl;ki++) 
                {
                    let key=tmproundKeys[ki];
                    if (tmproundCfg.hasOwnProperty(key)) 
                    {
                        const monsters = tmproundCfg[key];
                        let itemCfg=new ChallengeItemCfg();
                        itemCfg.initData(monsters);
                        itemCfg.round=i;
                        itemCfg.cfgKey=key;
                        roundCfg[key]=itemCfg;
                        let startTimeMs=itemCfg.startTime;
                        let internalTime=itemCfg.internalTime;
                        let num=itemCfg.monsterNum;
                        for (let i2 = 0; i2 < num; i2++) 
                        {
                            const t = startTimeMs+i2*internalTime;
                            if(!roundTimeCfg[t])
                            {
                                roundTimeCfg[t]=[];
                            }
                            roundTimeCfg[t].push(itemCfg);
                            count++;
                        }
                    }
                }
                tbattleChallenge[i]=roundCfg;
                tchallengeTimeCfg[i]=roundTimeCfg;
                tbattleMonsterNum[i]=count;
            }
        }

        export function getItemCfgByRoundAndKey(round:number,cfgKey:string):ChallengeItemCfg
        {
            let isGuiding = Api.GameinfoVoApi.getIsGuiding();
            return isGuiding?newPlayerbattleChallenge[round][cfgKey]:battleChallenge[round][cfgKey];
        }

        export function getbtTimeByRound(round:number):number
        {
            let idx=Math.min(round,battleTime.length-1);
            return battleTime[idx];
        }

        export function getPowerUpCostBylv(clv:number):number
        {
            let maxLv=powerUpCost.length;
            clv=Math.min(maxLv,clv);
            return powerUpCost[clv-1];
        }

        export function getChallangeCfg(round:number):{[key:string]:ChallengeItemCfg[]}
        {
            let isGuiding = Api.GameinfoVoApi.getIsGuiding();
            if(isGuiding)
            {
                let nl = Math.min(round,newPlayerchallengeTimeCfg.length-1);
                return newPlayerchallengeTimeCfg[nl];
            }
            let l = Math.min(round,challengeTimeCfg.length-1);
            return challengeTimeCfg[l];
        }

        export function getChallangeMsNum(round:number):number
        {
            let isGuiding = Api.GameinfoVoApi.getIsGuiding();
            return isGuiding?newPlayerbattleMonsterNum[round]:battleMonsterNum[round];
        }

        /**
         * 获取下一次购买骰子消耗SP
         * @param num 已拥有骰子的个数，从0开始
         */
        export function getNeedSpByNum(num:number):number
        {
            // let idx=Math.floor(num/10);
            // idx=Math.min(idx,needSp.length-1);
            // let totalNum:number=0;
            // for(let i=0;i<=idx;i++)
            // {
            //     totalNum+=needSp[i];
            // }

            let totalNum:number=0;
            let l = needSp.length
            for(let i=0;i<=num;i++)
            {
                let idx=Math.floor(i/10);
                idx=Math.min(idx,l-1);
                totalNum+=needSp[idx];
            }

            return totalNum;
        }

        export function getMonsterIcon(type:number):string
        {
            return "monster"+type;
        }

        export function getBossIcon(bossId:string):string
        {
            return "boss"+bossId;
        }

        export function getBossHp(round:number,leftHp:number=0):number
        {
            return bossBaseHp*(round+1)+Math.floor(leftHp*0.5);
        }

        export function getBossSp(round:number):number
        {
            return bossSp[Math.min(round, bossSp.length - 1)];
        }

        /**
         * 随机bossID
         * todo
         */
        export function getBossId():number
        {
            let bossArr = [`1002`,`1004`];
            return 1003;
        }
    }

    export class MonsterItemCfg extends BaseItemCfg
    {
        public monsterSpeed:number;//怪物移速  X像素/10MS
        public addSpeed:number;//每10MS增加的速度
    }

    export class ChallengeItemCfg extends MonsterItemCfg
    {
        public round:number;//第几轮的怪
        public cfgKey:string;//配置的key，大部分情况无用，查找用

        public monsterType:number;//怪物类型 1：基本怪 2：加速怪  3：小BOSS 
        public monsterAdd:number;//此类怪物被击杀后，是否会记入数量  1：会计入  0：不计入
        public monsterNum:number;//怪物数量
        public monsterSp:number;//击杀获得sp
        public monsterHp:number[];//怪物血量  根据不同的双方平均等级，血量不同boss血量 =  monsterHp + 0.5 * 场上剩余怪物的血量总和
        public startTime:number;//第一个怪物出现的时间 秒
        public internalTime:number;//两个怪物间的时间间隔 秒
        public bossID:string;

        // public getStartTimeMs():number
        // {
        //     return this.startTime*1000;
        // }
        // public getInternalTime():number
        // {
        //     return this.internalTime*1000;
        // }
        public getHpByLv(lv:number):number
        {
            let maxL=this.monsterHp.length;
            lv=Math.max(1,Math.min(maxL,lv));
            return this.monsterHp[lv-1];
        }
        public constructor()
        {
            super();
        }
    }

    export class SnakeMaonsterItemCfg extends MonsterItemCfg
    {
        public monsterType:number;//怪物类型 1：基本怪 2：加速怪  3：小BOSS 
        public monsterAdd:number;//此类怪物被击杀后，是否会记入数量  1：会计入  0：不计入
        public monsterNum:number;//怪物数量
        public monsterSp:number;//击杀获得sp
        public monsterHp:number[];//怪物血量  根据不同的双方平均等级，血量不同boss血量 =  monsterHp + 0.5 * 场上剩余怪物的血量总和
        public startTime:number;//第一个怪物出现的时间 秒
        public internalTime:number;//两个怪物间的时间间隔 秒
        public constructor()
        {
            super();
        }
    }
}