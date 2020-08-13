/**
 * 道具
 * author dmj
 * date 2017/9/22
 * @class ItemView
 */

class ItemView  extends CommonView
{
	// 大于等于5时，需要弹2次确认板
	public static MAX_NUM:number = 5;
	public constructor() 
	{
		super();
	}

	public initView():void
	{



		this.checkRedPoint();
		// NetManager.request(NetRequestConst.REQUEST_ITEM_GETMODEL,{});
	}
	protected getRequestData():{requestType:string,requestData:any}
	{
		return {requestType:NetRequestConst.REQUEST_ITEM_GETMODEL,requestData:{}};
	}
	// protected getRuleInfo():string
	// {
	// 	return "itemRuleInfo";
	// }

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
			"common_shopmark2","itemview_daoju_bg01","itemview_daoju_bg02","itemview_daoju_bg03","itembg_0",
			"itemview_detailbg","commonview_bottom","commonview_border1","commonview_item1","commonview_woodbg",
			"commonview_border2",
		]);
	}

	protected getTabbarTextArr():Array<string>
	{
		return ["itemBtn","composeBtn",
		"fashionBtn",
		];
	}

	private checkRedPoint():void
	{
		if(Api.itemVoApi.checkRedPoint())
		{
			this.tabbarGroup.addRedPoint(1,null,null,-12,4);
		}
		else
		{
			this.tabbarGroup.removeRedPoint(1);
		}
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
	}

	public dispose():void
	{
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_DOCOMPOSE,this.checkRedPoint,this);
		App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_ITEM_GETCOMPOSE,this.checkRedPoint,this);
		super.dispose();
	}
}