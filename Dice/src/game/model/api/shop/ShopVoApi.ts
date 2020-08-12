/**
 * 商店voapi
 * author:qianjun
 */
namespace Api{
    export namespace ShopVoApi{
        let shopinfoVo:ShopInfoVo;
        let touchType : string;
        let cfgId : string|number;
        let isbuyRoyal : boolean = false;
        let isbox : boolean = false;
        let boxid : string = ``;
        let chargeid : string = ``;
        let lightType:string = "";

		export function formatData(data:any):void{
			if(!shopinfoVo){
				shopinfoVo = new ShopInfoVo();
			}
			shopinfoVo.initData(data);
        }
        
		export function dispose():void{
			if(shopinfoVo){
				shopinfoVo.dispose();
				shopinfoVo=null;
            }
            touchType = ``;
            cfgId = null;
            isbuyRoyal = false;
            isbox = false;
            boxid = ``;
            chargeid = ``;
            lightType = "";
        }

        export function setLightType(name:string) {
            lightType = name;
        }

        export function getLightType() {
            return lightType;
        }
        
        export function getTodayDailyShopList():Config.DailyShopItemCfg[]{
            let arr = [];
            for(let i in shopinfoVo.dailyshop){
                let unit : Config.DailyShopItemCfg = shopinfoVo.dailyshop[i];
                arr.push(unit);
            }
            return arr;
        }

        export function getTodayDiscountShopList():Config.DiscountShopItemCfg[]{
            let arr = [];
            let giftid = 2;
            if(shopinfoVo.gift && shopinfoVo.gift.id){
                giftid = shopinfoVo.gift.id;
            }

            let unit : Config.DiscountShopItemCfg = Config.ShopCfg.getDiscountShopCfgById(giftid);
            arr.push(unit);
            return arr;
        }

        export function getDiscountShopItem():Config.DiscountShopItemCfg{
            let giftid = 1;
            if(shopinfoVo.gift && shopinfoVo.gift.id){
                giftid = shopinfoVo.gift.id;
            }
            let unit : Config.DiscountShopItemCfg = Config.ShopCfg.getDiscountShopCfgById(giftid);
            return unit;
        }

        export function getTodayRefresLimitTime():number{
            let num = App.DateUtil.getWeeTs(GameData.getServerTime()) + 86400 - GameData.getServerTime();
            return num;
        }

        export function getPayInfoById(id:string):boolean{
            let flag = false;
            if(id == `g7`){
                flag = Api.GameinfoVoApi.getIsBuyAssitance();
            }
            else if(id == Config.RoyalpassCfg.getRechargeType()){
                flag = Api.GameinfoVoApi.getIsBuyRoyalPass();
            }
		    return flag;
        }
        
        export function setTouchType(type : string):void{
			touchType = type;
        }

        export function getTouchType():string{
			return touchType;
        }

        export function setTouchId(id : number|string):void{
			cfgId = id;
        }

        export function getTouchId():string|number{
			return cfgId;
        }

        export function setChargeId(id : string):void{
			chargeid = id;
        }

        export function getChargeId():string{
			return chargeid;
        }

        export function setIsBox(bool : boolean, id : string):void{
            isbox = bool;
            boxid = id;
        }

        export function getIsBox():boolean{
			return isbox;
        }

        export function getBoxId():string{
			return boxid;
        }

        export function setisbuyRoyal(flag : boolean):void{
			isbuyRoyal = flag;
        }

        export function getisbuyRoyal():boolean{
			return isbuyRoyal;
        }


        export function getTodayDailyShopHasBuyById(id:number):boolean{
            let flag = false;
            let unit : Config.DailyShopItemCfg = shopinfoVo.dailyshop[id];
            if(unit && unit.hasBuy == 1){
                flag = true;
            }
            return flag;
        }

        export function getTodayDiscountShopHasBuy():boolean{
            let flag = false;
            if(shopinfoVo.gift && shopinfoVo.gift.hasBuy && shopinfoVo.gift.hasBuy == 1){
                flag = true;
            }
            return flag;
        }

        export function getEmotionHasBuyById(id:number):boolean{
            let flag = false;
            if(shopinfoVo && shopinfoVo.expression && shopinfoVo.expression[id] && shopinfoVo.expression[id] == 1){
                flag = true;
            }
            return flag;
        }
    }
}