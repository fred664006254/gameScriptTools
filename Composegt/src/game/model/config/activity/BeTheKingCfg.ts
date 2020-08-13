namespace Config
{
    export namespace AcCfg
    {
        export class BeTheKingCfg
        {
            public cost:number = 0;
            public prestigeRate1:number = 0;
            public prestigeRate2:number = 0;
            public votekingwinRate:number = 0;

            public rankList:{rank:number[],reward:string}[] = [];
            public serverList1:{rank:number[],reward:string}[] = [];
            
            public voteExchange:{voteNum:number,getReward:string}[] = [];

            // public task:{unlock:string, questType:number,value:number,voteNum:number,getReward:string}[][] = [];
            private _taskList = {};
            public rankNo1reward1:string ="11_3101_1";// --（单服和跨服）第一名奖励头像框
            public rankNo1reward2:string = "11_4006_1";
            public voteReward:string = "";
            public servantExchange:{servantID:string,needItem:string}[]= []

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        if(key == "task"){
                            let task = data[key];
                            for (var taskK in task) {
                                var element = this._taskList[taskK];
                                if (!this._taskList.hasOwnProperty(taskK)) {
                                    element =  this._taskList[taskK] = {};
                                }
                                for (var taskStage in task[taskK]) {
                                    let taskcfg:BeTheKingTaskItemCfg = this._taskList[taskK][taskStage];
                                    if (!element.hasOwnProperty(taskStage)) {
                                        this._taskList[taskK][taskStage] = taskcfg = new BeTheKingTaskItemCfg();
                                    }
                                    taskcfg.id = taskK;
                                    taskcfg.stage = taskStage;
                                    taskcfg.initData(task[taskK][taskStage]);
                                }
                            }
                        }else{
                            this[key] = data[key];
                        }
                        
                    }
                }
            }

             public getTaskListById(taskid:string,stage?:string){
                 if(!stage){
                    return this._taskList[taskid];
                 }
                 return this._taskList[taskid][stage];
            }

            public getTaskItemLists(id:string){
                let list = [];
                for (var key in this._taskList) {
                    if(Number(key) > Number(id) + 1){
                        continue;
                    }
                    if (this._taskList.hasOwnProperty(key)) {
                        var element = this._taskList[key];
                        for (var key2 in element) {
                            if (element.hasOwnProperty(key2)) {
                                list.push(element[key2])
                            }
                        }
                    }
                }
                return list;
            }
        }

       
        /**
         * 任务的
         */
        export class BeTheKingTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;
            public stage:string;
            public openType:string = null;
            public unlock:string;
            public pre_task:number;
            /**
             * 任务类型
             */
            public questType:string;
            /**
             * 任务进度
             */
            public value:number;
            
            public voteNum:number;
            /**奖励 */
            public getReward:string;

            

        }
    }

}