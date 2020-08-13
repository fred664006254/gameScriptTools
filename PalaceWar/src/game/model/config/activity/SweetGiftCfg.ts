namespace Config{
    export namespace AcCfg{
        /**
         * 甜美馈赠/月夜仙缘
         * author yangchengguo
         * date 2019.8.19
         * @namespace SweetGiftCfg
         */
        export class SweetGiftCfg{
            public extraTime:number;
            public freeTime:number;
            public cost:number;
            public discount:number;
            private moonCakeList:any[] = [];
            private rechargeList:any[] = [];
            private achievementList:any[] = [];
            private taskList:any[] = [];
            private exchangeList:any[] = [];
            public show1:number;
            public show2:number;

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "recharge"){
                        this.rechargeList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new SweerGiftRecharageItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.rechargeList.push(itemCfg);
                        }
                    }
                    else if (key == "achievement"){
                        this.achievementList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new SweerGiftAchievementItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.achievementList.push(itemCfg);
                        }
                    }
                    else if (key == "task"){
                        this.taskList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new SweerGiftTaskItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "shop"){
                        this.exchangeList = [];
                        for (let i = 0; i < data[key].length; i++ ){
                            let itemCfg = new SweerGiftExchangeItem();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.exchangeList.push(itemCfg);
                        }
                    }
                }
                this.moonCakeList = [];
                if (data.moonCake1){
                    this.moonCakeList.push(data.moonCake1);
                }

                if (data.moonCake2){
                    this.moonCakeList.push(data.moonCake2);
                }

                if (data.moonCake3){
                    this.moonCakeList.push(data.moonCake3);
                }
            }

            public getRechargeList(){
                return this.rechargeList;
            }

            public getAchievementList(){
                return this.achievementList;
            }

            public getTaskList():any{
                return this.taskList;
            }

            public getExchangeList():any{
                return this.exchangeList;
            }

            public getMoonCakeList():any{
                return this.moonCakeList;
            }
        }

        /**累充item */
        export class SweerGiftRecharageItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**充值金额 */
            public needGem:number = 0;
            /**充值奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**进度奖励item */
        export class SweerGiftAchievementItem extends BaseItemCfg{
            /**充值id */
            public id:string = null;
            /**所需分数 */
            public needNum:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**活动任务item */
        export class SweerGiftTaskItem extends BaseItemCfg{
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

        /**兑换商店item */
        export class SweerGiftExchangeItem extends BaseItemCfg{
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