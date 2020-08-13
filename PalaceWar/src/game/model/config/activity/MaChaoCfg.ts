namespace Config {
    export namespace AcCfg {
        export class MaChaoCfg {
            /**展示期 */
            public extraTime: number;
            /** 单抽一次的价格 */
            public cost: number;
            /**单抽获得道具 */
            public getReward: string;
            /** 连续购买十次的折扣 */
            public discount: number;
            /** 奖励池类型1 */
            public typePool1: any;

            /** 排行榜入榜最低次数 */
            public rankNeedNum: number = 0;
            /**任务list */
            public taskItemListCfg: MaChaoTaskItemCfg[] = [];
            /**充值list */
            public rechargeItemListCfg: MaChaoRechargeItemCfg[] = [];
            /**排行榜list */
            public rankItemListCfg: MaChaoRankItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "task") {
                        this.taskItemListCfg = [];
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new MaChaoTaskItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.taskItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.rechargeItemListCfg = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new MaChaoRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }
                    if (key == "rankReward") {
                        this.rankItemListCfg = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new MaChaoRankItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rankItemListCfg.push(itemcfg);
                        }
                    }
                }
                console.log('1');
            }

            /**
             * 获得奖励
             */
            public getChargeRewardById(id): any {
                // if (this._recharge[id]) {
                //     return this._recharge[id];
                // }
                // else {
                //     return null;
                // }
            }
            /**
             * 获得任务的openType
             */
            public getTaskType(id: string): string {
                for (let i = 0; i < this.taskItemListCfg.length; i++) {
                    if (id == this.taskItemListCfg[i].id) {
                        return this.taskItemListCfg[i].openType;
                    }
                }
                return null;

            }
            public getRewardIcon(): string {
                return this.getReward;
            }
            /**奖池 */
            public getRewardPool()
            {
                let rewards = "";
                for(let key in this.typePool1)
                {
                    rewards += this.typePool1[key][0] + "|";
                }
                return rewards.substring(0,rewards.length - 1);
            }
        }
        /**任务item */
        export class MaChaoTaskItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;

            public openType: string = null;
			/**
			 * 任务类型
			 */
            public questType: number;
			/**
			 * 任务进度
			 */
            public value: number;
            /**奖励 */
            public getReward: string;

            public sortId: number;
        }
        /**充值item */
        export class MaChaoRechargeItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;

            public sortId: number;
			/**
			 * 任务类型
			 */
            public needGem: number;
            /**奖励 */
            public getReward: string;

        }
        /**充值item */
        export class MaChaoRankItemCfg extends BaseItemCfg {
            /**任务ID */
            public id: string;
			/**
			 * 任务类型
			 */
            public rank: any;
            /**奖励 */
            public getReward: string;
            /**最大 */
            public get maxRank() {
                return this.rank[1];
            }
            /**最小 */
            public get minRank() {
                return this.rank[0];
            }

        }
    }
}