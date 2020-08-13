namespace Config{
    /**
     * 科举答题
     * author yangchengguo
     * date 2019.7.22
     * @namespace ExamCfg
     */
    export namespace ExamCfg{
        /**展示时间 */
        export let showTime:number = 0;
        /**官品限制 */
        export let lvLimit:number = 0;
        /**活动时间 */
        export let phase:{day:number,time:number[],questionNum:number}[]=[];
        /**分数列表 */
        export let scoreList:Object = {};
        /**答题正确获得的奖励 */
        export let getReward:string = null;
        /**排名奖励 */
        export let rankRewardList:Object[] = [];
        /**周六答题总数 */
        export let questionNum1:number = 0;
        /**周日答题总数 */    
        export let questionNum2:number = 0;
        /** 题库*/
        export let questionBank:Object = {};

        export function formatData(data:any):void{
            for (let key in data){
                this[key] = data[key];
            }
            for(var key in data.rankReward)
            {
                let itemCfg:ExamRankRewardItemCfg;
                if(!this.rankRewardList.hasOwnProperty(String(key)))
                {
                    this.rankRewardList[String(key)] = new ExamRankRewardItemCfg();
                }
                itemCfg = this.rankRewardList[String(key)];
                itemCfg.initData(data.rankReward[key]);    
            }
        }

        export function formatExamPhase():{day:number, time:{st:number, et:number}, questionNum:number, type:number}[]{
            let phase:{day:number, time:{st:number, et:number}, questionNum:number, type:number}[] = [];
            // let phase:any = {};
            let examPhase = this.phase;
            for (let key in examPhase){
                phase.push({day: examPhase[key].day, time:{st:examPhase[key][0], et:examPhase[key][1]},questionNum:examPhase[key].questionNum, type:(Number(key))});
            }
            return phase;
        }
    }

    // export let examCfgList:InitExamCfg[] = [];
    // export function getExamCfgByCode(code:number){
    //     return examCfgList[code-1];
    // }

    // export function formatData(data:any){
    //     for (let key in data){
    //         let examCfg:InitExamCfg;
    //         if (!examCfgList.hasOwnProperty(String(key))){
    //             examCfg = new InitExamCfg();
    //         }
    //         examCfg.initData(data[key]);
    //         examCfgList.push(examCfg);
    //     }
    // }  

    // class InitExamCfg extends BaseItemCfg{
    //     /**展示时间 */
    //     public extraTime:number = 1;
    //     /**官品限制 */
    //     public lvLimit:number = 0;
    //     /**活动时间 */
    //     public phase:{day:number,time:number[]}[]=[];
    //     /**分数列表 */
    //     public scoreList:Object = {};
    //     /**答题正确获得的奖励 */
    //     public getRewards:BaseDisplayObjectContainer[] = [];
    //     /**排名奖励 */
    //     public rankRewardList:Object[] = [];
    //     /**周六答题总数 */
    //     public questionNum1:number = 0;
    //     /**周日答题总数 */    
    //     public questionNum2:number = 0;
    //     /** 题库*/
    //     public questionBank:Object = {};

    //     public initData(data:any):void{
    //         this.getRewards = GameData.getRewardItemIcons(data.getReward, true, true);
    //         // this.questionNum1 = data.questionNum1;
    //         // this.questionNum2 = data.questionNum2;
    //         // this.questionBank = data.questionBank;

    //         for(var key in data.rankReward)
    //         {
    //             let itemCfg:ExamRankRewardItemCfg;
    //             if(!this.rankRewardList.hasOwnProperty(String(key)))
    //             {
    //                 this.rankRewardList[String(key)] = new ExamRankRewardItemCfg();
    //             }
    //             itemCfg = this.rankRewardList[String(key)];
    //             itemCfg.initData(data.rankReward[key]);    
    //         }
    //     }

    //     public getScoreBySeconds(second:number):number{
    //         let scoreList = this.scoreList;
    //         for (let key in scoreList){
    //             if (second > scoreList[key][0] && second <= scoreList[key][1]){
    //                 return scoreList[key].getScore;
    //             }
    //         }
    //     }

    //     public getPhaseByDay(day:number):{st:number, et:number}{
    //         for (let key in this.phase){
    //             if (this.phase[key].day == day){
    //                 return {st: this.phase[key].time[0], et:this.phase[key].time[1]};
    //             }
    //         }
    //     }
    // }

    // export class ExamPhaseItemCfg extends BaseItemCfg{
    //     public day:number;
    //     public time:number[];
    //     public get stTime():number{
    //         return this.time[0];
    //     }
    //     public get endTime():number{
    //         return this.time[1];
    //     }
    // }

    export class ExamRankRewardItemCfg extends BaseItemCfg{
        public rank:number[];
        public getReward:string;
        public get minRank():number
        {
            return this.rank[0];
        }
        public get maxRank():number
        {
            return this.rank[1];
        }
        public get rewardIcons():BaseDisplayObjectContainer[]
        {
            return GameData.getRewardItemIcons(this.getReward,true,true);
        }
    }

    // export class ExamScoreListItemCfg extends BaseItemCfg{
    //     public getScore:number;
    //     public replyTime:number[];
    //     public get minSecond():number{
    //         return this.replyTime[0];
    //     }
    //     public get maxSecond():number{
    //         return this.replyTime[1];
    //     }
    // }

    // export class ExamQuestionBankItemCfg extends BaseItemCfg{
    //     public canGet:number;
    //     public rightAnswer:number;
    // }
}