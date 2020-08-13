namespace Config
{
	export namespace AcCfg
	{
		export class KnightCfg 
		{
            public extraTime:number = 0;
			public show:number;

            private achieveList:KnightAchieveItem[] = [];
            private rechargeList:KnightRechargeItem[] = [];
			private poolRewards:string = null;

			public formatData(data:any):void
            {
				for (let key in data)
				{
					this[key] = data[key];
					if (key == "recharge")
					{
						for (let k in data[key])
						{
							let item = new KnightRechargeItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.rechargeList.push(item);
						}
					}
					else if (key == "achievement")
					{
						for (let k in data[key])
						{
							let item = new KnightAchieveItem();
							item.initData(data[key][k]);
							item.id = Number(k) + 1;
							this.achieveList.push(item);
						}
					}
					else if (key == "poolList")
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

			public get cost1():number
			{
				return 1;
			}
			public get cost10():number
			{
				return 10;
			}
			public getAchieveList():KnightAchieveItem[]
			{
				return this.achieveList;
			}
			public getRechargeList():KnightRechargeItem[]
			{
				return this.rechargeList;
			}	
            public getPoolRewards():string{
                return this.poolRewards;
            }					
		}

		export class KnightRechargeItem extends BaseItemCfg
        {
            public id:number;
            public needGem:number;
            public getReward:string; 
			public specialGift:number;
			public sortId:number = 0;
        }
        export class KnightAchieveItem extends BaseItemCfg
		{
            public id:number = null;
            public npcHp:number = 0;
            public getReward:string;
            public sortId:number = 0;
        }		
	}
}