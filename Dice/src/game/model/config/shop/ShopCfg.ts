namespace Config{
	/**
	 * 商店配置类
	 * author qianjun
	 * @class ShopCfg
	 */
	export namespace ShopCfg {
        //限定特价商店
        let discountShop : Object = {};
        //每日特别商店
        let dailyShop : Object = {};
        //皇家宝箱
        let specialBox : Object = {};
        //黄金购买
        let buyGold : Object = {};
        //表情符号
        let expressionGet : Object = {};
        

		export function formatData(data: any): void {
            for(let key in data.discountShop){
                let itemCfg : DiscountShopItemCfg;
                if(!discountShop.hasOwnProperty(String(key))){
                    discountShop[String(key)] = new DiscountShopItemCfg();
                }
                itemCfg = discountShop[String(key)];
                itemCfg.initData(data.discountShop[key]);
                itemCfg.id = Number(key);
            }

            for(let key in data.dailyShop){
                let itemCfg : DailyShopItemCfg;
                if(!dailyShop.hasOwnProperty(String(key))){
                    dailyShop[String(key)] = new DailyShopItemCfg();
                }
                itemCfg = dailyShop[String(key)];
                itemCfg.initData(data.dailyShop[key]);
                itemCfg.id = Number(key);
            }

            for(let key in data.specialBox){
                let itemCfg : SpecialBoxShopItemCfg;
                if(!specialBox.hasOwnProperty(String(key))){
                    specialBox[String(key)] = new SpecialBoxShopItemCfg();
                }
                itemCfg = specialBox[String(key)];
                itemCfg.initData(data.specialBox[key]);
                itemCfg.id = Number(key);
            }

            for(let key in data.buyGold){
                let itemCfg : BuyGoldShopItemCfg;
                if(!buyGold.hasOwnProperty(String(key))){
                    buyGold[String(key)] = new BuyGoldShopItemCfg();
                }
                itemCfg = buyGold[String(key)];
                itemCfg.initData(data.buyGold[key]);
                itemCfg.id = Number(key);
            }

            for(let key in data.expressionGet){
                let itemCfg : BuyExpressionShopItemCfg;
                if(!expressionGet.hasOwnProperty(String(key))){
                    expressionGet[String(key)] = new BuyExpressionShopItemCfg();
                }
                itemCfg = expressionGet[String(key)];
                itemCfg.initData(data.expressionGet[key]);
                itemCfg.id = Number(key);
            }
        }
        
        export function getSpecialBoxShopList():SpecialBoxShopItemCfg[]{
            let arr = [];
            for(let i in specialBox){
                arr.push(specialBox[i]);
            }
            let max = arr.length;
            arr.sort((a,b)=>{
                if(a.id == max){
                    return -1;
                }
                else if(b.id == max){
                    return 1;
                }
                else{
                    return a.id - b.id;
                }
            });
            return arr;
        }

        export function getSpecialBoxCfgById(id : number):SpecialBoxShopItemCfg{
            let cfg = specialBox[id];
            return cfg;
        }

        export function getDiscountShopCfgById(id : number):DiscountShopItemCfg{
            let cfg = discountShop[id];
            return cfg;
        }

        /**
         * 根据cost值获取礼包名
         */
        export function getDiscountNameByCost(cost: string): string {
            let __name: string = "";
            for (var k in discountShop) {
                if (discountShop[k].cost == cost) {
                    __name = LangMger.getlocal(`shopdiscountItemName${k}`);
                    break;
                }
            }
            if (__name == "**") {
                __name = "";
            }
            return __name
        }

        export function getDailyShopFreeRewardById(id : number, index : number, diceId : string):{num : number, type : string, boxId : string, costNum : number, costType : string}{
            let unit = dailyShop[index];
            let num = 1;
            let type = ``;
            let boxId = ``;
            let costNum = 0;
            let costType = ``;
            //商品类型 1宝箱 2金币 3钻石 4-7卡片
            if(id == 1){
                type = `box`;
                boxId = unit.boxId;
                costType = unit.boxCostGem ? `gem` : `gold`;
                costNum = unit.boxCostGem ? unit.boxCostGem : unit.boxCostGold;
            }
            else if(id == 2){
                type = `gold`;
                num = unit.gold;
            }
            else if(id == 3){
                type = `gem`;
                num = unit.gem;
            }
            else{
                type = `dice`;
                costType = `gold`;
                costNum = unit[`card${Math.floor(Number(diceId)/100)}Cost`];
            }
            return {num : num, type : type, boxId : boxId, costType : costType, costNum : costNum};
        }

        export function getBuyGoldShopList():BuyGoldShopItemCfg[]{
            let arr = [];
            for(let i in buyGold){
                arr.push(buyGold[i]);
            }
            return arr;
        }

        export function getBuyGoldCfgById(id : number):BuyGoldShopItemCfg{
            let unit = buyGold[id];
            return unit;
        }

        export function getBuyExpressionShopList():BuyExpressionShopItemCfg[]{
            let arr = [];
            for(let i in expressionGet){
                arr.push(expressionGet[i]);
            }
            return arr;
        }

        export function getBuyExpressionCfgById(id:number):BuyExpressionShopItemCfg{
            return expressionGet[id];
        }
	}

	export class DiscountShopItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 付费档位
		 */
		public cost: string;
		/**
		 * 显示价值倍数   原价显示：cost 档位价格 * value
		 */
		public value: number;
		/**
		 * 随机权重
		 */
		public weight: number;
		/**
		 * 注册 X 天后，才会随机到此礼包
		 */
		public needDay: number;
		/**
		 * 传说卡种类小于等于 X 时，才会出此礼包
		 */
		public needCardType: number;
		/**
		 * 拥有 X 传说卡时，才会出此礼包
		 */
		public needCard: number;
		/**
		 * 礼包内，金币数量，有可能没有，没有则不显示
		 */
		public gold:number = 0;
		/**
		 * 礼包内，钻石数量，有可能没有，没有则不显示
		 */
        public gem:number = 0;
        /**
		 * 礼包内，固定卡牌
		 */
        public card:number = 0;
        /**
		 * 宝箱ID
		 */
        public boxId:string = ``;
        
		/**
		 * 商品名称
		 */
		public get name():string {
			return "";
		}
    }

    export class DailyShopItemCfg extends BaseItemCfg {
		/**
		 * //商品类型 1宝箱 2金币 3钻石 4-7卡片
		 */
		public id: number;
		/**
		 * //卡片数量
		 */
		public num: number;
		/**
		 * 是否购买 0否 1已购
		 */
		public hasBuy: number;
		/**
		 * 骰子ID
		 */
		public diceId: string;
    }
    
    export class SpecialBoxShopItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 钻石消耗
		 */
		public costGem: number;
		/**
		 * 打折后价格
		 */
		public costGem1: number;
		/**
		 * 随机权重
		 */
        public boxId: string;

        public get name():string{
            return LangMger.getlocal(`boxname_${this.boxId}`);
        }
    }
    
    export class BuyGoldShopItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 钻石消耗
		 */
		public costGem: number;
		/**
		 * 获得金币数量
		 */
		public goldGet: number;
    }
    
    export class BuyExpressionShopItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 钻石消耗
		 */
		public costGem: number;
		/**
		 * 表情的ID
		 */
		public expressionId: string[];
	}
}