namespace Config
{
    export namespace AcCfg
    {
        export class MerryXmasCfg
        {
            private ratio:number = 0;
            private cost:number[] = [];
            private cost2:number = 0;
            private discount:number = 0;
            private firstFloor:any[] = [];
            private secondFloor:any[] = [];
            private thirdFloor:any[] = [];
            private finalFloor:any[] = [];
            private taskList:any[] = [];
            private infinityFloor:any[] = [];
            public progress:any[] = [];
            public wifeSkinID:number = 0;


            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
         
                for(var key in data){
                    this[key] = data[key];
                    if(key == "task"){
                        this.taskList = this.taskList||[];
                        let i = 0;
                        for(let k in data[key]){
                            let itemcfg = new MerryXmasTaskItemCfg();
                            itemcfg.initData(data[key][k]);
                            itemcfg.id = String(i+1);
                            this.taskList.push(itemcfg);
                            i++;
                        }
                    }
                    if(key == "progress"){
                        this.taskList = this.taskList||[];
                        let i = 0;
                        for(let k in data[key]){
                            let itemcfg = new MerryXmasTaskItemCfg();
                            itemcfg.initData(data[key][k],true);
                            itemcfg.id = String(i+1);
                            this.taskList.push(itemcfg);
                            i++;
                        }
                    }
                }  
                this.wifeSkinID = 2091;
            }
            public getDiscount():number{
                return this.discount;
            }
            public getCost(index):number
            {
                return this.cost[2-index];
            }
            public getFinalFloor():string
            {
                return this.finalFloor[0][0];
            }
            public getCost2():number
            {
                return this.cost2;
            }
            public getTaskList():MerryXmasTaskItemCfg[]
            {
                return this.taskList;
            }
            public getResultList():any[]
            {
                return [this.thirdFloor,this.secondFloor,this.firstFloor];
            }
            public getResultByFloor(f:number):any[]
            {
                switch(f){
                    case 1:
                        return this.firstFloor;
                    case 2:
                        return this.secondFloor;
                    case 3:
                        return this.thirdFloor;
                    case 4:
                        return this.infinityFloor;
                }
            }
            public getTaskValue(id:string):number
            {
                for(let i = 0;i<this.taskList.length;i++)
                {
                    if(id = this.taskList[i].id)
                    {
                        return this.taskList[i].value;
                    }
                }
                return null;
            }

            public getTaskListById(min:number,max:number):MerryXmasTaskItemCfg[]{

                let length = this.taskList.length;
                
                let taskList:MerryXmasTaskItemCfg[] = [];
                for(let i = 0; i < length; i ++){
                    if(min<4){
                        if(this.taskList[i].group >= min && this.taskList[i].group <= max){
                            taskList.push(this.taskList[i]);
    
                        }
                    }else{
                        if(this.taskList[i].progress == "progress"){
                            taskList.push(this.taskList[i]);
                        }
                    }
                }
                return taskList;

            }
        }
        /**
         * 任务的
         */
        export class MerryXmasTaskItemCfg extends BaseItemCfg
        {
            /**id */
		    public id: string;
		    /**sortId */
		    public sortId: number;
		    /**groupId */
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
            /**进度奖励 */
            public progress:string;


            public initData(data:any,isProgress?:boolean):void{
                if(data){
                    if(isProgress){
                        this.progress = "progress";
                        this.value = data["needNum"];
                        this.getReward = data["getReward"];
                        this.questType = "progress";

                    }else{
                        for(var key in data){
                            this[key]=data[key];
                        }
                    }
                }
            }
        }
    }

}