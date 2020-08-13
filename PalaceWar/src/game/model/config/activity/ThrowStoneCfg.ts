namespace Config{
    export namespace AcCfg{
        /**
         * 投石破敌
         * author yangchengguo
         * date 2019.8.27
         * @namespace ThrowStoneCfg
         */
        export class ThrowStoneCfg{
            public extraTime:number;
            public freeTime:number;
            public show1:number;
            public show2:number;
            public scoreGet:number[] = [];
            private poolRewards:string = null;
            private rechargeList:ThrowStoneRecharageItem[] = [];
            private achievementList:ThrowStoneAchievementItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new ThrowStoneRecharageItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(k);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement"){
                        this.achievementList = [];
                        for (let k in data[key]){
                            let itemCfg = new ThrowStoneAchievementItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = String(k);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "pool"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
                
            }

            public getRechargeList():ThrowStoneRecharageItem[]{
                return this.rechargeList;
            }

            public getAchievementList():ThrowStoneAchievementItem[]{
                return this.achievementList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        /**累充item */
        export class ThrowStoneRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            /**特殊物品 */
            public specialGift:number = 0;
            public sortId:number = 0;
        }

        /**进度奖励item */
        export class ThrowStoneAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**活动任务item */
        export class ThrowStoneTaskItem extends BaseItemCfg{
            /**id */
            public id:string = null;
            /**任务类型*/
            public questType:number = 0;
            /**跳转类型 */
            public openType:string = null;
            /**进度 */
            public value:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**商店item */
        export class ThrowStoneShopItem extends BaseItemCfg{
            /**id */
            public id:string = null;
            /**折扣 */
            public discount:number = 0;
            /**限购*/
            public limit:number = 0;
            /**需要道具 */
            public needGem:string = null;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}