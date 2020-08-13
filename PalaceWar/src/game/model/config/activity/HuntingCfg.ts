namespace Config{
    export namespace AcCfg{
        /**
         * 东郊狩猎
         * author yangchengguo
         * date 2019.8.5
         * @namespace HuntingCfg
         */
        export class HuntingCfg{
            /**展示时间 */
            public extraTime:number = 0;
            /**每日免费次数 */
            public freeTime:number = 0;
            /**核心奖励 */
            public show:number = 0;
            /**箭的基础伤害 */
            public attack:number = 0;
            /**不同位置对应的伤害 */
            public multiple:number[] = [];
            /**奖池奖励 */
            public poolList:Object[] = [];
            /** 击杀奖励*/
            private achievementList:HuntingAchievementItem[] = [];
            /**累计充值奖励 */
            private rechargeList:any[] = [];

            public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                    if (key == "achievement"){
                        this.achievementList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new HuntingAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "recharge"){
                        this.rechargeList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new HuntingRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                }
            }

            public getHuntingPoolReward():string{
                let rewards:string = "";
                for (let key in this.poolList){
                    rewards += this.poolList[key][0] + "|";
                }
                return rewards.substring(0,rewards.length - 1);
            }

            /**击杀奖励 */
            public getAchievementList():HuntingAchievementItem[]{
                return this.achievementList;
            }

            /**累计充值奖励 */
            public getRechargeList():HuntingRecharageItem[]{
                return this.rechargeList;
            }
        }

        /**击杀item */
        export class HuntingAchievementItem extends BaseItemCfg{
            /**动物id */
            public id:string = null;
            /**动物的血量 */
            public npcHp:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**累充item */
        export class HuntingRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**充值金额 */
            public needGem:number = 0;
            /**特殊奖励 */
            public specialGift:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}
