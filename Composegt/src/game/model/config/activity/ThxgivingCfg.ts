namespace Config {
    export namespace AcCfg {
        export class ThxgivingCfg {
            /**充值X元宝获得1次抽奖*/
            public cost:number;

            /**奖励红颜共浴场景ID*/
            public wifeBathSceneID:number;
            
            /**看板红颜ID*/
            public wifeID:number;
            
            /**看板红颜ID共浴场景碎片*/
            public chipID:number;
            
            /**1次抽奖获得数量*/
            public chipNum:number;

            /**兑换数量及持有上限*/
            public exchangeNum:number;

             /**活动期间，抽奖次数的进度奖励
            needNum：所需抽奖次数
            getReward：奖励*/
            public feastList:ThxgivingFeastItemCfg[];

            //解析数据
            public formatData(data: any): void {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this[key] = data[key];

                    }
                    if(key=="feast")
					{
                        this.feastList = [];
                         let i = 0;
                        for(let k in data[key])
                        {
                            let itemcfg = new ThxgivingFeastItemCfg();
                            itemcfg.initData(data[key][k])
                            itemcfg.id = String(i+1);
                            this.feastList.push(itemcfg);
                            i ++;
                        }
					}
                }
            }

            public getMaxBoxNeedNum () {
                return this.exchangeNum;
            }
			public getFeastList()
			{
				return this.feastList;
			}
        }
    
        export class ThxgivingFeastItemCfg extends BaseItemCfg
		{
			public id:string;
			/**
			 * 排名上下限
			 */
			public needNum:number;

			/**
			 * 奖励
			 */
			public getReward:string = "";
            
		
			public get rewardIcons():BaseDisplayObjectContainer[]
			{
				return GameData.getRewardItemIcons(this.getReward,true,false);
			}

			
		}

    }
}