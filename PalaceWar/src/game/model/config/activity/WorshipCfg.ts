namespace Config {
    export namespace AcCfg {
        /**筑阁祭天活动cfg */
        export class WorshipCfg {
            /** 展示时间 */
            public extraTime: number = 0;
            /** 每次抽取额外赠送 */
            public freeGet: string = null;
            /** 每日免费次数 */
            public freeTime: number = 0;
            /** 每抽增加进度 */
            public addProcess: number = 0;
            /** 单抽消耗元宝 */
            public gemCost: number = 0;
            /** 十连抽折扣 */
            public discount: number = 0;
            /** 奖励展示 */
            public show: any = null;
            /** 抽奖暴击,奖励与进度都暴击 */
            public critical: any = null;
            /** 抽奖奖池 */
            public pool: any = null;
            /**活动期间的累计充值奖励 */
            public worshipRechargeItemCfgList: WorshipRechargeItemCfg[] = [];
            /**阶段奖励 */
            public worshipAchievementItemCfgList: WorshipAchievementItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "achievement") {
                        this.worshipAchievementItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new WorshipAchievementItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.worshipAchievementItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.worshipRechargeItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new WorshipRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.worshipRechargeItemCfgList.push(itemcfg);
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

            /**最大的进度 */
            public getMaxAchievementValue() {
                for (let key in this.worshipAchievementItemCfgList) {
                    if (this.worshipAchievementItemCfgList[key].id == this.worshipAchievementItemCfgList.length) {
                        return this.worshipAchievementItemCfgList[key].needNum;
                    }
                }

            }

        }
        /**活动期间的累计充值奖励 */
        export class WorshipRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需额度：单位（元宝） */
            public needGem: number;
            /**奖励 */
            public getReward: string;
        }

        /**活动期间，进度奖励 */
        export class WorshipAchievementItemCfg extends BaseItemCfg {
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