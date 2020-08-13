namespace Config
{
	export namespace AcCfg
	{
        export class AnniversaryShop2020Cfg 
        {
            /**
             * 折扣商店
             * date 2019.11.28
             * author ycg
             */
            public itemId:string;
            public exchangeGem:number;
            public shop1DataList:any[] = [];
            public shop2DataList:any[] = [];

            public formatData(data:any){
                for (let key in data){
                    this[key] = data[key];
                    if (key == "shop1List"){
                        this.shop1DataList = [];
                        for (let k in data[key]){
                            let item = new AnniversaryShop2020Item();
                            item.initData(data[key][k]);
                            item.id = k;
                            this.shop1DataList.push(item);
                        }
                    }
                    else if (key == "shop2List"){
                        this.shop2DataList = [];
                        for (let k in data[key]){
                            let item = new AnniversaryShop2020Item();
                            item.initData(data[key][k]);
                            item.id = k;
                            this.shop2DataList.push(item);
                        }
                    }
                }
            }

            public getShop1Cfg(){
                return this.shop1DataList;
            }

            public getShop2Cfg(){
                return this.shop2DataList;
            }

            public getShopCfgById(id:string, type:number):AnniversaryShop2020Item{
                let data = this.shop1DataList;
                if (type == 2){
                    data = this.shop2DataList;
                }
                for (let i = 0; i < data.length; i++){
                    if (data[i].id == id){
                        return data[i];
                    }
                }
                return null;
            }
        }

        export class AnniversaryShop2020Item extends BaseItemCfg{
            public id:string = null;
            public sortId:number = 0;
            public giftTpye:number;
            public showType:number;
            public price:number;
            /**折扣 */
            public rebate:number;
            /**代金券折扣上限 */
            public maxDiscount:number;
            /**限购类型 */
            public limitType:number;
            public limit:number;
            public item:string;
        }
    }
}