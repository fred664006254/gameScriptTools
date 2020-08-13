namespace Config{
    export namespace AcCfg{
        /**
         * 新服预约
         * author ycg
         * date 2020.6.28
         * @class NewAppointCfg
         */
        export class NewappointCfg{
            public extraTime:number;
            private giftList:NewappoinGiftItem[] =[];
            private taskList:NewappoinTaskItem[] = [];
            private shopList:NewappoinShopItem[] = [];

            public formatData(data:any){
                App.LogUtil.log("NewappointCfg format");
                for (let key in data){
                    this[key] = data[key];
                    if (key == "giftBag"){
                        this.giftList = [];
                        for (let k in data[key]){
                            let itemCfg = new NewappoinGiftItem();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k) + 1;
                            this.giftList.push(itemCfg);
                        }
                    }
                    else if (key == "task"){
                        this.taskList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new NewappoinTaskItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.taskList.push(itemCfg);
                        }
                    }
                    else if (key == "shop"){
                        this.shopList = [];
                        for(let k in data[key])
                        {
                            let element = data[key][k];
                            let itemCfg = new NewappoinShopItem();
                            itemCfg.initData(element);
                            itemCfg.id = Number(k) + 1;
                            this.shopList.push(itemCfg);
                        }
                    }
                }
                
            }

            public getGiftListCfg():NewappoinGiftItem[]{
                return this.giftList;
            }

            public getTaskListCfg():NewappoinTaskItem[]{
                return this.taskList;
            }

            public getShopListCfg():NewappoinShopItem[]{
                return this.shopList;
            }
        }

        /**gift item */
        export class NewappoinGiftItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需分数 */
            public needDay:number = 0;
            /**奖励 */
            public getReward:string = null;
            public sortId:number = 0;
        }

        /**gift item */
        export class NewappoinTaskItem extends BaseItemCfg{
            /**id */
            public id:number = 0;
            /**任务类型  1预约成功 2连续登陆x次 */
            public taskType:number = 0;
            /**任务需求值 */
            public taskValue:number = 0;
            /**奖励 */
            public getScore:number = 0;
            public sortId:number = 0;
        }

        /**gift item */
        export class NewappoinShopItem extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**限购次数 */
            public limitTime:number = 0;
            /**花费积分 */
            public costScore:number = 0;
            public getReward:string = null;
            public sortId:number = 0;
        }
    }
}