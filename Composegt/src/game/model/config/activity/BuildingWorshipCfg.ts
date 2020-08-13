namespace Config {
    export namespace AcCfg {
        export class BuildingWorshipCfg {
            /** 单抽消耗：X元宝 */
            public cost:number;
        
            /** 单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10*/
            public getReward:string;
        
            /** 十连抽折扣*/
            public discount:number;
        
            /** 活动期间上榜所需抽奖次数（抽奖次数未达到该值的玩家将不具备上榜资格）*/
            public rankNeedNum:number;
        
            /** 抽奖暴击几率*/
            public lotteryCriticalRate:number;
        
            /**奖池*/
            public lotteryPool:{[key:string]:number};
        
            /** 活动期间，抽奖次数的进度奖励
             * needNum：所需抽奖次数
             * getReward：奖励
             */
            public lotteryNum:{needNum:number,getReward:string}[];
            
            /**         
             活动期间的活跃任务   注：每日不重置
            openType：跳转
            questType：任务类型  特殊类型：1--登录X天   2--累计消耗 X元宝
            value：进度
            getReward：奖励
            */
            public task:{questType:number,value:number,getReward:string}[];
            
            private taskList:BuildingWorshipTaskItemCfg[];
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
                                let itemcfg = new BuildingWorshipTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }

                    }
                }
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
                } 
                
                
            }
            public getMaxBoxNeedNum () {
                return this.lotteryNum[this.lotteryNum.length-1].needNum;
            }

            /**
             * 获得任务列表
             */
            public getTaskList():BuildingWorshipTaskItemCfg[]
            {
                return this.taskList;
            }

            private AVGDialog_code4 = {
                first:{//wife_full_234  1  storyNPCName1  wifeName_234
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"","clickContinue":true,"resEndId":"234"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_full_234","nameId":"wifeName_234","clickContinue":true,"resEndId":"234"},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"234"},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"wife_full_234","nameId":"wifeName_234","clickContinue":true,"resEndId":"234"},
                    "5":{"nextId":"6", "descId":5, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"234"},
                    "6":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_full_234","nameId":"wifeName_234","clickContinue":true,"resEndId":"234"},
                                                                
                },
                

            };
        }

        /**
         * 任务的
         */
        export class BuildingWorshipTaskItemCfg extends BaseItemCfg
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