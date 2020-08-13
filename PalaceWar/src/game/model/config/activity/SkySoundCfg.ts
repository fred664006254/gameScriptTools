namespace Config
{
	export namespace AcCfg
	{
		export class SkySoundCfg 
		{
            public extraTime:number = 0;
			public show:number;
			public needGem:number;
			public cost1:number = 1;
			public cost10:number = 10;
            public change:any = null;

            private achieveList:SkySoundAchieveItem[] = [];
            private exchangeList:SkySoundExchangeItem[] = [];
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
							let item = new SkySoundAchieveItem();
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
                    }else if (key == "exchange")
                    {
						for (let k in data[key])
						{
							let item = new SkySoundExchangeItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.exchangeList.push(item);
						}
                    }				
				}
			}
			public getAchieveList():SkySoundAchieveItem[]
			{
				return this.achieveList;
			}
			public getExchangeList():SkySoundExchangeItem[]
			{
				return this.exchangeList;
			}            
            public getPoolRewards():string{
                return this.poolRewards;
            }	
            //开始剧情
            public startDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "2":{"nextId":"3", "descId":2,"bgName":"", "bgId":6,"personPic":'servant_full_1001', personBone:"servant_full_1001","nameId":"servant_name1001","clickContinue":true},
                    "3":{"nextId":"4", "descId":3,"bgName":"", "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":"5", "descId":4,"bgName":"acskysound_bg-1", "bgId":6,"personPic":"wife_full_246",personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "5":{"nextId":"6", "descId":5,"bgName":"acskysound_bg-1", "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "6":{"nextId":null, "descId":6,"bgName":"acskysound_bg-1", "bgId":6,"personPic":"wife_full_246",personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                }
            };
            //进度剧情
            public achDialog_1 = {
                1 : {
                    "1":{"nextId":"2", "descId":1,"bgName":"acskysound_bg-1", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                  },
                2 : {
                    "1":{"nextId":"2", "descId":1,"bgName":"acskysound_bg-1", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                  }, 
                3 : {
                    "1":{"nextId":"2", "descId":1,"bgName":"acskysound_bg-1", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "3":{"nextId":null, "descId":3, "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                  },
                4 : {
                    "1":{"nextId":"2", "descId":1, "bgName":"acskysound_bg-1","bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "2":{"nextId":"3", "descId":2,"bgName":"", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "3":{"nextId":"4", "descId":3,"bgName":"", "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4,"bgName":"", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                  },
                5 : {
                   "1":{"nextId":"2", "descId":1,"bgName":"acskysound_bg-1", "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "2":{"nextId":"3", "descId":2,"bgName":"", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "3":{"nextId":"4", "descId":3,"bgName":"", "bgId":6,"personPic":1,"nameId":"storyNPCName1","clickContinue":true},
                    "4":{"nextId":null, "descId":4,"bgName":"", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true}
                  },
                6 : {
                  "1":{"nextId":"2", "descId":1,"bgName":"acskysound_bg-1", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "2":{"nextId":"3", "descId":2, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true},
                    "3":{"nextId":"4", "descId":3,"bgName":"", "bgId":6,"personPic":'wife_full_246', personBone:"wife_full_246","nameId":"wifeName_246","clickContinue":true},
                    "4":{"nextId":null, "descId":4, "bgId":6,"personPic":1,"nameId":'storyNPCName1',"clickContinue":true}
                  },
            };		
		}
        export class SkySoundAchieveItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }	
        export class SkySoundExchangeItem extends BaseItemCfg
		{
            public id:number = null;
            public item:string;
            public costSpecial2:string;
            public costSpecial4:string;
            public costSpecial8:string;
            public limit:number = 0;
            public sortId:number = 0;
        }	        	
	}
}