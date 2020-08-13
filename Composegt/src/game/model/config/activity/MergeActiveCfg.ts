namespace Config {
    export namespace AcCfg {
        export class MergeActiveCfg {
            public itemsList1:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public itemsList2:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public itemsList3:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public itemsList4:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public itemsList5:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public itemsList6:{itemID: string,limit: number,price: number,rebate_price: number}[];
            public totalList1:{getReward: string,needGem: number}[][];
            public totalList2:{getReward: string,needGem: number}[][];
            public totalList3:{getReward: string,needGem: number}[][];
            public totalList4:{getReward: string,needGem: number}[][];
            public totalList5:{getReward: string,needGem: number}[][];
            public totalList6:{getReward: string,needGem: number}[][];
            public signTask:{questType:number,value:number,getReward:string}[];
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:{questType:number,value:number,getReward:string}[];
            
            private taskList:MergeActiveTaskItemCfg[];
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
                                let itemcfg = new MergeActiveTaskItemCfg();
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
            public getTaskList():MergeActiveTaskItemCfg[]
            {
                return this.taskList;
            }
        }

        /**
         * 任务的
         */
        export class MergeActiveTaskItemCfg extends BaseItemCfg
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