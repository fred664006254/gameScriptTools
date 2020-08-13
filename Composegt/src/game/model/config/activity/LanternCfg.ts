namespace Config {
    export namespace AcCfg {
        export class LanternCfg {
            /** 奖励红颜共浴场景ID */
            public wifeBathSceneID:number;
            public wifeID:string;
            /** 祈福寄语的奖励 */
            public lanternTextReward:string;
            /** 1次天灯获得道具 */
            public lanternPool:number;

            /** 活动期间，抽奖次数的进度奖励
             * needNum：所需抽奖次数
             * getReward：奖励
             */
            public lanternNum:{needNum:number,getReward:string}[];
            
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:any[];
            
            private taskList:LanternTaskItemCfg[];
            //解析数据
            public formatData(data: any): void {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];


                        if(key == "task")
                        {
                            this.taskList = [];
                            let i = 0;
                            for(let k in data[key])
                            {
                                let itemcfg = new LanternTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }

                    }
                }
            }
            public getRewardItemVoList():Array<RewardItemVo>
            {
                return GameData.formatRewardItem(this.lanternTextReward);
            }
  

            /**
             * 获得任务列表
             */
            public getTaskList():LanternTaskItemCfg[]
            {
                return this.taskList;
            }
        }

        /**
         * 任务的
         */
        export class LanternTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;

            public openType:string = null;
            /**
             * 任务类型
             */
            public questType:string;
            /**
             * 任务进度
             */
            public value:number;
            /**奖励 */
            public lantern:number;
            public reward:string;
            public sortId:number;
            public day:number;


        }
    }
}