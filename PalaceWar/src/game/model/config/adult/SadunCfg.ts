namespace Config {
	/**
	 * 亲家配置类
	 * author qianjun
	 * date 2017/10/30
	 * @class SadunCfg
	 */
	export namespace SadunCfg {

		/**
		 * --成为亲家所需联姻次数
		 */
		export let needNum:number;
		/**
		 * --同一时间段派往同一位亲家的子嗣数量上限
		 */
        export let maxDispatch:number;
        /**
		 * --一名子嗣可以派往的亲家数量上限
		 */
        export let maxVisit:number;
        /**
		 * --玩家同时可发起的拜访数量上限
		 */
        export let maxSend:number;
         /**
		 * --玩家同时可接受的拜访数量上限
		 */
        export let maxReception:number;
        /**
		 * --拜访过程持续时间（单位：秒）
		 */
        export let visitNeedTime:number;
        /**
		 * --每个红颜每日可接待次数
		 */
        export let maxWifeReception:number;
         /**
		 * --拜访消耗道具数量
		 */
        export let visitNeedGift:any;
          /**
		 * --取消拜访或拜访被回避返还道具比例
		 */
        export let discount:any;
        /**
		 * --子嗣拜访获得的基础属性（不同身份子嗣获得属性不相同）子嗣武力、智力、政治、魅力各增加 baseEffect，详细公式在红颜接待处
		 *{25,50,75,125,175,250,375},
         */
        export let baseEffect:any;
        /**
		 * --子嗣联姻可以提供的友好度（子嗣身份越高，联姻提供的友好度越高
		 *{1,2,3,4,5,6,7},
         */
        export let friendSupply:any;
        
         /**
		 * --属性加成系数（只有一方子嗣拜访过的情况）
         */
        export let addExtent1:number;
          /**
		 * --属性加成幅度（互访子嗣联姻的情况下）
         */
		export let addExtent2:number;
		 /**
		--红颜接待效果
		--addExtent  加成幅度  子嗣拜访后属性 = 子嗣属性 + baseEffect + 子嗣属性 * addExtent   向下取整  例：子嗣拜访后武力 = 子嗣拜访前武力 + baseEffect + 子嗣拜访前武力 * （1 + addExtent）
		**/
		export let receptionEffectList:any;
		 /**
		eedFriendliness  所需友好度  注：达成亲家，才有友好度
		**/
		export let friendlinessList:any;

		let itemList: Object = {};
		export function formatData(data: any): void {
            for(let k in data){
                this[k] = data[k];
            }
            // for (var key in data.adultQuality) {
			// 	let itemCfg: AdultItemCfg;
			// 	if (!itemList.hasOwnProperty(String(key))) {
			// 		itemList[String(key)] = new AdultItemCfg();
			// 	}
			// 	itemCfg = itemList[String(key)];
			// 	itemCfg.initData(data.adultQuality[key]);
			// }
			// this.lastTime = data.lastTime;
			// this.freshGem = data.freshGem;
		}
		// /**
		//  * 通过子嗣品质获取单个子嗣配置
		//  * @param id 道具id
		//  */
		// export function getItemCfgById(id: number): AdultItemCfg {
		// 	return itemList[String(id)];
		// }
	}

	// export class AdultItemCfg extends BaseItemCfg {
	// 	/**
	// 	 * 子嗣成年后身份   1:童生 2:秀才 3:举人 4：进士 5：探花 6：榜眼 7：状元
	// 	 */
	// 	public quality: number;
	// 	/**
	// 	 * needGem：联姻所需元宝
	// 	 */
	// 	public needGem: number;
	// 	/**
	// 	 * 联姻所需的道具   道具和元宝二选一
	// 	 */
	// 	public needItem: string;
	// 	/**
	// 	 * 自己取消提亲返还的元宝数  道具直接返还，元宝返还部分
	// 	 */
	// 	public returnGem: number;
		
		
	// }

}