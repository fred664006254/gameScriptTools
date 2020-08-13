namespace Config {
    export namespace AcCfg {
        export class MoonNightCfg {
            public rechargeCost:number;
            public lotteryNum:any[];
            public task:{openType:string,questType:number,value:number,getReward:string}[];
            private taskList:MoonNightTaskItemCfg[];
            public wifeSkin:number;
            public servantSkin:number;
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
                                let itemcfg = new MoonNightTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }

                    }
                }
            }

            /**
             * 获得任务列表
             */
            public getTaskList():MoonNightTaskItemCfg[]
            {
                return this.taskList;
            }

        }
        /**
         * 任务的
         */
        export class MoonNightTaskItemCfg extends BaseItemCfg
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
            public getReward:string;

            public sortId:number;
            
        }
    }
}