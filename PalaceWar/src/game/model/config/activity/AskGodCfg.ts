namespace Config
{
	export namespace AcCfg
	{
		export class AskGodCfg 
		{
            public extraTime:number = 0;
            public specialLimit:number=0;
			public needGem:number;
			public cost:number = 0;
			private discount:number;
            public needTime:number = 0;
			public basePool:any[][] = null;
			public getReward:string = null;
			public special:any = null;

            private achieveList:AskGodAchieveItem[] = [];
			private shops:AskGodShopItem[] = [];
			private poolRewards:string = null;

			public formatData(data:any):void
            {
				for (let key in data)
				{
					this[key] = data[key];
					if (key == "nightNum")
					{
						for (let k in data[key])
						{
							let item = new AskGodAchieveItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.achieveList.push(item);
						}
					}
					else if (key == "shop")
					{
						for (let k in data[key])
						{
							let item = new AskGodShopItem();
							item.initData(data[key][k]);
							let type = item.getReward.split("_")[0];
							if(type == "16")
							{
								if(!Api.switchVoApi.checkIsSkinState(item.getReward.split("_")[1]))
								{
									continue;
								}
							}else
							{
								if(type == "6")
								{
									let itemCfg=Config.ItemCfg.getItemCfgById(item.getReward.split("_")[1]);
									if(itemCfg && itemCfg.getRewards && itemCfg.getRewards.split("_")[0] == "19")
									{
										if(!Api.switchVoApi.checkIsServantSkinState(itemCfg.getRewards.split("_")[1]))
										{
											continue;
										}
									}
								}
								if(type == "11")
								{
									if(!Api.switchVoApi.checkIsTitleState(item.getReward.split("_")[1]))
									{
										continue;
									}
								}
							}
							item.id = Number(k) + 1;
							this.shops.push(item);
						}						
					}
					else if (key == "basePool")
					{
                        let str = "";
                        for (let k in data[key])
						{
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }				
				}
			}
			public getAchieveList():AskGodAchieveItem[]
			{
				return this.achieveList;
			}    
			public getShopList():AskGodShopItem[]
			{
				return this.shops;
			}  			      
            public getPoolRewards():string{
                return this.poolRewards;
            }	

			public get cost10():number
			{
				return Math.floor(this.cost*10*this.discount);
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
        export class AskGodAchieveItem extends BaseItemCfg
		{
            public id:number = null;
            public needNum:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }
        export class AskGodShopItem extends BaseItemCfg
		{
            public id:number = null;
            public needItem:string = "";
            public needNum:number = 0;
            public limitTime:number = 0;
			public discount:number = 0;
			public getReward:string = "";
			public showTag:number = 0;
        } 		        	
	}
}