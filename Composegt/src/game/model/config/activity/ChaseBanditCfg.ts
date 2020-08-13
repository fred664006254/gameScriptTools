namespace Config {
    export namespace AcCfg {
        export class ChaseBanditCfg {
            /** 单抽消耗：X元宝 */
            public cost: number;

            /** 单抽获得道具：单抽必给  十连抽 = 单抽必给 * 10*/
            public getReward: string;

            /** 十连抽折扣*/
            public discount: number;

            /** 活动期间上榜所需抽奖次数（抽奖次数未达到该值的玩家将不具备上榜资格）*/
            public rankNeedNum: number;

            /** 抽奖暴击几率*/
            public lotteryCriticalRate: number;

            /**奖池*/
            public lotteryPool: { [key: string]: number };

            //boss血量
            public num: number;

            /** 活动期间，抽奖次数的进度奖励
             * needNum：所需抽奖次数
             * getReward：奖励
             */
            public lotteryNum: { needNum: number, getReward: string }[];

            public task: ChaseBanditTaskItemCfg[];

            public superp = 3807;
            //解析数据
            public formatData(data: any): void {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];


                        if (key == "task") {
                            this.task = [];
                            let i = 0;
                            for (let k in data[key]) {
                                let itemcfg = new ChaseBanditTaskItemCfg();
                                itemcfg.initData(data[key][k])
                                itemcfg.id = String(i + 1);
                                this.task.push(itemcfg);
                                i++;
                            }
                        }

                        if (key == "progress") {
                            this.lotteryNum = data[key];
                            let maxBlood: number = 0;
                            let maxKey:string = '0';
                            for (let k in data[key]) {
                                if (data[key][k].needNum > maxBlood) {
                                    maxBlood = data[key][k].needNum;
                                    maxKey = k;
                                }
                            }
                            this.num = maxBlood;
                            this.superp = GameData.formatRewardItem(data[key][maxKey]["getReward"])[0].id;

                        }

                    }
                }
            }
            public getDialogById(id, code): any {

                let ccode = null;
                if (this["AVGDialog_code" + code]) {
                    ccode = code;
                } else {
                    ccode = 1;
                }
                if (id == "first") {
                    return this["AVGDialog_code" + ccode]["first"];
                }


            }
            public getMaxBoxNeedNum() {
                return this.lotteryNum[this.lotteryNum.length - 1].needNum;
            }

            /**
             * 获得任务列表
             */
            public getTaskList(): ChaseBanditTaskItemCfg[] {
                return this.task;
            }

            private AVGDialog_code4 = {
                first: {//wife_full_234  1  storyNPCName1  wifeName_234
                    "1": { "nextId": "2", "descId": 1, "bgId": 6, "personPic": "", "nameId": "", "clickContinue": true, "resEndId": "234" },
                    "2": { "nextId": "3", "descId": 2, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },
                    "3": { "nextId": "4", "descId": 3, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "234" },
                    "4": { "nextId": "5", "descId": 4, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },
                    "5": { "nextId": "6", "descId": 5, "bgId": 6, "personPic": "1", "nameId": "storyNPCName1", "clickContinue": true, "resEndId": "234" },
                    "6": { "nextId": null, "descId": 6, "bgId": 6, "personPic": "wife_full_234", "nameId": "wifeName_234", "clickContinue": true, "resEndId": "234" },

                },


            };
        }

        /**
         * 任务的
         */
        export class ChaseBanditTaskItemCfg extends BaseItemCfg {
            /**id */
            public id: string;
            /**sortId */
            public sortId: number;
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

    }
}