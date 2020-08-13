namespace Config{
    export namespace AcCfg{
        /**
         * 棋社对弈
         * author ycg
         * date 2020.5.6
         * @namespace CheerCfg
         */
        export class CheerCfg{
            public extraTime:number;
            public cost:number;
            public freeTime:number;
            public number:number;
            public change:any = null;
            public show1:number = 0;
            public show2:number = 0;
            public getReward:string = null;
            private poolRewards:string = null;
            private achieveList:CheerAchieveItem[] = [];
            private rechargeList:CheerRechargeItem[] = [];
            private taskList:any[] = [];
            public long:number = 0;
            public weight:number = 0;
            public checkerBoard:any[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "chessNum"){
                        for (let k in data[key]){
                            let item = new CheerAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.achieveList.push(item);
                        }
                    }
                    else if (key == "chessRecharge"){
                        for (let k in data[key]){
                            let item = new CheerRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k) + 1;
                            this.rechargeList.push(item);
                        }
                    }
                    else if (key == "chessTask"){
                        for (let k in data[key]){
                            let taskData:CheerTaskItem[] = [];
                            for (let i in data[key][k]){
                                let item = new CheerTaskItem();
                                item.initData(data[key][k][i]);
                                item.id = Number(i);
                                taskData.push(item);
                            }
                            this.taskList.push({id: Number(k)+1, data:taskData});
                        }
                    }
                    else if (key == "chessPool"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            }

            public getAchieveCfg():CheerAchieveItem[]{
                return this.achieveList;
            }

            public getRechargeCfg():CheerRechargeItem[]{
                return this.rechargeList;
            }

            public getTaskCfg():any[]{
                return this.taskList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        //**进度奖励item */
        export class CheerAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class CheerRechargeItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需额度 */
            public needGem:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**任务奖励item */
        class CheerTaskItem extends BaseItemCfg{
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