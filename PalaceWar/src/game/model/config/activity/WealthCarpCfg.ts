namespace Config {
    export namespace AcCfg {
        /**彩蛋活动Cfg */
        export class WealthCarpCfg {
            /**展示期 */
            public extraTime: number;
            /**彩蛋奖励 */
            public rewardItemListCfg: WealthCarpRewardItemCfg[] = [];
            /**核心奖励id */
            public corePrize:string;
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "wealthReward") {
                        this.rewardItemListCfg.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new WealthCarpRewardItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rewardItemListCfg.push(itemcfg);
                        }
                    }
                }
            }
        }
        /**奖励item */
        export class WealthCarpRewardItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;
            /**排序sortID */
            public sortId: number;
        	/**
        	 * 解锁充值元宝
        	 */
            public needGem: number;
            /**奖励1---达到充值即可领取。4个*/
            public getReward1: string;

            /**奖励2-- 最后抽取的奖励*/
            public getReward2: string;
        }

    }
}