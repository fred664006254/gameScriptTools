namespace Config{
	/**
	 * 
	 * author qianjun
	 * @class 宝箱列表
	 */
	export namespace BoxCfg {
        let totalBox : Object = {};

		export function formatData(data: any): void {
            for(let key in data.totalBox){
                let itemCfg : BoxCfgItem;
                if(!totalBox.hasOwnProperty(String(key))){
                    totalBox[String(key)] = new BoxCfgItem();
                }
                itemCfg = totalBox[String(key)];
                itemCfg.initData(data.totalBox[key]);
                itemCfg.id = String(key);
            }
        }

        export function getBoxCfgById(boxid : string):BoxCfgItem{
            let cfg = totalBox[boxid];
            return cfg;
        }

	}

	export class BoxCfgItem extends BaseItemCfg {
		/**
		 * id
		 */
		public id: string;
		/**
		 * 品质
		 */
		public quality: number;
		
		/**
		 * 宝箱中金币  对应不同的level等级，超过最大值，取最大值
		 */
		public boxGold: number[];
		/**
		 * 宝箱中钻石数量   对应不同的level等级，超过最大值，取最大值
		 */
		public boxGem: number[];
		/**
		 * 宝箱中普通卡数量  和level等级有关
		 */
		public boxCard1Num: number[];
		/**
		 * 宝箱中普通卡单张卡数量不可超过 X  和level等级有关
		 */
		public boxCard1RandomMax: number[];
		/**
		 *宝箱中普通卡是否展示 1展示 0不展示
		 */
		public boxCard1Show: number;
		/**
		 * :宝箱中普通卡奖池    此字段有值，则优先在这个字段内随机，没值，则走骰子表中的随机规则
		 */
        public boxCard1Pool: any[];
        	/**
		 * 宝箱中普通卡数量  和level等级有关
		 */
		public boxCard2Num: number[];
		/**
		 * 宝箱中普通卡单张卡数量不可超过 X  和level等级有关
		 */
		public boxCard2RandomMax:number[];
		/**
		 *宝箱中普通卡是否展示 1展示 0不展示
		 */
		public boxCard2Show: number;
		/**
		 * :宝箱中普通卡奖池    此字段有值，则优先在这个字段内随机，没值，则走骰子表中的随机规则
		 */
        public boxCard2Pool: any[];
        		/**
		 * 宝箱中普通卡数量  和level等级有关
		 */
		public boxCard3Num: number[];
		/**
		 * 宝箱中普通卡单张卡数量不可超过 X  和level等级有关
		 */
		public boxCard3RandomMax: number[];
		/**
		 *宝箱中普通卡是否展示 1展示 0不展示
		 */
		public boxCard3Show: number;
		/**
		 * :宝箱中普通卡奖池    此字段有值，则优先在这个字段内随机，没值，则走骰子表中的随机规则
		 */
        public boxCard3Pool: any[];
        		/**
		 * 宝箱中普通卡数量  和level等级有关
		 */
		public boxCard4Num: number[];
		/**
		 * 宝箱中普通卡单张卡数量不可超过 X  和level等级有关
		 */
		public boxCard4RandomMax: number[];
		/**
		 *宝箱中普通卡是否展示 1展示 0不展示
		 */
		public boxCard4Show: number;
		/**
		 * :宝箱中普通卡奖池    此字段有值，则优先在这个字段内随机，没值，则走骰子表中的随机规则
		 */
		public boxCard4Pool: any[];

		/**
		 * :宝箱中传说卡数量  掉落几率   几率和等级相关   以 万 为基数
		 */
		public boxCard4Ratio: number[];

        
		/**
		 * 宝箱名称
		 */
		public get name():string{
			return LangMger.getlocal(`boxname_${this.id}`);
        }
        
        /**
		 * 宝箱icon
		 */
		public get icon():string{
			let iconstr = `itembox${this.id}`;
			if(!RES.hasRes(iconstr)){
				iconstr = `itembox1004`;
			}
			return iconstr;
		}

		/**
		 * 宝箱包含金币数
		 */
		public get goldNum():number{
			let num = 0;
			let level = Api.UserinfoVoApi.getLevel();
			if(this.boxGold && this.boxGold.length){
				let rid = Math.min(level, this.boxGold.length);
				num = this.boxGold[rid - 1];
			}
			return num;
		}

		/**
		 * 宝箱包含钻石数
		 */
		public get gemNum():number{
			let num = 0;
			let level = Api.UserinfoVoApi.getLevel();
			if(this.boxGem && this.boxGem.length){
				let rid = Math.min(level, this.boxGold.length);
				num = this.boxGem[rid - 1];
			}
			return num;
		}

		/**
		 * 各类型骰子获得数
		 */
		public getCardNumByType(type : number):number{
			let num = 0;
			let level = Api.UserinfoVoApi.getLevel();
			let rarr = this[`boxCard${type}Num`];
			if(rarr && rarr.length){
				let rid = Math.min(level, rarr.length);
				num = rarr[rid - 1];
			}
			return num;
		}

		/**
		 * 获取该类型的卡片是否有扩展气泡提示
		 */
		public getCardPoolShow(type : number):boolean{
			let flag = false;
			if(this[`boxCard${type}Show`] && this[`boxCard${type}Show`] == 1){
				flag = true;
			}
			return flag;
		}

		/**
		 * 获取该类型的卡片是否有几率获得显示
		 */
		public getCardRatioShow(type : number):boolean{
			let flag = false;
			if(this[`boxCard${type}Ratio`] && this[`boxCard${type}Ratio`].length){
				flag = true;
			}
			return flag;
		}

		/**
		 * 获取该类型的卡片是否有扩展气泡提示
		 */
		public getCardPool(type : number):string[]{
			// let arr = [`100_416_1`,`100_416_1`,`100_416_1`];
			let arr = [];
			if(this.getCardPoolShow(type)){
				if(this[`boxCard${type}Pool`]){
					let pool = this[`boxCard${type}Pool`];
					for(let i in pool){
						arr.push(pool[i][0]);
					}
				}
			}
			return arr;
		}
    }
}