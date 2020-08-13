/**
 * 充值活动
 * author yanyuling
 * date 2017/11/08
 * @class AcRechargeItem
 */
class AcRechargeItem extends BaseDisplayObjectContainer
{
	private _aid:string;
	private _code:string;
	private _scrollList:ScrollList;
	private _seprateNum:number = 0;
	private _isSpecial:boolean = false;
	private _objList:any =null;
	private _maxNumb:number=0;
    public constructor()
	{
		super();
	}
	public init(aid:string,code:string|number,rect:egret.Rectangle):void
	{
		App.MessageHelper.addEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshAfterRecharge,this);


		this._aid = aid;
		this._code = String(code);

		let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		this._objList = cfgObj.getList();
		
		for (var key in this._objList) 
		{
			let tmpCfg = this._objList[key]; 
			if(Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial))
			{
				this._maxNumb = tmpCfg.isSpecial;
			} 
		}

		this.refreshList(rect);
    }
	protected refreshAfterRecharge()
	{
		/**有特殊档 */
		if(this._isSpecial )
		{
			let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
			if( tmpVo.v >= this._seprateNum && Api.switchVoApi.checkSpecialChargeReward())
			{
				// this.refreshList();
				egret.callLater(this.refreshList,this);
				// egret.Tween.get(this).wait(800).call(this.refreshList,this);
			}
		}
	}
	protected refreshList(rect?:egret.Rectangle)
	{
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
		
		let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		let objList = cfgObj.getList();
		let terList = {};

		// for (var key in objList) {
		// 	let tmpCfg = objList[key];
		// 	if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
		// 	{
		// 		if(Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum )
		// 		{
		// 			this._isSpecial = true;
		// 			terList[key] = tmpCfg;
		// 		}
		// 	}else
		// 	{
		// 		this._seprateNum = tmpCfg.needGem;
		// 		terList[key] = tmpCfg;
		// 	}
		// }
		this._isSpecial = false;
		for (var key in objList) {
			let tmpCfg = objList[key];
			
			var maxNumb =0;
			if(Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial))
			{
				maxNumb = tmpCfg.isSpecial;
				this._isSpecial = true;
			} 

			if(tmpCfg.isSpecial && tmpCfg.isSpecial >= 1)
			{
				if(tmpCfg.isSpecial==1)
				{
					if( (Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum) || (tmpCfg.isSpecial<=this._maxNumb&& tmpVo.v >= this._seprateNum) )
					{
						this._isSpecial = true;
						terList[key] = tmpCfg;
					 }
				} 
				else
				{	 
					var needGem:number = this.getLjNum(tmpCfg.isSpecial);
					var needGem2:number = this.getLjNum(tmpCfg.isSpecial-1);
					if(tmpVo.v>= needGem&&Api.switchVoApi.checkSpecialState(tmpCfg.isSpecial)||tmpVo.v>= needGem2&&tmpCfg.isSpecial<=this._maxNumb)
					{
						this._isSpecial = true;
						terList[key] = tmpCfg; 
					}  
				}  
			}
			else
			{
				this._seprateNum = tmpCfg.needGem;
				terList[key] = tmpCfg;
			}
		}
		
		let keys = Object.keys(terList);
		keys.sort((a:string,b:string)=>{
			return Number(a) - Number(b) ;
		});
		this._seprateNum = terList[keys[keys.length-1]].needGem; //引入特殊档位之后，
		let scrolItem = undefined;
		if (this._aid == "dailyCharge")
		{
			scrolItem = AcDailyChargeScrollItem;
		}
		else if (this._aid == "totalRecharge")
		{
			scrolItem = AcTotalRechargeScrollItem;
		}
		else if (this._aid == "totalDayRecharge")
		{
			scrolItem = AcTotalDayRechargeScrollItem;
			let num = tmpVo.getShowNum(1);
			if(keys.length>0)
			{
				keys.splice(num,keys.length-num);	
			}
		}
		else if (this._aid == "rechargeRebate") 
		{
			scrolItem = AcRechargeRebateScrollItem;
		}
		if(rect)
		{
			let scrollList = ComponentManager.getScrollList(scrolItem,keys,rect);
			this.addChild(scrollList);
			this._scrollList = scrollList ;
		}else{
			this._scrollList.refreshData(keys);
		}
		this._scrollList.width= 640;
		this._scrollList.x=-3;
		
	}

	private getLjNum(isSpecial:number):number
	{ 
		let objList = this._objList; 
		for (var key in objList) {
			let tmpCfg = objList[key];
			if(isSpecial == tmpCfg.isSpecial)
			{
			 	var needGem = tmpCfg.needGem; 
			}
		} 
		return needGem;
	}
	public dispose():void
	{
		App.MessageHelper.removeEventListener(MessageConst.MESSAGE_DAILYCHARGE_REFRESH_V,this.refreshAfterRecharge,this);

		this._aid = null;
		this._code = null;
		this._scrollList = null;
		this._seprateNum = 0;
		this._isSpecial = null;
		this._objList=null;
		this._maxNumb =0;
		
		super.dispose();
	}
}