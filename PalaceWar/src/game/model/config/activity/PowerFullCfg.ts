namespace Config
{
    export namespace AcCfg
    {
        /**四大奸臣 魏忠贤衣装 权倾朝野*/
        export class PowerFullCfg
        {
            public extraTime:number =0;
            public show:number = 0;
            public freeTime:number = 0;
            public needGem:number = 0;
            public special:any;
            public condition1:any = {};
            public addPool1:any;
            public condition2:any;
            public addPool2:any;
            public getReward:string = null;
            public baseChance:number;
            public addChance:number;
            public change:any;
            private shopList:PowerFullShopItemCfg[] = [];
            private achieveList:PowerFullAchieveItemCfg[] = [];
            private poolRewards:string = null;

            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
                for(let key in data){
                    this[key] = data[key];
                }
                if(data.nightNum)
                {
                    this.achieveList = [];
                    let cfgData = data.nightNum;
                    for(let k in cfgData)
                    {
                        let itemCfg = new PowerFullAchieveItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.achieveList.push(itemCfg);
                    }
                }

                if (data.shop){
                    this.shopList = [];
                    let cfgData = data.shop;
                    for(let k in cfgData)
                    {
                        let itemCfg = new PowerFullShopItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        this.shopList.push(itemCfg);
                    }
                }

                if (data.basePool){
                    let str = "";
                    for (let k in data.basePool){
                        str += data.basePool[k][0] + "|";
                    }
                    this.poolRewards = str.substring(0, str.length - 1);
                } 
            }

            /**
             * 进度列表
             */
            public getAchieveList():PowerFullAchieveItemCfg[]{
                return this.achieveList;
            }

            /**
             * 奖池
             */
            public getPoolRewards():string{
                return this.poolRewards;
            }

            /**
             * 商店
             */
            public getShopItemList():PowerFullShopItemCfg[]{
                return this.shopList;
            }

            /**进度奖励对话 */
            public rewardDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":"acpowerfull_bg-1","personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":"acpowerfull_bg-1","personPic":"skin_full_20043", "personBone":"servant_full2_20043", "nameId":"servant_name2004","clickContinue":true},
                },
                2 : {
                    "1":{"nextId":"2", "descId":1, "bgId":"acpowerfull_bg-1","personPic":"skin_full_20043", "personBone":"servant_full2_20043","nameId":"servant_name2004","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":"acpowerfull_bg-1","personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                3 : {
                    "1":{"nextId":"2", "descId":1, "bgId":"acpowerfull_bg-1","personPic":"skin_full_20043", "personBone":"servant_full2_20043","nameId":"servant_name2004","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":"acpowerfull_bg-1","personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },  
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgId":"acpowerfull_bg-1","personPic":"skin_full_20043", "personBone":"servant_full2_20043","nameId":"servant_name2004","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":"acpowerfull_bg-1","personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
                5 : {
                    "1":{"nextId":"2", "descId":1, "bgId":"acpowerfull_bg-1","personPic":"skin_full_20043", "personBone":"servant_full2_20043","nameId":"servant_name2004","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":"acpowerfull_bg-1","personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                },
            }

            /**开始剧情对话 */
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6, "bgName":"story_bg6", "personPic":"","nameId":"","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6, "bgName":"story_bg6", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6, "bgName":"story_bg6", "personPic":"story_npc_7","nameId":"storyNPCName10","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6, "bgName":"story_bg6", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "5":{"nextId":"6", "descId":5, "bgId":6, "bgName":"story_bg6", "personPic":"servant_full_1001", "nameId":"servant_name1001","clickContinue":true},
                    "6":{"nextId":"7", "descId":6, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "7":{"nextId":"8", "descId":7, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":"skin_full_20043", "personBone":"servant_full2_20043", "nameId":"storyNPCName100","clickContinue":true},
                    "8":{"nextId":"9", "descId":8, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "9":{"nextId":"10", "descId":9, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":"skin_full_20043", "personBone":"servant_full2_20043", "nameId":"storyNPCName100","clickContinue":true},
                    "10":{"nextId":"11", "descId":10, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "11":{"nextId":null, "descId":11, "bgId":6, "bgName":"acpowerfull_bg-1", "personPic":"skin_full_20043", "personBone":"servant_full2_20043", "nameId":"storyNPCName100","clickContinue":true},
                }, 
            }

            /**兑换对话 */
            public exchangeDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6, "bgName":"", "personPic":"story_npc_7","nameId":"storyNPCName39","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6, "personPic":1, "nameId":"storyNPCName1","clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6, "personPic":"servant_full_2004","nameId":"servant_name2004","clickContinue":true},
                }
            }
        }

        /**
         * 进度
         */
        export class PowerFullAchieveItemCfg extends BaseItemCfg{
            public id:number = 0;
            public sortId:number = 0;
            public needNum:number = 0;
            public getReward:string = null;
        }

        /**
         * 商店
         */
        export class PowerFullShopItemCfg extends BaseItemCfg{
            public id:number = 0;
            public costMoney:number = 0;
            public discount:number = 0;
            public getReward:string = null;
        }

    }
}