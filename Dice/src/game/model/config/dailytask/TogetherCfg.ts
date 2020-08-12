namespace Config{
    export namespace TogetherCfg{
        let together:TogetherItemCfg;
        let battleChallenge:{[key:string]:ChallengeItemCfg}[]=[];
        let challengeTimeCfg:{[key:string]:ChallengeItemCfg[]}[]=[];
        let battleMonsterNum:{[key:string]:number}={};
        let maxRound:number=0;
        /**战斗内的增幅消耗SP */
        let powerUpCost:number[];
        //战斗中召唤骰子所需SP   字段意义：第一个值，是前10次，每次递增值，第二个值，是11-20次，每次递增值，以此类推，最后一个值，是后续每次递增值
        export let needSp:number[];
        //进入战场时的，初始SP
        export let iniSp:number;
        /**转换倍率，会随着对方击杀怪物的数量，自己这边会增加怪物数量  对方每击杀 X 个怪，自己增加一个怪   这个怪，会根据上一个 类型1的怪 的血量，出现 */
        export let addMonster:number;
        /**转换后的怪，出现的延迟时间  单位：MS */
        export let addMonsterDelay:number;
        export function formatData(data: any){
            if(!together){
                 together = new TogetherItemCfg();
            } 
            together.initData(data);
            powerUpCost=data.powerUpCost;
            needSp=data.needSp;
            iniSp=data.iniSp;
            maxRound=data.battleChallenge.length;
            BattleCfg.formatBattleChallengeCfg(data.battleChallenge,battleChallenge,challengeTimeCfg,battleMonsterNum);
        }

        export function getPowerUpCostBylv(clv:number):number
        {
            let maxLv=powerUpCost.length;
            clv=Math.min(maxLv,clv);
            return powerUpCost[clv-1];
        }

        export function getNeedCard(index:number):number{
            if(!together || !together.needCard){
                return 0;
            }
            if(index < 0){
                index = 0;
            } else if (index >= together.needCard.length){
                index = together.needCard.length - 1;

            }
            return together.needCard[index];
        }

        export function getNeedCardList(){
            let need = []
            if(together && together.needCard){
                need = together.needCard;
            } else {
                need = [10,20,30,40]
            }
            return need;
        }
        export function getChallangeCfg(round:number):{[key:string]:ChallengeItemCfg[]}
        {
            let l= challengeTimeCfg.length;
            round=Math.min(round,l-1);
            return challengeTimeCfg[round];
        }
        export function getChallangeMsNum(round:number):number
        {
            return battleMonsterNum[round];
        }

        export function getMaxRound():number
        {
            return maxRound;
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

        /**
         * 获得协同模式次数的最大值
         */
        export function getOperationMaxNum(){
            let flag = Api.GameinfoVoApi.getIsBuyAssitance();
            return flag ? together.advancedNum : together.iniNum;
        }
        /**
         * 每次恢复使用的钻石数
         */
        export function getNeedGem(){
            let num = Api.GameinfoVoApi.getOperationBuyNum();
            num = (num >= together.needGem.length) ? together.needGem.length - 1 : num;
            num = (num < 0) ? 0 : num;
            return together.needGem[num]; 
        }

        /**
         * 当前回合增加的卡数
         * @param round 回合数
         */
        export function getCard(round:number):number{
            return round > 50 ? together.getCard1 : together.getCard;
        }

        /**
         * 协同模式初始化最大值
         */
        export function getIniNum(){
            return together.iniNum;
        }
    }

    export class TogetherItemCfg extends BaseItemCfg{
        /** 开启宝箱需要的卡牌 */
        public needCard:Array<number> = [];
        /** 每达到一关获得 X 张卡牌   第一关，获得X张，第Y关，获得 Y * X 张 */
        public getCard:number = 0;
        /** 协同宝箱ID */
        public cardBoxId:string = "";
        /**协同模式初始化最大值 */
        public iniNum:number = 0;
        /**购买高级协同模式后的的最大次数 */
        public advancedNum:number = 0;
        /** 需要的钻石数 */
        public needGem = [];
        public battleChallenge = [];
        /**50波以后，每回合增加卡牌数 */
        public getCard1 = 3;
    }
    
}