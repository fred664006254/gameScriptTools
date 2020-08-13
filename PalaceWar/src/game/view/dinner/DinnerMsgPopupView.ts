/**
 * 宴会记录列表
 * author sl
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
            "rank_line","dinner_detail","dinner_seat_empty",
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
		let tabName = ["dinnerMsgPopupViewTitle"];

		let rankBg:BaseBitmap = BaseBitmap.create("public_9_probiginnerbg");
		rankBg.width = 520;
		rankBg.height = 618;
		rankBg.setPosition(this.viewBg.width/2  - rankBg.width/2, 20);
		this.addChildToContainer(rankBg);

		let rect = egret.Rectangle.create();
		rect.setTo(0,0,508,rankBg.height - 20);
		this._scrollList = ComponentManager.getScrollList(DinnerMsgPopupScollItem,this._infoList,rect);
		this.addChildToContainer(this._scrollList);
		this._scrollList.setPosition(rankBg.x + 5 ,rankBg.y + 10);

		this._scrollList.setEmptyTip(LanguageManager.getlocal("dinnerMsgPopupEmptyTip") )


	
	}

	protected getBgExtraHeight():number
	{
		return 20;
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