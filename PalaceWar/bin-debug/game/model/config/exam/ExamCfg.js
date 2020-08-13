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
var Config;
(function (Config) {
    /**
     * 科举答题
     * author yangchengguo
     * date 2019.7.22
     * @namespace ExamCfg
     */
    var ExamCfg;
    (function (ExamCfg) {
        /**展示时间 */
        ExamCfg.showTime = 0;
        /**官品限制 */
        ExamCfg.lvLimit = 0;
        /**活动时间 */
        ExamCfg.phase = [];
        /**分数列表 */
        ExamCfg.scoreList = {};
        /**答题正确获得的奖励 */
        ExamCfg.getReward = null;
        /**排名奖励 */
        ExamCfg.rankRewardList = [];
        /**周六答题总数 */
        ExamCfg.questionNum1 = 0;
        /**周日答题总数 */
        ExamCfg.questionNum2 = 0;
        /** 题库*/
        ExamCfg.questionBank = {};
        function formatData(data) {
            for (var key_1 in data) {
                this[key_1] = data[key_1];
            }
            for (var key in data.rankReward) {
                var itemCfg = void 0;
                if (!this.rankRewardList.hasOwnProperty(String(key))) {
                    this.rankRewardList[String(key)] = new ExamRankRewardItemCfg();
                }
                itemCfg = this.rankRewardList[String(key)];
                itemCfg.initData(data.rankReward[key]);
            }
        }
        ExamCfg.formatData = formatData;
        function formatExamPhase() {
            var phase = [];
            // let phase:any = {};
            var examPhase = this.phase;
            for (var key in examPhase) {
                phase.push({ day: examPhase[key].day, time: { st: examPhase[key][0], et: examPhase[key][1] }, questionNum: examPhase[key].questionNum, type: (Number(key)) });
            }
            return phase;
        }
        ExamCfg.formatExamPhase = formatExamPhase;
    })(ExamCfg = Config.ExamCfg || (Config.ExamCfg = {}));
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
    var ExamRankRewardItemCfg = (function (_super) {
        __extends(ExamRankRewardItemCfg, _super);
        function ExamRankRewardItemCfg() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(ExamRankRewardItemCfg.prototype, "minRank", {
            get: function () {
                return this.rank[0];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExamRankRewardItemCfg.prototype, "maxRank", {
            get: function () {
                return this.rank[1];
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ExamRankRewardItemCfg.prototype, "rewardIcons", {
            get: function () {
                return GameData.getRewardItemIcons(this.getReward, true, true);
            },
            enumerable: true,
            configurable: true
        });
        return ExamRankRewardItemCfg;
    }(BaseItemCfg));
    Config.ExamRankRewardItemCfg = ExamRankRewardItemCfg;
    __reflect(ExamRankRewardItemCfg.prototype, "Config.ExamRankRewardItemCfg");
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
})(Config || (Config = {}));
//# sourceMappingURL=ExamCfg.js.map