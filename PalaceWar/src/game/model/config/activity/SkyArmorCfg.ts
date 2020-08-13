namespace Config
{
	export namespace AcCfg
	{
		export class SkyArmorCfg 
		{
            public extraTime:number = 0;
            public specialLimit:number=0;
			public show:number;
			public needGem:number;
			public cost1:number = 1;
			public cost10:number = 10;
            public change:any = null;
            public needTime:number = 0;

            private achieveList:SkyArmorAchieveItem[] = [];
            private rankItemList:SkyArmorRankItemCfg[] = [];
			private poolRewards:string = null;

			public formatData(data:any):void
            {
				for (let key in data)
				{
					this[key] = data[key];
					if (key == "soundNum")
					{
						for (let k in data[key])
						{
							let item = new SkyArmorAchieveItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.achieveList.push(item);
						}
					}
					else if (key == "soundPool1")
					{
                        let str = "";
                        for (let k in data[key])
						{
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                    else if (key == "rankReward"){
                        this.rankItemList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new SkyArmorRankItemCfg();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.rankItemList.push(itemCfg);
                        }
                    }				
				}
			}
			public getAchieveList():SkyArmorAchieveItem[]
			{
				return this.achieveList;
			}
			public getRankItemCfg():SkyArmorRankItemCfg[]
			{
				return this.rankItemList;
			}            
            public getPoolRewards():string{
                return this.poolRewards;
            }	
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":'storyNPCName1',"clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":'skin_full_10631', personBone:"servant_full2_10631","nameId":"servant_name1001","clickContinue":true},
                    "3":{"nextId":"4", "descId":3, "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":"5", "descId":4, "bgId":6,"personPic":"wife_skin_2371",personBone:"wife_full3_2371","nameId":"wifeName_246","clickContinue":true},
                    "5":{"nextId":"6", "descId":5, "bgId":6,"personPic":"storyNPCName1","clickContinue":true},
                    "6":{"nextId":null, "descId":6, "bgId":6,"personPic":"wife_skin_2371",personBone:"wife_full3_2371","nameId":"wifeName_246","clickContinue":true}
                }
            };			
		}
        export class SkyArmorAchieveItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }	
        /**
         * 排名奖励
         */
        export class SkyArmorRankItemCfg extends BaseItemCfg
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
	}
}