namespace Config{
    export namespace AcCfg{
        /**
         * 财神祝福
         * author yangchengguo 
         * date 2020.2.13
         * @namespace BlessingOfMammonCfg
         */
        export class BlessingOfMammonCfg{
            public boxListData:BlessingOfMammonBoxItemCfg[] = [];
            public extraTime:number;
            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "boxList"){
                        this.boxListData = [];
                        for (let k in data[key]){
                            let itemCfg = new BlessingOfMammonBoxItemCfg();
                            itemCfg.initData(data[key][k]);
                            itemCfg.id = Number(k)+1;
                            this.boxListData.push(itemCfg);
                        }
                    }
                }
            }

            public getBoxListCfg():BlessingOfMammonBoxItemCfg[]{
                return this.boxListData;
            }
        }

        /**进度奖励item */
        export class BlessingOfMammonBoxItemCfg extends BaseItemCfg{
            /**id */
            public id:number = null;
            /**所需额度 */
            public needGem:string = null;
            /**奖励 */
            public getReward:string = null;
            public gemDrop:any = {};
            public sortId:number = 0;
        }
    }
}