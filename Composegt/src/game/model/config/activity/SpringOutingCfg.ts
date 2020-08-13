namespace Config
{
    export namespace AcCfg
    {
        export class SpringOutingCfg
        {
            public rechargeCost: number = 0;
            public cost:number = 0;
            public getReward:string = null;

            public lotteryPool:{[key:string]:number};
            public lotteryNum:{needNum:number,getReward:string}[];
            // private lotteryNumList:SpringOutingLotteryNumItemCfg[] = null;
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:{questType:number,value:number,getReward:string}[];
            private taskList:SpringOutingTaskItemCfg[] = null;
            public sceneNum:number = 9;

            public getCost():number
            {
                return this.cost;
            }
            public getRechargeCost():number
            {
                return this.rechargeCost;
            }
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(var key in data){
                    this[key] = data[key];

               
                    if(key == "task")
                    {
                        this.taskList = [];
                        let i = 0;
                        for(let k in data[key])
                        {
                            let itemCfg = new SpringOutingTaskItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(i+1);
                            this.taskList.push(itemCfg);
                            i++;
                        }
                    }
                }
                
            }
            public getMaxBoxNeedNum () {
                return this.lotteryNum[this.lotteryNum.length-1].needNum;
            }
 
            /**
             * 获得任务列表
             */
            public getTaskList():SpringOutingTaskItemCfg[]
            {
                return this.taskList;
            }
            public getDialogById(id, code):any{
                
                let ccode = null;
                if(this["AVGDialog_code" + code]) {
                    ccode = code;
                } else {
                    ccode = 1;
                }
                if(id=="first"){
                    return this["AVGDialog_code" + ccode]["first"];
                } else {
                    return this["AVGDialog_code" + ccode][`id${id}`];
                }
                
                
            }
            private AVGDialog_code1 = {
                first:{
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id0 : {
                    "1":{"nextId":"2", "descId":4, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id1 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":8, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":9, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id2 : {
                    "1":{"nextId":"2", "descId":10, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":11, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":"4", "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "4":{"nextId":null, "descId":13, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id3 : {
                    "1":{"nextId":"2", "descId":14, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":16, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id4 : {
                    "1":{"nextId":"2", "descId":17, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":18, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":19, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id5 : {
                    "1":{"nextId":"2", "descId":20, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":21, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":"4", "descId":22, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "4":{"nextId":"5", "descId":23, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "5":{"nextId":null, "descId":24, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },
                id6 : {
                    "1":{"nextId":"2", "descId":25, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                    "2":{"nextId":"3", "descId":26, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"107"},
                    "3":{"nextId":null, "descId":27, "bgId":6,"personPic":"wife_skin_1071","nameId":"wifeName_107","clickContinue":true,"resEndId":"107"},
                },

            };
            private AVGDialog_code3 = {
                first:{
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id0 : {
                    "1":{"nextId":"2", "descId":4, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id1 : {
                    "1":{"nextId":"2", "descId":7, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":8, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":9, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id2 : {
                    "1":{"nextId":"2", "descId":10, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":11, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":"4", "descId":12, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "4":{"nextId":null, "descId":13, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id3 : {
                    "1":{"nextId":"2", "descId":14, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":15, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":16, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id4 : {
                    "1":{"nextId":"2", "descId":17, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":18, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":19, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id5 : {
                    "1":{"nextId":"2", "descId":20, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":21, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":"4", "descId":22, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "4":{"nextId":"5", "descId":23, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "5":{"nextId":null, "descId":24, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },
                id6 : {
                    "1":{"nextId":"2", "descId":25, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                    "2":{"nextId":"3", "descId":26, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"220"},
                    "3":{"nextId":null, "descId":27, "bgId":6,"personPic":"wife_skin_2201","nameId":"wifeName_220","clickContinue":true,"resEndId":"220"},
                },

            };

        }

        /**
         * 任务的
         */
        export class SpringOutingTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;
            public openType:string = null;
            /**
             * 任务类型
             */
            public questType:string;
            /**
             * 奖励樱花
             */
            public sakura:number;
            /**
             * 任务进度
             */
            public value:number;
            /**
             * 奖励 
             * */
            public getReward:string;

            public sortId:number;
        }
 
    }

}