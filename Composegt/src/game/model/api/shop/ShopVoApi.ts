/**
 * 商店api
 * author dmj
 * date 2017/10/28
 * @class ShopVoApi
 */
class ShopVoApi extends BaseVoApi
{
	private shopVo:ShopVo;
	public constructor() 
	{
		super();
	}

	public getVersion()
	{
		return  String(this.shopVo.version);
	}
	public getst()
	{
		return  this.shopVo.st;
	}

	public getet()
	{
		return  this.shopVo.et;
	}
	/**
	 * 根据类型获取商店info数组
	 * @param type 
	 */
	public getShopInfoListByType(type:number):Array<any>
	{
		let arr:Array<any> = new Array();
		let vrson = this.getVersion()
		if(this.getet() < GameData.serverTime ){
			vrson = "0";
		}
		arr = Config.ShopCfg.getShopItemCfgListByType(type,vrson);

		//如果type == 3的时候  判断是否开启特殊礼包
		if(type == 3 && Api.switchVoApi.checkOpenSpecialGift()){
			// let specialArr = Config.ShopCfg.
			let specialArr = Config.SpecialgiftCfg.getShopItemCfgList();
			arr = arr.concat(specialArr);
		}


		return arr;
	}

	/**
	 * 根据商品id获取商品vo
	 * @param id 
	 */
	public getShopInfoVoById(id:number):ShopInfoVo
	{
		if(this.shopVo)
		{
			let shopInfoVoObj = this.shopVo.shopInfoVoObj;
			if(shopInfoVoObj && shopInfoVoObj[id.toString()])
			{
				return shopInfoVoObj[id.toString()];
			}
		}
		return null;
	}
	/**
	 * 通过商品id获取商品配置
	 * @param id 
	 */
	public getShopItemCfgById(id:number):Config.ShopItemCfg
	{
		let v = this.getVersion();
		if( Number(v) > 0 && this.getet() < GameData.serverTime)
		{
			v = "0"
		}
		return Config.ShopCfg.getShopItemCfgById(id,v);
	} 
	/**
	 * 从特殊配置中获取商品配置
	 */
	public getSpecialShopItemCfgById(id:number):Config.ShopItemCfg
	{
		return Config.SpecialgiftCfg.getShopItemCfgById(id);
	}
	
	/**
	 * 根据商品id获取该商品能够购买的次数
	 * @param id 商品id
	 */
	public getCanBuyNumById(id:number):number
	{
		let shopItemCfg = this.getShopItemCfgById(id);
		if(shopItemCfg.limitNum > 0)
		{
			let shopInfoVoObj = this.shopVo.shopInfoVoObj;
			if(shopInfoVoObj && shopInfoVoObj[id.toString()])
			{
				let num = shopItemCfg.limitNum - shopInfoVoObj[id.toString()].buyNum;
				return num < 0?0:num;
			}
		}
		return shopItemCfg.limitNum;
	}
	public getSpecialCanBuyNumById(id:number):number
	{
		let shopItemCfg = this.getSpecialShopItemCfgById(id);
		if(shopItemCfg.limitNum > 0)
		{
			let shopInfoVoObj = this.shopVo.specialShopInfoVoObj;
			if(shopInfoVoObj && shopInfoVoObj[id.toString()])
			{
				let num = shopItemCfg.limitNum - shopInfoVoObj[id.toString()].buyNum;
				return num < 0?0:num;
			}
		}
		return shopItemCfg.limitNum;
	}

	//获取已经购买过的次数
	public getNewShopBuyNumById(id:number):number
	{
		let buyNum=0; 
		if(this.shopVo&&this.shopVo.hinfo&&this.shopVo.hinfo[id])
		{
			 buyNum = this.shopVo.hinfo[id];
		}
		return buyNum;
	}



	public checkIfNeedRequest():boolean
	{
		if(this.shopVo.lastUpdateTime > 0 )
		{
			return true;
		}
		return false;
	}

	/**
	 * 充值type 0未充值过,1已首充,2已领取
	 */
	public getPayFlag():number
	{
		return this.shopVo?this.shopVo.payflag:0;
	}

	/**
	 * 判断玩家是否可以弹出首冲
	 * （根据充值状态以及是否拥有首冲奖励的门客）
	 */
	public isCanShowFirstCharge(): boolean {
		return this.getPayFlag() != 2 && Api.servantVoApi.getServantObj(this.firstChargeServantId.toString()) == null;
	}

	/**
	 * 获取首冲奖励的门客ID
	 */
	public get firstChargeServantId(): number {
		if(Api.switchVoApi.checkOpenFirstCharge6Times()){
			return Config.FirstchargeCfg.getRewServantD6();
		} else {
			return Config.FirstchargeCfg.getRewServantD4();
		}
	}


	//次充
// 	0或空    未次充，不能领次充奖励
// 1            已次充，能领奖
// 2            已领奖
	public getSecondRateCharge():number
	{
		return (this.shopVo && this.shopVo.secondRateCharge) ? this.shopVo.secondRateCharge : 0;
	}

	public getPayInfoById(id:string):boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay?this.shopVo.pay[id]:0);
	}

	public getPayInfoById2(id:string):any
	{
		return this.shopVo.pay[id];
	}
	
	/**
	 * 限时礼包 查看当前弹出打开的key
	 */
	public getPayShow():any
	{
		return this.shopVo.pay["show"];
	}
	/**
	 * 	限时礼包 查看当前红点key
	 * 
	 */
	public getPayRedpoint():any
	{
		return this.shopVo.pay["redpoint"];
	}

	//12元礼包1
	public getPayInfo1():boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay&&this.shopVo.pay["g9"]&&this.shopVo.pay["g9"].isbuy?this.shopVo.pay["g9"].isbuy:0);
	}
	//12元礼包2
	public getPayInfo2():boolean
	{
		return Boolean(this.shopVo&&this.shopVo.pay&&this.shopVo.pay["g10"]&&this.shopVo.pay["g10"].isbuy?this.shopVo.pay["g10"].isbuy:0);
	}

	//12元礼包1时间
	public getPayInfo1Time():number
	{
		let itemVo1 = Api.shopVoApi.getPayInfoById2("g9");
		let rechargeItemCfg = Config.RechargeCfg.getRechargeItemCfgByKey("g9");
		let lt = itemVo1.st + rechargeItemCfg.lastTime - GameData.serverTime


		return lt
	}

	/**
	 * 是否已经订阅了豪门
	 */
	public ifBuySpCard():boolean
	{
		if(!Api.switchVoApi.checkOpenSpCard()){
			return false;
		}
		let spCardCfg = this.shopVo.pay["g70"];
		if(spCardCfg && spCardCfg.et > GameData.serverTime){
			return true;
		}
		return false;
	}

	/**
	 * 是否已购买终身卡
	 */
	public ifBuyYearCard():boolean
	{
		if(this.shopVo.yearcard && this.shopVo.yearcard.et > GameData.serverTime)
		{
			return true;
		}
		return false;
	}

	/**
	 * 是否已购买月卡
	 */
	public ifBuyMonthCard():boolean
	{
		if(this.shopVo.monthcard && this.shopVo.monthcard.et > GameData.serverTime)
		{
			return true;
		}
		return false;
	}

	public getVipRewardInfo(vipLevel:number):boolean
	{
		return this.shopVo?this.shopVo.vipInfo[vipLevel]:false;
	}
	public getSpcardet():number
	{
		let spCardCfg = this.shopVo.pay["g70"];
		
		if(spCardCfg && spCardCfg.et){
			return spCardCfg.et;
		}
		return 0;

	}
	public getMonthcardet():number
	{
			return  this.shopVo.monthcard.et;
	}
	public getInterday():boolean
	{
		if(this.shopVo&&this.shopVo.hinfo)
		{
			if(Object.keys(this.shopVo.hinfo).length==0)
			{
				return true;
			}
			else
			{
				return false;
			}
		} 
	}

	public getfourRateCharge():boolean
	{
		if(this.shopVo.fourRateCharge==null)
		{
			return true;
		}
		return false ;
	}

	//有第三方支付
	public isWebPay():boolean
	{
		
		let isWebPay = false;
		for(let key in this.shopVo.pay)
		{
			let checkstr = key.substr(0,8);
			if(checkstr == "klwebpay")
			{
				isWebPay = true;
				break;
			}
		}
		return isWebPay;
		
		// return false;

	}

	public getOpenTimes()
	{
		return this.shopVo.opentime || 0;
	}
	public getMergeTimes()
	{
		return this.shopVo.mergezonetime || 0;
	}

	//3充
	// 	0或空    未次充，不能领次充奖励
	// 1            已次充，能领奖
	// 2            已领奖
	public getThreeRateCharge():number
	{
		let itemVo1 = Api.shopVoApi.getPayInfoById2("g71");
		return (itemVo1 && itemVo1.isget) ? itemVo1.isget : 0;
	}

	//4充
	// 	0或空    未次充，不能领次充奖励
	// 1            已次充，能领奖
	// 2            已领奖
	public getFourRateCharge():number
	{
		let itemVo1 = Api.shopVoApi.getPayInfoById2("g72");
		return (itemVo1 && itemVo1.isget) ? itemVo1.isget : 0;
	}

	public dispose():void
	{
		super.dispose();
	}
}