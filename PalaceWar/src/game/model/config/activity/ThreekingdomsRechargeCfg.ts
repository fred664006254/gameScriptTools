namespace Config{
    export namespace AcCfg{
        /**
         * 三国活动
         * author yangchengguo
         * date 2020.1.14
         * @namespace ThreekingdomsRechargeCfg
         */
        export class ThreekingdomsRechargeCfg{
            public extraTime:number;
            public show:number;
            public freeTime:number;
            public cost:number;
            public consume1:number;
            public addProcess:number;
            public poolRewards:string;
            public achieveList:ThreekingdomsAchievementItem[] =[];
            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new ThreekingdomsAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k)+1);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            }

            public getAchieveData():ThreekingdomsAchievementItem[]{
                return this.achieveList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }

            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_20171',"nameId":"servantSkinName20171","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"skin_full_20171","nameId":"servantSkinName20171","clickContinue":true},
                }
            };

            public startDialog_3 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_20151',"nameId":"servantSkinName20151","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"skin_full_20151","nameId":"servantSkinName20151","clickContinue":true},
                }
            };

            public startDialog_5 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_20161',"nameId":"servantSkinName20161","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"skin_full_20161","nameId":"servantSkinName20161","clickContinue":true},
                }
            };

            public startDialog_7 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_20141',"nameId":"servantSkinName20141","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"skin_full_20141","nameId":"servantSkinName20141","clickContinue":true},
                }
            };

            public startDialog_9 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'skin_full_20181',"nameId":"servantSkinName20181","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"skin_full_20181","nameId":"servantSkinName20181","clickContinue":true},
                }
            };
        }

        /**进度奖励item */
        export class ThreekingdomsAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**所需分数 */
            public specialnum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}