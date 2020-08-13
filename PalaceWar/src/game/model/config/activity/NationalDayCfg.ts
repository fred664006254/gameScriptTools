
namespace Config{
    export namespace AcCfg{
        /**
         * 国庆活动
         *  author yangchengguo
         *  date 2019.9.9
         *  @namespce NationalDayCfg
         */
        export class NationalDayCfg{
            public extraTime:number = 0;
            /**
             * 充值元宝与特殊道具转化比例，10元宝=1道具
             */
            public ratio:number = 0;
            /**
             * 连续七天完成t1任务奖励
             */
            public show1:number[] = [];
            public show2:number[] = [];
            public bigPrize:string = null;
            private rechargeList:any[] = [];
            private dailyTaskList:any[] = [];

            public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this.rechargeList = [];
                        for (let i = 0; i < data[key].length; i++){
                            let itemArr:NationalDayRechargeItem[] = [];
                            for (let k in data[key][i]){
                                let item = new NationalDayRechargeItem();
                                item.initData(data[key][i][k]);
                                item.id = String(k);
                                itemArr.push(item);
                            }
                            let rechargeData = {id:(i + 1), sortId:(i + 1), data:itemArr};
                            this.rechargeList.push(rechargeData);
                        } 
                    }
                    else if (key == "dailyTask"){
                        this.dailyTaskList = [];
                        for (let i = 0; i < data[key].length; i++){
                            let taskArr:NationalDayDailyTaskItem[] = [];
                            let count = 0;
                            let taskData = data[key][i];
                            for (let k in taskData){
                                let item = new NationalDayDailyTaskItem();
                                item.initData(taskData[k]);
                                item.id = String(count + 1);
                                item.sourceId = k;
                                taskArr.push(item);
                                count += 1;
                            }
                            taskArr.sort((a, b) => { return a.sortId - b.sortId });
                            for (let kk = 0; kk < taskArr.length; kk++){
                                taskArr[kk].id = String(Number(kk)+1);
                            }
                            let dailyTaskData = {id:(i+1), sortId:(i+1), data:taskArr};
                            this.dailyTaskList.push(dailyTaskData);  
                        }
                    }
                }
            }

            /**充值奖励 */
            public getRechargeList():any{
                return this.rechargeList;
            }

            /**日常任务 */
            public getDailyTaskList():any{
                return this.dailyTaskList;
            }
        }

        /**国庆充值奖励 */
        export class NationalDayRechargeItem extends BaseItemCfg{
            /**id */
            public id:string;
            /**排序id */
            public sortId:number = 0;
            /**所需道具数量 */
            public needItem:number;
            /**奖励 */
            public getReward:string;
        }

        /**国庆日常任务 */
        export class NationalDayDailyTaskItem extends BaseItemCfg{
            /**id */
            public id:string;
            /**源id */
            public sourceId:string;
            /**排序id */
            public sortId:number = 0;
            /**任务类型 */
            public questType:string;
            /**跳转类型 */
            public openType:string;
            /**任务参数 */
            public value:number;
            /**特殊奖励数量*/
            public specialReward:number;
            /**任务奖励 */
            public getReward:string;
        }
    }
}
