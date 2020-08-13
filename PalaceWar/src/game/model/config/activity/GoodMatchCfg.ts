namespace Config
{
    export namespace AcCfg
    {
        /**情系良缘 */
        export class GoodMatchCfg
        {
            public extraTime:number =0;
            public change:any;
            public show:number = 0;
            public freeTime:number = 0;
            public needGem:number = 0;
            public boolType:number;

            private achieveList:GoodMatchAchieveItemCfg[] = [];
            private serverAchieveList:GoodMatchAchieveItemCfg[] = [];
            private poolRewardsList:GoodMatchPoolItemCfg[] = [];

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(let key in data){
                    this[key] = data[key];
                }
                if(data.achievementOne)
                {
                    this.achieveList = [];
                    let cfgData = data.achievementOne;
                    for(let k in cfgData)
                    {
                        let itemCfg = new GoodMatchAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.achieveList.push(itemCfg);
                    }
                }

                if (data.achievementAll){
                    this.serverAchieveList = [];
                    let cfgData = data.achievementAll;
                    for(let k in cfgData)
                    {
                        let itemCfg = new GoodMatchAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.serverAchieveList.push(itemCfg);
                    }
                }

                if (data.matchPool){
                    this.poolRewardsList = [];
                    let cfgData = data.matchPool;
                    for (let k in cfgData){
                        let itemCfg = new GoodMatchPoolItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        let str = "";
                        let pools = cfgData[k].poolItem;
                        for (let key in pools){
                            str += pools[key][0] + "|";
                        }
                        itemCfg.getRewards = str.substring(0, str.length - 1);
                        this.poolRewardsList.push(itemCfg);
                    }
                }
            }

            /**
             * 进度列表
             */
            public getAchieveList():GoodMatchAchieveItemCfg[]{
                return this.achieveList;
            }

            /**
             * 全服进度列表
             */
            public getServerAchieveList():GoodMatchAchieveItemCfg[]{
                return this.serverAchieveList;
            }

            /**
             * 奖池
             */
            public getPoolRewards():GoodMatchPoolItemCfg[]{
                return this.poolRewardsList;
            }

            /**进度奖励对话 */
            public rewardDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"servant_full_1001", "personBone":"servant_full_1001", "nameId":"servant_name1001","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"", "personBone":"", "nameId":"","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                },  
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_full_250", "personBone":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                },
            }

            /**开始剧情对话 */
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6, "bgName":"story_bg6", "personPic":"","nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6, "bgName":"story_bg6", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6, "bgName":"story_bg6", "personPic":"servant_full_1001","nameId":"servant_name1001","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6, "bgName":"story_bg6", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "5":{"nextId":"6", "descId":5, "bgId":6, "bgName":"acgoodmatch_bg-1", "personPic":"", "nameId":"","clickContinue":true},
                    "6":{"nextId":"7", "descId":6, "bgId":6, "bgName":"acgoodmatch_bg-1", "personPic":"wife_full_250", "nameId":"wifeName_250","clickContinue":true},
                    "7":{"nextId":"8", "descId":7, "bgId":6, "bgName":"acgoodmatch_bg-1", "personPic":1, "personBone":"storyNPCName1", "nameId":"","clickContinue":true},
                    "8":{"nextId":null, "descId":8, "bgId":6, "bgName":"acgoodmatch_bg-1", "personPic":"wife_full_250", "nameId":"wifeName_250","clickContinue":true}
                }, 
            }
        }

        /**
         * 进度
         */
        export class GoodMatchAchieveItemCfg extends BaseItemCfg{
            public id:number = 0;
            public sortId:number = 0;
            public needNum:number = 0;
            public getReward:string = null;
            public needNum1:number = 0;
            public needNum2:number = 0;
        }

        /**
         * 奖池
         */
        export class GoodMatchPoolItemCfg extends BaseItemCfg{
            public id:number = 0;
            public poolItem:any = null;
            public getRewards:string = null;
        }
    }
}