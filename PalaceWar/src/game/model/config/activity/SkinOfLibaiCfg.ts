namespace Config{
    export namespace AcCfg{
        /**
         * 酒神诗仙
         * author yangchengguo
         * date 2020.2.18
         * @namespace SkinOfLibaiCfg
         */
        export class SkinOfLibaiCfg{
            public extraTime:number;
            public show:number;
            public freeTime:number;
            public consume1:number;
            public addProcess:number;
            public poolRewards:string;
            public critical:any;
            public achieveList:SkinOfLibaiAchieveItem[] =[];
            public rechargeList:SkinOfLibaiRechargeItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new SkinOfLibaiAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new SkinOfLibaiRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k);
                            this.rechargeList.push(itemCfg);
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

            public getAchieveCfg():SkinOfLibaiAchieveItem[]{
                return this.achieveList;
            }

            public getRechargeCfg():SkinOfLibaiRechargeItem[]{
                return this.rechargeList;
            }

            public getPoolRewards():string{
                return this.poolRewards;
            }
        }

        /**进度奖励item */
        export class SkinOfLibaiAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public specialnum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class SkinOfLibaiRechargeItem extends BaseItemCfg{
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