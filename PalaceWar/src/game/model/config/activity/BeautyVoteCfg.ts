namespace Config {
    export namespace AcCfg {
        /**花魁活动cfg */
        export class BeautyVoteCfg {
            /** 展示时间 */
            public extraTime: number = 0;
            /**官品限制 */
            public lvLimit: number = 0;
            /**每日免费花朵数 */
            public freeVote: number = 0;
            /** 献花1朵后获得积分 */
            public getScore: number = 0;
            /**充值元宝与鲜花兑换比例，10比1 */
            public exchange: number = 0;
            /**每日元宝购买花朵次数 */
            public limit: number = 0;
            /**元宝购买价格 */
            public cost: any = 0;
            /**每次元宝购买获得花朵数量 */
            public getNum: number = 0;
            /**活动时间表 */
            public beautyVoteScheduleItemCfgList: BeautyVoteScheduleItemCfg[] = [];
            /**活动期间的每日充值奖励 */
            public beautyVoteRechargeItemCfgList: BeautyVoteRechargeItemCfg[] = [];
            /**积分商城 */
            public beautyVoteScoreMarketItemCfgList: BeautyVoteScoreMarketItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (var key in data) {
                    this[key] = data[key];
                    if (key == "schedule") {
                        this.beautyVoteScheduleItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BeautyVoteScheduleItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteScheduleItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "recharge") {
                        this.beautyVoteRechargeItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BeautyVoteRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteRechargeItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "scoreMarket") {
                        this.beautyVoteScoreMarketItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new BeautyVoteScoreMarketItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.beautyVoteScoreMarketItemCfgList.push(itemcfg);
                        }
                    }
                }
            }
            /**单个时间表 */
            public getSingleScheduleTimeforId(roundId: number): BeautyVoteScheduleItemCfg {
                for (let i = 0; i < this.beautyVoteScheduleItemCfgList.length; i++) {
                    if (this.beautyVoteScheduleItemCfgList[i].id == roundId) {
                        return this.beautyVoteScheduleItemCfgList[i];
                    }
                }
                return null;
            }
        }
        /**活动时间表 */
        export class BeautyVoteScheduleItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**开始时间 */
            public startTime: number;
            /**结束时间 */
            public endTime: number;
        }

        /**活动期间的每日充值奖励 */
        export class BeautyVoteRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需额度：单位（元宝） */
            public needGem: number;
            /**特殊奖励 */
            public specialGift: number;
            /**奖励 */
            public getReward: string;

        }

        /**积分商城（投放一个头像框） */
        export class BeautyVoteScoreMarketItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**购买次数限制 */
            public limit: number;
            /**折扣 */
            public discount: number;
            /**购买分数 */
            public costScore: number;
            /**商品内容 */
            public goods: string;

        }
    }
}