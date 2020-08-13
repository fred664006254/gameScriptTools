namespace Config {
    export namespace AcCfg {
        /**
        * 电玩大本营 的 cfg
        * @author 张朝阳
        * date 2019/6/3
        * @class ArcadeCfg
        */
        export class ArcadeCfg {
            /** 玩一次消耗X个代币 */
            public costCoin: number = 0;
            /** 共有X个图标 */
            public picNum: number = 0;
            /** 核心奖励展示 */
            public show: number = 0;
            /** 展示皮肤需要X元宝 */
            public showGem: number = 0;

            private poolList: any = null;
            /**任务列表 */
            public taskItemListCfg: ArcadeTaskItemCfg[] = [];
            /**充值列表 */
            public rechargeItemListCfg: ArcadeRechargeItemCfg[] = [];

            public poolListItemCfg: ArcadePoolItemCfg[] = [];

            public claimListItemCfg: ArcadeClaimItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[`${key}`] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ArcadeTaskItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemListCfg = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ArcadeRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "poolList") {
                        this.poolListItemCfg = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ArcadePoolItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.poolListItemCfg.push(itemcfg);
                        }
                    }
                    if (key == "claim") {
                        this.claimListItemCfg = [];
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new ArcadeClaimItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.claimListItemCfg.push(itemcfg);
                        }
                    }
                }
            }

            public getTaskValue(id: string): number {
                for (let i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id = this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].value;
                    }
                }
                return null;
            }
            /**分数 */
            public getScoreForType(type: string) {
                return this.poolList[type].moonCoin;
            }
        }
        /**
         * 活动期间的活跃任务   注：每日不重置
         */
        export class ArcadeTaskItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;
            /**跳转 */
            public openType: string = null;
			/**
			 * 任务类型
			 */
            public questType: string;
			/**
			 * 任务进度
			 */
            public value: number;
            /**特殊奖励 */
            public specialGift: number;
            /**奖励 */
            public getReward: string;

            public sortId: number;
        }
        /**
         * 充值的
         */
        export class ArcadeRechargeItemCfg extends BaseItemCfg {
            /**充值ID */
            public id: string;

            public sortId: number;
			/**
			 * 充值的需要金额数
			 */
            public needGem: number;
            /**奖励 */
            public getReward: string;

            public specialGift: string;

        }
        /**
         * 兑换
         */
        export class ArcadeClaimItemCfg extends BaseItemCfg {
            /**兑换ID */
            public id: string;

            public sortId: number;
			/**
			 * 消耗月亮币
			 */
            public costScore: number;
            /**道具 */
            public item: string;
            /**活动限购，无则无限制 */
            public limit: number;

        }
        /**
         * 奖池列表
         */
        export class ArcadePoolItemCfg extends BaseItemCfg {
            /**宝箱ID */
            public id: string;
            /**老虎机组合情况 */
            public numSet: number;
            /** 情况权重*/
            public weight: number
            /**获得后X次内不再随机到 */
            public gap: number
            /**使用一代币给予月亮币 */
            public moonCoin: number
            /**奖池 */
            public prizePool: any
            public rewardPoolList(): string {
                let rewards = "";
                for (let key in this.prizePool) {
                    rewards += this.prizePool[key][0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }

        }
    }
}