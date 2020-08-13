namespace Config
{
	export namespace AcCfg
	{
		export class FlowerMoonCfg 
		{
            public extraTime:number = 0;
			public needGem:number;
            public change:any = null;
            public lisk:any = null;
            public addProcess:number;
            public maxNum:number;
            public pool1:any = null;
            public pool2:any = null;
            public like:any = null;
            public needScore:number; 
			public cost1:number = 1;
			public cost10:number = 10;
            public per:number = 5;

            public scoreRank:any[] = null;
            public achievementAll:any[] = null;


            private achieveList:FlowerMoonAchieveItem[] = [];
			private rankPersonItemList:FlowerMoonRankItemCfg[] = [];
			private rankZoneItemList:FlowerMoonRankItemCfg[] = [];
            private poolRewardsList:FlowerMoonPoolItemCfg[] = [];

			public formatData(data:any):void
            {
				for (let key in data)
				{
					this[key] = data[key];
					if (key == "achievementOne")
					{
						for (let k in data[key])
						{
							let item = new FlowerMoonAchieveItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.achieveList.push(item);
						}
					}	
                    else if (key == "scoreRank"){
                        this.rankPersonItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new FlowerMoonRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankPersonItemList.push(itemCfg);
                        }
                    }
                    else if (key == "achievementAll"){
                        this.rankZoneItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new FlowerMoonRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankZoneItemList.push(itemCfg);
                        }
                    }									
				}
                if (data.pool1)
                {
                    this.poolRewardsList = [];
                    let cfgData = data.pool1;
                    for (let k in cfgData)
                    {
                        let itemCfg = new FlowerMoonPoolItemCfg();
                        itemCfg.initData(cfgData[k]);
                        itemCfg.id = Number(k) + 1;
                        let str = "";
                        let pools = cfgData[k].poolItem;
                        for (let key in pools)
                        {
                            str += pools[key][0] + "|";
                        }
                        itemCfg.getRewards = str.substring(0, str.length - 1);
                        this.poolRewardsList.push(itemCfg);
                    }
                }	                
			}
			public getAchieveList(sort:boolean=false):FlowerMoonAchieveItem[]
			{
                if(sort)
                {
                    this.achieveList.sort((a:FlowerMoonAchieveItem, b:FlowerMoonAchieveItem)=>
                    {
                        return a.id - b.id;
                    });
                }
				return this.achieveList;
			}	
			public getRankPersonItemCfg():FlowerMoonRankItemCfg[]
			{
                return this.rankPersonItemList;
            }
			public getRankZoneItemCfg():FlowerMoonRankItemCfg[]
			{
                return this.rankZoneItemList;
            }		
            public getPoolRewards():FlowerMoonPoolItemCfg[]{
                return this.poolRewardsList;
            }            	
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1,"bgName":"story_bg6", "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "2":{"nextId":"3", "descId":2,"bgName":"", "bgId":6,"personPic":'wife_skin_2182', personBone:"wife_full3_2182","nameId":"wifeName_218","clickContinue":true},
                    "3":{"nextId":"4", "descId":3,"bgName":"", "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":"5", "descId":4,"bgName":"", "bgId":6,"personPic":"wife_skin_2182",personBone:"wife_full3_2182","nameId":"wifeName_218","clickContinue":true},
                    "5":{"nextId":"6", "descId":5,"bgName":"", "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "6":{"nextId":"7", "descId":6,"bgName":"acflowermoon_bg-1", "bgId":6,"personPic":"wife_skin_2182",personBone:"wife_full3_2182","nameId":"wifeName_218","clickContinue":true},
                    "7":{"nextId":"8", "descId":7,"bgName":"acflowermoon_bg-1", "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "8":{"nextId":null, "descId":8,"bgName":"acflowermoon_bg-1", "bgId":6,"personPic":"wife_skin_2182",personBone:"wife_full3_2182","nameId":"wifeName_218","clickContinue":true}
                }
            };	
		}
        export class FlowerMoonAchieveItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }
        /**
         * 排名奖励
         */
        export class FlowerMoonRankItemCfg extends BaseItemCfg
		{
			public id:number;
            private rank:number[] = [];
            public getReward:string = '';
		
			public get minRank():number
			{
				return this.rank[0];
            }
            
			public get maxRank():number
			{
				return this.rank[1];
			}
		}

        /**
         * 奖池
         */
        export class FlowerMoonPoolItemCfg extends BaseItemCfg{
            public id:number = 0;
            public poolItem:any = null;
            public getRewards:string = null;
        }        	
	}
}