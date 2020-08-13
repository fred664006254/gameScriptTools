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

	/**
	 * 是否已购买管家
	 */
	public ifBuyButler():boolean
	{
		if(this.shopVo.butler && this.shopVo.butler.et > GameData.serverTime)
		{
			return true;
		}
		return false;
	}
	public getButleret():number
	{
		return  this.shopVo.butler.et;
	}

	/**
	 * 是否已购买成长基金
	 */
	public ifBuyGrowGold():boolean
	{
		if(this.shopVo.growGold && this.shopVo.growGold.st  )//&& (this.shopVo.growGold.st+Config.GrowgoldCfg.maxShowTime*86400)>GameData.serverTime
		{
			return true;
		}
		return false;
	}

	public ifBuyGrowGoldTimeout():boolean
	{
		// if (this.shopVo.growGold.st  && (this.shopVo.growGold.st+Config.GrowgoldCfg.maxShowTime*86400)>GameData.serverTime)
		// {
			return false;
		// }
		// return true;
	}

	public isCanBuyGrowGold()
	{
		let regdt = Api.gameinfoVoApi.getRegdt();
		if( this.shopVo.growGold.lock != 1 )//GameData.serverTime - regdt <= 86400*Config.GrowgoldCfg.showTime &&
		{
			return true;
		}
		return false
	}

	/**
	 * 是否已领取全部成长基金
	 */
	public isGotAllGrowGold():boolean
	{
		let list = Config.GrowgoldCfg.task;
		for (let i=0; i<list.length; i++)
		{
			let onecfg = list[i];
			if (!this.isGotGrowGoldReward(onecfg.id))
			{
				return false;
			}
		}
		// let getts = this.shopVo.growGold.getts;
		// let endtime = App.DateUtil.getWeeTs(getts)+86400;
		// if(endtime < GameData.serverTime)
		// {
			return true;
		// }
		// return false
	}

	public isGotGrowGoldReward(id:number)
	{
		if (this.shopVo && this.shopVo.growGold && this.shopVo.growGold.flags[id])
		{
			return true;
		}
		return false;
	}


	public getVipRewardInfo(vipLevel:number):boolean
	{
		return this.shopVo?this.shopVo.vipInfo[vipLevel]:false;
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

	public getShowBuyMonthCard():boolean
	{
		if (this.shopVo.monthcard && this.shopVo.monthcard.notice==1)
		{
			return true;
		}
		return false;
	}

	public checkShowBuyMonthCard():void
	{
		if (this.getShowBuyMonthCard() && Api.rookieVoApi.curGuideKey !== "zhenqifang")
		{
			Api.viewqueueVoApi.checkShowView(ViewConst.COMMON.BUYMONTHCARDPOPUPVIEW);
		}
	}

	public checkShowGrowGold():boolean
	{
		//if (Api.switchVoApi.checkOpenGrowGold() && (Api.shopVoApi.ifBuyGrowGold() && this.ifBuyGrowGoldTimeout()==false || Api.shopVoApi.isCanBuyGrowGold()))
		if (Api.switchVoApi.checkOpenGrowGold() && Api.shopVoApi.isCanBuyGrowGold() || Api.shopVoApi.ifBuyGrowGold())
		{
			if (this.isGotAllGrowGold())
			{
				return false;
			}
			return true;
		}
		return false;
	}

	public checkGrowGoldRed():boolean
	{	
		if (!Api.shopVoApi.ifBuyGrowGold())
		{
			return false;
		}

		let list = Config.GrowgoldCfg.task;
		for (let i=0; i<list.length; i++)
		{
			let onecfg = list[i];
			if (!this.isGotGrowGoldReward(onecfg.id) && Api.playerVoApi.getPlayerLevel()>=onecfg.needLv)
			{
				return true;
			}
		}
		return false;
	}
	

	public getfourRateChargeth():boolean
	{
		if(this.shopVo.fourRateCharge_th==null)
		{
			return true;
		}
		return false ;
	}
	public dispose():void
	{
		super.dispose();
	}
}