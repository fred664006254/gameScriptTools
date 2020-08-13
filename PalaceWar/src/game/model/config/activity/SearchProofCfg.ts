namespace Config {
    export namespace AcCfg {
        /**
        * 搜查魏府 的 cfg
        * @author 张朝阳
        * date 2019/6/3
        * @class ArcadeCfg
        */
        export class SearchProofCfg {

            public extraTime: number = 0;

            public freeTime: number = 0;

            public mustGet1: any = 0;

            public mustGet2: string = null;

            public itemExchange: any = null;

            public rewardPool: any = null;

            public exchange: string = null;

            public show: number;
            /**充值列表 */
            public rechargeItemListCfg: SearchProofRechargeItemCfg[] = [];

            /**充值列表 */
            public achievementItemCfgList: SearchProofAchievementItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[`${key}`] = data[key];

                    if (key == "recharge") {
                        this.rechargeItemListCfg = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new SearchProofRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }

                    if (key == "achievement") {
                        this.achievementItemCfgList = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new SearchProofAchievementItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i + 1);
                            this.achievementItemCfgList.push(itemcfg);
                        }
                    }
                }
            }

            /**奖池 */
            public rewardPoolList(): string {
                let rewards = "";
                for (let key in this.rewardPool) {
                    rewards += this.rewardPool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }
            /**最大的进度 */
            public getMaxAchievementValue() {
                for (let key in this.achievementItemCfgList) {
                    if (this.achievementItemCfgList[key].id == this.achievementItemCfgList.length) {
                        return this.achievementItemCfgList[key].needNum;
                    }
                }

            }
        }
        /**
         * 充值的
         */
        export class SearchProofRechargeItemCfg extends BaseItemCfg {
            /**充值ID */
            public id: string;

            public sortId: number;
			/**
			 * 充值的需要金额数
			 */
            public needGem: number;
            /**奖励 */
            public getReward: string;

            public special: string;

        }

        /**活动期间，进度奖励 */
        export class SearchProofAchievementItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需额度：单位（元宝） */
            public needNum: number;
            /**奖励 */
            public getReward: string;

        }

    }
}