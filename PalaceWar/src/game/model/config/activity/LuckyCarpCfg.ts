namespace Config {
    export namespace AcCfg {
        /**锦鲤活动Cfg */
        export class LuckyCarpCfg {
            /**展示期 */
            public extraTime: number;
            /**充值奖励 */
            public rechargeReward: { getReward: string, needGem: number };
            /**锦鲤奖励 */
            public rewardItemListCfg: LuckyCarpRewardItemCfg[] = [];
            /**横幅插入处 */
            public flag: number;
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "luckyReward") {
                        this.rewardItemListCfg.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new LuckyCarpRewardItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rewardItemListCfg.push(itemcfg);
                        }
                    }
                }
            }
        }
        /**奖励item */
        export class LuckyCarpRewardItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;
            /**排序sortID */
            public sortId: number;
        	/**
        	 * 解锁充值元宝
        	 */
            public unlockValue: number;
            /**奖励 */
            public getReward: string;
            /**人物类型(1:红颜；2:门客；3:NPC) */
            public type: string;
            /**展示图片 */
            public picShowoff: string;
        }

    }
}