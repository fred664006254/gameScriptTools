namespace Config {
    export namespace AcCfg {
        export class WealthComingCfg {
            /**展示时间 */
            public extraTime: number;
            /**每天免费次数 */
            public freeTimes: number;
            /**单抽消耗元宝，十连抽十倍 */
            public itemExpend: number;
            /**单抽增加财运，十连抽十倍 */
            public luckyAdd: number;
            /**十连抽折扣 */
            public discount: number;
            /**领取角色皮肤大奖所需财运值 */
            public needValue: number;
            /**大奖 */
            public prize: string;
            /**财运进度间隔 */
            public luckyProcess: number;
            /**文财神固定送 */
            public buyItem: string;
            /**武财神固定送 */
            public buyItem2: string;
            /**财神奖池 */
            public wealthGod: any;
            /**财运亨通奖池 */
            public cyhtPool: any;
            /**天降横财奖池 */
            public tjhcPool: any;
            /**财神驾到奖池 */
            public csjdPool: any;
            /**财运与触发概率关系 */
            public luckyRateItemCfgList: LuckyRateItemCfg[] = [];
            /**财运进度奖励奖池 */
            public rewardProcessItemCfgList: RewardProcessItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (let key in data) {
                    this[key] = data[key];
                    if (key == "luckyRate") {
                        this.luckyRateItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new LuckyRateItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.luckyRateItemCfgList.push(itemcfg);
                        }
                    }
                    if (key == "rewardProcess") {
                        this.rewardProcessItemCfgList.length = 0;
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new RewardProcessItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = String(i + 1);
                            this.rewardProcessItemCfgList.push(itemcfg);
                        }
                    }
                }
            }
            /**解析财神奖池 */
            public getWealthGod():string
            {
                let rewards = "";
                for(let key in this.wealthGod)
                {
                    rewards += this.wealthGod[key][0] + "|";
                }
                return rewards.substring(0,rewards.length - 1);
            }
        }
        /**
         * 财运与触发概率关系item
         */
        export class LuckyRateItemCfg extends BaseItemCfg {
            /**id */
            public id: string;
            /**财运范围 */
            public range: any;
            /**财运范围最小值 */
            public get minRange() {
                return this.range[0]
            }
            /**财运范围最小值 */
            public get maxRange() {
                return this.range[1]
            }
            /**财运亨通权重 */
            public cyht: number;
            /**天降横财权重 */
            public tjhc: number;
            /**财神驾到权重 */
            public csjd: number;
            /**不触发权重 */
            public dnTrigger: number;
        }
        /**
         * 财运进度奖励item
         */
        export class RewardProcessItemCfg extends BaseItemCfg {
            /**id */
            public id: string;
            /**排序用的 */
            public sortId:number;
            /**进度 */
            public value: number;
            /**进度奖励 */
            public getReward: string;
        }
    }
}