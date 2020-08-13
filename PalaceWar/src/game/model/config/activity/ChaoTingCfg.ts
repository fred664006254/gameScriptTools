namespace Config{
    export namespace AcCfg{
        /**
         * 朝廷诏令
         * author ycg
         * date 2020.3.23
         * @namespace ChaoTingCfg
         */
        export class ChaoTingCfg{
            public extraTime:number;
            public cost:number;
            public recharge1:number;
            public number:number;
            public rankRewardList:ChaotingRankRewardItem[] =[];
            public rechargeList:ChaotingRechargeItem[] = [];
            public taskList:ChaotingTaskItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    
                    if (key == "rankReward"){
                        for (let k in data[key]){
                            let item = new ChaotingRankRewardItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rankRewardList.push(item);
                        }
                    }
                    else if (key == "recharge2"){
                        for (let k in data[key]){
                            let item = new ChaotingRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            item.display = data[key][k].display - 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "task"){
                        for (let k in data[key]){
                            let item = new ChaotingTaskItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.taskList.push(item);
                        }
                    }
                }
            }

            public getRankRewardCfg():ChaotingRankRewardItem[]{
                return this.rankRewardList;
            }

            public getRechargeCfg():ChaotingRechargeItem[]{
                return this.rechargeList;
            }

            public getTaskCfg():ChaotingTaskItem[]{
                return this.taskList;
            }
        }

        /**排行奖励item */
        class ChaotingRankRewardItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**排名 */
            public rank:number[] = [];
            /**奖励 */
            public getReward:string = null;
        }

        /**充值奖励item */
        class ChaotingRechargeItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需额度 */
            public needGem:number = 0;
            /**解锁条件 */
            public display:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**任务奖励item */
        class ChaotingTaskItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            public openType:string = null;
            public questType:number = 0;
            public value:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        } 
    }
}