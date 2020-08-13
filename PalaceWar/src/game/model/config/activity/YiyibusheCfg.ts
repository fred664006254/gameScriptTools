namespace Config
{
	export namespace AcCfg
	{
        /**女优活动3 依依不舍 */
		export class YiyibusheCfg 
		{
            public extraTime:number;
            public freeTime:number;
            /**每抽增加进度 */
            public addProcess:number;
            /**单抽消耗元宝 */
            public gemCost:number;
            /**十连折扣 */
            public discount:number;
            /**奖励展示 */
            public show:any;
            /**抽奖暴击 */
            public critical:any;
            /**奖池 */
            public pool:any;
            public poolRewards:string;
            /**进度奖励 */
            public achievementList:YiyibusheAchievementItem[] = [];

            /**
             * 初始化数据
             */
			public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achievementList = [];
                        for (let i = 0; i < data[key].length; i++){
                            let itemCfg = new YiyibusheAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "pool"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            }

            public getAchievementList():YiyibusheAchievementItem[]{
                return this.achievementList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }

            public AVGDialog = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"","nameId":"","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "5":{"nextId":null, "descId":5, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                },
                6 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                7 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                8 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                9 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                },
                10 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_2341',"nameId":"wifeName_234","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2341","nameId":"wifeName_234","clickContinue":true},
                }
            }
        }

        /**进度奖励item */
        export class YiyibusheAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**所需进度 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}