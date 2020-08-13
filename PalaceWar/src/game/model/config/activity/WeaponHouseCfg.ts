namespace Config{
    export namespace AcCfg{
        /**
         * 神兵宝库
         * author yangtao
         * date 2020.6.10
         * @class WeaponHouseCfg
         */
        export class WeaponHouseCfg{
            public extraTime:number;

            public refreshRatio:number[];
            public costMoney:number[];
            public getTime:number;
            public scheduleOne :Object={};
            public scheduleAll :Object={};
            public addScoreList:AddScoreListItem[] = [];//积分规则
            private rechargeList:RechargeListItem[] =[];//充值奖励
            private rechargeOneList:any[] = [];//个人奖励
            private rechargeAllList:any[] = [];//全服奖励
            private rankOneItemList:WeaponRankOneItemCfg[] =[];//个人排行榜
            private rankAllItemList:WeaponRankAllItemCfg[] =[];//帮会排行榜
            public limitScore:string;
            public costTime:string;
            public baseScore:string;
            public addTime:number;
            public baseTime:number;

            public formatData(data:any){
                this.scheduleOne = data.scheduleOne;
                this.scheduleAll = data.scheduleAll;
                this.getTime = data.getTime;
                this.costMoney = data.costMoney;
                this.refreshRatio = data.refreshRatio;
                this.limitScore = data.limitScore;
                this.costTime = data.costTime;
                this.baseScore = data.baseScore;
                this.addTime = data.addTime;
                this.baseTime = data.baseTime;
                for (let key in data){
                    this[key] = data[key];
                    if (key == "addScore"){
                        this.addScoreList = [];
                        for (let k in data[key]){
                            let itemCfg = new AddScoreListItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            itemCfg.weaponLv = data[key][k].weaponLv;
                            itemCfg.lvScore = data[key][k].lvScore;
                            this.addScoreList.push(itemCfg);
                        }
                    }else if(key == "recharge"){
                        this.rechargeList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new RechargeListItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rechargeList.push(itemCfg);
                        }
                    }else if (key == "scheduleOne"){
                        this.rechargeOneList = [];
                        for(let k in data[key])
                        {
                            let element = data[key];
                            if(k == "1")
                            {
                                let recharge1ItemList :ScheduleOne1Item[]= [];
                                for(let j in element[k]){
                                    let itemCfg =  new ScheduleOne1Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge1ItemList.push(itemCfg)
                                }
                                recharge1ItemList["stageId"] = Number(k)+1;
                                this.rechargeOneList.push(recharge1ItemList);
                            }else{
                                let recharge2ItemList : ScheduleOne2Item[]= [];
                                for(let j in element[k]){
                                    let itemCfg =  new ScheduleOne2Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge2ItemList.push(itemCfg);
                                }
                                recharge2ItemList["stageId"] = Number(k)+1;
                                this.rechargeOneList.push(recharge2ItemList);
                            }
                        }
                    }else if(key == "scheduleAll"){
                        this.rechargeAllList = [];
                        for(let k in data[key])
                        {
                            let element = data[key];
                            if(k == "1")
                            {
                                let recharge1ItemList :ScheduleOne1Item[]= [];
                                for(let j in element[k]){
                                    let itemCfg =  new ScheduleOne1Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge1ItemList.push(itemCfg)
                                }
                                recharge1ItemList["stageId"] = Number(k)+1;
                                this.rechargeAllList.push(recharge1ItemList);
                            }else{
                                let recharge2ItemList : ScheduleOne2Item[]= [];
                                for(let j in element[k]){
                                    this.rechargeOneList.push(recharge2ItemList);
                                    let itemCfg =  new ScheduleOne2Item();
                                    itemCfg.initData(element[k][j]);
                                    itemCfg.id = Number(k);
                                    itemCfg.stageId = Number(j);
                                    recharge2ItemList.push(itemCfg);
                                }
                                recharge2ItemList["stageId"] = Number(k)+1;
                               this.rechargeAllList.push(recharge2ItemList);
                            }
                        }
                    }else if(key == "rankOne"){
                        this.rankOneItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new WeaponRankOneItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankOneItemList.push(itemCfg);
                        }
                    }else if(key == "rankAll"){
                        this.rankAllItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new WeaponRankAllItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankAllItemList.push(itemCfg);
                        }
                    }

                }

            }

            public getRechargeList():RechargeListItem[]
			{
				return this.rechargeList;
			}
            public getRankOneItemList():WeaponRankOneItemCfg[]
			{
				return this.rankOneItemList;
			}
            public getRankAllItemList():WeaponRankAllItemCfg[]
			{
				return this.rankAllItemList;
			}
  
             //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'searchnpc_full92',personBone:"searchnpc_full92","nameId":"storyNPCName39","clickContinue":true},
                    "2":{"nextId":null, "descId":2, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                }
            };
        }

        /**积分item */
        export class AddScoreListItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**等级 */
            public weaponLv:number = 0;
            /**积分 */
            public lvScore:number = 0;
        }
        /**充值item */
        export class RechargeListItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**元宝 */
            public needGem:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
        /**任务类型1 item */
        export class ScheduleOne1Item extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**阶段id */
            public stageId:number = null;
            /**类型 */
            public taskType:number = 0;
            /**所需积分 */
            public needNum:string = null;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**任务类型2 item */
        export class ScheduleOne2Item extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**阶段id */
            public stageId:number = null;
            /**类型 */
            public taskType:number = 0;
            //value1:所需神器等级
            public value1:number = 0;
            //value1:所需次数
            public value2:number = 0;

            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**
         * 个人排名奖励
         */
        export class WeaponRankOneItemCfg extends BaseItemCfg
		{
			public id:number;
            private rank:number[] = [];
            public getReward:string = '';
            private downLimit:number;
            private upLimit:number;
		}  
        /**
         * 帮会排名奖励
         */
        export class WeaponRankAllItemCfg extends BaseItemCfg
		{
			public id:number;
            private rank:number[] = [];
            public getReward1:string = '';
            public getReward2:string = '';
            private downLimit:number;
            private upLimit:number;
		}  
    }
}