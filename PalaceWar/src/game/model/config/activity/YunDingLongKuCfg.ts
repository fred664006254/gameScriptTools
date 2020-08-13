namespace Config
{
	export namespace AcCfg
	{
		export class YunDingLongKuCfg 
		{
            /** 展示时间 */
            public extraTime : number = 0;

            public battleUseItemCfgList:YunDingLongKuBattleUseItemCfg[]= [];

            public battleItemCfgList:YunDingLongKuBattleItemCfg[] = [];
            /**
             * 初始化数据
             */
			public formatData(data:any):void
			{
			 	for(var key in data)
				{
					this[key]=data[key];
                    if(key=="battleUse")
                    {
                        this.battleUseItemCfgList = [];
                        for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new BattleUseItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.battleUseItemCfgList.push(itemcfg);
                        }
                    }
                    if(key=="battleList")
                    {
                        this.battleItemCfgList = [];
                        for(let i = 0;i < data[key].length;i++)
                        {
                            let itemcfg = new BattleItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i+1);
                            this.battleItemCfgList.push(itemcfg);
                        }
                    }
				}
            }
		}
        /**
         * 消耗的
         */
        export class YunDingLongKuBattleUseItemCfg extends BaseItemCfg
		{
            /**ID */
			public id:string;
			/**
			 * 花费
			 */
			public gemCost:number;
            /**活动得分 */
            public getScore:number;
            /**奖池 */
            public drawPool:any[];
            /**奖励 */
            public get drawPoolReward()
            {
                let rewardStr:string = "";
                for(let i = 0;i<this.drawPool.length;i++)
                {
                    if(i == this.drawPool.length - 1)
                    {
                        rewardStr += this.drawPool[i][0]
                    }
                    else
                    {
                        rewardStr += this.drawPool[i][0] + "|";
                    }
                    
                }
                return rewardStr;
            }

		}
        export class YunDingLongKuBattleItemCfg extends BaseItemCfg
		{
            /**iD */
			public id:string;
			/**
			 * 击杀分数
			 */
			public killPoint:number;
            /**奖励 */
            public getReward:string;

		}
	}
}