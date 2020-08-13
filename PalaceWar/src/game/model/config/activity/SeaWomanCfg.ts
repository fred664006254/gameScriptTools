namespace Config
{
	export namespace AcCfg
	{
		export class SeaWomanCfg 
		{
            /**展示时间 */
            public extraTime:number = 0;
            /**每充值x元宝获得一次翻牌次数 */
            public cost:number = 0;
            /**每日免费次数 */
            public freeTime:number = 0;
            /**兑换奖励及所需道具数量 */
            public change:Object = null;

            private seaPool:any = null;
            private seaPool2:any = null;

             /**翻牌次数进度奖励 */
            public chessNum: SeaWomanChessNumItemCfg[] = [];

            public formatData(data: any): void {
                for (var key in data) {
                    if (key == "chessNum") {
                        this.chessNum = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new SeaWomanChessNumItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = i + 1;
                            this.chessNum.push(itemcfg);
                        }
                    }
                    else
                    {
                        this[`${key}`] = data[key];
                    }
                }
            }

            public getPlayAwards(): any[] 
            {
                return [this.seaPool,this.seaPool2];
            }
        }

        
        export class SeaWomanChessNumItemCfg extends BaseItemCfg {
            
            public id: number;

			/**
			 * 翻牌次数进度奖励
			 */
            public needNum: number;
            /**奖励 */
            public getReward: string;
            public sortId:number = 0;

        }
    }
}