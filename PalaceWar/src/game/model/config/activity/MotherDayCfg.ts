namespace Config {
    export namespace AcCfg {
        export class MotherDayCfg {
            /**展示时间 */
            public extraTime: number;
            /**献花奖池 */
            public pool: any;
            /**花盆权重列表 */
            public drawingControl: any;
            /**活动期间，献花宝箱奖励。从右上角开始数。 */
            public achievement: any;
            /**感恩大奖 */
            public bigPrize: any;
            /**活动期间的累计充值奖励 */
            public recharge: any;
            /**兑换场景所需碎片数 */
            public exchangeScene: any;

            /**充值列表 */
            public rechargeItemListCfg: MotherDayRechargeItemCfg[] = [];

            /**充值列表 */
            public dailyTaskItemCfgList: {} = {};
            // MotherDayDailyTaskItemCfg[] 
            /**商店 */
            private shopCfgList: MotherDayShopItemCfg[] = [];

            /**
             * 初始化数据
             */
            public formatData(data: any): void {
                for (let key in data) {
                    this[key] = data[key];

                    if (key == "recharge") {
                        this.rechargeItemListCfg = []
                        for (let i = 0; i < data[key].length; i++) {

                            let itemcfg = new MotherDayRechargeItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.rechargeItemListCfg.push(itemcfg);
                        }
                    }

                    if (key == "shop") {
                        this.shopCfgList = []
                        for (let i = 0; i < data[key].length; i++) {
                            let itemcfg = new MotherDayShopItemCfg();
                            itemcfg.initData(data[key][i])
                            itemcfg.id = Number(i) + 1;
                            this.shopCfgList.push(itemcfg);
                        }
                    }
                    if (key == "dailyTask") {
                        this.dailyTaskItemCfgList = {};
                        for (let i = 0; i < data[key].length; i++) {
                            let dailyTaskCfg: MotherDayDailyTaskItemCfg[] = [];
                            for (let j = 0; j < data[key][i].length; j++) {
                                let itemcfg = new MotherDayDailyTaskItemCfg();
                                itemcfg.initData(data[key][i][j])
                                itemcfg.id = Number(j) + 1;
                                dailyTaskCfg.push(itemcfg);
                            }
                            this.dailyTaskItemCfgList[String(i + 1)] = dailyTaskCfg;
                        }
                    }
                }
            }

            public getShopCfgList(code): MotherDayShopItemCfg[] {
                let shopCfg: MotherDayShopItemCfg[] = [];
                for (let i = 0; i < this.shopCfgList.length; i++) {
                    let itemVo = GameData.formatRewardItem(this.shopCfgList[i].getReward)[0];
                    let itemVo2 = GameData.formatRewardItem(this.shopCfgList[i].needPart)[0];
                    if (!itemVo) {
                        continue;
                    }
                    if (itemVo2) {
                        //这个场景如果没有获得显示这些配置
                        let sceneid = Number(code) == 7 ? `105` : `104`;
                        if ((!Api.otherInfoVoApi.isHasSceneNotAboutUnlock(sceneid, "homeScene")) && itemVo2.type == 6) {
                            continue;
                        }
                    }
                    shopCfg.push(this.shopCfgList[i]);
                }
                return shopCfg;
            }
            /**解析翻牌奖池 */
            public getWealthGod(): string {
                let rewards = "";
                for (let i in this.pool) {
                    let unit = this.pool[i];
                    rewards += unit[0] + "|";
                }
                return rewards.substring(0, rewards.length - 1);
            }

            public getSkinBone(code): string {
                let cfg = null;
                let skinId = this.getSkin(code);
                switch (Number(code)) {
                    case 1:
                    case 2:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
                        break;
                    // case 2:
                    //     cfg = Config.ServantskinCfg.getServantSkinItemById(skinId);
                    //     break;
                }
                return cfg.bone ? cfg.bone : '';
            }

            public getSkinName(code): string {
                let cfg = null;
                let skinId = this.getSkin(code);
                switch (Number(code)) {
                    case 1:
                    case 2:
                        cfg = Config.WifeskinCfg.getWifeCfgById(skinId);
                        break;
                }
                return cfg.name ? cfg.name : '';
            }

            public getSkin(code): string {
                let skin = '';
                switch (Number(code)) {
                    case 1:
                    case 2:
                        skin = `2081`;
                        break;
                    case 5:
                        skin = `1071`;
                        break;
                    case 6:
                        skin = `2122`;
                        break;
                }
                return skin;
            }
        }

        /**每日任务 */
        export class MotherDayDailyTaskItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**任务类型 */
            public questType: string;
            /**任务参数*/
            public value: number;
            /**任务跳转 */
            public openType: string;
            /**特殊奖励 */
            public specialReward: number;
            /**奖励 */
            public getReward: string;

        }
        /**兑换商店 */
        export class MotherDayShopItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**折扣 */
            public discount: number;
            /**奖励 */
            public getReward: string;
            /**限购 */
            public limit: number;
            /**需要道具数量 */
            needPart: string;

        }

        /**累计充值奖励 */
        export class MotherDayRechargeItemCfg extends BaseItemCfg {
            /**id */
            public id: number;
            /**sortId */
            public sortId: number;
            /**所需额度*/
            public needGem: number;
            /**特殊奖励 */
            public specialGift: number;
            /**奖励 */
            public getReward: string;
        }
    }
}