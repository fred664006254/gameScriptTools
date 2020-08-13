namespace Config {
    export namespace AcCfg {
        export class MoonlightCfg {
            /** 单抽消耗：X元宝 */
            public cost:number;
        
            /** 抽奖积分满额后获得红颜id*/
            public wifeId:number;
               
            /** 活动期间，抽奖次数的进度奖励
             * needNum：所需积分
             * getReward：奖励
             */
            public drawNum:{needNum:number,getReward:string}[];
            
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:{openType:string,grounp:number,questType:number,value:number,getReward:string}[];
            
            private taskList:MoonlightTaskItemCfg[];


            // private taskList1:MoonlightTaskItemCfg[];
            // private taskList2:MoonlightTaskItemCfg[];
            // private taskList3:MoonlightTaskItemCfg[];

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
                                let itemcfg = new MoonlightTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }

                    }
                }
            }
            public getTaskListById(groupId:number):MoonlightTaskItemCfg[]{

                let length = this.taskList.length;
                
                let taskList = [];
                for(let i = 0; i < length; i ++){
                    if(this.taskList[i].group == groupId){
                        taskList.push(this.taskList[i]);

                    }

                }
                return taskList;

            }

            public getMaxBoxNeedNum () {
                return this.drawNum[this.drawNum.length-1].needNum;
            }

            /**
             * 获得任务列表
             */
            public getTaskList():MoonlightTaskItemCfg[]
            {
                return this.taskList;
            }
        }

        /**
         * 任务的
         */
        export class MoonlightTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;

            public openType:string = null;

            public group:number;

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