namespace Config{
	/**
	 * 商店配置类
	 * author qianjun
	 * @class ShopCfg
	 */
	export namespace RoyalpassCfg {
        //解锁 皇家政令 所需充值档位
        let needRecharge = ``;
        //皇家政令
        let royalPass : Object = {};
		export function formatData(data: any): void {
            needRecharge = data.needRecharge;
            for(let key in data.royalPass){
                let itemCfg : DiscountShopItemCfg;
                if(!royalPass.hasOwnProperty(String(key))){
                    royalPass[String(key)] = new RoyalPassItemCfg();
                }
                itemCfg = royalPass[String(key)];
                itemCfg.initData(data.royalPass[key]);
                itemCfg.id = Number(key);
            }
        }

        export function getRoyalPassCfgList():RoyalPassItemCfg[]{
            let arr = [];
            for(let i in royalPass){
                arr.push(royalPass[i]);
            }
            return arr;
        }

        export function getRoyalPassCfgById(id : number):RoyalPassItemCfg{
            let cfg = royalPass[id];
            return cfg;
        }

        export function getRoyalPassMaxLevel():number{
            return Object.keys(royalPass).length;
        }

        export function getRechargeType():string{
            return needRecharge;
        }

        export function getNowProgressId(score? : number ,isScrid?:boolean):number{
            let id = 0;
            if(score == null || score == undefined || score == NaN){
                score = Api.UserinfoVoApi.getMaxScore();
            }
            let arr = getRoyalPassCfgList();
            for(let i = 0; i < arr.length; ++ i){
                let unit = arr[i];
                if(score >= unit.needScore){
                    id = unit.id;
                    if(isScrid){
                        if(Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 1) || 
                        (Api.GameinfoVoApi.getIsBuyRoyalPass() && Api.GameinfoVoApi.canGetRoyalPassRewardByLevel(id, 2))){
                            break;
                        }
                    }
                }
            }
            return id;
        }

        export function getNextNeedByScore(score : number):number{
            let need = 0;
            let id = getNowProgressId(score);
            let nextcfg = royalPass[id + 1];
            if(nextcfg){
                need = nextcfg.needScore;
            }
            return need;
        }

        export function getPrevNeedByScore(score : number):number{
            let need = 0;
            let id = getNowProgressId(score);
            let prevcfg = royalPass[id - 1];
            if(prevcfg){
                need = prevcfg.needScore;
            }
            return need;
        }
	}

	export class RoyalPassItemCfg extends BaseItemCfg {
		/**
		 * id
		 */
		public id: number;
		/**
		 * 所需奖杯数
		 */
		public needScore: number;
		/**
		 * 前端 特殊显示标记  标识1的档位，会特殊标记
		 */
		public show: number;
		/**
		 * 普通获得
		 */
		public primary: string;
		/**
		 * 获得金币 X 时，才会出此礼包
		 */
		public advanced: string;
    }

}