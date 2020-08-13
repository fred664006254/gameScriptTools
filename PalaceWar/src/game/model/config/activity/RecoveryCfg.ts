namespace Config{
    export namespace AcCfg{
        /**
         * 万物复苏
         * author ycg
         * date 2020.2.26
         * @class RecoveryCfg
         */
        export class RecoveryCfg{
            public extraTime:number;
            public superp:number;
            public freeTime:number;
            public poolCfgList:RecoveryPoolItem[] = [];
            public achieveList:RecoveryAchieveItem[] =[];
            public rechargeList:RecoveryRechargeItem[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achieveList = [];
                        for (let k in data[key]){
                            let itemCfg = new RecoveryAchieveItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.achieveList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge"){
                        this.rechargeList = [];
                        for (let k in data[key]){
                            let itemCfg = new RecoveryRechargeItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "poolList"){
                        this.poolCfgList = [];
                        for (let k in data[key]){
                            let itemCfg = new RecoveryPoolItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;

                            let str = "";
                            let prize = data[key][k].prizePool;
                            for (let j in prize){
                                str += prize[j][0] + "|";
                            }
                            itemCfg.rewards = str.substring(0, str.length - 1);
                            this.poolCfgList.push(itemCfg);
                        }
                    }
                }
            }

            public getAchieveCfg():RecoveryAchieveItem[]{
                return this.achieveList;
            }

            public getRechargeCfg():RecoveryRechargeItem[]{
                return this.rechargeList;
            }

            public getPoolListCfg():RecoveryPoolItem[]{
                return this.poolCfgList;
            }
        }

        /**奖池 */
        class RecoveryPoolItem extends BaseItemCfg{
            public id:number = null;
            public shootSet:number;
            public weight:number;
            public gap:number;
            public rewards:string;
        }

        /**进度奖励item */
        export class RecoveryAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class RecoveryRechargeItem extends BaseItemCfg{
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