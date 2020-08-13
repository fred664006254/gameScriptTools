namespace Config {
    export namespace AcCfg {
        export class CarnivalNightCfg {

            /** 单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10*/
            public getReward: string;

            //蝙蝠血量
            public batHP: { HP: number, getReward: string }[];

            //消耗南瓜奖励
            public bigPrize: { needValue: number, getReward: string }[];

            /** 抽奖暴击几率*/
            public CriticalRate: number;

            /**攻击蝙蝠暴击效果 */
            public CriticalEffect: number;


            public task: CarnivalNightTaskItemCfg[];


            public acTask: CarnivalNightTaskItemCfg2[];

            public mainReward: string;

            public show = 5001;

            //解析数据
            public formatData(data: any): void {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];

                        if (key == "task") {
                            this.task = [];
                            let i = 0;
                            for (let k in data[key]) {
                                let itemcfg = new CarnivalNightTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i + 1);
                                this.task.push(itemcfg);
                                i++;
                            }
                        }
                        if (key == "mainReward") {
                            this.show = GameData.formatRewardItem(data[key])[0].id;
                        }
                        if (key == "batHP"||key == "bigPrize") {
                            this.acTask = this.acTask || [];
                            let i = 0;
                            for (let k in data[key]) {
                                let itemcfg = new CarnivalNightTaskItemCfg2();
                                itemcfg.id = String(i + 1);
                                itemcfg.initData(data[key][k])
                                this.acTask.push(itemcfg);
                                i++;
                            }
                        }

                    }
                }
            }

            /**
             * 获得任务列表
             */
            public getTaskList(): CarnivalNightTaskItemCfg[] {
                return this.task;
            }

            public getTaskListById(groupId:number):CarnivalNightTaskItemCfg[]{
		        //这个活动的group=2和group=3的在一个分页
                let length = this.task.length;
                
                let taskList = [];
                for(let i = 0; i < length; i ++){
                    if(groupId == 1){
                        if(this.task[i].group == groupId){
                            taskList.push(this.task[i]);
    
                        }
                    }else{
                        if(this.task[i].group != 1){
                            taskList.push(this.task[i]);
                        }  
                    }


                }
                return taskList;

            }

            public getCurBossMaxHp(id: number): number {
                id = Math.min(id,this.batHP.length);
                return this.batHP[id - 1].HP;
            }

            public getCurBossInfo(id: number): { HP: number, getReward: string } {
                id = Math.min(id,this.batHP.length);
                return this.batHP[id - 1]
            }

        }

        /**
         * 任务的
         */
        export class CarnivalNightTaskItemCfg extends BaseItemCfg {
            /**id */
            public id: string;
            /**sortId */
            public sortId: number;
            public group: number;
            /**任务类型 */
            public questType: string;
            /**任务参数*/
            public value: number;
            /**任务跳转 */
            public openType: string;
            /**特殊奖励 */
            public specialGift: number;
            /**奖励 */
            public getReward: string;
        }

         /**
         * 活动任务的
         */
        export class CarnivalNightTaskItemCfg2 extends BaseClass {
            public constructor() 
            {
                super()
            }
            /**id */
            public id: string;
            public typeId: string;
            /**sortId */
            public sortId: number;
            /**任务参数*/
            public value: number;
            /**奖励 */
            public getReward: string;

            public initData(data:any):void
            {
                if(data["HP"])
                {
                    this.typeId = 'batHP'+this.id;
                    this.getReward = data["getReward"];
                    this.value =  Number(this.id);
                }else{
                    this.typeId = 'bigPrize'+this.id;
                    this.getReward = data["getReward"];
                    this.value = data["needValue"];
                }
            }

            public dispose():void
            {
        
            }
        }

    }
}