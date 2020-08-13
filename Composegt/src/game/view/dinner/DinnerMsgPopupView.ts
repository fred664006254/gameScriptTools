/**
 * 提亲请求列表
 * author dky
 * date 2017/11/8
 * @class DinnerMsgPopupView
 */


class DinnerMsgPopupView extends PopupView
{

	private _scrollList:ScrollList;
	private _infoList:any[] = null;
	protected _scroRect:egret.Rectangle;
	private _merank:number = 0;

	public constructor() {
		super();
	}

	protected getResourceList():string[]
	{
		return super.getResourceList().concat([
            "rank_line",
			"dinner_rankbg"
        ]);
	}
	

	protected getRequestData():{requestType:string,requestData:any}
	{	
		return {requestType:NetRequestConst.REQUEST_DINNER_HISTORY,requestData:{}};
	}

	protected receiveData(data:{ret:boolean,data:any}):void
	{
		this._infoList = data.data.data.historydinfo;
		// App.LogUtil.show("receiveData")
		// this._infoList = 
		// [
		// 	{
		// 		dtype:1,
		// 		num:2,
		// 		enemy_num:3,
		// 		point:4,
		// 		score:5,
		// 		start_time:1510109973
		// 	},
		// 	{
		// 		dtype:2,
		// 		num:2222,
		// 		enemy_num:33,
		// 		point:43333,
		// 		score:533333,
		// 		start_time:1510109973
		// 	},
		// 	{
		// 		dtype:1,
		// 		num:2,
		// 		enemy_num:3,
		// 		point:4123,
		// 		score:12135,
		// 		start_time:1510109973
		// 	},
		// ]

	}


	protected initView():void
	{
		App.LogUtil.show("initView")
		let tabName = ["dinnerMsgPopupViewTitle"];

        let tabbarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN_WINTAB,tabName,null,null);
        tabbarGroup.x = 50;
        tabbarGroup.y = 10;
        this.addChildToContainer(tabbarGroup);

		let rankBg:BaseBitmap = BaseBitmap.create("public_tc_bg01");
		rankBg.width = 535;
		rankBg.height = 608;
		rankBg.x = this.viewBg.width/2 - rankBg.width/2;
		rankBg.y = 55;
		// rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, tabbarGroup.y + tabbarGroup.height);
		this.addChildToContainer(rankBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,rankBg.width - 20,rankBg.height - 20);
		this._scrollList = ComponentManager.getScrollList(DinnerMsgPopupScollItem,this._infoList,rect);
		this.addChildToContainer(this._scrollList);
		// this._scrollList.setPosition(rankBg.x  ,rankBg.y + 10);
		this._scrollList.x = this.viewBg.width/2 - this._scrollList.width/2;
		this._scrollList.y = rankBg.y + 10;

		this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip") )


	
	}

	public dispose():void
	{
		 this._scrollList = null;
		 this._scroRect = null;
		 this._infoList =null;
		 this._merank = 0;
		 

		super.dispose();
	}
}