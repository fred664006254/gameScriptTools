namespace Config{
    export namespace AcCfg{
        /**
         * 携美同游
         * author ycg
         * date 2019.11.4
         * @namespace TravelWithBeautyCfg
         */
        export class TravelWithBeautyCfg{
            public extraTime:number;
            public freeTime:number;
            public cost1:number;
            public addProcess:number;
            public sceneNum:number;
            public weight:any;
            private poolRewards:string = null;
            private rechargeList:TravelWithBeautyRecharageItem[] = [];
            private achievementList:TravelWithBeautyAchievementItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new TravelWithBeautyRecharageItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k)+1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement"){
                        this.achievementList = [];
                        for (let k in data[key]){
                            let itemCfg = new TravelWithBeautyAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(Number(k)+1);
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

            public getRechargeList():TravelWithBeautyRecharageItem[]{
                return this.rechargeList;
            }

            public getAchievementList():TravelWithBeautyAchievementItem[]{
                return this.achievementList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }

            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_3035","nameId":"wifeName_303","clickContinue":true},
                }
            };

            public startDialog_3 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'',"nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "5":{"nextId":null, "descId":5, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                }
            };

            //领取奖励剧情
            public rewardDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_3035","nameId":"wifeName_303","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_3035","nameId":"wifeName_303","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":"","nameId":"","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"","nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "5":{"nextId":null, "descId":5, "bgId":6,"personPic":'wife_skin_3035',"nameId":"wifeName_303","clickContinue":true},
                }
            };

            public rewardDialog_3 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":'',"nameId":"","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":'',"nameId":"","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'',"nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
                6 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
                7 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":"wife_skin_2241","nameId":"wifeName_224","clickContinue":true},
                },
            };
        }

        /**累充item */
        export class TravelWithBeautyRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            /**特殊物品 */
            public specialGift:number = 0;
            public sortId:number = 0;
        }

        /**进度奖励item */
        export class TravelWithBeautyAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}