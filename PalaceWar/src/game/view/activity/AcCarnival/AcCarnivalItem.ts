/**
 * 狂欢节活动
 * author jiangliuyang
 * date 2018/4/11
 * @class AcCarnivalItem
 */
class AcCarnivalItem extends BaseDisplayObjectContainer
{
	private _aid:string;
	private _code:string;
	private _scrollList:ScrollList;
	private _seprateNum:number = 0;
	private _isSpecial:boolean = false;

    private _topImgName: string;
    private _topBgImgName: string;

	private _typeCode: string;

    public constructor()
	{
		super();
	}
	public init(aid:string,code:string|number,rect:egret.Rectangle):void
	{
		//充值完成的时候检查是否有特殊信息需要显示
		//App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT),this.refreshAfterRecharge,this);

		//监听领取成功事件  如果物品领取完毕判断是否有特殊信息需要显示
		// if (aid == "carnivalCharge"){
       	// 	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.refreshAfterRecharge,this);
		// } else {
		// 	App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.refreshAfterRecharge,this);
		// }


		this._aid = aid;
		this._code = String(code);
		this.refreshList(rect);
    }

    public get typeCode():string
    {
        return this._typeCode;
    }
    public set typeCode(_name: string)
    {
        this._typeCode = _name;
    }

    //标头背景图片
    public get topImgName():string
    {
        return this._topImgName;
    }
    public set topImgName(_name: string)
    {
        this._topImgName = _name;
    }

    //标头文字图片
    public get topBgImgName():string
    {
        return this._topBgImgName;
    }
    public set topBgImgName(_name: string)
    {
        this._topBgImgName = _name;
    }


	protected refreshAfterRecharge()
	{
		/**有特殊档 */
		if(this._isSpecial )
		{
			let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
			if( tmpVo.v >= this._seprateNum)
			{
				this.refreshList();
			}
		}
	}
	protected refreshList(rect?:egret.Rectangle)
	{
		let tmpVo = Api.acVoApi.getActivityVoByAidAndCode(this._aid);
		
		let cfgObj = Config.AcCfg.getCfgByActivityIdAndCode(this._aid,this._code);
		let objList = cfgObj.getList();
		let terList = {};

		for (var key in objList) {
			let tmpCfg = objList[key];
			if(tmpCfg.isSpecial && tmpCfg.isSpecial == 1 )
			{

				//检查是否开启特殊档位的功能
				if(Api.switchVoApi.checkSpecialChargeReward())
				{
					this._isSpecial = true;
				} else {
					this._isSpecial = false;
				}

				
				if(Api.switchVoApi.checkSpecialChargeReward() && tmpVo.v >= this._seprateNum )
				{
					// this._isSpecial = true;
					terList[key] = tmpCfg;
				}
			}else
			{
				this._seprateNum = tmpCfg.needGem;
				terList[key] = tmpCfg;
			}
		}
		
		let keys = Object.keys(terList);
		keys.sort((a:string,b:string)=>{
			return Number(a) - Number(b) ;
		});

		let scrolItem = undefined;
		if (this._aid == "carnivalCharge")
		{
			scrolItem = AcCarnivalChargeScrollItem;
		}

		else if (this._aid == "carnivalCost")
		{
			scrolItem = AcCarnivalCostScrollItem;
			// let num = tmpVo.getShowNum(1);
			// if(keys.length>0)
			// {
			// 	keys.splice(num,keys.length-num);	
			// }
		}
		if(rect)
		{
			let scrollList = ComponentManager.getScrollList(scrolItem,keys,rect);
			this.addChild(scrollList);
			this._scrollList = scrollList ;
		}else{
			this._scrollList.refreshData(keys);
		}
		
	}
	public dispose():void
	{
		// App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_PAY_RROCCESSPAYMENT),this.refreshAfterRecharge,this);
		// App.MessageHelper.removeNetMessage(NetPushConst.PUSH_PAY,this.refreshAfterRecharge,this);
		
		// if (this._aid == "carnivalCharge"){
       	// 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCHARGE),this.refreshAfterRecharge,this);
		// } else {
		// 	App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_ACTIVITY_GETCARNIVALCOST),this.refreshAfterRecharge,this);
		// }
		
		
		this._aid = null;
		this._code = null;
		this._scrollList = null;
		this._seprateNum = 0;
		this._isSpecial = null;

		super.dispose();
	}
}