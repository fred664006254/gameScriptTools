namespace Config {
    export namespace AcCfg {
        /**诸葛亮传活动cfg */
        export class LiangBiographyCfg {
            /** 展示时间 */
            public extraTime: number = 0;
            /**每日免费回忆次数 */
            public freeTimes: number = 0
            /**每次七星灯增加进度值 */
            public addValue: number = 0;
            /**每次七星灯增加进度值 */
            public exchange: string = null;
            /**大奖展示 */
            public show: number = 0;
            /**奖励补发转换。一个七星灯转换一个孔明灯 */
            public pool: any = null;
            /**活动期间的累计充值奖励 */
            public liangBiographyRechargeItemCfgList: LiangBiographyRechargeItemCfg[] = [];
            /**阶段奖励 */
            public liangBiographyProcessingRewardItemCfgList: LiangBiographyProcessingRewardItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "processingReward") {
                        this.liangBiographyProcessingRewardItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new LiangBiographyProcessingRewardItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.liangBiographyProcessingRewardItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.liangBiographyRechargeItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new LiangBiographyRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.liangBiographyRechargeItemCfgList.push(itemcfg);
                        }
                    }
                }
            }
            /**奖池 */
            public rewardPoolList(): string {
                let rewards = "";
                for (let key in this.pool) {
                    rewards += this.pool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }
            /**最大奖池数量 */
            public maxProcessValue() {
                return this.liangBiographyProcessingRewardItemCfgList[this.liangBiographyProcessingRewardItemCfgList.length - 1].reviewTime;
            }

            public getProcessingRewardItemCfgById(id: number) {
                for (let i = 0; i < this.liangBiographyProcessingRewardItemCfgList.length; i++) {
                    let itemCfg = this.liangBiographyProcessingRewardItemCfgList[i];
                    if (itemCfg.id == id) {
                        return itemCfg;
                    }
                }
            }


        }
        /**活动期间的累计充值奖励 */
        export class LiangBiographyRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需额度：单位（元宝） */
            public needGem: number;
            /**获得七星灯 */
            public specialGift: number;
            /**奖励 */
            public getReward: string;
        }

        /**阶段奖励 */
        export class LiangBiographyProcessingRewardItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**回顾进度 */
            public reviewTime: number;
            /**奖励 */
            public getReward: string;

        }


    }
}