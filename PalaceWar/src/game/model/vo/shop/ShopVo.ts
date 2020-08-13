/**
 * 商店vo
 * author dmj
 * date 2017/10/28
 * @class ShopVo
 */
class ShopVo extends BaseVo
{
	// 数据上次更新时间
	public updated_at:number = 0;
	// 道具列表
	public shopInfoVoObj:Object = null;
	/**vip奖励领取信息
	 * 格式为{viplevel:1} 1是已领取，否则是未领取
	 */
	public vipInfo:Object = null;
	/**充值购买信息{gemType充值档位:1} */
	public pay:any = null;
	/**是否首冲过 0未首冲 1已首冲 2已领取*/
	public payflag:number = 0;
	/**月卡购买{et=月卡结束时间，gett=月卡上次领取时间} */
	public monthcard:{et:number,gett:number,notice:number} = null;
	/**年卡购买{et=年卡结束时间，gett=年卡上次领取时间 */
	public yearcard:{et:number,gett:number} = null;
	/**管家购买{et=管家结束时间，gett=管家上次领取时间 */
	public butler:{et:number,gett:number} = null;
	/**成长基金购买*/
	public growGold:any = null;
	/**上次更新数据时间戳，前端维护 */
	public lastUpdateTime:number = 0;
	public sinfo:any = null; //记录版本信息
	public version:number=0;
	public st:number=0;
	public et:number=0;
	public hinfo:any=null;
	public fourRateCharge=null;
	public fourRateCharge_th=null;
	public constructor() 
	{
		super();
	}

	public initData(data:any):void
	{
		if(data)
		{
			this.lastUpdateTime = GameData.serverTime;
			if(data.updated_at != null)
			{
				this.updated_at = Number(data.updated_at);
			}
			if(data.vipinfo != null)
			{
				this.vipInfo = data.vipinfo;
			}
			if(data.pay != null)
			{
				this.pay = data.pay;

				//调用限时礼包自动强弹
				Api.limitedGiftVoApi.autoOpenLimitedGiftWin();

				
			}
			if(data.payflag != null)
			{
				this.payflag = Number(data.payflag);
			}
			if(data.monthcard != null)
			{
				this.monthcard = data.monthcard;
			}
			if(data.butler != null)
			{
				this.butler = data.butler;
			}
			if(data.yearcard != null)
			{
				this.yearcard = data.yearcard;
			}
			if(data.growGold != null)
			{
				this.growGold = data.growGold;
			}
			
			if(data.info)
			{
				if(data.info.version != null)
				{
					this.version = data.info.version;
				}
				if(data.info.st)
				{
					this.st = data.info.st;
				}
				if(data.info.et)
				{
					this.et = data.info.et;
				}
				if(this.shopInfoVoObj == null)
				{
					this.shopInfoVoObj = {};
				}
				if(data.info.hinfo)
				{
					this.hinfo =data.info.hinfo;
				}
				if(data.info.fourRateCharge)
				{
					this.fourRateCharge = data.info.fourRateCharge;
				}
				if(data.info.fourRateCharge_th)
				{
					this.fourRateCharge_th = data.info.fourRateCharge_th;
				}
				if(this.hinfo==null||(Object.keys(this.hinfo).length==0))
				{
					App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_SHOP_NEXTDAY); 
				}
				
				if(Object.keys(data.info.sinfo).length==0)
				{
					this.shopInfoVoObj = {};
				}

				for(var key in data.info.sinfo)
				{
					if(this.shopInfoVoObj[key])
					{
						this.shopInfoVoObj[key].initData({id:Number(key),num:data.info.sinfo[key]});
					}
					else
					{
						let shopInfoVo:ShopInfoVo = new ShopInfoVo();
						shopInfoVo.initData({id:Number(key),num:data.info.sinfo[key]});
						this.shopInfoVoObj[key] = shopInfoVo;
					}
					
				}
			}
		}
	}
	public dispose():void
	{
		this.updated_at = 0;
		if(this.shopInfoVoObj)
		{
			for(let key in this.shopInfoVoObj)
			{
				if(this.shopInfoVoObj[key])
				{
					this.shopInfoVoObj[key].dispose();
					this.shopInfoVoObj[key] = null;
				}
			}
		}
		this.shopInfoVoObj = null;
		this.vipInfo = null;
		this.pay = null;
		this.payflag = 0;
		this.monthcard = null;
		this.butler = null;
		this.growGold = null;
		this.lastUpdateTime = 0;
		this.version = 0;
		this.st = 0;
		this.et = 0;
	}
}