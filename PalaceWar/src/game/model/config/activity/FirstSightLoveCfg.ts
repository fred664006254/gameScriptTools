namespace Config
{
	export namespace AcCfg
	{
       /**
        * 女优活动 依见钟情
         */
		export class FirstSightLoveCfg 
		{
            public extraTime:number;
            /**第一个页签 礼包商店 */
            public festivalList1:FirstSightLoveFestivalItem1[];
            /**第二个页签 礼包商店 */
            public festivalList2:FirstSightLoveFestivalItem2[];
            /**第二个也页签开启所需等级 */
            public needLv:number;
            /**报名抽奖的倾心值限制 */
            public favorNeed:number;
            /**抽奖人数 */
            public lotteryNum:number;

            public formatData(data:any):void{
                for (let key in data){
                    this[key] = data[key];
                    if (key == "festival1"){
                        this.festivalList1 = [];
                        for (let i = 0; i < data[key].length; i++){
                            let itemCfg = new FirstSightLoveFestivalItem1();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.festivalList1.push(itemCfg);
                        } 
                    }
                    else if (key == "festival2"){
                        this.festivalList2 = [];
                        for (let i = 0; i < data[key].length; i++){
                            let itemCfg = new FirstSightLoveFestivalItem2();
                            itemCfg.initData(data[key][i]);
                            itemCfg.id = String(i+1);
                            this.festivalList2.push(itemCfg);
                        }
                    }
                }
            }
        }

        export class FirstSightLoveFestivalItem1 extends BaseItemCfg{
            public id:string;
            public sortId:number;
            /**每日购买限制 */
            public limit:number;
            /**原价 */
            public originalCost:number;
            /**调用充值档位 */
            public cost:string;
            /**折扣 */
            public discount:number;
            /**消耗元宝 */
            public needGem:number;
            /**增加倾心值 */
            public addFavor:number;
        }

        export class FirstSightLoveFestivalItem2 extends BaseItemCfg{
            public id:string;
            public sortId:number;
            /**特殊标识 */
            public isSpecial:number;
            /**解锁所需倾心值 */
            public needFavor:number;
            /**领取所需倾心值 */
            public needFavor1:number;
            /**奖励 */
            public getReward:string;
        }
    }
}