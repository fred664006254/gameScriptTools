namespace Config{
    export namespace AcCfg{
        /**
         * 帮会集结
         * author wxz
         * date 2020.5.12
         * @namespace AggregationCfg
         */
        export class AggregationCfg{
            public getReward:string = null;
            public maxGet:number;
            private taskList:any[] = [];
            private task:any;
            public extraTime:number;

            public formatData(data:any)
            {
                for (let key in data)
                {
                    this[key] = data[key];
                    if(key == "showTime")
                    {
                        this.extraTime = data[key];
                    }
                    if (key == "task")
                    {
                        this.taskList = [];
                        for (let item in data[key])
                        {
                             let itemCfg = new AggregationTaskItem();
                             itemCfg.id = item;
                             itemCfg.initData(data[key][item]);
                             this.taskList.push(itemCfg);
                        }
                    }
                }
            }

            public getTaskCfg():AggregationTaskItem[]{
                return this.taskList;
            }
            public getNeedById(id:string):number
            {
                if(this.task && this.task[id] && this.task[id]["taskValue"])
                {
                    return this.task[id]["taskValue"];
                }
                return 0;
            }
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_10631',personBone:"servant_full2_10631","nameId":"servant_name1063","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":'wife_skin_2371', personBone:"wife_full3_2371","nameId":"wifeName_237","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_10631",personBone:"servant_full2_10631","nameId":"servant_name1063","clickContinue":true},
                }
            };        
        }

        /**任务奖励item */
        export class AggregationTaskItem extends BaseItemCfg{
            /**id */
            public id:string = null;
            public taskValue:number=null;
            /**奖励 */
            public getReward1:string = null;
            public getReward2:string = null;
            public sortId:number;
            public isCreatorRwd:number;
        } 
    }
}