namespace Config
{
	/**
	 * 商店配置类
	 * author dmj
	 * date 2017/10/28
	 * @class ShopCfg
	 */
	export namespace ShopCfg 
	{
		//检查购买物品的时候是否需要弹出消费提示框的元宝阈值
		//大于等于这个值 显示消费提示框
		export let buyItemCheckVal = 600;

		export let buyItemNum = 5;

		let shopItemList: Object = {};
		export function formatData(data: any): void 
		{
			for (var key in data) 
			{
				
				if (!shopItemList.hasOwnProperty(String(key))) 
				{
					shopItemList[String(key)] = {};
					
				}
				let innerData =  data[key];
				for (var key2 in innerData ) {
					let shopItemCfg: ShopItemCfg = shopItemList[String(key)][key2];
					if(!shopItemCfg)
					{
						shopItemCfg = new ShopItemCfg();
						shopItemList[String(key)][key2] = shopItemCfg;
					}
					shopItemCfg.initData(innerData[key2]);
					shopItemCfg.id = Number(key2);
				}
			}
		}
		/**
		 * 通过商品id获取单个商品配置
		 * @param id 商品id
		 */
		export function getShopItemCfgById(id: number,version:string): ShopItemCfg 
		{	
			if (id == 4001)
			{
				return Config.Signup500dayCfg.shopCfg;
			}
			else if (id == 6101){
				return Config.Sixsection1Cfg.shopCfg;
			}
			return shopItemList[version][String(id)];
		}
		/**
		 * 获取类型获取页签配置
		 * @param sheetType 
		 */
		export function getShopItemCfgListByType(sheetType:number,version:string):Array<ShopItemCfg>
		{
			let arr:Array<ShopItemCfg> = new Array();
			let tmpV = version;
			for(let key in shopItemList[tmpV])
			{
				if(sheetType == shopItemList[tmpV][key].sheetType)
				{
					arr.push(shopItemList[tmpV][key]);
				}
			}
			if (sheetType==3 && Api.arrivalVoApi.isShowed500Rewards())
			{
				arr.push(Config.Signup500dayCfg.shopCfg);
			}
			if (sheetType==3 && Api.sixsection1VoApi.isOpenSixSection1()){
				arr.push(Config.Sixsection1Cfg.shopCfg);
			}
			return arr;
		}
	}

	export class ShopItemCfg extends BaseItemCfg 
	{
		/**
		 * 商品id
		 */
		public id: number;
		/**
		 * 类型  类型 1.单品限购  2.特惠礼包
		 */
		public sheetType: number;
		/**
		 * 购买限制 {限制类型，限制数量} key1: 限制类型：-1 无限制 1 日限制 2 周限制 key2: 限制数量：-1 无限制,  x 限制的具体数量
		 */
		public limit: any;
		/**
		 * 排序
		 */
		public sortId: number;
		/**
		 * 内容和数量
		 */
		public content: string;
		/**
		 * 实际购买的价格
		 */
		public buyCost: number;
		/**
		 * 购买所需Vip等级
		 */
		public needVip: number;
		/**
		 * 折扣
		 */
		public discount:number = 0;
		/**
		 * 道具原价
		 */
		public preCost:number = 0;
		public shopGiftName:number = 0;
		/**
		 * 商品名称
		 */
		public get name():string 
		{
			if(this.shopGiftName > 0)
			{
				return LanguageManager.getlocal("shopGiftName" + this.shopGiftName); 
			}
			let tmpId = String(this.id);
			if(this.sheetType == 3)
			{
				tmpId = App.StringUtil.splitString(this.content,"_")[1];
			}
			return LanguageManager.getlocal("itemName_" + tmpId);
		}
		
		/**
		 * 限制类型 -1 无限制 1 日限制 2 周限制
		 */
		public get limitType():number
		{
			return this.limit[0];
		}
		/**
		 * 限制数量 -1 无限制,  x 限制的具体数量
		 */
		public get limitNum():number
		{
			return this.limit[1];
		}
		/**
		 * 限购数描述
		 */
		public get limitNumDesc():string
		{
			return LanguageManager.getlocal("shopLimitBuy",[this.limitNum.toString()]);
		}
		/**
		 * 获取显示内容列表
		 */
		public get contentList():Array<RewardItemVo>
		{
			if(this.sheetType == 3)
			{
				// let contentId = App.StringUtil.splitString(this.content,"_")[1];
				// let itemcfg = Config.ItemCfg.getItemCfgById(contentId);
				// let rewards = itemcfg.getRewards;
				let rewards =  this.content;
				let voList = Api.acVoApi.getActivityVoListByAid("punish");
				if(voList.length > 0)
				{
					for (var id in voList) {
						let acVo = <AcPunishVo>voList[id];
						let code = acVo.code
						if(code > 1 && acVo.isDuringActive )
						{
							if(rewards.search("_180") )
							{
								let changeReward = Config.AcCfg.getCfgByActivityIdAndCode("punish",code).changeReward;
								let rewardTab = rewards.split("|");
								for (var index = 0; index < rewardTab.length; index++) {
									let element = rewardTab[index];
									if(element.search("_180") > 0)
									{
										let tmpT = App.StringUtil.splitString(element,"_");
										let tmpId = Number(tmpT[1])
										if(changeReward[tmpT[1]])
										{
											tmpT[1] = changeReward[tmpT[1]]
										}
										rewardTab[index] = tmpT.join("_");
									}
								}
								rewards = rewardTab.join("|");
							}
						}
					}
				}

				return GameData.formatRewardItem(rewards);
			}
			return GameData.formatRewardItem(this.content);
		}
		/**
		 * 购买需要vip等级限制描述
		 */
		public get needVipDesc():string
		{
			if(this.needVip > 0)
			{
				return LanguageManager.getlocal("shopVipLimit",[this.needVip.toString()]);
			}
			return "";
		}

		/**
		 * 折扣描述
		 */
		public get discountDesc():string
		{
			return LanguageManager.getlocal("discountTitle",[this.discount*10+""]);
		}
	}
}