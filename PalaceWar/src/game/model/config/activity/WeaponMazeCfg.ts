namespace Config{
    export namespace AcCfg{
        /**
         * 神器迷宫
         * author ycg
         * date 2020.4.23
         * @namespace WeaponMazeCfg
         */
        export class WeaponMazeCfg{
            public extraTime:number;
            public coreReward:string;
            public freeTime:number;
            private pumpkinPool1:any;
            private pumpkinPool2:any;
            public coreReward1:any;
            private _rechargeCfgList:WeaponMazeRechargeItem[] = [];
            private _achieveCfgList:WeaponMazeAchieveItem[] = [];
            private _poolRewardsList:any[] = [];

            public formatData(data: any): void {
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this._rechargeCfgList = [];
                        for (let k in data[key]){
                            let item = new WeaponMazeRechargeItem();
                            item.initData(data[key][k]);
                            item.id = Number(k)+1;
                            this._rechargeCfgList.push(item);
                        }
                    }
                    else if (key == "schedule"){
                        this._achieveCfgList = [];
                        for (let k in data[key]){
                            let item = new WeaponMazeAchieveItem();
                            item.initData(data[key][k]);
                            item.id = Number(k)+1;
                            this._achieveCfgList.push(item);
                        }
                    }
                }

                //奖池
                let poolCfg:any[] = [];
                let poolStr2 = "";
                for (let k in this.pumpkinPool2){
                    poolStr2 += this.pumpkinPool2[k][0] + "|";
                }
                let str2 = poolStr2.substring(0, poolStr2.length - 1);
                let poolData2 = {rewards: str2, type: 1};
                poolCfg.push(poolData2);

                let poolStr = "";
                for (let k in this.pumpkinPool1){
                    poolStr += this.pumpkinPool1[k][0] + "|";
                }
                let str1 = poolStr.substring(0, poolStr.length - 1);
                let poolData1 = {rewards: str1, type: 2};
                poolCfg.push(poolData1);
                
                this._poolRewardsList = poolCfg;
            }

            public getRechargeCfgList():WeaponMazeRechargeItem[]{
                return this._rechargeCfgList;
            }

            public getAchieveCfgList():WeaponMazeAchieveItem[]{
                return this._achieveCfgList;
            }

            public getPoolRewards():any[]{
                return this._poolRewardsList;
            }
        }

        /**进度奖励item */
        export class  WeaponMazeAchieveItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**充值奖励item */
        export class  WeaponMazeRechargeItem extends BaseItemCfg{
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