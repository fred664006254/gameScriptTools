namespace Config {
    export namespace AcCfg {
        /**投壶活动cfg */
        export class ThrowArrowCfg {
            /** 展示时间 */
            public extraTime: number = 0;

            public superp: number = 0;

            public throwArrowPoolListItemCfgList: ThrowArrowPoolListItemCfg[] = [];

            public throwArrowAchievementItemCfgList: ThrowArrowAchievementItemCfg[] = [];

            public throwArrowRechargeItemCfgList: ThrowArrowRechargeItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "recharge") {
                        this.throwArrowRechargeItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ThrowArrowRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowRechargeItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "achievement") {
                        this.throwArrowAchievementItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ThrowArrowAchievementItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowAchievementItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "poolList") {
                        this.throwArrowPoolListItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ThrowArrowPoolListItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.throwArrowPoolListItemCfgList.push(itemcfg);
                        }
                    }
                }
            }

            public getLotteryType(shootSet: string[]) {
                for (let key in this.throwArrowPoolListItemCfgList) {
                    if (shootSet[0] == this.throwArrowPoolListItemCfgList[key].shootSet[0] && shootSet[1] == this.throwArrowPoolListItemCfgList[key].shootSet[1]
                        && shootSet[2] == this.throwArrowPoolListItemCfgList[key].shootSet[2]) {
                        return this.throwArrowPoolListItemCfgList[key].id;
                    }
                }
                return null;
            }
            /**最大的进度 */
            public getMaxAchievementValue() {
                for (let key in this.throwArrowAchievementItemCfgList) {
                    if (this.throwArrowAchievementItemCfgList[key].id == this.throwArrowAchievementItemCfgList.length) {
                        return this.throwArrowAchievementItemCfgList[key].needNum;
                    }
                }
            }
        }
        /**奖池列表 */
        export class ThrowArrowPoolListItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需抽奖次数 */
            public shootSet: any;
            /**情况权重 */
            public weight: string;
            /**奖池 */
            public prizePool: any;

        }

        /**进度奖励 */
        export class ThrowArrowAchievementItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需抽奖次数 */
            public needNum: number;
            /**奖励 */
            public getReward: string;

        }

        /**活动期间的累计充值奖励 */
        export class ThrowArrowRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**特殊奖励 */
            public specialGift: number;
            /**所需充值进度 */
            public needGem: number;
            /**奖励 */
            public getReward: string;

        }
    }
}