namespace Config
{
	export namespace AcCfg
	{
		export class CrossServerGemExpendCfg 
		{
			public type:number = 11101;
                  public rankList:GemExpendItemCfg[] = [];
                  public extraTime: number = 0;

                  public formatData(data:any):void
                  {
                        if(data.extraTime){
                              this.extraTime = data.extraTime;
                        }
                       this.rankList = [];
                        let i = 0;
                        for(let k in data.rankList)
                        {
                            let itemcfg = new GemExpendItemCfg();
                            itemcfg.initData(data.rankList[k])
                            itemcfg.id = String(i+1);
                            this.rankList.push(itemcfg);
                            i ++;
                        }
                  }

                  public getRankList()
			{
				return this.rankList;
			}


	      }
	}

      export class GemExpendItemCfg extends BaseItemCfg
      {
            /**充值档位ID */
            public id:string;
            /**
             * 名次范围
             */
            public rank = {};
            /**
             * 充值奖励
             */
            public reward:string;

             public formatData(data:any):void
            {
                  for(var key in data){
                        this[key]=data[key];
                  }
            }
            public get rewardIcons():BaseDisplayObjectContainer[]
            {
                  return GameData.getRewardItemIcons(this.reward,true,false);
            }

      }

}