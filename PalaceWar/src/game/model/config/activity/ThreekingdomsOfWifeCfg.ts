namespace Config{
    export namespace AcCfg{
        /**
         * 三国活动2 
         * author yangchengguo
         * date 2020.2.10
         * @namespace ThreekingdomsOfWifeCfg
         */
        export class ThreekingdomsOfWifeCfg{
            public extraTime:number;
            public show:number;
            public freeTime:number;
            public consume1:number;
            public addProcess:number;
            public poolRewards:string;
            public achieveList:ThreekingdomsOfWifeAchieveItem[] =[];
            public rechargeList:ThreekingdomsOfWifeRechargeItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new ThreekingdomsOfWifeAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k)+1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new ThreekingdomsOfWifeRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k)+1;
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList"){
                        let str = "";
                        for (let k in data[key]){
                            str += data[key][k][0] + "|";
                        }
                        this.poolRewards = str.substring(0, str.length - 1);
                    }
                }
            }

            public getAchieveCfg():ThreekingdomsOfWifeAchieveItem[]{
                return this.achieveList;
            }

            public getRechargeCfg():ThreekingdomsOfWifeRechargeItem[]{
                return this.rechargeList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        /**进度奖励item */
        export class ThreekingdomsOfWifeAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public specialnum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class ThreekingdomsOfWifeRechargeItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需额度 */
            public needGem:number = 0;
            /**物品数量 */
            public specialGift:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}