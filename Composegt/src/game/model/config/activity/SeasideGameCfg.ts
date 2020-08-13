namespace Config {
    export namespace AcCfg {
        export class SeasideGameCfg {
      
        
            /** 抽奖积分满额后获得红颜皮肤id*/
            public wifeSkinId:number;
            //积分上限
            public scoreLimit:number;

            public itemPlace:{itemID:number}[];

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
            
            private taskList:SeasideGameTaskItemCfg[];



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
                                let itemcfg = new SeasideGameTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i+1);
                                this.taskList.push(itemcfg);
                                i ++;
                            }
                        }

                    }
                }
            }
            public getTaskListById(groupId:number):SeasideGameTaskItemCfg[]{

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
            public getTaskList():SeasideGameTaskItemCfg[]
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
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"","clickContinue":true,"resEndId":"204"},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_skin_2041","nameId":"wifeName_204","clickContinue":true,"resEndId":"204"},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"204"},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"wife_skin_2041","nameId":"wifeName_204","clickContinue":true,"resEndId":"204"},
                    "5":{"nextId":"6", "descId":5, "bgId":6,"personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true,"resEndId":"204"},
                    "6":{"nextId":null, "descId":6, "bgId":6,"personPic":"1","nameId":"storyNPCName1","clickContinue":true,"resEndId":"204"},
                }
            };
        }

        /**
         * 任务的
         */
        export class SeasideGameTaskItemCfg extends BaseItemCfg
        {
            /**任务ID */
            public id:string;
            //跳转
            public openType:string = null;
            //特殊奖励
            public specialGift:number;
            //任务组别 组别：1 充值任务，2 日常任务 3，消耗元宝任务
            public group:number;

            /**
             * 任务类型 特殊类型：1--登录X天   2--累计消耗 X元宝
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