namespace Config {
    export namespace AcCfg {
        /**
        * 金蛋赠礼 的 cfg
        * @author hyd
        * date 2019/9/4
        * @class SmashEggCfg
        */
        export class SmashEggCfg {

            public extraTime: number = 0;

            public freeTime: number = 0;

            public getScore: number = 0;

            public buy1: { cost: string, getReward: string } = null;

            public buy2: { cost: string, getReward: string } = null;

            public useItem: string = '';

            public goldenEggNum: number = 0;

            public goldenEggRatio: number = 0;

            public itemExchange: { '1': { costProof: string, getReward: string }, '2': { costProof: string, getReward: string } } = null;

            public normalEgg: any = null;

            public goldenEgg: any = null;

            public show: number;

            /**充值列表 */
            public achievementItemCfgList: SmashEggAchievementItemCfg[] = [];
            /**
             * 初始化数据
             */
            public formatData(data: any) {
                for (let key in data) {
                    this[key] = data[key];

                    if (key == "achievement") {
                        this.achievementItemCfgList = [];
                        for (let i = 0; i < data[key].length; i++) {
                            let itemCfg = new SmashEggAchievementItemCfg();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = Number(i + 1);
                            this.achievementItemCfgList.push(itemCfg);
                        }
                    }

                }
            }

            //获取元宝消耗 1:单次  2:十次
            public getCost(type:number){
                return GameData.formatRewardItem(this['buy'+type].cost)[0].num;
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

        /**活动期间，进度奖励 */
        export class SmashEggAchievementItemCfg extends BaseItemCfg {
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