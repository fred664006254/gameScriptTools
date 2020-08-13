namespace Config{
    export namespace AcCfg{
        /**
         * 巾帼英雄
         * author ycg
         * date 2019.11.11
         * @namespace HeroineCfg
         */
        export class HeroineCfg{
            public extraTime:number;
            public freeTime:number;
            public cost:number;
            public exchange:string;
            public attackHP:number;
            public totalHP:number;
            /**红颜 */
            public show1:number;
            /**门客 */
            public show2:number;
            private poolRewards:string = null;
            private rechargeList:HeroineRechargeItem[] = [];
            private achievementList:HeroineAchievementItem[] = [];

            public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new HeroineRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "processingReward"){
                        this.achievementList = [];
                        for (let k in data[key]){
                            let itemCfg = new HeroineAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achievementList.push(itemCfg);
                        }
                        this.achievementList.sort((a, b)=>{ return a.id - b.id});
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

            public getRechargeList():HeroineRechargeItem[]{
                return this.rechargeList;
            }

            public getAchievementList():HeroineAchievementItem[]{
                return this.achievementList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }

            public rewardDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20101","nameId":"servant_name2010","clickContinue":true},
                }
            }
            public rewardDialog_3 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20091","nameId":"servant_name2009","clickContinue":true},
                }
            };
            public rewardDialog_5 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20111","nameId":"servant_name2011","clickContinue":true},
                }
            };
            public rewardDialog_7 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20121","nameId":"servant_name2012","clickContinue":true},
                }
            };
            public rewardDialog_9 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },	
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":"skin_full_20131","nameId":"servant_name2013","clickContinue":true},
                }
            };
        }
        

        /**累充item */
        export class HeroineRechargeItem extends BaseItemCfg{
            /**充值id */
            public id:number = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            /**特殊物品 */
            public specialGift:number = 0;
            public sortId:number = 0;
        }

        /**进度奖励item */
        export class HeroineAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:number = null;
            /**血量进度 */
            public ratetime:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}